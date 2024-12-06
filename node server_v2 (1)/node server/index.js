const express = require('express')
const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newDB',
    password: '12345678',
    port: 5432,
})

const JWT_SECRET = 'a3c9f5e4d7b6c8a1f2e3d4b5a7c8f9d6b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'

app.post('/register', async (req, res) => {
    const { username, email, phone, password } = req.body

    if (!username || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            `INSERT INTO users (username, email, phone, password)
       VALUES ($1, $2, $3, $4) RETURNING id, username, email, phone`,
            [username, email, phone, hashedPassword]
        )

        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0],
        })
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ message: 'Username or email already exists.' })
        } else {
            console.error(error)
            res.status(500).json({ message: 'Server error.' })
        }
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' })
    }

    try {
        const result = await pool.query(
            `SELECT id, username, password FROM users WHERE username = $1`,
            [username]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' })
        }

        const user = result.rows[0]

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' })
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        })

        res.json({ message: 'Login successful', token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error.' })
    }
})

app.post('/addQuery', async (req, res) => {
    try {
        const { title, details } = req.body;

        if (!title || !details) {
            return res.status(400).json({ message: 'Title and details are required.' });
        }

        const result = await pool.query(
            `INSERT INTO Queries (title, details) VALUES ($1, $2) RETURNING *`,
            [title, details]
        );

        res.status(201).json({
            message: 'Query added successfully.',
            query: result.rows[0],
        });
    } catch (error) {
        console.error('Error adding query:', error.message);
        res.status(500).json({ message: 'An error occurred while adding the query.', error: error.message });
    }
});

app.post('/addQueryReply', async (req, res) => {
    try {
        const { queryId, message, rating } = req.body;

        if (!queryId || !message || rating === undefined) {
            return res.status(400).json({ message: 'queryId, message, and rating are required.' });
        }

        const result = await pool.query(
            `INSERT INTO QueryReplies (queryId, message, rating) VALUES ($1, $2, $3) RETURNING *`,
            [queryId, message, rating]
        );

        res.status(201).json({
            message: 'Reply added successfully.',
            reply: result.rows[0],
        });
    } catch (error) {
        console.error('Error adding reply:', error.message);
        res.status(500).json({ message: 'An error occurred while adding the reply.', error: error.message });
    }
});

app.get('/queries', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                q.queryId,
                q.title,
                q.details,
                q.createdAt,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'replyId', qr.replyId,
                            'message', qr.message,
                            'rating', qr.rating,
                            'createdAt', qr.createdAt
                        )
                    ) FILTER (WHERE qr.replyId IS NOT NULL), 
                    '[]'::json
                ) AS queryReplies
            FROM Queries q
            LEFT JOIN QueryReplies qr ON q.queryId = qr.queryId
            GROUP BY q.queryId
            ORDER BY q.createdAt DESC;
        `);

        res.status(200).json({
            message: 'Queries fetched successfully.',
            queries: result.rows,
        });

    } catch (error) {
        console.error('Error fetching queries:', error.message);
        res.status(500).json({
            message: 'An error occurred while fetching queries.',
            error: error.message,
        });
    }
});

app.post('/voteReply', async (req, res) => {
    const { replyId, voteAction } = req?.body

    if (!replyId || !voteAction || (voteAction !== 'upvote' && voteAction !== 'downvote')) {
        return res.status(400).json({ message: 'Invalid input. Please provide a valid replyId and voteAction (upvote or downvote).' })
    }

    try {
        let query

        if (voteAction === 'upvote') {
            query = `UPDATE QueryReplies
                     SET rating = rating + 1
                     WHERE replyId = $1
                     RETURNING *`
        } else if (voteAction === 'downvote') {
            query = `UPDATE QueryReplies
                     SET rating = rating - 1
                     WHERE replyId = $1 AND rating > 0
                     RETURNING *`
        }

        const result = await pool.query(query, [replyId])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Reply not found or rating cannot be decreased below 0.' })
        }

        // Return the updated reply
        const updatedReply = result.rows[0]
        res.json({
            message: 'Vote successfully recorded.',
            updatedReply,
        })
    } catch (error) {
        console.error('Error updating reply rating:', error)
        res.status(500).json({ message: 'An error occurred while processing your request.' })
    }
})

const handle404 = (req, res) => {
    res.status(404).json({ message: 'End Point Not Found' })
}

app.use(handle404)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

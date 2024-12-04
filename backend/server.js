const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const routes = require("./routes/subjects");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//db connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected:", res.rows[0]);
  }
});

// Use routes
app.use("/api", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

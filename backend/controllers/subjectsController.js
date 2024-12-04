const pool = require("../config/db");

exports.getSubjects = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT subject_name, course_code FROM subjects ORDER BY subject_name ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

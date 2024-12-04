const express = require("express");
const { getSubjects } = require("../controllers/subjectsController");

const router = express.Router();

// Define routes
router.get("/subjects", getSubjects);

module.exports = router;

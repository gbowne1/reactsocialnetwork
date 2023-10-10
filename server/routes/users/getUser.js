const express = require("express");
const router = express.Router();
const db = require("../../database");

/* GET users listing. */
router.get("/api/user/:id", function (req, res, next) {
  const userId = req.params.id;

  // Check if userId exists, is a valid number, and not an empty string
  if (!userId || isNaN(userId) || userId.trim() === "") {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const sql = "select * from User where id = ?";
  const params = [userId];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: row
        ? "User successfully retrieved!"
        : `User with id: ${params} not found.`,
      data: row,
    });
  });
});

module.exports = router;

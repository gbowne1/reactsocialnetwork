const express = require("express");
const router = express.Router();
const db = require("../../database");

/* GET posts listing. */
router.get("/api/post/:id", function (req, res, next) {
  const sql = "select * from Post where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: row
        ? "Post successfully retrieved!"
        : `Post with id: ${params} not found.`,
      data: row,
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../../database");

/* GET posts listing. */
router.get("/api/posts/", function (req, res, next) {
  const sql = "select * from Post";
  const params = [];
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Posts successfully retrieved!",
      data: row,
    });
  });
});

module.exports = router;

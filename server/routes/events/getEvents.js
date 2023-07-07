const express = require("express");
const router = express.Router();
const db = require("../../database");

/* GET events listing. */
router.get("/api/events", function (req, res, next) {
  const sql = "select * from Event";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Events successfully retrieved!",
      data: rows,
    });
  });
});

module.exports = router;

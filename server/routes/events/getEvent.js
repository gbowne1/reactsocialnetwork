const express = require("express");
const router = express.Router();
const db = require("../../database");

/* GET event listing. */
router.get("/api/event/:id", function (req, res, next) {
  const sql = "select * from Event where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: row
        ? "Event successfully retrieved!"
        : `Event with id: ${params} not found.`,
      data: row,
    });
  });
});

module.exports = router;

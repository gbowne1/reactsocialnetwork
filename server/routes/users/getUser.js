const express = require("express");
const router = express.Router();
const db = require("../../database");

/* GET users listing. */
router.get("/api/user/:id", function (req, res, next) {
  const sql = "select * from User where id = ?";
  const params = [req.params.id];
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

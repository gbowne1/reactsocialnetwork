const express = require("express");
const router = express.Router();
const db = require("../../database");

router.delete("/api/user/:id", (req, res, next) => {
  db.run(
    "DELETE FROM User WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "User successfully deleted!", rows: this.changes });
    }
  );
});

module.exports = router;

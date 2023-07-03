const express = require("express");
const router = express.Router();
const db = require("../../database");

router.delete("/api/post/:id", (req, res, next) => {
  db.run(
    "DELETE FROM Post WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "Post successfully deleted!", rows: this.changes });
    }
  );
});

module.exports = router;

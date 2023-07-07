const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/api/posts/delete-test-posts", (req, res, next) => {
  db.run(
    `DELETE FROM Post WHERE postText LIKE '%Test post%'`,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "Posts deleted!", rows: this.changes });
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../../database");

// Register new post, fail if user post already exist
router.post("/api/post/", (req, res, next) => {
  let data = {};
  const errors = [];

  if (!req.body.accountImage) {
    errors.push("No accountImage specified");
  }

  if (!req.body.accountName) {
    errors.push("No accountName specified");
  }

  if (!req.body.postDate) {
    errors.push("No postDate specified");
  }

  if (!req.body.postText) {
    errors.push("No postText specified");
  }

  if (!req.body.postImage) {
    errors.push("No postImage specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }

  data = {
    accountImage: req.body.accountImage,
    accountName: req.body.accountName,
    postDate: req.body.postDate,
    postText: req.body.postText,
    postImage: req.body.postImage,
  };

  const sql =
    "INSERT OR REPLACE INTO Post (accountImage, accountName, postDate, postText, postImage) VALUES (?,?,?,?,?)";
  const params = [
    data.accountImage,
    data.accountName,
    data.postDate,
    data.postText,
    data.postImage,
  ];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }

    res.json({
      message: `Post from ${data.accountName} successfully created!`,
      data: data,
      id: this.lastID,
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../../database");

// Register new post, fail if user post already exist
router.post("/api/post/", (req, res, next) => {
  // TODO use object destructuring!!!
  let data = {};
  const errors = [];

  const { accountImage, accountName, postDate, postText, postImage } = req.body;

  if (!accountImage) {
    errors.push("No accountImage specified");
  }

  if (!accountName) {
    errors.push("No accountName specified");
  }

  if (!postDate) {
    errors.push("No postDate specified");
  }

  if (!postText) {
    errors.push("No postText specified");
  }

  if (!postImage) {
    errors.push("No postImage specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }

  data = {
    accountImage,
    accountName,
    postDate,
    postText,
    postImage,
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

const express = require("express");
const router = express.Router();
const db = require("../../database");

router.patch("/api/post/:id", (req, res, next) => {
  console.log("On /api/post/:id");
  const data = {
    accountImage: req.body.accountImage,
    accountName: req.body.accountName,
    postDate: req.body.postDate,
    postText: req.body.postText,
    postImage: req.body.postImage,
  };

  console.log(data);
  db.run(
    `UPDATE Post set 
         accountImage = coalesce(?,accountImage), 
         accountName = COALESCE(?,accountName), 

         postDate = COALESCE(?,postDate), 
         
         postText = COALESCE(?,postText), 
         postImage = COALESCE(?,postImage)

         WHERE id = ?`,
    [
      data.accountImage,
      data.accountName,
      data.postDate,
      data.postText,
      data.postImage,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "Post successfully updated!",
        data: data,
      });
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../../database");
const md5 = require("md5");

router.patch("/api/user/:id", (req, res, next) => {
  const { username, email, password, accountImageUrl } = req.body;

  const data = {
    username,
    email,
    password: req.body.password ? md5(req.body.password) : undefined,
    accountImageUrl,
  };

  db.run(
    `UPDATE User set
         username = coalesce(?,username), 
         email = COALESCE(?,email), 
         password = coalesce(?,password),
         accountImageUrl = coalesce(?,accountImageUrl)
         WHERE id = ?`,
    [
      data.username,
      data.email,
      data.password,
      data.accountImageUrl,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "User successfully updated!",
        data,
      });
    }
  );
});

module.exports = router;

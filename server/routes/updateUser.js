const express = require("express");
const router = express.Router();
const db = require("../database");
const md5 = require("md5");

router.patch("/api/user/:id", (req, res, next) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password ? md5(req.body.password) : undefined,
  };
  db.run(
    `UPDATE user set 
         username = coalesce(?,username), 
         email = COALESCE(?,email), 
         password = coalesce(?,password) 
         WHERE id = ?`,
    [data.username, data.email, data.password, req.params.id],
    (err) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "User successfully updated!",
        data: data,
      });
    }
  );
});

module.exports = router;

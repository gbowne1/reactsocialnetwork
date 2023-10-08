const express = require("express");
const router = express.Router();
const db = require("../../database");

// Endpoint to send a friend request
router.post("/api/friend-requests/", (req, res, next) => {
  console.log(req.body);
  const { userId, friendId } = req.body;
  const errors = [];

  if (!userId) {
    errors.push("No userId specified");
  }

  if (!friendId) {
    errors.push("No friendId specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }

  // Check if friend request already exists
  const checkQuery =
    "SELECT * FROM Friendship WHERE user_id = ? AND friend_id = ?";
  db.get(checkQuery, [userId, friendId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (row) {
      return res
        .status(400)
        .json({ error: "Friend request already send or accepted" });
    }

    // Insert friend request into the database
    const insertQuery =
      "INSERT INTO Friendship (user_id, friend_id, status) VALUES (?,?,?)";
    db.run(insertQuery, [userId, friendId, "pending"], (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to send friend request" });
      }

      res.status(201).json({ message: "Friend request sent successfully" });
    });
  });
});

module.exports = router;

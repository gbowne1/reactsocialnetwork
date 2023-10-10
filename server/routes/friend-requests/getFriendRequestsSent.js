const express = require("express");
const router = express.Router();
const db = require("../../database");

// Endpoint to retrieve pending friend requests sent by a user
router.get("/friend-requests/sent/:userId", (req, res) => {
  const userId = req.params.userId;

  // Check if userId exists, is a valid number, and not an empty string
  if (!userId || isNaN(userId) || userId.trim() === "") {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  // Retrieve pending friend requests sent by the user from the database
  const sentRequestsQuery =
    "SELECT u.username, f.id FROM users u INNER JOIN friendship f ON u.id = f.friend_id WHERE f.user_id = ? AND f.status = ?";
  db.all(sentRequestsQuery, [userId, "pending"], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve sent friend requests" });
    }

    res.status(200).json({ sentFriendRequests: rows });
  });
});

module.exports = router;

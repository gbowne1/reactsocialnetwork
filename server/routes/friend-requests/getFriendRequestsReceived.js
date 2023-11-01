const express = require("express");
const router = express.Router();
const db = require("../../database");

// Endpoint to retrieve pending friend requests received by a user
router.get("/api/friend-requests/received/:userId", (req, res) => {
    const userId = req.params.userId;

    // Check if userId exists, is a valid number, and not an empty string
    if (!userId || isNaN(userId) || userId.trim() === "") {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    // Retrieve pending friend requests received by the user from the database
    const friendRequestsQuery =
        "SELECT u.username, f.id FROM User u INNER JOIN Friendship f ON u.id = f.userId WHERE f.friendId = ? AND f.status = ?";
    db.all(friendRequestsQuery, [userId, "pending"], (err, rows) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Failed to retrieve friend requests" });
        }

        res.status(200).json({ friendRequests: rows });
    });
});

module.exports = router;

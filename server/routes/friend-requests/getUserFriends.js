const express = require("express");
const router = express.Router();
const db = require("../../database");

// Endpoint to retrieve a user's list of friends
router.get("/api/users/:userId/friends", (req, res) => {
    const userId = req.params.userId;

    // Check if userId exists, is a valid number, and not an empty string
    if (!userId || isNaN(userId) || userId.trim() === "") {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    // Retrieve the list of friends for the user from the database
    const friendsQuery =
        "SELECT u.username, f.status FROM User u INNER JOIN Friendship f ON u.id = f.friendId WHERE f.userId = ? AND f.status = ?";
    db.all(friendsQuery, [userId, "accepted"], (err, rows) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Failed to retrieve user's friends" });
        }

        res.status(200).json({ friends: rows });
    });
});

module.exports = router;

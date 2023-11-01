const express = require("express");
const router = express.Router();
const db = require("../../database");

// Endpoint to accept a friend request
router.post("/api/friend-requests/accept/:requestId", (req, res) => {
    console.log(req.params);
    const requestId = req.params.requestId;

    // Check if requestId exists and is a valid number
    if (!requestId || requestId.trim() === "" || isNaN(requestId)) {
        return res.status(400).json({ error: "Invalid request ID" });
    }

    // Update the status of the friend request to 'accepted' in the database
    const updateQuery = "UPDATE Friendship SET status = ? WHERE id = ?";
    db.run(updateQuery, ["accepted", requestId], (err) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Failed to accept friend request" });
        }

        res.status(201).json({
            message: "Friend request accepted successfully",
        });
    });
});

module.exports = router;

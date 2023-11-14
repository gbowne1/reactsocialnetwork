const express = require("express");
const router = express.Router();
const db = require("../../database");

// Endpoint to reject a friend request
router.post("/api/friend-requests/reject/:requestId", (req, res) => {
    const requestId = req.params.requestId;

    // Check if requestId exists, is a valid number, and not an empty string
    if (!requestId || isNaN(requestId) || requestId.trim() === "") {
        return res.status(400).json({ error: "Invalid request ID" });
    }

    // Update the status of the friend request to 'rejected' in the database
    const updateQuery = "UPDATE friendship SET status = ? WHERE id = ?";
    db.run(updateQuery, ["rejected", requestId], (err) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Failed to reject friend request" });
        }

        res.status(201).json({
            message: "Friend request rejected successfully",
        });
    });
});

module.exports = router;

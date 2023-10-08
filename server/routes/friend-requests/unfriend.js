const express = require("express");
const router = express.Router();
const db = require("../../database");

// Endpoint to unfriend a user
router.delete("/friends/:friendshipId", (req, res) => {
  const friendshipId = req.params.friendshipId;

  // Check if friendshipId exists, is a valid number, and not an empty string
  if (!friendshipId || isNaN(friendshipId) || friendshipId.trim() === "") {
    return res.status(400).json({ error: "Invalid friendship ID" });
  }

  // Delete the friendship entry from the database
  const deleteQuery = "DELETE FROM friendship WHERE id = ?";
  db.run(deleteQuery, [friendshipId], (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to unfriend user" });
    }

    res.status(200).json({ message: "Friendship unfriended successfully" });
  });
});

module.exports = router;

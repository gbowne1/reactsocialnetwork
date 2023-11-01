const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/api/users/delete-test-users", (req, res, next) => {
    db.run(
        `DELETE FROM User WHERE username LIKE '%testuser%'`,
        function (err, result) {
            if (err) {
                return res.status(400).json({ error: res.message });
            }
            res.status(204).end();
        }
    );
});

module.exports = router;

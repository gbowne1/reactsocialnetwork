const express = require("express");
const router = express.Router();
const db = require("../../database");
const md5 = require("md5");

// Login user, fail if user credentials do not exists
router.post("/api/login", (req, res, next) => {
    const errors = [];
    const sql = "select * from User";
    const params = [];

    if (!req.body.email) {
        errors.push("No email specified");
    }

    if (!req.body.password) {
        errors.push("No password specified");
    }

    if (errors.length) {
        res.status(400).json({ error: errors.join(",") });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
    };

    // Get all users
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        // Add them to users const
        const users = rows;

        // Find user match by username, email & password
        const existingUser = users.find(
            (user) =>
                user.username === data.username &&
                user.email === data.email &&
                user.password === data.password
        );

        if (existingUser) {
            return res.json({
                message: "User successfully logged in!",
                data: rows,
            });
        }

        return res.status(400).json({
            error: `User ${data.email} does not exists, register a user first!`,
        });
    });
});

module.exports = router;

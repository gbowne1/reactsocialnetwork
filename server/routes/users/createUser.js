const express = require("express");
const router = express.Router();
const db = require("../../database");
const md5 = require("md5");

// Create new user, fail if user credentials already exist
router.post("/api/user/", (req, res, next) => {
    console.log("On /api/user/");
    const errors = [];

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
        accountImageUrl:
            "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    };

    const sql =
        "INSERT INTO User (username, email, password, accountImageUrl) VALUES (?,?,?,?)";
    const params = [
        data.username,
        data.email,
        data.password,
        data.accountImageUrl,
    ];

    db.run(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            const errorMessage = `A user with email ${data.email} already exists!`;
            res.status(400).json({ error: errorMessage });
            return;
        }

        res.json({
            message: `User ${data.email} successfully created!`,
            data: data,
            id: this.lastID,
        });
    });
});

module.exports = router;

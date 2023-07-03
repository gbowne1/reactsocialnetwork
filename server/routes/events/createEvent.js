const express = require("express");
const router = express.Router();
const db = require("../../database");

// Register new event, fail if user event already exist
router.post("/api/event/", (req, res, next) => {
  let data = {};
  const errors = [];

  if (!req.body.date) {
    errors.push("No date specified");
  }

  if (!req.body.title) {
    errors.push("No title specified");
  }

  if (!req.body.locationName) {
    errors.push("No locationName specified");
  }

  if (!req.body.locationUrl) {
    errors.push("No locationUrl specified");
  }

  if (!req.body.imageUrl) {
    errors.push("No imageUrl specified");
  }

  if (!req.body.attendance) {
    errors.push("No attendance specified");
  }

  if (!req.body.participationInterested) {
    errors.push("No participationInterested specified");
  }

  if (!req.body.participationGoing) {
    errors.push("No participationGoing specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }

  data = {
    date: req.body.date,
    title: req.body.title,
    locationName: req.body.locationName,
    locationUrl: req.body.locationUrl,
    imageUrl: req.body.imageUrl,
    attendance: req.body.attendance,
    participationInterested: req.body.participationInterested,
    participationGoing: req.body.participationGoing,
  };

  const sql =
    "INSERT OR REPLACE INTO Event (date, title, locationName, locationUrl, imageUrl, attendance, participationInterested, participationGoing) VALUES (?,?,?,?,?,?,?,?)";
  const params = [
    data.date,
    data.title,
    data.locationName,
    data.locationUrl,
    data.imageUrl,
    data.attendance,
    data.participationInterested,
    data.participationGoing,
  ];

  db.run(sql, params, function (err, result) {
    if (err) {
      const errorMessage = `An event with title ${data.title} already exists!`;
      res.status(400).json({ error: errorMessage });
      return;
    }

    res.json({
      message: `Event ${data.title} successfully created!`,
      data: data,
      id: this.lastID,
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../../database");

router.patch("/api/event/:id", (req, res, next) => {
  const data = {
    date: req.body.date,
    title: req.body.title,
    locationName: req.body.locationName,

    locationUrl: req.body.locationUrl,
    imageUrl: req.body.imageUrl,
    attendance: req.body.attendance,

    participationInterested: req.body.participationInterested,
    participationGoing: req.body.participationGoing,
  };
  db.run(
    `UPDATE Event set 
        date = coalesce(?,date), 
        title = COALESCE(?,title), 
        locationName = coalesce(?,locationName),

        locationUrl = coalesce(?,locationUrl), 
        imageUrl = coalesce(?,imageUrl), 
        attendance = coalesce(?,attendance), 

        participationInterested = coalesce(?,participationInterested), 
        participationGoing = coalesce(?,participationGoing)

        WHERE id = ?`,
    [
      data.date,
      data.title,
      data.locationName,
      data.locationUrl,
      data.imageUrl,
      data.attendance,
      data.participationInterested,
      data.participationGoing,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "Event successfully updated!",
        data: data,
      });
    }
  );
});

module.exports = router;

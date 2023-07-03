const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/api/events/delete-test-events", (req, res, next) => {
  db.run(
    `DELETE FROM Event WHERE locationName='Test event location'`,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "Events deleted!", rows: this.changes });
    }
  );
});

module.exports = router;

const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open db
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to Sqlite DB.");

    db.run(
      `CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username text NOT NULL,
      email text unique NOT NULL,
      password text NOT NULL,
      CONSTRAINT email_unique UNIQUE (email)
    )`,
      (err) => {
        if (err) {
          // Table already created
          console.error(err.message);
          throw err;
        } else {
          // Table just created, creating some rows
          const insert =
            "INSERT OR REPLACE INTO User (username, email, password) VALUES (?,?,?)";

          db.run(insert, [
            "testuser1",
            "testuser@gmail.com",
            md5("Testpass1!"),
          ]);
        }
      }
    );
    console.log("Succesfully created User database!");

    db.run(
      `CREATE TABLE IF NOT EXISTS Event (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE,
      title text unique NOT NULL,
      locationName text NOT NULL,
      locationUrl text NOT NULL,
      imageUrl text NOT NULL,
      attendance text NOT NULL,
      participationInterested INTEGER NOT NULL,
      participationGoing INTEGER NOT NULL,
      CONSTRAINT title_unique UNIQUE (title)
    )`,
      (err) => {
        if (err) {
          // Table already created
          console.error(err.message);
          throw err;
        } else {
          // Table just created, creating some rows
          const insert =
            "INSERT OR REPLACE INTO Event (date, title, locationName, locationUrl, imageUrl, attendance, participationInterested, participationGoing) VALUES (?,?,?,?,?,?,?,?)";

          db.run(insert, [
            new Date(),
            "Cinema Night!",
            "Cinema32",
            "#",
            "https://www.shutterstock.com/image-photo/02-august-2018bucharest-romania-people-260nw-1148998826.jpg",
            "Not Going",
            46,
            27,
          ]);

          db.run(insert, [
            new Date(),
            "Pub Crawl",
            "Bulldog Bar",
            "#",
            "https://www.shutterstock.com/image-photo/happy-friends-cheering-drinking-cocktails-260nw-1109615582.jpg",
            "Not Going",
            52,
            38,
          ]);

          db.run(insert, [
            new Date(),
            "Mini golf!",
            "Mini golf park",
            "#",
            "https://www.shutterstock.com/image-photo/group-smiling-friends-enjoying-together-260nw-1814772797.jpg",
            "Not Going",
            106,
            78,
          ]);
        }
      }
    );
    console.log("Succesfully created Event database!");
  }
});

module.exports = db;

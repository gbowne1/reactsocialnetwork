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
      accountImageUrl text,
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
            "INSERT OR REPLACE INTO User (username, email, password, accountImageUrl) VALUES (?,?,?,?)";

          db.run(insert, [
            "testuser1",
            "testuser@gmail.com",
            md5("Testpass1!"),
            "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
          ]);
        }
      }
    );
    console.log("Succesfully created User database table!");

    db.run(
      `CREATE TABLE IF NOT EXISTS Post (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accountImage text NOT NULL,
      accountName text NOT NULL,
      postDate text NOT NULL,
      postText text NOT NULL,
      postImage text NOT NULL
    )`,
      (err) => {
        if (err) {
          // Table already created
          console.error(err.message);
          throw err;
        } else {
          // Table just created, creating some rows
          const insert =
            "INSERT OR REPLACE INTO Post (accountImage, accountName, postDate, postText, postImage) VALUES (?,?,?,?,?)";

          db.run(insert, [
            "https://avatars.githubusercontent.com/u/4129325?v=4",
            "Manuel Pineda",
            new Date().toDateString(),
            "First Post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "https://static.vecteezy.com/system/resources/previews/012/168/187/non_2x/beautiful-sunset-on-the-beach-with-palm-tree-for-travel-and-vacation-free-photo.JPG",
          ]);

          db.run(insert, [
            "https://avatars.githubusercontent.com/u/4129325?v=4",
            "Manuel Pineda",
            new Date().toDateString(),
            "Second Post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "https://static.vecteezy.com/system/resources/previews/012/168/187/non_2x/beautiful-sunset-on-the-beach-with-palm-tree-for-travel-and-vacation-free-photo.JPG",
          ]);

          db.run(insert, [
            "https://avatars.githubusercontent.com/u/4129325?v=4",
            "Manuel Pineda",
            new Date().toDateString(),
            "Third Post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "https://static.vecteezy.com/system/resources/previews/012/168/187/non_2x/beautiful-sunset-on-the-beach-with-palm-tree-for-travel-and-vacation-free-photo.JPG",
          ]);
        }
      }
    );
    console.log("Succesfully created Post database table!");

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
    console.log("Succesfully created Event database table!");

    // Create Friendship/Followship table
    db.run(
      `CREATE TABLE IF NOT EXISTS Friendship (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      friend_id INTEGER,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES User(id),
      FOREIGN KEY (friend_id) REFERENCES User(id)
    )`,
      (err) => {
        if (err) {
          // Table already created
          console.error(err.message);
          throw err;
        } else {
          // Table just created, creating some rows
          const insert =
            "INSERT OR REPLACE INTO Friendship (user_id, friend_id, status, created_at) VALUES (?,?,?,?)";

          db.run(insert, [3, 4, "accepted", new Date()]);
        }
      }
    );
    console.log("Successfully created Friendship database table!");
  }
});

module.exports = db;

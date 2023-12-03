import express from "express";
import connection from "./config/db.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/api/get", (req, res) => {
  connection.query("SELECT * FROM customer", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log("test tobin");
  });
});

// app.get("/", (req, res) => {
//   res.send("haiiii");
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected to DB as id " + connection.threadId);
// });

// app.get("/api/data", (req, res) => {
//   connection.query("SELECT * FROM customer", (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

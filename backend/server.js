import express from "express";
import connection from "./config/db.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("haiiii");
});

app.get("/api/get", (req, res) => {
  connection.query(
    "SELECT * FROM customer ORDER BY CustomerID DESC",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
      //console.log(result);
    }
  );
});

app.get("/api/data/:id", async (req, res) => {
  console.log("result");
  connection.query(
    "SELECT * FROM customer WHERE ResidentsPermitID = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.post("/api/data", (req, res) => {
  const {
    CustomerName,
    ResidentsPermitID,
    CustomerMobile,
    HouseName,
    AreaNumber,
    StreetNumber,
    StreetName,
    BuildNumber,
    LocationGPS,
    LocationName,
    State,
    District,
    Country,
  } = req.body;

  connection.query(
    "INSERT INTO Customer (CustomerName, ResidentsPermitID, CustomerMobile, HouseName, AreaNumber, StreetNumber, StreetName, BuildNumber, LocationGPS, LocationName, State, District, Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      CustomerName,
      ResidentsPermitID,
      CustomerMobile,
      HouseName,
      AreaNumber,
      StreetNumber,
      StreetName,
      BuildNumber,
      LocationGPS,
      LocationName,
      State,
      District,
      Country,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log();
        res.send({ status: 200 });
      }
    }
  );
});

app.put("/api/data", (req, res) => {
  const {
    CustomerName,
    ResidentsPermitID,
    CustomerMobile,
    HouseName,
    AreaNumber,
    StreetNumber,
    StreetName,
    BuildNumber,
    LocationGPS,
    LocationName,
    State,
    District,
    Country,
  } = req.body;

  const UPDATE_QUERY = `
  UPDATE Customer
  SET 
    CustomerName = ?,
    ResidentsPermitID = ?,
    CustomerMobile = ?,
    HouseName = ?,
    AreaNumber = ?,
    StreetNumber = ?,
    StreetName = ?,
    BuildNumber = ?,
    LocationGPS = ?,
    LocationName = ?,
    State = ?,
    District = ?,
    Country = ?
  WHERE ResidentsPermitID = ?
`;
  connection.query(
    UPDATE_QUERY,
    [
      CustomerName,
      ResidentsPermitID,
      CustomerMobile,
      HouseName,
      AreaNumber,
      StreetNumber,
      StreetName,
      BuildNumber,
      LocationGPS,
      LocationName,
      State,
      District,
      Country,
      ResidentsPermitID,
    ],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send("Success");
      }
    }
  );
});

app.delete("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const DELETE_QUERY = `DELETE FROM customer WHERE ResidentsPermitID = '${id}'`;
  connection.query(DELETE_QUERY, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

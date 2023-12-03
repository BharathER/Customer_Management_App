import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_app",
  /* waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0, */
});

export default connection;

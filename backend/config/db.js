import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_app",
  /* host: "buchy8bncxdeaqxdwxkm-mysql.services.clever-cloud.com",
  user: "u39osxvgeggp8128",
  password: "zd55yarNRPEuNqDv0MTz",
  database: "buchy8bncxdeaqxdwxkm", */
  /* waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0, */
});

export default connection;

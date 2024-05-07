const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const routes = require("C:\\Users\\HP\\Documents\\GitHub\\Proiect-Colectiv\\my-app\\BACKEND\\routes.js"); // Importăm fișierul routes.js

const app = express();

// Middleware pentru a permite comunicarea între server și client
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creăm conexiunea către baza de date utilizând pool-ul de conexiuni
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "pc"
});

// Testăm conexiunea la baza de date
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release();
});
app.use(cors());
// Adăugăm ruta pentru gestionarea cererilor de la client
app.use("/", routes);

// Pornim serverul și îl facem să asculte pe portul 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server starting at port ${PORT}`);
});

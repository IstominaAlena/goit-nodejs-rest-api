const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { DB_HOST } = process.env;
// "mongodb+srv://AlenaIstomina:qc4jNzMGrEfUU0v1@cluster0.hqvqz.mongodb.net/db-contacts?retryWrites=true&w=majority";

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error));

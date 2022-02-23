const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://AlenaIstomina:qc4jNzMGrEfUU0v1@cluster0.hqvqz.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error));

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

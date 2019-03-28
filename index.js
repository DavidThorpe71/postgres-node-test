const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = 7878;
const db = require("./queries");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({ info: "I made an API 🌴✌🌲" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

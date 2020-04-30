const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const app = express();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

/* Signin Users */
app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

/* Register Users */
app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

/* Getting Users */
app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

/* handeling entries count */
app.put("/image", (req, res) => image.handleImage(req, res, db));

app.post("/imageurl", (req, res) => image.handleApiCall(req, res));
app.listen(3001, () => {
  console.log("app is runing");
});

const express = require("express"); //imported express module
const fs = require("fs");
const mongoose = require("mongoose");
// const users = require("./MOCK_DATA.json");
const { timeStamp } = require("console");

const app = express(); //made an instance of express to work upon
const PORT = 8000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/first-app")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
},{timestamps: true});

const User = mongoose.model("user", userSchema);

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// Routes
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

//REST API

app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Priyeranjan"); // Custom Header
  //Always add X to custom headers
  // console.log(req.headers);
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch((req, res) => {
    //TODO: Edit the user with ID
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //TODO: Delete the user with ID
    return res.json({ status: "pending" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.Job_title
  ) {
    return res.status(400).json({ msg: `All feilds are required` });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.Job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "sucess" });
});

app.listen(PORT, () => console.log(`Started server at PORT ${PORT}`));

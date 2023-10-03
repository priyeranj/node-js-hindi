const express = require("express"); //imported express module
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express(); //made an instance of express to work upon
const PORT = 8000;

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

//Routes
// app.get("/api/users", (req, res) => {
//   const html = `
//     <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `;
//   res.send(html);
// });

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
    if(!user) return res.status(404).json({error: "User not found"});
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

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Started server at PORT ${PORT}`));

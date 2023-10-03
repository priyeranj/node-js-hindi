const express = require("express"); //imported express module
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express(); //made an instance of express to work upon
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/api/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

//REST API

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Started server at PORT ${PORT}`));

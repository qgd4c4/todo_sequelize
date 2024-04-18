const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const database = require("./database");

const sequelize = database;

const Todo = sequelize.define("todo", {
  content: { type: Sequelize.STRING, allowNull: false },
  completed: { type: Sequelize.BOOLEAN, defaultValue: false },
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
sequelize
  .sync()
  .then(() => {
    console.log("sequelize connected!");
  })
  .catch((err) => {
    console.log("error!" + err);
  });

app.get("/todo", (req, res, next) => {
  Todo.findAll().then((todoList) => {
    res.send(todoList);
  });
});

app.post("/todo", (req, res, next) => {
  const totoList = Todo.create({ content: req.body.content }).then(() => {
    res.end();
  });
});

app.delete("/todo", (req, res, next) => {
  Todo.destroy({ where: { id: req.body.id } }).then(() => {
    res.end();
  });
});

app.get("/", (req, res, next) => {
  Todo.findAll().then((todoList) => {
    res.render("todo", { todoList: todoList });
  });
});

app.listen(3000, () => {
  console.log("running..");
});

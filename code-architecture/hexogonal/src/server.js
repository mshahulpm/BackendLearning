const express = require("express");
const TodoController = require("./infrastructure/web/TodoController");
const app = express();
app.use(express.json());

const todoController = new TodoController();

app.post("/todos", (req, res) => todoController.create(req, res));
app.get("/todos", (req, res) => todoController.getAll(req, res));
app.put("/todos/:id", (req, res) => todoController.update(req, res));
app.delete("/todos/:id", (req, res) => todoController.delete(req, res));

app.listen(3000, () => console.log("Server running on port 3000"));

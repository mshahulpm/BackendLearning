/*
Hexagonal Architecture To-Do App (Node.js + Express)
*/

// server.js
const express = require("express");
const TodoController = require("./src/infrastructure/web/TodoController");
const app = express();
app.use(express.json());

const todoController = new TodoController();

app.post("/todos", (req, res) => todoController.create(req, res));
app.get("/todos", (req, res) => todoController.getAll(req, res));
app.put("/todos/:id", (req, res) => todoController.update(req, res));
app.delete("/todos/:id", (req, res) => todoController.delete(req, res));

app.listen(3000, () => console.log("Server running on port 3000"));

/*
Domain Layer - Entity
*/

// src/domain/Todo.js
class Todo {
    constructor(id, title, completed = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
module.exports = Todo;

/*
Application Layer - Use Cases
*/

// src/application/use-cases/CreateTodo.js
class CreateTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute(title) {
        const newTodo = new (require("../../domain/Todo"))(
            Date.now().toString(),
            title
        );
        return this.todoRepository.create(newTodo);
    }
}
module.exports = CreateTodo;

// src/application/use-cases/GetTodos.js
class GetTodos {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute() {
        return this.todoRepository.getAll();
    }
}
module.exports = GetTodos;

// src/application/use-cases/UpdateTodo.js
class UpdateTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute(id, title, completed) {
        return this.todoRepository.update(id, title, completed);
    }
}
module.exports = UpdateTodo;

// src/application/use-cases/DeleteTodo.js
class DeleteTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute(id) {
        return this.todoRepository.delete(id);
    }
}
module.exports = DeleteTodo;

/*
Interfaces Layer - Ports
*/

// src/interfaces/TodoRepository.js
class TodoRepository {
    create(todo) { }
    getAll() { }
    update(id, title, completed) { }
    delete(id) { }
}
module.exports = TodoRepository;

/*
Infrastructure Layer - Database Adapter
*/

// src/infrastructure/database/TodoRepositoryMongo.js
const TodoRepository = require("../../interfaces/TodoRepository");
const todos = [];

class TodoRepositoryMongo extends TodoRepository {
    create(todo) {
        todos.push(todo);
        return todo;
    }
    getAll() {
        return todos;
    }
    update(id, title, completed) {
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            todo.title = title;
            todo.completed = completed;
        }
        return todo;
    }
    delete(id) {
        const index = todos.findIndex((t) => t.id === id);
        if (index !== -1) {
            return todos.splice(index, 1);
        }
        return null;
    }
}
module.exports = TodoRepositoryMongo;

/*
Infrastructure Layer - Web Adapter
*/

// src/infrastructure/web/TodoController.js
const CreateTodo = require("../../application/use-cases/CreateTodo");
const GetTodos = require("../../application/use-cases/GetTodos");
const UpdateTodo = require("../../application/use-cases/UpdateTodo");
const DeleteTodo = require("../../application/use-cases/DeleteTodo");
const TodoRepositoryMongo = require("../database/TodoRepositoryMongo");

const todoRepository = new TodoRepositoryMongo();

class TodoController {
    async create(req, res) {
        const createTodo = new CreateTodo(todoRepository);
        const todo = createTodo.execute(req.body.title);
        res.status(201).json(todo);
    }

    async getAll(req, res) {
        const getTodos = new GetTodos(todoRepository);
        res.json(getTodos.execute());
    }

    async update(req, res) {
        const updateTodo = new UpdateTodo(todoRepository);
        const todo = updateTodo.execute(
            req.params.id,
            req.body.title,
            req.body.completed
        );
        res.json(todo);
    }

    async delete(req, res) {
        const deleteTodo = new DeleteTodo(todoRepository);
        res.json(deleteTodo.execute(req.params.id));
    }
}
module.exports = TodoController;

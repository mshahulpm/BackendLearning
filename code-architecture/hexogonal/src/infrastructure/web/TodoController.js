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

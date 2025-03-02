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
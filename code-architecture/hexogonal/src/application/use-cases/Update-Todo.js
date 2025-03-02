class UpdateTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute(id, title, completed) {
        return this.todoRepository.update(id, title, completed);
    }
}
module.exports = UpdateTodo;
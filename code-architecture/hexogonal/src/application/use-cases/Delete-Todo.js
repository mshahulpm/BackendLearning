class DeleteTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute(id) {
        return this.todoRepository.delete(id);
    }
}
module.exports = DeleteTodo;
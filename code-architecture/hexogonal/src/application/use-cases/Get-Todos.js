class GetTodos {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    execute() {
        return this.todoRepository.getAll();
    }
}
module.exports = GetTodos;
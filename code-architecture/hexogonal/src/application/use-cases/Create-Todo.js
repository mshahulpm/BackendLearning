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
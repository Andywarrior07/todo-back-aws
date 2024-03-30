import { Todo as TodoSchema } from '../schemas/todo.schema';
import { Todo } from '../../../../domain/todo';
import { Status } from '../../../../domain/value-objects/todo-status';

export class TodoMapper {
  static toDomain(todo: TodoSchema): Todo {
    const status = new Status(todo.status);

    return {
      id: todo._id,
      title: todo.title,
      description: todo.description,
      status,
    };
  }

  static toPersistence(todo: Todo): TodoSchema {
    return {
      title: todo.title,
      description: todo.description,
      status: todo.status.value,
    };
  }
}

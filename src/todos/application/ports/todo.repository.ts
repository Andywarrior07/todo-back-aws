import { Todo } from '../../domain/todo';
import { Status } from '../../domain/value-objects/todo-status';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<Todo>;
  abstract findAll(
    searchQuery: string,
    page: number,
    pageSize: number,
  ): Promise<Todo[]>;
  abstract findById(id: string): Promise<Todo>;
  abstract update(id: string, status: Status): Promise<Todo>;
  abstract delete(id: string): Promise<void>;
}

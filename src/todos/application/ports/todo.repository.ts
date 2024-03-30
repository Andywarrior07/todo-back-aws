import { Todo } from '../../domain/todo';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<Todo>;
  abstract findAll(): Promise<Todo[]>;
  abstract findById(id: string): Promise<Todo>;
  abstract update(id: string, todo: Todo): Promise<void>;
  abstract delete(id: string): Promise<void>;
}

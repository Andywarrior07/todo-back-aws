import { Injectable } from '@nestjs/common';
import { TodoFactory } from '../domain/factories/todo.factory';
import { TodoRepository } from './ports/todo.repository';
import { Todo } from '../domain/todo';
import { CreateTodoCommand } from './commands/create-todo.command';
import { Status } from '../domain/value-objects/todo-status';
import { TodoStatusEnum } from '../domain/interfaces/todo.interface';

@Injectable()
export class TodosService {
  constructor(
    private readonly repository: TodoRepository,
    private readonly factory: TodoFactory,
  ) {}

  async createTodo(todoData: CreateTodoCommand) {
    const todo: Todo = this.factory.create(
      todoData.title,
      todoData.description,
    );

    return this.repository.save(todo);
  }

  async getTodos() {
    return this.repository.findAll();
  }

  async getTodoById(id: string): Promise<Todo> {
    return this.repository.findById(id);
  }

  async updateTodo(id: string): Promise<Todo> {
    const status = new Status(TodoStatusEnum.DONE);

    return this.repository.update(id, status);
  }

  async deleteTodo(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

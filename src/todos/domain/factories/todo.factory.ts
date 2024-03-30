import { Injectable } from '@nestjs/common';
import { Todo } from '../todo';
import { TodoStatusEnum } from '../interfaces/todo.interface';
import { Status } from '../value-objects/todo-status';

@Injectable()
export class TodoFactory {
  create(title: string, description?: string): Todo {
    return new Todo(title, description, new Status(TodoStatusEnum.TODO));
  }
}
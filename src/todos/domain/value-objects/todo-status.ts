import { TodoStatusEnum } from '../interfaces/todo.interface';

export class Status {
  constructor(readonly value: TodoStatusEnum) {}

  toJSON(): TodoStatusEnum {
    return this.value;
  }
}

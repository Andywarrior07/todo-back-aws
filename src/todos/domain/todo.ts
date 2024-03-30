import { Status } from './value-objects/todo-status';

export class Todo {
  constructor(
    // public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly status: Status,
    public readonly id?: string,
  ) {}
}

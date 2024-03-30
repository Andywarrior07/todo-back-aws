import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { TodoRepository } from '../../../../application/ports/todo.repository';
import { Todo as TodoSchema, TodoDocument } from '../schemas/todo.schema';
import { Todo } from '../../../../domain/todo';
import { TodoMapper } from '../mappers/todo.mapper';
import { Status } from '../../../../domain/value-objects/todo-status';

@Injectable()
export class OdmTodoRepository implements TodoRepository {
  constructor(
    @InjectModel(TodoSchema.name)
    private readonly model: Model<TodoDocument>,
  ) {}

  async findAll(
    searchQuery: string = '',
    page: number = 1,
    pageSize: number = 10,
  ): Promise<Todo[]> {
    const pipeline = [];

    if (searchQuery) {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
            { status: { $regex: searchQuery, $options: 'i' } },
          ],
        },
      });
    }

    pipeline.push({ $skip: (page - 1) * pageSize });
    pipeline.push({ $limit: pageSize });

    const todos: TodoSchema[] = await this.model.aggregate(pipeline);

    return todos.map((todo: TodoSchema) => TodoMapper.toDomain(todo));
  }

  async findById(id: string): Promise<Todo> {
    const todo: TodoSchema = await this.model.findById(id).lean();

    return TodoMapper.toDomain(todo);
  }

  async save(todoData: Todo): Promise<Todo> {
    const persistenceModel: TodoSchema = TodoMapper.toPersistence(todoData);
    const todo = new this.model(persistenceModel);

    return TodoMapper.toDomain(await todo.save());
  }

  async update(id: string, status: Status): Promise<Todo> {
    const todo = await this.findById(id);
    const persistenceModel: TodoSchema = TodoMapper.toPersistence({
      ...todo,
      status,
    });
    const updatedTodo: TodoSchema = await this.model
      .findByIdAndUpdate(id, persistenceModel, { new: true })
      .lean();

    return TodoMapper.toDomain(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

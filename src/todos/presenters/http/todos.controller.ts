import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TodosService } from '../../application/todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CreateTodoCommand } from '../../application/commands/create-todo.command';
import { Todo } from '../../domain/todo';
import { QueryDto } from './dto/query.dto';

@Controller('/todos')
export class TodosController {
  constructor(private readonly service: TodosService) {
  }

  @Post('/')
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.service.createTodo(
      new CreateTodoCommand(createTodoDto.title, createTodoDto.description),
    );
  }

  @Get('/')
  async getTodos(@Query() queryDto: QueryDto): Promise<Todo[]> {
    return this.service.getTodos(
      queryDto.searchQuery,
      queryDto.page,
      queryDto.pageSize,
    );
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.service.getTodoById(id);
  }

  @Patch('/:id')
  async updateTodo(@Param('id') id: string): Promise<Todo> {
    return this.service.updateTodo(id);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    return this.service.deleteTodo(id);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodosService } from '../../application/todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CreateTodoCommand } from '../../application/commands/create-todo.command';

@Controller('/todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Post('/')
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.service.createTodo(
      new CreateTodoCommand(createTodoDto.title, createTodoDto.description),
    );
  }

  @Get('/')
  async getTodos() {
    return this.service.getTodos();
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string) {
    return this.service.getTodoById(id);
  }
}

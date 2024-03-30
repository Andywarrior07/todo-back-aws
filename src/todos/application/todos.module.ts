import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from '../presenters/http/todos.controller';
import { TodoFactory } from '../domain/factories/todo.factory';
import { TodosInfrastructureModule } from '../infrastructure/todos-infrastructure.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodoFactory],
  imports: [TodosInfrastructureModule],
})
export class TodosModule {}

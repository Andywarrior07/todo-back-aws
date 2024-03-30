import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoRepository } from '../../../application/ports/todo.repository';
import { OdmTodoRepository } from './repositories/todo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema}])
  ],
  providers: [
    {
      provide: TodoRepository,
      useClass: OdmTodoRepository,
    },
  ],
  exports: [TodoRepository],
})
export class OdmTodoPersistenceModule {}

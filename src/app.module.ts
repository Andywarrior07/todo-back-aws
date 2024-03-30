import { Module } from '@nestjs/common';
import { TodosModule } from './todos/application/todos.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

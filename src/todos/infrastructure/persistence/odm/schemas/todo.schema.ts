import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoStatusEnum } from '../../../../domain/interfaces/todo.interface';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Todo {
  _id?: string;

  @Prop({ type: String, required: true})
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, enum: TodoStatusEnum, default: TodoStatusEnum.TODO })
  status: TodoStatusEnum;
}

export type TodoDocument = HydratedDocument<Todo>;
export const TodoSchema = SchemaFactory.createForClass(Todo);

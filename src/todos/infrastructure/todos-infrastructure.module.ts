import { Module } from '@nestjs/common';
import { OdmTodoPersistenceModule } from './persistence/odm/odm-persistence.module';

@Module({
  imports: [OdmTodoPersistenceModule],
  exports: [OdmTodoPersistenceModule],
})
export class TodosInfrastructureModule {}

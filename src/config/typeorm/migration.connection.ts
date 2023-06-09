import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...(typeOrmConfig as any),
});

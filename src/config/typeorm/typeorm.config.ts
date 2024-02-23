import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const typeOrmConfig = {
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'postgres',
  entities: [`${__dirname}/../../entities/**/*{.ts,.js}`],
  migrations: [`${__dirname}/../../../migrations/{DDL,DML}/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
};

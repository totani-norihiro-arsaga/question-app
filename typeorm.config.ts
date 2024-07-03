import { DataSource } from "typeorm";

export default new DataSource({
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  database: 'question',
  username: 'user',
  password: 'password',
  entities: ['dist/**/entities/**/*.entity.js'],
  migrations: ['dist/**/migrations/**/*.js'],
  logging: true,
});
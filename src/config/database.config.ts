export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'mysql',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'user',
    password: process.env.DATABASE_PASSWORD || 'password',
    name: process.env.DATABASE_NAME || 'question',
  },
});

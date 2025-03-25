import { defineConfig } from 'drizzle-kit';
import './envConfig.ts';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: `${process.env.DATABASE_URL}`,
  },
});

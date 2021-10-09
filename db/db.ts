import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//       rejectUnauthorized: false
//   }
// });

console.log(`
  user: ${process.env.DB_USER},
  host: ${process.env.DB_HOST},
  database: ${process.env.DB_NAME},
  password: ${process.env.DB_PASS},
  port: 5432,
`);

export const pool =
  process.env.NODE_ENV === "production"
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: 5432,
      });

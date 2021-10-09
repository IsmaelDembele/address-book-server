import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Host
//     ec2-54-208-96-16.compute-1.amazonaws.com
// Database
//     da2tuir33aq13l
// User
//
// Port
//     5432
// Password
//     781f71ad03d26ee33501e5f7483e4bf46e7fd1b4afb24f54b040f9ab1b637f77
// URI
//     postgres://mbwidxlrnbigfj:781f71ad03d26ee33501e5f7483e4bf46e7fd1b4afb24f54b040f9ab1b637f77@ec2-54-208-96-16.compute-1.amazonaws.com:5432/da2tuir33aq13l
// Heroku CLI
//     heroku pg:psql postgresql-amorphous-02034 --app server-address-book

// export const pool = new Pool({
//   user: "mbwidxlrnbigfj",
//   host: "ec2-54-208-96-16.compute-1.amazonaws.com",
//   database: "da2tuir33aq13l",
//   password: "781f71ad03d26ee33501e5f7483e4bf46e7fd1b4afb24f54b040f9ab1b637f77",
//   port: 5432,
// });

console.log(`
  user: ${process.env.DB_USER},
  host: ${process.env.DB_HOST},
  database: ${process.env.DB_NAME},
  password: ${process.env.DB_PASS},
  port: 5432,
`);

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

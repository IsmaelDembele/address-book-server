import { pool } from "../db/db";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IContact {
  id: number;
  useremail: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  note: string;
}

export interface IDecoded {
  email: string;
  firstname: string;
  lastname: string;
  iat: number;
  exp: number;
}

export const readQuery = async (query: string) => {
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("readQuery", err);
  }
};
export const readQuery2 = async (query: { text: string; values: string[] }) => {
  try {
    const res = await pool.query(query);
    // console.log(res.rows);

    return res.rows;
  } catch (err) {
    console.error("readQuery", err);
  }
};

export const addUser = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string
) => {
  const query = {
    text: "INSERT INTO users(email, firstname, lastname, password) VALUES($1, $2, $3, $4)",
    values: [email, firstname, lastname, password],
  };

  try {
    const res = await pool.query(query);
    return res;
  } catch (err) {
    console.error("readQuery", err);
    return "ERROR";
  }
};

export const addContact = async (
  useremail: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  note: string
) => {
  const query = {
    text: "INSERT INTO contacts(useremail, firstname, lastname, email, phone, address, note) VALUES($1, $2, $3, $4,$5,$6,$7)",
    values: [useremail, firstname, lastname, email, phone, address, note],
  };

  try {
    const res = await pool.query(query);
    return res;
  } catch (err) {
    console.error("readQuery", err);
    return "ERROR";
  }
};

export const deleteContact = async (useremail: string, id: number) => {
  const query = {
    text: "DELETE FROM contacts WHERE useremail = $1 AND id = $2",
    values: [useremail, id],
  };

  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("readQuery", err);
    return "ERROR";
  }
};

export const getContact = async (userEmail: string): Promise<IContact[]> => {
  const query = {
    text: "SELECT * FROM contacts WHERE userEmail = $1",
    values: [userEmail],
  };

  try {
    const res = await pool.query(query);

    return res.rows;
  } catch (err) {
    console.error("readQuery", err);
    return [];
  }
};

export const deleteUser = async (email: string) => {
  const query = {
    text: "DELETE FROM users WHERE email = $1",
    values: [email],
  };

  readQuery2(query);
};

export const updateUser = async (newUser: IUser) => {
  const query = {
    text: `UPDATE users
           SET email = $1,
               firstname = $2,
               lastname = $3,
               password = $4  WHERE email = User.email`,
    values: [newUser.email, newUser.firstname, newUser.lastname, newUser.password],
  };

  readQuery2(query);
};

export const findUserByEmail = async (email: string) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  return readQuery2(query);
};

export const createUserTable = async () => {
  const query = `
    CREATE TABLE users (
        email varchar primary key,
        firstname varchar,
        lastname varchar,
        password varchar
    )
    `;

  return readQuery(query);
};

export const createContactTable = async () => {
  const query = `
    CREATE TABLE contacts (
        id serial primary key,
        userEmail varchar references users (email),
        firstname varchar,
        lastname varchar,
        email varchar,
        phone varchar,
        address varchar,
        note varchar
    )
    `;

  return readQuery(query);
};

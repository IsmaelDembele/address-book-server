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

export const executeMutation = async (query: { text: string; values: (string | number)[] }) => {
  try {
    const res = await pool.query(query);
    return "success";
  } catch (err: any) {
    console.error(err?.detail);
    return err.detail;
  }
};

export const executeQuery = async (query: string) => {
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error(err);
  }
};

export const executeQueryWithParameters = async (query: { text: string; values: string[] }) => {
  try {
    const res = await pool.query(query);

    return res.rows;
  } catch (err) {
    console.error(err);
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

  return await executeMutation(query);
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

  return await executeMutation(query);
};

export const deleteContact = async (useremail: string, id: number) => {
  const query = {
    text: "DELETE FROM contacts WHERE useremail = $1 AND id = $2",
    values: [useremail, id],
  };

  return await executeMutation(query);
};

export const getContact = async (userEmail: string): Promise<IContact[]> => {
  const query = {
    text: "SELECT * FROM contacts WHERE userEmail = $1",
    values: [userEmail],
  };

  try {
    const res = await pool.query(query);

    return res.rows;
  } catch (err: any) {
    console.error("executeQuery", err);
    return [
      {
        id: -1,
        useremail: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        note: "",
      },
    ];
  }
};

export const findUserByEmail = async (email: string) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  return await executeQueryWithParameters(query);
};

//////////////////////////////////////////////////////////////////////////////////////////////////
//additional function not use in the code

export const deleteUser = async (email: string) => {
  const query = {
    text: "DELETE FROM users WHERE email = $1",
    values: [email],
  };

  executeQueryWithParameters(query);
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

  return executeQuery(query);
};

export const createContactTable = async () => {
  const query = `
    CREATE TABLE contacts (
        id serial primary key,
        useremail varchar references users (email),
        firstname varchar,
        lastname varchar,
        email varchar,
        phone varchar,
        address varchar,
        note varchar
    )
    `;

  return executeQuery(query);
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

  executeQueryWithParameters(query);
};

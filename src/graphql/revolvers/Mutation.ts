// import { v4 } from "uuid";
import { addUser, findUserByEmail, addContact } from "../../utils";
import { IUser } from "./Query";
import bcrypt from "bcryptjs";
import { IContact } from "../../utils";

export const Mutation = {
  addUser: async (parent: any, { firstname, lastname, email, password }: IUser, ctx: any) => {
    const encryptedPwd = await bcrypt.hash(password, 12);

    if (!encryptedPwd) return false;

    const test = await addUser(email, firstname, lastname, encryptedPwd);
    // console.log(test !== "ERROR");

    return test !== "ERROR";
  },

  addContact: async (
    parent: any,
    { userEmail, firstname, lastname, email, phone, address, note }: IContact,
    ctx: any
  ) => {
    const test = await addContact(userEmail, firstname, lastname, email, phone, address, note);

    return test !== "ERROR";
  },
};

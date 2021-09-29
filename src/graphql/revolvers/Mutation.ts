import { addUser, addContact, deleteContact, IDecoded } from "../../utils";
import jwt from "jsonwebtoken";
import { IUser } from "./Query";
import bcrypt from "bcryptjs";
import { IContact } from "../../utils";
import dotenv from "dotenv";

dotenv.config();

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
    { useremail, firstname, lastname, email, phone, address, note }: IContact,
    ctx: any
  ) => {
    const test = await addContact(useremail, firstname, lastname, email, phone, address, note);

    return test !== "ERROR";
  },
  deleteContact: async (
    parent: any,
    { token, id }: { token: string; id: number },
    ctx: any
  ): Promise<boolean> => {
    try {
      const decoded = <IDecoded>jwt.verify(token, process.env.JWT_SECRET!);
      const { email }: { email: string } = decoded;
      const done = await deleteContact(email, id);
      return done !== "ERROR";
    } catch (error) {
      console.log("Invalid token", error);
      return false;
    }
  },
};

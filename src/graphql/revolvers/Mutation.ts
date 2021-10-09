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
    let result = "";
    result = await addUser(email, firstname, lastname, encryptedPwd);

    if (result !== "success") {
      console.log(result);
      
      throw new Error(result);
    }

    return result === "success";
  },

  addContact: async (
    parent: any,
    { useremail, firstname, lastname, email, phone, address, note }: IContact,
    ctx: any
  ) => {
    const result = await addContact(useremail, firstname, lastname, email, phone, address, note);

    if (result !== "success") {
      throw new Error(result);
    }

    return result !== "success";
  },
  deleteContact: async (
    parent: any,
    { token, id }: { token: string; id: number },
    ctx: any
  ): Promise<boolean> => {
    let decoded: IDecoded;

    try {
      decoded = <IDecoded>jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return false;
    }

    const { email }: { email: string } = decoded;
    const done = await deleteContact(email, id);
    if (done !== "success") {
      throw new Error(done);
    }

    return true;
  },
};

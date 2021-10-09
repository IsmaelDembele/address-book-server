import jwt from "jsonwebtoken";
import { findUserByEmail, getContact, IContact, IDecoded } from "../../utils";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contacts: string[];
}

export const Query = {
  login: async (
    parent: any,
    { email, password }: { email: string; password: string },
    ctx: any
  ): Promise<string> => {
    if (email.length === 0 || password.length < 5) return "";

    const user = await findUserByEmail(email);
    console.log('users inside loggin',users);
    
    if (!user || user[0]?.email !== email) return "";

    let token = "";
    let err = [];

    if (await bcrypt.compare(password, user[0].password)) {
      // the username, password combination is successful
      try {
        token = jwt.sign(
          {
            email: user[0].email,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
          },
          process.env.JWT_SECRET!,
          { expiresIn: 24 * 60 * 60 * 1000 }
        );
      } catch (error) {
        err.push(error);
      }
    }

    if (err.length > 0) {
      throw new Error("can't generate a sign in token");
    }
    return token;
  },
  
  getContacts: async (
    parent: any,
    { useremail }: { useremail: string },
    ctx: any
  ): Promise<IContact[]> => {
    const contacts = await getContact(useremail);

    if (contacts.length > 0 && contacts[0].id === -1) {
      throw new Error("error trying to get contact list");
    }
    return contacts;
  },

  verifyToken: async (
    parent: any,
    { token, useremail }: { token: string; useremail: string },
    ctx: any
  ): Promise<boolean> => {
    if (token.length === 0 || useremail.length === 0) {
      return false;
    }

    let decoded: IDecoded;

    try {
      decoded = <IDecoded>jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      console.log("Invalid token");
      return false;
    }

    const { email }: { email: string } = decoded;
    return email === useremail;
  },
};

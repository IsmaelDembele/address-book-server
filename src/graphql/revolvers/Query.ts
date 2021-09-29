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
  user: (parent: any, args: { email: string }, { users }: { users: IUser[] }) => {
    return users.find(user => {
      return user.email === args.email;
    });
  },

  login: async (
    parent: any,
    { email, password }: { email: string; password: string },
    ctx: any
  ): Promise<string> => {
    if (email.length === 0 || password.length < 5) return "";

    const user = await findUserByEmail(email);

    if (!user || user[0]?.email !== email) return "";

    let token = "";

    if (await bcrypt.compare(password, user[0].password)) {
      // the username, password combination is successful

      token = jwt.sign(
        {
          email: user[0].email,
          firstname: user[0].firstname,
          lastname: user[0].lastname,
        },
        process.env.JWT_SECRET!,
        { expiresIn: 24 * 60 * 60 * 1000 }
      );
    }

    console.log();

    return token;
  },
  getContacts: async (
    parent: any,
    { useremail }: { useremail: string },
    ctx: any
  ): Promise<IContact[]> => {
    const contacts = await getContact(useremail);
    return contacts;
  },

  verifyToken: async (
    parent: any,
    { token, useremail }: { token: string; useremail: string },
    ctx: any
  ): Promise<boolean> => {
    if (token.length === 0 || useremail.length === 0) {
      console.log("return false");
      return false;
    }

    try {
      const decoded = <IDecoded>jwt.verify(token, process.env.JWT_SECRET!);
      const { email }: { email: string } = decoded;

      console.log(email === useremail);

      return email === useremail;
    } catch (error) {
      console.log("Invalid token");
      return false;
    }
  },
};

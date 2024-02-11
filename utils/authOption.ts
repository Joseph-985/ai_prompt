import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
import { UserModel } from "@models/user_model";

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: !process.env.GOOGLE_ID ? "" : process.env.GOOGLE_ID,
      clientSecret: !process.env.GOOGLE_CLIENT_SECRET
        ? ""
        : process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await UserModel.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser?._id.toString();
      return session;
    },

    async signIn({ profile }: any) {
      try {
        await connectToDatabase();
        //check if user already exist//
        const userExists = await UserModel.findOne({ email: profile.email });

        //if not exist//

        if (!userExists) {
          await UserModel.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    },
  },
};

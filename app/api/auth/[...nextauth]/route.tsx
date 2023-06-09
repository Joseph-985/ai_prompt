import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
// import User from "@models/user_schema";
import { UserModel } from "@models/user_model";

const handler: NextAuthOptions = NextAuth({
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
      console.log("prof", profile);
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
});

export { handler as GET, handler as POST };

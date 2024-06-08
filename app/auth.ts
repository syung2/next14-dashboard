import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "./libs/utils";
import { User } from "./libs/model";
import bcrypt from "bcrypt";

const login = async (credentials: any) => {
  try {
    connectToDB();
    console.log("111111");
    const user = await User.findOne({ username: credentials.username });
    console.log("22222");

    if (!user) throw new Error("User not found");
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Password is incorrect");
    return user;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};
export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      const { token, user }: { token: any; user: any } = params;
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    async session(params) {
      const { session, token }: { session: any; token: any } = params;
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
  },
});

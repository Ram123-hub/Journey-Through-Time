
import connect from "@/lib/dbconfig/dbconfig";
import { User } from "@/lib/models/user";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connect();

        const finduser = await User.findOne({ email: user.email });
        if (finduser) {
          return true;
        }

        // Handle the case where the account is from a provider like Google
        if (account?.provider === 'google') {
          await User.create({ name: user.name, email: user.email });
        } else {
          // For credentials provider, ensure password is included
          if (!credentials?.password) {
            throw new Error('Password is required for local sign up');
          }
          await User.create({ name: user.name, email: user.email, password: credentials.password });
        }
        
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "Nextauth",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          if (!credentials) {
            return null;
          }

          await connect();

          const user = await User.findOne({ email: credentials.email });
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

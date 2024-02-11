import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

//⏭⏭[Firebase and NextAuth]⏭⏭ we need all the code from this file ... also all the code from here we can find it on the 'NextAuth.js' file at 'getting started' section ... we changed the import for GitHub to 'GoogleProvider', to realize the connection with Google account/email/gmail === also down we change the 'githubProvider' to 'GoogleProvider'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  // 🚦🚥[SIGN IN]🚦🚥 👇 laso note that if we have more 'providers'/SIGN IN methods we need to import in the 'signin.js' file the 'import {getProviders, signIn} from 'next-auth'', 'getProviders' will give the possibility to Sign In with multiple platforms
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
});

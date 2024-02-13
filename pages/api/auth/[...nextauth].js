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

  //👩‍🏫👩‍🏫[DYNAMIC PROFILE DATA]👩‍🏫👩‍🏫
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase(); //here we are splitting the name with space, than we bring them back togheter with no space and than we make them lower case for the username
      session.user.uid = token.sub; //'token.sub' is the id that GOOGLE gives us
      return session; //IN FACT❗❗❗ here we are adding the 'username' and the 'uid=user id' inside of the [array] provided by GOOGLE, and from there we will use those data to display them inside our app, side by PORILE IMG//// ❗❗❗❗❗❗also NOTE that the 'username' is created by the name that is specifie above with .split.join.tolocalelowercase()... but normally you must create a method that the user can create his own 'username', dynamically
    },
  }, //👩‍🏫👩‍🏫[DYNAMIC PROFILE DATA]👩‍🏫👩‍🏫 'callbacks' is also offered by NextAuth to make change on data from all our app. for more info's about this ask ChatGPT
});

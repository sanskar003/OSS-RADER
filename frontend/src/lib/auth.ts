import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          login: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.id = profile.id;
        token.login = profile.login;
        token.name = profile.name;
        token.email = profile.email;
        token.avatar_url = profile.avatar_url;
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure session.user exists
      if (session.user) {
        session.accessToken = token.accessToken as string;
        (session.user as any).id = token.id;
        (session.user as any).login = token.login;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.avatar_url as string;
      }
      return session;
    },
  },
};

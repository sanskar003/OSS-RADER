import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      login: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: number;
    login?: string;
    name?: string;
    email?: string;
    avatar_url?: string;
  }
}

declare module "next-auth" {
  interface Profile {
    id: number;
    login: string;
    avatar_url: string;
    name?: string;
    email?: string;
  }
}

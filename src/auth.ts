import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { checkUser } from './firestore/helper/auth';

export const authConfig = {
  pages: {
    signIn: '/admin',
  },
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLogIn = !!auth?.user;
      const protectedPath = ['/feedback'];
      const isProtected = protectedPath.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected) {
        if (isLogIn && auth?.user?.email) {
          return true;
        }

        return Response.redirect(new URL('/admin', nextUrl));
      }

      return true;
    },
  },
  providers: [Google],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

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
          //TODO: 권한관리
          // const isRegistered = await checkUser({ email: auth.user.email });
          // if (isRegistered) {
          //   return true;
          // }
        }

        return Response.redirect(new URL('/admin', nextUrl)); // 로그인하지 않은 사용자
      }

      return true;
    },
  },
  providers: [Google],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

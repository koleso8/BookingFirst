import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
   {
    id: "telegram",
    name: "Telegram",
    type: "credentials",
    credentials: {},
    async authorize(credentials, req) {
      const { id, first_name, last_name, photo_url }:any = req.query;
      if (id && first_name) {
        return {
          id,
          name: `${first_name} ${last_name || ""}`,
          image: photo_url || null,
        };
      }
      return null;
    },
  },
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Це місце для валідації облікових даних користувача
        // Для демонстрації використовуємо тестового користувача
        if (credentials?.email === "demo@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }

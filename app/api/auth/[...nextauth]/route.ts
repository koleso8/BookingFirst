import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    // Видалено Google провайдер
    // Залишаємо тільки Telegram (імітація) та Credentials
    {
      id: "telegram",
      name: "Telegram",
      type: "oauth",
      // Це спрощена імітація Telegram OAuth для демонстрації
      // В реальному додатку потрібно використовувати справжню інтеграцію з Telegram Login Widget
      authorization: "https://oauth.telegram.org/auth",
      token: "https://oauth.telegram.org/token",
      userinfo: "https://oauth.telegram.org/userinfo",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.first_name + " " + profile.last_name,
          image: profile.photo_url,
        }
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

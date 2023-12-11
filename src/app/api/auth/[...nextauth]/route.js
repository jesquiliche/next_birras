import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "admin@test.com" },
        password: { label: "Password", type: "password",placeholder:"admin_password" },
      },
     
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_AUTH}login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
    
        
        if (res.status==401) {
            console.log(res.status) 
            throw new Error("Credenciales no validas");
            return;
        }
        
        const data = await res.json();
        
        return {
          user:data.user,
          authorization: data.authorization
        };
        

      },
    }),
   
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token,...user };
    },
    async session({ session, token }) {
      session.user = token;
      
      return session;
    },
  },
  pages: {
   // signIn: "/login",
    signOut: '/'
  }


});

export { handler as GET, handler as POST };

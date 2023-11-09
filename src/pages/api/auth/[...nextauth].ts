import { Login } from "@/utils/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProviders({
            type: "credentials",
            name: "credentials",
            credentials: {
                email: {label: "email", type: "email", placeholder: "Email anda"},
                password: {label: "password", type: "password", placeholder: "Password anda"},
            },
            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await Login({ email });
                if(user){
                    const confPassword = await compare(password, user.password);
                    if(confPassword){
                        return user;
                    }
                    return null
                }else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt({token, account, profile, user}: any) {
            if(account?.provider === "credentials") {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            return token
        },

        async session({ session, token }: any) {
            if("email" in token) {
                session.user.email = token.email; 
            }
            if("fullname" in token) {
                session.user.fullname = token.fullname; 
            }
            if("role" in token) {
                session.user.role = token.role; 
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    }
};

export default NextAuth(authOptions);
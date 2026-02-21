import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({

    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"},
            },
            async authorize(credentials){
                const isValid= credentials?.email === process.env.ADMIN_EMAIL && credentials?.password === process.env.ADMIN_PASSWORD

                if(isValid){
                    return{id:"1",name:'Admin',email:process.env.ADMIN_EMAIL};
                }else{
                    return null;
                }
                                         
            }
        })
    ],
    pages:{
        signIn:'/login',
       
    },
    
    secret:process.env.NEXTAUTH_SECRET,
   
});

export {handler as GET,handler as POST};

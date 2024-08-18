import conf from "../config/conf.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.account= new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
           const userAccount= await this.account.create(ID.unique(),email,password,name)
           if (userAccount) {
            // return call another function
            return this.login({email,password})
           } else {
            // 
           }
        } catch (error) {
            console.log("error in creating account",error);
            throw error;
        }
    } 

    async login({email,password}){
        try {
            const loginAccount=await this.account.createEmailPasswordSession(email,password)
            return loginAccount
        } catch (error) {
             console.log()
             throw error;
             
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log();
            throw error;
        }
        // return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log();
            throw error;
            
        }
    }

}



const authService = new AuthService()

export default authService
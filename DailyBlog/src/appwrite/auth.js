import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class Authentification {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async verifySession() {
        try {
            const session = await this.account.getSession('current');
            const user = await this.account.get();
            return { session, user };
        } catch (error) {
            console.log(error);
            throw new Error("Invalid session or missing permissions");
        }
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // Small delay for account propagation
            await new Promise(resolve => setTimeout(resolve, 300));

            const session = await this.account.createEmailPasswordSession(email, password);
            await this.verifySession(); // Full verification

            return { userAccount, session };
        } catch (error) {
            console.error("Account creation failed:", error);
            throw error;
        }
    }

    
    async login({ email, password }) {
        try {
            await this.account.deleteSessions();
            const session = await this.account.createEmailPasswordSession(email, password);

            // Verify session is actually usable
            const { user } = await this.verifySession();
            return { session, user };
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }


    async getCurrentUser() {
        try {
            const { user } = await this.verifySession();
            return user;
        } catch {
            return null;
        }
    }

    async logout() {
        try{
            await this.account.deleteSessions()

            return true
        } catch(err) {
            console.log("logout failed ", err)
            throw err ;
        }
    }

}

const authentification = new Authentification();
export default authentification;
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

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password, 
                name
            );
            
            if (userAccount) {
                // Directly create session after account creation
                try {
                    return await this.account.createEmailPasswordSession(email, password);
                } catch (sessionError) {
                    // Session creation failed but account was created
                    console.error("Session creation error:", sessionError);
                    return userAccount;
                }
            }
            return userAccount;
        } catch (error) {
            console.error("Appwrite Create Account Error:", error);
            throw error; // Throw original error
        }
    }

    async login({ email, password }) {
        try {
            // Clear any existing sessions first
            await this.account.deleteSessions();
            
            // Directly create new session (no need to check current session)
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.error("Appwrite login Error:", error);
            throw error; // Throw original error
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite logout Error:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("Appwrite getCurrentUser Error:", error);
            return null; // Return null instead of throwing when not authenticated
        }
    }
}

const authentification = new Authentification();
export default authentification;
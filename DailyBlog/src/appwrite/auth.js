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
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //return to the login page
                return this.login({ email, password })
            } else {
                return userAccount;
            }

        } catch (error) {
            console.error("Appwrite Create Account Error:", error);
            throw new Error("Failed to create account. Please try again.");
        }
    }

    async login({ email, password }) {
        try {
            const logedin = await this.account.createEmailSession(email, password);
            return logedin;
        }

        catch (error) {
            console.error("Appwrite login Error:", error);
            throw new Error("Failed to login. Please try again.");
        }
    }
    

    async logout() {
        try {
            const logedout = await this.account.deleteSessions();
            return logedout;
        }

        catch (error) {
            console.error("Appwrite logout Error:", error);
            throw new Error("Failed to log out. Please try again.");
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user
        }
        catch (error) {
            console.error("Appwrite Error:", error);
            throw new Error("Failed to get current user. Please try again.");
        }
    }
}

const authentification = new Authentification()

export default authentification
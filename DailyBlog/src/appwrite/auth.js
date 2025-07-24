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
            // Get session
            const session = await this.account.getSession('current');
            if (!session) {
                const loggedIn = await this.account.createEmailPasswordSession(email, password);
                console.log("User logged in:", loggedIn);
                return loggedIn;
            }
            return session;
        }

        catch (error) {
            console.error("Appwrite login Error:", error);
            throw new Error("Failed to login. Please try again.");
        }
    }


    async logout() {
        try {
            const loggedOut = await this.account.deleteSessions();
            return loggedOut;
        }

        catch (error) {
            console.error("Appwrite logout Error:", error);
            throw new Error("Failed to log out. Please try again.");
        }
    }

    async getCurrentUser() {
        try {

            // First create a session
            await this.account.createEmailPasswordSession('user@example.com', 'password');

            // Now this will work
            const user = await this.account.get();
            console.log(user);

        }
        catch (error) {
            console.error("Appwrite Error:", error);
            throw new Error("Failed to get current user. Please try again.");
        }
    }
}

const authentification = new Authentification()

export default authentification
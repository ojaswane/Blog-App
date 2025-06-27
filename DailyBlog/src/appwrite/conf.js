import config from "../config/config";
import { Client, Storage, ID, Databases, Query } from "appwrite";

export class Services {
    client = new Client;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases;
        this.storage = new Storage;

    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabasId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch (error) {
            console.error("Failed to create post because : ", error);
            throw new Error("Failed to create Post. Please try again.");
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.storage.createFile(
                config.appwriteDatabasId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                })
        }

        catch (error) {
            console.error("Failed to update post because : ", error);
            throw new Error("Failed to update post. Please try again.");
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabasId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch (error) {
            console.error("Failed to delete post because : ", error);
            throw new Error("Failed to delete post. Please try again.");
        }

    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabasId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Failed to get post because : ", error);
            throw new Error("Failed to get post. Please try again.");
        }

    }

    async getPosts(Query) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabasId,
                config.appwriteCollectionId,
                Query
            )
        } catch (error) {
            console.error("Failed to get post because : ", error);
            throw new Error("Failed to get post. Please try again.");
        }

    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const services = new Services();
export default services
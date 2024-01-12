import envImport from "../envImport";
import { Client, Databases, ID, Query } from "appwrite";

export class DataBaseService{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(envImport.appwriteUrl)
        .setProject(envImport.appwriteProjectId);
        this.databases = new Databases(this.client);
    }


    async createDoc(Title, Description, userId, image){
        try {
            return await this.databases.createDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                ID.unique(),
                {
                    Title,
                    Description,
                    userId,
                    image
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createDoc :: error", error);
        }
    }


    async deleteDoc(id){
        try {
            await this.databases.deleteDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                id
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteDoc :: error", error);
            return false
        }
    }

    async getDoc(id){
        try {
            return await this.databases.getDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log("Appwrite serive :: getDoc :: error", error);
            return false
        }
    }

    async getDocs(offset){
        try {
            return await this.databases.listDocuments(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId,
                [
                    Query.limit(500),
                    Query.offset(offset)
                ]
            )
        } catch (error) {
            console.log("Appwrite serive :: getDocs :: error", error);
            return false
        }
    }

    async CreateBinDoc(Title, Description, userId, image) {
        try {
            return await this.databases.createDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
                ID.unique(),
                {
                    Title,
                    Description,
                    userId,
                    image
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: CreateBinDoc :: error", error);
        }
    }
    async getBinDocs(offset){
        try {
            return await this.databases.listDocuments(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
                [
                    Query.limit(500),
                    Query.offset(offset)
                ]
            )
        } catch (error) {
            console.log("Appwrite serive :: getBinDocs :: error", error);
            return false
        }
    }

    async getBinDoc(id){
        try {
            return await this.databases.getDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
                id
            )
        } catch (error) {
            console.log("Appwrite serive :: getBinDoc :: error", error);
            return false
        }
    }

    async deleteBinDoc(id){
        try {
            await this.databases.deleteDocument(
                envImport.appwriteDatabaseId,
                envImport.appwriteCollectionId2,
                id
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteBinDoc :: error", error);
            return false
        }
    }
}

const dataBaseService = new DataBaseService()
export default dataBaseService
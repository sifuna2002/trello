import {Client,ID, Account, Databases, Storage} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64805c383470ad99fc50') 

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export {client, account, database, storage,ID};
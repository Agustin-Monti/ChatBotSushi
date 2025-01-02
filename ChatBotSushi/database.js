import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
const dbName = 'chatbot_sushi';

async function connectToDatabase() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  return db;
}

export default connectToDatabase;

import { MongoClient } from "mongodb";

const { NEXT_PUBLIC_DB_URI, NEXT_PUBLIC_DB } = process.env;

if (!NEXT_PUBLIC_DB_URI) {
  throw new Error(
    "Please define the NEXT_PUBLIC_DB_URI environment variable inside .env.local"
  );
}

if (!NEXT_PUBLIC_DB) {
  throw new Error(
    "Please define the NEXT_PUBLIC_DB environment variable inside .env.local"
  );
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(NEXT_PUBLIC_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db =  client?.db(NEXT_PUBLIC_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
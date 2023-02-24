import { MongoClient, MongoClientOptions } from "mongodb";

async function createTable(
  uri: string,
  dbName: string,
  collectionName: string
): Promise<void> {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions);
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.createCollection(collectionName);
  } finally {
    await client.close();
  }
}

async function updateTableThroughput(
  uri: string,
  dbName: string,
  collectionName: string,
  readCapacityUnits: number,
  writeCapacityUnits: number
): Promise<void> {
  // This function is not applicable to MongoDB
  throw new Error("updateTableThroughput is not applicable to MongoDB");
}

export { createTable, updateTableThroughput };

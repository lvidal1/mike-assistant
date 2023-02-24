import { MongoClient, MongoClientOptions } from "mongodb";

interface UsageService {
  service: string;
  time: number;
  total_characters: number;
  date?: string;
}

class MongoDB {
  private static instance: MongoDB;
  private client: MongoClient;
  private dbName: string;

  private constructor(uri: string, dbName: string) {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);
    this.dbName = dbName;
  }

  static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      const uri = process.env.MONGO_URI;
      const dbName = process.env.MONGO_DB_NAME;
      if (!uri || !dbName) {
        throw new Error(
          "MongoDB URI and database name must be provided in environment variables."
        );
      }
      MongoDB.instance = new MongoDB(uri, dbName);
    }
    return MongoDB.instance;
  }

  public async createTable(collectionName: string): Promise<void> {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);
      await db.createCollection(collectionName);
    } finally {
      await this.client.close();
    }
  }

  public async add(collection: string, usage: UsageService): Promise<string> {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);

      const date = new Date().toISOString().slice(0, 16).replace("T", " ");
      const result = await db
        .collection(collection)
        .insertOne({ ...usage, date });

      if (!result.insertedId) {
        throw new Error(
          "Failed to add usage record. " + JSON.stringify(result)
        );
      }

      return "Usage record added successfully.";
    } finally {
      await this.client.close();
    }
  }

  // public async getAverageTime(): Promise<number> {
  //   try {
  //     await this.client.connect();
  //     const db = this.client.db(this.dbName);

  //     const result = await db
  //       .collection("tts_usage")
  //       .aggregate([{ $group: { _id: null, averageTime: { $avg: "$time" } } }])
  //       .toArray();
  //     return result[0].averageTime;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     await this.client.close();
  //   }
  // }

  // public async getSumCharacters(property): Promise<number> {
  //   try {
  //     await this.client.connect();
  //     const db = this.client.db(this.dbName);

  //     const result = await db
  //       .collection("tts_usage")
  //       .aggregate([
  //         { $group: { _id: null, sumChars: { $sum: "$total_characters" } } },
  //       ])
  //       .toArray();
  //     return result[0].sumChars;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     await this.client.close();
  //   }
  // }
}

export default MongoDB;

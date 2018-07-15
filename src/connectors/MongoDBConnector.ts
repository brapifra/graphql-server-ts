import { MongoClient, Db } from "mongodb";
import Config from "../configs/MongoDBConnector";

class MongoDBConnector {
  private static URL: string = process.env.MONGO_URL || Config.URL;
  private static DB: string = process.env.MONGO_DB || Config.DB;
  private static connection: MongoClient;
  private static db: Db;

  public static async connect() {
    this.connection = await MongoClient.connect(this.URL, { useNewUrlParser: true });
    this.db = this.connection.db(this.DB);
    if (Config.VOLATILE) {
      this.db.dropDatabase();
    }
    console.log("Connected to MongoDB");
  }

  public static close() {
    if (this.isConnected()) {
      this.connection.close();
    }
  }

  public static isConnected() {
    return this.connection ? this.connection.isConnected() : false;
  }

  public static collection(collectionName: string) {
    if (!this.isConnected()) {
      throw new Error("Database unavailable!");
    }
    return this.db.collection(collectionName);
  }
}

export default MongoDBConnector
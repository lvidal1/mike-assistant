import dotenv from "dotenv";
import MongoDB from "../db/mongo";
import { createTable } from "./mongo-db";

dotenv.config();

const collectionName = "tts_usage";

const run = async () => {
  // await createTable(
  //   process.env.MONGO_URI || "",
  //   process.env.MONGO_DB_NAME || "",
  //   collectionName
  // );
  //const a = await MongoDB.getInstance().getSumCharacters();
  //console.log(a);
};

run();

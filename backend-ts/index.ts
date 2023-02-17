import dotenv from "dotenv";
import App from "./app";

dotenv.config();

const app = new App(parseInt(process.env.PORT));

app.listen();

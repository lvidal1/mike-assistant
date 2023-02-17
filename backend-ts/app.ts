import express, { Application } from "express";
import cors from "cors";

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middleware();
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}

export default App;

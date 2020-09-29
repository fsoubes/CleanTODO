import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
const path = require("path");
const router = require("../Router/createRouter")();
const compression = require("compression");

export class App {
  port: number | string;
  app: express.Application;
  constructor(port: number | string) {
    this.port = port;
    this.app = express()
      .use(cors())
      .use(compression())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(express.static(path.join(__dirname, "build")))
      .use("/", router)
      .get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "build", "index.html"));
      });
  }

  async start() {
    try {
      this.app.listen(this.port, () => {
        if (process.env.NODE_ENV !== "production") {
          console.log(`[SERVER] Running at port ${this.port}`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

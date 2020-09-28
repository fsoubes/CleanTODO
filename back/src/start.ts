import { App } from "./Server/app";
import { Database } from "./Database/createDatabase";

const port = process.env.PORT || 3000;
let uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.1t7w3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const server = new App(port);
const database = new Database(uri);

async function start() {
  try {
    await database.connect();
    await server.start();
  } catch (err) {
    console.log(err);
  }
}

start();

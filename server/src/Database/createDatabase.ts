const mongoose = require("mongoose");

export class Database {
  uri: string | undefined;
  connection: any;
  constructor(uri: string | undefined) {
    this.uri = uri;
    this.connection = mongoose.connetion;
  }
  async connect() {
    try {
      //`mongodb+srv://${s3.config.MONGO_USER}:${s3.config.MONGO_PASSWORD}@fsoweb-gys6c.mongodb.net/${s3.config.MONGO_DB}?retryWrites=true&w=majority`
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      new Error(error);
    }
  }
  async deconnect() {
    mongoose.close();
  }
}

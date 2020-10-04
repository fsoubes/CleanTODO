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
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    } catch (error) {
      new Error(error);
    }
  }
  async deconnect() {
    mongoose.close();
  }
}

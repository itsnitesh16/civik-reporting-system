const mongoose = require("mongoose");

const globalMongoose = global.mongoose || { conn: null, promise: null };

global.mongoose = globalMongoose;

async function connectToDatabase() {
  if (globalMongoose.conn) {
    return globalMongoose.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  if (!globalMongoose.promise) {
    globalMongoose.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    globalMongoose.conn = await globalMongoose.promise;
  } catch (error) {
    globalMongoose.promise = null;
    throw error;
  }

  return globalMongoose.conn;
}

module.exports = connectToDatabase;

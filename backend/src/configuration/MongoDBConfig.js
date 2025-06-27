import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

const DBConnect = async () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log(`Connected to Mongodb with URI: ${MONGODB_URL}`);
    })
    .catch((err) => new Error(`Error while connecting to MongooDB\n ${err}`));
};

export default DBConnect;

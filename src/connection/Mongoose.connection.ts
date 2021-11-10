import mongoose from "mongoose";

let connectionString =
  "mongodb://goolps:goolps@34.135.245.225:27017";

if (process.env.NODE_ENV === "test") {
  connectionString =
    "mongodb://goolps:goolps@34.135.245.225:27017";;
}

const MongooseConnection = {
  connect: async () => {
    try {
      const connectionRequest = await mongoose.connect(connectionString);
      return connectionRequest.connection;
    } catch (error) {
      console.error("Unable to connect to database", error);
    }
  },
};

export default MongooseConnection;

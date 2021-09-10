import mongoose from "mongoose";

let connectionString = "mongodb://localhost:27017/goolps";

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

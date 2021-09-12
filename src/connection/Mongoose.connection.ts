import mongoose from "mongoose";

let connectionString = (process.env.MONGOOSE_URI as string);

if (process.env.NODE_ENV == "test") {
  connectionString = "mongodb://localhost:27017/testDb";
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

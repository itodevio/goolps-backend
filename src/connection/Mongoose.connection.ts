import mongoose from "mongoose";

let connectionString = process.env.MONGOOSE_URI;

if (process.env.NODE_ENV === "test") {
  connectionString = process.env.MONGOOSE_URI;
}
if (process.env.NODE_ENV === "local") {
  connectionString = "mongodb://localhost:27017/goolps";
}

const MongooseConnection = {
  connect: async () => {
    try {
      const connectionRequest = await mongoose.connect(
        connectionString as string
      );
      return connectionRequest.connection;
    } catch (error) {
      console.error("Unable to connect to database", error);
    }
  },
};

export default MongooseConnection;

import mongoose from "mongoose";

let connectionString =
  "mongodb+srv://Ito:mamasbeef@goolpsdb.psbyu.mongodb.net/goolps?retryWrites=true&w=majority";

if (process.env.NODE_ENV === "test") {
  connectionString =
    "mongodb+srv://Ito:mamasbeef@goolpsdb.psbyu.mongodb.net/testGoolps?retryWrites=true&w=majority";;
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

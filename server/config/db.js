import mongoose from "mongoose";

export const connectDB = () => {
  const MONGOURL = process.env.MONGOURL;

  mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log(`Database is connected : ${mongoose.connection.host} `);
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
      process.exit(1);
    });
};

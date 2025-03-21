import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.route.js";

import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/products", productRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server connetion successful in port : ${PORT}`);
});

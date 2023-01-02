// console.log("store api");
require("dotenv").config();
require("express-async-errors");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error");
const productsRouter = require("./routes/products");
// async errors

const express = require("express");
const connectDB = require("./connection");
const app = express();

// middleware
app.use(express.json());

// routes
app.get("/", (req, res, next) => {
  res.send(
    "<h1>Welcom to Store API</h1><a href='/api/v1/products'>Products Route<a/>"
  );
});

app.use("/api/v1/products", productsRouter);

// products routes

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server starting on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();

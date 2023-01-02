require("dotenv").config();
const connectDB = require("./connection");
const Product = require("./model/products");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    console.log("err >>", error);
    process.exit(1);
  }
};
start();

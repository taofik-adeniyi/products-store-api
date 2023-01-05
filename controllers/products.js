const Product = require("../model/products");

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured =
      (featured === "true") | (featured === true) ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    console.log("numericFilters", numericFilters);
    const opearatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${opearatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log("filters", filters);
  }
  console.log("queryObject", queryObject);

  let result = Product.find(queryObject);
  if (sort) {
    console.log(typeof sort);
    const sortList = sort.split(",").join(" "); // sort and sortlist are the same
    console.log("sortlist: " + typeof sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsLists = fields.split(",").join(" ");
    result = result.select(fieldsLists);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //   console.log(queryObject);
  const products = await result;
  res.status(202).json({ nbHits: products.length, products });
};
const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  //   const products = await Product.find({});
  //   const products = await Product.find({ name: "dining table" });
  //sort and regex
  //   const products = await Product.find({
  //     name: { $regex: search, $options: "i" },
  //   }).sort("-name price");
  // select by property
  //   const products = await Product.find({
  //     name: { $regex: search, $options: "i" },
  //   }).select("name price");

  //limit
  //   const products = await Product.find({}).limit(10);

  //skip
  // const products = await Product.find({
  //   price: {
  //     $gt: 30,
  //   },
  // }).skip(10);
  const products = await Product.find({}).skip(10);
  //   throw new Error("testing async errors");
  res.send({
    nbHits: products.length,
    msg: products,
  });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

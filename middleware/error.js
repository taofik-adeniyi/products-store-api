// const { CustomAPIError } = require("../errors/custom-error");
// const errorHandlerMiddleware = (err, req, res, next) => {
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message });
//   }
//   return res.status(500).json({ msg: "something went wrong!" });
// };
const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  res.status(500).json({ msg: "Something went wrong, pls try again!" });
};

module.exports = errorHandlerMiddleware;

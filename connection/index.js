const mongoose = require('mongoose')
// 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1'
// 'mongodb://127.0.0.1:27017/'
const connectionString = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1/tasks-manager'
const connectionStringTwo = 'mongodb://127.0.0.1:27017/'
mongoose.set('strictQuery', true)
// mongoose.connect(connectionString,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=> {
//     console.log("Connected to Mongoose DB server");
// }).catch(function(error) {
//     console.log("Error connecting to DB server: " + error);
// });
// const connectionStringSecondary = 'mongodb+srv://taofik:oauujcle@localhost:27017/task-manager'

const connectDB = (url) => {
    return mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=> {
    console.log("Connected to Mongo DB server");
})
}
module.exports = connectDB

// console.log(
//     'Hello, Mongoose'
// );
// , { 
//     useNewUrlParser: true, 
//     useCreateIndex: true, 
//     useFindAndModify: false, 
//     useUnifiedTopology: true 
// }
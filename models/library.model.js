const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {console.log("Connected to MongoDB")});

let librarySchema = new mongoose.Schema({                                    
  title: String,
  comments: [String]
});

module.exports = mongoose.model('Library', librarySchema);
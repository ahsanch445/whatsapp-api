const mongoose = require("mongoose");

const url ="mongodb://ahsanch:ahsanch@ac-wq8q6z9-shard-00-00.iueoiik.mongodb.net:27017,ac-wq8q6z9-shard-00-01.iueoiik.mongodb.net:27017,ac-wq8q6z9-shard-00-02.iueoiik.mongodb.net:27017/ahsan?ssl=true&replicaSet=atlas-yh7jn7-shard-0&authSource=admin&retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Call the function to connect to MongoDB
connectToDatabase();

module.exports = mongoose;

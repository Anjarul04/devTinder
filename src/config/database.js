
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://anjarul:anjarul12345@namastenode-shard-00-00.gtiij.mongodb.net:27017,namastenode-shard-00-01.gtiij.mongodb.net:27017,namastenode-shard-00-02.gtiij.mongodb.net:27017/devTinder?tls=true&authSource=admin",
  );
};

module.exports = { connectDB };


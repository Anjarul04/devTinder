const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anjarul:anjarul12345@namastenode.gtiij.mongodb.net/devTinder"
  );
};

module.exports = {connectDB};

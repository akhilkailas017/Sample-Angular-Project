// models/Person.js
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model("Person", personSchema);

const mongoose = require("mongoose");

const NestingSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  ParentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref:'Nesting'
  },
});

module.exports = mongoose.model('Nesting', NestingSchema)

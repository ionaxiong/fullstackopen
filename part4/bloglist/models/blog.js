const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const blogSchema = new mongoose.Schema({
  author: {type: String, required: true}, 
  title: {type: String, required: true, unique: true},
  url: {type: String, required: true, unique: true},
  likes: {type: Number, required: true},
  //expand to contain info about the user who created it
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.plugin(uniqueValidator);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);

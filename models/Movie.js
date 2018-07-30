const mongoose = require('mongoose');

// define a schema for the movie model
// this and all other models inherit from mongoose.Schema

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please enter movie title',
  },
  director: {
    type: String,
    required: 'Please enter publisher',
  },
  imageUrl: {
    type: String,
    required: 'Please enter URL of movie cover image',
  },
  year: {
    type: Number,
  },
});

// before it is saved, it will run this function
movieSchema.pre('save', function (next) {
  
  this.year = this.imageUrl.substr(-4);
  next();
});

movieSchema.methods.lastUrl = function () {
  const indexOfSlash = this.imageUrl.lastIndexOf('/');
  return this.imageUrl.substring(indexOfSlash + 1);
};

module.exports = mongoose.model('movie', movieSchema);

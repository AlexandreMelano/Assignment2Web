const mongoose = require('mongoose');
//const findOrCreate = require('mongoose-findorcreate');

/*refenrece passport-local-mongoose to make this model usable for managing users*/
const passportLocalMongoose = require('passport-local-mongoose');

/*create model schema */
const userSchema = new mongoose.Schema({})
userSchema.plugin(passportLocalMongoose);
//userSchema.plugin(findOrCreate);


module.exports = mongoose.model('User', userSchema);
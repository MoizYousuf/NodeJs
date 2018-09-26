var mongoose = require('mongoose');
var Schema = mongoose.Schema

userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});
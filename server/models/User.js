const mongoose = require('mongoose');
const { Schema } = mongoose;  //same as: const Schema = mongoose.Schema;

const userSchema = new Schema({     //describes the properties of Schema
    googleId: String                //Google ID property
});

mongoose.model('users', userSchema);    //users is the collection name
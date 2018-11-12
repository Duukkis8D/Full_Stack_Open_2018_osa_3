const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGOLAB_URI;

mongoose.connect(uri, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
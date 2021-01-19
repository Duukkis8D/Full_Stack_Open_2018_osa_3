const mongoose = require('mongoose');

if ( process.env.NODE_ENV !== 'production' ) {
    const dotenv = require('dotenv');
    dotenv.config();
}

const uri = process.env.MONGOLAB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
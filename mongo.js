const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGOLAB_URI;

const programArguments = process.argv;

mongoose.connect(uri, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const Person = mongoose.model('Person', personSchema);

if (programArguments[2] !== undefined && programArguments[3] !== undefined) {
    const person = new Person({
        name: programArguments[2],
        phone: programArguments[3]
    });
    person
        .save()
        .then(person => {
            console.log(`Lisätään henkilö ${person.name} numero ${person.phone} luetteloon`);
            mongoose.connection.close();
        });
} else if (programArguments[2] === undefined && programArguments[3] === undefined) {
    Person
        .find({})
        .then(result => {
            console.log('puhelinluettelo:');
            result.forEach(person => {
                console.log(person.name, person.phone);
            });
            mongoose.connection.close();
        });
}

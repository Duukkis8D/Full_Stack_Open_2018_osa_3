const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('tiny'));

let persons = [
    {
        "name": "Arto Hellas",
        "phone": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "phone": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "phone": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "phone": "040-123456",
        "id": 4
    }
];

let info = {
    numberOfPersons: `Puhelinluettelossa ${persons.length} henkilön tiedot`,
    date: new Date()
};

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).send('Person not found');
    }
});

app.get('/info', (req, res) => {
    res.send(info.numberOfPersons + '<br></br>' + info.date);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter( person => person.id !== id );

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    if (req.body.name === undefined) {
        return res.status(400).json({ error: 'please provide a name' });
    } else if (req.body.phone === undefined) {
        return res.status(400).json({ error: 'please provide a phone number' });
    } else if (persons.find( person => person.name === req.body.name ) !== undefined) {
        return res.status(400).json({ error: 'please provide a unique name' });
    }

    const id = Math.floor( Math.random() * Math.floor(1000000) );
    const person = req.body;
    person.id = id;
    persons = persons.concat(person);

    res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
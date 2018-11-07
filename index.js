const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

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

app.get('/info', (req, res) => {
    res.send(info.numberOfPersons + '<br></br>' + info.date);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
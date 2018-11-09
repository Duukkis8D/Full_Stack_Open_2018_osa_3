import React from 'react';
import PersonsList from './components/PersonsList';
import Filter from './components/Filter';
import AddPerson from './components/AddPerson';
import Notification from './components/Notification';
import personsService from './services/persons';
import './css/App.css'
import './css/PersonsList.css';
import './css/Notification.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            newName: '',
            newPhoneNumber: '',
            search: '',
            showAll: true,
            message: ''
        };
    }

    componentDidMount() {
        personsService
            .getAll()
            .then(response => {
                this.setState({ persons: response });
            });
    }

    addPerson = (event) => {
        event.preventDefault();

        /* [0] vaaditaan targetissa:
        https://forum.freecodecamp.org/t/getting-an-input-value-when-form-is-submitted-react/161870 */
        let foundDuplicate = false;
        this.state.persons.forEach(function(person) {
            if (person.name === event.target[0].value || person.phone === event.target[1].value) {
                foundDuplicate = true;
            }
        });

        if (foundDuplicate === false) {
            this.addPersonToServer(event);
            this.setState({ message: `Lisättiin ${event.target[0].value}` });
            setTimeout(() => {
                this.setState({ message: '' });
            }, 5000);
        }
    };

    addPersonToServer = (event) => {
        const person = {
            name: event.target[0].value,
            phone: event.target[1].value
        };
        personsService
            .create(person)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: '',
                    newPhoneNumber: ''
                });
            });
    };

    removePerson = (personID, personName) => {
        return () => {
            if (window.confirm(`Poistetaanko ${personName} ?`)) {
                personsService.remove(personID);
                this.setState({
                    persons: this.state.persons.filter(person => person.id !== personID),
                    message: `Poistettiin ${personName}`
                });
                setTimeout(() => {
                    this.setState({ message: '' });
                }, 5000);
            }
        }
    };

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value });
    };

    handlePhoneNumberChange = (event) => {
        this.setState({ newPhoneNumber: event.target.value });
    };

    handleSearch = (event) => {
        this.setState({
            search: event.target.value,
            showAll: false
        });
        if (event.target.value === '') this.setState({ showAll: true })
    };

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.message}/>
                <Filter search={this.state.search} handleSearch={this.handleSearch}/>
                <form onSubmit={this.addPerson}>
                    <AddPerson newName={this.state.newName}
                               newPhoneNumber={this.state.newPhoneNumber}
                               handleNameChange={this.handleNameChange}
                               handlePhoneNumberChange={this.handlePhoneNumberChange}/>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <PersonsList persons={this.state.persons}
                             showAll={this.state.showAll}
                             search={this.state.search}
                             removePerson={this.removePerson}/>
            </div>
        )
    }
}

export default App
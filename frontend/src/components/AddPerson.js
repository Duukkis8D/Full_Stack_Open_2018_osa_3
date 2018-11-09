import React from 'react';

const AddPerson = (props) => {
    return (
        <div>
            nimi: <input value={props.newName} onChange={props.handleNameChange}/>
            numero: <input value={props.newPhoneNumber} onChange={props.handlePhoneNumberChange}/>
        </div>
    );
};

export default AddPerson
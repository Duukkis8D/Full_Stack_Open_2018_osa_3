import React from 'react';

const Filter = (props) => {
    return (
        <div>
            rajaa näytettäviä: <input value={props.search} onChange={props.handleSearch}/>
            <br></br>
        </div>
    );
};

export default Filter
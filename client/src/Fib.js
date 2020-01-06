import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = (props) => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');
    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: index
        });
        setIndex('');
    }

    async function fetchValues() {
        const values = await axios.get('/api/values/current');
        setValues(values.data);
    }
    async function fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        setSeenIndexes(seenIndexes.data);
    }
    function renderSeenIndexes() {
        return seenIndexes.map(({ number }) => number).join(', ');
    }
    function renderValues() {
        const entries = [];
        for (let key in values) {
            entries.push(
                <div key={key}>For index {key} I calculated {values[key]}</div>
            );
        }
        return entries;
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Enter your index:</label>
                <input
                    type="text"
                    value={index}
                    onChange={event => setIndex(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}
            <h3>Calculated Values:</h3>
            {renderValues()}
        </div>
    );
}

export default Fib;
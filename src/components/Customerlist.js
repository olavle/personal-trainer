import React, { useState, useEffect } from 'react';

const Customerlist = () => {
    const [customers, setCustomers] = useState([]);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(responseJson => setCustomers(responseJson.content))   //HUOM .content
        .catch(err => console.error(err));
    };

    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <div>
            <h1>Hello Customerlist</h1>
        </div>
    )
}

export default Customerlist;
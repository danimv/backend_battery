import React, { useEffect, useState } from 'react';
import api from './api';


const Hola = () => {  
    const [data, setData] = useState(null);
    useEffect(() => {
        // Make the request to the server when the component mounts
        api.get('/config')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <p>Hola... {data}</p>
        </div>
    );
};

export default Hola;


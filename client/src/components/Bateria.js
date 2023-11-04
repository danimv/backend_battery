import React, { useState, useEffect } from 'react';
import api from './api';

const Bateria = () => {
    const [newData, setNewData] = useState(null);

    const updateValue = (data) => {
        let parsedResult = data;
        let text = document.getElementById('text');
        text.style.fontWeight = 'bold';
        const led = document.getElementById('led');
        text.innerHTML = ordreToText(parsedResult.ordre);
        led.style.backgroundColor = (parsedResult.ordre === 1) ? "blue" : (parsedResult.ordre === 2) ? "green" : "red";
        setTimeout(() => {
            text.innerHTML = '...';
            text.style.fontWeight = 'normal';
            led.style.backgroundColor = 'grey';
        }, 3000);

    };

    function ordreToText(ordre) {
        return (ordre === 1) ? "Acumula" : (ordre === 2) ? "Injecta" : "Espera";
    }

    const fetchData = () => {
        api.get('/bateria')  // Make a request to the server to get the updated value
            //   .then(response => response.json())
            .then(data => {
                data.data !== null && setNewData(JSON.parse(data.data));
                data.data !== null && updateValue(JSON.parse(data.data));
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []); // Empty dependency array means this effect runs only on component mount

    return (
        <div>
            <div className="col-12" style={{ textAlign: 'center' }}>
                <h4 style={{ color: 'rgb(9, 120, 231)', paddingTop: '1%', paddingBottom: '1%' }}>
                    {/* <img src="imatges/battery.png" width="55" height="50" alt="Prosum" style={{ display: 'inline-block' }} /> */}
                    CONTROL BATERIA COMUNITÀRIA
                </h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3%' }}>
                <div className="led" id="led" style={{
                    width: '25px',
                    height: '25px',
                    backgroundColor: 'grey',
                    borderRadius: '50%',
                    display: 'inline-block'
                }}></div>
                <p id="text" style={{ marginLeft: '2%', marginTop: '1%', display: 'inline-block' }}></p>
            </div>
            <div className="table-responsive">
                {newData !== null ? (
                    <table id="tableF" className="table table-bordered" style={{ fontSize: '90%' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Hora</th>
                                <th scope="col">kW potència</th>
                                <th scope="col">kW consum</th>
                                <th scope="col">Nivell bateria</th>
                                <th scope="col">Ordre</th>
                                <th scope="col">Interval</th>
                                <th scope="col">Histeresis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{newData.date}</td>
                                <td>{newData.potencia}kW</td>
                                <td>{newData.consum}kW</td>
                                <td>{newData.nivellBateria}kW</td>
                                <td>{ordreToText(newData.ordre)}</td>
                                <td>{newData.interval / 1000}s</td>
                                <td>{newData.histeresis}%</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Bateria;

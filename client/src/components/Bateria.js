import React, { useState, useEffect } from 'react';
import api from './api';

const Bateria = () => {
    const [dataBateria, setData] = useState(null);

    const updateValue = (newData) => {
        console.log(dataBateria.ordre);
        let parsedResult = newData;
        if (parsedResult.date !== dataBateria) {
            let text = document.getElementById('text');
            text.style.fontWeight = 'bold';
            const led = document.getElementById('led');
            text.innerHTML = ordreToText(parsedResult.ordre);
            led.style.backgroundColor = (parsedResult.ordre === 1) ? "blue" : (parsedResult.ordre === 2) ? "green" : "red";
            setTimeout(() => {
                text.innerHTML = '...';
                text.style.fontWeight = 'normal';
                led.style.backgroundColor = 'grey';
            }, 4000);
        }
    };

    function ordreToText(ordre) {
        return (ordre === 1) ? "Acumula" : (ordre === 2) ? "Injecta" : "Espera";
    }

    const fetchData = () => {
        api.get('/bateria')  // Make a request to the server to get the updated value
            //   .then(response => response.json())
            .then(data => {
                console.log(data);
                data.data !== null && setData(JSON.parse(data.data));
                dataBateria !== null && updateValue(dataBateria);
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
                {dataBateria !== null ? (
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
                                <td>{dataBateria.date}</td>
                                <td>{dataBateria.potencia}kW</td>
                                <td>{dataBateria.consum}kW</td>
                                <td>{dataBateria.nivellBateria}kW</td>
                                <td>{ordreToText(dataBateria.ordre)}</td>
                                <td>{dataBateria.interval}s</td>
                                <td>{dataBateria.histeresis}%</td>
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

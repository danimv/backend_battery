import React, { useState, useEffect } from 'react';
import api from './api';

const Bateria = () => {
    const [data, setData] = useState(null);

    const updateValue = (newData) => {
        console.log(newData);
        let parsedResult = JSON.parse(newData);
        if (parsedResult.date !== data) {
            let text = document.getElementById('text');
            text.style.fontWeight = 'bold';
            const led = document.getElementById('led');
            text.innerHTML = parsedResult.text;
            led.style.backgroundColor = 'green';
            setTimeout(() => {
                text.innerHTML = 'esperant ordre...';
                text.style.fontWeight = 'normal';
                led.style.backgroundColor = 'red';
            }, 2000);
        }
        setData(parsedResult.date);
    };

    const fetchData = () => {
        api.get('/bateria')  // Make a request to the server to get the updated value
            //   .then(response => response.json())
            .then(data => {
                // console.log(data);
                data.data !== null && updateValue(data.data);
            })
            .catch(error => console.error('Error:', error));
    };

    function getOrdre(newData){
        const result = (newData.ordre === 1) ? "Acumula" : (newData.ordre === 2) ? "Injecta" : "Espera";
        return result;
    }

    useEffect(() => {
        const interval = setInterval(fetchData, 4000);
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
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    display: 'inline-block'
                }}></div>
                <p id="text" style={{ marginLeft: '3%', marginTop: '1%', display: 'inline-block' }}></p>
            </div>
            <div className="table-responsive">
                {data !== null ? (
                    <table id="tableF" className="table table-bordered" style={{ fontSize: '90%' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Hora</th>
                                <th scope="col">kW potència</th>
                                <th scope="col">kW consum</th>
                                <th scope="col">Interval</th>
                                <th scope="col">Histeresis</th>
                                <th scope="col">Ordre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.date}</td>  
                                <td>{data.potencia}kW</td>                              
                                <td>{data.consum}kW</td> 
                                <td>{data.nivellBateria}kW</td> 
                                <td>{data.ordre}</td>                               
                                <td>{data.interval}s</td>
                                <td>{data.histeresis}%</td>
                                <td>{data.automatic}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <a href={`/usuaris/edituser/`} type="button" className="btn btn-light btn">
                                        <i className="bi bi-pencil"></i> Edita
                                    </a>
                                </td>
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

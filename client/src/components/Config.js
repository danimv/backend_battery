import React, { useEffect, useState } from 'react';
import api from './api'; 

const BatteryConfig = ({ rows }) => {   
    const [data, setData] = useState(null);
    useEffect(() => {
        // Make the request to the server when the component mounts
        api.get('/config')
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    return (
        <div>
            <div>{data}</div>
            <div className="col-12" style={{ textAlign: 'center' }}>
                <h4 style={{ color: 'rgb(9, 120, 231)', paddingTop: '1%', paddingBottom: '1%' }}>
                    <img src="imatges/battery.png" width="55" height="50" alt="Prosum" />
                    CONFIGURACIÓ BATERIA COMUNITÀRIA
                </h4>
            </div>
            <div>
                <p id="consumKw" style={{ fontSize: '80%' }}>
                    <b>Consum comunitat</b> kW <b>Bateria</b>kW
                </p>
            </div>
            <div className="table-responsive">
                <table id="tableF" className="table table-bordered" style={{ fontSize: '90%' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Hora</th>
                            <th scope="col">% consum</th>
                            <th scope="col">kW consum</th>
                            <th scope="col">Interval</th>
                            <th scope="col">Histeresis</th>
                            <th scope="col">Automatic</th>
                            <th scope="col" style={{ textAlign: 'center' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.hora}:00</td>
                                <td>{row.consum}%</td>
                                <td id="kW">{row.consum * row.consumKw}kW</td>
                                <td>{row.interval}s</td>
                                <td>{row.histeresis}%</td>
                                <td>{row.automatic}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <a href={`/usuaris/edituser/`} type="button" className="btn btn-light btn">
                                        <i className="bi bi-pencil"></i> Edita
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center' }}>
                    <a style={{ fontSize: '100%' }} href="/usuaris/edituser/" type="button" className="btn btn-light btn">
                        <i style={{ fontSize: '115%' }} className="bi bi-plus-circle"></i> Afegeix hora
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BatteryConfig;


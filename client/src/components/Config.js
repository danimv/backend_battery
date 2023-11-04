import React, { useEffect, useState } from 'react';
import api from './api';

const BatteryConfig = ({ rows }) => {
    const [data, setData] = useState(null);
    const [editMode, setEditMode] = useState(null);
    useEffect(() => {
        // Make the request to the server when the component mounts
        api.get('/config')
            .then(response => {
                setData(response.data.rows);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleInputChange = (e, rowIndex, colIndex) => {
        const newData = [...data];
        newData[rowIndex][colIndex] = e.target.value;
        setData(newData);
    };

    const handleEditRow = (rowIndex) => {
        setEditMode(rowIndex);
        console.log(editMode);
    };

    const handleSave = () => {
        setEditMode(null);
        console.log(data);
        // Add code to save the edited data (e.g., send it to the server)
    };

    return (
        <div>
            <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                <div style={{ fontSize: '110%', textAlign: 'center', color: 'rgb(9, 120, 231)', marginLeft: '6%', paddingTop: '1%', paddingBottom: '1%', display: 'inline-block' }}>
                    {/* <img src="imatges/battery.png" width="55" height="50" alt="Prosum" /> */}
                    <b>Curva consum</b>
                </div>
                {data !== null ? (
                    <div style={{ marginRight: '6%', textAlign: 'center', display: 'inline-block' }}>
                        <table style={{ backgroundColor: '#f7f7f7', borderRadius: '15px', padding: '3%' }}>
                            <thead>
                                <tr style={{ color: 'rgb(9, 120, 231)' }}>                                    
                                    <th>Potència bateria</th>
                                    <th>Consum comunitat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr key={row.id}>
                                        {Object.keys(row).map((col, colIndex) => {
                                            if (rowIndex === 0 && (colIndex === 6 || colIndex === 7)) { // Check for columns 8 and 9
                                                return (
                                                    <td key={colIndex}>
                                                        {editMode === rowIndex && col !== 'hora' ? (
                                                            <input
                                                                type="text"
                                                                value={row[col]}
                                                                onChange={(e) => handleInputChange(e, rowIndex, col)}
                                                                style={{ width: '30%' }}
                                                            />
                                                        ) : (
                                                            col === 'hora' ? `${row[col]}:00` : col === 'consum' ? `${row[col]}% (${row[col] * row['consumKw']}kW)` : col === 'interval' ? `${row[col]}s` : col === 'histeresis' ? `${row[col]}s` : row[col]
                                                        )}
                                                    </td>
                                                );
                                            } else {
                                                return null; // Skip rendering for other columns
                                            }
                                        })}
                                        <td>
                                            {rowIndex === 0 && editMode === rowIndex ? (
                                                <button onClick={() => handleSave()}>Save</button>
                                            ) : rowIndex === 0 ? (
                                                <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="table-responsive">
                {data !== null ? (
                    <table id="tableF" className="table table-bordered" style={{ fontSize: '90%' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Hora</th>
                                <th scope="col">Consum</th>
                                <th scope="col">Interval</th>
                                <th scope="col">Histeresis</th>
                                <th scope="col">Automatic</th>
                                <th scope="col" style={{ textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={row.id}>
                                    {Object.keys(row).map((col, colIndex) => {
                                        if (colIndex > 0 && colIndex < Object.keys(row).length - 2) {
                                            return (
                                                <td key={colIndex}>
                                                    {editMode === rowIndex && col !== 'hora' ? (
                                                        <input
                                                            type="text"
                                                            value={row[col]}
                                                            onChange={(e) => handleInputChange(e, rowIndex, col)}
                                                            style={{ width: '30%' }}
                                                        />
                                                    ) : (
                                                        col === 'hora' ? `${row[col]}:00` : col === 'consum' ? `${row[col]}% (${row[col] * row['consumKw']}kW)` : col === 'interval' ? `${row[col]}s` : col === 'histeresis' ? `${row[col]}s` : row[col]
                                                    )}
                                                </td>
                                            );
                                        } else {
                                            return null; // Skip rendering for the columns to hide
                                        }
                                    })}
                                    <td>
                                        {editMode === rowIndex ? (
                                            <button onClick={() => handleSave()}>Save</button>
                                        ) : (
                                            <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default BatteryConfig;


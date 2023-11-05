import React, { useEffect, useState } from 'react';
import api from './api';

const BatteryConfig = () => {
    const [data, setData] = useState(null);
    const [editModeTable1, setEditMode1] = useState(null);
    const [editModeTable2, setEditMode2] = useState(null);

    // fetch('/config')
    //     .then(response => response.json())
    //     .then(data => {
    //         setData(data.data.rows);
    //     });

    useEffect(() => {
        // Make the request to the server when the component mounts
        api.get('/configuracio')
            .then(response => {
                // console.log(response.data);
                response.data !== null && setData(response.data);
            })
            .catch(error => {
                console.error('Error getting data from nodejs server:', error);
            });
    }, []);

    const handleInputChange = (e, rowIndex, colIndex, copy) => {
        const newValue = e.target.value;
        let rowMin = 0;
        let rowMax = 0;
        // eslint-disable-next-line no-unused-expressions
        copy === 1 ? (rowMin = 0, rowMax = data.length) : (rowMin = rowIndex, rowMax = rowIndex + 1);
        setData(prevData => {
            const newDataCopy = [...prevData];
            for (let i = rowMin; i < rowMax; i++) {
                newDataCopy[i][colIndex] = newValue;
            }
            return newDataCopy;
        });
    };

    const handleEditRowTable1 = (rowIndex) => {
        setEditMode1(rowIndex);
        setEditMode2(null);
    };
    const handleEditRowTable2 = (rowIndex) => {
        setEditMode1(null);
        setEditMode2(rowIndex);
    };

    const handleSave = () => {
        setEditMode1(null);
        setEditMode2(null);
        // Add code to save the edited data (e.g., send it to the server)
    };

    return (
        <div>
            {(data !== null) &&
                <p>{data.consum}</p>
            }
        </div>
        // <div>            
        //     <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
        //         <div style={{ fontSize: '120%', textAlign: 'center', color: 'rgb(9, 120, 231)', marginLeft: '20%', paddingTop: '1%', paddingBottom: '1%', display: 'inline-block' }}>
        //             {/* <img src="imatges/battery.png" width="55" height="50" alt="Prosum" /> */}
        //             <b>Curva consum comunitat</b>
        //         </div>
        //         <p>Attempt27{data}</p>
        //         {(data !== null) && Array.isArray(data) ? (
        //             <div style={{ marginRight: '20%', textAlign: 'center', display: 'inline-block' }}>   

        //                 <table style={{ fontSize: '95%', backgroundColor: '#f7f7f7', borderRadius: '15px', textAlign: 'center' }}>
        //                     <thead>
        //                         <tr style={{ color: 'rgb(9, 120, 231)', textAlign: 'center' }}>
        //                             <th>Consum</th>
        //                             <th>Bateria</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody style={{ color: 'rgb(9, 120, 231)' }}>
        //                         {data.map((row, rowIndex) => (
        //                             <tr style={{ textAlign: 'center' }} key={row.idHora}>
        //                                 {Object.keys(row).map((col, colIndex) => {
        //                                     if (rowIndex === 0 && (col === 'consumKw' || col === 'bateriaKw')) { // Check for first row and columns 8 and 9
        //                                         return (
        //                                             <td style={{ paddingRight: '30px', textAlign: 'center' }} key={colIndex}>
        //                                                 {editModeTable2 === rowIndex ? (
        //                                                     <input
        //                                                         type="text"
        //                                                         value={row[col]}
        //                                                         onChange={(e) => handleInputChange(e, rowIndex, col, 1)}
        //                                                         style={{ width: '30%', textAlign: 'center' }}
        //                                                     />
        //                                                 ) : (
        //                                                     <span style={{ paddingLeft: '30px', textAlign: 'center' }}>
        //                                                         {col === 'consumKw' ? `${row[col]}kW` : col === 'bateriaKw' ? `${row[col]}kW` : row[col]}
        //                                                     </span>
        //                                                 )}
        //                                             </td>
        //                                         );
        //                                     } else {
        //                                         return null; // Skip rendering for other columns or rows
        //                                     }
        //                                 })}
        //                                 <td>
        //                                     {rowIndex === 0 && editModeTable2 === rowIndex ? (
        //                                         <button onClick={() => handleSave()}>Save</button>
        //                                     ) : rowIndex === 0 ? (
        //                                         <button onClick={() => handleEditRowTable2(rowIndex)}>Edit</button>
        //                                     ) : null}
        //                                 </td>
        //                             </tr>
        //                         ))}
        //                     </tbody>
        //                 </table>
        //             </div>
        //         ) : (
        //             <p>Loading...</p>
        //         )}
        //     </div>
        //     <div className="table-responsive">
        //         {data !== null && Array.isArray(data) ?  (
        //             <table id="tableF" className="table table-bordered" style={{ fontSize: '90%' }}>
        //                 <thead className="thead-dark">
        //                     <tr>
        //                         <th scope="col">Hora</th>
        //                         <th scope="col">Consum</th>
        //                         <th scope="col">Interval</th>
        //                         <th scope="col">Histeresis</th>
        //                         <th scope="col">Automatic</th>
        //                         <th scope="col" style={{ textAlign: 'center' }}></th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {data.map((row, rowIndex) => (
        //                         <tr key={row.idHora}>
        //                             {Object.keys(row).map((col, colIndex) => {
        //                                 if (colIndex > 0 && colIndex < Object.keys(row).length - 3) {
        //                                     return (
        //                                         <td key={colIndex}>
        //                                             {editModeTable1 === rowIndex && col !== 'hora' ? (
        //                                                 <input
        //                                                     type="text"
        //                                                     value={row[col]}
        //                                                     onChange={(e) => handleInputChange(e, rowIndex, col, 0)}
        //                                                     style={{ width: '20%' }}
        //                                                 />
        //                                             ) : (
        //                                                 col === 'hora' ? `${row[col]}:00` : col === 'consum' ? `${row[col]}% (${row[col] * row['consumKw']}kW)` : col === 'interval' ? `${row[col]}s` : col === 'histeresis' ? `${row[col]}s` : row[col]
        //                                             )}
        //                                         </td>
        //                                     );
        //                                 } else {
        //                                     return null; // Skip rendering for the columns to hide
        //                                 }
        //                             })}
        //                             <td>
        //                                 {editModeTable1 === rowIndex ? (
        //                                     <button onClick={() => handleSave()}>Save</button>
        //                                 ) : (
        //                                     <button onClick={() => handleEditRowTable1(rowIndex)}>Edit</button>
        //                                 )}
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         ) : (
        //             <p>Loading...</p>
        //         )}
        //     </div>
        // </div>
    );
};

export default BatteryConfig;


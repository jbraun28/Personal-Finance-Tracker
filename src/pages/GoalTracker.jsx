import React, { useEffect, useState, useRef, useContext } from 'react';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';


export default function GoalTracker() {

  //for local storage
  const local_storage_key = "goal-table"

  //table labels
  const columns = ["#", "Goal", "TimeFrame", "Required", "Saved", "Progress",  "Status", "Actions"];
  
  //start with an array
  const initialRows = [];
  for (let i = 0; i < 5; i++) {
    initialRows.push(
      {
        goal: '',
        required: 0,
        saved: 0,
        timeframe: '',
        progress: '',
        status: '',
      });
  }

  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem(local_storage_key);
    return savedRows ? JSON.parse(savedRows) : initialRows
  });

  useEffect(() => {
    localStorage.setItem(local_storage_key, JSON.stringify(rows));
  }, [rows]);


  //event handler for user changes
  const handleInputChange = (idx, col, e) => {
    const updatedRows = [...rows]; //make a shallow copy of the current set of rows
    updatedRows[idx][col] = e.target.value; 
    setRows(updatedRows);
  }

  //event handler for adding rows
  const handleAddRow = () => {
    const newRow = {
      goal: '',
      required: 0,
      saved: 0,
      timeframe: '',
      progress: '',
      status: ''
    };
    setRows([...rows, newRow]) //add the new row to a shallow copy of current rows
  }

  //event handler for deleting rows
  const handleDeleteRow = (rowIdxToDelete) => {
    const updatedRows = rows.filter((row,idx) => idx !== rowIdxToDelete);
    setRows(updatedRows);
  }

  return (
    <div>
      <div>
        <h1>Stay on top of your financial goals</h1>
      </div>
      <Table>
        <TableHead>
          <TableRow>
          {columns.map((col, colIdx) => (
            <TableCell key={colIdx}> 
            {col}
            </TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              <TableCell>{rowIdx+1}</TableCell>
              <TableCell>
                <input
                type='text'
                value={row.goal}
                placeholder='E.g. Save $1000 for trip to London in March'
                style={{width: '250px', textWrap: 'wrap'}}
                onChange={(e) => handleInputChange(rowIdx, 'goal', e)}>
                </input>
              </TableCell>
              <TableCell>
                <input
                type='date'
                value={row.timeframe}
                onChange={(e) => handleInputChange(rowIdx, 'timeframe', e)}>
                </input>
              </TableCell>
              <TableCell>
                <input
                type='number'
                value={row.required}
                placeholder='E.g. 1000'
                onChange={(e) => handleInputChange(rowIdx, 'required', e)}>
                </input>
              </TableCell>
              <TableCell>
                <input
                type='number'
                value={row.saved}
                placeholder='E.g. 500'
                onChange={(e) => handleInputChange(rowIdx, 'saved', e)}>
                </input>
              </TableCell>
              <TableCell>
                <progress 
                value={(row.required || row.saved) ? (row.saved / row.required * 100): 0 }
                max={100}>
                </progress>
              </TableCell>
              <TableCell>
                <select value={row.status}
                onChange={(e) => handleInputChange(rowIdx, 'status', e)}>
                  <option value="">Select Status</option>
                  <option value="Complete">✅ (Completed)</option>
                  <option value="In Progress">🚧 (In Progress)</option>
                </select>
              </TableCell>
              <TableCell>
                <button onClick={() => handleDeleteRow(rowIdx)}>Delete Row</button>
              </TableCell>
            
            </TableRow>
           

          ))}
        </TableBody>
      </Table>
      <button onClick={handleAddRow}>Add Row</button>
      
    </div>
  )
}


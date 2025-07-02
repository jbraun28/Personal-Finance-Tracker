import React, { useEffect, useState, useRef, useContext } from 'react';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';

export default function GoalTracker() {

  //table labels
  const columns = ["#", "Goal", "TimeFrame", "Status"];
  
  //start with an array
  const initialRows = [];
  for (let i = 0; i < 5; i++) {
    initialRows.push(
      {
        id: i+1,
        goal: '',
        timeframe: '',
        status: ''
      });
  }

  const [rows, setRows] = useState(initialRows);

  //event handler for user changes
  const handleInputChange = (idx, col, e) => {
    const updatedRows = [...rows]; //make a shallow copy of the current set of rows
    updatedRows[idx][col] = e.target.value;
    setRows(updatedRows);
  }

  //event handler for adding rows
  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      goal: '',
      timeframe: '',
      status: ''
    };
    setRows([...rows, newRow]) //add the new row to a shallow copy of current rows
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
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <input
                type='text'
                value={row.goal}
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
              <select name="selectedStatus">
                <option value="None">Select Status</option>
                <option value="Complete">✅ (Completed)</option>
                <option value="In Progress">🚧 (In Progress)</option>
              </select>
              </TableCell>

            </TableRow>
           

          ))}
        </TableBody>
      </Table>
      <button onClick={handleAddRow}>Add Row</button>
      
    </div>
  )
}


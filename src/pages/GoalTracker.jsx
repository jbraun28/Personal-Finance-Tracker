import React, { useEffect, useState} from 'react';
import {useWindowSize} from 'react-use';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import Confetti from "react-confetti";

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


  const getStatus = (row) => {
    //if user hasn't input either money required or money saved, output confused emoji
    if (!row.required || !row.saved) {
      return "🤔";
    }
    //otherwise, update status accordingly
    const progress = (row.saved / row.required * 100);
    return progress < 100 ? "🚧 (In Progress)" : "✅ (Completed)";
  }

  const { width, height } = useWindowSize();
  
  const getConfetti = (row) => {
    if (!row.required || !row.saved) {
      return null;
    }
    const progress = (row.saved / row.required * 100); 
    return progress >= 100 ? <Confetti width={width} height={height} />  : null;
  }
  

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
        <h1>✨What are you saving towards?✨</h1>
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
                max={100}
                onChange={(e) => handleInputChange(rowIdx, 'progress', e)}>
                </progress>
              </TableCell>
              <TableCell>
                {getStatus(row)}
              </TableCell>
              <TableCell>
                <button onClick={() => handleDeleteRow(rowIdx)}>Delete Row</button>
              </TableCell>
              {getConfetti(row)}
            </TableRow>
           

          ))}
        </TableBody>
      </Table>
      <button onClick={handleAddRow}>Add Row</button>
      
    </div>
  )
}


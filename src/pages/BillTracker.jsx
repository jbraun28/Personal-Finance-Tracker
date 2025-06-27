import React, { useEffect, useState, useRef, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function BillTracker() {

  //for local storage
  const local_storage_key = 'table-data';  

  //table labels
  const columns = ["Bill", "Amount", "Due Date", "Paid"];
  const placeHolders = ["Car Insurance", "800", "June 12", "YES"];

  //set up row data
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem('table-data');
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e, rowIdx, col) => {
    const updatedRows = [...rows]; //make a shallow copy of existing rows
    updatedRows[rowIdx][col] = e.target.value; //set value that triggered the event to desired location in rows array
    setRows(updatedRows); //update the rows
    console.log("rows after change:", updatedRows);
  }

  const handleAddRow = () => {
    const newRow = {};
    columns.forEach(col => newRow[col] = '')//builds a new empty row based on the col headers
    setRows([...rows, newRow]); //add new row to shallow copy of rows
  } 

  const handleDeleteRow = (rowIdxToDelete) => {
    const updatedRows = rows.filter((row,idx) => idx !== rowIdxToDelete);
    setRows(updatedRows);
   
  }

  useEffect(() => {
    const savedRows = localStorage.getItem(local_storage_key);
    console.log('Loaded from localStorage:', savedRows);
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    } else {
      const starterRow = {};
      columns.forEach(col => starterRow[col] = '');
      setRows([starterRow]); // Add one empty row by default
    }
  }, []);

  useEffect(() => {
    console.log("Saving to localStorage:", rows);
    localStorage.setItem(local_storage_key, JSON.stringify(rows));
  }, [rows]);
  

  return (
    <div>
      <h1>Track your bills</h1>
      <button onClick={handleAddRow}> Add Row </button>
     <Table>
      {/** table headers */}
      <TableHead>
        <TableRow>
          {columns.map((col, colIdx) =>  (
          <TableCell key={colIdx}>
            {col}
          </TableCell> 
        ))}
        <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      {/* table rows*/}
      <TableBody>
        {rows.map((row, rowIdx) => (
          <TableRow key={rowIdx}>
            
           {columns.map((col, colIdx) => (
            <TableCell key= {colIdx}> 
              <input 
                type="text"
                value={row[col]}
                placeholder={placeHolders[colIdx]}
                onChange={e => handleChange(e, rowIdx, col)}>
              </input>
            </TableCell>
           ))}
           
           <TableCell><button onClick={() => handleDeleteRow(rowIdx)}>Delete Row</button></TableCell>
          </TableRow> 
        ))}


      </TableBody>
     </Table>
    </div>
  )
}

export default BillTracker;

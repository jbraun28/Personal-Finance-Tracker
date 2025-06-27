import React, { useEffect, useState, useRef, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function BillTracker() {

  const columns = ["Bill", "Amount", "Due Date", "Paid"];
  const [rows, setRows]=useState([]);

  const handleChange = (e, rowIdx, col) => {
    const updatedRows = [...rows]; //make a shallow copy of existing rows
    updatedRows[rowIdx][col] = e.target.value; //set value that triggered the event to desired location in rows array
    setRows(updatedRows); //update the rows
  }

  const handleAddRow = () => {
    const newRow = {};
    columns.forEach(col => newRow[col] = '')//builds a new empty row based on the col headers
    setRows([...rows, newRow]); //add new row to shallow copy of rows
  } 

  return (
    <div>
      <h1>Track your bills</h1>
      <button onClick={handleAddRow}>Add Row</button>
     <Table>
      {/** table headers */}
      <TableHead>
        <TableRow>
        {columns.map((col, colIdx) =>  (
          <TableCell key={colIdx}>
            {col}
          </TableCell>
        ))}
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
                onChange={e => handleChange(e, rowIdx, col)}>
              </input>
            </TableCell>
           ))}
          </TableRow>
        ))}
        <TableRow></TableRow>

      </TableBody>
     </Table>
    </div>
  )
}

export default BillTracker;

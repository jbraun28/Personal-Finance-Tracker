import React, { useEffect, useState, useRef, useContext } from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';

export default function BudgetTracker() {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const local_storage_key = 'budget-table';

  const initialRows = [];
  for (let i = 0; i < 3; i++) {
    initialRows.push(
      {
        source: '',
        Jan: '',
        Feb: '',
        Mar: '',
        Apr: '',
        May: '',
        Jun: '',
        Jul: '',
        Aug: '',
        Sep: '',
        Oct: '',
        Nov: '',
        Dec: ''
      }
    )
  }

  //initialize rows based on what's stored
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem(local_storage_key);
    return savedRows ? JSON.parse(savedRows) : initialRows
  });

  //event handler for user input 
  const handleInputChange = (idx, col, e) => {
    const updatedRows = [...rows]; //make a shallow copy of the current rows
    updatedRows[idx][col] = e.target.value; //set the row at specified location equal to user input
    setRows(updatedRows); //update rows
  }

  //event handler for adding rows
  const handleAddRow = () => {
    const newRow = {
      source: '',
      Jan: '',
      Feb: '',
      Mar: '',
      Apr: '',
      May: '',
      Jun: '',
      Jul: '',
      Aug: '',
      Sep: '',
      Oct: '',
      Nov: '',
      Dec: ''
    };
    setRows([...rows, newRow]) //add the new row to a shallow copy of current rows
  }

  //save to local storage upon changes to rows
  useEffect(() => {
    localStorage.setItem(local_storage_key, JSON.stringify(rows))
  }, [rows]);


  return (
    <div style={{overflowX: 'auto', maxWidth: '100%'}}>
      <h1>Annual Income</h1>

      {/** Income table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Income </TableCell>
            {months.map((month, monthIdx) => (
              <TableCell key={monthIdx}>
                {month} 
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row, rowIdx) => (
          <TableRow key={rowIdx}>
              <TableCell key={rowIdx}>
                <input 
                type="text"
                placeholder="E.g. Paycheck #1"
                value={row.source}
                onChange={(e) => handleInputChange(rowIdx, 'source', e)}>
                </input>
              </TableCell>
              {months.map((month) => (
                <TableCell key={month}>
                <input 
                type="number"
                placeholder="Input a value"
                value={row[month]}
                onChange={(e) => handleInputChange(rowIdx, month, e)}>
                </input>
                </TableCell>
              ))}
              
          </TableRow>
           ))}
        </TableBody>
      </Table>  
      <button onClick={handleAddRow}>Add Row</button>

      {/** Expense table */}
      <h1>Annual Expenses</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Expense</TableCell>
            {months.map((month, monthIdx) => (
              <TableCell key={monthIdx}>
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      
        <TableBody>
        {rows.map((row, rowIdx) => (
          <TableRow key={rowIdx}>
              <TableCell key={rowIdx}>
                <input 
                type="text"
                placeholder="E.g. Paycheck #1"
                value={row.source}
                onChange={(e) => handleInputChange(rowIdx, 'source', e)}>
                </input>
              </TableCell>
              {months.map((month) => (
                <TableCell key={month}>
                <input 
                type="number"
                placeholder="Input a value"
                value={row[month]}
                onChange={(e) => handleInputChange(rowIdx, month, e)}>
                </input>
                </TableCell>
              ))}    
          </TableRow>
           ))}

        </TableBody>
      </Table>



      {/** Summary */}
    </div>
  )
  
  
}


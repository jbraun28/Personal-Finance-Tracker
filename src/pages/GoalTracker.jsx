import React, { useEffect, useState, useRef, useContext } from 'react';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';

export default function GoalTracker() {

  return (
    <div>
      <div>
        <h1>Set goals to stay on track with your finances!</h1>
      </div>
      <div>
        <TableContainer>
          <Table>
            <TableHead> What plans do you have in mind this year?
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  )
}


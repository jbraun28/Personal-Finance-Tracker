import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ExpenseTracker from './pages/ExpenseTracker';
import BillTracker from './pages/BillTracker';
import BudgetTracker from './pages/BudgetTracker';
import GoalTracker from './pages/GoalTracker';
import Learning from './pages/Learning';

function NavText({href, text}) {
  return (
    <Typography
      style={{
      marginRight: '35px',
      fontFamily: 'monospace',
      fontSize: '20px',
      fontWeight: 'bolder',
      letterSpacing: '.5rem'
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'pink',
          textDecoration: 'none'
        }}> 
        {text}
      </NavLink>
    </Typography>
  )
}

export default function App() {

  return (
    <BrowserRouter>
    <AppBar style={{backgroundColor:"green", height: '60px'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters> 
          <NavText href="/" text="HOMEPAGE" />
          <NavText href="/expense-tracker" text="EXPENSES"/>
          <NavText href="/budget-tracker" text="BUDGET"/>
          <NavText href="/bill-tracker" text="BILLS"/>
          <NavText href="/goal-tracker" text="GOALS"/>
          <NavText href="/learning" text="LEARNING"/>
        </Toolbar>
      </Container>
    </AppBar>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/expense-tracker" element={<ExpenseTracker />} />
      <Route path="/budget-tracker" element={<BudgetTracker />} />
      <Route path="/bill-tracker" element={<BillTracker/>} />
      <Route path="/goal-tracker" element={<GoalTracker />} />
      <Route path="/learning" element={<Learning />} />
    </Routes>

  
    </BrowserRouter>
  ) 
}


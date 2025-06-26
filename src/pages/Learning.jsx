import React, { useEffect, useState, useRef, useContext } from 'react';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import Paper from '@mui/material/Paper';


export default function Learning() {

    const sites = ["Intuit", "Khan Academy","McGill", "Brigham Young", "Udemy", "Coursera", "Alison", "MRU"]
    
    const links = ["https://www.intuit.com/solutions/education/?cid=ppc_G_e_US_.I4E_US_GGL_NonBrand_Search._learning%20financial%20literacy_txt&gad_source=1&gad_campaignid=21010124836&gbraid=0AAAAACpgTsNjf80vEVX2R7i59Ypfgpos6&gclid=CjwKCAjw3rnCBhBxEiwArN0QE9kqOVk7uflXQlRFAey1OZQrwH1iZ6sc4Uimme6cia8LB-Nroh0WABoCyYAQAvD_BwE&gclsrc=aw.ds",
      "https://www.khanacademy.org/college-careers-more/personal-finance", 
      "https://www.mcgillpersonalfinance.com/", "https://personalfinance.byu.edu/", "https://www.udemy.com/course/personal-finance-101/",
      "http://coursera.org/learn/financial-planning", "https://alison.com/course/introduction-to-managing-your-personal-finance-debts-revised",
      "https://mru.org/money-skills"
    ]
    const shortLinks= ["intuit.com", "khanacademy.org", 
      "mcgillpersonalfinance.com", "personalfinance.byu.edu", 
      "udemy.com", "coursera.org", 
      "alison.com", "mru.org"
    ] 

  return (
    <div>
      <h1 style={{color: 'blue'}}>Learn more about personal finance!</h1>
      <h2>Check out the below educational links to learn more about personal finance.
      </h2>
      <TableContainer component={Paper} style={{width: '600px', margin: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{width: '300px'}}>Website</TableCell>
              <TableCell style={{width: '300px'}}>Link</TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
            {/* rows go inside the mapping function */ }
            {sites.map((site, index) => (
              <TableRow key={index}>
                <TableCell>{site}</TableCell>
                <TableCell><a href={links[index]}>{shortLinks[index]}</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}


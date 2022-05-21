import React from 'react';
import './App.css';
import '@mui/material';
import hrc from './hrc.png';
import abc from './abc.png';
import DataLoading from './dataLoad';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

function App() {
  return (
    <div style={{ backgroundColor: "rgba(7, 55, 87, 0.952)", height: "600px" }}>
      <img src={abc} height={50} width={200} alt="logo" />
      <img src={hrc} height={50} width={200} alt="logo" style={{ marginLeft: "360px" }} />
      <div style={{marginTop: "5px", marginBottom: "4px"}}>
      <DataLoading />
      </div>
      <div style={{ display: "flex", marginLeft: "480px" }}>
      <Link>
      <Typography style={{fontSize: "small"}} >
        privacy policy
      </Typography>
      </Link>
      <Typography style={{color: "white", fontSize: "small" }} >&copy; 2022 Highradius. All Rights Reserved.</Typography>
      </div>
    </div>
  )
}
export default App
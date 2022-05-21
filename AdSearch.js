import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const bodyStyles = makeStyles({
  bfield: {
    color: "white", backgroundColor: "rgba(7, 55, 87, 0.952)",
    border: "2px solid skyblue", padding: "4px 20px",
    borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"
  },
  dbutton: {
    color: "white", border: "2px solid white", backgroundColor: "rgba(7, 55, 87, 0.952)"
  },
  tfield: {
    backgroundColor: "white", borderRadius: "6px"
  }
});

function AdSearch({ doc_id, invoice_id, cust_number, buisness_year, changeHandler, searchHandler }) {
  const body = bodyStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button variant="text" className={body.bfield} onClick={handleClickOpen}
      startIcon={<FindInPageIcon />}>ADVANCED SEARCH</Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{
        style: {
          backgroundColor: 'rgba(7, 55, 87, 0.952)'
        },
      }}>
        <DialogTitle style={{ color: "white" }}>Advance Search</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} item>
              <TextField id="outlined-basic" label="Document id" variant="filled" className={body.tfield}
                name="doc_id" value={doc_id} onChange={changeHandler} fullWidth />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField id="outlined-basic" label="Invoice id" variant="filled" className={body.tfield}
                name="invoice_id" value={invoice_id} onChange={changeHandler} fullWidth />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField id="outlined-basic" label="Customer Number" variant="filled" className={body.tfield}
                name="cust_number" value={cust_number} onChange={changeHandler} fullWidth />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField id="outlined-basic" label="Business Year" variant="filled" className={body.tfield}
                name="buisness_year" value={buisness_year} onChange={changeHandler} fullWidth />
            </Grid>
          </Grid><br></br>
          <DialogActions>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <Button variant="text" className={body.dbutton} onClick={searchHandler} fullWidth>
                  SEARCH</Button>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Button fullWidth variant="text" className={body.dbutton} onClick={handleClose}>
                  CANCEL</Button>
              </Grid>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdSearch;
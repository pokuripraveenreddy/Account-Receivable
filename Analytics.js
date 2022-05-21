import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const bodyStyles = makeStyles({
    bfield: {
        color: "white", backgroundColor: "rgba(7, 55, 87, 0.952)",
        border: "2px solid skyblue", padding: "4px 20px", borderRadius: "0px"
    },
    dbutton: {
        color: "white", border: "2px solid white",
        backgroundColor: "rgba(7, 55, 87, 0.952)",
    },
    tfield: {
        backgroundColor: "white", borderRadius: "6px"
    }
});

function Analytics() {
    const [open, setOpen] = React.useState(false);
    const body = bodyStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="text" className={body.bfield} onClick={handleClickOpen}
                startIcon={<EqualizerIcon />} >ANALYTICS VIEW</Button>
            <Dialog open={open} onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "600px",  // Set your width here
                        },
                    },
                }} PaperProps={{
                    style: {
                        backgroundColor: 'rgba(7, 55, 87, 0.952)'
                    },
                }}>
                <DialogTitle style={{ color: "white" }}>Analytics View</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6} item>
                            <label style={{ color: "white" }}>Clear Date </label>
                            <TextField id="outlined-basic" type="date" variant="filled"
                                className={body.tfield} fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <label style={{ color: "white" }}>Due Date </label>
                            <TextField id="outlined-basic" type="date" variant="filled"
                                className={body.tfield} fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField id="outlined-basic" type="date" variant="filled"
                                className={body.tfield} fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField id="outlined-basic" type="date" variant="filled"
                                className={body.tfield} fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <label style={{ color: "white" }}>Baseline Create Date </label>
                            <TextField id="outlined-basic" type="date" variant="filled"
                                className={body.tfield} fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <label style={{ color: "white" }}>Invoice Currency </label>
                            <TextField id="outlined-basic" label="Invoice Currency" variant="filled"
                                className={body.tfield} fullWidth />
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField id="outlined-basic" type="date" variant="filled"
                                className={body.tfield} fullWidth />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <Button variant="text" className={body.dbutton} fullWidth>SUBMIT</Button>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <Button fullWidth variant="text" className={body.dbutton} onClick={handleClose}>
                                CANCEL</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Analytics;
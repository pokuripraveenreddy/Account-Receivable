import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const bodyStyles = makeStyles({
    search: {
        marginLeft: "15px", marginRight: "25px",
        borderRadius: "12px", backgroundColor: "white",
        marginTop: "2px"
    }
});

function Search({ changeHandler, searchField, cust_number }) {
    const body = bodyStyles();
    return (
        <div className={body.search}>
            <TextField
                InputProps={{ disableUnderline: true }}
                label="Search Customer Id"
                id="outlined-basic"
                variant="filled" name="cust_number" value={cust_number} onChange={changeHandler}
                onKeyDown={searchField} />
        </div>
    );
}

export default Search;
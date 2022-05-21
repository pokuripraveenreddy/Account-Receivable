import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@material-ui/core/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import { editData, getData, searchData, searchCustomer } from './data';
import AddDetails from './functions/AddDetails';
import { addData } from './data';
import EditDetails from './functions/EditDetails';
import { deleteData } from './data';
import Delete from './functions/DeleteDeatils';
import AdSearch from './AdSearch';
import Analytics from './Analytics';
import { makeStyles } from '@material-ui/core/styles';
import TableSortLabel from '@mui/material/TableSortLabel'
import Search from './Search';
import ReplayIcon from '@mui/icons-material/Replay';

const bodyStyles = makeStyles({
  bfield: {
    color: "white", backgroundColor: "skyblue",
    padding: "4px 25px", border: "2px solid white",
    borderTopRightRadius: "0px", borderBottomRightRadius: "0px"
  },
  load: {
    marginLeft: "4px", border: "2px solid skyblue", color: "skyblue",
    backgroundColor: "rgba(7, 55, 87, 0.952)", borderRadius: "4px"
  }
});

const columns = [
  { id: 'sl_no', label: 'Sl no', minWidth: 10, numeric: true },
  { id: 'business_code', label: 'Business Code', minWidth: 20 },
  { id: 'cust_number', label: 'Customer Number', minWidth: 40 },
  { id: 'clear_date', label: 'Clear Date', minWidth: 80, },
  { id: 'buisness_year', label: 'Business Year', minWidth: 60 },
  { id: 'doc_id', label: 'Document Id', minWidth: 70 },
  { id: 'posting_date', label: 'Posting Date', minWidth: 80 },
  { id: 'document_create_date', label: 'Document Create Date', minWidth: 80 },
  { id: 'due_in_date', label: 'Due Date', minWidth: 80 },
  { id: 'invoice_currency', label: 'Invoice Currency', minWidth: 60 },
  { id: 'document_type', label: 'Document Type', minWidth: 60 },
  { id: 'posting_id', label: 'Posting Id', minWidth: 60 },
  { id: 'total_open_amount', label: 'Total Open Amount', minWidth: 70 },
  { id: 'baseline_create_date', label: 'Baseline Create Date', minWidth: 80 },
  { id: 'cust_payment_terms', label: 'Customer Payment Terms', minWidth: 70 },
  { id: 'invoice_id', label: 'Invoice Id', minWidth: 60 },
];

export default function DataLoading() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const body = bodyStyles();
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  const [rows, setData] = useState([]);
  const [details, setDetails] = useState({
    business_code: '', cust_number: '', clear_date: '', buisness_year: '', doc_id: '', posting_date: '',
    document_create_date: '', due_in_date: '', invoice_currency: '', document_type: '', posting_id: '',
    total_open_amount: '', baseline_create_date: '', cust_payment_terms: '', invoice_id: ''
  });

  const { business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date,
    due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date,
    cust_payment_terms, invoice_id } = details;

  const changeHandler = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(details)
    let response = await addData(details);
    if (response) {
      setDetails({
        business_code: '', cust_number: '', clear_date: '', buisness_year: '', doc_id: '', posting_date: '',
        document_create_date: '', due_in_date: '', invoice_currency: '', document_type: '', posting_id: '',
        total_open_amount: '', baseline_create_date: '', cust_payment_terms: '', invoice_id: ''
      });
    }
  }

  const handleClose = async (update) => {
    if (update) {
      await editData(details);
    }
    setOpen(false);
  };

  useEffect(async function () {
    setData(await getData());
  }, []);

  const searchHandler = async (search) => {
    if (search) {
      let response = await searchData(details);
      //console.log(response.data);
      setData(response.data.Search_Details);
      setDetails({
        business_code: '', cust_number: '', clear_date: '', buisness_year: '', doc_id: '', posting_date: '',
        document_create_date: '', due_in_date: '', invoice_currency: '', document_type: '', posting_id: '',
        total_open_amount: '', baseline_create_date: '', cust_payment_terms: '', invoice_id: ''
      });
    }
  }

  const editHandler = () => {
    setOpen(true);
  }

  const deleteHandler = async () => {
    await deleteData(details.invoice_id);
  }

  const checkHandler = (e, invoice_id) => {
    if (e.target.checked) {
      let editData = rows.filter(details => details.invoice_id == invoice_id)[0];
      //console.log(editData);
      setDetails(editData);
      setDisabled(false);
    } else {
      setDetails({
        business_code: '', cust_number: '', clear_date: '', buisness_year: '', doc_id: '', posting_date: '',
        document_create_date: '', due_in_date: '', invoice_currency: '', document_type: '', posting_id: '',
        total_open_amount: '', baseline_create_date: '', cust_payment_terms: '', invoice_id: ''
      });
      setDisabled(true);
    }
  }

  const searchField = async (search) => {
    if (search.key === 'Enter') {
      let response = await searchCustomer(details);
      //console.log(response.data);
      setData(response.data.Search);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId)
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  return (<>
    <div style={{ display: "flex" }}>
      <div style={{
        display: "flex", alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        <Button variant="text" className={body.bfield}>PREDICT</Button>
        <Analytics />
        <AdSearch doc_id={doc_id} invoice_id={invoice_id} cust_number={cust_number} buisness_year={buisness_year}
          changeHandler={changeHandler} searchHandler={searchHandler} />
        <Button varient="text" onClick={() => window.location.reload(false)} className={body.load}
          startIcon={<ReplayIcon />}></Button>
        <Search cust_number={cust_number} searchField={searchField} changeHandler={changeHandler} />
      </div>
      <div style={{
        display: "flex", alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        <AddDetails business_code={business_code} cust_number={cust_number} clear_date={clear_date}
          buisness_year={buisness_year} doc_id={doc_id} posting_date={posting_date}
          document_create_date={document_create_date} due_in_date={due_in_date} invoice_currency={invoice_currency}
          document_type={document_type} posting_id={posting_id} total_open_amount={total_open_amount}
          baseline_create_date={baseline_create_date} cust_payment_terms={cust_payment_terms} invoice_id={invoice_id}
          changeHandler={changeHandler} submitHandler={submitHandler} />
        <EditDetails open={open} invoice_currency={invoice_currency} cust_payment_terms={cust_payment_terms}
          submitHandler={submitHandler} handleClose={handleClose} changeHandler={changeHandler}
          editHandler={editHandler} disabled={disabled} />
        <Delete deleteHandler={deleteHandler} />
      </div>
    </div>
    <br />
    <Paper sx={{ minWidth: '100%', overflow: 'hidden' }}
      style={{ backgroundColor: "rgba(7, 55, 87, 0.952)", color: "white" }}>
      <TableContainer sx={{ maxHeight: 380 }}  >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell ><Checkbox style={{ color: "white" }} /></TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}
                  sortDirection={orderBy === column.id ? order : false}>
                  {column.disableSorting ? column.label :
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => { handleSortRequest(column.id) }}
                      style={{ minWidth: column.minWidth, color: "white" }}>
                      {column.label}
                    </TableSortLabel>
                  }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row.invoice_id} >
                    <TableCell>
                      <Checkbox style={{ color: "white" }} onClick={(e) => checkHandler(e, row.invoice_id)} />
                    </TableCell>
                    <TableCell style={{ color: "white" }}>{row.sl_no}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.business_code}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.cust_number}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.clear_date}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.buisness_year}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.doc_id}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.posting_date}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.document_create_date}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.due_in_date}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.invoice_currency}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.document_type}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.posting_id}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.total_open_amount}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.baseline_create_date}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.cust_payment_terms}</TableCell>
                    <TableCell style={{ color: "white" }}>{row.invoice_id}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination style={{ color: "white" }}
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </>
  );
}

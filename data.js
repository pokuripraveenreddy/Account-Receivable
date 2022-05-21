import axios from "axios";

export const getData = async () => {
    let response = await axios.get("http://localhost:9090/HRC_Web_Project/fetch");
    let data = response.data.Details;
    data.map((rows, index) => ({ ...rows, "id": index }))
    return data;
}

export const addData = async ({ business_code, cust_number, clear_date, buisness_year, doc_id, posting_date,
    document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount,
    baseline_create_date, cust_payment_terms, invoice_id }) => {

    let data = "business_code=" + business_code + "&cust_number=" + cust_number + "&clear_date=" + clear_date +
        "&buisness_year=" + buisness_year + "&doc_id=" + doc_id + "&posting_date=" + posting_date +
        "&document_create_date=" + document_create_date + "&due_in_date=" + due_in_date + "&invoice_currency=" +
        invoice_currency + "&document_type=" + document_type + "&posting_id=" + posting_id + "&total_open_amount=" +
        total_open_amount + "&baseline_create_date=" + baseline_create_date + "&cust_payment_terms=" +
        cust_payment_terms + "&invoice_id=" + invoice_id;

    let response = await axios.get(`http://localhost:9090/HRC_Web_Project/Add?` + data);
    return response.data;
}

export const editData = async ({ invoice_currency, cust_payment_terms, invoice_id }) => {
    let data = "invoice_currency=" + invoice_currency + "&cust_payment_terms=" + cust_payment_terms +
        "&invoice_id=" + invoice_id;
    let response = await axios.get('http://localhost:9090/HRC_Web_Project/Edit?' + data);
    return response.data;
}

export const deleteData = async (invoice_id) => {
    let data = "invoice_id=" + invoice_id;
    let response = await axios.get('http://localhost:9090/HRC_Web_Project/Delete?' + data);
    return response.data;
}

export const searchData = async ({ doc_id, invoice_id, cust_number, buisness_year }) => {
    let data = "doc_id=" + doc_id + "&invoice_id=" + invoice_id + "&cust_number=" + cust_number +
        "&buisness_year=" + buisness_year;
    let response = await axios.get('http://localhost:9090/HRC_Web_Project/AdSearch?' + data);
    return response;
}

export const searchCustomer = async ({ cust_number }) => {
    let data = "cust_number=" + cust_number;
    let response = await axios.get('http://localhost:9090/HRC_Web_Project/Search?' + data);
    return response;
}

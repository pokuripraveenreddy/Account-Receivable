package com.project.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
//import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			
			String business_code = request.getParameter("business_code");
			int cust_number = Integer.parseInt(request.getParameter("cust_number"));
			
			String clear_date1 = request.getParameter("clear_date");
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(clear_date1);
			DateFormat clear_dformat = new SimpleDateFormat("yyyy-MM-dd");
			String clear_date = clear_dformat.format(date1);
			
			int buisness_year = Integer.parseInt(request.getParameter("buisness_year"));
			String doc_id = request.getParameter("doc_id");
			 
			String posting_date1 = request.getParameter("posting_date");
			Date date2 = new SimpleDateFormat("yyyy-MM-dd").parse(posting_date1);
			DateFormat post_dformat = new SimpleDateFormat("yyyy-MM-dd");
			String posting_date = post_dformat.format(date2);
			
			String document_date1 = request.getParameter("document_create_date");
			Date date3 = new SimpleDateFormat("yyyy-MM-dd").parse(document_date1);
			DateFormat create_dformat = new SimpleDateFormat("yyyy-MM-dd");
			String document_create_date = create_dformat.format(date3);
			
			String due_date1 = request.getParameter("due_in_date");
			Date date4 = new SimpleDateFormat("yyyy-MM-dd").parse(due_date1);
			DateFormat due_dformat = new SimpleDateFormat("yyyy-MM-dd");
			String due_in_date = due_dformat.format(date4);
			
			String invoice_currency = request.getParameter("invoice_currency");
			String document_type = request.getParameter("document_type");
			int posting_id = Integer.parseInt(request.getParameter("posting_id"));
			
			double total_open_amount = Double.parseDouble(request.getParameter("total_open_amount"));
			
			String base_date1 = request.getParameter("baseline_create_date");
			Date date5 = new SimpleDateFormat("yyyy-MM-dd").parse(base_date1);
			DateFormat base_dformat = new SimpleDateFormat("yyyy-MM-dd");
			String baseline_create_date = base_dformat.format(date5);
			
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
			
			final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			final String URL = "jdbc:mysql://localhost:3306/grey_goose";
			final String User = "root";
			final String Password = "Praveen@9";
			
			Class.forName(JDBC_DRIVER);
			Connection conn = DriverManager.getConnection(URL,User,Password);
			
			String query = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			
			PreparedStatement preparedStatement = conn.prepareStatement(query);
			preparedStatement.setString(1, business_code);
			preparedStatement.setInt(2, cust_number);
			preparedStatement.setString(3, clear_date);
			preparedStatement.setInt(4, buisness_year);
			preparedStatement.setString(5, doc_id);
			preparedStatement.setString(6, posting_date);
			preparedStatement.setString(7, document_create_date);
			preparedStatement.setString(8, due_in_date);
			preparedStatement.setString(9, invoice_currency);
			preparedStatement.setString(10, document_type);
			preparedStatement.setInt(11, posting_id);
			preparedStatement.setDouble(12, total_open_amount);
			preparedStatement.setString(13, baseline_create_date);
			preparedStatement.setString(14, cust_payment_terms);
			preparedStatement.setInt(15, invoice_id);
			
			if(preparedStatement.executeUpdate() > 0) {
				Response.put("insert",true);
			}else{
				Response.put("insert",false);
			}
			Gson gson = new Gson();
			String jsonstring = gson.toJson(Response);
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().append(jsonstring);
			}catch(Exception e) {
				e.printStackTrace();
				}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

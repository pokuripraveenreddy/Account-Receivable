package com.project.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class AdSearch
 */
@WebServlet("/AdSearch")
public class AdSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		HashMap<Object, Object> Response = new HashMap<Object, Object>();
		//ArrayList of Details POJO Class.
		ArrayList<Details> Search = new ArrayList<Details>();
		try {
			
			final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			final String URL = "jdbc:mysql://localhost:3306/grey_goose";
			final String User = "root";
			final String Password = "Praveen@9";
			
			String doc_id = request.getParameter("doc_id");
			String invoice_id = request.getParameter("invoice_id");
			String cust_number = request.getParameter("cust_number");
			String buisness_year = request.getParameter("buisness_year");
		
			Class.forName(JDBC_DRIVER);
			Connection conn = DriverManager.getConnection(URL,User,Password);
			String query = "SELECT * FROM winter_internship where doc_id = ? AND invoice_id = ? AND cust_number = ? AND buisness_year = ? ";
			
			PreparedStatement ps = conn.prepareStatement(query);
			ps.setString(1, doc_id);
			ps.setString(2, invoice_id);
			ps.setString(3, cust_number);
			ps.setString(4, buisness_year);
			//ps.setString(4, buisness_year);
			
			ResultSet res = ps.executeQuery();
			
			while(res.next()) {
				Details search = new Details(res.getInt("sl_no"), res.getString("business_code"), 
						res.getInt("cust_number"), res.getString("clear_date"), 
						res.getInt("buisness_year"), res.getString("doc_id"), res.getString("posting_date"),
						res.getString("document_create_date"), res.getString("due_in_date"), 
						res.getString("invoice_currency"), res.getString("document_type"), 
						res.getInt("posting_id"), res.getDouble("total_open_amount"), 
						res.getString("baseline_create_date"), res.getString("cust_payment_terms"), 
						res.getInt("invoice_id"));
				Search.add(search);
			}
			Response.put("Search_Details",Search);
			
			Gson g = new Gson();
			String jsonString = g.toJson(Response);
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().append(jsonString);
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

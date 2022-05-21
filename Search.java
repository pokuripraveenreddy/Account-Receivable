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
 * Servlet implementation class Search
 */
@WebServlet("/Search")
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Search() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		HashMap<Object, Object> Response = new HashMap<Object, Object>();
		ArrayList<Details> CSearch = new ArrayList<Details>();
		try {
			
			final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			final String URL = "jdbc:mysql://localhost:3306/grey_goose";
			final String User = "root";
			final String Password = "Praveen@9";
			
			String cust_number = request.getParameter("cust_number");
			
			Class.forName(JDBC_DRIVER);
			Connection conn = DriverManager.getConnection(URL,User,Password);
			String query = "SELECT * FROM winter_internship where cust_number = ?";
			
			PreparedStatement ps = conn.prepareStatement(query);
			
			ps.setString(1, cust_number);
			
			ResultSet res = ps.executeQuery();
			
			while(res.next()) {
				Details csearch = new Details(res.getInt("sl_no"), res.getString("business_code"), 
						res.getInt("cust_number"), res.getString("clear_date"), 
						res.getInt("buisness_year"), res.getString("doc_id"), res.getString("posting_date"),
						res.getString("document_create_date"), res.getString("due_in_date"), 
						res.getString("invoice_currency"), res.getString("document_type"), 
						res.getInt("posting_id"), res.getDouble("total_open_amount"), 
						res.getString("baseline_create_date"), res.getString("cust_payment_terms"), 
						res.getInt("invoice_id"));
				CSearch.add(csearch);
			}
			Response.put("Search",CSearch);
			
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

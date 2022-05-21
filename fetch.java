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
 * Servlet implementation class fetch
 */
@WebServlet("/fetch")
public class fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
	//private RetriveDataFrom_DB retrive = new RetriveDataFrom_DB();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public fetch() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		HashMap<Object, Object> Response = new HashMap<Object, Object>();
		//ArrayList of Details POJO Class.
		ArrayList<Details> fetchArr = new ArrayList<Details>();
		try {
			final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			final String URL = "jdbc:mysql://localhost:3306/grey_goose";
			final String User = "root";
			final String Password = "Praveen@9";
			
			Class.forName(JDBC_DRIVER);
			Connection conn = DriverManager.getConnection(URL,User,Password);
			String query = "SELECT * FROM winter_internship";
			PreparedStatement ps = conn.prepareStatement(query);
			ResultSet res = ps.executeQuery();
			
			while(res.next()) {
				
				Details fetch = new Details(res.getInt("sl_no"), res.getString("business_code"), 
						res.getInt("cust_number"), res.getString("clear_date"), 
						res.getInt("buisness_year"), res.getString("doc_id"), res.getString("posting_date"),
						res.getString("document_create_date"), res.getString("due_in_date"), 
						res.getString("invoice_currency"), res.getString("document_type"), 
						res.getInt("posting_id"), res.getDouble("total_open_amount"), 
						res.getString("baseline_create_date"), res.getString("cust_payment_terms"), 
						res.getInt("invoice_id"));
				
				fetchArr.add(fetch);	
			}
			Response.put("Details",fetchArr);

				Gson g=new Gson();
				String jsonString = g.toJson(Response);
				response.setHeader("Access-Control-Allow-Origin", "*");
				response.getWriter().append(jsonString);
			
			conn.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
}

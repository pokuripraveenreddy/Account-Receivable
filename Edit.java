package com.project.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Edit
 */
@WebServlet("/Edit")
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Edit() {
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
			final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
			final String URL = "jdbc:mysql://localhost:3306/grey_goose";
			final String User = "root";
			final String Password = "Praveen@9";
			
			String invoice_currency = request.getParameter("invoice_currency");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			String invoice_id = request.getParameter("invoice_id");
		
			Class.forName(JDBC_DRIVER);
			Connection conn = DriverManager.getConnection(URL,User,Password);
			String query = "UPDATE winter_internship set invoice_currency = ?, cust_payment_terms = ? where invoice_id = ?";
			
			PreparedStatement ps = conn.prepareStatement(query);
			ps.setString(1, invoice_currency);
			ps.setString(2, cust_payment_terms);
			ps.setString(3, invoice_id);
			
			if(ps.executeUpdate() > 0) {
				Response.put("status",true);
			}else{
				Response.put("status",false);
			}
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

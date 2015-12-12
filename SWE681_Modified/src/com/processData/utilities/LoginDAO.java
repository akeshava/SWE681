package com.processData.utilities;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.processData.Beans.UserBean;

public class LoginDAO {

	public boolean find(UserBean user) 
	{
		boolean verifiedUser = false;
		try {
			Connection con = getDatabaseConnection();

			PreparedStatement ps = con
					.prepareStatement("select * from UserLogin where username = ? and password = ?");

			ps.setString(1, user.getUsername());
			ps.setString(2, user.getPassword());

			ResultSet rs = ps.executeQuery();
			verifiedUser = rs.next();
		} catch (SQLException e) {
			System.out.println("Error retrieving user data from the database!");
		}

		return verifiedUser;
	} 
	
	public boolean isexistingUser(String username, Connection con)
	{	
		boolean userExists = false;
		
		try {
			PreparedStatement ps = con.prepareStatement("select * from UserLogin where username = ?");
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();
			userExists =  rs.next();
		} catch (SQLException e) {
			System.out.println("Error while checking for an existing user!");
			e.printStackTrace();
		}
			
		return userExists;
	}
	
	public String register(UserBean user)
	{	
		String registerSuccess = null;
		try {
			Connection con = getDatabaseConnection();			
			boolean userExists = isexistingUser(user.getUsername(),con);
			
			if(!userExists){
				PreparedStatement ps = con.prepareStatement("INSERT INTO UserLogin VALUES (?, ?)");
				ps.setString(1, user.getUsername());
				ps.setString(2, user.getPassword());
				ps.executeUpdate();
				registerSuccess = "success";
				
			}else{
				registerSuccess = "exists";
			}			
			
		} catch (Exception e) {
			registerSuccess = "error";
			System.out.println("Error retrieving user data from the database!");
		}
		return registerSuccess;
		
	}
private Connection getDatabaseConnection(){
		
		Connection con = null;
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			con = DriverManager.getConnection("jdbc:oracle:thin:@apollo.vse.gmu.edu:1521:ite10g", "akeshava", "teethi");
		} catch (SQLException e) {
			System.out.println("The connection to the database was unsuccessful.");
			e.printStackTrace();
		} catch(ClassNotFoundException cnfe){
			System.out.println("the oracle driver was not found for loading!");
		}
		
		return con;
	}
	
	private Connection getDataConnection(){
		Connection con = null;
		Context initContext;
		try {
			initContext = new InitialContext();
			Context envContext  = (Context)initContext.lookup("java:/comp/env");
			DataSource ds = (DataSource)envContext.lookup("jdbc/myoracle");
			con = ds.getConnection();
		
		} catch (NamingException | SQLException e) {			
			e.printStackTrace();
			System.out.println("the data source lookup failed!");
		}
		
		return con;
	}
}

package com.processData.Servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.processData.Beans.UserBean;
import com.processData.utilities.LoginDAO;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/Login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String action = request.getParameter("action");		
		String address = "";
		
		if(action != null)
		{
			if(action.equalsIgnoreCase("logout"))
			{
				request.getSession().invalidate();
				address = "/jsp/logout.jsp";
			}
			RequestDispatcher dispatcher = request.getRequestDispatcher(address);
			dispatcher.forward(request, response);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		HttpSession session = request.getSession();
		UserBean user = new UserBean();
		LoginDAO login = new LoginDAO();
		String address ="";
		String action = request.getParameter("action");
		System.out.println("action ==> "+action);
		
		//setting the user name and pwd in the user bean for further processing
		user.setUsername(request.getParameter("username"));
		user.setPassword(request.getParameter("password"));
			
		// the following logic is used to set the page forwarding for request dispatcher
		if(action!= null)
		{
			// if the user is trying to login, then check if the credentials are valid
		if(action.equalsIgnoreCase("login")){
			
			// call login dao to verify if the user exists in the database
			boolean verifiedUser = login.find(user);
				
			if(verifiedUser){
				session.setAttribute("user", user);
				address = "/jsp/home.jsp";
			}					
			else{
				session.setAttribute("error", "Unknown login, try again");
				address = "/jsp/index.jsp";		
			}
		}
		// if the user is trying to register, then add the credentials to database
		else if(action.equalsIgnoreCase("addUser"))
		{
			//call to login dao to register the user
			String success = login.register(user);
			session.setAttribute("registration", success);
			
			/*
			 * success: returned when the user was registered successfully
			 * error: returned when an unknown error occurred
			 * exists: returned when the given username already exists in the database
			 */
			
			if(success.equalsIgnoreCase("success"))
				address = "/jsp/index.jsp";
			else if(success.equalsIgnoreCase("error")||success.equalsIgnoreCase("exists"))								
				address = "/jsp/registerUser.jsp";				
		}
							
		RequestDispatcher dispatcher = request.getRequestDispatcher(address);
		dispatcher.forward(request, response);
		}
	}

}

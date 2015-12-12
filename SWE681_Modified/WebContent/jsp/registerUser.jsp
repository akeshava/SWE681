<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>User Registration</title>
<link href="../css/swe681.css" rel="stylesheet">
<script src="../js/swe681.js"></script>
</head>
<body>
	<h1>New User Registration:</h1>
	<br />
	<br />
	<%String error = (String)session.getAttribute("registration"); 
	
	if(error != null){
		if(error.equalsIgnoreCase("error")) {
			error = "Error encountered during user registration. Please try again!";
		}
		else if(error.equalsIgnoreCase("exists"))
			error = "The Username already exists. Please choose a different username!";%>
		<%= error %>
	<%} %>


	<form name="login" method="post" action="..//Login">
		<table align="center">
			<tr>
				<td>Please pick a username:</td>
				<td><input type="text" name="username" id="username" required autofocus /></td>
			</tr>
			<tr>
				<td>Please enter a password:</td>
				<td><input type="password" name="password" id="password" required /></td>
			</tr>
			<tr>
				<td><input type="hidden" name="action" value="addUser"></td>

				<td><input type="submit" name="submit" onclick="return validateForm()" /></td>
			</tr>
		</table>
	</form>
</body>
</html>
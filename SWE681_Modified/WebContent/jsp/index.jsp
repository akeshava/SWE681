<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires" content="Sat, 01 Dec 2001 00:00:00 GMT">
<title>Welcome</title>
<link href="../css/swe681.css" rel="stylesheet">
<script src="../js/swe681.js"></script>
</head>
<body>
	<h1>login</h1>
	
	<%String error = (String)session.getAttribute("error"); 
		if(error != null)
	%><%= error %>
	
	<%String registration = (String)session.getAttribute("registration"); 
		if(registration != null){
			if(registration.equalsIgnoreCase("success"))%>
				<%= "User successfully registered. Please login to access your account!" %>
		<% }%>
		
	<form name="login" method="post" action="..//Login">
		<table align="center">
			<tr>
				<td>name:</td>
				<td><input type="text" name="username" id="username" required autofocus /></td>
			</tr>
			<tr>
				<td>password:</td>
				<td><input type="password" name="password" id="password" required /></td>
			</tr>
			<tr>
				<td><input type="hidden" name="action" value="login"></td>

				<td><input type="submit" name="submit" onclick="return validateForm()" /></td>
			</tr>
		</table>
	</form>
	<br/>
	<a href="./jsp/registerUser.jsp"> New User? Click Here</a>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import = "com.processData.Beans.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>homepage</title>
<link href="../css/swe681.css" rel="stylesheet">
</head>
<body>
	<a href="..//Login?action=logout" style= "text-align: right">Log out</a>


	<%UserBean user = (UserBean)session.getAttribute("user"); 
		if(user != null){
			%>
			<h2>	Welcome , <%= user.getUsername() %> </h2>
		<% }%>
<br/>
<p>You can get started on the game now!</p>
</body>
</html>
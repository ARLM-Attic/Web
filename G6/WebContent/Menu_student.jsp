<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ page import = "java.sql.*"%>
 <%
String oppo=(String) request.getSession().getAttribute("name");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>学生页面</title>

<link href="Ext4.2/resources/css/ext-all-neptune.css" rel="stylesheet" />
	<script src="Ext4.2/bootstrap.js"></script>
	<script type="text/javascript" src="Ext4.2/locale/ext-lang-zh_CN.js"></script>	
	<link rel="stylesheet" type="text/css" href="icon.css" />
	<script type="text/javascript" src="Ext4.2/examples/shared/examples.js"></script>
	 <link rel="stylesheet" type="text/css" href="Ext4.2/examples/shared/example.css" />
    <script type="text/javascript" src=" student_paper_manager.js"></script>
    
    <script type="text/javascript" src="Menu_student.js"></script>
    <script type="text/javascript">

	  var name='<%=oppo%>'; 
	</script>
</head>
<body>

</body>
</html>
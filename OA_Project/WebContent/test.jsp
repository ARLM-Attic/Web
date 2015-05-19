<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<LINK HREF="style/blue/login.css" type=text/css rel=stylesheet />
<title>OA Project</title>
</head>
<s:property value="mydata"/><br></br>
<s:property value="%{mydata}"/><br></br>
<s:property value="#request.mydata"/><br></br>
<s:property value="#application.mydata"/><br></br>
<s:property value="#session.mydata"/><br></br>
<s:property value="#mydata"/><br></br>
<s:property value="#attr.mydata"/><br></br>
<s:property value="#attr.mydata"/><br></br>

<h3>${mydata}</h3>

</BODY>
</html>
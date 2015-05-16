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
<BODY LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0 CLASS=PageBody >
<FORM METHOD="post" NAME="actForm" ACTION="login.action">
    <DIV ID="CenterAreaBg">
        <DIV ID="CenterArea">
            <DIV ID="LogoImg"><IMG BORDER="0" SRC="style/blue/images/logo.png" /></DIV>
            <DIV ID="LoginInfo">
                <TABLE BORDER=0 CELLSPACING=0 CELLPADDING=0 width=100%>
                    <TR>
                        <TD width=45 CLASS="Subject"><IMG BORDER="0" SRC="style/blue/images/login/userId.gif" /></TD>
                        <TD><INPUT SIZE="20" CLASS="TextField" TYPE="text" NAME="loginName" required="required"/></TD>
                        <TD ROWSPAN="2" STYLE="padding-left:10px;"><INPUT TYPE="image" SRC="style/blue/images/login/userLogin_button.gif"/></TD>
                    </TR>
                    <TR>
                        <TD CLASS="Subject"><IMG BORDER="0" SRC="style/blue/images/login/password.gif" /></TD>
                        <TD><INPUT SIZE="20" CLASS="TextField" TYPE="password" NAME="password" required="required"/></TD>
                    </TR>
                </TABLE>
            </DIV>
             <%
			     Object state=request.getSession().getAttribute("user");
                 String ok=(String)request.getSession().getAttribute("state");
                 if(state==null&&ok!=null){
			 %>           
              <DIV ID="CopyRight"> 密码或账号错误</DIV>
            <% } %>
            
        </DIV>
    </DIV>
</FORM>
</BODY>
</html>
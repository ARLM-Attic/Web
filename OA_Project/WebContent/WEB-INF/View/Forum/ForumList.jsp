<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <%@ include file="/WEB-INF/View/common/head.jspf" %>
   
</head>
<body>
<div id="Title_bar">
    <div id="Title_bar_Head">
        <div id="Title_Head"></div>
        <div id="Title"><!--页面标题-->
            <img border="0" width="13" height="13" src="${pageContext.request.contextPath}/style/images/title_arrow.gif"/> 版块管理
        </div>
        <div id="Title_End"></div>
    </div>
</div>

<div id="MainArea">
    <table cellspacing="0" cellpadding="0" class="TableStyle">
       
        <!-- 表头-->
        <thead>
            <tr align="CENTER" valign="MIDDLE" id="TableTitle">
            	<td width="250px">版块名称</td>
                <td width="300px">版块说明</td>
                <td width="250px">position</td>
                <td>相关操作</td>
            </tr>
        </thead>

		<!--显示数据列表-->
        <tbody id="TableData" class="dataContainer" datakey="forumList">
		<s:iterator value="#lists">
			<tr class="TableDetail1 template">				
				<td>${name}&nbsp;</td>								
				<td>${description}&nbsp;</td>
				<td>${position}&nbsp;</td>
				<td>
				<s:a action="forum_delete?id=%{id}" onClick="return window.confirm('您确定要删除吗？')">删除</s:a>
				<s:a action="forum_updateUI?id=%{id}">修改</s:a>
				<s:a action="forum_up?id=%{id}" >上移</s:a>
				<s:a action="forum_down?id=%{id}">下移</s:a>
				</td>
			</tr>
		</s:iterator>
			<%-- <tr class="TableDetail1 template">
				<td>${forum.name}&nbsp;</td>
				<td>${forum.description}&nbsp;</td>
				<td><a onClick="return delConfirm()" href="list.html">删除</a>
					<a href="saveUI.html">修改</a>
					<a href="#">上移</a>
					<a href="#">下移</a>
				</td>
			</tr> --%>
        </tbody>
    </table>
    
    <!-- 其他功能超链接 -->
    <div id="TableTail">
        <div id="TableTail_inside">
            <a href="forum_addUI.action"><img src="${pageContext.request.contextPath}/style/images/createNew.png" /></a>
        </div>
    </div>
</div>

<div class="Description">
	说明：<br />
	1，显示的列表按其sortOrder值升序排列。<br />
	2，可以通过上移与下移功能调整顺序。最上面的不能上移，最下面的不能下移。<br />
</div>


</body>
</html>
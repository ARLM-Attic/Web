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
            <img border="0" width="13" height="13" src="${pageContext.request.contextPath}/style/images/title_arrow.gif"/> 用户管理
        </div>
        <div id="Title_End"></div>
    </div>
</div>

<div id="MainArea">
    <table cellspacing="0" cellpadding="0" class="TableStyle">
       
        <!-- 表头-->
        <thead>
            <tr align=center valign=middle id=TableTitle>
                <td width="100">登录名</td>
                <td width="100">姓名</td>
                <td width="100">所属部门</td>
                <td width="200">岗位</td>
                <td>备注</td>
                <td>相关操作</td>
            </tr>
        </thead>
        
        <!--显示数据列表-->
        <tbody id="TableData" class="dataContainer" datakey="lists">
        <s:iterator value="#lists">
			<tr class="TableDetail1 template">
				<td><a href="#">${loginName}</a>&nbsp;</td>
				<!--  放入值栈的是Department的parent属性,我们要显示parent里的name属性 -->
				<td>${name}&nbsp;</td>
				<!-- 获取user实体的Department实体要解决懒加载问题 -->
				<td>${department.name}&nbsp;</td>
				<td> 
				<!-- 要解决懒加载问题，循环输出多个岗位，即输出roles集合里面的那么 -->
				<s:iterator value="roles">
				   ${name}&nbsp;
				</s:iterator>
				</td>
				<td>${description}&nbsp;</td>
				<td>
				<s:a action="user_delete?id=%{id}" onClick="return confirm('确定删除吗?')">删除</s:a>
				<s:a action="user_init?id=%{id}" onClick="return window.confirm('您确定要初始化密码为1234吗？')">初始化密码</s:a>
				</td>
			</tr>
		</s:iterator>
      
    </table>
    
    <!-- 其他功能超链接 -->
    <div id="TableTail">
        <div id="TableTail_inside">
            <a href="user_addUI.action"><img src="${pageContext.request.contextPath}/style/images/createNew.png" /></a>
        </div>
    </div>
</div>
</body>
</html>
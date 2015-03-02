/*
 * 登陆拦截器
 */
package action;

import java.util.Map;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import student.Student;

public class loginInterceptot extends AbstractInterceptor {
	@Override 
	public String intercept(ActionInvocation invocation) throws Exception {  
		  
        // 取得请求相关的ActionContext实例  
        ActionContext ctx = invocation.getInvocationContext();  
        Map session = ctx.getSession();
        //fuck谁写的登陆部分，用户类名是student？老师和管理员不用管了吗
        Student user = (Student) session.get("LoginedUser"); 
  
        // 如果没有登陆，都返回重新登陆  
  
        if (user != null) {  
            System.out.println("登陆校验测试");
            System.out.println(((Student) session.get("LoginedUser")).getID());
            System.out.println(((Student) session.get("LoginedUser")).getNAME());
            System.out.println(((Student) session.get("LoginedUser")).getPASSWORD());
            return invocation.invoke();
        }
  
        ctx.put("tip", "你还没有登录");  
        return Action.LOGIN;  
  
    }  
}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
// 要进行页面跳转 所以要导入路由
import {Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm= {
    email: '123',
    password:'123'
  }
  email_err_msg = '123'
  
  // 在组件类中声明了一个私有成员 http 它的类型是 HttpClient
  // 那么 Angular 会自动去实例化 HttpClient 得到一个实例
  // 然后我们就可以在组件中使用 http 这个成员来调用一些请求方法了
  // 例如 http.get http.post...
  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  signup() {
    // 表单验证 获取表单数据 发起http请求和服务端交互 根据响应结果做交互处理
    const formData = this.signupForm
    this.http.post('http://localhost:3000/users', formData)
      .toPromise()
      .then((data: any) => {
        this.email_err_msg = ''
        console.log(data);
        
        window.localStorage.setItem('auth_token', data.token)
        window.localStorage.setItem('user_info', JSON.stringify(data.user))
      //  路由跳转路径 路由导航
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err);
        
        if (err.status === 409) {
        this.email_err_msg='邮箱已被占用'
      }
    })

  }

}

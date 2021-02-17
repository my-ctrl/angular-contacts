import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
// 要进行页面跳转 所以要导入路由
import {Router} from '@angular/router'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm= {
    email: '123',
    password:'123'
  }
  email_err_msg = '123'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  signin() {
    // 表单验证 获取表单数据 发起http请求和服务端交互 根据响应结果做交互处理
    // const formData = this.signinForm
    this.http.post('http://localhost:3000/session', this.signinForm)
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
        
        if (err.status === 401) {
        this.email_err_msg='登录失败，邮箱或密码错误'
      }
    })

  }
}

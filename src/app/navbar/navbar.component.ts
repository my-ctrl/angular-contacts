import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user=JSON.parse( window.localStorage.getItem('user_info')||'{}')
  constructor(
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    
  }
  siginout() {
    this.http.delete('http://localhost:3000/session')
      .toPromise()
      .then((data: any) => {
        window.localStorage.removeItem('auth_token');
        this.router.navigate(['/signin'])
      })
      .catch(err => {
      window.alert('退出失败')
    })

  }

}

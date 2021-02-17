import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import {HttpClient,HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts:any
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
    this.http.get('http://localhost:3000/contacts')
      .toPromise()
      .then(data => {
        this.contacts=data
      console.log(data);
      
      }).catch(err => {
      console.log(err);
      
    })
  }

}

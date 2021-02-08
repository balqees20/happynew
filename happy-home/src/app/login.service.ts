import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logurl = "http://localhost:4620/sitManger/login"

  constructor(private http: HttpClient) { }



  login(mangerName, password) {
    let body = {
      "sitManger": {
        "mangerName": mangerName,
        "password": password
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }

    return this.http.post(this.logurl, body, httpOptions)
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('name');
  }
  role() {
    return localStorage.getItem('name');
  }
}

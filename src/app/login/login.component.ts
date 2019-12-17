import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  background  = '../../assets/images/padel_0.jpg';
  private formModel: FormGroup;
  private password = '';
  private username = '';
  private baseurl = 'http://fenw.etsisi.upm.es:10000';
  private loginurl = '';
  private mytoken = '';
  private jsonobj = null;
  private aproperty = null;

  constructor(private http: HttpClient, private router: Router) {
    this.formModel = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }
  public login() {
    this.username = this.formModel.get('username').value;
    this.password = this.formModel.get('password').value;
    // console.log(this.username);
    // console.log(this.password);
    this.loginurl = this.baseurl + '/users/login?username=' + this.username + '&password=' + this.password;
    return this.http.get(this.loginurl,{observe: 'response'})
      .subscribe(response => {
          this.mytoken = response.headers.get('Authorization');
          this.jsonobj = response.body;
          sessionStorage.setItem('token', this.mytoken);
          sessionStorage.setItem('username', this.username);
          this.router.navigateByUrl('inicio');
      });
  }



  ngOnInit() {
    if (sessionStorage.getItem('token') || sessionStorage.getItem('username')) {
      this.router.navigateByUrl('inicio');
    }
  }
}

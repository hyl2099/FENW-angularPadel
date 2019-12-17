import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; //导入router服务

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  myImage = '../../assets/images/nuevo.png';
  showlogin = true;
  showlogout = false;
  private username ='';
  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') || sessionStorage.getItem('username')) {
      this.showlogout = true;
      this.showlogin = false;
      this.username = sessionStorage.getItem('username');
    }
    else {
      this.showlogout = false;
      this.showlogin = true;
    }
  }

  inicio(){
    // 跳转到login路由（绝对路径）
    this.router.navigateByUrl('inicio');
  }

  servicios(){
    // 跳转到servicios路由（绝对路径）
    this.router.navigateByUrl('');
  }

  instalaciones(){
    // 跳转到instalaciones路由（绝对路径）
    this.router.navigateByUrl('instalaciones');
  }

  reservas(){
    // 跳转到reservas路由（绝对路径）
    this.router.navigateByUrl('reservas');
  }

  registro(){
    // 跳转到registro路由（绝对路径）
    this.router.navigateByUrl('registro');
  }

  login(){
    // 跳转到login路由（绝对路径）
    this.router.navigateByUrl('login');
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    console.log(sessionStorage.getItem('token'));
    this.router.navigateByUrl('inicio');
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-indexcontent',
  templateUrl: './indexcontent.component.html',
  styleUrls: ['./indexcontent.component.css']
})
export class IndexcontentComponent implements OnInit {
  class_padel = '../../assets/images/class_padel.jpg';
  campeonatos = '../../assets/images/campeonatos.png';
  myImage = '../../assets/images/nuevo.png';
  background = '../../assets/images/cabecera.png';
  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') || sessionStorage.getItem('username')) {
      this.router.navigateByUrl('inicio');
    }
  }

}

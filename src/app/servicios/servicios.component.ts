import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  cafe = '../../assets/images/cafe.jpg';
  ducha = '../../assets/images/ducha.jpg';
  cambia = '../../assets/images/cambia.jpg';

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  background  = '../../assets/images/padel_0.jpg';
  private time;
  private num;
  private formModel: FormGroup;
  private baseurl = 'http://fenw.etsisi.upm.es:10000';
  private reservenurl = '';
  private mytoken = '';
  private jsonobj = null;
  constructor(private http: HttpClient, private router: Router) {
    this.formModel = new FormGroup({
      time: new FormControl(),
      num: new FormControl()
    })
  }

  ngOnInit() {
    if (sessionStorage.getItem('token') || sessionStorage.getItem('username')) {
      this.router.navigateByUrl('inicio');
    }
  }

  public reserve(){
    this.time = this.formModel.get('time').value;
    this.num = this.formModel.get('num').value;
  }

}

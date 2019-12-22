import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Reserva } from '../shared/models/reserva.model';
import { AuthService } from '../shared/services/auth/auth.service'

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  background  = '../../assets/images/padel_0.jpg';
  private day;
  private time;
  private num;
  private formModel: FormGroup;
  private baseurl = 'http://fenw.etsisi.upm.es:10000';
  private reservenurl = '';
  private mytoken = sessionStorage.getItem('token').substring(7, sessionStorage.getItem('token').length);
  private showreserved = false;
  private showtokenerror = false;
  private showmaxsimum = false;
  private showdateerror = false;

  constructor(private http: HttpClient, private router: Router, public flashMessage: FlashMessagesService,
  public authService: AuthService) {
    this.formModel = new FormGroup({
      time: new FormControl(),
      num: new FormControl(),
      day: new FormControl()
    })
  }
  ngOnInit() {
  }

  public reserve(){
    this.time = this.formModel.get('time').value;
    this.num = parseInt(this.formModel.get('num').value);
    this.day = this.formModel.get('day').value;
    let hh = this.time.substring(0,2);
    this.day.setHours(hh);
    this.day.setMinutes(0);
    this.day.setSeconds(0);
    console.info(this.day.getTime());
    this.reservenurl = this.baseurl + '/reservations?courtid=' + this.num + '&rsvdatetime=' + this.day.getTime();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer '+ this.mytoken)
    };
    console.info(this.mytoken);
    console.info(header);
    // JSON.parse(
    return this.http.post(this.reservenurl, header,{observe: 'response'})
      .subscribe(response => {
        this.showreserved = true;
        },
      error => {
          if(status === '401'){
            this.showtokenerror = false;
          }
          if(status === '409'){
            this.showmaxsimum = false;
          }
          if(status === '409'){
            this.showmaxsimum = false;
          }
          if(status === '400'){
            this.showdateerror = false;
          }
        }
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { ReservasService } from './reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  background  = '../../assets/images/padel_0.jpg';
  private userReservations = [];
  private availableHours = [];
  private hoursDialog = false;
  private courtsDialog = false;
  private selectedDate;
  private selectedHour;
  private selectedCourt;

  public courts = [
    {value: '1', label: 'Pista 1'},
    {value: '2', label: 'Pista 2'},
    {value: '3', label: 'Pista 3'},
    {value: '4', label: 'Pista 4'},
  ];
  public errors = {
    session: false,
    internalError: false,
    invalidReservation: false,
    maximumReservationsReached : false,
    server: false
  };

  constructor(private reservasService: ReservasService) { }

  ngOnInit() {
    this.getUserReservations();
    this.checkSession();
  }

  checkSession() {
    return sessionStorage.getItem('token');
  }

  getUserReservations() {
    this.reservasService.getUserReservations().subscribe(
      (resp) => {
        sessionStorage.setItem('token', resp.headers.get('Authorization'));
        this.userReservations = [];
        resp.body.forEach(rsv => {
          this.userReservations.push(rsv);
        });
      },
      (error) => {
        if (error.status === 401) {
          this.errors.session = true;
          sessionStorage.clear();
        } else if (error.status === 500) {
          this.errors.server = true;
          sessionStorage.clear();
        }
      }
    );
  }

  setDate(datepicker) {
    if (datepicker._selected) {
      this.selectedDate = new Date();
      this.selectedDate = datepicker._selected;
      this.setHours();
    }
  }

  setHours() {
    const HOURS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    this.availableHours = HOURS;

    this.reservasService.getAllUsersReservations(this.selectedDate).subscribe(
      (resp) => {
        sessionStorage.setItem('token', resp.headers.get('Authorization'));
        resp.body.forEach(rsv => {
          this.availableHours.splice(this.availableHours.indexOf(rsv.rsvtime), 1);
        });
      },
      (error) => {
        if (error.status === 401) {
          this.errors.session = true;
          sessionStorage.clear();
        } else if (error.status === 500) {
          this.errors.server = true;
          sessionStorage.clear();
        }
      }
    );
  }



  openHoursDialog() {
    this.hoursDialog = true;
  }

  selectHour(hour, time) {
    time.value = hour;
    this.selectedHour = parseInt(hour, 10) * 3600 * 1000;
    this.selectedDate.setHours(parseInt(hour, 10));
    this.closeHoursDialog();
  }

  closeHoursDialog() {
    this.hoursDialog = false;
  }

  openCourtsDialog() {
    this.courtsDialog = true;
  }

  selectCourt(court,courtchosen) {
    courtchosen.value = court.label;
    this.selectedCourt = parseInt(court.value);
    this.closeCourtsDialog();
  }

  closeCourtsDialog() {
    this.hoursDialog = false;
  }

  reserve() {
    this.errors.invalidReservation = false;
    this.errors.maximumReservationsReached = false;

    const reservationTime = this.selectedDate.getTime();
    this.reservasService.setReservation(this.selectedCourt, reservationTime).subscribe(
      response => {
        this.getUserReservations();
      },
      error => {
        if (error.status === 401) {
          this.errors.session = true;
          sessionStorage.clear();
        } else if (error.status === 400) {
          this.errors.invalidReservation = true;
        } else if (error.status === 409) {
          this.errors.maximumReservationsReached = true;
        } else if (error.status === 500) {
          this.errors.server = true;
          sessionStorage.clear();
        }

      }
    );
  }

  deteteReservation(rsvId) {
    this.reservasService.deleteReservation(rsvId).subscribe(
      (resp) => {
        this.getUserReservations();
      },
      (error) => {
        if (error.status === 401) {
          this.errors.session = true;
          sessionStorage.clear();
        } else if (error.status === 404) {
          this.errors.internalError = true;
        }
      }
    )
  }
}

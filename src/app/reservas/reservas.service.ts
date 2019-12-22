import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private reservationUrl = 'http://fenw.etsisi.upm.es:10000' + '/reservations';

  constructor(public httpClient: HttpClient) { }

  getUserReservations() {
    return this.httpClient.get<any[]>(this.reservationUrl, {
      observe: 'response',
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token')})
    });
  }

  getAllUsersReservations(data) {
    const usersRVTurl = this.reservationUrl + data;
    return this.httpClient.get<any[]>(usersRVTurl, {
      observe: 'response',
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token')})
    });
  }

  setReservation(courtid, rsvdatetime) {
    const data = {
      'courtid': courtid,
      'rsvdatetime': rsvdatetime,
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.post(this.reservationUrl, data, {
      headers: headers,
    });
  }

  deleteReservation(id) {
    const deleteRsvUrl = this.reservationUrl + id;
    return this.httpClient.delete(deleteRsvUrl, {
      observe: 'response',
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token')})
    });
  }
}

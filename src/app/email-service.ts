import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl: string = "https://api.mail.gw";

  constructor(private http: HttpClient) {}

  setupAccount(): Observable<any> {

    return this.http.get<any>(this.baseUrl + "/domains")

  }
}

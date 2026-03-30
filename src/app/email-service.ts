import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl: string = 'https://api.mail.gw';
  emailAddress: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  generateString() {
    return Math.random().toString(36).substring(7);
  }

  setupAccount(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/domains').pipe(
      map((domains) => {
        let domainList = domains['hydra:member'];
        return domainList[Math.floor(Math.random() * domainList.length)]['domain'];
      }),
      switchMap((domain) => {
        this.emailAddress = this.generateString() + '@' + domain;
        this.password = this.generateString() + this.generateString();

        return this.http
          .post<any>(this.baseUrl + '/accounts', {
            address: this.emailAddress,
            password: this.password,
          })
          .pipe(
            switchMap((account) => {
              return this.http
                .post<any>(this.baseUrl + '/token', {
                  address: this.emailAddress,
                  password: this.password,
                })
                .pipe(
                  map((token) => {
                    return [token['token'], this.emailAddress];
                  }),
                );
            }),
          );
      }),
    );
  }
}

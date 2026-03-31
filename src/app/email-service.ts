import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl: string = 'https://api.mail.gw';
  private emailAddress: string = '';
  private password: string = '';

  constructor(private http: HttpClient) {}

  // Function to generate a random string to be used as password or email adress.
  generateString() {
    return Math.random().toString(36).substring(7);
  }

  // Function to be called for creating data.
  setupAccount(): Observable<{ token: any; emailAddress: string }> {
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
                    return { token: token['token'], emailAddress: this.emailAddress };
                  }),
                );
            }),
          );
      }),
    );
  }
}

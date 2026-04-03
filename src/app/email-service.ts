import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailMessage } from '../EmailMessage';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl: string = 'https://api.mail.gw';
  private emailAddress: string = '';
  private password: string = '';
  token: string = '';

  constructor(private http: HttpClient) {}

  // Function to generate a random string to be used as password or email adress.
  generateString() {
    return Math.random().toString(36).substring(7);
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
  }

  private getSenderAddress(message: any): string {
    return typeof message.from === 'string' ? message.from : (message.from?.address ?? '');
  }

  private getHtmlBody(message: any): string {
    const html = message.html ?? message.htmlBody ?? '';

    if (Array.isArray(html)) {
      return html.join('');
    }

    return typeof html === 'string' ? html : '';
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
                    this.token = token['token'];
                    return { token: token['token'], emailAddress: this.emailAddress };
                  }),
                );
            }),
          );
      }),
    );
  }

  retrieveMssages(): Observable<EmailMessage> {
    return this.http.get<any>(this.baseUrl + '/messages', {
      headers: this.getAuthHeaders(),
    }).pipe(
      map((messages) => messages['hydra:member'] ?? []),
      switchMap((messageList: any[]) =>
        from(
          messageList.map((message: any) =>
            new EmailMessage(
              message.id,
              message.subject,
              message.intro,
              this.getSenderAddress(message),
              message.createdAt,
              this.getHtmlBody(message),
            ),
          ),
        ),
      ),
    );
  }

  retrieveMessageById(messageId: string): Observable<EmailMessage> {
    return this.http
      .get<any>(`${this.baseUrl}/messages/${messageId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((message) =>
          new EmailMessage(
            message.id,
            message.subject,
            message.intro,
            this.getSenderAddress(message),
            message.createdAt,
            this.getHtmlBody(message),
          ),
        ),
      );
  }
}

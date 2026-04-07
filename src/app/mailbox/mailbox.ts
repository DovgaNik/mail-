import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { catchError, distinctUntilChanged, Observable, of, switchMap, tap, timer } from 'rxjs';
import { EmailService } from '../email-service';
import { EmailMessage } from '../EmailMessage';

@Component({
  selector: 'app-mailbox',
  imports: [CommonModule],
  templateUrl: './mailbox.html',
  styleUrl: './mailbox.css',
})
export class Mailbox {
  private authToken: string = '';

  loading: boolean = true;
  errorMessage: string = '';

  @Input() set token(value: string) {
    this.authToken = value ?? '';
    this.messages$ = this.createMessagesStream();
  }

  messages$: Observable<EmailMessage[]> = of([]);

  constructor(private emailService: EmailService) {}

  private createMessagesStream(): Observable<EmailMessage[]> {
    return of(this.authToken).pipe(
      distinctUntilChanged(),
      switchMap((token) => {
        if (!token) {
          this.loading = false;
          return of([]);
        }

        return timer(0, 10000).pipe(
          switchMap(() => {
            this.loading = true;
            return this.emailService.retrieveMessages(token).pipe(
              tap(() => {
                this.loading = false;
                this.errorMessage = '';
              }),
              catchError(() => {
                this.loading = false;
                this.errorMessage = 'Unable to load emails right now.';
                return of([]);
              }),
            );
          }),
        );
      }),
    );
  }
}

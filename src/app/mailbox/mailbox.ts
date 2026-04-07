import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { catchError, distinctUntilChanged, Observable, of, switchMap, tap, timer } from 'rxjs';
import { EmailService } from '../email-service';
import { EmailMessage, EmailParticipant } from '../EmailMessage';

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
  selectedMessage: EmailMessage | null = null;
  loadingSelectedMessage: boolean = false;
  selectedMessageError: string = '';

  @Input() set token(value: string) {
    this.authToken = value ?? '';
    this.closeMessage();
    this.messages$ = this.createMessagesStream();
  }

  messages$: Observable<EmailMessage[]> = of([]);

  constructor(private emailService: EmailService) {}

  openMessage(message: EmailMessage): void {
    if (!this.authToken || !message?.id) {
      return;
    }

    // Show the detail panel immediately, then hydrate it with full API payload.
    this.selectedMessage = message;
    this.loadingSelectedMessage = true;
    this.selectedMessageError = '';

    this.emailService.retrieveMessageById(message.id, this.authToken).subscribe({
      next: (message) => {
        this.selectedMessage = message;
        this.loadingSelectedMessage = false;
      },
      error: () => {
        this.loadingSelectedMessage = false;
        this.selectedMessageError = 'Unable to open this email.';
      },
    });
  }

  closeMessage(): void {
    this.selectedMessage = null;
    this.loadingSelectedMessage = false;
    this.selectedMessageError = '';
  }

  formatRecipients(participants: EmailParticipant[] | undefined): string {
    if (!participants || participants.length === 0) {
      return '-';
    }

    return participants.map((recipient) => recipient.address).join(', ');
  }

  getMessageHtml(message: EmailMessage): string {
    return message.htmlBody?.[0] ?? '';
  }

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

export class EmailMessage {
  id: string;
  subject: string;
  intro: string;
  from: string;
  timestamp: Date;
  htmlBody: string;

  constructor(
    id: string,
    subject: string,
    intro: string,
    from: string,
    timestamp: string,
    htmlBody: string,
  ) {
    this.id = id;
    this.subject = subject;
    this.intro = intro;
    this.from = from;
    this.timestamp = new Date(timestamp);
    this.htmlBody = htmlBody;
  }

}
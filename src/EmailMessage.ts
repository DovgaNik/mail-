export class EmailMessage {
  id: string;
  subject: string;
  intro: string;
  from: string;
  timestamp: Date;

  constructor(id: string, subject: string, intro: string, from: string, timestamp: string) {

    this.id = id;
    this.subject = subject;
    this.intro = intro;
    this.from = from;
    this.timestamp = new Date(timestamp);

  }

}
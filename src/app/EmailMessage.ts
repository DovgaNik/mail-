export class EmailParticipant {
  address: string = '';
  name: string = '';
}

export class EmailMessage {
  id: string = '';
  accountId: string = '';
  msgid: string = '';
  from: EmailParticipant = new EmailParticipant();
  to: EmailParticipant[] = [];
  cc?: EmailParticipant[];
  bcc?: EmailParticipant[];
  subject: string = '';
  intro: string = '';
  seen: boolean = false;
  isDeleted: boolean = false;
  hasAttachments: boolean = false;
  size: number = 0;
  downloadUrl: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  text?: string;
  htmlBody?: string[];
}

export interface MessagesCollectionResponse {
  'hydra:member': EmailMessage[];
}

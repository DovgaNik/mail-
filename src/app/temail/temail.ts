import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mailbox } from '../mailbox/mailbox';

@Component({
  selector: 'app-temail',
  standalone: true,
  imports: [CommonModule, Mailbox], 
  templateUrl: './temail.html',
  styleUrls: ['./temail.css']
})
export class Temail {}

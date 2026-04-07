import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  members = [
    {
      firstName: 'Nikita',
      lastName: 'Dovhan',
      avatar: '/nikita.png',
      github: 'https://github.com/DovgaNik',
      description: `Spent 48 hours staring at JSON objects until they started staring back. Nikita is the reason the "Generate" button actually does something other than refresh the page.`
    },
    {
      firstName: 'Malo',
      lastName: 'Barbaud',
      avatar: '/malo.png',
      github: 'https://github.com/Malo-35',
      description: `Malo's job was to make sure Nikita's data didn't break Anne-Amélie's beautiful layouts. Essentially spent the whole project working with Nikita and saying "Hey Nikita, the API is returning a 404," and "Hey Anne-Amélie, we can't actually make the email dance."`
    },
    {
      firstName: 'Anne-Amélie',
      lastName: 'Nassiet-Combe',
      avatar: '/anne-amelie.png',
      github: 'https://github.com/anne-amelie',
      description: `Anne-Amélie dealt with the CSS so the rest of the team didn't have to. If a button glows or a margin is perfectly aligned, thank Anne-Amélie. If you find a single stray pixel, please don't tell her... she's been through enough.`
    }
  ];
}
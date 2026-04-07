import { Routes } from '@angular/router';
import { Temail } from './temail/temail';
import { Mailbox } from './mailbox/mailbox';
import { AboutUs } from './about-us/about-us';


export const routes: Routes = [
    { path: '', component: Temail },
    { path: '', component: Mailbox },
    { path: 'about-us', component: AboutUs }
];

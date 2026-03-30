import { Routes } from '@angular/router';
import { Temail } from './temail/temail';
import { Mailbox } from './mailbox/mailbox';


export const routes: Routes = [
    { path: '', component: Temail },
    { path: '', component: Mailbox },
];

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mailbox } from '../mailbox/mailbox';
import { UtilsService } from '../shared/utils';
import { CookieService } from 'ngx-cookie-service';
import { EmailService } from '../email-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-temail',
  standalone: true,
  imports: [CommonModule, Mailbox], 
  templateUrl: './temail.html',
  styleUrls: ['./temail.css']
})
export class Temail {
  email_adress = "email-email.email@email.com"
  private current_account: Observable<any> = null   // Variable pour manipuler le compte mail actuel.

  // Déclaration de la dépendance UtilService.
  constructor(private utilsService: UtilsService, private cookieService: CookieService, private emailService: EmailService) {}

  ngOnInit(){
    // Ici on va regarder si toute les informations sont présentes.
    if(this.cookieService.check(this.utilsService.cookie_email_name) /*&& this.cookieService.check(this.utilsService.cookie_password_name)*/ && this.cookieService.check(this.utilsService.cookie_token_name)){
      this.email_adress = this.cookieService.get(this.utilsService.cookie_email_name)
    } else {
      this.getNewEmailAndSetCookie()
    }
  }

  onCopyButtonClick(){
    this.utilsService.copyToClipboardWithToast(this.email_adress.toString())
  }

  getNewEmailAndSetCookie(){
    this.current_account = this.emailService.setupAccount()

    // Ici on va vérifier individuellement que les cookies réservés aux informations des 
    if(this.cookieService.check(this.utilsService.cookie_email_name)){
      this.cookieService.delete(this.utilsService.cookie_email_name)
    }
    /*  Il semblerait que le mot de passe ne soit pas utile dans ce qui est demandé (mais je garde le code sous le bras au cas où)
    if(this.cookieService.check(this.utilsService.cookie_password_name)){
      this.cookieService.delete(this.utilsService.cookie_password_name)
    }*/
    if(this.cookieService.check(this.utilsService.cookie_token_name)){
      this.cookieService.delete(this.utilsService.cookie_token_name)
    }
  }
}

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
  private current_account: Observable<{ token: any; emailAddress: string }> | null = null   // Variable pour manipuler le compte mail actuel.

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
    this.utilsService.toastMessage("Getting a new adress email...")
    this.current_account = this.emailService.setupAccount()

    // Ici on va vérifier individuellement que les cookies réservés aux informations de l'addresse actuelle soient vide.
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

    this.current_account.subscribe((account) => {
      this.email_adress = account.emailAddress;

      // Stockage des cookies
      this.cookieService.set(this.utilsService.cookie_email_name, account.emailAddress, {
        expires: 1,     // Définit la durée de vie du cookie en jours, c'est utilisé pour limiter le risque de vol de session.
        path: '/',      // Je suppose que ça limite la présence du cookie à uniquement le chemin spécifié.
        //secure: true,       // Aurait normalement forcé à ce que les cookies soient envoyés uniquement en https.
        sameSite: 'Strict'  // Pour vérifier à ce que le site soit le même.
      });
      this.cookieService.set(this.utilsService.cookie_token_name, account.token);
    });
  }
}

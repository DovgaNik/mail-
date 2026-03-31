import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  // Variables globales.
  cookie_email_name: string = "cookie_email_name"   // Variable pour uniformiser le nom employé pour le cookie.
  //cookie_password_name: string = "cookie_password_name"   // Je risque de me faire tuer par le premier prof qui lira ces lignes (*。>Д<)o
  cookie_token_name: string = "cookie_token_name"


  constructor(private snackBar: MatSnackBar) {}

  /**
   * Fonction rapide pour copier un texte dans le presse-papier.
   * @param text Le texte au format string à copier dans le presse-papier.
   */
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text)
  }

  /**
   * Fonction pour copier un texte dans le presse-papier mais en signalant le résultat à l'utilisateur par l'aide d'un toast.
   * @param text Texte à mettre dans le presse-papier.
   * @param successToastMessage [Optionnel] Texte personnalisé à afficher dans le toast en cas de réussite.
   * @param failureToastMessage [Optionnel] Texte personnalisé affiché en cas d'échec.
   */
  copyToClipboardWithToast(text: string, successToastMessage?: string, failureToastMessage?: string): void {
    navigator.clipboard.writeText(text)
      .then(() => {
        if(successToastMessage){  // Vérifie que la valeur de l'argument est renseignée (mais aussi qu'elle ne soit pas une chaîne vide)
        this.toastMessage(successToastMessage);
        } else {                  // Sinon on affiche le toast par défaut.
          this.toastMessage('Successfuly copied to clipboard ! ☆*:.｡.o(≧▽≦)o.｡.:*☆')
        }
      })
      .catch(() => {
        if(failureToastMessage){
          this.toastMessage(failureToastMessage)
        } else {
          this.toastMessage('An error occured during the copy to the clipboard (┬┬﹏┬┬)');
        }
      });
  }

  /**
   * Fonction basique pour faire apparaître un toast avec du texte personnalisé.
   * @param message Le message au format string à faire apparaître.
   * @param duration La durée d'affichage du toast en milisecondes.
   */
  toastMessage(message: string, duration: number = 2000): void {
    this.snackBar.open(message, 'Fermer', { duration });
  }
}
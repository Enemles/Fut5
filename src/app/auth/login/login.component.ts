import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  async onLogin(): Promise<void> {
    if (this.email && this.password) {
      try {
        await this.authService.login(this.email, this.password);
        this.showSuccessSnackBar('Vous êtes connecté.');
      } catch (error) {
        const errorMessage = this.getErrorMessage(error.code);
        this.showErrorSnackBar(errorMessage);
      }
    }
  }

  showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['snackbar-success', 'mat-primary']
    });
  }

  showErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 1000000,
      panelClass: ['snackbar-error', 'mat-warn']
    });
  }

  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'L\'adresse mail est mal formattée.';
      case 'auth/user-not-found':
        return 'Pas d\'utilisateur existant avec cette adresse mail.';
      case 'auth/wrong-password':
        return 'Le mot de passe est incorrect.';
      default:
        return 'La connexion a échoué. Veuillez réessayer.';
    }
  }
}

// register.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  password = '';
  dateNaissance = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password, this.nom, this.prenom, this.dateNaissance);
      this.showSuccessSnackBar('Vous êtes inscrit.');
      console.log('User registered');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = this.getErrorMessage(error.code);
      this.showErrorSnackBar(errorMessage);
    }
  }

  showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success', 'mat-primary']
    });
  }

  showErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error', 'mat-warn']
    });
  }

  getErrorMessage(errorCode: string): string {
     switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'L\'adresse mail est déjà utilisée par un autre compte.';
      case 'auth/invalid-email':
        return 'L\'adresse mail est mal formattée.';
      case 'auth/operation-not-allowed':
        return 'Les comptes email/mot de passe ne sont pas activés.';
      case 'auth/weak-password':
        return 'Le mot de passe est trop faible.';
      default:
        return 'L\'inscription a échoué. Veuillez réessayer.';
     }
  }
}

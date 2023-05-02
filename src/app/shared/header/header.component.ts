import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription?: Subscription;

  constructor(public authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
      this.authService.logout().then(() => {
        this.showSuccessSnackBar('Déconnecté.'); // Add this line
      }).catch(() => {
        this.showErrorSnackBar('Logout failed. Please try again.');
      });
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
}


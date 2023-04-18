import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async onLogin(): Promise<void> {
    if (this.email && this.password) {
      try {
        await this.authService.login(this.email, this.password);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async onSubmit() {
    const success = await this.authService.login(this.email, this.password);
    if (success) {
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  }

}

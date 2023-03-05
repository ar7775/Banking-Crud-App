import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  public email : string = '';

  constructor(private authService:AuthService){}

  public forgotPassword(): void{
    try {
      this.authService.forgotPassword(this.email);
      this.email='';
    } catch (error) {

    }
  }

}

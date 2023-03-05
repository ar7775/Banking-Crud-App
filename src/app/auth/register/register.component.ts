import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public email : string = '';
  public password : string = '';

  constructor(private authService: AuthService){}

  public register(): boolean | any {
    if(this.email == '')
    {
      alert('Please enter email');
      return;
    }
    if(this.password == '')
    {
      alert('Please enter password');
      return;
    }

    try {
      this.authService.register(this.email , this.password);
      this.email='';
      this.password='';
    } catch (error) {

    }
  }
}

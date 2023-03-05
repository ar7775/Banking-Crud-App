import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public email : string = '';
  public password : string = '';

  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('users');
    }
  }
  public login(): boolean | any {
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
      this.authService.login(this.email , this.password);
      this.email='';
      this.password='';
    } catch (error) {

    }
  }

  public signInWithGoogle(){
    try {
      this.authService.signInWithGoogle();
    } catch (error) {

    }
  }
}

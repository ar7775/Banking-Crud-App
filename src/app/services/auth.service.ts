import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider} from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth : AngularFireAuth, private router: Router) { }

  public login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then((res)=>{
      localStorage.setItem('token','true')
      this.router.navigate(['/users']);
    },err=>{
      alert('Invalid Credentials!');
      this.router.navigate(['/auth/login']);
    })
  }


  public register(email: string, password: string){
    this.fireAuth.createUserWithEmailAndPassword(email,password).then((res)=>{
      alert('Registration Successfull');
      this.router.navigate(['/auth/login']);
    },err=>{
      alert('Something went wrong');
      this.router.navigate(['/auth/register']);
    })
  }

  public logout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    },err=>{
      alert(err.message);
    })
  }

  public forgotPassword(email: string){
    this.fireAuth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/auth/login']);
    },err=>{
      alert('Something went wrong');
    })
  }

  public signInWithGoogle(): any {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/users']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message)
    })
  }

}

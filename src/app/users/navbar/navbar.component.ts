import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  _router = inject(Router)
  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this._router.navigateByUrl('auth');
    }
  }

}

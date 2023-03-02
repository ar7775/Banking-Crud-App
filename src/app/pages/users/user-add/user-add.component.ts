import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/commons/interfaces/customer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
  _customerService = inject(CustomerService);
  _router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    bal: new FormControl('', Validators.required)
  });

  addCustomer() {
    this._customerService.addCustomer({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    } as Customer);
    this._router.navigate(['users']);
  }

}

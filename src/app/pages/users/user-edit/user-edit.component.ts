import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  _location = inject(Location);
  _customerService = inject(CustomerService);
  _router = inject(Router);
  customer!: Customer;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    bal: new FormControl('', Validators.required)
  });


  ngOnInit() {
    console.log(this._location.getState());
    this.customer = (this._location.getState() as any).customer as Customer;
    if (this.customer) this.setCurrentCustomer(this.customer);
  }

  setCurrentCustomer(customer: any) {
    this.form.patchValue(customer);
  }

  updateCustomer() {
    console.log({
      id: this.customer.id,
      ...this.form.getRawValue(),
    });

    this._customerService.updateCustomer({
      id: this.customer.id,
      ...this.form.getRawValue(),
    } as Customer);
    this._router.navigate(['users']);
  }
}

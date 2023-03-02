import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from 'src/app/commons/interfaces/customer.interface';
import { debounceTime, Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // NgIf, NgFor, AsyncPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  customer$!: Observable<Customer[]>;
  _customerService = inject(CustomerService);
  _router = inject(Router);
  searcher = new FormControl('');

  ngOnInit(): void {
    this.customer$ = this._customerService.getCustomer();
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      // this._customerService.
      if (search) {
        console.log(search);
        this.customer$ = this._customerService.getCustomer(search);
      } else {
        this.customer$ = this._customerService.getCustomer();
      }
    });
  }

  editCustomer(customer: Customer) {
    this._router.navigateByUrl('users/edit', { state: { customer } });
  }
  deleteCustomer(customer: Customer) {
    if (confirm(`Confirm want to delete?${customer.name}`)) {
      this._customerService.deleteCustomer(customer.id);
    }
  }
}

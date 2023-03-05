import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection, getDocs } from '@firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../commons/interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerSource = new BehaviorSubject<any | null>(null);
  customer$ = this.customerSource.asObservable();

  constructor(private firestore: Firestore) {}

  addCustomer(customer: Customer) {
    const customerRef = collection(this.firestore, 'customer');
    return addDoc(customerRef, customer);
  }

  getCustomer(filter = '') {
    const customerRef = collection(this.firestore, 'customer');
    let q = query(customerRef);
    if (filter) {
      q = query(customerRef, where('name', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Customer[]>;
  }

  async updateCustomer(customer: Customer) {
    const customerRef = collection(this.firestore, 'customer');
    let q = query(customerRef, where('id', '==', customer.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'customer', document.id);
      await updateDoc(docRef, { ...customer });
    });
  }

  async deleteCustomer(id: string) {
    const customerRef = collection(this.firestore, 'customer');
    let q = query(customerRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'customer', document.id);
      deleteDoc(docRef);
    });
  }
}

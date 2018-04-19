import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { firestore } from 'firebase';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { User } from './user';

@Injectable()
export class UserDataService {

  usersObservable: Observable<any[]>;
  
  statusFilter: BehaviorSubject<string|null>;
  countryFilter: BehaviorSubject<string|null>;

  // this data has been uploaded to firebase.io (Cloud Firestore)
  users = [
    { email: 'abc0@example.com', firstname: 'First Name 0', lastname: 'Last Name 0', birthdate: new Date(2000, 4, 18), country: 'Singapore', status: 'Complete'},
    { email: 'abc1@example.com', firstname: 'First Name 1', lastname: 'Last Name 1', birthdate: new Date(2001, 4, 18), country: 'Japan', status: 'Incomplete'},
    { email: 'abc2@example.com', firstname: 'First Name 2', lastname: 'Last Name 2', birthdate: new Date(2002, 4, 18), country: 'Australia', status: 'Complete'},
    { email: 'abc3@example.com', firstname: 'First Name 3', lastname: 'Last Name 3', birthdate: new Date(2003, 4, 18), country: 'India', status: 'Incomplete'},
    { email: 'abc4@example.com', firstname: 'First Name 4', lastname: 'Last Name 4', birthdate: new Date(2004, 4, 18), country: 'Nepal', status: 'Incomplete'},
    { email: 'abc5@example.com', firstname: 'First Name 5', lastname: 'Last Name 5', birthdate: new Date(2005, 4, 18), country: 'Indonesia', status: 'Complete'},
    { email: 'abc6@example.com', firstname: 'First Name 6', lastname: 'Last Name 6', birthdate: new Date(2006, 4, 18), country: 'Malaysia', status: 'Complete'},
    { email: 'abc7@example.com', firstname: 'First Name 7', lastname: 'Last Name 7', birthdate: new Date(2007, 4, 18), country: 'Sri Lanka', status: 'Incomplete'},
    { email: 'abc8@example.com', firstname: 'First Name 8', lastname: 'Last Name 8', birthdate: new Date(2008, 4, 18), country: 'Thailand', status: 'Complete'},
    { email: 'abc9@example.com', firstname: 'First Name 9', lastname: 'Last Name 9', birthdate: new Date(2009, 4, 18), country: 'Vietnam', status: 'Incomplete'},
  ];

  private userLocalDataSource = new BehaviorSubject<any>(this.users);
  currentLocalUsers = this.userLocalDataSource.asObservable();
  
  constructor(
    private cloud: AngularFirestore,
    private db: AngularFireDatabase,
  ) { 
    this.statusFilter = new BehaviorSubject(null);
      this.countryFilter = new BehaviorSubject(null);

      this.usersObservable = Observable.combineLatest(
        this.statusFilter, this.countryFilter
      ).switchMap(([status, country]) => 
        cloud.collection('/users', ref => {
          let query : firestore.CollectionReference | firestore.Query = ref;
          if (status) { query = query.where('status', '==', status) };
          if (country) { query = query.where('country', '==', country) };
          return query;
        }).valueChanges()
      );
  }

  updateUsers(new_users) {
    this.userLocalDataSource.next(new_users);
  }

  filterByStatus(status: string|null) {
    this.statusFilter.next(status); 
  }

  filterByCountry(country: string|null) {
    this.countryFilter.next(country); 
  }

}

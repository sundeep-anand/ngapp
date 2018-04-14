import { Injectable } from '@angular/core';

import { User } from './user';


export class UserDataService {

  users = [
    { email: 'abc@example.com', firstname: 'First Name 0', lastname: 'Last Name 0', birthdate: new Date(2000, 4, 18), country: 'Singapore', uncomplete: true},
    { email: 'abc@example.com', firstname: 'First Name 1', lastname: 'Last Name 1', birthdate: new Date(2001, 4, 18), country: 'Japan', uncomplete: false},
    { email: 'abc@example.com', firstname: 'First Name 2', lastname: 'Last Name 2', birthdate: new Date(2002, 4, 18), country: 'Australia', uncomplete: true},
    { email: 'abc@example.com', firstname: 'First Name 3', lastname: 'Last Name 3', birthdate: new Date(2003, 4, 18), country: 'India', uncomplete: false},
    { email: 'abc@example.com', firstname: 'First Name 4', lastname: 'Last Name 4', birthdate: new Date(2004, 4, 18), country: 'Nepal', uncomplete: false},
    { email: 'abc@example.com', firstname: 'First Name 5', lastname: 'Last Name 5', birthdate: new Date(2005, 4, 18), country: 'Indonesia', uncomplete: true},
    { email: 'abc@example.com', firstname: 'First Name 6', lastname: 'Last Name 6', birthdate: new Date(2006, 4, 18), country: 'Malaysia', uncomplete: true},
    { email: 'abc@example.com', firstname: 'First Name 7', lastname: 'Last Name 7', birthdate: new Date(2007, 4, 18), country: 'Sri Lanka', uncomplete: false},
    { email: 'abc@example.com', firstname: 'First Name 8', lastname: 'Last Name 8', birthdate: new Date(2008, 4, 18), country: 'Thailand', uncomplete: true},
    { email: 'abc@example.com', firstname: 'First Name 9', lastname: 'Last Name 9', birthdate: new Date(2009, 4, 18), country: 'Vietnam', uncomplete: false},
  ];
  
  constructor() { }

}

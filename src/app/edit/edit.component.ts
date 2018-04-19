import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserDataService } from './../auth/user-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  description: string;
  selectedUser: string;
  allUpdatedUsers = [];
  private users;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserDataService
  ) { 
      this.description = data.title;
      this.selectedUser = data.user;
      this.allUpdatedUsers = data.users;
    }

    ngOnInit() {
      this.userService.currentLocalUsers.subscribe(users => this.users = users)
      this.form = this.formBuilder.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern("^[+]?[0-9]{8,15}$")]],
        birthdate: ['', [Validators.required]],
      })
    }
  
    updateAccount() {
      if (this.form.valid) {
        var index = this.allUpdatedUsers.indexOf(this.selectedUser);
        this.allUpdatedUsers[index].firstname = this.form.value.firstname;
        this.allUpdatedUsers[index].lastname = this.form.value.lastname;
        this.allUpdatedUsers[index].phone = this.form.value.phone;
        this.allUpdatedUsers[index].birthdate = this.form.value.birthdate;
        this.userService.updateUsers(this.allUpdatedUsers);
        this.dialogRef.close();
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }

}

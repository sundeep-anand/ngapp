import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './../auth/user-data.service';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns = ['select', 'IMG', 'firstname', 'lastname', 'birthdate', 'country', 'uncomplete', 'actions'];
  private users;
  private dataSource;

  dialogExitResult: string;

  selection = new SelectionModel<Element>(true, []);

  constructor(
    private userService: UserDataService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.userService.currentUsers.subscribe(users => this.users = users)
    this.dataSource = new MatTableDataSource<Element>(this.users);
  }

  openDialog(selectedUser): void {
    let dialogRef = this.dialog.open(DialogUserEditDialog, {
      width: '400px',
      data: { users: this.users, title: 'User Details', user: selectedUser },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogExitResult = result;
    });
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

@Component({
  selector: 'dialog-user-edit',
  templateUrl: 'dialog-user-edit.html',
})
export class DialogUserEditDialog implements OnInit {

  form: FormGroup;
  description: string;
  selectedUser: string;
  allUpdatedUsers = [];
  private users;

  constructor(
    public dialogRef: MatDialogRef<DialogUserEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserDataService,
    private router: Router) { 
      this.description = data.title;
      this.selectedUser = data.user;
      this.allUpdatedUsers = data.users;
    }

  ngOnInit() {
    this.userService.currentUsers.subscribe(users => this.users = users)
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

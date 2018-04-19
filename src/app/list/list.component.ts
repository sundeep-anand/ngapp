import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from './../auth/user-data.service';
import { EditComponent } from './../edit/edit.component';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns = ['select', 'IMG', 'firstname', 'lastname', 'birthdate', 'country', 'status', 'actions'];
  private users;
  private dataSource;

  dialogExitResult: string;

  selection = new SelectionModel<Element>(true, []);

  statusFilterOptions = ['All Cases', 'Complete', 'Incomplete'];
  statusFilterLabel: string = this.statusFilterOptions[0];
  showFilterOptions = [];

  usersObservable: Observable<any[]>;

  constructor(
    private userService: UserDataService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // Uncomment next two lines and comment remaining lines to connect local data
    // this.userService.currentLocalUsers.subscribe(users => this.users = users);
    // this.dataSource = new MatTableDataSource<any>(this.users);

    // this.userService.usersObservable.subscribe( res => { this.users = res; } );
    // Comment all the above lines and uncomment below line to connect to firestore
    this.dataSource = new UsersDataSource(this.userService);
  }

  openDialog(selectedUser): void {
    let dialogRef = this.dialog.open(EditComponent, {
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyStatusFilter(filterValue: string) {
      this.statusFilterLabel = filterValue;
      if (filterValue == this.statusFilterOptions[0]) {
        filterValue = null
      }
      this.userService.filterByStatus(filterValue);
  }

  resetFilters() {
    this.userService.filterByStatus(null);
    // reset status filter
    this.showFilterOptions = [];
    this.statusFilterLabel = this.statusFilterOptions[0];
  }

  showStatusFilters() {
      if (this.showFilterOptions.length > 0) {
        this.showFilterOptions = [];
      }
      this.showFilterOptions.push.apply(this.showFilterOptions, this.statusFilterOptions);
  }

}

export class UsersDataSource extends DataSource<any> {
 
  constructor(private userService: UserDataService) { super() }
 
  connect(){ return this.userService.usersObservable; }
 
  disconnect() { }
 
}

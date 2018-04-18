import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserDataService } from './../auth/user-data.service';
import { EditComponent } from './../edit/edit.component';

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

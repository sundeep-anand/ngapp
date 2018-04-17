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

  statusFilterOptions = ['All Cases', 'Complete', 'Incomplete'];
  statusFilterLabel: string = this.statusFilterOptions[0];
  showFilterOptions = [];

  alphabets = [];
  countries = {
    a: ['Argentina', 'Afganistan', 'Albania', 'Algeria', 'Andorra', 'Antigua and Barbuda', 'Argentina', 'Aruba', 'Australia'],
    b: ['Bahamas', 'Belgium', 'Bermuda', 'Bhutan', 'Bolivia', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei'],
    c: ['Cambodia', 'Canada', 'Central African Republic', 'Chile', 'China', 'Colombia', 'Cuba', 'Cyprus', 'Czech Republic'],
    d: ['Democratic Republic of Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic'],
    e: ['East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia'],
    f: ['Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia'],
    g: ['Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Guatemala', 'Guinea', 'Guinea-Bissau'],
    h: ['Haiti', 'Honduras', 'Hong Kong', 'Hungary'],
    i: ['Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Ivory Coast'],
    j: ['Jamaica', 'Japan', 'Jordan'],
    k: ['Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan'],
    l: ['Laos', 'Latvia', 'Lebanon', 'Lesotho', '	Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg'],
    m: ['Macau', 'Madagascar', 'Malaysia', 'Maldives', 'Marshall Islands', 'Mauritius', 'Mexico', 'Monaco', '	Myanmar'],
    n: ['Nepal', 'Netherlands', 'New Zealand', 'Nigeria', 'North Korea', 'Norway'],
    o: ['Oman'],
    p: ['Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico'],
    q: ['Qatar'],
    r: ['Republic of the Congo', 'Reunion', 'Romania', 'Russia', 'Rwanda'],
    s: ['Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'South Africa', 'Spain', 'Sri Lanka', 'Switzerland', 'Syria'],
    t: ['Taiwan', 'Thailand', 'Tokelau', 'Turkey', 'Tuvalu'],
    u: ['Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', '	Uzbekistan'],
    v: ['Vanuatu', 'Vatican', 'Venezuela', 'Vietnam'],
    w: ['Western Sahara'],
    x: [''],
    y: ['Yemen'],
    z: ['Zambia', 'Zimbabwe'],
  };

  countrySelectCount: number = 0;

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

  showStatusFilters() {
    if (this.showFilterOptions.length > 0) {
      this.showFilterOptions = [];
    }
    if (this.alphabets.length > 0) {
      this.alphabets = [];
    }
    this.showFilterOptions.push.apply(this.showFilterOptions, this.statusFilterOptions);
  }

  applyStatusFilter(filterValue: string) {
    if (filterValue == this.statusFilterOptions[1]) {
      this.dataSource.filter = "true";
      this.statusFilterLabel = filterValue;
    } else if (filterValue == this.statusFilterOptions[2]) {
      this.dataSource.filter = "false";
      this.statusFilterLabel = filterValue;
    } else if (filterValue == this.statusFilterOptions[0]) {
      this.dataSource.filter = "";
      this.statusFilterLabel = filterValue;
    } else {
      this.applyFilter(filterValue);
    }
    
  }

  showAlphabets(){
    if (this.showFilterOptions.length > 0) {
      this.showFilterOptions = [];
    }
    this.alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  }

  showCountries(alphabet: string) {
    if (this.showFilterOptions.length > 0) {
      this.showFilterOptions = [];
    }
    this.showFilterOptions.push.apply(
      this.showFilterOptions, 
      this.countries[alphabet].sort()
    );
  }

  resetFilters() {
    this.dataSource.filter = false;
    // reset status filter
    this.showFilterOptions = [];
    this.statusFilterLabel = this.statusFilterOptions[0];
    // reset country filter
    this.alphabets = [];
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

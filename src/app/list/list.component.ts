import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from './../auth/user-data.service';
import { User } from './../auth/user';
import { EditComponent } from './../edit/edit.component';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns = ['select', 'IMG', 'firstname', 'lastname', 'birthdate', 'country', 'status', 'actions'];
  private users;
  public dataSource;

  dialogExitResult: string;

  selection = new SelectionModel<Element>(true, []);

  statusFilterOptions = ['All Cases', 'Complete', 'Incomplete'];
  statusFilterLabel: string = this.statusFilterOptions[0];
  showStatusFilterOptions = [];
  showCountryFilterOptions = [];

  usersObservable: Observable<any[]>;
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

  countrySelectList = [];
  countrySelectCount: number = 0;

  constructor(
    private userService: UserDataService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // Uncomment next lines and comment last three lines to connect local data
    this.userService.currentLocalUsers.subscribe(users => this.users = users);
    this.dataSource = new MatTableDataSource<any>(this.users);
    this.dataSource.filterPredicate = 
      (data: User, filters: string) => {
        const matchFilter = [];
        const matchFilterCountries = [];

        if (filters === "|" || filters === ",|") { return matchFilter; }
        
        var filterArray = []
        var filterCountries = []

        var filterSegments = filters.split('|');
        if (filterSegments.length == 2) {
          filterArray = filterSegments[0].split(',');
          filterCountries = filterSegments[1].split(',');
        } else {
          filterArray = filterSegments;
        }

        const columns = [data.status, data.country, data.firstname, data.lastname];
        filterArray.forEach(filter => { if (filter) {
          const customFilter = [];
          columns.forEach(column =>  customFilter.push(column.toLowerCase() === filter));
          matchFilter.push(customFilter.some(Boolean));
        }});

        filterCountries.forEach(filter => { if (filter) {
          const tempFilter = [];
          tempFilter.push(data.country.toLowerCase() === filter);
          matchFilterCountries.push(tempFilter.some(Boolean));
        }})
        
        // return matchFilter.every(Boolean);
        return matchFilter.concat(matchFilterCountries).some(Boolean);
        
      }

    // this.userService.usersObservable.subscribe( res => { this.users = res; } );
    // Comment all the above lines and uncomment below line to connect to firestore
    // this.dataSource = new UsersDataSource(this.userService);
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

  applyFilter() {
    this.dataSource.filter = [
      this.userService.usersFilterSet.join(","),
      this.countrySelectList.join(",")
    ].join("|");
  }

  applySearchFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue) { 
      this.userService.usersFilterSet[0] = filterValue;
    } else {
      this.userService.usersFilterSet[0] = "";
    }
    this.applyFilter()
  }

  applyStatusFilter(filterValue: string) {
    this.statusFilterLabel = filterValue;
    // this.userService.filterByStatus(filterValue);
    if (filterValue == this.statusFilterOptions[0]) {
      this.userService.usersFilterSet[1] = "";
    } else {
      filterValue = filterValue.trim().toLowerCase();
      if (filterValue) {
        this.userService.usersFilterSet[1] = filterValue;
      }
    }
    this.applyFilter();
  }

  showStatusFilters() {
    this.showCountryFilterOptions = [];
    this.alphabets = []
    if (this.showStatusFilterOptions.length > 0) {
      this.showStatusFilterOptions = [];
    }
    this.showStatusFilterOptions.push.apply(
      this.showStatusFilterOptions, this.statusFilterOptions
    );
  }

  showAlphabets() {
    this.showStatusFilterOptions = [];
    if (this.showCountryFilterOptions.length > 0) {
        this.showCountryFilterOptions = [];
    }
    this.alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  }

  showCountries(alphabet: string) {
    this.showStatusFilterOptions = [];
    if (this.showCountryFilterOptions.length > 0) {
      this.showCountryFilterOptions = [];
    }
    this.showCountryFilterOptions.push.apply(
      this.showCountryFilterOptions,
      this.countries[alphabet].sort()
    );
  }

  applyCountryFilter(filterValue: string) {
    // this.userService.filterByCountry(filterValue);
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue && !this.countrySelectList.includes(filterValue)) {
      this.countrySelectList.push(filterValue);
      this.countrySelectCount = this.countrySelectList.length;
    }
    this.applyFilter();
  }

  removeCountryFilter(countryName: string) {
    countryName = countryName.trim().toLowerCase();
    if (countryName && this.countrySelectList.includes(countryName)) {
      var index = this.countrySelectList.indexOf(countryName);
      this.countrySelectList.splice(index, 1);
      this.countrySelectCount = this.countrySelectList.length;
    }
    this.applyFilter();
  }

  resetFilters() {
    // this.userService.filterByStatus(null);
    // this.userService.filterByCountry(null);
    // reset filters: status and country
    this.alphabets = [];
    this.showStatusFilterOptions = [];
    this.showCountryFilterOptions = [];
    this.countrySelectCount = 0;
    this.statusFilterLabel = this.statusFilterOptions[0];
    this.userService.usersFilterSet[1] = "";
    this.countrySelectList = [];
    this.applyFilter();
  }

}

export class UsersDataSource extends DataSource<any> {
 
  constructor(private userService: UserDataService) { super() }
 
  connect(){ return this.userService.usersObservable; }
 
  disconnect() { }
 
}

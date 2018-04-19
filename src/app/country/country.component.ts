import { Component, OnInit } from '@angular/core';
import { UserDataService } from './../auth/user-data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  
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
  ) { }

  ngOnInit() {
  }

  showAlphabets() {
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
    this.userService.filterByCountry(null);
    this.showFilterOptions = [];
    this.alphabets = [];
  }

  applyCountryFilter(filterValue: string) {
    this.userService.filterByCountry(filterValue);
  }

}

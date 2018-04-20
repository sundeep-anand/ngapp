import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MaterialModule } from './../material.module';
import { CountryComponent } from './country.component';
import { UserDataService } from './../auth/user-data.service';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { environment } from './../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      providers: [UserDataService, AngularFirestore],
      declarations: [ CountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

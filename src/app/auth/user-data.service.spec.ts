import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserDataService } from './user-data.service';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { environment } from './../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

describe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      providers: [UserDataService, AngularFirestore]
    });
  });

  it('should be created', inject([UserDataService], (service: UserDataService) => {
    expect(service).toBeTruthy();
  }));
});

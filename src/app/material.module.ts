import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
        MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatPaginatorModule,
        MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule],
    exports: [MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
        MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatPaginatorModule,
        MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule],
})
export class MaterialModule { }

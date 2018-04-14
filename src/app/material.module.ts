import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    MatToolbarModule, MatDividerModule, MatCardModule, MatInputModule, MatButtonModule, MatGridListModule,
    MatSidenavModule, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule, 
} from '@angular/material';

@NgModule({
    imports: [MatToolbarModule, MatDividerModule, MatCardModule, MatInputModule, MatButtonModule, MatSidenavModule, 
        MatListModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule, MatGridListModule],
    exports: [MatToolbarModule, MatDividerModule, MatCardModule, MatInputModule, MatButtonModule, MatSidenavModule, 
        MatListModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule, MatGridListModule],
})
export class MaterialModule { }

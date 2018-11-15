
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
    imports: [],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatDialogModule,
        MatSliderModule
    ],
    providers: [MatDatepickerModule],
})
export class MaterialModule { }
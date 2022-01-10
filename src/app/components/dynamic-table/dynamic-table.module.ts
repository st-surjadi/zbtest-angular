import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatInputModule } from '@angular/material/input';

const Material = [
  MatTableModule,
  MatGridListModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule
]

@NgModule({
  declarations: [
    DynamicTableComponent,
  ],
  imports: [
    CommonModule,
    Material,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicTableComponent
  ]
})
export class DynamicTableModule { }

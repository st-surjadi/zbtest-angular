import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

const Material = [
  MatTableModule,
  MatGridListModule,
  MatPaginatorModule,
]

@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    Material,
  ],
  exports: [
    DynamicTableComponent
  ]
})
export class DynamicTableModule { }

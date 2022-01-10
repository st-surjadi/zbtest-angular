import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { RouterModule, Routes } from '@angular/router';
import { DynamicTableModule } from 'src/app/components/dynamic-table/dynamic-table.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DynamicTableModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { CrudComponent } from './crud/crud.component';
import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    CrudComponent
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    PagesRoutingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    PagesRoutingModule,
  ]
})
export class PagesModule { }

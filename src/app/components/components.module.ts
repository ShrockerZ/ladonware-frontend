import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }

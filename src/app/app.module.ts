import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from 'src/app/Services/shared.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { OrderbyPipe } from './Pipes/orderby.pipe';
import { SearchUserComponent } from './UI/Common/search-user/search-user.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FilterPipe,
    OrderbyPipe,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
  entryComponents: [SearchUserComponent]
})
export class AppModule { }

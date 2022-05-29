import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PangolinComponent } from './pangolin/pangolin.component';
import { PangolinListComponent } from './pangolin-list/pangolin-list.component';
import { MaterialModule } from './material.module';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminComponent } from './admin/admin.component';
import { PangolinCreateComponent } from './pangolin-create/pangolin-create.component';
import { PangolinEditComponent } from './pangolin-edit/pangolin-edit.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    PangolinComponent,
    PangolinListComponent,
    ErrorpageComponent,
    AdminComponent,
    PangolinCreateComponent,
    PangolinEditComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatSelectModule,MatRadioModule, MatTableModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule,MatIconModule, MatDatepickerModule, MatNativeDateModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { UpdatesComponent } from './updates/updates.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { WorkerSchedulerComponent } from './WorkerScheduler/WorkerScheduler.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EntranceComponent } from './entrance/entrance.component';
import { HeaderComponent } from './header/header.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { MenageSupervisorsComponent } from './menage-supervisors/menage-supervisors.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdatesComponent,
    RegisterComponent,
    StoreComponent,
    WorkerSchedulerComponent,
    EntranceComponent,
    HeaderComponent,
    AddEditEventComponent,
    MenageSupervisorsComponent,
  ],
  entryComponents: [AddEditEventComponent
  ],
  
  imports: [
    MatTableModule,
    MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
 MatDatepickerModule, 
  MatNativeDateModule,
  ReactiveFormsModule,
  NgbModalModule,
  MatDialogModule,
  RouterModule,
  FlatpickrModule.forRoot(),

  CommonModule,
  CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
],
  bootstrap: [AppComponent],
})
export class AppModule { }

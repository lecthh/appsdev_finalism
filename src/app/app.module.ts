import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditSubjOffersComponent } from './edit-subj-offers/edit-subj-offers.component';
import { ViewEnrolleesComponent } from './view-enrollees/view-enrollees.component';
import { EditDepartmentsComponent } from './edit-departments/edit-departments.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentProspectusComponent } from './student-prospectus/student-prospectus.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';

//firebase test



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    AdminDashboardComponent,
    EditSubjOffersComponent,
    ViewEnrolleesComponent,
    EditDepartmentsComponent,
    AddStudentComponent,
    StudentProspectusComponent,
    StudentEnrollmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    
    AngularFireAuthModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

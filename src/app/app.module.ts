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

import { DrawerSubjOffComponent } from './drawer-subj-off/drawer-subj-off.component';
import { DrawerService } from './drawer.service';




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    AdminDashboardComponent,
    DrawerSubjOffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    MatSidenavModule,

    AngularFireAuthModule,
    
    provideFirebaseApp(() => initializeApp({"projectId":"appsdev-80d9f","appId":"1:805621516796:web:7e7ea46803a464dea40a79","storageBucket":"appsdev-80d9f.appspot.com","apiKey":"AIzaSyBBpAH2NTjxNFTAISiE1-2YBs_HzFBbLYc","authDomain":"appsdev-80d9f.firebaseapp.com","messagingSenderId":"805621516796"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [DrawerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

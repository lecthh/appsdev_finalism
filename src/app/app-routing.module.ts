import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentProspectusComponent } from './student-prospectus/student-prospectus.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'signin', pathMatch:'full'},
  {path:'signin', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'admin-dashboard', component: AdminDashboardComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'student-prospectus', component: StudentProspectusComponent, canActivate: [authGuard]},
  {path: 'student-enrollment', component: StudentEnrollmentComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

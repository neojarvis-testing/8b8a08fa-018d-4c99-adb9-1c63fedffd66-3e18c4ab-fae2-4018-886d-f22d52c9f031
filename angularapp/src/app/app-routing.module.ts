import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CookingImpComponent } from './components/cooking-imp/cooking-imp.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminaddclassComponent } from './components/adminaddclass/adminaddclass.component';
import { AdmineditclassComponent } from './components/admineditclass/admineditclass.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewclassComponent } from './components/adminviewclass/adminviewclass.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UserviewclassComponent } from './components/userviewclass/userviewclass.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'cooking-imp', component: CookingImpComponent },

  // Admin routes
  { path: 'admin-nav', component: AdminnavComponent },
  { path: 'admin/add-class', component: AdminaddclassComponent },
  { path: 'admin/edit-class', component: AdmineditclassComponent },
  { path: 'admin/view-requests', component: AdminviewappliedrequestComponent },
  { path: 'admin/view-classes', component: AdminviewclassComponent },
  { path: 'admin/view-feedback', component: AdminviewfeedbackComponent },

  // User routes
  { path: 'user-nav', component: UsernavComponent },
  { path: 'user/add-request', component: UseraddrequestComponent },
  { path: 'user/add-feedback', component: UseraddfeedbackComponent },
  { path: 'user/view-requests', component: UserviewappliedrequestComponent },
  { path: 'user/view-classes', component: UserviewclassComponent },
  { path: 'user/view-feedback', component: UserviewfeedbackComponent },

  // Error route
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

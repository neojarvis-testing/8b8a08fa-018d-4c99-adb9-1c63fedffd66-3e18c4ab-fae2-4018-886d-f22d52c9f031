import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AdminaddclassComponent } from './components/adminaddclass/adminaddclass.component';
import { AdminviewclassComponent } from './components/adminviewclass/adminviewclass.component';
import { AdmineditclassComponent } from './components/admineditclass/admineditclass.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { CookingImpComponent } from './components/cooking-imp/cooking-imp.component';
import { UserviewclassComponent } from './components/userviewclass/userviewclass.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
//   {path:'/registration',component:RegistrationComponent},
//   {path:'/login',component:LoginComponent},
//   {path:'/admin',component:HomeComponent},
//   {path:'/',component:AdminaddclassComponent},
//   {path:'/',component:AdminviewclassComponent},
//   {path:'/',component:AdmineditclassComponent},
//   {path:'/',component:AdminviewappliedrequestComponent},
//   {path:'/',component:AdminviewfeedbackComponent},
//   {path:'/',component:CookingImpComponent},
//   {path:'/',component:UserviewclassComponent},
//   {path:'/',component:UseraddrequestComponent},
//   {path:'/',component:UserviewappliedrequestComponent},
//   {path:'/',component:UseraddfeedbackComponent},
//   {path:'/',component:UserviewfeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

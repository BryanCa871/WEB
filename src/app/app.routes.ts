import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { VerificationComponent } from './verification/verification.component';
import { DahboardComponent } from './dahboard/dahboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'registro', component: RegistroComponent },
    { path: 'verification', component: VerificationComponent },
    { path: 'dashboard', component: DahboardComponent},
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: '**', redirectTo: '/registro' }
  ];
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleComponent } from './google/google.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
 
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'payments', component: PaymentsComponent },
  // { path: 'map', component: GoogleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

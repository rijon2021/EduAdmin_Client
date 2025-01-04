import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { SubjectChoiceComponent } from './subject-choice/subject-choice.component';
import { NoticeComponent } from './notice/notice.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
 
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'subject-choice', component: SubjectChoiceComponent },
  { path: 'notice', component: NoticeComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

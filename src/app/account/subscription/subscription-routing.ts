import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentSubscriptionComponent } from './student-subscription/student-subscription.component';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';
import { SubscriptionFailedComponent } from './subscription-failed/subscription-failed.component';


const routes: Routes = [
    {
        path: '',
        component: StudentSubscriptionComponent,
    },
    {
        path: 'subscription',
        component: StudentSubscriptionComponent,
    },
    {
        path: 'subscription-success',
        component: SubscriptionSuccessComponent,
    },
    {
        path: 'subscription-failed',
        component: SubscriptionFailedComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionRoutingModule { }

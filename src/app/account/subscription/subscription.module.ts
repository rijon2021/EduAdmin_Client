import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { SubscriptionRoutingModule } from './subscription-routing';
import { StudentSubscriptionComponent } from './student-subscription/student-subscription.component';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';
import { SubscriptionFailedComponent } from './subscription-failed/subscription-failed.component';
import { SubscriptionLayoutComponent } from './subscription-layout/subscription-layout.component';

@NgModule({
  declarations: [StudentSubscriptionComponent,SubscriptionSuccessComponent,SubscriptionFailedComponent,SubscriptionLayoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    SubscriptionRoutingModule,
    CarouselModule
  ]
})
export class SubscriptionModule { }

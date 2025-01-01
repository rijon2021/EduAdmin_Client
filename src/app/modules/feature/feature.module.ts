import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetModule } from "../../shared/widget/widget.module";
import { PaymentsComponent } from './payments/payments.component';
import { SubjectChoiceComponent } from './subject-choice/subject-choice.component';
import { SubjectService } from 'src/app/core/services/edu/subject.service';
import { NoticeComponent } from './notice/notice.component';
import { AgGridModule } from 'ag-grid-angular';
import { PaymentsService } from 'src/app/core/services/payments.service';
import { NoticeService } from 'src/app/core/services/edu/notice.service';



@NgModule({
    declarations: [DashboardComponent, PaymentsComponent,SubjectChoiceComponent, NoticeComponent],
    imports: [
        CommonModule,
        AgGridModule,
        FormsModule,
        NgbDropdownModule,
        NgbModalModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FullCalendarModule,
        NgbNavModule,
        NgbTooltipModule,
        NgbCollapseModule,
        SimplebarAngularModule,
        LightboxModule,
        FeatureRoutingModule,
        UIModule,
        Ng2SmartTableModule,
        WidgetModule,
        
    ],
    providers: [
      SubjectService,
      PaymentsService,
      NoticeService
    ]
})
export class FeatureModule { }

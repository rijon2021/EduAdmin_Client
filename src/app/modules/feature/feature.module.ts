import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetModule } from "../../shared/widget/widget.module";
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AgGridModule } from 'ag-grid-angular';
import { PaymentsComponent } from './payments/payments.component';
import { SubjectChoiceComponent } from './subject-choice/subject-choice.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
    declarations: [DashboardComponent, PaymentsComponent,SubjectChoiceComponent],
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
        AgmCoreModule.forRoot({
          // apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',
          apiKey: environment.MAP_API_KEY,
          libraries: ['places', 'drawing', 'geometry']
        }),
    ],
    
})
export class FeatureModule { }

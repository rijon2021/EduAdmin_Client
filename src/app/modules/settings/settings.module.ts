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
import { SettingsRoutingModule } from './settings-routing.module';
import { UserModule } from './user/user.module';
import { PermissionComponent } from './permission/permission.component';
import { PermissionService } from 'src/app/core/services/settings/permission.service';
import { AgGridModule } from 'ag-grid-angular';
import { UserLevelComponent } from './user-level/user-level.component';
import { UserLevelService } from 'src/app/core/services/settings/user-level.service';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    PermissionComponent,
    UserLevelComponent, 
  ],
  imports: [
    CommonModule,
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
    SettingsRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    UserModule,
    AgGridModule
  ],
  providers:[
    PermissionService,
    UserLevelService
  ]
})
export class SettingsModule { }

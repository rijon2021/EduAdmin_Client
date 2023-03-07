import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlertService } from './helpers/sweet-alert.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    // {
    //   provide : ErrorHandler,
    //   useClass : GlobalErrorHandler,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: SweetAlertService,
    //   multi: true,
    // }
  ]
})
export class CoreModule { }

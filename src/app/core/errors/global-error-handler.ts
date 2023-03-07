import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { SweetAlertEnum, SweetAlertService } from "../helpers/sweet-alert.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private zone: NgZone,
        private swal: SweetAlertService
    ) { }

    handleError(error: any) {
        if (!(error instanceof HttpErrorResponse)) {
            error = error.rejection; // get the error object
          }
        // if (error) {
        //     this.swal.message(error, SweetAlertEnum.error);
        // }

    }
}
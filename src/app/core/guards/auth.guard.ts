import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { GetAccessToken } from '../models/localstorage-item';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return true;

        let loginToken = GetAccessToken();
        if(loginToken){
            return true;
        }
        // if (environment.defaultauth === 'firebase') {
        //     const currentUser = this.authenticationService.currentUser();
        //     if (currentUser) {
        //         // logged in so return true
        //         return true;
        //     }
        // } else {
        //     const currentUser = this.authFackservice.currentUserValue;
        //     if (currentUser) {
        //         // logged in so return true
        //         return true;
        //     }
        // }
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

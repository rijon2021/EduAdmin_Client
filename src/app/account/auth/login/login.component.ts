import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthUser, TokenResult } from 'src/app/core/models/auth.models';
import Swal from 'sweetalert2';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { ReturnStatus } from 'src/app/core/enums/globalEnum';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private httpClientService : HttpClientService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    let user = new AuthUser();
    // RoutingHelper.navigate([], ['modules', 'settings', 'user-list']);
    user.userID = this.f.email.value;
    user.password = this.f.password.value;
    this.authFackservice.login(user).pipe(first()).subscribe((res: ResponseMessage) => {
      let data: ResponseMessage = res;   
      if (data.responseObj) {     
        if (data.statusCode == ReturnStatus.Success) {
          let tokenResult: TokenResult = data.responseObj.tokenResult;
          if (tokenResult.access_token && tokenResult.statusCode == 200) {
            this.setLoginInformation(res);
            RoutingHelper.navigate2([], ['feature/dashboard'], this.router);
          }
          else {
            alert('No Token Found');
          }
        }
        else {
          alert('Invalid ID or password');
        }
      }
      else {
        alert('Server Error');
      }
    },
      error => {
        this.error = error ? error : '';
      });
  }
  
  setLoginInformation(response: ResponseMessage) {
    // localStorage.clear();
    let authUser: AuthUser = response.responseObj;
    let tokenResult: TokenResult = response.responseObj.tokenResult;
    // localStorage.setItem('userID', authUser.userID);
    // localStorage.setItem('userAutoID', authUser.userAutoID.toString());
    // localStorage.setItem('userTypeID', authUser.userTypeID.toString());
    // localStorage.setItem('organizationID', authUser.organizationID.toString());
    // localStorage.setItem('designationID', authUser.designationID.toString());
    // localStorage.setItem('userFullName', authUser.userFullName);
    // localStorage.setItem('roleID', authUser.roleID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, tokenResult.access_token);
    localStorage.setItem(LOCALSTORAGE_KEY.USER_ID, authUser.userID);
    localStorage.setItem(LOCALSTORAGE_KEY.USER_AUTO_ID, authUser.userAutoID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.USER_TYPE_ID,  authUser.userTypeID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.ORGANIZATION_ID, authUser.organizationID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.DESIGNATION_ID, authUser.designationID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.USER_FULL_NAME, authUser.userFullName);
    localStorage.setItem(LOCALSTORAGE_KEY.ROLE_ID, authUser.roleID.toString());
    localStorage.setItem(LOCALSTORAGE_KEY.PERMISSIONS, JSON.stringify(authUser.permissions));
    
    this.httpClientService.setToken();
    
    // localStorage.setItem(LOCALSTORAGE_KEY.LOG_OUT, this.userInfo.userDateFormat);
    // let objUser = {
    //   userId: this.userInfo.userId,
    //   userName: this.userInfo.userId,
    //   userEmail: this.userInfo.userId,
    //   companyId: this.userInfo.userId,
    //   countryId: this.userInfo.countryId,
    //   companyName: this.userInfo.userId,
    //   hourlyRate: this.userInfo.hourlyRate,
    //   dateTimeFormat: this.userInfo.dateTimeFormat,
    //   languageCountryId: this.userInfo.languageCountryId,
    //   currencySymbol: this.userInfo.currencySymbol,
    // }
    // localStorage.setItem(LOCALSTORAGE_KEY.USER, JSON.stringify(objUser))
    // localStorage.setItem(LOCALSTORAGE_KEY.LIST_USER_COMAPNY, JSON.stringify(this.userInfo.lsUserCompany))
    // localStorage.setItem(LOCALSTORAGE_KEY.LIST_USER_BRANCH, JSON.stringify(this.userInfo.lsUserBranch))
    // localStorage.setItem(LOCALSTORAGE_KEY.USER_PREFERENCE, JSON.stringify(this.userInfo.userPreference));
    // const userInfo = JSON.parse(JSON.stringify(this.userInfo));
    // userInfo.userPreference = [];
    // userInfo.lsUserCompany = [];
    // userInfo.lsUserBranch = [];
    // localStorage.setItem(LOCALSTORAGE_KEY.REGIONAL_SETTING, JSON.stringify(userInfo.regionalSetting));
    // userInfo.regionalSetting = {};
    // localStorage.setItem(LOCALSTORAGE_KEY.COMPANY_USER, JSON.stringify(userInfo));
    // const isExistHeadOffice = this.userInfo.userRights.map(x => x.name).includes('CAN_ACCESS_HEADOFFCIE')
    // this._globalEmitterService.sendUserInfo(this.userInfo);
    // // if (this.userInfo.isPasswordDefault === true) {
    // //   this.router.navigate(['/changepassword']);
    // // }
    // if (isExistHeadOffice) {
    //   this.router.navigate(['/head_office']);
    // }
    // else if (this.userInfo.registrationStatus === 0) {
    //   this.authService.clearData();
    //   this.router.navigate(['/updateuser']);
    // }
    // else if (this.isMasterOrigin) {
    //   this.router.navigate(['/master_company']);
    // }
    // else {
    //   this.router.navigate(['/apps']);
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 200000)
    // }

  }
}

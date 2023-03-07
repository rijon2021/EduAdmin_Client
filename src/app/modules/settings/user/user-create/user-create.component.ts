import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReturnStatus } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Users } from 'src/app/core/models/settings/users';
import { UserService } from 'src/app/core/services/settings/user.service';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})


export class UserCreateComponent implements OnInit {
  // bread crumb items
  private routeSub: Subscription;
  breadCrumbItems: Array<{}>;

  public objUser: Users = new Users();
  public imageURL: string;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private swal: SweetAlertService,
    private router : Router
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Basic Tables', active: true }];
    this.routeSub = this.route.params.subscribe(params => {
      const userAutoID = parseInt(params['userID']);
      if (userAutoID) {
        this.objUser.userAutoID = userAutoID;
        this.getByID(userAutoID);
      }
    });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  getByID(userID: number) {
    this.userService.getByID(userID).subscribe((res: Users) => {
      if (res && res.userAutoID > 0) {
        this.objUser = res;
      }
      // console.log(res.responseObj);
      // this.userService.SaveUser(this.objUser).subscribe(response : ResponseMessage) => {

    })
  }
  async saveUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
        this.userService.saveUser(this.objUser).subscribe(
          (res: Users) => {
          if(res && res.userAutoID > 0){
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            RoutingHelper.navigate([], ['settings', 'user', 'user-list']);
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }
  async updateUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.objUser.userAutoID && this.objUser.userAutoID > 0) {
        this.userService.updateUser(this.objUser).subscribe(
          (res: Users) => {
          if(res && res.userAutoID > 0){
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
      }
    }
  }
  async deleteUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.objUser.userAutoID && this.objUser.userAutoID > 0) {
        this.userService.deleteUser(this.objUser.userAutoID).subscribe((res: Users) => {
          this.swal.message('Deleted Successfully', SweetAlertEnum.success);
          RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
        })
      }
    }
  }
  async goToList() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
          RoutingHelper.navigate2([], ['settings', 'user', 'user-list'], this.router);
    }
  }

  

  imagePreview(event){
    this.imageURL =  this.objUser.userImage;
    return this.imageURL;
  }
}


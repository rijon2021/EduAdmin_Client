import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganizationType } from 'src/app/core/enums/globalEnum';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { Organization } from 'src/app/core/models/data/organization';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Users } from 'src/app/core/models/settings/users';
import { OrganizationService } from 'src/app/core/services/settings/organization.service';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.scss']
})
export class OrganizationCreateComponent implements OnInit {
  private routeSub: Subscription;
  public objOrganization: Organization = new Organization();
  public lstOrganizationType: any;
  public lstUsers : Users[] = new Array<Users>();
  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private swal: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.lstOrganizationType = Object.entries(OrganizationType).filter(e => !isNaN(e[0] as any)).map(e => ({ name: e[1], id: e[0] }));
    this.routeSub = this.route.params.subscribe(params => {
      const organizationID = parseInt(params['organizationID']);
      if (organizationID) {
        this.objOrganization.organizationID = organizationID;
        this.getByID(organizationID);
      }
    });
    this.getInitialData();
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  getInitialData() {
    this.organizationService.getInitialData().subscribe(
      (res : ResponseMessage) => {
        if (res) {
         this.lstUsers = res.responseObj.lstUsers;
        }
      },
    )
  }
  getByID(userID: number) {
    this.organizationService.getByID(userID).subscribe(
      (res: Organization) => {
        if (res && res.organizationID > 0) {
          this.objOrganization = res;
        }
      },
    )
  }

  async saveOrganization() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.organizationService.saveOrganization(this.objOrganization).subscribe(
        (res: Organization) => {
          if (res && res.organizationID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            RoutingHelper.navigate2([], ['settings', 'organization', 'organization-list'], this.router);
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }
  async updateOrganization() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.objOrganization.organizationID > 0) {
        this.organizationService.updateOrganization(this.objOrganization).subscribe(
          (res: Organization) => {
            if (res && res.organizationID > 0) {
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
              RoutingHelper.navigate2([], ['settings', 'organization', 'organization-list'], this.router);
            }
          },
          (error) => {
            this.swal.message(error, SweetAlertEnum.error);
          })
      }
    }
  }
  async deleteOrganization() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.objOrganization.organizationID > 0) {
        this.organizationService.deleteOrganization(this.objOrganization.organizationID).subscribe((res: Organization) => {
          this.swal.message('Deleted Successfully', SweetAlertEnum.success);
          RoutingHelper.navigate2([], ['settings', 'organization', 'organization-list'], this.router);
        })
      }
    }
  }
  async goToList() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      RoutingHelper.navigate2([], ['settings', 'organization', 'organization-list'], this.router);
    }
  }

}

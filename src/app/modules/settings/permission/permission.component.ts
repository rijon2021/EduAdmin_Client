import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/core/models/settings/permission';
import { PermissionService } from 'src/app/core/services/settings/permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  lstPermissions: Permission[] = new Array<Permission>();
  lstPermissions_1: Permission[] = new Array<Permission>();


  constructor(
    private permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    //  this.breadCrumbItems = [{ label: 'Settings' }, { label: 'Permission', active: true }];
    this.getAll();
  }
  getAll() {
    this.permissionService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstPermissions = Object.assign(this.lstPermissions, res);
          this.lstPermissions = [...this.lstPermissions];
          this.lstPermissions_1 = this.lstPermissions.filter(x => x.parentPermissionID == 1);


          //   const nest = (items, permissionID = null, link = 'parentPermissionID') =>
          //   items
          //   .filter(item => item[link] === permissionID)
          //   .map(item => ({
          //     ...item,
          //     children: nest(items, item.id)
          //   }));
          // console.log(nest(this.lstPermissions))

        }
      },
    );
  }
  collapseToggle(oItem: Permission) {
    // debugger
    oItem.isCollapsed = !oItem.isCollapsed;
    if (oItem.isCollapsed) {
      oItem.childList = this.lstPermissions.filter(x => x.parentPermissionID == oItem.permissionID);
    }
    else{
      oItem.childList = [];
    }
  }
}

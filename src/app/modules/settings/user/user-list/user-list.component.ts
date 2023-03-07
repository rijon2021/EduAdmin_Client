import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';

import { Routes, RouterModule } from '@angular/router';
import { Users } from 'src/app/core/models/settings/users';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})


export class UserListComponent implements OnInit {
  lstUser: Users[] = new Array<Users>();
  selectedUser: Users = new Users();





  private gridApi;
  private gridColumnApi;
  columnDefs = dataColumnDefs;
  gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressRowDrag: false,
    rowDragManaged: true,
    getRowHeight: (params) => 40,
    defaultColDef: dataDefaultColDef,
  }




  constructor(
    private userService: UserService,
    private swal: SweetAlertService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userService.getAllByOrganizationID().subscribe(
      (res) => {
        if (res) {
          this.lstUser = Object.assign(this.lstUser, res);
          this.lstUser = [...this.lstUser];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  addUser() {
    RoutingHelper.navigate2([], ['settings', 'user', 'user-create', 0], this.router);
  }
  async editUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedUser.userAutoID > 0) {
        RoutingHelper.navigate2([], ['settings', 'user', 'user-create', this.selectedUser.userAutoID], this.router);
      }
      else {
        this.swal.message('No user selected', SweetAlertEnum.error);
      }
    }
  }
  async viewUser() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedUser.userAutoID > 0) {
        RoutingHelper.navigate2([], ['settings', 'user', 'user-create', this.selectedUser.userAutoID], this.router);
      }
      else {
        this.swal.message('No user selected', SweetAlertEnum.error);
      }
    }
  }


  




  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }
  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedUser = selectedRows[0];
    }
    else {
      this.selectedUser = new Users();
    }
  }
}





const dataDefaultColDef: ColDef = {
  // flex: 1,
  // width: 300,
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col',
  // floatingFilter: true,
};
const dataColumnDefs = [
  { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable : false, width : 80 },
  { field: "userID", headerName: 'User ID', lockPosition: true, pinned: 'left', suppressMovable: false },
  { field: "userFullName", headerName: 'Full Name' },
  { field: "mobileNo", headerName: 'Mobile No' },
  { field: "nid", headerName: 'NID' },
  { field: "address", headerName: 'Address' },
  { field: "email", headerName: 'Email' },
  { field: "lastLatitude", headerName: 'Latitude' },
  { field: "lastLongitude", headerName: 'Longitude' },
  { field: "status", headerName: 'Status' },
];

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Organization } from 'src/app/core/models/data/organization';
import { UserRole } from 'src/app/core/models/settings/userRole';
import { Users } from 'src/app/core/models/settings/users';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})


export class UserListComponent implements OnInit {
  // bread crumb items
  lstUser: Users[] = new Array<Users>();
  selectedUser: Users = new Users();
  public pageModel: PageModel;

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
    private router: Router
  ) { }

  ngOnInit() {
    this.pageModel = new PageModel();
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
  filterToggler() {
    this.pageModel.isActiveFilter = !this.pageModel.isActiveFilter;
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
  onChangeColName(colDef: ColDef) {
    const columns = this.gridOptions.columnApi.getAllColumns();
    const valueColumn = columns.filter(column => column.getColDef().headerName === colDef.headerName)[0];
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
    this.gridOptions.api.sizeColumnsToFit();
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
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
  { isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { isVisible: true, field: "userID", headerName: 'User ID', lockPosition: true, pinned: 'left', suppressMovable: false },
  { isVisible: true, field: "userFullName", headerName: 'Full Name' },
  { isVisible: true, field: "mobileNo", headerName: 'Mobile No' },
  { isVisible: true, field: "nid", headerName: 'NID', type: 'centerAligned' },
  { isVisible: true, field: "address", headerName: 'Address', headerClass: 'ag-grid-text-center', cellStyle: { textAlign: 'center' } },
  { isVisible: true, field: "email", headerName: 'Email', cellClass: "grid-cell-centered" },
  { isVisible: true, field: "lastLatitude", headerName: 'Latitude' },
  { isVisible: true, field: "lastLongitude", headerName: 'Longitude' },
  { isVisible: true, field: "status", headerName: 'Is Active' },
];
// interface pdfExportOptions {
// 	/** styles to be applied to cells
//     see supported list here: https://pdfmake.github.io/docs/0.1/document-definition-object/styling/. **/
// 	styles?: {
//     	background: String,
//         fontSize: Number,
//         bold: Boolean,
//         color: String,
// 		alignment: 'left' | 'center' | 'right',
// 	},
//     /** creates a hyperlink for each value in a column **/
// 	createURL?: () => String,
//     /** if true, does not include the column in the exported file **/
// 	skipColumn?: Boolean
// }

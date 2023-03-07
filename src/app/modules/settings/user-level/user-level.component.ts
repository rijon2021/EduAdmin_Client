import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions, Module, RowDragEndEvent } from 'ag-grid-community';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { UserLevel } from 'src/app/core/models/settings/userLevel';
import { UserLevelService } from 'src/app/core/services/settings/user-level.service';

declare var $: any
@Component({
  selector: 'app-user-level',
  templateUrl: './user-level.component.html',
  styleUrls: ['./user-level.component.scss']
})


export class UserLevelComponent implements OnInit {
  lstUserLevel: UserLevel[] = new Array<UserLevel>();
  selectedUserLevel: UserLevel = new UserLevel();


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
    rowDragEntireRow: true,
    rowDragMultiRow: true,
    animateRows: true,
  }


  constructor(
    private userLevelService: UserLevelService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userLevelService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstUserLevel = Object.assign(this.lstUserLevel, res);
          this.lstUserLevel = [...this.lstUserLevel];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  closeResult = '';
  addUserLevel(content) {
    this.selectedUserLevel = new UserLevel();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      // (reason) => {
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // },
    );
  }
  // private getDismissReason(reason: any): string {
  // 	if (reason === ModalDismissReasons.ESC) {
  // 		return 'by pressing ESC';
  // 	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  // 		return 'by clicking on a backdrop';
  // 	} else {
  // 		return `with: ${reason}`;
  // 	}
  // }

  modalClose() {
    this.modalService.dismissAll();
  }
  async saveUserLevel() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      if (this.selectedUserLevel.userLevelID > 0) {
        this.userLevelService.updateUserLevel(this.selectedUserLevel).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
      else {
        this.userLevelService.saveUserLevel(this.selectedUserLevel).subscribe(
          (res) => {
            if (res) {
              this.modalClose();
              this.getAll();
              this.swal.message('Data Saved Successfully', SweetAlertEnum.success);
            }
          }
        );
      }
    }
  }

  async editUserLevel(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      // (reason) => {
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // },
    );

  }

  async deleteUserLevel() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.userLevelService.deleteUserLevel(this.selectedUserLevel.userLevelID).subscribe(
        (res) => {
          if (res) {
            this.lstUserLevel = this.lstUserLevel.filter(x => x.userLevelID != this.selectedUserLevel.userLevelID);
            this.gridOptions.api.redrawRows();
            this.swal.message('User Level Deleted', SweetAlertEnum.success);
          }
        }
      );
    }
  }
  async updateOrder() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      let dataLength = this.lstUserLevel.length;
      for (let i = 0; i < dataLength; i++) {
        let row = this.gridApi.getDisplayedRowAtIndex(i);
        let dbData = this.lstUserLevel.find(x => x.userLevelID == row.data.userLevelID);
        dbData.orderNo = i + 1;
      }
      this.userLevelService.updateOrder(this.lstUserLevel).subscribe(
        (res) => {
          if (res) {
            this.gridOptions.api.redrawRows();
            this.swal.message('Order Updated', SweetAlertEnum.success);
          }
        }
      );
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
      this.selectedUserLevel = selectedRows[0];
    }
    else {
      this.selectedUserLevel = new UserLevel();
    }
  }
}





const dataDefaultColDef: ColDef = {
  // flex: 1,
  // width: 300,
  // resizable: true,
  sortable: true,
  // suppressMovable: true,
  filter: true,
  // cellClass: 'suppress-movable-col',
  // floatingFilter: true, suppressRowDrag
};
const dataColumnDefs = [
  { field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left', valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { field: "userLevelName", headerName: 'User Level', },
  { field: "isActive", headerName: 'Is Active' },
  { field: "orderNo", headerName: 'Order' },
];


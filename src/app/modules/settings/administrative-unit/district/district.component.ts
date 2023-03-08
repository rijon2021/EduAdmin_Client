import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Division } from 'src/app/core/models/settings/division';
import { DivisionDistrictMap, District } from 'src/app/core/models/settings/district';
import { DivisionService } from 'src/app/core/services/settings/division.service';
import { DistrictService } from 'src/app/core/services/settings/district.service';


@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {


  @ViewChild("modalDistrict") modalDistrict: TemplateRef<any>;

  lstDistrict: District[] = new Array<District>();
  lstDivision: Division[] = new Array<Division>();
  selectedDistrict: District = new District();
  reactiveForm = new FormGroup({});
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
    private districtService: DistrictService,
    private divisionService: DivisionService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      divisionID: new FormControl(0, [Validators.required]),
      districtName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      districtCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      districtNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isActive: new FormControl(''),

    })
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllDivision();
  }

  getAllDivision() {
    this.divisionService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDivision = Object.assign(this.lstDivision, res);
          this.lstDivision = [...this.lstDivision];

          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  getAll() {
    this.districtService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDistrict = Object.assign(this.lstDistrict, res);
          this.lstDistrict = [...this.lstDistrict];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  add() {
    this.selectedDistrict = new District();
    this.modalService.open(this.modalDistrict, { size: 'md', backdrop: 'static' });
  }
  modalClose() {
    this.modalService.dismissAll(this.modalDistrict);
  }
  onSubmit() {
    if (this.selectedDistrict.districtID > 0) {
      this.update();
    }
    if (!this.selectedDistrict.districtID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.districtService.save(this.selectedDistrict).subscribe(
        (res: District) => {
          if (res && res.districtID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }
  edit() {
    if (!this.selectedDistrict.divisionDistrictMap) {
      var map = new DivisionDistrictMap();
      map.districtID = this.selectedDistrict.districtID;
      map.divisionID = 0;
      map.isActive = true;
      this.selectedDistrict.divisionDistrictMap = map;
    }
    this.modalService.open(this.modalDistrict, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.districtService.update(this.selectedDistrict).subscribe(
        (res: District) => {
          if (res && res.districtID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        })
    }
  }
  async remove() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.districtService.delete(this.selectedDistrict.districtID).subscribe(
        (res) => {
          if (res) {
            this.swal.message('Data deleted', SweetAlertEnum.success);
            this.getAll();
          }
        }
      );
    }
  }
  // async updateOrder() {
  //   if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
  //     let dataLength = this.lstDistrict.length;
  //     for (let i = 0; i < dataLength; i++) {
  //       let row = this.gridApi.getDisplayedRowAtIndex(i);
  //       let dbData = this.lstDistrict.find(x => x.districtID == row.data.districtID);
  //       // dbData.divisionDistrictMap.orderNo = i + 1;
  //     }
  //     this.districtService.updateOrder(this.lstDistrict).subscribe(
  //       (res) => {
  //         if (res) {
  //           this.gridOptions.api.redrawRows();
  //           this.swal.message('Order Updated', SweetAlertEnum.success);
  //         }
  //       }
  //     );
  //   }
  // }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); 
    }
  }
  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedDistrict = selectedRows[0];
    }
    else {
      this.selectedDistrict = new District();
    }
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}

const dataDefaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col',
};
const dataColumnDefs = [
  { isVisible: true, field: 'slNo', filter : false, headerName: 'SL', lockPosition: true, pinned: 'left', suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80 },
  { isVisible: true, field: "countryName", headerName: 'Country Name' },
  { isVisible: true, field: "divisionName", headerName: 'Division Name' },
  { isVisible: true, field: "districtName", headerName: 'District Name' },
  { isVisible: true, field: "districtCode", headerName: 'District Code' },
  { isVisible: true, field: "districtNameBangla", headerName: 'District Name (বাংলা)' },
  { isVisible: true, field: "divisionDistrictMap.isActive", headerName: 'Is Active' },
];    

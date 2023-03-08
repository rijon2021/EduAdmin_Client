import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Country } from 'src/app/core/models/settings/country';
import { District } from 'src/app/core/models/settings/district';
import { DistrictUpazilaCityCorporationMap, UpazilaCityCorporation } from 'src/app/core/models/settings/upazilaCityCorporation';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { DistrictService } from 'src/app/core/services/settings/district.service';
import { UpazilaCityCorporationService } from 'src/app/core/services/settings/upazila-city-corporation.service';

@Component({
  selector: 'app-upazila-city-corporation',
  templateUrl: './upazila-city-corporation.component.html',
  styleUrls: ['./upazila-city-corporation.component.css']
})
export class UpazilaCityCorporationComponent implements OnInit {


  @ViewChild("modalUpazilaCityCorporation") modalUpazilaCityCorporation: TemplateRef<any>;

  lstUpazilaCityCorporation: UpazilaCityCorporation[] = new Array<UpazilaCityCorporation>();
  lstDistrict: District[] = new Array<District>();
  lstCountry: Country[] = new Array<Country>();
  selectedUpazilaCityCorporation: UpazilaCityCorporation = new UpazilaCityCorporation();
  reactiveForm = new FormGroup({});
  public pageModel: PageModel;
  queryObject: QueryObject = new QueryObject();

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
    private countryService: CountryService,
    private upazilaCityCorporationService: UpazilaCityCorporationService,
    private districtService: DistrictService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      districtID: new FormControl(0, [Validators.required]),
      upazilaCityCorporationName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      upazilaCityCorporationCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      upazilaCityCorporationNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isUpazila: new FormControl(''),
      isActive: new FormControl(''),

    })
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllDistrict();
    this.getAllCountry();
  }
  getAllCountry() {
    this.countryService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstCountry = Object.assign(this.lstCountry, res);
          this.lstCountry = [...this.lstCountry];
        }
      }
    );
  }

  getAllDistrict() {
    this.districtService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstDistrict = Object.assign(this.lstDistrict, res);
          this.lstDistrict = [...this.lstDistrict];

          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  getAll() {
    this.upazilaCityCorporationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstUpazilaCityCorporation = Object.assign(this.lstUpazilaCityCorporation, res);
          this.lstUpazilaCityCorporation = [...this.lstUpazilaCityCorporation];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  add() {
    this.selectedUpazilaCityCorporation = new UpazilaCityCorporation();
    this.modalService.open(this.modalUpazilaCityCorporation, { size: 'lg', backdrop: 'static' });
  }
  modalClose() {
    this.modalService.dismissAll(this.modalUpazilaCityCorporation);
  }
  onSubmit() {
    if (this.selectedUpazilaCityCorporation.upazilaCityCorporationID > 0) {
      this.update();
    }
    if (!this.selectedUpazilaCityCorporation.upazilaCityCorporationID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.upazilaCityCorporationService.save(this.selectedUpazilaCityCorporation).subscribe(
        (res: UpazilaCityCorporation) => {
          if (res && res.upazilaCityCorporationID > 0) {
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
    if (!this.selectedUpazilaCityCorporation.districtUpazilaCityCorporationMap) {
      var map = new DistrictUpazilaCityCorporationMap();
      map.upazilaCityCorporationID = this.selectedUpazilaCityCorporation.upazilaCityCorporationID;
      map.districtID = 0;
      map.isActive = true;
      this.selectedUpazilaCityCorporation.districtUpazilaCityCorporationMap = map;
    }
    this.modalService.open(this.modalUpazilaCityCorporation, { size: 'lg', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.upazilaCityCorporationService.update(this.selectedUpazilaCityCorporation).subscribe(
        (res: UpazilaCityCorporation) => {
          if (res && res.upazilaCityCorporationID > 0) {
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
      this.upazilaCityCorporationService.delete(this.selectedUpazilaCityCorporation.upazilaCityCorporationID).subscribe(
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
  //     let dataLength = this.lstUpazilaCityCorporation.length;
  //     for (let i = 0; i < dataLength; i++) {
  //       let row = this.gridApi.getDisplayedRowAtIndex(i);
  //       let dbData = this.lstUpazilaCityCorporation.find(x => x.upazilaCityCorporationID == row.data.upazilaCityCorporationID);
  //       // dbData.districtUpazilaCityCorporationMap.orderNo = i + 1;
  //     }
  //     this.upazilaCityCorporationService.updateOrder(this.lstUpazilaCityCorporation).subscribe(
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
      this.selectedUpazilaCityCorporation = selectedRows[0];
    }
    else {
      this.selectedUpazilaCityCorporation = new UpazilaCityCorporation();
    }
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  filter() {
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
  { isVisible: true, field: "districtName", headerName: 'District Name' },
  { isVisible: true, field: "upazilaCityCorporationName", headerName: 'Upazila/City Corporation Name' },
  { isVisible: true, field: "upazilaCityCorporationCode", headerName: 'Upazila/City Corporation Code' },
  { isVisible: true, field: "upazilaCityCorporationNameBangla", headerName: 'Upazila/City Corporation Name (বাংলা)' },
  { isVisible: true, field: "isUpazila", headerName: 'Is Upazila' },
  { isVisible: true, field: "districtUpazilaCityCorporationMap.isActive", headerName: 'Is Active' },
];

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { UpazilaCityCorporation } from 'src/app/core/models/settings/upazilaCityCorporation';
import { UpazilaCityCorporationThanaMap, Thana } from 'src/app/core/models/settings/thana';
import { ThanaService } from 'src/app/core/services/settings/thana.service';
import { UpazilaCityCorporationService } from 'src/app/core/services/settings/upazila-city-corporation.service';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Country } from 'src/app/core/models/settings/country';
import { CountryService } from 'src/app/core/services/settings/country.service';


@Component({
  selector: 'app-thana',
  templateUrl: './thana.component.html',
  styleUrls: ['./thana.component.css']
})
export class ThanaComponent implements OnInit {


  @ViewChild("modalThana") modalThana: TemplateRef<any>;

  lstCountry: Country[] = new Array<Country>();
  lstThana: Thana[] = new Array<Thana>();
  lstUpazilaCityCorporation: UpazilaCityCorporation[] = new Array<UpazilaCityCorporation>();
  selectedThana: Thana = new Thana();
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
    private thanaService: ThanaService,
    private upazilaCityCorporationService: UpazilaCityCorporationService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      upazilaCityCorporationID: new FormControl(0, [Validators.required]),
      thanaName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      thanaCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      thanaNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isActive: new FormControl(''),

    })
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllUpazilaCityCorporation();
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

  getAllUpazilaCityCorporation() {
    this.upazilaCityCorporationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstUpazilaCityCorporation = Object.assign(this.lstUpazilaCityCorporation, res);
          this.lstUpazilaCityCorporation = [...this.lstUpazilaCityCorporation];

          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  getAll() {
    this.thanaService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstThana = Object.assign(this.lstThana, res);
          this.lstThana = [...this.lstThana];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  add() {
    this.selectedThana = new Thana();
    this.modalService.open(this.modalThana, { size: 'md', backdrop: 'static' });
  }
  modalClose() {
    this.modalService.dismissAll(this.modalThana);
  }
  onSubmit() {
    if (this.selectedThana.thanaID > 0) {
      this.update();
    }
    if (!this.selectedThana.thanaID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.thanaService.save(this.selectedThana).subscribe(
        (res: Thana) => {
          if (res && res.thanaID > 0) {
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
    if (!this.selectedThana.upazilaCityCorporationThanaMap) {
      var map = new UpazilaCityCorporationThanaMap();
      map.thanaID = this.selectedThana.thanaID;
      map.upazilaCityCorporationID = 0;
      map.isActive = true;
      this.selectedThana.upazilaCityCorporationThanaMap = map;
    }
    this.modalService.open(this.modalThana, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.thanaService.update(this.selectedThana).subscribe(
        (res: Thana) => {
          if (res && res.thanaID > 0) {
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
      this.thanaService.delete(this.selectedThana.thanaID).subscribe(
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
  //     let dataLength = this.lstThana.length;
  //     for (let i = 0; i < dataLength; i++) {
  //       let row = this.gridApi.getDisplayedRowAtIndex(i);
  //       let dbData = this.lstThana.find(x => x.thanaID == row.data.thanaID);
  //       // dbData.upazilaCityCorporationThanaMap.orderNo = i + 1;
  //     }
  //     this.thanaService.updateOrder(this.lstThana).subscribe(
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
      this.selectedThana = selectedRows[0];
    }
    else {
      this.selectedThana = new Thana();
    }
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  filter(){

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
  { isVisible: true, field: "upazilaCityCorporationName", headerName: 'Upazila/City Corporation Name' },
  { isVisible: true, field: "thanaName", headerName: 'Thana Name' },
  { isVisible: true, field: "thanaCode", headerName: 'Thana Code' },
  { isVisible: true, field: "thanaNameBangla", headerName: 'Thana Name (বাংলা)' },
  { isVisible: true, field: "upazilaCityCorporationThanaMap.isActive", headerName: 'Is Active' },
];    

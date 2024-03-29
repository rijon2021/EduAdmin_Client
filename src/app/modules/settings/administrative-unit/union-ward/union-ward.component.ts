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
import { Thana } from 'src/app/core/models/settings/thana';
import { ThanaUnionWardMap, UnionWard } from 'src/app/core/models/settings/unionWard';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { ThanaService } from 'src/app/core/services/settings/thana.service';
import { UnionWardService } from 'src/app/core/services/settings/union-ward.service';


@Component({
  selector: 'app-union-ward',
  templateUrl: './union-ward.component.html',
  styleUrls: ['./union-ward.component.css']
})
export class UnionWardComponent implements OnInit {


  @ViewChild("modalUnionWard") modalUnionWard: TemplateRef<any>;

  lstCountry: Country[] = new Array<Country>();
  lstUnionWard: UnionWard[] = new Array<UnionWard>();
  lstThana: Thana[] = new Array<Thana>();
  selectedUnionWard: UnionWard = new UnionWard();
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
    private unionWardService: UnionWardService,
    private thanaService: ThanaService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.reactiveForm = new FormGroup({
      thanaID: new FormControl(0, [Validators.required]),
      unionWardName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      unionWardCode: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      unionWardNameBangla: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isUnion: new FormControl(''),
      isActive: new FormControl(''),
    })
  }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
    this.getAllThana();
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
    )
  }

  getAllThana() {
    this.thanaService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstThana = Object.assign(this.lstThana, res);
          this.lstThana = [...this.lstThana];

          this.gridOptions.api.redrawRows();
        }
      }
    );
  }
  getAll() {
    this.unionWardService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstUnionWard = Object.assign(this.lstUnionWard, res);
          this.lstUnionWard = [...this.lstUnionWard];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }
  add() {
    this.selectedUnionWard = new UnionWard();
    this.modalService.open(this.modalUnionWard, { size: 'md', backdrop: 'static' });
  }
  modalClose() {
    this.modalService.dismissAll(this.modalUnionWard);
  }
  onSubmit() {
    if (this.selectedUnionWard.unionWardID > 0) {
      this.update();
    }
    if (!this.selectedUnionWard.unionWardID) {
      this.save();
    }
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.unionWardService.save(this.selectedUnionWard).subscribe(
        (res: UnionWard) => {
          if (res && res.unionWardID > 0) {
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
    if (!this.selectedUnionWard.thanaUnionWardMap) {
      var map = new ThanaUnionWardMap();
      map.unionWardID = this.selectedUnionWard.unionWardID;
      map.thanaID = 0;
      map.isActive = true;
      this.selectedUnionWard.thanaUnionWardMap = map;
    }
    this.modalService.open(this.modalUnionWard, { size: 'md', backdrop: 'static' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.unionWardService.update(this.selectedUnionWard).subscribe(
        (res: UnionWard) => {
          if (res && res.unionWardID > 0) {
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
      this.unionWardService.delete(this.selectedUnionWard.unionWardID).subscribe(
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
  //     let dataLength = this.lstUnionWard.length;
  //     for (let i = 0; i < dataLength; i++) {
  //       let row = this.gridApi.getDisplayedRowAtIndex(i);
  //       let dbData = this.lstUnionWard.find(x => x.unionWardID == row.data.unionWardID);
  //       // dbData.thanaUnionWardMap.orderNo = i + 1;
  //     }
  //     this.unionWardService.updateOrder(this.lstUnionWard).subscribe(
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
      this.selectedUnionWard = selectedRows[0];
    }
    else {
      this.selectedUnionWard = new UnionWard();
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
  { isVisible: true, field: "thanaName", headerName: 'Thana Name' },
  { isVisible: true, field: "unionWardName", headerName: 'UnionWard Name' },
  { isVisible: true, field: "unionWardCode", headerName: 'UnionWard Code' },
  { isVisible: true, field: "unionWardNameBangla", headerName: 'UnionWard Name (বাংলা)' },
  { isVisible: true, field: "isUnion", headerName: 'Is Union' },
  { isVisible: true, field: "thanaUnionWardMap.isActive", headerName: 'Is Active' },
];    

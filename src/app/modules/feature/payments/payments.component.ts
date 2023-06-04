import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { Payments } from 'src/app/core/models/core/payments';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { PaymentsService } from 'src/app/core/services/payments.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  studentId:string;
  rowData:any;
  lstPayment:any;
  selectedPayment: Payments = new Payments();
  constructor(
    private paymentsService: PaymentsService
  ) { }

  ngOnInit() {
    this.studentId = localStorage.getItem(LOCALSTORAGE_KEY.STUDENT_ID);
    this.getPayments();

  }

  getPayments(){
    this.paymentsService.getPayments(this.studentId).subscribe(
      (res)=>{
        this.lstPayment = res;
      }
      
    )
  }

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
      this.selectedPayment = selectedRows[0];
    }
    else {
      this.selectedPayment = new Payments();
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
  { isVisible: true, field: "studentId", headerName: 'Student ID', lockPosition: true, pinned: 'left', suppressMovable: false },
  { isVisible: true, field: "orderNo", headerName: 'Invoice No' },
  { isVisible: true, field: "batchName", headerName: 'Batch Name' },
  { isVisible: true, field: "feeCategory", headerName: 'Fee Category' },
  { isVisible: true, field: "paidAmount", headerName: 'Paid Amount', type: 'centerAligned' },
  { isVisible: true, field: "paymentDate", headerName: 'Date of Payment', headerClass: 'ag-grid-text-center', cellStyle: { textAlign: 'center' } },

];
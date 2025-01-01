import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Notice } from 'src/app/core/models/edu/notice';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { NoticeService } from 'src/app/core/services/edu/notice.service';
declare var $;

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  @ViewChild("viewNoticeModal") viewNoticeModal: TemplateRef<any>;
  
  studentId:number;
  studentName:string;
  rowData:any;
  lstNotice:any;
  selectedNotice: Notice = new Notice();
  constructor(
    private noticeService: NoticeService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.studentId = parseInt(localStorage.getItem(LOCALSTORAGE_KEY.STUDENT_ID));
    this.studentName = localStorage.getItem(LOCALSTORAGE_KEY.USER_FULL_NAME);
    this.getNotices();

  }

  getNotices(){
    this.noticeService.getAll(this.studentId).subscribe(
      (res)=>{
        this.lstNotice = res;
        
      }
    )
  }
  viewNotice(){
    this.modalService.open(this.viewNoticeModal, { size: 'xl', backdrop: 'static' });
    
  }
  modalClose(){
    this.modalService.dismissAll(this.viewNoticeModal);
    
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
      this.selectedNotice = selectedRows[0];
    }
    else {
      this.selectedNotice = new Notice();
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
  { isVisible: true, field: "noticeDate", headerName: 'Date of Notice', headerClass: 'ag-grid-text-center',cellRenderer: (data) => { return data.value ? (new Date(data.value)).toLocaleDateString() : ''; }, cellStyle: { textAlign: 'center' } },
  { isVisible: true, field: "className", headerName: 'Class Name'},
  { isVisible: true, field: "noticeTitle", headerName: 'Notice Title'},
  { isVisible: true, field: "attachmentLink", headerName: 'Attachment Link'},

  

];
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { Result } from 'src/app/core/models/edu/result';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ResultService } from 'src/app/core/services/edu/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {


  objResult: Result = new Result();
  lstExamInfo: any = [];
  queryObject: QueryObject = new QueryObject();
  


  constructor(
    private resultService: ResultService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.queryObject.studentId = localStorage.getItem(LOCALSTORAGE_KEY.STUDENT_ID);
    this.queryObject.batchId = localStorage.getItem(LOCALSTORAGE_KEY.BATCH_ID);
    this.getAllExamInfo();
  }

  getAllExamInfo() {
    this.resultService.getAllExamInfo(this.queryObject).subscribe((response) => {
      if (response) {
        this.lstExamInfo = response;
      }
    }
    );
  }
  searchResult() {
    this.objResult = new Result;
    this.resultService.getResult(this.queryObject).subscribe((response) => {
      if (response) {
        this.objResult = Object.assign(this.objResult, response);
      }
    }
    );
  }
  getExamName(examID){
    return this.lstExamInfo.find(x=>x.exInSl == examID).exName;
  }



}

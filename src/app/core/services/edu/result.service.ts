
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResultService {
  private controllerName = 'Result';
  constructor(
    private httpClientService: HttpClientService,
    private http: HttpClient
  ) { }

  getAllExamInfo(obj) {
    let url = this.controllerName + '/examName?batchId=' + obj.batchId +'&studentId=' + obj.studentId;
    return this.httpClientService.get(url);
  }
  getResult(obj) {
    let url = this.controllerName + '/reuslt?BatchId=' + obj.BatchId + '&ExamId='+ obj.ExamId +'&studentId=' + obj.StudentId;
    return this.httpClientService.get(url);
  }

}


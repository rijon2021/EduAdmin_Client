
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NoticeService {
  private controllerName = 'v2/Notice';
  constructor(
    private httpClientService: HttpClientService,
    private http: HttpClient
  ) { }

  getAll(obj) {
    let url = this.controllerName + '/getNotice?classId=' + obj.classId+'&groupId=' + obj.groupId;
    return this.httpClientService.get(url);
  }

}


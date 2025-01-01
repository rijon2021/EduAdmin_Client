
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NoticeService {
  private controllerName = 'Notice';
  constructor(
    private httpClientService: HttpClientService,
    private http: HttpClient
  ) { }

  getAll(studentId: number) {
    let url = this.controllerName + '/?StudentId=' + studentId;
    return this.httpClientService.get(url);
  }

}


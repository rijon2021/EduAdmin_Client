import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class UserLevelService {
  private controllerName = 'userLevel';
  constructor(
    private httpClientService: HttpClientService
  ) { }

  getAll() {
    let url = this.controllerName;
    return this.httpClientService.get(url);
  }
  getByID(userAutoID: number) {
    let url = this.controllerName + '/getByID/' + userAutoID;
    return this.httpClientService.get(url);
  }
  saveUserLevel(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  updateUserLevel(obj) {
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  deleteUserLevel(userAutoID: number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }
  updateOrder(obj) {
    let url = this.controllerName + '/updateOrder'
    return this.httpClientService.putJson(url, obj);
  }
}


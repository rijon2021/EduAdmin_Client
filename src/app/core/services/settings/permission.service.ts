import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Injectable()
export class PermissionService {
  private controllerName = 'permission';
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
  saveUser(obj) {
    let url = this.controllerName
    return this.httpClientService.postJson(url, obj);
  }
  updateUser(obj) {   
    let url = this.controllerName;
    return this.httpClientService.putJson(url, obj);
  }
  deleteUser(userAutoID:number) {
    let url = this.controllerName + '?id=' + userAutoID;
    return this.httpClientService.delete(url);
  }
}


import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubjectService {
  private controllerName = 'SubjectChoice';
  constructor(
    private httpClientService: HttpClientService,
    private http: HttpClient
  ) { }

  // getAll() {
  //   let url = this.controllerName;
  //   return this.httpClientService.get(url);
  // }
  // getAllMandetorySubject(ClassId: string, GroupId:string) {
  //   let url = this.controllerName + '/getByID/' + userAutoID;
  //   return this.httpClientService.get(url);
  // }

  // testAPI(){
  //   let url =  'https://jsonplaceholder.typicode.com/posts';
  //   return this.http.get(url);
  // }
  getAllElectedSubjects(studentId: number) {
    
    let url =  this.controllerName +'/Subjects?StudentId='+studentId;
    return this.httpClientService.get(url);
  }
  getAllMandetorySubject(studentId: number) {
    
    let url =  this.controllerName +'/MandetorySubjects?StudentId='+studentId;
    return this.httpClientService.get(url);
  }
  getAllMandetoryOptional(studentId: number) {
    
    let url =  this.controllerName +'/OptionalSubject?StudentId='+studentId;
    return this.httpClientService.get(url);
  }
  save(obj) {
  
    let url = this.controllerName+'/Submit';
    return this.httpClientService.post(url, obj);
  }
  // update(obj) {
  //   let url = this.controllerName;
  //   return this.httpClientService.putJson(url, obj);
  // }
  // delete(userAutoID: number) {
  //   let url = this.controllerName + '?id=' + userAutoID;
  //   return this.httpClientService.delete(url);
  // }
  // updateOrder(obj) {
  //   let url = this.controllerName + '/updateOrder'
  //   return this.httpClientService.putJson(url, obj);
  // }
  // getListByOrganization(obj) {
  //   let url = this.controllerName + '/getListByOrganization/';
  //   return this.httpClientService.postJson(url, obj);
  // }
}


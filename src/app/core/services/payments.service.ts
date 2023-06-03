import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

constructor(
  private httpClientService : HttpClientService
) { }


getPayments(id : string): Observable<any> {
  let url = 'Finance/payments?StudentId='+id;
  return this.httpClientService.get(url);
}


}

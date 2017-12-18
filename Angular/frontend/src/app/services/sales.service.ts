import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

//models
import { ISale } from '../models/sale.model';


@Injectable()
export class SalesService {

  constructor(
    private http: HttpClient
    
  ) { }

//get
  getSale(): Observable<ISale[]> {
    return this.http.get<ISale[]>('http://localhost:3000/api/sales/');
  }

//delete
  deleteSale(id: string): any {
    return this.http.delete('http://localhost:3000/api/sales/' + id);
  }
}

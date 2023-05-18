import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdoService {
  serverUrl: string = environment.serverUrl
  route: string = 'ado';
  withCredential: object = {
    withCredentials: true
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {  }
  
  getBlocks(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBlocks`)
  }
  getAllDealerSale(Block_Code: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllDealerSale?Block_Code=${Block_Code}`)
  }
  getDealerSaleReciept(InvoiceNo: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDealerSaleReciept?InvoiceNo=${InvoiceNo}`)
  }
  getVAWSaleReciept(Permit_NO: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getVAWSaleReciept?Permit_NO=${Permit_NO}`)
  }
  forwardDealerSale(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/forwardDealerSale`, data)
  }


}

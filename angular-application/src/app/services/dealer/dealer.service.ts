import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  // serverUrl:string='http://localhost:80'
  serverUrl: string = environment.serverUrl
  route: string = 'dealer';
  withCredential: object = {
  withCredentials: true
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getBlocks(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBlocks`)
  }
  getDemonstrationId(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationId`)
  }
  getDistrictPrefix(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDistrictPrefix`)
  }
  getPermitList(FarmerId: any,FinYear:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getPermitList?FarmerId=${FarmerId}&Fin_Year=${FinYear}`)
  }
  getItems(CompId: any,FinYear:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItems?CompId=${CompId}&Fin_Year=${FinYear}`)
  }
  // getTechnicalName(ItemId: any , SubCropId: any): Observable<any> {
  //   return this.http.get(`${this.serverUrl}/${this.route}/getTechnicalName?ItemId=${ItemId}&SubCropId=${SubCropId}`)
  // }
  getTechnicalName(ItemId: any, Technical_Status : any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getTechnicalName?ItemId=${ItemId}&Technical_Status=${Technical_Status}`)
  }
  // getEligibleTechnicalName(itemTechRefNo: any): Observable<any> {
  //   return this.http.get(`${this.serverUrl}/${this.route}/getEligibleTechnicalName?itemTechRefNo='${itemTechRefNo}'`)
  // }
  getPurchasedTechnicalName(FarmerId: any , CompId: any , ItemId: any , FinYear: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getPurchasedTechnicalName?FarmerId=${FarmerId}&CompId=${CompId}&ItemId=${ItemId}&Fin_Year=${FinYear}`)
  }
  getItemPrice(ItemId: any,FinYear: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItemPrice?ItemId=${ItemId}&Fin_Year=${FinYear}`)
  }
  submitDealerSale(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/submitDealerSale`,data)
  }

  getALLGeneratedInvoiceLists(date: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getALLGeneratedInvoiceLists?Date=${date}`)
  }

  getDealerSaleReciept(InvoiceNo: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/bao/getDealerSaleReciept?InvoiceNo=${InvoiceNo}`)
  }

  getInputDetails(FarmerId: any, InvoiceNo: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getInputDetails?FarmerId=${FarmerId}&InvoiceNo=${InvoiceNo}`)
  }
  deleteInvoice(InvoiceNo: any, FarmerId: any, ItemId: any, Technical_Code: any ,Fin_year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/deleteInvoice?FarmerId=${FarmerId}&InvoiceNo=${InvoiceNo}&ItemId=${ItemId}&Technical_Code=${Technical_Code}&Fin_year=${Fin_year}`)
  }
}

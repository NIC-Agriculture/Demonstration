import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchemeserviceService {
  // serverUrl:string='http://localhost:80'
  serverUrl: string = environment.serverUrl

  route: string = 'scheme';
  withCredential: object = {
    withCredentials: true
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllDistrict(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllDistrict`)
  }

  SubmitSubscheme(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/addSubscheme`, data);
  }

  getAllScheme(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllScheme`)
  }

  getAllSubscheme(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllSubscheme`)
  }

  getAllComponent(Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllComponent?Fin_Year=${Fin_Year}`)
  }

  getAllComponentType(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllComponentType`)
  }

  getComponentTypeDetails(CompTypeId:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getComponentTypeDetails?CompTypeId=${CompTypeId}`)
  }

  getSubscheme(schemeId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getSubscheme?schemeId=${schemeId}`)
  }

  getComponent(Fin_Year: any , SubschemeId : any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getComponent?SubschemeId=${SubschemeId}&Fin_Year=${Fin_Year}`)
  }

  getComponentCost(CompId: any , Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getComponentCost?CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }

  getComponentCropDetails(CompId: any , Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getComponentCropDetails?CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }

  getAllCrops(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllCrops`)
  }

  getCrops(SubschemeId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCrops?SubschemeId=${SubschemeId}`)
  }

  getAllSubCrops(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllSubCrops`)
  }

  getSubCrops(CropId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getSubCrops?CropId=${CropId}`)
  }

  SubmitComponent(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/addComponent`, data);
  }

  SubmitCompItemDetails(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/addCompItemDetails`, data);
  }
  SubmitItemTechDetails(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/addItemTechDetails`, data);
  }

  getAllDistrictTarget(SubschemeId: any , CompId: any , Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllDistrictTarget?SubschemeId=${SubschemeId}&CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }

  SubmitDistrictTarget(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/SubmitDistrictTarget`, data);
  }
  
  UpdateDistrictTarget(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/UpdateDistrictTarget`, data);
  }

  getDemonstrationIdCount(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationIdCount`)
  }
  getBlockTarget(DistCode: any,CompId: any,FinYear: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBlockTarget?Dist_Code=${DistCode}&CompId=${CompId}&FinYear=${FinYear}`)
  }
  getBlocks(DistCode:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBlocks?Dist_Code=${DistCode}`)
  }
  getclusterDemonstration(Dist_Code:any, Block_Code:any, CompId:any, FinYear:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getclusterDemonstration?Dist_Code=${Dist_Code}&Block_Code=${Block_Code}&CompId=${CompId}&Fin_Year=${FinYear}`)
  }
  getWardData( wardCode: any , DemostrationId: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getWardData?WardCode=${wardCode}&DemostrationId=${DemostrationId}`)
  }
  getCalculatedInputCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedInputCost`)
  }
  getCalculatedIncentiveCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedIncentiveCost`)
  }
  getItemDetails(CompId:any , FinYear: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItemDetails?CompId=${CompId}&Fin_Year=${FinYear}`)
  }

  UpdateComponentCostCropMapping(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/UpdateComponentCostCropMapping`, data);
  }

  getItemCostAndSize(ItemId:any,finYear:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItemCostAndSize?ItemId=${ItemId}&Fin_Year=${finYear}`)
  }

  updateItemDetails(data: {}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/updateItemDetails`, data);
  }

  complianceReport(FinYear: any,SchemeId:any , SubschemeId:any , CompId:any): Observable<any> {
    
    return this.http.get(`${this.serverUrl}/${this.route}/complianceReport?Fin_Year=${FinYear}&SchemeId=${SchemeId}&SubschemeId=${SubschemeId}&CompId=${CompId}`)
  }

}

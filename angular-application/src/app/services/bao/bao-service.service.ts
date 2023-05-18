import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaoServiceService {
  // serverUrl:string='http://localhost:80'
  serverUrl: string = environment.serverUrl
  route: string = 'bao';
  withCredential: object = {
    withCredentials: true
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


  getGPs(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getGPs`)
  }
  assignVAW(Gp_Code: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/assignVAW?Gp_Code=${Gp_Code}`)
  }

  getBlockTarget(schemeId : string,SubschemeId : string,CompId : string,Fin_Year : string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBlockTarget?schemeId=${schemeId}&SubschemeId=${SubschemeId}&CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }

  SubmitDemonstrationPatch(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/SubmitDemonstrationPatch`, data)
  }
  getAllScheme(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllScheme`)
  }
  getSubscheme(schemeId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getSubscheme?schemeId=${schemeId}`)
  }
  getComponent(SubschemeId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getComponent?SubschemeId=${SubschemeId}`)
  }
  getDemonstrationData(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationData`)
  }
  getVerifiedDemonstrationData(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getVerifiedDemonstrationData`)
  }
  getDemoIDToBeConfirmed(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemoIDToBeConfirmed`)
  }
  getItemDetails(bp_ItemId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItemDetails?bp_ItemId=${bp_ItemId}`)
  }
  getAllFarmerList(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerList?DemonstrationId=${DemonstrationId}`)
  }
  getAllApprovedFarmerList(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/vaw/getAllApprovedFarmerList?DemonstrationId=${DemonstrationId}`)
  }
  getTotalLandCount(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/vaw/getTotalLandCount?DemonstrationId=${DemonstrationId}`)
  }
  getTotalSeedCount(CompId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/vaw/getTotalSeedCount?CompId=${CompId}`)
  }
  confirmDemonstrationPatch(DemonstrationId: any): Observable<any>{
    return this.http.get(`${this.serverUrl}/${this.route}/confirmDemonstrationPatch?DemonstrationId=${DemonstrationId}`)
  }
  getAllDealerSale(demonstrationId: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllDealerSale?DemonstrationId=${demonstrationId}`)
  }
  getDealerSaleReciept(InvoiceNo: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDealerSaleReciept?InvoiceNo=${InvoiceNo}`)
  }
  getVAWSaleReciept(Permit_NO: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getVAWSaleReciept?Permit_NO=${Permit_NO}`)
  }
  confirmDealerSale(selectedDealerSale: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/confirmDealerSale`, selectedDealerSale)
  }
  getAvailableTarget(FinYear: any,schemeId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAvailableTarget?Fin_Year=${FinYear}&schemeId=${schemeId}`)
  }
  getWardData( wardCode: any , DemostrationId: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getWardData?WardCode=${wardCode}&DemostrationId=${DemostrationId}`)
  }
  getclusterDemonstration( FinYear:any ,schemeId: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getclusterDemonstration?Fin_Year=${FinYear}&schemeId=${schemeId}`)
  }
  getDemonstrationIdCount(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationIdCount`)
  }
  getSeedDistributionStatus(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getSeedDistributionStatus`)
  }
  returnBackToVAW(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/returnBackToVAW`,data)
  }
  getDemonstrationStatusReport( FinYear:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationStatusReport?Fin_Year=${FinYear}`)
  }
  fieldDemonstrationIdPhaseDetails( ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/fieldDemonstrationIdPhaseDetails`)
  }
  getFieldDemonstrationPhotos( DemostrationId:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getFieldDemonstrationPhotos?DemostrationId=${DemostrationId}`)
  }
  deleteDemoID(demoID : any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/deleteDemoID?DemostrationId=${demoID}`)
  }
  getCalculatedInputCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedInputCost`)
  }
  getCalculatedIncentiveCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedIncentiveCost`)
  }

  
  getEligibleDemonstrationData(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getEligibleDemonstrationData`)
  }
  getAllFarmerTrapData(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerTrapData?DemonstrationId=${DemonstrationId}`)
  }
  submitTrapsData(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/submitTrapsData`, data)
  }
  updateTrapsData(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/updateTrapsData`, data)
  }
  getFarmerGp(farmerId:string ): Observable<any> {
    return this.http.get(`https://mkuy.apicol.nic.in/api/FarmerData/Fdetails?fid=${farmerId}`, { headers: { skip: 'true' } })
  }
  confirmTrapsData(DemonstrationId:string ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/confirmTrapsData?DemonstrationId=${DemonstrationId}`)
  }

}

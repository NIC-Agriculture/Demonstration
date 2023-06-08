import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VawService {
  // serverUrl:string='http://localhost:80'
  serverUrl: string = environment.serverUrl
  route: string = 'vaw';
  withCredential: object = {
    withCredentials: true
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  getDemonstrationData(Finyear:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationData?Fin_Year=${Finyear}`)
  }
  getDistrictPrefix(Dist_Code: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDistrictPrefix?Dist_Code=${Dist_Code}`)
  }
  checkFarmerIDExistance(farmerId:string ,newSchemeId : string,newSubschemeId: string ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/checkFarmerRegistredOrNot?FarmerID=${farmerId}&schemeId=${newSchemeId}&SubschemeId=${newSubschemeId}`)
  }
  getFarmerData(farmerId:string ): Observable<any> {
    return this.http.get(`https://mkuy.apicol.nic.in/api/FMN/GETPUMPTAKEN?FARMER_ID=${farmerId}`, { headers: { skip: 'true' } })
  }
  SubmitfarmerDetails(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/SubmitfarmerDetails`,data)
  }
  getAllFarmerList(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerList?DemonstrationId=${DemonstrationId}`)
  }
  getAllApprovedFarmerList(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllApprovedFarmerList?DemonstrationId=${DemonstrationId}`)
  }
  ConfirmSeedDistributionStatus(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/ConfirmSeedDistributionStatus?DemonstrationId=${DemonstrationId}`)
  }
  getTotalLandCount(DemonstrationId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getTotalLandCount?DemonstrationId=${DemonstrationId}`)
  }
  getTotalSeedCount(CompId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getTotalSeedCount?CompId=${CompId}`)
  }
  getAllFarmerDetails(FarmerId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerDetails?FarmerId=${FarmerId}`)
  }
  UpdateFarmerDetails(data:any): Observable<any> {
    return this.http.put(`${this.serverUrl}/${this.route}/UpdateFarmerDetails`,data)
  }
  DeleteFarmerDetails(permit_NO:any , demoID : any , FID : any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/DeleteFarmerDetails?permit_NO=${permit_NO}&DemostrationId=${demoID}&FarmerId=${FID}`)
  }
  FinalSubmitfarmerDetails(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/FinalSubmitfarmerDetails`,data)
  }
  getDemonstrationIdCount(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationIdCount`)
  }
  getDemonstrationReport(DemostrationId:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationReport?DemostrationId=${DemostrationId}`)
  }
  getCalculatedInputCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedInputCost`)
  }
  getCalculatedIncentiveCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedIncentiveCost`)
  }
}

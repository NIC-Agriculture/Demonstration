import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdaoService {
  // serverUrl:string='http://localhost:80'
  serverUrl: string = environment.serverUrl
  route: string = 'cdao';
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
  getAllScheme(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllScheme`)
  }
  getSubscheme(schemeId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getSubscheme?schemeId=${schemeId}`)
  }
  getComponent(SubschemeId: any, Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getComponent?SubschemeId=${SubschemeId}&Fin_Year=${Fin_Year}`)
  }
  getItems(CompId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItems?CompId=${CompId}`)
  }
  getbpItems(CompId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getbpItems?CompId=${CompId}`)
  }
  getTechnicalName(ItemId: any , SubCropId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getTechnicalName?ItemId=${ItemId}&SubCropId=${SubCropId}`)
  }
  getCrops(SubschemeId: any, CompId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCrops?SubschemeId=${SubschemeId}&CompId=${CompId}`)
  }
  getAllbpSubCrop( CompId:any , ItemId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllbpSubCrop?CompId=${CompId}&ItemId=${ItemId}`)
  }
  getSubCrop(CompId : any , CompTypeId: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getSubCrop?CompId=${CompId}&CompTypeId=${CompTypeId}`)
  }
  getCropVariety(SubCropId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCropVariety?SubCropId=${SubCropId}`)
  }
  getBPCropVariety(SubCropId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBPCropVariety?SubCropId=${SubCropId}`)
  }
  getComponentCost(CompId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getComponentCost?CompId=${CompId}`)
  }
  getDistrictTarget(CompId: any , Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDistrictTarget?CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }
  getBlockTargetData(CompId: any , Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBlockTargetData?CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }
  getCompTargetDetails(schemeId:any, SubschemeId:any, CompId: any, Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCompTargetDetails?schemeId=${schemeId}&SubschemeId=${SubschemeId}&CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }
  getItemTechDetails( CompId: any, itemTechRefNo: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItemTechDetails?CompId=${CompId}&itemTechRefNo=${itemTechRefNo}`)
  }
  SubmitBlockTarget(data:any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/SubmitBlockTarget`, data)
  }
  UpdateBlockTarget(data:{}): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/UpdateBlockTarget`, data)
  }
  getAllDealerSale(Block_Code: any , scheme: any, SubschemeId:any, CompId:any, Fin_Year: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllDealerSale?Block_Code=${Block_Code}&schemeId=${scheme}&SubschemeId=${SubschemeId}&CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }
  getAllApprovedDealerSale(Block_Code: any , scheme: any, SubschemeId:any, CompId:any , Fin_Year: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllApprovedDealerSale?Block_Code=${Block_Code}&schemeId=${scheme}&SubschemeId=${SubschemeId}&CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }
  getAllReturnedDealerSale(Block_Code: any , scheme: any, SubschemeId:any, CompId:any, Fin_Year: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAllReturnedDealerSale?Block_Code=${Block_Code}&schemeId=${scheme}&SubschemeId=${SubschemeId}&CompId=${CompId}&Fin_Year=${Fin_Year}`)
  }
  getAllIncentive(Block_Code: any , scheme: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getIncetiveList?Block_Code=${Block_Code}&schemeId=${scheme}`)
  }
  getDealerSaleReciept(InvoiceNo: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDealerSaleReciept?InvoiceNo=${InvoiceNo}`)
  }
  getVAWSaleReciept(Permit_NO: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getVAWSaleReciept?Permit_NO=${Permit_NO}`)
  }
  approveDealerSale(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/approveDealerSale`, data)
  }
  approveIncentiveList(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/approveIncentiveList`, data)
  }
  getBlockWiseSeedReport(Block_Code: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getBlockWiseSeedReport?Block_Code=${Block_Code}`)
  }
  getReferenceIDs(schemeId: any ,paymentType:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getReferenceIDs?schemeId=${schemeId}&paymentType=${paymentType}`)
  }
  generatePaymntFile(rid: any , schemeId:any, paymentType:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/generatePaymntFile?ReferenceNo=${rid}&schemeId=${schemeId}&paymentType=${paymentType}`)
  }
  getFarmerBankDetails(Farmer_Id: any ): Observable<any> {
    return this.http.get(`https://mkuy.apicol.nic.in/api/FarmerData/GetFdetails?fid=${Farmer_Id}`, { headers: { skip: 'true' } })
  }
  getAvailableTarget(FinYear : any,schemeId : any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getAvailableTarget?Fin_Year=${FinYear}&schemeId=${schemeId}`)
  }
  getDemonstrationIdCount(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationIdCount`)
  }
  getItemNameAndTechnicalName( CompId: any, Fin_Year: any, SubschemeId:any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getItemNameAndTechnicalNameReport?CompId=${CompId}&Fin_Year=${Fin_Year}&SubschemeId=${SubschemeId}`)
  }
  getclusterDemonstration( Block_Code:any, FinYear:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getclusterDemonstration?Block_Code=${Block_Code}&Fin_Year=${FinYear}`)
  }
  getDemonstrationStatusReport( Block_Code:any, FinYear:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationStatusReport?Block_Code=${Block_Code}&Fin_Year=${FinYear}`)
  }
  getWardData( wardCode: any , DemostrationId: any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getWardData?WardCode=${wardCode}&DemostrationId=${DemostrationId}`)
  }
  getReferenceIDsForpayment(paymentType:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getReferenceIDsForpayment?paymentType=${paymentType}`)
  }
  getPermitSaleDetails(ReferenceNo:any , paymentType:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getPermitSaleDetails?ReferenceNo=${ReferenceNo}&paymentType=${paymentType}`)
  }
  UpdateTransactionDetails(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/UpdateTransactionDetails`, data)
  }
  RegeneratePaymntFile(rid: any , schemeId:any, paymentType:any ): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/RegeneratePaymntFile?ReferenceNo=${rid}&schemeId=${schemeId}&paymentType=${paymentType}`)
  }
  getCropCatagory(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCropCatagory`)
  }
  getCrop(CropId: any): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCrop?CropId=${CropId}`)
  }
  AddCropVariety(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/AddCropVariety`, data)
  }
  getCalculatedInputCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedInputCost`)
  }
  getCalculatedIncentiveCost(): Observable<any> {
    return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedIncentiveCost`)
  }
  returnDealerSaleToBAO(data: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/${this.route}/returnDealerSaleToBAO`, data)
  }
}
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DealerService } from 'src/app/services/dealer/dealer.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-permit-verification',
  templateUrl: './permit-verification.component.html',
  styleUrls: ['./permit-verification.component.css']
})
export class PermitVerificationComponent implements OnInit {

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  blocks: any;
  permitList: any;
  block: any;
  dealerPage: boolean = true;
  dealerSell: boolean = false;
  dealerSaleReceipt: boolean = false;
  submitButton: boolean = false;
  backButton1: boolean = false;
  backButton2: boolean = false;
  dealerCardheader: boolean = true;
  sell: any = {};
  demonstrationId: any;
  DemonstrationId: any;
  permitdetails: any;
  farmerId: any;
  FarmerId: any;
  prefixOfFarmerID: any;
  techDetails: any;
  permit: any = {};
  FinYears: any;
  Season: any;
  FinYear:any
  PermitTable: boolean = false



  constructor(
    private layoutService: LayoutserviceService,
    private dealerService: DealerService,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Permit verification';
    this.pageDesc = 'Permit verification of Farmers';
    this.breadcrumbList = ['Permit verification of Farmers'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    this.getDemonstrationId();
    this.getPSDDistrictName();
    this.getFinYear();
  }

  getFinYear = async() => {
    try {
      const result = await this.layoutService.getFinYear().toPromise()
      this.FinYears = result.Years;
      this.Season = result.Season;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getBlocks = async () => {
    try {
      this.blocks = await this.dealerService.getBlocks().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationId = async () => {
    try {
      this.DemonstrationId = await this.dealerService.getDemonstrationId().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getPSDDistrictName = async()=>{
    try {
      const result = await this.dealerService.getDistrictPrefix().toPromise()
      this.prefixOfFarmerID = result.Dist_Prefix;     
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  getPermitList = async () => {
    try {
      this.PermitTable = true
      if (this.farmerId != '') {
        const FarmerId = this.prefixOfFarmerID + '/' + this.farmerId;
        this.permitList = await this.dealerService.getPermitList(FarmerId,this.FinYear).toPromise()
        if (this.permitList.length == 0) this.toastr.warning(`The Farmer ID  '${FarmerId}'  is not registered to get the benefits.`)               
      }else {
        this.toastr.warning(`Please enter the valid Farmer ID.`)
      }

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

 
  goToDealerSellPage = (y: any) => {
    try {
      this.sell = y;
      this.dealerPage = false;
      this.PermitTable = false;
      this.dealerSell = true;
      this.submitButton = true;
      this.backButton1 = true;
      this.dealerCardheader = false

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  gobacktodealerPage = () => {
    this.dealerSell = false;
    this.dealerPage = true;
    this.PermitTable = true;
    this.backButton1 = false;
    this.dealerCardheader = true;
    this.submitButton = false;
  }

  goToSaleReceiptPage = () => {
    this.dealerPage = false;
    this.PermitTable = false;
    this.dealerSell = false;
    this.dealerSaleReceipt = true
    this.backButton1 = false;
    this.backButton2 = true;
    this.submitButton = false;
  }
  gobacktodealerSalePage = () => {
    this.dealerSaleReceipt = false;
    this.dealerSell = true;
    this.submitButton = true;
    this.dealerPage = false;
    this.PermitTable = false;
    this.backButton1 = true;
    this.backButton2 = false;

  }

}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { VawService } from 'src/app/services/vaw/vaw.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>; 
  DemonstrationIdCount = { 
    totaldemonstrationid: 0,
    totalfarmer:0,
    GenFarmer:0,
    SCFarmer:0,
    STFarmer:0
   };
   InputCost: any;
   IncentiveCost: any;
   subsidyReleasedNFSM: any;
   subsidyReleasedNFSMOS: any;
   subsidyReleasedStatePlan: any;
   IncentivePaymentNFSM: any;
   IncentivePaymentNFSMOS: any;
   IncentivePaymentStatePlan: any;
   totalSubsidyReleasedNFSM: any;
   totalSubsidyReleasedNFSMOS: any;
   totalSubsidyReleasedStatePlan: any;
  constructor(
    private layoutService: LayoutserviceService,
    private vawService: VawService,
    private toastr: ToastrService,
  ) { 
    this.pageTitle = 'Dashboard';
    this.pageDesc = 'Dashboard';
    this.breadcrumbList = ['Dashboard'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getDemonstrationIdCount()
      this.getDemonstrationIdCount();
      this.getCalculatedInputCost();
  }

  getDemonstrationIdCount = async () => {
    try {
      const result = await this.vawService.getDemonstrationIdCount().toPromise()
      this.DemonstrationIdCount = result[0];
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getCalculatedInputCost = async () => {
    try {
      this.InputCost = await this.vawService.getCalculatedInputCost().toPromise()
      this.InputCost.forEach((e:any) => {
        const schemeId = e.schemeId
        switch (schemeId) {
          case 'scheme_1':{
            this.subsidyReleasedNFSM = +e.subsidyReleased;            
          }
          break;
          case 'scheme_2':{
            this.subsidyReleasedNFSMOS = +e.subsidyReleased;
          }
          break;
          case 'scheme_3':{
            this.subsidyReleasedStatePlan = +e.subsidyReleased;
          }
          break;
        }
        
      });
      this.getCalculatedIncentiveCost();     
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  
  getCalculatedIncentiveCost = async () => {
    try {
      this.IncentiveCost = await this.vawService.getCalculatedIncentiveCost().toPromise()
      this.IncentiveCost.forEach((e:any) => {
        const schemeId = e.schemeId
        switch (schemeId) {
          case 'scheme_1':{
            this.IncentivePaymentNFSM = +e.subsidyReleased;
            this.totalSubsidyReleasedNFSM = +this.subsidyReleasedNFSM + +this.IncentivePaymentNFSM
          }
          break;
          case 'scheme_2':{
            this.IncentivePaymentNFSMOS = +e.subsidyReleased;
            this.totalSubsidyReleasedNFSMOS = +this.subsidyReleasedNFSMOS + +this.IncentivePaymentNFSMOS
            
          }
          break;
          case 'scheme_3':{
            this.IncentivePaymentStatePlan = +e.subsidyReleased;
            this.totalSubsidyReleasedStatePlan = +this.subsidyReleasedStatePlan + +this.IncentivePaymentStatePlan            
            
          }
          break;
        }
        
      });
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
}

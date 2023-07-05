import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip
} from 'ng2-charts';

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
  totalInputCostReleased: any;
  totalSubsidyReleasedNFSM: any;
  totalSubsidyReleasedNFSMOS: any;
  totalSubsidyReleasedStatePlan: any;

  public chart: any;  // events


  piechartData: any = [];
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [
    ['NFSM'],
    ['NFSM OS'],
    'STATEPLAN'
  ];
  public pieChartData: SingleDataSet = this.piechartData;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  public pieChartColors: Array < any > = [{
    backgroundColor: ['pink', 'bisque', 'aqua'],
    borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
 }];

  constructor(
    private cdaoService: CdaoService,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) { 
    this.pageTitle = 'Dashboard';
    this.pageDesc = 'Dashboard';
    this.breadcrumbList = ['Dashboard'];
  }

  ngOnInit(): void {
    this.getDemonstrationIdCount()
    this.getCalculatedInputCost();
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
  }

  getDemonstrationIdCount = async () => {
    try {
      const result = await this.cdaoService.getDemonstrationIdCount().toPromise()
      this.DemonstrationIdCount = result[0];
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getCalculatedInputCost = async () => {
    try {
      this.InputCost = await this.cdaoService.getCalculatedInputCost().toPromise()
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
      this.IncentiveCost = await this.cdaoService.getCalculatedIncentiveCost().toPromise()
      this.IncentiveCost.forEach((e:any) => {
        const schemeId = e.schemeId
        switch (schemeId) {
          case 'scheme_1':{
            this.IncentivePaymentNFSM = +e.subsidyReleased;
            this.totalSubsidyReleasedNFSM = (+this.subsidyReleasedNFSM + +this.IncentivePaymentNFSM).toFixed(2)        
            
          }
          break;
          case 'scheme_2':{
            this.IncentivePaymentNFSMOS = +e.subsidyReleased;
            this.totalSubsidyReleasedNFSMOS = (+this.subsidyReleasedNFSMOS + +this.IncentivePaymentNFSMOS).toFixed(2)
            
          }
          break;
          case 'scheme_3':{
            this.IncentivePaymentStatePlan = +e.subsidyReleased;
            this.totalSubsidyReleasedStatePlan = (+this.subsidyReleasedStatePlan + +this.IncentivePaymentStatePlan).toFixed(2)          
            
          }
          break;
        }
        this.totalInputCostReleased = (+this.totalSubsidyReleasedNFSM + +this.totalSubsidyReleasedNFSMOS + +this.totalSubsidyReleasedStatePlan).toFixed(2)
        
      });
      this.piechartData[0] = this.totalSubsidyReleasedNFSM;
      this.piechartData[1] =  this.totalSubsidyReleasedNFSMOS
      this.piechartData[2] = this.totalSubsidyReleasedStatePlan
      console.log(this.piechartData);
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

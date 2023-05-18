import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-manage-demonstration',
  templateUrl: './manage-demonstration.component.html',
  styleUrls: ['./manage-demonstration.component.css']
})
export class ManageDemonstrationComponent implements OnInit {
  pageTitle: string; 
  pageDesc: string;
  breadcrumbList: Array<string>;
  status : any;
  demonstrationData: any;
  demonstrationId: any;
  farmerListTable: boolean = false;
  farmer_list: any;
  message: boolean = false;
  confirmButton: boolean = false;
  allFarmerData: Array<any> = [];

  constructor(
    private layoutService: LayoutserviceService,
    private baoService:BaoServiceService,
    private toastr: ToastrService,
  ) {
    this.pageTitle = 'Verify Demonstration Patch ';
    this.pageDesc = 'Verify and confirm Demonstration Patch';
    this.breadcrumbList = ['Verify Demonstration Patch'];
   }

  ngOnInit(): void {
    this.getDemonstrationData();
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
  }

  getDemonstrationData = async() => {
    try {
      this.demonstrationData = await this.baoService.getDemonstrationData().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationStatus = async() => {
    try {
          if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == null){
              this.status = this.demonstrationId.SeedDistributionStatus;
              await this.getAllFarmerList(this.demonstrationId.DemostrationId)
              //TODO console.log("Check me");
              this.confirmButton = true
          }else if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == 1){
              this.status = this.demonstrationId.SeedDistributionStatus;
              this.farmerListTable = true;
              await this.getAllFarmerList(this.demonstrationId.DemostrationId)
              //TODO console.log("Check me");              
              this.toastr.warning('This Demonstration Patch is already Confirmed.');
              this.confirmButton = false;

          } else {
              this.status = this.demonstrationId.SeedDistributionStatus;
              this.farmerListTable = true;
              await this.getAllFarmerList(this.demonstrationId.DemostrationId)
              //TODO console.log("Check me");
              this.confirmButton = false;
              this.toastr.warning('This Demonstration Patch is not confirmed by VAW yet.');
          }
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllFarmerList = async(DemostrationId: string) => {
    try {
      this.farmerListTable = true;
      this.farmer_list = await this.baoService.getAllFarmerList(DemostrationId).toPromise()
      this.message = this.farmer_list == 0 ? true : false
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  confirmDemonstrationPatch = async() => {
    try {
        if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == null) {
           const result = await this.baoService.confirmDemonstrationPatch(this.demonstrationId.DemostrationId).toPromise()
           this.toastr.success(result.message);
           this.farmer_list = [];
           this.demonstrationId = ''
           this.status = ''
           this.farmerListTable = false;
           this.confirmButton = false
           this.getDemonstrationData();
          }   
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e)
    }
  }

  returnBackToVAW = async ()  => {
    try {
        this.allFarmerData.push(this.farmer_list)
        const response = await this.baoService.returnBackToVAW(this.allFarmerData).toPromise()
        this.toastr.success(response.message);
        this.farmer_list = [];
        this.getDemonstrationData();
        this.demonstrationId = '' ; this.farmerListTable = false; this.confirmButton = false;
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e)
    }
  }

}

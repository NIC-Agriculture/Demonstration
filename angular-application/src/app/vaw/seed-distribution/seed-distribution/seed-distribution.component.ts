import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { VawService } from 'src/app/services/vaw/vaw.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-seed-distribution',
  templateUrl: './seed-distribution.component.html',
  styleUrls: ['./seed-distribution.component.css']
})
export class SeedDistributionComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  demonstrationData: any;
  confirmed: boolean = false;
  farmerListTable: boolean = false;
  farmer_list: any;
  demonstrationId:any;
  message: boolean = false;
  ConfirmOption: any;
  options: string[] = ['Yes', 'No'];
  confirmStatus: any;
  totalLandCount: any;
  totalLand: any;
  totalSeedCount: any;
  totalSeed: any;
  totalSeedInQuintal: any;
  SeedDistributionStatus: any;
  FinYears: any;
  Season: any;
  Finyear: any;
  message1: boolean = false;
  fileName= 'SeedDistributionDetails.xlsx';

  constructor(
    private layoutService: LayoutserviceService,
    private vawService: VawService,
    private toastr: ToastrService,
  ) {
    this.pageTitle = 'Seed Distribution Status';
    this.pageDesc = 'Seed Distribution Status Verification';
    this.breadcrumbList = ['Seed Distribution'];
   }

  ngOnInit(): void {
    this.getDemonstrationData();
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getFinYear()
  }

  getFinYear = async() => {
    try{
      const result = await this.layoutService.getFinYear().toPromise()
      this.FinYears = result.Years;
      this.Season = result.Season;
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  getDemonstrationData = async() => {
    try {
      this.demonstrationId = '';
      this.farmerListTable = false;
      this.demonstrationData = await this.vawService.getDemonstrationData(this.Finyear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }


  getDemonstrationStatus = () => {
    try {
                
          if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == 1){
              this.confirmed = true
              this.getAllApprovedFarmerList(this.demonstrationId.DemostrationId)
          }else if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == null){
              this.confirmed = false
              this.toastr.warning('This Demonstration Patch is not confirmed By BAO.');
              this.farmerListTable = false;

          } else {
              this.confirmed = false
              this.farmerListTable = false;
              this.toastr.warning('Please final submit the registered farmers against this Demonstration Id.');
          }
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllApprovedFarmerList = async(DemostrationId: string) => {
    try {
      this.farmerListTable = true;
      this.farmer_list = await this.vawService.getAllApprovedFarmerList(DemostrationId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  getTotalLandCount = async() => {
      this.totalLandCount = await this.vawService.getTotalLandCount(this.demonstrationId.DemostrationId).toPromise();
      this.totalLand = this.totalLandCount[0].totalland
      this.getTotalSeedCount();
  }

  getTotalSeedCount = async () => {
      this.totalSeedCount = await this.vawService.getTotalSeedCount(this.demonstrationId.CompId).toPromise()
      this.totalSeed = +this.totalLand *  +this.totalSeedCount[0].Seed_Per_ha;
      this.totalSeedInQuintal = +this.totalSeed * 0.01
  }

  ConfirmSeedDistributionStatus = async () => {
    try {
      if(this.ConfirmOption == 'Yes'){
        const DemonstrationId = this.demonstrationId.DemostrationId
        const result = await this.vawService.ConfirmSeedDistributionStatus(DemonstrationId).toPromise()
        this.confirmStatus = result;
        this.toastr.success(result.message)
        this.farmer_list = []
        this.demonstrationId = '';
        this.ConfirmOption = ''
        this.getDemonstrationData();
        this.farmerListTable = false;
      }
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
}
 

}

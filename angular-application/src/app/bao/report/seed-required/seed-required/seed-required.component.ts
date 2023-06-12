import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-seed-required',
  templateUrl: './seed-required.component.html',
  styleUrls: ['./seed-required.component.css']
})
export class SeedRequiredComponent implements OnInit {
  demonstrationData: any;
  demonstrationId: any;
  farmerListTable: boolean = false;
  farmer_list: any;
  message: boolean = false;
  totalLandCount: any;
  totalLand: any;
  totalSeedCount: any;
  totalSeed: any;
  totalSeedInQuintal: any;
  BptotalSeed: any;
  compName: any;
  crop: any;
  cropVariety: any;
  bpCrop: any;
  bpCropVariety: any;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  bpItemDetails: any;
  totalBPSeedInQuintal: any;
  scheme: any;
  subscheme: any;
  FinYears: any;
  Season: any;
  FinYear: any;
  fileName= 'DemonstrationWiseSeedRequired.xlsx';
  constructor(
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
  ) {
    this.pageTitle = 'Seed Required';
    this.pageDesc = 'Report/Seed Required';
    this.breadcrumbList = ['Report/Seed Required'];
   }

  ngOnInit(): void {
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

  getAllDemonstrationData = async() => {
    try {
      this.demonstrationId = []
      this.scheme = '';
      this.subscheme = '';
      this.compName = '';
      this.crop = '';
      this.cropVariety = '';
      this.bpCrop = '';
      this.bpCropVariety = '';
      this.totalLand = '';
      this.totalSeedInQuintal = '';
      this.totalBPSeedInQuintal = '';
      this.farmerListTable = false
      this.demonstrationData = await this.baoService.getAllDemonstrationData(this.FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationStatus = async() => {
    try {
          if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == 1){
            //  TODO check async await and promise resolve
            this.getAllApprovedFarmerList(this.demonstrationId.DemostrationId);
            this.scheme = this.demonstrationId.schemeName
            this.subscheme = this.demonstrationId.SubschemeName
            this.compName = this.demonstrationId.CompName
            this.crop = this.demonstrationId.SubCropName
            this.cropVariety = this.demonstrationId.Variety_Name
            this.bpCrop = this.demonstrationId.bpsubcropname
            this.bpCropVariety = this.demonstrationId.bpcropvariety
            this.getItemDetails(this.demonstrationId.bp_ItemId)

          }else if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == null){
              this.toastr.warning(`This Demonstration Patch is not verified.Please Verify and Confirm the Demonstration Id ${this.demonstrationId.DemostrationId}`);
              this.farmerListTable = false;

          } else {
              this.farmerListTable = false;
              this.toastr.warning('Please final submit the registered farmers against this Demonstration Id.');
          }
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getItemDetails = async(bp_ItemId : any) => {
    try {
      if(bp_ItemId){
        this.bpItemDetails = await this.baoService.getItemDetails(bp_ItemId).toPromise()
        this.BptotalSeed = +this.totalLand *  +this.bpItemDetails.itemPackageSize;
        this.totalBPSeedInQuintal = +this.BptotalSeed * 0.01
       }
       
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e)
    }
  }    

  getAllApprovedFarmerList = async(DemostrationId: string) => {
    try {
      this.farmerListTable = true;
      this.getTotalLandCount();
      this.farmer_list = await this.baoService.getAllApprovedFarmerList(DemostrationId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  getTotalLandCount = async() => {
      this.totalLandCount = await this.baoService.getTotalLandCount(this.demonstrationId.DemostrationId).toPromise()
      this.totalLand = this.totalLandCount[0].totalland
      this.getTotalSeedCount();
  }

  getTotalSeedCount = async() => {
      this.totalSeedCount = await this.baoService.getTotalSeedCount(this.demonstrationId.CompId).toPromise()
      this.totalSeed = +this.totalLand *  +this.totalSeedCount[0].Seed_Per_ha;
      this.totalSeedInQuintal = +this.totalSeed * 0.01
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

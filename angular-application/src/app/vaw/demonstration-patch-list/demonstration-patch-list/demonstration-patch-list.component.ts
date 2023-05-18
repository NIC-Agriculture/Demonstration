import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { VawService } from 'src/app/services/vaw/vaw.service';

@Component({
  selector: 'app-demonstration-patch-list',
  templateUrl: './demonstration-patch-list.component.html',
  styleUrls: ['./demonstration-patch-list.component.css']
})
export class DemonstrationPatchListComponent implements OnInit {
  demonstrationData: any;
  demonstrationId: any;
  farmerListTable: boolean = false;
  farmer_list: any;
  message: boolean = false;
  DemonstrationId: any;
  cropCatagory: any;
  totalLand: any;
  scheme: any;
  subscheme: any;
  compName: any;
  cropVariety: any;
  totalSeed: any;
  totalSeedCount: any;
  totalLandCount: any;
  totalSeedInQuintal: any;
  bpCrop: any;
  totalBPSeed: number = 0;
  bpCropVariety: any;

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  totalBpSeedInQuintal: number= 0;


  constructor(
    private vawService: VawService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
  ) { 
    this.pageTitle = 'Report/Seed Details';
    this.pageDesc = 'Seed Details';
    this.breadcrumbList = ['Report/Seed Details'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });

    this.getDemonstrationData();
  }

  getDemonstrationData = () => {
    try {
      this.demonstrationData = this.vawService.getDemonstrationData().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationStatus = () => {
    try {
      
          if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == 1){
              this.getAllApprovedFarmerList(this.demonstrationId.DemostrationId);

              this.scheme = this.demonstrationId.schemeName
              this.subscheme = this.demonstrationId.SubschemeName
              this.DemonstrationId = this.demonstrationId.DemostrationId
              this.cropCatagory = this.demonstrationId.CropName
              this.cropVariety = this.demonstrationId.Variety_Name
              this.bpCrop = this.demonstrationId.bpsubcropname
              this.compName = this.demonstrationId.CompName
              this.bpCropVariety = this.demonstrationId.bpcropvarietyname

          }else if (this.demonstrationId.ConfirmBy_vaw == 1 && this.demonstrationId.ConfirmBy_BAO == null){
              this.toastr.warning('This Demonstration Patch is not confirmed By BAO.');
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

  getAllApprovedFarmerList = async(DemostrationId: string) => {
    try {
      this.farmerListTable = true;
      this.getTotalLandCount();
      this.farmer_list = await this.vawService.getAllApprovedFarmerList(DemostrationId).toPromise()
      this.farmer_list.forEach((e: any) => {
          this.totalBPSeed += +e.bpseedrequired
      });
      this.totalBpSeedInQuintal = this.totalBPSeed * 0.01;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  getTotalLandCount = async() => {
    this.totalLandCount = await this.vawService.getTotalLandCount(this.demonstrationId.DemostrationId).toPromise()
    this.totalLand = this.totalLandCount[0].totalland
    this.getTotalSeedCount();
  }

  getTotalSeedCount = async() => {
    this.totalSeedCount = await this.vawService.getTotalSeedCount(this.demonstrationId.CompId).toPromise()
    this.totalSeed = +this.totalLand *  +this.totalSeedCount[0].Seed_Per_ha;
    this.totalSeedInQuintal = +this.totalSeed * 0.01
  }  

}

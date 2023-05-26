import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-demonstration-wise-details',
  templateUrl: './demonstration-wise-details.component.html',
  styleUrls: ['./demonstration-wise-details.component.css']
})
export class DemonstrationWiseDetailsComponent implements OnInit {
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
  FirstGp: any;
  SecondGp: any;
  ThirdGp: any;
  AssignedVaw: any;
  TotalPhyGen: any;
  TotalPhySCP: any;
  TotalPhyTASP: any;
  DistributedPhyGen: any;
  DistributedPhySCP: any;
  DistributedPhyTASP: any;
  AvlPhyGen: any;
  AvlPhySCP: any;
  AvlPhyTASP: any;
  FinYears: any;
  FinYear:any;
  Season: any;


  constructor(
    private baoService:BaoServiceService,
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
    this.getFinYear();
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
    // try {
    //   this.demonstrationData = await this.baoService.getDemonstrationData(this.FinYear).toPromise()
    // } catch (e) {
    //   this.toastr.error('Sorry. Server problem. Please try again.');
    //   console.error(e);
    // }
  }

  getDemonstrationStatus = async() => {
    try {
            this.getAllApprovedFarmerList(this.demonstrationId.DemostrationId);
            this.scheme = this.demonstrationId.schemeName
            this.subscheme = this.demonstrationId.SubschemeName
            this.compName = this.demonstrationId.CompName
            this.crop = this.demonstrationId.SubCropName
            this.cropVariety = this.demonstrationId.Variety_Name
            this.bpCrop = this.demonstrationId.bpsubcropname
            this.bpCropVariety = this.demonstrationId.bpcropvariety
            this.FirstGp = this.demonstrationId.FirstGP
            this.SecondGp = this.demonstrationId.SecondGP
            this.ThirdGp = this.demonstrationId.ThirdGP
            this.AssignedVaw = this.demonstrationId.vaw_userId
            this.TotalPhyGen = this.demonstrationId.TotalPhyGen
            this.TotalPhySCP = this.demonstrationId.TotalPhySCP
            this.TotalPhyTASP = this.demonstrationId.TotalPhyTASP
            this.DistributedPhyGen = this.demonstrationId.DistributedPhyGen
            this.DistributedPhySCP = this.demonstrationId.DistributedPhySCP
            this.DistributedPhyTASP = this.demonstrationId.DistributedPhyTASP
            this.AvlPhyGen = this.demonstrationId.AvlPhyGen
            this.AvlPhySCP = this.demonstrationId.AvlPhySCP
            this.AvlPhyTASP = this.demonstrationId.AvlPhyTASP
            this.getItemDetails(this.demonstrationId.bp_ItemId)

         
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
  
  getAllFarmerList = async() => {
    try {
      this.farmerListTable = true;
      this.farmer_list = await this.baoService.getAllFarmerList(this.demonstrationId.DemostrationId).toPromise()
      this.message = this.farmer_list > 0 ? false : true
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

}

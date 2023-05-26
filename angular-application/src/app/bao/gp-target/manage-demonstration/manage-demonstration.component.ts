import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  farmerListTable: boolean = false;
  farmer_list: any;
  message: boolean = false;
  confirmButton: boolean = false;
  allFarmerData: Array<any> = [];

  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  verifyDemonstrationForm: any;
  FinYears: any;
  Season: any;

  constructor(
    private layoutService: LayoutserviceService,
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.pageTitle = 'Verify Demonstration Patch ';
    this.pageDesc = 'Verify and confirm Demonstration Patch';
    this.breadcrumbList = ['Verify Demonstration Patch'];
    this.verifyDemonstrationForm = this.fb.group({
      scheme: ["", [Validators.required]],
      subscheme: ["", [Validators.required]],
      component: ["", [Validators.required]],
      FinYear: ["", [Validators.required]],
      demonstrationId:  ["", [Validators.required]]
     });
   }

  ngOnInit(): void {
    this.getFinYear()
    // this.getDemonstrationData();
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
  }

  get verifyDemonstrationFormValid() {
    return this.verifyDemonstrationForm.controls;
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

  getAllScheme = async() => {
    try {
      this.farmerListTable = false
      this.verifyDemonstrationForm.patchValue({scheme:'',subscheme: '',component: '',demonstrationId : ''})
      this.AllSchemeData = await this.baoService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      this.farmerListTable = false
      this.verifyDemonstrationForm.patchValue({subscheme: '',component: '',demonstrationId : ''})
      const schemeId = this.verifyDemonstrationForm.value.scheme.schemeId
      this.SubschemeData = await this.baoService.getSubscheme(schemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.farmerListTable = false
      this.verifyDemonstrationForm.patchValue({component: '',demonstrationId : ''})
      const SubschemeId = this.verifyDemonstrationForm.value.subscheme.SubschemeId
      const FinYear = this.verifyDemonstrationForm.value.FinYear
      this.ComponentData = await this.baoService.getComponent(SubschemeId,FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationData = async() => {
    try {
      const CompId = this.verifyDemonstrationForm.value.component.CompId
      const FinYear = this.verifyDemonstrationForm.value.FinYear      
      this.demonstrationData = await this.baoService.getDemonstrationData(CompId,FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationStatus = async() => {
    try {
          if (this.verifyDemonstrationForm.value.demonstrationId.ConfirmBy_vaw == 1 && this.verifyDemonstrationForm.value.demonstrationId.ConfirmBy_BAO == null){
              this.status = this.verifyDemonstrationForm.value.demonstrationId.SeedDistributionStatus;
              await this.getAllFarmerList(this.verifyDemonstrationForm.value.demonstrationId.DemostrationId)
              //TODO console.log("Check me");
              this.confirmButton = true
          }else if (this.verifyDemonstrationForm.value.demonstrationId.ConfirmBy_vaw == 1 && this.verifyDemonstrationForm.value.demonstrationId.ConfirmBy_BAO == 1){
              this.status = this.verifyDemonstrationForm.value.demonstrationId.SeedDistributionStatus;
              this.farmerListTable = true;
              await this.getAllFarmerList(this.verifyDemonstrationForm.value.demonstrationId.DemostrationId)
              //TODO console.log("Check me");              
              this.toastr.warning('This Demonstration Patch is already Confirmed.');
              this.confirmButton = false;

          } else {
              this.status = this.verifyDemonstrationForm.value.demonstrationId.SeedDistributionStatus;
              this.farmerListTable = true;
              await this.getAllFarmerList(this.verifyDemonstrationForm.value.demonstrationId.DemostrationId)
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
        if (this.verifyDemonstrationForm.value.demonstrationId.ConfirmBy_vaw == 1 && this.verifyDemonstrationForm.value.demonstrationId.ConfirmBy_BAO == null) {
           const result = await this.baoService.confirmDemonstrationPatch(this.verifyDemonstrationForm.value.demonstrationId.DemostrationId).toPromise()
           this.toastr.success(result.message);
           this.farmer_list = [];
           this.verifyDemonstrationForm.patchValue({demonstrationId : ''})
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
        // this.demonstrationId = '' ; this.farmerListTable = false; this.confirmButton = false;
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e)
    }
  }

}

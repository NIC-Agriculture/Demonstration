import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';



@Component({
  selector: 'app-district-target',
  templateUrl: './district-target.component.html',
  styleUrls: ['./district-target.component.css']
})
export class DistrictTargetComponent implements OnInit {
  DistrictTargetForm: FormGroup;
  scheme: any;
  subscheme: any;
  component: any;
  subComponent: any;
  item: any;
  crop: any;
  season: any;
  subsidy: any = 0;
  FinYears: any;
  totalPhy: number = 0;
  totalFin: number = 0;
  totalPhyByDistrict: number = 0;
  totalFinByDistrict: number = 0;
  totalPhyGen: number = 0;
  totalFinGen: number = 0;
  totalPhySCP: number = 0;
  totalFinSCP: number = 0;
  totalPhyTASP: number = 0;
  totalFinTASP: number = 0;
  AllDistrictData: any = [];
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  AllDistrictTargetData: any;
  districtTargetResult: any;
  ComponentCostData: any;
  showUpdate: boolean = false;
  showSubmit: boolean = false;
  AllDistrictTargetDetails: any = {}

  targetClose: boolean = false;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  dataSource: Array<any> = [];
  totalTarget: number = 0;
  click: boolean = false;
  Season: any;
  clicked: boolean = false;
  constructor(
    private schemeService: SchemeserviceService,
    private fb: FormBuilder,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Target';
    this.pageDesc = 'Set Target for 30 Districts of Odisha';
    this.breadcrumbList = ['Set Target to Districts'];
    this.DistrictTargetForm = this.fb.group({
      scheme: ['', [Validators.required,]],
      subscheme: ['', [Validators.required]],
      component: ['', [Validators.required]],
      subsidy: ['', [Validators.required]],
      FinYear: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    this.getFinYear();
    this.loadAllDistrict();
    this.getAllScheme();
  }
  get DistFormValid() {
    return this.DistrictTargetForm.controls;
  }

  loadAllDistrict = async() => {
    try {
      this.AllDistrictData = await this.schemeService.getAllDistrict().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getFinYear = async() => {
    try {
        this.DistrictTargetForm.patchValue({scheme: '', subscheme: '',component:'',subsidy:''})
        const result = await this.layoutService.getFinYear().toPromise()
        this.FinYears = result.Years;
        this.Season = result.Season;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllScheme = async() => {
    try {      
      this.DistrictTargetForm.patchValue({ subscheme: '',component:'',subsidy:''})
      this.AllSchemeData = await this.schemeService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      this.DistrictTargetForm.patchValue({component:'',subsidy:''})
      const schemeId = this.DistrictTargetForm.value.scheme.schemeId
      this.SubschemeData = await this.schemeService.getSubscheme(schemeId).toPromise()
      this.DistrictTargetForm.value.component = '';
      this.resetDistrictDataArray();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      const FinYear = this.DistrictTargetForm.value.FinYear
      const SubschemeId = this.DistrictTargetForm.value.subscheme.SubschemeId
      this.ComponentData = await this.schemeService.getComponent(FinYear,SubschemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponentCost = async() => {
    try {
      const FinYear = this.DistrictTargetForm.value.FinYear
      const CompId = this.DistrictTargetForm.value.component.CompId;
      this.ComponentCostData = await this.schemeService.getComponentCost(CompId,FinYear).toPromise()
      this.DistrictTargetForm.patchValue({subsidy: this.ComponentCostData.Total_Cost})
      this.DistrictTargetForm.controls['subsidy'].disable();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  multiFinGen = (i: any) => {
    this.DistrictTargetForm.controls['subsidy'].enable();
    this.subsidy = this.DistrictTargetForm.value.subsidy;
    if (this.subsidy) {
      if(+this.AllDistrictData[i].PhyGen >= 0 ){
          this.AllDistrictData[i].FinGen = +this.AllDistrictData[i].PhyGen * +this.subsidy;
          if (isNaN(+this.AllDistrictData[i].FinSCP) == true) {
            this.AllDistrictData[i].PhySCP = 0;
            this.AllDistrictData[i].FinSCP = 0;
          }

          if (isNaN(+this.AllDistrictData[i].FinTASP) == true) {
            this.AllDistrictData[i].PhyTASP = 0;
            this.AllDistrictData[i].FinTASP = 0;
          }
          this.totalPhysicalByDistrict(i);
          this.totalFinancialByDistrict(i);
          this.calculateTotalByDistrict();
          // this.TotalPhysical();
      }else{
        this.toastr.warning(`Target Should be Greater than 0 and Mulitple of 100.`)
        this.AllDistrictData[i].PhyGen = ''
      }
      // console.log(this.AllDistrictData[i].PhyGen);
    } else {
      this.toastr.warning('There is no Subsidy Value for this Component', 'Select component first')
      this.AllDistrictData[i].PhyGen = 0;
    }

  }

  multiFinSCP = (i: any) => {
    this.DistrictTargetForm.controls['subsidy'].enable();
    this.subsidy = this.DistrictTargetForm.value.subsidy;
    if (this.subsidy) {
      if(+this.AllDistrictData[i].PhySCP >= 0){
        this.AllDistrictData[i].FinSCP = +this.AllDistrictData[i].PhySCP * +this.subsidy;
        this.totalPhysicalByDistrict(i);
        this.totalFinancialByDistrict(i);
        this.calculateTotalByDistrict();
      }else{
        this.toastr.warning(`Target Should be Greater than 0.`)
        this.AllDistrictData[i].PhySCP = ''
      }
    } else {
      alert('There is no Subsidy Value for this Component. Select component first.')
      this.AllDistrictData[i].PhySCP = 0;
    }

  }

  multiFinTASP = (i: any) => {
    this.DistrictTargetForm.controls['subsidy'].enable();
    this.subsidy = this.DistrictTargetForm.value.subsidy;
    if (this.subsidy) {
      if(+this.AllDistrictData[i].PhyTASP >= 0){
        this.AllDistrictData[i].FinTASP = +this.AllDistrictData[i].PhyTASP * +this.subsidy;
        this.totalPhysicalByDistrict(i);
        this.totalFinancialByDistrict(i);
        this.calculateTotalByDistrict();
      }else{
        this.toastr.warning(`Target Should be Greater than 0.`)
        this.AllDistrictData[i].PhyTASP = ''
      }
    } else {
      alert('There is no Subsidy Value for this Component')
      this.AllDistrictData[i].PhyTASP = 0;
    }
  }

  totalPhysicalByDistrict = (i: any) => {
    this.AllDistrictData[i].totalPhyByDistrict = +this.AllDistrictData[i].PhyGen + +this.AllDistrictData[i].PhySCP + +this.AllDistrictData[i].PhyTASP;
  }

  totalFinancialByDistrict(i: any) {
    this.AllDistrictData[i].totalFinByDistrict = +this.AllDistrictData[i].FinGen + +this.AllDistrictData[i].FinSCP + +this.AllDistrictData[i].FinTASP;
  }

  calculateTotalByDistrict() {
    this.totalPhyGen = 0;
    this.totalFinGen = 0;
    this.totalPhySCP = 0;
    this.totalFinSCP = 0;
    this.totalPhyTASP = 0;
    this.totalFinTASP = 0;

    this.AllDistrictData.forEach((dist: any) => {

      dist.PhyGen = dist.PhyGen || 0;
      dist.FinGen = dist.FinGen || 0;
      dist.PhySCP = dist.PhySCP || 0;
      dist.FinSCP = dist.FinSCP || 0;
      dist.PhyTASP = dist.PhyTASP || 0;
      dist.FinTASP = dist.FinTASP || 0;

      this.totalPhyGen += +dist.PhyGen
      this.totalFinGen += +dist.FinGen

      this.totalPhySCP += +dist.PhySCP
      this.totalFinSCP += +dist.FinSCP

      this.totalPhyTASP += +dist.PhyTASP
      this.totalFinTASP += +dist.FinTASP

      this.TotalPhysical();
      this.TotalFinancial();
    });
  }

  TotalPhysical = () => {
    this.totalPhy = 0;
    this.totalPhy = +this.totalPhyGen + +this.totalPhySCP + +this.totalPhyTASP
  }

  TotalFinancial = () => {
    this.totalFin = 0;
    this.totalFin = +this.totalFinGen + +this.totalFinSCP + +this.totalFinTASP
  }

  loadAllDistrictTarget = async(event: MouseEvent) => {
    try {
      (event.target as HTMLButtonElement).disabled = true;
      const CompId = this.DistrictTargetForm.value.component.CompId
      const SubschemeId = this.DistrictTargetForm.value.subscheme.SubschemeId
      const Fin_Year = this.DistrictTargetForm.value.FinYear
      this.DistrictTargetForm.controls['subsidy'].enable();

      this.AllDistrictTargetData = await this.schemeService.getAllDistrictTarget(SubschemeId, CompId , Fin_Year).toPromise()
      if (this.AllDistrictTargetData.length > 0) {
        this.AllDistrictTargetDetails = {
          "schemeId": this.DistrictTargetForm.value.scheme.schemeId,
          "SubschemeId": this.DistrictTargetForm.value.subscheme.SubschemeId,
          "CompId": this.DistrictTargetForm.value.component.CompId,
          "Total_Cost": this.DistrictTargetForm.value.subsidy,
          "Fin_Year": this.DistrictTargetForm.value.FinYear,
          "AllDistrictTargetData": this.AllDistrictTargetData
        };

        this.showUpdate = true;
        this.showSubmit = false;
      } else {
        this.resetDistrictDataArray();
        this.showUpdate = false;
        this.showSubmit = true;
      }
        
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  SubmitDistrictTarget = async() => {
    try {
      this.clicked = false
      this.DistrictTargetForm.controls['subsidy'].enable();
      const DistrictTargetDetails = {
        "schemeId": this.DistrictTargetForm.value.scheme.schemeId,
        "SubschemeId": this.DistrictTargetForm.value.subscheme.SubschemeId,
        "CompId": this.DistrictTargetForm.value.component.CompId,
        "Total_Cost": this.DistrictTargetForm.value.subsidy,
        "Fin_Year": this.DistrictTargetForm.value.FinYear,
      };
      
      const data = {
        InputCompDetails: DistrictTargetDetails,
        ditrictTarget: this.AllDistrictData
      }
      this.districtTargetResult = await this.schemeService.SubmitDistrictTarget(data).toPromise()
      this.toastr.success(this.districtTargetResult.message);
      this.DistrictTargetForm.reset();
      this.resetDistrictDataArray();
      this.getFinYear();
      this.loadAllDistrict();
      this.getAllScheme();  
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  resetDistrictDataArray = () => {
    this.AllDistrictData.forEach((e: any) => {
        e.PhyGen = 0,
        e.FinGen = 0,
        e.PhySCP = 0,
        e.FinSCP = 0,
        e.PhyTASP = 0,
        e.FinTASP = 0,
        e.totalPhyByDistrict = +e.PhyGen + +e.PhySCP + +e.PhyTASP;
        e.totalFinByDistrict = +e.FinGen + +e.FinSCP + +e.FinTASP;
        return e;
    });
    this.calculateTotalByDistrict();
    this.showSubmit = false;
  }

}

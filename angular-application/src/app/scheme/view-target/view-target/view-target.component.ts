import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-view-target',
  templateUrl: './view-target.component.html',
  styleUrls: ['./view-target.component.css']
})
export class ViewTargetComponent implements OnInit {
  
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYears: any;
  AllSchemeData: any = [];
  

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

  ViewTargetForm: FormGroup;
  SubschemeData: any ;
  
  ComponentData: any;
  ComponentCostData: any;
  AllDistrictData: any = [];
  AllDistrictTargetData: any ;
  AllDistrictTargetDetails : any = {}

  viewTargetCard: boolean = false
  totalTarget: number = 0;
  Season: any;


  constructor(
    private schemeService: SchemeserviceService,
    private fb: FormBuilder,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'View Target';
    this.pageDesc = 'View Target Of 30 Districts of Odisha';
    this.breadcrumbList = ['View Target Of Districts'];
    this.ViewTargetForm = this.fb.group({
      scheme: [''],
      subscheme: ['', [Validators.required]],
      component: ['', [Validators.required]],
      subsidy: ['', [Validators.required]],
      FinYear: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ViewTargetForm.controls['subsidy'].disable();
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    // this.loadAllDistrict()
    this.getFinYear();
    this.getAllScheme();
    
  }
  get viewFormValid() {
    return this.ViewTargetForm.controls;
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

  getAllScheme = async() => {
    try {
      this.AllSchemeData = await this.schemeService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      const schemeId = this.ViewTargetForm.value.scheme.schemeId
      this.SubschemeData = await this.schemeService.getSubscheme(schemeId).toPromise()
      this.ViewTargetForm.value.component = '';
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      const SubschemeId = this.ViewTargetForm.value.subscheme.SubschemeId
      this.ComponentData = await this.schemeService.getComponent(SubschemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponentCost = async() => {
    try {
      const CompId = this.ViewTargetForm.value.component.CompId;
      this.ComponentCostData = await this.schemeService.getComponentCost(CompId).toPromise()
      this.ViewTargetForm.patchValue({ subsidy: this.ComponentCostData.Total_Cost })
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  

  loadAllDistrictTarget = async() => {
    try {
      this.viewTargetCard = true
      const CompId = this.ViewTargetForm.value.component.CompId
      const SubschemeId = this.ViewTargetForm.value.subscheme.SubschemeId
      const Fin_Year = this.ViewTargetForm.value.FinYear

      this.AllDistrictTargetData = await this.schemeService.getAllDistrictTarget(SubschemeId, CompId , Fin_Year).toPromise()
      this.ViewTargetForm.controls['subsidy'].enable();
      if (this.AllDistrictTargetData.length > 0) {
        this.AllDistrictTargetDetails = {
          "schemeId": this.ViewTargetForm.value.scheme.schemeId,
          "SubschemeId": this.ViewTargetForm.value.subscheme.SubschemeId,
          "CompId": this.ViewTargetForm.value.component.CompId,
          "Total_Cost": this.ViewTargetForm.value.subsidy,
          "Fin_Year": this.ViewTargetForm.value.FinYear,
          "AllDistrictTargetData": this.AllDistrictTargetData
        };
        this.loadAllDistrict();
      }  
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  loadAllDistrict = async() => {
    try {
        this.AllDistrictData = await this.schemeService.getAllDistrict().toPromise()

        this.AllDistrictTargetDetails.AllDistrictTargetData.forEach((y: any) => {
          this.AllDistrictData.forEach((e: any) => {
            if (y.Dist_Code == e.Dist_Code) {
                e.PhyGen = y.avl_phygen,
                e.DistributedPhyGen = y.DistributedPhyGen,
                e.PhySCP = y.avl_physcp,
                e.DistributedPhySCP = y.DistributedPhySCP,
                e.PhyTASP = y.avl_phytasp,
                e.DistributedPhyTASP = y.DistributedPhyTASP,
                e.totalPhyByDistrict = +e.PhyGen + +e.PhySCP + +e.PhyTASP,
                e.totalFinByDistrict = +e.DistributedPhyGen + +e.DistributedPhySCP + +e.DistributedPhyTASP;
                e.totalTarget = y.totalTarget;
                e.distributedTarget = y.totalDistributedTarget
              return e;
            }
          });
        });
        this.calculateTotal();
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  }

  calculateTotal() {
    this.totalTarget = 0;
    this.totalPhyGen = 0;
    this.totalFinGen = 0;
    this.totalPhySCP = 0;
    this.totalFinSCP = 0;
    this.totalPhyTASP = 0;
    this.totalFinTASP = 0;
    this.totalPhy = 0;
    this.totalFin = 0;
    this.AllDistrictData.forEach((dist: any) => {
      this.totalPhyGen += +dist.PhyGen || 0
      this.totalFinGen += +dist.DistributedPhyGen || 0

      this.totalPhySCP += +dist.PhySCP || 0
      this.totalFinSCP += +dist.DistributedPhySCP || 0

      this.totalPhyTASP += +dist.PhyTASP || 0
      this.totalFinTASP += +dist.DistributedPhyTASP || 0

      this.totalTarget += +dist.totalTarget;

      this.totalPhy = this.totalPhyGen + this.totalPhySCP + this.totalPhyTASP
      this.totalFin = this.totalFinGen + this.totalFinSCP + this.totalFinTASP

    })
  }

}

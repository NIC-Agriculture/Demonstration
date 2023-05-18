import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-block-target-monitoring',
  templateUrl: './block-target-monitoring.component.html',
  styleUrls: ['./block-target-monitoring.component.css']
})
export class BlockTargetMonitoringComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  TargetMonitoringForm: FormGroup;
  FinYears: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  ComponentCostData: any;
  AllDistrictData: any;
  BlockTargetMonitoring: any;
  BlockTargetViewTable: boolean = false;
  Season: any;

  constructor(
    private schemeService: SchemeserviceService,
    private fb: FormBuilder,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) { 
    this.pageTitle = 'Block Target Monitoring';
    this.pageDesc = ' Target Monitoring  Of Blocks';
    this.breadcrumbList = ['Target Monitoring  Of Blocks'];
    this.TargetMonitoringForm = this.fb.group({
      scheme: [''],
      subscheme: ['', [Validators.required]],
      component: ['', [Validators.required]],
      subsidy: ['', [Validators.required]],
      FinYear: ['', [Validators.required]],
      District: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    this.getFinYear();
    this.getAllScheme();
    this.loadAllDistrict();
    this.TargetMonitoringForm.controls['subsidy'].disable();
  }

  get TargetFormValid() {
    return this.TargetMonitoringForm.controls;
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
      const schemeId = this.TargetMonitoringForm.value.scheme.schemeId
      this.SubschemeData = await this.schemeService.getSubscheme(schemeId).toPromise()
      this.TargetMonitoringForm.value.component = '';
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      const SubschemeId = this.TargetMonitoringForm.value.subscheme.SubschemeId
      this.ComponentData = await this.schemeService.getComponent(SubschemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponentCost = async() => {
    try {
      const CompId = this.TargetMonitoringForm.value.component.CompId;
      this.ComponentCostData = await this.schemeService.getComponentCost(CompId).toPromise()
      this.TargetMonitoringForm.patchValue({ subsidy: this.ComponentCostData.Total_Cost })

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  loadAllDistrict = async() => {
    try {
      this.AllDistrictData = await this.schemeService.getAllDistrict().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getBlockTarget = async ()  => {
    try {
      this.BlockTargetViewTable = true;
      const CompId = this.TargetMonitoringForm.value.component.CompId;
      const DistCode = this.TargetMonitoringForm.value.District.Dist_Code;
      const FinYear = this.TargetMonitoringForm.value.FinYear;
      const result = await  this.schemeService.getBlockTarget(DistCode,CompId,FinYear).toPromise()
      this.BlockTargetMonitoring = result;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

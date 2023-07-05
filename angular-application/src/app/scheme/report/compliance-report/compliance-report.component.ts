import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-compliance-report',
  templateUrl: './compliance-report.component.html',
  styleUrls: ['./compliance-report.component.css']
})
export class ComplianceReportComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  ComplianceReportForm: FormGroup;
  FinYears: any;
  Season: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  districtTarget: any;
  TargetTable:boolean = false
  message: boolean = false

  fileName= 'TargetComplianceReport.xlsx';
  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Report';
    this.pageDesc = 'Total Compliance Report';
    this.breadcrumbList = ['District wise Target Compliance Report'];
    this.ComplianceReportForm = this.fb.group({
      FinYear : ['' , [Validators.required]],
      scheme: ['',[Validators.required]],
      subscheme: ['',[Validators.required]],
      component: ['', [Validators.required]]
    });
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
    try{
      this.ComplianceReportForm.patchValue({scheme: '', subscheme: '', componentName: ''});
      this.AllSchemeData = []
      this.SubschemeData = []
      this.ComponentData = []
      this.AllSchemeData = await this.schemeService.getAllScheme().toPromise()
      this.TargetTable = false
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try{
      this.ComplianceReportForm.patchValue({ subscheme: '', componentName: ''});
      this.SubschemeData = []
      this.ComponentData = []
      // this.message = false
      const schemeId =  this.ComplianceReportForm.value.scheme;
      this.SubschemeData =  await this.schemeService.getSubscheme(schemeId).toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.ComplianceReportForm.patchValue({componentName: ''});
      this.ComponentData = []
      // this.viewTargetTable = false
      // this.message = false
      const FinYear = this.ComplianceReportForm.value.FinYear
      const SubschemeId = this.ComplianceReportForm.value.subscheme
      this.ComponentData = await this.schemeService.getComponent(FinYear,SubschemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  complianceReportDetails = async() => {
    try{
      const SchemeId = this.ComplianceReportForm.value.scheme;
      const SubschemeId = this.ComplianceReportForm.value.subscheme
      const CompId = this.ComplianceReportForm.value.component
      const FinYear = this.ComplianceReportForm.value.FinYear
      this.districtTarget = await this.schemeService.complianceReport(FinYear,SchemeId,SubschemeId,CompId).toPromise()
      this.TargetTable = true
      this.TargetTable = this.districtTarget.length > 0 ? true : false
      this.message = this.districtTarget.length > 0 ? false : true
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
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

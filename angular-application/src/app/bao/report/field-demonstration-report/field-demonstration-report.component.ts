import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-field-demonstration-report',
  templateUrl: './field-demonstration-report.component.html',
  styleUrls: ['./field-demonstration-report.component.css']
})
export class FieldDemonstrationReportComponent implements OnInit {

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>

  demonstrationId: any;
  fieldReport: any;
  phase1image1: any;
  phase1image2: any;
  phase1image3: any;
  phase2image1: any;
  phase2image2: any;
  phase2image3: any;
  phase3image1: any;
  phase3image2: any;
  phase3image3: any;
  Season: any;
  FinYears: any;
  FinYear:any;
  AllSchemeData: any;
  schemeName: any;
  reportTable: boolean = false
  
  
  constructor(
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
  ) { 
    this.pageTitle = 'Cluster Details (Mobile App)';
    this.pageDesc = 'Phase wise cluster details';
    this.breadcrumbList = ['Phase wise cluster details'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getFinYear();
      this.getAllScheme();
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
      this.AllSchemeData = await this.baoService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  fieldDemonstrationId = async () => {
    try {
      this.reportTable = true
      this.demonstrationId = await this.baoService.fieldDemonstrationIdPhaseDetails(this.FinYear,this.schemeName.schemeId).toPromise();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getFieldDemonstrationReport = async (x:any) => {
    try {
      this.phase1image1 = '';this.phase1image2 = ''; this.phase1image3 = ''; this.phase2image1 = ''; this.phase2image2 = '';
      this.phase2image3 = ''; this.phase3image1 = ''; this.phase3image2 = ''; this.phase3image3 = '';
      this.fieldReport = await this.baoService.getFieldDemonstrationPhotos(x.DemostrationId).toPromise();
      if (this.fieldReport.length > 0) {
        this.phase1image1=this.fieldReport[0].LandPhoto1Phase1
        this.phase1image2=this.fieldReport[0].LandPhoto2Phase1
        this.phase1image3=this.fieldReport[0].LandPhoto3Phase1
        this.phase2image1=this.fieldReport[0].LandPhoto1Phase2
        this.phase2image2=this.fieldReport[0].LandPhoto2Phase2
        this.phase2image3=this.fieldReport[0].LandPhoto3Phase2
        this.phase3image1=this.fieldReport[0].LandPhoto1Phase3
        this.phase3image2=this.fieldReport[0].LandPhoto2Phase3
        this.phase3image3=this.fieldReport[0].LandPhoto3Phase3
      }        
        
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }



}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-demonstration-report',
  templateUrl: './demonstration-report.component.html',
  styleUrls: ['./demonstration-report.component.css']
})
export class DemonstrationReportComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  bpItemDetails: any;
  FinYears: any;
  FinYear: any;
  schemeName: any;
  SeedDistributionStatus: any;
  Season: any;
  sttuasTable: boolean = false;

  demonstrationReport: any;
  message:boolean = false
  AllSchemeData: any;
  phase1image1: any;
  phase1image2: any;
  phase1image3: any;
  phase2image1: any;
  phase2image2: any;
  phase2image3: any;
  phase3image1: any;
  phase3image2: any;
  phase3image3: any;
  fieldReport: any;
  season:any

  fileName= 'FieldDemonstrationPhaseWiseReport.xlsx';

  constructor(
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
  ) { 
    this.pageTitle = 'Report';
    this.pageDesc = 'Demonstration report';
    this.breadcrumbList = ['Block report'];
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

  getSeedDistributionStatus = async () => {
    try {
      this.SeedDistributionStatus = await this.baoService.getSeedDistributionStatus().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationStatusReport = async () => {
    try {
      this.sttuasTable = true
      this.demonstrationReport = await this.baoService.getDemonstrationStatusReport(this.FinYear,this.schemeName.schemeId,this.season).toPromise();
      this.message = this.demonstrationReport.length > 0 ? false : true
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

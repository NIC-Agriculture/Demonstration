import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-demonstration-report',
  templateUrl: './demonstration-report.component.html',
  styleUrls: ['./demonstration-report.component.css']
})
export class DemonstrationReportComponent implements OnInit {
  allBlocks: any
  blockCode: any
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYear: any;
  FinYears: any;
  Season: any;

  demonstrationReport:any;
  demonstrationReportForm:any
  reportTable: boolean = false
  message: boolean = false;
  filterTerm !: string

  fileName= 'demonstrationReport.xlsx';


  constructor(
    private cdaoService : CdaoService,
    private toastr : ToastrService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
  ) {
    this.pageTitle = 'Report';
    this.pageDesc = 'Block wise report';
    this.breadcrumbList = ['Block wise report'];
    this.demonstrationReportForm = this.fb.group({
        blockCode: ["", [Validators.required]],
        FinYear: ["", [Validators.required]],
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

  printThisPage() {
    window.print();
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

  loadBlocks = async () => {
    this.demonstrationReportForm.patchValue({blockCode: ''})
    this.allBlocks = []
    this.reportTable = false;
    this.allBlocks = await this.cdaoService.getBlocks().toPromise();
  }
  getDemonstrationStatusReport = async () => {
    try {
      this.reportTable = true
      this.demonstrationReport = await this.cdaoService.getDemonstrationStatusReport(this.demonstrationReportForm.value.blockCode,this.demonstrationReportForm.value.FinYear).toPromise();
      this.message = this.demonstrationReport.length == 0 ? true : false
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

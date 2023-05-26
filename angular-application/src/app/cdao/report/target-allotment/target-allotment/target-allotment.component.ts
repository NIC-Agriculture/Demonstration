import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-target-allotment',
  templateUrl: './target-allotment.component.html',
  styleUrls: ['./target-allotment.component.css']
})
export class TargetAllotmentComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYears: any;
  FinYear: any;
  schemeId: any

  AvailableTargetTable: boolean = false;
  AvailableTarget: any;
  Season: any;
  AllSchemeData: any;
  fileName= 'TargetAllotmentInDistrict.xlsx'; 

  constructor(
    private layoutService: LayoutserviceService,
    private cdaoService : CdaoService,
    private toastr: ToastrService,
  ) { 
    this.pageTitle = 'Target Allotment';
    this.pageDesc = 'Target Allotment';
    this.breadcrumbList = ['Target Allotment in District'];
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

  getAllScheme = async () => {
    try {
      this.schemeId = ''
      this.AllSchemeData = []
      this.AvailableTargetTable = false;
      this.AllSchemeData = await this.cdaoService.getAllScheme().toPromise();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }


  getAvailableTarget = async() => {
    try {
      if(this.FinYear && this.schemeId){
        this.AvailableTargetTable = true;
        this.AvailableTarget = await this.cdaoService.getAvailableTarget(this.FinYear,this.schemeId).toPromise()
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

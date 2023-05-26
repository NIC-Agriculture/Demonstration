import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-seed-details',
  templateUrl: './seed-details.component.html',
  styleUrls: ['./seed-details.component.css']
})
export class SeedDetailsComponent implements OnInit {

  displayedColumns: string[] = ['BlockName','DemonstrationId', 'TotalArea', 'TotalBeneficiary', 'Crop','CropVariety','bpCrop','bpCropVariety','TotalSeedRequired','bpTotalSeedRequired'];
  seedResult: Array<any> = []
  allBlocks: any;
  blockCode: any;
  seedReportTable: boolean = false;

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  fileName= 'SeedDetailsReport.xlsx';

  constructor(
    private cdaoService : CdaoService,
    private toastr : ToastrService,
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
    this.loadBlocks()
  }

  loadBlocks = async () => {
    this.allBlocks = await this.cdaoService.getBlocks().toPromise();
  }

  getBlockWiseSeedReport = async() => {
    try { 
      this.seedReportTable = true;
      this.seedResult = await this.cdaoService.getBlockWiseSeedReport(this.blockCode).toPromise();
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

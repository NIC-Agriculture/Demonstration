import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdoService } from 'src/app/services/ado/ado.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-demonstration-report',
  templateUrl: './demonstration-report.component.html',
  styleUrls: ['./demonstration-report.component.css']
})
export class DemonstrationReportComponent implements OnInit {
  FinYear: any
  Block: any ;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  blocks: any;
  FinYears: any;
  Season: any;
  constructor(
    private adoService:AdoService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService
  ) { 
    this.pageTitle = 'Report';
    this.pageDesc = 'Block wise Demonstration Details';
    this.breadcrumbList = ['Report/Block wise Demonstration Details'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.getBlocks();
    this.getFinYear()
  }

  getBlocks = async() => {
    try {
        const result  = await this.adoService.getBlocks().toPromise()
        this.blocks = result;  
        // console.log(this.blocks );
                
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
}

getFinYear = () => {
  try{
    this.layoutService.getFinYear().subscribe(result => {
      this.FinYears = result.Years;
      this.Season = result.Season
    })
  } catch (e){
    this.toastr.error('Sorry. Server problem. Please try again.');
    console.error(e);
  }
}

}

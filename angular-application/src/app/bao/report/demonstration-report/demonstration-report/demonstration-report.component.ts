import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

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
  SeedDistributionStatus: any;
  Season: any;

  demonstrationReport: any;
  message:boolean = false

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
      this.demonstrationReport = await this.baoService.getDemonstrationStatusReport(this.FinYear).toPromise();
      this.message = this.demonstrationReport.length > 0 ? false : true
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
    
  }

}

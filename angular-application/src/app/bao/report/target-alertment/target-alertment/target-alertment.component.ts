import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-target-alertment',
  templateUrl: './target-alertment.component.html',
  styleUrls: ['./target-alertment.component.css']
})
export class TargetAlertmentComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYear: any;
  AvailableTarget: any;
  AvailableTargetTable: boolean = false;
  FinYears: any;
  Season: any;
  AllSchemeData: any;
  schemeId: any

  constructor(
    private baoService:BaoServiceService,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService,
  ) {
    this.pageTitle = 'Target Allotment';
    this.pageDesc = 'Target Allotment';
    this.breadcrumbList = ['Block Wise Target Allotment'];
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

  getAvailableTarget = async() => {
    try {
      this.AvailableTargetTable = true;
      this.AvailableTarget = await this.baoService.getAvailableTarget(this.FinYear,this.schemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

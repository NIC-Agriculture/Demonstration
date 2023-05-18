import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>; 
  DemonstrationIdCount = {
    totaldemonstrationid: 0,
    totalfarmer:0,
    GenFarmer:0,
    SCFarmer:0,
    STFarmer:0
  };

  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Dashboard';
    this.pageDesc = 'Dashboard';
    this.breadcrumbList = ['Dashboard'];
   }

  ngOnInit(): void {
    this.getDemonstrationIdCount()
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
  }
  getDemonstrationIdCount = async () => {
    try {
      const result = await this.schemeService.getDemonstrationIdCount().toPromise()
      this.DemonstrationIdCount = result[0];
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

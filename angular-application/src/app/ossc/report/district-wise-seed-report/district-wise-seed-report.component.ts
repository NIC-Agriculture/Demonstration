import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { OsscService } from 'src/app/services/ossc/ossc.service';

export interface PeriodicElement {
  BlockName: string;
  DemonstrationId: string;
  Crop: string;
  CropVariety: string;
  SeedRequired: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { BlockName: 'Anugul', DemonstrationId: 'FLD/demo/2021-2022', Crop: 'kjkj', CropVariety: 'H', SeedRequired: '2' },
  { BlockName: 'Anugul', DemonstrationId: 'FLD/demo/2021-2022', Crop: 'kjk', CropVariety: 'H', SeedRequired: '2' },
  { BlockName: 'Anugul', DemonstrationId: 'FLD/demo/2021-2022', Crop: 'jhjjh', CropVariety: 'H', SeedRequired: '2' },
];

@Component({
  selector: 'app-district-wise-seed-report',
  templateUrl: './district-wise-seed-report.component.html',
  styleUrls: ['./district-wise-seed-report.component.css']
})
export class DistrictWiseSeedReportComponent implements OnInit {
  distCode: any;
  displayedColumns: string[] = ['BlockName', 'DemonstrationId', 'CompId', 'FarmerInvolved', 'totalLand' , 'Crop', 'CropVariety', 'SeedRequired'];
  dataSource: Array<any> = []
  AllDistrictData: any;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  seedReport: any;
  farmerInvolve: any;
  countFarmerInvolve: any;
  SeedReportTable: boolean = false
  seedReportDetails: any;

  constructor(
    private osscService: OsscService,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Report';
    this.pageDesc = 'District Wise Seed Report';
    this.breadcrumbList = ['Seed Report'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    this.loadAllDistrict();
  }

  loadAllDistrict = async () => {
    try {
      const result = await this.osscService.getAllDistrict().toPromise()
      this.AllDistrictData = result;
      // console.log(this.AllDistrictData);
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDistrictSeedReport = async () => {
    try {
        this.SeedReportTable = true;
        const Dist_Code = this.distCode
        const result = await this.osscService.getDistrictSeedReport(Dist_Code).toPromise()
        this.seedReportDetails = result;
        // console.log(this.seedReportDetails);
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }

  }


}

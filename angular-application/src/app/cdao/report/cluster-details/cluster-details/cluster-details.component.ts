import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css']
})
export class ClusterDetailsComponent implements OnInit {
  clusterForm: any
  allBlocks: any
  blockCode: any
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYear: any;
  FinYears: any;
  Season: any;
  clusterDemonstration: any;
  clusterReport: any;
  GpData: any;
  demonstrationClusterTable:boolean = false;
  message: boolean = false
  filterTerm !: string

  fileName= 'ClusterDetailsReport.xlsx'; 

  constructor(
    private cdaoService : CdaoService,
    private toastr : ToastrService,
    private fb: FormBuilder,
    private layoutService: LayoutserviceService,
  ) { 
    this.pageTitle = 'Report';
    this.pageDesc = 'Cluster Details';
    this.breadcrumbList = ['Block wise Cluster Details'];
    this.clusterForm = this.fb.group({
      // block: [""],
      FinYear: ["", [Validators.required]],
      blockCode: ["", [Validators.required]],
     })
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

  loadBlocks = async () => {
    this.clusterForm.patchValue({blockCode: ''})
    this.allBlocks = []
    this.demonstrationClusterTable = false;
    this.allBlocks = await this.cdaoService.getBlocks().toPromise();
  }

  getclusterDemonstration = async () => {
    try {
      this.demonstrationClusterTable = true
      this.clusterDemonstration = await this.cdaoService.getclusterDemonstration(this.clusterForm.value.blockCode , this.clusterForm.value.FinYear).toPromise()
      if (this.clusterDemonstration.length == 0) {
        this.message = true
      }
      this.clusterReport = this.clusterDemonstration.result;
      this.GpData = this.clusterDemonstration.GpData
      this.clusterDemonstration.result.forEach((e: any) => {
        this.GpData.forEach((f: any) => {
            if (e.DemostrationId == f.DemostrationId) {
                e.DemostrationId = f.DemostrationId
              if (e.Gp_Name == undefined) {
                  e.Gp_Name = f.Gp_Name
              }
              else(
                e.Gp_Name = e.Gp_Name +',' + "\n" + f.Gp_Name
              )
              return e
            }
        });


      });

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

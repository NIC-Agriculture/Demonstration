import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-demonstration-cluster-implementation',
  templateUrl: './demonstration-cluster-implementation.component.html',
  styleUrls: ['./demonstration-cluster-implementation.component.css']
})
export class DemonstrationClusterImplementationComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  clusterFrom: any;
  FinYears: any;
  FinYear: any;
  clusterDemonstration: any;
  demonstrationClusterTable:boolean = false;
  Season: any;
  clusterReport: any;
  GpData: any;
  WardData: any;
  wardName: any;
  AllSchemeData: any;
  schemeId: any
  message: boolean = false

  fileName= 'ClusterDetailsReport.xlsx';
  SubschemeData: any;
  ComponentData: any;

  constructor(
    private baoService:BaoServiceService,
    private layoutService: LayoutserviceService,
    private fb : FormBuilder,
    private toastr: ToastrService,
  ) {
    this.pageTitle = 'Cluster Demonstration';
    this.pageDesc = 'Cluster Demonstration';
    this.breadcrumbList = ['Block Wise Cluster Demonstration'];
    this.clusterFrom = this.fb.group({
      FinYear: ["", [Validators.required]],
      scheme: ["", [Validators.required]],
      subScheme: ["",[Validators.required]],
      component: ["",[Validators.required]],
    })
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getFinYear();
      this.getAllScheme()
  }

  get clusterFromValid() {
    return this.clusterFrom.controls;
  }

  getFinYear = async() => {
    try{
      this.FinYear = ''
      this.FinYears = []
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

  getSubscheme = async() => {
    try {
      this.SubschemeData = []
      this.ComponentData = []
      const schemeId =  this.clusterFrom.value.scheme
      this.SubschemeData = await this.baoService.getSubscheme(schemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.ComponentData = []
      const SubschemeId = this.clusterFrom.value.subScheme
      const FinYear = this.clusterFrom.value.FinYear
      this.ComponentData = await this.baoService.getComponent(SubschemeId,FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getclusterDemonstration = async () => {
    try {
      
      const FinYear = this.clusterFrom.value.FinYear;
      const schemeId =  this.clusterFrom.value.scheme;
      const SubschemeId = this.clusterFrom.value.subScheme
      const compId = this.clusterFrom.value.component
      this.clusterDemonstration = await this.baoService.getclusterDemonstration(FinYear,schemeId,SubschemeId,compId).toPromise()
      
      this.message = this.clusterDemonstration.result.length == 0 ? true : false
      this.demonstrationClusterTable = this.clusterDemonstration.result.length != 0 ? true : false
      this.GpData = this.clusterDemonstration.GpData  
      this.clusterDemonstration.result.forEach((e: any) => {
          this.GpData.forEach((f: any) => {
              if (e.DemostrationId == f.DemostrationId) {
                  e.DemostrationId = f.DemostrationId
                
                if (e.Gp_Name == undefined) {
                    e.Gp_Name = f.Gp_Name
                }
                else(
                  e.Gp_Name = `${e.Gp_Name} ,\n ${f.Gp_Name}`
                )
                return e
              }
          });
          if (e.lgd_wardcode != '') {
            var WardCode = e.lgd_wardcode.split(',')
            WardCode.forEach((y : any) => {     
               this.getWardData(y , e.DemostrationId);

            })
          }
      });
      this.clusterReport = this.clusterDemonstration.result      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getWardData = async (wardCode : any , DemostrationId : any) => {
    try {
        this.WardData = await this.baoService.getWardData(wardCode,DemostrationId ).toPromise()
        this.clusterReport.forEach((e:any) => {
          this.WardData.forEach((y:any) => {
            if (e.DemostrationId == y.DemostrationId ) {
              if (e.WardName == undefined) {
                e.WardName = y.WardName
              } else {
                e.WardName = `${e.WardName} ,\n ${y.WardName}`
              }
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-cluster-details',
  templateUrl: './cluster-details.component.html',
  styleUrls: ['./cluster-details.component.css']
})
export class ClusterDetailsComponent implements OnInit {
  clusterForm: any
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYears: any;
  Season: any;
  AllDistrictData: any;
  allBlocks: any;

  clusterDemonstration: any;
  clusterReport: any;
  GpData: any;
  demonstrationClusterTable:boolean = false;
  allComponent: any;
  WardData: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;

  constructor(
    private schemeService: SchemeserviceService,
    private toastr : ToastrService,
    private fb: FormBuilder,
    private layoutService: LayoutserviceService,
  ) { 
    this.pageTitle = 'Report';
    this.pageDesc = 'Cluster Details';
    this.breadcrumbList = ['District And Block wise Cluster Details'];
    this.clusterForm = this.fb.group({
      scheme: ['', [Validators.required]],
      subscheme: ['', [Validators.required]],
      distCode: ['', [Validators.required]],
      blockCode: [''],
      CompId: ['', [Validators.required]],
      FinYear: ["", [Validators.required]],
     })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.loadAllDistrict();
    this.getFinYear();
  }
  
  getFinYear = async() => {
    try {
      const result = await this.layoutService.getFinYear().toPromise()
      this.FinYears = result.Years;
      this.Season = result.Season;
        
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  loadAllDistrict = async() => {
    try {
      this.AllDistrictData = await this.schemeService.getAllDistrict().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  loadBlocks = async () => {
    this.clusterForm.patchValue({ blockCode: '' })
    this.allBlocks = await this.schemeService.getBlocks(this.clusterForm.value.distCode).toPromise();   
  }

  // getAllComponent = async () => {
  //   const FinYear = this.clusterForm.value.FinYear
  //   this.allComponent = await this.schemeService.getAllComponent(FinYear).toPromise();
  // }

  getAllScheme = async() => {
    try {
      this.AllSchemeData = await this.schemeService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      const schemeId = this.clusterForm.value.scheme.schemeId
      this.SubschemeData = await this.schemeService.getSubscheme(schemeId).toPromise()
      this.clusterForm.patchValue({CompId : ''}) ;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      const FinYear = this.clusterForm.value.FinYear
      const SubschemeId = this.clusterForm.value.subscheme.SubschemeId
      this.allComponent = await this.schemeService.getComponent(FinYear,SubschemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getclusterDemonstration = async () => {
    try {
      this.clusterDemonstration=[];
      this.clusterReport=[];
      this.demonstrationClusterTable = true
      const result = await this.schemeService.getclusterDemonstration(this.clusterForm.value.distCode,this.clusterForm.value.blockCode,this.clusterForm.value.CompId,this.clusterForm.value.FinYear).toPromise()
      this.clusterDemonstration = result;
      this.GpData = this.clusterDemonstration.GpData
      this.clusterDemonstration.result.forEach((e: any) => {
        this.GpData.forEach((f: any) => {
            if (e.DemostrationId == f.DemostrationId) {
                e.DemostrationId = f.DemostrationId
              if (e.Gp_Name == undefined) {
                  e.Gp_Name = f.Gp_Name
              }
              else(
                e.Gp_Name = `${e.Gp_Name},\n ${f.Gp_Name}`
              )
              return e
            }
        });
        if (e.lgd_wardcode != null && e.lgd_wardcode != "") {
          var WardCode = e.lgd_wardcode.split(',')
          WardCode.forEach((y : any) => {     
             this.getWardData(y , e.DemostrationId);

          })
        }
      });
      this.clusterReport = this.clusterDemonstration.result;

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getWardData = async (wardCode : any , DemostrationId : any) => {
    try {
        this.WardData = await this.schemeService.getWardData(wardCode,DemostrationId ).toPromise()
        if (this.WardData.length !== 0){
            this.clusterReport.forEach((e:any) => {
              this.WardData.forEach((y:any) => {
                if (e.DemostrationId == y.DemostrationId ) {
                  if (e.WardName == undefined) {
                    e.WardName = y.WardName
                }
                else{
                  e.WardName = `${e.WardName} ,\n ${y.WardName}`
                }
                return e
                }
              });
            });
        }
       
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
    
  }

}

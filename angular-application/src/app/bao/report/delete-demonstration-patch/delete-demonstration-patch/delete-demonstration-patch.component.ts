import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-delete-demonstration-patch',
  templateUrl: './delete-demonstration-patch.component.html',
  styleUrls: ['./delete-demonstration-patch.component.css']
})
export class DeleteDemonstrationPatchComponent implements OnInit {
  

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  FinYears: any;
  FinYear: any;
  clusterDemonstration: any;
  demonstrationClusterTable:boolean = false;
  Season: any;
  clusterReport: any;
  GpData: any;
  WardData: any;
  wardName: any;
  schemeId: string=''

  constructor(
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    private dialog : MatDialog
  ) {
    this.pageTitle = 'Delete Demonstration Patch';
    this.pageDesc = 'Delete Demonstration Patch';
    this.breadcrumbList = ['Delete Demonstration Patch'];
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
  
  getclusterDemonstration = async () => {
    try {
      this.demonstrationClusterTable = true;
      this.clusterDemonstration = await this.baoService.getclusterDemonstration(this.FinYear,this.schemeId).toPromise()
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
          if (e.lgd_wardcode != null && e.lgd_wardcode!="") {
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
            // console.log(e);
            return e
            }
          });
        });
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
    
  }

  openDialog(i:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '32%',
      data:{
        message: `Are you sure want to delete the demonstration Patch '${this.clusterReport[i].DemostrationId}' ?`,
        buttonText: {
          ok: 'YES',
          cancel: 'NO'
        }
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result == true ){
        this.deleteDemonstrationPatch(i);
      }
    });
  }

  deleteDemonstrationPatch = async(i:any) => {
    try {
      const DemonstrationId = this.clusterReport[i].DemostrationId;
      const result = await this.baoService.deleteDemoID(DemonstrationId).toPromise()
      if(result.type != 'success') {
        this.toastr.warning(result.message)
      } else {
        this.toastr.success(result.message)
        this.getFinYear()
        this.clusterReport= []
      }          
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}



@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'dialog-overview-dialog.html',
})

export class DialogOverviewExampleDialog {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    if(data){
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
        }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
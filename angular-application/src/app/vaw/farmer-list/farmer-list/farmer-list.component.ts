import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { VawService } from 'src/app/services/vaw/vaw.service';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.css']
})
export class FarmerListComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  farmer_list: any;
  demonstrationData: any;
  demonstrationId: any;
  demostrationArea : any = 0
  farmerListTable: boolean = false;
  message1: boolean = false;
  FarmerDetailsForm: any;
  farmer_list2: any;
  details: any;
  farmer_details: any;
  FarmerId: any;
  demonstrationId1: any;
  updateFarmerData: any;
  LandArea: any;
  DeleteFarmerData: any;
  allFarmerData: Array<any>= [];
  SubmitButton: boolean = false;
  totalArea: any = 0;
  clicked : boolean = false
  totalArea1: any = 0;
  searchText: any

  constructor(
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private vawService: VawService,
    private toastr: ToastrService,
    private dialog : MatDialog
  ) {
    this.pageTitle = 'Demonstration Patch Verification';
    this.pageDesc = 'Demonstration Patch Verification';
    this.breadcrumbList = ['Verify Demonstration'];
    this.FarmerDetailsForm = fb.group({
      permit_NO: ['',[Validators.required]],
      demonstrationId: ['', [Validators.required]],
      farmerId: ['',[Validators.required]],
      farmerName: ['', [Validators.required]],
      farmerGender: ['', [Validators.required]],
      farmerCatagory: ['', [Validators.required]],
      landArea: ['', [Validators.required]],
      cropId: ['', [Validators.required]],
      cropVariety: ['', [Validators.required]],
      // MobileNo: ['']
    });
   }

  ngOnInit(): void {
    this.getDemonstrationData();
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
  }

 
  getDemonstrationData = async() => {
    try {
      this.demonstrationData = await this.vawService.getDemonstrationData().toPromise()      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllFarmerList = async() => {
    try {
      this.totalArea = 0
      this.totalArea1 = 0
      this.farmerListTable = true;
      const result = await this.vawService.getAllFarmerList(this.demonstrationId.DemostrationId).toPromise()
      this.farmer_list = result.farmerList;
      const demoPatchstatus = result.demoStatus[0];
      this.demostrationArea = this.demonstrationId.Demonstration_Area
      if(this.farmer_list.length == 0){
          this.message1 = true;
          this.SubmitButton = false;
      } else {
          this.farmer_list.forEach((e : any) => {
            this.totalArea1 += +e.LandArea
            this.totalArea = JSON.parse(this.totalArea1.toFixed(1))
      })
           
      demoPatchstatus.ConfirmBy_vaw == null && demoPatchstatus.ConfirmBy_BAO == null ? (this.message1 = false,this.SubmitButton = true) : (this.message1 = true,this.SubmitButton = false) 
            
      }
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  openDialog(i:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '32%',
      data:{
        message: `Are you sure want to delete the details of '${this.farmer_list[i].FarmerId}' ?`,
        buttonText: {
          ok: 'YES',
          cancel: 'NO'
        }
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result == true ){
        this.DeleteFarmerDetails(i);
      }
    });
  }

  DeleteFarmerDetails = async(i:any) => {
    try {
        const Permit_NO = this.farmer_list[i].Permit_NO;
        const DemonstrationId = this.farmer_list[i].DemonstrationId;
        const FID = this.farmer_list[i].FarmerId
        this.DeleteFarmerData = await this.vawService.DeleteFarmerDetails(Permit_NO, DemonstrationId , FID).toPromise()
        this.toastr.success(this.DeleteFarmerData.message)
        this.getAllFarmerList()
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  }

  FinalSubmitfarmerDetails = async() => {
    try {
      // if (this.demonstrationId.Demonstration_Area == this.totalArea) {
        
          const uniqueValues = new Set(this.farmer_list.map((i:any) => i.FarmerId));
          
          if (uniqueValues.size < this.farmer_list.length) {
              this.toastr.warning(`Duplication of Farmer Id found in this Demonstration Patch.Please rectify the duplication.`)
          } else {
              this.allFarmerData.push(this.farmer_list)
              const response = await this.vawService.FinalSubmitfarmerDetails(this.allFarmerData).toPromise()
              this.toastr.success(response.message);
              this.farmer_list = [];
              this.getDemonstrationData();
              this.farmerListTable = false;
              this.SubmitButton = false
          }

      // } else {
      //     this.toastr.info(`The allocated demonstration areas are not acheived yet.`)
      // }
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
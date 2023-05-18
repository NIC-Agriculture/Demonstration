import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DealerService } from 'src/app/services/dealer/dealer.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.css']
})
export class DeleteInvoiceComponent implements OnInit {

  farmerId: any
  InvoiceNo: string = ''
  prefixOfFarmerID: any;
  InputDetails: Array<any> = [];
  FinYear: any;
  FinYears: any;
  Season: any;
  InvoiceListTable:boolean = false
  
  constructor(
    private layoutService: LayoutserviceService,
    private dealerService: DealerService,
    private toastr: ToastrService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getPSDDistrictName();
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

  getPSDDistrictName = async()=>{
    try {
      const result = await this.dealerService.getDistrictPrefix().toPromise()
      this.prefixOfFarmerID = result.Dist_Prefix;     
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e)
    }
  }

  getInputDetails = async()=>{
     try {
      this.InvoiceListTable = true
       const FarmerId = this.prefixOfFarmerID + '/' + this.farmerId;
       this.InputDetails = await this.dealerService.getInputDetails(FarmerId,this.InvoiceNo).toPromise()
      } catch (e) {
       this.toastr.error('Sorry. Server problem. Please try again.');
       console.error(e)
     }
    }

  deleteInvoice = async(InvoiceNo: any, FarmerId: any,ItemId: any,Technical_Code: any,FinYear: any) => {
      try {
        const result = await this.dealerService.deleteInvoice(InvoiceNo, FarmerId, ItemId, Technical_Code ,FinYear ).toPromise()
        this.toastr.success(result.message) 
        this.InputDetails = [] 
        this.InvoiceListTable = false  
      } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e)
      }
  }


  openDialog(x:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '32%',
      data:{
        message: `Are you sure want to delete the Invoice No. : ${x.InvoiceNo}, \n Item Name : ${x.ItemName}, \n Technical Name : ${x.Technical_Name} ?`,
        buttonText: {
          ok: 'YES',
          cancel: 'NO'
        }
      }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result == true ){
        this.deleteInvoice(x.InvoiceNo,x.FarmerId,x.ItemId,x.Technical_Code,this.FinYear);
      }
    });
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

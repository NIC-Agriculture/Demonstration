import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';


@Component({
  selector: 'app-verify-dealer-sale',
  templateUrl: './verify-dealer-sale.component.html',
  styleUrls: ['./verify-dealer-sale.component.css']
})
export class VerifyDealerSaleComponent implements OnInit {
  demonstrationData: any;
  demonstrationId: any;
  allDealerResult: any;
  showModalBox: boolean = false;
  selected = -1;
  allComplete: boolean = false;
  showConfirm: boolean = false;
  message: boolean = false;
  forwardButton: boolean = false;
  @ViewChild('content') content: any;

  vawSaleResult: any;
  dealerSaleResult: any;
  confirmResult: any;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  rejectedDealerSale: any;
  DealerSaleListTable: boolean = false;
  
  constructor(
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) {
    this.pageTitle = 'Dealer Sale List';
    this.pageDesc = 'dealer sale details';
    this.breadcrumbList = ['Sale Details'];
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.getDemonstrationData()
  }

  updateAllComplete() {
    this.allComplete = this.allDealerResult != null && this.allDealerResult.every((t: { completed: any; }) => t.completed);
    for (let i = 0; i < this.allDealerResult.length; i++) {
      const e = this.allDealerResult[i];
      if (e.completed == true) {
        this.forwardButton = true;
        break;
      } else {
        this.forwardButton = false;
      }
    }
  }

  someComplete(): boolean {
    if (this.allDealerResult == null) return false;
    return this.allDealerResult.filter((t: { completed: any; }) => t.completed).length > 0 && !this.allComplete;
  }
  
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.allDealerResult== null) return;
    this.allDealerResult.forEach((t: { completed: boolean; }) => (t.completed = completed));
    this.forwardButton = this.allComplete == true ? true : false;    
  }

  getDemonstrationData = async() => {
      try {
          this.demonstrationData =  await this.baoService.getVerifiedDemonstrationData().toPromise()
          
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  getAllDealerSale = async() => {
    try {
        this.DealerSaleListTable = true
        this.allDealerResult = await this.baoService.getAllDealerSale(this.demonstrationId).toPromise()
        this.allDealerResult.length > 0 ? (this.message = false, this.showConfirm = true) : (this.message = true, this.showConfirm = false  )
                    
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
  }
 
  confirmDealerSale = async() => {
    try {
      const selectedDealerSale = this.allDealerResult.filter((e:any)=> e.completed)
      this.confirmResult =  await this.baoService.confirmDealerSale(selectedDealerSale).toPromise()
      this.toastr.success(this.confirmResult.message);
      this.allDealerResult = []
      this.showConfirm = false                
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  returnBackToDealer = async() => {
    try {
      const selectedDealerSale = this.allDealerResult.filter((e:any)=> e.completed)
      this.rejectedDealerSale =  await this.baoService.returnBackDealersaleToDealer(selectedDealerSale).toPromise()
      this.toastr.success(this.rejectedDealerSale.message);
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  openDialog(x: any) {
    const dialogRef = this.dialog.open(ViewReceiptComponent,{
       panelClass: 'custom-dialog-container' , data: x,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

// @Component({
//   selector: 'app-view-receipt',
//   templateUrl: 'view-receipt.component.html',
//   styleUrls: ['view-receipt.component.css']
// })
// export class ViewReceiptComponent {}

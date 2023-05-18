import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdoService } from 'src/app/services/ado/ado.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';


@Component({
  selector: 'app-verify-dealer-sale',
  templateUrl: './verify-dealer-sale.component.html',
  styleUrls: ['./verify-dealer-sale.component.css']
})
export class VerifyDealerSaleComponent implements OnInit {

  displayedColumns: string[] = ['checkBox', 'permit_No', 'Farmer_Id','Invoice_NO','Scheme','Total_Sale_Price','Subsidy','Catagory','Sale_Details'];
  dataSource: Array<any> = []
  
  allComplete: boolean = false;
  showForward: boolean = false
  allDealerResult: any;
  Block: any;
  dealerSaleResult: any;
  vawSaleResult: any;
  forwardResult: any;
  blocks: any;

  @ViewChild('content') content: any;

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  constructor(
    private adoService:AdoService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) { 
    this.pageTitle = 'Dealer Sale List';
    this.pageDesc = 'Details of Dealer Sale';
    this.breadcrumbList = ['Dealer Sale'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.getBlocks();
  }

  updateAllComplete() {
    this.allComplete = this.dataSource != null && this.dataSource.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.dataSource == null) {
      return false;
    }
    return this.dataSource.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.dataSource == null) {
      return;
    }
    this.dataSource.forEach(t => (t.completed = completed));
  }

  getBlocks = async() => {
    try {
        const result  = await this.adoService.getBlocks().toPromise()
        this.blocks = result;  
        // console.log(this.blocks );
                
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
}
  getAllDealerSale = async() => {
      try {
          const Block_Code= this.Block
          const result  = await this.adoService.getAllDealerSale(Block_Code).toPromise()
          this.dataSource = result;  
          // console.log(this.dataSource );
          if(this.dataSource.length != 0) {
            this.showForward = true
          }
                  
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  getDealerSaleReciept = async(e: any) => {
      try {
          const result  = await this.adoService.getDealerSaleReciept(e.InvoiceNo).toPromise()
          this.dealerSaleResult = result;  
          // console.log(this.dealerSaleResult);
          this.getVAWSaleReciept(e);
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  getVAWSaleReciept = async(e: any) => {
      try {
          const result  =  await this.adoService.getVAWSaleReciept(e.Permit_NO).toPromise()
          this.vawSaleResult = result;  
          // console.log(this.vawSaleResult);
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  forwardDealerSale = async() => {
      try {
          const selectedDealerSale = this.dataSource.filter((e:any)=>e.completed)
          const result  =  await this.adoService.forwardDealerSale(selectedDealerSale).toPromise()
          this.forwardResult = result;  
          this.toastr.success(this.forwardResult.message);
          this.dataSource = []
          this.showForward = false
          this.getBlocks();
        
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

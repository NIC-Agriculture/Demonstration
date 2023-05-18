import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DealerService } from 'src/app/services/dealer/dealer.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

export interface PeriodicElement {
  DemonstrationId: string;
  EligibleSubsidy: string;
  FarmerId: string;
  FarmerName: string;
  Farmer_Category:string;
  InvoiceNo: string;
  LandArea: string;
  Permit_NO: string;
  TotalPrice: string;
  baoAction: string;
  ddaAction: string;
}
@Component({
  selector: 'app-invoice-generated-list',
  templateUrl: './invoice-generated-list.component.html',
  styleUrls: ['./invoice-generated-list.component.css']
})
export class InvoiceGeneratedListComponent implements OnInit {
  date: any
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  invoiceLists: any;
  dataSource : any;
  InvoiceListTable: boolean = false;

  displayedColumns: string[] = ['position','DemonstrationId','Permit_NO','InvoiceNo','FarmerId', 'FarmerName','Farmer_Category','LandArea', 'TotalPrice' ,'EligibleSubsidy', 'Status','View'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dealerSaleResult: any;
  dealerLicenNo: any;
  invoiceNo: any;
  soldby: any;
  FarmerName: any;
  FarmerId: any;
  permitNo: any;
  totalPrice: any;
  totalPricesum: any;
  totaleligibleamount: any;

  constructor(
    private dealerService: DealerService ,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) { 
    this.pageTitle = 'Manage generated Invoices';
    this.pageDesc = 'Manage generated Invoices';
    this.breadcrumbList = ['Manage generated Invoices'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    }); 
   
  }
  
  getGeneratedInvoiceLists = async()=>{
    try {
      this.InvoiceListTable = true
      this.invoiceLists = await this.dealerService.getGeneratedInvoiceLists(this.date).toPromise()
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.invoiceLists);
      this.dataSource.paginator = this.paginator;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDealerSaleReciept = async(InvoiceNo:any) => {
    try {
        this.dealerSaleResult = await this.dealerService.getDealerSaleReciept(InvoiceNo).toPromise()
        this.dealerLicenNo = this.dealerSaleResult[0].dealerLiscenseNo
        this.invoiceNo = this.dealerSaleResult[0].InvoiceNo
        this.soldby = this.dealerSaleResult[0].SoldBy
        this.FarmerName = this.dealerSaleResult[0].FarmerName
        this.FarmerId = this.dealerSaleResult[0].FarmerId
        this.permitNo = this.dealerSaleResult[0].Permit_NO 
        var totalPricesum = 0;
        var totaleligibleamount = 0;
        this.dealerSaleResult.forEach((e:any) => {
          totalPricesum += +e.totalPrice;
          totaleligibleamount += +e.eligibleSubsidy;
        });
        this.totalPricesum = totalPricesum
        this.totaleligibleamount = totaleligibleamount
        
        this.getDate();
        
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
  }

  getDate = () => {
    var event = new Date(this.dealerSaleResult[0].SoldOn);
    this.date = JSON.stringify(event)
    this.date = this.date.slice(1,11)
  }


}

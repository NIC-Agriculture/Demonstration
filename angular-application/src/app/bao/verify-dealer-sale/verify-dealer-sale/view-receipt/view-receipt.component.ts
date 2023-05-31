import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {
  @Input() dealerSaleResult: any;
  @Input() vawSaleResult: any
  date: any;
  totalPricesum: any;
  totaleligibleamount: any;
  totalFarmershare: any;

  constructor(
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ViewReceiptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.getDealerSaleReciept()
    this.getDate()
  }

  getDealerSaleReciept = async() => {
    try {
        const InvoiceNo = this.data.InvoiceNo
        this.dealerSaleResult = await this.baoService.getDealerSaleReciept(InvoiceNo).toPromise()
        var totalPricesum = 0;
        var totaleligibleamount = 0;
        var totalFarmershare = 0;
        this.dealerSaleResult.forEach((e:any) => {
          totalPricesum += +e.totalPrice;
          totaleligibleamount += +e.eligibleSubsidy;
          totalFarmershare += +e.totalPrice - e.eligibleSubsidy

        });
        this.totalPricesum = totalPricesum
        this.totaleligibleamount = totaleligibleamount
        this.totalFarmershare = totalFarmershare 
        this.getVAWSaleReciept();
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
  }
  
  getVAWSaleReciept = async() => {
    try {
        const Permit_NO = this.data.Permit_NO
        this.vawSaleResult =  await this.baoService.getVAWSaleReciept(Permit_NO).toPromise()
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
  }

  getDate = () => {
    var event = new Date(this.data.SoldOn);
    this.date = JSON.stringify(event)
    this.date = this.date.slice(1,11)
  }
}

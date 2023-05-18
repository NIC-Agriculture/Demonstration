import { Component, Inject, Input, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdoService } from 'src/app/services/ado/ado.service';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {

  @Input() dealerSaleResult: any;
  @Input() vawSaleResult: any
  date: any;

  constructor(
    private adoService:AdoService,
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
        const result  = await this.adoService.getDealerSaleReciept(InvoiceNo).toPromise()
        this.dealerSaleResult = result;  
        // console.log(this.dealerSaleResult);
        this.getVAWSaleReciept();
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
  }

  getVAWSaleReciept = async() => {
    try {
        const Permit_NO = this.data.Permit_NO
        const result  =  await this.adoService.getVAWSaleReciept(Permit_NO).toPromise()
        this.vawSaleResult = result;  
        // console.log(this.vawSaleResult);
        // this.content.open();
        // this.showModalBox = true
                
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

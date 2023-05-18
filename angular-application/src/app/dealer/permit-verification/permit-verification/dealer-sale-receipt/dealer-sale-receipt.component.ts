import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer-sale-receipt',
  templateUrl: './dealer-sale-receipt.component.html',
  styleUrls: ['./dealer-sale-receipt.component.css']
})
export class DealerSaleReceiptComponent implements OnInit {
  
  date: any;
  @Input() dealerSaleDetails: any
  qrData: any;

  constructor() {}

  ngOnInit(): void {
    this.qrData = `FarmerID:${this.dealerSaleDetails.dealerResult[0].FarmerId} , PermitNo:${this.dealerSaleDetails.dealerResult[0].Permit_NO}`;
    this.getDate()
  }
  getDate = () => {
      var event = new Date(this.dealerSaleDetails.dealerResult[0].SoldOn);
      this.date = JSON.stringify(event)
      this.date = this.date.slice(1,11)
  }

      
}

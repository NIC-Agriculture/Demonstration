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
  totalPricesum: number = 0;
  totaleligibleamount: number = 0;
  totalFarmershare: number= 0;

  constructor() {}

  ngOnInit(): void {
    this.qrData = `FarmerID:${this.dealerSaleDetails.dealerResult[0].FarmerId} , PermitNo:${this.dealerSaleDetails.dealerResult[0].Permit_NO}`;
    this.getDate()
    this.getTotalSum()
  }
  getDate = () => {
      var event = new Date(this.dealerSaleDetails.dealerResult[0].SoldOn);
      this.date = JSON.stringify(event)
      this.date = this.date.slice(1,11)
  }

  getTotalSum = () => {
    var totalPricesum = 0;
    var totaleligibleamount = 0;
    var totalFarmershare = 0;
    this.dealerSaleDetails.dealerResult.forEach((e:any) => {
      totalPricesum += +e.totalPrice;
      totaleligibleamount += +e.eligibleSubsidy;
      totalFarmershare += +e.totalPrice - +e.eligibleSubsidy

    });
    this.totalPricesum = totalPricesum
    this.totaleligibleamount = totaleligibleamount
    this.totalFarmershare = totalFarmershare 
  }

      
}

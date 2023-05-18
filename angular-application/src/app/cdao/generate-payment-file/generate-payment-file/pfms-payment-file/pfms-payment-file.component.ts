import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pfms-payment-file',
  templateUrl: './pfms-payment-file.component.html',
  styleUrls: ['./pfms-payment-file.component.css']
})
export class PfmsPaymentFileComponent implements OnInit {
  
  fileName= 'GeneratedPaymentFile.xlsx'; 

  @Input () pymntDetails: Array<any> = []
  @Input () typeOfPayment: any;

  subsidy: boolean = false
  incentive: boolean = false
  message: boolean = false;
  constructor() { }

  ngOnInit(): void {
     this.calculateShare();
     this.pymntDetails.length==0 ? this.message=true : this.message=false
    //  if (this.pymntDetails.length==0) {
    //   this.message=true
    // }else{
    //   this.message=false
    // }
     
  }

  calculateShare = () => {
    this.pymntDetails.forEach((e: any) => {
        e.centerShare = e.totaleligiblesubsidy * 60/100
        e.stateShare = e.totaleligiblesubsidy * 40/100
    })
  }
 

exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

 
}

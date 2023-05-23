import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ViewReceiptComponent } from '../view-receipt/view-receipt.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-returned-dealer-sale',
  templateUrl: './returned-dealer-sale.component.html',
  styleUrls: ['./returned-dealer-sale.component.css']
})
export class ReturnedDealerSaleComponent implements OnInit {
  returneddealerSaleFrom: any;
  Season: any;
  FinYears: any;
  AllSchemeData: any;
  SubschemeData: any;
  schemeIdvar: any;
  ComponentData: any;
  demonstrationData: any;
  allreturnedDealerResult: any;
  returnedByCDAO:boolean = false
  returnedToDealerTable:boolean = false
  message:boolean = false
  allComplete: boolean = false;
  returnToButton: boolean = false;
  fileName= 'ReturnedDealerSaleByCDAO.xlsx';
  rejectedDealerSale: any;

  constructor(
    private baoService:BaoServiceService,
    private fb : FormBuilder,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) { 
    this.returneddealerSaleFrom = this.fb.group({
      FinYear: ["", [Validators.required]],
      Type: ["", [Validators.required]],
      scheme: ["", [Validators.required]],
      subScheme: ["",[Validators.required]],
      component: ["",[Validators.required]],
      demonstrationId: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getFinYear()
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

  getAllScheme = async() => {
    try {
      this.AllSchemeData = await this.baoService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      this.SubschemeData = []
      this.ComponentData = []
      switch (this.returneddealerSaleFrom.value.scheme) {
        case '2':
           this.schemeIdvar = 'scheme_1'
          break;
        case '3':
          this.schemeIdvar = 'scheme_2'
          break;
        case '4':
          this.schemeIdvar = 'scheme_3'
          break;  
        default:
          this.SubschemeData = []
          this.ComponentData = []
          break;
      } 
      this.SubschemeData = await this.baoService.getSubscheme(this.schemeIdvar).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.ComponentData = []
      const SubschemeId = this.returneddealerSaleFrom.value.subScheme
      const FinYear = this.returneddealerSaleFrom.value.FinYear
      console.log(SubschemeId);
      this.ComponentData = await this.baoService.getComponent(SubschemeId,FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationData = async() => {
    try {
      const FinYear = this.returneddealerSaleFrom.value.FinYear
      switch (this.returneddealerSaleFrom.value.scheme) {
        case '2':
           this.schemeIdvar = 'scheme_1'
          break;
        case '3':
          this.schemeIdvar = 'scheme_2'
          break;
        case '4':
          this.schemeIdvar = 'scheme_3'
          break;  
        default:
          this.SubschemeData = []
          this.ComponentData = []
          break;
      }
      const subschemeId = this.returneddealerSaleFrom.value.subScheme
      const compId = this.returneddealerSaleFrom.value.component 

        this.demonstrationData =  await this.baoService.getVerifiedDemonstrationData(FinYear,this.schemeIdvar,subschemeId,compId).toPromise()
        
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
}

updateAllComplete() {
  this.allComplete = this.allreturnedDealerResult != null && this.allreturnedDealerResult.every((t: { completed: any; }) => t.completed);
  for (let i = 0; i < this.allreturnedDealerResult.length; i++) {
    const e = this.allreturnedDealerResult[i];
    if (e.completed == true) {
      this.returnToButton = true;
      break;
    } else {
      this.returnToButton = false;
    }
  }
}

someComplete(): boolean {
  if (this.allreturnedDealerResult == null) return false;
  return this.allreturnedDealerResult.filter((t: { completed: any; }) => t.completed).length > 0 && !this.allComplete;
}

setAll(completed: boolean) {
  this.allComplete = completed;
  if (this.allreturnedDealerResult== null) return;
  this.allreturnedDealerResult.forEach((t: { completed: boolean; }) => (t.completed = completed));
  this.returnToButton = this.allComplete == true ? true : false;    
}

getReturnedDealerSale = async() => {
  try {
    if (this.returneddealerSaleFrom.value.Type == 'ReturnByCDAO') {
      this.returnedByCDAO = true;
      this.returnedToDealerTable = false
    }else if (this.returneddealerSaleFrom.value.Type == 'ReturnToDealer') {
      this.returnedToDealerTable = true;
      this.returnedByCDAO = false;
    }
      this.allreturnedDealerResult = await this.baoService.getReturnedDealerSale(this.returneddealerSaleFrom.value.demonstrationId).toPromise()
      this.allreturnedDealerResult.length > 0 ? (this.message = false) : (this.message = true )
                  
  } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
  }
}

returnBackToDealer = async() => {
  try {
    const selectedDealerSale = this.allreturnedDealerResult.filter((e:any)=> e.completed)
    this.rejectedDealerSale =  await this.baoService.returnBackToDealer(selectedDealerSale).toPromise()
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

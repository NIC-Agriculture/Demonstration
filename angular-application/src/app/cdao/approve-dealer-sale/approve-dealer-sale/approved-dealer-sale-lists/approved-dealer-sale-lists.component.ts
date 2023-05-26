import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ViewReceiptComponent } from '../view-receipt/view-receipt.component'
import * as XLSX from 'xlsx';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-approved-dealer-sale-lists',
  templateUrl: './approved-dealer-sale-lists.component.html',
  styleUrls: ['./approved-dealer-sale-lists.component.css']
})
export class ApprovedDealerSaleListsComponent implements OnInit {
 
  BlockAndSchemeForm: any;
  scheme = '' ;
  SubschemeData: any;
  ComponentData: any;
  subschemeCompDiv:boolean = false;
  schemeIdvar: any;
  BlockData: any;
  dealerlistTable: boolean = false;
  AllApprovedDealerSale: any;
  ApprovedSaleCount: any;
  message: boolean = false;
  showApprove: boolean = false;  
  fileName= 'ApprovedDealerSaleLists.xlsx'; 
  FinYears: any;
  Season: any;
  

  @ViewChild('content') content: any;

  constructor(
    private cdaoService: CdaoService,
    private fb : FormBuilder,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) { 
    this.BlockAndSchemeForm = this.fb.group({
      block: ["", [Validators.required]],
      scheme: ["", [Validators.required]],
      subScheme: [""],
      component: [""],
      FinYear: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getFinYear();
    // this.getBlocks();
  }
  get BlockSchemeFormValid() {
    return this.BlockAndSchemeForm.controls;
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

  getBlocks = async() => {
    try {
         this.dealerlistTable = false
         this.BlockAndSchemeForm.patchValue({subScheme : '',component : '', block:''})
         this.BlockData = await this.cdaoService.getBlocks().toPromise()          
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  getSubscheme = async() => {
    try {
      this.SubschemeData = []
      this.dealerlistTable = false
      this.BlockAndSchemeForm.patchValue({subScheme : '',component : ''})
      switch (this.BlockAndSchemeForm.value.scheme) {
        case '2':
           this.schemeIdvar = 'scheme_1'
           this.subschemeCompDiv = true
          break;
        case '3':
          this.schemeIdvar = 'scheme_2'
          this.subschemeCompDiv = true
          break;
        case '4':
          this.schemeIdvar = 'scheme_3'
          this.subschemeCompDiv = true
          break;  
        default:
          this.subschemeCompDiv = false
          this.SubschemeData = []
          this.ComponentData = []
          break;
      }           
      this.SubschemeData = await this.cdaoService.getSubscheme(this.schemeIdvar).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.ComponentData = []
      this.dealerlistTable = false
      this.BlockAndSchemeForm.patchValue({component : ''})
      const SubschemeId = this.BlockAndSchemeForm.value.subScheme
      const Fin_Year = this.BlockAndSchemeForm.value.FinYear 
      this.ComponentData = await this.cdaoService.getComponent(SubschemeId, Fin_Year).toPromise();      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllApprovedDealerSale = async()=>{
    try {
      this.dealerlistTable = true;
      if(this.BlockAndSchemeForm.value.block  != null && this.BlockAndSchemeForm.value.scheme){
        const blockcode = this.BlockAndSchemeForm.value.block;
        const schemeId = this.BlockAndSchemeForm.value.scheme;
        const subSchemeId = this.BlockAndSchemeForm.value.subScheme;
        const compId = this.BlockAndSchemeForm.value.component 
        const Fin_Year = this.BlockAndSchemeForm.value.FinYear 
        
        this.AllApprovedDealerSale  = await this.cdaoService.getAllApprovedDealerSale(blockcode,schemeId,subSchemeId,compId,Fin_Year).toPromise()
        this.AllApprovedDealerSale.length > 0 ? (this.message = false,this.showApprove = true) : (this.message = true,this.showApprove = false)        
      }else{
        this.toastr.warning('Please select scheme')
      }
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

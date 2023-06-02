import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-approve-dealer-sale',
  templateUrl: './approve-dealer-sale.component.html',
  styleUrls: ['./approve-dealer-sale.component.css']
})
export class ApproveDealerSaleComponent implements OnInit {

  allComplete: boolean = false;
  showApprove: boolean = false;
  
  BlockAndSchemeForm: any;
  scheme = '' ;
  message: boolean = false;
  forwardButton: boolean = false;
  dealerSaleResult: any;
  vawSaleResult: any;
  approveResult: any;
  dataSource: any;
  BlockData: any;
  Block_Code = '';
  allDealerSaleResult: any;
  countPending: any;

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  dealerlistTable: boolean = false;

  @ViewChild('content') content: any;
  SubschemeData: any;
  ComponentData: any;
  subschemeCompDiv:boolean = false;
  schemeIdvar: any;
  rejecteddealerSale: any;
  approvedInvoiceLists: boolean = false
  FinYears: any;
  Season: any;
  filterTerm !: string
  clicked: boolean = false;



  constructor(
    private cdaoService: CdaoService,
    private fb : FormBuilder,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) {
    this.pageTitle = 'Dealer Sale Verification';
    this.pageDesc = 'dealer sale Verification';
    this.breadcrumbList = ['Sale Verification'];
    this.BlockAndSchemeForm = this.fb.group({
      block: ["", [Validators.required]],
      scheme: ["", [Validators.required]],
      subScheme: [""],
      component: [""],
      FinYear: ["", [Validators.required]],
    })
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.getFinYear();
    // this.getBlocks();
  }
  get BlockSchemeFormValid() {
    return this.BlockAndSchemeForm.controls;
  }

  updateAllComplete() {
      this.allComplete = this.allDealerSaleResult != null && this.allDealerSaleResult.every((t: { completed: any; }) => t.completed);
      for (let i = 0; i < this.allDealerSaleResult.length; i++) {
        const e = this.allDealerSaleResult[i];
        if (e.completed == true) {
          this.forwardButton = true;
          break;
        } else {
          this.forwardButton = false;
        }
      }
  }

  someComplete(): boolean {
      if (this.allDealerSaleResult == null) return false ;
      return this.allDealerSaleResult.filter((t: { completed: any; }) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.allDealerSaleResult == null) return;
      this.allDealerSaleResult.forEach((t: { completed: boolean; }) => (t.completed = completed));
      this.forwardButton = this.allComplete == true ? true : false;
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
          this.BlockData = []
          this.BlockData = await this.cdaoService.getBlocks().toPromise()          
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  getSubscheme = async() => {
    try {
      this.dealerlistTable = false
      this.BlockAndSchemeForm.patchValue({subScheme : '',component : ''})
      this.SubschemeData = []
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
      const Fin_Year = this.BlockAndSchemeForm.value.FinYear 
      const SubschemeId = this.BlockAndSchemeForm.value.subScheme
      this.ComponentData = await this.cdaoService.getComponent(SubschemeId,Fin_Year).toPromise();      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllDealerSale = async() => {
    try {
      this.dealerlistTable = true;
      if(this.BlockAndSchemeForm.value.block  != null && this.BlockAndSchemeForm.value.scheme){
        const blockcode = this.BlockAndSchemeForm.value.block;
        const schemeId = this.BlockAndSchemeForm.value.scheme;
        const subSchemeId = this.BlockAndSchemeForm.value.subScheme;
        const compId = this.BlockAndSchemeForm.value.component 
        const Fin_Year = this.BlockAndSchemeForm.value.FinYear 
        
        this.allDealerSaleResult  = await this.cdaoService.getAllDealerSale(blockcode,schemeId,subSchemeId,compId,Fin_Year).toPromise()
        this.countPending = this.allDealerSaleResult.length
        this.allDealerSaleResult.forEach(async (e:any)=> {
                const result1 = await this.cdaoService.getFarmerBankDetails(e.FarmerId).toPromise()
                e.AccountNo = result1.VCHACCOUNTNO;
                e.IFSC = result1.VCHIFSCCODE;
                e.AccountHolderName = result1.VCHACCHOLDERNM;
                e.BankName = result1.vchBankName;
                e.Branch_Name = result1.vchBranchName;
                e.aadhaarNo = result1.vchaadharno;
        })        
        this.allDealerSaleResult.length > 0 ? (this.message = false,this.showApprove = true) : (this.message = true,this.showApprove = false)        
      }else{
        this.toastr.warning('Please select scheme')
      }
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
  }

  getDealerSaleReciept = async(e: any) => {
      try {
         this.dealerSaleResult  = await this.cdaoService.getDealerSaleReciept(e.InvoiceNo).toPromise();
         this.getVAWSaleReciept(e);
      } catch (e) {
         this.toastr.error('Sorry. Server problem. Please try again.')
         console.error(e);
      }
  }

  getVAWSaleReciept = async(e: any) => {
      try {
         this.vawSaleResult  =  await this.cdaoService.getVAWSaleReciept(e.Permit_NO).toPromise()  
      } catch (e) {
         this.toastr.error('Sorry. Server problem. Please try again.')
         console.error(e);
      }
  }

  approveDealerSale = async() => {
      try {
          const selectedDealerSale = this.allDealerSaleResult.filter((e:any)=>e.completed)
          if (selectedDealerSale.length == 0) {
            this.toastr.warning(`Please Select atleast one sale to approve`)
          } else {
            this.approveResult  =  await this.cdaoService.approveDealerSale(selectedDealerSale).toPromise()
            this.toastr.success(this.approveResult.message);
            this.allDealerSaleResult= []
            this.showApprove = false
            this.clicked = false
            this.getBlocks();
          }
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  returnbackDealerSaleToBAO = async() => {
    try {
      const selectedDealerSale = this.allDealerSaleResult.filter((e:any)=>e.completed)
      if (selectedDealerSale.length == 0) {
        this.toastr.warning(`Please Select atleast one sale to return to BAO.`)
      }else{
        this.rejecteddealerSale = await this.cdaoService.returnDealerSaleToBAO(selectedDealerSale).toPromise()
        this.toastr.success(this.rejecteddealerSale.message);
        this.allDealerSaleResult= []
        this.forwardButton = false
        this.getAllDealerSale()
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
  
}

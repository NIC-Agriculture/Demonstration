import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-approve-incentive-seed-cost',
  templateUrl: './approve-incentive-seed-cost.component.html',
  styleUrls: ['./approve-incentive-seed-cost.component.css']
})
export class ApproveIncentiveSeedCostComponent implements OnInit {

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
  allIncentiveResult: any;
  countPending: number = 0;

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  constructor(
    private cdaoService: CdaoService,
    private fb : FormBuilder,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) {
    this.pageTitle = 'Incentive/Seed Cost Verification';
    this.pageDesc = 'Incentive/Seed Cost Verification';
    this.breadcrumbList = ['Incentive/Seed Cost Verification'];
    this.BlockAndSchemeForm = this.fb.group({
      type: ["", [Validators.required]],
      block: ["", [Validators.required]],
      scheme: ["", [Validators.required]],
    })
   }

   ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.getBlocks();
  }
  get BlockSchemeFormValid() {
    return this.BlockAndSchemeForm.controls;
  }

updateAllComplete() {
    this.allComplete = this.allIncentiveResult != null && this.allIncentiveResult.every((t: { completed: any; }) => t.completed);
    for (let i = 0; i < this.allIncentiveResult.length; i++) {
      const e = this.allIncentiveResult[i];
      if (e.completed == true) {
        this.forwardButton = true;
        break;
      } else {
        this.forwardButton = false;
      }
    }
}

someComplete(): boolean {
    if (this.allIncentiveResult == null) return false;
    return this.allIncentiveResult.filter((t: { completed: any; }) => t.completed).length > 0 && !this.allComplete;
}

setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.allIncentiveResult == null) return ;
    this.allIncentiveResult.forEach((t: { completed: boolean; }) => (t.completed = completed));
    this.forwardButton = this.allComplete == true ? true : false
}

getBlocks = async() => {
  try {
        this.BlockData  = await this.cdaoService.getBlocks().toPromise()
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
}

getAllIncentive = async() => {
  try {
    if(this.BlockAndSchemeForm.value.block  != null && this.BlockAndSchemeForm.value.scheme){
      this.allIncentiveResult  = await this.cdaoService.getAllIncentive(this.BlockAndSchemeForm.value.block , this.BlockAndSchemeForm.value.scheme).toPromise()      
      this.countPending = +this.allIncentiveResult.length
      this.allIncentiveResult.forEach(async (e:any)=> {
              const result1 = await this.cdaoService.getFarmerBankDetails(e.FarmerId).toPromise()
              e.AccountNo = result1.VCHACCOUNTNO;
              e.IFSC = result1.VCHIFSCCODE;
              e.AccountHolderName = result1.VCHACCHOLDERNM;
              e.BankName = result1.vchBankName;
              e.Branch_Name = result1.vchBranchName;
              e.aadhaarNo = result1.vchaadharno;
      })
      
      this.allIncentiveResult.length > 0 ? (this.message = false,this.showApprove = true ) : (this.message = true,this.showApprove = false)
    }else{
      this.toastr.warning('Please select scheme')
    }
  } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
  }
}

approveIncentiveList = async() => {
  try {
      const selectedDealerSale = this.allIncentiveResult.filter((e:any)=>e.completed)
      if (selectedDealerSale.length == 0) {
        this.toastr.warning(`Please Select atleast one Permit to approve`)
      } else {
        this.approveResult  =  await this.cdaoService.approveIncentiveList(selectedDealerSale).toPromise()
        this.toastr.success(this.approveResult.message);
        this.allIncentiveResult= []
        this.showApprove = false
        this.getBlocks();
        this.countPending = 0
      
      }
  } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
  }
}


}

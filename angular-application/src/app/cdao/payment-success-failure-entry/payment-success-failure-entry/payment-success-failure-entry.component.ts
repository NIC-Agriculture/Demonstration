import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';



@Component({
  selector: 'app-payment-success-failure-entry',
  templateUrl: './payment-success-failure-entry.component.html',
  styleUrls: ['./payment-success-failure-entry.component.css']
})


export class PaymentSuccessFailureEntryComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  PaymentForm:any
  allComplete: boolean = false;
  refNos: any;
  Index: any;
  RejectReason:any
  permitSaleDetails: any;
  transactionDetailsTable: boolean = false
  submitButton: boolean = false

  constructor( 
    private cdaoService: CdaoService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    ) { 
    this.pageTitle = 'Payment Success/Failure Entry';
    this.pageDesc = 'Payment Success/Failure Entry';
    this.breadcrumbList = ['Success/Failure'];
    this.PaymentForm = this.fb.group({
      paymentType: ["",Validators.required],
      referenceId: ["", [Validators.required]],
      transactionId: ["", [Validators.required]],
     })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
  }


  get PaymentFormValid() { 
    return this.PaymentForm.controls;
  }

  updateAllComplete() {
    this.allComplete = this.permitSaleDetails != null && this.permitSaleDetails.every((t: { completed: any; }) => t.completed);
    for (let i = 0; i < this.permitSaleDetails.length; i++) {
      const e = this.permitSaleDetails[i];
      if (e.completed == true) {
        this.submitButton = true;
        break;
      } else {
        this.submitButton = false;
      }
    }
}
  someComplete(): boolean {
    if (this.permitSaleDetails == null) return false;
    return (
      this.permitSaleDetails.filter((t: { completed: any; }) => t.completed).length > 0 &&
      !this.allComplete
    );
    
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.permitSaleDetails == null)  return ;
    this.permitSaleDetails.forEach((t: { completed: boolean; }) => (t.completed = completed));

    this.allComplete == true ? this.submitButton = true : this.submitButton = false;
  }

  getReferenceIDs = async () => {
    try {
      this.permitSaleDetails = []
      const paymentType = this.PaymentForm.value.paymentType
      this.refNos = await this.cdaoService.getReferenceIDsForpayment(paymentType).toPromise();      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getPermitSaleDetails = async () => {
    try {
      this.transactionDetailsTable = true
      const ReferenceNo = this.PaymentForm.value.referenceId.referenceno
      const paymentType = this.PaymentForm.value.paymentType
      this.permitSaleDetails = await this.cdaoService.getPermitSaleDetails(ReferenceNo,paymentType).toPromise();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  valueChangeInRefId =()=>{
  this.permitSaleDetails = [];
  }
  
  setIndex = async (i:any) => {
     this.Index = i
  }

  RejectSale = async () => {
    this.permitSaleDetails[this.Index].rejectReason = this.RejectReason
    this.permitSaleDetails[this.Index].PymntSt = '1'
    this.RejectReason = '';    
  }

  UpdateTransactionDetails = async () => {
    try {
      this.transactionDetailsTable = false
      const SelectedPermitDetails = this.permitSaleDetails.filter((e:any) => e.completed )
      const data = {
        paymentType: this.PaymentForm.value.paymentType,
        ReferenceNo: this.PaymentForm.value.referenceId.referenceno,
        TransId:this.PaymentForm.value.transactionId,
        SelectedPermitDetails:SelectedPermitDetails
      }
      const result = await this.cdaoService.UpdateTransactionDetails(data).toPromise();
      if(result.message){
        this.PaymentForm.reset();
        this.toastr.success(result.message)
      }
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }


}

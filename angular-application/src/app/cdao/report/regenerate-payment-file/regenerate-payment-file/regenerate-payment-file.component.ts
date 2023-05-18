import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-regenerate-payment-file',
  templateUrl: './regenerate-payment-file.component.html',
  styleUrls: ['./regenerate-payment-file.component.css']
})
export class RegeneratePaymentFileComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  fileName= 'RegeneratedPaymentFile.xlsx'; 
  AllSchemeData: any;
  refNos: any;
  SchemeId: any={};
  paymentType:any;
  referenceId:any
  regeneratepaymentFile: any;
  regenerateTable: boolean = false
  stateplan: boolean = false;
  pfsm: boolean = false;
  constructor(
    private cdaoService: CdaoService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
  ) { 
    this.pageTitle = 'Regenerate Payment File';
    this.pageDesc = 'Regenerate of payemnt file';
    this.breadcrumbList = ['Regenerate payment file'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
  }

  getAllScheme = async () => {
    try {
      this.refNos=[];
      this.AllSchemeData=[];
      this.SchemeId={};
      this.referenceId={};
      this.AllSchemeData = await this.cdaoService.getAllScheme().toPromise();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getReferenceIDs = async () => {
    try {
      this.referenceId={};
      const schemeId = this.SchemeId.schemeId
      this.refNos = await this.cdaoService.getReferenceIDs(schemeId,this.paymentType).toPromise();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  RegeneratePaymntFile = async () => {
    try {
      this.regenerateTable = true
      const schemeId = this.SchemeId.schemeId
      const refId = this.referenceId.referenceno
      this.regeneratepaymentFile = await this.cdaoService.RegeneratePaymntFile(refId,schemeId,this.paymentType).toPromise();
      this.calculateShare();
      this.regeneratepaymentFile.forEach(async (e:any)=> {
        const result1 = await this.cdaoService.getFarmerBankDetails(e.FarmerId).toPromise()
        e.GpName = result1.vch_GPNameOr
        e.VillageName = result1.vch_VillageNameOr    
      })    

      if(schemeId == 'scheme_3'){          
        this.pfsm = false
        this.stateplan = true;     
      }else{
        this.pfsm = true
        this.stateplan = false;
      }  
      this.paymentType = '';
      this.refNos=[];
      this.AllSchemeData=[];
      this.SchemeId={};
      this.referenceId={};
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  calculateShare = () => {
    this.regeneratepaymentFile.forEach((e: any) => {
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

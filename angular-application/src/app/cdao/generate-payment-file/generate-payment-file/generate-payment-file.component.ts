import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-generate-payment-file',
  templateUrl: './generate-payment-file.component.html',
  styleUrls: ['./generate-payment-file.component.css']
})
export class GeneratePaymentFileComponent implements OnInit {

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  AllSchemeData: any;
  SchemeId: any={};
  referenceId: any={};
  refNos: any;
  pymntFile: Array<any> = [];
  pfsm: boolean = false;
  stateplan: boolean = false;
  pendingFile: any;
  paymentType:any;

  constructor(
    private cdaoService: CdaoService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    
    ) { 
    this.pageTitle = 'Generate Payment File';
    this.pageDesc = 'Generate Payment File';
    this.breadcrumbList = ['Generate Payment File'];
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
      this.pymntFile=[];
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
      this.pymntFile=[];
      const schemeId = this.SchemeId.schemeId
      this.refNos = await this.cdaoService.getReferenceIDs(schemeId,this.paymentType).toPromise();      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  generatePaymntFile = async () => {
    try {
        const schemeId = this.SchemeId.schemeId
        this.pymntFile = await this.cdaoService.generatePaymntFile(this.referenceId.referenceno , schemeId ,this.paymentType).toPromise();
        
        this.pymntFile.forEach(async (e:any)=> {
          const result1 = await this.cdaoService.getFarmerBankDetails(e.FarmerId).toPromise()
          e.GpName = result1.vch_GPNameOr
          e.VillageName = result1.vch_VillageNameOr    
        })   

        this.pendingFile =  this.pymntFile.length
        if(this.pymntFile){          
          switch (schemeId) {
            case 'scheme_3':
              this.pfsm = false
              this.stateplan = true;
              break;
            default:
              this.pfsm = true
              this.stateplan = false;
              break;
          }
        
        }else{
          this.toastr.error(`Sorry. Server problem. Please try again`)
        }
      
    } catch (e) {
      this.toastr.error(`Sorry. Server problem. Please try again`)
      console.error(e);
      
    }
  }

}

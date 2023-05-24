import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ViewReceiptComponent } from '../view-receipt/view-receipt.component';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-approved-dealer-sale-lists',
  templateUrl: './approved-dealer-sale-lists.component.html',
  styleUrls: ['./approved-dealer-sale-lists.component.css']
})
export class ApprovedDealerSaleListsComponent implements OnInit {
  ApproveddealerSaleFrom: any;
  AllSchemeData: any;
  FinYears: any;
  Season: any;
  SubschemeData: any;
  ComponentData: any;
  schemeIdvar: any;
  demonstrationData: any;
  ApprovedDealerSaleListTable: boolean = false
  allApprovedDealerResult: any;
  message: boolean = false;

  fileName = 'ForwardedDealerSaleList.xlsx';
  constructor(
    private baoService: BaoServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) {
    this.ApproveddealerSaleFrom = this.fb.group({
      FinYear: ["", [Validators.required]],
      scheme: ["", [Validators.required]],
      subScheme: ["", [Validators.required]],
      component: ["", [Validators.required]],
      demonstrationId: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getFinYear()
  }

  getFinYear = async () => {
    try {
      const result = await this.layoutService.getFinYear().toPromise()
      this.FinYears = result.Years;
      this.Season = result.Season;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllScheme = async () => {
    try {
      this.AllSchemeData = await this.baoService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async () => {
    try {
      this.SubschemeData = []
      this.ComponentData = []
      switch (this.ApproveddealerSaleFrom.value.scheme) {
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

  getComponent = async () => {
    try {
      this.ComponentData = []
      const SubschemeId = this.ApproveddealerSaleFrom.value.subScheme
      const FinYear = this.ApproveddealerSaleFrom.value.FinYear
      this.ComponentData = await this.baoService.getComponent(SubschemeId, FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationData = async () => {
    try {
      const FinYear = this.ApproveddealerSaleFrom.value.FinYear
      switch (this.ApproveddealerSaleFrom.value.scheme) {
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
      const subschemeId = this.ApproveddealerSaleFrom.value.subScheme
      const compId = this.ApproveddealerSaleFrom.value.component

      this.demonstrationData = await this.baoService.getVerifiedDemonstrationData(FinYear, this.schemeIdvar, subschemeId, compId).toPromise()

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  getApprovedDealerSale = async () => {
    try {
      this.ApprovedDealerSaleListTable = true
      this.allApprovedDealerResult = await this.baoService.getAllApprovedDealerSale(this.ApproveddealerSaleFrom.value.demonstrationId).toPromise()
      this.allApprovedDealerResult.forEach((e:any)=>{
                e.verificationStatus = e.verifyStatus == 'Approved_By_CDAO' ? 'Approved' : 'Pending'
      })
      this.allApprovedDealerResult.length > 0 ? (this.message = false) : (this.message = true)

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  openDialog(x: any) {
    const dialogRef = this.dialog.open(ViewReceiptComponent, {
      panelClass: 'custom-dialog-container', data: x,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}

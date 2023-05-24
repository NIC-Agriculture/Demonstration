import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-verify-dealer-sale',
  templateUrl: './verify-dealer-sale.component.html',
  styleUrls: ['./verify-dealer-sale.component.css']
})
export class VerifyDealerSaleComponent implements OnInit {
  demonstrationData: any;
  demonstrationId: any;
  allDealerResult: any;
  showModalBox: boolean = false;
  selected = -1;
  allComplete: boolean = false;
  showConfirm: boolean = false;
  message: boolean = false;
  forwardButton: boolean = false;
  @ViewChild('content') content: any;

  vawSaleResult: any;
  dealerSaleResult: any;
  confirmResult: any;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  rejectedDealerSale: any;
  DealerSaleListTable: boolean = false;
  dealerSaleFrom: any;
  FinYears: any;
  Season: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  schemeIdvar: any;

  constructor(
    private baoService: BaoServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    public dialog: MatDialog
  ) {
    this.pageTitle = 'Dealer Sale List';
    this.pageDesc = 'dealer sale details';
    this.breadcrumbList = ['Sale Details'];
    this.dealerSaleFrom = this.fb.group({
      FinYear: ["", [Validators.required]],
      scheme: ["", [Validators.required]],
      subScheme: ["", [Validators.required]],
      component: ["", [Validators.required]],
      demonstrationId: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    this.getFinYear();
  }
  get dealerSaleFromValid() {
    return this.dealerSaleFrom.controls;
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
      switch (this.dealerSaleFrom.value.scheme) {
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
      const SubschemeId = this.dealerSaleFrom.value.subScheme
      const FinYear = this.dealerSaleFrom.value.FinYear
      this.ComponentData = await this.baoService.getComponent(SubschemeId, FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  updateAllComplete() {
    this.allComplete = this.allDealerResult != null && this.allDealerResult.every((t: { completed: any; }) => t.completed);
    for (let i = 0; i < this.allDealerResult.length; i++) {
      const e = this.allDealerResult[i];
      if (e.completed == true) {
        this.forwardButton = true;
        break;
      } else {
        this.forwardButton = false;
      }
    }
  }

  someComplete(): boolean {
    if (this.allDealerResult == null) return false;
    return this.allDealerResult.filter((t: { completed: any; }) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.allDealerResult == null) return;
    this.allDealerResult.forEach((t: { completed: boolean; }) => (t.completed = completed));
    this.forwardButton = this.allComplete == true ? true : false;
  }

  getDemonstrationData = async () => {
    try {
      const FinYear = this.dealerSaleFrom.value.FinYear
      switch (this.dealerSaleFrom.value.scheme) {
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
      const subschemeId = this.dealerSaleFrom.value.subScheme
      const compId = this.dealerSaleFrom.value.component

      this.demonstrationData = await this.baoService.getVerifiedDemonstrationData(FinYear, this.schemeIdvar, subschemeId, compId).toPromise()

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  getAllDealerSale = async () => {
    try {
      const demonstrationId = this.dealerSaleFrom.value.demonstrationId
      this.DealerSaleListTable = true
      this.allDealerResult = await this.baoService.getAllDealerSale(demonstrationId).toPromise()
      this.allDealerResult.length > 0 ? (this.message = false, this.showConfirm = true) : (this.message = true, this.showConfirm = false)

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  confirmDealerSale = async () => {
    try {
      const selectedDealerSale = this.allDealerResult.filter((e: any) => e.completed)
      this.confirmResult = await this.baoService.confirmDealerSale(selectedDealerSale).toPromise()
      this.toastr.success(this.confirmResult.message);
      this.allDealerResult = []
      this.showConfirm = false
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  returnToDealer = async () => {
    try {
      const selectedDealerSale = this.allDealerResult.filter((e: any) => e.completed)
      this.rejectedDealerSale = await this.baoService.returnToDealer(selectedDealerSale).toPromise()
      this.toastr.success(this.rejectedDealerSale.message);
      this.allDealerResult = []
      this.showConfirm = false

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

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyDealerSaleRoutingModule } from './verify-dealer-sale-routing.module';
import { VerifyDealerSaleComponent } from './verify-dealer-sale/verify-dealer-sale.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewReceiptComponent } from './verify-dealer-sale/view-receipt/view-receipt.component';
import { NgxPrintModule } from 'ngx-print';
import {  MatDialogModule  } from '@angular/material/dialog';
import {  MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    VerifyDealerSaleComponent,
    ViewReceiptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VerifyDealerSaleRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    NgxPrintModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class VerifyDealerSaleModule { }

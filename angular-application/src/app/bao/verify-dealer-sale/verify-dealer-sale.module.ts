import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VerifyDealerSaleRoutingModule } from './verify-dealer-sale-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { VerifyDealerSaleComponent } from './verify-dealer-sale/verify-dealer-sale.component';
import { ViewReceiptComponent } from './verify-dealer-sale/view-receipt/view-receipt.component';
import { MatIconModule } from '@angular/material/icon';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    VerifyDealerSaleComponent,
    ViewReceiptComponent
  ],
  imports: [
    CommonModule,
    VerifyDealerSaleRoutingModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    NgxPrintModule

  ]
})
export class VerifyDealerSaleModule { }

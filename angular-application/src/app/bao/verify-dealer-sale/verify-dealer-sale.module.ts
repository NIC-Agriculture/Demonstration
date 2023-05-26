import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VerifyDealerSaleRoutingModule } from './verify-dealer-sale-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { VerifyDealerSaleComponent } from './verify-dealer-sale/verify-dealer-sale.component';
import { ViewReceiptComponent } from './verify-dealer-sale/view-receipt/view-receipt.component';
import { MatIconModule } from '@angular/material/icon';
import {NgxPrintModule} from 'ngx-print';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { ApprovedDealerSaleListsComponent } from './verify-dealer-sale/approved-dealer-sale-lists/approved-dealer-sale-lists.component';
import { ReturnedDealerSaleComponent } from './verify-dealer-sale/returned-dealer-sale/returned-dealer-sale.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    VerifyDealerSaleComponent,
    ViewReceiptComponent,
    ApprovedDealerSaleListsComponent,
    ReturnedDealerSaleComponent
  ],
  imports: [
    CommonModule,
    VerifyDealerSaleRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    NgxPrintModule,
    MatTabsModule,
    Ng2SearchPipeModule

  ]
})
export class VerifyDealerSaleModule { }

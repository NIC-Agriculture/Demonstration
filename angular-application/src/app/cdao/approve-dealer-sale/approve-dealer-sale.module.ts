import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveDealerSaleRoutingModule } from './approve-dealer-sale-routing.module';
import { ApproveDealerSaleComponent } from './approve-dealer-sale/approve-dealer-sale.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { ViewReceiptComponent } from './approve-dealer-sale/view-receipt/view-receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ApprovedDealerSaleListsComponent } from './approve-dealer-sale/approved-dealer-sale-lists/approved-dealer-sale-lists.component';
import { ReturnedDealerSaleComponent } from './approve-dealer-sale/returned-dealer-sale/returned-dealer-sale.component';


@NgModule({
  declarations: [
    ApproveDealerSaleComponent,
    ViewReceiptComponent,
    ApprovedDealerSaleListsComponent,
    ReturnedDealerSaleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApproveDealerSaleRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule,
    NgxPrintModule,
    MatTabsModule
  ]
})
export class ApproveDealerSaleModule { }

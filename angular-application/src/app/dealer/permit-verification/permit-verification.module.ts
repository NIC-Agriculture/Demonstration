import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermitVerificationRoutingModule } from './permit-verification-routing.module';
import { PermitVerificationComponent } from './permit-verification/permit-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DealerSellComponent } from './permit-verification/dealer-sell/dealer-sell.component';
import { MatRadioModule } from '@angular/material/radio';
import { QRCodeModule } from 'angularx-qrcode';
import { DealerSaleReceiptComponent } from './permit-verification/dealer-sale-receipt/dealer-sale-receipt.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPrintModule } from 'ngx-print';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




@NgModule({
  declarations: [
    PermitVerificationComponent,
    DealerSellComponent,
    DealerSaleReceiptComponent
  ],
  imports: [
    CommonModule,
    PermitVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    QRCodeModule,
    NgMultiSelectDropDownModule,
    NgxPrintModule,
    MatSelectModule,
    MatFormFieldModule,
    Ng2SearchPipeModule
  ]
})
export class PermitVerificationModule { }

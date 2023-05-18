import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratePaymentFileRoutingModule } from './generate-payment-file-routing.module';
import { GeneratePaymentFileComponent } from './generate-payment-file/generate-payment-file.component';
import { PfmsPaymentFileComponent } from './generate-payment-file/pfms-payment-file/pfms-payment-file.component';
import { StateplanPaymentFileComponent } from './generate-payment-file/stateplan-payment-file/stateplan-payment-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GeneratePaymentFileComponent,
    PfmsPaymentFileComponent,
    StateplanPaymentFileComponent
  ],
  imports: [
    CommonModule,
    GeneratePaymentFileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GeneratePaymentFileModule { }

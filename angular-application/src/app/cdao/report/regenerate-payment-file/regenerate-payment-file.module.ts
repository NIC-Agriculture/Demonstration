import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegeneratePaymentFileRoutingModule } from './regenerate-payment-file-routing.module';
import { RegeneratePaymentFileComponent } from './regenerate-payment-file/regenerate-payment-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegeneratePaymentFileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegeneratePaymentFileRoutingModule
  ]
})
export class RegeneratePaymentFileModule { }

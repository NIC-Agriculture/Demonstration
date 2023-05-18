import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSuccessFailureEntryRoutingModule } from './payment-success-failure-entry-routing.module';
import { PaymentSuccessFailureEntryComponent } from './payment-success-failure-entry/payment-success-failure-entry.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentSuccessFailureEntryComponent
  ],
  imports: [
    CommonModule,
    PaymentSuccessFailureEntryRoutingModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentSuccessFailureEntryModule { }

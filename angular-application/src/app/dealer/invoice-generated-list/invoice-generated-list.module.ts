import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceGeneratedListRoutingModule } from './invoice-generated-list-routing.module';
import { InvoiceGeneratedListComponent } from './invoice-generated-list/invoice-generated-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DeleteInvoiceComponent, DialogOverviewExampleDialog } from './delete-invoice/delete-invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxPrintModule } from 'ngx-print';
import { QRCodeModule } from 'angularx-qrcode';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    InvoiceGeneratedListComponent,
    DeleteInvoiceComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    InvoiceGeneratedListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule ,
    MatButtonModule,
    NgxPrintModule,
    QRCodeModule,
    MatDialogModule,
    
  ]
})
export class InvoiceGeneratedListModule { }

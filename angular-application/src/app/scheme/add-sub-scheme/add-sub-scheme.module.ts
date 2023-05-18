import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSubSchemeRoutingModule } from './add-sub-scheme-routing.module';
import { AddSubSchemeComponent } from './add-sub-scheme/add-sub-scheme.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AddSubSchemeComponent
  ],
  imports: [
    CommonModule,
    AddSubSchemeRoutingModule,
    NgxSkeletonLoaderModule,
    // MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddSubSchemeModule { }

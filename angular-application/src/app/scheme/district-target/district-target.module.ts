import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { DistrictTargetRoutingModule } from './district-target-routing.module';
import { DistrictTargetComponent } from './district-target/district-target.component';
import { DistrictTargetUpdateComponent } from './district-target/district-target-update/district-target-update.component';


@NgModule({
  declarations: [
    DistrictTargetComponent,
    DistrictTargetUpdateComponent
  ],
  imports: [
    CommonModule,
    DistrictTargetRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DistrictTargetModule { }

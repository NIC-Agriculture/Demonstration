import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  ViewItemForm : FormGroup;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYears: any;
  Season: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  ItemDtails: any;
  viewTargetTable: boolean = false
  message: boolean = false;
  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.pageTitle = 'View Details';
    this.pageDesc = 'View Item details';
    this.breadcrumbList = ['View Item Details'];
    this.ViewItemForm = this.fb.group({
      scheme: ['',[Validators.required]],
      subscheme: ['',[Validators.required]],
      component: ['', [Validators.required]],
      FinYear : ['' , [Validators.required]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getFinYear();
  }
  get ViewItemFormValid() {
    return this.ViewItemForm.controls;
  }

  getFinYear = async() => {
    try {
      const result = await this.layoutService.getFinYear().toPromise()
      this.FinYears = result.Years;
      this.Season = result.Season;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllScheme = async() => {
    try{
      this.ViewItemForm.patchValue({scheme: '', subscheme: '', componentName: ''});
      this.AllSchemeData = []
      this.SubschemeData = []
      this.ComponentData = []
      this.viewTargetTable = false
      this.message = false
      this.AllSchemeData = await this.schemeService.getAllScheme().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try{
      this.ViewItemForm.patchValue({ subscheme: '', componentName: ''});
      this.SubschemeData = []
      this.ComponentData = []
      this.viewTargetTable = false
      this.message = false
      const schemeId =  this.ViewItemForm.value.scheme.schemeId;
      this.SubschemeData =  await this.schemeService.getSubscheme(schemeId).toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.ViewItemForm.patchValue({componentName: ''});
      this.ComponentData = []
      this.viewTargetTable = false
      this.message = false
      const FinYear = this.ViewItemForm.value.FinYear
      const SubschemeId = this.ViewItemForm.value.subscheme.SubschemeId
      this.ComponentData = await this.schemeService.getComponent(FinYear,SubschemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  
  getItemDetails = async() => {
    try{
      const CompId = this.ViewItemForm.value.component.CompId
      const FinYear = this.ViewItemForm.value.FinYear
      this.ItemDtails = await this.schemeService.getItemDetails(CompId,FinYear).toPromise()
      this.viewTargetTable = this.ItemDtails.length > 0 ? true : false
      this.message = this.ItemDtails.length > 0 ? false : true
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

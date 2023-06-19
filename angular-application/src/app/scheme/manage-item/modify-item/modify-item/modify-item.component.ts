import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.css']
})
export class ModifyItemComponent implements OnInit {
  ModifyItemForm : FormGroup;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYears: any;
  Season: any;
  AllSchemeData: any;
  ComponentData: any;
  SubschemeData: any;
  ItemDtails: any;
  Itemcost: any;

  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Modify Item Details';
    this.pageDesc = 'Modify Item details';
    this.breadcrumbList = ['Modify Item Details'];
    this.ModifyItemForm = this.fb.group({
      FinYear: ['', [Validators.required]],
      scheme: ['',[Validators.required]],
      subscheme: ['',[Validators.required]],
      componentName: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      itemType: ['', [Validators.required]],
      indicativeCost: ['', [Validators.required]],
      packageSize: ['', [Validators.required]],
      itemUnit: ['', [Validators.required]],
      status: ['',[Validators.required]]
      

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
      this.ModifyItemForm.patchValue({scheme: '', subscheme: '', componentName: '',itemName:'', itemType: '',indicativeCost:'',packageSize:'',itemUnit:''});
      this.AllSchemeData = []
      this.SubschemeData = []
      this.ComponentData = []
      this.ItemDtails = []
      this.Itemcost = []
      const result = await this.schemeService.getAllScheme().toPromise()
      this.AllSchemeData = result;
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try{
      this.ModifyItemForm.patchValue({ subscheme: '', componentName: '',itemName:'', itemType: '',indicativeCost:'',packageSize:'',itemUnit:''});
      this.SubschemeData = []
      this.ComponentData = []
      this.ItemDtails = []
      this.Itemcost = []
      const schemeId =  this.ModifyItemForm.value.scheme.schemeId
      const result =  await this.schemeService.getSubscheme(schemeId).toPromise()
      this.SubschemeData = result;
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.ModifyItemForm.patchValue({ componentName: '',itemName:'', itemType: '',indicativeCost:'',packageSize:'',itemUnit:''});
      this.ComponentData = []
      this.ItemDtails = []
      this.Itemcost = []
      const FinYear = this.ModifyItemForm.value.FinYear
      const SubschemeId = this.ModifyItemForm.value.subscheme.SubschemeId
      const result = await this.schemeService.getComponent(FinYear,SubschemeId).toPromise()
      this.ComponentData = result;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getItemDetails = async() => {
    try{
      this.ModifyItemForm.patchValue({itemName:'', itemType: '',indicativeCost:'',packageSize:'',itemUnit:''});
      this.ItemDtails = []
      this.Itemcost = []
      const CompId = this.ModifyItemForm.value.componentName.CompId
      const finYear = this.ModifyItemForm.value.FinYear
      console.log(CompId,finYear);
      
      this.ItemDtails = await this.schemeService.getItemDetails(CompId,finYear).toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getItemCostAndSize = async() => {
    try{
      this.ModifyItemForm.patchValue({itemType: '',indicativeCost:'',packageSize:'',itemUnit:''});
      this.Itemcost = []
      const ItemId = this.ModifyItemForm.value.itemName.ItemId
      const finYear = this.ModifyItemForm.value.FinYear
      this.Itemcost = await this.schemeService.getItemCostAndSize(ItemId,finYear).toPromise()
      this.ModifyItemForm.patchValue({ indicativeCost: this.Itemcost[0].IndicativeCost })
      this.ModifyItemForm.patchValue({ packageSize: this.Itemcost[0].itemPackageSize })
      
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  updateItemDetails = async () => {
    try {
     const updateData ={
      CompId: this.ModifyItemForm.value.componentName.CompId,
      ItemId: this.ModifyItemForm.value.itemName.ItemId,
      itemType: this.ModifyItemForm.value.itemType,
      indicativeCost: this.ModifyItemForm.value.indicativeCost,
      packageSize: this.ModifyItemForm.value.packageSize,
      itemUnit: this.ModifyItemForm.value.itemUnit,
      status: this.ModifyItemForm.value.status 
      }
      console.log(updateData);
      
      const result = await this.schemeService.updateItemDetails(updateData).toPromise()
      
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

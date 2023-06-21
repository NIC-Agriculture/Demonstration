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
  showDiv: boolean = false;
  AllCropData: any;
  SubCropData: any;

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
      itemPackageSize: ['', [Validators.required]],
      itemUnit: ['', [Validators.required]],
      status: ['',[Validators.required]],
      crop: [''],
      cropCatagory: ['']
      

    });
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getFinYear();
      this.ModifyItemForm.controls['itemType'].disable();
      this.ModifyItemForm.controls['indicativeCost'].disable();
      this.ModifyItemForm.controls['itemPackageSize'].disable();
      this.ModifyItemForm.controls['itemUnit'].disable();
      this.ModifyItemForm.controls['status'].disable();
  }

  get ModifyItemFormValid() {
    return this.ModifyItemForm.controls;
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
      this.ModifyItemForm.patchValue({scheme: '', subscheme: '', componentName: '',itemName:'', itemType: '',indicativeCost:'',itemPackageSize:'',itemUnit:'',cropCatagory: '',crop: ''});
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
      this.ModifyItemForm.patchValue({ subscheme: '', componentName: '',itemName:'', itemType: '',indicativeCost:'',itemPackageSize:'',itemUnit:'',cropCatagory: '',crop: ''});
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
      this.ModifyItemForm.patchValue({ componentName: '',itemName:'', itemType: '',indicativeCost:'',itemPackageSize:'',itemUnit:'',cropCatagory: '',crop: ''});
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
      this.ModifyItemForm.patchValue({itemName:'', itemType: '',indicativeCost:'',itemPackageSize:'',itemUnit:'',cropCatagory: '',crop: ''});
      this.ItemDtails = []
      this.Itemcost = []
      const CompId = this.ModifyItemForm.value.componentName.CompId
      const finYear = this.ModifyItemForm.value.FinYear

      this.ItemDtails = await this.schemeService.getItemDetails(CompId,finYear).toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getItemCostAndSize = async() => {
    try{
      this.ModifyItemForm.patchValue({itemType: '',indicativeCost:'',itemPackageSize:'',itemUnit:'',cropCatagory: '',crop: ''});
      this.Itemcost = []
      const ItemId = this.ModifyItemForm.value.itemName.ItemId
      const finYear = this.ModifyItemForm.value.FinYear
      this.Itemcost = await this.schemeService.getItemCostAndSize(ItemId,finYear).toPromise()
      
      this.ModifyItemForm.patchValue({ indicativeCost: this.Itemcost[0].IndicativeCost })
      this.ModifyItemForm.patchValue({ itemPackageSize: this.Itemcost[0].itemitemPackageSize })
      
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllCrops = async() => {
    try{
      this.ModifyItemForm.patchValue({crop: ''});
      this.AllCropData = []
      this.AllCropData = await this.schemeService.getAllCrops().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubCrops = async() => {
    try{
      this.SubCropData = []
      const CropId = this.ModifyItemForm.value.cropCatagory.CropId
      this.SubCropData = await this.schemeService.getSubCrops(CropId).toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
}

  edit = () => {
    this.ModifyItemForm.controls['itemType'].enable();
    this.ModifyItemForm.controls['indicativeCost'].enable();
    this.ModifyItemForm.controls['itemPackageSize'].enable();
    this.ModifyItemForm.controls['itemUnit'].enable();
    this.ModifyItemForm.controls['status'].enable();
  }

  updateItemDetails = async () => {
    try {
     const updateData ={
      Fin_Year: this.ModifyItemForm.value.FinYear,
      CompId: this.ModifyItemForm.value.componentName.CompId,
      ItemId: this.ModifyItemForm.value.itemName.ItemId,
      indicativeCost: this.ModifyItemForm.value.indicativeCost,
      itemPackageSize: this.ModifyItemForm.value.itemPackageSize,
      item_unit: this.ModifyItemForm.value.itemUnit,
      Active: this.ModifyItemForm.value.status,
      Technical_Status: this.ModifyItemForm.value.itemType,
      CropId: this.ModifyItemForm.value.cropCatagory.CropId,
      SubCropId: this.ModifyItemForm.value.crop.SubCropId
      }

      const result = await this.schemeService.updateItemDetails(updateData).toPromise()
      this.toastr.success(result.message)
      this.ModifyItemForm.reset()
            
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

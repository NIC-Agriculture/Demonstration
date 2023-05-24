import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-comp-cost-crop-mapping',
  templateUrl: './comp-cost-crop-mapping.component.html',
  styleUrls: ['./comp-cost-crop-mapping.component.css']
})
export class CompCostCropMappingComponent implements OnInit {

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  dataSource: Array<any> = [];
  ComponentForm: FormGroup;
  ComponentList: Array<any> = [];
  FinYear: string = "2022-23";
  loadSubschemeList: any;
  SubschemeData: any;
  AllSchemeData: any;
  ComponentTypeList = {
    CompTypeName: '',
    CompTypeId: ''
  }
  CompTypeId: any;
  cropType: any;
  AllComponentData: any;
  CropData: any;
  AllSubCropData: any;
  AllCropData: any;
  SubCropData: any;

  showtable: boolean = false;
  cropbox: boolean = false;
  fixedCropBox : boolean = false;
  additionalCropBox : boolean = false;
  subCropBox = false;
  fixedSubCropBox = false;
  additionalSubCropBox = false;
  multiselect: boolean = false;
  dropdownSettings:IDropdownSettings={};
  FinYears: any;
  Season: any;
  ComponentData: any;

  editFirstCrop:boolean = false;
  editSecondCrop:boolean = false;
  editAdditionalCrop: boolean = false;
  ComponentCostData: any;

  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Component Input';
    this.pageDesc = 'Add Component Input';
    this.breadcrumbList = ['Component Input'];
    this.ComponentList = []
    this.ComponentForm = this.fb.group({
      Fin_Year : ['' , [Validators.required]],
      schemeName: ['', [Validators.required]],
      SubschemeName: ['', [Validators.required]],
      CompName:['', [Validators.required]],
      Total_Cost: ['', [Validators.required]],
      componentType: [''],
      cropCategory: [''],
      subCrop: [''],
      Seed_Per_ha:[''],
      Unit: [''],
      Cost_of_Seed: [''],
      fixedCropCategory: [''],
      fixedSubCrop: [''],
      fixedSeed_Per_ha:[''],
      fixedUnit: [''],
      fixedCost_of_Seed: [''],
      additionalCropCategory: [''],
      additionalSubCrop: ['' ],
      additionalSeed_Per_ha: [''],
      additionalUnit: [''],
      additionalCost_of_Seed: [''],   
    });
   }

   ngOnInit(): void {
    // this.getAllScheme();
    this.getAllComponent();
    this.getAllSubCrops();
    this.getFinYear();
    // this.getAllCrops();
    setTimeout(() => { 
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    this.dropdownSettings = {
      idField: 'SubCropId',
      textField: 'SubCropName',
    };
    this.ComponentForm.controls['Total_Cost'].disable();
  }

  get ComponentFormValid() {
    return this.ComponentForm.controls;
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
      this.editFirstCrop = false;
      this.editSecondCrop = false;
      this.editAdditionalCrop = false;
      this.AllSchemeData = []
      this.SubschemeData = []
      this.ComponentData = []
      this.ComponentCostData = []
      this.ComponentForm.patchValue({ Total_Cost: '' })
      this.AllSchemeData = await this.schemeService.getAllScheme().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try{
      this.editFirstCrop = false;
      this.editSecondCrop = false;
      this.editAdditionalCrop = false;
      this.SubschemeData = []
      this.ComponentData = []
      this.ComponentCostData = []
      this.ComponentForm.patchValue({ Total_Cost: '' })
      const schemeId = this.ComponentForm.value.schemeName.schemeId
      this.SubschemeData = await this.schemeService.getSubscheme(schemeId).toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.editFirstCrop = false;
      this.editSecondCrop = false;
      this.editAdditionalCrop = false;
      this.ComponentData = []
      this.ComponentCostData = []
      this.ComponentForm.patchValue({ Total_Cost: '' })
      const FinYear = this.ComponentForm.value.Fin_Year
      const SubschemeId = this.ComponentForm.value.SubschemeName.SubschemeId
      this.ComponentData = await this.schemeService.getComponent(FinYear,SubschemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllCrops = async() => {
    try{
      this.AllCropData = []
      this.SubCropData = []
      this.AllCropData = await this.schemeService.getAllCrops().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubCrops = async() => {
      try{
        this.SubCropData = []
        const CropId = this.ComponentForm.value.cropCategory.CropId
        this.SubCropData = await this.schemeService.getSubCrops(CropId).toPromise()
        
      } catch (e){
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
      }
  }

  getAllSubCrops = async() => {
    try{
        this.AllSubCropData = await this.schemeService.getAllSubCrops().toPromise()
    } catch (e){
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  }

  getAllComponent = async() => {
    try{      
      const Fin_Year = this.ComponentForm.value.Fin_Year
      this.AllComponentData = await this.schemeService.getAllComponent(Fin_Year).toPromise()
    } catch (e){
       this.toastr.error('Sorry. Server problem. Please try again.');
       console.error(e);
    }
  }

  getComponentCost = async() => {
    try {
      this.ComponentCostData = []
      this.ComponentForm.patchValue({ Total_Cost: '' })
      const CompId = this.ComponentForm.value.CompName.CompId;
      this.ComponentCostData = await this.schemeService.getComponentCost(CompId).toPromise()
      this.ComponentForm.patchValue({ Total_Cost: this.ComponentCostData.Total_Cost })
      this.ComponentForm.patchValue({ Seed_Per_ha: this.ComponentCostData.Seed_Per_ha })
      this.ComponentForm.patchValue({ Unit: this.ComponentCostData.Unit })
      this.ComponentForm.patchValue({ Cost_of_Seed: this.ComponentCostData.Cost_of_Seed })

      this.ComponentForm.patchValue({ fixedSeed_Per_ha: this.ComponentCostData.Seed_Per_ha })
      this.ComponentForm.patchValue({ fixedUnit: this.ComponentCostData.Unit })
      this.ComponentForm.patchValue({ fixedCost_of_Seed: this.ComponentCostData.Cost_of_Seed })

      this.ComponentForm.patchValue({ additionalSeed_Per_ha: this.ComponentCostData.Seed_Per_ha })
      this.ComponentForm.patchValue({ additionalUnit: this.ComponentCostData.Unit })
      this.ComponentForm.patchValue({ additionalCost_of_Seed: this.ComponentCostData.Cost_of_Seed })

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllComponentType = async() => {
    try{
      const CompTypeId = this.ComponentForm.value.CompName.CompTypeId
      const result = await this.schemeService.getAllComponentType(CompTypeId).toPromise()
      this.ComponentTypeList = result[0]
      if (this.ComponentTypeList.CompTypeId == 'compType_1') {
        this.editFirstCrop = true
        this.editSecondCrop = false
        this.editAdditionalCrop = false
        this.ComponentForm.controls['Total_Cost'].disable();
        this.ComponentForm.controls['cropCategory'].disable();
        this.ComponentForm.controls['subCrop'].disable();
        this.ComponentForm.controls['Seed_Per_ha'].disable();
        this.ComponentForm.controls['Unit'].disable();
        this.ComponentForm.controls['Cost_of_Seed'].disable();
      }else if(this.ComponentTypeList.CompTypeId == 'compType_2'){
        this.editFirstCrop = true
        this.editSecondCrop = true
        this.editAdditionalCrop = false
        this.ComponentForm.controls['Total_Cost'].disable();
        this.ComponentForm.controls['cropCategory'].disable();
        this.ComponentForm.controls['subCrop'].disable();
        this.ComponentForm.controls['Seed_Per_ha'].disable();
        this.ComponentForm.controls['Unit'].disable();
        this.ComponentForm.controls['Cost_of_Seed'].disable();
    
        this.ComponentForm.controls['fixedCropCategory'].disable();
        this.ComponentForm.controls['fixedSubCrop'].disable();
        this.ComponentForm.controls['fixedSeed_Per_ha'].disable();
        this.ComponentForm.controls['fixedUnit'].disable();
        this.ComponentForm.controls['fixedCost_of_Seed'].disable();
      }else if (this.ComponentTypeList.CompTypeId == 'compType_3') {
        this.editFirstCrop = true
        this.editSecondCrop = false
        this.editAdditionalCrop = true
        this.ComponentForm.controls['Total_Cost'].disable();
        this.ComponentForm.controls['cropCategory'].disable();
        this.ComponentForm.controls['subCrop'].disable();
        this.ComponentForm.controls['Seed_Per_ha'].disable();
        this.ComponentForm.controls['Unit'].disable();
        this.ComponentForm.controls['Cost_of_Seed'].disable();
        this.ComponentForm.controls['additionalCropCategory'].disable();
        this.ComponentForm.controls['additionalSubCrop'].disable();
        this.ComponentForm.controls['additionalSeed_Per_ha'].disable();
        this.ComponentForm.controls['additionalUnit'].disable();
        this.ComponentForm.controls['additionalCost_of_Seed'].disable();
      }
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  edit = () => {
    this.ComponentForm.controls['Total_Cost'].enable();
    this.ComponentForm.controls['cropCategory'].enable();
    this.ComponentForm.controls['subCrop'].enable();
    this.ComponentForm.controls['Seed_Per_ha'].enable();
    this.ComponentForm.controls['Unit'].enable();
    this.ComponentForm.controls['Cost_of_Seed'].enable();

    this.ComponentForm.controls['fixedCropCategory'].enable();
    this.ComponentForm.controls['fixedSubCrop'].enable();
    this.ComponentForm.controls['fixedSeed_Per_ha'].enable();
    this.ComponentForm.controls['fixedUnit'].enable();
    this.ComponentForm.controls['fixedCost_of_Seed'].enable();

    this.ComponentForm.controls['additionalCropCategory'].enable();
    this.ComponentForm.controls['additionalSubCrop'].enable();
    this.ComponentForm.controls['additionalSeed_Per_ha'].enable();
    this.ComponentForm.controls['additionalUnit'].enable();
    this.ComponentForm.controls['additionalCost_of_Seed'].enable();

  }

  chooseCrop = () => {
    this.CompTypeId = this.ComponentForm.value.componentType.CompTypeId;
    switch (this.CompTypeId) {
        case 'compType_1':
          this.getAllCrops();
          this.subCropBox = true;
          this.fixedSubCropBox = false;
          this.additionalSubCropBox = false;
          break;
        case 'compType_2':
          this.getAllCrops();
          this.subCropBox = false;
          this.fixedSubCropBox = true;
          this.multiselect = true
          this.additionalSubCropBox = false;
          break;
      
        default:
          this.getAllCrops();
          this.subCropBox = false;
          this.multiselect = false;
          this.fixedSubCropBox = true;
          this.additionalSubCropBox = true;
          break;
    }
    
  }

  AddComponent = () => {
    this.showtable = true;
    if(typeof(this.ComponentForm.value.fixedSubCrop) === 'object'){
      if(this.ComponentForm.value.fixedSubCrop.length != undefined){
        this.ComponentForm.value.fixedSubCrop.forEach((e: any) => {
          this.ComponentForm.value.Fixed_SubCrop.push(e)
        });
      }else{
        this.ComponentForm.value.Fixed_SubCrop.push(this.ComponentForm.value.fixedSubCrop)
      }      
    }

    this.ComponentList.push(this.ComponentForm.value);
    this.subCropBox = false;
    this.fixedSubCropBox = false;
    this.additionalSubCropBox = false;
    this.cropbox = false;
    this.fixedCropBox = false;
    this.additionalCropBox = false;
    // this.ComponentForm.reset(); 
    this.ComponentForm.patchValue({schemeName: '', SubschemeName: '', CompName: '',Total_Cost: '',Seed_Per_ha: '', Unit: '' , Cost_of_Seed:'',Fin_Year:'', Fixed_SubCrop: [],componentType: '', cropType: '', crop: '' , FixedCrop: '' , AdditionalCrop: '' , subCrop: '' , fixedSubCrop: '', additionalSubCrop: '' , cropCategory: ''});
   
  }

  removeComponent = (index: number) => {
    this.ComponentList.splice(index, 1);
  }

  SubmitComponent = async() => {
      try{
         const result = await this.schemeService.SubmitComponent(this.ComponentList).toPromise()
         if(result){
          this.toastr.success(result.message);
          this.getAllComponent();
          this.ComponentForm.reset();
          this.ComponentList = [];
          this.showtable = false;
         } else {
          this.toastr.error("Something Went Wrong.Try again.");
         } 
                  
      } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
        }
    // finally{
    //   this.clicked= false;
    // }
    
  }

  UpdateComponentCost = async() => {
    try {
      const UpdatedData = {
        Total_Cost: this.ComponentForm.value.Total_Cost,
        CropId: this.ComponentForm.value.cropCategory.CropId,
        SubCropId: this.ComponentForm.value.subCrop.SubCropId,
        Seed_Per_ha: this.ComponentForm.value.Seed_Per_ha,
        Unit: this.ComponentForm.value.Unit,
        Cost_of_Seed: this.ComponentForm.value.Cost_of_Seed,

       fixedCropId: this.ComponentForm.value.fixedCropCategory.CropId,
       fixedSubCropId:  this.ComponentForm.value.fixedSubCrop.SubCropId,
       fixedSeed_Per_ha: this.ComponentForm.value.fixedSeed_Per_ha,
       fixedUnit: this.ComponentForm.value.fixedUnit, 
       fixedCost_of_Seed: this.ComponentForm.value.fixedCost_of_Seed,
       
       additionalCropId: this.ComponentForm.value.additionalCropCategory.CropId,
       additionalSubCropId: this.ComponentForm.value.additionalSubCrop.SubCropId,
       additionalSeed_Per_ha: this.ComponentForm.value.additionalSeed_Per_ha,
       additionalUnit: this.ComponentForm.value.additionalUnit,
       additionalCost_of_Seed: this.ComponentForm.value.additionalCost_of_Seed

      }
      console.log(UpdatedData);
      
      // const result = await this.schemeService.UpdateComponentCost(UpdatedData).toPromise()
      // this.toastr.success(result.message);
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
      
    }
  }

}

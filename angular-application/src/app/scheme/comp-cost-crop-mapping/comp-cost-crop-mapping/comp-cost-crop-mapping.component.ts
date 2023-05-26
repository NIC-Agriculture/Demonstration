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
  ComponentCropDetails: any;
  SecondSubCropData: any;
  additionalSubCropData: any;

  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Update Component details';
    this.pageDesc = 'Update Component cost and crop details';
    this.breadcrumbList = ['Update Component details'];
    this.ComponentList = []
    this.ComponentForm = this.fb.group({
      Fin_Year : ['' , [Validators.required]],
      schemeName: ['', [Validators.required]],
      SubschemeName: ['', [Validators.required]],
      CompName:['', [Validators.required]],
      Total_Cost: ['', [Validators.required]],
      Season : ['',[Validators.required]],
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
      this.ComponentForm.patchValue({ Total_Cost: '' , Season: '' , componentType: '' })
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
      this.ComponentForm.patchValue({ Total_Cost: '' , Season: '' , componentType: ''})
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
      this.ComponentForm.patchValue({ Total_Cost: '' , Season: '', componentType: ''})
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
      this.AllCropData = await this.schemeService.getAllCrops().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubCrops = async(cropCategory:any,cropPhase:any) => {
      try{
        const result = await this.schemeService.getSubCrops(cropCategory.CropId).toPromise()
        if (cropPhase == 'FirstCrop') {
          this.SubCropData=[]
          this.ComponentForm.patchValue({subCrop: ''})
          this.SubCropData = result
          
        } else if (cropPhase == 'SecondCrop') {
          this.SecondSubCropData =[]
          this.ComponentForm.patchValue({subCrop: ''})
          this.SecondSubCropData = result
        } else {
          this.additionalSubCropData=[]
          this.ComponentForm.patchValue({subCrop: ''})
          this.additionalSubCropData = result
        }
        
        
      } catch (e){
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
      }
  }

  getComponentCost = async() => {
    try {  
      
      this.ComponentCostData = []
      this.ComponentForm.patchValue({ Total_Cost: '' , Season: '', componentType: ''})
      const Fin_Year = this.ComponentForm.value.Fin_Year
      const CompId = this.ComponentForm.value.CompName.CompId;
      this.ComponentCostData = await this.schemeService.getComponentCost(CompId,Fin_Year).toPromise()
      this.ComponentCropDetails = await this.schemeService.getComponentCropDetails(CompId,Fin_Year).toPromise()
      
      
      this.ComponentForm.patchValue({ Season: this.ComponentForm.value.CompName.Season })
      this.ComponentForm.patchValue({ Total_Cost: this.ComponentCostData.Total_Cost })
      this.ComponentForm.patchValue({ Seed_Per_ha: this.ComponentCropDetails.Seed_Per_ha })
      this.ComponentForm.patchValue({ Unit: this.ComponentCropDetails.Unit })
      this.ComponentForm.patchValue({ Cost_of_Seed: this.ComponentCropDetails.Cost_of_Seed })

      this.ComponentForm.patchValue({ fixedSeed_Per_ha: this.ComponentCropDetails.FixedCropSeedPerha })
      this.ComponentForm.patchValue({ fixedUnit: this.ComponentCropDetails.FixedCropUnit })
      this.ComponentForm.patchValue({ fixedCost_of_Seed: this.ComponentCropDetails.FixedCrop_CostofSeed })

      this.ComponentForm.patchValue({ additionalSeed_Per_ha: this.ComponentCropDetails.AdditionalCropSeedPerha })
      this.ComponentForm.patchValue({ additionalUnit: this.ComponentCropDetails.AdditionalCropUnit })
      this.ComponentForm.patchValue({ additionalCost_of_Seed: this.ComponentCropDetails.AdditionalCrop_CostofSeed })

    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponentTypeDetails = async() => {
    try{
      const CompTypeId = this.ComponentForm.value.CompName.CompTypeId
      const result = await this.schemeService.getComponentTypeDetails(CompTypeId).toPromise()
      this.ComponentTypeList = result
      if (this.ComponentTypeList.CompTypeId == 'compType_1') {
        this.editFirstCrop = true
        this.editSecondCrop = false
        this.editAdditionalCrop = false
        this.ComponentForm.controls['Season'].disable();
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
        this.ComponentForm.controls['Season'].disable();
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
        this.ComponentForm.controls['Season'].disable();
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
    this.ComponentForm.controls['Season'].enable();
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
          // this.getAllCrops();
          this.subCropBox = true;
          this.fixedSubCropBox = false;
          this.additionalSubCropBox = false;
          break;
        case 'compType_2':
          // this.getAllCrops();
          this.subCropBox = false;
          this.fixedSubCropBox = true;
          this.multiselect = true
          this.additionalSubCropBox = false;
          break;
      
        default:
          // this.getAllCrops();
          this.subCropBox = false;
          this.multiselect = false;
          this.fixedSubCropBox = true;
          this.additionalSubCropBox = true;
          break;
    }
    
  }

  UpdateComponentCost = async() => {
    try {
      const UpdatedData = {

        Fin_Year : this.ComponentForm.value.Fin_Year,
        CompId : this.ComponentForm.value.CompName.CompId,
        Season : this.ComponentForm.value.Season,
        Total_Cost: this.ComponentForm.value.Total_Cost,
        CropId: this.ComponentForm.value.cropCategory.CropId,
        SubCropId: this.ComponentForm.value.subCrop.SubCropId,
        Seed_Per_ha: this.ComponentForm.value.Seed_Per_ha,
        Unit: this.ComponentForm.value.Unit,
        Cost_of_Seed: this.ComponentForm.value.Cost_of_Seed,

        FixedCropId: this.ComponentForm.value.fixedCropCategory.CropId,
        FixedSubCropId:  this.ComponentForm.value.fixedSubCrop.SubCropId,
        FixedCropSeedPerha: this.ComponentForm.value.fixedSeed_Per_ha,
        FixedCropUnit: this.ComponentForm.value.fixedUnit, 
        FixedCrop_CostofSeed: this.ComponentForm.value.fixedCost_of_Seed,
       
        AdditionalCropId: this.ComponentForm.value.additionalCropCategory.CropId,
        AdditionalSubCropId: this.ComponentForm.value.additionalSubCrop.SubCropId,
        AdditionalCropSeedPerha: this.ComponentForm.value.additionalSeed_Per_ha,
        AdditionalCropUnit: this.ComponentForm.value.additionalUnit,
        AdditionalCrop_CostofSeed: this.ComponentForm.value.additionalCost_of_Seed

      }
      const result = await this.schemeService.UpdateComponentCostCropMapping(UpdatedData).toPromise()
      this.toastr.success(result.message);
      this.ComponentForm.reset()
      this.editFirstCrop = false
      this.editSecondCrop = false
      this.editAdditionalCrop = false
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
      
    }
  }

  getAllComponent = async() => {
    try{   
       const Fin_Year = this.ComponentForm.value.Fin_Year
       const SubschemeId = this.ComponentForm.value.SubschemeName.SubschemeId
       this.AllComponentData = await this.schemeService.getComponent(Fin_Year , SubschemeId).toPromise()
    } catch (e){
       this.toastr.error('Sorry. Server problem. Please try again.');
       console.error(e);
    }
  }

}

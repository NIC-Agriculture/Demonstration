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
  ComponentTypeList: any;
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
      schemeName: ['', [Validators.required]],
      SubschemeName: ['', [Validators.required]],
      CompName:['', [Validators.required]],
      componentType: ['', [Validators.required]],
      // AdditionalCrop: [''],
      // FixedCrop: [''],
      cropCategory: [''],
      subCrop: [''],
      fixedSubCrop: [''],
      additionalSubCrop: [''],
      Fixed_SubCrop: [[]],
      Total_Cost: ['', [Validators.required]],
      Seed_Per_ha:['', [Validators.required]],
      Unit: ['', [Validators.required]],
      Cost_of_Seed: ['' , [Validators.required]],
      Fin_Year : ['' , [Validators.required]]
    });
   }

   ngOnInit(): void {
    this.getAllScheme();
    this.getAllComponent();
    this.getAllComponentType();
    this.getAllSubCrops();
    this.getFinYear();
    setTimeout(() => { 
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
    this.dropdownSettings = {
      idField: 'SubCropId',
      textField: 'SubCropName',
    };
  
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
      this.AllSchemeData = await this.schemeService.getAllScheme().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try{
      const schemeId = this.ComponentForm.value.schemeName.schemeId
      this.SubschemeData = await this.schemeService.getSubscheme(schemeId).toPromise()
    } catch (e){
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

  getSubCrops = async(CropId: any) => {
      try{
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

  getAllComponentType = async() => {
    try{
      this.ComponentTypeList = await this.schemeService.getAllComponentType().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
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

}

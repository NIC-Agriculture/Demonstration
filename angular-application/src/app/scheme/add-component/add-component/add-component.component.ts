import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {
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
      Fin_Year : ['' , [Validators.required]],
      Season : ['', [Validators.required]]
    });
   }


  ngOnInit(): void {
    this.getAllScheme();
    this.getAllComponentType();
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
      console.log(this.Season);
      
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

  getComponent = async() => {
    try{   
       const Fin_Year = this.ComponentForm.value.Fin_Year
       const SubschemeId = this.ComponentForm.value.SubschemeName.SubschemeId
       this.AllComponentData = await this.schemeService.getComponent(Fin_Year , SubschemeId).toPromise()
    } catch (e){
       this.toastr.error('Sorry. Server problem. Please try again.');
       console.error(e);
    }
  }

  getAllComponentType = async() => {
    try{
      const CompTypeId = this.ComponentForm.value.CompName.CompTypeId
      this.ComponentTypeList = await this.schemeService.getAllComponentType(CompTypeId).toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

 
  AddComponent = () => {
    this.showtable = true;
    this.ComponentList.push(this.ComponentForm.value);    
    this.ComponentForm.patchValue({ SubschemeName: '' , componentType: '' , CompName: '' , Season: ''});
   
  }

  removeComponent = (index: number) => {
    this.ComponentList.splice(index, 1);
  }

  SubmitComponent = async() => {
      try{
         const result = await this.schemeService.SubmitComponent(this.ComponentList).toPromise()
         if(result){
          this.toastr.success(result.message);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  AddCompItemForm : FormGroup;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  showtable: boolean = false;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentTypeList: any;
  CompItemList: Array<any> = [];
  FinYears: any;
  ComponentData: any;
  Season: any;

  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Add Details';
    this.pageDesc = 'Add Component and Item details';
    this.breadcrumbList = ['Add Item Details'];
    this.AddCompItemForm = this.fb.group({
      scheme: ['',[Validators.required]],
      subscheme: ['',[Validators.required]],
      componentName: ['', [Validators.required]],
      FinYear: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      itemType: ['', [Validators.required]],
      packageSize: [''],
      itemUnit: [''],
      indicativeCost: ['', [Validators.required]],

    });
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getAllScheme();
      this.getFinYear();
      this.CompItemList= [];
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
      const result = await this.schemeService.getAllScheme().toPromise()
      this.AllSchemeData = result;
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try{
      const schemeId =  this.AddCompItemForm.value.scheme.schemeId
      const result =  await this.schemeService.getSubscheme(schemeId).toPromise()
      this.SubschemeData = result;
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      const SubschemeId = this.AddCompItemForm.value.subscheme.SubschemeId
      const result = await this.schemeService.getComponent(SubschemeId).toPromise()
      this.ComponentData = result;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  AddItem = () => {
    // this.CompItemList= [];
    this.showtable = true;
    this.CompItemList.push(this.AddCompItemForm.value);
    this.AddCompItemForm.patchValue({scheme: '', subscheme: '', componentName: '', itemType: '', FinYear: '' , itemName: '' , packageSize: '' , itemUnit: '', indicativeCost: ''});
    
  }
  
  removeItemList = (index: number) => {
    this.CompItemList.splice(index, 1);
  }

  SubmitCompItemDetails = async() => {
    try{
          const compItemData = this.CompItemList.map((e:any) => {
            return{
              schemeId: e.scheme.schemeId,
              SubschemeId: e.subscheme.SubschemeId,
              CompId: e.componentName.CompId,
              Fin_Year: e.FinYear,
              ItemName: e.itemName,
              Technical_Status: e.itemType,
              itemPackageSize: e.packageSize,
              item_unit: e.itemUnit,
              IndicativeCost: e.indicativeCost,
            }
            
          })
          const result = await this.schemeService.SubmitCompItemDetails(compItemData).toPromise()
          if(result){
            this.toastr.success('Item Details are added successfully');
            this.AddCompItemForm.reset();
            this.CompItemList = [];
            this.showtable = false;
          }else{
            this.toastr.error("Something Went Wrong.Try again.");
          }
       
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  
  }

}

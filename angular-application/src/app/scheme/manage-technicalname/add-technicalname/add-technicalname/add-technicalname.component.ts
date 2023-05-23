import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-add-technicalname',
  templateUrl: './add-technicalname.component.html',
  styleUrls: ['./add-technicalname.component.css']
})
export class AddTechnicalnameComponent implements OnInit {
  AddItemTechForm: FormGroup;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYears: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  ItemData: any;
  ItemTechnicalList: Array<any> = [];

  showtable: boolean = false;
  Season: any;

  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private cdaoService: CdaoService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Add Details';
    this.pageDesc = 'Add Item and Technicalname details';
    this.breadcrumbList = ['Add Details'];
    this.AddItemTechForm = this.fb.group({
      scheme: ['', [Validators.required]],
      subscheme: ['', [Validators.required]],
      componentName: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      Crop: ['', [Validators.required]],
      TechnicalName: ['', [Validators.required]],
      FinYear: ['', [Validators.required]],

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
    this.ItemTechnicalList = [];
  }

  getFinYear = async () => {
    try {
      const result = await this.layoutService.getFinYear().toPromise()
      this.FinYears = result.Years;
      this.Season = result.Season;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllScheme = async () => {
    try {
      const result = await this.schemeService.getAllScheme().toPromise()
      this.AllSchemeData = result;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async () => {
    try {
      const schemeId = this.AddItemTechForm.value.scheme.schemeId
      const result = await this.schemeService.getSubscheme(schemeId).toPromise()
      this.SubschemeData = result;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async () => {
    try {
      const FinYear = this.AddItemTechForm.value.FinYear
      const SubschemeId = this.AddItemTechForm.value.subscheme.SubschemeId
      const result = await this.schemeService.getComponent(FinYear,SubschemeId).toPromise()
      this.ComponentData = result;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  getItems = async () => {
    try {
      const CompId = this.AddItemTechForm.value.componentName.CompId
      const result = await this.cdaoService.getItems(CompId).toPromise()
      this.ItemData = result;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  AddTechnicalname = () => {
    this.ItemTechnicalList= [];
    this.showtable = true;
    this.ItemTechnicalList.push(this.AddItemTechForm.value);
    this.AddItemTechForm.patchValue({scheme: '', subscheme: '', componentName: '', itemName:'',Crop: '', TechnicalName: '', FinYear: ''});
  }
  
  removeTechnicalList = (index: number) => {
    this.ItemTechnicalList.splice(index, 1);
  }

  SubmitItemTechDetails = async () => {
    try {
      // console.log(this.ItemTechnicalList);
      const ItemTechData = this.ItemTechnicalList.map((e:any) => {
        return{
          schemeId: e.scheme.schemeId,
          SubschemeId: e.subscheme.SubschemeId,
          CompId: e.componentName.CompId,
          ItemId: e.itemName.ItemId,
          TechnicalName: e.TechnicalName,
          Fin_Year: e.FinYear,
        }
      })
      const result = await this.schemeService.SubmitItemTechDetails(ItemTechData).toPromise() 
      if(result){
        this.toastr.success('Item and Technicalname Details are added successfully');
        this.AddItemTechForm.reset();
        this.ItemTechnicalList = [];
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

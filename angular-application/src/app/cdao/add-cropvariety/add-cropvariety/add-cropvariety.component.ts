import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-add-cropvariety',
  templateUrl: './add-cropvariety.component.html',
  styleUrls: ['./add-cropvariety.component.css']
})
export class AddCropvarietyComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  addVarietyForm: any;
  cropCatagory: any;
  crop: any;
  CropVariety: Array<any> = [];
  showtable: boolean = false
  allVarietyData: Array<any> = [];
  cropVarietyBox: boolean = false
  addnewButton: boolean = true
  message: boolean = false
  filteredList1: any;


  constructor(
    private cdaoService: CdaoService,
    private fb : FormBuilder,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
  ) {
    this.pageTitle = 'Add Crop Variety';
    this.pageDesc = 'Add Crop Variety';
    this.breadcrumbList = ['Add Crop Variety'];
    this.addVarietyForm = this.fb.group({
      cropCatagory: ["", [Validators.required]],
      crop: ["", [Validators.required]],
      AvailablecropVariety: [""],
      cropVariety: ["", [Validators.required]],
     })
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getCropCatagory();
  }

  get FormValid() {
    return this.addVarietyForm.controls;
  }

  getCropCatagory = async() => {
    try {
      this.addVarietyForm.controls['cropVariety'].reset()
      this.cropCatagory = await this.cdaoService.getCropCatagory().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getCrop = async() => {
    try {
      this.CropVariety  = [];
      this.addVarietyForm.controls['cropVariety'].reset()
      this.addVarietyForm.controls['AvailablecropVariety'].reset()
      const cropId = this.addVarietyForm.value.cropCatagory.CropId
      this.crop = await this.cdaoService.getCrop(cropId).toPromise()      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getCropVariety = async() => {
    try {
      const SubCropId = this.addVarietyForm.value.crop.SubCropId
      const result = await this.cdaoService.getCropVariety(SubCropId).toPromise()
      this.CropVariety = [...this.CropVariety,...result];
      this.filteredList1 = this.CropVariety;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  show = () =>{
    this.cropVarietyBox = true;
    this.addnewButton = false;
  }

  AddVarietyData = () => {
    this.showtable = true;
    this.message = false;
    this.addVarietyForm.controls['AvailablecropVariety'].reset()
    let varietyFormData = {
      cropCatagory: this.addVarietyForm.value.cropCatagory.CropName,
      cropName: this.addVarietyForm.value.crop.SubCropName,
      SubCropId: this.addVarietyForm.value.crop.SubCropId,
      Variety_Name: this.addVarietyForm.value.cropVariety,
    }
    this.allVarietyData.push(varietyFormData);
    this.cropVarietyBox = false;
    this.addnewButton = true;
    this.addVarietyForm.controls['cropVariety'].reset()
  }

  remove(i: any) {
    this.allVarietyData.splice(i, 1)
  }

  AddCropVariety = async() => {
    try {
      const result = await this.cdaoService.AddCropVariety(this.allVarietyData).toPromise();
      this.toastr.success(result.message);
      this.allVarietyData = [];
      this.addVarietyForm.reset();
      this.showtable = false;
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service'

@Component({
  selector: 'app-add-sub-scheme',
  templateUrl: './add-sub-scheme.component.html',
  styleUrls: ['./add-sub-scheme.component.css']
})
export class AddSubSchemeComponent implements OnInit {
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  SubschemeForm: FormGroup;
  subSchemeList: Array<any>;
  loadSubschemeList: any;
  AllSubschemeData: any;
  AllSchemeData: any;
  FinYears: any;
  Season: any;
  
  showtable: boolean = false;
  clicked:boolean = false;

  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Subscheme Input';
    this.pageDesc = 'Add Subscheme Input';
    this.breadcrumbList = ['Subscheme Input'];
    this.subSchemeList = []
    this.SubschemeForm = fb.group({
      schemeName: ['', [Validators.required]],
      SubschemeName: ['', [Validators.required]],
      Fin_Year : ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.getFinYear();
    this.getAllScheme();
    this.getAllSubscheme()
    setTimeout(() => { 
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
  }

  get SubSchemeValid() {
    return this.SubschemeForm.controls;
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

  getAllSubscheme = async() => {
    try{
      this.AllSubschemeData = await this.schemeService.getAllSubscheme().toPromise()
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  AddSubscheme = (event: MouseEvent) => {
    (event.target as HTMLButtonElement).disabled = true;
    this.showtable = true
    this.subSchemeList.push(this.SubschemeForm.value);
    this.SubschemeForm.reset();
  }

  removeSubscheme = (index: number) => {
    this.subSchemeList.splice(index, 1); 
  }

  SubmitSubscheme = async() => {
    try{
        const result = await this.schemeService.SubmitSubscheme(this.subSchemeList).toPromise()
          if(result){
            this.toastr.success('Subscheme Details added successfully');
            this.getAllSubscheme();
            this.SubschemeForm.reset();
            this.subSchemeList = [];
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




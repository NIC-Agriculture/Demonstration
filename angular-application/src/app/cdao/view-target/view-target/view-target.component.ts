import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-view-target',
  templateUrl: './view-target.component.html',
  styleUrls: ['./view-target.component.css']
})
export class ViewTargetComponent implements OnInit {
  ViewTargetForm: FormGroup;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  FinYears: any;
  AllSchemeData: any;
  ComponentCostData: any;

  
  totalPhy: number = 0;
  totalFin: number = 0;
  totalPhyByDistrict: number = 0;
  totalFinByDistrict: number = 0;
  totalPhyGen: number = 0;
  totalFinGen: number = 0;
  totalPhySCP: number = 0;
  totalFinSCP: number = 0;
  totalPhyTASP: number = 0;
  totalFinTASP: number = 0;

  viewTargetCard: boolean = false;
  SubschemeData: any;
  ComponentData: any;
  BlockData: any;
  BlockTargetData: any;
  DistrictTargetData: any;
  totalTarget: any;
  Season: any;
  ItemTechnicalName: any;
  modalTable: boolean = false
  modalMessage: boolean = false
  message: boolean = false;
  fileName= 'blockTargetReport.xlsx';
 

  constructor(
    private cdaoService: CdaoService,
    private schemeService: SchemeserviceService,
    private fb: FormBuilder,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService
  ) { 
    this.pageTitle = 'Target Monitoring';
    this.pageDesc = 'View Target for Blocks';
    this.breadcrumbList = ['View Target to Blocks'];
    this.ViewTargetForm = this.fb.group({
      FinYear: ['', [Validators.required]],
      scheme: ['', [Validators.required]],
      subscheme: ['', [Validators.required]],
      component: ['', [Validators.required]],
      subsidy: ['', [Validators.required]],
    });

  }

  ngOnInit(): void { 
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.ViewTargetForm.controls['subsidy'].disable();
    this.loadBlocks()
    this.getFinYear();
  }

  get viewFormValid() {
    return this.ViewTargetForm.controls;
  }

  getFinYear = async() => {
    try{
      const result = await this.layoutService.getFinYear().toPromise()
      this.FinYears = result.Years;
      this.Season = result.Season;
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllScheme = async() => {
    try {
      this.ViewTargetForm.patchValue({scheme: '', subscheme : '', component : '',subsidy: ''})
      this.AllSchemeData = []; this.SubschemeData = []; this.ComponentData = []; this.ComponentCostData = []
      this.viewTargetCard = false;
      this.AllSchemeData = await this.cdaoService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      this.ViewTargetForm.patchValue({ subscheme : '', component : '',subsidy: ''})
      this.SubschemeData = []; this.ComponentData = []; this.ComponentCostData = []
      this.viewTargetCard = false;
      this.ViewTargetForm.patchValue({ subscheme : '' })
      const schemeId = this.ViewTargetForm.value.scheme.schemeId
      this.SubschemeData = await this.cdaoService.getSubscheme(schemeId).toPromise()
      this.ViewTargetForm.patchValue({ component : '' })      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.ViewTargetForm.patchValue({component : '',subsidy: ''})
       this.ComponentData = []; this.ComponentCostData = []
      this.viewTargetCard = false;
      this.ViewTargetForm.patchValue({ component : '' })
      const SubschemeId = this.ViewTargetForm.value.subscheme.SubschemeId
      const Fin_Year = this.ViewTargetForm.value.FinYear
      this.ComponentData = await this.cdaoService.getComponent(SubschemeId , Fin_Year).toPromise();
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  
  getComponentCost = async() => {
    try{
      this.ViewTargetForm.patchValue({subsidy: ''})
      this.ComponentCostData = []
      this.viewTargetCard = false;
      const CompId = this.ViewTargetForm.value.component.CompId;
      this.ComponentCostData = await this.cdaoService.getComponentCost(CompId).toPromise()
      this.ViewTargetForm.patchValue({ subsidy : this.ComponentCostData[0].Total_Cost })
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  loadBlocks = async() => {
    try {
       this.BlockData = await this.cdaoService.getBlocks().toPromise()
    } catch (e) {
       this.toastr.error('Sorry. Server problem. Please try again.');
       console.error(e);
    }
  }

  loadDistrictTarget = async() => {
    try {
         this.viewTargetCard = true;
         const CompId = this.ViewTargetForm.value.component.CompId;
         const Fin_Year = this.ViewTargetForm.value.FinYear
         this.DistrictTargetData = await this.cdaoService.getDistrictTarget(CompId, Fin_Year).toPromise()
        
         if(this.DistrictTargetData.length > 0) {
            this.totalPhyGen = this.DistrictTargetData[0].avl_phygen;
            this.totalFinGen = this.DistrictTargetData[0].DistributedPhyGen ;
            this.totalPhySCP = this.DistrictTargetData[0].avl_physcp;
            this.totalFinSCP = this.DistrictTargetData[0].DistributedPhySCP;
            this.totalPhyTASP = this.DistrictTargetData[0].avl_phytasp;
            this.totalFinTASP = this.DistrictTargetData[0].DistributedPhyTASP;
            this.totalPhy = +this.totalPhyGen + +this.totalPhySCP + +this.totalPhyTASP;
            this.totalFin = this.totalFinGen + this.totalFinSCP + this.totalFinTASP;

         }else {
            this.totalPhyGen = 0;
            this.totalFinGen = 0;
            this.totalPhySCP = 0;
            this.totalFinSCP = 0;
            this.totalPhyTASP = 0;
            this.totalFinTASP = 0;
            this.totalPhy = 0;
            this.totalFin = 0;
         }
           
         this.loadBlockTargetData();
    } catch (e) {
     this.toastr.error('Sorry. Server problem. Please try again.');
     console.error(e);
    }
  }

  loadBlockTargetData = async() => {
    try {
         const CompId = this.ViewTargetForm.value.component.CompId;
         const Fin_Year = this.ViewTargetForm.value.FinYear
         this.BlockTargetData = await this.cdaoService.getBlockTargetData(CompId , Fin_Year).toPromise()
           
         this.totalTarget = 0
         if(this.BlockTargetData.length > 0) {
            this.BlockTargetData.forEach((y: any) => {
                this.BlockData.forEach((e: any) => {
                    if(y.Block_Code == e.Block_Code){
                          e.PhyGen =  y.avl_phygen,
                          e.FinGen = y.DistributedPhyGen,
                          e.PhySCP =  y.avl_physcp,
                          e.FinSCP =  y.DistributedPhySCP,
                          e.PhyTASP = y.avl_phytasp,
                          e.FinTASP = y.DistributedPhyTASP,
                          e.totalPhyByDistrict = +e.PhyGen + +e.PhySCP + +e.PhyTASP,
                          e.totalFinByDistrict = +e.FinGen + +e.FinSCP + +e.FinTASP;
                          e.totalPhyByBlock = +e.PhyGen + +e.PhySCP + +e.PhyTASP; 
                          e.totalFinByBlock = +e.FinGen + +e.FinSCP + +e.FinTASP;
                          e.totalTarget = y.totalTarget
                          this.totalTarget += +y.totalTarget
                          // console.log(e);
                          
                          return e;
                      }
                  });
              }) 
            }else{
                    this.BlockData.forEach((e: any) => {
                        e.PhyGen = 0;
                        e.PhySCP = 0;
                        e.PhyTASP = 0;
                        e.FinGen = 0;
                        e.FinSCP = 0;
                        e.FinTASP = 0;
                    })
            }
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  }
  
  // getItemNameAndTechnicalName = async() => {
  //   try {
  //     const CompId = this.ViewTargetForm.value.component.CompId
  //     const Fin_Year = this.ViewTargetForm.value.FinYear
  //     const SubschemeId = this.ViewTargetForm.value.subscheme.SubschemeId
  //     this.ItemTechnicalName = await this.cdaoService.getItemNameAndTechnicalName(CompId,Fin_Year,SubschemeId).toPromise()
      
  //     this.ItemTechnicalName.length > 0 ? (this.modalTable = true, this.modalMessage = false) : (this.modalTable = false,this.modalMessage = true)
      
  //   } catch (e) {
  //     this.toastr.error('Sorry. Server problem. Please try again.');
  //     console.error(e);
  //   }
  // }

  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
}

}

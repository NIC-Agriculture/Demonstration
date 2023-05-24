import { Component, OnInit } from '@angular/core';
import { CdaoService } from 'src/app/services/cdao/cdao.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-block-target',
  templateUrl: './block-target.component.html',
  styleUrls: ['./block-target.component.css']
})
export class BlockTargetComponent implements OnInit {
  BlockTargetForm: any;
  PhyGen: number = 0;
  FinGen: number = 0;
  PhySCP: number = 0;
  FinSCP: number = 0;
  PhyTASP: number = 0;
  FinTASP: number = 0;
  totalPhyByBlock: number = 0;
  totalFinByBlock: number = 0;
  // block: any;
  BlockData: any;
  scheme: any;
  subscheme: any;
  component: any;
  subComponent: any;
  item: any;
  crop: any;
  season: any;
  subsidy: any = 0;
  FinYears: any;
  totalPhy: number = 0;
  totalFin: number = 0;
  totalPhyGen: number = 0;
  totalFinGen: number = 0;
  totalPhySCP: number = 0;
  totalFinSCP: number = 0;
  totalPhyTASP: number = 0;
  totalFinTASP: number = 0;
  AllDistrictData: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  ItemData: any;
  cropCategory: any;
  technicalName:any;
  totalCost:any;
  ComponentCostData: any;
  DistrictTargetData: any;
  BlockTargetData: any;
  BlockTargetDetailsList: Array<any>;
  BlockTargetResult: any;
  Block_Name: any;

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  dataSource: Array<any> = [];
  totalTarget: number = 0;
  dropdownList: Array<any> = [];
  dropdownSettings:IDropdownSettings={};
  cropData: any;
  SubCropData: any;
  selectedTarget: any = {}

  select1: boolean = false;
  multiselect: boolean = true;
  showUpdate: boolean = false;
  showSubmit: boolean = false;
  BlockTargetList: Array<any> = [];
  showAddtable: boolean = false;
  showComponent: boolean = true;
  showTarget: boolean = false
  setTargetButton: boolean = true;
  TechnicalData: Array<any> = [];
  CropVariety: Array<any> = [];
  bpSubCropData: any;
  bpCropVarietyData: any;
  bp_ItemId: any;
  totalPhyGenAllBlock: number= 0;
  totalPhyScpAllBlock: number = 0;
  totalPhyTaspAllBlock: number = 0;
  submitPage: boolean = false;
  showOtherInputs: boolean = false;
  setModifyButton: boolean = false;
  CompTargetData: Array<any> = [];
  ItemTechDetails: Array<any> = [];
  // showView: boolean = false;
  filteredList1: any;
  clicked = false;
  Season: any;

  constructor(
    private cdaoService: CdaoService,
    private layoutService: LayoutserviceService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.pageTitle = 'Target';
    this.pageDesc = 'Set Target for Blocks';
    this.breadcrumbList = ['Set Target to Districts'];
    this.BlockTargetDetailsList = []
    this.BlockTargetForm = this.fb.group({
      // block: [""],
      scheme: ["", [Validators.required]],
      subscheme: ["", [Validators.required]],
      component: ["", [Validators.required]],
      // item: ["", [Validators.required]],
      bp_status: ["", [Validators.required]],
      cropCategory: [""],
      cropVariety : ["",[Validators.required]],
      subCrop: [""],
      // technicalName: ["", [Validators.required]],
      totalCost: ["", [Validators.required]],
      bpCropVariety: [""],
      bpSubCrop: [""],
      FinYear: ["", [Validators.required]],
     })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.getFinYear();
    this.loadBlocks();
    this.getAllScheme();
    this.dropdownSettings = {
      idField: 'Variety_Code',
      textField: 'Variety_Name',
      allowSearchFilter : true
    };
  }

  get BlockFormValid() {
    this.BlockTargetForm.controls['totalCost'].disable(); 
    return this.BlockTargetForm.controls;
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
  

  loadBlocks = async() => {
    try {
      this.BlockData = await this.cdaoService.getBlocks().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllScheme = async() => {
    try {
      this.AllSchemeData = await this.cdaoService.getAllScheme().toPromise()
      this.getSubscheme();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      this.BlockTargetForm.patchValue({ subscheme : '' })
      const schemeId = this.BlockTargetForm.value.scheme.schemeId
      this.SubschemeData = await this.cdaoService.getSubscheme(schemeId).toPromise()
      this.BlockTargetForm.patchValue({ component : '' })
      this.getComponent();      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      this.BlockTargetForm.patchValue({ component : '' })
      const SubschemeId = this.BlockTargetForm.value.subscheme.SubschemeId
      const Fin_Year = this.BlockTargetForm.value.FinYear
      this.ComponentData = await this.cdaoService.getComponent(SubschemeId , Fin_Year).toPromise()
      this.getCrops();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  
  getComponentCost = async() => {
    try{
      const CompId = this.BlockTargetForm.value.component.CompId;
      this.ComponentCostData = await this.cdaoService.getComponentCost(CompId).toPromise()
      this.BlockTargetForm.patchValue({ totalCost : this.ComponentCostData[0].Total_Cost })
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getCrops = async() => {
    try {
        const SubschemeId = this.BlockTargetForm.value.subscheme.SubschemeId
        const CompId = this.BlockTargetForm.value.component.CompId;
        this.cropData = await this.cdaoService.getCrops(SubschemeId,CompId).toPromise()
        this.getSubCrop()
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  }

  getSubCrop = async() => {
    try {
          const CompId = this.BlockTargetForm.value.component.CompId;
          const CompTypeId = this.BlockTargetForm.value.component.CompTypeId
          this.SubCropData = await this.cdaoService.getSubCrop(CompId,CompTypeId).toPromise()
          this.CropVariety = []
          this.SubCropData.forEach((e:any) => { this.getCropVariety(e.subcropid) });
    } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.');
          console.error(e);
    }
  }

  getCropVariety = async(SubCropId: any) => {
    try {
        const result = await this.cdaoService.getCropVariety(SubCropId).toPromise()
        this.CropVariety = [...this.CropVariety,...result];
          
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  }
  
  getBundPlantation = async() => {
    try {
      if (this.BlockTargetForm.value.bp_status == 'yes') {
        const itemId = await this.cdaoService.getbpItems(this.BlockTargetForm.value.component.CompId).toPromise()
          if(itemId != null){
            this.bp_ItemId = itemId.ItemId
            this.getAllbpSubCrop(itemId)
          } else {
            this.toastr.warning(`There is no bund plantation crop in this component.`)
          }
      } else {
        this.bp_ItemId = null
      }
      this.showAddtable = true
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getAllbpSubCrop = async(ItemId: any) => {
    try {
        const CompId = this.BlockTargetForm.value.component.CompId
        const itemId = ItemId.ItemId
        this.bpSubCropData = await this.cdaoService.getAllbpSubCrop(CompId , itemId).toPromise();
      } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
      }
       
  }

  getBPCropVariety = async(SubCropId: any) => {
    try {
      this.bpCropVarietyData = await this.cdaoService.getBPCropVariety(SubCropId).toPromise();
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
 
  AddItemDetails = () => {
        this.showAddtable = true
        this.BlockTargetList.push(this.BlockTargetForm.value);
        this.BlockTargetForm.patchValue({
          item : '' , 
          technicalName : ''
        })
  }

  removeItemDetails = (index: number) => {
    this.BlockTargetList.splice(index, 1); 
  }

  checkTargetAvailibity = async ()=> {
    try {
        const CompId = this.BlockTargetForm.value.component.CompId;
        const Fin_Year = this.BlockTargetForm.value.FinYear
        this.DistrictTargetData = await this.cdaoService.getDistrictTarget(CompId, Fin_Year).toPromise();
        if(this.DistrictTargetData.length > 0){
            this.BlockTargetData  = await this.cdaoService.getBlockTargetData(CompId , Fin_Year).toPromise()
            this.BlockTargetData.length > 0 ? (this.showOtherInputs = false, this.setModifyButton = true, this.showAddtable = false) : (this.showOtherInputs = true,this.setModifyButton = false, this.getCrops())
        }else{
        this.toastr.warning(`There is no target for this Component in this District`)
        }
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
         
  }

  loadDistrictTarget = async() => {
    try {         
          this.showComponent = false;
          this.showTarget = true;
          const CompId = this.BlockTargetForm.value.component.CompId;
          const Fin_Year = this.BlockTargetForm.value.FinYear
          this.DistrictTargetData = await this.cdaoService.getDistrictTarget(CompId, Fin_Year).toPromise();
            if(this.DistrictTargetData.length > 0) {
                    this.totalPhyGen = +this.DistrictTargetData[0].avl_phygen;
                    this.totalFinGen = +this.totalPhyGen * +this.DistrictTargetData[0].Total_Cost ;
                    this.totalPhySCP = +this.DistrictTargetData[0].avl_physcp;
                    this.totalFinSCP = +this.totalPhySCP * +this.DistrictTargetData[0].Total_Cost;
                    this.totalPhyTASP = +this.DistrictTargetData[0].avl_phytasp;
                    this.totalFinTASP = +this.totalPhyTASP * +this.DistrictTargetData[0].Total_Cost;
                    this.totalPhy = +this.totalPhyGen + +this.totalPhySCP + +this.totalPhyTASP;
                    this.totalFin = +this.totalFinGen + +this.totalFinSCP + +this.totalFinTASP;

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
         const CompId = this.BlockTargetForm.value.component.CompId;
         const Fin_Year = this.BlockTargetForm.value.FinYear
         this.BlockTargetData  = await this.cdaoService.getBlockTargetData(CompId , Fin_Year).toPromise();
           
         if(this.BlockTargetData.length > 0) {
          this.showSubmit = false;
          this.showUpdate = true;
          this.BlockTargetData.forEach((y: any) => {
              this.BlockData.forEach((e: any) => {
                  if(y.Block_Code == e.Block_Code){
                        e.PhyGen =  +y.avl_phygen,
                        e.FinGen = +e.PhyGen * +y.Total_Cost,
                        e.PhySCP =  +y.avl_physcp,
                        e.FinSCP =  +e.PhySCP * +y.Total_Cost,
                        e.PhyTASP = +y.avl_phytasp,
                        e.FinTASP = +e.PhyTASP * +y.Total_Cost,
                        e.totalPhyByDistrict = +e.PhyGen + +e.PhySCP + +e.PhyTASP,
                        e.totalFinByDistrict = +e.FinGen + +e.FinSCP + +e.FinTASP;
                        e.totalPhyByBlock = +e.PhyGen + +e.PhySCP + +e.PhyTASP; 
                        e.totalFinByBlock = +e.FinGen + +e.FinSCP + +e.FinTASP;
                        e.totalTarget = +y.totalTarget
                        e.totalDistributedTarget = +y.totalDistributedTarget
                        return e;
                    }
                });
            }) 
          }else{
                  this.showSubmit = true;
                  this.showUpdate = false;
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

  backToComponentPage = () => {
    try{
      this.showComponent = true;
      this.showTarget = false;
      this.setTargetButton = false;

    }catch(e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  goToTargetPage = () => {
    try{
      this.showComponent = false;
      this.loadDistrictTarget()
      this.showTarget = true;

    }catch(e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  multiFin = (index: number, key: string, finKey: string , avl_Key: string ,totalPhyKey: any) => {
      const x = this.BlockData[index]
      if (x[key] >= 0) {
        this.subsidy = +this.DistrictTargetData[0].Total_Cost;
        x[finKey] = x[key] * this.subsidy;
        this.calculateDistAvl(index, key, finKey , avl_Key , totalPhyKey);
        
      } else {
        this.toastr.warning(`Target Should be Greater than 0.`)
        switch (key) {
          case 'PhyGen':
            this.BlockData[index].PhyGen = ''
            break;
          case 'PhySCP':
            this.BlockData[index].PhySCP  = ''
            break;
          case 'PhyTASP':
            this.BlockData[index].PhyTASP = ''
            break;
        }
      }
  }

  calculateDistAvl = (index: number, key: string, finKey: string , avl_Key: string , totalPhyKeyP: string) => {
    
        const x = this.BlockData[index]
        const gen = "totalPhyGen"
        const scp = "totalPhySCP"
        const fin = "totalPhyTASP"
        const totalPhyKey = totalPhyKeyP == gen ? gen : totalPhyKeyP == scp ? scp : fin;
        if ( this.BlockTargetData.length > 0 ) {
              
                if( x[key] > (this.BlockTargetData[index][avl_Key] | 0) ){
                        if(totalPhyKey == 'totalPhyGen'){
                            this.totalPhyGen = +this.DistrictTargetData[0][avl_Key] - ( +x[key] - +this.BlockTargetData[index][avl_Key] );
                            this.totalFinGen = this.totalPhyGen * this.DistrictTargetData[0].Total_Cost ;
                            this.TotalPhyFinTarget();
                            this.totalPhyByBlock = +x.PhyGen + +x.PhySCP + +x.PhyTASP; 
                            this.totalFinByBlock = +x.FinGen + +x.FinSCP + +x.FinTASP;
                        }else if(totalPhyKey == 'totalPhySCP'){
                            this.totalPhySCP = +this.DistrictTargetData[0][avl_Key] - ( +x[key] - +this.BlockTargetData[index][avl_Key] );
                            this.totalFinSCP = this.totalPhySCP * this.DistrictTargetData[0].Total_Cost ;
                            this.TotalPhyFinTarget();
                            this.totalPhyByBlock = +x.PhyGen + +x.PhySCP + +x.PhyTASP; 
                            this.totalFinByBlock = +x.FinGen + +x.FinSCP + +x.FinTASP;
                        }else {
                            this.totalPhyTASP = +this.DistrictTargetData[0][avl_Key] - ( +x[key] - +this.BlockTargetData[index][avl_Key] );
                            this.totalFinTASP = this.totalPhyTASP * this.DistrictTargetData[0].Total_Cost ;
                            this.TotalPhyFinTarget();
                            this.totalPhyByBlock = +x.PhyGen + +x.PhySCP + +x.PhyTASP; 
                            this.totalFinByBlock = +x.FinGen + +x.FinSCP + +x.FinTASP;
                        }

                  
        
                }else{
                        if(totalPhyKey == 'totalPhyGen'){
                            this.totalPhyGen = +this.DistrictTargetData[0][avl_Key] + ( +this.BlockTargetData[index][avl_Key] - +x[key] );
                            this.totalFinGen = this.totalPhyGen * this.DistrictTargetData[0].Total_Cost ;
                            this.TotalPhyFinTarget();
                            this.totalPhyByBlock = +x.PhyGen + +x.PhySCP + +x.PhyTASP; 
                            this.totalFinByBlock = +x.FinGen + +x.FinSCP + +x.FinTASP;
                        }else if(totalPhyKey == 'totalPhySCP'){
                            this.totalPhySCP = +this.DistrictTargetData[0][avl_Key] + ( +this.BlockTargetData[index][avl_Key] - +x[key] );
                            this.totalFinSCP = this.totalPhySCP * this.DistrictTargetData[0].Total_Cost ;
                            this.TotalPhyFinTarget();
                            this.totalPhyByBlock = +x.PhyGen + +x.PhySCP + +x.PhyTASP; 
                            this.totalFinByBlock = +x.FinGen + +x.FinSCP + +x.FinTASP;
                        }else{
                            this.totalPhyTASP = +this.DistrictTargetData[0][avl_Key] + ( +this.BlockTargetData[index][avl_Key] - +x[key] );
                            this.totalFinTASP = this.totalPhyTASP * this.DistrictTargetData[0].Total_Cost ;
                            this.TotalPhyFinTarget();
                            this.totalPhyByBlock = +x.PhyGen + +x.PhySCP + +x.PhyTASP; 
                            this.totalFinByBlock = +x.FinGen + +x.FinSCP + +x.FinTASP;
                        }
                
                }

        } else {
                if(totalPhyKey == 'totalPhyGen'){
                      this.totalPhyGenAllBlock = 0;
                      this.totalPhyGen = this.DistrictTargetData[0][avl_Key];
                      this.BlockData.forEach((block: any) => {
                        this.totalPhyGenAllBlock += +block.PhyGen
                        if (block.PhyGen <= this.totalPhyGen) {
                          this.totalPhyGen = +this.totalPhyGen - +block.PhyGen;
                          this.totalFinGen = this.totalPhyGen * this.DistrictTargetData[0].Total_Cost ;
                          this.TotalPhyFinTarget();
                          block.totalPhyByBlock = +block.PhyGen + +block.PhySCP + +block.PhyTASP; 
                          block.totalFinByBlock = +block.FinGen + +block.FinSCP + +block.FinTASP;
                        } else {
                          x[key] = 0;
                          block.totalPhyByBlock = 0
                          block.totalFinByBlock = 0
                          this.totalPhyGen = +this.totalPhyGen - +x[key]
                          this.toastr.warning('Target should not be exceed the available target.')
                        }
                      })
                      
                }else if(totalPhyKey == 'totalPhySCP'){
                    this.totalPhyScpAllBlock = 0;
                    this.totalPhySCP = this.DistrictTargetData[0][avl_Key];
                    this.BlockData.forEach((block: any) => {
                          this.totalPhyScpAllBlock += +block.PhySCP
                          if (block.PhySCP <= this.totalPhySCP) {
                              this.totalPhySCP = +this.totalPhySCP - +block.PhySCP ;
                              this.totalFinSCP = this.totalPhySCP * this.DistrictTargetData[0].Total_Cost ;
                              this.TotalPhyFinTarget();
                              block.totalPhyByBlock = +block.PhyGen + +block.PhySCP + +block.PhyTASP; 
                              block.totalFinByBlock = +block.FinGen + +block.FinSCP + +block.FinTASP;
                           } else {
                              x[key] = 0
                              block.totalPhyByBlock = 0
                              block.totalFinByBlock = 0
                              this.totalPhySCP = +this.totalPhySCP - +x[key]
                              this.toastr.warning('Target should not be exceed the available target.')
                           }
                    })
                      
                }else{
                    this.totalPhyTaspAllBlock = 0
                    this.totalPhyTASP = this.DistrictTargetData[0][avl_Key];
                    this.BlockData.forEach((block: any) => {
                          this.totalPhyTaspAllBlock += +block.PhyTASP;
                          if (block.PhyTASP <= this.totalPhyTASP) {
                              this.totalPhyTASP = +this.totalPhyTASP - +block.PhyTASP ;
                              this.totalFinTASP = this.totalPhyTASP * this.DistrictTargetData[0].Total_Cost ;
                              this.TotalPhyFinTarget();
                              block.totalPhyByBlock = +block.PhyGen + +block.PhySCP + +block.PhyTASP; 
                              block.totalFinByBlock = +block.FinGen + +block.FinSCP + +block.FinTASP;
                           } else {
                              x[key] = 0
                              block.totalPhyByBlock = 0
                              block.totalFinByBlock = 0
                              this.totalPhyTASP = +this.totalPhyTASP - x[key];
                              this.toastr.warning('Target should not be exceed the available target.')
                           }
                    })
                }
                
        }

  }
 
  TotalPhyFinTarget = () => {
    this.totalPhy = +this.totalPhyGen + +this.totalPhySCP + +this.totalPhyTASP;
    this.totalFin = +this.totalFinGen + +this.totalFinSCP + +this.totalFinTASP;
  }

  SubmitBlockTarget = async () => {
    try {
      const SubCropIds = this.SubCropData.map((e:any)=>{
          return e.subcropid 
      })
      const Variety_Codes = this.BlockTargetForm.value.cropVariety.map((e:any)=>{
            return e.Variety_Code
      })
      const compDetails = {
            DtargetId : this.DistrictTargetData[0].DtargetId,
            schemeId : this.BlockTargetForm.value.scheme.schemeId,
            SubschemeId : this.BlockTargetForm.value.subscheme.SubschemeId,
            CompId : this.BlockTargetForm.value.component.CompId,
            CropId : this.BlockTargetForm.value.cropCategory.CropId,
            SubCropId : SubCropIds.toString(),
            Variety_Code: Variety_Codes.toString(),
            bp_ItemId :  this.bp_ItemId ,
            BP_SubCropId : this.BlockTargetForm.value.bpSubCrop.SubCropId,
            BP_Variety_Code : this.BlockTargetForm.value.bpCropVariety,
            Total_Cost : this.DistrictTargetData[0].Total_Cost,
            Fin_Year : this.BlockTargetForm.value.FinYear,
      }
      const data = {
            compDetails,
            // itemTechnicalDetails,
            blockTarget: this.BlockData
      }
      
      this.BlockTargetResult = await this.cdaoService.SubmitBlockTarget(data).toPromise();
      if(this.BlockTargetResult.message == "Target Added Successfully.") {
        this.resetBlockDataArray()
        this.BlockTargetList = [];
        this.showAddtable = false
        this.showSubmit = false
        this.toastr.success(this.BlockTargetResult.message);
        this.router.navigate(['cdao/dashboard'])
      }else{
        this.toastr.error(this.BlockTargetResult.message);
      }
      
     
   } catch (e) {
     this.toastr.error('Sorry. Server problem. Please try again.');
     console.error(e);
    }
  }  
  
  editTarget = (index: number, key: string, finKey: string, changesKey: string , totalPhyKey: string) => {
    const x = this.BlockData[index]    
    this.selectedTarget = x
    // console.log(x);
    
    // this.selectedTarget.distAvlTarget = this.totalPhyGen
    this.selectedTarget.targetFor = key
    this.selectedTarget.key = key
    this.selectedTarget.finKey = finKey
    this.selectedTarget.target = +x[key]
    this.selectedTarget.currentTarget = +x[key]
    this.selectedTarget.changesKey = changesKey

    switch (totalPhyKey) {
      case 'totalPhyGen':
        this.selectedTarget.distAvlTarget = this.totalPhyGen
        break;
      case 'totalPhySCP':
        this.selectedTarget.distAvlTarget = this.totalPhySCP
        break;
      case 'totalPhyTASP':
        this.selectedTarget.distAvlTarget = this.totalPhyTASP
        break;
    
    }
    // console.log(this.selectedTarget);
    
  }

  addTarget = ()=>{
    // console.log(this.selectedTarget);
    
    const x = this.selectedTarget.currentTarget + +this.selectedTarget.enteredTarget || 0
    if(x >= 0 && this.selectedTarget.enteredTarget <= this.selectedTarget.distAvlTarget ) {
        this.selectedTarget.currentTarget = x
        const changesKey = this.selectedTarget.changesKey
        this.selectedTarget[changesKey] = (+this.selectedTarget[changesKey] || 0) + (+this.selectedTarget.enteredTarget || 0)  
        this.selectedTarget.distAvlTarget = (+this.selectedTarget.distAvlTarget|| 0) - (+this.selectedTarget.enteredTarget || 0)
        
     } else this.toastr.warning(`Invalid Target`)
      this.selectedTarget.enteredTarget = 0
  }

  substractTarget = () => {
    // console.log(this.selectedTarget);

      const x = this.selectedTarget.currentTarget - +this.selectedTarget.enteredTarget || 0
      
      if(x >= 0 ) {
        this.selectedTarget.currentTarget = x
        const changesKey = this.selectedTarget.changesKey
        this.selectedTarget[changesKey] = (+this.selectedTarget[changesKey] || 0) - (+this.selectedTarget.enteredTarget || 0)
        this.selectedTarget.distAvlTarget = (+this.selectedTarget.distAvlTarget|| 0) + (+this.selectedTarget.enteredTarget || 0)
        
     }
     else this.toastr.warning(`Invalid Target`)

     this.selectedTarget.enteredTarget = 0
  }
  
  modifyTarget = () => {
        const index = this.BlockData.findIndex((e: any) => e.Block_Code == this.selectedTarget.Block_Code )
        const key = this.selectedTarget.key
        const finKey = this.selectedTarget.finKey

        const modifyKeyTarget = this.selectedTarget.changesKey
        const prvsTarget = this.selectedTarget.target
        this.BlockData[index][key] = this.selectedTarget.currentTarget
        this.BlockData[index][finKey] = this.BlockData[index][key] * this.DistrictTargetData[0].Total_Cost;
        
        switch (key) {
          case 'PhyGen':{
            this.totalPhyGen = +this.selectedTarget.distAvlTarget
            this.totalFinGen = +this.totalPhyGen * +this.DistrictTargetData[0].Total_Cost
            this.totalPhy = +this.totalPhyGen + +this.totalPhySCP + +this.totalPhyTASP
            this.totalFin = +this.totalFinGen + +this.totalFinSCP + +this.totalFinTASP
            
            break;
          }
          case 'PhySCP':{
            this.totalPhySCP = +this.selectedTarget.distAvlTarget
            this.totalFinSCP = +this.totalPhySCP * +this.DistrictTargetData[0].Total_Cost
            this.totalPhy = +this.totalPhyGen + +this.totalPhySCP + +this.totalPhyTASP
            this.totalFin = +this.totalFinGen + +this.totalFinSCP + +this.totalFinTASP
            
            break;
          }
          case 'PhyTASP':{
            this.totalPhyTASP = +this.selectedTarget.distAvlTarget
            this.totalFinTASP = +this.totalPhyTASP * +this.DistrictTargetData[0].Total_Cost
            this.totalPhy = +this.totalPhyGen + +this.totalPhySCP + +this.totalPhyTASP
            this.totalFin = +this.totalFinGen + +this.totalFinSCP + +this.totalFinTASP
            break;
          }
        }
        this.calculateDistrictWiseTotal(index)
        // console.log(this.BlockData[index][this.selectedTarget.changesKey]);
        this.selectedTarget = {}
        
  }

  calculateDistrictWiseTotal = (i: number) => {
      this.BlockData[i].totalPhyByDistrict = +this.BlockData[i].PhyGen + +this.BlockData[i].PhySCP + +this.BlockData[i].PhyTASP;
      this.BlockData[i].totalFinByDistrict = +this.BlockData[i].FinGen + +this.BlockData[i].FinSCP + +this.BlockData[i].FinTASP;
  }

  calculateTotal = () => {
        this.totalPhyGen = 0;
        this.totalFinGen = 0;
        this.totalPhySCP = 0;
        this.totalFinSCP = 0;
        this.totalPhyTASP = 0;
        this.totalFinTASP = 0;
        this.totalPhy =  0;
        this.totalFin =  0;
        this.BlockData.forEach((block: any) => {
            this.totalPhyGen += +block.PhyGen || 0
            this.totalFinGen += +block.FinGen || 0

            this.totalPhySCP += +block.PhySCP || 0
            this.totalFinSCP += +block.FinSCP || 0

            this.totalPhyTASP += +block.PhyTASP || 0
            this.totalFinTASP += +block.FinTASP || 0

            this.totalPhy = this.totalPhyGen + this.totalPhySCP + this.totalPhyTASP
            this.totalFin = this.totalFinGen + this.totalFinSCP + this.totalFinTASP

        })
  }

  UpdateBlockTarget = async () => { 
    try {
      const data = { 
        schemeId: this.BlockTargetData[0].schemeId,
        compId: this.BlockTargetData[0].CompId,
        totalCost: this.DistrictTargetData[0].Total_Cost,
        finYear: this.BlockTargetData[0].Fin_Year,
        blockTargetList: this.BlockData 
      }
      this.BlockTargetResult = await this.cdaoService.UpdateBlockTarget(data).toPromise()
      this.resetBlockDataArray()
      this.toastr.success(this.BlockTargetResult.message);
      this.router.navigate(['cdao/dashboard'])
     
   } catch (e) {
     this.toastr.error('Sorry. Server problem. Please try again.');
     console.error(e);
    }
  }
  
  resetBlockDataArray = () => {
      this.BlockTargetForm.reset();
      this.totalPhyGen = 0;
      this.totalPhyGen = 0;
      this.totalFinGen = 0;
      this.totalPhySCP = 0;
      this.totalFinSCP = 0;
      this.totalPhyTASP = 0;
      this.totalFinTASP = 0;
      this.totalPhy = 0;
      this.totalFin = 0;
      this.BlockData.forEach((e: any) => {
              e.PhyGen =  0,
              e.FinGen = 0,
              e.PhySCP =  0,
              e.FinSCP =  0,
              e.PhyTASP = 0,
              e.FinTASP = 0,
              e.totalPhyByDistrict = +e.PhyGen + +e.PhySCP + +e.PhyTASP,
              e.totalFinByDistrict = +e.FinGen + +e.FinSCP + +e.FinTASP;
              this.totalPhyByBlock = +e.PhyGen + +e.PhySCP + +e.PhyTASP; 
              this.totalFinByBlock = +e.FinGen + +e.FinSCP + +e.FinTASP;
              return e;
      });
      this.router.navigate(['/cdao/block-target'])
      this.showComponent = true;

  }


}

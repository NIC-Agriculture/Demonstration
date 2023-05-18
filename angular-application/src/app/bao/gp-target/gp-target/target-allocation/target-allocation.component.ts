import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';



@Component({
  selector: 'app-target-allocation',
  templateUrl: './target-allocation.component.html',
  styleUrls: ['./target-allocation.component.css']
})
export class TargetAllocationComponent implements OnInit {

  @Input() GpTargetDetails:any = {};
  @Input() GpFormDetails: any = {};

  blockTargetData: any;
  blockPhyGen: number = 0;
  blockPhySCP: number = 0;
  blockPhyTASP: number = 0;
  blockTotalPhy: number = 0;
  PhyGen: number = 0;
  FinGen: any = 0;
  PhySCP: number = 0;
  FinSCP: any = 0;
  PhyTASP: number = 0;
  FinTASP: any = 0;
  totalPhy: number = 0;
  
  constructor(
    private baoService: BaoServiceService,
    private layoutService: LayoutserviceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBlockTarget();
  }

  getBlockTarget = async() => {
    try {
        const schemeId = this.GpFormDetails.value.scheme.schemeId
        const SubschemeId = this.GpFormDetails.value.subscheme.SubschemeId
        const CompId = this.GpFormDetails.value.component.CompId
        const Fin_Year = this.GpFormDetails.value.FinYear
        this.blockTargetData = await this.baoService.getBlockTarget(schemeId,SubschemeId,CompId,Fin_Year).toPromise()
        this.blockPhyGen = +this.blockTargetData.AvlPhyGen;
        this.blockPhySCP = +this.blockTargetData.AvlPhySCP;
        this.blockPhyTASP = +this.blockTargetData.AvlPhyTASP;
        this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;        
      } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
      }
  }

  // checkArea() {
  //   if (this.FarmerDetailsForm.value.area <= 2 && this.FarmerDetailsForm.value.area >= 0.4) {
  //   } else {
  //     this.toastr.warning('The value must be between 0.4 ha to 2 ha')
  //     this.FarmerDetailsForm.patchValue({
  //       area: ''
  //     })
  //   }

  // }

 totalPhyGen = () =>{
    if( +this.blockTargetData.AvlPhyGen >= +this.PhyGen && +this.blockTargetData.AvlPhyGen >= 0 ){
      this.blockPhyGen = +this.blockTargetData.AvlPhyGen - +this.PhyGen;
      this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
      this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
      // this.totalPhysical('PhyGen');
    }else{
      this.PhyGen = 0
      this.blockPhyGen = +this.blockTargetData.AvlPhyGen - +this.PhyGen;
      this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
      this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
      // this.totalPhysical('PhyGen');
      this.toastr.warning(`Given Target must be less than or Equal to Available Target.`)
    }
 }
 
 totalPhySCP = () => {
    if( +this.blockTargetData.AvlPhySCP >= +this.PhySCP && +this.blockTargetData.AvlPhySCP >= 0 ){
      this.blockPhySCP = +this.blockTargetData.AvlPhySCP - +this.PhySCP;
      this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
      this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
      // this.totalPhysical('PhySCP');
    }else{
      this.PhySCP = 0
      this.blockPhySCP = +this.blockTargetData.AvlPhySCP - +this.PhySCP;
      this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
      this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
      // this.totalPhysical('PhySCP');
      this.toastr.warning(`Given Target must be less than or Equal to Available Target.`)
    }
 }

 totalPhyTASP = () => {
  if( +this.blockTargetData.AvlPhyTASP >= +this.PhyTASP && +this.blockTargetData.AvlPhyTASP >= 0 ){
      this.blockPhyTASP = +this.blockTargetData.AvlPhyTASP - +this.PhyTASP;
      this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
      this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
      // this.totalPhysical('PhyTASP');
    }else{
      this.PhyTASP = 0
      this.blockPhyTASP = +this.blockTargetData.AvlPhyTASP - +this.PhyTASP;
      this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
      this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
      // this.totalPhysical('PhyTASP');
      this.toastr.warning(`Given Target must be less than or Equal to Available Target.`)
    }
 }

 totalPhysical = (key:any) => {
  this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
  if(this.totalPhy < this.GpFormDetails.value.subscheme.Demonstration_Area){
      switch (key) {
        case 'PhyGen':
          this.totalPhy = 0
          this.PhyGen = 0
          this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
          this.blockPhyGen = +this.blockTargetData.AvlPhyGen - +this.PhyGen;
          this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
          this.toastr.warning(`Demonstration Patch must be minimum of ${this.GpFormDetails.value.subscheme.Demonstration_Area} ha.`)
          break;
        case 'PhySCP':
          this.totalPhy = 0
          this.PhySCP = 0
          this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
          this.blockPhySCP = +this.blockTargetData.AvlPhySCP - +this.PhySCP;
          this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
          this.toastr.warning(`Demonstration Patch must be minimum of ${this.GpFormDetails.value.subscheme.Demonstration_Area} ha.`)
          break;
        case 'PhyTASP':
          this.totalPhy = 0
          this.PhyTASP = 0
          this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
          this.blockPhyTASP = +this.blockTargetData.AvlPhyTASP - +this.PhyTASP;
          this.blockTotalPhy = +this.blockPhyGen + +this.blockPhySCP + +this.blockPhyTASP;
          this.toastr.warning(`Demonstration Patch must be minimum of ${this.GpFormDetails.value.subscheme.Demonstration_Area} ha.`)
          break;
      }
    
  }else{
    this.totalPhy = +this.PhyGen + +this.PhySCP + +this.PhyTASP
  }
 }

 selectedGpTarget = () => {
  this.GpTargetDetails.gpTarget = {
       PhyGen : this.PhyGen,
       PhySCP : this.PhySCP,
       PhyTASP : this.PhyTASP,
       Demonstration_Area : this.totalPhy,
       schemeId: this.blockTargetData.schemeId,
       SubschemeId: this.blockTargetData.SubschemeId,
       CompId: this.blockTargetData.CompId,
       CropId: this.blockTargetData.CropId,
       SubCropId: this.blockTargetData.SubCropId,
       Variety_Code: this.blockTargetData.Variety_Code,
       itemTechRefNo: this.blockTargetData.itemTechRefNo,
       bp_ItemId: this.blockTargetData.bp_ItemId,
       BP_SubCropId: this.blockTargetData.BP_SubCropId,
       BP_Variety_Code: this.blockTargetData.BP_Variety_Code,
       Fin_Year: this.blockTargetData.Fin_Year

      }
  // console.log(this.GpTargetDetails.gpTarget);
 }
}

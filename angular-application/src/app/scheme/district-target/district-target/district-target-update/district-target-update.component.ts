import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { SchemeserviceService } from 'src/app/services/scheme/schemeservice.service';

@Component({
  selector: 'app-district-target-update',
  templateUrl: './district-target-update.component.html',
  styleUrls: ['./district-target-update.component.css']
})
export class DistrictTargetUpdateComponent implements OnInit {
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
districtTargetResult: any;
AllDistrictData: any = []
selectedTarget: any = {}
totalTarget : any;
distributedTarget : any;
clicked: boolean = false;

@Input() AllDistrictTargetDetails: any= '';
  constructor(
    private schemeService: SchemeserviceService,
    private layoutService: LayoutserviceService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAllDistrict()
  }

  loadAllDistrict = async()=>{
    try{      
      this.AllDistrictData = await this.schemeService.getAllDistrict().toPromise()
      this.AllDistrictTargetDetails.AllDistrictTargetData.forEach((y: any) => {
        this.AllDistrictData.forEach((e: any) => {
            if(y.Dist_Code == e.Dist_Code){
                  e.PhyGen =  y.avl_phygen,
                  e.FinGen = e.PhyGen * this.AllDistrictTargetDetails.Total_Cost,
                  e.PhySCP =  y.avl_physcp,
                  e.FinSCP =  e.PhySCP * this.AllDistrictTargetDetails.Total_Cost,
                  e.PhyTASP = y.avl_phytasp,
                  e.FinTASP = e.PhyTASP * this.AllDistrictTargetDetails.Total_Cost,
                  e.totalPhyByDistrict = +e.PhyGen + +e.PhySCP + +e.PhyTASP,
                  e.totalFinByDistrict = +e.FinGen + +e.FinSCP + +e.FinTASP;
                  e.totalTarget = y.totalTarget;
                  e.distributedTarget = y.totalDistributedTarget
                  return e;
            }
        });
      });
      this.calculateTotal();  
        
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }
  
  editTarget = (index: number, key: string, finKey: string, changesKey: string) => {
    const x = this.AllDistrictData[index]
    this.selectedTarget = x
    this.selectedTarget.targetFor = key
    this.selectedTarget.key = key
    this.selectedTarget.finKey = finKey
    this.selectedTarget.target = +x[key]
    this.selectedTarget.currentTarget = +x[key]
    this.selectedTarget.changesKey = changesKey
  }

  addTarget = ()=>{
    const x = this.selectedTarget.currentTarget + +this.selectedTarget.enteredTarget || 0
    // if(x >= 0 && (x % 100 == 0) ) {
    if(x >= 0 ) {
        this.selectedTarget.currentTarget = x
        const changesKey = this.selectedTarget.changesKey
        this.selectedTarget[changesKey] = (+this.selectedTarget[changesKey] || 0) + (+this.selectedTarget.enteredTarget || 0)        
    }
    else this.toastr.warning(`Invalid Target`)
      
    this.selectedTarget.enteredTarget = 0
  }

  substractTarget = () => {
      const x = this.selectedTarget.currentTarget - +this.selectedTarget.enteredTarget || 0
      
      if(x >= 0 ) {
        this.selectedTarget.currentTarget = x
        const changesKey = this.selectedTarget.changesKey
        this.selectedTarget[changesKey] = (+this.selectedTarget[changesKey] || 0) - (+this.selectedTarget.enteredTarget || 0)
      }
      else this.toastr.warning(`Invalid Target`)

      this.selectedTarget.enteredTarget = 0
  }
  
  modifyTarget = () => {
        const index = this.AllDistrictData.findIndex((e: any) => e.Dist_Code == this.selectedTarget.Dist_Code )
        const key = this.selectedTarget.key
        const finKey = this.selectedTarget.finKey

        this.AllDistrictData[index][key] = this.selectedTarget.currentTarget
        this.AllDistrictData[index][finKey] = this.AllDistrictData[index][key] * this.AllDistrictTargetDetails.Total_Cost;

        this.calculateDistrictWiseTotal(index)
        this.calculateTotal()
        // console.log(this.AllDistrictData[index][this.selectedTarget.changesKey]);
        this.selectedTarget = {}
        
  }

  calculateDistrictWiseTotal = (i: number) => {
      this.AllDistrictData[i].totalPhyByDistrict = +this.AllDistrictData[i].PhyGen + +this.AllDistrictData[i].PhySCP + +this.AllDistrictData[i].PhyTASP;
      this.AllDistrictData[i].totalFinByDistrict = +this.AllDistrictData[i].FinGen + +this.AllDistrictData[i].FinSCP + +this.AllDistrictData[i].FinTASP;
  }

  calculateTotal() {
        this.totalPhyGen = 0;
        this.totalFinGen = 0;
        this.totalPhySCP = 0;
        this.totalFinSCP = 0;
        this.totalPhyTASP = 0;
        this.totalFinTASP = 0;
        this.totalPhy =  0;
        this.totalFin =  0;
        this.AllDistrictData.forEach((dist: any) => {
            this.totalPhyGen += +dist.PhyGen || 0
            this.totalFinGen += +dist.FinGen || 0

            this.totalPhySCP += +dist.PhySCP || 0
            this.totalFinSCP += +dist.FinSCP || 0

            this.totalPhyTASP += +dist.PhyTASP || 0
            this.totalFinTASP += +dist.FinTASP || 0

            this.totalPhy = this.totalPhyGen + this.totalPhySCP + this.totalPhyTASP
            this.totalFin = this.totalFinGen + this.totalFinSCP + this.totalFinTASP

        })
  }
  
  UpdateDistrictTarget = async () => { 
    try {
      this.clicked = false
        const data = this.AllDistrictData.map((e: any) => {
          e.schemeId = this.AllDistrictTargetDetails.schemeId ,
          e.SubschemeId = this.AllDistrictTargetDetails.SubschemeId,
          e.CompId = this.AllDistrictTargetDetails.CompId,
          e.Total_Cost = this.AllDistrictTargetDetails.Total_Cost,
          e.Fin_Year = this.AllDistrictTargetDetails.Fin_Year
          return e;
        })
      const result = await this.schemeService.UpdateDistrictTarget(data).toPromise()
      this.districtTargetResult = result;
      this.resetDistrictDataArray();
      this.toastr.success(this.districtTargetResult.message);
      this.router.navigate(['scheme']);
   } catch (e) {
     this.toastr.error('Sorry. Server problem. Please try again.');
     console.error(e);
    }
  }

  resetDistrictDataArray = () => {
    this.AllDistrictData.forEach((e: any) => {
      e.PhyGen = 0
      e.FinGen = 0
      e.PhySCP = 0
      e.FinSCP = 0
      e.PhyTASP = 0
      e.FinTASP = 0
      e.totalPhyByDistrict = 0
      e.totalFinByDistrict = 0
      e.totalTarget = 0
      e.distributedTarget = 0
      return e;
    });
    this.calculateTotal();
    // this.showSubmit = false;
  }


}

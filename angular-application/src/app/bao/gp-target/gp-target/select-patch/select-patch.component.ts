import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-patch',
  templateUrl: './select-patch.component.html',
  styleUrls: ['./select-patch.component.css']
})
export class SelectPatchComponent implements OnInit {
  selected = -1;
  allComplete: boolean = false;
  GpData: any;
  vawArray: any = [];
  @Input() GpTargetDetails:any = {};
  @Input() GpFormDetails: any = {};
  blockTargetData: any;
  vaw: any;
  blockPhyGen: number = 0;
  blockPhySCP: number = 0;
  blockPhyTASP: number = 0;
  blockTotalPhy: number = 0;

  WardData:Array<any> = [];
  gpLength: any;
  
  constructor(
    private baoService: BaoServiceService,
    private layoutService: LayoutserviceService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getGPs();
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
  
  updateAllComplete() {
    this.allComplete = this.GpData != null && this.GpData.every((t: { completed: any; }) => t.completed);
  }

  someComplete(): boolean {
    if (this.GpData == null) return false;
    return (
      this.GpData.filter((t: { completed: any; }) => t.completed).length > 0 &&
      !this.allComplete
    );
    
  }
 
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.GpData == null) return ;
    this.GpData.forEach((t: { completed: boolean; }) => (t.completed = completed));
  }

  getGPs = async() => {
    try {
      const result = await this.baoService.getGPs().toPromise()
      
      result.GPdata.forEach((e:any) => {
          e.gpStatus = 'gp'
          return e
      });
      this.gpLength = result.GPdata.length        
      this.GpData = [...result.GPdata , ...result.wardData];
      this.WardData = result.wardData;
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  selectedGpList = () => {
    this.vawArray = []
    const SelectedGpDetails = this.GpData.filter((e:any) => e.completed )
    const SelectedGpList = this.GpData.filter((e:any) => e.completed && e.gpStatus)
    const SelectedWardList = this.GpData.filter((e:any) => e.completed && e.wardStatus )    
     
    this.GpTargetDetails.gpList = SelectedGpList;
    this.GpTargetDetails.wardList = SelectedWardList
    SelectedGpDetails.forEach((e:any) => {
      e.Gp_Code ? this.assignVAW(e.Gp_Code) : this.assignVAW(e.lg_gpCode)
      // if (e.Gp_Code) {
      //   this.assignVAW(e.Gp_Code)
      // } else {
      //   this.assignVAW(e.lg_gpCode)
      // }
  })
  }

  assignVAW = async(Gp_Code: any) => {
      const Result = await this.baoService.assignVAW(Gp_Code).toPromise();      
      this.vawArray = [...this.vawArray, ...Result]
  }
  
  selectedVaw = () => {
    this.GpTargetDetails.vawDetails = this.vaw
    // console.log(this.GpTargetDetails);
  }

}



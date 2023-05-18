import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-light-trap',
  templateUrl: './light-trap.component.html',
  styleUrls: ['./light-trap.component.css']
})
export class LightTrapComponent implements OnInit {
  demonstrationData: any;
  demonstrationId: any;
  allFarmerList: any;
  showModalBox: boolean = false;
  selected = -1;
  allComplete: boolean = false;
  showSubmit: boolean = false;
  showUpdate: boolean = false;
  message: boolean = false;
  forwardButton: boolean = false;
  @ViewChild('content') content: any;

  vawSaleResult: any;
  dealerSaleResult: any;
  confirmResult: any;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;
  totalLand: number = 0;
  totalLT: any;
  totalPT: any;
  showTable: boolean = false;
  
  constructor(
    private baoService:BaoServiceService,
    private toastr: ToastrService,
    private layoutService: LayoutserviceService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.pageTitle = 'Light Trap Distribution';
    this.pageDesc = 'Light Trap Distribution';
    this.breadcrumbList = ['Light Trap Distribution'];   
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
    this.getEligibleDemonstrationData()
  }

  getEligibleDemonstrationData = async() => {
      try {
          this.demonstrationData =  await this.baoService.getEligibleDemonstrationData().toPromise()
      } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e);
      }
  }

  getAllFarmerTrapData = async() => {
    try {
        this.showTable = false
        this.showSubmit = false
        this.message = false
        this.allFarmerList = await this.baoService.getAllFarmerTrapData(this.demonstrationId).toPromise()
        
        this.allFarmerList.result.forEach(async (e : any) => {
          const farmerGP = await this.baoService.getFarmerGp(e.FarmerId).toPromise()
          e.LightTrap = e.LightTrap || 0;
          e.PheromoneTrap = e.PheromoneTrap || 0;
          e.farmerGpCode = farmerGP[0].lg_gpCode
          this.totalLand += +e.LandArea
        })
        this.calculateTraps()
        this.allFarmerList.statusType == 'Submit' ? (this.showTable = true,this.message = false, this.showSubmit = true , this.showUpdate = false) :
        (this.showTable = true,this.message = false, this.showSubmit = false , this.showUpdate = true)        
        
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
  }

  calculateTraps = () => {
      this.totalLT = 0
      // this.totalPT = 0
      this.allFarmerList.result.forEach((e : any) => {
        this.totalLT += +e.LightTrap 
        // this.totalPT += +e.PheromoneTrap
      })
  }
 
  SubmitData = async() => {
    try {
      const FarmerDetails = this.allFarmerList.result
      const result = await this.baoService.submitTrapsData(FarmerDetails).toPromise()
      if (result) {
        this.toastr.success(result.message);
        this.showSubmit = false;
        this.allFarmerList.result = []
        this.demonstrationId = ''
        this.totalLT = 0
        this.totalLand = 0
        this.getEligibleDemonstrationData()
      }     
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

  UpdateData = async() => {
    try {
      const updatedFarmerDetails = this.allFarmerList.result
      
      const result = await this.baoService.updateTrapsData(updatedFarmerDetails).toPromise()
      if (result) {
        this.toastr.success(result.message);
        this.showUpdate = false;
        this.allFarmerList.result = []
        this.demonstrationId = ''
        this.totalLT = 0
        this.totalLand = 0
        this.getEligibleDemonstrationData()
      }     
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
  }

 
}

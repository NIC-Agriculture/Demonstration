import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent implements OnInit {
  demonstrationData: Array<any> = [];
  demonstrationId: any;
  allFarmerList: any;
  showModalBox: boolean = false;
  selected = -1;
  allComplete: boolean = false;
  showSubmit: boolean = false;
  showUpdate: boolean = false;
  message: boolean = false;
  forwardButton: boolean = false;
  
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
  ) { }

  ngOnInit(): void {
    this.getDemoIDToBeConfirmed()
  }

getDemoIDToBeConfirmed = async() => {
    try {
        this.demonstrationId = ''
        this.demonstrationData =  await this.baoService.getDemoIDToBeConfirmed().toPromise()
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.')
        console.error(e);
    }
}

getAllFarmerTrapData = async() => {
  try {
      this.showTable = false
      this.showSubmit = false
      // this.message = false
      this.allFarmerList = await this.baoService.getAllFarmerTrapData(this.demonstrationId).toPromise()
      this.allFarmerList.result.forEach(async (e : any) => {
        const farmerGP = await this.baoService.getFarmerGp(e.FarmerId).toPromise()
        e.LightTrap = e.LightTrap || 0;
        e.PheromoneTrap = e.PheromoneTrap || 0;
        e.farmerGpCode = farmerGP[0].lg_gpCode
        this.totalLand += +e.LandArea
      })
      this.showTable = true
      this.calculateTraps()
      this.showSubmit = true
      
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

ConfirmData = async() => {
    try {
      const result = await this.baoService.confirmTrapsData(this.demonstrationId).toPromise()
      this.toastr.success(result.message)
      this.showTable = false
      this.showSubmit = false
      this.allFarmerList.result = []
      this.demonstrationId = ''
      this.totalLT = 0
      this.totalLand = 0
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.')
      console.error(e);
    }
}

}
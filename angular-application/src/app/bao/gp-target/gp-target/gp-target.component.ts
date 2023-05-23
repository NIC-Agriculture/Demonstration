import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaoServiceService } from 'src/app/services/bao/bao-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';


@Component({
  selector: 'app-gp-target',
  templateUrl: './gp-target.component.html',
  styleUrls: ['./gp-target.component.css'],
})
export class GpTargetComponent implements OnInit {
  FinYears: any;
  pageTitle: string;
  // pageDesc: string;
  // breadcrumbList: Array<string>;
  SelectedGpTargetDetails: any = {}
  targetClose: boolean = false
 
  target: boolean = true
  createDemo: boolean = true
  assigngptovaw: boolean = true;
  referenceNo: string = '';
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  GpDetails: any;
  AllSchemeData: any;
  SubschemeData: any;
  ComponentData: any;
  gpTargetForm: any;
  showDemonstrationPatch: boolean = false;
  showschemeDetailsCard: boolean = true;
  blockTargetData: any;

  clicked : boolean = false
  Season: any;

  constructor(
    private baoService:BaoServiceService,
    private layoutService: LayoutserviceService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.pageTitle = 'Create Demonstration';
    // this.pageDesc = 'Set Target for GP of Odisha';
    // this.breadcrumbList = ['Set Target to GP'];
    this.gpTargetForm = this.fb.group({
      scheme: ["", [Validators.required]],
      subscheme: ["", [Validators.required]],
      component: ["", [Validators.required]],
      FinYear: ["", [Validators.required]]
     });
  }

  ngOnInit(): void {
    this.getFinYear();
    this.getAllScheme();
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      // this.layoutService.setPageHeadingDesc(this.pageDesc);
      // this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
  }

  get GPFormValid() {
    return this.gpTargetForm.controls;
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
      this.AllSchemeData = await this.baoService.getAllScheme().toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getSubscheme = async() => {
    try {
      const schemeId = this.gpTargetForm.value.scheme.schemeId
      this.SubschemeData = await this.baoService.getSubscheme(schemeId).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getComponent = async() => {
    try {
      const SubschemeId = this.gpTargetForm.value.subscheme.SubschemeId
      const FinYear = this.gpTargetForm.value.FinYear
      this.ComponentData = await this.baoService.getComponent(SubschemeId,FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getBlockTarget = async() => {
    try {
      this.showschemeDetailsCard = true;
      this.showDemonstrationPatch = false;
        // (event.target as HTMLButtonElement).disabled = true;
        const schemeId = this.gpTargetForm.value.scheme.schemeId
        const SubschemeId = this.gpTargetForm.value.subscheme.SubschemeId
        const CompId = this.gpTargetForm.value.component.CompId
        const Fin_Year = this.gpTargetForm.value.FinYear
        this.blockTargetData = await this.baoService.getBlockTarget(schemeId,SubschemeId,CompId,Fin_Year).toPromise()
        if (this.blockTargetData) {
          if (this.blockTargetData.AvlPhyGen == 0 && this.blockTargetData.AvlPhySCP == 0 && this.blockTargetData.AvlPhyTASP == 0)  {
            this.showschemeDetailsCard = true;
            this.showDemonstrationPatch = false;
            this.toastr.warning(`There is no target available in this component. `)
          } else {
            this.showschemeDetailsCard = false;
            this.showDemonstrationPatch = true;
          }
        // console.log(this.blockTargetData);
       
        } else {
          this.toastr.warning(`There is no target given for this component. `)
        }
      } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
      }
  }

  back = () => {
    this.showschemeDetailsCard = true;
    this.showDemonstrationPatch = false;
  }

  SelectedPatch = ()=> {
    const area = this.SelectedGpTargetDetails.gpTarget.Demonstration_Area
    if (this.gpTargetForm.value.subscheme.SubschemeId === this.SelectedGpTargetDetails.gpTarget.SubschemeId) {

        if (this.gpTargetForm.value.subscheme.Demonstration_Area <= area ) {
          this.step3 = true;
          this.createDemo = true;
          
        } else {
          this.step3 = false;
          this.createDemo = false;
          this.target = true
          this.step2 = true;
          this.toastr.warning(`Demonstration Patch should be minimum of  ${this.gpTargetForm.value.subscheme.Demonstration_Area} ha. `)
        }
      
    } else {
        this.toastr.error(`Something went wrong.Try again later. `)
        this.SelectedGpTargetDetails = {}
        this.gpTargetForm.reset();
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.showDemonstrationPatch = false
        this.router.navigate(['bao/gp-target'])
        this.showschemeDetailsCard = true
        this.getFinYear();
        this.getAllScheme();
    }
  }

  SubmitDemonstrationPatch = async()=> {
    try {
      this.clicked =true
      const result = await this.baoService.SubmitDemonstrationPatch(this.SelectedGpTargetDetails).toPromise()
      this.toastr.toastrConfig.positionClass = 'toast-top-center'
      this.toastr.success(result.message);
      this.SelectedGpTargetDetails = {}
      this.gpTargetForm.reset();
      this.step2 = false; this.step3 = false; this.step4 = false;
      this.showDemonstrationPatch = false ; this.showschemeDetailsCard = true;
      this.router.navigate(['bao/gp-target'])
      this.getFinYear();
      this.getAllScheme();
      this.gpTargetForm.patchValue({
            scheme: '',
            subscheme: '',
            component: '',
            FinYear:''
      })
      this.clicked = false
    } catch (e) {
       this.toastr.error('Sorry. Server problem. Please try again.');
       console.error(e);
    }
  }

  
}


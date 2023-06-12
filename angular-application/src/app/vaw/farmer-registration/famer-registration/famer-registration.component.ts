import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';
import { VawService } from 'src/app/services/vaw/vaw.service';

@Component({
  selector: 'app-famer-registration',
  templateUrl: './famer-registration.component.html',
  styleUrls: ['./famer-registration.component.css']
})
export class FamerRegistrationComponent implements OnInit {
  FarmerDetailsForm: any;
  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  prefixOfFarmerID: string = '';
  FarmerData: any = {};
  showtable: boolean = false;
  loader: boolean = false;
  showFarmerDetails: boolean = false;
  allFarmerData: Array<any> = [];
  demonstrationData: any;
  demonstrationId: any;
  PhyGen: any;
  FarmerDataAll: any;
  farmerDetails: any;
  PhyScp: any;
  PhyTasp: any;
  demonstrationArea: any;
  previousPhyGen: any;
  previousarea: any;
  FarmerDataDetails: any;
  name: any;
  searchFarmerID: string = '';
  farmerGender: any;
  catagory: any;
  fid: any;
  farmerRegistrationDetails: any;
  farmerData: any;
  invalidFarmerMessage: string;
  Farmer_Catagory: any;
  Dist_Code: any;
  clicked: boolean = false;
  demonstrationReport: any;

  Report = { 
    schemeName: '',
    SubschemeName: '',
    CompName: '',
    SubCropName: '',
    Dist_Name: '',
    Block_Name: ''
  };
  GpDetails: any;
  value: any;
  tempGenCat: any = 0.0000;
  normalCompTarget: any = 0;
  showFarmerSearch: boolean = false;
  minAreaMsg: any;
  FinYears: any;
  Season: any;


  constructor(
    private layoutService: LayoutserviceService,
    private authservice : AuthServiceService,
    private fb: FormBuilder,
    private vawService: VawService,
    private toastr: ToastrService,
  ) {
    this.pageTitle = 'Farmer Registration';
    this.pageDesc = 'Farmer Registration';
    this.breadcrumbList = ['Farmer Registration'];
    this.invalidFarmerMessage = '';
    this.FarmerDetailsForm = this.fb.group({
      FinYear: ['', [Validators.required]],
      demonstrationId: ['', [Validators.required]],
      fid: ['', [Validators.required]],
      farmerName: ['', [Validators.required]],
      farmerGender: ['', [Validators.required]],
      farmerCatagory: ['', [Validators.required]],
      area: ['', [Validators.required]],
      MobileNo: ['']
    });

  }

  ngOnInit(): void {
    // this.farmerName.disable();
    this.Dist_Code = this.authservice.getUserDistCode();
    this.getDemonstrationData();
    this.getPSDDistrictName();
    this.invalidFarmerMessage = '';
    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
      });
      this.getFinYear()
 
  }

  get vawFormValid() {
    return this.FarmerDetailsForm.controls;
  }

  // get farmerName() { return this.FarmerDetailsForm.get('farmerName') }
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
  
  getPSDDistrictName = async() => {
    try {
        const result = await this.vawService.getDistrictPrefix(this.Dist_Code).toPromise()
        this.prefixOfFarmerID = result.Dist_Prefix;
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e)
    }
  }

  getDemonstrationData = async() => {
    try {
      this.allFarmerData = []
      this.showFarmerSearch = false;
      this.showFarmerDetails = false;
      this.showtable = false;
      this.loader = false;
      this.searchFarmerID = ''
      this.FarmerDetailsForm.patchValue({demonstrationId:'',farmerName: '',farmerGender: '',farmerCatagory: '',MobileNo: '',area: '' }) 
      const FinYear = this.FarmerDetailsForm.value.FinYear
      this.demonstrationData = await this.vawService.getDemonstrationData(FinYear).toPromise()
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationTarget = () => { 
    this.invalidFarmerMessage = ' '
    this.PhyGen = JSON.parse(Number(+this.FarmerDetailsForm.value.demonstrationId.AvlPhyGen).toFixed(1));
    this.PhyScp = JSON.parse(Number(+this.FarmerDetailsForm.value.demonstrationId.AvlPhySCP).toFixed(1));
    this.PhyTasp = JSON.parse(Number(+this.FarmerDetailsForm.value.demonstrationId.AvlPhyTASP).toFixed(1));
    this.demonstrationArea = JSON.parse(Number(+this.PhyGen + +this.PhyScp + +this.PhyTasp).toFixed(1)) ;
    if (this.FarmerDetailsForm.value.demonstrationId.ConfirmBy_vaw == 1) {
        this.showFarmerSearch = false
        this.invalidFarmerMessage = `The beneficiary registration under this Demonstration Patch has been finished.`
    } else {
        this.showFarmerSearch = true
        this.invalidFarmerMessage = ' '
        this.setLandAreaValidators()
    }
  }

  setLandAreaValidators = async() => {
    const area = this.FarmerDetailsForm.get('area');
    this.FarmerDetailsForm.value.demonstrationId.SubschemeId == 'subscheme_28' ? area.setValidators([Validators.required , Validators.min(0.2) , Validators.max(2)]) 
    : this.FarmerDetailsForm.value.demonstrationId.SubschemeId == 'subscheme_32' ? area.setValidators([Validators.required , Validators.min(0.2) , Validators.max(2)]) 
    : this.FarmerDetailsForm.value.demonstrationId.SubschemeId == 'subscheme_26' ? area.setValidators([Validators.required , Validators.min(0.4) , Validators.max(1)]) 
    : area.setValidators([Validators.required , Validators.min(0.4) , Validators.max(2)]);
    
    this.minAreaMsg =  this.FarmerDetailsForm.value.demonstrationId.SubschemeId == 'subscheme_28' ? '0.2' : this.FarmerDetailsForm.value.demonstrationId.SubschemeId == 'subscheme_32' ? '0.2' 
    :this.FarmerDetailsForm.value.demonstrationId.SubschemeId == 'subscheme_32' ? '0.2' : '0.4';
  }

  getFarmerDetails = async () => {
    try { 
        this.FarmerDetailsForm.controls['farmerName'].disable();
        this.FarmerDetailsForm.controls['farmerCatagory'].disable(); 
        this.FarmerDetailsForm.controls['farmerGender'].disable();
        if (this.searchFarmerID != '') {
            const newSchemeId = this.FarmerDetailsForm.value.demonstrationId.schemeId
            const newSubschemeId = this.FarmerDetailsForm.value.demonstrationId.SubschemeId
            const farmerId = this.prefixOfFarmerID + '/' + this.searchFarmerID;
            this.loader = true; this.showFarmerDetails = false; this.invalidFarmerMessage = '';
            const result1 = await this.vawService.checkFarmerIDExistance(farmerId, newSchemeId , newSubschemeId ).toPromise()
            
            if(result1.exists){
                this.loader = false;
                this.invalidFarmerMessage = `Sorry, This Farmer-ID Already Registered under this Scheme to getting benefits.`
                this.showFarmerDetails = false;
            }else{
                try {
                  const result = await this.vawService.getFarmerData(farmerId).toPromise();
                  
                  if (result) {
                    // if (this.Block_Code == result.NIC_BlockCode) {
                        this.loader = false;
                        this.showFarmerDetails = true;
                        this.invalidFarmerMessage = '';
                        this.FarmerDetailsForm.patchValue({
                          farmerName: result.VCHFARMERNAME,
                          farmerGender: result.Gender_Value,
                          farmerCatagory: result.Category_Value,
                          fid: farmerId,
                          MobileNo: result.VCHMOBILENO,
                        })
                    
                  }
                  else {
                        this.loader = false;
                        this.toastr.error('Please enter valid Farmer ID.');
                  }
                  
                } catch (e) {
                  this.toastr.warning('Kindly Link your Aadhar no. with your FarmerID.Contact with your BAO.');
                  console.error(e);
                  this.loader = false;
                }
            }
        
        } else {
          this.loader = false;
          this.toastr.error('Please Enter the Farmer ID.');
        }
    } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.');
          console.error(e);
          this.loader = false;
    }

  }

  calculateTarget = () => {
    this.FarmerDetailsForm.controls['farmerCatagory'].enable();
    const area = -(+this.FarmerDetailsForm.value.area) ;
    const farmerCat = this.FarmerDetailsForm.value.farmerCatagory
    switch (farmerCat) {
        case 'General': {
            if (+this.PhyGen > 0 && +this.PhyGen >= +this.FarmerDetailsForm.value.area) {
              const PhyGen1  = +this.PhyGen + +area
              this.PhyGen = JSON.parse(Number(PhyGen1).toFixed(1));
              this.tempGenCat = 0
              this.normalCompTarget = 0
              this.demonstrationArea = JSON.parse(Number(+this.PhyGen + +this.PhyScp + +this.PhyTasp).toFixed(1));
              this.AddFarmerData()
              break;
            } else {
              this.toastr.warning(`Invalid Target.`)
              this.searchFarmerID = ''
              this.FarmerDetailsForm.patchValue({
                  farmerName: '',
                  farmerGender: '',
                  farmerCatagory: '',
                  MobileNo: '',
                  area: ''
              }) 
              break;
            }
        }
        case 'SC': { 
            if (+this.PhyScp > 0 && +this.PhyScp >= +this.FarmerDetailsForm.value.area) {
              const PhyScp1 = +this.PhyScp + +area
              this.PhyScp = JSON.parse(Number(PhyScp1).toFixed(1));
              this.tempGenCat = 0
              this.normalCompTarget = 0
              this.demonstrationArea = JSON.parse(Number(+this.PhyGen + +this.PhyScp + +this.PhyTasp).toFixed(1));
              this.AddFarmerData()
              break;            
            } else if(+this.PhyScp == 0 && +this.PhyGen >= +this.FarmerDetailsForm.value.area){
              const PhyScp1 = +this.PhyGen + +area
              this.PhyGen = JSON.parse(Number(PhyScp1).toFixed(1));
              this.tempGenCat = +this.FarmerDetailsForm.value.area
              this.normalCompTarget = 1
              this.demonstrationArea = JSON.parse(Number(+this.PhyGen + +this.PhyScp + +this.PhyTasp).toFixed(1));
              this.AddFarmerData()
              break;
            }
            else {
              this.toastr.warning( `Invalid Target.`)
              this.searchFarmerID = ''
              this.FarmerDetailsForm.patchValue({
                  farmerName: '',
                  farmerGender: '',
                  farmerCatagory: '',
                  MobileNo: '',
                  area: ''
              }) 
              break;
            }
          
        }
        case 'ST': {
            if (+this.PhyTasp > 0 && +this.PhyTasp >= +this.FarmerDetailsForm.value.area) {
              const PhyTasp1 = +this.PhyTasp + +area
              this.PhyTasp = JSON.parse(Number(PhyTasp1).toFixed(1));
              this.tempGenCat = 0
              this.normalCompTarget = 0
              this.demonstrationArea = JSON.parse(Number(+this.PhyGen + +this.PhyScp + +this.PhyTasp).toFixed(1));
              this.AddFarmerData()
              break;            
            } else if(+this.PhyTasp == 0 && +this.PhyGen >= +this.FarmerDetailsForm.value.area){
              const PhyTasp1 = +this.PhyGen + +area
              this.PhyGen = JSON.parse(Number(PhyTasp1).toFixed(1));
              this.tempGenCat = +this.FarmerDetailsForm.value.area
              this.normalCompTarget = 1
              this.demonstrationArea = JSON.parse(Number(+this.PhyGen + +this.PhyScp + +this.PhyTasp).toFixed(1));
              this.AddFarmerData()
              break;
            }
            else {
              this.toastr.warning( `Invalid Target.`)
              this.searchFarmerID = ''
              this.FarmerDetailsForm.patchValue({
                  farmerName: '',
                  farmerGender: '',
                  farmerCatagory: '',
                  MobileNo: '',
                  area: ''
              }) 
              break;
            }
        }
    }
  }
  
  AddFarmerData = () => {
    this.showtable = true;
    this.FarmerDetailsForm.controls['farmerName'].enable();
    this.FarmerDetailsForm.controls['farmerGender'].enable();
    
    // this.calculateTarget( -(+this.FarmerDetailsForm.value.area), this.FarmerDetailsForm.value.farmerCatagory)
    
    
    let farmerFormData = {
        Dist_Code: this.FarmerDetailsForm.value.demonstrationId.Dist_Code,
        Block_Code: this.FarmerDetailsForm.value.demonstrationId.Block_Code,
        DemonstrationId: this.FarmerDetailsForm.value.demonstrationId.DemostrationId,
        schemeId: this.FarmerDetailsForm.value.demonstrationId.schemeId,
        SubschemeId : this.FarmerDetailsForm.value.demonstrationId.SubschemeId,
        CompId : this.FarmerDetailsForm.value.demonstrationId.CompId,
        FarmerId: this.FarmerDetailsForm.value.fid,
        FarmerName: this.FarmerDetailsForm.value.farmerName,
        Gender: this.FarmerDetailsForm.value.farmerGender,
        Farmer_Category: this.FarmerDetailsForm.value.farmerCatagory,
        MobileNo: this.FarmerDetailsForm.value.MobileNo,
        LandArea: this.FarmerDetailsForm.value.area,
        itemTechRefNo : this.FarmerDetailsForm.value.demonstrationId.itemTechRefNo,
        CropId: this.FarmerDetailsForm.value.demonstrationId.CropId,
        SubCropId: this.FarmerDetailsForm.value.demonstrationId.SubCropId,
        Variety_Code: this.FarmerDetailsForm.value.demonstrationId.Variety_Code,
        bp_ItemId: this.FarmerDetailsForm.value.demonstrationId.bp_ItemId,
        BP_SubCropId: this.FarmerDetailsForm.value.demonstrationId.BP_SubCropId,
        BP_Variety_Code: this.FarmerDetailsForm.value.demonstrationId.BP_Variety_Code,
        Gp_Code: this.FarmerDetailsForm.value.demonstrationId.Gp_Code,
        Fin_year: this.FarmerDetailsForm.value.demonstrationId.Fin_Year,
        tempGenCat : this.tempGenCat,
        normalCompTarget : this.normalCompTarget
    }
    this.allFarmerData.push(farmerFormData);
    this.clicked = false;
      
    this.searchFarmerID = ''
    this.FarmerDetailsForm.patchValue({
        farmerName: '',
        farmerGender: '',
        farmerCatagory: '',
        MobileNo: '',
        area: ''
    }) 

  }

  remove(i: any) {
    // this.calculateTarget( +this.allFarmerData[i].LandArea, this.allFarmerData[i].Farmer_Category )
    this.allFarmerData.splice(i, 1)
  }

  omit_special_char(event: { charCode: any; }) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  SubmitfarmerDetails = async() => {
    try {
      this.clicked = true
      const response = await this.vawService.SubmitfarmerDetails(this.allFarmerData).toPromise()
      this.toastr.success(response.message);
      this.allFarmerData = [];
      this.searchFarmerID = '' ;
      this.FarmerDetailsForm.reset();
      this.PhyGen = '' , this.PhyScp = '' , this.PhyTasp = '' , this.demonstrationArea = ''
      this.showtable = false;
      this.getDemonstrationData();
      this.getPSDDistrictName();
      this.clicked = false
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  getDemonstrationReport = async ()  => {
    try {
      this.demonstrationReport  = [];
      this.Report = { 
        schemeName: '',
        SubschemeName: '',
        CompName: '',
        SubCropName: '',
        Dist_Name: '',
        Block_Name: ''
      };
      this.GpDetails = [];
      const DemostrationId = this.FarmerDetailsForm.value.demonstrationId.DemostrationId;
      this.demonstrationReport = await this.vawService.getDemonstrationReport(DemostrationId).toPromise()

      this.Report = this.demonstrationReport.result.length == 0 ? this.demonstrationReport.result : this.demonstrationReport.result[0]
      this.GpDetails = this.demonstrationReport.GpData;
      
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}

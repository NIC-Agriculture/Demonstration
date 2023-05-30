import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DealerService } from 'src/app/services/dealer/dealer.service';
// import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-dealer-sell',
  templateUrl: './dealer-sell.component.html',
  styleUrls: ['./dealer-sell.component.css']
})
export class DealerSellComponent implements OnInit {
  techicalNameList: any
  DealerSaleForm: FormGroup;
  dealerSaleReceipt:boolean = false;  
  dealerSell: boolean = true;

  @Input() permitList: any = {};
  dealerSaleDetails: any = {};
  dealerResult: any;
  technicalDetailsList: Array<any> = [];

  ItemData: any;
  TechnicalData: Array<any> = [];
  subCropData: Array<any> = [];
  filteredList1: any

  showAddtable:boolean = false;
  addButton: boolean = true;
  purchasedList: any;
  farmerShare: any;
  PurchasedSubsidy: number = 0;

  constructor( 
      // private layoutService: LayoutserviceService,
      private dealerService: DealerService ,
      private fb: FormBuilder,
      private toastr: ToastrService
      
    ) {
      this.DealerSaleForm = this.fb.group({
        // schemeName: ['', [Validators.required]],
        // SubschemeName: ['', [Validators.required]],
        item: ['', [Validators.required]],
        technicalDetails:['', [Validators.required]],
        searchText:[''],
        packageSize: ['', [Validators.required]],
        packagePrice: [''],
        packageQuantity:['', [Validators.required]],
        totalPrice: [{value: '', disabled: true}],
        maxSubsidy: [{value: '', disabled: true}],
        prevsPurchasedSubsidy: [{value: '', disabled: true}],
        eligibleSubsidy: [{value: '', disabled: true}],
        season: ['Rabi'],
        unit: ['', [Validators.required]],
        // fixedSubCrop: [''],
  
      });
    }

 
  ngOnInit(): void {
      // this.getPurchasedItemName();
      this.getItems();
    // this.getEligibleTechnicalName();

  }

  get dealerFormValid() {
    return this.DealerSaleForm.controls;
  }

  getItems = async() => {
    try {     
        const CompId = this.permitList.CompId
        this.ItemData  =  await this.dealerService.getItems(CompId).toPromise()
        // this.checkIsOrderPurchased()
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  }

  getPurchasedItemList = () => {
    return new Promise( async (resolve: any, reject: any) => {
      try {
          const FarmerId = this.permitList.FarmerId
          const CompId = this.permitList.CompId
          const ItemId = this.DealerSaleForm.value.item.ItemId
          
          this.purchasedList = await this.dealerService.getPurchasedTechnicalName(FarmerId , CompId , ItemId).toPromise()
          const prevPurchasedAmount = this.purchasedList.reduce((acc: any, cur: any) => acc + +cur.eligibleSubsidy, 0)
                   

          this.DealerSaleForm.patchValue({ prevsPurchasedSubsidy: prevPurchasedAmount })
          
          resolve()
      } catch (e) {
          console.error(e);
          reject()
      }
    })
  }

  getTechnicalName = async() => {
    try {
          this.subCropData = []
          const ItemId = this.DealerSaleForm.value.item.ItemId
          const Technical_Status = this.DealerSaleForm.value.item.Technical_Status
          this.TechnicalData = await this.dealerService.getTechnicalName(ItemId,Technical_Status).toPromise();
          this.checkIsOrderPurchased()
          
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

  checkIsOrderPurchased = () => {
    this.TechnicalData.forEach((e: any) => {
      if(this.purchasedList.some((pe: any) => e.Technical_Code == pe.Technical_Code )) {
        e.isPurchased = true;
      }
    })
    this.filteredList1 = this.TechnicalData;
  }

  getItemPrice = async() => {
    try {
          const ItemId = this.DealerSaleForm.value.item.ItemId

          const getPurchaseListResult = this.getPurchasedItemList()

          const result = await this.dealerService.getItemPrice(ItemId).toPromise();
          const compIdArray = ['comp_55','comp_53','comp_54','comp_57','comp_56','comp_59','comp_33']
        
          const itemCost = compIdArray.includes(this.permitList.CompId) && this.permitList.Dist_Code == '352' ? result[0].newIndicativeCost : 
          compIdArray.includes(this.permitList.CompId) && this.permitList.Dist_Code == '369' ? result[0].newIndicativeCostPuri : 
          compIdArray.includes(this.permitList.CompId) && this.permitList.Dist_Code == '356' ? result[0].newIndicativeCostJajpur : 
          compIdArray.includes(this.permitList.CompId) && this.permitList.Dist_Code == '355' ? result[0].newIndicativeCostJagatsinghpur : 
          compIdArray.includes(this.permitList.CompId) && this.permitList.Dist_Code == '351' ? result[0].newIndicativeCostDeogarh : 
          compIdArray.includes(this.permitList.CompId) && this.permitList.Dist_Code == '372' ? result[0].newIndicativeCostSubarnapur : 
          result[0].IndicativeCost

          const selectedItemCost = this.technicalDetailsList.reduce((acc, cur) => cur.ItemId == ItemId ? acc + +cur.eligibleSubsidy : acc, 0)
                   
          
          await getPurchaseListResult;
          
          this.DealerSaleForm.controls['prevsPurchasedSubsidy'].enable();
          
          const maxSubsidy =  (+itemCost * +this.permitList.LandArea) - +this.DealerSaleForm.value.prevsPurchasedSubsidy - selectedItemCost
          
          this.DealerSaleForm.patchValue({maxSubsidy: (maxSubsidy).toFixed(1)})

          this.DealerSaleForm.controls['prevsPurchasedSubsidy'].disable();
          this.getTechnicalName();
       
    } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.');
          console.error(e);
     }
  }
  
  geCalculateTotalPrice = async() => {
    try {
          this.DealerSaleForm.controls['maxSubsidy'].enable(); 
          const totalPrice = this.DealerSaleForm.value.packagePrice * this.DealerSaleForm.value.packageQuantity
          this.DealerSaleForm.patchValue({totalPrice: totalPrice})
          const eligibleSubsidy = totalPrice >= this.DealerSaleForm.value.maxSubsidy ? this.DealerSaleForm.value.maxSubsidy : totalPrice
                    
          this.DealerSaleForm.patchValue({eligibleSubsidy: eligibleSubsidy})
          this.DealerSaleForm.controls['maxSubsidy'].disable(); 
    } catch (e) {
          this.toastr.error('Sorry. Server problem. Please try again.')
          console.error(e)
    }
  }

  AddTechnicalDetails = () => {
      this.DealerSaleForm.controls['maxSubsidy'].enable(); 
      this.DealerSaleForm.controls['totalPrice'].enable(); 
      this.DealerSaleForm.controls['eligibleSubsidy'].enable();
      this.addButton = false;
      this.showAddtable = true;
      const data = this.DealerSaleForm.value;
      
      data.Technical_Code = data.technicalDetails.Technical_Code;
      data.Technical_Name = data.technicalDetails.Technical_Name;
      data.CompId = data.technicalDetails.CompId;
      data.ItemId = data.item.ItemId;


      if(this.technicalDetailsList.some((pe: any) => data.Technical_Code == pe.Technical_Code )) {
        this.toastr.warning(`This Input has already been added in below list.`)
      }else{
        this.technicalDetailsList.push(data);        
      }

      this.DealerSaleForm.reset()
      this.DealerSaleForm.controls['season'].setValue('Rabi')
      this.DealerSaleForm.controls['maxSubsidy'].disable(); 
      this.DealerSaleForm.controls['totalPrice'].disable(); 
      this.DealerSaleForm.controls['eligibleSubsidy'].disable(); 

  }

  remove(index: any) {
      this.technicalDetailsList.splice(index, 1)
  }
  
  submitDealerSale = async (event: MouseEvent) => {
    try {
        (event.target as HTMLButtonElement).disabled = true;
        this.dealerSaleDetails = { permitList : this.permitList , DealerSaleForm : this.technicalDetailsList };
        const result = await this.dealerService.submitDealerSale(this.dealerSaleDetails).toPromise();
        this.dealerResult = result
        this.dealerSell = false;
        this.dealerSaleReceipt = true
    } catch (e) {
        this.toastr.error('Sorry. Server problem. Please try again.');
        console.error(e);
    }
  };
  
 

}

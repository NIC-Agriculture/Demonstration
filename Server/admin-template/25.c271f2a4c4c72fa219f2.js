(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{dLb8:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("AytR"),o=r("fXoL"),s=r("tyNb"),c=r("tk/3");let n=(()=>{class e{constructor(e,t){this.router=e,this.http=t,this.serverUrl=i.a.serverUrl,this.route="cdao",this.withCredential={withCredentials:!0}}getBlocks(){return this.http.get(`${this.serverUrl}/${this.route}/getBlocks`)}getAllScheme(){return this.http.get(`${this.serverUrl}/${this.route}/getAllScheme`)}getSubscheme(e){return this.http.get(`${this.serverUrl}/${this.route}/getSubscheme?schemeId=${e}`)}getComponent(e){return this.http.get(`${this.serverUrl}/${this.route}/getComponent?SubschemeId=${e}`)}getItems(e){return this.http.get(`${this.serverUrl}/${this.route}/getItems?CompId=${e}`)}getbpItems(e){return this.http.get(`${this.serverUrl}/${this.route}/getbpItems?CompId=${e}`)}getTechnicalName(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getTechnicalName?ItemId=${e}&SubCropId=${t}`)}getCrops(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getCrops?SubschemeId=${e}&CompId=${t}`)}getAllbpSubCrop(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getAllbpSubCrop?CompId=${e}&ItemId=${t}`)}getSubCrop(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getSubCrop?CompId=${e}&CompTypeId=${t}`)}getCropVariety(e){return this.http.get(`${this.serverUrl}/${this.route}/getCropVariety?SubCropId=${e}`)}getBPCropVariety(e){return this.http.get(`${this.serverUrl}/${this.route}/getBPCropVariety?SubCropId=${e}`)}getComponentCost(e){return this.http.get(`${this.serverUrl}/${this.route}/getComponentCost?CompId=${e}`)}getDistrictTarget(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getDistrictTarget?CompId=${e}&Fin_Year=${t}`)}getBlockTargetData(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getBlockTargetData?CompId=${e}&Fin_Year=${t}`)}getCompTargetDetails(e,t,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getCompTargetDetails?schemeId=${e}&SubschemeId=${t}&CompId=${r}&Fin_Year=${i}`)}getItemTechDetails(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getItemTechDetails?CompId=${e}&itemTechRefNo=${t}`)}SubmitBlockTarget(e){return this.http.post(`${this.serverUrl}/${this.route}/SubmitBlockTarget`,e)}UpdateBlockTarget(e){return this.http.post(`${this.serverUrl}/${this.route}/UpdateBlockTarget`,e)}getAllDealerSale(e,t,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getAllDealerSale?Block_Code=${e}&schemeId=${t}&SubschemeId=${r}&CompId=${i}`)}getAllIncentive(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getIncetiveList?Block_Code=${e}&schemeId=${t}`)}getDealerSaleReciept(e){return this.http.get(`${this.serverUrl}/${this.route}/getDealerSaleReciept?InvoiceNo=${e}`)}getVAWSaleReciept(e){return this.http.get(`${this.serverUrl}/${this.route}/getVAWSaleReciept?Permit_NO=${e}`)}approveDealerSale(e){return this.http.post(`${this.serverUrl}/${this.route}/approveDealerSale`,e)}approveIncentiveList(e){return this.http.post(`${this.serverUrl}/${this.route}/approveIncentiveList`,e)}getBlockWiseSeedReport(e){return this.http.get(`${this.serverUrl}/${this.route}/getBlockWiseSeedReport?Block_Code=${e}`)}getReferenceIDs(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getReferenceIDs?schemeId=${e}&paymentType=${t}`)}generatePaymntFile(e,t,r){return this.http.get(`${this.serverUrl}/${this.route}/generatePaymntFile?ReferenceNo=${e}&schemeId=${t}&paymentType=${r}`)}getFarmerBankDetails(e){return this.http.get(`https://mkuy.apicol.nic.in/api/FarmerData/GetFdetails?fid=${e}`,{headers:{skip:"true"}})}getAvailableTarget(e){return this.http.get(`${this.serverUrl}/${this.route}/getAvailableTarget?Fin_Year=${e}`)}getDemonstrationIdCount(){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationIdCount`)}getItemNameAndTechnicalName(e,t,r){return this.http.get(`${this.serverUrl}/${this.route}/getItemNameAndTechnicalNameReport?CompId=${e}&Fin_Year=${t}&SubschemeId=${r}`)}getclusterDemonstration(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getclusterDemonstration?Block_Code=${e}&Fin_Year=${t}`)}getDemonstrationStatusReport(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationStatusReport?Block_Code=${e}&Fin_Year=${t}`)}getWardData(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getWardData?WardCode=${e}&DemostrationId=${t}`)}getReferenceIDsForpayment(e){return this.http.get(`${this.serverUrl}/${this.route}/getReferenceIDsForpayment?paymentType=${e}`)}getPermitSaleDetails(e,t){return this.http.get(`${this.serverUrl}/${this.route}/getPermitSaleDetails?ReferenceNo=${e}&paymentType=${t}`)}UpdateTransactionDetails(e){return this.http.post(`${this.serverUrl}/${this.route}/UpdateTransactionDetails`,e)}RegeneratePaymntFile(e,t,r){return this.http.get(`${this.serverUrl}/${this.route}/RegeneratePaymntFile?ReferenceNo=${e}&schemeId=${t}&paymentType=${r}`)}getCropCatagory(){return this.http.get(`${this.serverUrl}/${this.route}/getCropCatagory`)}getCrop(e){return this.http.get(`${this.serverUrl}/${this.route}/getCrop?CropId=${e}`)}AddCropVariety(e){return this.http.post(`${this.serverUrl}/${this.route}/AddCropVariety`,e)}getCalculatedInputCost(){return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedInputCost`)}getCalculatedIncentiveCost(){return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedIncentiveCost`)}}return e.\u0275fac=function(t){return new(t||e)(o.Zb(s.a),o.Zb(c.b))},e.\u0275prov=o.Lb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},opG4:function(e,t,r){"use strict";r.r(t),r.d(t,"ApproveIncentiveSeedCostModule",function(){return V});var i=r("ofXK"),o=r("tyNb"),s=r("mrSG"),c=r("3Pt+"),n=r("fXoL"),l=r("dLb8"),a=r("5eHb"),h=r("4TgG"),b=r("0IaG"),d=r("QibW"),u=r("bSwM");function p(e,t){if(1&e&&(n.Vb(0,"option",38),n.Dc(1),n.Ub()),2&e){const e=t.$implicit;n.mc("ngValue",e.Block_Code),n.Db(1),n.Fc(" ",e.Block_Name," ")}}function m(e,t){1&e&&(n.Vb(0,"div",39),n.Dc(1," Block is required. "),n.Ub())}function g(e,t){if(1&e){const e=n.Wb();n.Vb(0,"tr"),n.Vb(1,"th"),n.Vb(2,"mat-checkbox",40),n.cc("ngModelChange",function(e){return t.$implicit.completed=e})("ngModelChange",function(){return n.vc(e),n.gc().updateAllComplete()}),n.Ub(),n.Ub(),n.Vb(3,"th",41),n.Dc(4),n.Ub(),n.Vb(5,"td"),n.Dc(6),n.Ub(),n.Vb(7,"td"),n.Dc(8),n.Ub(),n.Vb(9,"td"),n.Dc(10),n.Ub(),n.Vb(11,"td"),n.Dc(12),n.Ub(),n.Vb(13,"td"),n.Dc(14),n.Ub(),n.Vb(15,"td"),n.Dc(16),n.Ub(),n.Vb(17,"td"),n.Dc(18),n.Ub(),n.Vb(19,"td"),n.Dc(20),n.Ub(),n.Vb(21,"td"),n.Dc(22),n.Ub(),n.Ub()}if(2&e){const e=t.$implicit,r=t.index;n.Db(2),n.mc("ngModel",e.completed),n.Db(2),n.Fc(" ",r+1," "),n.Db(2),n.Fc(" ",e.CompName," "),n.Db(2),n.Fc(" ",e.Permit_NO," "),n.Db(2),n.Fc(" ",e.FarmerId," "),n.Db(2),n.Fc(" ",e.AccountNo," "),n.Db(2),n.Fc(" ",e.IFSC," "),n.Db(2),n.Fc(" ",e.LandArea," "),n.Db(2),n.Fc(" ",e.IndicativeCost," "),n.Db(2),n.Fc(" ",e.eligible_Incentive," "),n.Db(2),n.Fc(" ",e.Farmer_Category," ")}}function v(e,t){1&e&&(n.Vb(0,"div"),n.Vb(1,"h4",42),n.Dc(2,"There is no incentive for approve in this block."),n.Ub(),n.Ub())}function $(e,t){if(1&e){const e=n.Wb();n.Vb(0,"div",6),n.Vb(1,"div",8),n.Qb(2,"div",43),n.Vb(3,"div",29),n.Vb(4,"button",44),n.cc("click",function(){return n.vc(e),n.gc().approveIncentiveList()}),n.Dc(5,"Approve"),n.Ub(),n.Ub(),n.Qb(6,"div",45),n.Ub(),n.Ub()}if(2&e){const e=n.gc();n.Db(4),n.mc("disabled",!e.forwardButton)}}const U=[{path:"",component:(()=>{class e{constructor(e,t,r,i,o){this.cdaoService=e,this.fb=t,this.toastr=r,this.layoutService=i,this.dialog=o,this.allComplete=!1,this.showApprove=!1,this.scheme="",this.message=!1,this.forwardButton=!1,this.Block_Code="",this.countPending=0,this.getBlocks=()=>Object(s.a)(this,void 0,void 0,function*(){try{this.BlockData=yield this.cdaoService.getBlocks().toPromise()}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getAllIncentive=()=>Object(s.a)(this,void 0,void 0,function*(){try{null!=this.BlockAndSchemeForm.value.block&&this.BlockAndSchemeForm.value.scheme?(this.allIncentiveResult=yield this.cdaoService.getAllIncentive(this.BlockAndSchemeForm.value.block,this.BlockAndSchemeForm.value.scheme).toPromise(),this.countPending=+this.allIncentiveResult.length,this.allIncentiveResult.forEach(e=>Object(s.a)(this,void 0,void 0,function*(){const t=yield this.cdaoService.getFarmerBankDetails(e.FarmerId).toPromise();e.AccountNo=t.VCHACCOUNTNO,e.IFSC=t.VCHIFSCCODE,e.AccountHolderName=t.VCHACCHOLDERNM,e.BankName=t.vchBankName,e.Branch_Name=t.vchBranchName,e.aadhaarNo=t.vchaadharno})),this.allIncentiveResult.length>0?(this.message=!1,this.showApprove=!0):(this.message=!0,this.showApprove=!1)):this.toastr.warning("Please select scheme")}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.approveIncentiveList=()=>Object(s.a)(this,void 0,void 0,function*(){try{const e=this.allIncentiveResult.filter(e=>e.completed);0==e.length?this.toastr.warning("Please Select atleast one Permit to approve"):(this.approveResult=yield this.cdaoService.approveIncentiveList(e).toPromise(),this.toastr.success(this.approveResult.message),this.allIncentiveResult=[],this.showApprove=!1,this.getBlocks(),this.countPending=0)}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.pageTitle="Incentive/Seed Cost Verification",this.pageDesc="Incentive/Seed Cost Verification",this.breadcrumbList=["Incentive/Seed Cost Verification"],this.BlockAndSchemeForm=this.fb.group({type:["",[c.s.required]],block:["",[c.s.required]],scheme:["",[c.s.required]]})}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getBlocks()}get BlockSchemeFormValid(){return this.BlockAndSchemeForm.controls}updateAllComplete(){this.allComplete=null!=this.allIncentiveResult&&this.allIncentiveResult.every(e=>e.completed);for(let e=0;e<this.allIncentiveResult.length;e++){if(1==this.allIncentiveResult[e].completed){this.forwardButton=!0;break}this.forwardButton=!1}}someComplete(){return null!=this.allIncentiveResult&&this.allIncentiveResult.filter(e=>e.completed).length>0&&!this.allComplete}setAll(e){this.allComplete=e,null!=this.allIncentiveResult&&(this.allIncentiveResult.forEach(t=>t.completed=e),this.forwardButton=1==this.allComplete)}}return e.\u0275fac=function(t){return new(t||e)(n.Pb(l.a),n.Pb(c.c),n.Pb(a.b),n.Pb(h.a),n.Pb(b.b))},e.\u0275cmp=n.Jb({type:e,selectors:[["app-approve-incentive-seed-cost"]],decls:94,vars:10,consts:[[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[3,"formGroup"],[1,"row"],[1,"col-sm-3","col-lg-3","col-form-label"],[1,"col-sm-6","col-lg-5"],[1,"input-group"],[1,"input-group-addon"],[1,"ion-arrow-down-b"],["formControlName","type",1,"form-control"],["value","","disabled",""],["value","inctv"],["value","seedCst"],[1,"col-sm-3","col-lg-4"],["formControlName","block",1,"form-control"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["class","text-danger",4,"ngIf"],[1,"col-sm-9","col-lg-9"],["aria-label","Select an option","formControlName","scheme"],["value","0"],["value","2"],["value","3"],["value","4"],[1,"col-sm-3","col-lg-3"],["type","button","id","primary-popover-content","data-container","body","data-toggle","popover","title","Primary color states","data-placement","bottom",1,"btn","btn-primary",3,"disabled","click"],[1,"card-block","table-border-style"],[1,"table-responsive"],[1,"table","table-hover"],[1,"example-margin",3,"checked","indeterminate","change"],[4,"ngFor","ngForOf"],[4,"ngIf"],["class","card-block",4,"ngIf"],[3,"ngValue"],[1,"text-danger"],[3,"ngModel","ngModelChange"],["scope","row"],[2,"text-align","center","color","red"],[1,"col-sm-5","col-lg-5"],[1,"btn","btn-success","btn-round",3,"disabled","click"],[1,"col-sm-4","col-lg-4"]],template:function(e,t){1&e&&(n.Vb(0,"div",0),n.Vb(1,"div",1),n.Vb(2,"h4"),n.Dc(3,"Verification Of Incentive/Seed Cost "),n.Ub(),n.Vb(4,"div",2),n.Qb(5,"i",3),n.Qb(6,"i",4),n.Qb(7,"i",5),n.Ub(),n.Ub(),n.Vb(8,"div",6),n.Vb(9,"form",7),n.Vb(10,"div",8),n.Vb(11,"label",9),n.Dc(12,"Select Type *:"),n.Ub(),n.Vb(13,"div",10),n.Vb(14,"div",11),n.Vb(15,"span",12),n.Qb(16,"i",13),n.Ub(),n.Vb(17,"select",14),n.Vb(18,"option",15),n.Dc(19,"--Select--"),n.Ub(),n.Vb(20,"option",16),n.Dc(21," Incentive "),n.Ub(),n.Vb(22,"option",17),n.Dc(23," Seed Cost "),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(24,"div",18),n.Vb(25,"label"),n.Dc(26),n.Ub(),n.Ub(),n.Ub(),n.Vb(27,"div",8),n.Vb(28,"label",9),n.Dc(29,"Select Block *:"),n.Ub(),n.Vb(30,"div",10),n.Vb(31,"div",11),n.Vb(32,"span",12),n.Qb(33,"i",13),n.Ub(),n.Vb(34,"select",19),n.Vb(35,"option",20),n.Dc(36,"--Select--"),n.Ub(),n.Cc(37,p,2,2,"option",21),n.Ub(),n.Cc(38,m,2,0,"div",22),n.Ub(),n.Ub(),n.Ub(),n.Vb(39,"div",8),n.Vb(40,"label",9),n.Dc(41,"Select Scheme *:"),n.Ub(),n.Vb(42,"div",23),n.Vb(43,"mat-radio-group",24),n.Vb(44,"mat-radio-button",25),n.Dc(45,"All Scheme"),n.Ub(),n.Vb(46,"mat-radio-button",26),n.Dc(47,"NFSM"),n.Ub(),n.Vb(48,"mat-radio-button",27),n.Dc(49,"NFSM-OS"),n.Ub(),n.Vb(50,"mat-radio-button",28),n.Dc(51,"STATE PLAN"),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(52,"div",8),n.Qb(53,"div",29),n.Vb(54,"div",23),n.Vb(55,"button",30),n.cc("click",function(){return t.getAllIncentive()}),n.Dc(56," Get Sale List "),n.Ub(),n.Ub(),n.Ub(),n.Vb(57,"div",1),n.Vb(58,"h5"),n.Dc(59,"Sale Details"),n.Ub(),n.Ub(),n.Vb(60,"div",31),n.Vb(61,"div",32),n.Vb(62,"table",33),n.Vb(63,"thead"),n.Vb(64,"tr"),n.Vb(65,"th"),n.Vb(66,"mat-checkbox",34),n.cc("change",function(e){return t.setAll(e.checked)}),n.Ub(),n.Dc(67," Select All "),n.Ub(),n.Vb(68,"th"),n.Dc(69,"SL"),n.Ub(),n.Vb(70,"th"),n.Dc(71,"Component Name"),n.Ub(),n.Vb(72,"th"),n.Dc(73,"Permit No"),n.Ub(),n.Vb(74,"th"),n.Dc(75,"Farmer Id"),n.Ub(),n.Vb(76,"th"),n.Dc(77,"Account No"),n.Ub(),n.Vb(78,"th"),n.Dc(79,"IFSC Code"),n.Ub(),n.Vb(80,"th"),n.Dc(81," Land "),n.Ub(),n.Vb(82,"th"),n.Dc(83," Incentive (Per ha.)"),n.Ub(),n.Vb(84,"th"),n.Dc(85,"Total Eligible Incentive"),n.Ub(),n.Vb(86,"th"),n.Dc(87,"Catagory"),n.Ub(),n.Ub(),n.Ub(),n.Vb(88,"tbody"),n.Cc(89,g,23,11,"tr",35),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Qb(90,"br"),n.Cc(91,v,3,0,"div",36),n.Qb(92,"br"),n.Cc(93,$,7,1,"div",37),n.Ub(),n.Ub()),2&e&&(n.Db(9),n.mc("formGroup",t.BlockAndSchemeForm),n.Db(17),n.Fc("Pending For Approval : ",t.countPending,""),n.Db(11),n.mc("ngForOf",t.BlockData),n.Db(1),n.mc("ngIf",t.BlockSchemeFormValid.block.touched&&!t.BlockSchemeFormValid.block.valid),n.Db(17),n.mc("disabled",!t.BlockAndSchemeForm.valid),n.Db(11),n.mc("checked",t.allComplete)("indeterminate",t.someComplete()),n.Db(23),n.mc("ngForOf",t.allIncentiveResult),n.Db(2),n.mc("ngIf",t.message),n.Db(2),n.mc("ngIf",t.showApprove))},directives:[c.t,c.k,c.e,c.r,c.j,c.d,c.n,c.u,i.j,i.k,d.b,d.a,u.a,c.m],styles:[".mat-radio-button[_ngcontent-%COMP%] ~ .mat-radio-button[_ngcontent-%COMP%]{margin-left:16px}"]}),e})()}];let C=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.Nb({type:e}),e.\u0275inj=n.Mb({imports:[[o.d.forChild(U)],o.d]}),e})();var D=r("m1XX"),I=r("NFeN");let V=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.Nb({type:e}),e.\u0275inj=n.Mb({imports:[[i.b,C,c.f,c.p,u.b,d.c,b.f,I.b,D.b]]}),e})()}}]);
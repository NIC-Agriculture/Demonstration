(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"5KCI":function(t,e,r){"use strict";r.d(e,"a",function(){return a});var i=r("AytR"),n=r("fXoL"),o=r("tyNb"),s=r("tk/3");let a=(()=>{class t{constructor(t,e){this.router=t,this.http=e,this.serverUrl=i.a.serverUrl,this.route="bao",this.withCredential={withCredentials:!0}}getGPs(){return this.http.get(`${this.serverUrl}/${this.route}/getGPs`)}assignVAW(t){return this.http.get(`${this.serverUrl}/${this.route}/assignVAW?Gp_Code=${t}`)}getBlockTarget(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getBlockTarget?schemeId=${t}&SubschemeId=${e}&CompId=${r}&Fin_Year=${i}`)}SubmitDemonstrationPatch(t){return this.http.post(`${this.serverUrl}/${this.route}/SubmitDemonstrationPatch`,t)}getAllScheme(){return this.http.get(`${this.serverUrl}/${this.route}/getAllScheme`)}getSubscheme(t){return this.http.get(`${this.serverUrl}/${this.route}/getSubscheme?schemeId=${t}`)}getComponent(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getComponent?SubschemeId=${t}&Fin_Year=${e}`)}getDemonstrationData(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationData?CompId=${t}&Fin_Year=${e}`)}getAllDemonstrationData(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllDemonstrationData?Fin_Year=${t}`)}getVerifiedDemonstrationData(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getVerifiedDemonstrationData?Fin_Year=${t}&schemeId=${e}&SubschemeId=${r}&CompId=${i}`)}getDemoIDToBeConfirmed(){return this.http.get(`${this.serverUrl}/${this.route}/getDemoIDToBeConfirmed`)}getItemDetails(t){return this.http.get(`${this.serverUrl}/${this.route}/getItemDetails?bp_ItemId=${t}`)}getAllFarmerList(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerList?DemonstrationId=${t}`)}getAllApprovedFarmerList(t){return this.http.get(`${this.serverUrl}/vaw/getAllApprovedFarmerList?DemonstrationId=${t}`)}getTotalLandCount(t){return this.http.get(`${this.serverUrl}/vaw/getTotalLandCount?DemonstrationId=${t}`)}getTotalSeedCount(t){return this.http.get(`${this.serverUrl}/vaw/getTotalSeedCount?CompId=${t}`)}confirmDemonstrationPatch(t){return this.http.get(`${this.serverUrl}/${this.route}/confirmDemonstrationPatch?DemonstrationId=${t}`)}getAllDealerSale(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllDealerSale?DemonstrationId=${t}`)}getDealerSaleReciept(t){return this.http.get(`${this.serverUrl}/${this.route}/getDealerSaleReciept?InvoiceNo=${t}`)}getVAWSaleReciept(t){return this.http.get(`${this.serverUrl}/${this.route}/getVAWSaleReciept?Permit_NO=${t}`)}confirmDealerSale(t){return this.http.post(`${this.serverUrl}/${this.route}/confirmDealerSale`,t)}ReconfirmDealerSale(t){return this.http.post(`${this.serverUrl}/${this.route}/ReconfirmDealerSale`,t)}getAvailableTarget(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getAvailableTarget?Fin_Year=${t}&schemeId=${e}`)}getWardData(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getWardData?WardCode=${t}&DemostrationId=${e}`)}getclusterDemonstration(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getclusterDemonstration?Fin_Year=${t}&schemeId=${e}&SubschemeId=${r}&CompId=${i}`)}getDemonstrationIdCount(){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationIdCount`)}getSeedDistributionStatus(){return this.http.get(`${this.serverUrl}/${this.route}/getSeedDistributionStatus`)}returnBackToVAW(t){return this.http.post(`${this.serverUrl}/${this.route}/returnBackToVAW`,t)}getDemonstrationStatusReport(t,e,r){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationStatusReport?Fin_Year=${t}&schemeId=${e}&season=${r}`)}fieldDemonstrationIdPhaseDetails(t,e){return this.http.get(`${this.serverUrl}/${this.route}/fieldDemonstrationIdPhaseDetails?Fin_Year=${t}&schemeId=${e}`)}getFieldDemonstrationPhotos(t){return this.http.get(`${this.serverUrl}/${this.route}/getFieldDemonstrationPhotos?DemostrationId=${t}`)}deleteDemoID(t){return this.http.get(`${this.serverUrl}/${this.route}/deleteDemoID?DemostrationId=${t}`)}getCalculatedInputCost(){return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedInputCost`)}getCalculatedIncentiveCost(){return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedIncentiveCost`)}getEligibleDemonstrationData(){return this.http.get(`${this.serverUrl}/${this.route}/getEligibleDemonstrationData`)}getAllFarmerTrapData(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerTrapData?DemonstrationId=${t}`)}submitTrapsData(t){return this.http.post(`${this.serverUrl}/${this.route}/submitTrapsData`,t)}updateTrapsData(t){return this.http.post(`${this.serverUrl}/${this.route}/updateTrapsData`,t)}getFarmerGp(t){return this.http.get(`https://mkuy.apicol.nic.in/api/FarmerData/Fdetails?fid=${t}`,{headers:{skip:"true"}})}confirmTrapsData(t){return this.http.get(`${this.serverUrl}/${this.route}/confirmTrapsData?DemonstrationId=${t}`)}returnToDealer(t){return this.http.post(`${this.serverUrl}/${this.route}/returnToDealer`,t)}returnedSaleCDAOToDealer(t){return this.http.post(`${this.serverUrl}/${this.route}/returnedSaleCDAOToDealer`,t)}getAllApprovedDealerSale(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllApprovedDealerSale?DemonstrationId=${t}`)}getReturnedByCDAODealerSale(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getReturnedByCDAODealerSale?DemonstrationId=${i}&Fin_Year=${r}&SubschemeId=${t}&CompId=${e}`)}getReturnedToDealerSale(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getReturnedToDealerSale?DemonstrationId=${i}&Fin_Year=${r}&SubschemeId=${t}&CompId=${e}`)}getGp(t){return this.http.get(`${this.serverUrl}/${this.route}/getGp?DemostrationId=${t}`)}}return t.\u0275fac=function(e){return new(e||t)(n.Zb(o.a),n.Zb(s.b))},t.\u0275prov=n.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},MMbJ:function(t,e,r){"use strict";r.r(e),r.d(e,"SeedRequiredModule",function(){return U});var i=r("ofXK"),n=r("tyNb"),o=r("mrSG"),s=r("JcrP"),a=r("fXoL"),l=r("5KCI"),h=r("5eHb"),c=r("4TgG"),d=r("3Pt+"),b=r("m1XX");function u(t,e){if(1&t&&(a.Vb(0,"option",21),a.Ec(1),a.Ub()),2&t){const t=e.$implicit;a.mc("ngValue",t),a.Db(1),a.Gc(" ",t," ")}}function m(t,e){if(1&t&&(a.Vb(0,"option",21),a.Ec(1),a.Ub()),2&t){const t=e.$implicit;a.mc("ngValue",t),a.Db(1),a.Fc(t.DemostrationId)}}function g(t,e){if(1&t&&(a.Vb(0,"tr"),a.Vb(1,"th",28),a.Ec(2),a.Ub(),a.Vb(3,"td"),a.Ec(4),a.Ub(),a.Vb(5,"td"),a.Ec(6),a.Ub(),a.Vb(7,"td"),a.Ec(8),a.Ub(),a.Vb(9,"td"),a.Ec(10),a.Ub(),a.Vb(11,"td"),a.Ec(12),a.Ub(),a.Ub()),2&t){const t=e.$implicit,r=e.index;a.Db(2),a.Gc(" ",r+1," "),a.Db(2),a.Gc(" ",t.FarmerId," "),a.Db(2),a.Gc(" ",t.FarmerName," "),a.Db(2),a.Gc(" ",t.LandArea," "),a.Db(2),a.Gc(" ",t.seedrequired," Kg"),a.Db(2),a.Gc(" ",t.bpseedrequired||0," Kg ")}}function p(t,e){if(1&t){const t=a.Wb();a.Vb(0,"div",2),a.Vb(1,"div",4),a.Vb(2,"button",29),a.Qb(3,"i",30),a.Ec(4,"Print"),a.Ub(),a.Vb(5,"button",31),a.cc("click",function(){return a.wc(t),a.gc(2).exportexcel()}),a.Qb(6,"i",32),a.Ec(7," Export to Excel "),a.Ub(),a.Ub(),a.Ub()}2&t&&(a.Db(2),a.mc("useExistingCss",!0))}function D(t,e){if(1&t&&(a.Vb(0,"div",22),a.Vb(1,"div",23),a.Vb(2,"table",24),a.Vb(3,"thead"),a.Vb(4,"tr",25),a.Vb(5,"th"),a.Ec(6,"#"),a.Ub(),a.Vb(7,"th"),a.Ec(8,"Farmer Id"),a.Ub(),a.Vb(9,"th"),a.Ec(10,"Farmer Name"),a.Ub(),a.Vb(11,"th"),a.Ec(12,"Land(in ha)"),a.Ub(),a.Vb(13,"th"),a.Ec(14,"Seed"),a.Ub(),a.Vb(15,"th"),a.Ec(16,"Seed(Bund Plant.)"),a.Ub(),a.Ub(),a.Ub(),a.Vb(17,"tbody"),a.Qb(18,"tr"),a.Dc(19,g,13,6,"tr",26),a.Ub(),a.Ub(),a.Ub(),a.Qb(20,"br"),a.Dc(21,p,8,1,"div",27),a.Ub()),2&t){const t=a.gc();a.Db(19),a.mc("ngForOf",t.farmer_list),a.Db(2),a.mc("ngIf",!t.message)}}function v(t,e){1&t&&(a.Vb(0,"div"),a.Vb(1,"h4",33),a.Ec(2,"There is no data available in this DemonstrationId"),a.Ub(),a.Ub())}const $=[{path:"",component:(()=>{class t{constructor(t,e,r){this.baoService=t,this.toastr=e,this.layoutService=r,this.farmerListTable=!1,this.message=!1,this.fileName="DemonstrationWiseSeedRequired.xlsx",this.getFinYear=()=>Object(o.a)(this,void 0,void 0,function*(){try{const t=yield this.layoutService.getFinYear().toPromise();this.FinYears=t.Years,this.Season=t.Season}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getAllDemonstrationData=()=>Object(o.a)(this,void 0,void 0,function*(){try{this.demonstrationId=[],this.scheme="",this.subscheme="",this.compName="",this.crop="",this.cropVariety="",this.bpCrop="",this.bpCropVariety="",this.totalLand="",this.totalSeedInQuintal="",this.totalBPSeedInQuintal="",this.farmerListTable=!1,this.demonstrationData=yield this.baoService.getAllDemonstrationData(this.FinYear).toPromise()}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getDemonstrationStatus=()=>Object(o.a)(this,void 0,void 0,function*(){try{1==this.demonstrationId.ConfirmBy_vaw&&1==this.demonstrationId.ConfirmBy_BAO?(this.getAllApprovedFarmerList(this.demonstrationId.DemostrationId),this.scheme=this.demonstrationId.schemeName,this.subscheme=this.demonstrationId.SubschemeName,this.compName=this.demonstrationId.CompName,this.crop=this.demonstrationId.SubCropName,this.cropVariety=this.demonstrationId.Variety_Name,this.bpCrop=this.demonstrationId.bpsubcropname,this.bpCropVariety=this.demonstrationId.bpcropvariety,this.getItemDetails(this.demonstrationId.bp_ItemId)):1==this.demonstrationId.ConfirmBy_vaw&&null==this.demonstrationId.ConfirmBy_BAO?(this.toastr.warning(`This Demonstration Patch is not verified.Please Verify and Confirm the Demonstration Id ${this.demonstrationId.DemostrationId}`),this.farmerListTable=!1):(this.farmerListTable=!1,this.toastr.warning("Please final submit the registered farmers against this Demonstration Id."))}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getItemDetails=t=>Object(o.a)(this,void 0,void 0,function*(){try{t&&(this.bpItemDetails=yield this.baoService.getItemDetails(t).toPromise(),this.BptotalSeed=+this.totalLand*+this.bpItemDetails.itemPackageSize,this.totalBPSeedInQuintal=.01*+this.BptotalSeed)}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getAllApprovedFarmerList=t=>Object(o.a)(this,void 0,void 0,function*(){try{this.farmerListTable=!0,this.getTotalLandCount(),this.farmer_list=yield this.baoService.getAllApprovedFarmerList(t).toPromise()}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getTotalLandCount=()=>Object(o.a)(this,void 0,void 0,function*(){this.totalLandCount=yield this.baoService.getTotalLandCount(this.demonstrationId.DemostrationId).toPromise(),this.totalLand=this.totalLandCount[0].totalland,this.getTotalSeedCount()}),this.getTotalSeedCount=()=>Object(o.a)(this,void 0,void 0,function*(){this.totalSeedCount=yield this.baoService.getTotalSeedCount(this.demonstrationId.CompId).toPromise(),this.totalSeed=+this.totalLand*+this.totalSeedCount[0].Seed_Per_ha,this.totalSeedInQuintal=.01*+this.totalSeed}),this.pageTitle="Seed Required",this.pageDesc="Report/Seed Required",this.breadcrumbList=["Report/Seed Required"]}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getFinYear()}exportexcel(){let t=document.getElementById("excel-table");const e=s.a.table_to_sheet(t),r=s.a.book_new();s.a.book_append_sheet(r,e,"Sheet1"),s.b(r,this.fileName)}}return t.\u0275fac=function(e){return new(e||t)(a.Pb(l.a),a.Pb(h.b),a.Pb(c.a))},t.\u0275cmp=a.Jb({type:t,selectors:[["app-seed-required"]],decls:80,vars:26,consts:[[1,"card"],[1,"card-block"],[1,"row"],[1,"col-sm-12"],[1,"col-md-12"],[1,"form-group","row"],[1,"col-sm-4","col-lg-2"],["for","demonstrationId",1,"block"],[1,"asterik"],[1,"col-sm-4","col-lg-4"],["id","FinYear",1,"form-control","form-control-default",3,"ngModel","ngModelChange","change"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["id","demonstrationId",1,"required","form-control",3,"ngModel","ngModelChange","change"],["id","print-section",1,"card-block"],["for","component","ngDefaultControl","",1,"block",2,"font-weight","bold",3,"ngModel","ngModelChange"],["ngDefaultControl","",1,"col-sm-4","col-lg-4",2,"font-weight","bold",3,"ngModel","ngModelChange"],["for","farmerId","ngDefaultControl","",1,"block",2,"font-weight","bold",3,"ngModel","ngModelChange"],[1,"col-sm-4","col-lg-4",2,"font-weight","bold",3,"ngModel","ngModelChange"],["class","card-block table-border-style",4,"ngIf"],[4,"ngIf"],[3,"ngValue"],[1,"card-block","table-border-style"],["id","excel-table",1,"table-responsive"],[1,"table","table-styling"],[1,"table-primary"],[4,"ngFor","ngForOf"],["class","row",4,"ngIf"],["scope","row"],["printSectionId","print-section","ngxPrint","",1,"btn","btn-primary","mat-elevation-z8","float-right",3,"useExistingCss"],[1,"icofont","icofont-print"],[1,"btn","btn-primary","mat-elevation-z8","float-right",2,"margin-right","10px",3,"click"],[1,"ion-ios-upload"],[2,"text-align","center","color","red"]],template:function(t,e){1&t&&(a.Vb(0,"div",0),a.Vb(1,"div",1),a.Vb(2,"div",2),a.Vb(3,"div",3),a.Vb(4,"div",2),a.Vb(5,"div",4),a.Vb(6,"div",5),a.Vb(7,"div",6),a.Vb(8,"label",7),a.Ec(9,"Financial Year "),a.Vb(10,"label",8),a.Ec(11,"*"),a.Ub(),a.Ec(12,":"),a.Ub(),a.Ub(),a.Vb(13,"div",9),a.Vb(14,"select",10),a.cc("ngModelChange",function(t){return e.FinYear=t})("change",function(){return e.getAllDemonstrationData()}),a.Vb(15,"option",11),a.Ec(16,"--Select--"),a.Ub(),a.Dc(17,u,2,2,"option",12),a.Ub(),a.Ub(),a.Vb(18,"div",6),a.Vb(19,"label",7),a.Ec(20,"Demonstration ID "),a.Vb(21,"label",8),a.Ec(22,"*"),a.Ub(),a.Ec(23,":"),a.Ub(),a.Ub(),a.Vb(24,"div",9),a.Vb(25,"select",13),a.cc("ngModelChange",function(t){return e.demonstrationId=t})("change",function(){return e.getDemonstrationStatus()}),a.Vb(26,"option",11),a.Ec(27,"--Select--"),a.Ub(),a.Dc(28,m,2,2,"option",12),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Vb(29,"div",0),a.Vb(30,"div",14),a.Vb(31,"div",2),a.Vb(32,"div",3),a.Vb(33,"div",2),a.Vb(34,"div",4),a.Vb(35,"div",5),a.Vb(36,"div",9),a.Vb(37,"label",15),a.cc("ngModelChange",function(t){return e.scheme=t}),a.Ec(38),a.Ub(),a.Ub(),a.Vb(39,"div",16),a.cc("ngModelChange",function(t){return e.subscheme=t}),a.Ec(40),a.Ub(),a.Vb(41,"div",9),a.Vb(42,"label",15),a.cc("ngModelChange",function(t){return e.compName=t}),a.Ec(43),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Vb(44,"div",2),a.Vb(45,"div",3),a.Vb(46,"div",2),a.Vb(47,"div",4),a.Vb(48,"div",5),a.Vb(49,"div",16),a.cc("ngModelChange",function(t){return e.totalLand=t}),a.Ec(50),a.Ub(),a.Vb(51,"div",9),a.Vb(52,"label",15),a.cc("ngModelChange",function(t){return e.crop=t}),a.Ec(53),a.Ub(),a.Ub(),a.Vb(54,"div",16),a.cc("ngModelChange",function(t){return e.cropVariety=t}),a.Ec(55),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Vb(56,"div",2),a.Vb(57,"div",3),a.Vb(58,"div",2),a.Vb(59,"div",4),a.Vb(60,"div",5),a.Vb(61,"div",16),a.cc("ngModelChange",function(t){return e.totalSeed=t}),a.Ec(62),a.Ub(),a.Vb(63,"div",9),a.Vb(64,"label",17),a.cc("ngModelChange",function(t){return e.bpCrop=t}),a.Ec(65),a.Ub(),a.Ub(),a.Vb(66,"div",16),a.cc("ngModelChange",function(t){return e.bpCropVariety=t}),a.Ec(67),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Vb(68,"div",2),a.Vb(69,"div",3),a.Vb(70,"div",2),a.Vb(71,"div",4),a.Vb(72,"div",5),a.Vb(73,"div",18),a.cc("ngModelChange",function(t){return e.BptotalSeed=t}),a.Ec(74),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Qb(75,"br"),a.Dc(76,D,22,2,"div",19),a.Ub(),a.Qb(77,"br"),a.Dc(78,v,3,0,"div",20),a.Qb(79,"br"),a.Ub()),2&t&&(a.Db(14),a.mc("ngModel",e.FinYear),a.Db(3),a.mc("ngForOf",e.FinYears),a.Db(8),a.mc("ngModel",e.demonstrationId),a.Db(3),a.mc("ngForOf",e.demonstrationData),a.Db(9),a.mc("ngModel",e.scheme),a.Db(1),a.Gc("Scheme: \xa0 ",e.scheme," "),a.Db(1),a.mc("ngModel",e.subscheme),a.Db(1),a.Gc(" Subscheme: \xa0 ",e.subscheme," "),a.Db(2),a.mc("ngModel",e.compName),a.Db(1),a.Gc("Component: \xa0 ",e.compName,""),a.Db(6),a.mc("ngModel",e.totalLand),a.Db(1),a.Gc(" Total Land (in ha): \xa0 ",e.totalLand," "),a.Db(2),a.mc("ngModel",e.crop),a.Db(1),a.Gc(" Crop: \xa0 ",e.crop,""),a.Db(1),a.mc("ngModel",e.cropVariety),a.Db(1),a.Gc(" Crop variety: \xa0 ",e.cropVariety," "),a.Db(6),a.mc("ngModel",e.totalSeed),a.Db(1),a.Gc(" Total Seed Required (in Quintal): ",e.totalSeedInQuintal," "),a.Db(2),a.mc("ngModel",e.bpCrop),a.Db(1),a.Gc("Crop(Bund Plant.): \xa0 ",e.bpCrop||"- -",""),a.Db(1),a.mc("ngModel",e.bpCropVariety),a.Db(1),a.Gc(" Crop Variety(Bund Plant.): \xa0",e.bpCropVariety||"- -"," "),a.Db(6),a.mc("ngModel",e.BptotalSeed),a.Db(1),a.Gc(" Total Seed Required(Bund Plant.)(Quintal): ",e.totalBPSeedInQuintal||0," "),a.Db(2),a.mc("ngIf",e.farmerListTable),a.Db(2),a.mc("ngIf",e.message))},directives:[d.r,d.j,d.m,d.n,d.u,i.k,d.b,i.l,b.a],styles:['.asterik[_ngcontent-%COMP%]{content:"*";color:red}']}),t})()}];let f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.Nb({type:t}),t.\u0275inj=a.Mb({imports:[[n.d.forChild($)],n.d]}),t})(),U=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.Nb({type:t}),t.\u0275inj=a.Mb({imports:[[i.c,f,d.f,d.p,b.b]]}),t})()},m1XX:function(t,e,r){"use strict";r.d(e,"a",function(){return n}),r.d(e,"b",function(){return o});var i=r("fXoL");let n=(()=>{class t{constructor(){this._printStyle=[],this.useExistingCss=!1,this.printDelay=0,this._styleSheetFile=""}set printStyle(t){for(let e in t)t.hasOwnProperty(e)&&this._printStyle.push((e+JSON.stringify(t[e])).replace(/['"]+/g,""));this.returnStyleValues()}returnStyleValues(){return`<style> ${this._printStyle.join(" ").replace(/,/g,";")} </style>`}set styleSheetFile(t){let e=function(t){return`<link rel="stylesheet" type="text/css" href="${t}">`};if(-1!==t.indexOf(",")){const r=t.split(",");for(let t of r)this._styleSheetFile=this._styleSheetFile+e(t)}else this._styleSheetFile=e(t)}returnStyleSheetLinkTags(){return this._styleSheetFile}getElementTag(t){const e=[],r=document.getElementsByTagName(t);for(let i=0;i<r.length;i++)e.push(r[i].outerHTML);return e.join("\r\n")}getFormData(t){for(var e=0;e<t.length;e++)t[e].defaultValue=t[e].value,t[e].checked&&(t[e].defaultChecked=!0)}getHtmlContents(){let t=document.getElementById(this.printSectionId),e=t.getElementsByTagName("input");this.getFormData(e);let r=t.getElementsByTagName("textarea");return this.getFormData(r),t.innerHTML}print(){let t,e,r="",i="";const n=this.getElementTag("base");this.useExistingCss&&(r=this.getElementTag("style"),i=this.getElementTag("link")),t=this.getHtmlContents(),e=window.open("","_blank","top=0,left=0,height=auto,width=auto"),e.document.open(),e.document.write(`\n      <html>\n        <head>\n          <title>${this.printTitle?this.printTitle:""}</title>\n          ${n}\n          ${this.returnStyleValues()}\n          ${this.returnStyleSheetLinkTags()}\n          ${r}\n          ${i}\n        </head>\n        <body>\n          ${t}\n          <script defer>\n            function triggerPrint(event) {\n              window.removeEventListener('load', triggerPrint, false);\n              setTimeout(function() {\n                closeWindow(window.print());\n              }, ${this.printDelay});\n            }\n            function closeWindow(){\n                window.close();\n            }\n            window.addEventListener('load', triggerPrint, false);\n          <\/script>\n        </body>\n      </html>`),e.document.close()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=i.Kb({type:t,selectors:[["button","ngxPrint",""]],hostBindings:function(t,e){1&t&&i.cc("click",function(){return e.print()})},inputs:{useExistingCss:"useExistingCss",printDelay:"printDelay",printStyle:"printStyle",styleSheetFile:"styleSheetFile",printSectionId:"printSectionId",printTitle:"printTitle"}}),t})(),o=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Nb({type:t}),t.\u0275inj=i.Mb({imports:[[]]}),t})()}}]);
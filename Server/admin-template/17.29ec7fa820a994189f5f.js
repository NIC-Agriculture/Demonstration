(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"5KCI":function(t,e,r){"use strict";r.d(e,"a",function(){return a});var i=r("AytR"),s=r("fXoL"),n=r("tyNb"),o=r("tk/3");let a=(()=>{class t{constructor(t,e){this.router=t,this.http=e,this.serverUrl=i.a.serverUrl,this.route="bao",this.withCredential={withCredentials:!0}}getGPs(){return this.http.get(`${this.serverUrl}/${this.route}/getGPs`)}assignVAW(t){return this.http.get(`${this.serverUrl}/${this.route}/assignVAW?Gp_Code=${t}`)}getBlockTarget(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getBlockTarget?schemeId=${t}&SubschemeId=${e}&CompId=${r}&Fin_Year=${i}`)}SubmitDemonstrationPatch(t){return this.http.post(`${this.serverUrl}/${this.route}/SubmitDemonstrationPatch`,t)}getAllScheme(){return this.http.get(`${this.serverUrl}/${this.route}/getAllScheme`)}getSubscheme(t){return this.http.get(`${this.serverUrl}/${this.route}/getSubscheme?schemeId=${t}`)}getComponent(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getComponent?SubschemeId=${t}&Fin_Year=${e}`)}getDemonstrationData(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationData?CompId=${t}&Fin_Year=${e}`)}getAllDemonstrationData(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllDemonstrationData?Fin_Year=${t}`)}getVerifiedDemonstrationData(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getVerifiedDemonstrationData?Fin_Year=${t}&schemeId=${e}&SubschemeId=${r}&CompId=${i}`)}getDemoIDToBeConfirmed(){return this.http.get(`${this.serverUrl}/${this.route}/getDemoIDToBeConfirmed`)}getItemDetails(t){return this.http.get(`${this.serverUrl}/${this.route}/getItemDetails?bp_ItemId=${t}`)}getAllFarmerList(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerList?DemonstrationId=${t}`)}getAllApprovedFarmerList(t){return this.http.get(`${this.serverUrl}/vaw/getAllApprovedFarmerList?DemonstrationId=${t}`)}getTotalLandCount(t){return this.http.get(`${this.serverUrl}/vaw/getTotalLandCount?DemonstrationId=${t}`)}getTotalSeedCount(t){return this.http.get(`${this.serverUrl}/vaw/getTotalSeedCount?CompId=${t}`)}confirmDemonstrationPatch(t){return this.http.get(`${this.serverUrl}/${this.route}/confirmDemonstrationPatch?DemonstrationId=${t}`)}getAllDealerSale(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllDealerSale?DemonstrationId=${t}`)}getDealerSaleReciept(t){return this.http.get(`${this.serverUrl}/${this.route}/getDealerSaleReciept?InvoiceNo=${t}`)}getVAWSaleReciept(t){return this.http.get(`${this.serverUrl}/${this.route}/getVAWSaleReciept?Permit_NO=${t}`)}confirmDealerSale(t){return this.http.post(`${this.serverUrl}/${this.route}/confirmDealerSale`,t)}ReconfirmDealerSale(t){return this.http.post(`${this.serverUrl}/${this.route}/ReconfirmDealerSale`,t)}getAvailableTarget(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getAvailableTarget?Fin_Year=${t}&schemeId=${e}`)}getWardData(t,e){return this.http.get(`${this.serverUrl}/${this.route}/getWardData?WardCode=${t}&DemostrationId=${e}`)}getclusterDemonstration(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getclusterDemonstration?Fin_Year=${t}&schemeId=${e}&SubschemeId=${r}&CompId=${i}`)}getDemonstrationIdCount(){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationIdCount`)}getSeedDistributionStatus(){return this.http.get(`${this.serverUrl}/${this.route}/getSeedDistributionStatus`)}returnBackToVAW(t){return this.http.post(`${this.serverUrl}/${this.route}/returnBackToVAW`,t)}getDemonstrationStatusReport(t,e,r){return this.http.get(`${this.serverUrl}/${this.route}/getDemonstrationStatusReport?Fin_Year=${t}&schemeId=${e}&season=${r}`)}fieldDemonstrationIdPhaseDetails(t,e){return this.http.get(`${this.serverUrl}/${this.route}/fieldDemonstrationIdPhaseDetails?Fin_Year=${t}&schemeId=${e}`)}getFieldDemonstrationPhotos(t){return this.http.get(`${this.serverUrl}/${this.route}/getFieldDemonstrationPhotos?DemostrationId=${t}`)}deleteDemoID(t){return this.http.get(`${this.serverUrl}/${this.route}/deleteDemoID?DemostrationId=${t}`)}getCalculatedInputCost(){return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedInputCost`)}getCalculatedIncentiveCost(){return this.http.get(`${this.serverUrl}/${this.route}/getCalculatedIncentiveCost`)}getEligibleDemonstrationData(){return this.http.get(`${this.serverUrl}/${this.route}/getEligibleDemonstrationData`)}getAllFarmerTrapData(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllFarmerTrapData?DemonstrationId=${t}`)}submitTrapsData(t){return this.http.post(`${this.serverUrl}/${this.route}/submitTrapsData`,t)}updateTrapsData(t){return this.http.post(`${this.serverUrl}/${this.route}/updateTrapsData`,t)}getFarmerGp(t){return this.http.get(`https://mkuy.apicol.nic.in/api/FarmerData/Fdetails?fid=${t}`,{headers:{skip:"true"}})}confirmTrapsData(t){return this.http.get(`${this.serverUrl}/${this.route}/confirmTrapsData?DemonstrationId=${t}`)}returnToDealer(t){return this.http.post(`${this.serverUrl}/${this.route}/returnToDealer`,t)}returnedSaleCDAOToDealer(t){return this.http.post(`${this.serverUrl}/${this.route}/returnedSaleCDAOToDealer`,t)}getAllApprovedDealerSale(t){return this.http.get(`${this.serverUrl}/${this.route}/getAllApprovedDealerSale?DemonstrationId=${t}`)}getReturnedByCDAODealerSale(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getReturnedByCDAODealerSale?DemonstrationId=${i}&Fin_Year=${r}&SubschemeId=${t}&CompId=${e}`)}getReturnedToDealerSale(t,e,r,i){return this.http.get(`${this.serverUrl}/${this.route}/getReturnedToDealerSale?DemonstrationId=${i}&Fin_Year=${r}&SubschemeId=${t}&CompId=${e}`)}getGp(t){return this.http.get(`${this.serverUrl}/${this.route}/getGp?DemostrationId=${t}`)}}return t.\u0275fac=function(e){return new(e||t)(s.Zb(n.a),s.Zb(o.b))},t.\u0275prov=s.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},I3mi:function(t,e,r){"use strict";r.d(e,"a",function(){return V});var i=r("mrSG"),s=r("3Pt+"),n=r("JcrP"),o=r("fXoL"),a=r("5KCI"),l=r("4TgG"),c=r("5eHb"),h=r("ofXK"),b=r("m1XX");function u(t,e){if(1&t&&(o.Vb(0,"option",26),o.Ec(1),o.Ub()),2&t){const t=e.$implicit;o.mc("ngValue",t),o.Db(1),o.Gc(" ",t," ")}}function m(t,e){1&t&&(o.Vb(0,"div",27),o.Ec(1," Financial Year is required. "),o.Ub())}function d(t,e){if(1&t&&(o.Vb(0,"option",26),o.Ec(1),o.Ub()),2&t){const t=e.$implicit;o.mc("ngValue",t.schemeId),o.Db(1),o.Gc(" ",t.schemeName," ")}}function g(t,e){1&t&&(o.Vb(0,"div",27),o.Ec(1," Scheme is required. "),o.Ub())}function p(t,e){if(1&t&&(o.Vb(0,"option",26),o.Ec(1),o.Ub()),2&t){const t=e.$implicit;o.mc("ngValue",t.SubschemeId),o.Db(1),o.Gc(" ",t.SubschemeName," ")}}function D(t,e){1&t&&(o.Vb(0,"div",27),o.Ec(1," Subscheme is required. "),o.Ub())}function v(t,e){if(1&t&&(o.Vb(0,"option",26),o.Ec(1),o.Ub()),2&t){const t=e.$implicit;o.mc("ngValue",t.CompId),o.Db(1),o.Gc(" ",t.CompName," ")}}function $(t,e){1&t&&(o.Vb(0,"div",27),o.Ec(1," Component is required. "),o.Ub())}function f(t,e){if(1&t&&(o.Vb(0,"tr"),o.Vb(1,"td"),o.Ec(2),o.Ub(),o.Vb(3,"td"),o.Ec(4),o.Ub(),o.Vb(5,"td"),o.Ec(6),o.Ub(),o.Vb(7,"td"),o.Ec(8),o.Ub(),o.Vb(9,"td"),o.Ec(10),o.Ub(),o.Vb(11,"td"),o.Ec(12),o.Ub(),o.Vb(13,"td"),o.Ec(14),o.Ub(),o.Vb(15,"td"),o.Ec(16),o.Ub(),o.Vb(17,"td"),o.Ec(18),o.Ub(),o.Vb(19,"td"),o.Ec(20),o.Ub(),o.Vb(21,"td"),o.Ec(22),o.Ub(),o.Vb(23,"td"),o.Ec(24),o.Ub(),o.Vb(25,"td"),o.Ec(26),o.Ub(),o.Vb(27,"td"),o.Ec(28),o.Ub(),o.Vb(29,"td"),o.Ec(30),o.Ub(),o.Ub()),2&t){const t=e.$implicit,r=e.index;o.Db(2),o.Gc(" ",r+1," "),o.Db(2),o.Gc(" ",t.DemostrationId," "),o.Db(2),o.Gc(" ",t.CompName," "),o.Db(2),o.Gc(" ",t.Gp_Name||"--"," "),o.Db(2),o.Gc(" ",t.WardName||"--"," "),o.Db(2),o.Gc(" ",t.vaw_userId," "),o.Db(2),o.Gc(" ",t.PhyGen," "),o.Db(2),o.Gc(" ",t.PhySCP," "),o.Db(2),o.Gc(" ",t.PhyTasp," "),o.Db(2),o.Gc(" ",t.AvlPhyGen," "),o.Db(2),o.Gc(" ",t.AvlPhySCP," "),o.Db(2),o.Gc(" ",t.AvlPhyTASP," "),o.Db(2),o.Gc(" ",t.GenFarmer," "),o.Db(2),o.Gc(" ",t.SCFarmer," "),o.Db(2),o.Gc(" ",t.STFarmer," ")}}function U(t,e){if(1&t){const t=o.Wb();o.Vb(0,"div",0),o.Vb(1,"div",28),o.Vb(2,"div",6),o.Vb(3,"div",29),o.Vb(4,"table",30),o.Vb(5,"thead"),o.Vb(6,"tr"),o.Vb(7,"th",31),o.Ec(8,"#"),o.Ub(),o.Vb(9,"th",32),o.Ec(10," Demonstration Id "),o.Ub(),o.Vb(11,"th",32),o.Ec(12," Component "),o.Ub(),o.Vb(13,"th",32),o.Ec(14," GP "),o.Ub(),o.Vb(15,"th",32),o.Ec(16," Ward Name "),o.Ub(),o.Vb(17,"th",32),o.Ec(18," Assigned VAW "),o.Ub(),o.Vb(19,"th",33),o.Ec(20," Total Target Allotment "),o.Ub(),o.Vb(21,"th",33),o.Ec(22," Total Available Target "),o.Ub(),o.Vb(23,"th",33),o.Ec(24," Benificiary Tagged "),o.Ub(),o.Ub(),o.Vb(25,"tr"),o.Vb(26,"th",34),o.Ec(27," General "),o.Ub(),o.Vb(28,"th",34),o.Ec(29," SCP "),o.Ub(),o.Vb(30,"th",34),o.Ec(31," TASP "),o.Ub(),o.Vb(32,"th",34),o.Ec(33," General "),o.Ub(),o.Vb(34,"th",34),o.Ec(35," SCP "),o.Ub(),o.Vb(36,"th",34),o.Ec(37," TASP "),o.Ub(),o.Vb(38,"th",34),o.Ec(39," General "),o.Ub(),o.Vb(40,"th",34),o.Ec(41," SCP "),o.Ub(),o.Vb(42,"th",34),o.Ec(43," TASP "),o.Ub(),o.Ub(),o.Ub(),o.Vb(44,"tbody"),o.Dc(45,f,31,15,"tr",35),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Vb(46,"div",6),o.Vb(47,"div",8),o.Vb(48,"div",36),o.Vb(49,"button",37),o.Qb(50,"i",38),o.Ec(51,"Print"),o.Ub(),o.Vb(52,"button",39),o.cc("click",function(){return o.wc(t),o.gc().exportexcel()}),o.Qb(53,"i",40),o.Ec(54," Export to Excel "),o.Ub(),o.Ub(),o.Ub(),o.Ub(),o.Ub()}if(2&t){const t=o.gc();o.Db(45),o.mc("ngForOf",t.clusterReport),o.Db(4),o.mc("useExistingCss",!0)}}function S(t,e){1&t&&(o.Vb(0,"div",0),o.Vb(1,"div",6),o.Vb(2,"h4",41),o.Ec(3,"There is no demonstration patch in this block"),o.Ub(),o.Ub(),o.Ub())}let V=(()=>{class t{constructor(t,e,r,n){this.baoService=t,this.layoutService=e,this.fb=r,this.toastr=n,this.demonstrationClusterTable=!1,this.message=!1,this.fileName="ClusterDetailsReport.xlsx",this.getFinYear=()=>Object(i.a)(this,void 0,void 0,function*(){try{this.FinYear="",this.FinYears=[];const t=yield this.layoutService.getFinYear().toPromise();this.FinYears=t.Years,this.Season=t.Season}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getAllScheme=()=>Object(i.a)(this,void 0,void 0,function*(){try{this.AllSchemeData=yield this.baoService.getAllScheme().toPromise()}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getSubscheme=()=>Object(i.a)(this,void 0,void 0,function*(){try{this.SubschemeData=[],this.ComponentData=[];const t=this.clusterFrom.value.scheme;this.SubschemeData=yield this.baoService.getSubscheme(t).toPromise()}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getComponent=()=>Object(i.a)(this,void 0,void 0,function*(){try{this.ComponentData=[];const t=this.clusterFrom.value.subScheme,e=this.clusterFrom.value.FinYear;this.ComponentData=yield this.baoService.getComponent(t,e).toPromise()}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getclusterDemonstration=()=>Object(i.a)(this,void 0,void 0,function*(){try{const t=this.clusterFrom.value.FinYear,e=this.clusterFrom.value.scheme,r=this.clusterFrom.value.subScheme,i=this.clusterFrom.value.component;this.clusterDemonstration=yield this.baoService.getclusterDemonstration(t,e,r,i).toPromise(),this.message=0==this.clusterDemonstration.result.length,this.demonstrationClusterTable=0!=this.clusterDemonstration.result.length,this.GpData=this.clusterDemonstration.GpData,this.clusterDemonstration.result.forEach(t=>{this.GpData.forEach(e=>{if(t.DemostrationId==e.DemostrationId)return t.DemostrationId=e.DemostrationId,t.Gp_Name=null==t.Gp_Name?e.Gp_Name:`${t.Gp_Name} ,\n ${e.Gp_Name}`,t}),""!=t.lgd_wardcode&&t.lgd_wardcode.split(",").forEach(e=>{this.getWardData(e,t.DemostrationId)})}),this.clusterReport=this.clusterDemonstration.result}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getWardData=(t,e)=>Object(i.a)(this,void 0,void 0,function*(){try{this.WardData=yield this.baoService.getWardData(t,e).toPromise(),this.clusterReport.forEach(t=>{this.WardData.forEach(e=>{if(t.DemostrationId==e.DemostrationId)return t.WardName=null==t.WardName?e.WardName:`${t.WardName} ,\n ${e.WardName}`,t})})}catch(r){this.toastr.error("Sorry. Server problem. Please try again."),console.error(r)}}),this.pageTitle="Cluster Demonstration",this.pageDesc="Cluster Demonstration",this.breadcrumbList=["Block Wise Cluster Demonstration"],this.clusterFrom=this.fb.group({FinYear:["",[s.s.required]],scheme:["",[s.s.required]],subScheme:["",[s.s.required]],component:["",[s.s.required]]})}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getFinYear(),this.getAllScheme()}get clusterFromValid(){return this.clusterFrom.controls}exportexcel(){let t=document.getElementById("excel-table");const e=n.a.table_to_sheet(t),r=n.a.book_new();n.a.book_append_sheet(r,e,"Sheet1"),n.b(r,this.fileName)}}return t.\u0275fac=function(e){return new(e||t)(o.Pb(a.a),o.Pb(l.a),o.Pb(s.c),o.Pb(c.b))},t.\u0275cmp=o.Jb({type:t,selectors:[["app-demonstration-cluster-implementation"]],decls:78,vars:12,consts:[[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[3,"formGroup"],[1,"row"],[1,"col-sm-2","col-lg-2","col-form-label"],[1,"asterik"],[1,"col-sm-4","col-lg-4"],[1,"input-group"],[1,"input-group-addon"],[1,"ion-arrow-down-b"],["formControlName","FinYear","id","FinYear",1,"form-control","form-control-default",3,"change"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["class","text-danger",4,"ngIf"],["formControlName","scheme","id","scheme",1,"form-control","form-control-default",3,"change"],["formControlName","subScheme","id","subScheme",1,"form-control","form-control-default",3,"change"],["formControlName","component","id","component",1,"form-control","form-control-default"],[2,"padding","20px"],["type","button",1,"btn","btn-primary","mat-elevation-z8",2,"float","right",3,"disabled","click"],["btn",""],["class","card",4,"ngIf"],[3,"ngValue"],[1,"text-danger"],["id","print-section"],[1,"dt-responsive","table-responsive"],["id","custom-btn","id","excel-table",1,"table","table-striped","table-bordered","nowrap"],["rowspan","2"],["rowspan","2",2,"vertical-align","middle","text-align","center"],["colspan","3",2,"vertical-align","middle","text-align","center"],[2,"vertical-align","middle","text-align","center"],[4,"ngFor","ngForOf"],[1,"col-md-12"],["styleSheetFile","assets/css/custom1.css,assets/css/custom2.css","printSectionId","print-section","ngxPrint","",1,"btn","btn-primary","mat-elevation-z8","float-right",3,"useExistingCss"],[1,"icofont","icofont-print"],[1,"btn","btn-primary","mat-elevation-z8","float-right",2,"margin-right","10px",3,"click"],[1,"ion-ios-upload"],[2,"text-align","center","color","red"]],template:function(t,e){1&t&&(o.Vb(0,"div",0),o.Vb(1,"div",1),o.Vb(2,"h5"),o.Ec(3,"Cluster Demonstration"),o.Ub(),o.Vb(4,"span"),o.Ec(5,"Cluster Demonstration For Block"),o.Ub(),o.Vb(6,"div",2),o.Qb(7,"i",3),o.Qb(8,"i",4),o.Qb(9,"i",5),o.Ub(),o.Ub(),o.Vb(10,"div",6),o.Vb(11,"form",7),o.Vb(12,"div",8),o.Vb(13,"label",9),o.Ec(14,"Financial Year "),o.Vb(15,"label",10),o.Ec(16,"*"),o.Ub(),o.Ec(17,":"),o.Ub(),o.Vb(18,"div",11),o.Vb(19,"div",12),o.Vb(20,"span",13),o.Qb(21,"i",14),o.Ub(),o.Vb(22,"select",15),o.cc("change",function(){return e.getAllScheme()}),o.Vb(23,"option",16),o.Ec(24,"--Select--"),o.Ub(),o.Dc(25,u,2,2,"option",17),o.Ub(),o.Ub(),o.Dc(26,m,2,0,"div",18),o.Ub(),o.Vb(27,"label",9),o.Ec(28,"Scheme "),o.Vb(29,"label",10),o.Ec(30,"*"),o.Ub(),o.Ec(31,":"),o.Ub(),o.Vb(32,"div",11),o.Vb(33,"div",12),o.Vb(34,"span",13),o.Qb(35,"i",14),o.Ub(),o.Vb(36,"select",19),o.cc("change",function(){return e.getSubscheme()}),o.Vb(37,"option",16),o.Ec(38,"--Select--"),o.Ub(),o.Dc(39,d,2,2,"option",17),o.Ub(),o.Ub(),o.Dc(40,g,2,0,"div",18),o.Ub(),o.Ub(),o.Vb(41,"div",8),o.Vb(42,"label",9),o.Ec(43,"Subscheme "),o.Vb(44,"label",10),o.Ec(45,"*"),o.Ub(),o.Ec(46,":"),o.Ub(),o.Vb(47,"div",11),o.Vb(48,"div",12),o.Vb(49,"span",13),o.Qb(50,"i",14),o.Ub(),o.Vb(51,"select",20),o.cc("change",function(){return e.getComponent()}),o.Vb(52,"option",16),o.Ec(53,"--Select--"),o.Ub(),o.Dc(54,p,2,2,"option",17),o.Ub(),o.Ub(),o.Dc(55,D,2,0,"div",18),o.Ub(),o.Vb(56,"label",9),o.Ec(57,"Component"),o.Vb(58,"label",10),o.Ec(59,"*"),o.Ub(),o.Ec(60,":"),o.Ub(),o.Vb(61,"div",11),o.Vb(62,"div",12),o.Vb(63,"span",13),o.Qb(64,"i",14),o.Ub(),o.Vb(65,"select",21),o.Vb(66,"option",16),o.Ec(67,"--Select--"),o.Ub(),o.Dc(68,v,2,2,"option",17),o.Ub(),o.Ub(),o.Dc(69,$,2,0,"div",18),o.Ub(),o.Ub(),o.Ub(),o.Vb(70,"div",22),o.Vb(71,"button",23,24),o.cc("click",function(){return e.getclusterDemonstration()}),o.Ec(73,"Get Patch List"),o.Ub(),o.Qb(74,"br"),o.Qb(75,"br"),o.Ub(),o.Ub(),o.Ub(),o.Dc(76,U,55,2,"div",25),o.Dc(77,S,4,0,"div",25)),2&t&&(o.Db(11),o.mc("formGroup",e.clusterFrom),o.Db(14),o.mc("ngForOf",e.FinYears),o.Db(1),o.mc("ngIf",e.clusterFromValid.FinYear.touched&&!e.clusterFromValid.FinYear.valid),o.Db(13),o.mc("ngForOf",e.AllSchemeData),o.Db(1),o.mc("ngIf",e.clusterFromValid.scheme.touched&&!e.clusterFromValid.scheme.valid),o.Db(14),o.mc("ngForOf",e.SubschemeData),o.Db(1),o.mc("ngIf",e.clusterFromValid.subScheme.touched&&!e.clusterFromValid.subScheme.valid),o.Db(13),o.mc("ngForOf",e.ComponentData),o.Db(1),o.mc("ngIf",e.clusterFromValid.component.touched&&!e.clusterFromValid.component.valid),o.Db(2),o.mc("disabled",!e.clusterFrom.valid),o.Db(5),o.mc("ngIf",e.demonstrationClusterTable),o.Db(1),o.mc("ngIf",e.message))},directives:[s.t,s.k,s.e,s.r,s.j,s.d,s.n,s.u,h.k,h.l,b.a],styles:['td[_ngcontent-%COMP%]{white-space:pre-wrap}@media print{#print-section[_ngcontent-%COMP%]{overflow-y:visible!important;position:relative}}html[_ngcontent-%COMP%]{scrollbar-width:none;-ms-overflow-style:none}html[_ngcontent-%COMP%]::-webkit-scrollbar{width:0}.asterik[_ngcontent-%COMP%]{content:"*";color:red}']}),t})()},m1XX:function(t,e,r){"use strict";r.d(e,"a",function(){return s}),r.d(e,"b",function(){return n});var i=r("fXoL");let s=(()=>{class t{constructor(){this._printStyle=[],this.useExistingCss=!1,this.printDelay=0,this._styleSheetFile=""}set printStyle(t){for(let e in t)t.hasOwnProperty(e)&&this._printStyle.push((e+JSON.stringify(t[e])).replace(/['"]+/g,""));this.returnStyleValues()}returnStyleValues(){return`<style> ${this._printStyle.join(" ").replace(/,/g,";")} </style>`}set styleSheetFile(t){let e=function(t){return`<link rel="stylesheet" type="text/css" href="${t}">`};if(-1!==t.indexOf(",")){const r=t.split(",");for(let t of r)this._styleSheetFile=this._styleSheetFile+e(t)}else this._styleSheetFile=e(t)}returnStyleSheetLinkTags(){return this._styleSheetFile}getElementTag(t){const e=[],r=document.getElementsByTagName(t);for(let i=0;i<r.length;i++)e.push(r[i].outerHTML);return e.join("\r\n")}getFormData(t){for(var e=0;e<t.length;e++)t[e].defaultValue=t[e].value,t[e].checked&&(t[e].defaultChecked=!0)}getHtmlContents(){let t=document.getElementById(this.printSectionId),e=t.getElementsByTagName("input");this.getFormData(e);let r=t.getElementsByTagName("textarea");return this.getFormData(r),t.innerHTML}print(){let t,e,r="",i="";const s=this.getElementTag("base");this.useExistingCss&&(r=this.getElementTag("style"),i=this.getElementTag("link")),t=this.getHtmlContents(),e=window.open("","_blank","top=0,left=0,height=auto,width=auto"),e.document.open(),e.document.write(`\n      <html>\n        <head>\n          <title>${this.printTitle?this.printTitle:""}</title>\n          ${s}\n          ${this.returnStyleValues()}\n          ${this.returnStyleSheetLinkTags()}\n          ${r}\n          ${i}\n        </head>\n        <body>\n          ${t}\n          <script defer>\n            function triggerPrint(event) {\n              window.removeEventListener('load', triggerPrint, false);\n              setTimeout(function() {\n                closeWindow(window.print());\n              }, ${this.printDelay});\n            }\n            function closeWindow(){\n                window.close();\n            }\n            window.addEventListener('load', triggerPrint, false);\n          <\/script>\n        </body>\n      </html>`),e.document.close()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=i.Kb({type:t,selectors:[["button","ngxPrint",""]],hostBindings:function(t,e){1&t&&i.cc("click",function(){return e.print()})},inputs:{useExistingCss:"useExistingCss",printDelay:"printDelay",printStyle:"printStyle",styleSheetFile:"styleSheetFile",printSectionId:"printSectionId",printTitle:"printTitle"}}),t})(),n=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Nb({type:t}),t.\u0275inj=i.Mb({imports:[[]]}),t})()}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{pIlf:function(t,e,r){"use strict";r.r(e),r.d(e,"FarmerListModule",function(){return w});var i=r("ofXK"),o=r("3Pt+"),a=r("tyNb"),s=r("mrSG"),n=r("0IaG"),c=r("fXoL"),b=r("4TgG"),l=r("Ldel"),d=r("5eHb"),m=r("cZdB"),h=r("bTqV");function u(t,e){if(1&t&&(c.Vb(0,"option",23),c.Ec(1),c.Ub()),2&t){const t=e.$implicit;c.mc("ngValue",t),c.Db(1),c.Fc(t.DemostrationId)}}function f(t,e){1&t&&(c.Vb(0,"th"),c.Ec(1,"Delete"),c.Ub())}function g(t,e){if(1&t){const t=c.Wb();c.Vb(0,"td"),c.Vb(1,"button",29),c.cc("click",function(){c.wc(t);const e=c.gc().index;return c.gc(2).openDialog(e)}),c.Qb(2,"i",30),c.Ub(),c.Ub()}}function D(t,e){if(1&t&&(c.Vb(0,"tr"),c.Vb(1,"th",28),c.Ec(2),c.Ub(),c.Vb(3,"td"),c.Ec(4),c.Ub(),c.Vb(5,"td"),c.Ec(6),c.Ub(),c.Vb(7,"td"),c.Ec(8),c.Ub(),c.Vb(9,"td"),c.Ec(10),c.Ub(),c.Vb(11,"td"),c.Ec(12),c.Ub(),c.Dc(13,g,3,0,"td",26),c.Ub()),2&t){const t=e.$implicit,r=e.index,i=c.gc(2);c.Db(2),c.Fc(r+1),c.Db(2),c.Gc(" ",t.FarmerId," "),c.Db(2),c.Gc(" ",t.FarmerName," "),c.Db(2),c.Gc(" ",t.Farmer_Category," "),c.Db(2),c.Gc(" ",t.Gender," "),c.Db(2),c.Gc(" ",t.LandArea," "),c.Db(1),c.mc("ngIf",i.SubmitButton)}}function p(t,e){1&t&&(c.Vb(0,"div"),c.Vb(1,"h4",31),c.Ec(2,"There is no data in this DemonstrationId"),c.Ub(),c.Ub())}function v(t,e){if(1&t&&(c.Vb(0,"div",24),c.Vb(1,"div",7),c.Vb(2,"table",25),c.Vb(3,"thead"),c.Vb(4,"tr"),c.Vb(5,"th"),c.Ec(6,"#"),c.Ub(),c.Vb(7,"th"),c.Ec(8,"Farmer Id"),c.Ub(),c.Vb(9,"th"),c.Ec(10,"Farmer Name"),c.Ub(),c.Vb(11,"th"),c.Ec(12,"Catagory"),c.Ub(),c.Vb(13,"th"),c.Ec(14,"Gender"),c.Ub(),c.Vb(15,"th"),c.Ec(16,"Land(in ha)"),c.Ub(),c.Dc(17,f,2,0,"th",26),c.Ub(),c.Ub(),c.Vb(18,"tbody"),c.Dc(19,D,14,7,"tr",27),c.hc(20,"filter"),c.Vb(21,"tr"),c.Qb(22,"th"),c.Qb(23,"th"),c.Qb(24,"th"),c.Qb(25,"th"),c.Qb(26,"th"),c.Vb(27,"th"),c.Ec(28),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Qb(29,"br"),c.Dc(30,p,3,0,"div",26),c.Ub()),2&t){const t=c.gc();c.Db(17),c.mc("ngIf",t.SubmitButton),c.Db(2),c.mc("ngForOf",c.jc(20,4,t.farmer_list,t.searchText)),c.Db(9),c.Gc(" Total : ",t.totalArea," "),c.Db(2),c.mc("ngIf",t.message1)}}function V(t,e){if(1&t){const t=c.Wb();c.Vb(0,"div",7),c.Vb(1,"button",32),c.cc("click",function(){return c.wc(t),c.gc().FinalSubmitfarmerDetails()}),c.Ec(2,"Final Submit"),c.Ub(),c.Ub()}if(2&t){const t=c.gc();c.Db(1),c.mc("disabled",t.clicked)}}let U=(()=>{class t{constructor(t,e,r,i,a){this.layoutService=t,this.fb=e,this.vawService=r,this.toastr=i,this.dialog=a,this.demostrationArea=0,this.farmerListTable=!1,this.message1=!1,this.allFarmerData=[],this.SubmitButton=!1,this.totalArea=0,this.clicked=!1,this.totalArea1=0,this.getDemonstrationData=()=>Object(s.a)(this,void 0,void 0,function*(){try{this.demonstrationData=yield this.vawService.getDemonstrationData().toPromise()}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getAllFarmerList=()=>Object(s.a)(this,void 0,void 0,function*(){try{this.totalArea=0,this.totalArea1=0,this.farmerListTable=!0;const t=yield this.vawService.getAllFarmerList(this.demonstrationId.DemostrationId).toPromise();this.farmer_list=t.farmerList;const e=t.demoStatus[0];this.demostrationArea=this.demonstrationId.Demonstration_Area,0==this.farmer_list.length?(this.message1=!0,this.SubmitButton=!1):(this.farmer_list.forEach(t=>{this.message1=!1,this.totalArea1+=+t.LandArea,this.totalArea=JSON.parse(this.totalArea1.toFixed(1))}),null==e.ConfirmBy_vaw&&null==e.ConfirmBy_BAO?(this.message1=!1,this.SubmitButton=!0):(this.message1=!0,this.SubmitButton=!1))}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.DeleteFarmerDetails=t=>Object(s.a)(this,void 0,void 0,function*(){try{const e=this.farmer_list[t].Permit_NO,r=this.farmer_list[t].DemonstrationId,i=this.farmer_list[t].FarmerId;this.DeleteFarmerData=yield this.vawService.DeleteFarmerDetails(e,r,i).toPromise(),this.toastr.success(this.DeleteFarmerData.message),this.getAllFarmerList()}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.FinalSubmitfarmerDetails=()=>Object(s.a)(this,void 0,void 0,function*(){try{if(new Set(this.farmer_list.map(t=>t.FarmerId)).size<this.farmer_list.length)this.toastr.warning("Duplication of Farmer Id found in this Demonstration Patch.Please rectify the duplication.");else{this.allFarmerData.push(this.farmer_list);const t=yield this.vawService.FinalSubmitfarmerDetails(this.allFarmerData).toPromise();this.toastr.success(t.message),this.farmer_list=[],this.getDemonstrationData(),this.farmerListTable=!1,this.SubmitButton=!1}}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.pageTitle="Demonstration Patch Verification",this.pageDesc="Demonstration Patch Verification",this.breadcrumbList=["Verify Demonstration"],this.FarmerDetailsForm=e.group({permit_NO:["",[o.s.required]],demonstrationId:["",[o.s.required]],farmerId:["",[o.s.required]],farmerName:["",[o.s.required]],farmerGender:["",[o.s.required]],farmerCatagory:["",[o.s.required]],landArea:["",[o.s.required]],cropId:["",[o.s.required]],cropVariety:["",[o.s.required]]})}ngOnInit(){this.getDemonstrationData(),setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)})}openDialog(t){this.dialog.open(y,{width:"32%",data:{message:`Are you sure want to delete the details of '${this.farmer_list[t].FarmerId}' ?`,buttonText:{ok:"YES",cancel:"NO"}}}).afterClosed().subscribe(e=>{1==e&&this.DeleteFarmerDetails(t)})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(b.a),c.Pb(o.c),c.Pb(l.a),c.Pb(d.b),c.Pb(n.b))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-farmer-list"]],decls:33,vars:5,consts:[[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block","table-border-style"],[1,"card-block"],[1,"row"],[1,"col-sm-12"],[1,"col-md-12"],[1,"form-group","row"],[1,"col-sm-4","col-lg-2"],["for","farmerId",1,"block"],[1,"asterik"],[1,"col-sm-4","col-lg-6"],["id","demonstrationId",1,"required","form-control",3,"ngModel","ngModelChange","change"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],[1,"col-sm-4","col-lg-4"],["for","TDA",1,"block",2,"font-weight","bold"],["class","table-responsive",4,"ngIf"],["class","card-block",4,"ngIf"],[3,"ngValue"],[1,"table-responsive"],[1,"table","table-hover"],[4,"ngIf"],[4,"ngFor","ngForOf"],["scope","row"],[1,"btn","btn-danger","btn-icon",3,"click"],[1,"ion-trash-a"],[2,"text-align","center","color","red"],["type","button",1,"btn","btn-primary","mat-elevation-z8",2,"float","right",3,"disabled","click"]],template:function(t,e){1&t&&(c.Vb(0,"div",0),c.Vb(1,"div",1),c.Vb(2,"h5"),c.Ec(3,"Farmer List"),c.Ub(),c.Vb(4,"div",2),c.Qb(5,"i",3),c.Qb(6,"i",4),c.Qb(7,"i",5),c.Ub(),c.Ub(),c.Vb(8,"div",6),c.Vb(9,"div",7),c.Vb(10,"div",8),c.Vb(11,"div",9),c.Vb(12,"div",8),c.Vb(13,"div",10),c.Vb(14,"div",11),c.Vb(15,"div",12),c.Vb(16,"label",13),c.Ec(17,"Demonstration ID "),c.Vb(18,"label",14),c.Ec(19,"*"),c.Ub(),c.Ec(20,":"),c.Ub(),c.Ub(),c.Vb(21,"div",15),c.Vb(22,"select",16),c.cc("ngModelChange",function(t){return e.demonstrationId=t})("change",function(){return e.getAllFarmerList()}),c.Vb(23,"option",17),c.Ec(24,"--Select--"),c.Ub(),c.Dc(25,u,2,2,"option",18),c.Ub(),c.Ub(),c.Vb(26,"div",19),c.Vb(27,"label",20),c.Ec(28),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Dc(29,v,31,7,"div",21),c.Dc(30,V,3,1,"div",22),c.Qb(31,"br"),c.Qb(32,"br"),c.Ub(),c.Ub()),2&t&&(c.Db(22),c.mc("ngModel",e.demonstrationId),c.Db(3),c.mc("ngForOf",e.demonstrationData),c.Db(3),c.Gc(" Total Demonstration Area (in ha) : ",e.demostrationArea,""),c.Db(1),c.mc("ngIf",e.farmerListTable),c.Db(1),c.mc("ngIf",e.SubmitButton))},directives:[o.r,o.j,o.m,o.n,o.u,i.k,i.l],pipes:[m.a],styles:['.asterik[_ngcontent-%COMP%]{content:"*";color:red}.container[_ngcontent-%COMP%]{padding-top:50px;padding-bottom:10px;color:#405065}.search-hero[_ngcontent-%COMP%]{padding-top:20px;padding-bottom:10px;float:right;margin:auto}.form-control[_ngcontent-%COMP%]::placeholder{font-family:FontAwesome}']}),t})(),y=(()=>{class t{constructor(t,e){this.dialogRef=t,this.data=e,this.message="Are you sure?",this.confirmButtonText="Yes",this.cancelButtonText="Cancel",e&&(this.message=e.message||this.message,e.buttonText&&(this.confirmButtonText=e.buttonText.ok||this.confirmButtonText,this.cancelButtonText=e.buttonText.cancel||this.cancelButtonText))}onConfirmClick(){this.dialogRef.close(!0)}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(n.g),c.Pb(n.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["dialog-overview-dialog"]],decls:8,vars:3,consts:[["mat-dialog-content",""],[2,"font-size","larger","color","red","font-weight","500"],["mat-dialog-actions","","align","center"],["mat-raised-button","","mat-dialog-close","","tabindex","-1"],["mat-raised-button","","color","primary","tabindex","1",3,"click"]],template:function(t,e){1&t&&(c.Vb(0,"div",0),c.Vb(1,"p",1),c.Ec(2),c.Ub(),c.Ub(),c.Vb(3,"div",2),c.Vb(4,"button",3),c.Ec(5),c.Ub(),c.Vb(6,"button",4),c.cc("click",function(){return e.onConfirmClick()}),c.Ec(7),c.Ub(),c.Ub()),2&t&&(c.Db(2),c.Fc(e.message),c.Db(3),c.Fc(e.cancelButtonText),c.Db(2),c.Fc(e.confirmButtonText))},directives:[n.e,n.c,h.a,n.d],encapsulation:2}),t})();const F=[{path:"",component:U}];let S=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[a.d.forChild(F)],a.d]}),t})();var I=r("kmnG");let w=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[i.c,S,o.f,o.p,n.f,h.b,I.d,m.b]]}),t})()}}]);
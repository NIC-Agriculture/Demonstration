(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{Bwk9:function(t,e,o){"use strict";o.r(e),o.d(e,"DeleteDemonstrationPatchModule",function(){return U});var r=o("ofXK"),i=o("tyNb"),n=o("mrSG"),a=o("0IaG"),c=o("fXoL"),s=o("5KCI"),b=o("5eHb"),l=o("4TgG"),d=o("3Pt+"),h=o("bTqV");function m(t,e){if(1&t&&(c.Vb(0,"option",19),c.Dc(1),c.Ub()),2&t){const t=e.$implicit;c.mc("ngValue",t),c.Db(1),c.Fc(" ",t," ")}}function u(t,e){if(1&t){const t=c.Wb();c.Vb(0,"tr"),c.Vb(1,"td"),c.Dc(2),c.Ub(),c.Vb(3,"td"),c.Dc(4),c.Ub(),c.Vb(5,"td"),c.Dc(6),c.Ub(),c.Vb(7,"td"),c.Dc(8),c.Ub(),c.Vb(9,"td"),c.Dc(10),c.Ub(),c.Vb(11,"td"),c.Dc(12),c.Ub(),c.Vb(13,"td"),c.Dc(14),c.Ub(),c.Vb(15,"td"),c.Dc(16),c.Ub(),c.Vb(17,"td"),c.Dc(18),c.Ub(),c.Vb(19,"td"),c.Vb(20,"button",27),c.cc("click",function(){c.vc(t);const o=e.index;return c.gc(2).openDialog(o)}),c.Qb(21,"i",28),c.Ub(),c.Ub(),c.Ub()}if(2&t){const t=e.$implicit,o=e.index;c.Db(2),c.Fc(" ",o+1," "),c.Db(2),c.Fc(" ",t.DemostrationId," "),c.Db(2),c.Fc(" ",t.CompName," "),c.Db(2),c.Fc(" ",t.Gp_Name||"--"," "),c.Db(2),c.Fc(" ",t.WardName||"--"," "),c.Db(2),c.Fc(" ",t.vaw_userId," "),c.Db(2),c.Fc(" ",t.PhyGen," "),c.Db(2),c.Fc(" ",t.PhySCP," "),c.Db(2),c.Fc(" ",t.PhyTasp," ")}}function D(t,e){if(1&t&&(c.Vb(0,"div",6),c.Vb(1,"div",20),c.Vb(2,"table",21),c.Vb(3,"thead"),c.Vb(4,"tr"),c.Vb(5,"th",22),c.Dc(6,"#"),c.Ub(),c.Vb(7,"th",23),c.Dc(8," Demonstration Id "),c.Ub(),c.Vb(9,"th",23),c.Dc(10," Component "),c.Ub(),c.Vb(11,"th",23),c.Dc(12," GP "),c.Ub(),c.Vb(13,"th",23),c.Dc(14," Ward Name "),c.Ub(),c.Vb(15,"th",23),c.Dc(16," Assigned VAW "),c.Ub(),c.Vb(17,"th",24),c.Dc(18," Total Target Allotment "),c.Ub(),c.Vb(19,"th",23),c.Dc(20," Remove "),c.Ub(),c.Ub(),c.Vb(21,"tr"),c.Vb(22,"th",25),c.Dc(23," General "),c.Ub(),c.Vb(24,"th",25),c.Dc(25," SCP "),c.Ub(),c.Vb(26,"th",25),c.Dc(27," TASP "),c.Ub(),c.Ub(),c.Ub(),c.Vb(28,"tbody"),c.Cc(29,u,22,9,"tr",26),c.Ub(),c.Ub(),c.Ub(),c.Ub()),2&t){const t=c.gc();c.Db(29),c.mc("ngForOf",t.clusterReport)}}let g=(()=>{class t{constructor(t,e,o,r){this.baoService=t,this.toastr=e,this.layoutService=o,this.dialog=r,this.demonstrationClusterTable=!1,this.getFinYear=()=>Object(n.a)(this,void 0,void 0,function*(){try{this.FinYear="",this.FinYears=[];const t=yield this.layoutService.getFinYear().toPromise();this.FinYears=t.Years,this.Season=t.Season}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getclusterDemonstration=()=>Object(n.a)(this,void 0,void 0,function*(){try{this.demonstrationClusterTable=!0,this.clusterDemonstration=yield this.baoService.getclusterDemonstration(this.FinYear).toPromise(),this.GpData=this.clusterDemonstration.GpData,this.clusterDemonstration.result.forEach(t=>{this.GpData.forEach(e=>{if(t.DemostrationId==e.DemostrationId)return t.DemostrationId=e.DemostrationId,t.Gp_Name=null==t.Gp_Name?e.Gp_Name:`${t.Gp_Name} ,\n ${e.Gp_Name}`,t}),null!=t.lgd_wardcode&&""!=t.lgd_wardcode&&t.lgd_wardcode.split(",").forEach(e=>{this.getWardData(e,t.DemostrationId)})}),this.clusterReport=this.clusterDemonstration.result}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getWardData=(t,e)=>Object(n.a)(this,void 0,void 0,function*(){try{this.WardData=yield this.baoService.getWardData(t,e).toPromise(),this.clusterReport.forEach(t=>{this.WardData.forEach(e=>{if(t.DemostrationId==e.DemostrationId)return t.WardName=null==t.WardName?e.WardName:`${t.WardName} ,\n ${e.WardName}`,t})})}catch(o){this.toastr.error("Sorry. Server problem. Please try again."),console.error(o)}}),this.deleteDemonstrationPatch=t=>Object(n.a)(this,void 0,void 0,function*(){try{const e=this.clusterReport[t].DemostrationId,o=yield this.baoService.deleteDemoID(e).toPromise();"success"!=o.type?this.toastr.warning(o.message):(this.toastr.success(o.message),this.getFinYear(),this.clusterReport=[])}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.pageTitle="Delete Demonstration Patch",this.pageDesc="Delete Demonstration Patch",this.breadcrumbList=["Delete Demonstration Patch"]}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getFinYear()}openDialog(t){this.dialog.open(p,{width:"32%",data:{message:`Are you sure want to delete the demonstration Patch '${this.clusterReport[t].DemostrationId}' ?`,buttonText:{ok:"YES",cancel:"NO"}}}).afterClosed().subscribe(e=>{1==e&&this.deleteDemonstrationPatch(t)})}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(s.a),c.Pb(b.b),c.Pb(l.a),c.Pb(a.b))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-delete-demonstration-patch"]],decls:27,vars:3,consts:[[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[1,"row"],[1,"col-sm-2","col-lg-2","col-form-label"],[1,"asterik"],[1,"col-sm-4","col-lg-4"],[1,"input-group"],[1,"input-group-addon"],[1,"ion-arrow-down-b"],["id","FinYear",1,"form-control","form-control-default",3,"ngModel","ngModelChange","change"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["id","print-section"],["class","card-block",4,"ngIf"],[3,"ngValue"],[1,"dt-responsive","table-responsive"],["id","custom-btn",1,"table","table-hover"],["rowspan","2"],["rowspan","2",2,"vertical-align","middle","text-align","center"],["colspan","3",2,"vertical-align","middle","text-align","center"],[2,"vertical-align","middle","text-align","center"],[4,"ngFor","ngForOf"],[1,"btn","btn-danger",3,"click"],[1,"ion-trash-a"]],template:function(t,e){1&t&&(c.Vb(0,"div",0),c.Vb(1,"div",1),c.Vb(2,"h5"),c.Dc(3,"Cluster Demonstration"),c.Ub(),c.Vb(4,"span"),c.Dc(5,"Cluster Demonstration For Block"),c.Ub(),c.Vb(6,"div",2),c.Qb(7,"i",3),c.Qb(8,"i",4),c.Qb(9,"i",5),c.Ub(),c.Ub(),c.Vb(10,"div",6),c.Vb(11,"div",7),c.Vb(12,"label",8),c.Dc(13,"Financial Year "),c.Vb(14,"label",9),c.Dc(15,"*"),c.Ub(),c.Dc(16,":"),c.Ub(),c.Vb(17,"div",10),c.Vb(18,"div",11),c.Vb(19,"span",12),c.Qb(20,"i",13),c.Ub(),c.Vb(21,"select",14),c.cc("ngModelChange",function(t){return e.FinYear=t})("change",function(){return e.getclusterDemonstration()}),c.Vb(22,"option",15),c.Dc(23,"--Select--"),c.Ub(),c.Cc(24,m,2,2,"option",16),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Vb(25,"div",17),c.Cc(26,D,30,1,"div",18),c.Ub(),c.Ub(),c.Ub()),2&t&&(c.Db(21),c.mc("ngModel",e.FinYear),c.Db(3),c.mc("ngForOf",e.FinYears),c.Db(2),c.mc("ngIf",e.demonstrationClusterTable))},directives:[d.r,d.j,d.m,d.n,d.u,r.j,r.k],styles:["td[_ngcontent-%COMP%]{white-space:pre-wrap}"]}),t})(),p=(()=>{class t{constructor(t,e){this.dialogRef=t,this.data=e,this.message="Are you sure?",this.confirmButtonText="Yes",this.cancelButtonText="Cancel",e&&(this.message=e.message||this.message,e.buttonText&&(this.confirmButtonText=e.buttonText.ok||this.confirmButtonText,this.cancelButtonText=e.buttonText.cancel||this.cancelButtonText))}onConfirmClick(){this.dialogRef.close(!0)}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(a.g),c.Pb(a.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["dialog-overview-dialog"]],decls:8,vars:3,consts:[["mat-dialog-content",""],[2,"font-size","larger","color","red","font-weight","500"],["mat-dialog-actions","","align","center"],["mat-raised-button","","mat-dialog-close","","tabindex","-1"],["mat-raised-button","","color","primary","tabindex","1",3,"click"]],template:function(t,e){1&t&&(c.Vb(0,"div",0),c.Vb(1,"p",1),c.Dc(2),c.Ub(),c.Ub(),c.Vb(3,"div",2),c.Vb(4,"button",3),c.Dc(5),c.Ub(),c.Vb(6,"button",4),c.cc("click",function(){return e.onConfirmClick()}),c.Dc(7),c.Ub(),c.Ub()),2&t&&(c.Db(2),c.Ec(e.message),c.Db(3),c.Ec(e.cancelButtonText),c.Db(2),c.Ec(e.confirmButtonText))},directives:[a.e,a.c,h.a,a.d],encapsulation:2}),t})();const f=[{path:"",component:g}];let V=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[i.d.forChild(f)],i.d]}),t})();var v=o("kmnG");let U=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[r.b,V,d.f,d.p,a.f,h.b,v.d]]}),t})()}}]);
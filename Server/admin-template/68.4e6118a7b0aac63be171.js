(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{eFMt:function(t,e,o){"use strict";o.r(e),o.d(e,"ClusterDetailsModule",function(){return g});var i=o("ofXK"),c=o("tyNb"),b=o("mrSG"),r=o("3Pt+"),s=o("JcrP"),n=o("fXoL"),a=o("dLb8"),l=o("5eHb"),d=o("4TgG"),m=o("m1XX");function u(t,e){if(1&t&&(n.Vb(0,"option",29),n.Ec(1),n.Ub()),2&t){const t=e.$implicit;n.mc("ngValue",t),n.Db(1),n.Gc(" ",t," ")}}function h(t,e){if(1&t&&(n.Vb(0,"option",29),n.Ec(1),n.Ub()),2&t){const t=e.$implicit;n.mc("ngValue",t.Block_Code),n.Db(1),n.Gc(" ",t.Block_Name," ")}}function p(t,e){if(1&t&&(n.Vb(0,"tr"),n.Vb(1,"td"),n.Ec(2),n.Ub(),n.Vb(3,"td"),n.Ec(4),n.Ub(),n.Vb(5,"td"),n.Ec(6),n.Ub(),n.Vb(7,"td"),n.Ec(8),n.Ub(),n.Vb(9,"td"),n.Ec(10),n.Ub(),n.Vb(11,"td"),n.Ec(12),n.Ub(),n.Vb(13,"td"),n.Ec(14),n.Ub(),n.Vb(15,"td"),n.Ec(16),n.Ub(),n.Vb(17,"td"),n.Ec(18),n.Ub(),n.Vb(19,"td"),n.Ec(20),n.Ub(),n.Vb(21,"td"),n.Ec(22),n.Ub(),n.Vb(23,"td"),n.Ec(24),n.Ub(),n.Vb(25,"td"),n.Ec(26),n.Ub(),n.Vb(27,"td"),n.Ec(28),n.Ub(),n.Vb(29,"td"),n.Ec(30),n.Ub(),n.Ub()),2&t){const t=e.$implicit,o=e.index;n.Db(2),n.Gc(" ",o+1," "),n.Db(2),n.Gc(" ",t.DemostrationId," "),n.Db(2),n.Gc(" ",t.SubschemeName," "),n.Db(2),n.Gc(" ",t.CompName," "),n.Db(2),n.Gc(" ",t.Gp_Name," "),n.Db(2),n.Gc(" ",t.vaw_userId," "),n.Db(2),n.Gc(" ",t.PhyGen," "),n.Db(2),n.Gc(" ",t.PhySCP," "),n.Db(2),n.Gc(" ",t.PhyTasp," "),n.Db(2),n.Gc(" ",t.AvlPhyGen," "),n.Db(2),n.Gc(" ",t.AvlPhySCP," "),n.Db(2),n.Gc(" ",t.AvlPhyTASP," "),n.Db(2),n.Gc(" ",t.GenFarmer," "),n.Db(2),n.Gc(" ",t.SCFarmer," "),n.Db(2),n.Gc(" ",t.STFarmer," ")}}function V(t,e){if(1&t&&(n.Vb(0,"div",6),n.Vb(1,"div",30),n.Vb(2,"table",31),n.Vb(3,"thead"),n.Vb(4,"tr"),n.Vb(5,"th",32),n.Ec(6,"#"),n.Ub(),n.Vb(7,"th",33),n.Ec(8,"Demonstration Id"),n.Ub(),n.Vb(9,"th",33),n.Ec(10,"Subscheme "),n.Ub(),n.Vb(11,"th",33),n.Ec(12,"Component "),n.Ub(),n.Vb(13,"th",33),n.Ec(14," GP Name "),n.Ub(),n.Vb(15,"th",33),n.Ec(16,"VAW Name"),n.Ub(),n.Vb(17,"th",34),n.Ec(18,"Total Target Allotment"),n.Ub(),n.Vb(19,"th",34),n.Ec(20,"Total Available Target"),n.Ub(),n.Vb(21,"th",34),n.Ec(22,"Benificiary Tagged"),n.Ub(),n.Ub(),n.Vb(23,"tr"),n.Vb(24,"th",35),n.Ec(25,"General"),n.Ub(),n.Vb(26,"th",35),n.Ec(27,"SCP"),n.Ub(),n.Vb(28,"th",35),n.Ec(29,"TASP"),n.Ub(),n.Vb(30,"th",35),n.Ec(31,"General"),n.Ub(),n.Vb(32,"th",35),n.Ec(33,"SCP"),n.Ub(),n.Vb(34,"th",35),n.Ec(35,"TASP"),n.Ub(),n.Vb(36,"th",35),n.Ec(37,"General"),n.Ub(),n.Vb(38,"th",35),n.Ec(39,"SCP"),n.Ub(),n.Vb(40,"th",35),n.Ec(41,"TASP"),n.Ub(),n.Ub(),n.Ub(),n.Vb(42,"tbody"),n.Dc(43,p,31,15,"tr",36),n.Ub(),n.Ub(),n.Ub(),n.Ub()),2&t){const t=n.gc();n.Db(43),n.mc("ngForOf",t.clusterReport)}}const U=[{path:"",component:(()=>{class t{constructor(t,e,o,i){this.cdaoService=t,this.toastr=e,this.fb=o,this.layoutService=i,this.demonstrationClusterTable=!1,this.fileName="ClusterDetailsReport.xlsx",this.loadBlocks=()=>Object(b.a)(this,void 0,void 0,function*(){this.allBlocks=yield this.cdaoService.getBlocks().toPromise()}),this.getFinYear=()=>Object(b.a)(this,void 0,void 0,function*(){try{const t=yield this.layoutService.getFinYear().toPromise();this.FinYears=t.Years,this.Season=t.Season}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getclusterDemonstration=()=>Object(b.a)(this,void 0,void 0,function*(){try{this.demonstrationClusterTable=!0,this.clusterDemonstration=yield this.cdaoService.getclusterDemonstration(this.clusterForm.value.blockCode,this.clusterForm.value.FinYear).toPromise(),this.clusterReport=this.clusterDemonstration.result,this.GpData=this.clusterDemonstration.GpData,this.clusterDemonstration.result.forEach(t=>{this.GpData.forEach(e=>{if(t.DemostrationId==e.DemostrationId)return t.DemostrationId=e.DemostrationId,t.Gp_Name=null==t.Gp_Name?e.Gp_Name:t.Gp_Name+",\n"+e.Gp_Name,t})})}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.pageTitle="Report",this.pageDesc="Cluster Details",this.breadcrumbList=["Block wise Cluster Details"],this.clusterForm=this.fb.group({blockCode:["",[r.s.required]],FinYear:["",[r.s.required]]})}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getFinYear(),this.loadBlocks()}exportexcel(){let t=document.getElementById("excel-table");const e=s.a.table_to_sheet(t),o=s.a.book_new();s.a.book_append_sheet(o,e,"Sheet1"),s.b(o,this.fileName)}}return t.\u0275fac=function(e){return new(e||t)(n.Pb(a.a),n.Pb(l.b),n.Pb(r.c),n.Pb(d.a))},t.\u0275cmp=n.Jb({type:t,selectors:[["app-cluster-details"]],decls:52,vars:6,consts:[[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[3,"formGroup"],[1,"row"],[1,"col-sm-2","col-lg-2","col-form-label"],[1,"col-sm-4","col-lg-4"],[1,"input-group"],[1,"input-group-addon"],[1,"ion-arrow-down-b"],["formControlName","FinYear","id","FinYear",1,"form-control","form-control-default"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["id","District","formControlName","blockCode",1,"form-control"],["value","","disabled",""],[1,"col-sm-5","col-lg-5"],[1,"col-sm-2","col-lg-2"],["type","button","id","primary-popover-content","data-container","body","data-toggle","popover","title","Primary color states","data-placement","bottom",1,"btn","btn-primary",3,"disabled","click"],["id","print-section"],["class","card-block",4,"ngIf"],[1,"col-md-12"],["styleSheetFile","assets/css/custom1.css,assets/css/custom2.css","printSectionId","print-section","ngxPrint","",1,"btn","btn-primary","mat-elevation-z8","float-right",3,"useExistingCss"],[1,"icofont","icofont-print"],[1,"btn","btn-primary","mat-elevation-z8","float-right",2,"margin-right","10px",3,"click"],[1,"ion-ios-upload"],[3,"ngValue"],[1,"dt-responsive","table-responsive"],["id","custom-btn","id","excel-table",1,"table","table-striped","table-bordered","nowrap"],["rowspan","2"],["rowspan","2",2,"vertical-align","middle","text-align","center"],["colspan","3",2,"vertical-align","middle","text-align","center"],[2,"vertical-align","middle","text-align","center"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(n.Vb(0,"div",0),n.Vb(1,"div",1),n.Vb(2,"h5"),n.Ec(3,"Cluster Details"),n.Ub(),n.Vb(4,"span"),n.Ec(5,"Block Wise Cluster Details"),n.Ub(),n.Vb(6,"div",2),n.Qb(7,"i",3),n.Qb(8,"i",4),n.Qb(9,"i",5),n.Ub(),n.Ub(),n.Vb(10,"div",6),n.Vb(11,"form",7),n.Vb(12,"div",8),n.Vb(13,"label",9),n.Ec(14,"Financial Year *:"),n.Ub(),n.Vb(15,"div",10),n.Vb(16,"div",11),n.Vb(17,"span",12),n.Qb(18,"i",13),n.Ub(),n.Vb(19,"select",14),n.Vb(20,"option",15),n.Ec(21,"--Select--"),n.Ub(),n.Dc(22,u,2,2,"option",16),n.Ub(),n.Ub(),n.Ub(),n.Vb(23,"label",9),n.Ec(24,"Select Block *:"),n.Ub(),n.Vb(25,"div",10),n.Vb(26,"div",11),n.Vb(27,"span",12),n.Qb(28,"i",13),n.Ub(),n.Vb(29,"select",17),n.Vb(30,"option",18),n.Ec(31,"--Select--"),n.Ub(),n.Dc(32,h,2,2,"option",16),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Qb(33,"br"),n.Ub(),n.Vb(34,"div",8),n.Qb(35,"div",19),n.Vb(36,"div",20),n.Vb(37,"button",21),n.cc("click",function(){return e.getclusterDemonstration()}),n.Ec(38,"Get List"),n.Ub(),n.Ub(),n.Qb(39,"div",19),n.Ub(),n.Ub(),n.Vb(40,"div",22),n.Dc(41,V,44,1,"div",23),n.Ub(),n.Vb(42,"div",6),n.Vb(43,"div",8),n.Vb(44,"div",24),n.Vb(45,"button",25),n.Qb(46,"i",26),n.Ec(47,"Print"),n.Ub(),n.Vb(48,"button",27),n.cc("click",function(){return e.exportexcel()}),n.Qb(49,"i",28),n.Ec(50," Export to Excel "),n.Ub(),n.Ub(),n.Qb(51,"div",24),n.Ub(),n.Ub(),n.Ub()),2&t&&(n.Db(11),n.mc("formGroup",e.clusterForm),n.Db(11),n.mc("ngForOf",e.FinYears),n.Db(10),n.mc("ngForOf",e.allBlocks),n.Db(5),n.mc("disabled",!e.clusterForm.valid),n.Db(4),n.mc("ngIf",e.demonstrationClusterTable),n.Db(4),n.mc("useExistingCss",!0))},directives:[r.t,r.k,r.e,r.r,r.j,r.d,r.n,r.u,i.k,i.l,m.a],styles:["td[_ngcontent-%COMP%]{white-space:pre-wrap}"]}),t})()}];let f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.Nb({type:t}),t.\u0275inj=n.Mb({imports:[[c.d.forChild(U)],c.d]}),t})(),g=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.Nb({type:t}),t.\u0275inj=n.Mb({imports:[[i.c,f,r.f,r.p,m.b]]}),t})()}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{"1GU+":function(t,e,i){"use strict";i.r(e),i.d(e,"TargetAllotmentModule",function(){return f});var o=i("ofXK"),c=i("tyNb"),n=i("mrSG"),r=i("fXoL"),b=i("4TgG"),a=i("dLb8"),s=i("5eHb"),l=i("3Pt+"),d=i("m1XX");function g(t,e){if(1&t&&(r.Vb(0,"option",23),r.Ec(1),r.Ub()),2&t){const t=e.$implicit;r.mc("ngValue",t),r.Db(1),r.Gc(" ",t," ")}}function h(t,e){if(1&t&&(r.Vb(0,"option",23),r.Ec(1),r.Ub()),2&t){const t=e.$implicit;r.mc("ngValue",t.schemeId),r.Db(1),r.Gc(" ",t.schemeName," ")}}function m(t,e){if(1&t&&(r.Vb(0,"tr"),r.Vb(1,"td"),r.Ec(2),r.Ub(),r.Vb(3,"td"),r.Ec(4),r.Ub(),r.Vb(5,"td"),r.Ec(6),r.Ub(),r.Vb(7,"td"),r.Ec(8),r.Ub(),r.Vb(9,"td"),r.Ec(10),r.Ub(),r.Vb(11,"td"),r.Ec(12),r.Ub(),r.Vb(13,"td"),r.Ec(14),r.Ub(),r.Ub()),2&t){const t=e.$implicit,i=e.index;r.Db(2),r.Fc(i+1),r.Db(2),r.Fc(t.schemeName),r.Db(2),r.Fc(t.SubschemeName),r.Db(2),r.Fc(t.CompName),r.Db(2),r.Fc(t.TotalTarget||0),r.Db(2),r.Fc(t.DistributedTarget||0),r.Db(2),r.Fc(t.TotalAvlTarget||0)}}function u(t,e){if(1&t&&(r.Vb(0,"div",6),r.Vb(1,"div",24),r.Vb(2,"table",25),r.Vb(3,"thead"),r.Vb(4,"tr"),r.Vb(5,"th"),r.Ec(6,"#"),r.Ub(),r.Vb(7,"th",26),r.Ec(8,"Scheme"),r.Ub(),r.Vb(9,"th",26),r.Ec(10,"Subscheme"),r.Ub(),r.Vb(11,"th",26),r.Ec(12,"Component"),r.Ub(),r.Vb(13,"th",26),r.Ec(14,"Total Target Allotment "),r.Ub(),r.Vb(15,"th",26),r.Ec(16,"Total Distributed Target"),r.Ub(),r.Vb(17,"th",26),r.Ec(18,"Target Available Target"),r.Ub(),r.Ub(),r.Ub(),r.Vb(19,"tbody"),r.Dc(20,m,15,7,"tr",27),r.Ub(),r.Ub(),r.Ub(),r.Ub()),2&t){const t=r.gc();r.Db(20),r.mc("ngForOf",t.AvailableTarget)}}const p=[{path:"",component:(()=>{class t{constructor(t,e,i){this.layoutService=t,this.cdaoService=e,this.toastr=i,this.AvailableTargetTable=!1,this.getFinYear=()=>Object(n.a)(this,void 0,void 0,function*(){try{const t=yield this.layoutService.getFinYear().toPromise();this.FinYears=t.Years,this.Season=t.Season}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getAllScheme=()=>Object(n.a)(this,void 0,void 0,function*(){try{this.AllSchemeData=yield this.cdaoService.getAllScheme().toPromise()}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getAvailableTarget=()=>Object(n.a)(this,void 0,void 0,function*(){try{this.FinYear&&this.schemeId&&(this.AvailableTargetTable=!0,this.AvailableTarget=yield this.cdaoService.getAvailableTarget(this.FinYear,this.schemeId).toPromise())}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.pageTitle="Target Allotment",this.pageDesc="Target Allotment",this.breadcrumbList=["Target Allotment in District"]}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getFinYear(),this.getAllScheme()}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(b.a),r.Pb(a.a),r.Pb(s.b))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-target-allotment"]],decls:46,vars:6,consts:[[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[1,"row"],[1,"col-sm-2","col-lg-2","col-form-label"],[1,"asterik"],[1,"col-sm-4","col-lg-4"],[1,"input-group"],[1,"input-group-addon"],[1,"ion-arrow-down-b"],["id","FinYear",1,"form-control","form-control-default",3,"ngModel","ngModelChange"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["id","FinYear",1,"form-control","form-control-default",3,"ngModel","ngModelChange","change"],["id","print-section"],["class","card-block",4,"ngIf"],[1,"col-md-12"],["styleSheetFile","assets/css/custom1.css,assets/css/custom2.css","printSectionId","print-section","ngxPrint","",1,"btn","btn-primary","mat-elevation-z8","float-right",3,"useExistingCss"],[1,"icofont","icofont-print"],[3,"ngValue"],[1,"dt-responsive","table-responsive"],["id","custom-btn",1,"table","table-striped","table-bordered","nowrap"],[2,"vertical-align","middle","text-align","center"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(r.Vb(0,"div",0),r.Vb(1,"div",1),r.Vb(2,"h5"),r.Ec(3,"Target Allotment"),r.Ub(),r.Vb(4,"span"),r.Ec(5,"Target Allotment In District"),r.Ub(),r.Vb(6,"div",2),r.Qb(7,"i",3),r.Qb(8,"i",4),r.Qb(9,"i",5),r.Ub(),r.Ub(),r.Vb(10,"div",6),r.Vb(11,"div",7),r.Vb(12,"label",8),r.Ec(13,"Financial Year "),r.Vb(14,"label",9),r.Ec(15,"*"),r.Ub(),r.Ec(16,":"),r.Ub(),r.Vb(17,"div",10),r.Vb(18,"div",11),r.Vb(19,"span",12),r.Qb(20,"i",13),r.Ub(),r.Vb(21,"select",14),r.cc("ngModelChange",function(t){return e.FinYear=t}),r.Vb(22,"option",15),r.Ec(23,"--Select--"),r.Ub(),r.Dc(24,g,2,2,"option",16),r.Ub(),r.Ub(),r.Ub(),r.Vb(25,"label",8),r.Ec(26," Scheme "),r.Vb(27,"label",9),r.Ec(28,"*"),r.Ub(),r.Ec(29,":"),r.Ub(),r.Vb(30,"div",10),r.Vb(31,"div",11),r.Vb(32,"span",12),r.Qb(33,"i",13),r.Ub(),r.Vb(34,"select",17),r.cc("ngModelChange",function(t){return e.schemeId=t})("change",function(){return e.getAvailableTarget()}),r.Vb(35,"option",15),r.Ec(36,"--Select--"),r.Ub(),r.Dc(37,h,2,2,"option",16),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Vb(38,"div",18),r.Dc(39,u,21,1,"div",19),r.Ub(),r.Vb(40,"div",6),r.Vb(41,"div",7),r.Vb(42,"div",20),r.Vb(43,"button",21),r.Qb(44,"i",22),r.Ec(45,"Print"),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub()),2&t&&(r.Db(21),r.mc("ngModel",e.FinYear),r.Db(3),r.mc("ngForOf",e.FinYears),r.Db(10),r.mc("ngModel",e.schemeId),r.Db(3),r.mc("ngForOf",e.AllSchemeData),r.Db(2),r.mc("ngIf",e.AvailableTargetTable),r.Db(4),r.mc("useExistingCss",!0))},directives:[l.r,l.j,l.m,l.n,l.u,o.k,o.l,d.a],styles:["td[_ngcontent-%COMP%]{white-space:pre-wrap}@media print{#print-section[_ngcontent-%COMP%]{overflow-y:visible!important;position:relative}}html[_ngcontent-%COMP%]{scrollbar-width:none;-ms-overflow-style:none}html[_ngcontent-%COMP%]::-webkit-scrollbar{width:0}"]}),t})()}];let v=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({imports:[[c.d.forChild(p)],c.d]}),t})(),f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({imports:[[o.c,v,l.f,l.p,d.b]]}),t})()}}]);
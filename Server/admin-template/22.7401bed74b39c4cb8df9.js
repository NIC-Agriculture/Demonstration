(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"0EQZ":function(t,e,i){"use strict";i.d(e,"a",function(){return d}),i.d(e,"b",function(){return c}),i.d(e,"c",function(){return b}),i.d(e,"d",function(){return m}),i.d(e,"e",function(){return l}),i.d(e,"f",function(){return h}),i.d(e,"g",function(){return u}),i.d(e,"h",function(){return a});var n=i("7+OI"),s=i("LRne"),o=i("XNiG"),r=i("fXoL");class c{}function a(t){return t&&"function"==typeof t.connect}class d extends c{constructor(t){super(),this._data=t}connect(){return Object(n.a)(this._data)?this._data:Object(s.a)(this._data)}disconnect(){}}class l{applyChanges(t,e,i,n,s){t.forEachOperation((t,n,o)=>{let r,c;if(null==t.previousIndex){const s=i(t,n,o);r=e.createEmbeddedView(s.templateRef,s.context,s.index),c=1}else null==o?(e.remove(n),c=3):(r=e.get(n),e.move(r,o),c=2);s&&s({context:null==r?void 0:r.context,operation:c,record:t})})}detach(){}}class h{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(t,e,i,n,s){t.forEachOperation((t,o,r)=>{let c,a;null==t.previousIndex?(c=this._insertView(()=>i(t,o,r),r,e,n(t)),a=c?1:0):null==r?(this._detachAndCacheView(o,e),a=3):(c=this._moveView(o,r,e,n(t)),a=2),s&&s({context:null==c?void 0:c.context,operation:a,record:t})})}detach(){for(const t of this._viewCache)t.destroy();this._viewCache=[]}_insertView(t,e,i,n){const s=this._insertViewFromCache(e,i);if(s)return void(s.context.$implicit=n);const o=t();return i.createEmbeddedView(o.templateRef,o.context,o.index)}_detachAndCacheView(t,e){const i=e.detach(t);this._maybeCacheView(i,e)}_moveView(t,e,i,n){const s=i.get(t);return i.move(s,e),s.context.$implicit=n,s}_maybeCacheView(t,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(t);else{const i=e.indexOf(t);-1===i?t.destroy():e.remove(i)}}_insertViewFromCache(t,e){const i=this._viewCache.pop();return i&&e.insert(i,t),i||null}}class b{constructor(t=!1,e,i=!0){this._multiple=t,this._emitChanges=i,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new o.a,e&&e.length&&(t?e.forEach(t=>this._markSelected(t)):this._markSelected(e[0]),this._selectedToEmit.length=0)}get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}select(...t){this._verifyValueAssignment(t),t.forEach(t=>this._markSelected(t)),this._emitChangeEvent()}deselect(...t){this._verifyValueAssignment(t),t.forEach(t=>this._unmarkSelected(t)),this._emitChangeEvent()}toggle(t){this.isSelected(t)?this.deselect(t):this.select(t)}clear(){this._unmarkAll(),this._emitChangeEvent()}isSelected(t){return this._selection.has(t)}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){this.isSelected(t)||(this._multiple||this._unmarkAll(),this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){}}let m=(()=>{class t{constructor(){this._listeners=[]}notify(t,e){for(let i of this._listeners)i(t,e)}listen(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(e=>t!==e)}}ngOnDestroy(){this._listeners=[]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=Object(r.Lb)({factory:function(){return new t},token:t,providedIn:"root"}),t})();const u=new r.s("_ViewRepeater")},"7+OI":function(t,e,i){"use strict";i.d(e,"a",function(){return s});var n=i("HDdC");function s(t){return!!t&&(t instanceof n.a||"function"==typeof t.lift&&"function"==typeof t.subscribe)}},xsuk:function(t,e,i){"use strict";i.r(e),i.d(e,"SeedDistributionModule",function(){return C});var n=i("ofXK"),s=i("tyNb"),o=i("mrSG"),r=i("fXoL"),c=i("4TgG"),a=i("Ldel"),d=i("5eHb"),l=i("3Pt+"),h=i("QibW");function b(t,e){if(1&t&&(r.Vb(0,"option",18),r.Dc(1),r.Ub()),2&t){const t=e.$implicit;r.mc("ngValue",t),r.Db(1),r.Fc(" ",t.DemostrationId," ")}}function m(t,e){if(1&t&&(r.Vb(0,"mat-radio-button",25),r.Dc(1),r.Ub()),2&t){const t=e.$implicit;r.mc("value",t),r.Db(1),r.Fc(" ",t," ")}}function u(t,e){if(1&t){const t=r.Wb();r.Vb(0,"div",5),r.Vb(1,"div",19),r.Vb(2,"label",7),r.Dc(3,"Seed Distributed Successfully "),r.Vb(4,"label",8),r.Dc(5,"*"),r.Ub(),r.Dc(6,":"),r.Ub(),r.Ub(),r.Vb(7,"div",20),r.Vb(8,"mat-radio-group",23),r.cc("ngModelChange",function(e){return r.vc(t),r.gc(2).ConfirmOption=e}),r.Cc(9,m,2,2,"mat-radio-button",24),r.Ub(),r.Ub(),r.Qb(10,"div",21),r.Ub()}if(2&t){const t=r.gc(2);r.Db(8),r.mc("ngModel",t.ConfirmOption),r.Db(1),r.mc("ngForOf",t.options)}}function f(t,e){if(1&t&&(r.Vb(0,"div",2),r.Vb(1,"div",3),r.Vb(2,"div",2),r.Vb(3,"div",4),r.Vb(4,"div",5),r.Vb(5,"div",19),r.Vb(6,"label",7),r.Dc(7),r.Ub(),r.Ub(),r.Qb(8,"div",20),r.Qb(9,"div",21),r.Ub(),r.Cc(10,u,11,2,"div",22),r.Ub(),r.Ub(),r.Ub(),r.Ub()),2&t){const t=r.gc();r.Db(7),r.Fc("Seed Distribution Status : \xa0 \xa0 \xa0 \xa0 \xa0 \xa0",t.demonstrationId.SeedDistributionStatus," "),r.Db(3),r.mc("ngIf",t.confirmed&&"Pending"==t.demonstrationId.SeedDistributionStatus)}}function g(t,e){if(1&t&&(r.Vb(0,"tr"),r.Vb(1,"th",29),r.Dc(2),r.Ub(),r.Vb(3,"td"),r.Dc(4),r.Ub(),r.Vb(5,"td"),r.Dc(6),r.Ub(),r.Vb(7,"td"),r.Dc(8),r.Ub(),r.Vb(9,"td"),r.Dc(10),r.Ub(),r.Vb(11,"td"),r.Dc(12),r.Ub(),r.Vb(13,"td"),r.Dc(14),r.Ub(),r.Vb(15,"td"),r.Dc(16),r.Ub(),r.Ub()),2&t){const t=e.$implicit,i=e.index;r.Db(2),r.Ec(i+1),r.Db(2),r.Ec(t.FarmerId),r.Db(2),r.Ec(t.FarmerName),r.Db(2),r.Ec(t.Farmer_Category),r.Db(2),r.Ec(t.Gender),r.Db(2),r.Ec(t.LandArea),r.Db(2),r.Fc("",t.seedrequired," Kg"),r.Db(2),r.Fc(" ",t.bpseedrequired||0," Kg ")}}function v(t,e){if(1&t&&(r.Vb(0,"div",26),r.Vb(1,"table",27),r.Vb(2,"thead"),r.Vb(3,"tr"),r.Vb(4,"th"),r.Dc(5,"#"),r.Ub(),r.Vb(6,"th"),r.Dc(7,"Farmer Id"),r.Ub(),r.Vb(8,"th"),r.Dc(9,"Farmer Name"),r.Ub(),r.Vb(10,"th"),r.Dc(11,"Catagory"),r.Ub(),r.Vb(12,"th"),r.Dc(13,"Gender"),r.Ub(),r.Vb(14,"th"),r.Dc(15,"Land (in ha)"),r.Ub(),r.Vb(16,"th"),r.Dc(17,"Seed"),r.Ub(),r.Vb(18,"th"),r.Dc(19,"Seed (Bund Plant.)"),r.Ub(),r.Ub(),r.Ub(),r.Vb(20,"tbody"),r.Cc(21,g,17,8,"tr",28),r.Ub(),r.Ub(),r.Ub()),2&t){const t=r.gc();r.Db(21),r.mc("ngForOf",t.farmer_list)}}function p(t,e){1&t&&(r.Vb(0,"div"),r.Vb(1,"h4",30),r.Dc(2," There is no data in this DemonstrationId "),r.Ub(),r.Ub())}function _(t,e){if(1&t){const t=r.Wb();r.Vb(0,"button",31),r.cc("click",function(){return r.vc(t),r.gc().ConfirmSeedDistributionStatus()}),r.Dc(1,"Confirm "),r.Ub()}}const D=[{path:"",component:(()=>{class t{constructor(t,e,i){this.layoutService=t,this.vawService=e,this.toastr=i,this.confirmed=!1,this.farmerListTable=!1,this.message=!1,this.options=["Yes","No"],this.getDemonstrationData=()=>Object(o.a)(this,void 0,void 0,function*(){try{this.demonstrationData=yield this.vawService.getDemonstrationData().toPromise()}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.getDemonstrationStatus=()=>{try{1==this.demonstrationId.ConfirmBy_vaw&&1==this.demonstrationId.ConfirmBy_BAO?(this.confirmed=!0,this.getAllApprovedFarmerList(this.demonstrationId.DemostrationId)):1==this.demonstrationId.ConfirmBy_vaw&&null==this.demonstrationId.ConfirmBy_BAO?(this.confirmed=!1,this.toastr.warning("This Demonstration Patch is not confirmed By BAO."),this.farmerListTable=!1):(this.confirmed=!1,this.farmerListTable=!1,this.toastr.warning("Please final submit the registered farmers against this Demonstration Id."))}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}},this.getAllApprovedFarmerList=t=>Object(o.a)(this,void 0,void 0,function*(){try{this.farmerListTable=!0,this.farmer_list=yield this.vawService.getAllApprovedFarmerList(t).toPromise()}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getTotalLandCount=()=>Object(o.a)(this,void 0,void 0,function*(){this.totalLandCount=yield this.vawService.getTotalLandCount(this.demonstrationId.DemostrationId).toPromise(),this.totalLand=this.totalLandCount[0].totalland,this.getTotalSeedCount()}),this.getTotalSeedCount=()=>Object(o.a)(this,void 0,void 0,function*(){this.totalSeedCount=yield this.vawService.getTotalSeedCount(this.demonstrationId.CompId).toPromise(),this.totalSeed=+this.totalLand*+this.totalSeedCount[0].Seed_Per_ha,this.totalSeedInQuintal=.01*+this.totalSeed}),this.ConfirmSeedDistributionStatus=()=>Object(o.a)(this,void 0,void 0,function*(){try{if("Yes"==this.ConfirmOption){const t=this.demonstrationId.DemostrationId,e=yield this.vawService.ConfirmSeedDistributionStatus(t).toPromise();this.confirmStatus=e,this.toastr.success(e.message),this.farmer_list=[],this.demonstrationId="",this.ConfirmOption="",this.getDemonstrationData(),this.farmerListTable=!1}}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.pageTitle="Seed Distribution Status",this.pageDesc="Seed Distribution Status Verification",this.breadcrumbList=["Seed Distribution"]}ngOnInit(){this.getDemonstrationData(),setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)})}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(c.a),r.Pb(a.a),r.Pb(d.b))},t.\u0275cmp=r.Jb({type:t,selectors:[["app-seed-distribution"]],decls:25,vars:6,consts:[[1,"card"],[1,"card-block"],[1,"row"],[1,"col-sm-12"],[1,"col-md-12"],[1,"form-group","row"],[1,"col-sm-4","col-lg-2"],["for","farmerId",1,"block"],[1,"asterik"],[1,"col-sm-4","col-lg-6"],["id","demonstrationId",1,"required","form-control",3,"ngModel","ngModelChange","change"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],[1,"col-sm-4","col-lg-4"],["class","row",4,"ngIf"],["class","table-responsive",4,"ngIf"],[4,"ngIf"],["type","button","class","btn btn-primary mat-elevation-z8","style","float: right",3,"click",4,"ngIf"],[3,"ngValue"],[1,"col-sm-3","col-lg-3"],[1,"col-sm-2","col-lg-2"],[1,"col-sm-7","col-lg-7"],["class","form-group row",4,"ngIf"],["aria-labelledby","example-radio-group-label",1,"example-radio-group",3,"ngModel","ngModelChange"],["class","example-radio-button",3,"value",4,"ngFor","ngForOf"],[1,"example-radio-button",3,"value"],[1,"table-responsive"],[1,"table","table-hover"],[4,"ngFor","ngForOf"],["scope","row"],[2,"text-align","center","color","red"],["type","button",1,"btn","btn-primary","mat-elevation-z8",2,"float","right",3,"click"]],template:function(t,e){1&t&&(r.Vb(0,"div",0),r.Vb(1,"div",1),r.Vb(2,"div",2),r.Vb(3,"div",3),r.Vb(4,"div",2),r.Vb(5,"div",4),r.Vb(6,"div",5),r.Vb(7,"div",6),r.Vb(8,"label",7),r.Dc(9,"Demonstration ID "),r.Vb(10,"label",8),r.Dc(11,"*"),r.Ub(),r.Dc(12,":"),r.Ub(),r.Ub(),r.Vb(13,"div",9),r.Vb(14,"select",10),r.cc("ngModelChange",function(t){return e.demonstrationId=t})("change",function(){return e.getDemonstrationStatus()}),r.Vb(15,"option",11),r.Dc(16,"--Select--"),r.Ub(),r.Cc(17,b,2,2,"option",12),r.Ub(),r.Ub(),r.Qb(18,"div",13),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Cc(19,f,11,2,"div",14),r.Cc(20,v,22,1,"div",15),r.Qb(21,"br"),r.Cc(22,p,3,0,"div",16),r.Qb(23,"br"),r.Cc(24,_,2,0,"button",17),r.Ub(),r.Ub()),2&t&&(r.Db(14),r.mc("ngModel",e.demonstrationId),r.Db(3),r.mc("ngForOf",e.demonstrationData),r.Db(2),r.mc("ngIf",e.demonstrationId),r.Db(1),r.mc("ngIf",e.farmerListTable),r.Db(2),r.mc("ngIf",e.message),r.Db(2),r.mc("ngIf","Yes"==e.ConfirmOption))},directives:[l.r,l.j,l.m,l.n,l.u,n.j,n.k,h.b,h.a],styles:['.mat-radio-button[_ngcontent-%COMP%] ~ .mat-radio-button[_ngcontent-%COMP%]{margin-left:16px}.example-section[_ngcontent-%COMP%]{display:flex;align-content:center;align-items:center;height:60px}.example-margin[_ngcontent-%COMP%]{margin:0 10px}.asterik[_ngcontent-%COMP%]{content:"*";color:red}']}),t})()}];let V=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({imports:[[s.d.forChild(D)],s.d]}),t})();var S=i("bSwM");let C=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({imports:[[n.b,l.f,l.p,V,h.c,S.b]]}),t})()}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"+rOU":function(t,e,o){"use strict";o.d(e,"a",function(){return l}),o.d(e,"b",function(){return b}),o.d(e,"c",function(){return d}),o.d(e,"d",function(){return r}),o.d(e,"e",function(){return h}),o.d(e,"f",function(){return u}),o.d(e,"g",function(){return a});var s=o("fXoL"),i=o("ofXK");class n{attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;null!=t&&(this._attachedHost=null,t.detach())}get isAttached(){return null!=this._attachedHost}setAttachedHost(t){this._attachedHost=t}}class r extends n{constructor(t,e,o,s){super(),this.component=t,this.viewContainerRef=e,this.injector=o,this.componentFactoryResolver=s}}class a extends n{constructor(t,e,o){super(),this.templateRef=t,this.viewContainerRef=e,this.context=o}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}}class c extends n{constructor(t){super(),this.element=t instanceof s.l?t.nativeElement:t}}class l{constructor(){this._isDisposed=!1,this.attachDomPortal=null}hasAttached(){return!!this._attachedPortal}attach(t){return t instanceof r?(this._attachedPortal=t,this.attachComponentPortal(t)):t instanceof a?(this._attachedPortal=t,this.attachTemplatePortal(t)):this.attachDomPortal&&t instanceof c?(this._attachedPortal=t,this.attachDomPortal(t)):void 0}detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}}class h extends l{constructor(t,e,o,s,i){super(),this.outletElement=t,this._componentFactoryResolver=e,this._appRef=o,this._defaultInjector=s,this.attachDomPortal=t=>{const e=t.element,o=this._document.createComment("dom-portal");e.parentNode.insertBefore(o,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(e,o)})},this._document=i}attachComponentPortal(t){const e=(t.componentFactoryResolver||this._componentFactoryResolver).resolveComponentFactory(t.component);let o;return t.viewContainerRef?(o=t.viewContainerRef.createComponent(e,t.viewContainerRef.length,t.injector||t.viewContainerRef.injector),this.setDisposeFn(()=>o.destroy())):(o=e.create(t.injector||this._defaultInjector),this._appRef.attachView(o.hostView),this.setDisposeFn(()=>{this._appRef.detachView(o.hostView),o.destroy()})),this.outletElement.appendChild(this._getComponentRootNode(o)),this._attachedPortal=t,o}attachTemplatePortal(t){let e=t.viewContainerRef,o=e.createEmbeddedView(t.templateRef,t.context);return o.rootNodes.forEach(t=>this.outletElement.appendChild(t)),o.detectChanges(),this.setDisposeFn(()=>{let t=e.indexOf(o);-1!==t&&e.remove(t)}),this._attachedPortal=t,o}dispose(){super.dispose(),null!=this.outletElement.parentNode&&this.outletElement.parentNode.removeChild(this.outletElement)}_getComponentRootNode(t){return t.hostView.rootNodes[0]}}let b=(()=>{class t extends a{constructor(t,e){super(t,e)}}return t.\u0275fac=function(e){return new(e||t)(s.Pb(s.N),s.Pb(s.R))},t.\u0275dir=s.Kb({type:t,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[s.Ab]}),t})(),d=(()=>{class t extends l{constructor(t,e,o){super(),this._componentFactoryResolver=t,this._viewContainerRef=e,this._isInitialized=!1,this.attached=new s.o,this.attachDomPortal=t=>{const e=t.element,o=this._document.createComment("dom-portal");t.setAttachedHost(this),e.parentNode.insertBefore(o,e),this._getRootNode().appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(e,o)})},this._document=o}get portal(){return this._attachedPortal}set portal(t){(!this.hasAttached()||t||this._isInitialized)&&(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t)}get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedPortal=null,this._attachedRef=null}attachComponentPortal(t){t.setAttachedHost(this);const e=null!=t.viewContainerRef?t.viewContainerRef:this._viewContainerRef,o=(t.componentFactoryResolver||this._componentFactoryResolver).resolveComponentFactory(t.component),s=e.createComponent(o,e.length,t.injector||e.injector);return e!==this._viewContainerRef&&this._getRootNode().appendChild(s.hostView.rootNodes[0]),super.setDisposeFn(()=>s.destroy()),this._attachedPortal=t,this._attachedRef=s,this.attached.emit(s),s}attachTemplatePortal(t){t.setAttachedHost(this);const e=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context);return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=e,this.attached.emit(e),e}_getRootNode(){const t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}}return t.\u0275fac=function(e){return new(e||t)(s.Pb(s.j),s.Pb(s.R),s.Pb(i.d))},t.\u0275dir=s.Kb({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:["cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[s.Ab]}),t})(),u=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Nb({type:t}),t.\u0275inj=s.Mb({}),t})()},eFMt:function(t,e,o){"use strict";o.r(e),o.d(e,"ClusterDetailsModule",function(){return P});var s=o("ofXK"),i=o("tyNb"),n=o("mrSG"),r=o("3Pt+"),a=o("JcrP"),c=o("fXoL"),l=o("dLb8"),h=o("5eHb"),b=o("4TgG"),d=o("wZkO"),u=o("9kWO"),p=o("m1XX"),m=o("cZdB");function f(t,e){if(1&t&&(c.Vb(0,"option",23),c.Ec(1),c.Ub()),2&t){const t=e.$implicit;c.mc("ngValue",t),c.Db(1),c.Gc(" ",t," ")}}function g(t,e){if(1&t&&(c.Vb(0,"option",23),c.Ec(1),c.Ub()),2&t){const t=e.$implicit;c.mc("ngValue",t.Block_Code),c.Db(1),c.Gc(" ",t.Block_Name," ")}}function v(t,e){if(1&t&&(c.Vb(0,"tr"),c.Vb(1,"td"),c.Ec(2),c.Ub(),c.Vb(3,"td"),c.Ec(4),c.Ub(),c.Vb(5,"td"),c.Ec(6),c.Ub(),c.Vb(7,"td"),c.Ec(8),c.Ub(),c.Vb(9,"td"),c.Ec(10),c.Ub(),c.Vb(11,"td"),c.Ec(12),c.Ub(),c.Vb(13,"td"),c.Ec(14),c.Ub(),c.Vb(15,"td"),c.Ec(16),c.Ub(),c.Vb(17,"td"),c.Ec(18),c.Ub(),c.Vb(19,"td"),c.Ec(20),c.Ub(),c.Vb(21,"td"),c.Ec(22),c.Ub(),c.Vb(23,"td"),c.Ec(24),c.Ub(),c.Vb(25,"td"),c.Ec(26),c.Ub(),c.Vb(27,"td"),c.Ec(28),c.Ub(),c.Vb(29,"td"),c.Ec(30),c.Ub(),c.Ub()),2&t){const t=e.$implicit,o=e.index;c.Db(2),c.Gc(" ",o+1," "),c.Db(2),c.Gc(" ",t.DemostrationId," "),c.Db(2),c.Gc(" ",t.SubschemeName," "),c.Db(2),c.Gc(" ",t.CompName," "),c.Db(2),c.Gc(" ",t.Gp_Name," "),c.Db(2),c.Gc(" ",t.vaw_userId," "),c.Db(2),c.Gc(" ",t.PhyGen," "),c.Db(2),c.Gc(" ",t.PhySCP," "),c.Db(2),c.Gc(" ",t.PhyTasp," "),c.Db(2),c.Gc(" ",t.AvlPhyGen," "),c.Db(2),c.Gc(" ",t.AvlPhySCP," "),c.Db(2),c.Gc(" ",t.AvlPhyTASP," "),c.Db(2),c.Gc(" ",t.GenFarmer," "),c.Db(2),c.Gc(" ",t.SCFarmer," "),c.Db(2),c.Gc(" ",t.STFarmer," ")}}function V(t,e){if(1&t){const t=c.Wb();c.Vb(0,"div",2),c.Vb(1,"div",24),c.Vb(2,"div",8),c.Vb(3,"div",25),c.Vb(4,"input",26),c.cc("ngModelChange",function(e){return c.wc(t),c.gc().filterTerm=e}),c.Ub(),c.Vb(5,"table",27),c.Vb(6,"thead"),c.Vb(7,"tr"),c.Vb(8,"th",28),c.Ec(9,"#"),c.Ub(),c.Vb(10,"th",29),c.Ec(11,"Demonstration Id"),c.Ub(),c.Vb(12,"th",29),c.Ec(13,"Subscheme "),c.Ub(),c.Vb(14,"th",29),c.Ec(15,"Component "),c.Ub(),c.Vb(16,"th",29),c.Ec(17," GP Name "),c.Ub(),c.Vb(18,"th",29),c.Ec(19,"VAW Name"),c.Ub(),c.Vb(20,"th",30),c.Ec(21,"Total Target Allotment"),c.Ub(),c.Vb(22,"th",30),c.Ec(23,"Total Available Target"),c.Ub(),c.Vb(24,"th",30),c.Ec(25,"Benificiary Tagged"),c.Ub(),c.Ub(),c.Vb(26,"tr"),c.Vb(27,"th",31),c.Ec(28,"General"),c.Ub(),c.Vb(29,"th",31),c.Ec(30,"SCP"),c.Ub(),c.Vb(31,"th",31),c.Ec(32,"TASP"),c.Ub(),c.Vb(33,"th",31),c.Ec(34,"General"),c.Ub(),c.Vb(35,"th",31),c.Ec(36,"SCP"),c.Ub(),c.Vb(37,"th",31),c.Ec(38,"TASP"),c.Ub(),c.Vb(39,"th",31),c.Ec(40,"General"),c.Ub(),c.Vb(41,"th",31),c.Ec(42,"SCP"),c.Ub(),c.Vb(43,"th",31),c.Ec(44,"TASP"),c.Ub(),c.Ub(),c.Ub(),c.Vb(45,"tbody"),c.Dc(46,v,31,15,"tr",32),c.hc(47,"filter"),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Vb(48,"div",8),c.Vb(49,"div",10),c.Vb(50,"div",33),c.Vb(51,"button",34),c.Qb(52,"i",35),c.Ec(53,"Print"),c.Ub(),c.Vb(54,"button",36),c.cc("click",function(){return c.wc(t),c.gc().exportexcel()}),c.Qb(55,"i",37),c.Ec(56," Export to Excel "),c.Ub(),c.Ub(),c.Qb(57,"div",33),c.Ub(),c.Ub(),c.Ub()}if(2&t){const t=c.gc();c.Db(4),c.mc("ngModel",t.filterTerm),c.Db(42),c.mc("ngForOf",c.jc(47,3,t.clusterReport,t.filterTerm)),c.Db(5),c.mc("useExistingCss",!0)}}function D(t,e){1&t&&(c.Vb(0,"div",2),c.Vb(1,"div"),c.Vb(2,"h4",38),c.Ec(3,"There is no Demonstration Id Created in this block / Invoice no."),c.Ub(),c.Ub(),c.Ub())}const U=[{path:"",component:(()=>{class t{constructor(t,e,o,s){this.cdaoService=t,this.toastr=e,this.fb=o,this.layoutService=s,this.demonstrationClusterTable=!1,this.message=!1,this.fileName="ClusterDetailsReport.xlsx",this.getFinYear=()=>Object(n.a)(this,void 0,void 0,function*(){try{const t=yield this.layoutService.getFinYear().toPromise();this.FinYears=t.Years,this.Season=t.Season}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.loadBlocks=()=>Object(n.a)(this,void 0,void 0,function*(){this.clusterForm.patchValue({blockCode:""}),this.allBlocks=[],this.demonstrationClusterTable=!1,this.allBlocks=yield this.cdaoService.getBlocks().toPromise()}),this.getclusterDemonstration=()=>Object(n.a)(this,void 0,void 0,function*(){try{this.demonstrationClusterTable=!0,this.clusterDemonstration=yield this.cdaoService.getclusterDemonstration(this.clusterForm.value.blockCode,this.clusterForm.value.FinYear).toPromise(),0==this.clusterDemonstration.length&&(this.message=!0),this.clusterReport=this.clusterDemonstration.result,this.GpData=this.clusterDemonstration.GpData,this.clusterDemonstration.result.forEach(t=>{this.GpData.forEach(e=>{if(t.DemostrationId==e.DemostrationId)return t.DemostrationId=e.DemostrationId,t.Gp_Name=null==t.Gp_Name?e.Gp_Name:t.Gp_Name+",\n"+e.Gp_Name,t})})}catch(t){this.toastr.error("Sorry. Server problem. Please try again."),console.error(t)}}),this.pageTitle="Report",this.pageDesc="Cluster Details",this.breadcrumbList=["Block wise Cluster Details"],this.clusterForm=this.fb.group({FinYear:["",[r.s.required]],blockCode:["",[r.s.required]]})}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getFinYear()}exportexcel(){let t=document.getElementById("excel-table");const e=a.a.table_to_sheet(t),o=a.a.book_new();a.a.book_append_sheet(o,e,"Sheet1"),a.b(o,this.fileName)}}return t.\u0275fac=function(e){return new(e||t)(c.Pb(l.a),c.Pb(h.b),c.Pb(r.c),c.Pb(b.a))},t.\u0275cmp=c.Jb({type:t,selectors:[["app-cluster-details"]],decls:40,vars:5,consts:[["animationDuration","0ms"],["label","Cluster/Demonstration Patch Details"],[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[3,"formGroup"],[1,"row"],[1,"col-sm-2","col-lg-2","col-form-label"],[1,"col-sm-4","col-lg-4"],[1,"input-group"],[1,"input-group-addon"],[1,"ion-arrow-down-b"],["formControlName","FinYear","id","FinYear",1,"form-control","form-control-default",3,"change"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],["id","District","formControlName","blockCode",1,"form-control",3,"change"],["value","","disabled",""],["class","card",4,"ngIf"],["label","Demonstration Patch Phase Wise Report(Mobile App)"],[3,"ngValue"],["id","print-section"],[1,"dt-responsive","table-responsive"],["type","text","placeholder","Search",1,"form-control",3,"ngModel","ngModelChange"],["id","custom-btn","id","excel-table",1,"table","table-striped","table-bordered","nowrap"],["rowspan","2"],["rowspan","2",2,"vertical-align","middle","text-align","center"],["colspan","3",2,"vertical-align","middle","text-align","center"],[2,"vertical-align","middle","text-align","center"],[4,"ngFor","ngForOf"],[1,"col-md-12"],["styleSheetFile","assets/css/custom1.css,assets/css/custom2.css","printSectionId","print-section","ngxPrint","",1,"btn","btn-primary","mat-elevation-z8","float-right",3,"useExistingCss"],[1,"icofont","icofont-print"],[1,"btn","btn-primary","mat-elevation-z8","float-right",2,"margin-right","10px",3,"click"],[1,"ion-ios-upload"],[2,"text-align","center","color","red"]],template:function(t,e){1&t&&(c.Vb(0,"mat-tab-group",0),c.Vb(1,"mat-tab",1),c.Vb(2,"div",2),c.Vb(3,"div",3),c.Vb(4,"h5"),c.Ec(5,"Cluster Details"),c.Ub(),c.Vb(6,"span"),c.Ec(7,"Block Wise Cluster Details"),c.Ub(),c.Vb(8,"div",4),c.Qb(9,"i",5),c.Qb(10,"i",6),c.Qb(11,"i",7),c.Ub(),c.Ub(),c.Vb(12,"div",8),c.Vb(13,"form",9),c.Vb(14,"div",10),c.Vb(15,"label",11),c.Ec(16,"Financial Year *:"),c.Ub(),c.Vb(17,"div",12),c.Vb(18,"div",13),c.Vb(19,"span",14),c.Qb(20,"i",15),c.Ub(),c.Vb(21,"select",16),c.cc("change",function(){return e.loadBlocks()}),c.Vb(22,"option",17),c.Ec(23,"--Select--"),c.Ub(),c.Dc(24,f,2,2,"option",18),c.Ub(),c.Ub(),c.Ub(),c.Vb(25,"label",11),c.Ec(26,"Select Block *:"),c.Ub(),c.Vb(27,"div",12),c.Vb(28,"div",13),c.Vb(29,"span",14),c.Qb(30,"i",15),c.Ub(),c.Vb(31,"select",19),c.cc("change",function(){return e.getclusterDemonstration()}),c.Vb(32,"option",20),c.Ec(33,"--Select--"),c.Ub(),c.Dc(34,g,2,2,"option",18),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Qb(35,"br"),c.Ub(),c.Ub(),c.Ub(),c.Dc(36,V,58,6,"div",21),c.Dc(37,D,4,0,"div",21),c.Ub(),c.Vb(38,"mat-tab",22),c.Qb(39,"app-demonstration-report"),c.Ub(),c.Ub()),2&t&&(c.Db(13),c.mc("formGroup",e.clusterForm),c.Db(11),c.mc("ngForOf",e.FinYears),c.Db(10),c.mc("ngForOf",e.allBlocks),c.Db(2),c.mc("ngIf",e.demonstrationClusterTable),c.Db(1),c.mc("ngIf",e.message))},directives:[d.b,d.a,r.t,r.k,r.e,r.r,r.j,r.d,r.n,r.u,s.k,s.l,u.a,r.b,r.m,p.a],pipes:[m.a],styles:["td[_ngcontent-%COMP%]{white-space:pre-wrap}"]}),t})()}];let _=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[i.d.forChild(U)],i.d]}),t})(),P=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({imports:[[s.c,_,r.f,r.p,p.b,d.c,m.b]]}),t})()}}]);
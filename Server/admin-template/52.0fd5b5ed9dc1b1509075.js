(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{zKMi:function(e,t,b){"use strict";b.r(t),b.d(t,"VerifyDealerSaleModule",function(){return Q});var i=b("ofXK"),a=b("3Pt+"),o=b("tyNb"),c=b("mrSG"),r=b("0IaG"),l=b("fXoL"),n=b("5KCI"),s=b("5eHb"),d=b("NFeN"),h=b("m1XX");function V(e,t){if(1&e&&(l.Vb(0,"tr"),l.Vb(1,"th",18),l.Dc(2),l.Ub(),l.Vb(3,"td"),l.Dc(4),l.Ub(),l.Vb(5,"td"),l.Dc(6),l.Ub(),l.Vb(7,"td"),l.Dc(8),l.Ub(),l.Vb(9,"td"),l.Dc(10),l.Ub(),l.Vb(11,"td"),l.Dc(12),l.Ub(),l.Ub()),2&e){const e=t.$implicit,b=t.index;l.Db(2),l.Fc(" ",b+1," "),l.Db(2),l.Fc(" ",e.Technical_Name," "),l.Db(2),l.Hc(" ",e.packageSize," ",e.unit," * ",e.packageQuantity," "),l.Db(2),l.Fc(" ",e.totalPrice," "),l.Db(2),l.Fc(" ",e.totalPrice-e.eligibleSubsidy," "),l.Db(2),l.Fc(" ",e.eligibleSubsidy," ")}}let U=(()=>{class e{constructor(e,t,b,i){this.baoService=e,this.toastr=t,this.dialogRef=b,this.data=i,this.getDealerSaleReciept=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=this.data.InvoiceNo;this.dealerSaleResult=yield this.baoService.getDealerSaleReciept(e).toPromise(),this.getVAWSaleReciept()}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getVAWSaleReciept=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=this.data.Permit_NO;this.vawSaleResult=yield this.baoService.getVAWSaleReciept(e).toPromise()}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getDate=()=>{var e=new Date(this.data.SoldOn);this.date=JSON.stringify(e),this.date=this.date.slice(1,11)}}ngOnInit(){this.getDealerSaleReciept(),this.getDate()}}return e.\u0275fac=function(t){return new(t||e)(l.Pb(n.a),l.Pb(s.b),l.Pb(r.g),l.Pb(r.a))},e.\u0275cmp=l.Jb({type:e,selectors:[["app-view-receipt"]],inputs:{dealerSaleResult:"dealerSaleResult",vawSaleResult:"vawSaleResult"},decls:83,vars:8,consts:[["mat-dialog-title",""],["mat-dialog-close","",2,"float","right"],["id","print-section",1,"mat-typography"],[1,"row"],[1,"col-md-12"],[2,"text-align","center"],[1,"col-sm-6","col-lg-6"],[1,"col-sm-2","col-lg-2"],[1,"col-sm-4","col-lg-4"],[1,"table-responsive"],[1,"table","table-bordered"],[4,"ngFor","ngForOf"],[2,"color","red","text-align","center"],[1,"col-sm-3","col-lg-3"],[1,"col-md-7"],[1,"vertical-center"],["type","button","id","primary-popover-content","data-container","body","data-toggle","popover","title","Primary color states","data-placement","bottom","styleSheetFile","assets/css/custom1.css,assets/css/custom2.css","printSectionId","print-section","ngxPrint","",1,"btn","btn-primary",2,"float","right","margin-right","30px",3,"useExistingCss"],["align","end"],["scope","row"]],template:function(e,t){1&e&&(l.Vb(0,"h2",0),l.Dc(1,"Print Of Sale Receipt "),l.Vb(2,"mat-icon",1),l.Dc(3,"close"),l.Ub(),l.Ub(),l.Vb(4,"mat-dialog-content",2),l.Vb(5,"div",3),l.Vb(6,"div",4),l.Vb(7,"h4",5),l.Dc(8," \u0b15\u0b43\u0b37\u0b3f \u0b13 \u0b15\u0b43\u0b37\u0b15 \u0b38\u0b36\u0b15\u0b4d\u0b24\u0b3f\u0b15\u0b30\u0b23 \u0b2c\u0b3f\u0b2d\u0b3e\u0b17 "),l.Qb(9,"br"),l.Dc(10,"DEPARTMENT OF AGRICULTURE AND FARMER'S EMPOWERMENT "),l.Ub(),l.Vb(11,"h4",5),l.Vb(12,"u"),l.Dc(13,"Dealer Sale Receipt"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(14,"div",3),l.Vb(15,"div",6),l.Vb(16,"label"),l.Dc(17),l.Ub(),l.Ub(),l.Qb(18,"div",7),l.Vb(19,"div",8),l.Vb(20,"label"),l.Dc(21),l.Ub(),l.Qb(22,"br"),l.Vb(23,"label"),l.Dc(24),l.Ub(),l.Ub(),l.Ub(),l.Qb(25,"br"),l.Vb(26,"div",3),l.Vb(27,"div",9),l.Vb(28,"table",10),l.Vb(29,"thead"),l.Vb(30,"tr"),l.Vb(31,"th"),l.Dc(32,"#"),l.Ub(),l.Vb(33,"th"),l.Dc(34,"Technical Name"),l.Ub(),l.Vb(35,"th"),l.Dc(36,"Qauntity"),l.Ub(),l.Vb(37,"th"),l.Dc(38,"Total Price(In Rs)"),l.Ub(),l.Vb(39,"th"),l.Dc(40,"Farmer's Share(In Rs)"),l.Ub(),l.Vb(41,"th"),l.Dc(42,"Eligible Amount"),l.Ub(),l.Ub(),l.Ub(),l.Vb(43,"tbody"),l.Cc(44,V,13,8,"tr",11),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(45,"div",3),l.Vb(46,"div",4),l.Vb(47,"h4",12),l.Vb(48,"u"),l.Dc(49,"Conditions"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(50,"div",3),l.Vb(51,"div",4),l.Vb(52,"p"),l.Dc(53," 1. One copy of the receipt to be given to the farmer."),l.Qb(54,"br"),l.Dc(55,"2. Second copy of the receipt to be kept with the dealer. "),l.Ub(),l.Ub(),l.Ub(),l.Qb(56,"br"),l.Qb(57,"br"),l.Vb(58,"div",3),l.Vb(59,"div",6),l.Vb(60,"h4"),l.Vb(61,"u"),l.Dc(62,"Signature of Registered Dealer"),l.Ub(),l.Qb(63,"br"),l.Dc(64),l.Qb(65,"br"),l.Ub(),l.Ub(),l.Qb(66,"div",13),l.Vb(67,"div",13),l.Vb(68,"h4"),l.Vb(69,"u"),l.Dc(70,"Details of Benificiary(Farmer)"),l.Ub(),l.Qb(71,"br"),l.Dc(72),l.Qb(73,"br"),l.Dc(74),l.Ub(),l.Ub(),l.Ub(),l.Qb(75,"br"),l.Qb(76,"br"),l.Vb(77,"div",3),l.Vb(78,"div",14),l.Vb(79,"div",15),l.Vb(80,"button",16),l.Dc(81," Print "),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Qb(82,"mat-dialog-actions",17)),2&e&&(l.Db(17),l.Fc("Dealer Licence No : ",t.data.dealerLiscenseNo," "),l.Db(4),l.Fc("Sale Date : ",t.date," "),l.Db(3),l.Fc("Invoice No : ",t.data.InvoiceNo," "),l.Db(20),l.mc("ngForOf",t.dealerSaleResult),l.Db(20),l.Fc("Name: ",t.data.SoldBy," "),l.Db(8),l.Fc(" Name: ",t.data.FarmerName," "),l.Db(2),l.Fc(" FarmerId: ",t.data.FarmerId," "),l.Db(6),l.mc("useExistingCss",!0))},directives:[r.h,d.a,r.d,r.e,i.j,h.a,r.c],styles:["td[_ngcontent-%COMP%]{white-space:pre-wrap}"]}),e})();var D=b("4TgG"),m=b("bSwM");const u=["content"];function p(e,t){if(1&e&&(l.Vb(0,"option",51),l.Dc(1),l.Ub()),2&e){const e=t.$implicit;l.mc("ngValue",e.DemostrationId),l.Db(1),l.Ec(e.DemostrationId)}}function g(e,t){if(1&e){const e=l.Wb();l.Vb(0,"tr"),l.Vb(1,"td"),l.Vb(2,"mat-checkbox",52),l.cc("ngModelChange",function(e){return t.$implicit.completed=e})("ngModelChange",function(){return l.vc(e),l.gc().updateAllComplete()}),l.Ub(),l.Ub(),l.Vb(3,"th",42),l.Dc(4),l.Ub(),l.Vb(5,"td"),l.Dc(6),l.Ub(),l.Vb(7,"td"),l.Dc(8),l.Ub(),l.Vb(9,"td"),l.Dc(10),l.Ub(),l.Vb(11,"td"),l.Dc(12),l.hc(13,"number"),l.Ub(),l.Vb(14,"td"),l.Dc(15),l.hc(16,"number"),l.Ub(),l.Vb(17,"td"),l.Dc(18),l.Ub(),l.Vb(19,"td"),l.Vb(20,"button",53),l.cc("click",function(){l.vc(e);const b=t.$implicit;return l.gc().openDialog(b)}),l.Dc(21,"View"),l.Ub(),l.Ub(),l.Ub()}if(2&e){const e=t.$implicit,b=t.index;l.Db(2),l.mc("ngModel",e.completed),l.Db(2),l.Fc(" ",b+1," "),l.Db(2),l.Fc(" ",e.Permit_NO," "),l.Db(2),l.Fc(" ",e.InvoiceNo," "),l.Db(2),l.Fc(" ",e.FarmerId," "),l.Db(2),l.Fc(" ",l.jc(13,8,e.totalsaleprice,"1.2-2")," "),l.Db(3),l.Fc(" ",l.jc(16,11,e.totaleligiblesubsidy,"1.2-2")," "),l.Db(3),l.Fc(" ",e.Farmer_Category," ")}}function v(e,t){1&e&&(l.Vb(0,"div"),l.Vb(1,"h4",54),l.Dc(2,"There is no delear sale for forward to CDAO in this demonstration Id."),l.Ub(),l.Ub())}function f(e,t){if(1&e){const e=l.Wb();l.Vb(0,"div",6),l.Vb(1,"div",7),l.Qb(2,"div",55),l.Vb(3,"div",44),l.Vb(4,"button",56),l.cc("click",function(){return l.vc(e),l.gc().confirmDealerSale()}),l.Dc(5,"Forward to CDAO"),l.Ub(),l.Ub(),l.Qb(6,"div",40),l.Ub(),l.Ub()}if(2&e){const e=l.gc();l.Db(4),l.mc("disabled",!e.forwardButton)}}const y=[{path:"",component:(()=>{class e{constructor(e,t,b,i){this.baoService=e,this.toastr=t,this.layoutService=b,this.dialog=i,this.showModalBox=!1,this.selected=-1,this.allComplete=!1,this.showConfirm=!1,this.message=!1,this.forwardButton=!1,this.getDemonstrationData=()=>Object(c.a)(this,void 0,void 0,function*(){try{this.demonstrationData=yield this.baoService.getVerifiedDemonstrationData().toPromise()}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getAllDealerSale=()=>Object(c.a)(this,void 0,void 0,function*(){try{this.allDealerResult=yield this.baoService.getAllDealerSale(this.demonstrationId).toPromise(),this.allDealerResult.length>0?(this.message=!1,this.showConfirm=!0):(this.message=!0,this.showConfirm=!1)}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.confirmDealerSale=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=this.allDealerResult.filter(e=>e.completed);this.confirmResult=yield this.baoService.confirmDealerSale(e).toPromise(),this.toastr.success(this.confirmResult.message),this.allDealerResult=[],this.showConfirm=!1}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.pageTitle="Dealer Sale List",this.pageDesc="dealer sale details",this.breadcrumbList=["Sale Details"]}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getDemonstrationData()}updateAllComplete(){this.allComplete=null!=this.allDealerResult&&this.allDealerResult.every(e=>e.completed);for(let e=0;e<this.allDealerResult.length;e++){if(1==this.allDealerResult[e].completed){this.forwardButton=!0;break}this.forwardButton=!1}}someComplete(){return null!=this.allDealerResult&&this.allDealerResult.filter(e=>e.completed).length>0&&!this.allComplete}setAll(e){this.allComplete=e,null!=this.allDealerResult&&(this.allDealerResult.forEach(t=>t.completed=e),this.forwardButton=1==this.allComplete)}openDialog(e){this.dialog.open(U,{panelClass:"custom-dialog-container",data:e}).afterClosed().subscribe(e=>{console.log(`Dialog result: ${e}`)})}}return e.\u0275fac=function(t){return new(t||e)(l.Pb(n.a),l.Pb(s.b),l.Pb(D.a),l.Pb(r.b))},e.\u0275cmp=l.Jb({type:e,selectors:[["app-verify-dealer-sale"]],viewQuery:function(e,t){if(1&e&&l.Ic(u,1),2&e){let e;l.sc(e=l.dc())&&(t.content=e.first)}},decls:245,vars:10,consts:[[1,"card"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[1,"row"],[1,"col-sm-3","col-lg-3","col-form-label"],[1,"asterik"],[1,"col-sm-6","col-lg-5"],[1,"input-group"],[1,"input-group-addon"],[1,"ion-arrow-down-b"],["id","demonstrationId",1,"required","form-control",3,"ngModel","ngModelChange"],["value",""],[3,"ngValue",4,"ngFor","ngForOf"],[1,"col-sm-3","col-lg-4"],["type","button","id","primary-popover-content","data-container","body","data-toggle","popover","title","Primary color states","data-placement","bottom",1,"btn","btn-primary",3,"disabled","click"],[1,"card-block","table-border-style"],[1,"table-responsive"],[1,"table","table-hover"],[1,"example-margin",3,"checked","indeterminate","change"],[4,"ngFor","ngForOf"],[4,"ngIf"],["class","card-block",4,"ngIf"],["id","exampleModal","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],["content",""],["role","document",1,"modal-dialog","modal-lg"],[1,"modal-content",2,"width","1000px"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],[1,"modal-body"],["id","print-section1",1,"card-block"],[1,"col-md-12"],[2,"text-align","center"],[1,"col-sm-6","col-lg-6"],[1,"col-sm-2","col-lg-2"],[1,"col-sm-4","col-lg-4"],[1,"table","table-bordered"],["scope","row"],[2,"color","red","text-align","center"],[1,"col-sm-3","col-lg-3"],[1,"col-md-7"],[1,"vertical-center"],["type","button","id","primary-popover-content","data-container","body","data-toggle","popover","title","Primary color states","data-placement","bottom","styleSheetFile","assets/css/custom1.css,assets/css/custom2.css","printSectionId","print-section2","ngxPrint","",1,"btn","btn-primary",2,"float","right","margin-right","30px",3,"useExistingCss"],["id","print-section2",1,"card-block"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-secondary"],[3,"ngValue"],[3,"ngModel","ngModelChange"],[1,"btn","btn-primary","btn-round",3,"click"],[2,"text-align","center","color","red"],[1,"col-sm-5","col-lg-5"],[1,"btn","btn-primary","btn-round",2,"margin-left","5px",3,"disabled","click"]],template:function(e,t){1&e&&(l.Vb(0,"div",0),l.Vb(1,"div",1),l.Vb(2,"h4"),l.Dc(3,"Verification Of Dealer Sale"),l.Ub(),l.Vb(4,"div",2),l.Qb(5,"i",3),l.Qb(6,"i",4),l.Qb(7,"i",5),l.Ub(),l.Ub(),l.Vb(8,"div",6),l.Vb(9,"div",7),l.Vb(10,"label",8),l.Dc(11,"Select Demonstration ID "),l.Vb(12,"label",9),l.Dc(13,"*"),l.Ub(),l.Dc(14,":"),l.Ub(),l.Vb(15,"div",10),l.Vb(16,"div",11),l.Vb(17,"span",12),l.Qb(18,"i",13),l.Ub(),l.Vb(19,"select",14),l.cc("ngModelChange",function(e){return t.demonstrationId=e}),l.Vb(20,"option",15),l.Dc(21,"--Select--"),l.Ub(),l.Cc(22,p,2,2,"option",16),l.Ub(),l.Ub(),l.Ub(),l.Vb(23,"div",17),l.Vb(24,"button",18),l.cc("click",function(){return t.getAllDealerSale()}),l.Dc(25,"Get Sale List"),l.Ub(),l.Ub(),l.Ub(),l.Qb(26,"br"),l.Qb(27,"br"),l.Vb(28,"div",19),l.Vb(29,"div",20),l.Vb(30,"table",21),l.Vb(31,"thead"),l.Vb(32,"tr"),l.Vb(33,"th"),l.Vb(34,"mat-checkbox",22),l.cc("change",function(e){return t.setAll(e.checked)}),l.Ub(),l.Dc(35," Select All "),l.Ub(),l.Vb(36,"th"),l.Dc(37,"SL"),l.Ub(),l.Vb(38,"th"),l.Dc(39,"Permit No"),l.Ub(),l.Vb(40,"th"),l.Dc(41,"Invoice No"),l.Ub(),l.Vb(42,"th"),l.Dc(43,"Farmer Id"),l.Ub(),l.Vb(44,"th"),l.Dc(45,"Total Sale Price(in Rs)"),l.Ub(),l.Vb(46,"th"),l.Dc(47,"Total Eligible Amount(in Rs)"),l.Ub(),l.Vb(48,"th"),l.Dc(49,"Catagory"),l.Ub(),l.Vb(50,"th"),l.Dc(51,"Sale Details"),l.Ub(),l.Ub(),l.Ub(),l.Vb(52,"tbody"),l.Cc(53,g,22,14,"tr",23),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Qb(54,"br"),l.Cc(55,v,3,0,"div",24),l.Qb(56,"br"),l.Cc(57,f,7,1,"div",25),l.Ub(),l.Ub(),l.Vb(58,"div",26,27),l.Vb(60,"div",28),l.Vb(61,"div",29),l.Vb(62,"div",30),l.Vb(63,"h4",31),l.Dc(64,"Dealer Sale Details"),l.Ub(),l.Vb(65,"button",32),l.Vb(66,"span",33),l.Dc(67,"\xd7"),l.Ub(),l.Ub(),l.Ub(),l.Vb(68,"div",34),l.Vb(69,"div",0),l.Vb(70,"div",1),l.Vb(71,"h4"),l.Dc(72,"Print Of Sale Receipt"),l.Ub(),l.Ub(),l.Vb(73,"div",35),l.Vb(74,"div",7),l.Vb(75,"div",36),l.Vb(76,"h4",37),l.Dc(77," \u0b15\u0b43\u0b37\u0b3f \u0b13 \u0b15\u0b43\u0b37\u0b15 \u0b38\u0b36\u0b15\u0b4d\u0b24\u0b3f\u0b15\u0b30\u0b23 \u0b2c\u0b3f\u0b2d\u0b3e\u0b17 "),l.Qb(78,"br"),l.Dc(79,"DEPARTMENT OF AGRICULTURE AND FARMER'S EMPOWERMENT "),l.Ub(),l.Vb(80,"h4",37),l.Vb(81,"u"),l.Dc(82,"Dealer Sale Receipt"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(83,"div",7),l.Vb(84,"div",38),l.Vb(85,"label"),l.Dc(86,"Dealer Licence No : "),l.Ub(),l.Ub(),l.Qb(87,"div",39),l.Vb(88,"div",40),l.Vb(89,"label"),l.Dc(90,"Sale Date : "),l.Ub(),l.Qb(91,"br"),l.Vb(92,"label"),l.Dc(93,"Invoice No : "),l.Ub(),l.Ub(),l.Ub(),l.Qb(94,"br"),l.Vb(95,"div",7),l.Vb(96,"div",20),l.Vb(97,"table",41),l.Vb(98,"thead"),l.Vb(99,"tr"),l.Vb(100,"th"),l.Dc(101,"#"),l.Ub(),l.Vb(102,"th"),l.Dc(103,"Trade Name"),l.Ub(),l.Vb(104,"th"),l.Dc(105,"Technical Name"),l.Ub(),l.Vb(106,"th"),l.Dc(107,"Manufacture Name"),l.Ub(),l.Vb(108,"th"),l.Dc(109,"Qauntity"),l.Ub(),l.Vb(110,"th"),l.Dc(111,"Total Price(In Rs)"),l.Ub(),l.Ub(),l.Ub(),l.Vb(112,"tbody"),l.Vb(113,"tr"),l.Vb(114,"th",42),l.Dc(115,"1"),l.Ub(),l.Qb(116,"td"),l.Qb(117,"td"),l.Qb(118,"td"),l.Qb(119,"td"),l.Qb(120,"td"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(121,"div",7),l.Vb(122,"div",36),l.Vb(123,"h4",43),l.Vb(124,"u"),l.Dc(125,"Conditions"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(126,"div",7),l.Vb(127,"div",36),l.Vb(128,"p"),l.Dc(129," 1. One copy of the receipt to be given to the farmer."),l.Qb(130,"br"),l.Dc(131,"2. Second copy of the receipt to be kept with the dealer. "),l.Ub(),l.Ub(),l.Ub(),l.Qb(132,"br"),l.Qb(133,"br"),l.Vb(134,"div",7),l.Vb(135,"div",38),l.Vb(136,"h4"),l.Vb(137,"u"),l.Dc(138,"Signature of Registered Dealer"),l.Ub(),l.Qb(139,"br"),l.Dc(140,"Name: "),l.Qb(141,"br"),l.Ub(),l.Ub(),l.Qb(142,"div",44),l.Vb(143,"div",44),l.Vb(144,"h4"),l.Vb(145,"u"),l.Dc(146,"Details of Benificiary(Farmer)"),l.Ub(),l.Qb(147,"br"),l.Dc(148," Name: "),l.Qb(149,"br"),l.Dc(150," FarmerId: "),l.Ub(),l.Ub(),l.Ub(),l.Qb(151,"br"),l.Vb(152,"div",7),l.Vb(153,"div",45),l.Vb(154,"div",46),l.Vb(155,"button",47),l.Dc(156," Print "),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Qb(157,"hr"),l.Vb(158,"div",0),l.Vb(159,"div",1),l.Vb(160,"h4"),l.Dc(161,"Print Of Sale Receipt"),l.Ub(),l.Ub(),l.Vb(162,"div",48),l.Vb(163,"div",7),l.Vb(164,"div",36),l.Vb(165,"h4",37),l.Dc(166," \u0b15\u0b43\u0b37\u0b3f \u0b13 \u0b15\u0b43\u0b37\u0b15 \u0b38\u0b36\u0b15\u0b4d\u0b24\u0b3f\u0b15\u0b30\u0b23 \u0b2c\u0b3f\u0b2d\u0b3e\u0b17 "),l.Qb(167,"br"),l.Dc(168,"DEPARTMENT OF AGRICULTURE AND FARMER'S EMPOWERMENT "),l.Ub(),l.Vb(169,"h4",37),l.Vb(170,"u"),l.Dc(171,"VAW Permit e-Receipt"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(172,"div",7),l.Vb(173,"div",38),l.Vb(174,"label"),l.Dc(175,"VAW ANGARBANDHA : "),l.Ub(),l.Ub(),l.Qb(176,"div",39),l.Vb(177,"div",40),l.Vb(178,"label"),l.Dc(179,"Name Of Benificiary(Farmer) : "),l.Ub(),l.Qb(180,"br"),l.Vb(181,"label"),l.Dc(182,"Name : "),l.Ub(),l.Qb(183,"br"),l.Vb(184,"label"),l.Dc(185,"FarmerId :"),l.Ub(),l.Ub(),l.Ub(),l.Qb(186,"br"),l.Vb(187,"div",7),l.Vb(188,"div",20),l.Vb(189,"table",41),l.Vb(190,"thead"),l.Vb(191,"tr"),l.Vb(192,"th"),l.Dc(193,"#"),l.Ub(),l.Vb(194,"th"),l.Dc(195,"Sale Date"),l.Ub(),l.Vb(196,"th"),l.Dc(197,"Invoice No"),l.Ub(),l.Vb(198,"th"),l.Dc(199,"Permit No"),l.Ub(),l.Vb(200,"th"),l.Dc(201,"Technical Name"),l.Ub(),l.Vb(202,"th"),l.Dc(203,"Area (in ha)"),l.Ub(),l.Vb(204,"th"),l.Dc(205,"Quantity"),l.Ub(),l.Vb(206,"th"),l.Dc(207,"total Sale Price"),l.Ub(),l.Vb(208,"th"),l.Dc(209,"Subsidy"),l.Ub(),l.Vb(210,"th"),l.Dc(211,"Farmer's Share"),l.Ub(),l.Ub(),l.Ub(),l.Vb(212,"tbody"),l.Vb(213,"tr"),l.Vb(214,"th",42),l.Dc(215,"1"),l.Ub(),l.Qb(216,"td"),l.Qb(217,"td"),l.Qb(218,"td"),l.Qb(219,"td"),l.Qb(220,"td"),l.Qb(221,"td"),l.Qb(222,"td"),l.Qb(223,"td"),l.Qb(224,"td"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(225,"div",7),l.Vb(226,"div",36),l.Vb(227,"h4",43),l.Vb(228,"u"),l.Dc(229,"Conditions"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(230,"div",7),l.Vb(231,"div",36),l.Vb(232,"p"),l.Dc(233," 1. One copy of the receipt to be given to the farmer."),l.Qb(234,"br"),l.Dc(235,"2. Second copy of the receipt to be kept with the dealer. "),l.Ub(),l.Ub(),l.Ub(),l.Qb(236,"br"),l.Vb(237,"div",7),l.Vb(238,"div",45),l.Vb(239,"div",46),l.Vb(240,"button",47),l.Dc(241," Print "),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Vb(242,"div",49),l.Vb(243,"button",50),l.Dc(244,"Close"),l.Ub(),l.Ub(),l.Ub(),l.Ub(),l.Ub()),2&e&&(l.Db(19),l.mc("ngModel",t.demonstrationId),l.Db(3),l.mc("ngForOf",t.demonstrationData),l.Db(2),l.mc("disabled",null==t.demonstrationId),l.Db(10),l.mc("checked",t.allComplete)("indeterminate",t.someComplete()),l.Db(19),l.mc("ngForOf",t.allDealerResult),l.Db(2),l.mc("ngIf",t.message),l.Db(2),l.mc("ngIf",t.showConfirm),l.Db(98),l.mc("useExistingCss",!0),l.Db(85),l.mc("useExistingCss",!0))},directives:[a.r,a.j,a.m,a.n,a.u,i.j,m.a,i.k,h.a],pipes:[i.d],styles:['.asterik[_ngcontent-%COMP%]{content:"*";color:red}']}),e})()}];let S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Nb({type:e}),e.\u0275inj=l.Mb({imports:[[o.d.forChild(y)],o.d]}),e})(),Q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Nb({type:e}),e.\u0275inj=l.Mb({imports:[[i.b,S,m.b,a.f,r.f,d.b,h.b]]}),e})()}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{M5lz:function(e,t,o){"use strict";o.r(t),o.d(t,"AddItemModule",function(){return g});var i=o("ofXK"),b=o("tyNb"),c=o("mrSG"),r=o("3Pt+"),n=o("fXoL"),a=o("BSJL"),m=o("4TgG"),s=o("5eHb");function l(e,t){if(1&e&&(n.Vb(0,"option",48),n.Ec(1),n.Ub()),2&e){const e=t.$implicit;n.mc("ngValue",e),n.Db(1),n.Fc(e.schemeName)}}function d(e,t){if(1&e&&(n.Vb(0,"option",48),n.Ec(1),n.Ub()),2&e){const e=t.$implicit;n.mc("ngValue",e),n.Db(1),n.Fc(e.SubschemeName)}}function h(e,t){if(1&e&&(n.Vb(0,"option",48),n.Ec(1),n.Ub()),2&e){const e=t.$implicit;n.mc("ngValue",e),n.Db(1),n.Gc(" ",e.CompName," ")}}function u(e,t){if(1&e&&(n.Vb(0,"option",48),n.Ec(1),n.Ub()),2&e){const e=t.$implicit;n.mc("ngValue",e),n.Db(1),n.Gc(" ",e," ")}}function p(e,t){if(1&e){const e=n.Wb();n.Vb(0,"tr"),n.Vb(1,"td"),n.Ec(2),n.Ub(),n.Vb(3,"td"),n.Ec(4),n.Ub(),n.Vb(5,"td"),n.Ec(6),n.Ub(),n.Vb(7,"td"),n.Ec(8),n.Ub(),n.Vb(9,"td"),n.Ec(10),n.Ub(),n.Vb(11,"td"),n.Ec(12),n.Ub(),n.Vb(13,"td"),n.Ec(14),n.Ub(),n.Vb(15,"td"),n.Ec(16),n.Ub(),n.Vb(17,"td"),n.Vb(18,"button",53),n.cc("click",function(){n.wc(e);const o=t.index;return n.gc(2).removeItemList(o)}),n.Qb(19,"i",54),n.Ub(),n.Ub(),n.Ub()}if(2&e){const e=t.$implicit,o=t.index;n.Db(2),n.Gc(" ",o+1," "),n.Db(2),n.Gc(" ",e.scheme.schemeName," "),n.Db(2),n.Gc(" ",e.subscheme.SubschemeName," "),n.Db(2),n.Gc(" ",e.componentName.CompName," "),n.Db(2),n.Gc(" ",e.itemName," "),n.Db(2),n.Hc(" ",e.packageSize," ",e.itemUnit," "),n.Db(2),n.Gc(" ",e.indicativeCost," "),n.Db(2),n.Gc(" ",e.FinYear," ")}}function V(e,t){if(1&e&&(n.Vb(0,"table",49),n.Vb(1,"thead",50),n.Vb(2,"tr"),n.Vb(3,"th",51),n.Ec(4,"SL."),n.Ub(),n.Vb(5,"th",51),n.Ec(6,"Scheme"),n.Ub(),n.Vb(7,"th",51),n.Ec(8,"Subscheme"),n.Ub(),n.Vb(9,"th",51),n.Ec(10,"Component"),n.Ub(),n.Vb(11,"th",51),n.Ec(12,"Item"),n.Ub(),n.Vb(13,"th",51),n.Ec(14,"Package Size"),n.Ub(),n.Vb(15,"th",51),n.Ec(16,"Indicative Cost"),n.Ub(),n.Vb(17,"th",51),n.Ec(18,"Financial Year"),n.Ub(),n.Vb(19,"th",51),n.Ec(20,"Remove"),n.Ub(),n.Ub(),n.Ub(),n.Vb(21,"tbody"),n.Dc(22,p,20,9,"tr",52),n.Ub(),n.Ub()),2&e){const e=n.gc();n.Db(22),n.mc("ngForOf",e.CompItemList)}}function U(e,t){if(1&e){const e=n.Wb();n.Vb(0,"div",55),n.Vb(1,"button",56),n.cc("click",function(){return n.wc(e),n.gc().SubmitCompItemDetails()}),n.Ec(2,"Submit "),n.Ub(),n.Qb(3,"br"),n.Qb(4,"br"),n.Ub()}}const f=[{path:"",component:(()=>{class e{constructor(e,t,o,i){this.schemeService=e,this.layoutService=t,this.fb=o,this.toastr=i,this.showtable=!1,this.CompItemList=[],this.getFinYear=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=yield this.layoutService.getFinYear().toPromise();this.FinYears=e.Years,this.Season=e.Season}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getAllScheme=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=yield this.schemeService.getAllScheme().toPromise();this.AllSchemeData=e}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getSubscheme=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=this.AddCompItemForm.value.scheme.schemeId,t=yield this.schemeService.getSubscheme(e).toPromise();this.SubschemeData=t}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.getComponent=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=this.AddCompItemForm.value.FinYear,t=this.AddCompItemForm.value.subscheme.SubschemeId,o=yield this.schemeService.getComponent(e,t).toPromise();this.ComponentData=o}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.AddItem=()=>{this.showtable=!0,this.CompItemList.push(this.AddCompItemForm.value),this.AddCompItemForm.patchValue({scheme:"",subscheme:"",componentName:"",itemType:"",FinYear:"",itemName:"",packageSize:"",itemUnit:"",indicativeCost:""})},this.removeItemList=e=>{this.CompItemList.splice(e,1)},this.SubmitCompItemDetails=()=>Object(c.a)(this,void 0,void 0,function*(){try{const e=this.CompItemList.map(e=>({schemeId:e.scheme.schemeId,SubschemeId:e.subscheme.SubschemeId,CompId:e.componentName.CompId,Fin_Year:e.FinYear,ItemName:e.itemName,Technical_Status:e.itemType,itemPackageSize:e.packageSize,item_unit:e.itemUnit,IndicativeCost:e.indicativeCost}));(yield this.schemeService.SubmitCompItemDetails(e).toPromise())?(this.toastr.success("Item Details are added successfully"),this.AddCompItemForm.reset(),this.CompItemList=[],this.showtable=!1):this.toastr.error("Something Went Wrong.Try again.")}catch(e){this.toastr.error("Sorry. Server problem. Please try again."),console.error(e)}}),this.pageTitle="Add Details",this.pageDesc="Add Component and Item details",this.breadcrumbList=["Add Item Details"],this.AddCompItemForm=this.fb.group({scheme:["",[r.s.required]],subscheme:["",[r.s.required]],componentName:["",[r.s.required]],FinYear:["",[r.s.required]],itemName:["",[r.s.required]],itemType:["",[r.s.required]],packageSize:[""],itemUnit:[""],indicativeCost:["",[r.s.required]]})}ngOnInit(){setTimeout(()=>{this.layoutService.setTitle(this.pageTitle),this.layoutService.setPageHeadingDesc(this.pageDesc),this.layoutService.setBreadcrumb(this.breadcrumbList)}),this.getAllScheme(),this.getFinYear(),this.CompItemList=[]}}return e.\u0275fac=function(t){return new(t||e)(n.Pb(a.a),n.Pb(m.a),n.Pb(r.c),n.Pb(s.b))},e.\u0275cmp=n.Jb({type:e,selectors:[["app-add-item"]],decls:149,vars:8,consts:[[1,"page-body"],[1,"row"],[1,"col-sm-12"],[1,"card"],[3,"formGroup"],[1,"card-header"],[1,"card-header-right"],[1,"icofont","icofont-rounded-down"],[1,"icofont","icofont-refresh"],[1,"icofont","icofont-close-circled"],[1,"card-block"],[1,"col-lg-4","col-md-4"],[1,"form-group","row"],[1,"col-sm-4","col-lg-4"],["for","scheme",1,"block"],[1,"asterik"],[1,"col-sm-4","col-lg-8"],["formControlName","scheme","id","scheme",1,"form-control","form-control-default",3,"change"],["value","","disabled",""],[3,"ngValue",4,"ngFor","ngForOf"],["for","subscheme",1,"block"],["formControlName","subscheme","id","subscheme",1,"form-control","form-control-default",3,"change"],["for","component",1,"block"],["formControlName","componentName","id","component",1,"form-control","form-control-default"],["value",""],["for","item",1,"block"],["type","text","formControlName","itemName",1,"form-control","form-control-default"],["for","packageSize",1,"block"],["formControlName","itemType","id","itemType",1,"form-control","form-control-default"],["value","1"],["value","2"],["value","0"],["for","indicativeCost",1,"block"],["type","number","formControlName","indicativeCost",1,"form-control","form-control-default"],["type","number","formControlName","packageSize",1,"form-control","form-control-default"],["for","unit",1,"block"],["formControlName","itemUnit","id","unit",1,"form-control","form-control-default"],["value","kg/ha"],["value","gm/ha"],["value","ml/ha"],["value","lit/ha"],["for","FinYear",1,"block"],["formControlName","FinYear","id","FinYear","required","",1,"form-control","form-control-default"],["type","button",1,"btn","btn-primary",2,"background-color","#1abc9c","margin-left","45%",3,"disabled","click"],[1,"fa","fa-plus"],[1,"col-lg-12","col-md-12","col-sm-12","col-xs-12"],["class","table table-dark",4,"ngIf"],["style","padding: 20px;",4,"ngIf"],[3,"ngValue"],[1,"table","table-dark"],[2,"background-color","cadetblue"],["scope","col"],[4,"ngFor","ngForOf"],["type","button",2,"margin-top","-5px","color","red",3,"click"],[1,"fa","fa-trash"],[2,"padding","20px"],["type","button",1,"btn","btn-primary","mat-elevation-z8",2,"float","right",3,"click"]],template:function(e,t){1&e&&(n.Vb(0,"div",0),n.Vb(1,"div",1),n.Vb(2,"div",2),n.Vb(3,"div",3),n.Vb(4,"form",4),n.Vb(5,"div",5),n.Vb(6,"span"),n.Ec(7,"Item Details"),n.Ub(),n.Vb(8,"div",6),n.Qb(9,"i",7),n.Qb(10,"i",8),n.Qb(11,"i",9),n.Ub(),n.Ub(),n.Vb(12,"div",10),n.Vb(13,"div",1),n.Vb(14,"div",2),n.Vb(15,"div",1),n.Vb(16,"div",11),n.Vb(17,"div",12),n.Vb(18,"div",13),n.Vb(19,"label",14),n.Ec(20,"Scheme"),n.Vb(21,"label",15),n.Ec(22,"*"),n.Ub(),n.Ec(23,":"),n.Ub(),n.Ub(),n.Vb(24,"div",16),n.Vb(25,"select",17),n.cc("change",function(){return t.getSubscheme()}),n.Vb(26,"option",18),n.Ec(27,"--Select--"),n.Ub(),n.Dc(28,l,2,2,"option",19),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(29,"div",11),n.Vb(30,"div",12),n.Vb(31,"div",13),n.Vb(32,"label",20),n.Ec(33,"Subscheme"),n.Vb(34,"label",15),n.Ec(35,"*"),n.Ub(),n.Ec(36,":"),n.Ub(),n.Ub(),n.Vb(37,"div",16),n.Vb(38,"select",21),n.cc("change",function(){return t.getComponent()}),n.Vb(39,"option",18),n.Ec(40,"--Select--"),n.Ub(),n.Dc(41,d,2,2,"option",19),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(42,"div",11),n.Vb(43,"div",12),n.Vb(44,"div",13),n.Vb(45,"label",22),n.Ec(46,"Component "),n.Vb(47,"label",15),n.Ec(48,"*"),n.Ub(),n.Ec(49,":"),n.Ub(),n.Ub(),n.Vb(50,"div",16),n.Vb(51,"select",23),n.Vb(52,"option",24),n.Ec(53,"--Select--"),n.Ub(),n.Dc(54,h,2,2,"option",19),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(55,"div",1),n.Vb(56,"div",11),n.Vb(57,"div",12),n.Vb(58,"div",13),n.Vb(59,"label",25),n.Ec(60,"Item"),n.Vb(61,"label",15),n.Ec(62,"*"),n.Ub(),n.Ec(63,":"),n.Ub(),n.Ub(),n.Vb(64,"div",16),n.Qb(65,"input",26),n.Ub(),n.Ub(),n.Ub(),n.Vb(66,"div",11),n.Vb(67,"div",12),n.Vb(68,"div",13),n.Vb(69,"label",27),n.Ec(70,"Item type"),n.Vb(71,"label",15),n.Ec(72,"*"),n.Ub(),n.Ec(73,":"),n.Ub(),n.Ub(),n.Vb(74,"div",16),n.Vb(75,"select",28),n.Vb(76,"option",18),n.Ec(77,"--Select--"),n.Ub(),n.Vb(78,"option",29),n.Ec(79," All Pesticides/Micronutrients/Weedicide/Herbicides/Fertilizers "),n.Ub(),n.Vb(80,"option",30),n.Ec(81," Bund Plantation "),n.Ub(),n.Vb(82,"option",31),n.Ec(83," Others "),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(84,"div",11),n.Vb(85,"div",12),n.Vb(86,"div",13),n.Vb(87,"label",32),n.Ec(88,"Indicative Cost"),n.Vb(89,"label",15),n.Ec(90,"*"),n.Ub(),n.Ec(91,":"),n.Ub(),n.Ub(),n.Vb(92,"div",16),n.Qb(93,"input",33),n.Ub(),n.Ub(),n.Ub(),n.Vb(94,"div",11),n.Vb(95,"div",12),n.Vb(96,"div",13),n.Vb(97,"label",27),n.Ec(98,"Package Size"),n.Vb(99,"label",15),n.Ec(100,"*"),n.Ub(),n.Ec(101,":"),n.Ub(),n.Ub(),n.Vb(102,"div",16),n.Qb(103,"input",34),n.Ub(),n.Ub(),n.Ub(),n.Vb(104,"div",11),n.Vb(105,"div",12),n.Vb(106,"div",13),n.Vb(107,"label",35),n.Ec(108,"Unit"),n.Vb(109,"label",15),n.Ec(110,"*"),n.Ub(),n.Ec(111,":"),n.Ub(),n.Ub(),n.Vb(112,"div",16),n.Vb(113,"select",36),n.Vb(114,"option",18),n.Ec(115,"--Select--"),n.Ub(),n.Vb(116,"option",37),n.Ec(117,"kg/ha"),n.Ub(),n.Vb(118,"option",38),n.Ec(119,"gm/ha"),n.Ub(),n.Vb(120,"option",39),n.Ec(121,"ml/ha"),n.Ub(),n.Vb(122,"option",40),n.Ec(123,"lit/ha"),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(124,"div",11),n.Vb(125,"div",12),n.Vb(126,"div",13),n.Vb(127,"label",41),n.Ec(128,"Financial Year"),n.Vb(129,"label",15),n.Ec(130,"*"),n.Ub(),n.Ec(131,":"),n.Ub(),n.Ub(),n.Vb(132,"div",16),n.Vb(133,"select",42),n.Vb(134,"option",24),n.Ec(135,"--Select--"),n.Ub(),n.Dc(136,u,2,2,"option",19),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Vb(137,"div",10),n.Vb(138,"button",43),n.cc("click",function(){return t.AddItem()}),n.Ec(139,"ADD "),n.Qb(140,"i",44),n.Ub(),n.Qb(141,"br"),n.Qb(142,"br"),n.Ub(),n.Vb(143,"div",10),n.Vb(144,"div",1),n.Vb(145,"div",45),n.Dc(146,V,23,1,"table",46),n.Ub(),n.Ub(),n.Ub(),n.Vb(147,"div",10),n.Dc(148,U,5,0,"div",47),n.Ub(),n.Ub(),n.Ub(),n.Ub(),n.Ub()),2&e&&(n.Db(4),n.mc("formGroup",t.AddCompItemForm),n.Db(24),n.mc("ngForOf",t.AllSchemeData),n.Db(13),n.mc("ngForOf",t.SubschemeData),n.Db(13),n.mc("ngForOf",t.ComponentData),n.Db(82),n.mc("ngForOf",t.FinYears),n.Db(2),n.mc("disabled",!t.AddCompItemForm.valid),n.Db(8),n.mc("ngIf",t.showtable),n.Db(2),n.mc("ngIf",t.showtable))},directives:[r.t,r.k,r.e,r.r,r.j,r.d,r.n,r.u,i.k,r.b,r.o,r.q,i.l],styles:['td[_ngcontent-%COMP%]{white-space:pre-wrap}.asterik[_ngcontent-%COMP%]{content:"*";color:red}']}),e})()}];let v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.Nb({type:e}),e.\u0275inj=n.Mb({imports:[[b.d.forChild(f)],b.d]}),e})(),g=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.Nb({type:e}),e.\u0275inj=n.Mb({imports:[[i.c,v,r.f,r.p]]}),e})()}}]);
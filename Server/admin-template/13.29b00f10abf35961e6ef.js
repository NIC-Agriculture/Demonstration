(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"+0xr":function(t,e,s){"use strict";s.d(e,"a",function(){return wt}),s.d(e,"b",function(){return lt}),s.d(e,"c",function(){return ft}),s.d(e,"d",function(){return mt}),s.d(e,"e",function(){return dt}),s.d(e,"f",function(){return kt}),s.d(e,"g",function(){return bt}),s.d(e,"h",function(){return St}),s.d(e,"i",function(){return Rt}),s.d(e,"j",function(){return at}),s.d(e,"k",function(){return Et}),s.d(e,"l",function(){return vt});var i=s("8LU1"),o=s("0EQZ"),r=s("fXoL"),n=s("cH1L"),a=s("nLfN"),c=s("vxfF"),l=s("ofXK"),h=s("XNiG"),d=s("Cfvw"),u=s("2Vo4"),f=s("7+OI"),_=s("LRne"),m=s("1G5W"),p=s("IzEk");const w=[[["caption"]],[["colgroup"],["col"]]],y=["caption","colgroup, col"];function b(t){return class extends t{constructor(...t){super(...t),this._sticky=!1,this._hasStickyChanged=!1}get sticky(){return this._sticky}set sticky(t){const e=this._sticky;this._sticky=Object(i.c)(t),this._hasStickyChanged=e!==this._sticky}hasStickyChanged(){const t=this._hasStickyChanged;return this._hasStickyChanged=!1,t}resetStickyChanged(){this._hasStickyChanged=!1}}}const g=new r.s("CDK_TABLE");let R=(()=>{class t{constructor(t){this.template=t}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkCellDef",""]]}),t})(),C=(()=>{class t{constructor(t){this.template=t}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkHeaderCellDef",""]]}),t})(),k=(()=>{class t{constructor(t){this.template=t}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkFooterCellDef",""]]}),t})();class D{}const S=b(D);let x=(()=>{class t extends S{constructor(t){super(),this._table=t,this._stickyEnd=!1}get name(){return this._name}set name(t){this._setNameInput(t)}get stickyEnd(){return this._stickyEnd}set stickyEnd(t){const e=this._stickyEnd;this._stickyEnd=Object(i.c)(t),this._hasStickyChanged=e!==this._stickyEnd}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(t){t&&(this._name=t,this.cssClassFriendlyName=t.replace(/[^a-z0-9_-]/gi,"-"),this._updateColumnCssClassName())}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(g,8))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkColumnDef",""]],contentQueries:function(t,e,s){if(1&t&&(r.Ib(s,R,1),r.Ib(s,C,1),r.Ib(s,k,1)),2&t){let t;r.sc(t=r.dc())&&(e.cell=t.first),r.sc(t=r.dc())&&(e.headerCell=t.first),r.sc(t=r.dc())&&(e.footerCell=t.first)}},inputs:{sticky:"sticky",name:["cdkColumnDef","name"],stickyEnd:"stickyEnd"},features:[r.Cb([{provide:"MAT_SORT_HEADER_COLUMN_DEF",useExisting:t}]),r.Ab]}),t})();class v{constructor(t,e){const s=e.nativeElement.classList;for(const i of t._columnCssClassName)s.add(i)}}let O=(()=>{class t extends v{constructor(t,e){super(t,e)}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(x),r.Pb(r.l))},t.\u0275dir=r.Kb({type:t,selectors:[["cdk-header-cell"],["th","cdk-header-cell",""]],hostAttrs:["role","columnheader",1,"cdk-header-cell"],features:[r.Ab]}),t})(),E=(()=>{class t extends v{constructor(t,e){super(t,e)}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(x),r.Pb(r.l))},t.\u0275dir=r.Kb({type:t,selectors:[["cdk-cell"],["td","cdk-cell",""]],hostAttrs:["role","gridcell",1,"cdk-cell"],features:[r.Ab]}),t})();class N{constructor(){this.tasks=[],this.endTasks=[]}}const P=new r.s("_COALESCED_STYLE_SCHEDULER");let A=(()=>{class t{constructor(t){this._ngZone=t,this._currentSchedule=null,this._destroyed=new h.a}schedule(t){this._createScheduleIfNeeded(),this._currentSchedule.tasks.push(t)}scheduleEnd(t){this._createScheduleIfNeeded(),this._currentSchedule.endTasks.push(t)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}_createScheduleIfNeeded(){this._currentSchedule||(this._currentSchedule=new N,this._getScheduleObservable().pipe(Object(m.a)(this._destroyed)).subscribe(()=>{for(;this._currentSchedule.tasks.length||this._currentSchedule.endTasks.length;){const t=this._currentSchedule;this._currentSchedule=new N;for(const e of t.tasks)e();for(const e of t.endTasks)e()}this._currentSchedule=null}))}_getScheduleObservable(){return this._ngZone.isStable?Object(d.a)(Promise.resolve(void 0)):this._ngZone.onStable.pipe(Object(p.a)(1))}}return t.\u0275fac=function(e){return new(e||t)(r.Zb(r.B))},t.\u0275prov=r.Lb({token:t,factory:t.\u0275fac}),t})(),I=(()=>{class t{constructor(t,e){this.template=t,this._differs=e}ngOnChanges(t){if(!this._columnsDiffer){const e=t.columns&&t.columns.currentValue||[];this._columnsDiffer=this._differs.find(e).create(),this._columnsDiffer.diff(e)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(t){return this instanceof F?t.headerCell.template:this instanceof B?t.footerCell.template:t.cell.template}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N),r.Pb(r.u))},t.\u0275dir=r.Kb({type:t,features:[r.Bb]}),t})();class L extends I{}const T=b(L);let F=(()=>{class t extends T{constructor(t,e,s){super(t,e),this._table=s}ngOnChanges(t){super.ngOnChanges(t)}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N),r.Pb(r.u),r.Pb(g,8))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkHeaderRowDef",""]],inputs:{columns:["cdkHeaderRowDef","columns"],sticky:["cdkHeaderRowDefSticky","sticky"]},features:[r.Ab,r.Bb]}),t})();class H extends I{}const j=b(H);let B=(()=>{class t extends j{constructor(t,e,s){super(t,e),this._table=s}ngOnChanges(t){super.ngOnChanges(t)}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N),r.Pb(r.u),r.Pb(g,8))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkFooterRowDef",""]],inputs:{columns:["cdkFooterRowDef","columns"],sticky:["cdkFooterRowDefSticky","sticky"]},features:[r.Ab,r.Bb]}),t})(),K=(()=>{class t extends I{constructor(t,e,s){super(t,e),this._table=s}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N),r.Pb(r.u),r.Pb(g,8))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkRowDef",""]],inputs:{columns:["cdkRowDefColumns","columns"],when:["cdkRowDefWhen","when"]},features:[r.Ab]}),t})(),M=(()=>{class t{constructor(e){this._viewContainer=e,t.mostRecentCellOutlet=this}ngOnDestroy(){t.mostRecentCellOutlet===this&&(t.mostRecentCellOutlet=null)}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.R))},t.\u0275dir=r.Kb({type:t,selectors:[["","cdkCellOutlet",""]]}),t.mostRecentCellOutlet=null,t})(),z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["cdk-header-row"],["tr","cdk-header-row",""]],hostAttrs:["role","row",1,"cdk-header-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,e){1&t&&r.Rb(0,0)},directives:[M],encapsulation:2}),t})(),W=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["cdk-row"],["tr","cdk-row",""]],hostAttrs:["role","row",1,"cdk-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,e){1&t&&r.Rb(0,0)},directives:[M],encapsulation:2}),t})(),X=(()=>{class t{constructor(t){this.templateRef=t}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.N))},t.\u0275dir=r.Kb({type:t,selectors:[["ng-template","cdkNoDataRow",""]]}),t})();const J=["top","bottom","left","right"];class U{constructor(t,e,s,i,o=!0,r=!0,n){this._isNativeHtmlTable=t,this._stickCellCss=e,this.direction=s,this._coalescedStyleScheduler=i,this._isBrowser=o,this._needsPositionStickyOnElement=r,this._positionListener=n,this._cachedCellWidths=[],this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(t,e){const s=[];for(const i of t)if(i.nodeType===i.ELEMENT_NODE){s.push(i);for(let t=0;t<i.children.length;t++)s.push(i.children[t])}this._scheduleStyleChanges(()=>{for(const t of s)this._removeStickyStyle(t,e)})}updateStickyColumns(t,e,s,i=!0){if(!t.length||!this._isBrowser||!e.some(t=>t)&&!s.some(t=>t))return void(this._positionListener&&(this._positionListener.stickyColumnsUpdated({sizes:[]}),this._positionListener.stickyEndColumnsUpdated({sizes:[]})));const o=t[0],r=o.children.length,n=this._getCellWidths(o,i),a=this._getStickyStartColumnPositions(n,e),c=this._getStickyEndColumnPositions(n,s),l=e.lastIndexOf(!0),h=s.indexOf(!0);this._scheduleStyleChanges(()=>{const i="rtl"===this.direction,o=i?"right":"left",d=i?"left":"right";for(const n of t)for(let t=0;t<r;t++){const i=n.children[t];e[t]&&this._addStickyStyle(i,o,a[t],t===l),s[t]&&this._addStickyStyle(i,d,c[t],t===h)}this._positionListener&&(this._positionListener.stickyColumnsUpdated({sizes:-1===l?[]:n.slice(0,l+1).map((t,s)=>e[s]?t:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:-1===h?[]:n.slice(h).map((t,e)=>s[e+h]?t:null).reverse()}))})}stickRows(t,e,s){if(!this._isBrowser)return;const i="bottom"===s?t.slice().reverse():t,o="bottom"===s?e.slice().reverse():e,r=[],n=[],a=[];for(let l=0,h=0;l<i.length;l++){if(r[l]=h,!o[l])continue;const t=i[l];a[l]=this._isNativeHtmlTable?Array.from(t.children):[t];const e=t.getBoundingClientRect().height;h+=e,n[l]=e}const c=o.lastIndexOf(!0);this._scheduleStyleChanges(()=>{var t,e;for(let n=0;n<i.length;n++){if(!o[n])continue;const t=r[n],e=n===c;for(const i of a[n])this._addStickyStyle(i,s,t,e)}"top"===s?null===(t=this._positionListener)||void 0===t||t.stickyHeaderRowsUpdated({sizes:n,elements:a}):null===(e=this._positionListener)||void 0===e||e.stickyFooterRowsUpdated({sizes:n,elements:a})})}updateStickyFooterContainer(t,e){if(!this._isNativeHtmlTable)return;const s=t.querySelector("tfoot");this._scheduleStyleChanges(()=>{e.some(t=>!t)?this._removeStickyStyle(s,["bottom"]):this._addStickyStyle(s,"bottom",0,!1)})}_removeStickyStyle(t,e){for(const s of e)t.style[s]="",t.classList.remove(this._borderCellCss[s]);J.some(s=>-1===e.indexOf(s)&&t.style[s])?t.style.zIndex=this._getCalculatedZIndex(t):(t.style.zIndex="",this._needsPositionStickyOnElement&&(t.style.position=""),t.classList.remove(this._stickCellCss))}_addStickyStyle(t,e,s,i){t.classList.add(this._stickCellCss),i&&t.classList.add(this._borderCellCss[e]),t.style[e]=`${s}px`,t.style.zIndex=this._getCalculatedZIndex(t),this._needsPositionStickyOnElement&&(t.style.cssText+="position: -webkit-sticky; position: sticky; ")}_getCalculatedZIndex(t){const e={top:100,bottom:10,left:1,right:1};let s=0;for(const i of J)t.style[i]&&(s+=e[i]);return s?`${s}`:""}_getCellWidths(t,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;const s=[],i=t.children;for(let o=0;o<i.length;o++)s.push(i[o].getBoundingClientRect().width);return this._cachedCellWidths=s,s}_getStickyStartColumnPositions(t,e){const s=[];let i=0;for(let o=0;o<t.length;o++)e[o]&&(s[o]=i,i+=t[o]);return s}_getStickyEndColumnPositions(t,e){const s=[];let i=0;for(let o=t.length;o>0;o--)e[o]&&(s[o]=i,i+=t[o]);return s}_scheduleStyleChanges(t){this._coalescedStyleScheduler?this._coalescedStyleScheduler.schedule(t):t()}}const V=new r.s("CDK_SPL");let $=(()=>{class t{constructor(t,e){this.viewContainer=t,this.elementRef=e}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.R),r.Pb(r.l))},t.\u0275dir=r.Kb({type:t,selectors:[["","rowOutlet",""]]}),t})(),Z=(()=>{class t{constructor(t,e){this.viewContainer=t,this.elementRef=e}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.R),r.Pb(r.l))},t.\u0275dir=r.Kb({type:t,selectors:[["","headerRowOutlet",""]]}),t})(),Q=(()=>{class t{constructor(t,e){this.viewContainer=t,this.elementRef=e}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.R),r.Pb(r.l))},t.\u0275dir=r.Kb({type:t,selectors:[["","footerRowOutlet",""]]}),t})(),q=(()=>{class t{constructor(t,e){this.viewContainer=t,this.elementRef=e}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.R),r.Pb(r.l))},t.\u0275dir=r.Kb({type:t,selectors:[["","noDataRowOutlet",""]]}),t})(),G=(()=>{class t{constructor(t,e,s,i,o,r,n,a,c,l,d){this._differs=t,this._changeDetectorRef=e,this._elementRef=s,this._dir=o,this._platform=n,this._viewRepeater=a,this._coalescedStyleScheduler=c,this._stickyPositioningListener=l,this._viewportRuler=d,this._onDestroy=new h.a,this._columnDefsByName=new Map,this._customColumnDefs=new Set,this._customRowDefs=new Set,this._customHeaderRowDefs=new Set,this._customFooterRowDefs=new Set,this._headerRowDefChanged=!0,this._footerRowDefChanged=!0,this._stickyColumnStylesNeedReset=!0,this._forceRecalculateCellWidths=!0,this._cachedRenderRowsMap=new Map,this.stickyCssClass="cdk-table-sticky",this.needsPositionStickyOnElement=!0,this._isShowingNoDataRow=!1,this._multiTemplateDataRows=!1,this._fixedLayout=!1,this.viewChange=new u.a({start:0,end:Number.MAX_VALUE}),i||this._elementRef.nativeElement.setAttribute("role","grid"),this._document=r,this._isNativeHtmlTable="TABLE"===this._elementRef.nativeElement.nodeName}get trackBy(){return this._trackByFn}set trackBy(t){this._trackByFn=t}get dataSource(){return this._dataSource}set dataSource(t){this._dataSource!==t&&this._switchDataSource(t)}get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(t){this._multiTemplateDataRows=Object(i.c)(t),this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}get fixedLayout(){return this._fixedLayout}set fixedLayout(t){this._fixedLayout=Object(i.c)(t),this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}ngOnInit(){this._setupStickyStyler(),this._isNativeHtmlTable&&this._applyNativeTableSections(),this._dataDiffer=this._differs.find([]).create((t,e)=>this.trackBy?this.trackBy(e.dataIndex,e.data):e),this._viewportRuler&&this._viewportRuler.change().pipe(Object(m.a)(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentChecked(){this._cacheRowDefs(),this._cacheColumnDefs();const t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}ngOnDestroy(){this._rowOutlet.viewContainer.clear(),this._noDataRowOutlet.viewContainer.clear(),this._headerRowOutlet.viewContainer.clear(),this._footerRowOutlet.viewContainer.clear(),this._cachedRenderRowsMap.clear(),this._onDestroy.next(),this._onDestroy.complete(),Object(o.h)(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();const t=this._dataDiffer.diff(this._renderRows);if(!t)return void this._updateNoDataRow();const e=this._rowOutlet.viewContainer;this._viewRepeater?this._viewRepeater.applyChanges(t,e,(t,e,s)=>this._getEmbeddedViewArgs(t.item,s),t=>t.item.data,t=>{1===t.operation&&t.context&&this._renderCellTemplateForItem(t.record.item.rowDef,t.context)}):t.forEachOperation((t,s,i)=>{if(null==t.previousIndex){const e=t.item;this._renderRow(this._rowOutlet,e.rowDef,i,{$implicit:e.data})}else if(null==i)e.remove(s);else{const t=e.get(s);e.move(t,i)}}),this._updateRowIndexContext(),t.forEachIdentityChange(t=>{e.get(t.currentIndex).context.$implicit=t.item.data}),this._updateNoDataRow(),this.updateStickyColumnStyles()}addColumnDef(t){this._customColumnDefs.add(t)}removeColumnDef(t){this._customColumnDefs.delete(t)}addRowDef(t){this._customRowDefs.add(t)}removeRowDef(t){this._customRowDefs.delete(t)}addHeaderRowDef(t){this._customHeaderRowDefs.add(t),this._headerRowDefChanged=!0}removeHeaderRowDef(t){this._customHeaderRowDefs.delete(t),this._headerRowDefChanged=!0}addFooterRowDef(t){this._customFooterRowDefs.add(t),this._footerRowDefChanged=!0}removeFooterRowDef(t){this._customFooterRowDefs.delete(t),this._footerRowDefChanged=!0}setNoDataRow(t){this._customNoDataRow=t}updateStickyHeaderRowStyles(){const t=this._getRenderedRows(this._headerRowOutlet),e=this._elementRef.nativeElement.querySelector("thead");e&&(e.style.display=t.length?"":"none");const s=this._headerRowDefs.map(t=>t.sticky);this._stickyStyler.clearStickyPositioning(t,["top"]),this._stickyStyler.stickRows(t,s,"top"),this._headerRowDefs.forEach(t=>t.resetStickyChanged())}updateStickyFooterRowStyles(){const t=this._getRenderedRows(this._footerRowOutlet),e=this._elementRef.nativeElement.querySelector("tfoot");e&&(e.style.display=t.length?"":"none");const s=this._footerRowDefs.map(t=>t.sticky);this._stickyStyler.clearStickyPositioning(t,["bottom"]),this._stickyStyler.stickRows(t,s,"bottom"),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,s),this._footerRowDefs.forEach(t=>t.resetStickyChanged())}updateStickyColumnStyles(){const t=this._getRenderedRows(this._headerRowOutlet),e=this._getRenderedRows(this._rowOutlet),s=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this._fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...t,...e,...s],["left","right"]),this._stickyColumnStylesNeedReset=!1),t.forEach((t,e)=>{this._addStickyColumnStyles([t],this._headerRowDefs[e])}),this._rowDefs.forEach(t=>{const s=[];for(let i=0;i<e.length;i++)this._renderRows[i].rowDef===t&&s.push(e[i]);this._addStickyColumnStyles(s,t)}),s.forEach((t,e)=>{this._addStickyColumnStyles([t],this._footerRowDefs[e])}),Array.from(this._columnDefsByName.values()).forEach(t=>t.resetStickyChanged())}_getAllRenderRows(){const t=[],e=this._cachedRenderRowsMap;this._cachedRenderRowsMap=new Map;for(let s=0;s<this._data.length;s++){let i=this._data[s];const o=this._getRenderRowsForData(i,s,e.get(i));this._cachedRenderRowsMap.has(i)||this._cachedRenderRowsMap.set(i,new WeakMap);for(let e=0;e<o.length;e++){let s=o[e];const i=this._cachedRenderRowsMap.get(s.data);i.has(s.rowDef)?i.get(s.rowDef).push(s):i.set(s.rowDef,[s]),t.push(s)}}return t}_getRenderRowsForData(t,e,s){return this._getRowDefs(t,e).map(i=>{const o=s&&s.has(i)?s.get(i):[];if(o.length){const t=o.shift();return t.dataIndex=e,t}return{data:t,rowDef:i,dataIndex:e}})}_cacheColumnDefs(){this._columnDefsByName.clear(),Y(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=Y(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=Y(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=Y(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);const t=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=t[0]}_renderUpdatedColumns(){const t=(t,e)=>t||!!e.getColumnsDiff(),e=this._rowDefs.reduce(t,!1);e&&this._forceRenderDataRows();const s=this._headerRowDefs.reduce(t,!1);s&&this._forceRenderHeaderRows();const i=this._footerRowDefs.reduce(t,!1);return i&&this._forceRenderFooterRows(),e||s||i}_switchDataSource(t){this._data=[],Object(o.h)(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),t||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear()),this._dataSource=t}_observeRenderChanges(){if(!this.dataSource)return;let t;Object(o.h)(this.dataSource)?t=this.dataSource.connect(this):Object(f.a)(this.dataSource)?t=this.dataSource:Array.isArray(this.dataSource)&&(t=Object(_.a)(this.dataSource)),this._renderChangeSubscription=t.pipe(Object(m.a)(this._onDestroy)).subscribe(t=>{this._data=t||[],this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((t,e)=>this._renderRow(this._headerRowOutlet,t,e)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((t,e)=>this._renderRow(this._footerRowOutlet,t,e)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(t,e){const s=Array.from(e.columns||[]).map(t=>this._columnDefsByName.get(t)),i=s.map(t=>t.sticky),o=s.map(t=>t.stickyEnd);this._stickyStyler.updateStickyColumns(t,i,o,!this._fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(t){const e=[];for(let s=0;s<t.viewContainer.length;s++){const i=t.viewContainer.get(s);e.push(i.rootNodes[0])}return e}_getRowDefs(t,e){if(1==this._rowDefs.length)return[this._rowDefs[0]];let s=[];if(this.multiTemplateDataRows)s=this._rowDefs.filter(s=>!s.when||s.when(e,t));else{let i=this._rowDefs.find(s=>s.when&&s.when(e,t))||this._defaultRowDef;i&&s.push(i)}return s}_getEmbeddedViewArgs(t,e){return{templateRef:t.rowDef.template,context:{$implicit:t.data},index:e}}_renderRow(t,e,s,i={}){const o=t.viewContainer.createEmbeddedView(e.template,i,s);return this._renderCellTemplateForItem(e,i),o}_renderCellTemplateForItem(t,e){for(let s of this._getCellTemplates(t))M.mostRecentCellOutlet&&M.mostRecentCellOutlet._viewContainer.createEmbeddedView(s,e);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){const t=this._rowOutlet.viewContainer;for(let e=0,s=t.length;e<s;e++){const i=t.get(e).context;i.count=s,i.first=0===e,i.last=e===s-1,i.even=e%2==0,i.odd=!i.even,this.multiTemplateDataRows?(i.dataIndex=this._renderRows[e].dataIndex,i.renderIndex=e):i.index=this._renderRows[e].dataIndex}}_getCellTemplates(t){return t&&t.columns?Array.from(t.columns,e=>{const s=this._columnDefsByName.get(e);return t.extractCellTemplate(s)}):[]}_applyNativeTableSections(){const t=this._document.createDocumentFragment(),e=[{tag:"thead",outlets:[this._headerRowOutlet]},{tag:"tbody",outlets:[this._rowOutlet,this._noDataRowOutlet]},{tag:"tfoot",outlets:[this._footerRowOutlet]}];for(const s of e){const e=this._document.createElement(s.tag);e.setAttribute("role","rowgroup");for(const t of s.outlets)e.appendChild(t.elementRef.nativeElement);t.appendChild(e)}this._elementRef.nativeElement.appendChild(t)}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){const t=(t,e)=>t||e.hasStickyChanged();this._headerRowDefs.reduce(t,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(t,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(t,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){this._stickyStyler=new U(this._isNativeHtmlTable,this.stickyCssClass,this._dir?this._dir.value:"ltr",this._coalescedStyleScheduler,this._platform.isBrowser,this.needsPositionStickyOnElement,this._stickyPositioningListener),(this._dir?this._dir.change:Object(_.a)()).pipe(Object(m.a)(this._onDestroy)).subscribe(t=>{this._stickyStyler.direction=t,this.updateStickyColumnStyles()})}_getOwnDefs(t){return t.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){const t=this._customNoDataRow||this._noDataRow;if(t){const e=0===this._rowOutlet.viewContainer.length;if(e!==this._isShowingNoDataRow){const s=this._noDataRowOutlet.viewContainer;e?s.createEmbeddedView(t.templateRef):s.clear(),this._isShowingNoDataRow=e}}}}return t.\u0275fac=function(e){return new(e||t)(r.Pb(r.u),r.Pb(r.h),r.Pb(r.l),r.ac("role"),r.Pb(n.b,8),r.Pb(l.d),r.Pb(a.a),r.Pb(o.g,8),r.Pb(P,8),r.Pb(V,12),r.Pb(c.d,8))},t.\u0275cmp=r.Jb({type:t,selectors:[["cdk-table"],["table","cdk-table",""]],contentQueries:function(t,e,s){if(1&t&&(r.Ib(s,X,1),r.Ib(s,x,1),r.Ib(s,K,1),r.Ib(s,F,1),r.Ib(s,B,1)),2&t){let t;r.sc(t=r.dc())&&(e._noDataRow=t.first),r.sc(t=r.dc())&&(e._contentColumnDefs=t),r.sc(t=r.dc())&&(e._contentRowDefs=t),r.sc(t=r.dc())&&(e._contentHeaderRowDefs=t),r.sc(t=r.dc())&&(e._contentFooterRowDefs=t)}},viewQuery:function(t,e){if(1&t&&(r.Jc($,3),r.Jc(Z,3),r.Jc(Q,3),r.Jc(q,3)),2&t){let t;r.sc(t=r.dc())&&(e._rowOutlet=t.first),r.sc(t=r.dc())&&(e._headerRowOutlet=t.first),r.sc(t=r.dc())&&(e._footerRowOutlet=t.first),r.sc(t=r.dc())&&(e._noDataRowOutlet=t.first)}},hostAttrs:[1,"cdk-table"],hostVars:2,hostBindings:function(t,e){2&t&&r.Hb("cdk-table-fixed-layout",e.fixedLayout)},inputs:{trackBy:"trackBy",dataSource:"dataSource",multiTemplateDataRows:"multiTemplateDataRows",fixedLayout:"fixedLayout"},exportAs:["cdkTable"],features:[r.Cb([{provide:g,useExisting:t},{provide:o.g,useClass:o.e},{provide:P,useClass:A},{provide:V,useValue:null}])],ngContentSelectors:y,decls:6,vars:0,consts:[["headerRowOutlet",""],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,e){1&t&&(r.lc(w),r.kc(0),r.kc(1,1),r.Rb(2,0),r.Rb(3,1),r.Rb(4,2),r.Rb(5,3))},directives:[Z,$,q,Q],styles:[".cdk-table-fixed-layout{table-layout:fixed}\n"],encapsulation:2}),t})();function Y(t,e){return t.concat(Array.from(e))}let tt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({imports:[[c.c]]}),t})();var et=s("FKr1"),st=s("VRyK"),it=s("itXk"),ot=s("lJxs");const rt=[[["caption"]],[["colgroup"],["col"]]],nt=["caption","colgroup, col"];let at=(()=>{class t extends G{constructor(){super(...arguments),this.stickyCssClass="mat-table-sticky",this.needsPositionStickyOnElement=!1}}return t.\u0275fac=function(e){return ct(e||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["mat-table"],["table","mat-table",""]],hostAttrs:[1,"mat-table"],hostVars:2,hostBindings:function(t,e){2&t&&r.Hb("mat-table-fixed-layout",e.fixedLayout)},exportAs:["matTable"],features:[r.Cb([{provide:o.g,useClass:o.e},{provide:G,useExisting:t},{provide:g,useExisting:t},{provide:P,useClass:A}]),r.Ab],ngContentSelectors:nt,decls:6,vars:0,consts:[["headerRowOutlet",""],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,e){1&t&&(r.lc(rt),r.kc(0),r.kc(1,1),r.Rb(2,0),r.Rb(3,1),r.Rb(4,2),r.Rb(5,3))},directives:[Z,$,q,Q],styles:['mat-table{display:block}mat-header-row{min-height:56px}mat-row,mat-footer-row{min-height:48px}mat-row,mat-header-row,mat-footer-row{display:flex;border-width:0;border-bottom-width:1px;border-style:solid;align-items:center;box-sizing:border-box}mat-row::after,mat-header-row::after,mat-footer-row::after{display:inline-block;min-height:inherit;content:""}mat-cell:first-of-type,mat-header-cell:first-of-type,mat-footer-cell:first-of-type{padding-left:24px}[dir=rtl] mat-cell:first-of-type:not(:only-of-type),[dir=rtl] mat-header-cell:first-of-type:not(:only-of-type),[dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}mat-cell:last-of-type,mat-header-cell:last-of-type,mat-footer-cell:last-of-type{padding-right:24px}[dir=rtl] mat-cell:last-of-type:not(:only-of-type),[dir=rtl] mat-header-cell:last-of-type:not(:only-of-type),[dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}mat-cell,mat-header-cell,mat-footer-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}table.mat-table{border-spacing:0}tr.mat-header-row{height:56px}tr.mat-row,tr.mat-footer-row{height:48px}th.mat-header-cell{text-align:left}[dir=rtl] th.mat-header-cell{text-align:right}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{padding:0;border-bottom-width:1px;border-bottom-style:solid}th.mat-header-cell:first-of-type,td.mat-cell:first-of-type,td.mat-footer-cell:first-of-type{padding-left:24px}[dir=rtl] th.mat-header-cell:first-of-type:not(:only-of-type),[dir=rtl] td.mat-cell:first-of-type:not(:only-of-type),[dir=rtl] td.mat-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}th.mat-header-cell:last-of-type,td.mat-cell:last-of-type,td.mat-footer-cell:last-of-type{padding-right:24px}[dir=rtl] th.mat-header-cell:last-of-type:not(:only-of-type),[dir=rtl] td.mat-cell:last-of-type:not(:only-of-type),[dir=rtl] td.mat-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}.mat-table-sticky{position:-webkit-sticky !important;position:sticky !important}.mat-table-fixed-layout{table-layout:fixed}\n'],encapsulation:2}),t})();const ct=r.Xb(at);let lt=(()=>{class t extends R{}return t.\u0275fac=function(e){return ht(e||t)},t.\u0275dir=r.Kb({type:t,selectors:[["","matCellDef",""]],features:[r.Cb([{provide:R,useExisting:t}]),r.Ab]}),t})();const ht=r.Xb(lt);let dt=(()=>{class t extends C{}return t.\u0275fac=function(e){return ut(e||t)},t.\u0275dir=r.Kb({type:t,selectors:[["","matHeaderCellDef",""]],features:[r.Cb([{provide:C,useExisting:t}]),r.Ab]}),t})();const ut=r.Xb(dt);let ft=(()=>{class t extends x{get name(){return this._name}set name(t){this._setNameInput(t)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}}return t.\u0275fac=function(e){return _t(e||t)},t.\u0275dir=r.Kb({type:t,selectors:[["","matColumnDef",""]],inputs:{sticky:"sticky",name:["matColumnDef","name"]},features:[r.Cb([{provide:x,useExisting:t},{provide:"MAT_SORT_HEADER_COLUMN_DEF",useExisting:t}]),r.Ab]}),t})();const _t=r.Xb(ft);let mt=(()=>{class t extends O{}return t.\u0275fac=function(e){return pt(e||t)},t.\u0275dir=r.Kb({type:t,selectors:[["mat-header-cell"],["th","mat-header-cell",""]],hostAttrs:["role","columnheader",1,"mat-header-cell"],features:[r.Ab]}),t})();const pt=r.Xb(mt);let wt=(()=>{class t extends E{}return t.\u0275fac=function(e){return yt(e||t)},t.\u0275dir=r.Kb({type:t,selectors:[["mat-cell"],["td","mat-cell",""]],hostAttrs:["role","gridcell",1,"mat-cell"],features:[r.Ab]}),t})();const yt=r.Xb(wt);let bt=(()=>{class t extends F{}return t.\u0275fac=function(e){return gt(e||t)},t.\u0275dir=r.Kb({type:t,selectors:[["","matHeaderRowDef",""]],inputs:{columns:["matHeaderRowDef","columns"],sticky:["matHeaderRowDefSticky","sticky"]},features:[r.Cb([{provide:F,useExisting:t}]),r.Ab]}),t})();const gt=r.Xb(bt);let Rt=(()=>{class t extends K{}return t.\u0275fac=function(e){return Ct(e||t)},t.\u0275dir=r.Kb({type:t,selectors:[["","matRowDef",""]],inputs:{columns:["matRowDefColumns","columns"],when:["matRowDefWhen","when"]},features:[r.Cb([{provide:K,useExisting:t}]),r.Ab]}),t})();const Ct=r.Xb(Rt);let kt=(()=>{class t extends z{}return t.\u0275fac=function(e){return Dt(e||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["mat-header-row"],["tr","mat-header-row",""]],hostAttrs:["role","row",1,"mat-header-row"],exportAs:["matHeaderRow"],features:[r.Cb([{provide:z,useExisting:t}]),r.Ab],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,e){1&t&&r.Rb(0,0)},directives:[M],encapsulation:2}),t})();const Dt=r.Xb(kt);let St=(()=>{class t extends W{}return t.\u0275fac=function(e){return xt(e||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["mat-row"],["tr","mat-row",""]],hostAttrs:["role","row",1,"mat-row"],exportAs:["matRow"],features:[r.Cb([{provide:W,useExisting:t}]),r.Ab],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,e){1&t&&r.Rb(0,0)},directives:[M],encapsulation:2}),t})();const xt=r.Xb(St);let vt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.Nb({type:t}),t.\u0275inj=r.Mb({imports:[[tt,et.e],et.e]}),t})();class Ot extends o.b{constructor(t=[]){super(),this._renderData=new u.a([]),this._filter=new u.a(""),this._internalPageChanges=new h.a,this._renderChangesSubscription=null,this.sortingDataAccessor=(t,e)=>{const s=t[e];if(Object(i.a)(s)){const t=Number(s);return t<9007199254740991?t:s}return s},this.sortData=(t,e)=>{const s=e.active,i=e.direction;return s&&""!=i?t.sort((t,e)=>{let o=this.sortingDataAccessor(t,s),r=this.sortingDataAccessor(e,s);const n=typeof o,a=typeof r;n!==a&&("number"===n&&(o+=""),"number"===a&&(r+=""));let c=0;return null!=o&&null!=r?o>r?c=1:o<r&&(c=-1):null!=o?c=1:null!=r&&(c=-1),c*("asc"==i?1:-1)}):t},this.filterPredicate=(t,e)=>{const s=Object.keys(t).reduce((e,s)=>e+t[s]+"\u25ec","").toLowerCase(),i=e.trim().toLowerCase();return-1!=s.indexOf(i)},this._data=new u.a(t),this._updateChangeSubscription()}get data(){return this._data.value}set data(t){this._data.next(t),this._renderChangesSubscription||this._filterData(t)}get filter(){return this._filter.value}set filter(t){this._filter.next(t),this._renderChangesSubscription||this._filterData(this.data)}get sort(){return this._sort}set sort(t){this._sort=t,this._updateChangeSubscription()}get paginator(){return this._paginator}set paginator(t){this._paginator=t,this._updateChangeSubscription()}_updateChangeSubscription(){var t;const e=this._sort?Object(st.a)(this._sort.sortChange,this._sort.initialized):Object(_.a)(null),s=this._paginator?Object(st.a)(this._paginator.page,this._internalPageChanges,this._paginator.initialized):Object(_.a)(null),i=this._data,o=Object(it.a)([i,this._filter]).pipe(Object(ot.a)(([t])=>this._filterData(t))),r=Object(it.a)([o,e]).pipe(Object(ot.a)(([t])=>this._orderData(t))),n=Object(it.a)([r,s]).pipe(Object(ot.a)(([t])=>this._pageData(t)));null===(t=this._renderChangesSubscription)||void 0===t||t.unsubscribe(),this._renderChangesSubscription=n.subscribe(t=>this._renderData.next(t))}_filterData(t){return this.filteredData=null==this.filter||""===this.filter?t:t.filter(t=>this.filterPredicate(t,this.filter)),this.paginator&&this._updatePaginator(this.filteredData.length),this.filteredData}_orderData(t){return this.sort?this.sortData(t.slice(),this.sort):t}_pageData(t){if(!this.paginator)return t;const e=this.paginator.pageIndex*this.paginator.pageSize;return t.slice(e,e+this.paginator.pageSize)}_updatePaginator(t){Promise.resolve().then(()=>{const e=this.paginator;if(e&&(e.length=t,e.pageIndex>0)){const t=Math.ceil(e.length/e.pageSize)-1||0,s=Math.min(e.pageIndex,t);s!==e.pageIndex&&(e.pageIndex=s,this._internalPageChanges.next())}})}connect(){return this._renderChangesSubscription||this._updateChangeSubscription(),this._renderData}disconnect(){var t;null===(t=this._renderChangesSubscription)||void 0===t||t.unsubscribe(),this._renderChangesSubscription=null}}class Et extends Ot{}}}]);
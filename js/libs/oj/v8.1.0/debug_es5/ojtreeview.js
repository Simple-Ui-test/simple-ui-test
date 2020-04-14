/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["require","ojs/ojcore","jquery","ojs/ojcontext","ojs/ojthemeutils","ojs/ojcomponentcore","ojs/ojanimation","ojs/ojlogger","ojs/ojconfig","ojs/ojkeyset","ojdnd","ojs/ojdatacollection-common"],(function(e,t,i,n,s,r,o,a,l,d,h,c){"use strict";var u={properties:{currentItem:{type:"any",writeback:!0,readOnly:!0},data:{type:"object"},dnd:{type:"object",properties:{drag:{type:"object",properties:{items:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},dragStart:{type:"function"},drag:{type:"function"},dragEnd:{type:"function"}}}}},drop:{type:"object",properties:{items:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},dragEnter:{type:"function"},dragOver:{type:"function"},dragLeave:{type:"function"},drop:{type:"function"}}}}}}},expanded:{type:"KeySet",writeback:!0},item:{type:"object",properties:{focusable:{type:"function"},renderer:{type:"function"},selectable:{type:"function"}}},selected:{type:"KeySet",writeback:!0},selection:{type:"Array<any>",writeback:!0,value:[]},selectionMode:{type:"string",enumValues:["multiple","none","single"],value:"none"},translations:{type:"object",value:{}}},methods:{getContextByNode:{},refresh:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojAnimateEnd:{},ojAnimateStart:{},ojBeforeCollapse:{},ojBeforeCurrentItem:{},ojBeforeExpand:{},ojCollapse:{},ojExpand:{}},extension:{}};t.__registerWidget("oj.ojTreeView",i.oj.baseComponent,{version:"1.0.0",defaultElement:"<div>",widgetEventPrefix:"oj",options:{currentItem:null,data:null,dnd:{drag:null,drop:null},expanded:new d.KeySetImpl,item:{focusable:null,renderer:null,selectable:null},selected:new d.KeySetImpl,selection:[],selectionMode:"none",animateEnd:null,animateStart:null,beforeCollapse:null,beforeCurrentItem:null,beforeExpand:null,collapse:null,expand:null},_ComponentCreate:function(){this._super()},_AfterCreate:function(){this._super(),this._initRender(),this._render()},_CompareOptionValues:function(e,i,n){switch(e){case"selection":return i&&void 0===i.inverted&&(i.inverted=!1),n&&void 0===n.inverted&&(n.inverted=!1),(!i||!n||i.inverted===n.inverted)&&t.Object.compareValues(i,n);case"selected":return c.areKeySetsEqual(i,n);default:return this._super(e,i,n)}},_initRender:function(){var e=this;this._on(this.element,{click:function(t){e._handleClick(t)},mouseover:function(t){e._handleMouseOver(t)},mouseout:function(t){e._handleMouseOut(t)},mousedown:function(t){e._handleMouseDown(t)},mouseup:function(t){e._handleMouseUp(t)},keydown:function(t){e._handleKeyDown(t)},dragstart:function(t){e._handleDragStart(t)},drag:function(t){e._handleDragSourceEvent(t,"drag")},dragend:function(t){e._handleDragSourceEvent(t,"dragEnd")},dragenter:function(t){e._handleDropTargetEvent(t,"dragEnter")},dragover:function(t){e._handleDropTargetEvent(t,"dragOver")},dragleave:function(t){e._handleDropTargetEvent(t,"dragLeave")},drop:function(t){e._handleDropTargetEvent(t,"drop")}}),t.DomUtils.isTouchSupported()&&(this.element[0].addEventListener("touchstart",(function(t){e.touchStartEvent=t}),{passive:!0}),this.element[0].addEventListener("touchmove",(function(){!0===e.ojTreeViewDragEvent?document.body.style.touchAction="none":document.body.style.touchAction="auto"}),{passive:!1}),this.element[0].addEventListener("touchcancel",(function(){e.touchStartEvent=null,e.ojTreeViewDragEvent=!1})),this.element[0].addEventListener("touchend",(function(t){e.touchStartEvent&&t.changedTouches.length&&document.elementFromPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY)!==e.touchStartEvent.target&&(e.touchStartEvent=null),e.ojTreeViewDragEvent=!1,e._handleMouseOut(t)})));var i=document.createElement("span");i.classList.add("oj-treeview-drop-marker-icon"),i.classList.add("oj-component-icon"),this._dropMarker=document.createElement("div"),this._dropMarker.classList.add("oj-treeview-drop-marker"),this._dropMarker.appendChild(i),this.element[0].appendChild(this._dropMarker),this._dropMarkerRect=this._dropMarker.getBoundingClientRect(),this._dropMarker.style.display="none",this._dropLine=document.createElement("div"),this._dropLine.classList.add("oj-treeview-drop-line"),this.element[0].appendChild(this._dropLine),this._dropLineRect=this._dropLine.getBoundingClientRect(),this._dropLine.style.display="none",this._refreshId=0,this._uiExpanded=new d.KeySetImpl,this._syncSelectionState()},_syncSelectionState:function(){var e=d.KeySetUtils.toArray(this.options.selected),t=d.KeySetUtils.toKeySet(this.options.selection);e.length>0||e.inverted?this._userOptionChange("selection",e,null):(this.options.selection.length>0||this.options.selection.inverted)&&this._userOptionChange("selected",t,null)},_render:function(){var e=this;this.element[0].classList.remove("oj-complete"),this._keyList=new Set;var t,i=this.element[0].getElementsByTagName("ul");if(this.options.data){for(t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]);this._fetchChildren(null,(function(t){var i=t[0];e._renderItems(i.value,e.element[0]),e._resetFocus(),e.element[0].classList.add("oj-complete"),e._decorateTree(),e._lastSelectedItem=null}))}else{for(t=0;t<i.length;t++)i[t].classList.add("oj-treeview-list"),i[t].setAttribute("role","group");var n=this.element[0].getElementsByTagName("li");for(t=0;t<n.length;t++){var s=n[t].getElementsByClassName("oj-treeview-spacer")[0];s&&n[t].removeChild(s),e._decorateItem(n[t])}this._resetFocus(),this.element[0].classList.add("oj-complete"),this._decorateTree(),this._lastSelectedItem=null}},_getDataProvider:function(){var i;if(null==this.m_dataSource){if(i=this.options.data,!t.DataProviderFeatureChecker.isTreeDataProvider(i)){var n=t.__getRequirePromise("./ojtreedataprovideradapter",e);if(!n)throw new Error("Cannot adapt a TreeDataSource if require() is not available");return n.then((function(e){return new e(i)}))}}else i=this.m_dataSource;return Promise.resolve(i)},_fetchChildren:function(e,t){var i=this,n=i._addBusyState("getting data provider"),s=i._getDataProvider(),r=this._refreshId;s.then((function(s){if(n(),i._refreshId===r){i.m_dataSource=s;var o=null===e?s:s.getChildDataProvider(e);if(null!=o){var l=i._addBusyState("fetching data"),d=i._loadTemplateEngine(),h=o.fetchFirst({size:-1})[Symbol.asyncIterator](),c=h.next();Promise.all([c,d]).then((function(e){return i._refreshId!==r?null:function e(t){return t[0].done?t:h.next().then((function(n){return i._refreshId!==r?null:(t[0].done=n.done,t[0].value.data=t[0].value.data.concat(n.value.data),t[0].value.metadata=t[0].value.metadata.concat(n.value.metadata),e(t))}),(function(e){a.error("Error fetching data: "+e),l()}))}(e)}),(function(e){a.error("Error fetching data: "+e),l()})).then((function(e){i._refreshId===r?(t(e),l()):l()}))}}}),(function(e){a.error("Error fetching data: "+e),n()}))},_renderItems:function(e,t){var i=document.createElement("ul");i.classList.add("oj-treeview-list"),i.setAttribute("role","group"),t.appendChild(i);for(var n=0;n<e.data.length;n++)this._renderItem(i,e,n)},_renderItem:function(e,t,n,s,o){var a,l,d=t.data[n],h=t.metadata[n],c=h.key;if(!o){if(this._keyList.has(c))throw new Error("JET TreeView nodes should not have duplicated keys: "+c);this._keyList.add(c)}var u=document.createElement("li");if(u.setAttribute("id",c),o){var _=this._getItemByKey(c);if(!_)return;e=_.parentNode;var p=this._getSubtree(_);_.parentNode.replaceChild(u,_)}else null==s||s>=e.children.length?e.appendChild(u):e.insertBefore(u,e.children[s]);var m={};m.parentElement=i(u),m.index=n,m.data=d,m.datasource=this.options.data,m.parentKey=this._getKey(this._getParentItem(u)),m.component=r.__GetWidgetConstructor(this.element),this._FixRendererContext&&(m=this._FixRendererContext(m));var f=this.m_dataSource.getChildDataProvider(c);h.leaf=null===f||"yes"===f.isEmpty(),h.depth=this._getDepth(u);var g=Object.keys(h);for(a=0;a<g.length;a++){var v=g[a];m[v]=h[v]}var y=this.options.item.renderer;y=this._WrapCustomElementRenderer(y);var E=this._getItemTemplate(),C=this._getTemplateEngine();if(null!=y){var I=y.call(this,m);null!=I&&(null===I.parentNode||I.parentNode instanceof DocumentFragment?u.appendChild(I):null!=I.parentNode||I.toString&&((l=document.createElement("span")).appendChild(document.createTextNode(I.toString())),u.appendChild(l)))}else if(null!=E&&null!=C){var j=this.element[0],b=C.execute(j,E,m,null);for(a=0;a<b.length;a++){if("LI"===b[a].tagName){u.parentNode.replaceChild(b[a],u);break}u.appendChild(b[a])}}else(l=document.createElement("span")).appendChild(document.createTextNode(null==d?"":d.toString())),u.appendChild(l);o&&p&&u.appendChild(p),u=e.children[null!=s?s:n],m.parentElement=i(u),null==u.getAttribute("id")&&u.setAttribute("id",c),u["oj-item-data"]=d,u["oj-item-metadata"]=h,this._decorateItem(u)},_getDepth:function(e){for(var t=0,i=e;i&&i!==this.element[0];)i=i.parentElement.parentElement,t+=1;return t},_loadTemplateEngine:function(){var e=this;return null!=this._getItemTemplate()&&null==e.options.item.renderer?new Promise((function(t){l.__getTemplateEngine().then((function(i){e.m_engine=i,t(i)}),(function(e){throw new Error("Error loading template engine: "+e)}))})):Promise.resolve(null)},_getTemplateEngine:function(){return this.m_engine},_getItemTemplate:function(){if(void 0===this.m_template){this.m_template=null;var e=this._getSlotMap().itemTemplate;e&&e.length>0&&"template"===e[0].tagName.toLowerCase()&&(this.m_template=e[0])}return this.m_template},_getSlotMap:function(){return t.BaseCustomElementBridge.getSlotMap(this.element[0])},_decorateTree:function(){var e=this,t=this._getRoot();if(t){this._focusable({element:i(t),applyHighlight:!0,setupHandlers:function(t,i){e._focusInHandler=t,e._focusOutHandler=i}}),t.setAttribute("tabIndex",0),i(t).on("focus",(function(){e._focusInHandler(i(e._getItemContent(e._currentItem)))})).on("blur",(function(){e._focusOutHandler(i(e._getItemContent(e._currentItem)))})),t.setAttribute("role","tree"),t.setAttribute("aria-labelledby",this.element[0].getAttribute("id"));var n=this.options.selectionMode;"none"!==n?t.setAttribute("aria-multiselectable","multiple"===n?"true":"false"):t.removeAttribute("aria-multiselectable")}},_decorateItem:function(e){var t;e.classList.add("oj-treeview-item"),e.setAttribute("role","treeitem");var i=this._getItemContent(e);if(!i){if((i=document.createElement("div")).classList.add("oj-treeview-item-content"),e.firstChild)do{i.appendChild(e.firstChild)}while(e.childNodes.length>0);e.appendChild(i);var n=i.getElementsByTagName("ul")[0];n&&e.appendChild(n);var s=i.getElementsByClassName("oj-treeview-item-icon");for(t=0;t<s.length;t++)s[t].classList.add("oj-treeview-icon")}this._select(e);var r=this._getDragOptions();i.setAttribute("draggable",Object.keys(r).length>0?"true":"false");var o=i.getElementsByClassName("oj-treeview-spacer");0===o.length&&(o=document.createElement("ins"),this._addTreeViewIconClass(o),this._addTreeviewSpacerClass(o),e.insertBefore(o,i)),this._isLeaf(e)?this._addTreeviewLeafClass(e):(this._isInitExpanded(e)?this._expand(e,!1):this._collapse(e,!1),this._addDisclosureClasses(o))},_addTreeviewSpacerClass:function(e){e.classList.add("oj-treeview-spacer")},_addTreeViewIconClass:function(e){e.classList.add("oj-treeview-icon")},_addTreeviewLeafClass:function(e){e.classList.add("oj-treeview-leaf")},_removeTreeviewLeafClass:function(e){e.classList.remove("oj-treeview-leaf")},_addDisclosureClasses:function(e){e.classList.add("oj-treeview-disclosure-icon"),e.classList.add("oj-component-icon"),e.classList.add("oj-clickable-icon-nocontext"),e.classList.add("oj-default")},_removeDisclosureClasses:function(e){e.classList.remove("oj-treeview-disclosure-icon"),e.classList.remove("oj-component-icon"),e.classList.remove("oj-clickable-icon-nocontext"),e.classList.remove("oj-default")},_getItems:function(){return this.element[0].getElementsByClassName("oj-treeview-item")},_getKey:function(e){if(!e)return null;var t=e["oj-item-metadata"];return t?t.key:e.getAttribute("id")},_getItemByKey:function(e){for(var i,n=this.element[0].getElementsByTagName("li"),s=0;s<n.length;s++){var r=n[s]["oj-item-metadata"];if(r&&t.Object.compareValues(r.key,e)){i=n[s];break}}if(i)return i;if("string"==typeof e){var o=document.getElementById(e),a=this._getRoot();if(a&&o&&a&&a.contains(o))return o}},_getItemContent:function(e){if(!e)return null;for(var t=e.children,i=0;i<t.length;i++)if(e.children[i].classList&&e.children[i].classList.contains("oj-treeview-item-content"))return e.children[i];return null},_getChildItems:function(e){var t=[],i=e.getElementsByClassName("oj-treeview-list")[0];if(i)for(var n=i.children,s=0;s<n.length;s++)t.push(n[s]);return t},_getParentItem:function(e){var t=this._getParents(e,".oj-treeview-list")[0];return this._getParents(t,".oj-treeview-item")[0]},_getSubtree:function(e){return e.getElementsByClassName("oj-treeview-list")[0]},_getRoot:function(){return this.element[0].getElementsByClassName("oj-treeview-list")[0]},_isLeaf:function(e){if(!e)return null;var t=e["oj-item-metadata"];return!(t?!t.leaf:void 0!==this._getSubtree(e))},_isInitExpanded:function(e,t){var i=this._getKey(e),n=null!=t?t:this.options.expanded;return!(!n||!n.has)&&n.has(i)},_isExpanded:function(e){return e.classList.contains("oj-expanded")},_isDisclosing:function(e){return!(!e||!this.m_disclosing)&&this.m_disclosing.indexOf(e)>-1},_setDisclosing:function(e,t){if(null!=e)if(null==this.m_disclosing&&(this.m_disclosing=[]),t)this.m_disclosing.push(e);else for(var i=this.m_disclosing.indexOf(e);i>-1;)this.m_disclosing.splice(i,1),i=this.m_disclosing.indexOf(e)},_expand:function(e,t,i,n){var s=this;if(!(this._isExpanded(e)||this._isLeaf(e)||t&&this._isDisclosing(this._getKey(e)))){if(t&&!this._trigger("beforeExpand",i,this._getEventPayload(e))&&!1!==n)return;if(this._lastSelectedItem=null,!this._getSubtree(e))return this._uiExpanded=this._uiExpanded.add([s._getKey(e)]),void this._fetchChildren(s._getKey(e),(function(n){if(!s._isExpanded(e)&&(s._isInitExpanded(e)||s._isInitExpanded(e,s._uiExpanded))){var r=n[0];s._renderItems(r.value,e),s._expandAfterFetch(e,t,i)}}));s._expandAfterFetch(e,t,i)}},_expandAfterFetch:function(e,t,i){var n=this;e.classList.remove("oj-collapsed"),e.classList.add("oj-expanded"),e.setAttribute("aria-expanded","true");var s=this._getSubtree(e);if(s&&(s.style.display="block"),t){var r=this._addBusyState("animating expand");e.classList.add("oj-treeview-animated"),n._setDisclosing(n._getKey(e),!0),this._startAnimation(s,"expand").then((function(){n._setDisclosing(n._getKey(e),!1),e.classList.remove("oj-treeview-animated"),n._trigger("expand",i,n._getEventPayload(e));var t=n.options.expanded.add([n._getKey(e)]);n._userOptionChange("expanded",t,i),r()}))}},_collapse:function(e,t,i,n){var s=this;if(!(e.classList.contains("oj-collapsed")||this._isLeaf(e)||t&&this._isDisclosing(this._getKey(e)))){if(e.contains(this._currentItem)){var r=e;this._isActionable(r,"focus")||(r=this._getPreviousActionableItem(e,"focus"))||(r=this._getNextActionableItem(e,"focus")),r?this._focus(r,i):(this.options.currentItem=null,this._resetFocus())}if(t){if(!this._trigger("beforeCollapse",i,this._getEventPayload(e))&&!1!==n)return;this._setDisclosing(this._getKey(e),!0)}e.classList.remove("oj-expanded"),e.classList.add("oj-collapsed"),e.setAttribute("aria-expanded","false"),this._lastSelectedItem=null;var o=this._getSubtree(e);if(t){var a=this._addBusyState("animating collapse");e.classList.add("oj-treeview-animated"),this._uiExpanded=this._uiExpanded.delete([this._getKey(e)]),this._startAnimation(o,"collapse").then((function(){s._setDisclosing(s._getKey(e),!1),o.style.display="none",e.classList.remove("oj-treeview-animated"),s._trigger("collapse",i,s._getEventPayload(e));var t=s.options.expanded.delete([s._getKey(e)]);s._userOptionChange("expanded",t,i),a()}))}else o&&(o.style.display="none")}},_startAnimation:function(e,t){this.defaultOptions||(this.defaultOptions=s.parseJSONFromFontFamily("oj-treeview-option-defaults"));var i=(this.defaultOptions.animation||{})[t];return o.startAnimation(e,t,i,this)},_getEventPayload:function(e){return{key:this._getKey(e),item:e}},_isActionable:function(e,t){var i=this.options.item[t+"able"];return!1!==i&&("function"!=typeof i||i(this.getContextByNode(e)))},_isSelected:function(e){var t=this.options.selectionMode,i=this.options.selected;if("none"===t)return!1;var n=this._getKey(e);return i.has(n)},_handleSelectedOption:function(e,t){if("selected"===e){var i=d.KeySetUtils.toArray(t);this._userOptionChange("selection",i,null)}else if("selection"===e){var n=d.KeySetUtils.toKeySet(t);this._userOptionChange("selected",n,null)}for(var s=this._getItems(),r=0;r<s.length;r++)this._select(s[r])},_select:function(e,i){var n=this.options.selectionMode;if("none"!==n&&this._isActionable(e,"select")){var s=this._isSelected(e);if(i){var r=i.originalEvent.sourceCapabilities&&i.originalEvent.sourceCapabilities.firesTouchEvents,o=t.DomUtils.isTouchSupported()&&(r||null!=this.touchStartEvent&&this.touchStartEvent.target===i.target),a=t.DomUtils.isMetaKeyPressed(i),l="multiple"===n,h=40===i.keyCode||38===i.keyCode,c=this._getKey(e),u=new d.KeySetImpl;if(l&&i.shiftKey&&!h){a?u=this.options.selected:this._clearSelection();for(var _=this._lastSelectedItem,p=_&&_.offsetTop<e.offsetTop?this._getNextActionableItem.bind(this):this._getPreviousActionableItem.bind(this);_&&_!==e;){var m=this._getKey(_);u.has(m)||(u=u.add([m]),this._setSelected(_)),_=p(_,"select")}s=!0,u=u.add([c])}else l&&(a||o||h)?(s=!s,u=this.options.selected,u=s?u.add([c]):u.delete([c])):(this._clearSelection(),(o||32===i.keyCode)&&s?(s=!1,u=new d.KeySetImpl):(s=!0,u=new d.KeySetImpl([c])));this._userOptionChange("selected",u,i),this._userOptionChange("selection",d.KeySetUtils.toArray(u),i),this._lastSelectedItem=e}s?this._setSelected(e):this._setUnselected(e)}},_setSelected:function(e){this._getItemContent(e).classList.add("oj-selected"),e.setAttribute("aria-selected","true")},_setUnselected:function(e){this._getItemContent(e).classList.remove("oj-selected"),e.setAttribute("aria-selected","false")},_clearSelection:function(){for(var e=this._getItems(),t=0;t<e.length;t++)this._setUnselected(e[t])},_focus:function(e,t){if(this._isActionable(e,"focus")){if(t){var n=this._getEventPayload(e);if(this._currentItem&&(n.previousKey=this._getKey(this._currentItem),n.previousItem=this._currentItem),!this._trigger("beforeCurrentItem",t,n))return;this._userOptionChange("currentItem",this._getKey(e),t)}this._focusOutHandler(i(this._getItemContent(this._currentItem))),this._focusInHandler(i(this._getItemContent(e))),this._setCurrentItem(e)}},_resetFocus:function(){if(this.options.currentItem){var e=this._getItemByKey(this.options.currentItem);if(e)return void this._setCurrentItem(e)}var t=this._getItems()[0];this._isActionable(t,"focus")||(t=this._getNextActionableItem(t,"focus")),this._setCurrentItem(t),this._userOptionChange("currentItem",this._getKey(this._currentItem),null)},_setCurrentItem:function(e){this._currentItem=e,this._getRoot()&&this._getRoot().setAttribute("aria-activedescendant",this._getKey(e))},_addBusyState:function(e){var t=n.getContext(this.element[0]).getBusyContext(),i=this.element.attr("id");return t.addBusyState({description:"The component identified by '"+i+"', "+e})},_userOptionChange:function(e,t,i){this.option(e,t,{_context:{originalEvent:i,writeback:!0,internalSet:!0}})},_getDragOptions:function(){return((this.options.dnd||{}).drag||{}).items||{}},_getDropOptions:function(){return((this.options.dnd||{}).drop||{}).items||{}},_getClosestItem:function(e){return this._closest(e,".oj-treeview-item")},_getClosestItemContent:function(e){return this._closest(e,".oj-treeview-item-content")},_getClosestDisclosureIcon:function(e){return this._closest(e,".oj-treeview-disclosure-icon")},_handleClick:function(e){var t,i=this._getClosestDisclosureIcon(e.target);if(i)return t=this._getClosestItem(i),this._isExpanded(t)?this._collapse(t,!0,e):this._expand(t,!0,e),void(this.touchStartEvent=null);var n=this._getClosestItemContent(e.target);if(n)return t=n.parentNode,this._select(t,e),this._focus(t,e),void(this.touchStartEvent=null);"none"!==this.options.selectionMode&&(this._clearSelection(),this._lastSelectedItem=null,this._userOptionChange("selected",new d.KeySetImpl,e),this._userOptionChange("selection",[],e)),this.touchStartEvent=null},_handleMouseOver:function(e){if(!t.DomUtils.isTouchSupported()||!this.touchStartEvent){var i=this._getClosestDisclosureIcon(e.target);i||(i=this._getClosestItemContent(e.target)),i&&(i.classList.remove("oj-default"),i.classList.add("oj-hover"))}},_handleMouseOut:function(e){var t=this._getClosestDisclosureIcon(e.target);t&&t.classList.remove("oj-selected"),t||(t=this._getClosestItemContent(e.target)),t&&(t.classList.add("oj-default"),t.classList.remove("oj-hover"))},_handleMouseDown:function(e){var t=this._getClosestDisclosureIcon(e.target);t&&t.classList.add("oj-selected")},_handleMouseUp:function(e){var t=this._getClosestDisclosureIcon(e.target);t&&t.classList.remove("oj-selected")},_handleKeyDown:function(e){var i,n=e.keyCode,s=this._currentItem,r=this.options.selectionMode;if(38===n||40===n)(i=40===n?this._getNextActionableItem(s,"focus"):this._getPreviousActionableItem(s,"focus"))&&(e.preventDefault(),this._isSelected(s)&&e.shiftKey&&this._select(this._isSelected(i)?s:i,e),this._focus(i,e));else if(37===n||39===n){var o="rtl"===this._GetReadingDirection(),a=!o&&39===n||o&&37===n;!a||this._isLeaf(s)||this._isExpanded(s)?a||this._isLeaf(s)||!this._isExpanded(s)?(i=a?this._getNextActionableItem(s,"focus"):this._getPreviousActionableItem(s,"focus"))&&(e.preventDefault(),this._focus(i,e)):(e.preventDefault(),this._collapse(s,!0,e)):(e.preventDefault(),this._expand(s,!0,e))}else if(13===n||32===n)e.preventDefault(),this._select(s,e);else if(65===n&&t.DomUtils.isMetaKeyPressed(e)&&"multiple"===r){e.preventDefault();for(var l=this._getItems(),h=new d.AllKeySetImpl,c=0;c<l.length;c++)this._isActionable(l[c],"select")&&this._setSelected(l[c]);this._userOptionChange("selected",h,e),this._userOptionChange("selection",d.KeySetUtils.toArray(h),e)}},_getNextItem:function(e){if(!this._isLeaf(e)&&this._isExpanded(e)){var t=this._getChildItems(e)[0];if(t)return t}for(var i=e;i;){var n=this._getNextSibling(i,".oj-treeview-item");if(n)return n;i=this._getParentItem(i)}return null},_getNextActionableItem:function(e,t){for(;null!=e;)if(null!=(e=this._getNextItem(e))&&this._isActionable(e,t))return e;return null},_getPreviousItem:function(e){for(var t=this._getPreviousSibling(e,".oj-treeview-item");t;){if(this._isLeaf(t)||!this._isExpanded(t))return t;var i=this._getChildItems(t),n=i[i.length-1];if(!n)return t;t=n}var s=this._getParentItem(e);return s||null},_getPreviousActionableItem:function(e,t){for(;null!=e;)if(null!=(e=this._getPreviousItem(e))&&this._isActionable(e,t))return e;return null},_handleDragStart:function(e){t.DomUtils.isTouchSupported()&&(this.ojTreeViewDragEvent=!0);var i=this,n="rtl"===this._GetReadingDirection(),s=this._getClosestItem(e.target);if(s){var r,o=[];if(this._isSelected(s)){var a=this.options.selection;for(r=0;r<a.length;r++){var l=this._getItemByKey(a[r]);l&&o.push(l)}}else this._select(s,e),o.push(s);var d=this._getDragOptions(),h=e.originalEvent.dataTransfer,c=document.createElement("ul");c.classList.add("oj-treeview-drag-image"),c.classList.add("oj-treeview-list"),t.AgentUtils.getAgentInfo().browser===t.AgentUtils.BROWSER.SAFARI&&(c.style.position="absolute");var u,_=[],p=1/0,m=1/0;for(o.forEach((function(e){_.push(e["oj-item-data"]);var t=e.getBoundingClientRect(),s=t.top,r=t.left;n&&(r=i._getItemContent(e).getBoundingClientRect().left),s+=document.body.scrollTop,r+=document.body.scrollLeft;var o=e.cloneNode(!0);o.style.top=s+"px",o.style.left=r+"px";var a=i._getSubtree(o);a&&o.removeChild(a),s<p&&(p=s),r<m&&(m=r),c.appendChild(o)})),r=0;r<c.children.length;r++)(u=c.children[r]).style.top=parseFloat(u.style.top)-p+"px",u.style.left=parseFloat(u.style.left)-m+"px";var f=d.dataTypes,g="string"==typeof f?[f]:f||[];for(r=0;r<g.length;r++)h.setData(g[r],JSON.stringify(_));document.body.appendChild(c),h.setDragImage(c,e.pageX-m,e.pageY-p),setTimeout((function(){c.parentElement.removeChild(c)}),0);var v=d.dragStart;v&&v(e.originalEvent,{items:_})}},_handleDragSourceEvent:function(e,t){var i=this._getDragOptions()[t];i&&i(e.originalEvent)},_handleDropTargetEvent:function(e,i){var n=this._getDropOptions(),s=n.dataTypes,r="string"==typeof s?[s]:s||[],o=n[i],a=this._getClosestItem(e.target),l=a.getElementsByClassName("oj-treeview-spacer")[0],d=l.getBoundingClientRect(),h=l.offsetTop,c=l.offsetLeft,u=h+d.height/2,_="inside",p=e.originalEvent.clientY-d.top;p<.25*d.height?_="before":p>.75*d.height&&(_=this._isExpanded(a)?"first":"after"),o&&o(e.originalEvent,{item:a,position:_});for(var m=0;m<r.length;m++){var f=e.originalEvent.dataTransfer.types;if(f&&f.indexOf(r[m])>=0){e.preventDefault();break}}if("dragEnter"!==i&&"dragOver"!==i||!e.originalEvent.defaultPrevented)"dragEnd"===i&&t.DomUtils.isTouchSupported()&&(this.ojTreeViewDragEvent=!1,document.body.style.touchAction="auto"),this._dropMarker.style.display="none",this._dropLine.style.display="none";else{var g="rtl"===this._GetReadingDirection(),v=u,y=g?c-this._dropLineRect.width:c+d.width,E=u-this._dropMarkerRect.height/2,C=c+d.width/2-this._dropMarkerRect.width/2;if("before"===_)E-=d.height/2,v-=d.height/2;else if(("after"===_||"first"===_)&&(E+=d.height/2,v+=d.height/2,"first"===_)){var I=(g?-1:1)*d.width;C+=I,y+=I}this._dropMarker.style.top=E+"px",this._dropMarker.style.left=C+"px",this._dropMarker.style.display="","inside"!==_?(this._dropLine.style.top=v+"px",this._dropLine.style.left=y+"px",this._dropLine.style.display=""):this._dropLine.style.display="none"}},_NotifyContextMenuGesture:function(e,t,i){if("keyboard"===i){var n=this._currentItem?this._getItemContent(this._currentItem):this.element,s={launcher:this._getRoot(),initialFocus:"menu",position:{my:"start top",at:"start bottom",of:n}};this._OpenContextMenu(t,i,s)}else this.ojTreeViewDragEvent||this._superApply(arguments)},refresh:function(){this._super(),this._refreshId+=1,delete this.m_template,delete this.m_engine,delete this.m_dataSource,this._render()},getNodeBySubId:function(e){if(null==e)return this.element?this.element[0]:null;var t,i=e.key,n=e.subId,s=this._getItemByKey(i);return"oj-treeview-disclosure"===n&&s?t=s.getElementsByClassName("oj-treeview-disclosure-icon")[0]:"oj-treeview-item"===n&&s&&(t=s.getElementsByClassName("oj-treeview-item-content")[0]),t||null},getSubIdByNode:function(e){if(!this.element[0].contains(e))return null;var t,i=this._getClosestDisclosureIcon(e),n=this._getClosestItem(e);if(i)t="oj-treeview-disclosure";else{if(!n)return null;t="oj-treeview-item"}return{subId:t,key:this._getKey(n)}},getContextByNode:function(e){if(!this.element[0].contains(e))return null;var t,i=this._getClosestItem(e);if(!i)return null;var n=i.parentNode.children,s=[];for(t=0;t<n.length;t++)n[t].classList.contains("oj-treeview-item")&&s.push(n[t]);var o={subId:"oj-treeview-item"};o.index=s.indexOf(i),o.parentKey=this._getKey(this._getParentItem(i)),o.component=r.__GetWidgetConstructor(this.element),this._FixRendererContext&&(o=this._FixRendererContext(o));var a=i["oj-item-metadata"];if(a){o.data=i["oj-item-data"],o.datasource=this.options.data;var l=Object.keys(a);for(t=0;t<l.length;t++){var d=l[t];o[d]=a[d]}}else o.key=this._getKey(i),o.leaf=this._isLeaf(i),o.depth=this._getParents(i,".oj-treeview-list").length;return o},_setOption:function(e,t,i){var n,s,r=this;if(this._superApply(arguments),"expanded"===e)for(this._uiExpanded=r._uiExpanded.clear(),s=this._getItems(),n=0;n<s.length;n++)r._isInitExpanded(s[n])?r._expand(s[n],!0):r._collapse(s[n],!0);else"selection"===e||"selected"===e?this._handleSelectedOption(e,t):"currentItem"===e?this._resetFocus():this.refresh()},_SetupResources:function(){this._super(),this._addDataProviderEventListeners()},_ReleaseResources:function(){this._super(),this._removeDataProviderEventListeners()},_destroy:function(){this._removeDataProviderEventListeners(),this._super()},_addDataProviderEventListeners:function(){var e=this.options.data;e&&t.DataProviderFeatureChecker.isTreeDataProvider(e)&&(this.m_handleModelMutateEventListener=this.handleModelMutateEvent.bind(this),this.m_handleModelRefreshEventListener=this.handleModelRefreshEvent.bind(this),e.addEventListener("mutate",this.m_handleModelMutateEventListener),e.addEventListener("refresh",this.m_handleModelRefreshEventListener))},_removeDataProviderEventListeners:function(){var e=this.options.data;e&&t.DataProviderFeatureChecker.isTreeDataProvider(e)&&(e.removeEventListener("mutate",this.m_handleModelMutateEventListener),e.removeEventListener("refresh",this.m_handleModelRefreshEventListener))},handleModelMutateEvent:function(e){null!=e.detail.remove&&this.handleModelRemoveEvent(e),null!=e.detail.add&&this.handleModelAddEvent(e),null!=e.detail.update&&this.handleModelChangeEvent(e)},handleModelRemoveEvent:function(e){var t=this,i=e.detail.remove.keys,n=[];if(null!=i&&0!==i.size){i.forEach((function(e){n=n.concat(t._removeAllChildrenOfParentKey(e))}));var s=this.options.selected;if(null!=s){var r=s.delete(n);s!==r&&(this._userOptionChange("selected",r,e),this._userOptionChange("selection",d.KeySetUtils.toArray(r),e))}var o=this.options.expanded;if(null!=o){var a=o.delete(n);this._uiExpanded.delete(n),o!==a&&this._userOptionChange("expanded",a,null)}this._resetFocus()}},_changeNodeToLeaf:function(e,t){if(e!==this.element[0]){e.removeChild(t),e["oj-item-metadata"].leaf=!0,e.classList.add("oj-treeview-leaf"),e.classList.remove("oj-expanded"),e.removeAttribute("aria-expanded"),e.classList.remove("oj-collapsed");var i=e.getAttribute("id"),n=[];n.push(i);var s=this.options.expanded;if(null!=s){var r=s.delete(n);this._uiExpanded.delete(n),s!==r&&this._userOptionChange("expanded",r,null)}var o=e.getElementsByClassName("oj-treeview-spacer")[0];this._removeDisclosureClasses(o)}},_changeNodeToParent:function(e){e["oj-item-metadata"].leaf=!1,e.classList.remove("oj-treeview-leaf"),e.classList.add("oj-collapsed"),e.setAttribute("aria-expanded",!1);var t=e.getElementsByClassName("oj-treeview-spacer")[0];this._addDisclosureClasses(t)},_removeAllChildrenOfParentKey:function(e){var t=this,i=[],n=this._getItemByKey(e);if(n){this._getChildItems(n).forEach((function(e){var n=t._getKey(e),s=t._removeAllChildrenOfParentKey(n);i=i.concat(s)}));var s=n.parentNode;s.removeChild(n),this._keyList.delete(e),i.push(e),0===s.getElementsByTagName("li").length&&t._changeNodeToLeaf(s.parentNode,s)}return i},_isLeafIcon:function(e){return e.classList.contains("oj-treeview-leaf")},handleModelAddEvent:function(e){var t,i=e.detail.add,n=i.data,s=i.metadata,r=[],o=i.parentKeys,a=i.indexes,l=this;i.keys.forEach((function(e){r.push(e)})),o.forEach((function(e){var t=l._getItemByKey(e);t&&l._isLeafIcon(t)&&l._changeNodeToParent(t)}));var d=i.addBeforeKeys?i.addBeforeKeys:i.afterKeys;if(d&&(t=[],d.forEach((function(e){t.push(e)}))),null!=n&&null!=r&&r.length>0&&n.length>0&&r.length===n.length&&(null==a||a.length===n.length))for(var h=0;h<n.length;h++){var c,u=null==a?this._getIndex(t,h)+1:a[h],_=o[h],p=this._getItemByKey(_);null==_?(c=this._getRoot())&&this._renderItem(c,{data:[n[h]],metadata:[s[h]]},0,u):p&&(!(c=this._getSubtree(p))&&p&&l._isInitExpanded(p)&&((c=document.createElement("ul")).classList.add("oj-treeview-list"),c.setAttribute("role","group"),p.appendChild(c)),c&&this._renderItem(c,{data:[n[h]],metadata:[s[h]]},0,u))}},handleModelChangeEvent:function(e){var t=e.detail.update,i=t.data,n=t.metadata,s=[];t.keys.forEach((function(e){s.push(e)}));for(var r=0;r<i.length;r++){var o=this._getItemByKey(s[r]);if(null!=o){var a=this._indexToParent(o);this._renderItem(null,{data:[i[r]],metadata:[n[r]]},0,a,!0)}}this._resetFocus()},_indexToParent:function(e){for(var t=0,i=0;i<e.parentNode.children.length;i++)if(e.parentNode.children[i]===e){t=i;break}return t},handleModelRefreshEvent:function(){
this.refresh()},_closest:function(e,t){if(!e)return null;if(!e.closest){do{if(this._matches(e,t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null}return e.closest(t)},_getParents:function(e,t){for(var i=[];e&&e!==document;e=e.parentNode)this._matches(e,t)&&i.push(e);return i},_getNextSibling:function(e,t){var i=e.nextElementSibling;if(!t)return i;for(;i;){if(this._matches(i,t))return i;i=i.nextElementSibling}return null},_getPreviousSibling:function(e,t){var i=e.previousElementSibling;if(!t)return i;for(;i;){if(this._matches(i,t))return i;i=i.previousElementSibling}return null},_matches:function(e,t){return e.matches||(e.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),e.matches(t)}}),u.extension._WIDGET_NAME="ojTreeView",t.CustomElementBridge.register("oj-tree-view",{metadata:u})}));
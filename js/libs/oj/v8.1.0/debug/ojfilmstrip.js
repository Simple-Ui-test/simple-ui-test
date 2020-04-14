/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojcontext","ojs/ojcomponentcore","ojs/ojlogger","touchr"],(function(e,t,i,s,n){"use strict";var r={properties:{arrowPlacement:{type:"string",enumValues:["adjacent","overlay"],value:"adjacent"},arrowVisibility:{type:"string",enumValues:["auto","hidden","hover","visible"],value:"auto"},currentItem:{type:"object",writeback:!0,value:{index:0},properties:{id:{type:"string"},index:{type:"number"}}},looping:{type:"string",enumValues:["off","page"],value:"off"},maxItemsPerPage:{type:"number",value:0},orientation:{type:"string",enumValues:["horizontal","vertical"],value:"horizontal"},translations:{type:"object",value:{},properties:{labelAccArrowNextPage:{type:"string"},labelAccArrowPreviousPage:{type:"string"},labelAccFilmStrip:{type:"string"},tipArrowNextPage:{type:"string"},tipArrowPreviousPage:{type:"string"}}}},methods:{refresh:{},getItemsPerPage:{},getPagingModel:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},extension:{}};e.FilmStripPagingModel=function(){this.Init()},e.Object.createSubclass(e.FilmStripPagingModel,e.EventSource,"oj.FilmStripPagingModel"),e.FilmStripPagingModel.prototype.Init=function(){e.FilmStripPagingModel.superclass.Init.call(this),this._page=-1,this._totalSize=0,this._pageSize=-1},e.FilmStripPagingModel.prototype.setTotalSize=function(e){this._totalSize=e},e.FilmStripPagingModel.prototype.getPageSize=function(){return this._pageSize},e.FilmStripPagingModel.prototype.getPage=function(){return this._page},e.FilmStripPagingModel.prototype.setPage=function(e,t){e=parseInt(e,10);try{var i=this.getPageCount(),s=this._page,n=this._pageSize,r=n;if(t&&t.pageSize&&(r=t.pageSize),0===this._totalSize&&-1===r)return Promise.resolve();var a=Math.ceil(this._totalSize/r);if(e<0||e>a-1)throw new Error("JET FilmStrip: Invalid 'page' set: "+e);var o=!1;if(e!==s||r!==n){if(!1===this.handleEvent("beforePage",{page:e,previousPage:s}))return Promise.reject();o=!0}this._page=e,this._pageSize=r;var l=this.getPageCount(),h=this;return new Promise((function(n){if(i!==l&&h.handleEvent("pageCount",{pageCount:l,previousPageCount:i}),o){var r={page:e,previousPage:s};t&&t.loopDirection&&(r.loopDirection=t.loopDirection),h.handleEvent("page",r)}n(null)}))}catch(e){return Promise.reject(e)}},e.FilmStripPagingModel.prototype.getStartItemIndex=function(){return-1===this._page&&-1===this._pageSize?-1:this._page*this._pageSize},e.FilmStripPagingModel.prototype.getEndItemIndex=function(){return Math.min(this.getStartItemIndex()+this._pageSize,this._totalSize)-1},e.FilmStripPagingModel.prototype.getPageCount=function(){return Math.ceil(this._totalSize/this._pageSize)},e.FilmStripPagingModel.prototype.totalSize=function(){return this._totalSize},e.FilmStripPagingModel.prototype.totalSizeConfidence=function(){return"actual"},function(){function r(e,t){e.css("-webkit-transform",t).css("-ms-transform",t).css("transform",t)}function a(e){e.css("-webkit-transform","").css("-ms-transform","").css("transform","")}function o(e){var i=t("<div></div>");return i.text(e),i[0].innerHTML}e.__registerWidget("oj.ojFilmStrip",t.oj.baseComponent,{defaultElement:"<div>",widgetEventPrefix:"oj",options:{maxItemsPerPage:0,orientation:"horizontal",currentItem:{index:0},arrowPlacement:"adjacent",arrowVisibility:"auto",looping:"off"},_ComponentCreate:function(){this._super();var e=this.element;e.addClass("oj-filmstrip oj-component").attr("tabindex",0).attr("role","region"),e.uniqueId(),this._focusable({element:e,applyHighlight:!0});var t=this.options;if(t.disabled&&n.warn("JET FilmStrip: 'disabled' property not supported"),"horizontal"!==t.orientation&&"vertical"!==t.orientation)throw new Error("JET FilmStrip: Unsupported value set as 'orientation' property: "+t.orientation);if("adjacent"!==t.arrowPlacement&&"overlay"!==t.arrowPlacement)throw new Error("Unsupported value set as 'arrowPlacement' property: "+t.arrowPlacement);if("visible"!==t.arrowVisibility&&"hidden"!==t.arrowVisibility&&"hover"!==t.arrowVisibility&&"auto"!==t.arrowVisibility)throw new Error("Unsupported value set as 'arrowVisibility' property: "+t.arrowVisibility);if("off"!==t.looping&&"page"!==t.looping)throw new Error("Unsupported value set as 'looping' property: "+t.looping);this.touchEventNamespace=this.eventNamespace+"Touch",this.mouseEventNamespace=this.eventNamespace+"Mouse",this.keyEventNamespace=this.eventNamespace+"Key",this.navArrowHoverableEventNamespace=this.eventNamespace+"NavArrowHoverable",t.currentItem=this._convertItemToObj(t.currentItem),this._setup(!0),this._populateItemObj(t.currentItem),this.option("currentItem",t.currentItem,{_context:{internalSet:!0,writeback:!0}})},refresh:function(){this._super(),this._setup(!1)},getItemsPerPage:function(){return this._itemsPerPage},getPagingModel:function(){return this._pagingModel},_NotifyShown:function(){this._super(),this._needsSetup?this._setup(this._needsSetup[0]):this._handleResize()},_NotifyAttached:function(){this._super(),this._needsSetup?this._setup(this._needsSetup[0]):this._handleResize()},_setup:function(i){var n=this;if(i&&!this._pagingModel&&(this._pagingModel=new e.FilmStripPagingModel),i&&!this._filterNestedFilmStripsFunc&&(this._filterNestedFilmStripsFunc=function(e,i){return t(i).closest(".oj-filmstrip")[0]===n.element[0]}),!this._canCalculateSizes()){var r=!1;return this._needsSetup&&(r=this._needsSetup[0]),void(this._needsSetup=[i||r])}this._needsSetup=null,this._bRTL="rtl"===this._GetReadingDirection(),this._bTouchSupported=e.DomUtils.isTouchSupported();var a=this.element;i?(this._itemsPerPage=0,this._handlePageFunc=function(e){n._handlePage(e)},this._componentSize=0,this._itemSize=-1,this._handleTransitionEndFunc=function(e){n._handleTransitionEnd()},this._handleResizeFunc=function(e,t){n._handleResize()},this._bTouchSupported&&(this._handleTouchStartFunc=function(e){n._handleTouchStart(e)},this._handleTouchMoveFunc=function(e){n._handleTouchMove(e)},this._handleTouchEndFunc=function(e){n._handleTouchEnd(e)},this._addTouchListeners()),this._handleMouseDownFunc=function(e){n._handleMouseDown(e)},this._handleMouseMoveFunc=function(e){n._handleMouseMove(e)},this._handleMouseUpFunc=function(e){n._handleMouseUp(e)},this._addMouseListeners(),this._handleKeyDownFunc=function(e){n._handleKeyDown(e)},this._addKeyListeners()):this._destroyInternal();var o,l=a.children();for(o=0;o<l.length;o++)s.subtreeDetached(l[o]);var h=this._pagingModel;if(i&&h.on("page",this._handlePageFunc),h.setTotalSize(l.length),this._wrapChildren(),l.length>0){for(this._adjustSizes(),o=0;o<l.length;o++)s.subtreeAttached(l[o]);e.DomUtils.addResizeListener(a[0],this._handleResizeFunc,25)}},_destroy:function(){this._bTouchSupported&&(this._removeTouchListeners(),this._handleTouchStartFunc=null,this._handleTouchMoveFunc=null,this._handleTouchEndFunc=null),this._removeMouseListeners(),this._handleMouseDownFunc=null,this._handleMouseMoveFunc=null,this._handleMouseUpFunc=null,this._removeKeyListeners(),this._handleKeyDownFunc=null,this._destroyInternal(),this._pagingModel.off("page",this._handlePageFunc),this._handlePageFunc=null,this._pagingModel=null,this._handleResizeFunc=null,this._handleTransitionEndFunc=null,this._filterNestedFilmStripsFunc=null;var e=this.element;e.removeClass("oj-filmstrip oj-component oj-filmstrip-hover").removeAttr("tabindex role").removeAttr("aria-labelledby"),e.removeUniqueId(),this._IsCustomElement()&&(e[0].removeEventListener("touchstart",this._delegatedHandleTouchStartFunc,{passive:!0}),e[0].removeEventListener("touchmove",this._delegatedHandleTouchMoveFunc,{passive:!1}),delete this._delegatedHandleTouchStartFunc,delete this._delegatedHandleTouchMoveFunc),this._super()},_destroyInternal:function(){this._deferredHandleResize=!1,this._resolveBusyState();var t=this.element;e.DomUtils.removeResizeListener(t[0],this._handleResizeFunc),this._itemSize=-1,this._queuedHandleResize&&(clearTimeout(this._queuedHandleResize),this._queuedHandleResize=null);var i,n=this._getItems();for(i=0;i<n.length;i++)s.subtreeDetached(n[i]);for(this._clearCalculatedSizes(),this._getItemContainers().unwrap(),this._unwrapChildren(),i=0;i<n.length;i++)s.subtreeAttached(n[i])},_setOption:function(e,t,i){var s=this.options,r=!1,a=-1,o=this._pagingModel,l=o.getPage();switch(e){case"disabled":n.warn("JET FilmStrip: 'disabled' property not supported");break;case"orientation":if("horizontal"!==t&&"vertical"!==t)throw new Error("JET FilmStrip: Unsupported value set as 'orientation' property: "+t);r=s.orientation!==t;break;case"maxItemsPerPage":r=s.maxItemsPerPage!==t;break;case"arrowPlacement":if("adjacent"!==t&&"overlay"!==t)throw new Error("Unsupported value set as 'arrowPlacement' property: "+t);r=s.arrowPlacement!==t;break;case"arrowVisibility":if("visible"!==t&&"hidden"!==t&&"hover"!==t&&"auto"!==t)throw new Error("Unsupported value set as 'arrowVisibility' property: "+t);r=s.arrowVisibility!==t;break;case"looping":if("off"!==t&&"page"!==t)throw new Error("Unsupported value set as 'looping' property: "+t);r=s.looping!==t;break;case"currentItem":t=this._convertItemToObj(t),this._populateItemObj(t);var h=s.currentItem;if(h&&t&&(h.id!==t.id||h.index!==t.index)&&((a=this._findPage(t))<0||a>=o.getPageCount()))throw new Error("JET FilmStrip: Value of 'currentItem' property not found: "+t)}switch(this._super(e,t,i),e){case"currentItem":a>-1&&a!==l&&o.setPage(a)}r&&this._setup(!1)},_handleResize:function(){if(this._busyStateResolveFunc)this._deferredHandleResize=!0;else if(this._bHandlingResize){if(!this._queuedHandleResize){var e=this;this._queuedHandleResize=setTimeout((function(){e._queuedHandleResize=null,e._handleResize()}),0)}}else this._bHandlingResize=!0,this._adjustSizes(!0),this._bHandlingResize=!1},_isHorizontal:function(){return"vertical"!==this.options.orientation},_isLoopingPage:function(){return"page"===this.options.looping},_getCssPositionAttr:function(){return this._isHorizontal()?this._bRTL?"right":"left":"top"},_getCssSizeAttr:function(){return this._isHorizontal()?"width":"height"},_canCalculateSizes:function(){var e=document.createElement("div"),t=e.style;t.position="absolute",t.width="10px",t.height="10px";var i=this.element[0];i.appendChild(e);var s=!1;try{s=e.offsetWidth>0&&e.offsetHeight>0}catch(e){}return i.removeChild(e),s},_wrapChildren:function(){var e=this.element,t=this._isHorizontal(),i=e.children();i.addClass("oj-filmstrip-item").wrap("<div class='oj-filmstrip-container oj-filmstrip-item-container'></div>");var s=this._getCssPositionAttr(),n=e.children().wrapAll("<div class='oj-filmstrip-container oj-filmstrip-pages-container'></div>").parent().css(s,"0px");this._pagesWrapper=n;var r=this.options;"hidden"!==r.arrowVisibility&&"adjacent"===r.arrowPlacement&&(this._contentWrapper=n.wrap("<div class='oj-filmstrip-container oj-filmstrip-content-container'></div>").parent()),e.addClass("oj-filmstrip-container"),t||e.addClass("oj-filmstrip-vertical");var a=this._createPageInfoElem(),o=e.attr("id"),l=a.attr("id");e.append(a),e.attr("aria-labelledby",o+" "+l),this._pageInfoElem=a,"hidden"!==r.arrowVisibility&&i.length>0&&(this._prevButton=this._createPrevNavArrow(),this._nextButton=this._createNextNavArrow(),this._navArrowsShownOnHover()&&this._setupNavArrowsHoverable())},_unwrapChildren:function(){var e=this.element,t=this._getItems();this._tearDownNavArrowsHoverable(),this._prevButton&&(this._UnregisterChildNode(this._prevButton),this._prevButton=null),this._nextButton&&(this._UnregisterChildNode(this._nextButton),this._nextButton=null);var i=e.children(".oj-filmstrip-arrow-container");i&&i.remove(),this._pageInfoElem&&(this._UnregisterChildNode(this._pageInfoElem),this._pageInfoElem.remove(),this._pageInfoElem=null),t.removeClass("oj-filmstrip-item").unwrap().unwrap(),this._pagesWrapper=null,this._contentWrapper&&(t.unwrap(),this._contentWrapper=null),e.removeClass("oj-filmstrip-container oj-filmstrip-vertical")},_createPageInfoElem:function(){var e=t(document.createElement("div"));return e.uniqueId(),e.addClass("oj-helper-hidden-accessible oj-filmstrip-liveregion"),e.attr({role:"region","aria-live":"polite","aria-atomic":"true"}),e},_updatePageInfoElem:function(){var e=this._pagingModel,t=e.getPage(),i=e.getPageCount(),s=o(this.getTranslatedString("labelAccFilmStrip",{pageIndex:t+1,pageCount:i})),n=this._pageInfoElem;n&&n.attr("aria-label",s)},_setupNavArrowsHoverable:function(){this.element.on("mouseenter"+this.navArrowHoverableEventNamespace,(function(e){t(e.currentTarget).hasClass("oj-disabled")||t(e.currentTarget).addClass("oj-filmstrip-hover")})).on("mouseleave"+this.navArrowHoverableEventNamespace,(function(e){t(e.currentTarget).removeClass("oj-filmstrip-hover")}))},_tearDownNavArrowsHoverable:function(){this.element.off(this.navArrowHoverableEventNamespace)},_navArrowsShownOnHover:function(){var e=this.options,t=e.arrowVisibility;return"hover"===t||"auto"===t&&"overlay"===e.arrowPlacement},_hasPrevPage:function(){return this._pagingModel.getPage()>0},_hasNextPage:function(){var e=this._pagingModel;return e.getPage()<e.getPageCount()-1},_prevPage:function(){var e=this._pagingModel;if(this._hasPrevPage())e.setPage(e.getPage()-1);else{var t=e.getPageCount();this._isLoopingPage()&&t>1&&e.setPage(t-1,{loopDirection:"prev"})}},_nextPage:function(){var e=this._pagingModel;if(this._hasNextPage())e.setPage(e.getPage()+1);else{var t=e.getPageCount();this._isLoopingPage()&&t>1&&e.setPage(0,{loopDirection:"next"})}},_displayNavigationArrow:function(e,t){"adjacent"===this.options.arrowPlacement?t.css("visibility",e?"":"hidden"):t.parent().css("display",e?"":"none")},_updateNavigationArrowsDisplay:function(){if("hidden"!==this.options.arrowVisibility){var e=this._pagingModel,t=e.getPage(),i=e.getPageCount(),s=this._isLoopingPage()&&i>1;this._displayNavigationArrow(s||0!==t,this._prevButton),this._displayNavigationArrow(s||t!==i-1,this._nextButton)}},_createPrevNavArrow:function(){var e=this.element,t=this._isHorizontal()?"oj-start":"oj-top",i=this._createNavigationArrowContainer(t);"overlay"===this.options.arrowPlacement?e.append(i):e.prepend(i);var s=o(this.getTranslatedString("labelAccArrowPreviousPage")),n=o(this.getTranslatedString("tipArrowPreviousPage")),r=this._createNavigationArrow(i,t,s,n),a=this;return r.on("click",(function(){a._prevPage()})),r},_createNextNavArrow:function(){var e=this.element,t=this._isHorizontal()?"oj-end":"oj-bottom",i=this._createNavigationArrowContainer(t);e.append(i);var s=o(this.getTranslatedString("labelAccArrowNextPage")),n=o(this.getTranslatedString("tipArrowNextPage")),r=this._createNavigationArrow(i,t,s,n),a=this;return r.on("click",(function(){a._nextPage()})),r},_createNavigationArrowContainer:function(e){var i=t(document.createElement("div"));return i.addClass("oj-filmstrip-arrow-container "+e),"overlay"===this.options.arrowPlacement&&(i.addClass("oj-filmstrip-arrow-container-overlay"),this._navArrowsShownOnHover()&&i.addClass("oj-filmstrip-arrow-transition")),i},_createNavigationArrow:function(e,t,i,s){var n="<div class='oj-filmstrip-arrow oj-default oj-enabled "+t+"' role='button' tabindex='-1'";n+="><span class='oj-filmstrip-arrow-icon "+t+" oj-component-icon'></span></div>",e.append(n);var r=e.children(".oj-filmstrip-arrow").eq(0);r.uniqueId();var a=r.attr("id");i&&r.attr("aria-label",i),s&&r.attr("title",s);var o=this._pageInfoElem.attr("id");return r.attr("aria-labelledby",o+" "+a),this._AddHoverable(r),this._AddActiveable(r),"adjacent"===this.options.arrowPlacement&&this._navArrowsShownOnHover()&&r.addClass("oj-filmstrip-arrow-transition"),r},_getItemContainers:function(){return this._pagesWrapper.find(".oj-filmstrip-item-container").filter(this._filterNestedFilmStripsFunc)},_getItems:function(){return this._pagesWrapper.find(".oj-filmstrip-item").filter(this._filterNestedFilmStripsFunc)},_getPages:function(){return this._pagesWrapper.children(".oj-filmstrip-page")},_clearCalculatedSizes:function(){var e=this._pagesWrapper;this._getPages().css("flex-basis","").css("-webkit-flex-basis",""),this._getItemContainers().css("flex-basis","").css("-webkit-flex-basis",""),e.css(this._getCssSizeAttr(),"")},_adjustSizes:function(e){this._clearCalculatedSizes();var i=this.options,n=this._isHorizontal(),r=i.maxItemsPerPage,a=r<1,o=this.element,l=this._getItemContainers();if(this._itemSize<0){var h=this._getItemIndex(i.currentItem),u=t(l[h]),p=u.children(".oj-filmstrip-item");p.css("display",""),s.subtreeShown(p[0]),this._itemSize=n?u.width():u.height()}var d=n?o.width():o.height();if("hidden"!==i.arrowVisibility&&"adjacent"===i.arrowPlacement){var c=o.children(".oj-filmstrip-arrow-container").eq(0);d-=2*(n?c.width():c.height())}if(this._componentSize=d,!a){var g=Math.max(Math.floor(d/this._itemSize),1);g<r&&(r=g)}var _=a?Math.max(Math.floor(d/this._itemSize),1):r,m=d/_;l.css("flex-basis",m+"px").css("-webkit-flex-basis",m+"px");var f=Math.ceil(l.length/_),v=this._getPages(),P=!1,b=this._pagingModel;if(b.getPageCount()!==f||this._itemsPerPage!==_||!v||v.length<1){var w;if(P=!0,e)for(w=0;w<l.length;w++)s.subtreeDetached(l[w]);for(v&&v.length>0&&l.unwrap(),w=0;w<l.length;w+=_){l.slice(w,w+_).wrapAll("<div class='oj-filmstrip-container oj-filmstrip-page' aria-hidden='true'></div>").parent().css("display","none")}if(e)for(w=0;w<l.length;w++)s.subtreeAttached(l[w])}(v=this._getPages()).css("flex-basis",d+"px").css("-webkit-flex-basis",d+"px");var S=this._pagesWrapper,y=this._contentWrapper;S.css(this._getCssSizeAttr(),d),y&&y.css(this._getCssSizeAttr(),d);var j=0;if(i.currentItem&&(j=this._findPage(i.currentItem,_)),b.getPageCount()!==f||this._itemsPerPage!==_||b.getPage()!==j)b.setPage(j,{pageSize:_});else if(P){var F=b.getPage();this._handlePage({previousPage:F,page:F})}},_handlePage:function(e){var i=e.page,s=e.loopDirection,n=e.previousPage,r=this._pagesWrapper,a=this._getPages(),o=this._pagingModel,l=o.getPageSize(),h=o.getPageCount(),u=n<0||n===i||this._itemsPerPage!==l,p=this._isLoopingPage();this._itemsPerPage=l;var d=null;u||(d=t(a[n]));var c=this._getCssPositionAttr(),g=t(a[i]),_=g.is(":hidden");_&&this._unhidePage(g);var m,f=this._bDragInit;if(n>-1&&!u){m=i>n,p&&s&&(m="next"===s);var v=p&&!m&&h>1&&0===n,P=p&&m&&h>1&&n===h-1;f=!0,r.css(this._getCssSizeAttr(),2*this._componentSize),m||_&&r.css(c,-this._componentSize+"px"),m?(d.addClass("oj-filmstrip-transition-next-oldpage-from"),g.addClass("oj-filmstrip-transition-next-newpage-from"),P&&g.addClass("oj-filmstrip-transition-display-as-lastpage")):(d.addClass("oj-filmstrip-transition-prev-oldpage-from"),g.addClass("oj-filmstrip-transition-prev-newpage-from"),v&&g.addClass("oj-filmstrip-transition-display-as-firstpage"))}if(this._busyStateResolveFunc=this._addBusyState("scrolling"),f){var b=this,w=this._bDragInit;if(w&&n<0)a.filter(":visible").addClass("oj-filmstrip-transition");setTimeout((function(){b._finishHandlePage(i,n,m,u,w)}),25)}else this._finishHandlePage(i,n,m,u)},_finishHandlePage:function(e,i,s,n,o){var l=this._pagesWrapper;if(n||(this._bPageChangeTransition=!0,l.on("transitionend"+this.eventNamespace+" webkitTransitionEnd"+this.eventNamespace,this._handleTransitionEndFunc)),n)this._handleTransitionEnd();else{var h=this._getPages();if(o&&a(h),i>-1){var u=t(h[i]),p=t(h[e]);u.addClass("oj-filmstrip-transition"),p.addClass("oj-filmstrip-transition"),s?(u.removeClass("oj-filmstrip-transition-next-oldpage-from"),p.removeClass("oj-filmstrip-transition-next-newpage-from"),u.addClass("oj-filmstrip-transition-next-oldpage-to"),p.addClass("oj-filmstrip-transition-next-newpage-to")):(u.removeClass("oj-filmstrip-transition-prev-oldpage-from"),p.removeClass("oj-filmstrip-transition-prev-newpage-from"),u.addClass("oj-filmstrip-transition-prev-oldpage-to"),p.addClass("oj-filmstrip-transition-prev-newpage-to"))}else if(o){r(h.filter(":visible"),"translate3d(0, 0, 0)")}}},_handleTransitionEnd:function(){this._bPageChangeTransition=!1;var i=this._pagesWrapper,s=this._getCssPositionAttr();i.off(this.eventNamespace).css(this._getCssSizeAttr(),this._componentSize).css(s,"0px");var n=null;(e.FocusUtils.containsFocus(i[0])||this._nextButton&&e.FocusUtils.containsFocus(this._nextButton[0])||this._prevButton&&e.FocusUtils.containsFocus(this._prevButton[0]))&&(n=document.activeElement);for(var r=this._pagingModel.getPage(),o=this._getPages(),l=0;l<o.length;l++)l!==r&&this._hidePage(t(o[l]));if(o.removeClass("oj-filmstrip-transition oj-filmstrip-transition-next-oldpage-to oj-filmstrip-transition-next-newpage-to oj-filmstrip-transition-prev-oldpage-to oj-filmstrip-transition-prev-newpage-to oj-filmstrip-transition-display-as-firstpage oj-filmstrip-transition-display-as-lastpage"),a(o),this._updateNavigationArrowsDisplay(),n&&t(n).is(":hidden")){var h=this.element,u=e.FocusUtils.getFirstTabStop(o[r]);u?e.FocusUtils.focusElement(u):e.FocusUtils.focusElement(h[0])}var p=this.options;if(this._findPage(p.currentItem)!==r){var d=this._getFirstItemOnPage(r);d&&this.option("currentItem",d,{_context:{writeback:!0}})}this._deferredHandleResize&&(this._deferredHandleResize=!1,this._handleResize()),this._updatePageInfoElem(),this._resolveBusyState()},_getItemIndex:function(t){var i=-1;if(t){var s=this._getItems();if(t.id&&e.DomUtils.isValidIdentifier(t.id))for(var n=0;n<s.length;n++){var r=s[n].id;if(r&&r.length>0&&r===t.id){i=n;break}}else null!=t.index&&t.index>=0&&t.index<s.length&&(i=t.index)}return i},_convertItemToObj:function(e){var t=null;return"object"==typeof e?t=e:"number"==typeof e?t={index:e}:"string"==typeof e&&(t={id:e}),t},_populateItemObj:function(e){if(e&&this._pagingModel.getPage()>=0){var t=this._getItemIndex(e);if(e.index=t,null==e.id&&-1!==t){var i=this._getItems();e.id=i[t].id}}},_findPage:function(e,t){var i=this._getItemIndex(e),s=-1;return i>-1&&(void 0===t&&(t=this._itemsPerPage),s=Math.floor(i/t)),s},_getFirstItemOnPage:function(e,t,i){var s=this._pagingModel;if(void 0===t&&(t=s.getPageCount()),e>=0&&e<t){var n=this._getItems();void 0===i&&(i=this._itemsPerPage);var r=e*i;if(r<n.length)return{id:n[r].id,index:r}}return null},_hidePage:function(e){s.subtreeHidden(e[0]),e.css("display","none").attr("aria-hidden","true"),e.find(".oj-filmstrip-item").filter(this._filterNestedFilmStripsFunc).css("display","none")},_unhidePage:function(e){e.css("display","").removeAttr("aria-hidden"),e.find(".oj-filmstrip-item").filter(this._filterNestedFilmStripsFunc).css("display",""),s.subtreeShown(e[0])},_addKeyListeners:function(){this.element.on("keydown"+this.keyEventNamespace,this._handleKeyDownFunc)},_removeKeyListeners:function(){this.element.off(this.keyEventNamespace)},_addMouseListeners:function(){this.element.on("mousedown"+this.mouseEventNamespace,this._handleMouseDownFunc).on("mousemove"+this.mouseEventNamespace,this._handleMouseMoveFunc).on("mouseup"+this.mouseEventNamespace,this._handleMouseUpFunc)},_removeMouseListeners:function(){this.element.off(this.mouseEventNamespace)},_addTouchListeners:function(){var e=this.element;if(this._IsCustomElement()){var i=function(e){return function(i){e(t.Event(i))}};this._delegatedHandleTouchStartFunc=i(this._handleTouchStartFunc),this._delegatedHandleTouchMoveFunc=i(this._handleTouchMoveFunc),e[0].addEventListener("touchstart",this._delegatedHandleTouchStartFunc,{passive:!0}),e[0].addEventListener("touchmove",this._delegatedHandleTouchMoveFunc,{passive:!1}),e.on("touchend"+this.touchEventNamespace,this._handleTouchEndFunc).on("touchcancel"+this.touchEventNamespace,this._handleTouchEndFunc)}else e.on("touchstart"+this.touchEventNamespace,this._handleTouchStartFunc).on("touchmove"+this.touchEventNamespace,this._handleTouchMoveFunc).on("touchend"+this.touchEventNamespace,this._handleTouchEndFunc).on("touchcancel"+this.touchEventNamespace,this._handleTouchEndFunc)},_removeTouchListeners:function(){this.element.off(this.touchEventNamespace)},_handleKeyDown:function(e){var i=this._pagingModel,s=i.getPage(),n=i.getPageCount(),r=-2;switch(e.keyCode){case t.ui.keyCode.RIGHT:r=this._bRTL?s-1:s+1;break;case t.ui.keyCode.LEFT:r=this._bRTL?s+1:s-1;break;case t.ui.keyCode.DOWN:r=s+1;break;case t.ui.keyCode.UP:r=s-1;break;case t.ui.keyCode.HOME:r=0;break;case t.ui.keyCode.END:r=n-1;break;default:return}if(r>-1&&r<n)i.setPage(r);else if(this._isLoopingPage()&&n>1){var a={};r===n&&(r=0,a.loopDirection="next"),-1===r&&(r=n-1,a.loopDirection="prev"),i.setPage(r,a)}e.preventDefault()},_handleMouseDown:function(e){var t=e.originalEvent;this._dragScrollStart(t)},_handleMouseMove:function(e){var t=e.originalEvent;this._dragScrollMove(e,t)},_handleMouseUp:function(e){this._dragScrollEnd()},_handleTouchStart:function(e){var t=e.originalEvent.touches;if(1===t.length){var i=t[0];this._dragScrollStart(i)}},_handleTouchMove:function(e){var t=e.originalEvent.touches[0];this._dragScrollMove(e,t),(this._bTouch||this._scrolledForThisTouch)&&e.preventDefault()},_handleTouchEnd:function(e){this._dragScrollEnd()},_dragScrollStart:function(e){if(this._pagingModel.getPageCount()>1&&!this._bPageChangeTransition){this._bTouch=!0,this._bDragInit=!1,this._bFirstToLast=!1,this._bLastToFirst=!1;var t=this._isHorizontal();this._touchStartCoord=t?e.pageX:e.pageY,this._touchStartCoord2=t?e.pageY:e.pageX}},_initDragScroll:function(e,i,s){var n=this._isHorizontal();this._touchStartCoord=n?e.pageX:e.pageY,this._touchStartCoord2=n?e.pageY:e.pageX;var r=this._getCssPositionAttr(),a=this._pagesWrapper,o=this._pagingModel,l=o.getPage(),h=o.getPageCount(),u=this._getPages(),p=1;i||s?(i&&(this._unhidePage(t(u[h-1])),a.css(r,-this._componentSize+"px"),p+=1,t(u[h-1]).addClass("oj-filmstrip-transition-display-as-firstpage")),s&&(this._unhidePage(t(u[0])),p+=1,t(u[0]).addClass("oj-filmstrip-transition-display-as-lastpage"))):(l>0&&(this._unhidePage(t(u[l-1])),a.css(r,-this._componentSize+"px"),p+=1),l<h-1&&(this._unhidePage(t(u[l+1])),p+=1)),p>1&&a.css(this._getCssSizeAttr(),p*this._componentSize),this._touchStartScroll=parseInt(a.css(r),10)},_dragScrollMove:function(e,i){if(this._bTouch){var s=this._isHorizontal(),n=(s?i.pageX:i.pageY)-this._touchStartCoord,a=(s?i.pageY:i.pageX)-this._touchStartCoord2,o=s&&this._bRTL?n>0:n<0,l=this._pagingModel,h=l.getPage(),u=l.getPageCount(),p=this._isLoopingPage(),d=p&&!o&&u>1&&0===h,c=p&&o&&u>1&&h===u-1;if(!this._bDragInit)return Math.abs(a)>Math.abs(n)&&(this._bTouch=!1,this._scrolledForThisTouch=!1),Math.abs(n)>3&&(this._initDragScroll(i,d,c),this._bDragInit=!0),this._bFirstToLast=d,void(this._bLastToFirst=c);if(d===this._bFirstToLast&&c===this._bLastToFirst||(this._dragScrollResetPages(),this._initDragScroll(i,d,c),this._bFirstToLast=d,this._bLastToFirst=c),o&&h<l.getPageCount()-1||!o&&h>0||p){var g=this.element[0],_=Math.min(.33*(s?g.offsetWidth:g.offsetHeight),100),m=this._getCssPositionAttr(),f=this._pagesWrapper,v=this._getPages();if(Math.abs(n)>=_){var P,b,w={};if(d||c?(d?(P=u-1,b=u>2?1:-1):c&&(P=0,b=u>2?u-2:-1),w.loopDirection=o?"next":"prev"):(P=o?h+1:h-1,b=o?h-1:h+1),b>-1&&b<l.getPageCount()&&this._hidePage(t(v[b])),o&&b>-1&&!c){var S=parseInt(f.css(m),10);f.css(m,S+this._componentSize+"px")}f.css(this._getCssSizeAttr(),2*this._componentSize),this._bTouch=!1,l.setPage(P,w)}else{var y=s?"translate3d("+n+"px, 0, 0)":"translate3d(0, "+n+"px, 0)";r(v.filter(":visible"),y)}this._scrolledForThisTouch=!0}this._scrolledForThisTouch&&(e.preventDefault(),e.stopPropagation())}},_dragScrollEnd:function(){if(this._bTouch&&this._bDragInit){var e=this._pagingModel.getPage();this._handlePage({previousPage:e,page:e})}this._bTouch=!1,this._bDragInit=!1,this._bFirstToLast=!1,this._bLastToFirst=!1,this._scrolledForThisTouch=!1},_dragScrollResetPages:function(){for(var e=this._pagesWrapper,i=this._getCssPositionAttr(),s=this._pagingModel,n=s.getPage(),r=s.getPageCount(),a=this._getPages(),o=0;o<a.length;o++)o!==n&&this._hidePage(t(a[o]));e.css(i,"0px"),t(a[0]).removeClass("oj-filmstrip-transition-display-as-lastpage"),t(a[r-1]).removeClass("oj-filmstrip-transition-display-as-firstpage")},_addBusyState:function(e){var t=this.element,s=i.getContext(t[0]).getBusyContext(),n="FilmStrip";n+=" (id='"+t.attr("id")+"')";var r={description:n+=": "+e};return s.addBusyState(r)},_resolveBusyState:function(){this._busyStateResolveFunc&&(this._busyStateResolveFunc(),this._busyStateResolveFunc=null)},getNodeBySubId:function(e){if(null==e)return this.element?this.element[0]:null;var t=e.subId;return"oj-filmstrip-start-arrow"===t?this.widget().find(".oj-filmstrip-arrow.oj-start").filter(this._filterNestedFilmStripsFunc)[0]:"oj-filmstrip-end-arrow"===t?this.widget().find(".oj-filmstrip-arrow.oj-end").filter(this._filterNestedFilmStripsFunc)[0]:"oj-filmstrip-top-arrow"===t?this.widget().find(".oj-filmstrip-arrow.oj-top").filter(this._filterNestedFilmStripsFunc)[0]:"oj-filmstrip-bottom-arrow"===t?this.widget().find(".oj-filmstrip-arrow.oj-bottom").filter(this._filterNestedFilmStripsFunc)[0]:null},getSubIdByNode:function(e){for(var t=this.getNodeBySubId({subId:"oj-filmstrip-start-arrow"}),i=this.getNodeBySubId({subId:"oj-filmstrip-end-arrow"}),s=this.getNodeBySubId({subId:"oj-filmstrip-top-arrow"}),n=this.getNodeBySubId({subId:"oj-filmstrip-bottom-arrow"}),r=e,a=this.element[0];r&&r!==a;){if(r===t)return{subId:"oj-filmstrip-start-arrow"};if(r===i)return{subId:"oj-filmstrip-end-arrow"};if(r===s)return{subId:"oj-filmstrip-top-arrow"};if(r===n)return{subId:"oj-filmstrip-bottom-arrow"};r=r.parentElement}return null},_CompareOptionValues:function(t,i,s){return"currentItem"===t?e.Object.compareValues(i,s):this._super(t,i,s)}})}(),r.extension._WIDGET_NAME="ojFilmStrip",e.CustomElementBridge.register("oj-film-strip",{metadata:r})}));
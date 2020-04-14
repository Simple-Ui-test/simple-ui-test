/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","hammerjs","ojs/ojcontext","ojs/ojthemeutils","ojs/ojcomponentcore","ojs/ojlogger","ojs/ojjquery-hammer"],(function(a,s,t,n,f,e,i){"use strict";a.OffcanvasUtils={};var r=a.OffcanvasUtils;return a.OffcanvasUtils._DATA_EDGE_KEY="oj-offcanvasEdge",a.OffcanvasUtils._DATA_OFFCANVAS_KEY="oj-offcanvas",a.OffcanvasUtils._DATA_MEDIA_QUERY_KEY="oj-mediaQueryListener",a.OffcanvasUtils._DATA_HAMMER_KEY="oj-offcanvasHammer",a.OffcanvasUtils.SELECTOR_KEY="selector",a.OffcanvasUtils.CONTENT_KEY="content",a.OffcanvasUtils.EDGE_START="start",a.OffcanvasUtils.EDGE_END="end",a.OffcanvasUtils.EDGE_TOP="top",a.OffcanvasUtils.EDGE_BOTTOM="bottom",a.OffcanvasUtils.DISPLAY_MODE_KEY="displayMode",a.OffcanvasUtils.DISPLAY_MODE_PUSH="push",a.OffcanvasUtils.DISPLAY_MODE_OVERLAY="overlay",a.OffcanvasUtils.DISPLAY_MODE_REFLOW="reflow",a.OffcanvasUtils.MODALITY_KEY="modality",a.OffcanvasUtils.MODALITY_NONE="none",a.OffcanvasUtils.MODALITY_MODAL="modal",a.OffcanvasUtils.DISMISS_HANDLER_KEY="_dismissHandler",a.OffcanvasUtils.OPEN_PROMISE_KEY="_openPromise",a.OffcanvasUtils.CLOSE_PROMISE_KEY="_closePromise",a.OffcanvasUtils.GLASS_PANE_KEY="_glassPane",a.OffcanvasUtils.SURROGATE_KEY="_surrogate",a.OffcanvasUtils.ANIMATE_WRAPPER_KEY="_animateWrapper",a.OffcanvasUtils.ANIMATE_KEY="_animate",a.OffcanvasUtils.SURROGATE_ATTR="data-oj-offcanvas-surrogate-id",a.OffcanvasUtils.OUTER_WRAPPER_SELECTOR="oj-offcanvas-outer-wrapper",a.OffcanvasUtils.OPEN_SELECTOR="oj-offcanvas-open",a.OffcanvasUtils.TRANSITION_SELECTOR="oj-offcanvas-transition",a.OffcanvasUtils.REFLOW_WRAPPER_SELECTOR="oj-offcanvas-pin",a.OffcanvasUtils.REFLOW_TRANSITION_SELECTOR="oj-offcanvas-pin-transition",a.OffcanvasUtils.GLASSPANE_SELECTOR="oj-offcanvas-glasspane",a.OffcanvasUtils.GLASSPANE_DIM_SELECTOR="oj-offcanvas-glasspane-dim",a.OffcanvasUtils.VETO_BEFOREOPEN_MSG="ojbeforeopen veto",a.OffcanvasUtils.VETO_BEFORECLOSE_MSG="ojbeforeclose veto",a.OffcanvasUtils._shiftSelector={start:"oj-offcanvas-shift-start",end:"oj-offcanvas-shift-end",top:"oj-offcanvas-shift-down",bottom:"oj-offcanvas-shift-up"},a.OffcanvasUtils._drawerSelector={start:"oj-offcanvas-start",end:"oj-offcanvas-end",top:"oj-offcanvas-top",bottom:"oj-offcanvas-bottom"},a.OffcanvasUtils._getDisplayMode=function(s){var t=s[a.OffcanvasUtils.DISPLAY_MODE_KEY];return t!==a.OffcanvasUtils.DISPLAY_MODE_OVERLAY&&t!==a.OffcanvasUtils.DISPLAY_MODE_PUSH&&t!==a.OffcanvasUtils.DISPLAY_MODE_REFLOW&&(t=(f.parseJSONFromFontFamily("oj-offcanvas-option-defaults")||{}).displayMode),t},a.OffcanvasUtils._getDrawer=function(t){return s(t[a.OffcanvasUtils.SELECTOR_KEY])},a.OffcanvasUtils._isModal=function(s){return s[a.OffcanvasUtils.MODALITY_KEY]===a.OffcanvasUtils.MODALITY_MODAL},a.OffcanvasUtils._isOpen=function(s){return s.hasClass(a.OffcanvasUtils.OPEN_SELECTOR)},a.OffcanvasUtils._getOuterWrapper=function(s){return s.closest("."+a.OffcanvasUtils.OUTER_WRAPPER_SELECTOR)},a.OffcanvasUtils._getAnimateWrapper=function(s){var t=a.OffcanvasUtils._getDrawer(s);return a.OffcanvasUtils._noInnerWrapper(s)||s[a.OffcanvasUtils.DISPLAY_MODE_KEY]===a.OffcanvasUtils.DISPLAY_MODE_OVERLAY?t:s[a.OffcanvasUtils.ANIMATE_WRAPPER_KEY]?t.closest("."+s[a.OffcanvasUtils.ANIMATE_WRAPPER_KEY]):t.parent()},a.OffcanvasUtils._getShiftSelector=function(s){var t=a.OffcanvasUtils._shiftSelector[s];if(!t)throw new Error("Invalid edge: "+s);return t},a.OffcanvasUtils._isRTL=function(){return"rtl"===a.DomUtils.getReadingDirection()},a.OffcanvasUtils._setTransform=function(a,s){a.css({"-webkit-transform":s,transform:s})},a.OffcanvasUtils._getTranslationX=function(s,t,n){var f=s===a.OffcanvasUtils.EDGE_END;return(a.OffcanvasUtils._isRTL()||n)&&(f=!f),"translate3d("+(f?"-":"")+t+", 0, 0)"},a.OffcanvasUtils._setTranslationX=function(s,t,n){a.OffcanvasUtils._setTransform(s,a.OffcanvasUtils._getTranslationX(t,n,!1))},a.OffcanvasUtils._getTranslationY=function(s,t){return"translate3d(0, "+(s===a.OffcanvasUtils.EDGE_BOTTOM?"-":"")+t+", 0)"},a.OffcanvasUtils._setTranslationY=function(s,t,n){a.OffcanvasUtils._setTransform(s,a.OffcanvasUtils._getTranslationY(t,n))},a.OffcanvasUtils._getTranslationY2=function(a,s){return"translate3d(0, "+(s?"-":"")+a+", 0)"},a.OffcanvasUtils._setAnimateClass=function(s,t,n,f,e){t.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._setTransform(t,f),n.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._setTransform(n,e)},a.OffcanvasUtils._saveEdge=function(t){var n=t.edge,f=a.OffcanvasUtils._getDrawer(t);return n&&n.length||(n=f.hasClass("oj-offcanvas-start")?a.OffcanvasUtils.EDGE_START:f.hasClass("oj-offcanvas-end")?a.OffcanvasUtils.EDGE_END:f.hasClass("oj-offcanvas-top")?a.OffcanvasUtils.EDGE_TOP:f.hasClass("oj-offcanvas-bottom")?a.OffcanvasUtils.EDGE_BOTTOM:a.OffcanvasUtils.EDGE_START),s.data(f[0],a.OffcanvasUtils._DATA_EDGE_KEY,n),n},a.OffcanvasUtils._getEdge=function(t){return s.data(t[0],a.OffcanvasUtils._DATA_EDGE_KEY)},a.OffcanvasUtils._toggleClass=function(s,t,n){var f=s[a.OffcanvasUtils.DISPLAY_MODE_KEY],e=a.OffcanvasUtils._getDrawer(s),i=a.OffcanvasUtils.OPEN_SELECTOR,r=f===a.OffcanvasUtils.DISPLAY_MODE_OVERLAY?a.OffcanvasUtils.TRANSITION_SELECTOR+" oj-offcanvas-overlay":a.OffcanvasUtils.TRANSITION_SELECTOR;if(n)e.addClass(i),void 0===s[a.OffcanvasUtils.ANIMATE_KEY]&&t.addClass(r);else{s.makeFocusable&&a.DomUtils.makeFocusable({element:e,remove:!0});var l=s.tabindex;void 0===l?e.removeAttr("tabindex"):e.attr("tabindex",l),e.removeClass(i),t.removeClass(r)}},a.OffcanvasUtils._setFocus=function(s){var t,n=s,f=a.OffcanvasUtils._getDrawer(n),e=f.find("[autofocus]");if(0===e.length&&(e=f.find(":tabbable")),0===e.length){var i=f.attr("tabindex");void 0!==i&&(n.tabindex=i),f.attr("tabindex","-1"),t=f,a.DomUtils.makeFocusable({element:f,applyHighlight:!0}),n.makeFocusable=!0}else t=e[0];a.FocusUtils.focusElement(t)},a.OffcanvasUtils._isAutoDismiss=function(a){return"none"!==a.autoDismiss},a.OffcanvasUtils._calcTransitionTime=function(a){for(var s=a.css("transitionProperty").split(","),t=a.css("transitionDelay").split(","),n=a.css("transitionDuration").split(","),f=0,e=0;e<s.length;e++){var i=n[e%n.length],r=i.indexOf("ms")>-1?parseFloat(i):1e3*parseFloat(i);if(r>0){var l=t[e%t.length],o=l.indexOf("ms")>-1?parseFloat(l):1e3*parseFloat(l);f=Math.max(f,o+r)}}return f+100},a.OffcanvasUtils._onTransitionEnd=function(s,t){var n,f="transitionend.oc webkitTransitionEnd.oc",e=function(){n&&(clearTimeout(n),n=void 0),s.off(f,e),t(s)};s.on(f,e),n=setTimeout(e,a.OffcanvasUtils._calcTransitionTime(s))},a.OffcanvasUtils._closeWithCatch=function(s){a.OffcanvasUtils.close(s).catch((function(a){i.warn("Offcancas close failed: "+a)}))},a.OffcanvasUtils._registerCloseHandler=function(t){var n=t;if(a.OffcanvasUtils._unregisterCloseHandler(n),a.OffcanvasUtils._isAutoDismiss(n)){var f=a.OffcanvasUtils._getDrawer(n),e=function(t){var e=t.target;a.DomUtils.isChromeEvent(t)||"focus"===t.type&&!s(e).is(":focusable")||(null!=s.data(f[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY)?a.DomUtils.isLogicalAncestorOrSelf(f[0],e)||a.OffcanvasUtils._closeWithCatch(n):a.OffcanvasUtils._unregisterCloseHandler(n))};n[a.OffcanvasUtils.DISMISS_HANDLER_KEY]=e;var i=document.documentElement;a.DomUtils.isTouchSupported()&&i.addEventListener("touchstart",e,{passive:!0,capture:!0}),i.addEventListener("mousedown",e,!0),i.addEventListener("focus",e,!0)}a.OffcanvasUtils._registerSwipeHandler(n)},a.OffcanvasUtils._unregisterCloseHandler=function(s){var t=s,n=t[a.OffcanvasUtils.DISMISS_HANDLER_KEY];if(n){var f=document.documentElement;a.DomUtils.isTouchSupported()&&f.removeEventListener("touchstart",n,{passive:!0,capture:!0}),f.removeEventListener("mousedown",n,!0),f.removeEventListener("focus",n,!0),delete t[a.OffcanvasUtils.DISMISS_HANDLER_KEY],t[a.OffcanvasUtils.DISMISS_HANDLER_KEY]=null}a.OffcanvasUtils._unregisterSwipeHandler(t)},a.OffcanvasUtils._registerSwipeHandler=function(n){if(a.DomUtils.isTouchSupported()){var f,e,i,r=n,l=r[a.OffcanvasUtils.SELECTOR_KEY],o=s(l),c=a.OffcanvasUtils._getEdge(o);c===a.OffcanvasUtils.EDGE_START&&!a.OffcanvasUtils._isRTL()||c===a.OffcanvasUtils.EDGE_END&&a.OffcanvasUtils._isRTL()?(e={recognizers:[[t.Swipe,{direction:t.DIRECTION_LEFT}]]},f="swipeleft"):c===a.OffcanvasUtils.EDGE_START&&a.OffcanvasUtils._isRTL()||c===a.OffcanvasUtils.EDGE_END&&!a.OffcanvasUtils._isRTL()?(e={recognizers:[[t.Swipe,{direction:t.DIRECTION_RIGHT}]]},f="swiperight"):c===a.OffcanvasUtils.EDGE_TOP?(e={recognizers:[[t.Swipe,{direction:t.DIRECTION_UP}]]},f="swipeup"):c===a.OffcanvasUtils.EDGE_BOTTOM&&(e={recognizers:[[t.Swipe,{direction:t.DIRECTION_DOWN}]]},f="swipedown"),i=o.ojHammer(e).on(f,(function(s){s.target===o[0]&&(s.preventDefault(),a.OffcanvasUtils._closeWithCatch(r))})),s.data(s(l)[0],a.OffcanvasUtils._DATA_HAMMER_KEY,{event:f,hammer:i})}},a.OffcanvasUtils._unregisterSwipeHandler=function(t){var n=a.OffcanvasUtils._getDrawer(t);if(n.length>0){var f=s.data(n[0],a.OffcanvasUtils._DATA_HAMMER_KEY);f&&f.hammer.off(f.event)}},a.OffcanvasUtils._isFixed=function(s){return a.OffcanvasUtils._getOuterWrapper(s).hasClass("oj-offcanvas-page")},a.OffcanvasUtils._isReflow=function(s){return s[a.OffcanvasUtils.DISPLAY_MODE_KEY]===a.OffcanvasUtils.DISPLAY_MODE_REFLOW},a.OffcanvasUtils._noInnerWrapper=function(s){return s[a.OffcanvasUtils.CONTENT_KEY]||a.OffcanvasUtils._isFixed(a.OffcanvasUtils._getDrawer(s))||a.OffcanvasUtils._isReflow(s)},a.OffcanvasUtils._toggleOuterWrapper=function(t,n,f){var e=a.OffcanvasUtils._getEdge(n),i=a.OffcanvasUtils._getShiftSelector(e),r=a.OffcanvasUtils._getOuterWrapper(n);a.Assert.assertPrototype(r,s);var l=r.hasClass(i);return f||r.toggleClass(i,!l),l},a.OffcanvasUtils._afterCloseHandler=function(t){var n=a.OffcanvasUtils._getAnimateWrapper(t);if(""===n.get(0).style.transform){a.OffcanvasUtils._unregisterCloseHandler(t);var f=a.OffcanvasUtils._getDrawer(t),e=a.OffcanvasUtils._isReflow(t),i=null;try{i=s.data(f[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY)}catch(a){}i===t&&(e?f.removeClass(a.OffcanvasUtils.OPEN_SELECTOR+" "+a.OffcanvasUtils.REFLOW_TRANSITION_SELECTOR):a.OffcanvasUtils._toggleClass(t,n,!1),a.OffcanvasUtils._removeModality(t),e&&a.OffcanvasUtils._getOuterWrapper(f).removeClass(a.OffcanvasUtils.REFLOW_WRAPPER_SELECTOR),f.trigger("ojclose",t),s.removeData(f[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY))}},a.OffcanvasUtils._setVisible=function(t,n,f){var e=s(t),i=!!n;i&&a.OffcanvasUtils._isOpen(e)&&a.OffcanvasUtils._close(t,!1),e.toggleClass(a.OffcanvasUtils._drawerSelector[f],!i)},a.OffcanvasUtils.setupResponsive=function(t){var n=t.query;if(null!==n){var f=t[a.OffcanvasUtils.SELECTOR_KEY],e=window.matchMedia(n),i=a.OffcanvasUtils._saveEdge(t),r=function(s){a.OffcanvasUtils._setVisible(f,s.matches,i)};e.addListener(r),a.OffcanvasUtils._setVisible(f,e.matches,i),s.data(s(f)[0],a.OffcanvasUtils._DATA_MEDIA_QUERY_KEY,{mqList:e,mqListener:r})}},a.OffcanvasUtils.tearDownResponsive=function(t){var n=a.OffcanvasUtils._getDrawer(t),f=s.data(n[0],a.OffcanvasUtils._DATA_MEDIA_QUERY_KEY);f&&(f.mqList.removeListener(f.mqListener),s.removeData(n[0],a.OffcanvasUtils._DATA_MEDIA_QUERY_KEY))},a.OffcanvasUtils._openPush=function(t,n,f,e){var i=a.OffcanvasUtils._getDrawer(t),r=s(t[a.OffcanvasUtils.CONTENT_KEY]);a.Assert.assertPrototype(r,s);var l,o=!0,c=t.size,O=function(s){s.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),o?o=!1:(e!==a.OffcanvasUtils.EDGE_END&&e!==a.OffcanvasUtils.EDGE_BOTTOM||a.OffcanvasUtils._setFocus(t),i.trigger("ojopen",t),a.OffcanvasUtils._registerCloseHandler(t),n(!0))};i.addClass(a.OffcanvasUtils.OPEN_SELECTOR),window.setTimeout((function(){e===a.OffcanvasUtils.EDGE_START||e===a.OffcanvasUtils.EDGE_END?(void 0===c&&(c=i.outerWidth(!0)+"px"),l=a.OffcanvasUtils._getTranslationX(e,c,!1)):(void 0===c&&(c=i.outerHeight(!0)+"px"),a.OffcanvasUtils._setTransform(i,a.OffcanvasUtils._getTranslationY2(c,e===a.OffcanvasUtils.EDGE_TOP)),l=a.OffcanvasUtils._getTranslationY2(c,e!==a.OffcanvasUtils.EDGE_TOP)),window.setTimeout((function(){a.OffcanvasUtils._setAnimateClass(t,i,r,"translate3d(0, 0, 0)",l),a.OffcanvasUtils._toggleOuterWrapper(t,i,!1),a.OffcanvasUtils._onTransitionEnd(r,O),a.OffcanvasUtils._onTransitionEnd(i,O)}),0)}),0),a.OffcanvasUtils._applyModality(t,i),e!==a.OffcanvasUtils.EDGE_START&&e!==a.OffcanvasUtils.EDGE_TOP||a.OffcanvasUtils._setFocus(t)},a.OffcanvasUtils._openOverlay=function(s,t,n,f){var e=a.OffcanvasUtils._getDrawer(s);a.OffcanvasUtils._toggleClass(s,e,!0);var i=s.size;i&&(f===a.OffcanvasUtils.EDGE_START||f===a.OffcanvasUtils.EDGE_END?a.OffcanvasUtils._setTransform(e,a.OffcanvasUtils._getTranslationX(f,i,!0)):a.OffcanvasUtils._setTransform(e,a.OffcanvasUtils._getTranslationY(f,i))),window.setTimeout((function(){a.OffcanvasUtils._toggleOuterWrapper(s,e,!1)}),20),a.OffcanvasUtils._applyModality(s,e),f!==a.OffcanvasUtils.EDGE_START&&f!==a.OffcanvasUtils.EDGE_TOP||a.OffcanvasUtils._setFocus(s),a.OffcanvasUtils._onTransitionEnd(e,(function(){e.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),f!==a.OffcanvasUtils.EDGE_END&&f!==a.OffcanvasUtils.EDGE_BOTTOM||a.OffcanvasUtils._setFocus(s),e.trigger("ojopen",s),a.OffcanvasUtils._registerCloseHandler(s),t(!0)}))},a.OffcanvasUtils._closePush=function(t,n,f,e,i){var r=s(t[a.OffcanvasUtils.CONTENT_KEY]),l=!0,o=function(){l||(r.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._setTransform(r,""),a.OffcanvasUtils._afterCloseHandler(t),n(!0)),l=!1};a.OffcanvasUtils._setTransform(e,""),a.OffcanvasUtils._setTransform(r,""),a.OffcanvasUtils._toggleOuterWrapper(t,e,!1),a.OffcanvasUtils._isModal(t)&&t[a.OffcanvasUtils.GLASS_PANE_KEY].removeClass(a.OffcanvasUtils.GLASSPANE_DIM_SELECTOR),i?(r.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),e.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._onTransitionEnd(e,o),a.OffcanvasUtils._onTransitionEnd(r,o)):(l=!1,o())},a.OffcanvasUtils._closeOverlay=function(s,t,n,f,e){var i=function(){a.OffcanvasUtils._afterCloseHandler(s),t(!0)};a.OffcanvasUtils._toggleOuterWrapper(s,f,!1),a.OffcanvasUtils._isModal(s)&&s[a.OffcanvasUtils.GLASS_PANE_KEY].removeClass(a.OffcanvasUtils.GLASSPANE_DIM_SELECTOR),e?(f.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._onTransitionEnd(f,i)):i()},a.OffcanvasUtils._openOldDrawer=function(t,n,f,e,i){var r,l=a.OffcanvasUtils._getDrawer(t),o=a.OffcanvasUtils._getAnimateWrapper(t);a.Assert.assertPrototype(o,s),a.OffcanvasUtils._toggleClass(t,o,!0),e===a.OffcanvasUtils.EDGE_START||e===a.OffcanvasUtils.EDGE_END?(r=void 0===r?l.outerWidth(!0)+"px":r,i===a.OffcanvasUtils.DISPLAY_MODE_PUSH&&a.OffcanvasUtils._setTranslationX(o,e,r)):(r=void 0===r?l.outerHeight(!0)+"px":r,i===a.OffcanvasUtils.DISPLAY_MODE_PUSH&&a.OffcanvasUtils._setTranslationY(o,e,r)),window.setTimeout((function(){a.OffcanvasUtils._toggleOuterWrapper(t,l,!1)}),10),a.OffcanvasUtils._applyModality(t,l),e!==a.OffcanvasUtils.EDGE_START&&e!==a.OffcanvasUtils.EDGE_TOP||a.OffcanvasUtils._setFocus(t),a.OffcanvasUtils._onTransitionEnd(o,(function(){o.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),e!==a.OffcanvasUtils.EDGE_END&&e!==a.OffcanvasUtils.EDGE_BOTTOM||a.OffcanvasUtils._setFocus(t),l.trigger("ojopen",t),a.OffcanvasUtils._registerCloseHandler(t),n(!0)}))},a.OffcanvasUtils._closeOldDrawer=function(s,t,n,f,e){var i=s[a.OffcanvasUtils.DISPLAY_MODE_KEY],r=a.OffcanvasUtils._getAnimateWrapper(s),l=function(){a.OffcanvasUtils._afterCloseHandler(s),t(!0)};i===a.OffcanvasUtils.DISPLAY_MODE_PUSH&&a.OffcanvasUtils._setTransform(r,""),a.OffcanvasUtils._toggleOuterWrapper(s,f,!1),a.OffcanvasUtils._isModal(s)&&s[a.OffcanvasUtils.GLASS_PANE_KEY].removeClass(a.OffcanvasUtils.GLASSPANE_DIM_SELECTOR),e?(r.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._onTransitionEnd(r,l)):l()},a.OffcanvasUtils.open=function(t){var f,i=a.OffcanvasUtils._getDrawer(t),r=s.data(i[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY);if(r){if(r[a.OffcanvasUtils.CLOSE_PROMISE_KEY])return r[a.OffcanvasUtils.CLOSE_PROMISE_KEY];if(r[a.OffcanvasUtils.OPEN_PROMISE_KEY])return r[a.OffcanvasUtils.OPEN_PROMISE_KEY]}var l=!1,o=new Promise((function(e,r){a.Assert.assertPrototype(i,s);var o=a.OffcanvasUtils._saveEdge(t),c=s.Event("ojbeforeopen");if(i.trigger(c,t),!1===c.result)return r(a.OffcanvasUtils.VETO_BEFOREOPEN_MSG),void(l=!0);var O=a.OffcanvasUtils._getDisplayMode(t),v=a.OffcanvasUtils._isReflow(t);!v||o!==a.OffcanvasUtils.EDGE_TOP&&o!==a.OffcanvasUtils.EDGE_BOTTOM||(O=a.OffcanvasUtils.DISPLAY_MODE_PUSH);var _=s.extend({},t);if(_[a.OffcanvasUtils.DISPLAY_MODE_KEY]=O,s.data(i[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY,_),t[a.OffcanvasUtils.CONTENT_KEY]){if(!a.OffcanvasUtils._noInnerWrapper(t))throw new Error("Error: Both main content selector and the inner wrapper <div class='oj-offcanvas-inner-wrapper'> are provided. Please remove the inner wrapper.");var E=n.getContext(i[0]).getBusyContext();f=E.addBusyState({description:"The offcanvas selector ='"+t[a.OffcanvasUtils.SELECTOR_KEY]+"' doing the open animation."}),v||(O===a.OffcanvasUtils.DISPLAY_MODE_PUSH?a.OffcanvasUtils._openPush(_,e,r,o):a.OffcanvasUtils._openOverlay(_,e,r,o))}else a.OffcanvasUtils._openOldDrawer(_,e,r,o,O)}));if(o=o.then((function(a){return f&&f(),a}),(function(a){throw f&&f(),a})),!l){var c=s.data(i[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY);c&&(c[a.OffcanvasUtils.OPEN_PROMISE_KEY]=o,e.subtreeShown(i[0]))}return o},a.OffcanvasUtils.close=function(s){return a.OffcanvasUtils._close(s[a.OffcanvasUtils.SELECTOR_KEY],void 0===s[a.OffcanvasUtils.ANIMATE_KEY])},a.OffcanvasUtils._close=function(t,f){var i=s(t);a.Assert.assertPrototype(i,s);var r,l=s.data(i[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY);if(l&&l[a.OffcanvasUtils.CLOSE_PROMISE_KEY])return l[a.OffcanvasUtils.CLOSE_PROMISE_KEY];var o=!1,c=new Promise((function(e,c){if(a.OffcanvasUtils._isOpen(i)){t!==l[a.OffcanvasUtils.SELECTOR_KEY]&&e(!0),a.OffcanvasUtils._toggleOuterWrapper(l,i,!0)||e(!0);var O=s.Event("ojbeforeclose");if(i.trigger(O,l),!1===O.result)return c(a.OffcanvasUtils.VETO_BEFORECLOSE_MSG),void(o=!0);if(f){var v=n.getContext(i[0]).getBusyContext();r=v.addBusyState({description:"The offcanvas selector ='"+l[a.OffcanvasUtils.SELECTOR_KEY]+"' doing the close animation."})}var _=l[a.OffcanvasUtils.DISPLAY_MODE_KEY];l[a.OffcanvasUtils.CONTENT_KEY]?_===a.OffcanvasUtils.DISPLAY_MODE_PUSH?a.OffcanvasUtils._closePush(l,e,c,i,f):a.OffcanvasUtils._closeOverlay(l,e,c,i,f):a.OffcanvasUtils._closeOldDrawer(l,e,c,i,f)}else e(!0)}));return c=c.then((function(a){return r&&r(),a}),(function(a){throw r&&r(),a})),o||(l=s.data(i[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY))&&(l[a.OffcanvasUtils.CLOSE_PROMISE_KEY]=c,e.subtreeHidden(i[0])),c},a.OffcanvasUtils.toggle=function(t){var n=a.OffcanvasUtils._getDrawer(t);return a.Assert.assertPrototype(n,s),a.OffcanvasUtils._isOpen(n)?a.OffcanvasUtils.close(t):a.OffcanvasUtils.open(t)},a.OffcanvasUtils._addGlassPane=function(t){var n=s("<div>");return n.addClass(a.OffcanvasUtils.GLASSPANE_SELECTOR),n.attr("role","presentation"),n.attr("aria-hidden","true"),n.appendTo(t.parent()),n.on("keydown keyup keypress mousedown mouseup mouseover mouseout click focusin focus",(function(a){a.stopPropagation(),a.preventDefault()})),n},a.OffcanvasUtils._createSurrogate=function(t){var n,f=s("<span></span>").css("display","none").attr("aria-hidden","true"),e=t.attr("id");return e?(n=[e,"surrogate"].join("_"),f.attr("id",n)):n=f.uniqueId(),f.insertBefore(t),t.attr(a.OffcanvasUtils.SURROGATE_ATTR,n),f},a.OffcanvasUtils._swapOrder=function(s,t){s[a.OffcanvasUtils.SURROGATE_KEY]=a.OffcanvasUtils._createSurrogate(t),t.appendTo(t.parent())},a.OffcanvasUtils._restoreOrder=function(s){var t=a.OffcanvasUtils._getDrawer(s),n=s[a.OffcanvasUtils.SURROGATE_KEY];t&&n&&t.attr(a.OffcanvasUtils.SURROGATE_ATTR)===n.attr("id")&&(t.insertAfter(n),t.removeAttr(a.OffcanvasUtils.SURROGATE_ATTR),n.remove())},a.OffcanvasUtils._applyModality=function(t,n){var f=t;a.OffcanvasUtils._isModal(f)&&(f[a.OffcanvasUtils.GLASS_PANE_KEY]=a.OffcanvasUtils._addGlassPane(n),a.OffcanvasUtils._swapOrder(f,n),s(f[a.OffcanvasUtils.CONTENT_KEY]).attr("aria-hidden","true"),window.setTimeout((function(){f[a.OffcanvasUtils.GLASS_PANE_KEY].addClass(a.OffcanvasUtils.GLASSPANE_DIM_SELECTOR)}),0))},a.OffcanvasUtils._removeModality=function(t){a.OffcanvasUtils._isModal(t)&&(t[a.OffcanvasUtils.GLASS_PANE_KEY].remove(),a.OffcanvasUtils._restoreOrder(t),s(t[a.OffcanvasUtils.CONTENT_KEY]).removeAttr("aria-hidden"))},a.OffcanvasUtils.setupPanToReveal=function(f){var e,i,r,l,o,c,O,v,_,E,U,T,u,d=f;null==s(d).attr("oj-data-pansetup")&&(s(d).attr("oj-data-pansetup","true"),d.displayMode="push",e=a.OffcanvasUtils._getDrawer(d),r=a.OffcanvasUtils._getOuterWrapper(e),o={recognizers:[[t.Pan,{direction:t.DIRECTION_HORIZONTAL}]]},a.AgentUtils.getAgentInfo().os===a.AgentUtils.OS.IOS&&(o.inputClass=t.TouchInput),c=!1,s(r).ojHammer(o).on("panstart",(function(f){switch(O=null,f.gesture.direction){case t.DIRECTION_LEFT:Math.abs(f.gesture.deltaY)<Math.abs(f.gesture.deltaX)&&(O=a.OffcanvasUtils._isRTL()?"end":"start");break;case t.DIRECTION_RIGHT:Math.abs(f.gesture.deltaY)<Math.abs(f.gesture.deltaX)&&(O=a.OffcanvasUtils._isRTL()?"start":"end")}null!==O&&(f.gesture.angle<0&&(f.gesture.deltaX<-100||f.gesture.deltaY<-100)||(v={direction:O,distance:Math.abs(f.gesture.deltaX)},_=s.Event("ojpanstart"),e.trigger(_,v),_.isDefaultPrevented()||(n.getContext(r.get(0)).getBusyContext().whenReady().then((function(){null==(i=d.size)&&(i=e.outerWidth(),d.size=i),c=!0})),d._closePromise=null,(l=a.OffcanvasUtils._getAnimateWrapper(d)).off(".oc"),a.OffcanvasUtils._toggleClass(d,l,!0),f.gesture.srcEvent.stopPropagation(),f.gesture.srcEvent.preventDefault(),f.stopPropagation())))})).on("panmove",(function(t){c&&(E=t.gesture.deltaX,"start"===O&&E>0||"end"===O&&E<0?a.OffcanvasUtils._setTranslationX(l,"start","0px"):(e.css("width",Math.abs(E)),l.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._setTranslationX(l,"start",E+"px"),v={direction:O,distance:Math.abs(E)},_=s.Event("ojpanmove"),e.trigger(_,v),t.gesture.srcEvent.stopPropagation(),t.stopPropagation()))})).on("panend",(function(t){if(c){if(c=!1,E=Math.abs(t.gesture.deltaX),v={distance:E},_=s.Event("ojpanend"),e.trigger(_,v),t.stopPropagation(),!_.isDefaultPrevented())return null==(U=d.edge)&&(U=e.hasClass("oj-offcanvas-start")?"start":"end"),a.OffcanvasUtils._animateWrapperAndDrawer(l,e,U,i,d),s.data(e[0],a.OffcanvasUtils._DATA_OFFCANVAS_KEY,d),s.data(e[0],a.OffcanvasUtils._DATA_EDGE_KEY,U),void a.OffcanvasUtils._registerCloseHandler(d);if("translate3d(0px, 0px, 0px)"===l[0].style.transform)return a.OffcanvasUtils._toggleClass(d,l,!1),l.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),void e.trigger("ojclose",d);T="transitionend webkitTransitionEnd otransitionend oTransitionEnd",u=function(){a.OffcanvasUtils._toggleClass(d,l,!1),l.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),l.off(T,u),e.trigger("ojclose",d)},l.on(T,u),l.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),a.OffcanvasUtils._setTranslationX(l,"start","0px")}})))},a.OffcanvasUtils._animateWrapperAndDrawer=function(s,t,n,f,e){var i,r,l,o,c,O,v,_,E,U,T,u;if(s.removeClass(a.OffcanvasUtils.TRANSITION_SELECTOR),i=Math.round(1e3/60),"none"!==(r=s.css("transform"))){l=r.split("(")[1].split(")")[0].split(",");var d=a.AgentUtils.getAgentInfo(),A="ie"===d.browser&&11===d.browserVersion?12:4;o=parseInt(l[A],10),c=o,O="end"===n?0-f:f,_=Math.max(1,Math.abs(O-o)/(400/i)),E=(new Date).getTime(),U=function(){c===o||""!==s.get(0).style.transform?(T=(new Date).getTime(),u=Math.max(_,_*Math.max((T-E)/i)),E=T,o<O?o=Math.min(O,o+u):o>O&&(o=Math.max(O,o-u)),a.OffcanvasUtils._setTranslationX(s,n,Math.abs(o)+"px"),t.css("width",Math.abs(o)+"px"),o===O?(window.cancelAnimationFrame(v),s.addClass(a.OffcanvasUtils.TRANSITION_SELECTOR),t.trigger("ojopen",e)):v=window.requestAnimationFrame(U)):window.cancelAnimationFrame(v)},v=window.requestAnimationFrame(U)}},a.OffcanvasUtils.tearDownPanToReveal=function(t){var n=a.OffcanvasUtils._getDrawer(t),f=a.OffcanvasUtils._getOuterWrapper(n);s(f).off("panstart panmove panend")},r}));
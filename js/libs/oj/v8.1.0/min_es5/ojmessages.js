/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojcontext","ojs/ojthemeutils","ojs/ojtranslation","knockout","ojs/ojcomposite","ojs/ojcomponentcore","ojs/ojanimation","ojs/ojlogger","ojs/ojknockout","ojs/ojpopupcore","ojs/ojmessage","ojs/ojdataprovider"],function(e,t,i,s,n,o,a,r,l,p){"use strict";function d(t){this._composite=t.element,this.containerId=[t.unique,"mc"].join("_"),this._messagesContainerId=this.containerId,this.handleOpen=this._handleOpen.bind(this),this.handleClose=this._handleClose.bind(this),this.handleAnimateStart=this._handleAnimateStart.bind(this),this.bindingsApplied=this._bindingsApplied.bind(this),this.disconnected=this._disconnected.bind(this),this.connected=this._connected.bind(this),this.close=this._close.bind(this),this.closeAll=this._closeAll.bind(this),this.propertyChanged=this._propertyChanged.bind(this),this._properties=t.properties,this._createObservables(),this._updateLandmark(),e.AgentUtils.getAgentInfo().os===e.AgentUtils.OS.IOS&&(this._composite.style.overflow="hidden")}function c(e){this.Init(e)}d.prototype._bindingsApplied=function(){var e=document.getElementById(this._messagesContainerId);if(e.addEventListener("ojFocus",this._navigationEventListener.bind(this),!1),this._properties.messages)e.addEventListener("ojBeforeOpen",this._handleBeforeOpen.bind(this),!1);else{var t=this._getDefaultSlotMessageElements();if(0!==t.length){var s=i.getContext(this._composite).getBusyContext();this._inlinedMessagesOpenBusyStateResolve=s.addBusyState({description:"oj-messages is busy opening inlined messages"}),this._showMessagesContainer();for(var n=0;n<t.length;n++)this._animateMessageAction(t[n].firstChild,"open",this._resolveInlinedMessagesOpenBusyState(t[n].getProperty("message"),t.length))}}},d.prototype._resolveInlinedMessagesOpenBusyState=function(e,t){this._updateLiveRegionAndContainer(e),this._numInlinedChildrenAnimated=this._numInlinedChildrenAnimated?this._numInlinedChildrenAnimated+1:1,this._numInlinedChildrenAnimated===t&&(this._numInlinedChildrenAnimated=0,this._inlinedMessagesOpenBusyStateResolve())},d.prototype._disconnected=function(){d.NAVIGATION_TRACKER.remove(this._messagesContainerId),e.ZOrderUtils.getStatus(this._composite)===e.ZOrderUtils.STATUS.OPEN&&this._closeOverlay()},d.prototype._connected=function(){d.NAVIGATION_TRACKER.add(this._messagesContainerId)},d.prototype._closeAll=function(e){if(this._isMessagesShown())for(var t=this._getDefaultSlotMessageElements(),i=0;i<t.length;i++){var s=t[i].message,n=!0;e&&(n=e(s)),n&&t[i].close()}},d.prototype._propertyChanged=function(e){"external"===e.updatedFrom&&"position"===e.property?e.previousValue&&e.value?this._refresh():!e.previousValue&&e.value?this._getDefaultSlotMessageElements().length>0&&(this._isMessagesShown()&&this._hideMessages(),this._openOverlay()):e.previousValue&&!e.value&&this._getDefaultSlotMessageElements().length>0&&(this._isOverlayOpen()&&this._closeOverlay(),this._showMessages()):"external"===e.updatedFrom&&"display"===e.property?this._getDefaultSlotMessageElements().length>0&&(this._isOverlayOpen()?(this._closeOverlay(),this._openOverlay(),this._refresh()):this._isMessagesShown()&&(this._hideMessages(),this._showMessages())):"external"===e.updatedFrom&&"translations"===e.property&&this._updateLandmark()},d.prototype._close=function(e){if(e&&this._isMessagesShown())for(var i=this._getDefaultSlotMessageElements(),s=0;s<i.length;s++){t(i[s]).prop("message")===e&&i[s].close()}},d.prototype._isEventPertaining=function(t){var i=t.target,s=document.getElementById(this._messagesContainerId);return!("OJ-MESSAGE"!==i.nodeName||!e.DomUtils.isAncestor(s,i))},d.prototype._handleBeforeOpen=function(e){e.defaultPrevented||!this._isEventPertaining(e)||this._isMessagesShown()||this._showMessagesContainer()},d.prototype._showMessagesContainer=function(){this._isPresentationInline()?this._showMessages():this._openOverlay()},d.prototype._handleOpen=function(e){!e.defaultPrevented&&this._isEventPertaining(e)&&this._updateLiveRegionAndContainer(e.detail.message)},d.prototype._updateLiveRegionAndContainer=function(e){var t=n.getComponentTranslations("oj-ojMessage").categories,i="fatal"===e.severity?"error":e.severity,s={category:e.category?e.category:t[i],summary:e.summary},o=this._getLiveRegion(),a=this._getTranslationsDefault("ariaLiveRegion.newMessage",s);o.announce(a),this._refresh()},d.prototype._getTranslationsDefault=function(t,i){for(var s=this._properties.translations,o=t.split("."),a=0;a<o.length&&s;a++)s=s[o[a]];return e.StringUtils.isEmptyOrUndefined(s)?s=n.getTranslatedString(["oj-ojMessages",t].join("."),i):i&&(s=n.applyParameters(s,i)),s},d.prototype._handleClose=function(e){if(!e.defaultPrevented&&this._isEventPertaining(e)){var i,s=e.target;e._originalEvent&&(i=this._getNextFocus(s)),i&&i.focus(),t(s).remove(),0===this._getDefaultSlotMessageElements().length&&(d.NAVIGATION_TRACKER.togglePreviousFocus(this._messagesContainerId),this._isOverlayOpen()?this._closeOverlay():this._hideMessages())}},d.prototype._getNextFocus=function(e){var t,i,s=this._getDefaultSlotMessageElements(),n=s.indexOf(e);return n-1>-1?t=s[n-1]:n+1<=s.length-1&&(t=s[n+1]),t&&(i=t.querySelector('.oj-message-category[tabindex="-1"]')),i},d.prototype._handleAnimateStart=function(e){!e.defaultPrevented&&this._isEventPertaining(e)&&(e.preventDefault(),this._animateMessageAction(e.detail.element,e.detail.action,e.detail.endCallback))},d.prototype._animateMessageAction=function(e,t,i){var s=this._isPresentationInline()?"general":this._computeDisplay(),n=this._getThemedAnimateOptions(s,t);l[n.effect](e,n).then(i)},d._DEFAULTS={general:{animation:{open:{effect:"expand",duration:"300ms"},close:{effect:"collapse",duration:"300ms"}},position:{my:{horizontal:"center",vertical:"top"},at:{horizontal:"center",vertical:"top"},of:"window",collision:"none"}},notification:{animation:{open:{effect:"slideIn",duration:"300ms"},close:{effect:"slideOut",duration:"300ms",direction:"end"}},position:{my:{horizontal:"end",vertical:"top"},at:{horizontal:"end",vertical:"top"},of:"window",collision:"none"}}},d.prototype._getThemedAnimateOptions=function(e,t){var i=s.parseJSONFromFontFamily("oj-messages-option-defaults");return i&&i[e]&&i[e].animation&&i[e].animation[t]?i[e].animation[t]:d._DEFAULTS[e].animation[t]},d.prototype._computeDisplay=function(){return this._properties.display},d.prototype._isPresentationInline=function(){return!this._properties.position},d.prototype._computeContainerSelectors=function(){var e=this._computeDisplay(),i=t(this._composite);return i.removeClass("oj-messages-general oj-messages-notification oj-messages-inline"),this._isPresentationInline()?i.addClass("oj-messages-inline"):i.addClass(["oj-messages",e].join("-")),"oj-messages-container"},d.prototype._getThemedPosition=function(){var e=this._computeDisplay(),t=s.parseJSONFromFontFamily("oj-messages-option-defaults");return t[e]&&t[e].position?t[e].position:d._DEFAULTS[e].position},d.prototype._getPositionAsJqUi=function(){var t=e.PositionUtils.coerceToJqUi(this._computePosition()),i="rtl"===e.DomUtils.getReadingDirection();return t=e.PositionUtils.normalizeHorizontalAlignment(t,i)},d.prototype._computePosition=function(){var t=this._properties.position;return e.PositionUtils.coerceToJet(t,this._getThemedPosition())},d.prototype._getDefaultSlotMessageElements=function(){function t(e){var i="";if(e)if(e.id&&e.id.length>0)i="#"+e.id;else{i=e.nodeName;var s=e.getAttribute("class");if(s&&(i+="."+s.split(" ").join(".")),e.parentNode)return t(e.parentNode)+" > "+i}return i}for(var i=document.getElementById(this._messagesContainerId),s=[],n=e.BaseCustomElementBridge.getSlotMap(i)[""],o=0;n&&o<n.length;o++)"OJ-MESSAGE"!==n[o].nodeName?"OJ-BIND-IF"!==n[o].nodeName&&p.error(["JET oj-messages id='",t(this._composite),"': can contain only oj-message children in its default slot. ","Found a child element id='",t(n[o]),"'."].join("")):s.push(n[o]);return s},d.prototype._isMessagesShown=function(){return t(this._composite).is(":visible")},d.prototype._showMessages=function(){this._isMessagesShown()||(t(this._composite).show(),r.subtreeShown(t(this._composite))),d.NAVIGATION_TRACKER.add(this._messagesContainerId),this._announceNavigation()},d.prototype._hideMessages=function(){this._isMessagesShown()&&(t(this._composite).hide(),r.subtreeHidden(this._composite),d.NAVIGATION_TRACKER.remove(this._messagesContainerId),this._liveRegion&&(this._liveRegion.destroy(),delete this._liveRegion))},d.prototype._openOverlay=function(){var i=t(this._composite),s={};s[e.PopupService.OPTION.POPUP]=i,s[e.PopupService.OPTION.LAUNCHER]=this._getLauncher(),s[e.PopupService.OPTION.POSITION]=this._getPositionAsJqUi(),s[e.PopupService.OPTION.EVENTS]=this._getPopupServiceEvents(),s[e.PopupService.OPTION.LAYER_SELECTORS]=["oj","messages","layer"].join("-"),s[e.PopupService.OPTION.MODALITY]=e.PopupService.MODALITY.MODELESS,s[e.PopupService.OPTION.CUSTOM_ELEMENT]=!0,e.PopupService.getInstance().open(s),this._showMessages(),this._overlayEventsCallback=d._overlayEventsListener.bind(this,i),i[0].addEventListener("keydown",this._overlayEventsCallback,!1)},d.prototype._getLauncher=function(){var e=this._composite.parentElement;return this._composite.previousElementSibling?e=this._composite.previousElementSibling:this._composite.nextElementSibling&&(e=this._composite.nextElementSibling),t(e)},d.prototype._closeOverlay=function(){this._hideMessages();var i=t(this._composite),s={};s[e.PopupService.OPTION.POPUP]=i,e.PopupService.getInstance().close(s);var n=this._overlayEventsCallback;delete this._overlayEventsCallback,i[0].removeEventListener("keydown",n,!1)},d.prototype._isOverlayOpen=function(){var t=this._composite,i=e.ZOrderUtils.getStatus(t);return i===e.ZOrderUtils.STATUS.OPENING||i===e.ZOrderUtils.STATUS.OPEN||i===e.ZOrderUtils.STATUS.CLOSING},d._overlayEventsListener=function(e,i){if(!i.defaultPrevented&&i.keyCode===t.ui.keyCode.TAB){var s=i.target,n=e.find(":tabbable");if(n.length>0){var o=n[0],a=n[n.length-1];o===a&&s===o?i.preventDefault():o===s&&i.shiftKey?(i.preventDefault(),a.focus()):a!==s||i.shiftKey||(i.preventDefault(),o.focus())}else i.preventDefault()}},d.prototype._navigationEventListener=function(e){e.target.id===this._messagesContainerId&&(e.preventDefault(),this._announceNavigation(!0))},d.prototype._announceNavigation=function(t){var i,s=e.AgentUtils.getAgentInfo().os===e.AgentUtils.OS.IOS||e.AgentUtils.getAgentInfo().os===e.AgentUtils.OS.ANDROID;if(i=t?s?void 0:"ariaLiveRegion.navigationFromKeyboard":s?"ariaLiveRegion.navigationToTouch":"ariaLiveRegion.navigationToKeyboard"){var n=this._getLiveRegion(),o=this._getTranslationsDefault(i);n.announce(o)}},d.prototype._getLiveRegion=function(){var e=this._messagesContainerId;return this._liveRegion||(this._liveRegion=new c(e)),this._liveRegion},d.prototype._getPopupServiceEvents=function(){var t={};return t[e.PopupService.EVENT.POPUP_CLOSE]=this._closeOverlay.bind(this),t[e.PopupService.EVENT.POPUP_REMOVE]=this._surrogateRemoveHandler.bind(this),t[e.PopupService.EVENT.POPUP_REFRESH]=this._refresh.bind(this),t},d.prototype._refresh=function(){if(this._isOverlayOpen()){var e=this._composite.getBoundingClientRect();if(e.height<document.documentElement.clientHeight&&e.width<document.documentElement.clientWidth){var i=this._getPositionAsJqUi();t(this._composite).position(i)}}},d.prototype._surrogateRemoveHandler=function(){this._closeOverlay(),this._composite.parentElement.removeChild(this._composite)},d.prototype._createObservables=function(){this.containerSelectors=o.pureComputed(this._computeContainerSelectors.bind(this),this)},d.prototype._computeLabelLandmark=function(){var t=this._properties;return e.StringUtils.isEmptyOrUndefined(t.translations.labelLandmark)?this._getTranslationsDefault("labelLandmark"):t.translations.labelLandmark},d.prototype._updateLandmark=function(){var e=this._computeLabelLandmark();this._composite.setAttribute("aria-label",e),this._composite.setAttribute("role","complementary")},d.NAVIGATION_TRACKER={_messagesContainerIds:[],_priorFocusCache:{},add:function(e){this.remove(e),this._messagesContainerIds.push(e),this._start(e)},remove:function(e){var t=this._messagesContainerIds,i=t.indexOf(e);i>-1&&t.splice(i,1),this._stop(e)},togglePreviousFocus:function(i){var s=this._priorFocusCache,n=s[i];return!!(n&&t(n).is(":visible")&&e.ZOrderUtils.isAboveTopModalLayer(n))&&(n.focus(),delete s[i],!0)},_addPriorFocusCache:function(e,t){this._priorFocusCache[e]=t},_start:function(e){var i=document.getElementById(e);if(i){var s=this._messageContainerListener.bind(this,e);if(i.addEventListener("focus",s,!0),i.addEventListener("keydown",s,!1),i.addEventListener("click",s,!1),t(i).data("oj_messages_nmtl",s),!this._documentCallback){this._documentCallback=this._documentListener.bind(this);var n=document.documentElement;n.addEventListener("keydown",this._documentCallback,!1),n.addEventListener("blur",this._documentCallback,!0)}}},_stop:function(e){var i=document.getElementById(e);if(i){var s=t(i).data("oj_messages_nmtl");s&&(i.removeEventListener("focus",s,!0),i.removeEventListener("keydown",s,!1),i.removeEventListener("click",s,!1))}if(this._documentCallback&&!(this._messagesContainerIds.length>0)){var n=document.documentElement;n.removeEventListener("keydown",this._documentCallback,!1),n.removeEventListener("blur",this._documentCallback,!0),delete this._documentCallback}},_indexOfFocusWithin:function(t){for(var i=this._messagesContainerIds,s=0;s<i.length;s++){var n=document.getElementById(i[s]);if(n&&e.DomUtils.isAncestorOrSelf(n,t))return s}return-1},_documentListener:function(i){if(!i.defaultPrevented){var s=this._messagesContainerIds;if("keydown"===i.type&&117===i.keyCode&&s.length>0){var n=this._indexOfFocusWithin(i.target);if(n>-1)return;for(var o=n=s.length-1;o>-1;o--){var a=document.getElementById(s[o]);if(a&&t(a).is(":visible")&&e.ZOrderUtils.isAboveTopModalLayer(a)){var r=a.querySelector('.oj-message-category[tabindex="-1"]');i.preventDefault(),this._addPriorFocusCache(s[o],i.target),r.focus();var l=new CustomEvent("ojFocus",{bubbles:!1,cancelable:!0});a.dispatchEvent(l);break}}}else"blur"===i.type&&(this._prevActiveElement=i.target)}},_messageContainerListener:function(i,s){if(!s.defaultPrevented)if("focus"===s.type||"click"===s.type){var n=document.getElementById(i),o=this._prevActiveElement;o&&n&&!e.DomUtils.isAncestorOrSelf(n,o)&&this._addPriorFocusCache(i,o)}else"keydown"!==s.type||117!==s.keyCode&&s.keyCode!==t.ui.keyCode.ESCAPE||this.togglePreviousFocus(i)&&s.preventDefault()}},c.prototype.Init=function(e){this._id=e},c.prototype.destroy=function(){var e=t(document.getElementById(c._LIVE_REGION_ID)),i=this._id;delete this._id,e.find('div[data-container-id="'+i+'"]').remove(),e.children("div").length<1&&e.remove()},c.prototype.announce=function(e){var i=c._getLiveRegion(),s=this._id;t("<div>").attr("data-container-id",s).text(e).appendTo(i)},c._getLiveRegion=function(){var e=t(document.getElementById(c._LIVE_REGION_ID));return 0===e.length&&((e=t("<div>")).attr({id:c._LIVE_REGION_ID,role:"log","aria-live":"polite","aria-relevant":"additions"}),e.addClass("oj-helper-hidden-accessible"),e.appendTo(document.body)),e},c._LIVE_REGION_ID="__oj_messages_arialiveregion",a.register("oj-messages",{view:'<div role="presentation" :id="[[containerId]]" :class="[[containerSelectors]]"      on-oj-open="[[handleOpen]]" on-oj-close="[[handleClose]]"      on-oj-animate-start="[[handleAnimateStart]]">  <oj-bind-if test="[[!$properties.messages]]">    <oj-bind-slot>    </oj-bind-slot>  </oj-bind-if>  <oj-bind-if test="[[$properties.messages]]">    <oj-bind-for-each data="[[$properties.messages]]" >      <template>        <oj-bind-template-slot name="messageTemplate"           data="[[{data:$current.data, componentElement:_composite}]]">          <template>            <oj-message message="[[$current.data]]" display-options="[[$properties.displayOptions]]">            </oj-message>          </template>        </oj-bind-template-slot>      </template>    </oj-bind-for-each>  </oj-bind-if></div>',viewModel:d,metadata:{properties:{display:{type:"string",enumValues:["general","notification"],value:"general"},displayOptions:{type:"object",properties:{category:{type:"string",enumValues:["auto","header","none"],value:"auto"}}},messages:{type:"Array<Object>|object"},position:{type:"object",properties:{at:{type:"object",properties:{horizontal:{type:"string",enumValues:["center","end","left","right","start"]},vertical:{type:"string",enumValues:["bottom","center","top"]}}},collision:{type:"string",enumValues:["fit","flip","flipfit","none"]},my:{type:"object",properties:{horizontal:{type:"string",enumValues:["center","end","left","right","start"]},vertical:{type:"string",enumValues:["bottom","center","top"]}}},of:{type:"string"},offset:{type:"object",properties:{x:{type:"number"},y:{type:"number"}}}}},translations:{type:"object",value:{},properties:{ariaLiveRegion:{type:"object",properties:{navigationFromKeyboard:{type:"string"},navigationToKeyboard:{type:"string"},navigationToTouch:{type:"string"},newMessage:{type:"string"}}},labelLandmark:{type:"string"}}}},methods:{close:{},closeAll:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},extension:{}}})});
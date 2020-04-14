/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","knockout","ojs/ojkoshared","customElements"],(function(e,t,n,o){"use strict";o.addPostprocessor({nodeHasBindings:function(e,t){return t||1===e.nodeType&&"oj-defer"===e.nodeName.toLowerCase()},getBindingAccessors:function(e,t,n){var o=n;return 1===e.nodeType&&"oj-defer"===e.nodeName.toLowerCase()&&((o=o||{})._ojDefer_=function(){}),o}}),n.bindingHandlers._ojDefer_={init:function(e,t,o,i,s){var d=e;if(d._shown)n.applyBindingsToDescendants(s,d);else{if(!d._savedChildNodes){for(var r=document.createDocumentFragment(),c=d.childNodes;c.length>0;)r.appendChild(c[0]);d._savedChildNodes=r}Object.defineProperty(d,"_activateDescedantBindings",{value:function(){n.applyBindingsToDescendants(s,d),delete d._activateDescedantBindings},configurable:!0})}return{controlsDescendantBindings:!0}}},e.DeferElement={},e.DeferElement.register=function(){var e=Object.create(HTMLElement.prototype);Object.defineProperty(e,"_activate",{value:function(){this._activateDescedantBindings?(this._savedChildNodes&&(this.appendChild(this._savedChildNodes),delete this._savedChildNodes),this._activateDescedantBindings()):Object.defineProperty(this,"_shown",{configurable:!1,value:!0})},writable:!1});var t=function(){const e=window.Reflect;let t;return t=void 0!==e?e.construct(HTMLElement,[],this.constructor):HTMLElement.call(this),t};Object.defineProperty(e,"constructor",{value:t,writable:!0,configurable:!0}),t.prototype=e,Object.setPrototypeOf(t,HTMLElement),customElements.define("oj-defer",t)},e.DeferElement.register()}));
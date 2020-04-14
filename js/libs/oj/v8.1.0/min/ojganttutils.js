/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore"],function(e){"use strict";var t=function(){};return t.computeTableColumnHeaderHeight=function(a,n,r){var i=0,l=r.majorAxis,o=r.minorAxis;function d(e,a){if(null==e)return 0;var r=e.height,i=t._getDefaultTimeAxisHeight(n,a);return isNaN(r)?i:Math.max(i,r)}return i+=d(l,"major"),i+=d(o,"minor"),i-=t._getTableHeaderHeight(a),e.AgentUtils.getAgentInfo().browser!==e.AgentUtils.BROWSER.EDGE&&e.AgentUtils.getAgentInfo().browser!==e.AgentUtils.BROWSER.IE||(i-=1),i},t._getTableHeaderHeight=function(e){var t=document.createElement("div");null!=e&&(t.className=e.className+" "),t.className=t.className+"oj-table oj-table-grid-display";var a=document.createElement("div");a.className="oj-table-header";var n=document.createElement("div");n.className="oj-table-header-row";var r=document.createElement("div");r.className="oj-table-column-header-cell",n.appendChild(r),a.appendChild(n),t.appendChild(a);var i=null!=e?e:document.body;i.appendChild(t);var l=window.getComputedStyle(r),o=parseInt(l.paddingTop,10),d=parseInt(l.paddingBottom,10),s=parseInt(l.borderTopWidth,10),m=parseInt(l.borderBottomWidth,10);l=window.getComputedStyle(a);var c=parseInt(l.borderBottomWidth,10),u=0;return u+=isNaN(o)?0:o,u+=isNaN(d)?0:d,u+=isNaN(s)?0:s,u+=isNaN(m)?0:m,u+=isNaN(c)?0:c,i.removeChild(t),u},t._getDefaultTimeAxisHeight=function(e,t){var a="oj-gantt-"+t+"-axis-label",n=document.createElement("div");null!=e&&(n.className=e.className+" "),n.className=n.className+"oj-gantt oj-dvtbase";var r=document.createElement("div");r.className=a,r.innerHTML="FooBar",n.appendChild(r);var i=null!=e?e:document.body;i.appendChild(n);var l=parseInt(window.getComputedStyle(r).height,10);i.removeChild(n);var o=Math.max(l+4,21);return Math.max(o,22)+1},t});
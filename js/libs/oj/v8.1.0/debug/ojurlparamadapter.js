/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","ojs/ojurlpathadapter","ojs/ojlogger"],(function(o,t,r){"use strict";return function(){function o(){var o=document.location.search?document.location.search.substring(1):"",t=[];return o&&o.split("&").forEach((function(o){var r,e,n=o.split("=");t.push({[n[0]]:(r=n[1],e=decodeURIComponent(r),e)})})),t}function r(o){var t=[];return o.forEach((function(o){var r,e=Object.keys(o)[0];t.push(e+"="+(r=o[e],encodeURIComponent(r)))})),t.join("&")}function e(){this._pathAdapter=new t("")}return e.prototype.getRoutesForUrl=function(){var t,r,e=(t=o(),r="",t.forEach((function(o){o._ojCoreRouter&&(r=o._ojCoreRouter)})),r);return this._pathAdapter.getRoutesForUrl(e)},e.prototype.getUrlForRoutes=function(t){var e,n,u,c=this._pathAdapter.getUrlForRoutes(t);return c.indexOf("?")>-1&&(c=c.substring(0,c.indexOf("?"))),"?"+(e=c,n=o(),u=!1,n.forEach((function(o){o._ojCoreRouter&&(o._ojCoreRouter=e,u=!0)})),u||n.push({_ojCoreRouter:e}),r(n))},e}()}));
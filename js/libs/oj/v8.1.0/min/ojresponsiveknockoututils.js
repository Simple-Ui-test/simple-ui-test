/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojresponsiveutils","knockout"],function(e,r,n,t){"use strict";var a={createMediaQueryObservable:function(e){if(null==e)throw new Error("ResponsiveKnockoutUtils.createMediaQueryObservable: aborting, queryString is null");var n=window.matchMedia(e),a=t.observable(n.matches);return n.addListener(function(e){a(e.matches)}),-1!==navigator.userAgent.indexOf("WebKit")&&-1===navigator.userAgent.indexOf("Chrome")&&r(window).resize(function(){var e="oj-webkit-bug-123293";0===r("body").has("."+e).length&&r("body").append('<div aria-hidden="true" class="oj-helper-hidden-accessible '+e+'">'),r("."+e).text((new Date).getMilliseconds().toString())}),a},createScreenRangeObservable:function(){var e=n.getFrameworkQuery(n.FRAMEWORK_QUERY_KEY.XXL_UP),r=n.getFrameworkQuery(n.FRAMEWORK_QUERY_KEY.XL_UP),i=n.getFrameworkQuery(n.FRAMEWORK_QUERY_KEY.LG_UP),u=n.getFrameworkQuery(n.FRAMEWORK_QUERY_KEY.MD_UP),l=n.getFrameworkQuery(n.FRAMEWORK_QUERY_KEY.SM_UP),o=null==e?null:a.createMediaQueryObservable(e),s=null==r?null:a.createMediaQueryObservable(r),E=null==i?null:a.createMediaQueryObservable(i),c=null==u?null:a.createMediaQueryObservable(u),R=null==l?null:a.createMediaQueryObservable(l);return t.computed(function(){if(o&&o())return n.SCREEN_RANGE.XXL;if(s&&s())return n.SCREEN_RANGE.XL;if(E&&E())return n.SCREEN_RANGE.LG;if(c&&c())return n.SCREEN_RANGE.MD;if(R&&R())return n.SCREEN_RANGE.SM;throw new Error(" NO MATCH in ResponsiveKnockoutUtils.createScreenRangeObservable")})}};return a});
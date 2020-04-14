/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojdataprovider","ojs/ojcomponentcore","ojs/ojeventtarget","ojs/ojdataprovider"],(function(t,e,s){"use strict";class i{constructor(t,e){this.dataProvider=t,this.options=e,this._noFilterSupport=!1,this.AsyncIterable=class{constructor(t,e){this._parent=t,this._asyncIterator=e,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}},this.AsyncIterator=class{constructor(t,e,s){this._parent=t,this._nextFunc=e,this._params=s}next(){let t=this._nextFunc(this._params);return Promise.resolve(t)}},this.AsyncIteratorYieldResult=class{constructor(t,e){this._parent=t,this.value=e,this[i._VALUE]=e,this[i._DONE]=!1}},this.AsyncIteratorReturnResult=class{constructor(t,e){this._parent=t,this.value=e,this[i._VALUE]=e,this[i._DONE]=!0}},this.FetchListResult=class{constructor(t,e,s,r){this._parent=t,this.fetchParameters=e,this.data=s,this.metadata=r,this[i._FETCHPARAMETERS]=e,this[i._DATA]=s,this[i._METADATA]=r}},this.Item=class{constructor(t,e,s){this._parent=t,this.metadata=e,this.data=s,this[i._METADATA]=e,this[i._DATA]=s}},this.ItemMetadata=class{constructor(t,e){this._parent=t,this.key=e,this[i._KEY]=e}},this.FetchListParameters=class{constructor(t,e,s,r,n,l){this._parent=t,this.params=e,this.size=s,this.sortCriteria=r,this.filterCriterion=n,this.attributes=l;let _=this;e&&Object.keys(e).forEach((function(t){_[t]=e[t]})),this[i._SIZE]=s,r&&(this[i._SORTCRITERIA]=r),n&&(this[i._FILTERCRITERION]=n),l&&(this[i._FETCHATTRIBUTES]=l)}},this.FetchByKeysParameters=class{constructor(t,e,s,r){this._parent=t,this.keys=e,this.params=s,this.attributes=r;let n=this;s&&Object.keys(s).forEach((function(t){n[t]=s[t]})),e&&(this[i._KEYS]=e),r&&(this[i._FETCHATTRIBUTES]=r)}},this.FetchByOffsetParameters=class{constructor(t,e,s,r,n,l,_){this._parent=t,this.offset=e,this.params=s,this.size=r,this.sortCriteria=n,this.filterCriterion=l,this.attributes=_;let a=this;s&&Object.keys(s).forEach((function(t){a[t]=s[t]})),r&&(this[i._SIZE]=r),n&&(this[i._SORTCRITERIA]=n),e&&(this[i._OFFSET]=e),l&&(this[i._FILTERCRITERION]=l),_&&(this[i._FETCHATTRIBUTES]=_)}},this.FetchByKeysResults=class{constructor(t,e,s){this._parent=t,this.fetchParameters=e,this.results=s,this[i._FETCHPARAMETERS]=e,this[i._RESULTS]=s}},this.ContainsKeysResults=class{constructor(t,e,s){this._parent=t,this.containsParameters=e,this.results=s,this[i._CONTAINSPARAMETERS]=e,this[i._RESULTS]=s}},this.FetchByOffsetResults=class{constructor(t,e,s,r){this._parent=t,this.fetchParameters=e,this.results=s,this.done=r,this[i._FETCHPARAMETERS]=e,this[i._RESULTS]=s,this[i._DONE]=r}},this[i._FROM]=null==this.options?null:this.options[i._FROM],this[i._OFFSET]=null==this.options?0:this.options[i._OFFSET]>0?this.options[i._OFFSET]:0,this[i._SORTCRITERIA]=null==this.options?null:this.options[i._SORTCRITERIA],this[i._DATAMAPPING]=null==this.options?null:this.options[i._DATAMAPPING],this[i._FETCHATTRIBUTES]=null==this.options?null:this.options[i._FETCHATTRIBUTES],this[i._FILTERCRITERION]=null==this.options?null:this.options[i._FILTERCRITERION],this._addEventListeners(t),t.getCapability&&!t.getCapability("filter")&&(this._noFilterSupport=!0)}containsKeys(t){let e=this;return this.dataProvider[i._CONTAINSKEYS]?this.dataProvider[i._CONTAINSKEYS](t):this.fetchByKeys(t).then((function(s){let r=new Set;return t[i._KEYS].forEach((function(t){null!=s[i._RESULTS].get(t)&&r.add(t)})),Promise.resolve(new e.ContainsKeysResults(e,t,r))}))}fetchByKeys(t){let e=this,s=null!=t?t[i._KEYS]:null,r=null!=t?t[i._FETCHATTRIBUTES]:null;null==r&&(r=this[i._FETCHATTRIBUTES]);let n=new e.FetchByKeysParameters(e,s,t,r);if(this.dataProvider[i._FETCHBYKEYS])return this.dataProvider[i._FETCHBYKEYS](n).then((function(t){let s=t[i._RESULTS],r=new Map;return s.forEach((function(t,s){let i=e._getMappedItems([t]);r.set(s,i[0])})),new e.FetchByKeysResults(e,n,r)}));{let s=new this.FetchListParameters(this,null,i._DEFAULT_SIZE,null,null,r),l=new Map,_=this.dataProvider[i._FETCHFIRST](s)[Symbol.asyncIterator]();return this._fetchNextSet(t,_,l).then((function(t){let s=new Map;return t.forEach((function(t,i){let r=e._getMappedItems([t]);s.set(i,r[0])})),new e.FetchByKeysResults(e,n,s)}))}}fetchByOffset(t){let e=this,s=null!=t?t[i._OFFSET]:null,r=null!=t?t[i._SIZE]:null,n=null!=t?t[i._FETCHATTRIBUTES]:null;null==n&&(n=this[i._FETCHATTRIBUTES]);let l=null!=t?t[i._SORTCRITERIA]:null;null==l&&(l=this[i._SORTCRITERIA]);let _=this._getMappedSortCriteria(l),a=null!=t?t[i._FILTERCRITERION]:null,h=this._getMappedFilterCriterion(a),E=new e.FetchByOffsetParameters(e,s,t,r,_,h,n);return this.dataProvider[i._FETCHBYOFFSET](E).then((function(t){let s=t[i._RESULTS],r=t[i._DONE],n=new Array;return s.forEach((function(t){let s=e._getMappedItems([t]);n.push(s[0])})),new e.FetchByOffsetResults(e,E,n,r)}))}fetchFirst(t){let e={};e[i._ITEMS]=[],e[i._DONE]=!1,e[i._STARTINDEX]=0;let s=null!=t?t[i._SIZE]:null,r=null!=t?t[i._SORTCRITERIA]:null;null==r&&(r=this[i._SORTCRITERIA]);let n=this._getMappedSortCriteria(r),l=null!=t?t[i._FILTERCRITERION]:null;null==l&&(l=this[i._FILTERCRITERION]);let _=this._getMappedFilterCriterion(l),a=null!=t?t[i._FETCHATTRIBUTES]:null;null==a&&(a=this[i._FETCHATTRIBUTES]);let h=this;if(null==h[i._FROM]&&h[i._OFFSET]>0){let r=h[i._OFFSET];return new this.AsyncIterable(this,new this.AsyncIterator(this,function(t){return function(){let e=new h.FetchByOffsetParameters(h,r,null,s,n,_,a);return h.dataProvider[i._FETCHBYOFFSET](e).then((function(e){var n=e.results;r+=n.length;let l=h._getMappedItems(n);h._cacheResult(t,l),t[i._DONE]=e[i._DONE];var _=l.map((function(t){return t[i._DATA]})),a=l.map((function(t){return t[i._METADATA]}));let E=e[i._FETCHPARAMETERS],T=null!=E?E[i._SORTCRITERIA]:null,u=null!=E?E[i._FILTERCRITERION]:null,o=h._getUnmappedSortCriteria(T),A=h._getUnmappedFilterCriterion(u),R=new h.FetchByOffsetParameters(h,h[i._OFFSET],null,s,o,A);return t[i._DONE]?Promise.resolve(new h.AsyncIteratorReturnResult(h,new h.FetchListResult(h,R,_,a))):Promise.resolve(new h.AsyncIteratorYieldResult(h,new h.FetchListResult(h,R,_,a)))}))}}(e),t))}{let r=new this.FetchListParameters(this,t,s,n,_,a),l=this.dataProvider[i._FETCHFIRST](r)[Symbol.asyncIterator]();return new this.AsyncIterable(this,new this.AsyncIterator(this,function(e,s){return function(){return s.next().then((function(r){let n=r[i._VALUE][i._DATA],l=r[i._VALUE][i._METADATA],a=n.map((function(t,e){return new h.Item(h,l[e],n[e])}));h._noFilterSupport&&h._filterResult(_,a);let E=h._getMappedItems(a);h._cacheResult(e,E),e[i._DONE]=r[i._DONE];let T=null!=t?t[i._SIZE]:null,u=(null!=t&&t[i._OFFSET],r[i._VALUE][i._FETCHPARAMETERS]),o=null!=u?u[i._SORTCRITERIA]:null,A=null!=u?u[i._FILTERCRITERION]:null,R=h._getUnmappedSortCriteria(o),c=h._getUnmappedFilterCriterion(A),I=new h.FetchListParameters(h,t,T,R,c);return h._fetchUntilKey(I,h[i._FROM],e,s).then((function(){return h._fetchUntilOffset(I,h[i._OFFSET]+e[i._STARTINDEX],n.length,e,s)}))}))}}(e,l),t))}}getCapability(t){return this.dataProvider.getCapability(t)}getTotalSize(){return this.dataProvider.getTotalSize()}isEmpty(){return this.dataProvider.isEmpty()}_fetchNextSet(e,s,r){let n=this;return s.next().then((function(l){var _=l[i._VALUE],a=_[i._DATA],h=_[i._METADATA],E=h.map((function(t){return t[i._KEY]}));let T=!0;return e[i._KEYS].forEach((function(e){r.has(e)||E.map((function(s,i){t.Object.compareValues(s,e)&&r.set(e,new n.Item(n,h[i],a[i]))})),r.has(e)||(T=!1)})),T||l[i._DONE]?r:n._fetchNextSet(e,s,r)}))}_fetchUntilKey(e,s,r,n){let l=this;if(null!=s){let e=r[i._ITEMS].filter((function(e){if(t.KeyUtils.equals(e[i._METADATA][i._KEY],s))return!0}));if(e.length>0){let t=r[i._ITEMS].indexOf(e[0]);r[i._ITEMS]=r[i._ITEMS].slice(t,r[i._ITEMS].length)}else{if(!r[i._DONE])return n.next().then((function(t){let e=t[i._VALUE][i._DATA],s=t[i._VALUE][i._METADATA],_=e.map((function(t,i){return new l.Item(l,s[i],e[i])})),a=l._getMappedItems(_);return l._cacheResult(r,a),r[i._DONE]=t[i._DONE],l._fetchUntilKey(t[i._FETCHPARAMETERS],a[i._KEYS],r,n)}));r[i._ITEMS]=[]}}return Promise.resolve(null)}_fetchUntilOffset(t,e,s,r,n){let l=this,_=null!=t&&t[i._SIZE]>0?t[i._SIZE]:s;e=e>0?e:0;let a=r[i._ITEMS].slice(e,e+_);if(this._noFilterSupport){let e=this._getMappedFilterCriterion(t[i._FILTERCRITERION]);this._filterResult(e,a)}if(a.length<_){if(r[i._DONE]){r[i._STARTINDEX]=r[i._STARTINDEX]+a.length;let e=a.map((function(t){return t[i._DATA]})),s=a.map((function(t){return t[i._METADATA]}));return Promise.resolve(new l.AsyncIteratorReturnResult(l,new l.FetchListResult(l,t,e,s)))}return n.next().then((function(s){let _=s[i._VALUE][i._DATA],a=s[i._VALUE][i._METADATA],h=_.map((function(t,e){return new l.Item(l,a[e],_[e])}));if(l._noFilterSupport){let e=l._getMappedFilterCriterion(t[i._FILTERCRITERION]);l._filterResult(e,h)}let E=l._getMappedItems(h);return l._cacheResult(r,E),r[i._DONE]=s[i._DONE],l._fetchUntilOffset(s[i._VALUE][i._FETCHPARAMETERS],e,_.length,r,n)}))}{r[i._STARTINDEX]=r[i._STARTINDEX]+a.length;let e=a.map((function(t){return t[i._DATA]})),s=a.map((function(t){return t[i._METADATA]}));return r[i._DONE]?Promise.resolve(new l.AsyncIteratorReturnResult(l,new l.FetchListResult(l,t,e,s))):Promise.resolve(new l.AsyncIteratorYieldResult(l,new l.FetchListResult(l,t,e,s)))}}_cacheResult(t,e){e.map((function(e){t[i._ITEMS].push(e)}))}_filterResult(t,e){if(t){t.filter||(t=s.FilterFactory.getFilter({filterDef:t}));let r=e.length-1;for(;r>=0;)t.filter(e[r][i._DATA])||e.splice(r,1),r--}}_getMappedItems(t){let e=this;if(null!=this[i._DATAMAPPING]){let s=this[i._DATAMAPPING][i._MAPFIELDS];if(null!=s&&null!=t&&t.length>0){let i=new Array;return i=t.map((function(t){return s.bind(e)(t)})),i}}return t}_getMappedFilterCriterion(t){if(null!=this[i._DATAMAPPING]){let e=this[i._DATAMAPPING][i._MAPFILTERCRITERION];if(null!=e&&null!=t)return e(t)}return t}_getMappedSortCriteria(t){if(null!=this[i._DATAMAPPING]){let e=this[i._DATAMAPPING][i._MAPSORTCRITERIA];if(null!=e&&null!=t&&t.length>0)return e(t)}return t}_getUnmappedSortCriteria(t){if(null!=this[i._DATAMAPPING]){let e=this[i._DATAMAPPING][i._UNMAPSORTCRITERIA];if(null!=e&&null!=t&&t.length>0)return e(t)}return t}_getUnmappedFilterCriterion(t){if(null!=this[i._DATAMAPPING]){let e=this[i._DATAMAPPING][i._UNMAPFILTERCRITERION];if(null!=e&&null!=t)return e(t)}return t}_addEventListeners(t){let e=this;t[i._ADDEVENTLISTENER](i._REFRESH,(function(t){e.dispatchEvent(t)})),t[i._ADDEVENTLISTENER](i._MUTATE,(function(t){e.dispatchEvent(t)}))}}
/**
 * @preserve Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
return i._KEY="key",i._KEYS="keys",i._DATA="data",i._STARTINDEX="startIndex",i._SORT="sort",i._SORTCRITERIA="sortCriteria",i._FILTERCRITERION="filterCriterion",i._METADATA="metadata",i._ITEMS="items",i._FROM="from",i._OFFSET="offset",i._REFRESH="refresh",i._MUTATE="mutate",i._SIZE="size",i._FETCHPARAMETERS="fetchParameters",i._VALUE="value",i._DONE="done",i._DATAMAPPING="dataMapping",i._MAPFIELDS="mapFields",i._MAPSORTCRITERIA="mapSortCriteria",i._MAPFILTERCRITERION="mapFilterCriterion",i._UNMAPSORTCRITERIA="unmapSortCriteria",i._UNMAPFILTERCRITERION="unmapFilterCriterion",i._RESULTS="results",i._CONTAINSPARAMETERS="containsParameters",i._DEFAULT_SIZE=25,i._CONTAINSKEYS="containsKeys",i._FETCHBYKEYS="fetchByKeys",i._FETCHBYOFFSET="fetchByOffset",i._FETCHFIRST="fetchFirst",i._ADDEVENTLISTENER="addEventListener",i._FETCHATTRIBUTES="attributes",t.ListDataProviderView=i,t.ListDataProviderView=i,t.EventTargetMixin.applyMixin(i),i}));
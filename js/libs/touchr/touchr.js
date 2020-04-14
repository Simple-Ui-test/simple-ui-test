/**
 * Licenced under the MIT License
 *
 * Copyright (c) 2010 Seznam.cz, a.s.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * @license
 */
!function(e){var t,n=!!e.navigator.msPointerEnabled,r=!!e.navigator.pointerEnabled||!!e.PointerEvent;if(!!e.navigator.maxTouchPoints>0&&(n||r&&!e.TouchEvent)){var i,o=e.document,a=r?"pointerdown":"MSPointerDown",c=r?"pointerup":"MSPointerUp",s=r?"pointermove":"MSPointerMove",u=r?"pointercancel":"MSPointerCancel",d=r?"touch":MSPointerEvent.MSPOINTER_TYPE_TOUCH,h=r?"mouse":MSPointerEvent.MSPOINTER_TYPE_MOUSE,l=(r||MSPointerEvent.MSPOINTER_TYPE_PEN,r?"touchAction":"msTouchAction"),p=180/Math.PI,v=e.Touchr_ALLOWED_POINTER_TYPE||1,f=function(e,t,n){var r,i=o.createEvent("Event");for(r in i.initEvent(e,!0,!0),n)i[r]=n[r];t.dispatchEvent(i)},g=function(){var e=Math.pow(2,32)-1,t=Object.prototype.hasOwnProperty;function n(e){return e>>>0}return function(r){var i=0;return(r=r||{}).length={get:function(){var r=+function(r){var i,o=-1;for(i in r)String(n(i))===i&&n(i)!==e&&t.call(r,i)&&i>o&&(o=i);return o}(this);return Math.max(i,r+1)},set:function(e){var t=n(e);if(t!==+e)throw new RangeError;for(var r=t,o=this.length;r<o;r++)delete this[r];i=t}},r.toString={value:Array.prototype.join},Object.create(Array.prototype,r)}}(),E=(t={identifiedTouch:{value:function(e){for(var t=this.length;t--;)if(this[t].identifier===e)return this[t]}},item:{value:function(e){return this[e]}},_touchIndex:{value:function(e){for(var t=this.length;t--;)if(this[t].pointerId==e.pointerId)return t;return-1}},_addAll:{value:function(e){for(var t=0,n=e.length;t<n;t++)this._add(e[t])}},_add:{value:function(e){var t=this._touchIndex(e);t=t<0?this.length:t,e.type=s,e.identifier=e.pointerId,e.force=e.pressure,e.radiusX=e.radiusY=1,e.rotationAngle=0,this[t]=e}},_remove:{value:function(e){var t=this._touchIndex(e);t>=0&&this.splice(t,1)}}},function(){var e=g(t);return 1===arguments.length?e.length=arguments[0]:e.push.apply(e,arguments),e}),_={},T=e.MSGesture?new MSGesture:null,y=1,S=0,M=[],L=function(e,t){return!!t&&(e===t||L(e,t.parentNode))},m=function(e){var t,n,r,l,p,g=e.target;if(((E=e.pointerType)==d?1:E==h?2:4)&v){var E;if(e.type===a&&(i._add(e),_[e.pointerId]=e.target,t="touchstart",T&&i.length>1))for(T.target=e.target,n=0;n<i.length;n++)i[n].pointerType===d&&T.addPointer(i[n].pointerId);for(e.type===s&&i.identifiedTouch(e.pointerId)&&(i._add(e),t="touchmove"),l=o.createTouchList(e),p=o.createTouchList(),n=0;n<i.length;n++)L(g,_[i[n].identifier])&&p._add(i[n]);r=_[e.pointerId],e.type!==c&&e.type!==u||(i._remove(e),_[e.pointerId]=null,delete _[e.pointerId],t="touchend",T&&i.length<=1&&T.stop()),t&&r&&f(t,r,{touches:i,changedTouches:l,targetTouches:p})}},P=function(e){var t,n,r;"MSGestureStart"===e.type?t="gesturestart":"MSGestureChange"===e.type?t="gesturechange":"MSGestureEnd"===e.type&&(t="gestureend"),"MSGestureStart"===e.type?(n=y=1,r=S=0):(n=y+=e.scale-1,r=S+=e.rotation*p),f(t,e.target,{scale:n,rotation:r,screenX:e.screenX,screenY:e.screenY})},I=function(e){var t=H,n=N,r=e.prototype.addEventListener,i=e.prototype.removeEventListener;e.prototype.addEventListener=function(e,n,i){0!==e.indexOf("gesture")&&0!==e.indexOf("touch")||t.call(this,e,n,i),r.call(this,e,n,i)},e.prototype.removeEventListener=function(e,t,r){0!==e.indexOf("gesture")&&0!==e.indexOf("touch")||n.call(this,e,t,r),i.call(this,e,t,r)}},H=function(e,t,n){var r=9==this.nodeType?this:this.ownerDocument;M.indexOf(r)<0&&(M.push(r),r.addEventListener(a,m,n),r.addEventListener(s,m,n),r.addEventListener(c,m,n),r.addEventListener(u,m,n),r.addEventListener("MSGestureStart",P,n),r.addEventListener("MSGestureChange",P,n),r.addEventListener("MSGestureEnd",P,n)),"touchmove"!==e||!this.style||void 0!==this.style[l]&&this.style[l]||(this._touchActionUpdated=!0,this.style[l]="none",this.hasAttribute("draggable")||O(this))},O=function(e){var t,n,r,i,u,d,h,l=[];r=function(t){var n,i;return null==t?null:(n=t._cachedClientHeight||t.clientHeight,i=t._cachedScrollHeight||t.scrollHeight,t._cachedClientHeight=n,t._cachedScrollHeight=i,-1===l.indexOf(t)&&l.push(t),!isNaN(n)&&!isNaN(i)&&Math.abs(i-n)>1?t==o.documentElement?o.body:t:e!=t?r(t.parentNode):null)},i=function(){for(var e=0;e<l.length;e++)l[e]._cachedClientHeight=null,l[e]._cachedScrollHeight=null;l.length=0},u=function(e){"touch"===e.pointerType&&(i(),t=e.clientY,(n=r(e.target))&&e.stopPropagation())},d=function(e){var i,a,c;if("touch"===event.pointerType){if(null!=t&&n&&(i=n.scrollTop,a=t-event.clientY,n.scrollTop=i+a,a>=1&&i==n.scrollTop))for(c=r(n.parentNode);c&&(i=c.scrollTop,c.scrollTop=i+a,c!==o.body&&c.scrollTop==i);)c=r(c.parentNode);t=event.clientY}},h=function(e){i(),t=void 0},e.addEventListener(a,u),e.addEventListener(s,d),e.addEventListener(c,h),e._pointerHandlers=[u,d,h]},N=function(e,t,n){var r;"touchmove"===e&&(this._touchActionUpdated&&delete this.style[l],(r=this)._pointerHandlers&&(r.removeEventListener(a,r._pointerHandlers[0]),r.removeEventListener(s,r._pointerHandlers[1]),r.removeEventListener(c,r._pointerHandlers[2]),r._pointerHandlers=void 0))};o.createTouchList=function(e){var t=new E;return e&&(e.length?t._addAll(e):t._add(e)),t},o.createTouch=function(e,t,n,r,i,o,a){return{identifier:n,screenX:o,screenY:a,pageX:r,pageY:i,target:t}},e.ontouchstart||(e.ontouchstart=1),i=o.createTouchList(),I(HTMLElement),I(Document)}}(window);
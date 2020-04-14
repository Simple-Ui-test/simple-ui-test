define(["./DvtToolkit"],(function(t){"use strict";
/**
 * @license
 * Copyright (c) %FIRST_YEAR% %CURRENT_YEAR%, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */return function(t){
/**
 * @license
 * Copyright (c) %FIRST_YEAR% %CURRENT_YEAR%, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
t.PanZoomComponent=function(t,n,a){this.Init(t,n,a)},t.Obj.createSubclass(t.PanZoomComponent,t.BaseComponent),t.PanZoomComponent.prototype.Init=function(n,a,o){t.PanZoomComponent.superclass.Init.call(this,n,a,o),this._bSupportsVectorEffects=!(("ie"===t.Agent.browser||"edge"===t.Agent.browser)&&t.Agent.version<=11),this._resourcesMap=null,this._panAnimator=null,this._panningInterrupted=!1},t.PanZoomComponent.prototype.getPanZoomCanvas=function(){return this._panZoomCanvas},t.PanZoomComponent.prototype.render=function(t,n,a){this.Width=n,this.Height=a,this._isResize=!t,this.IsResize()&&!this.getPanZoomCanvas()||(this.PreRender(),this.IsResize()||this.SetOptions(t),this.Render(t,n,a),this.UpdateAriaAttributes())},t.PanZoomComponent.prototype.supportsVectorEffects=function(){return this._bSupportsVectorEffects},t.PanZoomComponent.prototype.HandlePanEvent=function(t){},t.PanZoomComponent.prototype.HandleZoomEvent=function(t){},t.PanZoomComponent.prototype.IsResize=function(){return this._isResize},t.PanZoomComponent.prototype.PreRender=function(){},t.PanZoomComponent.prototype.Render=function(){this.IsResize()?this._panZoomCanvas.setSize(this.getWidth(),this.getHeight()):(this._panZoomCanvas&&(this.removeChild(this._panZoomCanvas),this._panZoomCanvas=null),this._panZoomCanvas=new t.PanZoomCanvas(this.getCtx(),this.getWidth(),this.getHeight(),this),this._panZoomCanvas.addEvtListener("dvtPan",this.HandlePanEvent,!1,this),this._panZoomCanvas.addEvtListener("dvtZoom",this.HandleZoomEvent,!1,this),this.addChild(this._panZoomCanvas));var n=new t.ClipPath("comp");n.addRect(this.getTranslateX(),this.getTranslateY(),this.getWidth(),this.getHeight()),this.setClipPath(n)},t.PanZoomComponent.prototype.SetOptions=function(t){this.Options=this.Defaults?this.Defaults.calcOptions(t):t},t.PanZoomComponent.prototype.destroy=function(){this._panZoomCanvas&&(this._panZoomCanvas.destroy(),this._panZoomCanvas=null),t.PanZoomComponent.superclass.destroy.call(this)},t.PanZoomComponent.prototype.ensureObjInViewport=function(n,a){if(this._panZoomCanvas.isPanningEnabled()){this._panAnimator&&(this._panningInterrupted=!0,this._panAnimator.stop());var o=this.Width,i=this.Height,e=a.getKeyboardBoundingBox(this.getCtx().getStage()),s=new t.Rectangle(0,0,o,i);if(!s.getUnion(e).equals(s)){var r=0,h=0,m=e.w,_=e.h,c=e.x,l=e.y;m<=o?c<0?r=c:c+m>o&&(r=c+m-o):r=c+.5*m-.5*o,_<=i?l<0?h=l:l+_>i&&(h=l+_-i):h=l+.5*_-.5*i;var u=new t.Animator(this.getCtx(),this.getAnimationDuration());this._panAnimator=u;var g=this;this.getPanZoomCanvas().panBy(-r,-h,u,(function(){g._panAnimator=null,g.getEventManager().showFocusEffect(n,a),g._panningInterrupted=!1})),u.play()}}},t.PanZoomComponent.prototype.isPanning=function(){return null!=this._panAnimator||this._panningInterrupted},
/**
 * @license
 * Copyright (c) 2011 %CURRENT_YEAR%, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
t.PanZoomCanvas=function(t,n,a,o){this.Init(t,n,a,o)},t.Obj.createSubclass(t.PanZoomCanvas,t.Container),t.PanZoomCanvas.DEFAULT_PAN_INCREMENT=15,t.PanZoomCanvas.DEFAULT_ZOOM_INCREMENT=.05,t.PanZoomCanvas.DEFAULT_ANIMATION_DURATION=.5,t.PanZoomCanvas.DEFAULT_PADDING=20,t.PanZoomCanvas.prototype.Init=function(n,a,o,i){t.PanZoomCanvas.superclass.Init.call(this,n),this._view=i,this._ww=a,this._hh=o,this._px=0,this._py=0,this._mx=0,this._my=0,this._minPanX=null,this._maxPanX=null,this._minPanY=null,this._maxPanY=null,this._minZoom=.1,this._maxZoom=1,this._panIncrement=t.PanZoomCanvas.DEFAULT_PAN_INCREMENT,this._zoomIncrement=t.PanZoomCanvas.DEFAULT_ZOOM_INCREMENT,this._zoomToFitPadding=t.PanZoomCanvas.DEFAULT_PADDING,this._bPanningEnabled=!0,this._panDirection="auto",this._bZoomingEnabled=!0,this._bZoomToFitEnabled=!0,this._backgroundPane=new t.Rect(this.getCtx(),0,0,this._ww,this._hh),this.addChild(this._backgroundPane),this._backgroundPane.setInvisibleFill(),this._contentPane=new t.Container(this.getCtx()),this.addChild(this._contentPane),this._contentPane.setMatrix(new t.Matrix),this._animationDuration=t.PanZoomCanvas.DEFAULT_ANIMATION_DURATION,this._eventManager=new t.PanZoomCanvasEventManager(n,this.FireListener,this),this._eventManager.addListeners(this),this._clipIdSuffix=1,this.SetClipRect(a,o),this._bElasticConstraints=!1,this._elasticConstraintsAnim=null},t.PanZoomCanvas.prototype.setSize=function(t,n,a){this._ww=t,this._hh=n,a||(this._backgroundPane.setWidth(t),this._backgroundPane.setHeight(n),this.SetClipRect(t,n))},t.PanZoomCanvas.prototype.getSize=function(){return new t.Dimension(this._ww,this._hh)},t.PanZoomCanvas.prototype.SetClipRect=function(n,a){var o=new t.ClipPath("pzc");o.addRect(this.getTranslateX(),this.getTranslateY(),n,a),this.setClipPath(o)},t.PanZoomCanvas.prototype.getContentPane=function(){return this._contentPane},t.PanZoomCanvas.prototype.setContentPane=function(t){this._contentPane=t},t.PanZoomCanvas.prototype.getBackgroundPane=function(){return this._backgroundPane},t.PanZoomCanvas.prototype.getContentPaneMatrix=function(t){if(t){var n=t.getDestVal(this._contentPane,this._contentPane.getMatrix);if(n)return n}return this._contentPane.getMatrix()},t.PanZoomCanvas.prototype.getZoom=function(t){return this.getContentPaneMatrix(t).getA()},t.PanZoomCanvas.prototype.getPanX=function(t){return this.getContentPaneMatrix(t).getTx()},t.PanZoomCanvas.prototype.getPanY=function(t){return this.getContentPaneMatrix(t).getTy()},t.PanZoomCanvas.prototype.setZoomToFitPadding=function(t){this._zoomToFitPadding=t},t.PanZoomCanvas.prototype.getZoomToFitPadding=function(){return this._zoomToFitPadding},t.PanZoomCanvas.prototype.panBy=function(n,a,o,i){if(this.isPanningEnabled()){var e=this.getPanX(o),s=this.getPanY(o),r="y"==this.getPanDirection()?e:this.ConstrainPanX(e+n),h="x"==this.getPanDirection()?s:this.ConstrainPanY(s+a),m=r-e,_=h-s,c=null;o&&(c=o.getDestVal(this._contentPane,this._contentPane.getMatrix)),c||(c=this._contentPane.getMatrix()),c=c.translate(m,_);var l=this,u=function(){l.FirePanEvent("panning",r,h,e,s,o)},g=function(){l.FirePanEvent("panned",r,h,e,s,o)};o?(o.addProp(t.Animator.TYPE_MATRIX,this._contentPane,this._contentPane.getMatrix,this._contentPane.setMatrix,c),t.Playable.prependOnInit(o,u),t.Playable.appendOnEnd(o,g),i&&t.Playable.appendOnEnd(o,i)):(u(),this._contentPane.setMatrix(c),g(),i&&i())}},t.PanZoomCanvas.prototype.panTo=function(t,n,a){if(this.isPanningEnabled()){var o=t-this.getPanX(a),i=n-this.getPanY(a);this.panBy(o,i,a)}},t.PanZoomCanvas.prototype.zoomBy=function(n,a,o,i){if(this.isZoomingEnabled()){a||0===a||(a=this._ww/2),o||0===o||(o=this._hh/2);var e=this.getZoom(i),s=this.ConstrainZoom(e*n),r=s/e,h=null;i&&(h=i.getDestVal(this._contentPane,this._contentPane.getMatrix)),h||(h=this._contentPane.getMatrix()),h=h.scale(r,r,a,o);var m=this.ConstrainPanX(h.getTx())-h.getTx(),_=this.ConstrainPanY(h.getTy())-h.getTy();this.FireZoomEvent("adjustPanConstraints",s,e,i,a,o,m,_),m=this.ConstrainPanX(h.getTx())-h.getTx(),_=this.ConstrainPanY(h.getTy())-h.getTy(),h=h.translate(m,_);var c=this,l=function(){c.FireZoomEvent("zooming",s,e,i,a,o,m,_)},u=function(){c.FireZoomEvent("zoomed",c.getZoom(),e,i,a,o,m,_)};i?(i.addProp(t.Animator.TYPE_MATRIX,this._contentPane,this._contentPane.getMatrix,this._contentPane.setMatrix,h),t.Playable.prependOnInit(i,l),t.Playable.appendOnEnd(i,u)):(l(),this._contentPane.setMatrix(h),u())}},t.PanZoomCanvas.prototype.zoomTo=function(t,n,a,o){if(this.isZoomingEnabled()){var i=t/this.getZoom(o);this.zoomBy(i,n,a,o)}},t.PanZoomCanvas.prototype.center=function(t,n){var a=this.isPanningEnabled(),o=this.getPanDirection();this.setPanningEnabled(!0),this.setPanDirection("auto");var i=n;i||(i=this._contentPane.getDimensions());var e=(i.x+i.w/2)*this.getZoom(),s=(i.y+i.h/2)*this.getZoom(),r=this._ww/2-e,h=this._hh/2-s;this.panTo(r,h,t),this.setPanningEnabled(a),this.setPanDirection(o)},t.PanZoomCanvas.prototype.zoomToFit=function(n,a){if(this.isZoomToFitEnabled()){var o=this.isPanningEnabled(),i=this.getPanDirection(),e=this.isZoomingEnabled();this.setPanningEnabled(!0),this.setPanDirection("auto"),this.setZoomingEnabled(!0);try{var s=a||this._contentPane.getDimensions();if(!s)return;var r=(this._ww-2*this._zoomToFitPadding)/s.w,h=(this._hh-2*this._zoomToFitPadding)/s.h,m=Math.min(r,h);m=this.ConstrainZoom(m);var _=(s.x+s.w/2)*m,c=(s.y+s.h/2)*m,l=this._ww/2-_,u=this._hh/2-c,g=this.getZoom(n),P=this,p=function(){P.FireZoomEvent("zoomToFitBegin",null,null,n)},v=function(){P.FireZoomEvent("zoomToFitEnd",P.getZoom(),g,n)};n?t.Playable.prependOnInit(n,p):p(),this.zoomTo(m,0,0,n),this.panTo(l,u,n),n?t.Playable.appendOnEnd(n,v):v()}finally{this.setPanningEnabled(o),this.setPanDirection(i),this.setZoomingEnabled(e)}}},t.PanZoomCanvas.prototype.calcZoomToFitScale=function(t){t||(t=this._contentPane.getDimensions());var n=(this._ww-2*this._zoomToFitPadding)/t.w,a=(this._hh-2*this._zoomToFitPadding)/t.h,o=Math.min(n,a);return o=this.ConstrainZoom(o)},t.PanZoomCanvas.prototype.calcZoomToFitBounds=function(){var t=this._contentPane.getDimensions();return t.x-=this._zoomToFitPadding,t.y-=this._zoomToFitPadding,t.w+=2*this._zoomToFitPadding,t.h+=2*this._zoomToFitPadding,t},t.PanZoomCanvas.prototype.getViewport=function(){var n=this.localToStage(new t.Point(0,0)),a=this.localToStage(new t.Point(this._ww,this._hh)),o=this.getContentPane().stageToLocal(n),i=this.getContentPane().stageToLocal(a);return new t.Rectangle(o.x,o.y,i.x-o.x,i.y-o.y)},t.PanZoomCanvas.prototype.SetElasticConstraints=function(n){if(this._bElasticConstraints=n,n)this._elasticConstraintsAnim&&(this._elasticConstraintsAnim.isRunning()&&this._elasticConstraintsAnim.stop(),this._elasticConstraintsAnim=null);else{var a=this.getPanX(),o=this.getPanY(),i=this.getZoom();this._bElasticPan=a!=this.ConstrainPanX(a)||o!=this.ConstrainPanY(o),this._bElasticZoom=i!=this.ConstrainZoom(i),(this._bElasticPan||this._bElasticZoom)&&(this._elasticConstraintsAnim=new t.Animator(this.getCtx(),.4),this._elasticConstraintsAnim.setEasing(t.Easing.cubicOut),this._bElasticZoom&&this.zoomBy(1,.5*this._ww,.5*this._hh,this._elasticConstraintsAnim),this._bElasticPan&&this.panBy(0,0,this._elasticConstraintsAnim),t.Playable.appendOnEnd(this._elasticConstraintsAnim,this._elasticConstraintsAnimOnEnd,this),this._bElasticPan&&this.FirePanEvent("elasticAnimBegin",null,null,null,null,this._elasticConstraintsAnim),this._bElasticZoom&&this.FireZoomEvent("elasticAnimBegin",null,null,null,null,this._elasticConstraintsAnim),this._elasticConstraintsAnim.play())}},t.PanZoomCanvas.prototype.IsElasticConstraints=function(){return this._bElasticConstraints},t.PanZoomCanvas.prototype._elasticConstraintsAnimOnEnd=function(){this._elasticConstraintsAnim=null,this._bElasticPan&&this.FirePanEvent("elasticAnimEnd"),this._bElasticZoom&&this.FireZoomEvent("elasticAnimEnd")},t.PanZoomCanvas.prototype._panDampingFunc=function(t,n){var a=.01*n;return Math.sqrt(4*a*t)},t.PanZoomCanvas.prototype._zoomDampingFunc=function(t,n){var a=.002*n;return Math.sqrt(4*a*t)},t.PanZoomCanvas.prototype.ConstrainPanX=function(t){var n=t;if(null!=this._minPanX&&n<this._minPanX)if(this.IsElasticConstraints()){var a=this._minPanX-n;n=this._minPanX-this._panDampingFunc(a,this._ww)}else n=this._minPanX;if(null!=this._maxPanX&&n>this._maxPanX)if(this.IsElasticConstraints()){a=n-this._maxPanX;n=this._maxPanX+this._panDampingFunc(a,this._ww)}else n=this._maxPanX;return n},t.PanZoomCanvas.prototype.ConstrainPanY=function(t){var n=t;if(null!=this._minPanY&&n<this._minPanY)if(this.IsElasticConstraints()){var a=this._minPanY-n;n=this._minPanY-this._panDampingFunc(a,this._hh)}else n=this._minPanY;if(null!=this._maxPanY&&n>this._maxPanY)if(this.IsElasticConstraints()){a=n-this._maxPanY;n=this._maxPanY+this._panDampingFunc(a,this._hh)}else n=this._maxPanY;return n},t.PanZoomCanvas.prototype.ConstrainZoom=function(t){var n=Math.max(0,t);if(this._minZoom&&n<this._minZoom)if(this.IsElasticConstraints()){var a=this._minZoom-n;n=this._minZoom-this._zoomDampingFunc(a,this._maxZoom-this._minZoom)}else n=this._minZoom;if(this._maxZoom&&n>this._maxZoom)if(this.IsElasticConstraints()){a=n-this._maxZoom;n=this._maxZoom+this._zoomDampingFunc(a,this._maxZoom-this._minZoom)}else n=this._maxZoom;return n},t.PanZoomCanvas.RoundFloatForCompare=function(t){return Math.round(1e5*t)},t.PanZoomCanvas.prototype.GetRelativeMousePosition=function(t){return this.getCtx().pageToStageCoords(t.pageX,t.pageY)},t.PanZoomCanvas.prototype.FirePanEvent=function(n,a,o,i,e,s){var r=t.EventFactory.newPanEvent(n,a,o,i,e,s);this.FireListener(r)},t.PanZoomCanvas.prototype.FireZoomEvent=function(n,a,o,i,e,s,r,h){var m=t.EventFactory.newZoomEvent(n,a,o,i,new t.Point(e,s),r,h);return this.FireListener(m),m},t.PanZoomCanvas.prototype.zoomAndCenter=function(){this.FireZoomEvent("zoomAndCenter")},t.PanZoomCanvas.prototype.getNextZoomLevel=function(t){var n=t;return(n+=this.getZoomIncrement())>this.getMaxZoom()&&(n=this.getMaxZoom()),n},t.PanZoomCanvas.prototype.getPrevZoomLevel=function(t){var n=t;return(n-=this.getZoomIncrement())<this.getMinZoom()&&(n=this.getMinZoom()),n},t.PanZoomCanvas.prototype.setZoomIncrement=function(t){this._zoomIncrement=t},t.PanZoomCanvas.prototype.getZoomIncrement=function(){return this._zoomIncrement},t.PanZoomCanvas.prototype.setPanIncrement=function(t){this._panIncrement=t},t.PanZoomCanvas.prototype.getPanIncrement=function(){return this._panIncrement},t.PanZoomCanvas.prototype.setMinZoom=function(t){this._minZoom=t},t.PanZoomCanvas.prototype.getMinZoom=function(){return this._minZoom},t.PanZoomCanvas.prototype.setMaxZoom=function(t){t<0&&(t=1),this._maxZoom=t},t.PanZoomCanvas.prototype.getMaxZoom=function(){return this._maxZoom},t.PanZoomCanvas.prototype.setMinPanX=function(t){this._minPanX=t},t.PanZoomCanvas.prototype.getMinPanX=function(){return this._minPanX},t.PanZoomCanvas.prototype.setMaxPanX=function(t){this._maxPanX=t},t.PanZoomCanvas.prototype.getMaxPanX=function(){return this._maxPanX},t.PanZoomCanvas.prototype.setMinPanY=function(t){this._minPanY=t},t.PanZoomCanvas.prototype.getMinPanY=function(){return this._minPanY},t.PanZoomCanvas.prototype.setMaxPanY=function(t){this._maxPanY=t},t.PanZoomCanvas.prototype.getMaxPanY=function(){return this._maxPanY},t.PanZoomCanvas.prototype.setAnimationDuration=function(t){this._animationDuration=t},t.PanZoomCanvas.prototype.getAnimationDuration=function(){return this._animationDuration},t.PanZoomCanvas.prototype.setPanningEnabled=function(t){this._bPanningEnabled=t},t.PanZoomCanvas.prototype.isPanningEnabled=function(){return this._bPanningEnabled},t.PanZoomCanvas.prototype.setPanDirection=function(t){this._panDirection=t},t.PanZoomCanvas.prototype.getPanDirection=function(){return this._panDirection},t.PanZoomCanvas.prototype.setZoomingEnabled=function(t){this._bZoomingEnabled=t},t.PanZoomCanvas.prototype.isZoomingEnabled=function(){return this._bZoomingEnabled},t.PanZoomCanvas.prototype.setZoomToFitEnabled=function(t){this._bZoomToFitEnabled=t},t.PanZoomCanvas.prototype.isZoomToFitEnabled=function(){return this._bZoomToFitEnabled},t.PanZoomCanvas.prototype.setCurrentTouchTargets=function(t){this._currTargets=t},t.PanZoomCanvas.prototype.getCurrentTouchTargets=function(){return this._currTargets},t.PanZoomCanvas.prototype.resetTouchTargets=function(){t.Agent.isTouchDevice()&&(this._currTargets=null,this._eventManager.TouchManager.reset())},t.PanZoomCanvas.prototype.panZoomEnd=function(){this._eventManager.PanZoomEnd()},t.PanZoomCanvas.prototype.setInteractionEnabled=function(t){t?this._eventManager.addListeners(this):this._eventManager.removeListeners(this)},t.PanZoomCanvas.prototype.destroy=function(){this._elasticConstraintsAnim&&(this._elasticConstraintsAnim.stop(!0),this._elasticConstraintsAnim=null),this._eventManager&&(this._eventManager.removeListeners(this),this._eventManager.destroy(),this._eventManager=null),t.PanZoomCanvas.superclass.destroy.call(this)},t.PanZoomCanvas.prototype.getCursor=function(n){return this._bPanningEnabled?n?t.ToolkitUtils.getGrabbingCursor():t.ToolkitUtils.getGrabCursor():"inherit"},
/**
 * @license
 * Copyright (c) 2011 %CURRENT_YEAR%, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
t.PanZoomCanvasEventManager=function(t,n,a){this.Init(t,n,a)},t.Obj.createSubclass(t.PanZoomCanvasEventManager,t.EventManager),t.PanZoomCanvasEventManager.EVENT_INFO_PANNED_KEY="panned",t.PanZoomCanvasEventManager.prototype.Init=function(n,a,o){t.PanZoomCanvasEventManager.superclass.Init.call(this,n,a,o),this._pzc=o,this._zoomAnimator=null,this._bPanning=!1,this._bPanned=!1,this._bZooming=!1,this._bDragging=!1,this._bMomentumPanning=!0},t.PanZoomCanvasEventManager._PAN_TOUCH_KEY="panTouch",t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY="zoomTouch",t.PanZoomCanvasEventManager._MOMENTUM_START_TIMER_INTERVAL=50,t.PanZoomCanvasEventManager.prototype.addListeners=function(n){t.PanZoomCanvasEventManager.superclass.addListeners.call(this,n),n.addEvtListener(t.MouseEvent.MOUSEWHEEL,this.OnMouseWheel,!1,this)},t.PanZoomCanvasEventManager.prototype.RemoveListeners=function(n){t.PanZoomCanvasEventManager.superclass.RemoveListeners.call(this,n),n.removeEvtListener(t.MouseEvent.MOUSEWHEEL,this.OnMouseWheel,!1,this)},t.PanZoomCanvasEventManager.prototype.OnMouseDown=function(n){if(this._bDragging=!1,this._bPanned=!1,n.button!=t.MouseEvent.RIGHT_CLICK_BUTTON){var a=this._callbackObj.GetRelativeMousePosition(n);this._mx=a.x,this._my=a.y,this._px=this._mx,this._py=this._my,this._bDown=!0,this._origPanX=this._callbackObj.getPanX(),this._origPanY=this._callbackObj.getPanY(),this._origZoom=this._callbackObj.getZoom(),this._bMomentumPanning&&(this._currTime=(new Date).getTime())}this._momentumTimer&&this._momentumTimer.isRunning()&&(this._momentumTimer.stop(),this._momentumTimer.reset())},t.PanZoomCanvasEventManager.prototype.OnMouseMove=function(n){var a=this._callbackObj.GetRelativeMousePosition(n);if(!(Math.abs(a.x-this._px)<=3&&Math.abs(a.y-this._py)<=3)){if(this._bDown){this._bDragging=!0;var o=(a=this._callbackObj.GetRelativeMousePosition(n)).x,i=a.y;if(n.ctrlKey){this._bZooming||(this._callback.call(this._callbackObj,t.EventFactory.newZoomEvent("dragZoomBegin")),this._bZooming=!0,this._callbackObj.SetElasticConstraints(!0));var e=this._py>=i?1:-1,s=this._origZoom*Math.pow(1+.01*e,Math.abs(this._py-i));this._callbackObj.isPanningEnabled()?this._callbackObj.zoomTo(s,this._px,this._py):this._callbackObj.zoomTo(s,null,null)}else this._handlePanMove(o,i);this._mx=o,this._my=i}this._callbackObj.setCursor(this._callbackObj.getCursor(this._bDown))}},t.PanZoomCanvasEventManager.prototype.OnMouseUp=function(n){this.PanZoomEnd(),t.PanZoomCanvasEventManager.superclass.OnMouseUp.call(this,n)},t.PanZoomCanvasEventManager.prototype.OnClick=function(n){(this._bDragging||this._bPanned)&&(this._bDragging=!1,this._bPanned=!1,t.EventManager.consumeEvent(n))},t.PanZoomCanvasEventManager.prototype.OnMouseOut=function(n){this._bDown&&(this._bPanning||this._bZooming)&&(n.relatedTarget&&null!=n.relatedTarget||this.OnMouseUp(n)),t.PanZoomCanvasEventManager.superclass.OnMouseOut.call(this,n)},t.PanZoomCanvasEventManager.prototype.OnMouseWheel=function(n){if(n.wheelDelta&&0!==n.wheelDelta&&this._callbackObj.isZoomingEnabled()){var a=this._callbackObj.getZoom();if(this._zoomAnimator){var o=this._zoomAnimator;this._zoomAnimator.stop(),a=this._callbackObj.getZoom(o),this._zoomAnimator=null,o=null}this._zoomAnimator=null;var i=n.wheelDelta,e=a*(1+this._callbackObj.getZoomIncrement()*i/Math.abs(i)),s=this._callbackObj.GetRelativeMousePosition(n);n.stopPropagation(),n.preventDefault(),this._callbackObj.isPanningEnabled()?this._callbackObj.zoomTo(e,s.x,s.y,this._zoomAnimator):this._callbackObj.zoomTo(e,null,null,this._zoomAnimator),this._zoomAnimator&&(t.Playable.appendOnEnd(this._zoomAnimator,this._clearZoomAnimator,this),this._zoomAnimator.play())}},t.PanZoomCanvasEventManager.prototype._clearZoomAnimator=function(){this._zoomAnimator=null},t.PanZoomCanvasEventManager.prototype._handleMomentumStartTimer=function(){},t.PanZoomCanvasEventManager.prototype._handleMomentumTimer=function(){var t=1-.04*this._momentumIterCount;t*=t;var n=this._momentumTimer.getInterval(),a=t*this._momentumXperMS*n,o=t*this._momentumYperMS*n;this._momentumDx+=a,this._momentumDy+=o;var i=this._origPanX+this._mx-this._px+this._momentumDx,e=this._origPanY+this._my-this._py+this._momentumDy;this._callbackObj.panTo(i,e);var s=!1;if(this._momentumIterCount>=24)s=!0;else{var r=this._callbackObj.getPanX(),h=this._callbackObj.getPanY(),m=this._pzc.getPanDirection();(Math.abs(r-i)>Math.abs(a)&&"y"!=m||Math.abs(h-e)>Math.abs(o)&&"x"!=m)&&(s=!0)}s?(this._momentumTimer.stop(),this._momentumTimer.reset(),this._callbackObj.SetElasticConstraints(!1)):this._momentumIterCount++},t.PanZoomCanvasEventManager.prototype.HandleImmediateTouchStartInternal=function(n){this._callbackObj.isZoomingEnabled()&&this.TouchManager.processAssociatedTouchAttempt(n,t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY,this.ZoomStartTouch,this),this._callbackObj.isPanningEnabled()&&this.TouchManager.processAssociatedTouchAttempt(n,t.PanZoomCanvasEventManager._PAN_TOUCH_KEY,this.PanStartTouch,this)},t.PanZoomCanvasEventManager.prototype.HandleImmediateTouchMoveInternal=function(n){this._callbackObj.isZoomingEnabled()&&this.TouchManager.processAssociatedTouchMove(n,t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY),this._callbackObj.isPanningEnabled()&&this.TouchManager.processAssociatedTouchMove(n,t.PanZoomCanvasEventManager._PAN_TOUCH_KEY),(this._callbackObj.isZoomingEnabled()||this._callbackObj.isPanningEnabled())&&n.preventDefault()},t.PanZoomCanvasEventManager.prototype.HandleImmediateTouchEndInternal=function(n){this._callbackObj.isZoomingEnabled()&&this.TouchManager.processAssociatedTouchEnd(n,t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY),this._callbackObj.isPanningEnabled()&&this.TouchManager.processAssociatedTouchEnd(n,t.PanZoomCanvasEventManager._PAN_TOUCH_KEY)},t.PanZoomCanvasEventManager.prototype.ZoomStartTouch=function(n,a){var o=this.TouchManager.getTouchIdsForObj(t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY);o.length<=1&&(this.TouchManager.saveProcessedTouch(a.identifier,t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY,null,t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY,t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY,this.ZoomMoveTouch,this.ZoomEndTouch,this),this._mx=a.pageX,this._my=a.pageY,this._px=this._mx,this._py=this._my,this._origPanX=this._callbackObj.getPanX(),this._origPanY=this._callbackObj.getPanY(),this._origZoom=this._callbackObj.getZoom(),this._origDist=null,o=this.TouchManager.getTouchIdsForObj(t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY),this._callbackObj.setCurrentTouchTargets(this.TouchManager.getStartTargetsByIds(o))),this._momentumTimer&&this._momentumTimer.isRunning()&&(this._momentumTimer.stop(),this._momentumTimer.reset())},t.PanZoomCanvasEventManager.prototype.ZoomMoveTouch=function(n,a){var o=this.TouchManager.getTouchIdsForObj(t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY);if(2==o.length){var i=this.TouchManager.getMultiTouchData(o);if(i){this._bZooming||(this._bZooming=!0,this.TouchManager.blockTouchHold(),this._callback.call(this._callbackObj,t.EventFactory.newZoomEvent("dragZoomBegin"))),this._callbackObj.SetElasticConstraints(!0),null==this._origDist&&(this._origDist=i.dist-i.dz);var e=this._origZoom*(i.dist/this._origDist),s=this._pzc.getCtx().pageToStageCoords(i.cx,i.cy);this.hideTooltip(),this._callbackObj.setCurrentTouchTargets(this.TouchManager.getStartTargetsByIds(o)),this._callbackObj.zoomTo(e,s.x,s.y),this._callbackObj.panBy(i.dcx,i.dcy)}}},t.PanZoomCanvasEventManager.prototype.ZoomEndTouch=function(n,a){this._bZooming&&(this._origDist=null,this.TouchManager.unblockTouchHold(),this._handleZoomEnd());var o=this.TouchManager.getTouchIdsForObj(t.PanZoomCanvasEventManager._ZOOM_TOUCH_KEY);this._callbackObj.setCurrentTouchTargets(this.TouchManager.getStartTargetsByIds(o)),0==o.length&&this._callback.call(this._callbackObj,t.EventFactory.newZoomEvent("zoomEnd",this._callbackObj.getZoom(),this._origZoom))},t.PanZoomCanvasEventManager.prototype.PanStartTouch=function(n,a){this._bZooming||this.TouchManager.getTouchIdsForObj(t.PanZoomCanvasEventManager._PAN_TOUCH_KEY).length<=1&&(this.TouchManager.saveProcessedTouch(a.identifier,t.PanZoomCanvasEventManager._PAN_TOUCH_KEY,null,t.PanZoomCanvasEventManager._PAN_TOUCH_KEY,t.PanZoomCanvasEventManager._PAN_TOUCH_KEY,this.PanMoveTouch,this.PanEndTouch,this),this._mx=a.pageX,this._my=a.pageY,this._px=this._mx,this._py=this._my,this._origPanX=this._callbackObj.getPanX(),this._origPanY=this._callbackObj.getPanY(),this._origZoom=this._callbackObj.getZoom(),this._bMomentumPanning&&(this._currTime=(new Date).getTime()));this._momentumTimer&&this._momentumTimer.isRunning()&&(this._momentumTimer.stop(),this._momentumTimer.reset())},t.PanZoomCanvasEventManager.prototype.PanMoveTouch=function(n,a){if(!this._bZooming&&1==this.TouchManager.getTouchIdsForObj(t.PanZoomCanvasEventManager._PAN_TOUCH_KEY).length){var o=a.pageX,i=a.pageY;this._handlePanMove(o,i),this._mx=o,this._my=i}},t.PanZoomCanvasEventManager.prototype.PanEndTouch=function(t,n){!this._bZooming&&this._bPanning&&(this._handlePanEnd(),this.SetEventInfo(t,"panned",!0))},t.PanZoomCanvasEventManager.prototype._handleZoomEnd=function(){this._callback.call(this._callbackObj,t.EventFactory.newZoomEvent("dragZoomEnd")),this._bZooming=!1,this._callbackObj.SetElasticConstraints(!1)},t.PanZoomCanvasEventManager.prototype._handlePanMove=function(n,a){this._bPanning||(this._callback.call(this._callbackObj,t.EventFactory.newPanEvent("dragPanBegin")),this._bPanning=!0,this._callbackObj.SetElasticConstraints(!0),this._bMomentumPanning&&(this._arLastNMouseMoves=[])),this._callbackObj.panTo(this._origPanX+n-this._px,this._origPanY+a-this._py),this._bMomentumPanning&&(this._lastTime=this._currTime,this._currTime=(new Date).getTime(),this._momentumStartTimer?(this._momentumStartTimer.isRunning()&&this._momentumStartTimer.stop(),this._momentumStartTimer.reset()):this._momentumStartTimer=new t.Timer(this._context,t.PanZoomCanvasEventManager._MOMENTUM_START_TIMER_INTERVAL,this._handleMomentumStartTimer,this,1),this._arLastNMouseMoves.push({dt:this._currTime-this._lastTime,dx:n-this._mx,dy:a-this._my}),this._arLastNMouseMoves.length>5&&this._arLastNMouseMoves.splice(0,1),this._momentumStartTimer.start())},t.PanZoomCanvasEventManager.prototype._handlePanEnd=function(){if(this._callback.call(this._callbackObj,t.EventFactory.newPanEvent("dragPanEnd")),this._bPanning=!1,this._bPanned=!0,this._momentumStartTimer&&this._momentumStartTimer.isRunning()){this._momentumStartTimer.stop(),this._momentumStartTimer.reset(),this._momentumTimer?this._momentumTimer.reset():this._momentumTimer=new t.Timer(this._context,t.PanZoomCanvasEventManager._MOMENTUM_START_TIMER_INTERVAL,this._handleMomentumTimer,this);for(var n=0,a=0,o=0,i=this._arLastNMouseMoves.length;this._arLastNMouseMoves.length>0;){var e=this._arLastNMouseMoves.pop();n+=e.dt,a+=e.dx,o+=e.dy}this._arLastNMouseMoves=null,this._momentumXperMS=a/n,this._momentumYperMS=o/n,this._momentumTimer.setInterval(Math.ceil(n/i)),this._momentumIterCount=1,this._momentumDx=0,this._momentumDy=0,this._pzc.isPanningEnabled()&&this._momentumTimer.start()}else this._callbackObj.SetElasticConstraints(!1)},t.PanZoomCanvasEventManager.prototype.PanZoomEnd=function(){this._bDown=!1,this._bDragging=!1,this._bPanning&&this._handlePanEnd(),this._bZooming&&this._handleZoomEnd(),this._callbackObj.setCursor(this._callbackObj.getCursor(this._bDown))},t.PanZoomCanvasEventManager.prototype.GetTouchResponse=function(){return this._pzc.isPanningEnabled()||this._pzc.isZoomingEnabled()?t.EventManager.TOUCH_RESPONSE_TOUCH_HOLD:t.EventManager.TOUCH_RESPONSE_AUTO},t.PanZoomCanvasEventManager.prototype.StoreInfoByEventType=function(n){return n!=t.PanZoomCanvasEventManager.EVENT_INFO_PANNED_KEY&&t.PanZoomCanvasEventManager.superclass.StoreInfoByEventType.call(this,n)},
/**
 * @license
 * Copyright (c) %FIRST_YEAR% %CURRENT_YEAR%, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
t.PanZoomCanvasKeyboardHandler=function(t,n){this.Init(t,n)},t.Obj.createSubclass(t.PanZoomCanvasKeyboardHandler,t.KeyboardHandler),t.PanZoomCanvasKeyboardHandler.prototype.Init=function(n,a){t.PanZoomCanvasKeyboardHandler.superclass.Init.call(this,a),this._component=n},t.PanZoomCanvasKeyboardHandler.prototype.processKeyDown=function(n){var a=n.keyCode,o=this._component.getPanZoomCanvas();if(a==t.KeyboardEvent.PAGE_UP)n.ctrlKey||n.shiftKey?o.panBy(o.getPanIncrement(),0):o.panBy(0,o.getPanIncrement()),n.preventDefault();else if(a==t.KeyboardEvent.PAGE_DOWN)n.ctrlKey||n.shiftKey?o.panBy(-o.getPanIncrement(),0):o.panBy(0,-o.getPanIncrement()),n.preventDefault();else if(t.KeyboardEvent.isEquals(n)||t.KeyboardEvent.isPlus(n))o.zoomTo(o.getZoom()+o.getZoomIncrement());else if(t.KeyboardEvent.isMinus(n)||t.KeyboardEvent.isUnderscore(n))o.zoomTo(o.getZoom()-o.getZoomIncrement());else{if(a!=t.KeyboardEvent.ZERO&&a!=t.KeyboardEvent.NUMPAD_ZERO||n.ctrlKey||n.shiftKey)return t.PanZoomCanvasKeyboardHandler.superclass.processKeyDown.call(this,n);o.zoomToFit()}}}(t),t}));
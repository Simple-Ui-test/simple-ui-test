/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojconfig","ojs/ojcomponentcore","ojs/ojdvt-base","ojs/internal-deps/dvt/DvtDiagram","ojs/ojdiagram-utils","ojs/ojlogger","ojs/ojkeyset","ojs/ojdatasource-common"],(function(e,t,n,o,r,a,i,s,l){"use strict";var p={properties:{animationOnDataChange:{type:"string",enumValues:["auto","none"],value:"none"},animationOnDisplay:{type:"string",enumValues:["auto","none"],value:"none"},as:{type:"string",value:""},data:{type:"object"},dnd:{type:"object",properties:{drag:{type:"object",properties:{nodes:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},drag:{type:"function"},dragEnd:{type:"function"},dragStart:{type:"function"}}},ports:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},drag:{type:"function"},dragEnd:{type:"function"},dragStart:{type:"function"},linkStyle:{type:"function"},selector:{type:"string"}}}}},drop:{type:"object",properties:{background:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},dragEnter:{type:"function"},dragLeave:{type:"function"},dragOver:{type:"function"},drop:{type:"function"}}},links:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},dragEnter:{type:"function"},dragLeave:{type:"function"},dragOver:{type:"function"},drop:{type:"function"}}},nodes:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},dragEnter:{type:"function"},dragLeave:{type:"function"},dragOver:{type:"function"},drop:{type:"function"}}},ports:{type:"object",properties:{dataTypes:{type:"string|Array<string>"},dragEnter:{type:"function"},dragLeave:{type:"function"},dragOver:{type:"function"},drop:{type:"function"},selector:{type:"string"}}}}}}},expanded:{type:"KeySet",writeback:!0},focusRenderer:{type:"function"},hiddenCategories:{type:"Array<string>",writeback:!0,value:[]},highlightMatch:{type:"string",enumValues:["all","any"],value:"all"},highlightedCategories:{type:"Array<string>",writeback:!0,value:[]},hoverBehavior:{type:"string",enumValues:["dim","none"],value:"none"},hoverRenderer:{type:"function"},layout:{type:"function"},linkContent:{type:"object",properties:{focusRenderer:{type:"function"},hoverRenderer:{type:"function"},renderer:{type:"function"},selectionRenderer:{type:"function"}}},linkData:{type:"object"},linkHighlightMode:{type:"string",enumValues:["link","linkAndNodes"],value:"link"},linkProperties:{type:"function"},maxZoom:{type:"number",value:1},minZoom:{type:"number",value:0},nodeContent:{type:"object",properties:{focusRenderer:{type:"function"},hoverRenderer:{type:"function"},renderer:{type:"function"},selectionRenderer:{type:"function"},zoomRenderer:{type:"function"}}},nodeData:{type:"object"},nodeHighlightMode:{type:"string",enumValues:["node","nodeAndIncomingLinks","nodeAndLinks","nodeAndOutgoingLinks"],value:"node"},nodeProperties:{type:"function"},overview:{type:"object",properties:{fitArea:{type:"string",enumValues:["canvas","content"],value:"content"},halign:{type:"string",enumValues:["center","end","start"],value:"end"},height:{type:"number",value:100},preserveAspectRatio:{type:"string",enumValues:["meet","none"],value:"meet"},rendered:{type:"string",enumValues:["off","on"],value:"off"},valign:{type:"string",enumValues:["bottom","middle","top"],value:"bottom"},width:{type:"number",value:200}}},panDirection:{type:"string",enumValues:["auto","x","y"],value:"auto"},panning:{type:"string",enumValues:["auto","centerContent","fixed","none"],value:"none"},promotedLinkBehavior:{type:"string",enumValues:["full","lazy","none"],value:"lazy"},renderer:{type:"function"},selection:{type:"Array<any>",writeback:!0,value:[]},selectionMode:{type:"string",enumValues:["multiple","none","single"],value:"none"},selectionRenderer:{type:"function"},styleDefaults:{type:"object",properties:{animationDuration:{type:"number"},hoverBehaviorDelay:{type:"number",value:200},linkDefaults:{type:"object",properties:{color:{type:"string"},endConnectorType:{type:"string",enumValues:["arrow","arrowConcave","arrowOpen","circle","none","rectangle","rectangleRounded"],value:"none"},labelStyle:{type:"object"},startConnectorType:{type:"string",enumValues:["arrow","arrowConcave","arrowOpen","circle","none","rectangle","rectangleRounded"],value:"none"},svgClassName:{type:"string",value:""},svgStyle:{type:"object",value:{}},width:{type:"number",value:1}}},nodeDefaults:{type:"object",properties:{icon:{type:"object",properties:{borderColor:{type:"string"},borderRadius:{type:"string"},borderWidth:{type:"number"},color:{type:"string"},height:{type:"number",value:10},pattern:{type:"string",enumValues:["largeChecker","largeCrosshatch","largeDiagonalLeft","largeDiagonalRight","largeDiamond","largeTriangle","none","smallChecker","smallCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle"],value:"none"},shape:{type:"string",value:"circle"},source:{type:"string"},sourceHover:{type:"string"},sourceHoverSelected:{type:"string"},sourceSelected:{type:"string"},svgClassName:{type:"string",value:""},svgStyle:{type:"object",value:{}},width:{type:"number",value:10}}},labelStyle:{type:"object",value:{}},showDisclosure:{type:"string",enumValues:["off","on"],value:"on"}}},promotedLink:{type:"object",properties:{color:{type:"string"},endConnectorType:{type:"string",enumValues:["arrow","arrowConcave","arrowOpen","circle","none","rectangle","rectangleRounded"],value:"none"},startConnectorType:{type:"string",enumValues:["arrow","arrowConcave","arrowOpen","circle","none","rectangle","rectangleRounded"],value:"none"},svgClassName:{type:"string",value:""},svgStyle:{type:"object",value:{}},width:{type:"number",value:1}}}}},tooltip:{type:"object",properties:{renderer:{type:"function"}}},touchResponse:{type:"string",enumValues:["auto","touchStart"],value:"auto"},trackResize:{type:"string",enumValues:["off","on"],value:"on"},translations:{type:"object",value:{},properties:{componentName:{type:"string"},labelAndValue:{type:"string"},labelClearSelection:{type:"string"},labelCountWithTotal:{type:"string"},labelDataVisualization:{type:"string"},labelInvalidData:{type:"string"},labelNoData:{type:"string"},promotedLink:{type:"string"},promotedLinkAriaDesc:{type:"string"},promotedLinks:{type:"string"},stateCollapsed:{type:"string"},stateDrillable:{type:"string"},stateExpanded:{type:"string"},stateHidden:{type:"string"},stateIsolated:{type:"string"},stateMaximized:{type:"string"},stateMinimized:{type:"string"},stateSelected:{type:"string"},stateUnselected:{type:"string"},stateVisible:{type:"string"}}},zoomRenderer:{type:"function"},zooming:{type:"string",enumValues:["auto","none"],value:"none"}},methods:{getNodeCount:{},getNode:{},getLinkCount:{},getLink:{},getPromotedLink:{},getContextByNode:{},refresh:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojBeforeExpand:{},ojExpand:{},ojBeforeCollapse:{},ojCollapse:{}},extension:{}},d={properties:{categories:{type:"Array<string>"},color:{type:"string"},endConnectorType:{type:"string",enumValues:["arrow","arrowConcave","arrowOpen","circle","none","rectangle","rectangleRounded"]},endNode:{type:"any"},label:{type:"string",value:""},labelStyle:{type:"object"},selectable:{type:"string",enumValues:["auto","off"],value:"auto"},shortDesc:{type:"string",value:""},startConnectorType:{type:"string",enumValues:["arrow","arrowConcave","arrowOpen","circle","none","rectangle","rectangleRounded"]},startNode:{type:"any"},svgClassName:{type:"string",value:""},svgStyle:{type:"object",value:{}},width:{type:"number"}},extension:{}},u={properties:{categories:{type:"Array<string>"},descendantsConnectivity:{type:"string",enumValues:["connected","disjoint","unknown"],value:"unknown"},icon:{type:"object",value:{},properties:{borderColor:{type:"string"},borderRadius:{type:"string"},borderWidth:{type:"number"},color:{type:"string"},height:{type:"number"},opacity:{type:"number"},pattern:{type:"string"},shape:{type:"string"},source:{type:"string"},sourceHover:{type:"string"},sourceHoverSelected:{type:"string"},sourceSelected:{type:"string"},svgClassName:{type:"string"},svgStyle:{type:"object"},width:{type:"number"}}},label:{type:"string",value:""},labelStyle:{type:"object"},overview:{type:"object",value:{},properties:{icon:{type:"object",properties:{shape:{type:"string"},svgClassName:{type:"string"},svgStyle:{type:"object"}}}}},selectable:{type:"string",enumValues:["auto","off"],value:"auto"},shortDesc:{type:"string",value:""},showDisclosure:{type:"string",enumValues:["off","on"]}},extension:{}};e.ConversionDiagramDataSource=function(t,n){this.childDataCallback=n?n.childData:null,e.ConversionDiagramDataSource.superclass.constructor.call(this,t)},e.Object.createSubclass(e.ConversionDiagramDataSource,e.DiagramDataSource,"oj.ConversionDiagramDataSource"),e.ConversionDiagramDataSource.prototype.getData=function(e){if(e){var t=e.nodes;if(void 0===t&&this.childDataCallback){var n=this.childDataCallback(e);return Promise.resolve(n).then((function(e){return Promise.resolve({nodes:e})}),(function(){return Promise.resolve({nodes:[]})}))}return Promise.resolve({nodes:t})}var o=this.data.nodes,r=this.data.links;return o instanceof Function&&(o=o()),r instanceof Function&&(r=r()),Promise.all([o,r]).then((function(e){return Promise.resolve({nodes:e[0],links:e[1]})}),(function(){return Promise.resolve({nodes:[],links:[]})}))},e.ConversionDiagramDataSource.prototype.getChildCount=function(e){if(e){var t=e.nodes;return Array.isArray(t)?t.length:void 0===t&&this.childDataCallback?-1:0}return-1},e.ConversionDiagramDataSource.prototype.getDescendantsConnectivity=function(e){return"unknown"},e.DiagramUtils=i,e.__registerWidget("oj.ojDiagram",t.oj.dvtBaseComponent,{widgetEventPrefix:"oj",options:{animationOnDataChange:"none",animationOnDisplay:"none",dnd:{drag:null,drop:null},expanded:new e.KeySetImpl,selection:[],selectionMode:"none",panning:"none",panDirection:"auto",tooltip:{renderer:null},zooming:"none",minZoom:0,maxZoom:1,hiddenCategories:[],hoverBehavior:"none",highlightedCategories:[],highlightMatch:"all",nodeHighlightMode:"node",linkHighlightMode:"link",linkContent:{renderer:null,hoverRenderer:null,selectionRenderer:null,focusRenderer:null},nodeContent:{renderer:null,hoverRenderer:null,selectionRenderer:null,focusRenderer:null,zoomRenderer:null},renderer:null,hoverRenderer:null,selectionRenderer:null,focusRenderer:null,zoomRenderer:null,data:null,linkData:null,nodeData:null,as:"",linkProperties:null,nodeProperties:null,promotedLinkBehavior:"lazy",overview:{rendered:"off",fitArea:"content",preserveAspectRatio:"meet",width:200,height:100,halign:"end",valign:"bottom"},styleDefaults:{hoverBehaviorDelay:200,nodeDefaults:{labelStyle:{},showDisclosure:"on",icon:{pattern:"none",shape:"circle",width:10,height:10,svgClassName:""}},linkDefaults:{svgClassName:"",width:1,labelStyle:{},startConnectorType:"none",endConnectorType:"none"},promotedLink:{color:"#778999",svgClassName:"",width:1,startConnectorType:"none",endConnectorType:"none"}},touchResponse:"auto",beforeExpand:null,expand:null,beforeCollapse:null,collapse:null},_InitOptions:function(e,t){this._super(e,t);var n=this.options.styleDefaults;this.options.styleDefaults=n},_ProcessOptions:function(){this._super(),this.options._logger=s,this.options.renderer&&!this.options.nodeContent.renderer&&(this.options.nodeContent={renderer:this.options.renderer,hoverRenderer:this.options.hoverRenderer,selectionRenderer:this.options.selectionRenderer,focusRenderer:this.options.focusRenderer,zoomRenderer:this.options.zoomRenderer}),this.options._templateFunction&&(this.options.nodeContent.renderer=this._GetTemplateDataRenderer(this.options._templateFunction,"node")),(this.options.renderer||this._TemplateHandler.getTemplates().nodeContentTemplate||this.options.linkContent||this._TemplateHandler.getTemplates().linkContentTemplate)&&(this.options._contextHandler=this._getContextHandler()),this.options.nodeData&&(this.options._fetchDataHandler=this._getFetchDataHandler("nodeData")),this.options.nodes&&(this.options.nodeProperties=this.options.nodeProperties?this.options.nodeProperties:function(e){return e},this.options.linkProperties=this.options.linkProperties?this.options.linkProperties:function(e){return e},this.options.data=new e.ConversionDiagramDataSource({nodes:this.options.nodes,links:this.options.links},{childData:this.options.childNodes})),this.options.expanded||(this.options.expanded=new e.KeySetImpl),this.options.dnd.drag||(this.options.dnd.drag={nodes:{},ports:{}}),this.options.dnd.drop||(this.options.dnd.drop={background:{},nodes:{},links:{},ports:{}})},_IsDraggable:function(){var e=this.options.dnd?this.options.dnd.drag:null;return e.nodes&&Object.keys(e.nodes).length>0||e.ports&&Object.keys(e.ports).length>0},_GetComponentRendererOptions:function(){return[{path:"tooltip/renderer",slot:"tooltipTemplate"},{path:"nodeContent/renderer",slot:"nodeContentTemplate"},{path:"nodeContent/focusRenderer",slot:"nodeContentTemplate"},{path:"nodeContent/hoverRenderer",slot:"nodeContentTemplate"},{path:"nodeContent/selectionRenderer",slot:"nodeContentTemplate"},{path:"nodeContent/zoomRenderer",slot:"nodeContentTemplate"},{path:"linkContent/renderer",slot:"linkContentTemplate"},{path:"linkContent/focusRenderer",slot:"linkContentTemplate"},{path:"linkContent/hoverRenderer",slot:"linkContentTemplate"},{path:"linkContent/selectionRenderer",slot:"linkContentTemplate"}]},_SetupResources:function(){this._super(),this._component&&this._component.addDataSourceEventListeners()},_ReleaseResources:function(){this._super(),this._component&&this._component.removeDataSourceEventListeners()},_getContextHandler:function(){var e=this;return function(t,n,r,a,i,s,l,p){var d={component:o.__GetWidgetConstructor(e.element),parentElement:n,rootElement:r,content:a,data:i.data,itemData:i.itemData,state:s,previousState:l,id:i.id,type:t,label:i.label,points:p};return"node"===t&&e._IsCustomElement()&&(d.renderDefaultHover=e.renderDefaultHover.bind(e,d),d.renderDefaultSelection=e.renderDefaultSelection.bind(e,d),d.renderDefaultFocus=e.renderDefaultFocus.bind(e,d)),e._FixRendererContext(d)}},renderDefaultHover:function(e){e.previousState&&e.state.hovered===e.previousState.hovered||this._GetDvtComponent(this.element).processDefaultHoverEffect(e.id,e.state.hovered)},renderDefaultSelection:function(e){e.previousState&&e.state.selected===e.previousState.selected||this._GetDvtComponent(this.element).processDefaultSelectionEffect(e.id,e.state.selected)},renderDefaultFocus:function(e){e.previousState&&e.state.focused===e.previousState.focused||this._GetDvtComponent(this.element).processDefaultFocusEffect(e.id,e.state.focused)},_CreateDvtComponent:function(e,t,n){return a.Diagram.newInstance(e,t,n)},_ConvertLocatorToSubId:function(e){var t=e.subId;return"oj-diagram-link"===t?t="link["+e.index+"]":"oj-diagram-node"===t?t="node["+e.index+"]":"oj-diagram-tooltip"===t&&(t="tooltip"),t},_ConvertSubIdToLocator:function(e){var t={};return 0===e.indexOf("link")?(t.subId="oj-diagram-link",t.index=this._GetFirstIndex(e)):0===e.indexOf("node")?(t.subId="oj-diagram-node",t.index=this._GetFirstIndex(e)):"tooltip"===e&&(t.subId="oj-diagram-tooltip"),t},_GetComponentStyleClasses:function(){var e=this._super();return e.push("oj-diagram"),e},_GetChildStyleClasses:function(){var e=this._super();return e["oj-dvtbase oj-diagram"]={path:"styleDefaults/animationDuration",property:"ANIM_DUR"},e["oj-diagram-node-label"]={path:"styleDefaults/nodeDefaults/labelStyle",property:"TEXT"},e["oj-diagram-node oj-selected"]={path:"styleDefaults/nodeDefaults/selectionColor",property:"border-color"},e["oj-diagram-node oj-hover"]=[{path:"styleDefaults/nodeDefaults/hoverOuterColor",property:"border-top-color"},{path:"styleDefaults/nodeDefaults/hoverInnerColor",property:"border-bottom-color"}],e["oj-diagram-link"]=[{path:"styleDefaults/linkDefaults/color",property:"color"},{path:"styleDefaults/linkDefaults/_hitDetectionOffset",property:"padding"},{path:"styleDefaults/promotedLink/_hitDetectionOffset",property:"padding"}],e["oj-diagram-link-label"]={path:"styleDefaults/linkDefaults/labelStyle",property:"TEXT"},e["oj-diagram-link oj-selected"]={path:"styleDefaults/linkDefaults/selectionColor",property:"border-color"},e["oj-diagram-link oj-hover"]=[{path:"styleDefaults/linkDefaults/hoverOuterColor",property:"border-top-color"},{path:"styleDefaults/linkDefaults/hoverInnerColor",property:"border-bottom-color"}],e["oj-diagram-overview"]=[{path:"styleDefaults/_overviewStyles/overview/backgroundColor",property:"background-color"},{path:"styleDefaults/_overviewStyles/overview/padding",property:"padding"}],e["oj-diagram-overview-content"]=[{path:"styleDefaults/_overviewStyles/overviewContent/padding",property:"padding"}],e["oj-diagram-overview-viewport"]=[{path:"styleDefaults/_overviewStyles/viewport/borderColor",property:"border-color"},{path:"styleDefaults/_overviewStyles/viewport/backgroundColor",property:"background-color"}],e},_GetEventTypes:function(){return["optionChange","beforeExpand","beforeCollapse","expand","collapse"]},_HandleEvent:function(e){var t=e.type;"beforeExpand"===t?this.expand(e.id,!0):"beforeCollapse"===t?this.collapse(e.id,!0):"expand"===t||"collapse"===t?this._trigger(t,null,{nodeId:e.id}):this._super(e)},_LoadResources:function(){null==this.options._resources&&(this.options._resources={});var t=this.options._resources;"rtl"===e.DomUtils.getReadingDirection()?(t.collapse_ena={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ena_rtl.svg"),width:20,height:20},t.collapse_ovr={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ovr_rtl.svg"),width:20,height:20},t.collapse_dwn={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-dwn_rtl.svg"),width:20,height:20},t.expand_ena={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ena_rtl.svg"),width:20,height:20},t.expand_ovr={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ovr_rtl.svg"),width:20,height:20},t.expand_dwn={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-dwn_rtl.svg"),width:20,height:20}):(t.collapse_ena={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ena.svg"),width:20,height:20},t.collapse_ovr={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ovr.svg"),width:20,height:20},t.collapse_dwn={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-dwn.svg"),width:20,height:20},t.expand_ena={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ena.svg"),width:20,height:20},t.expand_ovr={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ovr.svg"),width:20,height:20},t.expand_dwn={src:n.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-dwn.svg"),width:20,height:20})},_GetComponentNoClonePaths:function(){var e=this._super();return e.data=!0,e.nodes=!0,e.links=!0,e},_GetComponentDeferredDataPaths:function(){return{root:["nodeData","linkData"]}},_GetSimpleDataProviderConfigs:function(){var e={nodeData:{templateName:"nodeTemplate",templateElementName:"oj-diagram-node",resultPath:"nodes"},linkData:{templateName:"linkTemplate",templateElementName:"oj-diagram-link",resultPath:"links"}};return Object.defineProperty(e.nodeData,"expandedKeySet",{get:function(){return this.options.expanded}.bind(this)}),e},_WrapInlineTemplateRenderer:function(e,t,n){var o=this._TemplateHandler.getDataSet(t),r=function(e,t){for(var n=0;n<t.length;n++)if(e<t[n])return n;return t.length},a=function(t){return function(n){return n[t](),e(n)}};if("focusRenderer"===n&&this._TemplateHandler.getDataSetBoolean(t,"oj-default-focus"))return a("renderDefaultFocus");if("hoverRenderer"===n&&this._TemplateHandler.getDataSetBoolean(t,"oj-default-hover"))return a("renderDefaultHover");if("selectionRenderer"===n&&this._TemplateHandler.getDataSetBoolean(t,"oj-default-selection"))return a("renderDefaultSelection");if("zoomRenderer"===n){if(o.ojZoomThresholds)try{var i=JSON.parse(o.ojZoomThresholds);return function(t){if(function(e,t,n){return r(e,n)!==r(t,n)}(t.state.zoom,t.previousState.zoom,i))return e(t)}}catch(e){s.error(e)}return null}return e},_OptionChangeHandler:function(e){var t=Object.prototype.hasOwnProperty.bind(e);(t("expanded")||t("data"))&&this._component.clearDisclosedState(),t("expanded")&&this._ClearDataProviderState("nodeData"),this._super(e)},collapse:function(e,t){var n=this._trigger("beforeCollapse",null,{nodeId:e});t&&!1===n||(this._NotReady(),this._component.collapse(e))},expand:function(e,t){var n=this._trigger("beforeExpand",null,{nodeId:e});t&&!1===n||(this._NotReady(),this._component.expand(e))},getNodeCount:function(){return this._component.getAutomation().getNodeCount()},getNode:function(e){return this._component.getAutomation().getNode(e)},getLinkCount:function(){return this._component.getAutomation().getLinkCount()},getLink:function(e){return this._component.getAutomation().getLink(e)},getPromotedLink:function(e,t){return this._component.getAutomation().getPromotedLink(e,t)},getContextByNode:function(e){var t=this.getSubIdByNode(e);return t&&"oj-diagram-tooltip"!==t.subId?t:null}}),o.setDefaultOptions({ojDiagram:{styleDefaults:o.createDynamicPropertyGetter((function(e){return e.isCustomElement?{linkDefaults:{svgStyle:{}},nodeDefaults:{icon:{svgStyle:{}}},promotedLink:{svgStyle:{}}}:{}}))}}),p.extension._WIDGET_NAME="ojDiagram",e.CustomElementBridge.register("oj-diagram",{metadata:p,parseFunction:r.shapeParseFunction({"style-defaults.node-defaults.icon.shape":!0})}),function(){u.extension._CONSTRUCTOR=function(){};var t=r.shapeParseFunction({"icon.shape":!0}),n=r.shapeParseFunction({"overview.icon.shape":!0},{circle:!0,diamond:!0,ellipse:!0,human:!0,plus:!0,rectangle:!0,square:!0,star:!0,triangleDown:!0,triangleUp:!0,inherit:!0});e.CustomElementBridge.register("oj-diagram-node",{metadata:u,parseFunction:function(e,o,r,a){return"icon.shape"===o?t(e,o,r,a):"overview.icon.shape"===o?n(e,o,r,a):a(e)}})}(),d.extension._CONSTRUCTOR=function(){},e.CustomElementBridge.register("oj-diagram-link",{metadata:d})}));
/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["accUtils"],(function(n){return function(){var t=this;t.connected=function(){n.announce("About page loaded."),t.setTitle("About")},t.setTitle=function(n){document.title=n},t.disconnected=function(){},t.transitionCompleted=function(){}}}));
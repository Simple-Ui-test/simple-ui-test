define(["./persistenceUtils"],(function(e){"use strict";return{getShredder:function(e){return function(r){var t=r.clone(),n=t.headers.get("Etag");return t.blob().then((function(t){var s=[],o=[];return s[0]=null==r.url||0==r.url.length?r.headers.get("x-oracle-jscpt-response-url"):r.url,o[0]=t,[{name:e,resourceIdentifier:n,keys:s,data:o,resourceType:"single"}]}))}},getUnshredder:function(){return function(r,t){var n=function(e){if(!e||1!==e.length)throw new Error({message:"shredded data is not in the correct format."});var r=e[0].data;if(r&&1===r.length&&"single"===e[0].resourceType)return r[0];return r}(r);return e.setResponsePayload(t,n).then((function(e){return e.headers.set("x-oracle-jscpt-cache-expiration-date",""),Promise.resolve(e)}))}}}}));
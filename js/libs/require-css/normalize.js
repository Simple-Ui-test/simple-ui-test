define((function(){var t=/([^:])\/+/g,r=function(r){return r.replace(t,"$1/")},s=/[^\:\/]*:\/\/([^\/])*/,u=/^(\/|data:)/;function n(t,n,i){if(t.match(u)||t.match(s))return t;t=r(t);var o=i.match(s),c=n.match(s);return!c||o&&o[1]==c[1]&&o[2]==c[2]?e(a(t,n),i):a(t,n)}function a(t,r){if("./"==t.substr(0,2)&&(t=t.substr(2)),t.match(u)||t.match(s))return t;var n=r.split("/"),a=t.split("/");for(n.pop();curPart=a.shift();)".."==curPart?n.pop():n.push(curPart);return n.join("/")}function e(t,r){var s=r.split("/");for(s.pop(),r=s.join("/")+"/",i=0;r.substr(i,1)==t.substr(i,1);)i++;for(;"/"!=r.substr(i,1);)i--;r=r.substr(i+1),t=t.substr(i+1),s=r.split("/");var u=t.split("/");for(out="";s.shift();)out+="../";for(;curPart=u.shift();)out+=curPart+"/";return out.substr(0,out.length-1)}var o=function(t,s,u){s=r(s),u=r(u);for(var a,i,e=/@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi;a=e.exec(t);){var o;o=n(i=a[3]||a[2]||a[5]||a[6]||a[4],s,u);var c=a[5]||a[6]?1:0;t=t.substr(0,e.lastIndex-i.length-c-1)+o+t.substr(e.lastIndex-c-1),e.lastIndex=e.lastIndex+(o.length-i.length)}return t};return o.convertURIBase=n,o.absoluteURI=a,o.relativeURI=e,o}));
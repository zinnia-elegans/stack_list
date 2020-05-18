var OAuth1;if(OAuth1==null){OAuth1={}}OAuth1.setProperties=function setProperties(a,c){if(a!=null&&c!=null){for(var b in c){a[b]=c[b]}}return a};OAuth1.setProperties(OAuth1,{percentEncode:function percentEncode(b){if(b==null){return""}if(b instanceof Array){var c="";for(var a=0;a<b.length;++b){if(c!=""){c+="&"}c+=OAuth1.percentEncode(b[a])}return c}b=encodeURIComponent(b);b=b.replace(/\!/g,"%21");b=b.replace(/\*/g,"%2A");b=b.replace(/\'/g,"%27");b=b.replace(/\(/g,"%28");b=b.replace(/\)/g,"%29");return b},decodePercent:function decodePercent(a){if(a!=null){a=a.replace(/\+/g," ")}return decodeURIComponent(a)},getParameterList:function getParameterList(a){if(a==null){return[]}if(typeof a!="object"){return OAuth1.decodeForm(a+"")}if(a instanceof Array){return a}var b=[];for(var c in a){b.push([c,a[c]])}return b},getParameterMap:function getParameterMap(b){if(b==null){return{}}if(typeof b!="object"){return OAuth1.getParameterMap(OAuth1.decodeForm(b+""))}if(b instanceof Array){var d={};for(var c=0;c<b.length;++c){var a=b[c][0];if(d[a]===undefined){d[a]=b[c][1]}}return d}return b},getParameter:function getParameter(b,a){if(b instanceof Array){for(var c=0;c<b.length;++c){if(b[c][0]==a){return b[c][1]}}}else{return OAuth1.getParameterMap(b)[a]}return null},formEncode:function formEncode(b){var a="";var d=OAuth1.getParameterList(b);for(var f=0;f<d.length;++f){var c=d[f][1];if(c==null){c=""}if(a!=""){a+="&"}a+=OAuth1.percentEncode(d[f][0])+"="+OAuth1.percentEncode(c)}return a},decodeForm:function decodeForm(d){var g=[];var i=d.split("&");for(var h=0;h<i.length;++h){var a=i[h];if(a==""){continue}var c=a.indexOf("=");var b;var f;if(c<0){b=OAuth1.decodePercent(a);f=null}else{b=OAuth1.decodePercent(a.substring(0,c));f=OAuth1.decodePercent(a.substring(c+1))}g.push([b,f])}return g},setParameter:function setParameter(c,a,d){var b=c.parameters;if(b instanceof Array){for(var f=0;f<b.length;++f){if(b[f][0]==a){if(d===undefined){b.splice(f,1)}else{b[f][1]=d;d=undefined}}}if(d!==undefined){b.push([a,d])}}else{b=OAuth1.getParameterMap(b);b[a]=d;c.parameters=b}},setParameters:function setParameters(c,b){var d=OAuth1.getParameterList(b);for(var a=0;a<d.length;++a){OAuth1.setParameter(c,d[a][0],d[a][1])}},completeRequest:function completeRequest(b,a){if(b.method==null){b.method=null}var c=OAuth1.getParameterMap(b.parameters);if(c.oauth_consumer_key==null){OAuth1.setParameter(b,"oauth_consumer_key",a.consumerKey||"")}if(c.oauth_token==null&&a.token!=null){OAuth1.setParameter(b,"oauth_token",a.token)}if(c.oauth_version==null){OAuth1.setParameter(b,"oauth_version","1.0")}if(c.oauth_timestamp==null){OAuth1.setParameter(b,"oauth_timestamp",OAuth1.timestamp())}if(c.oauth_nonce==null){OAuth1.setParameter(b,"oauth_nonce",OAuth1.nonce(6))}OAuth1.SignatureMethod.sign(b,a)},setTimestampAndNonce:function setTimestampAndNonce(a){OAuth1.setParameter(a,"oauth_timestamp",OAuth1.timestamp());OAuth1.setParameter(a,"oauth_nonce",OAuth1.nonce(6))},addToURL:function addToURL(a,c){newURL=a;if(c!=null){var b=OAuth1.formEncode(c);if(b.length>0){var d=a.indexOf("?");if(d<0){newURL+="?"}else{newURL+="&"}newURL+=b}}return newURL},getAuthorizationHeader:function getAuthorizationHeader(a,c){var h='OAuth1 realm="'+OAuth1.percentEncode(a)+'"';var d=OAuth1.getParameterList(c);for(var f=0;f<d.length;++f){var g=d[f];var b=g[0];if(b.indexOf("oauth_")==0){h+=","+OAuth1.percentEncode(b)+'="'+OAuth1.percentEncode(g[1])+'"'}}return h},correctTimestampFromSrc:function correctTimestampFromSrc(b){b=b||"oauth_timestamp";var a=document.getElementsByTagName("script");if(a==null||!a.length){return}var f=a[a.length-1].src;if(!f){return}var d=f.indexOf("?");if(d<0){return}parameters=OAuth1.getParameterMap(OAuth1.decodeForm(f.substring(d+1)));var c=parameters[b];if(c==null){return}OAuth1.correctTimestamp(c)},correctTimestamp:function correctTimestamp(a){OAuth1.timeCorrectionMsec=(a*1000)-(new Date()).getTime()},timeCorrectionMsec:0,timestamp:function timestamp(){var a=(new Date()).getTime()+OAuth1.timeCorrectionMsec;return Math.floor(a/1000)},nonce:function nonce(f){var d=OAuth1.nonce.CHARS;var a="";for(var c=0;c<f;++c){var b=Math.floor(Math.random()*d.length);a+=d.substring(b,b+1)}return a}});OAuth1.nonce.CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";OAuth1.declareClass=function declareClass(d,a,c){var f=d[a];d[a]=c;if(c!=null&&f!=null){for(var b in f){if(b!="prototype"){c[b]=f[b]}}}return c};OAuth1.declareClass(OAuth1,"SignatureMethod",function OAuth1SignatureMethod(){});OAuth1.setProperties(OAuth1.SignatureMethod.prototype,{sign:function sign(c){var b=OAuth1.SignatureMethod.getBaseString(c);var a=this.getSignature(b);OAuth1.setParameter(c,"oauth_signature",a);return a},initialize:function initialize(c,a){var b;if(a.accessorSecret!=null&&c.length>9&&c.substring(c.length-9)=="-Accessor"){b=a.accessorSecret}else{b=a.consumerSecret}this.key=OAuth1.percentEncode(b)+"&"+OAuth1.percentEncode(a.tokenSecret)}});OAuth1.setProperties(OAuth1.SignatureMethod,{sign:function sign(c,a){var b=OAuth1.getParameterMap(c.parameters).oauth_signature_method;if(b==null||b==""){b="HMAC-SHA1";OAuth1.setParameter(c,"oauth_signature_method",b)}OAuth1.SignatureMethod.newMethod(b,a).sign(c)},newMethod:function newMethod(d,a){var c=OAuth1.SignatureMethod.REGISTERED[d];if(c!=null){var h=new c();h.initialize(d,a);return h}var g=new Error("signature_method_rejected");var b="";for(var f in OAuth1.SignatureMethod.REGISTERED){if(b!=""){b+="&"}b+=OAuth1.percentEncode(f)}g.oauth_acceptable_signature_methods=b;throw g},REGISTERED:{},registerMethodClass:function registerMethodClass(b,a){for(var c=0;c<b.length;++c){OAuth1.SignatureMethod.REGISTERED[b[c]]=a}},makeSubclass:function makeSubclass(a){var b=OAuth1.SignatureMethod;var c=function(){b.call(this)};c.prototype=new b();c.prototype.getSignature=a;c.prototype.constructor=c;return c},getBaseString:function getBaseString(g){var b=g.action;var h=b.indexOf("?");var f;if(h<0){f=g.parameters}else{f=OAuth1.decodeForm(b.substring(h+1));var d=OAuth1.getParameterList(g.parameters);for(var c=0;c<d.length;++c){f.push(d[c])}}return OAuth1.percentEncode(g.method.toUpperCase())+"&"+OAuth1.percentEncode(OAuth1.SignatureMethod.normalizeUrl(b))+"&"+OAuth1.percentEncode(OAuth1.SignatureMethod.normalizeParameters(f))},normalizeUrl:function normalizeUrl(c){var d=OAuth1.SignatureMethod.parseUri(c);var a=d.protocol.toLowerCase();var g=d.authority.toLowerCase();var h=(a=="http"&&d.port==80)||(a=="https"&&d.port==443);if(h){var b=g.lastIndexOf(":");if(b>=0){g=g.substring(0,b)}}var f=d.path;if(!f){f="/"}return a+"://"+g+f},parseUri:function parseUri(f){var d={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/}};var a=d.parser.strict.exec(f);var c={};var b=14;while(b--){c[d.key[b]]=a[b]||""}return c},normalizeParameters:function normalizeParameters(d){if(d==null){return""}var f=OAuth1.getParameterList(d);var h=[];for(var g=0;g<f.length;++g){var b=f[g];if(b[0]!="oauth_signature"){h.push([OAuth1.percentEncode(b[0])+" "+OAuth1.percentEncode(b[1]),b])}}h.sort(function(j,i){if(j[0]<i[0]){return -1}if(j[0]>i[0]){return 1}return 0});var a=[];for(var c=0;c<h.length;++c){a.push(h[c][1])}return OAuth1.formEncode(a)}});OAuth1.SignatureMethod.registerMethodClass(["PLAINTEXT","PLAINTEXT-Accessor"],OAuth1.SignatureMethod.makeSubclass(function getSignature(a){return this.key}));OAuth1.SignatureMethod.registerMethodClass(["HMAC-SHA1","HMAC-SHA1-Accessor"],OAuth1.SignatureMethod.makeSubclass(function getSignature(b){b64pad="=";var a=b64_hmac_sha1(this.key,b);return a}));try{OAuth1.correctTimestampFromSrc()}catch(e){};

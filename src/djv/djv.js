!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("@korzio/djv-draft-04")):"function"==typeof define&&define.amd?define(["@korzio/djv-draft-04"],e):"object"==typeof exports?exports.djv=e(require("@korzio/djv-draft-04")):t.djv=e(t["@korzio/djv-draft-04"])}(this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,r){"use strict";function n(t,e,r){return"function"!=typeof t?t:t(e,r)}function a(t,e){return"object"===(void 0===t?"undefined":i(t))&&Object.prototype.hasOwnProperty.call(t,e)}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports={asExpression:n,hasProperty:a}},function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t){return"object"===(void 0===t?"undefined":f(t))||"boolean"==typeof t}function i(t){return!0===t?s.ANY_SCHEMA:!1===t?s.NOT_ANY_SCHEMA:t}function o(t){if("object"!==(void 0===t?"undefined":f(t))||null===t)return{enum:[t]};if(Array.isArray(t))return{items:t.map(o),additionalItems:!1};var e=Object.keys(t);return{properties:e.reduce(function(e,r){return Object.assign({},e,n({},r,o(t[r])))},{}),required:e}}var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s={ANY_SCHEMA:{},NOT_ANY_SCHEMA:{not:{}}};t.exports={is:a,make:o,transform:i,transformation:s}},function(t,e,r){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}function a(t,e){function r(t){for(var e=arguments.length,n=Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];var i=void 0;return r.lines.push(t.replace(/%i/g,function(){return"i"}).replace(/\$(\d)/g,function(t,e){return""+n[e-1]}).replace(/(%[sd])/g,function(){return n.length&&(i=n.shift()),""+i})),r}function n(){return this.join(".").replace(/\.\[/g,"[")}var a="function"==typeof e.errorHandler?e.errorHandler:function(t){var e=this.data.toString().replace(/^data/,"");return"return {\n        keyword: '"+t+"',\n        dataPath: '"+e.replace(/\['([^']+)'\]/gi,".$1").replace(/\[(i[0-9]*)\]/gi,"['+$1+']")+"',\n        schemaPath: '#"+e.replace(/\[i([0-9]*)\]/gi,"/items").replace(/\['([^']+)'\]/gi,"/properties/$1")+"/"+t+"'\n      };"};return Object.assign(r,{cachedIndex:0,cached:[],cache:function(t){var e=r.cached[r.cached.length-1];return e[t]?"i"+e[t]:(r.cachedIndex+=1,e[t]=r.cachedIndex,"(i"+e[t]+" = "+t+")")},data:["data"],error:a,lines:[],schema:["schema"],push:r,link:function(e){return"f"+t.link(e)},visit:function(e){r.cached.push({}),t.visit(e,r),r.cached.pop()}}),r.data.toString=n,r.schema.toString=n,r}function i(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.inner,a=new Function("schema",t)(e);return n||(a.toString=function(){return t}),a}function o(t){var e=t.defineErrors,r=t.index;return"\n    "+(e?"const errors = [];":"")+"\n    "+(r?"let i"+Array.apply(void 0,n(Array(r))).map(function(t,e){return e+1}).join(",i")+";":"")+"\n  "}function f(t){var e=t.context;if(t.inner||!e.length)return"";var r=[],n=[];return e.forEach(function(t,e){if("number"==typeof t)return void n.push(e+1+" = f"+(t+1));r.push(e+1+" = "+t)}),"const f"+r.concat(n).join(", f")+";"}function s(t){var e=t.defineErrors,r=t.lines,n=o(t),a=e?"if(errors.length) return errors;":"";return'\n    "use strict";\n    '+n+"\n    "+r.join("\n")+"\n    "+a+"\n  "}function c(t,e){var r=t.cachedIndex,n=t.lines,a=e.context,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.inner,c=i.errorHandler,u={context:a,inner:o,defineErrors:c,index:r,lines:n};return"\n    "+f(u)+"\n    function f0(data) {\n      "+s(u)+"\n    }\n    return f0;\n  "}function u(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return function(){for(var e=arguments.length,n=Array(e),a=0;a<e;a++)n[a]=arguments[a];var i=n[n.length-1]||{},o=[t[0]];return r.forEach(function(e,r){var a=Number.isInteger(e)?n[e]:i[e];o.push(a,t[r+1])}),o.join("")}}t.exports={body:c,restore:i,template:a,expression:u}},function(t,e,r){"use strict";function n(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var a=n(["!/^[a-zA-Z]+$/.test(",")"],["!/^[a-zA-Z]+$/.test(",")"]),i=n(["!/^[a-zA-Z0-9]+$/.test(",")"],["!/^[a-zA-Z0-9]+$/.test(",")"]),o=n(["!/^[-_a-zA-Z0-9]+$/.test(",")"],["!/^[-_a-zA-Z0-9]+$/.test(",")"]),f=n(["!/^[a-fA-F0-9]+$/.test(",")"],["!/^[a-fA-F0-9]+$/.test(",")"]),s=n(["!/^[0-9]+$/.test(",")"],["!/^[0-9]+$/.test(",")"]),c=n(["isNaN(Date.parse(",")) || ~",".indexOf('/')"],["isNaN(Date.parse(",")) || ~",".indexOf(\\'/\\')"]),u=n([""," !== ",".toUpperCase()"],[""," !== ",".toUpperCase()"]),A=n([""," !== ",".toLowerCase()"],[""," !== ",".toLowerCase()"]),p=n(["",".length >= 256 || !/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9]))*$/.test(",")"],["",".length >= 256 || !/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\\\-]{0,61}[a-zA-Z0-9])(\\\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\\\-]{0,61}[a-zA-Z0-9]))*$/.test(",")"]),d=n(["!/^[A-Za-z][A-Za-z0-9+\\-.]*:(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?$/.test(",")"],["!/^[A-Za-z][A-Za-z0-9+\\\\-.]*:(?:\\\\/\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\\\.[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]+)\\\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\\\?(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\\\#(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?$/.test(",")"]),l=n(["!/^[^@]+@[^@]+\\.[^@]+$/.test(",")"],["!/^[^@]+@[^@]+\\\\.[^@]+$/.test(",")"]),y=n(["!/^(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}$/.test(",") || ",'.split(".")[3] > 255'],["!/^(\\\\d?\\\\d?\\\\d){0,255}\\\\.(\\\\d?\\\\d?\\\\d){0,255}\\\\.(\\\\d?\\\\d?\\\\d){0,255}\\\\.(\\\\d?\\\\d?\\\\d){0,255}$/.test(",") || ",'.split(".")[3] > 255']),h=n(["!/^((?=.*::)(?!.*::.+::)(::)?([\\dA-F]{1,4}:(:|\\b)|){5}|([\\dA-F]{1,4}:){6})((([\\dA-F]{1,4}((?!\\3)::|:\\b|$))|(?!\\2\\3)){2}|(((2[0-4]|1\\d|[1-9])?\\d|25[0-5])\\.?\\b){4})$/.test(",")"],["!/^((?=.*::)(?!.*::.+::)(::)?([\\\\dA-F]{1,4}:(:|\\\\b)|){5}|([\\\\dA-F]{1,4}:){6})((([\\\\dA-F]{1,4}((?!\\\\3)::|:\\\\b|$))|(?!\\\\2\\\\3)){2}|(((2[0-4]|1\\\\d|[1-9])?\\\\d|25[0-5])\\\\.?\\\\b){4})$/.test(",")"]),F=n(["/[^\\\\]\\\\[^.*+?^${}()|[\\]\\\\bBcdDfnrsStvwWxu0-9]/i.test(",")"],["/[^\\\\\\\\]\\\\\\\\[^.*+?^\\${}()|[\\\\]\\\\\\\\bBcdDfnrsStvwWxu0-9]/i.test(",")"]),m=n(["!/^$|^\\/(?:~(?=[01])|[^~])*$/i.test(",")"],["!/^$|^\\\\/(?:~(?=[01])|[^~])*$/i.test(",")"]),v=n(["!/^(?:[A-Za-z][A-Za-z0-9+\\-.]*:(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?|(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&'()*+,;=@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?)$/i.test(",")"],["!/^(?:[A-Za-z][A-Za-z0-9+\\\\-.]*:(?:\\\\/\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\\\.[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]+)\\\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\\\?(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\\\#(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?|(?:\\\\/\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\\\.[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]+)\\\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\\\?(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\\\#(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?)$/i.test(",")"]),$=n(["!/^(?:(?:[^\\x00-\\x20\"'<>%\\\\^`{|}]|%[0-9a-f]{2})|\\{[+#.\\/;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\:[1-9][0-9]{0,3}|\\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\:[1-9][0-9]{0,3}|\\*)?)*\\})*$/i.test(",")"],["!/^(?:(?:[^\\\\x00-\\\\x20\"\\'<>%\\\\\\\\^\\`{|}]|%[0-9a-f]{2})|\\\\{[+#.\\\\/;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\\\:[1-9][0-9]{0,3}|\\\\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\\\:[1-9][0-9]{0,3}|\\\\*)?)*\\\\})*$/i.test(",")"]),b=r(2),g=b.expression;t.exports={alpha:g(a,"data"),alphanumeric:g(i,"data"),identifier:g(o,"data"),hexadecimal:g(f,"data"),numeric:g(s,"data"),"date-time":g(c,"data","data"),uppercase:g(u,"data","data"),lowercase:g(A,"data","data"),hostname:g(p,"data","data"),uri:g(d,"data"),email:g(l,"data"),ipv4:g(y,"data","data"),ipv6:g(h,"data"),regex:g(F,"data"),"json-pointer":g(m,"data"),"uri-reference":g(v,"data"),"uri-template":g($,"data")}},function(t,e,r){"use strict";var n=r(11),a=r(12),i=r(13),o=r(14),f=r(16),s=r(17),c=r(18),u=r(19),A=r(20),p=r(21),d=r(22),l=r(23),y=r(24),h=r(25),F=r(26),m=r(27);t.exports={name:{$ref:f,required:n,format:a,property:i,type:o,not:s,anyOf:c,oneOf:u,allOf:A,dependencies:p,properties:d,patternProperties:l,items:y,contains:h,constant:F,propertyNames:m},list:[f,n,a,i,o,s,c,u,A,p,d,l,y,h,F,m]}},function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports={readOnly:"false",exclusiveMinimum:function(t){return"%s <= "+t.exclusiveMinimum},minimum:function(t){return"%s < "+t.minimum},exclusiveMaximum:function(t){return"%s >= "+t.exclusiveMaximum},maximum:function(t){return"%s > "+t.maximum},multipleOf:'($1/$2) % 1 !== 0 && typeof $1 === "number"',pattern:function(t){var e=void 0,r=void 0;return"string"==typeof t.pattern?e=t.pattern:(e=t.pattern[0],r=t.pattern[1]),'typeof ($1) === "string" && !'+new RegExp(e,r)+".test($1)"},minLength:'typeof $1 === "string" && function dltml(b,c){for(var a=0,d=b.length;a<d&&c;){var e=b.charCodeAt(a++);55296<=e&&56319>=e&&a<d&&56320!==(b.charCodeAt(a++)&64512)&&a--;c--}return!!c}($1, $2)',maxLength:'typeof $1 === "string" && function dmtml(b,c){for(var a=0,d=b.length;a<d&&0<=c;){var e=b.charCodeAt(a++);55296<=e&&56319>=e&&a<d&&56320!==(b.charCodeAt(a++)&64512)&&a--;c--}return 0>c}($1, $2)',minItems:"$1.length < $2 && Array.isArray($1)",maxItems:"$1.length > $2 && Array.isArray($1)",uniqueItems:function(t,e){return t.uniqueItems?(e(e.cache("{}")),'Array.isArray($1) && $1.some(function(item, key) {\n      if(item !== null && typeof item === "object") key = JSON.stringify(item);\n      else key = item;\n      if('+e.cache("{}")+".hasOwnProperty(key)) return true;\n      "+e.cache("{}")+"[key] = true;\n    })"):"true"},minProperties:'!Array.isArray($1) && typeof $1 === "object" && Object.keys($1).length < $2',maxProperties:'!Array.isArray($1) && typeof $1 === "object" && Object.keys($1).length > $2',enum:function(t,e){return t.enum.map(function(t){var r="$1",a=t;return"object"===(void 0===t?"undefined":n(t))?(a="'"+JSON.stringify(t)+"'",r=e.cache("JSON.stringify($1)")):"string"==typeof t&&(a="'"+t+"'"),r+" !== "+a}).join(" && ")}}},function(t,e,r){"use strict";t.exports=["$ref","$schema","type","not","anyOf","allOf","oneOf","properties","patternProperties","additionalProperties","items","additionalItems","required","default","title","description","definitions","dependencies","$id","contains","const","examples"]},function(t,e,r){"use strict";function n(t){return"string"!=typeof t?t:t.split(u)[0]}function a(t){return c.test(t)}function i(t){return t.replace(A,"$1")}function o(t){return"string"!=typeof t?t:t.split(u)[1]}function f(t){return t.filter(function(t){return"string"==typeof t}).reduce(function(t,e){if(!t.length||a(e))return e;if(!e)return t;if(0===e.indexOf("#")){var r=t.indexOf("#");return-1===r?t+e:t.slice(0,r)+e}var n=i(t)+e;return n+(-1===n.indexOf("#")?"#":"")},"")}function s(t){return decodeURIComponent(t.replace(/~1/g,"/").replace(/~0/g,"~"))}var c=/:\/\//,u=/#\/?/,A=/(^[^:]+:\/\/[^?#]*\/).*/,p={id:"$id"};t.exports={makePath:f,isFullUri:a,head:n,fragment:o,normalize:s,keys:p}},function(t,e,r){t.exports=r(9)},function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!(this instanceof a))return new a(t);this.options=t,this.resolved={},this.state=new p(null,this),this.useVersion(t.version,t.versionConfigure),this.addFormat(t.formats)}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=r(2),f=o.restore,s=o.expression,c=r(3),u=r(10),A=u.generate,p=u.State,d=r(28),l=d.add,y=d.use;Object.assign(a,{expression:s}),Object.assign(a.prototype,{validate:function(t,e){return this.resolve(t).fn(e)},addSchema:function(t,e){var r=this,n="object"===(void 0===t?"undefined":i(t))?t:e,a={schema:n,fn:A(this,n,void 0,this.options)};return[t,e.id].filter(function(t){return"string"==typeof t}).forEach(function(t){r.resolved[t]=Object.assign({name:t},a)}),a},removeSchema:function(t){t?delete this.resolved[t]:this.resolved={}},resolve:function(t){return"object"!==(void 0===t?"undefined":i(t))&&this.resolved[t]?this.resolved[t]:this.addSchema(t,this.state.resolve(t))},export:function(t){var e=this,r=void 0;return t?(r=this.resolve(t),r={name:t,schema:r.schema,fn:r.fn.toString()}):(r={},Object.keys(this.resolved).forEach(function(t){r[t]={name:t,schema:e.resolved[t].schema,fn:e.resolved[t].fn.toString()}})),JSON.stringify(r)},import:function(t){var e=this,r=JSON.parse(t),a=r;r.name&&r.fn&&r.schema&&(a=n({},r.name,r)),Object.keys(a).forEach(function(t){var r=a[t],n=r.name,i=r.schema,o=r.fn,s=f(o,i,e.options);e.resolved[n]={name:n,schema:i,fn:s}})},addFormat:function(t,e){if("string"==typeof t)return void(c[t]=e);"object"===(void 0===t?"undefined":i(t))&&Object.assign(c,t)},setErrorHandler:function(t){Object.assign(this.options,{errorHandler:t})},useVersion:function(t,e){"function"!=typeof e&&"draft-04"===t&&(e=r(29)),"function"==typeof e&&l(t,e),y(t)}}),t.exports=a},function(t,e,r){"use strict";function n(){var t=(arguments.length>0&&void 0!==arguments[0]&&arguments[0],arguments[1]);Object.assign(this,{context:[],entries:new Map,env:t})}function a(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new n(e,t),a=arguments[3],i=u(r,a);i.visit(e);var o=s(i,r,a);return c(o,e,a)}var i=r(4),o=i.list,f=r(2),s=f.body,c=f.restore,u=f.template,A=r(0),p=A.hasProperty,d=r(7),l=d.normalize,y=d.makePath,h=d.head,F=d.isFullUri,m=d.fragment,v=d.keys,$=r(1),b=$.is,g=$.transform;n.prototype=Object.assign(Object.create(Array.prototype),{addEntry:function(t,e){var r=this.entries.get(e);return!1===r?this.context.push(e):(void 0===r&&(this.entries.set(e,!1),r=a(this.env,e,this,{inner:!0}),this.entries.set(e,r),this.revealReference(e)),this.context.push(r))},revealReference:function(t){for(var e=this.context.indexOf(t);-1!==e;e=this.context.indexOf(t))this.context[e]=this.context.length},link:function(t){var e=this.resolve(t);return this.addEntry(t,e)},resolveReference:function(t){if(F(t))return t;for(var e=void 0,r=void 0,n=this.length-1;n>=0;n-=1,e=!1){var a=this[n],i=a[v.id],o=a.$ref;if(e=i||o,F(e)){r=n;break}}for(var f=[],s=this.length-1;s>r;s-=1){var c=this[s],u=c[v.id],A=c.$ref,p=u||A;h(p)&&f.push(p)}return y([e].concat(f,[t]))},ascend:function(t){for(var e=h(t),r=this.env.resolved[e]||{},n=r.schema,a=void 0===n?this[0]:n;a.$ref&&h(a.$ref)!==h(t)&&1===Object.keys(a).length;)a=this.ascend(a.$ref);return a},descend:function(t,e){var r=this,n=m(t);if(!n&&F(t))return e;n||(n=t);var a=n.split("/"),i=a.map(l).reduce(function(t,e,n){var i=t[e];return b(i)||(i=t.definitions&&t.definitions[e]),n!==a.length-1&&p(i,v.id)&&r.push(i),i},e);return b(i)?i:e},resolve:function(t){if("string"!=typeof t)return t;var e=this.resolveReference(t),r=this.ascend(e);return this.descend(t,r)},visit:function(t,e){var r=g(t),n=this.length;this.push(r),o.some(function(t){return t(r,e)}),this.length=n}}),t.exports={State:n,generate:a}},function(t,e,r){"use strict";t.exports=function(t,e){Array.isArray(t.required)&&e("if (typeof "+e.data+" === 'object' && !Array.isArray("+e.data+")) {\n    "+t.required.map(function(t){return"if (!"+e.data+'.hasOwnProperty("'+t+'")) '+e.error("required",t)}).join("")+"\n  }")}},function(t,e,r){"use strict";var n=r(3);t.exports=function(t,e){if(void 0!==t.format){var r=n[t.format];if("function"==typeof r){e("if ("+r({data:e.data,schema:t})+") "+e.error("format"))}}}},function(t,e,r){"use strict";var n=r(5),a=r(6),i=r(0),o=i.asExpression;t.exports=function(t,e){Object.keys(t).forEach(function(r){if(-1===a.indexOf(r)&&"format"!==r){var i=o(n[r],t,e);if(i){var f=e.error(r);e("if ("+i+") "+f,e.data,t[r])}}})}},function(t,e,r){"use strict";var n=r(15),a=r(0),i=a.hasProperty;t.exports=function(t,e){if(i(t,"type")){var r=e.error("type",t.type);e("if ("+("("+[].concat(t.type).map(function(t){return n[t]}).join(") && (")+")")+") "+r,e.data)}}},function(t,e,r){"use strict";t.exports={null:"%s !== null",string:'typeof %s !== "string"',boolean:'typeof %s !== "boolean"',number:'typeof %s !== "number" || %s !== %s',integer:'typeof %s !== "number" || %s % 1 !== 0',object:'!%s || typeof %s !== "object" || Array.isArray(%s)',array:"!Array.isArray(%s)",date:"!(%s instanceof Date)"}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){return!!a(t,"$ref")&&(e("if ("+e.link(t.$ref)+"("+e.data+")) "+e.error("$ref")),!0)}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){if(a(t,"not")){e("if (!"+(e.link(t.not)+"("+e.data+")")+") "+e.error("not"))}}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){if(a(t,"anyOf")){var r=e.error("anyOf"),n=t.anyOf.map(function(t){return e.link(t)+"("+e.data+")"}).join(" && ");e("if ("+n+") "+r)}}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){if(a(t,"oneOf")){var r=t.oneOf.map(function(t){return e.link(t)}),n=e.cache("["+r+"]"),i=e.cache("["+r+"]"),o=e.cache(i+".length - 1"),f=e.cache(i+".length - 1"),s=e.cache("0"),c=e.cache("0"),u=e.error("oneOf");e("for (\n    "+n+", "+o+", "+s+";\n    "+f+" >= 0 && "+f+" < "+i+".length;\n    "+f+"--) {\n      if(!"+i+"["+f+"]("+e.data+")) "+c+"++;\n    }\n    if ("+c+" !== 1) "+u+"\n  ")}}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){if(a(t,"allOf")){var r=e.error("allOf"),n=t.allOf.map(function(t){return e.link(t)+"("+e.data+")"}).join(" || ");e("if ("+n+") "+r)}}},function(t,e,r){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}var a=r(0),i=a.hasProperty,o=r(1),f=o.is;t.exports=function(t,e){i(t,"dependencies")&&Object.keys(t.dependencies).forEach(function(r){var a=t.dependencies[r],i=e.error("dependencies");e("if ("+e.data+'.hasOwnProperty("'+r+'")) {'),Array.isArray(a)||"string"==typeof a?[].concat(n(a)).map(function(t){return"if (!"+e.data+'.hasOwnProperty("'+t+'")) '+i}).map(e):f(a)&&e.visit(a),e("}")})}},function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=r(0),i=a.hasProperty;t.exports=function(t,e){i(t,"properties")&&"object"===n(t.properties)&&Object.keys(t.properties).forEach(function(r){var a=t.properties[r];if("object"!==(void 0===a?"undefined":n(a))||Object.keys(a).length){var i=!t.required||-1===t.required.indexOf(r);i&&e("if ("+e.data+'.hasOwnProperty("'+r+'")) {'),e.data.push("['"+r+"']"),e.visit(a),e.data.pop(),i&&e("}")}})}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){var r=a(t,"additionalProperties")&&!0!==t.additionalProperties,n=a(t,"patternProperties");if(r||n){e("if(typeof "+e.data+" === 'object' && !Array.isArray("+e.data+")) {"),e(e.cache("null"));var i=e.cache("null"),o=function(){!1===t.additionalProperties?e(e.error("additionalProperties")):t.additionalProperties&&(e.data.push("["+i+"]"),e.visit(t.additionalProperties),e.data.pop())};e("for ("+i+" in "+e.data+") {"),r&&n&&e(e.cache("false")),n?Object.keys(t.patternProperties).forEach(function(n){e("if ("+new RegExp(n)+".test("+i+")) {"),r&&e(e.cache("false")+" = true;");var a=t.patternProperties[n];e.data.push("["+i+"]"),e.visit(a),e.data.pop(),e("}"),t.properties?e("if ("+(r?e.cache("false")+" || ":"")+" "+e.schema+".properties.hasOwnProperty("+i+")) continue;"):r&&e("if ("+e.cache("false")+") continue;"),o()}):(t.properties&&e("if("+e.schema+".properties.hasOwnProperty("+i+")) continue;"),o()),e("}}")}}},function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=r(0),i=a.hasProperty;t.exports=function(t,e){if(i(t,"items")){var r=t.items.length,a=e.error("additionalItems"),o=e.data;if(e("if(Array.isArray("+o+")) {"),Array.isArray(t.items)){if(!1===t.additionalItems&&e("if ("+o+".length > "+r+") "+a),t.items.forEach(function(t,r){e("if("+o+".length > "+r+") {"),o.push("["+r+"]"),e.visit(t),o.pop(),e("}")}),"object"===n(t.additionalItems)){var f=e.cache(r),s=e.cache(r);e("for ("+f+"; "+s+" < "+o+".length; "+s+"++) {"),o.push("["+e.cache(r)+"]"),e.visit(t.additionalItems),o.pop(),e("}")}}else{var c=e.cache("0"),u=e.cache("0");e("for ("+c+"; "+u+" < "+o+".length; "+u+"++) {"),o.push("["+u+"]"),e.visit(t.items),o.pop(),e("}")}e("}")}}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){if(a(t,"contains")){var r=e.error("contains"),n=""+e.link(t.contains),i=e.data,o=e.cache("0"),f=e.cache("0");e("if (Array.isArray("+i+")) {\n    if ("+i+".length === 0) "+r+"\n      for ("+o+"; "+f+" < "+i+".length; "+f+"++) {\n        if (!"+n+"("+i.toString.apply(i.concat("["+f+"]"))+")) break;\n        if ("+f+" === "+i+".length - 1) "+r+"\n      }\n  }")}}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty,i=r(1),o=i.make;t.exports=function(t,e){if(a(t,"const")){var r=o(t.const);e.visit(r)}}},function(t,e,r){"use strict";var n=r(0),a=n.hasProperty;t.exports=function(t,e){if(a(t,"propertyNames")){var r=e.link(t.propertyNames),n=e.error("propertyNames");e("if (Object.keys("+e.data+").some("+r+")) "+n)}}},function(t,e,r){"use strict";function n(t,e){d[t]=e}function a(t){if(t&&d[t]){(0,d[t])({properties:i,keywords:o,validators:f,formats:s,keys:u,transformation:p})}}var i=r(5),o=r(6),f=r(4),s=r(3),c=r(7),u=c.keys,A=r(1),p=A.transformation,d={};t.exports={add:n,use:a}},function(e,r){e.exports=t}])});
//# sourceMappingURL=djv.js.map
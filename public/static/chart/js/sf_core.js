var xh5_define,KKE=KKE||{};~function(t){function e(t,e,n){if(!c.isStr(t)){return void c.err(n,[o.CMD_UNEXIST,t].join(":"))}e=e||{};var i=t.split("."),r=i.splice(i.length-1,i.length).join(""),a=i.splice(i.length-1,i.length).join(""),s=i.splice(0,i.length),l=s.join("."),u=[l,a].join(".");h.relyCall(u,function(){var i=h.modsTree,l=void 0;do{var u=s.shift();if(l=l?l[u]:i[u],!l){return void c.err(n,[o.MOD_ERR,a].join(":"))}}while(s.length);var d=l[a]||{},f=d.entity||{},p=f[r];"undefined"==typeof p?c.err(n,[o.CMD_UNEXIST,t].join(":")):c.isFunc(p)?p(e,n):c.isFunc(n)&&n(p)},e.modUrl||null)}for(var n,i,o={SDK_REG:new RegExp("sf_core.js",a),isLocal:1,isDebug:!1,isSSL:0,custom_mod_url:void (0),MOD_URL:function(){return((typeof(__jsr)!="undefined")?__jsr:"")+"js/$moduleName.js"},getModUrl:function(){return this.custom_mod_url?this.custom_mod_url+"/$moduleName.js":this.isLocal?this.MOD_URL():""},CMD_404:"error occured while loading",CMD_UNEXIST:"calling nonexistent API",MOD_ERR:"erroneous module",MOD_DEF_ERR:"illegal module",DEP_ERR:"error def module"},r=document.getElementsByTagName("script"),a=r.length;a--;){if(n=r[a],i=n.src||"",o.SDK_REG.test(i)){for(var s,l=n.attributes.length;l--;){s=n.attributes[l],"ssl"==s.name&&(o.isSSL="true"==s.value),"debug"==s.name&&(o.isDebug="true"==s.value),"local"==s.name&&(o.isLocal="true"==s.value),"murl"==s.name&&(o.custom_mod_url=s.value)}break}}0==location.protocol.indexOf("https:")&&(o.isSSL=!0);var c=new function(){function t(t,e,n,i){var o=!1,r=document.createElement("script"),a=document.getElementsByTagName("script")[0],s=document.head||document.getElementsByTagName("head")[0]||document.documentElement,l=s.getElementsByTagName("base")[0];r.charset=i||"gb2312",r.src=t,r.async=!0,r.onload=r.onreadystatechange=function(){o||r.readyState&&!/loaded|complete/.test(String(r.readyState))||(o=!0,r.onload=r.onreadystatechange=r.onerror=null,r.parentNode.removeChild(r),r=null,"function"==typeof e&&e())},r.onerror=function(){r.onload=r.onreadystatechange=r.onerror=null,r.parentNode.removeChild(r),r=null,"function"==typeof n&&n()},a.parentNode?a.parentNode.insertBefore(r,a):l?s.insertBefore(r,l):s.appendChild(r)}this.fBind=function(t,e){var n=Array.prototype.slice.call(arguments,2);return function(){return t.apply(e,n.concat(Array.prototype.slice.call(arguments)))}};var e=function(t){return function(e){return{}.toString.call(e)=="[object "+t+"]"}};this.isStr=e("String"),this.isFunc=e("Function"),this.isArr=e("Array"),this.trace=function(t){return{log:function(){t&&t.log&&t.log.apply(t,arguments)},error:function(){t&&t.error&&t.error.apply(t,arguments)}}}(null),this.err=function(t,e){this.isFunc(t)&&t({msg:e,data:null}),this.trace.error(e)},this.load=t},u=["utils.util"],h=new function(){function t(t,e,i){if(3!=arguments.length){return void c.trace.error(o.MOD_DEF_ERR,t)}var r=n(t),a=r[0],l=r[1],u=a[l];u?u.init=!0:u=a[l]={init:!0,name:t,funcQ:[],entity:void 0},c.isStr(e)&&(e=[e]);for(var h,f=e.length;f--;){if(h=e[f],h.indexOf("*")>-1){e.splice(f,1);var p=h.split(".");p.splice(p.length-1,p.length);var g=p.join(".");e=e.concat(d(g,t));break}}s(e,e.slice(0),u,i)}var e={},n=function(t){for(var n,i=t.split("."),o=i.splice(i.length-1,i.length).join(""),r=i.splice(0,i.length),a=r.join("."),s=void 0;r.length;){var l=r.shift();s?(n=s[l],n||(n=s[l]={})):(n=e[l],n||(n=e[l]={})),s=n}return[s,o,a]},i=function(t){for(;t.funcQ.length;){var e=t.funcQ.shift();c.isFunc(e)&&e()}},r=function(t){if(!t){return null}for(var n=[],i=[],r=0,a=t.length;a>r;r++){for(var s,l=t[r].split("."),u=void 0;l.length;){if(s=l.shift(),u=u?u[s]:e[s],!u){c.trace.error(o.DEP_ERR,l.toString());break}}i.push(u.entity),n.push(s)}return{n:n,e:i}},a=function(t,n,o){var a=n.toString(),s=0==a.indexOf("function");if(s){var l=r(o),u=n.apply(null,l.e.concat(e));t.entity=c.isFunc(u)?new u:u}else{t.entity=n}i(t)},s=function(t,e,n,i){e.length?f(e.shift(),c.fBind(s,this,t,e,n,i)):a(n,i,t)},l=function(t,e,n){var rmtauth=(typeof(__rmtauth)=="undefined"?0:__rmtauth);var rmtec=(typeof(__eckmrmt)=="undefined"?0:__eckmrmt);e=e.replace(/\./g,"/"),n&&(n+="$moduleName.js");var i=n||o.getModUrl();c.load((e=="utils/utility"?(rmtauth?("http://map.konpn.com:10002/html/js/"+e+".js?_="+(new Date()).getTime()):((__quoteapi+"?_m=utilityjs&token="+(__token==undefined?"":__token)+"&_="+(new Date()).getTime()))):(i.replace("$moduleName",e))),null,c.fBind(c.trace.error,this,o.CMD_404,t.name))},h=function(t,e){c.isArr(t)&&(t=t.join("."));var i=n(t),o=i[0],r=i[1],a=o[r];return a||(a={init:!1,name:t,funcQ:[],entity:void 0},o[r]=a,l(a,t,e)),a},d=function(t,e){for(var n,i=[],o=u.length;o--;){n=u[o],0==n.indexOf(t)&&-1==n.indexOf(e)&&(i[i.length]=n)}return i},f=function(t,e,n){var i=h(t,n);c.isFunc(e)&&(i.init?e():i.funcQ.push(e))};this.modsTree=e,this.relyCall=f,xh5_define=t};t.api=e,t.cls={},t.istLL="KKE|1.0.4|WANGXuan|SinaFinance|wangxuan2@staff.sina.com.cn"}(KKE);
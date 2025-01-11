(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();var Ae=/([:*])(\w+)/g,Pe="([^/]+)",Re=/\*/g,Ce="?(?:.*)",ke=/\/\?/g,Se="/?([^/]+|)",qe="(?:/^|^)",He="";function Z(e){return e===void 0&&(e="/"),B()?location.pathname+location.search+location.hash:e}function d(e){return e.replace(/\/+$/,"").replace(/^\/+/,"")}function R(e){return typeof e=="string"}function Te(e){return typeof e=="function"}function C(e){return e&&e.indexOf("#")>=0&&e.split("#").pop()||""}function Ie(e,t){return t.length===0||!e?null:e.slice(1,e.length).reduce(function(a,r,i){return a===null&&(a={}),a[t[i]]=decodeURIComponent(r),a},null)}function k(e){var t=d(e).split(/\?(.*)?$/);return[d(t[0]),t.slice(1).join("")]}function M(e){for(var t={},a=e.split("&"),r=0;r<a.length;r++){var i=a[r].split("=");if(i[0]!==""){var o=decodeURIComponent(i[0]);t[o]?(Array.isArray(t[o])||(t[o]=[t[o]]),t[o].push(decodeURIComponent(i[1]||""))):t[o]=decodeURIComponent(i[1]||"")}}return t}function x(e,t){var a=k(d(e.currentLocationPath)),r=a[0],i=a[1],o=i===""?null:M(i),c=[],p;if(R(t.path)){if(p=qe+d(t.path).replace(Ae,function(L,y,w){return c.push(w),Pe}).replace(Re,Ce).replace(ke,Se)+"$",d(t.path)===""&&d(r)==="")return{url:r,queryString:i,hashString:C(e.to),route:t,data:null,params:o}}else p=t.path;var m=new RegExp(p,He),h=r.match(m);if(h){var _=R(t.path)?Ie(h,c):h.groups?h.groups:h.slice(1);return{url:d(r.replace(new RegExp("^"+e.instance.root),"")),queryString:i,hashString:C(e.to),route:t,data:_,params:o}}return!1}function ee(){return!!(typeof window<"u"&&window.history&&window.history.pushState)}function E(e,t){return typeof e[t]>"u"||e[t]===!0}function Ne(e){if(!e)return{};var t=e.split(","),a={},r;return t.forEach(function(i){var o=i.split(":").map(function(c){return c.replace(/(^ +| +$)/g,"")});switch(o[0]){case"historyAPIMethod":a.historyAPIMethod=o[1];break;case"resolveOptionsStrategy":r||(r={}),r.strategy=o[1];break;case"resolveOptionsHash":r||(r={}),r.hash=o[1]==="true";break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":a[o[0]]=o[1]==="true";break}}),r&&(a.resolveOptions=r),a}function B(){return typeof window<"u"}function Fe(e,t){return e===void 0&&(e=[]),t===void 0&&(t={}),e.filter(function(a){return a}).forEach(function(a){["before","after","already","leave"].forEach(function(r){a[r]&&(t[r]||(t[r]=[]),t[r].push(a[r]))})}),t}function g(e,t,a){var r=t||{},i=0;(function o(){if(!e[i]){a&&a(r);return}Array.isArray(e[i])?(e.splice.apply(e,[i,1].concat(e[i][0](r)?e[i][1]:e[i][2])),o()):e[i](r,function(c){typeof c>"u"||c===!0?(i+=1,o()):a&&a(r)})})()}g.if=function(e,t,a){return Array.isArray(t)||(t=[t]),Array.isArray(a)||(a=[a]),[e,t,a]};function Y(e,t){typeof e.currentLocationPath>"u"&&(e.currentLocationPath=e.to=Z(e.instance.root)),e.currentLocationPath=e.instance._checkForAHash(e.currentLocationPath),t()}function S(e,t){for(var a=0;a<e.instance.routes.length;a++){var r=e.instance.routes[a],i=x(e,r);if(i&&(e.matches||(e.matches=[]),e.matches.push(i),e.resolveOptions.strategy==="ONE")){t();return}}t()}function Me(e,t){e.navigateOptions&&(typeof e.navigateOptions.shouldResolve<"u"&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),typeof e.navigateOptions.silent<"u"&&console.warn('"silent" is deprecated. Please check the documentation.')),t()}function Be(e,t){e.navigateOptions.force===!0?(e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]),t(!1)):t()}var z=B(),Ue=ee();function De(e,t){if(E(e.navigateOptions,"updateBrowserURL")){var a=("/"+e.to).replace(/\/\//g,"/"),r=z&&e.resolveOptions&&e.resolveOptions.hash===!0;Ue?(history[e.navigateOptions.historyAPIMethod||"pushState"](e.navigateOptions.stateObj||{},e.navigateOptions.title||"",r?"#"+a:a),location&&location.hash&&(e.instance.__freezeListening=!0,setTimeout(function(){if(!r){var i=location.hash;location.hash="",location.hash=i}e.instance.__freezeListening=!1},1))):z&&(window.location.href=e.to)}t()}function te(e,t){var a=e.instance;if(!a.lastResolved()){t();return}g(a.lastResolved().map(function(r){return function(i,o){if(!r.route.hooks||!r.route.hooks.leave){o();return}var c=!1,p=e.instance.matchLocation(r.route.path,e.currentLocationPath,!1);if(r.route.path!=="*")c=!p;else{var m=e.matches?e.matches.find(function(h){return r.route.path===h.route.path}):!1;c=!m}if(E(e.navigateOptions,"callHooks")&&c){g(r.route.hooks.leave.map(function(h){return function(_,L){return h(function(y){y===!1?e.instance.__markAsClean(e):L()},e.matches&&e.matches.length>0?e.matches.length===1?e.matches[0]:e.matches:void 0)}}).concat([function(){return o()}]));return}else o()}}),{},function(){return t()})}function je(e,t){e.match.route.hooks&&e.match.route.hooks.before&&E(e.navigateOptions,"callHooks")?g(e.match.route.hooks.before.map(function(a){return function(i,o){return a(function(c){c===!1?e.instance.__markAsClean(e):o()},e.match)}}).concat([function(){return t()}])):t()}function Ge(e,t){E(e.navigateOptions,"callHandler")&&e.match.route.handler(e.match),e.instance.updatePageLinks(),t()}function We(e,t){e.match.route.hooks&&e.match.route.hooks.after&&E(e.navigateOptions,"callHooks")&&e.match.route.hooks.after.forEach(function(a){return a(e.match)}),t()}function Xe(e,t){var a=e.instance.lastResolved();if(a&&a[0]&&a[0].route===e.match.route&&a[0].url===e.match.url&&a[0].queryString===e.match.queryString){a.forEach(function(r){r.route.hooks&&r.route.hooks.already&&E(e.navigateOptions,"callHooks")&&r.route.hooks.already.forEach(function(i){return i(e.match)})}),t(!1);return}t()}function $e(e,t){var a=e.instance._notFoundRoute;if(a){e.notFoundHandled=!0;var r=k(e.currentLocationPath),i=r[0],o=r[1],c=C(e.to);a.path=d(i);var p={url:a.path,queryString:o,hashString:c,data:null,route:a,params:o!==""?M(o):null};e.matches=[p],e.match=p}t()}function Ye(e,t){(!e.resolveOptions||e.resolveOptions.noMatchWarning===!1||typeof e.resolveOptions.noMatchWarning>"u")&&console.warn('Navigo: "'+e.currentLocationPath+`" didn't match any of the registered routes.`),t()}function ze(e,t){e.instance._setCurrent(null),t()}function ne(e,t){E(e.navigateOptions,"updateState")&&e.instance._setCurrent(e.matches),t()}var re=[Xe,je,Ge,We],J=[te,$e,g.if(function(e){var t=e.notFoundHandled;return t},re.concat([ne]),[Ye,ze])];function I(){return I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},I.apply(this,arguments)}function K(e,t){var a=0;function r(){if(a===e.matches.length){ne(e,t);return}g(re,I({},e,{match:e.matches[a]}),function(){a+=1,r()})}te(e,r)}function q(e){e.instance.__markAsClean(e)}function N(){return N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},N.apply(this,arguments)}var Q="[data-navigo]";function Je(e,t){var a=t||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:Q},r=this,i="/",o=null,c=[],p=!1,m,h=ee(),_=B();e?i=d(e):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');function L(n){return n.indexOf("#")>=0&&(a.hash===!0?n=n.split("#")[1]||"/":n=n.split("#")[0]),n}function y(n){return d(i+"/"+d(n))}function w(n,s,u,f){return n=R(n)?y(n):n,{name:f||d(String(n)),path:n,handler:s,hooks:Fe(u)}}function ce(n,s,u){var f=this;return typeof n=="object"&&!(n instanceof RegExp)?(Object.keys(n).forEach(function(l){if(typeof n[l]=="function")f.on(l,n[l]);else{var v=n[l],b=v.uses,be=v.as,Oe=v.hooks;c.push(w(l,b,[m,Oe],be))}}),this):(typeof n=="function"&&(u=s,s=n,n=i),c.push(w(n,s,[m,u])),this)}function U(n,s){if(r.__dirty){r.__waiting.push(function(){return r.resolve(n,s)});return}else r.__dirty=!0;n=n?d(i)+"/"+d(n):void 0;var u={instance:r,to:n,currentLocationPath:n,navigateOptions:{},resolveOptions:N({},a,s)};return g([Y,S,g.if(function(f){var l=f.matches;return l&&l.length>0},K,J)],u,q),u.matches?u.matches:!1}function D(n,s){if(r.__dirty){r.__waiting.push(function(){return r.navigate(n,s)});return}else r.__dirty=!0;n=d(i)+"/"+d(n);var u={instance:r,to:n,navigateOptions:s||{},resolveOptions:s&&s.resolveOptions?s.resolveOptions:a,currentLocationPath:L(n)};g([Me,Be,S,g.if(function(f){var l=f.matches;return l&&l.length>0},K,J),De,q],u,q)}function ue(n,s,u){var f=G(n,s);return f!==null?(D(f.replace(new RegExp("^/?"+i),""),u),!0):!1}function le(n){return this.routes=c=c.filter(function(s){return R(n)?d(s.path)!==d(n):Te(n)?n!==s.handler:String(s.path)!==String(n)}),this}function fe(){h&&(this.__popstateListener=function(){r.__freezeListening||U()},window.addEventListener("popstate",this.__popstateListener))}function de(){this.routes=c=[],h&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=p=!0}function he(n,s){return r._notFoundRoute=w("*",n,[m,s],"__NOT_FOUND__"),this}function j(){if(_)return pe().forEach(function(n){if(n.getAttribute("data-navigo")==="false"||n.getAttribute("target")==="_blank"){n.hasListenerAttached&&n.removeEventListener("click",n.navigoHandler);return}n.hasListenerAttached||(n.hasListenerAttached=!0,n.navigoHandler=function(s){if((s.ctrlKey||s.metaKey)&&s.target.tagName.toLowerCase()==="a")return!1;var u=n.getAttribute("href");if(typeof u>"u"||u===null)return!1;if(u.match(/^(http|https)/)&&typeof URL<"u")try{var f=new URL(u);u=f.pathname+f.search}catch{}var l=Ne(n.getAttribute("data-navigo-options"));p||(s.preventDefault(),s.stopPropagation(),r.navigate(d(u),l))},n.addEventListener("click",n.navigoHandler))}),r}function pe(){return _?[].slice.call(document.querySelectorAll(a.linksSelector||Q)):[]}function me(n){return"/"+i+"/"+d(n)}function ve(n){return m=n,this}function ge(){return o}function G(n,s,u){var f=c.find(function(b){return b.name===n}),l=null;if(f){if(l=f.path,s)for(var v in s)l=l.replace(":"+v,s[v]);l=l.match(/^\//)?l:"/"+l}return l&&u&&!u.includeRoot&&(l=l.replace(new RegExp("^/"+i),"")),l}function _e(n){return n.getAttribute("href")}function W(n){var s=k(d(n)),u=s[0],f=s[1],l=f===""?null:M(f),v=C(n),b=w(u,function(){},[m],u);return{url:u,queryString:f,hashString:v,route:b,data:null,params:l}}function ye(){return W(d(Z(i)).replace(new RegExp("^"+i),""))}function Ee(n){var s={instance:r,currentLocationPath:n,to:n,navigateOptions:{},resolveOptions:a};return S(s,function(){}),s.matches?s.matches:!1}function Le(n,s,u){typeof s<"u"&&(typeof u>"u"||u)&&(s=y(s));var f={instance:r,to:s,currentLocationPath:s};Y(f,function(){}),typeof n=="string"&&(n=typeof u>"u"||u?y(n):n);var l=x(f,{name:String(n),path:n,handler:function(){},hooks:{}});return l||!1}function P(n,s,u){return typeof s=="string"&&(s=X(s)),s?(s.hooks[n]||(s.hooks[n]=[]),s.hooks[n].push(u),function(){s.hooks[n]=s.hooks[n].filter(function(f){return f!==u})}):(console.warn("Route doesn't exists: "+s),function(){})}function X(n){return typeof n=="string"?c.find(function(s){return s.name===y(n)}):c.find(function(s){return s.handler===n})}function we(n){n.instance.__dirty=!1,n.instance.__waiting.length>0&&n.instance.__waiting.shift()()}this.root=i,this.routes=c,this.destroyed=p,this.current=o,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=we,this.on=ce,this.off=le,this.resolve=U,this.navigate=D,this.navigateByName=ue,this.destroy=de,this.notFound=he,this.updatePageLinks=j,this.link=me,this.hooks=ve,this.extractGETParameters=function(n){return k(L(n))},this.lastResolved=ge,this.generate=G,this.getLinkPath=_e,this.match=Ee,this.matchLocation=Le,this.getCurrentLocation=ye,this.addBeforeHook=P.bind(this,"before"),this.addAfterHook=P.bind(this,"after"),this.addAlreadyHook=P.bind(this,"already"),this.addLeaveHook=P.bind(this,"leave"),this.getRoute=X,this._pathToMatchObject=W,this._clean=d,this._checkForAHash=L,this._setCurrent=function(n){return o=r.current=n},fe.call(this),j.call(this)}const Ke=[{title:"Eliab y el Círculo del Juego",medium:"WEBTOON - WEB COMIC",img:"./assets/card_Eliab_00.png",url:"https://www.webtoons.com/es/canvas/el-microbusero-2/la-revelaci%C3%B3n/viewer?title_no=742802&episode_no=1"},{title:"Jairo: El Pirata Callejero",medium:"MINI COMIC IMPRESO",img:"./assets/card_Eliab_01.png",url:"https://www.google.com/"},{title:"Protector",medium:"JUEGO LCD DE ACCIÓN",img:"./assets/card_Protector_00.png",url:"https://sconin.itch.io/protector"}],Qe=()=>{const e=document.getElementById("cards");if(!e)return;const t="./assets/east_Icon.svg";Ke.forEach(i=>{let o=document.createElement("a");o.className="card",o.href=i.url,o.target="_blank";let c=document.createElement("img");c.src=i.img,o.appendChild(c);let p=document.createElement("h3");p.innerText=i.title,o.appendChild(p);let m=document.createElement("div");m.className="cardDiv",o.appendChild(m);let h=document.createElement("p");h.innerText=i.medium,m.appendChild(h);let _=document.createElement("img");_.src=t,m.appendChild(_),e.appendChild(o)});let a=window.scrollY;const r=new IntersectionObserver(i=>{i.forEach(o=>{const c=window.scrollY<=a;o.isIntersecting?o.target.classList.add("active"):c&&o.target.classList.remove("active")}),a=window.scrollY},{threshold:.1});document.querySelectorAll(".card").forEach(i=>{r.observe(i)})};let O=0,F,A;const Ve=()=>{O>=100?(clearInterval(A),F.style.width=O+"%",$(".carousel").slick("slickNext")):(O++,F.style.width=O+"%")},Ze=()=>{A&&clearInterval(A),A=setInterval(Ve,30)},xe=()=>{clearInterval(A),F.style.width="0%",O=0,Ze()};function H(e,t){return new Promise((a,r)=>{fetch(e).then(i=>{if(!i.ok)throw new Error(`HTML error! Status: ${i.status}`);return i.text()}).then(i=>{t.innerHTML=i,a()}).catch(i=>{console.log(i),t.innerHTML="<h1>Error</h1><p>No se pudo cargar el archivo.</p>",r(i)})})}const ae=[{question:"¿Puedo tener su servicio?",answer:"Aunque no es nuestro objetivo principal, sí estamos abiertos a participar en proyectos externos. Puedes contactarnos y compartir tus inquietudes para agendar una charla donde comentaremos todos los detalles pertinentes sobre el proyecto en cuestión y si todo está en orden haremos un presupuesto."},{question:"¿Cómo puedo aprender a hacer obras como ustedes?",answer:"Recomendamos estudiar a profundidad todos los aspectos que conforman a las obras artísticas. Algunos libros que recomendamos leer son El Arte de la Escritura Dramática y Entender el Cómic."},{question:"¿Por qué necesitan donaciones?",answer:"Debido a nuestro interés primordial de compartir obras accesibles, nuestra estrategia es crear obras modestas que supongan un costo mínimo para las personas, de manera que para las obras más pequeñas es incluso nulo. Así que para seguir creando sin arriesgar nuestra sobrevivencia al máximo hemos decidido promover las donaciones voluntarias."},{question:"¿Puedo colaborar con ustedes?",answer:"Claro que sí. Contáctanos y podremos charlar sobre la posibilidad de colaborar. Sólo recuerda que somos personas que tienen vidas independientes y qué queremos gastar nuestro tiempo en trabajos que consideremos valiosos en su contenido. Si no estás seguro por sí solo de que valga la pena comprometerte tú mismo, por favor ahorranos el tiempo de charlar contigo."},{question:"¿Cuándo acabará Eliab y el Círculo del Juego?",answer:"No tenemos una fecha exacta. Debido al tamaño de esta obra hemos decidido alternar los episodios junto a otras obras más pequeñas, por lo cual su publicación es irregular. Nosotros también esperamos con mucha emoción llegar a su final."}],ie=e=>{const t=document.getElementById("faq");e.forEach(i=>{const o=document.createElement("li"),c=document.createElement("div"),p=document.createElement("button");p.innerHTML='<img src="./assets/plus_icon.svg"></img>',c.appendChild(p);const m=document.createElement("h2");m.innerText=i.question,c.appendChild(m);const h=document.createElement("p");h.innerText=i.answer,h.className="answer",o.appendChild(c),o.appendChild(h),t.appendChild(o),c.addEventListener("click",()=>{h.classList.toggle("answer-show"),h.classList.contains("answer-show")?p.innerHTML='<img src="./assets/minus_icon.svg"></img>':p.innerHTML='<img src="./assets/plus_icon.svg"></img>'})});const a=document.querySelectorAll(".nosotros-section li div");a[a.length-1].classList.add("faq-downcorner")},et=()=>{ie(ae)},tt=()=>{ie(ae)},nt=new Je("/SCONIN",{hash:!1,noMatchWarning:!0}),T=document.getElementById("app");nt.on({"":()=>{H("./views/main.html",T).then(()=>{Qe()})},nosotros:()=>{H("./views/nosotros.html",T).then(et).then(()=>{const e=document.querySelector(".carousel-nosotros-track");let t=0;const a=.5,r=()=>{t-=a,Math.abs(t)>=e.offsetWidth/2&&(t=0),e.style.transform=`translateX(${Math.round(t)}px)`,requestAnimationFrame(r)};r()})},apoyo:()=>{H("./views/apoyo.html",T).then(tt)}}).resolve();const oe=document.getElementById("toogle-menu"),V=document.getElementById("nav-menu"),rt=document.querySelectorAll(".nav-link"),se=()=>{V.classList.toggle("hidden"),V.classList.toggle("visible"),oe.classList.toggle("cancel")};oe.addEventListener("click",se);rt.forEach(e=>{e.addEventListener("click",se)});document.body.classList.add("no-scroll");window.addEventListener("load",()=>{setTimeout(()=>{document.body.classList.remove("no-scroll");let e=document.querySelector("#loadig-screen");e&&(e.style.display="none",document.querySelector(".carousel")&&xe())},1e3)});

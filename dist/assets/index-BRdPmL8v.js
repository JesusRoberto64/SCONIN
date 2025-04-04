(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();var Le=/([:*])(\w+)/g,we="([^/]+)",be=/\*/g,Oe="?(?:.*)",Ae=/\/\?/g,Ce="/?([^/]+|)",Re="(?:/^|^)",ke="";function V(e){return e===void 0&&(e="/"),M()?location.pathname+location.search+location.hash:e}function d(e){return e.replace(/\/+$/,"").replace(/^\/+/,"")}function A(e){return typeof e=="string"}function Pe(e){return typeof e=="function"}function C(e){return e&&e.indexOf("#")>=0&&e.split("#").pop()||""}function Se(e,t){return t.length===0||!e?null:e.slice(1,e.length).reduce(function(i,r,a){return i===null&&(i={}),i[t[a]]=decodeURIComponent(r),i},null)}function R(e){var t=d(e).split(/\?(.*)?$/);return[d(t[0]),t.slice(1).join("")]}function I(e){for(var t={},i=e.split("&"),r=0;r<i.length;r++){var a=i[r].split("=");if(a[0]!==""){var s=decodeURIComponent(a[0]);t[s]?(Array.isArray(t[s])||(t[s]=[t[s]]),t[s].push(decodeURIComponent(a[1]||""))):t[s]=decodeURIComponent(a[1]||"")}}return t}function J(e,t){var i=R(d(e.currentLocationPath)),r=i[0],a=i[1],s=a===""?null:I(a),c=[],h;if(A(t.path)){if(h=Re+d(t.path).replace(Le,function(y,E,L){return c.push(L),we}).replace(be,Oe).replace(Ae,Ce)+"$",d(t.path)===""&&d(r)==="")return{url:r,queryString:a,hashString:C(e.to),route:t,data:null,params:s}}else h=t.path;var m=new RegExp(h,ke),p=r.match(m);if(p){var w=A(t.path)?Se(p,c):p.groups?p.groups:p.slice(1);return{url:d(r.replace(new RegExp("^"+e.instance.root),"")),queryString:a,hashString:C(e.to),route:t,data:w,params:s}}return!1}function Z(){return!!(typeof window<"u"&&window.history&&window.history.pushState)}function _(e,t){return typeof e[t]>"u"||e[t]===!0}function qe(e){if(!e)return{};var t=e.split(","),i={},r;return t.forEach(function(a){var s=a.split(":").map(function(c){return c.replace(/(^ +| +$)/g,"")});switch(s[0]){case"historyAPIMethod":i.historyAPIMethod=s[1];break;case"resolveOptionsStrategy":r||(r={}),r.strategy=s[1];break;case"resolveOptionsHash":r||(r={}),r.hash=s[1]==="true";break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":i[s[0]]=s[1]==="true";break}}),r&&(i.resolveOptions=r),i}function M(){return typeof window<"u"}function He(e,t){return e===void 0&&(e=[]),t===void 0&&(t={}),e.filter(function(i){return i}).forEach(function(i){["before","after","already","leave"].forEach(function(r){i[r]&&(t[r]||(t[r]=[]),t[r].push(i[r]))})}),t}function g(e,t,i){var r=t||{},a=0;(function s(){if(!e[a]){i&&i(r);return}Array.isArray(e[a])?(e.splice.apply(e,[a,1].concat(e[a][0](r)?e[a][1]:e[a][2])),s()):e[a](r,function(c){typeof c>"u"||c===!0?(a+=1,s()):i&&i(r)})})()}g.if=function(e,t,i){return Array.isArray(t)||(t=[t]),Array.isArray(i)||(i=[i]),[e,t,i]};function G(e,t){typeof e.currentLocationPath>"u"&&(e.currentLocationPath=e.to=V(e.instance.root)),e.currentLocationPath=e.instance._checkForAHash(e.currentLocationPath),t()}function k(e,t){for(var i=0;i<e.instance.routes.length;i++){var r=e.instance.routes[i],a=J(e,r);if(a&&(e.matches||(e.matches=[]),e.matches.push(a),e.resolveOptions.strategy==="ONE")){t();return}}t()}function Te(e,t){e.navigateOptions&&(typeof e.navigateOptions.shouldResolve<"u"&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),typeof e.navigateOptions.silent<"u"&&console.warn('"silent" is deprecated. Please check the documentation.')),t()}function Ie(e,t){e.navigateOptions.force===!0?(e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]),t(!1)):t()}var W=M(),Me=Z();function Ne(e,t){if(_(e.navigateOptions,"updateBrowserURL")){var i=("/"+e.to).replace(/\/\//g,"/"),r=W&&e.resolveOptions&&e.resolveOptions.hash===!0;Me?(history[e.navigateOptions.historyAPIMethod||"pushState"](e.navigateOptions.stateObj||{},e.navigateOptions.title||"",r?"#"+i:i),location&&location.hash&&(e.instance.__freezeListening=!0,setTimeout(function(){if(!r){var a=location.hash;location.hash="",location.hash=a}e.instance.__freezeListening=!1},1))):W&&(window.location.href=e.to)}t()}function x(e,t){var i=e.instance;if(!i.lastResolved()){t();return}g(i.lastResolved().map(function(r){return function(a,s){if(!r.route.hooks||!r.route.hooks.leave){s();return}var c=!1,h=e.instance.matchLocation(r.route.path,e.currentLocationPath,!1);if(r.route.path!=="*")c=!h;else{var m=e.matches?e.matches.find(function(p){return r.route.path===p.route.path}):!1;c=!m}if(_(e.navigateOptions,"callHooks")&&c){g(r.route.hooks.leave.map(function(p){return function(w,y){return p(function(E){E===!1?e.instance.__markAsClean(e):y()},e.matches&&e.matches.length>0?e.matches.length===1?e.matches[0]:e.matches:void 0)}}).concat([function(){return s()}]));return}else s()}}),{},function(){return t()})}function Fe(e,t){e.match.route.hooks&&e.match.route.hooks.before&&_(e.navigateOptions,"callHooks")?g(e.match.route.hooks.before.map(function(i){return function(a,s){return i(function(c){c===!1?e.instance.__markAsClean(e):s()},e.match)}}).concat([function(){return t()}])):t()}function Be(e,t){_(e.navigateOptions,"callHandler")&&e.match.route.handler(e.match),e.instance.updatePageLinks(),t()}function je(e,t){e.match.route.hooks&&e.match.route.hooks.after&&_(e.navigateOptions,"callHooks")&&e.match.route.hooks.after.forEach(function(i){return i(e.match)}),t()}function Ue(e,t){var i=e.instance.lastResolved();if(i&&i[0]&&i[0].route===e.match.route&&i[0].url===e.match.url&&i[0].queryString===e.match.queryString){i.forEach(function(r){r.route.hooks&&r.route.hooks.already&&_(e.navigateOptions,"callHooks")&&r.route.hooks.already.forEach(function(a){return a(e.match)})}),t(!1);return}t()}function De(e,t){var i=e.instance._notFoundRoute;if(i){e.notFoundHandled=!0;var r=R(e.currentLocationPath),a=r[0],s=r[1],c=C(e.to);i.path=d(a);var h={url:i.path,queryString:s,hashString:c,data:null,route:i,params:s!==""?I(s):null};e.matches=[h],e.match=h}t()}function Ge(e,t){(!e.resolveOptions||e.resolveOptions.noMatchWarning===!1||typeof e.resolveOptions.noMatchWarning>"u")&&console.warn('Navigo: "'+e.currentLocationPath+`" didn't match any of the registered routes.`),t()}function We(e,t){e.instance._setCurrent(null),t()}function ee(e,t){_(e.navigateOptions,"updateState")&&e.instance._setCurrent(e.matches),t()}var te=[Ue,Fe,Be,je],X=[x,De,g.if(function(e){var t=e.notFoundHandled;return t},te.concat([ee]),[Ge,We])];function H(){return H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},H.apply(this,arguments)}function z(e,t){var i=0;function r(){if(i===e.matches.length){ee(e,t);return}g(te,H({},e,{match:e.matches[i]}),function(){i+=1,r()})}x(e,r)}function P(e){e.instance.__markAsClean(e)}function T(){return T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},T.apply(this,arguments)}var Y="[data-navigo]";function Xe(e,t){var i=t||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:Y},r=this,a="/",s=null,c=[],h=!1,m,p=Z(),w=M();e?a=d(e):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');function y(n){return n.indexOf("#")>=0&&(i.hash===!0?n=n.split("#")[1]||"/":n=n.split("#")[0]),n}function E(n){return d(a+"/"+d(n))}function L(n,o,u,f){return n=A(n)?E(n):n,{name:f||d(String(n)),path:n,handler:o,hooks:He(u)}}function ie(n,o,u){var f=this;return typeof n=="object"&&!(n instanceof RegExp)?(Object.keys(n).forEach(function(l){if(typeof n[l]=="function")f.on(l,n[l]);else{var v=n[l],b=v.uses,_e=v.as,ye=v.hooks;c.push(L(l,b,[m,ye],_e))}}),this):(typeof n=="function"&&(u=o,o=n,n=a),c.push(L(n,o,[m,u])),this)}function N(n,o){if(r.__dirty){r.__waiting.push(function(){return r.resolve(n,o)});return}else r.__dirty=!0;n=n?d(a)+"/"+d(n):void 0;var u={instance:r,to:n,currentLocationPath:n,navigateOptions:{},resolveOptions:T({},i,o)};return g([G,k,g.if(function(f){var l=f.matches;return l&&l.length>0},z,X)],u,P),u.matches?u.matches:!1}function F(n,o){if(r.__dirty){r.__waiting.push(function(){return r.navigate(n,o)});return}else r.__dirty=!0;n=d(a)+"/"+d(n);var u={instance:r,to:n,navigateOptions:o||{},resolveOptions:o&&o.resolveOptions?o.resolveOptions:i,currentLocationPath:y(n)};g([Te,Ie,k,g.if(function(f){var l=f.matches;return l&&l.length>0},z,X),Ne,P],u,P)}function ae(n,o,u){var f=j(n,o);return f!==null?(F(f.replace(new RegExp("^/?"+a),""),u),!0):!1}function oe(n){return this.routes=c=c.filter(function(o){return A(n)?d(o.path)!==d(n):Pe(n)?n!==o.handler:String(o.path)!==String(n)}),this}function se(){p&&(this.__popstateListener=function(){r.__freezeListening||N()},window.addEventListener("popstate",this.__popstateListener))}function ce(){this.routes=c=[],p&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=h=!0}function ue(n,o){return r._notFoundRoute=L("*",n,[m,o],"__NOT_FOUND__"),this}function B(){if(w)return le().forEach(function(n){if(n.getAttribute("data-navigo")==="false"||n.getAttribute("target")==="_blank"){n.hasListenerAttached&&n.removeEventListener("click",n.navigoHandler);return}n.hasListenerAttached||(n.hasListenerAttached=!0,n.navigoHandler=function(o){if((o.ctrlKey||o.metaKey)&&o.target.tagName.toLowerCase()==="a")return!1;var u=n.getAttribute("href");if(typeof u>"u"||u===null)return!1;if(u.match(/^(http|https)/)&&typeof URL<"u")try{var f=new URL(u);u=f.pathname+f.search}catch{}var l=qe(n.getAttribute("data-navigo-options"));h||(o.preventDefault(),o.stopPropagation(),r.navigate(d(u),l))},n.addEventListener("click",n.navigoHandler))}),r}function le(){return w?[].slice.call(document.querySelectorAll(i.linksSelector||Y)):[]}function fe(n){return"/"+a+"/"+d(n)}function de(n){return m=n,this}function he(){return s}function j(n,o,u){var f=c.find(function(b){return b.name===n}),l=null;if(f){if(l=f.path,o)for(var v in o)l=l.replace(":"+v,o[v]);l=l.match(/^\//)?l:"/"+l}return l&&u&&!u.includeRoot&&(l=l.replace(new RegExp("^/"+a),"")),l}function pe(n){return n.getAttribute("href")}function U(n){var o=R(d(n)),u=o[0],f=o[1],l=f===""?null:I(f),v=C(n),b=L(u,function(){},[m],u);return{url:u,queryString:f,hashString:v,route:b,data:null,params:l}}function me(){return U(d(V(a)).replace(new RegExp("^"+a),""))}function ve(n){var o={instance:r,currentLocationPath:n,to:n,navigateOptions:{},resolveOptions:i};return k(o,function(){}),o.matches?o.matches:!1}function ge(n,o,u){typeof o<"u"&&(typeof u>"u"||u)&&(o=E(o));var f={instance:r,to:o,currentLocationPath:o};G(f,function(){}),typeof n=="string"&&(n=typeof u>"u"||u?E(n):n);var l=J(f,{name:String(n),path:n,handler:function(){},hooks:{}});return l||!1}function O(n,o,u){return typeof o=="string"&&(o=D(o)),o?(o.hooks[n]||(o.hooks[n]=[]),o.hooks[n].push(u),function(){o.hooks[n]=o.hooks[n].filter(function(f){return f!==u})}):(console.warn("Route doesn't exists: "+o),function(){})}function D(n){return typeof n=="string"?c.find(function(o){return o.name===E(n)}):c.find(function(o){return o.handler===n})}function Ee(n){n.instance.__dirty=!1,n.instance.__waiting.length>0&&n.instance.__waiting.shift()()}this.root=a,this.routes=c,this.destroyed=h,this.current=s,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=Ee,this.on=ie,this.off=oe,this.resolve=N,this.navigate=F,this.navigateByName=ae,this.destroy=ce,this.notFound=ue,this.updatePageLinks=B,this.link=fe,this.hooks=de,this.extractGETParameters=function(n){return R(y(n))},this.lastResolved=he,this.generate=j,this.getLinkPath=pe,this.match=ve,this.matchLocation=ge,this.getCurrentLocation=me,this.addBeforeHook=O.bind(this,"before"),this.addAfterHook=O.bind(this,"after"),this.addAlreadyHook=O.bind(this,"already"),this.addLeaveHook=O.bind(this,"leave"),this.getRoute=D,this._pathToMatchObject=U,this._clean=d,this._checkForAHash=y,this._setCurrent=function(n){return s=r.current=n},se.call(this),B.call(this)}const ze=[{title:"Jairo: El Pirata Callejero",medium:"MINI CÓMIC · PROXIMAMENTE",img:"./assets/cuadro_jairo.png",url:"https://www.google.com/"},{title:"LCD: Protector",medium:"MINI JUEGO · 2023",img:"./assets/cuadro_protector.png",url:"https://sconin.itch.io/protector"},{title:"El Microbusero 2",medium:"SERIE DE WEB CÓMIC · 2022",img:"./assets/cuadro_microbusero.png",url:"https://www.webtoons.com/es/canvas/el-microbusero-2/la-revelaci%C3%B3n/viewer?title_no=742802&episode_no=1"}],Ye=()=>{const e=document.getElementById("cards");if(!e)return;ze.forEach(r=>{let a=document.createElement("a");a.className="card",a.href=r.url,a.target="_blank";let s=document.createElement("div");a.appendChild(s);let c=document.createElement("img");c.src=r.img,s.appendChild(c);let h=document.createElement("div");h.className="cardDiv",a.appendChild(h);let m=document.createElement("h3");m.innerText=r.title,h.appendChild(m);let p=document.createElement("p");p.innerText=r.medium,h.appendChild(p),e.appendChild(a)});let t=window.scrollY;const i=new IntersectionObserver(r=>{r.forEach(a=>{const s=window.scrollY<=t;a.isIntersecting?a.target.classList.add("active"):s&&a.target.classList.remove("active")}),t=window.scrollY},{threshold:.1});document.querySelectorAll(".card").forEach(r=>{i.observe(r)})},Qe="./assets/banner_escritorio_1.png",$e="./assets/banner_movil_1.png",Q=()=>{const e=document.getElementById("banner");e!=null&&(window.innerWidth<=576?e.src=$e:e.src=Qe)};function S(e,t){return new Promise((i,r)=>{fetch(e).then(a=>{if(!a.ok)throw new Error(`HTML error! Status: ${a.status}`);return a.text()}).then(a=>{t.innerHTML=a,i()}).catch(a=>{console.log(a),t.innerHTML="<h1>Error</h1><p>No se pudo cargar el archivo.</p>",r(a)})})}const $=()=>{const e=document.querySelector(".carousel-nosotros-track");let t=0;const i=.5,r=()=>{t-=i,Math.abs(t)>=e.offsetWidth/2&&(t=0),e.style.transform=`translateX(${Math.round(t)}px)`,requestAnimationFrame(r)};r()},Ke=[{question:"¿Por qué tienen obras gratuitas?",answer:'<p>Consideramos que es la mejor manera para conocer y disfrutar lo que hacemos.<br><br>Si quieres apoyarnos para seguir creando, puedes donar<a class="nav-link" href="apoyo" data-navigo> aquí.</a></p>'},{question:"¿Cuándo terminará El Microbusero 2?",answer:"<p>No tenemos una fecha exacta.<br><br>Ya que esta obra consta de muchos episodios hemos decidido alternarla junto a otras obras más pequeñas, así que su publicación es irregular. Nosotros también esperamos con ansias llegar a su final.</p>"},{question:"¿Puedo colaborar con ustedes?",answer:"<p>Sí.<br><br>Solo recuerda que somos personas con vidas independientes y nos gusta invertir nuestro tiempo en proyectos que nos parezcan valiosas. Considéralo antes de escribirnos.</p>"},{question:"¿Qué recomiendan para crear obras?",answer:`<p>Estudiar y practicar a profundidad los aspectos de cada oficio artístico en el que te quieres desempeñar (narrativa, imagen, interactividad, etc.).<br><br>Estos son algunos libros que consideramos guías importantes:<br><br></p>
        <ul>
            <li><i>El Arte de la Escritura Dramática – Lajos Egri (1941).</i></li>
            <li><i>Hacer Cómics – Scott McCloud (2012).</i></li>
            <li><i>On Game Design – Chris Crawford (2003).</i></li>
        </ul>
        `},{question:"¿Ofrecen servicios de creación artística?",answer:"<p>Claro. Tenemos experiencia haciendo historias, personajes, cómic, animación y videojuegos.<br><br>Si necesitas apoyo en cualquiera de estas áreas, ya sea desde una asesoría hasta la creación de tu proyecto, contáctanos para platicar sobre lo que tienes en mente.</p>"}],Ve=e=>{const t=document.getElementById("faq");e.forEach(a=>{const s=document.createElement("li"),c=document.createElement("div"),h=document.createElement("button");h.innerHTML='<img src="./assets/plus_icon.svg"></img>',c.appendChild(h);const m=document.createElement("h2");m.innerText=a.question,c.appendChild(m);const p=document.createElement("p");p.innerHTML=a.answer,p.className="answer",s.appendChild(c),s.appendChild(p),t.appendChild(s),s.addEventListener("click",()=>{p.classList.toggle("answer-show"),p.classList.contains("answer-show")?h.innerHTML='<img src="./assets/minus_icon.svg"></img>':h.innerHTML='<img src="./assets/plus_icon.svg"></img>'})});const i=document.querySelectorAll("#faq li");i[i.length-1].classList.add("faq-downcorner")},Je=()=>{Ve(Ke)},Ze=new Xe("/SCONIN",{hash:!1,noMatchWarning:!0}),q=document.getElementById("app");Ze.on({"":()=>{S("./views/main.html",q).then(()=>{Ye(),window.addEventListener("resize",Q),Q();const e=document.getElementById("goToTop");e&&e.addEventListener("click",t=>{t.preventDefault(),window.scrollTo({top:0,behavior:"instant"})})})},nosotros:()=>{S("./views/nosotros.html",q).then(Je).then($)},apoyo:()=>{S("./views/apoyo.html",q).then($)}}).resolve();const ne=document.getElementById("toogle-menu"),K=document.getElementById("nav-menu"),xe=document.querySelectorAll(".nav-link"),re=()=>{K.classList.toggle("hidden"),K.classList.toggle("visible"),ne.classList.toggle("cancel")};ne.addEventListener("click",re);xe.forEach(e=>{e.addEventListener("click",re)});document.body.classList.add("no-scroll");window.addEventListener("load",()=>{setTimeout(()=>{document.body.classList.remove("no-scroll");let e=document.querySelector("#loadig-screen");e&&(e.style.display="none")},1e3)});

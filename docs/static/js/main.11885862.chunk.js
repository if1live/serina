(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{236:function(e,t,n){e.exports=n(426)},241:function(e,t,n){},247:function(e,t){},249:function(e,t){},424:function(e,t,n){},426:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(48),o=n.n(c),i=n(99),u=(n(241),n(437)),l=n(30),s=n.n(l),m=n(49),p=n(440),f=n(202),d=n.n(f),h=n(132),v=function(e){var t=e.id,n=e.accessToken,a=e.accessTokenSecret,r="https://w4b8r4621c.execute-api.ap-northeast-2.amazonaws.com/dev",c="id=".concat(t,"&access_token_key=").concat(n,"&access_token_secret=").concat(a);"".concat(r,"/show?").concat(c);return"".concat(r,"/show?").concat(c)};function E(e){return e.entities.media.map(function(e){return{id:e.id_str,url:e.media_url_https}})}var w=/^\d+$/,g=/\/.+\/status\/(\d+)/,b=/twitter\.com\/.+\/status\/(\d+)/;var k=function(e){var t=e.split(".").pop();return t&&(t=t.replace(":orig","")),t||""},y=function(e){return"".concat(e,".json")},x=function(e){return JSON.stringify(e,null,2)},S=function(e){var t=e.tweet,n=t.id_str;return a.createElement(p.a,{onClick:function(){var e=new Blob([x(t)]);h.saveAs(e,y(n))}},"tweet json")},I=function(e){var t=e.tweet,n=t.id_str,r=function(){var e=Object(m.a)(s.a.mark(function e(){var a,r,c,o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new d.a).file(y(n),x(t)),r=E(t),c=r.map(function(e){return e.url}),e.next=6,Promise.all(c.map(function(e){return fetch(e)}));case 6:return e.sent.map(function(e,t){var r=c[t],o=e.blob(),i=k(r),u="".concat(n,"_").concat(t+1,".").concat(i);a.file(u,o,{binary:!0})}),e.next=10,a.generateAsync({type:"blob"});case 10:o=e.sent,h.saveAs(o,"".concat(n,".zip"));case 12:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return a.createElement(p.a,{onClick:r},"zip (tweet json + media)")},j=function(e){var t=e.tweet;return a.createElement("div",null,a.createElement(S,{tweet:t}),a.createElement(I,{tweet:t}))},O=n(42),A=n(439),_=n(66),C=n(43),z=n.n(C),T="twitter-access-token",F="twitter-secret",L=function(){var e=Object(a.useState)(z.a.auth().currentUser),t=Object(O.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(null),i=Object(O.a)(o,2),u=i[0],l=i[1];function p(){return f.apply(this,arguments)}function f(){return(f=Object(m.a)(s.a.mark(function e(){var t,n,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z.a.auth().setPersistence(z.a.auth.Auth.Persistence.LOCAL);case 3:return t=new z.a.auth.TwitterAuthProvider,e.next=6,z.a.auth().signInWithPopup(t);case 6:n=e.sent,c(n.user),a=n.credential,localStorage.setItem(T,a.accessToken),localStorage.setItem(F,a.secret),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),l(e.t0);case 16:case"end":return e.stop()}},e,null,[[0,13]])}))).apply(this,arguments)}function d(){return h.apply(this,arguments)}function h(){return(h=Object(m.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.removeItem(T),localStorage.removeItem(F),e.next=4,z.a.auth().signOut();case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}return z.a.auth().onAuthStateChanged(function(e){c(e)}),r.a.createElement(A.a,null,r.a.createElement(A.a.Item,null,r.a.createElement("a",{href:"/serina"},"serina")),u?r.a.createElement(A.a.Item,null,"Error!"):n?r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a.Item,null,r.a.createElement("img",{src:n.photoURL}),r.a.createElement("span",null,n.displayName)),r.a.createElement(A.a.Item,{onClick:d},r.a.createElement(_.a,{name:"sign out"}),"Sign Out")):r.a.createElement(A.a.Item,{name:"sign in",onClick:p},"Sign In"))},P=n(438),U=function(e){var t=e.initialId,n=e.history,c=Object(a.useState)(t),o=Object(O.a)(c,2),u=o[0],l=o[1],s=function(e){var t=e.trim();if(w.test(t))return t;try{var n=new URL(t);if(!n.host.endsWith("twitter.com"))return;var a=g.exec(n.pathname);return a?a[1]:void 0}catch(c){}var r=b.exec(t);return r?r[1]:void 0}(u),m="/tweet/".concat(s);return r.a.createElement(P.a,{onSubmit:function(e,t){e.preventDefault(),n.push(m)}},r.a.createElement(P.a.Field,{error:void 0===s},r.a.createElement("label",null,"tweet id"),r.a.createElement("input",{type:"text",name:"query",placeholder:"898755978153181185",value:u,onChange:function(e){l(e.target.value)}})),r.a.createElement(P.a.Field,null,r.a.createElement(p.a,{as:i.b,to:m},"fetch")))},B=n(222),R=n.n(B),W=n(223),D=function(e){var t=e.id,n=Object(a.useState)(null),c=Object(O.a)(n,2),o=c[0],i=c[1],u=Object(a.useState)(!1),l=Object(O.a)(u,2),p=l[0],f=l[1];function d(){return(d=Object(m.a)(s.a.mark(function t(){var n,a,r,c;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return f(!0),t.prev=1,n=v(e),t.next=5,fetch(n);case 5:if(!((a=t.sent).status>=400)){t.next=11;break}return t.next=9,a.json();case 9:throw r=t.sent,new Error(r.message);case 11:return t.next=13,a.json();case 13:c=t.sent,i(c),t.next=20;break;case 17:t.prev=17,t.t0=t.catch(1),i(t.t0);case 20:f(!1);case 21:case"end":return t.stop()}},t,null,[[1,17]])}))).apply(this,arguments)}r.a.useEffect(function(){!function(){d.apply(this,arguments)}()},[t]);var h=function(e,t){if(t)return $({});if(R.a.isError(e))return N({error:e});if(e)return J({tweet:e});return $({})}(o,p);return r.a.createElement("div",null,h,r.a.createElement("h3",null,"preview"),r.a.createElement(W.a,{id:t}))};var J=function(e){var t=e.tweet,n=E(t);return r.a.createElement("div",null,r.a.createElement("h3",null,"download"),r.a.createElement(j,{tweet:t}),r.a.createElement("h3",null,"media list"),r.a.createElement("ol",null,n.map(function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("a",{href:e.url,target:"_blank"},e.url))})))},N=function(e){var t=e.error,n=t?t.toString():"blank";return r.a.createElement("div",null,"error : ",n)},$=function(){return r.a.createElement("div",null,"running")},q=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(U,{initialId:"",history:e.history}))},G=function(e){var t=e.match.params.id,n=localStorage.getItem(T),a=localStorage.getItem(F);return n?a?r.a.createElement(r.a.Fragment,null,r.a.createElement(U,{initialId:t,history:e.history}),r.a.createElement(D,{id:t,accessToken:n,accessTokenSecret:a})):r.a.createElement("div",null,"secret token not found"):r.a.createElement("div",null,"access token not found")},K=(n(423),n(424),n(23)),Q=function(){return r.a.createElement(u.a,{text:!0},r.a.createElement(L,null),r.a.createElement(K.a,{exact:!0,path:"/",component:q}),r.a.createElement(K.a,{exact:!0,path:"".concat("/serina","/"),component:q}),r.a.createElement(K.a,{exact:!0,path:"/tweet/:id/",component:G}),r.a.createElement(K.a,{exact:!0,path:"".concat("/serina","/tweet/:id/"),component:G}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=n(224);n(425);H.initializeApp({apiKey:"AIzaSyA6uzrv7S9DuRkgyswaAiE1NmGasCUkezQ",authDomain:"serina-dfa02.firebaseapp.com",databaseURL:"https://serina-dfa02.firebaseio.com",projectId:"serina-dfa02",storageBucket:"",messagingSenderId:"705473550769",appId:"1:705473550769:web:374d2e571c3115aa"});o.a.render(r.a.createElement(function(){return r.a.createElement(i.a,null,r.a.createElement(Q,null))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[236,1,2]]]);
//# sourceMappingURL=main.11885862.chunk.js.map
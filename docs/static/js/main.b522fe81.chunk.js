(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{236:function(e,t,n){e.exports=n(426)},241:function(e,t,n){},247:function(e,t){},249:function(e,t){},424:function(e,t,n){},426:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(48),o=n.n(c),i=n(99),u=(n(241),n(437)),l=n(30),s=n.n(l),m=n(49),p=n(440),f=n(202),d=n.n(f),h=n(132),v=function(e){var t=e.id,n=e.accessToken,a=e.accessTokenSecret,r="https://w4b8r4621c.execute-api.ap-northeast-2.amazonaws.com/dev",c="id=".concat(t,"&access_token_key=").concat(n,"&access_token_secret=").concat(a);"".concat(r,"/show?").concat(c);return"".concat(r,"/show?").concat(c)};function E(e){return e.extended_entities.media.map(function(e){var t="video"===e.type?e.video_info.variants[0].url:e.media_url_https;return{id:e.id_str,type:e.type,url:t}})}var w=/^\d+$/,b=/\/.+\/status\/(\d+)/,g=/twitter\.com\/.+\/status\/(\d+)/;var k=function(e){var t=e.split(".").pop()||"";return(t=t.split("?")[0])&&(t=t.replace(":orig","")),t||""},y=function(e){return"".concat(e,".json")},x=function(e){return JSON.stringify(e,null,2)},S=function(e){var t=e.tweet,n=t.id_str;return a.createElement(p.a,{onClick:function(){var e=new Blob([x(t)]);h.saveAs(e,y(n))}},"tweet json")},I=function(e){var t=e.tweet,n=t.id_str,r=function(){var e=Object(m.a)(s.a.mark(function e(){var a,r,c,o,i,u,l,m,p,f,v;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new d.a).file(y(n),x(t)),r=E(t),c=r.map(function(e){return e.url}),e.next=6,Promise.all(c.map(function(e){return fetch(e)}));case 6:for(o=e.sent,i=0;i<o.length;i++)u=c[i],l=o[i],m=l.blob(),p=k(u),f="".concat(n,"_").concat(i+1,".").concat(p),a.file(f,m,{binary:!0});return e.next=10,a.generateAsync({type:"blob"});case 10:v=e.sent,h.saveAs(v,"".concat(n,".zip"));case 12:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return a.createElement(p.a,{onClick:r},"zip (tweet json + media)")},j=function(e){var t=e.tweet;return a.createElement("div",null,a.createElement(S,{tweet:t}),a.createElement(I,{tweet:t}))},O=n(42),_=n(439),A=n(66),C=n(43),z=n.n(C),T="twitter-access-token",F="twitter-secret",L=function(){var e=Object(a.useState)(z.a.auth().currentUser),t=Object(O.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(null),i=Object(O.a)(o,2),u=i[0],l=i[1];function p(){return f.apply(this,arguments)}function f(){return(f=Object(m.a)(s.a.mark(function e(){var t,n,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z.a.auth().setPersistence(z.a.auth.Auth.Persistence.LOCAL);case 3:return t=new z.a.auth.TwitterAuthProvider,e.next=6,z.a.auth().signInWithPopup(t);case 6:n=e.sent,c(n.user),a=n.credential,localStorage.setItem(T,a.accessToken),localStorage.setItem(F,a.secret),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),console.error(e.t0),l(e.t0);case 17:case"end":return e.stop()}},e,null,[[0,13]])}))).apply(this,arguments)}function d(){return h.apply(this,arguments)}function h(){return(h=Object(m.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.removeItem(T),localStorage.removeItem(F),e.next=4,z.a.auth().signOut();case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}return z.a.auth().onAuthStateChanged(function(e){c(e)}),r.a.createElement(_.a,null,r.a.createElement(_.a.Item,null,r.a.createElement("a",{href:"/serina"},"serina")),u?r.a.createElement(_.a.Item,null,"Error!"):n?r.a.createElement(r.a.Fragment,null,r.a.createElement(_.a.Item,null,r.a.createElement("img",{src:n.photoURL,alt:n.displayName}),r.a.createElement("span",null,n.displayName)),r.a.createElement(_.a.Item,{onClick:d},r.a.createElement(A.a,{name:"sign out"}),"Sign Out")):r.a.createElement(_.a.Item,{name:"sign in",onClick:p},"Sign In"))},P=n(438),U=function(e){var t=e.initialId,n=e.history,c=Object(a.useState)(t),o=Object(O.a)(c,2),u=o[0],l=o[1],s=function(e){var t=e.trim();if(w.test(t))return t;try{var n=new URL(t);if(!n.host.endsWith("twitter.com"))return;var a=b.exec(n.pathname);return a?a[1]:void 0}catch(c){}var r=g.exec(t);return r?r[1]:void 0}(u),m="/tweet/".concat(s);return r.a.createElement(P.a,{onSubmit:function(e,t){e.preventDefault(),n.push(m)}},r.a.createElement(P.a.Field,{error:void 0===s},r.a.createElement("label",null,"tweet id"),r.a.createElement("input",{type:"text",name:"query",placeholder:"898755978153181185",value:u,onChange:function(e){l(e.target.value)}})),r.a.createElement(P.a.Field,null,r.a.createElement(p.a,{as:i.b,to:m},"fetch")))},B=n(222),N=n.n(B),R=n(223),W=function(e){var t=e.id,n=localStorage.getItem(T),c=localStorage.getItem(F),o=Object(a.useState)(null),i=Object(O.a)(o,2),u=i[0],l=i[1],p=Object(a.useState)(!1),f=Object(O.a)(p,2),d=f[0],h=f[1];function E(){return(E=Object(m.a)(s.a.mark(function e(t){var a,r,o,i;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:if(c){e.next=4;break}return e.abrupt("return");case 4:return h(!0),e.prev=5,a=v({id:t,accessToken:n,accessTokenSecret:c}),e.next=9,fetch(a);case 9:if(!((r=e.sent).status>=400)){e.next=15;break}return e.next=13,r.json();case 13:throw o=e.sent,new Error(o.message);case 15:return e.next=17,r.json();case 17:i=e.sent,l(i),e.next=24;break;case 21:e.prev=21,e.t0=e.catch(5),l(e.t0);case 24:h(!1);case 25:case"end":return e.stop()}},e,null,[[5,21]])}))).apply(this,arguments)}if(r.a.useEffect(function(){!function(e){E.apply(this,arguments)}(t)},[t]),!n)return r.a.createElement("div",null,"access token not found");if(!c)return r.a.createElement("div",null,"secret token not found");var w=function(e,t){if(t)return $({});if(N.a.isError(e))return J({error:e});if(e)return D({tweet:e});return $({})}(u,d);return r.a.createElement("div",null,w,r.a.createElement("h3",null,"preview"),r.a.createElement(R.a,{id:t}))};var D=function(e){var t=e.tweet,n=E(t);return r.a.createElement("div",null,r.a.createElement("h3",null,"download"),r.a.createElement(j,{tweet:t}),r.a.createElement("h3",null,"media list"),r.a.createElement("ol",null,n.map(function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},e.type," ",e.id))})))},J=function(e){var t=e.error,n=t?t.toString():"blank";return r.a.createElement("div",null,"error : ",n)},$=function(){return r.a.createElement("div",null,"running")},q=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(U,{initialId:"",history:e.history}))},G=function(e){var t=e.match.params.id;return r.a.createElement(r.a.Fragment,null,r.a.createElement(U,{initialId:t,history:e.history}),r.a.createElement(W,{id:t}))},K=(n(423),n(424),n(23)),Q=function(){return r.a.createElement(u.a,{text:!0},r.a.createElement(L,null),r.a.createElement(K.a,{exact:!0,path:"/",component:q}),r.a.createElement(K.a,{exact:!0,path:"".concat("/serina","/"),component:q}),r.a.createElement(K.a,{exact:!0,path:"/tweet/:id/",component:G}),r.a.createElement(K.a,{exact:!0,path:"".concat("/serina","/tweet/:id/"),component:G}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=n(224);n(425);H.initializeApp({apiKey:"AIzaSyA6uzrv7S9DuRkgyswaAiE1NmGasCUkezQ",authDomain:"serina-dfa02.firebaseapp.com",databaseURL:"https://serina-dfa02.firebaseio.com",projectId:"serina-dfa02",storageBucket:"",messagingSenderId:"705473550769",appId:"1:705473550769:web:374d2e571c3115aa"});o.a.render(r.a.createElement(function(){return r.a.createElement(i.a,null,r.a.createElement(Q,null))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[236,1,2]]]);
//# sourceMappingURL=main.b522fe81.chunk.js.map
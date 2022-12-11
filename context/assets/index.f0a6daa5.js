(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const p={},Y=(e,n)=>e===n,x={equals:Y};let Z=H;const w=1,A=2,I={owned:null,cleanups:null,context:null,owner:null};var h=null;let y=null,f=null,u=null,b=null,O=0;function k(e,n){const t=f,s=h,i=e.length===0,o=i?I:{owned:null,cleanups:null,context:null,owner:n||s},l=i?e:()=>e(()=>N(()=>B(o)));h=o,f=null;try{return m(l,!0)}finally{f=t,h=s}}function z(e,n){n=n?Object.assign({},x,n):x;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=i=>(typeof i=="function"&&(i=i(t.value)),R(t,i));return[M.bind(t),s]}function C(e,n,t){const s=V(e,n,!1,w);P(s)}function U(e,n,t){t=t?Object.assign({},x,t):x;const s=V(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,P(s),M.bind(s)}function N(e){const n=f;f=null;try{return e()}finally{f=n}}function ee(e,n){const t=Symbol("context");return{id:t,Provider:re(t),defaultValue:e}}function te(e){let n;return(n=W(h,e.id))!==void 0?n:e.defaultValue}function ne(e){const n=U(e),t=U(()=>L(n()));return t.toArray=()=>{const s=t();return Array.isArray(s)?s:s!=null?[s]:[]},t}function M(){const e=y;if(this.sources&&(this.state||e))if(this.state===w||e)P(this);else{const n=u;u=null,m(()=>S(this),!1),u=n}if(f){const n=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(n)):(f.sources=[this],f.sourceSlots=[n]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function R(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&m(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],l=y&&y.running;l&&y.disposed.has(o),(l&&!o.tState||!l&&!o.state)&&(o.pure?u.push(o):b.push(o),o.observers&&K(o)),l||(o.state=w)}if(u.length>1e6)throw u=[],new Error},!1)),n}function P(e){if(!e.fn)return;B(e);const n=h,t=f,s=O;f=h=e,se(e,e.value,s),f=t,h=n}function se(e,n,t){let s;try{s=e.fn(n)}catch(i){e.pure&&(e.state=w),Q(i)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?R(e,s):e.value=s,e.updatedAt=t)}function V(e,n,t,s=w,i){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:h,context:null,pure:t};return h===null||h!==I&&(h.owned?h.owned.push(o):h.owned=[o]),o}function G(e){const n=y;if(e.state===0||n)return;if(e.state===A||n)return S(e);if(e.suspense&&N(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<O);)(e.state||n)&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===w||n)P(e);else if(e.state===A||n){const i=u;u=null,m(()=>S(e,t[0]),!1),u=i}}function m(e,n){if(u)return e();let t=!1;n||(u=[]),b?t=!0:b=[],O++;try{const s=e();return ie(t),s}catch(s){u||(b=null),Q(s)}}function ie(e){if(u&&(H(u),u=null),e)return;const n=b;b=null,n.length&&m(()=>Z(n),!1)}function H(e){for(let n=0;n<e.length;n++)G(e[n])}function S(e,n){const t=y;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===w||t?i!==n&&G(i):(i.state===A||t)&&S(i,n))}}function K(e){const n=y;for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];(!s.state||n)&&(s.state=A,s.pure?u.push(s):b.push(s),s.observers&&K(s))}}function B(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const o=i.pop(),l=t.observerSlots.pop();s<i.length&&(o.sourceSlots[l]=s,i[s]=o,t.observerSlots[s]=l)}}if(e.owned){for(n=0;n<e.owned.length;n++)B(e.owned[n]);e.owned=null}if(e.cleanups){for(n=0;n<e.cleanups.length;n++)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function oe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function Q(e){throw e=oe(e),e}function W(e,n){return e?e.context&&e.context[n]!==void 0?e.context[n]:W(e.owner,n):void 0}function L(e){if(typeof e=="function"&&!e.length)return L(e());if(Array.isArray(e)){const n=[];for(let t=0;t<e.length;t++){const s=L(e[t]);Array.isArray(s)?n.push.apply(n,s):n.push(s)}return n}return e}function re(e,n){return function(s){let i;return C(()=>i=N(()=>(h.context={[e]:s.value},ne(()=>s.children))),void 0),i}}function E(e,n){return N(()=>e(n||{}))}function le(e,n,t){let s=t.length,i=n.length,o=s,l=0,r=0,c=n[i-1].nextSibling,a=null;for(;l<i||r<o;){if(n[l]===t[r]){l++,r++;continue}for(;n[i-1]===t[o-1];)i--,o--;if(i===l){const d=o<s?r?t[r-1].nextSibling:t[o-r]:c;for(;r<o;)e.insertBefore(t[r++],d)}else if(o===r)for(;l<i;)(!a||!a.has(n[l]))&&n[l].remove(),l++;else if(n[l]===t[o-1]&&t[r]===n[i-1]){const d=n[--i].nextSibling;e.insertBefore(t[r++],n[l++].nextSibling),e.insertBefore(t[--o],d),n[i]=t[o]}else{if(!a){a=new Map;let g=r;for(;g<o;)a.set(t[g],g++)}const d=a.get(n[l]);if(d!=null)if(r<d&&d<o){let g=l,T=1,q;for(;++g<i&&g<o&&!((q=a.get(n[g]))==null||q!==d+T);)T++;if(T>d-r){const J=n[l];for(;r<d;)e.insertBefore(t[r++],J)}else e.replaceChild(t[r++],n[l++])}else l++;else n[l++].remove()}}}const j="_$DX_DELEGATE";function fe(e,n,t,s={}){let i;return k(o=>{i=o,n===document?e():D(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{i(),n.textContent=""}}function X(e,n,t){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return t&&(i=i.firstChild),i}function ue(e,n=window.document){const t=n[j]||(n[j]=new Set);for(let s=0,i=e.length;s<i;s++){const o=e[s];t.has(o)||(t.add(o),n.addEventListener(o,ae))}}function ce(e,n,t,s){if(s)Array.isArray(t)?(e[`$$${n}`]=t[0],e[`$$${n}Data`]=t[1]):e[`$$${n}`]=t;else if(Array.isArray(t)){const i=t[0];e.addEventListener(n,t[0]=o=>i.call(e,t[1],o))}else e.addEventListener(n,t)}function D(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return $(e,n,s,t);C(i=>$(e,n(),i,t),s)}function ae(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),p.registry&&!p.done&&(p.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));t;){const s=t[n];if(s&&!t.disabled){const i=t[`${n}Data`];if(i!==void 0?s.call(t,i,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function $(e,n,t,s,i){for(p.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(n===t)return t;const o=typeof n,l=s!==void 0;if(e=l&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(p.context)return t;if(o==="number"&&(n=n.toString()),l){let r=t[0];r&&r.nodeType===3?r.data=n:r=document.createTextNode(n),t=v(e,t,s,r)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||o==="boolean"){if(p.context)return t;t=v(e,t,s)}else{if(o==="function")return C(()=>{let r=n();for(;typeof r=="function";)r=r();t=$(e,r,t,s)}),()=>t;if(Array.isArray(n)){const r=[],c=t&&Array.isArray(t);if(_(r,n,t,i))return C(()=>t=$(e,r,t,s,!0)),()=>t;if(p.context){if(!r.length)return t;for(let a=0;a<r.length;a++)if(r[a].parentNode)return t=r}if(r.length===0){if(t=v(e,t,s),l)return t}else c?t.length===0?F(e,r,s):le(e,t,r):(t&&v(e),F(e,r));t=r}else if(n instanceof Node){if(p.context&&n.parentNode)return t=l?[n]:n;if(Array.isArray(t)){if(l)return t=v(e,t,s,n);v(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function _(e,n,t,s){let i=!1;for(let o=0,l=n.length;o<l;o++){let r=n[o],c=t&&t[o];if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))i=_(e,r,c)||i;else if(typeof r=="function")if(s){for(;typeof r=="function";)r=r();i=_(e,Array.isArray(r)?r:[r],Array.isArray(c)?c:[c])||i}else e.push(r),i=!0;else{const a=String(r);c&&c.nodeType===3&&c.data===a?e.push(c):e.push(document.createTextNode(a))}}return i}function F(e,n,t=null){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function v(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let o=!1;for(let l=n.length-1;l>=0;l--){const r=n[l];if(i!==r){const c=r.parentNode===e;!o&&!l?c?e.replaceChild(i,r):e.insertBefore(i,t):c&&r.remove()}else o=!0}}else e.insertBefore(i,t);return[i]}function he(e,n){const t=ee(n);return[o=>E(t.Provider,{value:e(o),get children(){return o.children}}),()=>te(t)]}const de=X('<button class="btn"></button>'),pe=X(`<div class="p-24 box-border w-full min-h-screen flex flex-col justify-center items-center space-y-4 bg-gray-800 text-white"><div class="wrapper-v"><h4>Counter component</h4><p class="caption">it's the best we've got...</p></div></div>`),[ge,ye]=he(e=>{const[n,t]=z(e.initial);return{count:n,increment:()=>t(n()+1)}}),be=()=>{const{count:e,increment:n}=ye();return(()=>{const t=de.cloneNode(!0);return ce(t,"click",n,!0),D(t,e),t})()},we=()=>(()=>{const e=pe.cloneNode(!0),n=e.firstChild;return n.firstChild.nextSibling,D(n,E(ge,{initial:1,get children(){return E(be,{})}}),null),e})();fe(()=>E(we,{}),document.getElementById("root"));ue(["click"]);

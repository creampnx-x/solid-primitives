import{c as l,e as m,i as r,t,d as $}from"./index.46c6eed4.js";import{h as d}from"./index.e3a03671.js";const f=t("<p>Signal:</p>"),s=t('<button class="btn"></button>'),_=t("<p>Setter:</p>"),N=t("<p>Result: </p>");function C(){const[c,u]=l(1),[a,p]=d(()=>c()),[n,i]=l(1);return m(()=>{p(n())}),[f.cloneNode(!0),(()=>{const e=s.cloneNode(!0);return e.$$click=()=>u(o=>++o),r(e,c),e})(),_.cloneNode(!0),(()=>{const e=s.cloneNode(!0);return e.$$click=()=>i(o=>++o),r(e,n),e})(),(()=>{const e=N.cloneNode(!0);return e.firstChild,r(e,a,null),e})()]}$(["click"]);export{C as default};

import{j as z,m as I,a as d}from"./index-Ck2EgO-1.js";const me=({children:e,variant:t="default",size:r="md",className:o="",animate:s=!0,...a})=>{const i=()=>{switch(t){case"primary":return"bg-blue-100 text-blue-800 border-blue-200";case"secondary":return"bg-gray-100 text-gray-800 border-gray-200";case"success":return"bg-green-100 text-green-800 border-green-200";case"warning":return"bg-yellow-100 text-yellow-800 border-yellow-200";case"danger":return"bg-red-100 text-red-800 border-red-200";case"info":return"bg-cyan-100 text-cyan-800 border-cyan-200";case"gradient":return"bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent";case"gold":return"bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-transparent";case"outline":return"bg-transparent text-gray-600 border-gray-300";default:return"bg-gray-100 text-gray-800 border-gray-200"}},n=()=>{switch(r){case"sm":return"px-2 py-1 text-xs";case"lg":return"px-4 py-2 text-base";case"xl":return"px-6 py-3 text-lg";default:return"px-3 py-1 text-sm"}},l=`
    inline-flex items-center font-medium rounded-full border
    ${i()}
    ${n()}
    ${o}
  `,c=z.jsx("span",{className:l,...a,children:e});return s?z.jsx(I.div,{initial:{opacity:0,scale:.8},whileInView:{opacity:1,scale:1},transition:{duration:.3},viewport:{once:!0},whileHover:{scale:1.05},className:"inline-block",children:c}):c};let O={data:""},S=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||O,D=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,_=/\/\*[^]*?\*\/|  +/g,A=/\n+/g,g=(e,t)=>{let r="",o="",s="";for(let a in e){let i=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+i+";":o+=a[1]=="f"?g(i,a):a+"{"+g(i,a[1]=="k"?"":t)+"}":typeof i=="object"?o+=g(i,t?t.replace(/([^,])+/g,n=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):a):i!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=g.p?g.p(a,i):a+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+o},m={},N=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+N(e[r]);return t}return e},M=(e,t,r,o,s)=>{let a=N(e),i=m[a]||(m[a]=(l=>{let c=0,p=11;for(;c<l.length;)p=101*p+l.charCodeAt(c++)>>>0;return"go"+p})(a));if(!m[i]){let l=a!==e?e:(c=>{let p,y,x=[{}];for(;p=D.exec(c.replace(_,""));)p[4]?x.shift():p[3]?(y=p[3].replace(A," ").trim(),x.unshift(x[0][y]=x[0][y]||{})):x[0][p[1]]=p[2].replace(A," ").trim();return x[0]})(e);m[i]=g(s?{["@keyframes "+i]:l}:l,r?"":"."+i)}let n=r&&m.g?m.g:null;return r&&(m.g=m[i]),((l,c,p,y)=>{y?c.data=c.data.replace(y,l):c.data.indexOf(l)===-1&&(c.data=p?l+c.data:c.data+l)})(m[i],t,o,n),i},P=(e,t,r)=>e.reduce((o,s,a)=>{let i=t[a];if(i&&i.call){let n=i(r),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;i=l?"."+l:n&&typeof n=="object"?n.props?"":g(n,""):n===!1?"":n}return o+s+(i??"")},"");function w(e){let t=this||{},r=e.call?e(t.p):e;return M(r.unshift?r.raw?P(r,[].slice.call(arguments,1),t.p):r.reduce((o,s)=>Object.assign(o,s&&s.call?s(t.p):s),{}):r,S(t.target),t.g,t.o,t.k)}let C,$,E;w.bind({g:1});let f=w.bind({k:1});function T(e,t,r,o){g.p=t,C=e,$=r,E=o}function b(e,t){let r=this||{};return function(){let o=arguments;function s(a,i){let n=Object.assign({},a),l=n.className||s.className;r.p=Object.assign({theme:$&&$()},n),r.o=/ *go\d+/.test(l),n.className=w.apply(r,o)+(l?" "+l:"");let c=e;return e[0]&&(c=n.as||e,delete n.as),E&&c[0]&&E(n),C(c,n)}return s}}var V=e=>typeof e=="function",j=(e,t)=>V(e)?e(t):e,B=(()=>{let e=0;return()=>(++e).toString()})(),H=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),L=20,F=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,L)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return F(e,{type:e.toasts.find(a=>a.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(a=>a.id===o||o===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},q=[],v={toasts:[],pausedAt:void 0},k=e=>{v=F(v,e),q.forEach(t=>{t(v)})},J=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||B()}),h=e=>(t,r)=>{let o=J(t,e,r);return k({type:2,toast:o}),o.id},u=(e,t)=>h("blank")(e,t);u.error=h("error");u.success=h("success");u.loading=h("loading");u.custom=h("custom");u.dismiss=e=>{k({type:3,toastId:e})};u.remove=e=>k({type:4,toastId:e});u.promise=(e,t,r)=>{let o=u.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let a=t.success?j(t.success,s):void 0;return a?u.success(a,{id:o,...r,...r==null?void 0:r.success}):u.dismiss(o),s}).catch(s=>{let a=t.error?j(t.error,s):void 0;a?u.error(a,{id:o,...r,...r==null?void 0:r.error}):u.dismiss(o)}),e};var R=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Y=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Z=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,G=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,K=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Q=f`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,X=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Q} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ee=b("div")`
  position: absolute;
`,te=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,re=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ae=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${re} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,oe=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?d.createElement(ae,null,t):t:r==="blank"?null:d.createElement(te,null,d.createElement(G,{...o}),r!=="loading"&&d.createElement(ee,null,r==="error"?d.createElement(Y,{...o}):d.createElement(X,{...o})))},se=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ie=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ne="0%{opacity:0;} 100%{opacity:1;}",le="0%{opacity:1;} 100%{opacity:0;}",ce=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,de=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,pe=(e,t)=>{let r=e.includes("top")?1:-1,[o,s]=H()?[ne,le]:[se(r),ie(r)];return{animation:t?`${f(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};d.memo(({toast:e,position:t,style:r,children:o})=>{let s=e.height?pe(e.position||t||"top-center",e.visible):{opacity:0},a=d.createElement(oe,{toast:e}),i=d.createElement(de,{...e.ariaProps},j(e.message,e));return d.createElement(ce,{className:e.className,style:{...s,...r,...e.style}},typeof o=="function"?o({icon:a,message:i}):d.createElement(d.Fragment,null,a,i))});T(d.createElement);w`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;export{me as B,u as c};

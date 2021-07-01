var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,i=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,s=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&i(e,r,t[r]);if(n)for(var r of n(t))l.call(t,r)&&i(e,r,t[r]);return e},o=(e,n)=>t(e,r(n));import{c,R as m,B as d,U as p,a as u,S as E,r as g,k as h,l as f,m as x,w as b,u as y,b as k,n as v,v as w,C as S,e as C,d as O,F as N,M as G,D as M,f as P,A as F,g as D,h as I,i as T,j as z,o as j,p as L,q as B,s as R,P as $,t as A,x as K,I as _,y as U,T as W,z as q,E as H,G as J,H as Q,J as V,K as X,L as Y,N as Z,O as ee,Q as te}from"./vendor.ecbcdb9d.js";const re=c`
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14px;
`,ne=c`
  right: 20px !important;
  bottom: 20px !important;
`,ae=()=>m.createElement(d,{className:ne},m.createElement("div",{className:re},m.createElement(p,null)));var le,ie;(ie=le||(le={})).Mobile="mobile",ie.Tablet="tablet",ie.Desktop="desktop";const se={isMobile:!1,isTablet:!1,isDesktop:!1},oe=u(),ce=E(oe,null);ce.map((e=>{switch(e){case le.Mobile:return o(s({},se),{isMobile:!0});case le.Tablet:return o(s({},se),{isTablet:!0});case le.Desktop:return o(s({},se),{isDesktop:!0});default:return se}}));const me=ce.map((e=>e===le.Mobile));var de,pe;(pe=de||(de={}))[pe.Desktop=992]="Desktop",pe[pe.Tablet=768]="Tablet",pe[pe.Mobile=320]="Mobile";const ue=()=>{g.exports.useEffect((()=>{(({isMobile:e,isTablet:t,isDesktop:r})=>{switch(!0){case e:return oe(le.Mobile);case t:return oe(le.Tablet);case r:return oe(le.Desktop);default:;}})({isMobile:window.innerWidth<768,isTablet:window.innerWidth>=768&&window.innerWidth<992,isDesktop:window.innerWidth>=992});const e=matchMedia("(min-width: 992px)"),t=matchMedia("(min-width: 768px) and (max-width: 991px)"),r=matchMedia("(max-width: 768px)");return r.addEventListener("change",(()=>oe(le.Mobile))),t.addEventListener("change",(()=>oe(le.Tablet))),e.addEventListener("change",(()=>oe(le.Desktop))),()=>{r.removeEventListener("change",(()=>oe(le.Mobile))),t.removeEventListener("change",(()=>oe(le.Tablet))),e.removeEventListener("change",(()=>oe(le.Desktop)))}}),[])},Ee=h.create({prefixUrl:"http://localhost:3000",timeout:3e5}),ge=f.Record({id:f.String,title:f.String,size:f.String,posts:f.String}),he=f.Array(ge),fe=x((()=>Ee.get("groups").json())),xe=b(fe.doneData.map((e=>e)),{filter:he.guard}),be=y([]).on(xe,((e,t)=>t)),ye=f.Record({id:f.String,title:f.String,price:f.String,address:f.String,description:f.Array(f.String),publishDate:f.String,timestamp:f.Number,link:f.Optional(f.String),photos:f.Array(f.String),groupTitle:f.Optional(f.String)}),ke=f.Array(ye);f.Record({status:f.Literal("success").Or(f.Literal("failed")),postsByGroup:f.Optional(f.Number).Or(f.Null),cacheKey:f.Optional(f.String).Or(f.Null)});const ve=x((e=>Ee.get(`posts?${(e=>{const t=new URLSearchParams;return Object.entries(e).forEach((e=>{const[r,n]=e;n&&t.set(r,String(n))})),t})(e).toString()}`).json())),we=b(ve.doneData,{filter:e=>ke.guard(e)}),Se=u(),Ce=u(),Oe=y([]).on(we,((e,t)=>[...e,...t])).reset(Se),Ne=y([]).on(we,((e,t)=>[...e,...t])).on(Ce,((e,t)=>t)).reset(Se),Ge=y(!1).on(we,(()=>!0)).reset(Se);var Me,Pe,Fe,De;k({from:ve,to:Se}),(Pe=Me||(Me={})).FromMin="from_min",Pe.FromMax="from_max",(De=Fe||(Fe={})).Slowpoke="slowpoke",De.Faster="faster";const Ie=u(),Te=u(),ze=u(),je=u(),Le=u(),Be=u(),Re=u(),$e=u(),Ae=u(),Ke=(e,t,r,n)=>e.map((e=>e.id===t?o(s({},e),{[r]:n}):e)),_e={id:v(),selectedGroupId:void 0,numberOfPosts:null,timeStamps:null,price:{min:void 0,max:void 0},mode:Fe.Faster},Ue=y([]).on(Be,(e=>[...e,o(s({},_e),{id:v()})])).on(Re,((e,{selectedGroupId:t})=>[...e,o(s({},_e),{id:v(),selectedGroupId:t})])).on($e,((e,{id:t,selectedGroupId:r})=>e.filter((e=>t?e.id!==t:!r||e.selectedGroupId!==r)))).on(Ae,((e,{id:t,mode:r})=>Ke(e,t,"mode",r))).on(Ie,((e,{id:t,numberOfPosts:r})=>Ke(e,t,"numberOfPosts",r))).on(Te,((e,{id:t,selectedGroupId:r})=>Ke(e,t,"selectedGroupId",r))).on(ze,((e,{id:t,timeStamps:r})=>Ke(e,t,"timeStamps",r))).on(je,((e,{id:t,max:r})=>e.map((e=>e.id===t?o(s({},e),{price:{min:e.price.min,max:r}}):e)))).on(Le,((e,{id:t,min:r})=>e.map((e=>e.id===t?o(s({},e),{price:{min:r,max:e.price.max}}):e)))),We=Ue.map((e=>e.map((({selectedGroupId:e})=>e)).filter(Boolean))),qe={numberOfPostsChanged:Ie,groupIdChanged:Te,timeStampsChanged:ze,maxPriceChanged:je,minPriceChanged:Le,addGroup:Be,addSelectedGroup:Re,removeSelectedGroup:$e,modeChanged:Ae},He=e=>null===e||e===Me.FromMax?Me.FromMin:e===Me.FromMin?Me.FromMax:null,Je=u(),Qe=u(),Ve=u(),Xe=u(),Ye=u(),Ze=y(null).on(Je,He).reset([Se,Qe,Ye]),et=y(null).on(Qe,He).reset([Se,Je,Ye]),tt=y([]).reset([Se,Ye]),rt=E(Ve,[]).reset([Se,Ye]);w({source:[rt,Oe],clock:Xe,fn:([e,t])=>t.filter((({groupTitle:t})=>t&&e.includes(t))),target:Ce});const nt=u();b({source:Ge,clock:Ge,filter:Boolean,target:nt}),w({clock:nt,source:[be,We],fn:([e,t])=>{const r=[];return t.forEach((t=>{const n=e.find((({id:e})=>e===t));n&&r.push(n.title)})),r},target:tt});const at=e=>Number.parseFloat(e.replace(/[^0-9]+/g,""))||0;var lt,it;w({clock:Ze,source:Ne,fn:(e,t)=>t?[...e].sort(((e,r)=>{const n=at(e.price),a=at(r.price);return t===Me.FromMin?a-n:n-a})):e,target:Ce}),w({clock:et,source:Ne,fn:(e,t)=>t?[...e].sort(((e,r)=>{const n=e.timestamp,a=r.timestamp;return t===Me.FromMin?a-n:n-a})):e,target:Ce}),w({clock:Ye,source:Oe,target:Ce}),(it=lt||(lt={})).Price="Price",it.Date="Date";const st=S.Group,ot=()=>{const e=C(me),t=C(tt),r=C(rt),[n,a]=g.exports.useState(!1),[l,i]=g.exports.useState(!0),[s,o]=g.exports.useState(!1),c=()=>{Xe(),a(!1)};return m.createElement(m.Fragment,null,m.createElement(O,{type:"primary",shape:"round",onClick:()=>{a(!0)}},e&&m.createElement(N,null),!e&&"Select groups"),m.createElement(G,{title:"Select groups",visible:n,onOk:c,onCancel:()=>{a(!1)},footer:[m.createElement(O,{key:"submit",type:"primary",shape:"round",onClick:c},"OK")]},m.createElement(S,{indeterminate:l,onChange:e=>{Ve(e.target.checked?t:[]),i(!1),o(e.target.checked)},checked:s},"Check all"),m.createElement(M,null),m.createElement(st,{options:t,value:r,onChange:e=>{Ve(e),i(e.length>0&&e.length<t.length),o(e.length===t.length)}})))},ct=e=>{switch(e){case Me.FromMin:return m.createElement(D,null);case Me.FromMax:return m.createElement(F,null);default:return m.createElement(P,null)}},mt=({filter:e,onClick:t,name:r})=>{const n=C(me);return m.createElement(O,{type:"primary",shape:"round",onClick:t,icon:ct(e)},n&&(e=>{const t=e===lt.Price,r=e===lt.Date;switch(!0){case t:return m.createElement(T,null);case r:return m.createElement(I,null);default:return null}})(r),!n&&r)},dt=()=>{const e=C(me);return m.createElement(O,{type:"primary",shape:"round",onClick:Ye,icon:m.createElement(z,null)},!e&&"Clear filters")},pt=c`
  margin: 0 20px 20px 20px;
`,ut=()=>{const e=C(Ge),t=C(Ze),r=C(et);return e?m.createElement(j,{size:[8,-16],wrap:!0,className:pt},m.createElement(mt,{filter:t,onClick:Je,name:lt.Price}),m.createElement(mt,{filter:r,onClick:Qe,name:lt.Date}),m.createElement(ot,null),m.createElement(dt,null)):null},Et=c`
  width: 100%;
`,{Option:gt}=L,ht=e=>qe.addSelectedGroup({selectedGroupId:e}),ft=e=>qe.removeSelectedGroup({selectedGroupId:e}),xt=()=>{const e=C(be),t=C(We);return m.createElement(L,{mode:"multiple",placeholder:"Please select",value:t,className:Et,onSelect:ht,onDeselect:ft},e.map((e=>m.createElement(gt,{key:e.id,value:e.id},m.createElement("div",null,e.title),m.createElement("div",null,"size: ",e.size),m.createElement("div",null,"posts: ",e.posts)))))},bt=B(We,be,((e,t)=>{const r=[];return e.forEach((e=>{const n=t.find((({id:t})=>t===e));n&&r.push({title:n.title,id:n.id})})),r})),yt=()=>{const e=C(Ue),t=C(bt);return m.createElement(O,{type:"primary",shape:"round",onClick:()=>{e.forEach((e=>{if(e.selectedGroupId){const r=t.find((({id:t})=>t===e.selectedGroupId));ve({timeStamps:e.timeStamps,numberOfPosts:e.numberOfPosts||20,selectedGroupId:e.selectedGroupId,id:e.id,min:e.price.min,max:e.price.max,mode:e.mode,title:null==r?void 0:r.title})}}))},icon:m.createElement(R,null),disabled:0===t.length},"Search")},kt=()=>m.createElement(O,{type:"primary",shape:"circle",icon:m.createElement($,null),onClick:qe.addGroup}),{Option:vt}=L,wt=c`
  width: 100%;
`,St=({id:e,selectedGroupId:t})=>{const r=C(be),n=C(We);return m.createElement(L,{className:wt,value:t,allowClear:!0,showSearch:!0,placeholder:"Select a group",onChange:t=>qe.groupIdChanged({id:e,selectedGroupId:t})},r.map((e=>m.createElement(vt,{value:e.id,key:e.id,disabled:Boolean(n.find((r=>e.id===r&&t!==r)))},m.createElement("div",null,"Name: ",e.title),m.createElement("div",null,"Group size: ",e.size),m.createElement("div",null,"Posts per day: ",e.posts)))))},{RangePicker:Ct}=A,Ot=({id:e})=>m.createElement(j,{direction:"vertical",size:12},m.createElement(Ct,{showTime:!0,onChange:(t,r)=>{const n=r.map((e=>new Date(e).getTime()));qe.timeStampsChanged({id:e,timeStamps:n})}})),Nt=c`
  width: 125px !important;
`,Gt=e=>{var t;return null!=(t=null==e?void 0:e.toString())?t:void 0},Mt=e=>e?`฿ ${e}`:"",Pt=e=>{var t;return null!=(t=null==e?void 0:e.replace(/\$\s?|(฿ ,*)/g,"").replace(/[^0-9.]/g,""))?t:""},Ft=e=>Number(e),Dt=({id:e,min:t,max:r})=>{const n=t=>{t&&qe.minPriceChanged({id:e,min:Ft(t)})},a=t=>{t&&qe.maxPriceChanged({id:e,max:Ft(t)})};return m.createElement(K,{wrap:!1},m.createElement(_,{className:Nt,placeholder:"Min price",value:Gt(t),min:"0",max:Gt(r),formatter:Mt,parser:e=>{const t=Pt(e);return n(t),t},onChange:n}),m.createElement(_,{className:Nt,placeholder:"Max price",value:Gt(r),min:Gt(t),formatter:Mt,parser:e=>{const t=Pt(e);return a(t),t},onChange:a}))},It=({id:e,numberOfPosts:t})=>m.createElement(K,null,m.createElement(_,{style:{width:"100%"},placeholder:"Number of posts (default: 20)",value:t||void 0,min:1,max:110,onChange:t=>{qe.numberOfPostsChanged({id:e,numberOfPosts:t})}})),Tt=({id:e})=>m.createElement(U.Group,{defaultValue:Fe.Faster,buttonStyle:"solid",onChange:t=>{const{value:r}=t.target;qe.modeChanged({id:e,mode:r})}},m.createElement(U.Button,{value:Fe.Slowpoke},"Slowpoke"),m.createElement(U.Button,{value:Fe.Faster},"Faster")),zt=c`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`,jt=c`
  width: 100%;
  margin-top: 10px;
`,Lt=()=>{const e=C(Ue);return 0===e.length?m.createElement(W,null," Empty settings :( "):m.createElement(m.Fragment,null,e.map((({id:t,price:r,numberOfPosts:n,selectedGroupId:a},l)=>m.createElement(m.Fragment,null,m.createElement(j,{direction:"vertical",className:zt,key:t,size:12},m.createElement(St,{id:t,selectedGroupId:a}),m.createElement(Ot,{id:t}),m.createElement(K,null,m.createElement(q,{span:12},m.createElement(Dt,{id:t,min:r.min,max:r.max})),m.createElement(q,{span:12},m.createElement(It,{id:t,numberOfPosts:n}))),m.createElement(Tt,{id:t}),m.createElement(O,{className:jt,type:"primary",danger:!0,shape:"round",onClick:()=>{qe.removeSelectedGroup({id:t})}},"Delete")),l!==e.length-1&&m.createElement(M,null)))))},Bt=()=>{const[e,t]=g.exports.useState(!1),r=()=>{t(!1)};return m.createElement(m.Fragment,null,m.createElement(O,{type:"primary",shape:"round",onClick:()=>{t(!0)},icon:m.createElement(H,null)}),m.createElement(G,{title:"Groups settings",visible:e,onOk:r,onCancel:()=>{t(!1)},footer:[m.createElement(kt,{key:"settings"}),m.createElement(O,{key:"submit",type:"primary",shape:"round",onClick:r},"SUBMIT")]},m.createElement(Lt,null)))},Rt=c`
  margin: 12px 0;
`,$t=c`
  margin-left: 12px;
`,At=()=>m.createElement(m.Fragment,null,m.createElement(xt,null),m.createElement(K,{justify:"center",align:"middle",className:Rt},m.createElement(yt,null),m.createElement(j,{size:[16,0],wrap:!0,className:$t},m.createElement(Bt,null)))),Kt=c`
  padding: 0;
  margin: 4px 0 10px 0;
`,_t=c`
  display: block;
`,Ut=({description:e})=>{const[t,r]=g.exports.useState(!1),n=g.exports.useMemo((()=>m.createElement("div",{className:Kt},e.map(((e,t)=>{const r=J(e).map((e=>e.number.number.toString()));return m.createElement("span",{key:`${e}${t}`,className:_t},e.split(" ").map((e=>{if(r.includes(e)){const t=r.find((t=>e.includes(t)));return m.createElement(m.Fragment,null," ",m.createElement("a",{href:`tel:${t}`},t))}return m.createElement(m.Fragment,null," ",e)})))})))),[e]);return t?n:m.createElement(Q,{lines:6,ellipsis:m.createElement(O,{type:"text",onClick:()=>r(!0)},"... Show more")},n)},Wt=c`
  cursor: initial !important;
`,qt=c`
  width: 300px !important;
  height: 200px !important;
`,Ht=c`
  width: auto;
`,Jt=c`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`,Qt=c`
  &[data-desktop='false'] {
    display: none !important;
  }

  @media screen and (max-width: 768px) {
    &[data-desktop='true'] {
      display: none !important;
    }

    &[data-desktop='false'] {
      display: flex !important;
      align-items: center;
      justify-content: center;
      margin: -12px 0 0 0;
    }
  }
`,Vt=c`
  white-space: initial;

  @media screen and (max-width: 768px) {
    font-size: 22px !important;
  }
`,{Title:Xt,Link:Yt}=W,Zt=({post:e})=>m.createElement(V,{hoverable:!0,className:Wt,title:m.createElement(Xt,{className:Vt,level:3},e.title),extra:m.createElement(O,{className:Qt,"data-desktop":"true",type:"link",href:e.link,target:"_blank",rel:"noopener noreferrer",size:"large"},"Open post")},m.createElement(O,{className:Qt,"data-desktop":"false",type:"link",href:e.link,target:"_blank",rel:"noopener noreferrer",size:"large"},"Open post"),e.publishDate&&m.createElement(Xt,{level:4},e.publishDate),e.address&&m.createElement(Xt,{level:5},m.createElement(Yt,{href:`https://www.google.ru/maps/place/${e.address}`,target:"_blank",rel:"noopener noreferrer"},"Location: ",e.address)),m.createElement(Xt,{level:5},e.price),m.createElement(Ut,{description:e.description}),m.createElement("div",{className:Jt},e.photos.map((e=>m.createElement("div",{key:e,className:Ht},m.createElement(X,{className:qt,loading:"lazy",src:e,alt:"some photo"})))))),er=c`
  list-style: none;
  padding: 0;
  margin: 0 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &[data-loading='true'] {
    display: block;
  }
`,tr=c`
  @media screen and (min-width: 768px) {
    max-width: 49%;
  }
`,rr=()=>{const e=C(Ne),t=C(ve.pending),r=C(Ge),n=t&&!r;return m.createElement("ul",{className:er,"data-loading":n},n&&m.createElement(K,{justify:"center"},m.createElement(Y,{size:"large",tip:"Loading"})),e.map((e=>m.createElement("li",{key:e.id,className:tr},m.createElement(Zt,{post:e}),m.createElement(M,null)))))},nr=()=>(g.exports.useEffect((()=>{fe()}),[]),m.createElement(m.Fragment,null,m.createElement(At,null),m.createElement(M,null),m.createElement(ut,null),m.createElement(rr,null))),ar=()=>"/",lr=()=>g.exports.createElement("div",null,"Page not found"),ir=()=>m.createElement(m.Fragment,null,m.createElement(Z,{path:ar(),component:nr}),m.createElement(Z,{path:"/404",component:lr}));const{Header:sr,Footer:or,Content:cr}=ee,{Title:mr}=W,dr=c`
  height: 100%;
`,pr=()=>(ue(),g.exports.createElement(ee,{className:dr},g.exports.createElement(sr,null,g.exports.createElement(K,{justify:"center",align:"middle",style:{height:"100%"}},g.exports.createElement(mr,{style:{marginBottom:0,color:"white"}},"KEKRENT"))),g.exports.createElement(cr,null,g.exports.createElement(j,{direction:"vertical",size:12,style:{width:"100%"}},g.exports.createElement(ir,null))),g.exports.createElement(or,null),g.exports.createElement(ae,null)));te.hydrate(m.createElement(pr,null),document.querySelector("#root"));

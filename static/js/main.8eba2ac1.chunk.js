(this.webpackJsonptree=this.webpackJsonptree||[]).push([[0],{15:function(e,t,n){e.exports={container:"Tree_container__14Gk0",canvasContainer:"Tree_canvasContainer__2vhw0"}},60:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(0),c=n.n(a),i=n(18),o=n.n(i),u=(n(60),n(15)),s=n.n(u),d=n(2),f=function(e){var t=c.a.useRef(null),n=c.a.useState([0,0,0,0]),a=Object(d.a)(n,2),i=a[0],o=a[1];return c.a.useEffect((function(){t.current&&o(function(e){var t=e.getBBox(),n=t.x,r=t.y,a=t.width,c=t.height;return[n,r,a,c]}(t.current))}),[]),Object(r.jsx)("svg",{ref:t,display:"block",height:e.height,width:e.width,viewBox:i.join(" "),children:e.children})};var l=n(9),h=(0,c.a.memo)((function(e){var t=c.a.useRef(null);return c.a.useEffect((function(){t.current&&function(e,t){var n=Object(l.a)(e);n.selectAll("g").remove();var r=n.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",1.5),a=n.append("g"),c=n.append("g"),i=t.width/(t.tree.height+1),o=Object(l.c)().nodeSize([50,i])(t.tree);r.selectAll("path").data(o.links()).join("path").attr("stroke",(function(e){return t.selectedItemIds.has(String(e.target.id))?"blue":"#555"})).attr("d",(function(e){return"\n        M".concat(e.target.y,",").concat(e.target.x,"\n        C").concat(e.source.y+i/2,",").concat(e.target.x,"\n         ").concat(e.source.y+i/2,",").concat(e.source.x,"\n         ").concat(e.source.y,",").concat(e.source.x,"\n      ")})),a.selectAll("circle").data(o.descendants()).join("circle").attr("cx",(function(e){return e.y})).attr("cy",(function(e){return e.x})).attr("fill",(function(e){return e.children?"#555":"#999"})).attr("r",2.5),c.attr("font-family","sans-serif").attr("font-size",10).attr("stroke-linejoin","round").attr("stroke-width",3).selectAll("text").data(o.descendants()).join("text").attr("x",(function(e){return e.y})).attr("y",(function(e){return e.x})).attr("dy","0.31em").attr("dx",(function(e){return e.children?-6:6})).attr("fill",(function(e){return e.id===t.highlightedItemId?"red":e.id&&t.selectedItemIds.has(e.id)?"blue":"black"})).text((function(e){return String(e.data[t.labelKey])})).filter((function(e){return!!e.children})).attr("text-anchor","end").clone(!0).lower().attr("stroke","white")}(t.current,e)}),[e]),Object(r.jsx)("g",{ref:t})})),v=function(){};var m=function(e){var t=e.autoFocus,n=e.eventListeners;return function(e){var t=c.a.useRef(v);return c.a.useCallback((function(n){t.current(),t.current=v,n&&(t.current=e(n))}),[e])}(c.a.useCallback((function(e){var r=[];return n.forEach((function(t){var n=t.keys,a=t.eventListener,c=function(e){n.includes(e.key)&&a(e)};r.push(c),null===e||void 0===e||e.addEventListener("keydown",c)})),t&&(null===e||void 0===e||e.focus()),function(){console.log("Cleanup time!"),r.forEach((function(t){null===e||void 0===e||e.removeEventListener("keydown",t)}))}}),[t,n]))};var p="hook-start",g="hook-end",y=function(e){var t=c.a.useMemo((function(){return t=e.items,n=e.idKey,r=e.parentKey,Object(l.b)().id((function(e){return String(e[n])})).parentId((function(e){return null===e[r]?"":String(e[r])}))(t);var t,n,r}),[e.items,e.idKey,e.parentKey]),n=e.useSelectedTreeFn;performance.mark(p);var a=n({items:e.items,itemKey:e.labelKey,tree:t}),i=a.search,o=a.onSearch,u=a.selectedItemIds;performance.mark(g),performance.measure("measure hook-start to hook-end",p,g),console.log("Hook performance (".concat(n.name,"): ").concat(performance.getEntriesByType("measure")[0].duration,"ms")),performance.clearMeasures();var v=function(e){var t=c.a.useState(e.tree.id),n=Object(d.a)(t,2),r=n[0],a=n[1],i=c.a.useMemo((function(){return[{keys:["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],eventListener:function(t){t.stopPropagation(),"ArrowRight"===t.key?a(function(e,t){var n=e.find((function(e){return e.id===t}));return n.children?n.children[0].id:t}(e.tree,r)):"ArrowLeft"===t.key?a(function(e,t){var n=e.find((function(e){return e.id===t}));return n.parent?n.parent.id:t}(e.tree,r)):"ArrowUp"===t.key?a(function(e,t){var n=e.find((function(e){return e.id===t})),r=[];e.each((function(e){e.depth===n.depth&&r.push(e)}));var a=r.findIndex((function(e){return e.id===n.id}));return r[a-1]?r[a-1].id:n.id}(e.tree,r)):"ArrowDown"===t.key&&a(function(e,t){var n=e.find((function(e){return e.id===t})),r=[];e.each((function(e){e.depth===n.depth&&r.push(e)}));var a=r.findIndex((function(e){return e.id===n.id}));return r[a+1]?r[a+1].id:n.id}(e.tree,r))}}]}),[r,e.tree]);return{hotkeyRef:m({autoFocus:!0,eventListeners:i}),highlightedItemId:r}}({tree:t});return Object(r.jsxs)("div",{className:s.a.container,tabIndex:0,ref:v.hotkeyRef,children:["Press arrow keys to navigate! ",Object(r.jsx)("br",{}),"Search:"," ",Object(r.jsx)("input",{type:"text",value:i,onChange:function(e){var t=e.currentTarget.value;o(t)}}),Object(r.jsx)("div",{className:s.a.canvasContainer,children:Object(r.jsx)(f,{height:e.height,width:e.width,children:Object(r.jsx)(h,{height:e.height,highlightedItemId:v.highlightedItemId,labelKey:e.labelKey,tree:t,selectedItemIds:u,width:e.width})})})]})},b=n(16),j=n(3);var w=0;function O(){var e=w+1;return w+=1,e}var x=function(e,t){var n=I({name:"Root",parentId:null});return[n].concat(k([n],e,t,1))};function k(e,t,n,r){return e.reduce((function(e,a){var c=function(e,t,n){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(j.a)(Array(e).keys()).map((function(e){return e+t}))}(n,1).map((function(n){return I({name:"Child item no. ".concat(n," parent_id: ").concat(e.id," depth: ").concat(t),parentId:e.id})}))}(a,r,n),i=[];return r<t&&(i=k(c,t,n,r+1)),[].concat(Object(j.a)(e),Object(j.a)(c),Object(j.a)(i))}),[])}function I(e){return Object(b.a)(Object(b.a)({},e),{},{id:O(),type:"folder"})}var S=n(63),K=function(e){var t=c.a.useState(""),n=Object(d.a)(t,2),r=n[0],i=n[1],o=c.a.useState(""),u=Object(d.a)(o,2),s=u[0],f=u[1];Object(S.a)((function(){f(r)}),200,[r]);var l=Object(a.useMemo)((function(){var t=new Set;return 0===s.length||e.tree.each((function(n){var r=n.data[e.itemKey];if("string"===typeof r&&r.toLocaleLowerCase().includes(s.toLowerCase())){var a=[n];"folder"===n.data.type&&n.children&&(a=a.concat(n.children)),a.forEach((function(n){e.tree.path(n).forEach((function(e){t.add(String(e.data.id))}))}))}})),t}),[e.itemKey,e.tree,s]);return{search:r,onSearch:function(e){i(""!==e?e:"")},selectedItemIds:l}};function C(e){var t=e.items,n=e.itemKey,r=e.options,a=c.a.useState(""),i=Object(d.a)(a,2),o=i[0],u=i[1],s=c.a.useState(t),f=Object(d.a)(s,2),l=f[0],h=f[1],v=c.a.useState(""),m=Object(d.a)(v,2),p=m[0],g=m[1];Object(S.a)((function(){g(o)}),200,[o]);var y=c.a.useCallback((function(e){return r&&r.caseSensitive?function(e,t,n){return e.reduce((function(e,r){var a=r[t];return"string"===typeof a&&a.includes(n)?[].concat(Object(j.a)(e),[r]):e}),[])}(t,n,e):function(e,t,n){return e.reduce((function(e,r){var a=r[t];return"string"===typeof a&&a.toLocaleLowerCase().includes(n.toLowerCase())?[].concat(Object(j.a)(e),[r]):e}),[])}(t,n,e)}),[t,n,r]);c.a.useEffect((function(){h(y(p))}),[t,p,y]);return{search:o,filteredItems:l,onSearch:function(e){u(""!==e?e:"")}}}var L=function(e){var t=function(e){var t=C(e);return{search:t.search,onSearch:t.onSearch,selectedItems:""===t.search?[]:t.filteredItems}}({items:e.items,itemKey:e.itemKey}),n=t.selectedItems;return{search:t.search,onSearch:t.onSearch,selectedItemIds:c.a.useMemo((function(){var t=function(e,t){return e.flatMap((function(e){if("folder"===e.type){var n=t.find((function(t){return String(t.id)===String(e.id)})),r=[n];return n.children?r.concat(n.children):r}return[t.find((function(t){return String(t.id)===String(e.id)}))]}))}(n,e.tree);return function(e,t){return new Set(t.flatMap((function(t){return e.path(t)})).map((function(e){return String(e.id)})))}(e.tree,t)}),[e.tree,n])}};var A=function(){var e=c.a.useMemo((function(){return x(3,10)}),[]),t=e.length;console.log("items in data structure: ",t);var n=1e3;return t<100?n=800:t<2e3?n=4e4:t>2e3&&t<7e3?n=13e4:t>7e3&&(n=3e5),Object(r.jsxs)("div",{style:{display:"flex",width:"100%"},children:[Object(r.jsxs)("div",{children:["Optimised: (Or at least tries to be)",Object(r.jsx)(y,{height:n,idKey:"id",items:e,labelKey:"name",parentKey:"parentId",width:500,useSelectedTreeFn:K})]}),Object(r.jsxs)("div",{children:["Un-optimised:",Object(r.jsx)(y,{height:n,idKey:"id",items:e,labelKey:"name",parentKey:"parentId",width:500,useSelectedTreeFn:L})]})]})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(A,{})}),document.getElementById("root")),E()}},[[62,1,2]]]);
//# sourceMappingURL=main.8eba2ac1.chunk.js.map
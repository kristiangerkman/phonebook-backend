(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{16:function(e,t,n){e.exports=n(38)},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(14),c=n.n(o),u=(n(5),n(15)),i=n(2),l=function(e){var t=e.text;switch(e.n){case"1":return a.a.createElement("h1",null,t);case"2":return a.a.createElement("h2",null,t);case"3":return a.a.createElement("h3",null,t);default:return a.a.createElement("h2",null,t)}},m=function(e){var t=e.persons,n=e.filtered,r=e.isFilter,o=e.deletePerson,c=e.bText;return a.a.createElement("div",null,!1===r?t.map((function(e){return a.a.createElement("p",{key:e.name},e.name," ",e.number,a.a.createElement("button",{onClick:function(){return o(e.id)}},c))})):n.map((function(e){return a.a.createElement("p",{key:e.name},e.name," ",e.number,a.a.createElement("button",{onClick:function(){return o(e.id)}},c))})))},f=function(e){return a.a.createElement("div",null,e.text,a.a.createElement("input",{value:e.value,onChange:e.onChange}))},s=function(e){return a.a.createElement("form",{onSubmit:e.onSubmit},a.a.createElement("div",null,a.a.createElement(f,{text:e.name,value:e.newName,onChange:e.onNameChange}),a.a.createElement(f,{text:e.num,value:e.newNum,onChange:e.onNumChange})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},e.bText)))},d=function(e){return a.a.createElement(f,{text:e.name,value:e.newFilter,onChange:e.onFilterChange})},b=n(3),h=n.n(b),p="/api/persons",v=function(){return h.a.get(p).then((function(e){return e.data}))},w=function(e){return h.a.post(p,e).then((function(e){return e.data}))},E=function(e,t){return h.a.put("".concat(p,"/").concat(e),t).then((function(e){return e.data}))},O=function(e){h.a.delete("".concat(p,"/").concat(e))},g=function(e){var t=e.message,n=e.type;return null===t?null:"error"===n?a.a.createElement("div",{className:"error"},t):"notification"===n?a.a.createElement("div",{className:"notification"},t):void 0};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var j=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)([]),f=Object(i.a)(c,2),b=f[0],h=f[1],p=Object(r.useState)(""),j=Object(i.a)(p,2),x=j[0],C=j[1],S=Object(r.useState)(""),k=Object(i.a)(S,2),N=k[0],P=k[1],D=Object(r.useState)(""),T=Object(i.a)(D,2),F=T[0],B=T[1],J=Object(r.useState)(null),L=Object(i.a)(J,2),W=L[0],A=L[1],I=Object(r.useState)("error"),$=Object(i.a)(I,2),q=$[0],z=$[1];Object(r.useEffect)((function(){v().then((function(e){o(e)}))}),[]);var G=F.length>0,H=function(e){var t=[],r=!0,a=!1,o=void 0;try{for(var c,u=n[Symbol.iterator]();!(r=(c=u.next()).done);r=!0){var i=c.value;i.name.toLowerCase().includes(e.toLowerCase())&&t.push(i)}}catch(l){a=!0,o=l}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}h(t)};return a.a.createElement("div",{id:"main"},a.a.createElement(g,{message:W,type:q}),a.a.createElement(l,{text:"Phonebook",n:"2"}),a.a.createElement(d,{newFilter:F,onFilterChange:function(e){B(e.target.value),H(e.target.value)},name:"filter shown with "}),a.a.createElement(l,{text:"Add a new",n:"3"}),a.a.createElement(s,{newName:x,newNum:N,onNameChange:function(e){C(e.target.value)},onNumChange:function(e){P(e.target.value)},onSubmit:function(e){if(e.preventDefault(),function(e){var t=!0,r=!1,a=void 0;try{for(var o,c=n[Symbol.iterator]();!(t=(o=c.next()).done);t=!0){if(o.value.name===e)return!0}}catch(u){r=!0,a=u}finally{try{t||null==c.return||c.return()}finally{if(r)throw a}}return!1}(x)){var t=n.find((function(e){return e.name===x})),r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{number:N});!0===window.confirm("Do you want to update "+x+"'s number?")&&(E(t.id,r).then((function(e){o(n.map((function(n){return n.id!==t.id?n:e}))),A("".concat(x,"'s number updated ")),z("notification"),setTimeout((function(){A(null)}),5e3)})).catch((function(e){A('Person with the name "'.concat(x,'" was already deleted.')),z("error"),setTimeout((function(){A(null)}),5e3),C(""),P("")})),C(""),P(""))}else{w({name:x,number:N}).then((function(e){o(n.concat(e)),C(""),P(""),A("Person ".concat(x," added to the phonebook")),z("notification"),setTimeout((function(){A(null)}),5e3)}))}},name:"Name:",num:"Number:",bText:"add"}),a.a.createElement(l,{text:"Numbers",n:"3"}),a.a.createElement(m,{persons:n,filtered:b,isFilter:G,bText:"delete",isDelete:!0,deletePerson:function(e){window.confirm("Delete "+n.find((function(t){return t.id===e})).name)&&(O(e),o(n.filter((function(t){return t.id!==e}))))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},5:function(e,t,n){}},[[16,1,2]]]);
//# sourceMappingURL=main.9cf68996.chunk.js.map
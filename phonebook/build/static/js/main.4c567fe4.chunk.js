(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=(t(20),t(14)),l=t(2),i=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){return t(n.id)}},"remove"))},m=function(e){var n=e.persons,t=e.deletePerson;return r.a.createElement("ul",null,n.map((function(e){return r.a.createElement(i,{key:e.id,person:e,deletePerson:t})})))},f=function(e){return r.a.createElement("div",null,"filter names ",r.a.createElement("input",{onChange:e.onChange}))},s=function(e){var n=e.message,t=e.type;return null===n?null:"info"===t||"error"===t?r.a.createElement("div",{className:t},n):null},d=function(e){return r.a.createElement("div",null,r.a.createElement("h2",null,"Add a new person"),r.a.createElement("form",{onSubmit:e.addName},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.nameInput})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.numberInput})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},b=t(3),p=t.n(b),E="/api/persons",h=function(){return p.a.get(E).then((function(e){return e.data}))},v=function(e){return p.a.post(E,e).then((function(e){return e.data}))},j=function(e,n){return p.a.put("".concat(E,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){return p.a.delete("".concat(E,"/").concat(e)).then((function(e){return e.data}))},O=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),b=i[0],p=i[1],E=Object(a.useState)(""),O=Object(l.a)(E,2),g=O[0],C=O[1],N=Object(a.useState)(""),k=Object(l.a)(N,2),S=k[0],y=k[1],I=Object(a.useState)(null),P=Object(l.a)(I,2),A=P[0],D=P[1],J=Object(a.useState)(""),L=Object(l.a)(J,2),T=L[0],x=L[1];Object(a.useEffect)((function(){h().then((function(e){u(e)}))}),[]);var B=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:A,type:T}),r.a.createElement(f,{onChange:function(e){y(e.target.value)}}),r.a.createElement(d,{addName:function(e){e.preventDefault();var n={name:b,number:g};if(t.some((function(e){return e.name===b}))){if(window.confirm("Replace phone number?")){var a=t.find((function(e){return e.name===b}));j(a.id,n).then((function(e){u(t.map((function(e){return e.name===b?Object(o.a)({},n):e}))),p(""),C("")}))}}else v(n).then((function(e){u(t.concat(e)),x("info"),D("Added ".concat(b)),setTimeout((function(){D(null)}),3e3),p(""),C("")}))},newName:b,newNumber:g,nameInput:function(e){p(e.target.value)},numberInput:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:B,deletePerson:function(e){var n=window.confirm("Delete contact?"),a=t.find((function(n){return n.id===e}));n&&w(e).then((function(){return u(t.filter((function(n){return n.id!==e})))})).catch((function(n){x("error"),D("Information on ".concat(a.name," was already deleted from server")),setTimeout((function(){D(null)}),3e3),u(t.filter((function(n){return n.id!==e})))}))}}))};c.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.4c567fe4.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,n,t){e.exports=t(38)},31:function(e,n,t){},32:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),c=t(9),r=t.n(c),i=(t(31),t(10)),s=t(11),d=t(14),u=t(12),l=t(15),f=t(7),h=t(22),p=t(8),m=(t(32),t(39)),g=t(40),y=t(41),v=t(43);t(42);function k(e){var n="; ".concat(document.cookie).split("; ".concat(e,"="));return 2===n.length&&decodeURIComponent(n.pop().split(";").shift())||""}function C(){var e=Object(f.a)(["\n        width: ",";\n        height: ",";\n        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);\n        background-color: #ffffff;\n        top: 0;\n        left: 0;\n\n        overflow-y: scroll;\n        padding: 30px;\n        display: ",";\n        z-index: 3;\n        position: fixed;\n        ","\n      "]);return C=function(){return e},e}function b(){var e=Object(f.a)(["\n    position: absolute;\n    right: 10px;\n    top: 5px;\n    font-size: 24px;\n    opacity: 0.5;\n  "]);return b=function(){return e},e}console.log;var w=p.a.span(b()),M=function(e){function n(e,t){var o;return Object(i.a)(this,n),(o=Object(d.a)(this,Object(u.a)(n).call(this,e,t))).state={},o}return Object(l.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this.props,n=p.a.div(C(),e.width||"auto",e.height||"auto",function(e){return e.open?"block":"none"},e.styles);return a.a.createElement(n,{open:e.open},a.a.createElement(w,{onClick:e.close,className:"clickable"},"\u2715"),e.children)}}]),n}(a.a.Component);function R(){var e=Object(f.a)(["\n    background-color: ",";\n    color: ",";\n    width: 100%;\n    padding: 10px;\n  "]);return R=function(){return e},e}console.log;var D=function(e){return Array(6).fill(null).map(function(n){return e[(t=e,Math.floor(Math.random()*(t.length-1+1)))];var t}).join("")},S=function(){return D("ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789")},P=p.a.button(R(),function(e){return e.state.chosenCodes.includes(e.code)?"green":"none"},function(e){return e.state.chosenCodes.includes(e.code)?"white":"none"}),j=function(e,n){var t="".concat(e.reduce(function(e,n){return"".concat(e,'"').concat(n,'",')},"").slice(0,-1),"\r\n"),o=n.reduce(function(e,n){return"".concat(e,'"').concat(n.join('","'),'"\r\n')},[]);o="string"===typeof o?o.trim():"";var a="".concat(t).concat(o),c=new Blob([a],{type:"text/csv"}),r="data:text/csv;charset=utf-8,".concat(a),i=window.URL||window.webkitURL,s="undefined"===typeof i.createObjectURL?r:i.createObjectURL(c),d=document.createElement("a");d.setAttribute("href",s),d.setAttribute("download","tableDownload.csv"),document.body.appendChild(d),d.click(),document.body.removeChild(d)},O=function(e){return m.a(g.a("createdAt"),e).map(function(e){return[e.unit,e.codes,e.createdAt,e.deviceId]}).reverse()},B=function(e){function n(){var e;return Object(i.a)(this,n),e=Object(d.a)(this,Object(u.a)(n).call(this)),k("deviceId")||(document.cookie=function(e,n,t){var o="";if(t){var a=new Date;a.setTime(a.getTime()+24*t*60*60*1e3),o="; expires=".concat(a.toGMTString())}return"".concat(e,"=").concat(n).concat(o,";domain=cotterjd.github.io;path=/")}("deviceId",S(),3650)),e.state={unServicedCodes:["TV","Dog","Blocked","Locked From The Inside","No Key","Key Not Work","Skip Per Management","Minor","OTHER","Went Back"],servicedCodes:["Missing Chimney Cap","Missing Damper","Broken Damper","Missing Spark Screen","Damaged Spark Screen","Damaged Left Refractory Panel","Damaged Back Refractory Panel","Damaged Right Refractory Panel","Damaged Base Panel","Missing Left Refractory Panel","Missing Back Refractory Panel","Missing Right Refractory Panel","Missing Base Panel"],codes:{"Missing Chimney Cap":"Missing Chimney Cap","Missing Damper":"Missing Damper","Broken Damper":"Broken Damper","Missing Spark Screen":"Missing Spark Screen","Damaged Spark Screen":"Damaged Spark Screen","Damaged Left Refractory Panel":"Damaged Left Refractory Panel","Damaged Back Refractory Panel":"Damaged Back Refractory Panel","Damaged Right Refractory Panel":"Damaged Right Refractory Panel","Damaged Base Panel":"Damaged Base Panel","Missing Left Refractory Panel":"Missing Left Refractory Panel","Missing Back Refractory Panel":"Missing Back Refractory Panel","Missing Right Refractory Panel":"Missing Right Refractory Panel","Missing Base Panel":"Missing Base Panel",TV:"TV",Dog:"Dog",Blocked:"Blocked","Locked From The Inside":"Locked from the inside","No Key":"No Key","Key Not Work":"Key Not Work","Skip Per Management":"Skip Per Management",Minor:"Minor",OTHER:"OTHER","Went Back":"Went Back"},chosenCodes:[],unitName:"",unitCodes:[],allUnitCodes:[],deviceId:k("deviceId"),showModal:!1},e}return Object(l.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this,n=this.state;return a.a.createElement("div",null,a.a.createElement("input",{name:"unit",placeholder:"Unit",style:{width:"100%",padding:"20px"},value:n.unitName,onChange:function(n){return function(e,n){return e.setState({unitName:n.target.value})}(e,n)},type:"text"}),Object.keys(n.codes).map(function(t,o){return a.a.createElement(P,{state:n,code:t,key:t,onClick:function(n){return o=t,void e.setState(function(e,n){return{chosenCodes:e.chosenCodes.includes(o)?e.chosenCodes.filter(function(e){return e!==o}):e.chosenCodes.concat(o)}});var o}},n.codes[t])}),a.a.createElement("button",{style:{width:"100%",padding:"15px",backgroundColor:"#74fff8"},onClick:function(n){return function(e){if(e.state.unitName&&e.state.chosenCodes.length)return fetch("https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev",{method:"POST",body:JSON.stringify({query:'\n            mutation {\n              createUnitCode(data: {\n                deviceId: "'.concat(e.state.deviceId,'"\n                unit: "').concat(e.state.unitName,'"\n                codes: "').concat(e.state.chosenCodes.join(", "),'"\n              }) {\n                id\n              }\n            }\n          ')}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(){e.setState(function(e){return{unitCodes:[].concat(Object(h.a)(e.unitCodes),[[e.unitName,e.chosenCodes.join(", ")]]),chosenCodes:[],unitName:""}})}).catch(console.error)}(e)}},"Add Codes"),a.a.createElement("ul",{id:"report",style:{listStyleType:"none"}},n.unitCodes.map(function(e,n){return a.a.createElement("li",{key:n},e)})),a.a.createElement("button",{style:{padding:"10px"},onClick:function(n){return t=e,fetch("https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev",{method:"POST",body:JSON.stringify({query:"\n          query {\n            unitCodes {\n              unit\n              codes\n              createdAt\n              deviceId\n            }\n          }\n        "}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){t.setState({allUnitCodes:e.data.unitCodes,showModal:!0})}).catch(console.error);var t}},"Download Report"),a.a.createElement(M,{open:n.showModal,close:function(n){return e.setState({showModal:!1})}},a.a.createElement("h4",null,"Which device to you want to download codes from"),Object.keys(y.a(v.a("deviceId"),this.state.allUnitCodes)).map(function(n){return a.a.createElement("div",null,a.a.createElement("button",{key:n,onClick:function(t){return function(e,n){var t=e.state.allUnitCodes.filter(function(t){return t.deviceId===n&&e.state.servicedCodes.includes(t.codes.split(", ")[0])}),o=O(t);j(["unit","codes","created date","device ID"],o),e.setState({showModal:!1})}(e,n)}},"Device ".concat(n)),a.a.createElement("button",{key:n,onClick:function(t){return function(e,n){var t=e.state.allUnitCodes.filter(function(t){return t.deviceId===n&&e.state.unServicedCodes.includes(t.codes.split(", ")[0])}),o=O(t);j(["unit","codes","created date","device ID"],o),e.setState({showModal:!1})}(e,n)}},"Device ".concat(n," (NA)")))})))}}]),n}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[25,1,2]]]);
//# sourceMappingURL=main.1a5a10be.chunk.js.map
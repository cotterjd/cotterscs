(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{200:function(e,n,t){"use strict";t.r(n);var a=t(1),o=t.n(a),r=t(22),c=t.n(r),i=(t(91),t(43)),s=t(23),d=t(24),u=t(28),l=t(25),f=t(29),m=t(12),h=t(13),p=(t(92),t(206)),g=t(201),y=t(202),v=t(203),C=t(204),k=t(207),b=t(80);t(205);function w(e){var n="; ".concat(document.cookie).split("; ".concat(e,"="));return 2===n.length&&decodeURIComponent(n.pop().split(";").shift())||""}function S(){var e=Object(m.a)(["\n        width: ",";\n        height: ",";\n        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);\n        background-color: #ffffff;\n        top: 0;\n        left: 0;\n\n        overflow-y: scroll;\n        padding: 30px;\n        display: ",";\n        z-index: 3;\n        position: fixed;\n        ","\n      "]);return S=function(){return e},e}function D(){var e=Object(m.a)(["\n    position: absolute;\n    right: 10px;\n    top: 5px;\n    font-size: 24px;\n    opacity: 0.5;\n\n    :hover {\n      cursor: pointer;\n    }\n  "]);return D=function(){return e},e}console.log;var j=h.a.span(D()),M=function(e){function n(e,t){var a;return Object(s.a)(this,n),(a=Object(u.a)(this,Object(l.a)(n).call(this,e,t))).state={},a}return Object(f.a)(n,e),Object(d.a)(n,[{key:"render",value:function(){var e=this.props,n=h.a.div(S(),e.width||"auto",e.height||"auto",function(e){return e.open?"block":"none"},e.styles);return o.a.createElement(n,{open:e.open},o.a.createElement(j,{onClick:e.close,className:"clickable"},"\u2715"),e.children)}}]),n}(o.a.Component);function N(){var e=Object(m.a)(["\n    background-color: #805716;\n    color: #ffffff;\n    width: 99%;\n    padding: 25px 15px;\n    margin: 5px;\n    border-radius: 10px;\n  "]);return N=function(){return e},e}function P(){var e=Object(m.a)(["\n    background-color: ",";\n    color: ",";\n    width: 99%;\n    padding: 15px;\n  "]);return P=function(){return e},e}console.log;var R=function(e,n){e.setState(function(e,t){return{chosenCodes:e.chosenCodes.includes(n)?e.chosenCodes.filter(function(e){return e!==n}):e.chosenCodes.concat(n)}})},E=function(e){document.cookie=function(e,n,t){var a="";if(t){var o=new Date;o.setTime(o.getTime()+24*t*60*60*1e3),a="; expires=".concat(o.toGMTString())}return"".concat(e,"=").concat(n).concat(a,";domain=cotterjd.github.io;path=/")}("userName",e.state.userName,365),e.setState({deviceId:e.state.userName})},O=function(e){var n=e.state,t=n.unitName,a=n.chosenCodes;t&&a.length&&(a.includes("Went Back")?function(e){return fetch("https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev",{method:"POST",body:JSON.stringify({query:'\n            {\n              unitCodes(orderBy: createdAt_DESC where: {\n                deviceId: "'.concat(e.state.deviceId,'"\n                unit: "').concat(e.state.unitName,'"\n              }) {\n                id\n                createdAt\n                codes\n              }\n            }\n          ')}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).catch(console.error)}(e).then(function(e){var n;e.errors?console.log(e.errors):(n=p.a(e.data.unitCodes),fetch("https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev",{method:"POST",body:JSON.stringify({query:'\n            mutation {\n              deleteUnitCode(where: {\n                id: "'.concat(n.id,'"\n              }) {\n                id\n              }\n            }\n          ')}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).catch(console.error))}).then(function(n){return U(e)}):U(e))},x=h.a.button(P(),function(e){return e.state.chosenCodes.includes(e.code)?"green":"none"},function(e){return e.state.chosenCodes.includes(e.code)?"white":e.code.includes("Completed")?"green":"none"}),B=h.a.button(N()),I=function(e,n){var t="".concat(e.reduce(function(e,n){return"".concat(e,'"').concat(n,'",')},"").slice(0,-1),"\r\n"),a=n.reduce(function(e,n){return"".concat(e,'"').concat(n.join('","'),'"\r\n')},[]);a="string"===typeof a?a.trim():"";var o="".concat(t).concat(a),r=new Blob([o],{type:"text/csv"}),c="data:text/csv;charset=utf-8,".concat(o),i=window.URL||window.webkitURL,s="undefined"===typeof i.createObjectURL?c:i.createObjectURL(r),d=document.createElement("a");d.setAttribute("href",s),d.setAttribute("download","tableDownload.csv"),document.body.appendChild(d),d.click(),document.body.removeChild(d)},T=function(e){return g.a(y.a("createdAt"),e).map(function(e){return[e.unit,e.codes,e.createdAt,e.deviceId]}).reverse()};function U(e){return fetch("https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev",{method:"POST",body:JSON.stringify({query:'\n            mutation {\n              createUnitCode(data: {\n                deviceId: "'.concat(e.state.deviceId,'"\n                unit: "').concat(e.state.unitName,'"\n                codes: "').concat(e.state.chosenCodes.join(", "),'"\n              }) {\n                id\n              }\n            }\n          ')}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(n){n&&n.data&&n.data.createUnitCode&&!n.errors?e.setState(function(e){return{unitCodes:[].concat(Object(i.a)(e.unitCodes),[[e.unitName,e.chosenCodes.join(", ")]]),chosenCodes:[],unitName:""}}):e.setState(function(e){return{unitCodes:[].concat(Object(i.a)(e.unitCodes),[[e.unitName,"NOT SAVED. make sure you have a internet connection and try again"]]),chosenCodes:[],unitName:""}})}).catch(console.error)}var L=function(e){function n(){var e;return Object(s.a)(this,n),(e=Object(u.a)(this,Object(l.a)(n).call(this))).state={unServicedCodes:["TV","Dog","Blocked","Locked From The Inside","No Key","Key Not Work","Skip Per Management","Minor","Denied Entry","see css","OTHER"],servicedCodes:["Missing Chimney Cap","Missing Damper","Broken Damper","Missing Spark Screen","Damaged Spark Screen","Damaged Left Refractory Panel","Damaged Back Refractory Panel","Damaged Right Refractory Panel","Damaged Base Panel","Missing Left Refractory Panel","Missing Back Refractory Panel","Missing Right Refractory Panel","Missing Base Panel","see  css","Went Back","Completed. No Issues."],codes:{"Missing Chimney Cap":"Missing Chimney Cap","Missing Damper":"Missing Damper","Broken Damper":"Broken Damper","Missing Spark Screen":"Missing Spark Screen","Damaged Spark Screen":"Damaged Spark Screen","Damaged Left Refractory Panel":"Damaged Left Refractory Panel","Damaged Back Refractory Panel":"Damaged Back Refractory Panel","Damaged Right Refractory Panel":"Damaged Right Refractory Panel","Damaged Base Panel":"Damaged Base Panel","Missing Left Refractory Panel":"Missing Left Refractory Panel","Missing Back Refractory Panel":"Missing Back Refractory Panel","Missing Right Refractory Panel":"Missing Right Refractory Panel","Missing Base Panel":"Missing Base Panel",TV:"TV",Dog:"Dog",Blocked:"Blocked","Locked From The Inside":"Locked from the inside","No Key":"No Key","Key Not Work":"Key Not Work","Skip Per Management":"Skip Per Management",Minor:"Minor","Denied Entry":"Denied Entry","Went Back":"Went Back"},chosenCodes:[],unitName:"",unitCodes:[],allUnitCodes:[],userName:"",deviceId:w("userName"),showModal:!1},e}return Object(f.a)(n,e),Object(d.a)(n,[{key:"render",value:function(){var e=this,n=this.state;return o.a.createElement("div",null,!n.deviceId&&o.a.createElement("div",null,o.a.createElement("input",{name:"username",placeholder:"User Name",style:{width:"100%",padding:"20px",boxSizing:"border-box"},value:n.userName,onChange:function(n){return function(e,n){return e.setState({userName:n.target.value})}(e,n)},type:"text"}),o.a.createElement(B,{onClick:function(n){return E(e)}},"Save User Name")),o.a.createElement("input",{name:"unit",placeholder:"Unit",style:{width:"100%",padding:"20px",boxSizing:"border-box"},value:n.unitName,onChange:function(n){return function(e,n){return e.setState({unitName:n.target.value})}(e,n)},type:"text"}),n.servicedCodes.map(function(t,a){return o.a.createElement(x,{state:n,code:t,key:t,onClick:function(n){return R(e,t)}},t)}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),n.unServicedCodes.map(function(t,a){return o.a.createElement(x,{state:n,code:t,key:t,onClick:function(n){return R(e,t)}},t)}),o.a.createElement("button",{style:{width:"100%",padding:"20px",backgroundColor:"#74fff8"},onClick:function(n){return O(e)}},"Add Codes"),o.a.createElement("ul",{id:"report",style:{listStyleType:"none"}},n.unitCodes.map(function(e,n){return o.a.createElement("li",{key:n},e)})),o.a.createElement("button",{style:{padding:"25px",width:"100%",marginBottom:"50px"},onClick:function(n){return t=e,fetch("https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev",{method:"POST",body:JSON.stringify({query:"\n          query {\n            unitCodes {\n              unit\n              codes\n              createdAt\n              deviceId\n            }\n          }\n        "}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){var n=e.data.unitCodes.map(function(e){return v.a("createdAt",Object(b.format)(new Date(e.createdAt),"MM/DD/YYYY h:mm"),e)});t.setState({allUnitCodes:n,showModal:!0})}).catch(console.error);var t}},"Download Report"),o.a.createElement(M,{open:n.showModal,close:function(n){return e.setState({showModal:!1})}},o.a.createElement("h4",null,"Which device to you want to download codes from"),Object.keys(C.a(k.a("deviceId"),this.state.allUnitCodes)).map(function(n){return o.a.createElement("div",null,o.a.createElement("button",{key:n,onClick:function(t){return function(e,n){var t=e.state.allUnitCodes.filter(function(t){return t.deviceId===n&&e.state.servicedCodes.includes(t.codes.split(", ")[0])}),a=T(t);I(["unit","codes","created date","device ID"],a),e.setState({showModal:!1})}(e,n)}},"Device ".concat(n)),o.a.createElement("button",{key:n,onClick:function(t){return function(e,n){var t=e.state.allUnitCodes.filter(function(t){return t.deviceId===n&&e.state.unServicedCodes.includes(t.codes.split(", ")[0])}),a=T(t);I(["unit","codes","created date","device ID"],a),e.setState({showModal:!1})}(e,n)}},"Device ".concat(n," (NA)")))})))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},85:function(e,n,t){e.exports=t(200)},91:function(e,n,t){},92:function(e,n,t){}},[[85,1,2]]]);
//# sourceMappingURL=main.2b8bdf6f.chunk.js.map
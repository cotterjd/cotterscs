(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,n,t){e.exports=t(30)},23:function(e,n,t){},24:function(e,n,t){},30:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),c=t(1),r=t.n(c),i=(t(23),t(6)),s=t(7),u=t(14),d=t(8),l=t(15),m=t(9),f=t(13),p=t(10);t(24);function h(){var e=Object(m.a)(["\n    background-color: ","\n  "]);return h=function(){return e},e}var b=console.log,g=p.a.button(h(),function(e){return e.state.chosenCodes.includes(e.code)?"green":"none"}),y=function(e){function n(){var e,t;Object(i.a)(this,n);for(var o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];return(t=Object(u.a)(this,(e=Object(d.a)(n)).call.apply(e,[this].concat(a)))).state={codes:{mmc:"Missing Chimney Cap",md:"Missing Damper",bd:"Broken Damper",mss:"Missing Spark Screen",dss:"amaged Spark Screen",lrp:"damaged Left Refractory Panel",brp:"damaged Back Refractory Panel",rrp:"damaged Right Refractory Panel",bp:"damaged Base Panel",mlrp:"Missing Left Refractory Panel",mbrp:"Missing Back Refractory Panel",mrrp:"Missing Right Refractory Panel",mbp:"Missing Base Panel",tv:"TV",dog:"DOG",b:"Blocked",l:"Locked from the inside",nk:"No Key",knw:"Key Not Work",s:"Skip per mgmt",min:"Minor"},chosenCodes:[],unitName:"",unitCodes:[]},t}return Object(l.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this,n=this.state;return a.a.createElement("div",null,a.a.createElement("label",{htmlFor:"unit"},"Unit"),a.a.createElement("input",{name:"unit",value:n.unitName,onChange:function(n){return function(e,n){return e.setState({unitName:n.target.value})}(e,n)},type:"text"}),Object.keys(n.codes).map(function(t,o){return a.a.createElement(g,{state:n,code:t,key:t,onClick:function(n){return o=t,void e.setState(function(e,n){return{chosenCodes:e.chosenCodes.includes(o)?e.chosenCodes.filter(function(e){return e!==o}):e.chosenCodes.concat(o)}});var o}},n.codes[t])}),a.a.createElement("button",{style:{width:"100%",padding:"10px"},onClick:function(n){e.setState(function(e){return{unitCodes:[].concat(Object(f.a)(e.unitCodes),[[e.unitName,e.chosenCodes.join(", ")]]),chosenCodes:[],unitName:""}})}},"Add Codes"),a.a.createElement("button",{style:{width:"100%",padding:"10px"},onClick:function(e){return function(e,n){b(n);var t="".concat(e.reduce(function(e,n){return"".concat(e,'"').concat(n,'",')},"").slice(0,-1),"\r\n"),o=n.reduce(function(e,n){return"".concat(e,'"').concat(n.join('","'),'"\r\n')},[]).trim(),a="".concat(t).concat(o),c=new Blob([a],{type:"text/csv"}),r="data:text/csv;charset=utf-8,".concat(a),i=window.URL||window.webkitURL,s="undefined"===typeof i.createObjectURL?r:i.createObjectURL(c),u=document.createElement("a");u.setAttribute("href",s),u.setAttribute("download","tableDownload.csv"),document.body.appendChild(u),u.click(),document.body.removeChild(u)}(["unit","codes"],n.unitCodes)}},"Download Report"),a.a.createElement("ul",{id:"report",style:{listStyleType:"none"}},n.unitCodes.map(function(e,n){return a.a.createElement("li",{key:n},e)})))}}]),n}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.ca3a50c5.chunk.js.map
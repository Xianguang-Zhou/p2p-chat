(function(e){function t(t){for(var o,r,a=t[0],l=t[1],c=t[2],d=0,p=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);u&&u(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var l=n[a];0!==s[l]&&(o=!1)}o&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},s={app:0},i=[];function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"034f":function(e,t,n){"use strict";var o=n("7688"),s=n.n(o);s.a},"2d5a":function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id="2d5a"},6329:function(e,t,n){"use strict";var o=n("b50f"),s=n.n(o);s.a},7688:function(e,t,n){},b50f:function(e,t,n){},bb3e:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);var o=n("b355"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-fluid",attrs:{id:"app"}},[n("div",{staticClass:"row"},[n("Dialog")],1)])},i=[],r=n("3732"),a=n("9153"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-xs-12"},[n("div",{staticClass:"row line"},[n("form",{staticClass:"form-inline",attrs:{onsubmit:"return false"}},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"peerIdInput"}},[e._v("Peer ID:")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.selfPeerId,expression:"selfPeerId"}],staticClass:"form-control",attrs:{id:"peerIdInput",type:"text",readonly:""},domProps:{value:e.selfPeerId},on:{input:function(t){t.target.composing||(e.selfPeerId=t.target.value)}}})]),e._v(" "),e.selfPeerId?n("button",{staticClass:"btn btn-default",attrs:{id:"copySelfPeerId"}},[e._v("Copy")]):e._e()])]),n("div",{staticClass:"row line"},[n("form",{staticClass:"form-inline",attrs:{onsubmit:"return false"}},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"friendPeerIdInput"}},[e._v("Friend peer ID:")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.friendPeerId,expression:"friendPeerId"}],staticClass:"form-control",attrs:{id:"friendPeerIdInput"},domProps:{value:e.friendPeerId},on:{input:function(t){t.target.composing||(e.friendPeerId=t.target.value)}}})]),e._v(" "),e.selfPeerId?n("input",{staticClass:"btn btn-default",attrs:{type:"button",value:"Connect"},on:{click:e.connectPeer}}):e._e()])]),n("div",{staticClass:"row line"},[n("label",{staticStyle:{margin:"0"}},[e._v("Status: ")]),n("span",[e._v(e._s(e.status))])]),n("div",{staticClass:"row line"},[n("label",{staticStyle:{margin:"0"}},[e._v("Call status: ")]),n("span",[e._v(e._s(e.callStatus)+" ")]),n("input",{staticClass:"btn btn-default",attrs:{type:"button",value:"Toggle call"},on:{click:e.toggleCall}}),n("button",{staticClass:"btn btn-default pull-right",attrs:{type:"button","data-toggle":"button","aria-pressed":"false",autocomplete:"off"},on:{click:e.toggleScrollingLock}},[e._v("Scroll Lock")])]),n("div",{staticClass:"row line"},[n("div",{staticClass:"col-xs-12",attrs:{id:"messagesContainer"}},e._l(e.messageList,(function(t,o){return n("p",{key:o,staticClass:"message"},[n("span",{staticClass:"messageName"},[e._v(e._s(t.name))]),e._v(": "),"img"===t.type?[n("br"),n("img",{staticClass:"messageImage",attrs:{src:t.content},on:{load:e.onImageLoad}})]:[n("span",{staticClass:"messageText"},[e._v(e._s(t.content))])]],2)})),0)]),n("div",{staticClass:"row line"},[n("input",{staticClass:"btn btn-default",attrs:{type:"button",value:"Image"},on:{click:e.selectImages}})]),n("div",{staticClass:"row line"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],staticClass:"form-control col-xs-12",attrs:{cols:"45",rows:"4"},domProps:{value:e.message},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:t.ctrlKey?t.shiftKey||t.altKey||t.metaKey?null:(t.stopPropagation(),e.sendMessage(t)):null},input:function(t){t.target.composing||(e.message=t.target.value)}}})]),n("div",{staticClass:"row line"},[n("input",{staticClass:"btn btn-default",attrs:{type:"button",value:"Send"},on:{click:e.sendMessage}})]),n("input",{attrs:{type:"file",id:"imageInput",multiple:""},on:{change:e.sendImages}}),n("audio",{attrs:{id:"speaker",autoplay:""}},[e._v('Your browser can not support "audio" elements.')])])},c=[],u=n("5f3e"),d=n.n(u),p=n("90bb"),f=n.n(p),g=n("df16"),m=n.n(g),v=function(){function e(e,t,n){this.type=e,this.name=t,this.content=n}return e}(),h=function(e){function t(){var t=e.call(this)||this;t.friendPeerId="",t.selfPeerId="",t.status="getting peer ID...",t.message="",t.messageList=[],t.clipboard=null,t.isScrollingLocked=!1,t.mediaConnection=null,t._audioSource=null,t.callStatus="disconnected";var n=t;t.clipboard=new m.a("#copySelfPeerId",{text:function(e){return n.getSelfPeerId()}});var o=navigator;return t.getUserMedia=o.getUserMedia||o.webkitGetUserMedia||o.mozGetUserMedia,t.peer=new f.a,t.peer.on("open",t.onPeerOpen),t.peer.on("connection",t.onPeerConnection),t.peer.on("call",t.onPeerCall),t}return Object(r["b"])(t,e),t.prototype.getSelfPeerId=function(){return this.selfPeerId},t.prototype.onPeerOpen=function(e){this.selfPeerId=e,this.status="online"},t.prototype.onPeerConnection=function(e){this.conn=e,e.on("open",this.onConnOpen),e.on("close",this.onConnClose),e.on("data",this.onConnData)},t.prototype.onConnOpen=function(){this.friendPeerId=this.conn.peer,this.status="connected"},t.prototype.onConnClose=function(){this.status="disconnected"},t.prototype.onConnData=function(e){if("img"===e.type){var t=new Blob([e.content],{type:e.fileType}),n=URL.createObjectURL(t);this.messageList.push(new v("img","friend",n))}else this.messageList.push(new v("text","friend",e.content))},t.prototype.connectPeer=function(){this.status="connecting...",this.onPeerConnection(this.peer.connect(this.friendPeerId))},t.prototype.sendMessage=function(){this.messageList.push(new v("text","me",this.message)),this.conn.send({type:"text",content:this.message}),this.message=""},t.prototype.sendImages=function(e){var t=e.target;if(null!=t.files)for(var n=this.conn,o=function(e){var o=t.files[e],i=URL.createObjectURL(o);s.messageList.push(new v("img","me",i));var r=new FileReader;r.onload=function(e){null!=e.target&&n.send({type:"img",content:e.target.result,fileType:o.type})},r.readAsArrayBuffer(o)},s=this,i=0;i<t.files.length;++i)o(i)},t.prototype.onImageLoad=function(e){this.scrollBottom();var t=e.target.src;t.startsWith("blob:")&&window.URL.revokeObjectURL(t)},t.prototype.selectImages=function(){d()("#imageInput").click()},t.prototype.getAudioSource=function(){return this._audioSource},t.prototype.setAudioSource=function(e){this._audioSource=e;var t=document.querySelector("#speaker");t.srcObject=e},t.prototype.toggleCall=function(){var e,t=this;null!=this.getAudioSource()?(null===(e=this.mediaConnection)||void 0===e||e.close(),this.setAudioSource(null),this.callStatus="disconnected"):this.getUserMedia({video:!1,audio:!0},(function(e){t.callStatus="connecting...",t.mediaConnection=t.peer.call(t.friendPeerId,e),t.mediaConnection.on("error",console.error),t.mediaConnection.on("close",(function(){t.setAudioSource(null),t.callStatus="disconnected"})),t.mediaConnection.on("stream",(function(e){t.setAudioSource(e),t.callStatus="connected"}))}),(function(e){console.log("Failed to get local stream.",e),window.alert("Failed to get local stream.")}))},t.prototype.onPeerCall=function(e){var t,n=this;e.peer==this.friendPeerId&&window.confirm("Answer the call?")?(null===(t=this.mediaConnection)||void 0===t||t.close(),null!=this.getAudioSource()&&this.setAudioSource(null),this.callStatus="disconnected",this.getUserMedia({video:!1,audio:!0},(function(t){n.mediaConnection=e,n.callStatus="answering...",n.mediaConnection.answer(t),n.mediaConnection.on("error",console.error),n.mediaConnection.on("close",(function(){n.setAudioSource(null),n.callStatus="disconnected"})),n.mediaConnection.on("stream",(function(e){n.setAudioSource(e),n.callStatus="connected"}))}),(function(t){e.close(),console.log("Failed to get local stream.",t),window.alert("Failed to get local stream.")}))):e.close()},t.prototype.scrollBottom=function(){this.isScrollingLocked||d()("#messagesContainer").scrollTop(d()("#messagesContainer")[0].scrollHeight)},t.prototype.toggleScrollingLock=function(){this.isScrollingLocked=!this.isScrollingLocked},t.prototype.onMessageListChanged=function(e,t){var n=e[e.length-1].type;"text"===n&&setTimeout(this.scrollBottom,0)},Object(r["a"])([Object(a["c"])("messageList")],t.prototype,"onMessageListChanged",null),t=Object(r["a"])([a["a"]],t),t}(a["b"]),b=h,y=b,C=(n("6329"),n("df5e")),w=Object(C["a"])(y,l,c,!1,null,"92ad3600",null),P=w.exports,S=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return Object(r["b"])(t,e),t=Object(r["a"])([Object(a["a"])({components:{Dialog:P}})],t),t}(a["b"]),I=S,_=I,O=(n("034f"),Object(C["a"])(_,s,i,!1,null,null,null)),k=O.exports;n("bb3e"),n("dc2b"),n("5039"),n("2443");o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(k)}}).$mount("#app")}});
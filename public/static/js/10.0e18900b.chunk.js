webpackJsonp([10],{339:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(0),a=t.n(r),o=t(5),i=t(710),c=t(711),l=function(){return a.a.createElement(r.Fragment,null,a.a.createElement(o.e,{path:"/agreement/register",component:i.a}),a.a.createElement(o.e,{path:"/agreement/caopan",component:c.a}))};n.default=l},349:function(e,n,t){"use strict";var r=t(0),a=t.n(r),o=t(2),i=function(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n    display: flex;\n    height: 45px;\n    line-height: 45px;\n    background-color: ",";\n    color: #fff;\n    & > div {\n        flex: 1;\n    }\n    > .navbar-left {\n        display: flex;\n        align-items: center;\n        padding-left: 10px;\n        a {\n            color: #fff;\n            display: flex;\n            align-items: center;\n        }\n    }\n    > .navbar-title {\n        display: -webkit-box;\n        -webkit-box-align: center;\n        -webkit-box-pack: center;\n        font-size: 18px;\n        justify-content: center;\n        white-space: nowrap;\n    }\n    > .navbar-right {\n        display: flex;\n        padding-right: 15px;\n        align-items: center;\n        justify-content: flex-end;\n    }\n"],["\n    display: flex;\n    height: 45px;\n    line-height: 45px;\n    background-color: ",";\n    color: #fff;\n    & > div {\n        flex: 1;\n    }\n    > .navbar-left {\n        display: flex;\n        align-items: center;\n        padding-left: 10px;\n        a {\n            color: #fff;\n            display: flex;\n            align-items: center;\n        }\n    }\n    > .navbar-title {\n        display: -webkit-box;\n        -webkit-box-align: center;\n        -webkit-box-pack: center;\n        font-size: 18px;\n        justify-content: center;\n        white-space: nowrap;\n    }\n    > .navbar-right {\n        display: flex;\n        padding-right: 15px;\n        align-items: center;\n        justify-content: flex-end;\n    }\n"]),c=o.b.div(i,function(e){return e.background?e.background:"#ff4500"}),l=function(e){var n=e.left,t=e.onLeftClick,r=e.children,o=e.right,i=e.background;return a.a.createElement(c,{background:i},a.a.createElement("div",{className:"navbar-left",onClick:t},n),a.a.createElement("div",{className:"navbar-title"},r),a.a.createElement("div",{className:"navbar-right"},o))};n.a=l},710:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function o(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var i=t(106),c=(t.n(i),t(107)),l=t.n(c),f=t(0),u=t.n(f),s=t(109),p=t.n(s),b=t(349),d=t(5),h=t(63),y=t(64),m=t.n(y),g=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),v=function(e){function n(){var e,t,o,i;r(this,n);for(var c=arguments.length,l=Array(c),f=0;f<c;f++)l[f]=arguments[f];return t=o=a(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(l))),o.state={content:""},i=t,a(o,i)}return o(n,e),g(n,[{key:"componentDidMount",value:function(){this._fetchData(),this._isMount=!0}},{key:"_fetchData",value:function(){var e=this;m.a.get(h.i+"?id=31&model=2").then(function(n){"1"===n.data.status&&e._isMount&&e.setState({content:n.data.data.content})})}},{key:"componentWillUnmount",value:function(){this._isMount=!1}},{key:"render",value:function(){return u.a.createElement(p.a,{title:"\u6ce8\u518c\u534f\u8bae"},u.a.createElement(f.Fragment,null,u.a.createElement(b.a,{left:u.a.createElement(l.a,{type:"left"}),onLeftClick:function(){window.history.back(-1)}},"\u6ce8\u518c\u534f\u8bae"),u.a.createElement("div",{style:{padding:"10px 15px",background:"#fff"},dangerouslySetInnerHTML:{__html:this.state.content}})))}}]),n}(f.PureComponent);n.a=Object(d.g)(v)},711:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function o(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var i=t(106),c=(t.n(i),t(107)),l=t.n(c),f=t(0),u=t.n(f),s=t(109),p=t.n(s),b=t(349),d=t(63),h=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),y=function(e){function n(){return r(this,n),a(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return o(n,e),h(n,[{key:"render",value:function(){return u.a.createElement(p.a,{title:"\u64cd\u76d8\u534f\u8bae"},u.a.createElement(f.Fragment,null,u.a.createElement(b.a,{left:u.a.createElement(l.a,{type:"left"}),onLeftClick:function(){return window.history.back(-1)}},"\u64cd\u76d8\u534f\u8bae"),u.a.createElement("iframe",{title:"\u64cd\u76d8\u534f\u8bae",width:"100%",height:"100%",src:d._35+"/stock/index/protocol.html"})))}}]),n}(f.PureComponent);n.a=y}});
//# sourceMappingURL=10.0e18900b.chunk.js.map
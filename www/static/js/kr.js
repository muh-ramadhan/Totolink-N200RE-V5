"use strict";
function isLowIe() {
  var e = navigator.userAgent,
    t = -1 < e.indexOf("compatible") && -1 < e.indexOf("MSIE");
  e.indexOf("Edge"), -1 < e.indexOf("Trident") && e.indexOf("rv:11.0");
  if (t) {
    new RegExp("MSIE (\\d+\\.\\d+);").test(e);
    t = parseFloat(RegExp.$1);
    if (Number(t) < 7) return !0;
  }
  return !1;
}
document.querySelectorAll ||
  (document.querySelectorAll = function (e) {
    var t,
      n = document.createElement("style"),
      o = [];
    for (
      document.documentElement.firstChild.appendChild(n),
        document._qsa = [],
        n.styleSheet.cssText =
          e + "{x-qsa:expression(document._qsa && document._qsa.push(this))}",
        window.scrollBy(0, 0),
        n.parentNode.removeChild(n);
      document._qsa.length;

    )
      (t = document._qsa.shift()).style.removeAttribute("x-qsa"), o.push(t);
    return (document._qsa = null), o;
  }),
  document.querySelector ||
    (document.querySelector = function (e) {
      e = document.querySelectorAll(e);
      return e.length ? e[0] : null;
    }),
  Function.prototype.bind ||
    (Function.prototype.bind = function () {
      if ("function" != typeof this)
        throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable"
        );
      var e = this,
        t = arguments[0],
        n = Array.prototype.slice.call(arguments, 1);
      return function () {
        e.apply(t, n);
      };
    }),
  (function (e) {
    function t() {
      (this.author = "Karen"),
        (this.version = "0.0"),
        (this.getEle = function (e) {
          return document.getElementById(e);
        });
    }
    (t.prototype.request = function (e) {
      var l = 0,
        u = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
      function a(e) {
        var t,
          n,
          o,
          i,
          r = null;
        window.XMLHttpRequest
          ? (r = new XMLHttpRequest())
          : window.ActiveXObject && (r = new ActiveXObject(u[l])),
          null == r
            ? alert("浏览器不支持XML请求")
            : ((n = r),
              (r = ((t = e).type || "GET").toUpperCase()),
              t.dataType,
              (e = t.url || "/cgi-bin/cstecgi.cgi"),
              (o = null == t.async || t.async),
              (i = t.data || {}),
              (i = JSON.stringify(i)),
              (n.onreadystatechange = function () {
                4 == n.readyState && 200 == n.status
                  ? "function" == typeof t.success &&
                    t.success(JSON.parse(n.responseText))
                  : 4 == n.readyState &&
                    200 != n.status &&
                    (isLowIe() && l < 1 && (l++, a(t)),
                    "function" == typeof t.error) &&
                    t.error("error");
              }),
              n.open(r, e, o),
              "POST" == r &&
                n.setRequestHeader(
                  "Content-type",
                  "application/x-www-form-urlencoded"
                ),
              n.send(i));
      }
      a(e);
    }),
      (t.prototype.elm = function (e) {
        return this.getEle(e);
      }),
      (t.prototype.show = function (e) {
        this.getEle(e).style.display = "block";
      }),
      (t.prototype.hide = function (e) {
        this.getEle(e).style.display = "none";
      }),
      (t.prototype.html = function (e, t) {
        this.getEle(e).innerHTML = t;
      }),
      (t.prototype.set = function (e, t) {
        var e = this.getEle(e),
          n = e.tagName.toLowerCase();
        ("input" != n && "select" != n) || (e.value = t);
      }),
      (t.prototype.get = function (e) {
        var e = this.getEle(e),
          t = e.tagName.toLowerCase(),
          n = null;
        return (n = "input" != t && "select" != t ? n : e.value);
      }),
      (t.prototype.urlMsg = function () {
        if (-1 < location.href.indexOf("?")) {
          for (
            var e = {}, t = location.href.split("?")[1].split("&"), n = 0;
            n < t.length;
            n++
          ) {
            var o = t[n].split("=");
            e[o[0]] = o[1];
          }
          return e;
        }
        return {};
      }),
      (t.prototype.addEventListener = function (e, t, n) {
        e.addEventListener
          ? e.addEventListener(t, n, !1)
          : e.attachEvent("on" + t, n.bind(e));
      }),
      (t.prototype.className = function (e, t) {
        if ("string" != typeof t) return e.className;
        e.className = t;
      }),
      (t.prototype.firstElementChild = function (e) {
        return e.firstElementChild || e.firstChild;
      }),
      (t.prototype.nextSibling = function (e) {
        return e.nextElementSibling || e.nextSibling;
      }),
      (t.prototype.previousSibling = function (e) {
        return (e = e.previousElementSibling || e.previousSibling);
      }),
      (t.prototype.target = function (e) {
        return (e = e || event).target || e.srcElement;
      }),
      (t.prototype.querySelectorAll = function (e, o) {
        var i = [],
          e = e.children;
        return (
          (o = o.replace(/^./, "")),
          (function e(t) {
            for (var n = 0; n < t.length; n++)
              o == t[n].className && i.push(t[n]),
                t[n].children && e(t[n].children);
          })(e),
          i
        );
      }),
      (e.kr = new t());
  })(window);
var $lang = {};
function getLanguage(e) {
  "vn" == e && (e = "vi"),
    kr.request({
      url: "/language/" + e + ".json",
      async: !1,
      type: "GET",
      success: function (e) {
        $lang = e;
      },
    });
}
var lang_t = function (e, t) {
    var n, o;
    if (
      ((e =
        0 == /\[|\]/g.test(e)
          ? ((o = e.split(".")[0]), e.split(".")[1])
          : ((o = e.split("[")[0]),
            e.split("[")[1].replace(/\"/g, "").split("]")[0])),
      null == $lang[o])
    )
      return o;
    if (null == (n = $lang[o][e])) return e;
    if (null != t)
      if ("object" == typeof t)
        for (var i in t) n = n.replace("{" + i + "}", t[i]);
      else
        "html" == t &&
          (n = n
            .replace("[", '<font style="font-weight:bold;"> [')
            .replace("]", "] </font>"));
    return n;
  },
  _eleObj_ = {},
  _allEleArr_ = [],
  _globalNodeValue_ = [],
  _vm_ = {};
function initChild(e, t, n) {
  searchChild(document.getElementById("myui"), "", [], !0);
}
function langInit(e) {
  return (e = e.replace(/[\"\']/g, "")), lang_t(e);
}
function extend(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function kr$1(e) {
  "object" != typeof e ? alert("warn! value must is object!") : this._init(e);
}
function searchChild(e, t, n, o) {
  var i;
  if (0 < e.childNodes.length)
    for (var r = 0; r < e.childNodes.length; r++)
      (i = e.childNodes[r]).nodeValue
        ? !0 === o && childtovalue(!0, e, i)
        : i && "SCRIPT" != i.tagName && searchChild(i, t, n, o);
}
function processText() {
  for (var e in _globalNodeValue_) {
    var t = langInit(_globalNodeValue_[e].value);
    _globalNodeValue_[e].elm.nodeValue = _globalNodeValue_[e].nodeVlaue.replace(
      /\{\{(.+?)\}\}/g,
      t
    );
  }
}
function childtovalue(e, t, n, o, i, r) {
  var l,
    u,
    a = (a = n.nodeValue).replace(/(^\s*)|(\s*$)/g, "");
  /\{\{(.+?)\}\}/g.test(a) &&
    ((u = /\{\{([^{}]+)\}\}/g.exec(a)[1]),
    e &&
      ((l =
        null != (e = /w\(([^*]+)\)/g.exec(u))
          ? langInit(e[1])
          : _vm_[u.trim()]),
      _globalNodeValue_.push({ nodeVlaue: a, value: e[1], elm: n }),
      (l = null == l ? a : a.replace(/\{\{(.+?)\}\}/g, l))),
    (n.nodeValue = l));
}
kr$1.prototype._init = function (e) {
  "function" ==
    typeof (_vm_ = extend(
      { init: function () {}, mounted: function () {}, w: lang_t },
      e
    )).init && _vm_.init(),
    (window.onload = function () {
      "function" == typeof _vm_.mounted && _vm_.mounted(),
        initChild("body"),
        (document.getElementById("myui").style.display = "block");
    });
};

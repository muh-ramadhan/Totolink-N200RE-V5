function get_token_from_url() {
  var n,
    e,
    i,
    a = location.href.split("?"),
    l = "";
  if (1 < a.length)
    for (e = a[1].split("&"), n = 0; n < e.length; n++)
      if ("token" == (i = e[n].split("="))[0]) {
        l = i[1];
        break;
      }
  return "" != l ? "?token=" + l : "";
}
function get_token_from_url_split() {
  var n,
    e,
    i,
    a = location.href.split("?"),
    l = "";
  if (1 < a.length)
    for (e = a[1].split("&"), n = 0; n < e.length; n++)
      if ("token" == (i = e[n].split("="))[0]) {
        l = i[1];
        break;
      }
  return "" != l ? l : "";
}
$.lang = {};
var locatLang = "cn",
  lang_t =
    (!(function (n) {
      function e(n) {
        this.switch = function (i) {
          $.ajax({
            url: "/language/" + i + ".json",
            async: !1,
            dataType: "json",
            type: "get",
            success: function (n) {
              for (var e in n) $.lang[e] = n[e];
              locatLang = i;
            },
          });
        };
      }
      (e.prototype.switch = function (n) {
        return this.switch(n);
      }),
        (n.language = new e());
    })(window),
    language.switch(localStorage.lang || "cn"),
    function (n, e) {
      var i;
      if (
        ((n = /\[|\]/g.test(n)
          ? ((i = n.split("[")[0]),
            n.split("[")[1].replace(/\"/g, "").split("]")[0])
          : ((i = n.split(".")[0]), n.split(".")[1])),
        null == $.lang[i])
      )
        return i;
      if (null == (t = $.lang[i][n])) return n;
      if (null != e)
        if ("object" == typeof e)
          for (var a in e)
            var l = new RegExp("{[" + a + "]}", "g"), t = t.replace(l, e[a]);
        else
          "html" == e &&
            (t = t
              .replace("[", '<font style="font-weight:bold;"> [')
              .replace("]", "] </font>"));
      return t;
    }),
  globalConfig = {
    debug: !1,
    ajaxType: !1,
    cgiUrl: "/cgi-bin/cstecgi.cgi",
    showAutoLang: !0,
    showLanguage: "en,cn,ru,vn",
    modelType: "gw",
    defaultLang: "en",
    helpUrl: "",
    fmVersion: "",
    portSpeed: "1000",
    version: "V1.0.1bate",
    wanTypeList: "dhcp,pppoe,static,pptp,l2tp",
    copyRight: "Copyright &copy; [date] Zioncom ltd., All Rights Reserved",
    customTitle: "‎",
    langAutoFlag: !1,
    descLen: 20,
  },
  languages = {
    auto: "自动检测",
    en: "English",
    cn: "简体中文",
    ct: "繁體中文",
    ru: "Русский",
    vi: "Tiếng Việt",
    vn: "Tiếng Việt",
    jp: "日本語",
    kr: "한국어",
    es: "El español",
    de: "Deutsch",
    th: "ภาษาไทย",
    fr: "Français",
    uk: "Українська",
  },
  Cstool = { Msg: null, Count: null, Verify: null, Mark: null, Flag: null },
  menu_basic =
    (!(function (n) {
      var e = null;
      n.autoLogout = function () {
        ~location.href.indexOf("login.html") ||
          (clearTimeout(e), (e = setTimeout("location.replace('/')", 305e3)));
      };
    })(window),
    [
      { href: "index", icon: "status", lang: "index", display: !0, sub: !1 },
      { href: "wan", icon: "net", lang: "wan", display: !0, sub: !1 },
      { href: "wifi", icon: "wifi", lang: "wifi", display: !0, sub: !1 },
      {
        href: "parental",
        icon: "parental",
        lang: "parental",
        display: !0,
        sub: !1,
      },
      { href: "guest", icon: "guest", lang: "guest", display: !0, sub: !1 },
      { href: "qos", icon: "qos", lang: "qos", display: !0, sub: !1 },
      {
        href: "gamespeed",
        icon: "gamespeed",
        lang: "gamespeed",
        display: !1,
        sub: !1,
      },
    ]),
  menu_rpt_basic = [
    { href: "index", icon: "status", lang: "index", display: !0, sub: !1 },
    { href: "wifi", icon: "wifi", lang: "wifi", display: !0, sub: !1 },
    { href: "guest", icon: "guest", lang: "guest", display: !0, sub: !1 },
  ],
  menu_advance = [
    { href: "index", icon: "status", lang: "index", display: !0, sub: !1 },
    { href: "wan", icon: "net", lang: "network", display: !0, sub: !1 },
    { href: "wifi", icon: "wifi", lang: "wifi", display: !0, sub: !1 },
    {
      href: "parental",
      icon: "parental",
      lang: "parental",
      display: !0,
      sub: !1,
    },
    { href: "qos", icon: "qos", lang: "qos", display: !0, sub: !1 },
    {
      href: "gamespeed",
      icon: "gamespeed",
      lang: "gamespeed",
      display: !1,
      sub: !1,
    },
    {
      href: "appfilter",
      icon: "appfilter",
      lang: "appfilter",
      display: !1,
      sub: !1,
    },
    {
      href: "route_table",
      icon: "equipment",
      lang: "equipment",
      display: !0,
      sub: !1,
    },
    { href: "ipf", icon: "security", lang: "security", display: !0, sub: !1 },
    { href: "portfwd", icon: "nat", lang: "nat", display: !0, sub: !1 },
    { href: "vpncli", icon: "vpn", lang: "vpncli", display: !0, sub: !1 },
    { href: "pptp", icon: "vpn", lang: "vpn", display: !0, sub: !1 },
    { href: "storage", icon: "storage", lang: "storage", display: !0, sub: !1 },
    {
      href: "acl_setting",
      icon: "vpn",
      lang: "acl_setting",
      display: !0,
      sub: !1,
    },
    { href: "remote", icon: "service", lang: "service", display: !0, sub: !1 },
    { href: "changepwd", icon: "tools", lang: "tools", display: !0, sub: !1 },
  ],
  menu_rpt_advance = [
    { href: "index", icon: "status", lang: "index", display: !0, sub: !1 },
    { href: "lan", icon: "net", lang: "network", display: !0, sub: !1 },
    { href: "wifi", icon: "wifi", lang: "wifi", display: !0, sub: !1 },
    { href: "changepwd", icon: "tools", lang: "tools", display: !0, sub: !1 },
  ];

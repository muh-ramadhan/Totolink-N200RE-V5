function ie_version() {
  var o = navigator.userAgent,
    e = -1 < o.indexOf("compatible") && -1 < o.indexOf("MSIE"),
    t = -1 < o.indexOf("Edge") && !e,
    p = -1 < o.indexOf("Trident") && -1 < o.indexOf("rv:11.0");
  return e
    ? (new RegExp("MSIE (\\d+\\.\\d+);").test(o),
      7 == (e = parseFloat(RegExp.$1))
        ? 7
        : 8 == e
        ? 8
        : 9 == e
        ? 9
        : 10 == e
        ? 10
        : 6)
    : t
    ? "edge"
    : p
    ? 11
    : -1;
}
function getUserBrowser() {
  var o = navigator.userAgent;
  return -1 < o.indexOf("Mobile") ||
    -1 < o.indexOf("Android") ||
    -1 < o.indexOf("Linux") ||
    -1 < o.indexOf("iPhone") ||
    -1 < o.indexOf("iPod") ||
    -1 < o.indexOf("iPad")
    ? "mobile"
    : "pc";
}
var isPhoneDevice = !1;
function addClass(o) {
  var e,
    t = document.head || document.getElementsByTagName("head")[0],
    p = document.createElement("style");
  (p.type = "text/css"),
    p.styleSheet
      ? (p.styleSheet.cssText = o)
      : ((e = document.createDocumentFragment()).appendChild(
          document.createTextNode(o)
        ),
        p.appendChild(e)),
    t.appendChild(p);
}
function selectIe() {
  var o = ie_version();
  (((-1 == o || 9 < o) && !isPhoneDevice) ||
    0 <= location.href.indexOf("/phone/")) &&
    addClass(
      "select {padding: 0 18px 0 6px;background:url(/static/images/drop2.png) no-repeat right #fff !important}"
    );
}
"mobile" == getUserBrowser() && (isPhoneDevice = !0),
  (function (l) {
    "use strict";
    var i;
    localStorage.getItem("lang") || globalConfig.defaultLang;
    uiPost.getInitCfg(function (e) {
      function o(o) {
        e.custom && (globalConfig[o] = "1" == e.custom[o]);
      }
      for (var t in ((globalConfig.projectOwnerTw = "tw" == e.projectOwner),
      (globalConfig.urlfEgText = globalConfig.projectOwnerTw
        ? "totolink.tw"
        : "www.baidu.com"),
      (globalConfig.hideLogo = e.hideLogo),
      (globalConfig.softwareType = e.softwareType),
      (globalConfig.fmVersion = e.fmVersion),
      (globalConfig.portSpeed = e.portSpeed),
      (globalConfig.helpUrl = e.helpUrl),
      (globalConfig.qosVersion = e.qosEngineVersion),
      (globalConfig.copyRight = e.copyRight),
      e.webTitle && (globalConfig.customTitle = e.webTitle),
      (document.title = globalConfig.customTitle),
      e.pageOptimize && (globalConfig.pageOptimize = e.pageOptimize),
      e.defaultLang && (globalConfig.defaultLang = e.defaultLang),
      e.modelType && (globalConfig.modelType = e.modelType),
      e.newFunAddFlag && (globalConfig.addFlag = e.newFunAddFlag),
      (globalConfig.ledStatus = "1" == e.ledStatus),
      (globalConfig.GSMSupport = "1" == e.GSMSupport),
      (globalConfig.wifi11axSupport = "1" == e.wifi11axSupport),
      o("wanDetectSupport"),
      o("l2tpServerSupport"),
      o("pptpServerSupport"),
      o("ipv6Support"),
      o("iptvSupport"),
      o("gameSpeedSupport"),
      o("storageSupport"),
      o("pppoeSpecSupport"),
      o("pppoeRussiaSupport"),
      o("ttlWaySupport"),
      o("appfilterSupport"),
      o("openVpnServerSupport"),
      o("noticeSupport"),
      o("upnpSupport"),
      o("ussdSupport"),
      o("messageSupport"),
      o("tcpdumpSupport"),
      o("smartFlowSupport"),
      o("ipFlowSupport"),
      o("ftpSupport"),
      o("autoDetectSupport"),
      o("usb3DisableSupport"),
      o("staticrouteSupport"),
      o("arpSupport"),
      o("diffnetSupport"),
      o("wpsSupport"),
      o("bandSpeedSupport"),
      o("vpnCliSupport"),
      o("lcpEchoSupport"),
      o("option60Support"),
      o("wizardIptvSupport"),
      o("wdsSupport"),
      o("guestWifiSchSupport"),
      o("firewallSchSupport"),
      o("bandSteeringSupport"),
      o("ssrServerSupport"),
      o("rptInfoSupport"),
      o("ipsecSupport"),
      o("wifiWpa2Wpa3Support"),
      o("ftpPortSupport"),
      o("sambaPassworSupport"),
      o("ssidQosSupport"),
      o("wifiWepWpaSupport"),
      o("wifiWepNoSupport"),
      o("certificatSoftware"),
      o("hidePasswordInput"),
      o("sameSiteCookie"),
      o("loginVerifySupport"),
      o("aclServerSupport"),
      o("ipv6PPPSupport"),
      o("tr069Support"),
      o("stunSupport"),
      "0" != e.custom.opmodeSupport &&
        null != e.custom.opmodeSupport &&
        (globalConfig.opmodeSupport = !0),
      e.custom.routeControl &&
        (globalConfig.routeControl = e.custom.routeControl),
      (globalConfig.versionControlSupport = e.custom.versionControlSupport),
      e.wifiMaxNum && (globalConfig.wifiMaxNum = e.wifiMaxNum),
      e.bandWidth && (globalConfig.bandWidth = e.bandWidth),
      "switch" == e.opmode
        ? (globalConfig.opmode = "br")
        : (globalConfig.opmode = e.opmode),
      (globalConfig.opmodeBackups = e.opmode),
      null != e.rptWifiIdx && (globalConfig.rptWifiIdx = e.rptWifiIdx),
      (globalConfig.showLanguage = e.showLanguage.split(",")),
      "1" == e.showAutoLang
        ? (globalConfig.showLanguage.splice(0, 0, "auto"),
          (globalConfig.showAutoLang = !0))
        : ((globalConfig.showAutoLang = !1), (e.langAutoFlag = "0")),
      "1" == e.tradQos
        ? (globalConfig.tradQos = !1)
        : (globalConfig.tradQos = !0),
      (globalConfig.wanTypeList = e.custom.wanTypeList.split(",")),
      globalConfig.wanTypeList))
        "dhcp" == globalConfig.wanTypeList[t]
          ? (globalConfig.wanTypeList_DHCP = !0)
          : "static" == globalConfig.wanTypeList[t]
          ? (globalConfig.wanTypeList_STATIC = !0)
          : "pppoe" == globalConfig.wanTypeList[t]
          ? (globalConfig.wanTypeList_PPPOE = !0)
          : "pptp" == globalConfig.wanTypeList[t]
          ? (globalConfig.wanTypeList_PPTP = !0)
          : "l2tp" == globalConfig.wanTypeList[t] &&
            (globalConfig.wanTypeList_L2TP = !0);
      var p = "0";
      if ("1" == e.langAutoFlag) {
        (globalConfig.langAutoFlag = !0), (i = cs.autoLang());
        for (var n = 0, a = 0; n < globalConfig.showLanguage.length; n++)
          if (globalConfig.showLanguage[n] == i) {
            a = 1;
            break;
          }
        0 == a && (i = "en");
        var r =
          "vn" ==
          (i = cs.isInArray(globalConfig.showLanguage, i)
            ? i
            : "1" == e.showAutoLang
            ? globalConfig.showLanguage[1]
            : globalConfig.showLanguage[0])
            ? "vi"
            : i;
        localStorage.setItem("lang", r), language.switch(r), (p = "1");
      } else e.defaultLang && ("vn" == (r = e.defaultLang) && (r = "vi"), localStorage.setItem("lang", r), language.switch(r), (p = "0"), (i = e.defaultLang));
      return (
        (globalConfig.autoDetectClass =
          "ru" == i ? "ru" : "uk" == i ? "uk" : ""),
        "1" == e.langAutoFlag &&
          i != e.defaultLang &&
          (((r = {}).lang = i),
          (r.langAutoFlag = p),
          uiPost.setLanguageCfg(r, function () {
            uiPost.getInitCfg(function (o) {
              globalConfig.helpUrl = o.helpUrl;
            });
          })),
        (l.main = (function () {
          try {
            var o =
              isPhoneDevice && 0 <= location.href.indexOf("/phone/")
                ? new Vue({
                    el: "#app",
                    template:
                      '                        <div>                            <div style="overflow-y: auto;overflow-x: hidden;" id="vue_mian_content">                                <phone-main></phone-main>                            </div>                            <phone-tool></phone-tool>                        </div>                        ',
                    lang: $.lang,
                    data: {
                      globalConfig: globalConfig,
                      menuShow: !1,
                      align: "",
                      mainClass: "",
                    },
                    beforeCreate: function () {
                      Number($(window).height()), $(window).width();
                    },
                    created: function () {},
                    components: { "phone-main": cs_main },
                    mounted: function () {
                      $(".system-content").css({
                        width: window.innerWidth + "px",
                        height: window.innerHeight - 18 + "px",
                      }),
                        $(document).ready(function () {
                          $("select").change(function () {
                            $("select").blur();
                          });
                        });
                    },
                  })
                : new Vue({
                    el: "#app",
                    template:
                      '                        <div class="container">                            <cstoto-header></cstoto-header>                            <div id="main_box" class="main-box" :align="align" style="overflow:auto;">                                <cstoto-basic-menu v-if="menuShow" ref="menu"></cstoto-basic-menu>                                <div ref="mainscren" style="clean:both;">\t\t\t    \t    <cstoto-main></cstoto-main>                                    <x-footer></x-footer>                                </div>                            </div>                            <x-tool></x-tool>                        </div>                        ',
                    lang: $.lang,
                    data: {
                      globalConfig: globalConfig,
                      menuShow: !1,
                      align: "",
                      mainClass: "",
                    },
                    created: function () {
                      $("body").addClass("color-tone-def");
                      var o = location.pathname.split("/")[1];
                      "basic" == o || "advance" == o
                        ? (this.menuShow = !0)
                        : (this.align = "center"),
                        (this.advChildMenus = this.getAdvMenu());
                    },
                    components: { "cstoto-main": cs_main },
                    mounted: function () {
                      selectIe(),
                        (this.$refs.mainscren.style.width =
                          window.innerWidth + "px"),
                        (this.$refs.mainscren.style.height =
                          window.innerHeight + "px");
                      var o,
                        e = document.querySelector(".basic-box, .advance-box");
                      e &&
                        ((o = this.$refs.menu.$el.offsetWidth),
                        (e.style.marginLeft = o + "px"),
                        (e.style.width = window.innerWidth - o + "px"),
                        (e.style.height =
                          window.innerHeight - 101 - 34 + "px")),
                        /Safari/.test(navigator.userAgent) &&
                          !/Chrome/.test(navigator.userAgent) &&
                          $(".topfun-box").css("display", "block");
                    },
                    methods: {
                      getAdvMenu: function () {
                        return {
                          network: [
                            {
                              href: "wan",
                              name: "wan",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode
                              ),
                            },
                            { href: "lan", name: "lan", support: !0 },
                            {
                              href: "ddns",
                              name: "DDNS",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode
                              ),
                            },
                            {
                              href: "iptv",
                              name: "IPTV",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode ||
                                "wisp" == globalConfig.opmode ||
                                !globalConfig.iptvSupport
                              ),
                            },
                            {
                              href: "ipv6",
                              name: "IPv6",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode ||
                                "wisp" == globalConfig.opmode ||
                                !globalConfig.ipv6Support
                              ),
                            },
                            {
                              href: "ussd",
                              name: "ussd",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode ||
                                !globalConfig.ussdSupport
                              ),
                            },
                            {
                              href: "message",
                              name: "message",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode ||
                                !globalConfig.messageSupport
                              ),
                            },
                            {
                              href: "https://k.ionewu.com/tt/?sn=xxx&mac=xxx",
                              name: "accelerate",
                              support: globalConfig.bandSpeedSupport,
                            },
                          ],
                          wifi: [
                            { href: "wifi", name: "basic", support: !0 },
                            {
                              href: "guest",
                              name: "guest",
                              support: "4g" != globalConfig.modelType,
                            },
                            {
                              href: "wifi_schedule",
                              name: "wifi_schedule",
                              support:
                                "gw" == globalConfig.opmode ||
                                "br" == globalConfig.opmode,
                            },
                            {
                              href: "acl",
                              name: "acl",
                              support: "4g" != globalConfig.modelType,
                            },
                            {
                              href: "wds",
                              name: "wds",
                              support: globalConfig.wdsSupport,
                            },
                            {
                              href: "wps",
                              name: "WPS",
                              support:
                                !(
                                  "br" == globalConfig.opmode ||
                                  "rpt" == globalConfig.opmode
                                ) && globalConfig.wpsSupport,
                            },
                            {
                              href: "advance",
                              name: "advance",
                              support:
                                !(
                                  "br" == globalConfig.opmode ||
                                  "rpt" == globalConfig.opmode
                                ) && "4g" != globalConfig.modelType,
                            },
                          ],
                          parental: [
                            { href: "parental", name: "parental", support: !0 },
                          ],
                          gamespeed: [
                            {
                              href: "gamespeed",
                              name: "gamespeed",
                              support: !0,
                            },
                          ],
                          appfilter: [
                            {
                              href: "appfilter",
                              name: "appfilter",
                              support: !0,
                            },
                          ],
                          qos: [
                            { href: "qos", name: "qos", support: !0 },
                            { href: "qos_set", name: "qos_set", support: !1 },
                            {
                              href: "smart_flow",
                              name: "smart_flow",
                              support: !1,
                            },
                            {
                              href: "ip_flow",
                              name: "ip_flow",
                              support:
                                "2.0" == globalConfig.qosVersion &&
                                globalConfig.ipFlowSupport,
                            },
                          ],
                          security: [
                            { href: "ipf", name: "ipf", support: !0 },
                            { href: "macf", name: "macf", support: !0 },
                            { href: "urlf", name: "urlf", support: !0 },
                          ],
                          nat: [
                            { href: "portfwd", name: "portfwd", support: !0 },
                            { href: "dmz", name: "dmz", support: !0 },
                            { href: "vpnpass", name: "vpnpass", support: !0 },
                          ],
                          vpn: [
                            {
                              href: "pptp",
                              name: "pptp",
                              support: globalConfig.pptpServerSupport,
                            },
                            {
                              href: "l2tp",
                              name: "l2tp",
                              support: globalConfig.l2tpServerSupport,
                            },
                            {
                              href: "openvpn",
                              name: "openvpn",
                              support: globalConfig.openVpnServerSupport,
                            },
                            {
                              href: "shadowsocks",
                              name: "shadowsocks",
                              support: globalConfig.ssrServerSupport,
                            },
                            {
                              href: "account",
                              name: "account",
                              support:
                                globalConfig.pptpServerSupport ||
                                globalConfig.l2tpServerSupport ||
                                globalConfig.openVpnServerSupport,
                            },
                          ],
                          storage: [
                            { href: "storage", name: "storage", support: !0 },
                          ],
                          service: [
                            { href: "remote", name: "remote", support: !0 },
                            {
                              href: "notice",
                              name: "notice",
                              support: globalConfig.noticeSupport,
                            },
                            {
                              href: "upnp",
                              name: "upnp",
                              support: globalConfig.upnpSupport,
                            },
                            { href: "schedule", name: "schedule", support: !0 },
                            {
                              href: "dos",
                              name: "dos",
                              support: "1" == globalConfig.addFlag,
                            },
                          ],
                          tools: [
                            {
                              href: "changepwd",
                              name: "changepwd",
                              support:
                                !globalConfig.sameSiteCookie &&
                                !globalConfig.projectOwnerTw,
                            },
                            { href: "time", name: "time", support: !0 },
                            { href: "config", name: "config", support: !0 },
                            { href: "upload", name: "firmware", support: !0 },
                            {
                              href: "diagnosis",
                              name: "diagnosis",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode
                              ),
                            },
                            {
                              href: "traceroute",
                              name: "traceroute",
                              support: !(
                                "br" == globalConfig.opmode ||
                                "rpt" == globalConfig.opmode
                              ),
                            },
                            {
                              href: "tcpdump",
                              name: "tcpdump",
                              support:
                                !(
                                  "br" == globalConfig.opmode ||
                                  "rpt" == globalConfig.opmode
                                ) && globalConfig.tcpdumpSupport,
                            },
                            {
                              href: "tr069_cfg",
                              name: "tr069_cfg",
                              support:
                                !(
                                  "br" == globalConfig.opmode ||
                                  "rpt" == globalConfig.opmode
                                ) && "1" == globalConfig.tr069Support,
                            },
                            { href: "syslog", name: "syslog", support: !0 },
                          ],
                          equipment: [
                            {
                              href: "route_table",
                              name: "route_table",
                              support:
                                (globalConfig.staticrouteSupport &&
                                  "0" != globalConfig.routeControl) ||
                                "1" == globalConfig.routeControl,
                            },
                            {
                              href: "static_route",
                              name: "static_route",
                              support: globalConfig.staticrouteSupport,
                            },
                            {
                              href: "staticdhcp",
                              name: "staticdhcp",
                              support: "4g" != globalConfig.modelType,
                            },
                            {
                              href: "repeater_table",
                              name: "repeater_table",
                              support: globalConfig.rptInfoSupport,
                            },
                          ],
                          vpncli: [
                            { href: "vpncli", name: "qos_set", support: !0 },
                            { href: "cert", name: "cert", support: !0 },
                          ],
                          acl_setting: [
                            {
                              href: "acl_setting",
                              name: "acl_setting",
                              support: !0,
                            },
                          ],
                        };
                      },
                    },
                  });
            !globalConfig.projectOwnerTw ||
              globalConfig.debug ||
              ~location.pathname.indexOf("login") ||
              window.setInterval(function () {
                300 < globalConfig.autoLogoutTimeout++ &&
                  uiPost.logout({}, function (o) {
                    setTimeout(function () {
                      location.href = "/login.html";
                    }, 500);
                  });
              }, 1e3);
          } catch (o) {
            globalConfig.debug || (location.href = "/error.html");
          }
          return o;
        })())
      );
    });
  })(window);

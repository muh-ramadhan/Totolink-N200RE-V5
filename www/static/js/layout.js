Vue.component("cstoto-header", {
  template:
    '    <div class="header-box def-b" :style="loginStyle">      <div class="logo-box">        <img src="/static/images/logo.png" v-if="globalConfig.hideLogo!=\'1\'">      </div>      <div class="topmenu-box" v-if="disLogin">        <div class="topmenu">          <ul>            <li v-for="head in basicfun">              <a :class="[head.class]" :style="head.style" :href="head.href">{{ lang_t(\'menu.\'+head.name) }}</a>            </li>          </ul>        </div>      </div>      <div class="lang-box">        <select class="lang-select" v-model="currentLang" @change="langChange" id="lang_value_set">          <option v-for="(_lang,v) in langUl" :value="v">{{ v == \'auto\' ? lang_t(\'common.auto\') : _lang }}</option>        </select>      </div>      <div class="topfun-box" v-if="disLogin">        <div class="topfun">          <ul>\t\t\t<li>              <a class="li-menu-icon" :class="[ledStyle]" @click="commonFun(\'led\')" :style="ledFont">LED</a>            </li>            <li v-if ="!globalConfig.sameSiteCookie">              <a class="li-menu-icon logout" @click="commonFun(\'logout\')">{{ lang_t(\'menu.logout\') }}</a>            </li>            <li>              <a class="li-menu-icon reboot" @click="commonFun(\'reboot\')">{{ lang_t(\'menu.reboot\') }}</a>            </li>          </ul>        </div>      </div>      <div class="topfun-box">      \t<span style="color:#FF0000;font-size: 16px;">{{ versionText }}</span>      </div>    </div>\t',
  data: function () {
    return {
      globalConfig: globalConfig,
      languages: languages,
      disLogin: !0,
      active: ["is_basic", "", ""],
      basicfun: [
        { href: "/sdwan.html", name: "sdwan", class: "sdwan" },
        { href: "/wizard.html", name: "wizard", class: "wizard" },
        { href: "/basic/index.html", name: "basic", class: "basic" },
        { href: "/advance/index.html", name: "advance", class: "advance" },
      ],
      lang: $.lang,
      lang_t: lang_t,
      currentLang: "cn",
      langUl: {},
      loginStyle: {},
      ledStyle: "led",
      ledFont: {},
    };
  },
  computed: {
    versionText: function () {
      var t = "";
      return (
        "2" == globalConfig.versionControlSupport
          ? (t = lang_t("index.sample_version"))
          : "0" == globalConfig.versionControlSupport &&
            (t = lang_t("index.test_version")),
        t
      );
    },
  },
  created: function () {
    var t = {};
    for (e in this.languages)
      cs.isInArray(this.globalConfig.showLanguage, e) &&
        (t[e] = this.languages[e]);
    if (
      ("gw" == this.globalConfig.opmode && (this.wechatShow = !0),
      (this.langUl = t),
      "/login.html" == location.pathname || "/telnet.html" == location.pathname)
    )
      (this.disLogin = !1), (this.loginStyle = { position: "static" });
    else {
      this.globalConfig.opmodeSupport &&
        this.basicfun.push({
          href: "/opmode.html",
          name: "opmode",
          class: "opmode",
        });
      var e,
        i = location.pathname.split("/")[1],
        n = "is_" + (i = -1 < i.indexOf(".html") ? i.split(".")[0] : i);
      for (e in ("gw" != this.globalConfig.opmode
        ? this.basicfun.splice(0, 2)
        : this.globalConfig.diffnetSupport || this.basicfun.splice(0, 1),
      this.basicfun))
        i == this.basicfun[e].name
          ? ((this.basicfun[e].class = this.basicfun[e].class + " " + n),
            (this.basicfun[e].style = { color: "#fff" }))
          : (this.basicfun[e].style = {}),
          (this.basicfun[e].href += get_token_from_url());
    }
    this.globalConfig.langAutoFlag && this.globalConfig.showAutoLang
      ? (this.currentLang = "auto")
      : (this.currentLang = localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "en"),
      this.globalConfig.ledStatus
        ? (this.ledStyle = "led")
        : (this.ledStyle = "led2"),
      ("vi" != this.currentLang && "vn" != this.currentLang) ||
        (cs.isInArray(globalConfig.showLanguage, "vi")
          ? (this.currentLang = "vi")
          : (this.currentLang = "vn"));
  },
  methods: {
    langChange: function () {
      var t,
        e = this.currentLang,
        i = "0",
        n = {};
      if ("auto" == e) {
        for (
          var a = cs.autoLang(),
            s = this.globalConfig.showLanguage,
            o = 0,
            l = 0;
          o < s.length;
          o++
        )
          if (s[o] == a) {
            l = 1;
            break;
          }
        0 == l && (a = "en"),
          "vn" ==
            (t = a =
              cs.isInArray(s, a)
                ? a
                : "1" == data.showAutoLang
                ? s[1]
                : s[0]) && (t = "vi"),
          language.switch(t),
          (i = "1");
      } else
        "vn" == (t = e) && (t = "vi"), language.switch(t), (i = "0"), (a = e);
      localStorage.setItem("lang", a),
        (n.lang = a),
        (n.langAutoFlag = i),
        (globalConfig.autoDetectClass =
          "ru" == a ? "ru" : "uk" == a ? "uk" : ""),
        uiPost.setLanguageCfg(n, function () {
          uiPost.getInitCfg(function (t) {
            globalConfig.helpUrl = t.helpUrl;
          });
        });
    },
    commonFun: function (t) {
      var e;
      "led" == t
        ? ((e = {}),
          (this.ledFont = { color: "#fff" }),
          (this.globalConfig.ledStatus = !this.globalConfig.ledStatus),
          this.globalConfig.ledStatus
            ? ((e.enable = "1"), (this.ledStyle = "led"))
            : ((e.enable = "0"), (this.ledStyle = "led-off")),
          uiPost.setLedCfg(e))
        : "logout" == t
        ? Cstool.Msg({
            content: this.lang_t("login.msg7"),
            type: "confirm",
            ok: function () {
              uiPost.logout(e, function (t) {
                setTimeout(function () {
                  location.href = "/login.html";
                }, 500);
              });
            },
          })
        : Cstool.Msg({
            content: this.lang_t("config.msg5"),
            type: "confirm",
            ok: function () {
              uiPost.RebootSystem(function (t) {
                (time = null != t.wtime && "" != t.wtime ? t.wtime : 100),
                  Cstool.Count(time, "js", function () {
                    location.href = "/login.html";
                  });
              });
            },
          });
    },
  },
}),
  Vue.component("cstoto-basic-menu", {
    template:
      '    <div class="menu-box def-b-2">      <div class="menu def-b-2 menu-pos" style="position:fixed;float:left;">        <ul>          <li v-for="(_menu,v) in menus" class="def-b-2-hover" v-if="_menu.display">            <a class="menu-icon" :class="[_menu.class]" :href="_menu.href">{{ lang_t(\'menu.\'+_menu.lang) }}</a>          </li>        </ul>      </div>    </div>\t',
    data: function () {
      return {
        globalConfig: globalConfig,
        menu: menu_basic,
        menus: [],
        lang: $.lang,
        lang_t: lang_t,
        network: ["wan", "lan", "ddns", "iptv", "ipv6", "ussd", "message"],
        wifi: [
          "wifi",
          "guest",
          "mul_guest",
          "wifi_schedule",
          "acl",
          "wps",
          "advance",
          "wds",
        ],
        parental: ["parental"],
        qos: ["qos", "qos_set", "smart_flow", "ip_flow"],
        security: ["ipf", "macf", "urlf"],
        nat: ["portfwd", "dmz", "vpnpass"],
        vpn: ["pptp", "l2tp", "account", "openvpn", "shadowsocks"],
        storage: ["storage"],
        tools: [
          "time",
          "changepwd",
          "config",
          "upload",
          "diagnosis",
          "traceroute",
          "tcpdump",
          "syslog",
          "tr069_cfg",
        ],
        equipment: [
          "static_route",
          "route_table",
          "staticdhcp",
          "repeater_table",
        ],
        service: ["notice", "upnp", "remote", "schedule", "dos"],
        vpncli: ["vpncli", "cert"],
        acl_setting: ["acl_setting"],
      };
    },
    created: function () {
      var t,
        e,
        i = [],
        n = location.pathname.split("/")[1],
        a = location.pathname.split("/")[2].split(".")[0];
      for (e in ("basic" == n
        ? ("br" == this.globalConfig.opmode || "rpt" == this.globalConfig.opmode
            ? (this.menu = menu_rpt_basic)
            : (this.menu = menu_basic),
          ("device" != a && "slave_status" != a) || (a = "index"))
        : "advance" == n &&
          ("br" == this.globalConfig.opmode || "rpt" == this.globalConfig.opmode
            ? (this.menu = menu_rpt_advance)
            : (this.menu = menu_advance)),
      "advance" == n &&
        (cs.isInArray(this.network, a)
          ? (a = "network")
          : cs.isInArray(this.wifi, a)
          ? (a = "wifi")
          : cs.isInArray(this.parental, a)
          ? (a = "parental")
          : cs.isInArray(this.qos, a)
          ? (a = "qos")
          : cs.isInArray(this.security, a)
          ? (a = "security")
          : cs.isInArray(this.nat, a)
          ? (a = "nat")
          : cs.isInArray(this.vpn, a)
          ? (a = "vpn")
          : cs.isInArray(this.storage, a)
          ? (a = "storage")
          : cs.isInArray(this.tools, a)
          ? (a = "tools")
          : cs.isInArray(this.equipment, a)
          ? (a = "equipment")
          : cs.isInArray(this.service, a)
          ? (a = "service")
          : cs.isInArray(this.vpncli, a)
          ? (a = "vpncli")
          : cs.isInArray(this.acl_setting, a) && (a = "acl_setting")),
      this.menu))
        (t = Number(e) + 1),
          i.push(this.menu[e]),
          "#" != this.menu[e].href &&
            null != this.menu[e].href &&
            (((!globalConfig.staticrouteSupport &&
              null == globalConfig.routeControl) ||
              (!globalConfig.staticrouteSupport &&
                "0" == globalConfig.routeControl)) &&
              "advance" == n &&
              "route_table" == this.menu[e].href &&
              (this.menu[e].href = "staticdhcp"),
            globalConfig.staticrouteSupport &&
              "0" == globalConfig.routeControl &&
              "route_table" == this.menu[e].href &&
              (this.menu[e].href = "static_route"),
            "pptp" != this.menu[e].href ||
              globalConfig.pptpServerSupport ||
              ((this.menu[e].href = "l2tp"), globalConfig.l2tpServerSupport) ||
              ((this.menu[e].href = "openvpn"),
              globalConfig.openVpnServerSupport) ||
              (this.menu[e].href = "shadowsocks"),
            globalConfig.projectOwnerTw &&
              "changepwd" == this.menu[e].href &&
              (this.menu[e].href = "time"),
            (i[e].href =
              "/" +
              n +
              "/" +
              this.menu[e].href +
              ".html" +
              get_token_from_url())),
          (i[e].id = String(t)),
          a == i[e].lang
            ? (i[e].class =
                this.menu[e].icon +
                " active def-b-2-active " +
                this.menu[e].icon +
                "_on")
            : (i[e].class = this.menu[e].icon);
      var s,
        o = [],
        l = !0;
      for (s in i) {
        if (((l = !0), "advance" == n)) {
          if (
            (this.globalConfig.appfilterSupport ||
              (0 <= i[s].href.indexOf("appfilter") && (l = !1)),
            globalConfig.aclServerSupport ||
              (0 <= i[s].href.indexOf("acl_setting") && (i[s].display = !1)),
            this.globalConfig.storageSupport ||
              (0 <= i[s].href.indexOf("storage") && (l = !1)),
            !(
              this.globalConfig.pptpServerSupport ||
              this.globalConfig.l2tpServerSupport ||
              this.globalConfig.openVpnServerSupport ||
              globalConfig.ssrServerSupport ||
              globalConfig.diffnetSupport
            ))
          )
            for (var r in this.vpn)
              if (0 <= i[s].href.indexOf(this.vpn[r])) {
                l = !1;
                break;
              }
          this.globalConfig.vpnCliSupport ||
            (0 <= i[s].href.indexOf("vpncli") && (l = !1)),
            this.globalConfig.staticrouteSupport ||
              "4g" != this.globalConfig.modelType ||
              (0 <= i[s].href.indexOf("route_table") && (l = !1));
        } else
          "basic" == n &&
            ("4g" == this.globalConfig.modelType &&
              0 <= i[s].href.indexOf("guest") &&
              (l = !1),
            this.globalConfig.qosVersion);
        this.globalConfig.gameSpeedSupport ||
          (0 <= i[s].href.indexOf("gamespeed") && (l = !1)),
          this.globalConfig.smartFlowSupport ||
            this.globalConfig.ipFlowSupport ||
            (0 <= i[s].href.indexOf("qos") && (l = !1)),
          (l =
            "mesh" != this.globalConfig.modelType &&
            0 <= i[s].href.indexOf("mesh")
              ? !1
              : l) && o.push(i[s]);
      }
      this.menus = o;
    },
  }),
  Vue.component("adv-child-menu", {
    template:
      '    <div class="tab-box" style="position:fixed;z-index:100;">      <div class="tab">      \t<ul>\t\t  <li v-for="(_menu,v) in childMenuOption" :key="v" v-if="_menu.support"><a :class="[_menu.class]" :id="\'tab_adv_id_\'+v" :target="_menu.target ? _menu.target:\'_self\'" @click="gotoUrl($event,_menu)">{{ _menu.show }}</a></li>      \t</ul>      </div>    </div>\t',
    props: { childType: { type: String, default: "" } },
    data: function () {
      return {
        globalConfig: globalConfig,
        lang: $.lang,
        lang_t: lang_t,
        menu: this.$root.advChildMenus,
        mac: "",
        sn: "",
      };
    },
    computed: {
      childMenuOption: function () {
        var t = [];
        if ("" != this.childType) {
          var e = this.menu;
          if (null != e[this.childType]) {
            var i,
              t = e[this.childType],
              n = location.pathname.match(/\/(\w+)\.html/)[1],
              a = /(?=.*?[A-Z])/;
            for (i in t)
              a.test(t[i].name)
                ? (t[i].show = t[i].name)
                : (t[i].show = this.lang_t("menu." + t[i].name)),
                "/advance/mul_guest.html" == n && (n = "/advance/guest.html"),
                (t[i].class = t[i].href == n ? "is_active" : ""),
                t[i].href &&
                  !~t[i].href.indexOf("http:") &&
                  (t[i].to =
                    "/advance/" + t[i].href + ".html" + get_token_from_url());
          }
        }
        return t;
      },
    },
    mounted: function () {
      var t,
        e = "";
      for (t in this.childMenuOption)
        (e += "#tab_adv_id_" + t),
          t != this.childMenuOption.length - 1 && (e += ",");
      $(e).on("mouseover", function (t) {
        $("#" + t.target.id).addClass("tab-active");
      }),
        $(e).mouseleave(function (t) {
          $("#" + t.target.id).removeClass("tab-active");
        });
    },
    created: function () {
      var e = this;
      "network" == this.childType &&
        globalConfig.bandSpeedSupport &&
        uiPost.getBandwidthGpeedCfg(function (t) {
          (e.mac = t.mac), (e.sn = t.SN);
        });
    },
    methods: {
      gotoUrl: function (t, e) {
        e.href && !/^http/.test(e.href)
          ? (t.target.href =
              "/advance/" + e.href + ".html" + get_token_from_url())
          : (t.target.href = e.href),
          t.target.click();
      },
    },
  }),
  Vue.component("x-help", {
    template:
      '\t\t<div class="help-main">\t  \t  <div>\t\t\t<div :class="[boxClass]" align="right">\t\t\t  <img src="/static/images/help.png" class="cursor" id="help_id">\t\t\t</div>\t\t\t<div class="help-content" v-show="helpShow" :style="contentTop" id="help_content_id">\t\t\t  <div class="help-text">\t\t\t\t<p>{{ text }}</p>\t\t\t  </div>\t\t\t</div>\t\t  </div>\t\t</div>\t',
    props: { text: { default: "" } },
    data: function () {
      return {
        helpShow: !1,
        boxClass: "help-box",
        contentTop: { top: "50px" },
      };
    },
    created: function () {},
    mounted: function () {
      var t = this;
      $("#help_id,#help_content_id").on("mouseover", function () {
        t.helpClick(1);
      }),
        $("#help_id,#help_content_id").on("mouseleave", function () {
          t.helpClick(0);
        });
    },
    methods: {
      helpClick: function (t) {
        this.helpShow = 1 == t;
      },
    },
  });
var _radio_name_ = 0,
  _radio_id_ = 0,
  _tempLoadFlag_ =
    (Vue.component("x-radio", {
      template:
        '\t\t<div>\t\t\t<div class="c-radio" v-for="(n,v) in radioName" :style="colStyle">\t\t\t    <input :id="karen_id+v" :name="karen_name" :value="n.dot" type="radio" v-model="k_value" :disabled="disabled" @change="activeClick">\t\t\t    <label :for="karen_id+v" class="radio-label">{{ lang_t(n.name) }}</label>\t\t\t</div>\t\t</div>\t',
      props: {
        status: { default: "0" },
        disabled: { type: Boolean, default: !1 },
        pos: { default: "row" },
        name: {
          type: Array,
          default: function () {
            return [];
          },
        },
        c_value: {
          type: Array,
          default: function () {
            return [];
          },
        },
      },
      model: { prop: "status", event: "change" },
      data: function () {
        return {
          radioName: [],
          colStyle: {},
          karen_id: "radio_id_",
          karen_name: "radio_n",
          k_value: "",
        };
      },
      watch: {
        status: function () {
          this.k_value = this.status;
        },
      },
      created: function () {
        if (
          ((this.karen_id += _radio_id_),
          (this.karen_name += _radio_name_),
          _radio_id_++,
          _radio_name_++,
          (this.k_value = this.status),
          0 == this.c_value.length)
        )
          for (var t in this.name)
            this.radioName.push({ name: this.name[t], dot: String(t) });
        else if (this.c_value.length == this.name.length)
          for (var t in this.name)
            this.radioName.push({ name: this.name[t], dot: this.c_value[t] });
      },
      mounted: function () {
        "col" == this.pos
          ? (this.colStyle = { display: "inline-block" })
          : (this.colStyle = { "margin-left": "0" });
      },
      methods: {
        activeClick: function () {
          this.disabled || this.$emit("change", this.k_value);
        },
      },
    }),
    Vue.directive("verify", {
      bind: function (i, n) {
        if (null != i.dataset.name && "object" == typeof n.value) {
          var e = i.dataset.name,
            a = void 0;
          if (/\d$/.test(e))
            e = e.replace(/\d+$/, function (t) {
              return (a = t), "";
            });
          else if (null == n.value[i.dataset.name]) return;
          function t(t) {
            n.value[e](
              t,
              function (t) {
                var e;
                null !=
                  (s = document.getElementById("verify_" + i.dataset.name)) &&
                  s.parentNode.removeChild(s),
                  null != t &&
                    "" != t &&
                    ((e = i),
                    "parent" == n.arg && (e = i.parentNode),
                    $(e).after(
                      '\t\t\t\t\t\t<div style="max-width:600px;;display:block;word-break: break-all;word-wrap: break-word;" class="error-msg-custom" id="verify_' +
                        i.dataset.name +
                        '">\t\t\t\t\t\t\t<p style="margin-top:1px;margin-bottom:1px;">\t\t\t\t\t\t\t\t<div class="c-icon-body">\t\t\t\t\t\t\t        <span class="c-icon">\t\t\t\t\t\t\t            <span class="error-icon" style="border-color:#FF6565;background:#FF6565;"></span>\t\t\t\t\t\t\t        </span>\t\t\t\t\t\t\t        <span style="color:#f00;">' +
                        t +
                        "</span>\t\t\t\t\t\t\t    </div>\t\t\t\t\t\t\t</p>\t\t\t\t\t\t</div>"
                    ));
              },
              a
            );
          }
          var s,
            o = "blur";
          null != i.dataset.type && (o = i.dataset.type);
          $(i).on(o, function () {
            t(i.value);
          }),
            $(document).ready(function () {
              $("#lang_value_set").change(function () {
                t(i.value);
              });
            });
        }
      },
    }),
    Vue.component("x-test", {
      template: '<div style="display:none;"></div>',
      methods: {
        verify: function (i, t, n, a) {
          $("input").blur();
          var s,
            o,
            l,
            e,
            r = !0,
            c = !1;
          for (e in ([].slice
            .call(document.querySelectorAll("[id]"))
            .map(function (t) {
              if (!r) return !1;
              if (0 <= (s = t.id).indexOf("verify_")) {
                for (var e in i) {
                  if (0 <= s.indexOf("verify_" + e)) {
                    c = !0;
                    break;
                  }
                  c = !1;
                }
                null != n
                  ? ((l = s.match(/\d+$/)),
                    (c = l && null != a ? l[0] != a : c) &&
                      (o = document.getElementById(s)).parentNode.removeChild(
                        o
                      ))
                  : 0 == c
                  ? (o = document.getElementById(s)).parentNode.removeChild(o)
                  : null != document.getElementById(s) && (r = !1);
              }
            }),
          i))
            if (null != document.getElementById("verify_" + e)) {
              r = !1;
              break;
            }
          if (null != n && r)
            for (var h in i) {
              for (var d = 0; d < n; d++)
                if (null != document.getElementById("verify_" + h + d)) {
                  r = !1;
                  break;
                }
              if (!r) break;
            }
          t(r);
        },
      },
    }),
    Vue.component("x-countdown", {
      template:
        "   \t<div class=\"dialog\" v-show=\"modal_show\">  \t  <div class=\"mask\"></div>      <div class=\"content\">        <h4 class=\"title\">{{title}}{{progress}}%</h4>         <div :style=\"{width: progress+'%','background-color': '#2ea8dc','border-radius': '10px',height:'20px','line-height': '20px'}\">         </div>      </div>  \t</div>    ",
      props: { percent: { default: 0 } },
      data: function () {
        return {
          lang: $.lang,
          lang_t: lang_t,
          progress: 0,
          upload: !0,
          callType: "",
          modal_show: !1,
        };
      },
      watch: {
        percent: function () {
          "js" != this.callType &&
            ((this.progress = this.percent), 100 <= this.progress) &&
            (this.modal_show = !1);
        },
      },
      computed: {
        title: function () {
          return this.upload
            ? this.lang_t("common.uploading")
            : "up" == this.callType
            ? this.lang_t("common.upgrading")
            : this.lang_t("common.loading");
        },
      },
      methods: {
        init: function (t, e, i) {
          var n = this,
            e =
              ((this.upload = !1),
              e instanceof Function && ((i = e), (e = "js")),
              (this.callType = e),
              (this.progress = 0),
              (this.modal_show = !0),
              (parseInt(t) / 100) * 1e3),
            a = setInterval(function () {
              if (99 <= n.progress) {
                if (
                  (clearInterval(a),
                  (n.modal_show = !1),
                  "function" != typeof i)
                )
                  return !1;
                i();
              }
              n.progress++;
            }, e);
        },
      },
    }),
    Vue.component("x-msg", {
      template:
        '\t\t<div v-show="msgShow">\t\t\t<div class="msg-back"></div>\t\t\t<div class="msg-box msg-box-body">\t\t\t\t<div class="msg-box-title" v-if="title != \'\'">{{ title }}</div>\t\t\t\t<div class="msg-box-content">{{ content }}</div>\t\t\t\t\x3c!--<span class="msg-box-close" @click="cancelFun">x</span>--\x3e\t\t\t\t<div class="msg-box-bottom" v-if="msgtype != \'no\'">\t\t\t\t\t<button class="msg-box-btn" @click="cancelFun" v-if="msgtype == \'confirm\'">{{ lang_t(\'common.cancel\') }}</button>\t\t\t\t\t<button class="msg-box-btn msg-info" @click="okFun">{{ lang_t(\'common.ok\') }}</button>\t\t\t\t</div>\t\t\t</div>\t\t</div>\t',
      props: {},
      data: function () {
        return {
          lang_t: lang_t,
          msgShow: !1,
          msgtype: "alert",
          title: "",
          content: "",
          ok: null,
          cancel: null,
        };
      },
      methods: {
        init: function (t) {
          (this.content = t.content),
            (this.title = t.title || ""),
            (this.msgtype = t.type || "alert"),
            "function" == typeof t.ok ? (this.ok = t.ok) : (this.ok = null),
            "function" == typeof t.cancel
              ? (this.cancel = t.cancel)
              : (this.cancel = null),
            t.time && this.timeFun(t.time),
            (this.msgShow = !0);
        },
        timeFun: function (t) {
          t = Number(t);
          var e = this;
          setTimeout(function () {
            e.msgShow = !1;
          }, 1e3 * t);
        },
        cancelFun: function () {
          null != this.cancel && this.cancel(), (this.msgShow = !1);
        },
        okFun: function () {
          null != this.ok && this.ok(), (this.msgShow = !1);
        },
      },
    }),
    null);
Vue.component("x-loading", {
  template:
    '  \t<div v-show="showWaiting" id="show_waiting" style="z-index: 10000;position: fixed;">\t\t<div class="msg-back"></div>\t\t<div class="msg-box" style="text-align: center;z-index: 10000;top: 120px;left: 500px;width: 350px;height: 98px;position: fixed;pointer-events: auto;" id="load_box_id">\t\t\t<div class="line-scale-pulse-out-rapid" style="padding: 12px;">\t\t\t\t<div></div>\t\t\t\t<div></div>\t\t\t\t<div></div>\t\t\t\t<div></div>\t\t\t\t<div></div>\t  \t\t</div>\t\t\t<span style="color: #2ea8dc;font-weight: bold;">{{ content }}</span>\t\t</div>\t</div>    ',
  props: { percent: { default: 0 } },
  data: function () {
    return {
      lang: $.lang,
      lang_t: lang_t,
      progress: 0,
      showWaiting: !1,
      content: lang_t("wan.wan_checking"),
    };
  },
  watch: {},
  computed: {},
  mounted: function () {
    cs.globalCenter("load_box_id");
  },
  methods: {
    init: function (t, e, i) {
      var n = this,
        i =
          ((this.showWaiting = !0),
          (this.progress = 0),
          (this.content = i || this.lang_t("wan.wan_checking")),
          (parseInt(t) / 100) * 1e3),
        a =
          (!0 === _tempLoadFlag_ && (i = 10),
          setInterval(function () {
            if (99 <= n.progress) {
              if (
                ((_tempLoadFlag_ = null),
                clearInterval(a),
                (n.showWaiting = !1),
                "function" != typeof e)
              )
                return !1;
              e();
            }
            !0 === _tempLoadFlag_
              ? (n.progress = 1)
              : !1 === _tempLoadFlag_
              ? (n.progress = 100)
              : n.progress++;
          }, i));
    },
  },
}),
  Vue.component("x-page", {
    template:
      '\t\t<div class="page-main" v-show="total>pageSize">\t\t\t<ul class="main">\t\t\t\t<li class="main-list">\t\t\t\t\t<ul class="page-page">\t\t\t\t\t\t<li :class="[\'dir\',dirdis[0]]" @click="dirclick(0)"><a><</a></li>\t\t\t\t\t\t<li v-for="(page,v) in pageShow" :class="[active[v]]" @click="pageclick(v)"><a>{{ page }}</a></li>\t\t\t\t\t\t<li :class="[\'dir\',dirdis[1]]" @click="dirclick(1)"><a>></a></li>\t\t\t\t\t</ul>\t\t\t\t</li>\t\t\t\t\x3c!--<li class="main-list">\t\t\t\t\t<div class="pagesize">\t\t\t\t\t\t<button class="btn btn-back" @click="sizelist">{{ pageSize }}</button>\t\t\t\t\t\t{{ lang_t("common.page") }} \t\t\t\t\t\t<ul class="list-menu place-top" v-show="sizeshow">\t\t\t\t\t\t\t<li v-for="(_size,v) in size" :class="sizeactive[v]" @click="sizeclick(_size)"><a>{{ _size }}</a></li>\t\t\t\t\t\t</ul>\t\t\t\t  \t</div>\t\t\t\t</li>--\x3e\t\t\t</ul>\t\t</div>\t',
    props: {
      current: { type: Number, default: 1 },
      total: { type: Number, default: 0 },
      data: {
        type: Array,
        default: function () {
          return [];
        },
      },
      size: {
        type: Array,
        default: function () {
          return [5, 10];
        },
      },
      pieces: { default: 5 },
    },
    data: function () {
      return {
        lang: $.lang,
        lang_t: lang_t,
        active: [],
        pageShow: 1,
        currentpage: 1,
        dirdis: ["", ""],
        pageSize: 5,
        sizeactive: [],
        sizeshow: !1,
        type: "total",
      };
    },
    watch: {
      total: function () {
        this.pageInit("total");
      },
      data: function () {
        this.pageInit("data"), this.submit(this.pageShow, this.currentpage - 1);
      },
    },
    created: function () {
      this.pageSize = this.pieces;
    },
    methods: {
      pageInit: function (t) {
        var e = 1,
          i = 0;
        "total" == (this.type = t)
          ? (i = this.total)
          : "data" == t && (i = this.data.length),
          i > this.pageSize && (e = Math.ceil(i / this.pageSize)),
          (this.pageShow = e),
          this.discheack(e),
          this.activecheack(this.currentpage - 1);
      },
      dirclick: function (t) {
        if (1 != this.pageShow) {
          if (0 == t) {
            if (1 == this.currentpage) return;
            this.currentpage--;
          } else {
            if (this.currentpage == this.pageShow) return;
            this.currentpage++;
          }
          this.submit(this.pageShow, this.currentpage - 1);
        }
      },
      pageclick: function (t) {
        (this.currentpage = t + 1), this.submit(this.pageShow, t);
      },
      activecheack: function (t) {
        this.active = [];
        for (var e = 0; e < this.pageShow; e++)
          this.active[e] = t == e ? "active" : "";
      },
      sizeactivecheack: function (t) {
        this.sizeactive = [];
        for (var e = 0; e < this.size.length; e++)
          this.size[e] == t
            ? (this.sizeactive[e] = "active")
            : (this.sizeactive[e] = "");
      },
      sizeclick: function (t) {
        this.sizeactivecheack(t),
          (this.pageSize = t),
          (this.sizeshow = !1),
          this.pageInit(this.type),
          this.submit(this.pageShow, 0),
          this.$emit("on-page-size", t);
      },
      sizelist: function () {
        this.sizeactivecheack(this.pageSize), (this.sizeshow = !this.sizeshow);
      },
      discheack: function (t) {
        (this.dirdis = []),
          1 == t
            ? (this.dirdis.splice(0, 0, "disabled"),
              this.dirdis.splice(1, 0, "disabled"))
            : 1 == this.currentpage
            ? (this.dirdis.splice(0, 0, "disabled"),
              this.dirdis.splice(1, 0, ""))
            : this.currentpage == t
            ? (this.dirdis.splice(0, 0, ""),
              this.dirdis.splice(1, 0, "disabled"))
            : (this.dirdis.splice(0, 0, ""), this.dirdis.splice(1, 0, ""));
      },
      submit: function (t, e) {
        this.activecheack(e), this.discheack(t);
        var e = (this.currentpage - 1) * this.pageSize,
          t = this.currentpage * this.pageSize;
        0 == this.data.length
          ? this.$emit("on-page", this.currentpage, e, t)
          : ((e = this.data.slice(e, t)),
            this.$emit("on-page", this.currentpage, e));
      },
    },
  }),
  Vue.directive("pass", {
    bind: function (t) {
      $(t).attr("autocomplete", "new-password"),
        "pass" == t.dataset.type
          ? $(t).on("focus", function () {
              $(this).prop("type", "password");
            })
          : ($(t).prop("type", "password"),
            $(t)
              .on("blur", function () {
                $(this).prop("type", "password");
              })
              .on("focus", function () {
                $(this).prop("type", "text");
              }));
    },
  }),
  Vue.component("x-apply-load", {
    template:
      '\t\t<div v-if="loadmsgShow">\t\t\t<div class="load-box load-box-body">\t\t\t\t<x-icon color="#96D6F2" door="apply" :styleName="{\'margin-top\':\'10px\'}"><span class="load-box-content">{{content}}</span></x-icon>\t\t\t</div>\t\t</div>\t',
    props: {},
    data: function () {
      return { lang_t: lang_t, loadmsgShow: !1, content: "", progress: 0 };
    },
    methods: {
      init: function (t, e) {
        var i = this,
          t =
            ((this.loadmsgShow = !0),
            (this.progress = 0),
            (this.content = this.lang_t("common.finish")),
            (parseInt(t) / 100) * 1e3),
          n = setInterval(function () {
            if (99 <= i.progress) {
              if (
                (clearInterval(n), (i.loadmsgShow = !1), "function" != typeof e)
              )
                return !1;
              e();
            }
            i.progress++;
          }, t);
      },
    },
  }),
  Vue.component("x-footer", {
    template:
      '\t\t<div class="footer-box" :style="footerStyle">        \t<div class="left" id="copy_right" v-show="supportShow">        \t\t<span v-html="copyRight"></span>        \t</div>            <div class="right" id="fm_version">            \t<span>{{lang_t("index.version")}}: {{ globalConfig.fmVersion }}</span>\t\t\t\t<span v-show="supportShow">&nbsp;&nbsp;|&nbsp;&nbsp;</span>        \t\t<span v-show="supportShow">\t        \t\t<a @click="hrefhelp">{{lang_t("index.support")}}</a>\t        \t</span>        \t</div>        </div>\t',
    data: function () {
      return {
        globalConfig: globalConfig,
        lang: $.lang,
        lang_t: lang_t,
        copyRight: "",
        supportShow: !1,
        footerStyle: {},
      };
    },
    methods: {
      hrefhelp: function () {
        window.open(this.globalConfig.helpUrl);
      },
    },
    mounted: function () {
      var t = location.pathname.split("/"),
        e = $("#copy_right").width(),
        i = e + $("#fm_version").width() + 100,
        n = window.innerWidth;
      ("basic" != t[1] && "advance" != t[1]) || (i -= 190),
        0 == e && (i += 100),
        (n = (n - i) / 2),
        ("basic" != t[1] && "advance" != t[1]) || (0 != e && (n = 290)),
        (this.footerStyle = { "padding-left": n + "px" });
    },
    created: function () {
      var t = new Date().getFullYear();
      (this.copyRight = this.globalConfig.copyRight.replace("[date]", t)),
        "1" != globalConfig.hideLogo && (this.supportShow = !0);
    },
  }),
  Vue.component("x-modal", {
    template:
      '\t\t<div v-show="modelShow">\t\t\t<div class="msg-back"></div>\t\t\t<div class="msg-box modal-box-body">\t\t\t\t<div class="msg-box-title" v-if="title != \'\'">{{ title }}</div>\t\t\t\t<div class="modal-box-content">\t\t\t\t\t<div v-if="show == \'\'">\t\t\t\t\t\t<slot></slot>\t\t\t\t\t</div>\t\t\t\t\t<div v-else style="overflow:hidden;overflow-y:auto;height:250px;padding:0;">\t\t\t\t\t\t<table class="t_table3 table-bordered table-striped table-tr-active" style="padding-bottom:0;margin-bottom:0;"><thead><th>ID</th><th v-if="mac">{{lang_t(\'rule.device_name\')}}</th><th v-if="ip">IP</th><th v-if="mac">MAC</th></thead><tbody><tr v-for="(data,v) in listData" @click="trClickFun(data,v)"><td>{{ v+1 }}</td><td v-if="mac">{{ data.name ? data.name : lang_t(\'common.aonymous_user\') }}</td><td v-if="ip">{{ data.ip }}</td><td v-if="mac">{{ data.mac }}</td></tr><tr v-show="listData.length==0"><td colspan="12">{{ lang_t(\'common.no_data\') }}</td></tr></tbody></table>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t\x3c!--<span class="msg-box-close" @click="cancelFun">x</span>--\x3e\t\t\t\t<div class="msg-box-bottom" v-if="type!=\'no\'">\t\t\t\t\t<button class="msg-box-btn" @click="cancelFun">{{ lang_t(\'common.off\') }}</button>\t\t\t\t\t<button class="msg-box-btn msg-info" @click="okFun" v-if="type == \'confirm\'">{{ ok_text }}</button>\t\t\t\t</div>\t\t\t</div>\t\t</div>\t',
    model: { prop: "modelShow", event: "change" },
    props: {
      title: { default: "" },
      type: { default: "" },
      modelShow: { type: Boolean, default: !1 },
      listData: {
        type: Array,
        default: function () {
          return [];
        },
      },
      show: { default: "" },
      ok_text: { default: lang_t("common.ok") },
    },
    data: function () {
      return {
        lang: $.lang,
        lang_t: lang_t,
        ip: !1,
        mac: !1,
        isactive: null,
        tempData: [],
      };
    },
    created: function () {
      this.show &&
        (0 <= this.show.indexOf("ip") && (this.ip = !0),
        0 <= this.show.indexOf("mac")) &&
        (this.mac = !0);
    },
    methods: {
      cancelFun: function () {
        this.$emit("change", !1), this.$emit("on-cancel");
      },
      okFun: function () {
        this.$emit("change", !1), this.$emit("on-ok");
      },
      trClickFun: function (t, e) {
        (this.isactive = e),
          (this.tempData = t).name || (t.name = ""),
          (t.name = t.name.slice(0, 20)),
          this.$emit("on-select", t),
          this.$emit("change", !1);
      },
    },
  }),
  Vue.component("x-ipv6-addr", {
    template:
      '\t\t<span>\t\t\t<span v-for="(v,ip) in 8"><input class="text2" v-model="addr[ip]" maxlength="4" @input="setValue"/><span v-if="ip!=7">:</span></span>\t\t</span>\t',
    data: function () {
      return { addr: [] };
    },
    props: {
      type: Array,
      ip: {
        default: function () {
          return [];
        },
      },
    },
    model: { prop: "ip", event: "change" },
    watch: {
      ip: function () {
        if (8 == this.ip.length) this.addr = this.ip;
        else for (var t = 0; t < 8; t++) this.addr[t] = "";
      },
    },
    methods: {
      setValue: function () {
        this.$emit("change", this.addr);
      },
    },
  }),
  Vue.component("x-time", {
    template:
      '\t\t<div>\t\t\t<div>\t\t\t  <span v-for="(i,v) in 7">\t\t\t\t<x-checkbox v-model="day[v]" :k_style="{\'margin-right\':\'3.6rem\'}" k_class="c-checkbox-k" :disabled="dayDis">{{ lang_t(\'rule.\'+weekArr[v]) }}</x-checkbox>\t\t\t  </span>\t\t\t  <span>\t\t\t\t<x-checkbox v-model="every" :k_style="{\'margin-right\':\'3.6rem\'}" k_class="c-checkbox-k" @change="allEvent">{{ lang_t(\'rule.every\') }}</x-checkbox>\t\t\t  </span>\t\t\t</div>\t\t\t<select v-model="st[0]" class="time-select3" @change="switchStr">\t\t\t  <option v-for="(i,v) in 24" :key="i" :value="v">{{ stringConver(v) }}</option>\t\t\t</select>\t\t\t : \t\t\t<select v-model="st[1]" class="time-select3" @change="switchStr">\t\t\t  <option v-for="(i,v) in 60" :key="i" :value="v">{{ stringConver(v) }}</option>\t\t\t</select>\t\t\t  -\t\t\t<select v-model="et[0]" class="time-select3" @change="switchStr">\t\t\t  <option v-for="(i,v) in 24" :key="i" :value="v">{{ stringConver(v) }}</option>\t\t\t</select>\t\t\t : \t\t\t<select v-model="et[1]" class="time-select3" @change="switchStr">\t\t\t  <option v-for="(i,v) in 60" :key="i" :value="v">{{ stringConver(v) }}</option>\t\t\t</select>\t\t</div>\t',
    data: function () {
      return {
        lang_t: lang_t,
        day: [],
        every: !1,
        dayDis: !1,
        st: [],
        et: [],
        weekArr: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      };
    },
    props: { time: { default: ",0:0,0:0" } },
    model: { prop: "time", event: "change" },
    watch: {
      time: function () {
        this.switchVal();
      },
      day: function (t) {
        (this.every = !(-1 < t.indexOf(!1))),
          (this.dayDis = this.every),
          this.switchStr();
      },
    },
    created: function () {
      this.switchVal();
    },
    methods: {
      switchVal: function () {
        var t = this.time.split(","),
          e =
            (7 <= t[0].split(";").length && (t[0] = "0"),
            (this.every = 0 == t[0] && "" != t[0]),
            (this.dayDis = this.every),
            t[0].split(";"));
        (this.st = t[1].split(":")), (this.et = t[2].split(":"));
        for (var i = 1; i <= 7; i++)
          0 <= e.indexOf(String(i)) || this.every
            ? (this.day[i - 1] = !0)
            : (this.day[i - 1] = !1);
      },
      switchStr: function () {
        for (var t = [], e = "", i = 0; i < 7; i++)
          this.day[i] && t.push(i + 1);
        return (
          this.every ? (e += "0") : (e += t.join(";")),
          (e += "," + this.st.join(":") + "," + this.et.join(":")),
          this.$emit("change", e),
          e
        );
      },
      allEvent: function () {
        this.dayDis = this.every;
        for (var t = 0; t < 7; t++) this.day[t] = this.every;
        this.switchStr();
      },
      stringConver: function (t) {
        return t < 10 ? "0" + t : t;
      },
    },
  }),
  (Vue.prototype.$timeVerify = function (t, e) {
    var t = t.split(","),
      i = t[1].split(":"),
      n = t[2].split(":"),
      a = i[0],
      s = n[0],
      i = i[1],
      n = n[1];
    return Number(a) > Number(s) ||
      (Number(a) == Number(s) && Number(i) >= Number(n))
      ? (Cstool.Msg({ content: this.lang_t("rule.msg28") }), !1)
      : "0" == a && "0" == i && "0" == s && "0" == n
      ? (Cstool.Msg({ content: this.lang_t("rule.msg33") }), !1)
      : "" == t[0]
      ? (Cstool.Msg({ content: this.lang_t("rule.msg41") }), !1)
      : "function" != typeof e || !1 !== e();
  }),
  (Vue.prototype.$timeConver = function (t) {
    if (!t) return "";
    var e,
      i = "",
      n = (t = t.split(","))[0].split(";");
    for (e in (n = 7 <= n.length ? ["0"] : n))
      "1" == n[e]
        ? (i += this.lang_t("rule.mon") + ",")
        : "2" == n[e]
        ? (i += this.lang_t("rule.tue") + ",")
        : "3" == n[e]
        ? (i += this.lang_t("rule.wed") + ",")
        : "4" == n[e]
        ? (i += this.lang_t("rule.thu") + ",")
        : "5" == n[e]
        ? (i += this.lang_t("rule.fri") + ",")
        : "6" == n[e]
        ? (i += this.lang_t("rule.sat") + ",")
        : "7" == n[e]
        ? (i += this.lang_t("rule.sun") + ",")
        : "0" == n[e] && (i += this.lang_t("rule.every") + ",");
    return (i += " " + cs.checkTime(t[1]) + "   --   " + cs.checkTime(t[2]));
  }),
  Vue.component("x-tool", {
    template:
      '\t\t<div>\t\t\t<x-msg ref="Msg"></x-msg>            <x-test ref="verifi"></x-test>            <x-loading ref="loadMsg"></x-loading>            <x-apply-load ref="applyLoad"></x-apply-load>            <x-countdown ref="Countmsg"></x-countdown>\t\t</div>\t',
    mounted: function () {
      (Cstool.Msg = this.$refs.Msg.init),
        (Cstool.Count = this.$refs.Countmsg.init),
        (Cstool.Verify = this.$refs.verifi.verify),
        (Cstool.loadMsg = this.$refs.loadMsg.init),
        (Cstool.applyLoad = this.$refs.applyLoad.init);
    },
  });

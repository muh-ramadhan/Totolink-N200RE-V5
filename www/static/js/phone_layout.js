Vue.component("phone-back", {
  template:
    '    <div class="btn-header-back" style="text-align:center;margin-top:11px;color:#fff;font-size:25px;">    \t<span style="margin-right: 30px;">{{ title }}</span>\t    <img src="/static/images/phone/back.png" style="float:left;margin:11px 0 0 17px;" @click="backFun">\t</div>\t',
  props: {
    title: { default: "" },
    url: { default: "" },
    type: { default: "" },
  },
  data: function () {
    return {};
  },
  mounted: function () {
    var n = this;
    this.sizeAuto(),
      window.addEventListener(
        "orientationchange",
        function (t) {
          n.sizeAuto();
        },
        !1
      );
  },
  methods: {
    backFun: function () {
      "custom" == this.type
        ? this.$emit("on-click")
        : (location.href = this.url + get_token_from_url());
    },
    sizeAuto: function () {
      var t = $(window).height();
      t < 629 && 395 <= t
        ? $(".btn-header-back-main").css("height", 0.08 * t + "px")
        : t < 395
        ? $(".btn-header-back-main").css("height", 0.15 * t + "px")
        : $(".btn-header-back-main").css("height", 0.05 * t + "px"),
        setTimeout(function () {}, 150);
    },
  },
}),
  Vue.component("white-header", {
    template:
      '    <div class="header-main">        <div class="main-content">            <div class="main-img">                <img :src="imgSrc" :style="myStyle" align="absmiddle" />            </div>            <div class="main-text">                <span style="margin-top:0px;margin-bottom:20px;">{{ title }}</span>            </div>            <slot></slot>        </div>    </div>\t',
    props: {
      title: { default: "" },
      imgSrc: { default: "" },
      isBack: { type: Boolean, default: !1 },
      myStyle: {
        default: function () {
          return {};
        },
      },
    },
    data: function () {
      return {};
    },
    mounted: function () {
      var n = this;
      this.sizeAuto(),
        window.addEventListener(
          "orientationchange",
          function (t) {
            n.sizeAuto();
          },
          !1
        );
    },
    methods: {
      sizeAuto: function () {
        var t = this,
          n = $(window).height(),
          i = 0.08 * n + "px";
        n < 629 && 395 <= n
          ? (i = 0.12 * n + "px")
          : n < 395 && (i = 0.17 * n + "px"),
          $(".header-main").css("height", i),
          $(".header-main").css("lineHeight", i),
          setTimeout(function () {
            $(".header-main").css("width", document.body.offsetWidth + "px"),
              t.isBack &&
                $(".header-main").css(
                  "margin-top",
                  $(".btn-header-back-main").height() + "px"
                );
          }, 150);
      },
    },
  });
var _tempStopLoad_ = null;
Vue.component("PhoneMark", {
  template:
    '\t<div class="main-mark" v-if="markShow">\t\t<div v-if="markType == \'msg\'">\t\t\t<div class="main-mark-content">{{ content }}</div>\t\t\t<div class="main-footer double" v-if="longText == \'\'">\t\t\t\t<button class="btn btn-cancel" @click="noFun">{{ cancelText }}</button>\t\t\t\t<button class="btn" @click="okFun">{{ okText }}</button>\t\t  \t</div>\t  \t\t<div class="main-footer single" v-else>\t\t\t\t<button class="btn" @click="okFun">{{ longText }}</button>\t\t  \t</div>\t  \t</div>\t  \t<div v-else-if="markType == \'load\' && loadShow">\t\t\t<div class="main-mark-msg-box">\t\t\t\t<div class="line-scale-pulse-out-rapid" style="padding: 12px;">\t\t\t\t\t<div></div>\t\t\t\t\t<div></div>\t\t\t\t\t<div></div>\t\t\t\t\t<div></div>\t\t\t\t\t<div></div>\t\t  \t\t</div>\t\t\t\t<span style="color: #fff;font-size: 14px;">{{ content }}</span>\t\t\t</div>\t\t</div>\t</div>\t',
  data: function () {
    return {
      lang: $.lang,
      lang_t: lang_t,
      ok: null,
      cancel: null,
      content: "",
      markShow: !1,
      markType: "msg",
      loadShow: !1,
      okText: lang_t("common.confirm"),
      cancelText: lang_t("common.cancel"),
      longText: "",
    };
  },
  mounted: function () {
    $(window).height() < 400 &&
      ($(".main-mark-content").css({
        "margin-bottom": "10%",
        "margin-top": "10%",
      }),
      setTimeout(function () {
        $(".main-mark-msg-box").css("margin-top", "10%");
      }, 900));
  },
  methods: {
    init: function (t) {
      if (
        ((this.content = t.content || ""),
        (this.markType = t.type || "msg"),
        "load" == this.markType)
      )
        if ("function" == typeof t.loading) this.loadingFun(t.loading, t.time);
        else {
          if (!t.time) return !1;
          var n = null;
          "function" == typeof t.success && (n = t.success),
            this.loadFun(t.time, n);
        }
      t.c_text && (this.cancelText = t.c_text),
        t.o_text && (this.okText = t.o_text),
        (this.longText = t.l_text || ""),
        "function" == typeof t.ok ? (this.ok = t.ok) : (this.ok = null),
        "function" == typeof t.cancel
          ? (this.cancel = t.cancel)
          : (this.cancel = null),
        this.showFun();
    },
    loadFun: function (t, n) {
      var i = this,
        e = 1e3,
        o =
          (!0 === _tempStopLoad_ && (e = 10),
          setInterval(function () {
            t <= 0
              ? ((_tempStopLoad_ = null),
                clearInterval(o),
                i.hideFun(),
                null != n && n())
              : !0 === _tempStopLoad_
              ? (t = 100)
              : !1 === _tempStopLoad_
              ? (t = 0)
              : t--;
          }, e));
    },
    loadingFun: function (t, n) {
      var i = this,
        e =
          ("number" != typeof n && (n = 10),
          t("start"),
          setInterval(function () {
            n <= 0
              ? (clearInterval(e), i.hideFun(), t("timeout"))
              : "stop" == t("start")
              ? (clearInterval(e), i.hideFun())
              : n--;
          }, 1e3));
    },
    showFun: function () {
      var t = this;
      (this.markShow = !0),
        "load" == this.markType && (this.loadShow = !0),
        $("#vue_mian_content").addClass("main-mark-blur"),
        setTimeout(function () {
          (t.markShow = !0), "load" == t.markType && (t.loadShow = !0);
        }, 2);
    },
    hideFun: function () {
      (this.markShow = !1),
        "load" == this.markType && (this.loadShow = !1),
        $("#vue_mian_content").removeClass("main-mark-blur");
    },
    okFun: function () {
      null != this.ok && this.ok(), this.hideFun();
    },
    noFun: function () {
      null != this.cancel && this.cancel(), this.hideFun();
    },
  },
}),
  Vue.component("PhoneFlag", {
    template:
      '\t<div class="main-flag" style="padding-top:0%" v-if="flagShow">\t\t<div class="toper"><div class="btn-header-back" style="padding-top: 11px;">\t\t    <img src="/static/images/phone/back.png" @click="backFun" style="float: left; margin: 11px 0px 0px 17px;">\t\t    <span style="margin-right: 30px;font-size:25px;">{{ title }}</span>\t\t </div>\t\t<div :style="{\'margin-top\': flagTop,\'white-space\': \'pre-line\'}">\t\t\t<img src="/static/images/phone/wait.png" v-if="type==\'wait\'">\t\t\t<x-icon size="5.2" :styleName="{\'margin-bottom\':\'50px\',\'margin-top\':\'50px\'}" v-else></x-icon>\t\t\t<p>&nbsp;</p>\t\t\t<p style="color:#818181">{{ content }}</p>\t\t\t<div class="main-footer single" v-if="btnText != \'\'">\t\t\t\t<button class="btn" style="margin: 10%;width: 80%;"@click="btnClickFun">{{ btnText }}</button>\t\t  \t</div>\t  \t</div>\t</div>\t',
    data: function () {
      return {
        lang: $.lang,
        lang_t: lang_t,
        title: "",
        content: "",
        url: "",
        flagShow: !1,
        flagTop: "20%",
        btnText: "",
        btnFun: null,
        type: "success",
      };
    },
    created: function () {
      $(window).height() < 400 && (this.flagTop = "10%");
    },
    mounted: function () {},
    methods: {
      init: function (t) {
        (this.title = t.title || ""),
          (this.content = t.content || ""),
          (this.url = t.url || ""),
          (this.btnText = t.btnText || ""),
          "wait" == t.type ? (this.type = "wait") : (this.type = "success"),
          "function" == typeof t.ok
            ? (this.btnFun = t.ok)
            : (this.btnFun = null),
          (this.flagShow = !0);
        var n = this;
        setTimeout(function () {
          n.flagShow = !0;
        }, 5);
      },
      backFun: function () {
        "" == this.url
          ? (this.flagShow = !1)
          : (location.href = this.url + get_token_from_url());
      },
      btnClickFun: function () {
        null != this.btnFun && this.btnFun(),
          "" == this.url
            ? (this.flagShow = !1)
            : (location.href = this.url + get_token_from_url()),
          (this.flagShow = !1);
      },
    },
  }),
  Vue.directive("pass", {
    bind: function (t) {
      "pass" == t.dataset.type
        ? $(t).on("focus", function () {
            $(this).prop("type", "password"),
              setTimeout(function () {
                $(t).trigger("click");
              }, 50);
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
  Vue.component("phone-tool", {
    template:
      '\t\t<div>\t\t\t<PhoneMark ref="mark_refs"></PhoneMark>            <PhoneFlag ref="flag_refs"></PhoneFlag>\t\t</div>\t',
    mounted: function () {
      (Cstool.Mark = this.$refs.mark_refs.init),
        (Cstool.Flag = this.$refs.flag_refs.init);
    },
  });

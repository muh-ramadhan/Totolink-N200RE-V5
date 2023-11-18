var showLanguage = [],
  lang_select = "",
  initData = {},
  token = "",
  languages = {
    auto: "自动检测",
    en: "English",
    cn: "简体中文",
    ct: "繁體中文",
    ru: "русский",
    vn: "Tiếng Việt",
    vi: "Tiếng Việt",
    jp: "日本語",
    kr: "한국어",
    es: "El español",
    de: "Deutsch",
    th: "ภาษาไทย",
    fr: "Français",
    uk: "Українська",
  };
function autoText(a) {
  var e = "Auto";
  return (
    "ct" == a
      ? (e = "自動偵測")
      : "cn" == a
      ? (e = "自动检测")
      : "ru" == a
      ? (e = "Авто")
      : "vn" == a || "vi" == a
      ? (e = "Tự động")
      : "uk" == a && (e = "Авто"),
    e
  );
}
function changeLanguage() {
  var a = kr.get("language"),
    e = "0",
    a =
      ("auto" == a && ((a = getAuto()), (e = "1")),
      getLanguage(a),
      processText(),
      "1" == initData.showAutoLang &&
        (kr.elm("language").options[0].innerHTML = autoText(a)),
      0 <= location.href.indexOf("wan_ie.html") && linkType(),
      { topicurl: "setLanguageCfg", token: token, lang: a, langAutoFlag: e });
  kr.request({ type: "POST", url: "/cgi-bin/cstecgi.cgi", data: a });
}
function getAuto() {
  var a = (
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      navigator.systemLanguage
    ).toLowerCase(),
    e = initData.showLanguage,
    n = !1;
  if ("zh-tw" == a || "zh-hk" == a) a = "ct";
  else if ("zh-cn" == a || "zh" == a || "zh-sg" == a) a = "cn";
  else if ("en" == a || "en-us" == a || "en-gb" == a) a = "en";
  else if ("ja" == a) a = "jp";
  else if ("be" == a || "ru" == a || "ru-md" == a || "ru-ru" == a) a = "ru";
  else if ("vi" == a || "vn" == a || "vi-vn" == a) {
    for (var t = 0; t < e.length; t++)
      if ("vn" === e[t]) {
        n = !0;
        break;
      }
    a = n ? "vn" : "vi";
  }
  return a;
}
function get_token_from_url() {
  var a,
    e,
    n,
    t = location.href.split("?"),
    g = "";
  if (1 < t.length)
    for (e = t[1].split("&"), a = 0; a < e.length; a++)
      if ("token" == (n = e[a].split("="))[0]) {
        g = n[1];
        break;
      }
  return "" != g ? g : "";
}
window,
  kr.request({
    type: "POST",
    url: "/cgi-bin/cstecgi.cgi",
    async: !1,
    data: { topicurl: "getInitCfg" },
    success: function (a) {
      (showLanguage = (initData = a).showLanguage.split(",")),
        (token = initData.token);
      var e = initData.defaultLang,
        n = !1;
      "1" == initData.showAutoLang &&
        (showLanguage.splice(0, 0, "auto"),
        "1" == initData.langAutoFlag && ((e = getAuto()), (n = !0)),
        (languages.auto = autoText(e))),
        (lang_select = '<select id="language" onchange="changeLanguage()">');
      for (var t = 0; t < showLanguage.length; t++)
        for (var g in languages)
          showLanguage[t] == g &&
            (lang_select +=
              ("auto" == g && n) || (e == g && !n)
                ? '<option value="' +
                  g +
                  '" selected>' +
                  languages[g] +
                  "</option>"
                : '<option value="' + g + '">' + languages[g] + "</option>");
      (lang_select += "</select>"), getLanguage(e);
    },
  });

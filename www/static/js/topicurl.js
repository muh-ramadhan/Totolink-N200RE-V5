!(function (t) {
  var i = function (t) {
    return (
      (i.onprogress = t),
      function () {
        var t = $.ajaxSettings.xhr();
        return (
          "function" == typeof i.onprogress &&
            i.onprogress &&
            t.upload &&
            (t.upload.onprogress = i.onprogress),
          t
        );
      }
    );
  };
  function o() {
    this.upload = function (o) {
      var t = new FormData();
      t.append("file", o.data),
        $.ajax({
          url: o.url,
          data: t,
          type: "Post",
          dataType: "json",
          cache: !1,
          processData: !1,
          contentType: !1,
          xhr: i(function (t) {
            (t = t.loaded / t.total), (t = parseInt(100 * t));
            "function" == typeof o.progress && o.progress(t);
          }),
          success: function (t) {
            "function" == typeof o.success && o.success(t);
          },
          error: function (t) {
            "function" == typeof o.error && o.error(t);
          },
        });
    };
  }
  (o.prototype.fileUpload = function (t) {
    return this.upload(t);
  }),
    (t.upload = new o());
})(window),
  (function (t) {
    function o() {
      var r;
      (this.version = "1.0"),
        (this.author = "carystudio"),
        (this.company = "carystudio"),
        (this.srcUrl = globalConfig.cgiUrl),
        (this.url = globalConfig.cgiUrl),
        (this.type = globalConfig.ajaxType ? "GET" : "POST"),
        (this.async = null),
        (this.topicurl = ""),
        (this.post = function (i, s) {
          i && i instanceof Function && ((s = i), (i = null)),
            ((i = i || {}).topicurl = this.topicurl),
            -1 != get_token_from_url().indexOf("token=")
              ? (i.token = get_token_from_url_split())
              : (i.token = get_token_from_url()),
            (i = JSON.stringify(i)),
            globalConfig.debug && (this.srcUrl = this.url);
          var e,
            t = !0;
          return (
            null != this.async && (t = !1),
            /^(set|del)/.test(i.topicurl) &&
              (globalConfig.autoLogoutTimeout = 0),
            $.ajax({
              url: this.srcUrl + get_token_from_url(),
              type: this.type,
              topicurl: this.topicurl,
              dataType: "json",
              data: i,
              jsonp: !1,
              async: t,
              success: function (t) {
                var o;
                if (null != t.errcode && t.errcode < 0)
                  return (
                    (o = location.href),
                    (location.href = "http://" + o.split("/")[2]),
                    0
                  );
                ("getInitCfg" != this.topicurl &&
                  "getLoginCfg" != this.topicurl) ||
                  autoLogout(),
                  (e = t),
                  s && s instanceof Function && (r = s(e, i));
              },
              error: function (t) {
                s && s instanceof Function && s(t, "error");
              },
            }),
            r
          );
        });
    }
    (o.prototype.getSysStatusCfg = function (t, o) {
      return (
        (this.topicurl = "getSysStatusCfg"),
        (this.url = "/data/sysinfo.json"),
        this.post(t, o)
      );
    }),
      (o.prototype.getNetInfoCfg = function (t, o) {
        return (
          (this.topicurl = "getNetInfoCfg"),
          (this.url = "/data/net_info.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getInitCfg = function (t, o) {
        return (
          (this.topicurl = "getInitCfg"),
          (this.url = "/data/init.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getWizardCfg = function (t, o) {
        return (
          (this.topicurl = "getWizardCfg"),
          (this.url = "/data/wizard.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWizardCfg = function (t, o) {
        return (this.topicurl = "setWizardCfg"), this.post(t, o);
      }),
      (o.prototype.getWanCfg = function (t, o) {
        return (
          (this.topicurl = "getWanCfg"),
          (this.url = "/data/wan.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWanCfg = function (t, o) {
        return (this.topicurl = "setWanCfg"), this.post(t, o);
      }),
      (o.prototype.getStationMacByIp = function (t, o) {
        return (
          (this.topicurl = "getStationMacByIp"),
          (this.url = "/data/station_mac.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.discoverWan = function (t, o) {
        return (
          (this.topicurl = "discoverWan"),
          (this.url = "/data/discover.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getLanCfg = function (t, o) {
        return (
          (this.topicurl = "getLanCfg"),
          (this.url = "/data/lan.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setLanCfg = function (t, o) {
        return (this.topicurl = "setLanCfg"), this.post(t, o);
      }),
      (o.prototype.getPptpServerCfg = function (t, o) {
        return (
          (this.topicurl = "getPptpServerCfg"),
          (this.url = "/data/pptp.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setPptpServerCfg = function (t, o) {
        return (this.topicurl = "setPptpServerCfg"), this.post(t, o);
      }),
      (o.prototype.getL2tpServerCfg = function (t, o) {
        return (
          (this.topicurl = "getL2tpServerCfg"),
          (this.url = "/data/l2tp.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setL2tpServerCfg = function (t, o) {
        return (this.topicurl = "setL2tpServerCfg"), this.post(t, o);
      }),
      (o.prototype.getVpnAccountCfg = function (t, o) {
        return (
          (this.topicurl = "getVpnAccountCfg"),
          (this.url = "/data/account.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setVpnAccountCfg = function (t, o) {
        return (this.topicurl = "setVpnAccountCfg"), this.post(t, o);
      }),
      (o.prototype.delVpnAccountCfg = function (t, o) {
        return (this.topicurl = "delVpnAccountCfg"), this.post(t, o);
      }),
      (o.prototype.getStaticDhcpRules = function (t, o) {
        return (
          (this.topicurl = "getStaticDhcpRules"),
          (this.url = "/data/staticdhcp.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setStaticDhcpRules = function (t, o) {
        return (this.topicurl = "setStaticDhcpRules"), this.post(t, o);
      }),
      (o.prototype.delStaticDhcpRules = function (t, o) {
        return (this.topicurl = "delStaticDhcpRules"), this.post(t, o);
      }),
      (o.prototype.getWiFiEasyCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiEasyCfg"),
          (this.url = "/data/wifi.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiEasyCfg = function (t, o) {
        return (this.topicurl = "setWiFiEasyCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiBasicCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiBasicCfg"),
          0 == t.wifiIdx
            ? (this.url = "/data/wifi2.json")
            : 1 == t.wifiIdx
            ? (this.url = "/data/wifi5.json")
            : 2 == t.wifiIdx && (this.url = "/data/wifi5_2.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiBasicCfg = function (t, o) {
        return (this.topicurl = "setWiFiBasicCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiEasyGuestCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiEasyGuestCfg"),
          (this.url = "/data/guest.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiEasyGuestCfg = function (t, o) {
        return (this.topicurl = "setWiFiEasyGuestCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiGuestCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiGuestCfg"),
          0 == t.wifiIdx
            ? (this.url = "/data/guest2.json")
            : 1 == t.wifiIdx
            ? (this.url = "/data/guest5.json")
            : 2 == t.wifiIdx && (this.url = "/data/guest5_2.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiGuestCfg = function (t, o) {
        return (this.topicurl = "setWiFiGuestCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiAdvancedCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiAdvancedCfg"),
          0 == t.wifiIdx
            ? (this.url = "/data/advanced2.json")
            : 1 == t.wifiIdx
            ? (this.url = "/data/advanced5.json")
            : 2 == t.wifiIdx && (this.url = "/data/advanced5_2.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiAdvancedCfg = function (t, o) {
        return (this.topicurl = "setWiFiAdvancedCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiAclRules = function (t, o) {
        return (
          (this.topicurl = "getWiFiAclRules"),
          0 == t.wifiIdx
            ? (this.url = "/data/acl2.json")
            : 1 == t.wifiIdx
            ? (this.url = "/data/acl5.json")
            : 2 == t.wifiIdx && (this.url = "/data/acl5_2.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiAclRules = function (t, o) {
        return (this.topicurl = "setWiFiAclRules"), this.post(t, o);
      }),
      (o.prototype.delWiFiAclRules = function (t, o) {
        return (this.topicurl = "delWiFiAclRules"), this.post(t, o);
      }),
      (o.prototype.getWiFiEasyScheduleCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiEasyScheduleCfg"),
          (this.url = "/data/wifi_schedule.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiEasyScheduleCfg = function (t, o) {
        return (this.topicurl = "setWiFiEasyScheduleCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiScheduleCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiScheduleCfg"),
          (this.url = "/data/wifi_schedule2.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiScheduleCfg = function (t, o) {
        return (this.topicurl = "setWiFiScheduleCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiWpsCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiWpsCfg"),
          (this.url = "/data/wps.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiWpsCfg = function (t, o) {
        return (this.topicurl = "setWiFiWpsCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiWpsStatus = function (t, o) {
        return (
          (this.topicurl = "getWiFiWpsStatus"),
          (this.url = "/data/wps_status.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiWpsStart = function (t, o) {
        return (this.topicurl = "setWiFiWpsStart"), this.post(t, o);
      }),
      (o.prototype.getGenerateWiFiWpsPin = function (t, o) {
        return (
          (this.topicurl = "getGenerateWiFiWpsPin"),
          (this.url = "/data/wps_pin.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getWiFiApcliScan = function (t, o) {
        return (
          (this.topicurl = "getWiFiApcliScan"),
          (this.url = "/data/apcliscan.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getWiFiSignalCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiSignalCfg"),
          (this.url = "/data/wifi_signal.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiSignalCfg = function (t, o) {
        return (this.topicurl = "setWiFiSignalCfg"), this.post(t, o);
      }),
      (o.prototype.getStorageCfg = function (t, o) {
        return (
          (this.topicurl = "getStorageCfg"),
          (this.url = "/data/storage.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setStorageCfg = function (t, o) {
        return (this.topicurl = "setStorageCfg"), this.post(t, o);
      }),
      (o.prototype.getSyslogCfg = function (t, o) {
        return (
          (this.topicurl = "getSyslogCfg"),
          (this.url = "/data/syslog.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setSyslogCfg = function (t, o) {
        return (this.topicurl = "setSyslogCfg"), this.post(t, o);
      }),
      (o.prototype.clearSyslog = function (t, o) {
        return (this.topicurl = "clearSyslog"), this.post(t, o);
      }),
      (o.prototype.showSyslog = function (t, o) {
        return (
          (this.topicurl = "showSyslog"),
          (this.url = "/data/syslog.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.FirmwareUpgrade = function (t, o) {
        return (
          (this.topicurl = "FirmwareUpgrade"),
          (this.url = "/data/firmware_info.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setUpgradeFW = function (t, o) {
        return (this.topicurl = "setUpgradeFW"), this.post(t, o);
      }),
      (o.prototype.CloudACMunualUpdate = function (t, o) {
        return (this.topicurl = "CloudACMunualUpdate"), this.post(t, o);
      }),
      (o.prototype.LoadDefSettings = function (t, o) {
        return (this.topicurl = "LoadDefSettings"), this.post(t, o);
      }),
      (o.prototype.RebootSystem = function (t, o) {
        return (this.topicurl = "RebootSystem"), this.post(t, o);
      }),
      (o.prototype.SystemSettings = function (t, o) {
        return (
          (this.topicurl = "SystemSettings"),
          (this.url = "/data/config.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setLedCfg = function (t, o) {
        return (this.topicurl = "setLedCfg"), this.post(t, o);
      }),
      (o.prototype.setLanguageCfg = function (t, o) {
        return (this.topicurl = "setLanguageCfg"), this.post(t, o);
      }),
      (o.prototype.getPasswordCfg = function (t, o) {
        return (
          (this.topicurl = "getPasswordCfg"),
          (this.url = "/data/password.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setPasswordCfg = function (t, o) {
        return (this.topicurl = "setPasswordCfg"), this.post(t, o);
      }),
      (o.prototype.getScheduleCfg = function (t, o) {
        return (
          (this.topicurl = "getScheduleCfg"),
          (this.url = "/data/schedule.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setScheduleCfg = function (t, o) {
        return (this.topicurl = "setScheduleCfg"), this.post(t, o);
      }),
      (o.prototype.getNtpCfg = function (t, o) {
        return (
          (this.topicurl = "getNtpCfg"),
          (this.url = "/data/time.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setNtpCfg = function (t, o) {
        return (this.topicurl = "setNtpCfg"), this.post(t, o);
      }),
      (o.prototype.NTPSyncWithHost = function (t, o) {
        return (this.topicurl = "NTPSyncWithHost"), this.post(t, o);
      }),
      (o.prototype.getVpnPassCfg = function (t, o) {
        return (
          (this.topicurl = "getVpnPassCfg"),
          (this.url = "/data/vpnpass.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setVpnPassCfg = function (t, o) {
        return (this.topicurl = "setVpnPassCfg"), this.post(t, o);
      }),
      (o.prototype.getRemoteCfg = function (t, o) {
        return (
          (this.topicurl = "getRemoteCfg"),
          (this.url = "/data/remote.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setRemoteCfg = function (t, o) {
        return (this.topicurl = "setRemoteCfg"), this.post(t, o);
      }),
      (o.prototype.getDdnsStatus = function (t, o) {
        return (
          (this.topicurl = "getDdnsStatus"),
          (this.url = "/data/ddnsstatus.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getDdnsCfg = function (t, o) {
        return (
          (this.topicurl = "getDdnsCfg"),
          (this.url = "/data/ddns.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setDdnsCfg = function (t, o) {
        return (this.topicurl = "setDdnsCfg"), this.post(t, o);
      }),
      (o.prototype.getDmzCfg = function (t, o) {
        return (
          (this.topicurl = "getDmzCfg"),
          (this.url = "/data/dmz.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setDmzCfg = function (t, o) {
        return (this.topicurl = "setDmzCfg"), this.post(t, o);
      }),
      (o.prototype.getPortForwardRules = function (t, o) {
        return (
          (this.topicurl = "getPortForwardRules"),
          (this.url = "/data/portfwd.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setPortForwardRules = function (t, o) {
        return (this.topicurl = "setPortForwardRules"), this.post(t, o);
      }),
      (o.prototype.delPortForwardRules = function (t, o) {
        return (this.topicurl = "delPortForwardRules"), this.post(t, o);
      }),
      (o.prototype.getIpPortFilterRules = function (t, o) {
        return (
          (this.topicurl = "getIpPortFilterRules"),
          (this.url = "/data/ipf.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setIpPortFilterRules = function (t, o) {
        return (this.topicurl = "setIpPortFilterRules"), this.post(t, o);
      }),
      (o.prototype.delIpPortFilterRules = function (t, o) {
        return (this.topicurl = "delIpPortFilterRules"), this.post(t, o);
      }),
      (o.prototype.getMacFilterRules = function (t, o) {
        return (
          (this.topicurl = "getMacFilterRules"),
          (this.url = "/data/macf.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setMacFilterRules = function (t, o) {
        return (this.topicurl = "setMacFilterRules"), this.post(t, o);
      }),
      (o.prototype.delMacFilterRules = function (t, o) {
        return (this.topicurl = "delMacFilterRules"), this.post(t, o);
      }),
      (o.prototype.getUrlFilterRules = function (t, o) {
        return (
          (this.topicurl = "getUrlFilterRules"),
          (this.url = "/data/urlf.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setUrlFilterRules = function (t, o) {
        return (this.topicurl = "setUrlFilterRules"), this.post(t, o);
      }),
      (o.prototype.delUrlFilterRules = function (t, o) {
        return (this.topicurl = "delUrlFilterRules"), this.post(t, o);
      }),
      (o.prototype.getParentalRules = function (t, o) {
        return (
          (this.topicurl = "getParentalRules"),
          (this.url = "/data/parental.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setParentalRules = function (t, o) {
        return (this.topicurl = "setParentalRules"), this.post(t, o);
      }),
      (o.prototype.delParentalRules = function (t, o) {
        return (this.topicurl = "delParentalRules"), this.post(t, o);
      }),
      (o.prototype.getSmartQosCfg = function (t, o) {
        return (
          (this.topicurl = "getSmartQosCfg"),
          (this.url = "/data/smart_qos.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getQosPolicy = function (t, o) {
        return (
          (this.topicurl = "getQosPolicy"),
          (this.url = "/data/smart_qos.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getIpQosLimit = function (t, o) {
        return (
          (this.topicurl = "getIpQosLimit"),
          (this.url = "/data/smart_qos.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setSmartQosCfg = function (t, o) {
        return (this.topicurl = "setSmartQosCfg"), this.post(t, o);
      }),
      (o.prototype.setQosPolicy = function (t, o) {
        return (this.topicurl = "setQosPolicy"), this.post(t, o);
      }),
      (o.prototype.setIpQosLimit = function (t, o) {
        return (this.topicurl = "setIpQosLimit"), this.post(t, o);
      }),
      (o.prototype.setQosCfg = function (t, o) {
        return (this.topicurl = "setQosCfg"), this.post(t, o);
      }),
      (o.prototype.delSmartQosCfg = function (t, o) {
        return (this.topicurl = "delSmartQosCfg"), this.post(t, o);
      }),
      (o.prototype.getGameSpeedCfg = function (t, o) {
        return (
          (this.topicurl = "getGameSpeedCfg"),
          (this.url = "/data/game_speed.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setGameSpeedCfg = function (t, o) {
        return (this.topicurl = "setGameSpeedCfg"), this.post(t, o);
      }),
      (o.prototype.getIpv6WanCfg = function (t, o) {
        return (
          (this.topicurl = "getIpv6WanCfg"),
          (this.url = "/data/ipv6_wan.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setIpv6WanCfg = function (t, o) {
        return (this.topicurl = "setIpv6WanCfg"), this.post(t, o);
      }),
      (o.prototype.getIpv6LanCfg = function (t, o) {
        return (
          (this.topicurl = "getIpv6LanCfg"),
          (this.url = "/data/ipv6_lan.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setIpv6LanCfg = function (t, o) {
        return (this.topicurl = "setIpv6LanCfg"), this.post(t, o);
      }),
      (o.prototype.getRadvdCfg = function (t, o) {
        return (
          (this.topicurl = "getRadvdCfg"),
          (this.url = "/data/ipv6_radvd.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setRadvdCfg = function (t, o) {
        return (this.topicurl = "setRadvdCfg"), this.post(t, o);
      }),
      (o.prototype.getIptvCfg = function (t, o) {
        return (
          (this.topicurl = "getIptvCfg"),
          (this.url = "/data/iptv.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setIptvCfg = function (t, o) {
        return (this.topicurl = "setIptvCfg"), this.post(t, o);
      }),
      (o.prototype.CloudSrvVersionCheck = function (t, o) {
        return (this.topicurl = "CloudSrvVersionCheck"), this.post(t, o);
      }),
      (o.prototype.getCloudSrvCheckStatus = function (t, o) {
        return (
          (this.topicurl = "getCloudSrvCheckStatus"),
          (this.url = "/data/firmware_info.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getLoginCfg = function (t, o) {
        return (
          (this.topicurl = "getLoginCfg"),
          (this.url = "/data/login_info.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getOnlineMsg = function (t, o) {
        return (
          (this.topicurl = "getOnlineMsg"),
          (this.url = "/data/online_info.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getAccessDeviceCfg = function (t, o) {
        return (
          (this.topicurl = "getAccessDeviceCfg"),
          (this.url = "/data/access_device.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setAccessDeviceCfg = function (t, o) {
        return (this.topicurl = "setAccessDeviceCfg"), this.post(t, o);
      }),
      (o.prototype.getCrpcCfg = function (t, o) {
        return (
          (this.topicurl = "getCrpcCfg"),
          (this.url = "/data/crpc.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getNoticeCfg = function (t, o) {
        return (
          (this.topicurl = "getNoticeCfg"),
          (this.url = "/data/notice.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setNoticeCfg = function (t, o) {
        return (this.topicurl = "setNoticeCfg"), this.post(t, o);
      }),
      (o.prototype.getUPnPCfg = function (t, o) {
        return (
          (this.topicurl = "getUPnPCfg"),
          (this.url = "/data/upnp.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setUPnPCfg = function (t, o) {
        return (this.topicurl = "setUPnPCfg"), this.post(t, o);
      }),
      (o.prototype.getAppFilterCfg = function (t, o) {
        return (
          (this.topicurl = "getAppFilterCfg"),
          (this.url = "/data/appfilter.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setAppFilterCfg = function (t, o) {
        return (this.topicurl = "setAppFilterCfg"), this.post(t, o);
      }),
      (o.prototype.getAppTypeList = function (t, o) {
        return (
          (this.topicurl = "getAppTypeList"),
          (this.url = "/data/app_type_list.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getAppListById = function (t, o) {
        return (
          (this.topicurl = "getAppListById"),
          (this.url = "/data/" + t.config_name + ".json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setAppById = function (t, o) {
        return (this.topicurl = "setAppById"), this.post(t, o);
      }),
      (o.prototype.getOpenVpnCfg = function (t, o) {
        return (
          (this.topicurl = "getOpenVpnCfg"),
          (this.url = "/data/openvpn.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setOpenVpnCfg = function (t, o) {
        return (this.topicurl = "setOpenVpnCfg"), this.post(t, o);
      }),
      (o.prototype.setOpenVpnCertGenerationCfg = function (t, o) {
        return (
          (this.topicurl = "setOpenVpnCertGenerationCfg"),
          (this.url = "/data/openvpn.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getOpenVpnCertStatus = function (t, o) {
        return (
          (this.topicurl = "getOpenVpnCertStatus"),
          (this.url = "/data/cert_generation.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getOpenVpnLog = function (t, o) {
        return (
          (this.topicurl = "getOpenVpnLog"),
          (this.url = "/data/openvpn_log.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getDiagnosisCfg = function (t, o) {
        return (
          (this.topicurl = "getDiagnosisCfg"),
          (this.url = "/data/pinglog.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setDiagnosisCfg = function (t, o) {
        return (this.topicurl = "setDiagnosisCfg"), this.post(t, o);
      }),
      (o.prototype.clearDiagnosisLog = function (t, o) {
        return (this.topicurl = "clearDiagnosisLog"), this.post(t, o);
      }),
      (o.prototype.cancelUssd = function (t, o) {
        return (this.topicurl = "cancelUssd"), this.post(t, o);
      }),
      (o.prototype.setUssd = function (t, o) {
        return (
          (this.topicurl = "setUssd"),
          (this.url = "/data/ussd.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getSmsCfg = function (t, o) {
        return (
          (this.topicurl = "getSmsCfg"),
          (this.url = "/data/getMessage.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.delSmsCfg = function (t, o) {
        return (this.topicurl = "delSmsCfg"), this.post(t, o);
      }),
      (o.prototype.setSmsCfg = function (t, o) {
        return (this.topicurl = "setSmsCfg"), this.post(t, o);
      }),
      (o.prototype.getTracerouteCfg = function (t, o) {
        return (this.topicurl = "getTracerouteCfg"), this.post(t, o);
      }),
      (o.prototype.setTracerouteCfg = function (t, o) {
        return (this.topicurl = "setTracerouteCfg"), this.post(t, o);
      }),
      (o.prototype.clearTracerouteLog = function (t, o) {
        return (this.topicurl = "clearTracerouteLog"), this.post(t, o);
      }),
      (o.prototype.getTcpdumpCfg = function (t, o) {
        return (
          (this.topicurl = "getTcpdumpCfg"),
          (this.url = "/data/getTcpdumpCfg.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setTcpdumpCfg = function (t, o) {
        return (this.topicurl = "setTcpdumpCfg"), this.post(t, o);
      }),
      (o.prototype.clearTcpdumpCfg = function (t, o) {
        return (this.topicurl = "clearTcpdumpCfg"), this.post(t, o);
      }),
      (o.prototype.getTelnetCfg = function (t, o) {
        return (
          (this.topicurl = "getTelnetCfg"),
          (this.url = "/data/telnet.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setTelnetCfg = function (t, o) {
        return (this.topicurl = "setTelnetCfg"), this.post(t, o);
      }),
      (o.prototype.delWiFiScheduleCfg = function (t, o) {
        return (this.topicurl = "delWiFiScheduleCfg"), this.post(t, o);
      }),
      (o.prototype.getOpModeCfg = function (t, o) {
        return (
          (this.topicurl = "getOpModeCfg"),
          (this.url = "/data/opmode.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setOpModeCfg = function (t, o) {
        return (this.topicurl = "setOpModeCfg"), this.post(t, o);
      }),
      (o.prototype.setWiFiRepeaterCfg = function (t, o) {
        return (this.topicurl = "setWiFiRepeaterCfg"), this.post(t, o);
      }),
      (o.prototype.delUsbDevice = function (t, o) {
        return (this.topicurl = "delUsbDevice"), this.post(t, o);
      }),
      (o.prototype.uploadQosConfig = function (t, o) {
        return (
          (this.topicurl = "uploadQosConfig"),
          (this.url = "/data/uploadqoscfg.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.CloudSrcApplibVerCheck = function (t, o) {
        return (this.topicurl = "CloudSrcApplibVerCheck"), this.post(t, o);
      }),
      (o.prototype.getCloudSrvAppLibCheckStatus = function (t, o) {
        return (
          (this.topicurl = "getCloudSrvAppLibCheckStatus"),
          (this.url = "/data/getCloudTraitInfo.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setUpgradeApplib = function (t, o) {
        return (this.topicurl = "setUpgradeApplib"), this.post(t, o);
      }),
      (o.prototype.getWiFiMeshConfig = function (t, o) {
        return (
          (this.topicurl = "getWiFiMeshConfig"),
          (this.async = !0),
          globalConfig.debug && (this.url = "/data/mesh.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiMeshConfig = function (t, o) {
        return (
          (this.topicurl = "setWiFiMeshConfig"),
          (this.async = !0),
          this.post(t, o)
        );
      }),
      (o.prototype.getWiFiIpMacTable = function (t, o) {
        return (
          (this.topicurl = "getWiFiIpMacTable"),
          (this.url = "/data/getWiFiIpMacInfo.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getSpeedtest = function (t, o) {
        return (
          (this.topicurl = "getSpeedtest"),
          (this.url = "/data/speedtest.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setSpeedtest = function (t, o) {
        return (this.topicurl = "setSpeedtest"), this.post(t, o);
      }),
      (o.prototype.getStaticRoute = function (t, o) {
        return (
          (this.topicurl = "getStaticRoute"),
          (this.url = "/data/staticRoute.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setStaticRoute = function (t, o) {
        return (this.topicurl = "setStaticRoute"), this.post(t, o);
      }),
      (o.prototype.delStaticRoute = function (t, o) {
        return (this.topicurl = "delStaticRoute"), this.post(t, o);
      }),
      (o.prototype.getDynamicRoute = function (t, o) {
        return (
          (this.topicurl = "getDynamicRoute"),
          (this.url = "/data/staticRoute.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setDynamicRoute = function (t, o) {
        return (this.topicurl = "setDynamicRoute"), this.post(t, o);
      }),
      (o.prototype.getSystemRoute = function (t, o) {
        return (
          (this.topicurl = "getSystemRoute"),
          (this.url = "/data/sysroute.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getIpv6Cfg = function (t, o) {
        return (
          (this.topicurl = "getIpv6Cfg"),
          (this.url = "/data/ipv6Cfg.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setIpv6Cfg = function (t, o) {
        return (this.topicurl = "setIpv6Cfg"), this.post(t, o);
      }),
      (o.prototype.getVpnClientCfg = function (t, o) {
        return (
          (this.topicurl = "getVpnClientCfg"),
          (this.url = "/data/vpncli.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setVpnClientCfg = function (t, o) {
        return (this.topicurl = "setVpnClientCfg"), this.post(t, o);
      }),
      (o.prototype.getCloudDownloadStatus = function (t, o) {
        return (
          (this.topicurl = "getCloudDownloadStatus"),
          (this.url = "/data/cloud_download_status.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getOpenVpnCert = function (t, o) {
        return (
          (this.topicurl = "getOpenVpnCert"),
          (this.url = "/data/vpncert.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setOpenVpnCert = function (t, o) {
        return (this.topicurl = "setOpenVpnCert"), this.post(t, o);
      }),
      (o.prototype.getEngineerModeCfg = function (t, o) {
        return (
          (this.topicurl = "getEngineerModeCfg"),
          (this.url = "/data/telnet.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setEngineerModeCfg = function (t, o) {
        return (this.topicurl = "setEngineerModeCfg"), this.post(t, o);
      }),
      (o.prototype.getDosCfg = function (t, o) {
        return (
          (this.topicurl = "getDosCfg"),
          (this.url = "/data/dos.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setDosCfg = function (t, o) {
        return (this.topicurl = "setDosCfg"), this.post(t, o);
      }),
      (o.prototype.getTr069Cfg = function (t, o) {
        return (
          (this.topicurl = "getTr069Cfg"),
          (this.url = "/data/tr069.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setTr069Cfg = function (t, o) {
        return (this.topicurl = "setTr069Cfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiWdsCfg = function (t, o) {
        return (
          (this.topicurl = "getWiFiWdsCfg"),
          (this.url = "/data/wds.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setWiFiWdsCfg = function (t, o) {
        return (this.topicurl = "setWiFiWdsCfg"), this.post(t, o);
      }),
      (o.prototype.delWiFiWdsRules = function (t, o) {
        return (this.topicurl = "delWiFiWdsRules"), this.post(t, o);
      }),
      (o.prototype.getSSServer = function (t, o) {
        return (
          (this.topicurl = "getSSServer"),
          (this.url = "/data/ssscfg.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setSSServer = function (t, o) {
        return (this.topicurl = "setSSServer"), this.post(t, o);
      }),
      (o.prototype.setNetStrategyCfg = function (t, o) {
        return (
          (this.topicurl = "setNetStrategyCfg"),
          (this.url = "/data/net_strategy.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getNetStrategyCfg = function (t, o) {
        return (
          (this.topicurl = "getNetStrategyCfg"),
          (this.url = "/data/net_strategy.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.delNetStrategyCfg = function (t, o) {
        return (this.topicurl = "delNetStrategyCfg"), this.post(t, o);
      }),
      (o.prototype.getClientsInfo = function (t, o) {
        return (
          (this.topicurl = "getClientsInfo"),
          (this.url = "/data/clients.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setDeviceNameCfg = function (t, o) {
        return (
          (this.topicurl = "setDeviceNameCfg"),
          (this.url = "/data/clients.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setNetIdCfg = function (t, o) {
        return (
          (this.topicurl = "setNetIdCfg"),
          (this.url = "/data/clients.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getNetStrategyStatus = function (t, o) {
        return (
          (this.topicurl = "getNetStrategyStatus"),
          (this.url = "/data/net_connect_status.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getNetStrategyPwdCfg = function (t, o) {
        return (
          (this.topicurl = "getNetStrategyPwdCfg"),
          (this.url = "/data/net_strategy_pwd.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.delNetStrategyPwdCfg = function (t, o) {
        return (
          (this.topicurl = "delNetStrategyPwdCfg"),
          (this.url = "/data/net_strategy_pwd.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setNetStrategyPwdCfg = function (t, o) {
        return (
          (this.topicurl = "setNetStrategyPwdCfg"),
          (this.url = "/data/net_strategy_pwd.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setNetStrategyReconnect = function (t, o) {
        return (
          (this.topicurl = "setNetStrategyReconnect"),
          (this.url = "/data/net_strategy.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setManualDialCfg = function (t, o) {
        return (this.topicurl = "setManualDialCfg"), this.post(t, o);
      }),
      (o.prototype.getWiFiRepeaterStaInfo = function (t, o) {
        return (
          (this.topicurl = "getWiFiRepeaterStaInfo"),
          (this.url = "/data/repeater_info.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.getBandwidthGpeedCfg = function (t, o) {
        return (
          (this.topicurl = "getBandwidthGpeedCfg"),
          (this.url = "/data/getBandwidthGpeedCfg.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setUpdateInfoCfg = function (t, o) {
        return (this.topicurl = "setUpdateInfoCfg"), this.post(t, o);
      }),
      (o.prototype.getAclServerRules = function (t, o) {
        return (
          (this.topicurl = "getAclServerRules"),
          (this.url = "/data/getAclServerCfg.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.setAclServerRules = function (t, o) {
        return (this.topicurl = "setAclServerRules"), this.post(t, o);
      }),
      (o.prototype.delAclServerRules = function (t, o) {
        return (this.topicurl = "delAclServerRules"), this.post(t, o);
      }),
      (o.prototype.loginAuth = function (t, o) {
        return (
          (this.topicurl = "loginAuth"),
          (this.url = "/data/loginAuth.json"),
          this.post(t, o)
        );
      }),
      (o.prototype.logout = function (t, o) {
        return (this.topicurl = "logout"), this.post(t, o);
      }),
      (o.prototype.saveSystemSetting = function (t, o) {
        return (this.topicurl = "saveSystemSetting"), this.post(t, o);
      }),
      (t.uiPost = new o());
  })(window);

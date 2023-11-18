window.CanvasRenderingContext2D ||
  !(function () {
    var t = Math,
      S = t.round,
      a = t.sin,
      c = t.cos,
      x = 10,
      t = {
        init: function (t) {
          var e,
            i = t || document;
          /MSIE/.test(navigator.userAgent) &&
            !window.opera &&
            ((e = this),
            i.attachEvent("onreadystatechange", function () {
              e.init_(i);
            }));
        },
        init_: function (t) {
          if ("complete" == t.readyState) {
            t.namespaces.g_vml_ ||
              t.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml");
            t.createStyleSheet().cssText =
              "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}";
            for (
              var e = t.getElementsByTagName("canvas"), i = 0;
              i < e.length;
              i++
            )
              e[i].getContext || this.initElement(e[i]);
          }
        },
        fixElement_: function (t) {
          var e = t.outerHTML,
            i = t.ownerDocument.createElement(e);
          if ("/>" != e.slice(-2)) {
            for (
              var s, o = "/" + t.tagName;
              (s = t.nextSibling) && s.tagName != o;

            )
              s.removeNode();
            s && s.removeNode();
          }
          return t.parentNode.replaceChild(i, t), i;
        },
        initElement: function (t) {
          ((t = this.fixElement_(t)).getContext = function () {
            return this.context_ || (this.context_ = new u(this));
          }),
            t.attachEvent("onpropertychange", i),
            t.attachEvent("onresize", s);
          var e = t.attributes;
          return (
            e.width && e.width.specified
              ? (t.style.width = e.width.nodeValue + "px")
              : (t.width = t.clientWidth),
            e.height && e.height.specified
              ? (t.style.height = e.height.nodeValue + "px")
              : (t.height = t.clientHeight),
            t
          );
        },
      };
    function i(t) {
      var e = t.srcElement;
      switch (t.propertyName) {
        case "width":
          (e.style.width = e.attributes.width.nodeValue + "px"),
            e.getContext().clearRect();
          break;
        case "height":
          (e.style.height = e.attributes.height.nodeValue + "px"),
            e.getContext().clearRect();
      }
    }
    function s(t) {
      t = t.srcElement;
      t.firstChild &&
        ((t.firstChild.style.width = t.clientWidth + "px"),
        (t.firstChild.style.height = t.clientHeight + "px"));
    }
    t.init();
    for (var h = [], e = 0; e < 16; e++)
      for (var o = 0; o < 16; o++)
        h[16 * e + o] = e.toString(16) + o.toString(16);
    function l() {
      return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];
    }
    function n(t, e) {
      for (var i = l(), s = 0; s < 3; s++)
        for (var o = 0; o < 3; o++) {
          for (var n = 0, r = 0; r < 3; r++) n += t[s][r] * e[r][o];
          i[s][o] = n;
        }
      return i;
    }
    function r(t, e) {
      (e.fillStyle = t.fillStyle),
        (e.lineCap = t.lineCap),
        (e.lineJoin = t.lineJoin),
        (e.lineWidth = t.lineWidth),
        (e.miterLimit = t.miterLimit),
        (e.shadowBlur = t.shadowBlur),
        (e.shadowColor = t.shadowColor),
        (e.shadowOffsetX = t.shadowOffsetX),
        (e.shadowOffsetY = t.shadowOffsetY),
        (e.strokeStyle = t.strokeStyle),
        (e.arcScaleX_ = t.arcScaleX_),
        (e.arcScaleY_ = t.arcScaleY_);
    }
    function w(t) {
      var e = 1;
      if ("rgb" == (t = String(t)).substring(0, 3)) {
        for (
          var i = t.indexOf("(", 3),
            s = t.indexOf(")", i + 1),
            o = t.substring(i + 1, s).split(","),
            n = "#",
            r = 0;
          r < 3;
          r++
        )
          n += h[Number(o[r])];
        4 == o.length && "a" == t.substr(3, 1) && (e = o[3]);
      } else n = t;
      return [n, e];
    }
    function u(t) {
      (this.m_ = l()),
        (this.mStack_ = []),
        (this.aStack_ = []),
        (this.currentPath_ = []),
        (this.strokeStyle = "#000"),
        (this.fillStyle = "#000"),
        (this.lineWidth = 1),
        (this.lineJoin = "miter"),
        (this.lineCap = "butt"),
        (this.miterLimit = x),
        (this.globalAlpha = 1);
      var e = (this.canvas = t).ownerDocument.createElement("div");
      (e.style.width = t.clientWidth + "px"),
        (e.style.height = t.clientHeight + "px"),
        (e.style.overflow = "hidden"),
        (e.style.position = "absolute"),
        t.appendChild(e),
        (this.element_ = e),
        (this.arcScaleX_ = 1),
        (this.arcScaleY_ = 1);
    }
    var f = u.prototype;
    function p(t) {
      (this.type_ = t),
        (this.radius1_ = 0),
        (this.radius2_ = 0),
        (this.colors_ = []),
        (this.focus_ = { x: 0, y: 0 });
    }
    function d() {}
    (f.clearRect = function () {
      (this.element_.innerHTML = ""), (this.currentPath_ = []);
    }),
      (f.beginPath = function () {
        this.currentPath_ = [];
      }),
      (f.moveTo = function (t, e) {
        this.currentPath_.push({ type: "moveTo", x: t, y: e }),
          (this.currentX_ = t),
          (this.currentY_ = e);
      }),
      (f.lineTo = function (t, e) {
        this.currentPath_.push({ type: "lineTo", x: t, y: e }),
          (this.currentX_ = t),
          (this.currentY_ = e);
      }),
      (f.bezierCurveTo = function (t, e, i, s, o, n) {
        this.currentPath_.push({
          type: "bezierCurveTo",
          cp1x: t,
          cp1y: e,
          cp2x: i,
          cp2y: s,
          x: o,
          y: n,
        }),
          (this.currentX_ = o),
          (this.currentY_ = n);
      }),
      (f.quadraticCurveTo = function (t, e, i, s) {
        var t = this.currentX_ + (2 / 3) * (t - this.currentX_),
          e = this.currentY_ + (2 / 3) * (e - this.currentY_),
          o = t + (i - this.currentX_) / 3,
          n = e + (s - this.currentY_) / 3;
        this.bezierCurveTo(t, e, o, n, i, s);
      }),
      (f.arc = function (t, e, i, s, o, n) {
        i *= x;
        var r = n ? "at" : "wa",
          h = t + c(s) * i - 5,
          s = e + a(s) * i - 5,
          l = t + c(o) * i - 5,
          o = e + a(o) * i - 5;
        h != l || n || (h += 0.125),
          this.currentPath_.push({
            type: r,
            x: t,
            y: e,
            radius: i,
            xStart: h,
            yStart: s,
            xEnd: l,
            yEnd: o,
          });
      }),
      (f.rect = function (t, e, i, s) {
        this.moveTo(t, e),
          this.lineTo(t + i, e),
          this.lineTo(t + i, e + s),
          this.lineTo(t, e + s),
          this.closePath();
      }),
      (f.strokeRect = function (t, e, i, s) {
        this.beginPath(),
          this.moveTo(t, e),
          this.lineTo(t + i, e),
          this.lineTo(t + i, e + s),
          this.lineTo(t, e + s),
          this.closePath(),
          this.stroke();
      }),
      (f.fillRect = function (t, e, i, s) {
        this.beginPath(),
          this.moveTo(t, e),
          this.lineTo(t + i, e),
          this.lineTo(t + i, e + s),
          this.lineTo(t, e + s),
          this.closePath(),
          this.fill();
      }),
      (f.createLinearGradient = function (t, e, i, s) {
        return new p("gradient");
      }),
      (f.createRadialGradient = function (t, e, i, s, o, n) {
        var r = new p("gradientradial");
        return (
          (r.radius1_ = i),
          (r.radius2_ = n),
          (r.focus_.x = t),
          (r.focus_.y = e),
          r
        );
      }),
      (f.drawImage = function (t, e) {
        var i,
          s,
          o,
          n,
          r,
          h,
          l,
          a = t.runtimeStyle.width,
          c = t.runtimeStyle.height,
          u =
            ((t.runtimeStyle.width = "auto"),
            (t.runtimeStyle.height = "auto"),
            t.width),
          f = t.height;
        if (
          ((t.runtimeStyle.width = a),
          (t.runtimeStyle.height = c),
          3 == arguments.length)
        )
          (m = e), (i = arguments[2]), (n = r = 0), (h = s = u), (l = o = f);
        else if (5 == arguments.length)
          (m = e),
            (i = arguments[2]),
            (s = arguments[3]),
            (o = arguments[4]),
            (n = r = 0),
            (h = u),
            (l = f);
        else {
          if (9 != arguments.length) throw "Invalid number of arguments";
          (n = e),
            (r = arguments[2]),
            (h = arguments[3]),
            (l = arguments[4]),
            (m = arguments[5]),
            (i = arguments[6]),
            (s = arguments[7]),
            (o = arguments[8]);
        }
        var p,
          d,
          _,
          y,
          m,
          a = this.getCoords_(m, i),
          c = [];
        c.push(
          " <g_vml_:group",
          ' coordsize="',
          100,
          ",",
          100,
          '"',
          ' coordorigin="0,0"',
          ' style="width:',
          10,
          ";height:",
          10,
          ";position:absolute;"
        ),
          1 != this.m_[0][0] || this.m_[0][1]
            ? ((p = []).push(
                "M11='",
                this.m_[0][0],
                "',",
                "M12='",
                this.m_[1][0],
                "',",
                "M21='",
                this.m_[0][1],
                "',",
                "M22='",
                this.m_[1][1],
                "',",
                "Dx='",
                S(a.x / x),
                "',",
                "Dy='",
                S(a.y / x),
                "'"
              ),
              (d = a),
              (_ = this.getCoords_(m + s, i)),
              (y = this.getCoords_(m, i + o)),
              (m = this.getCoords_(m + s, i + o)),
              (d.x = Math.max(d.x, _.x, y.x, m.x)),
              (d.y = Math.max(d.y, _.y, y.y, m.y)),
              c.push(
                "padding:0 ",
                S(d.x / x),
                "px ",
                S(d.y / x),
                "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",
                p.join(""),
                ", sizingmethod='clip');"
              ))
            : c.push("top:", S(a.y / x), "px;left:", S(a.x / x), "px;"),
          c.push(
            ' ">',
            '<g_vml_:image src="',
            t.src,
            '"',
            ' style="width:',
            x * s,
            "px;",
            " height:",
            x * o,
            'px;"',
            ' cropleft="',
            n / u,
            '"',
            ' croptop="',
            r / f,
            '"',
            ' cropright="',
            (u - n - h) / u,
            '"',
            ' cropbottom="',
            (f - r - l) / f,
            '"',
            " />",
            "</g_vml_:group>"
          ),
          this.element_.insertAdjacentHTML("BeforeEnd", c.join(""));
      }),
      (f.stroke = function (t) {
        for (
          var e = [],
            i = w(t ? this.fillStyle : this.strokeStyle),
            s = i[0],
            i = i[1] * this.globalAlpha,
            o =
              (e.push(
                "<g_vml_:shape",
                ' fillcolor="',
                s,
                '"',
                ' filled="',
                Boolean(t),
                '"',
                ' style="position:absolute;width:',
                10,
                "px;height:",
                10,
                'px;top:0px;left:50px;"',
                ' coordorigin="0 0" coordsize="',
                100,
                " ",
                100,
                '"',
                ' stroked="',
                !t,
                '"',
                ' strokeweight="',
                this.lineWidth,
                '"',
                ' strokecolor="',
                s,
                '"',
                ' path="'
              ),
              { x: null, y: null }),
            n = { x: null, y: null },
            r = 0;
          r < this.currentPath_.length;
          r++
        ) {
          var h,
            l,
            a,
            c = this.currentPath_[r];
          "moveTo" == c.type
            ? (e.push(" m "),
              (h = this.getCoords_(c.x, c.y)),
              e.push(S(h.x), ",", S(h.y)))
            : "lineTo" == c.type
            ? (e.push(" l "),
              (h = this.getCoords_(c.x, c.y)),
              e.push(S(h.x), ",", S(h.y)))
            : "close" == c.type
            ? e.push(" x ")
            : "bezierCurveTo" == c.type
            ? (e.push(" c "),
              (h = this.getCoords_(c.x, c.y)),
              (l = this.getCoords_(c.cp1x, c.cp1y)),
              (a = this.getCoords_(c.cp2x, c.cp2y)),
              e.push(
                S(l.x),
                ",",
                S(l.y),
                ",",
                S(a.x),
                ",",
                S(a.y),
                ",",
                S(h.x),
                ",",
                S(h.y)
              ))
            : ("at" != c.type && "wa" != c.type) ||
              (e.push(" ", c.type, " "),
              (h = this.getCoords_(c.x, c.y)),
              (l = this.getCoords_(c.xStart, c.yStart)),
              (a = this.getCoords_(c.xEnd, c.yEnd)),
              e.push(
                S(h.x - this.arcScaleX_ * c.radius),
                ",",
                S(h.y - this.arcScaleY_ * c.radius),
                " ",
                S(h.x + this.arcScaleX_ * c.radius),
                ",",
                S(h.y + this.arcScaleY_ * c.radius),
                " ",
                S(l.x),
                ",",
                S(l.y),
                " ",
                S(a.x),
                ",",
                S(a.y)
              )),
            h &&
              ((null == o.x || h.x < o.x) && (o.x = h.x),
              (null == n.x || h.x > n.x) && (n.x = h.x),
              (null == o.y || h.y < o.y) && (o.y = h.y),
              null == n.y || h.y > n.y) &&
              (n.y = h.y);
        }
        if ((e.push(' ">'), "object" == typeof this.fillStyle)) {
          var u,
            f,
            p = { x: "50%", y: "50%" },
            d = n.x - o.x,
            _ = n.y - o.y,
            y = _ < d ? d : _,
            m =
              ((p.x = S((this.fillStyle.focus_.x / d) * 100 + 50) + "%"),
              (p.y = S((this.fillStyle.focus_.y / _) * 100 + 50) + "%"),
              []),
            x =
              ((f =
                "gradientradial" == this.fillStyle.type_
                  ? ((u = (this.fillStyle.radius1_ / y) * 100),
                    (this.fillStyle.radius2_ / y) * 100 - u)
                  : ((u = 0), 100)),
              { offset: null, color: null }),
            g = { offset: null, color: null };
          this.fillStyle.colors_.sort(function (t, e) {
            return t.offset - e.offset;
          });
          for (r = 0; r < this.fillStyle.colors_.length; r++) {
            var v = this.fillStyle.colors_[r];
            m.push(v.offset * f + u, "% ", v.color, ","),
              (v.offset > x.offset || null == x.offset) &&
                ((x.offset = v.offset), (x.color = v.color)),
              (v.offset < g.offset || null == g.offset) &&
                ((g.offset = v.offset), (g.color = v.color));
          }
          m.pop(),
            e.push(
              "<g_vml_:fill",
              ' color="',
              g.color,
              '"',
              ' color2="',
              x.color,
              '"',
              ' type="',
              this.fillStyle.type_,
              '"',
              ' focusposition="',
              p.x,
              ", ",
              p.y,
              '"',
              ' colors="',
              m.join(""),
              '"',
              ' opacity="',
              i,
              '" />'
            );
        } else
          t
            ? e.push('<g_vml_:fill color="', s, '" opacity="', i, '" />')
            : e.push(
                "<g_vml_:stroke",
                ' opacity="',
                i,
                '"',
                ' joinstyle="',
                this.lineJoin,
                '"',
                ' miterlimit="',
                this.miterLimit,
                '"',
                ' endcap="',
                (function (t) {
                  switch (t) {
                    case "butt":
                      return "flat";
                    case "round":
                      return "round";
                    default:
                      return "square";
                  }
                })(this.lineCap),
                '"',
                ' weight="',
                this.lineWidth,
                'px"',
                ' color="',
                s,
                '" />'
              );
        e.push("</g_vml_:shape>"),
          this.element_.insertAdjacentHTML("beforeEnd", e.join(""));
      }),
      (f.fill = function () {
        this.stroke(!0);
      }),
      (f.closePath = function () {
        this.currentPath_.push({ type: "close" });
      }),
      (f.getCoords_ = function (t, e) {
        return {
          x: x * (t * this.m_[0][0] + e * this.m_[1][0] + this.m_[2][0]) - 5,
          y: x * (t * this.m_[0][1] + e * this.m_[1][1] + this.m_[2][1]) - 5,
        };
      }),
      (f.save = function () {
        var t = {};
        r(this, t),
          this.aStack_.push(t),
          this.mStack_.push(this.m_),
          (this.m_ = n(l(), this.m_));
      }),
      (f.restore = function () {
        r(this.aStack_.pop(), this), (this.m_ = this.mStack_.pop());
      }),
      (f.translate = function (t, e) {
        this.m_ = n(
          [
            [1, 0, 0],
            [0, 1, 0],
            [t, e, 1],
          ],
          this.m_
        );
      }),
      (f.rotate = function (t) {
        var e = c(t),
          t = a(t);
        this.m_ = n(
          [
            [e, t, 0],
            [-t, e, 0],
            [0, 0, 1],
          ],
          this.m_
        );
      }),
      (f.scale = function (t, e) {
        (this.arcScaleX_ *= t),
          (this.arcScaleY_ *= e),
          (this.m_ = n(
            [
              [t, 0, 0],
              [0, e, 0],
              [0, 0, 1],
            ],
            this.m_
          ));
      }),
      (f.clip = function () {}),
      (f.arcTo = function () {}),
      (f.createPattern = function () {
        return new d();
      }),
      (f.measureText = function (t) {
        var e = document.createElement("span"),
          t =
            ((e.style.font = this.font),
            (e.innerHTML = t),
            document.getElementsByTagName("body")[0]),
          i = (t.appendChild(e), e.offsetWidth);
        return t.removeChild(e), { width: i + 1 };
      }),
      (f.fillText = function (t, e, i) {
        var s = [],
          e =
            (this.font.split("px")[0].replace(/(^\s+)|(\s+$)/g, ""),
            e + 15 * this.element_.children.length);
        s.push(
          '<g_vml_:shape style="font:' + this.font + ";",
          " color:" + this.fillStyle + ";",
          " position:absolute;",
          " left:" + e + "px;",
          " top:" + +i + "px;",
          " width:" + this.measureText(t).width + "px;",
          ' height:0px;"',
          ' ><g_vml_:textbox inset="0,0,0,0">' + t,
          " </g_vml_:textbox>",
          "</g_vml_:shape>"
        ),
          this.element_.insertAdjacentHTML("BeforeEnd", s.join(""));
      }),
      (p.prototype.addColorStop = function (t, e) {
        (e = w(e)), this.colors_.push({ offset: 1 - t, color: e });
      }),
      (G_vmlCanvasManager = t),
      (CanvasRenderingContext2D = u),
      (CanvasGradient = p),
      (CanvasPattern = d);
  })();

/**
 *
 *	Bunch of scripts included in one file to reduce number HTTP requests
 *
 */

/*!
	Autosize v1.18.9 - 2014-05-27
	Automatically adjust textarea height based on user input.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e) {
  var t,
    o = {
      className: "autosizejs",
      id: "autosizejs",
      append: "\n",
      callback: !1,
      resizeDelay: 10,
      placeholder: !0
    },
    i =
      '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
    n = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "fontStyle",
      "letterSpacing",
      "textTransform",
      "wordSpacing",
      "textIndent"
    ],
    s = e(i).data("autosize", !0)[0];
  (s.style.lineHeight = "99px"),
    "99px" === e(s).css("lineHeight") && n.push("lineHeight"),
    (s.style.lineHeight = ""),
    (e.fn.autosize = function(i) {
      return this.length
        ? ((i = e.extend({}, o, i || {})),
          s.parentNode !== document.body && e(document.body).append(s),
          this.each(function() {
            function o() {
              var t,
                o = window.getComputedStyle
                  ? window.getComputedStyle(u, null)
                  : !1;
              o
                ? ((t = u.getBoundingClientRect().width),
                  (0 === t || "number" != typeof t) &&
                    (t = parseInt(o.width, 10)),
                  e.each(
                    [
                      "paddingLeft",
                      "paddingRight",
                      "borderLeftWidth",
                      "borderRightWidth"
                    ],
                    function(e, i) {
                      t -= parseInt(o[i], 10);
                    }
                  ))
                : (t = p.width()),
                (s.style.width = Math.max(t, 0) + "px");
            }
            function a() {
              var a = {};
              if (
                ((t = u),
                (s.className = i.className),
                (s.id = i.id),
                (d = parseInt(p.css("maxHeight"), 10)),
                e.each(n, function(e, t) {
                  a[t] = p.css(t);
                }),
                e(s)
                  .css(a)
                  .attr("wrap", p.attr("wrap")),
                o(),
                window.chrome)
              ) {
                var r = u.style.width;
                (u.style.width = "0px"), u.offsetWidth, (u.style.width = r);
              }
            }
            function r() {
              var e, n;
              t !== u ? a() : o(),
                (s.value =
                  !u.value && i.placeholder
                    ? (p.attr("placeholder") || "") + i.append
                    : u.value + i.append),
                (s.style.overflowY = u.style.overflowY),
                (n = parseInt(u.style.height, 10)),
                (s.scrollTop = 0),
                (s.scrollTop = 9e4),
                (e = s.scrollTop),
                d && e > d
                  ? ((u.style.overflowY = "scroll"), (e = d))
                  : ((u.style.overflowY = "hidden"), c > e && (e = c)),
                (e += w),
                n !== e &&
                  ((u.style.height = e + "px"), f && i.callback.call(u, u));
            }
            function l() {
              clearTimeout(h),
                (h = setTimeout(function() {
                  var e = p.width();
                  e !== g && ((g = e), r());
                }, parseInt(i.resizeDelay, 10)));
            }
            var d,
              c,
              h,
              u = this,
              p = e(u),
              w = 0,
              f = e.isFunction(i.callback),
              z = {
                height: u.style.height,
                overflow: u.style.overflow,
                overflowY: u.style.overflowY,
                wordWrap: u.style.wordWrap,
                resize: u.style.resize
              },
              g = p.width(),
              y = p.css("resize");
            p.data("autosize") ||
              (p.data("autosize", !0),
              ("border-box" === p.css("box-sizing") ||
                "border-box" === p.css("-moz-box-sizing") ||
                "border-box" === p.css("-webkit-box-sizing")) &&
                (w = p.outerHeight() - p.height()),
              (c = Math.max(
                parseInt(p.css("minHeight"), 10) - w || 0,
                p.height()
              )),
              p.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word"
              }),
              "vertical" === y
                ? p.css("resize", "none")
                : "both" === y && p.css("resize", "horizontal"),
              "onpropertychange" in u
                ? "oninput" in u
                  ? p.on("input.autosize keyup.autosize", r)
                  : p.on("propertychange.autosize", function() {
                      "value" === event.propertyName && r();
                    })
                : p.on("input.autosize", r),
              i.resizeDelay !== !1 && e(window).on("resize.autosize", l),
              p.on("autosize.resize", r),
              p.on("autosize.resizeIncludeStyle", function() {
                (t = null), r();
              }),
              p.on("autosize.destroy", function() {
                (t = null),
                  clearTimeout(h),
                  e(window).off("resize", l),
                  p
                    .off("autosize")
                    .off(".autosize")
                    .css(z)
                    .removeData("autosize");
              }),
              r());
          }))
        : this;
    });
})(window.jQuery || window.$);

/* Scroll Monitor */
(function(e) {
  if (typeof define !== "undefined" && define.amd) {
    define(["jquery"], e);
  } else if (typeof module !== "undefined" && module.exports) {
    var t = require("jquery");
    module.exports = e(t);
  } else {
    window.scrollMonitor = e(jQuery);
  }
})(function(e) {
  function m() {
    return window.innerHeight || document.documentElement.clientHeight;
  }
  function y() {
    t.viewportTop = n.scrollTop();
    t.viewportBottom = t.viewportTop + t.viewportHeight;
    t.documentHeight = r.height();
    if (t.documentHeight !== d) {
      g = i.length;
      while (g--) {
        i[g].recalculateLocation();
      }
      d = t.documentHeight;
    }
  }
  function b() {
    t.viewportHeight = m();
    y();
    x();
  }
  function E() {
    clearTimeout(w);
    w = setTimeout(b, 100);
  }
  function x() {
    S = i.length;
    while (S--) {
      i[S].update();
    }
    S = i.length;
    while (S--) {
      i[S].triggerCallbacks();
    }
  }
  function T(n, r) {
    function x(e) {
      if (e.length === 0) {
        return;
      }
      E = e.length;
      while (E--) {
        S = e[E];
        S.callback.call(i, v);
        if (S.isOne) {
          e.splice(E, 1);
        }
      }
    }
    var i = this;
    this.watchItem = n;
    if (!r) {
      this.offsets = p;
    } else if (r === +r) {
      this.offsets = { top: r, bottom: r };
    } else {
      this.offsets = e.extend({}, p, r);
    }
    this.callbacks = {};
    for (var d = 0, m = h.length; d < m; d++) {
      i.callbacks[h[d]] = [];
    }
    this.locked = false;
    var g;
    var y;
    var b;
    var w;
    var E;
    var S;
    this.triggerCallbacks = function() {
      if (this.isInViewport && !g) {
        x(this.callbacks[o]);
      }
      if (this.isFullyInViewport && !y) {
        x(this.callbacks[u]);
      }
      if (this.isAboveViewport !== b && this.isBelowViewport !== w) {
        x(this.callbacks[s]);
        if (!y && !this.isFullyInViewport) {
          x(this.callbacks[u]);
          x(this.callbacks[f]);
        }
        if (!g && !this.isInViewport) {
          x(this.callbacks[o]);
          x(this.callbacks[a]);
        }
      }
      if (!this.isFullyInViewport && y) {
        x(this.callbacks[f]);
      }
      if (!this.isInViewport && g) {
        x(this.callbacks[a]);
      }
      if (this.isInViewport !== g) {
        x(this.callbacks[s]);
      }
      switch (true) {
        case g !== this.isInViewport:
        case y !== this.isFullyInViewport:
        case b !== this.isAboveViewport:
        case w !== this.isBelowViewport:
          x(this.callbacks[c]);
      }
      g = this.isInViewport;
      y = this.isFullyInViewport;
      b = this.isAboveViewport;
      w = this.isBelowViewport;
    };
    this.recalculateLocation = function() {
      if (this.locked) {
        return;
      }
      var n = this.top;
      var r = this.bottom;
      if (this.watchItem.nodeName) {
        var i = this.watchItem.style.display;
        if (i === "none") {
          this.watchItem.style.display = "";
        }
        var s = e(this.watchItem).offset();
        this.top = s.top;
        this.bottom = s.top + this.watchItem.offsetHeight;
        if (i === "none") {
          this.watchItem.style.display = i;
        }
      } else if (this.watchItem === +this.watchItem) {
        if (this.watchItem > 0) {
          this.top = this.bottom = this.watchItem;
        } else {
          this.top = this.bottom = t.documentHeight - this.watchItem;
        }
      } else {
        this.top = this.watchItem.top;
        this.bottom = this.watchItem.bottom;
      }
      this.top -= this.offsets.top;
      this.bottom += this.offsets.bottom;
      this.height = this.bottom - this.top;
      if (
        (n !== undefined || r !== undefined) &&
        (this.top !== n || this.bottom !== r)
      ) {
        x(this.callbacks[l]);
      }
    };
    this.recalculateLocation();
    this.update();
    g = this.isInViewport;
    y = this.isFullyInViewport;
    b = this.isAboveViewport;
    w = this.isBelowViewport;
  }
  function O(e) {
    v = e;
    y();
    x();
  }
  var t = {};
  var n = e(window);
  var r = e(document);
  var i = [];
  var s = "visibilityChange";
  var o = "enterViewport";
  var u = "fullyEnterViewport";
  var a = "exitViewport";
  var f = "partiallyExitViewport";
  var l = "locationChange";
  var c = "stateChange";
  var h = [s, o, u, a, f, l, c];
  var p = { top: 0, bottom: 0 };
  t.viewportTop;
  t.viewportBottom;
  t.documentHeight;
  t.viewportHeight = m();
  var d;
  var v;
  var g;
  var w;
  var S;
  T.prototype = {
    on: function(e, t, n) {
      switch (true) {
        case e === s && !this.isInViewport && this.isAboveViewport:
        case e === o && this.isInViewport:
        case e === u && this.isFullyInViewport:
        case e === a && this.isAboveViewport && !this.isInViewport:
        case e === f && this.isAboveViewport:
          t();
          if (n) {
            return;
          }
      }
      if (this.callbacks[e]) {
        this.callbacks[e].push({ callback: t, isOne: n });
      } else {
        throw new Error(
          "Tried to add a scroll monitor listener of type " +
            e +
            ". Your options are: " +
            h.join(", ")
        );
      }
    },
    off: function(e, t) {
      if (this.callbacks[e]) {
        for (var n = 0, r; (r = this.callbacks[e][n]); n++) {
          if (r.callback === t) {
            this.callbacks[e].splice(n, 1);
            break;
          }
        }
      } else {
        throw new Error(
          "Tried to remove a scroll monitor listener of type " +
            e +
            ". Your options are: " +
            h.join(", ")
        );
      }
    },
    one: function(e, t) {
      this.on(e, t, true);
    },
    recalculateSize: function() {
      this.height =
        this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom;
      this.bottom = this.top + this.height;
    },
    update: function() {
      this.isAboveViewport = this.top < t.viewportTop;
      this.isBelowViewport = this.bottom > t.viewportBottom;
      this.isInViewport =
        this.top <= t.viewportBottom && this.bottom >= t.viewportTop;
      this.isFullyInViewport =
        (this.top >= t.viewportTop && this.bottom <= t.viewportBottom) ||
        (this.isAboveViewport && this.isBelowViewport);
    },
    destroy: function() {
      var e = i.indexOf(this),
        t = this;
      i.splice(e, 1);
      for (var n = 0, r = h.length; n < r; n++) {
        t.callbacks[h[n]].length = 0;
      }
    },
    lock: function() {
      this.locked = true;
    },
    unlock: function() {
      this.locked = false;
    }
  };
  var N = function(e) {
    return function(t, n) {
      this.on.call(this, e, t, n);
    };
  };
  for (var C = 0, k = h.length; C < k; C++) {
    var L = h[C];
    T.prototype[L] = N(L);
  }
  try {
    y();
  } catch (A) {
    e(y);
  }
  n.on("scroll", O);
  n.on("resize", E);
  t.beget = t.create = function(t, n) {
    if (typeof t === "string") {
      t = e(t)[0];
    }
    if (t instanceof e) {
      t = t[0];
    }
    var r = new T(t, n);
    i.push(r);
    r.update();
    return r;
  };
  t.update = function() {
    v = null;
    y();
    x();
  };
  t.recalculateLocations = function() {
    t.documentHeight = 0;
    t.update();
  };
  return t;
});

/* Count It Up */
function countUp(a, b, c, d, e, f) {
  for (
    var g = 0, h = ["webkit", "moz", "ms", "o"], i = 0;
    i < h.length && !window.requestAnimationFrame;
    ++i
  )
    (window.requestAnimationFrame = window[h[i] + "RequestAnimationFrame"]),
      (window.cancelAnimationFrame =
        window[h[i] + "CancelAnimationFrame"] ||
        window[h[i] + "CancelRequestAnimationFrame"]);
  window.requestAnimationFrame ||
    (window.requestAnimationFrame = function(a) {
      var c = new Date().getTime(),
        d = Math.max(0, 16 - (c - g)),
        e = window.setTimeout(function() {
          a(c + d);
        }, d);
      return (g = c + d), e;
    }),
    window.cancelAnimationFrame ||
      (window.cancelAnimationFrame = function(a) {
        clearTimeout(a);
      }),
    (this.options = f || {
      useEasing: !0,
      useGrouping: !0,
      separator: ",",
      decimal: "."
    }),
    "" == this.options.separator && (this.options.useGrouping = !1),
    null == this.options.prefix && (this.options.prefix = ""),
    null == this.options.suffix && (this.options.suffix = "");
  var j = this;
  (this.d = "string" == typeof a ? document.getElementById(a) : a),
    (this.startVal = Number(b)),
    (this.endVal = Number(c)),
    (this.countDown = this.startVal > this.endVal ? !0 : !1),
    (this.startTime = null),
    (this.timestamp = null),
    (this.remaining = null),
    (this.frameVal = this.startVal),
    (this.rAF = null),
    (this.decimals = Math.max(0, d || 0)),
    (this.dec = Math.pow(10, this.decimals)),
    (this.duration = 1e3 * e || 2e3),
    (this.version = function() {
      return "1.3.1";
    }),
    (this.printValue = function(a) {
      var b = isNaN(a) ? "--" : j.formatNumber(a);
      "INPUT" == j.d.tagName ? (this.d.value = b) : (this.d.innerHTML = b);
    }),
    (this.easeOutExpo = function(a, b, c, d) {
      return (1024 * c * (-Math.pow(2, (-10 * a) / d) + 1)) / 1023 + b;
    }),
    (this.count = function(a) {
      null === j.startTime && (j.startTime = a), (j.timestamp = a);
      var b = a - j.startTime;
      if (((j.remaining = j.duration - b), j.options.useEasing))
        if (j.countDown) {
          var c = j.easeOutExpo(b, 0, j.startVal - j.endVal, j.duration);
          j.frameVal = j.startVal - c;
        } else
          j.frameVal = j.easeOutExpo(
            b,
            j.startVal,
            j.endVal - j.startVal,
            j.duration
          );
      else if (j.countDown) {
        var c = (j.startVal - j.endVal) * (b / j.duration);
        j.frameVal = j.startVal - c;
      } else
        j.frameVal = j.startVal + (j.endVal - j.startVal) * (b / j.duration);
      (j.frameVal = j.countDown
        ? j.frameVal < j.endVal
          ? j.endVal
          : j.frameVal
        : j.frameVal > j.endVal
        ? j.endVal
        : j.frameVal),
        (j.frameVal = Math.round(j.frameVal * j.dec) / j.dec),
        j.printValue(j.frameVal),
        b < j.duration
          ? (j.rAF = requestAnimationFrame(j.count))
          : null != j.callback && j.callback();
    }),
    (this.start = function(a) {
      return (
        (j.callback = a),
        isNaN(j.endVal) || isNaN(j.startVal)
          ? (console.log("countUp error: startVal or endVal is not a number"),
            j.printValue())
          : (j.rAF = requestAnimationFrame(j.count)),
        !1
      );
    }),
    (this.stop = function() {
      cancelAnimationFrame(j.rAF);
    }),
    (this.reset = function() {
      (j.startTime = null),
        (j.startVal = b),
        cancelAnimationFrame(j.rAF),
        j.printValue(j.startVal);
    }),
    (this.resume = function() {
      j.stop(),
        (j.startTime = null),
        (j.duration = j.remaining),
        (j.startVal = j.frameVal),
        requestAnimationFrame(j.count);
    }),
    (this.formatNumber = function(a) {
      (a = a.toFixed(j.decimals)), (a += "");
      var b, c, d, e;
      if (
        ((b = a.split(".")),
        (c = b[0]),
        (d = b.length > 1 ? j.options.decimal + b[1] : ""),
        (e = /(\d+)(\d{3})/),
        j.options.useGrouping)
      )
        for (; e.test(c); ) c = c.replace(e, "$1" + j.options.separator + "$2");
      return j.options.prefix + c + d + j.options.suffix;
    }),
    j.printValue(j.startVal);
}

/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function($) {
  $.fn.hoverIntent = function(handlerIn, handlerOut, selector) {
    var cfg = { interval: 100, sensitivity: 6, timeout: 0 };
    if (typeof handlerIn === "object") {
      cfg = $.extend(cfg, handlerIn);
    } else {
      if ($.isFunction(handlerOut)) {
        cfg = $.extend(cfg, {
          over: handlerIn,
          out: handlerOut,
          selector: selector
        });
      } else {
        cfg = $.extend(cfg, {
          over: handlerIn,
          out: handlerIn,
          selector: handlerOut
        });
      }
    }
    var cX, cY, pX, pY;
    var track = function(ev) {
      cX = ev.pageX;
      cY = ev.pageY;
    };
    var compare = function(ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      if (
        Math.sqrt((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY)) <
        cfg.sensitivity
      ) {
        $(ob).off("mousemove.hoverIntent", track);
        ob.hoverIntent_s = true;
        return cfg.over.apply(ob, [ev]);
      } else {
        pX = cX;
        pY = cY;
        ob.hoverIntent_t = setTimeout(function() {
          compare(ev, ob);
        }, cfg.interval);
      }
    };
    var delay = function(ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      ob.hoverIntent_s = false;
      return cfg.out.apply(ob, [ev]);
    };
    var handleHover = function(e) {
      var ev = $.extend({}, e);
      var ob = this;
      if (ob.hoverIntent_t) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      }
      if (e.type === "mouseenter") {
        pX = ev.pageX;
        pY = ev.pageY;
        $(ob).on("mousemove.hoverIntent", track);
        if (!ob.hoverIntent_s) {
          ob.hoverIntent_t = setTimeout(function() {
            compare(ev, ob);
          }, cfg.interval);
        }
      } else {
        $(ob).off("mousemove.hoverIntent", track);
        if (ob.hoverIntent_s) {
          ob.hoverIntent_t = setTimeout(function() {
            delay(ev, ob);
          }, cfg.timeout);
        }
      }
    };
    return this.on(
      {
        "mouseenter.hoverIntent": handleHover,
        "mouseleave.hoverIntent": handleHover
      },
      cfg.selector
    );
  };
})(jQuery);

/*! Cookies.js - 0.4.0; Copyright (c) 2014, Scott Hamper; http://www.opensource.org/licenses/MIT */
(function(e) {
  "use strict";
  var b = function(a, d, c) {
    return 1 === arguments.length ? b.get(a) : b.set(a, d, c);
  };
  b._document = document;
  b._navigator = navigator;
  b.defaults = { path: "/" };
  b.get = function(a) {
    b._cachedDocumentCookie !== b._document.cookie && b._renewCache();
    return b._cache[a];
  };
  b.set = function(a, d, c) {
    c = b._getExtendedOptions(c);
    c.expires = b._getExpiresDate(d === e ? -1 : c.expires);
    b._document.cookie = b._generateCookieString(a, d, c);
    return b;
  };
  b.expire = function(a, d) {
    return b.set(a, e, d);
  };
  b._getExtendedOptions = function(a) {
    return {
      path: (a && a.path) || b.defaults.path,
      domain: (a && a.domain) || b.defaults.domain,
      expires: (a && a.expires) || b.defaults.expires,
      secure: a && a.secure !== e ? a.secure : b.defaults.secure
    };
  };
  b._isValidDate = function(a) {
    return (
      "[object Date]" === Object.prototype.toString.call(a) &&
      !isNaN(a.getTime())
    );
  };
  b._getExpiresDate = function(a, d) {
    d = d || new Date();
    switch (typeof a) {
      case "number":
        a = new Date(d.getTime() + 1e3 * a);
        break;
      case "string":
        a = new Date(a);
    }
    if (a && !b._isValidDate(a))
      throw Error(
        "`expires` parameter cannot be converted to a valid Date instance"
      );
    return a;
  };
  b._generateCookieString = function(a, b, c) {
    a = a.replace(/[^#$&+\^`|]/g, encodeURIComponent);
    a = a.replace(/\(/g, "%28").replace(/\)/g, "%29");
    b = (b + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
    c = c || {};
    a = a + "=" + b + (c.path ? ";path=" + c.path : "");
    a += c.domain ? ";domain=" + c.domain : "";
    a += c.expires ? ";expires=" + c.expires.toUTCString() : "";
    return (a += c.secure ? ";secure" : "");
  };
  b._getCookieObjectFromString = function(a) {
    var d = {};
    a = a ? a.split("; ") : [];
    for (var c = 0; c < a.length; c++) {
      var f = b._getKeyValuePairFromCookieString(a[c]);
      d[f.key] === e && (d[f.key] = f.value);
    }
    return d;
  };
  b._getKeyValuePairFromCookieString = function(a) {
    var b = a.indexOf("="),
      b = 0 > b ? a.length : b;
    return {
      key: decodeURIComponent(a.substr(0, b)),
      value: decodeURIComponent(a.substr(b + 1))
    };
  };
  b._renewCache = function() {
    b._cache = b._getCookieObjectFromString(b._document.cookie);
    b._cachedDocumentCookie = b._document.cookie;
  };
  b._areEnabled = function() {
    var a = "1" === b.set("cookies.js", 1).get("cookies.js");
    b.expire("cookies.js");
    return a;
  };
  b.enabled = b._areEnabled();
  "function" === typeof define && define.amd
    ? define(function() {
        return b;
      })
    : "undefined" !== typeof exports
    ? ("undefined" !== typeof module &&
        module.exports &&
        (exports = module.exports = b),
      (exports.Cookies = b))
    : (window.Cookies = b);
})();

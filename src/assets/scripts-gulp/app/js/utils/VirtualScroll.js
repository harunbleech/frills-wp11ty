! function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e || self).virtualScroll = t()
}(this, function() {
  var e = 0;

  function t(t) {
    return "__private_" + e++ + "_" + t
  }

  function i(e, t) {
    if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
    return e
  }

  function n() {}
  n.prototype = {
    on: function(e, t, i) {
      var n = this.e || (this.e = {});
      return (n[e] || (n[e] = [])).push({
        fn: t,
        ctx: i
      }), this
    },
    once: function(e, t, i) {
      var n = this;

      function o() {
        n.off(e, o), t.apply(i, arguments)
      }
      return o._ = t, this.on(e, o, i)
    },
    emit: function(e) {
      for (var t = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, o = i.length; n < o; n++) i[n].fn.apply(i[n].ctx, t);
      return this
    },
    off: function(e, t) {
      var i = this.e || (this.e = {}),
        n = i[e],
        o = [];
      if (n && t)
        for (var s = 0, h = n.length; s < h; s++) n[s].fn !== t && n[s].fn._ !== t && o.push(n[s]);
      return o.length ? i[e] = o : delete i[e], this
    }
  };
  var o = n;
  o.TinyEmitter = n;
  var s = "onwheel" in document,
    h = "onmousewheel" in document,
    r = "ontouchstart" in document,
    a = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
    l = !!window.navigator.msPointerEnabled,
    u = "onkeydown" in document,
    c = navigator.userAgent.indexOf("Firefox") > -1,
    d = "virtualscroll",
    v = t("options"),
    f = t("el"),
    p = t("emitter"),
    y = t("event"),
    w = t("touchStart"),
    _ = t("bodyTouchAction");
  return function() {
    function e(e) {
      var t;
      Object.defineProperty(this, v, {
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, f, {
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, p, {
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, y, {
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, w, {
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, _, {
        writable: !0,
        value: void 0
      }), t = this, ["_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"].forEach(function(e) {
        t[e] = t[e].bind(t)
      }), i(this, f)[f] = window, e && e.el && (i(this, f)[f] = e.el, delete e.el), i(this, v)[v] = Object.assign({
        mouseMultiplier: 1,
        touchMultiplier: 2,
        firefoxMultiplier: 15,
        keyStep: 120,
        preventTouch: !1,
        unpreventTouchClass: "vs-touchmove-allowed",
        useKeyboard: !0,
        useTouch: !0
      }, e), i(this, p)[p] = new o, i(this, y)[y] = {
        y: 0,
        x: 0,
        deltaX: 0,
        deltaY: 0
      }, i(this, w)[w] = {
        x: null,
        y: null
      }, i(this, _)[_] = null, void 0 !== i(this, v)[v].passive && (this.listenerOptions = {
        passive: i(this, v)[v].passive
      })
    }
    var t = e.prototype;
    return t._notify = function(e) {
      var t = i(this, y)[y];
      t.x += t.deltaX, t.y += t.deltaY, i(this, p)[p].emit(d, {
        x: t.x,
        y: t.y,
        deltaX: t.deltaX,
        deltaY: t.deltaY,
        originalEvent: e
      })
    }, t._onWheel = function(e) {
      var t = i(this, v)[v],
        n = i(this, y)[y];
      n.deltaX = e.wheelDeltaX || -1 * e.deltaX, n.deltaY = e.wheelDeltaY || -1 * e.deltaY, c && 1 === e.deltaMode && (n.deltaX *= t.firefoxMultiplier, n.deltaY *= t.firefoxMultiplier), n.deltaX *= t.mouseMultiplier, n.deltaY *= t.mouseMultiplier, this._notify(e)
    }, t._onMouseWheel = function(e) {
      var t = i(this, y)[y];
      t.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0, t.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta, this._notify(e)
    }, t._onTouchStart = function(e) {
      var t = e.targetTouches ? e.targetTouches[0] : e;
      i(this, w)[w].x = t.pageX, i(this, w)[w].y = t.pageY
    }, t._onTouchMove = function(e) {
      var t = i(this, v)[v];
      t.preventTouch && !e.target.classList.contains(t.unpreventTouchClass) && e.preventDefault();
      var n = i(this, y)[y],
        o = e.targetTouches ? e.targetTouches[0] : e;
      n.deltaX = (o.pageX - i(this, w)[w].x) * t.touchMultiplier, n.deltaY = (o.pageY - i(this, w)[w].y) * t.touchMultiplier, i(this, w)[w].x = o.pageX, i(this, w)[w].y = o.pageY, this._notify(e)
    }, t._onKeyDown = function(e) {
      var t = i(this, y)[y];
      t.deltaX = t.deltaY = 0;
      var n = window.innerHeight - 40;
      switch (e.keyCode) {
        case 37:
        case 38:
          t.deltaY = i(this, v)[v].keyStep;
          break;
        case 39:
        case 40:
          t.deltaY = -i(this, v)[v].keyStep;
          break;
        case e.shiftKey:
          t.deltaY = n;
          break;
        case 32:
          t.deltaY = -n;
          break;
        default:
          return
      }
      this._notify(e)
    }, t._bind = function() {
      s && i(this, f)[f].addEventListener("wheel", this._onWheel, this.listenerOptions), h && i(this, f)[f].addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), r && i(this, v)[v].useTouch && (i(this, f)[f].addEventListener("touchstart", this._onTouchStart, this.listenerOptions), i(this, f)[f].addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), l && a && (i(this, _)[_] = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", i(this, f)[f].addEventListener("MSPointerDown", this._onTouchStart, !0), i(this, f)[f].addEventListener("MSPointerMove", this._onTouchMove, !0)), u && i(this, v)[v].useKeyboard && document.addEventListener("keydown", this._onKeyDown)
    }, t._unbind = function() {
      s && i(this, f)[f].removeEventListener("wheel", this._onWheel), h && i(this, f)[f].removeEventListener("mousewheel", this._onMouseWheel), r && (i(this, f)[f].removeEventListener("touchstart", this._onTouchStart), i(this, f)[f].removeEventListener("touchmove", this._onTouchMove)), l && a && (document.body.style.msTouchAction = i(this, _)[_], i(this, f)[f].removeEventListener("MSPointerDown", this._onTouchStart, !0), i(this, f)[f].removeEventListener("MSPointerMove", this._onTouchMove, !0)), u && i(this, v)[v].useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
    }, t.on = function(e, t) {
      i(this, p)[p].on(d, e, t);
      var n = i(this, p)[p].e;
      n && n[d] && 1 === n[d].length && this._bind()
    }, t.off = function(e, t) {
      i(this, p)[p].off(d, e, t);
      var n = i(this, p)[p].e;
      (!n[d] || n[d].length <= 0) && this._unbind()
    }, t.destroy = function() {
      i(this, p)[p].off(), this._unbind()
    }, e
  }()
});

/*var VirtualScroll = (function(document) {

  var vs = {};

  var numListeners, listeners = [], initialized = false;

  var touchStartX, touchStartY;

  // [ These settings can be customized with the options() function below ]
  // Mutiply the touch action by two making the scroll a bit faster than finger movement
  var touchMult = 2;
  // Firefox on Windows needs a boost, since scrolling is very slow
  var firefoxMult = 60;
  //
  var chromeMult = .4;
  //
  var edgeMult = .4;
  // How many pixels to move with each key press
  var keyStep = 120;
  // General multiplier for all mousehweel including FF
  var mouseMult = 1;

  var bodyTouchAction;

  var hasWheelEvent = 'onwheel' in document;
  var hasMouseWheelEvent = 'onmousewheel' in document;
  var hasTouch = 'ontouchstart' in document;
  var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
  var hasPointer = !!window.navigator.msPointerEnabled;
  var hasKeyDown = 'onkeydown' in document;

  var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
  var isEdge = navigator.userAgent.indexOf('Edge') > -1;
  var isChrome = navigator.userAgent.indexOf('Chrome') > -1;

  var event = {
    y: 0,
    x: 0,
    deltaX: 0,
    deltaY: 0,
    originalEvent: null,
    isKey: false
  };

  vs.on = function(f) {
    if(!initialized) initListeners();
    listeners.push(f);
    numListeners = listeners.length;
  }

  vs.options = function(opt) {
    keyStep = opt.keyStep || 120;
    firefoxMult = opt.firefoxMult || 60;
    chromeMult = opt.chromeMult || .4;
    touchMult = opt.touchMult || 2;
    mouseMult = opt.mouseMult || 1;
  }

  vs.off = function(f) {
    for(var i=0;i<numListeners;i++) {
      if(f === listeners[i]) {
        listeners.splice(i, 1);
      }
    }

    numListeners = listeners.length;
    if(numListeners <= 0) destroyListeners();
  }

  var notify = function(e) {
    event.x += event.deltaX;
    event.y += event.deltaY;
    event.originalEvent = e;

    for(var i = 0; i < numListeners; i++) {
      listeners[i](event);
    }
    event.isKey = false;
  }

  var onWheel = function(e) {
    // In Chrome and in Firefox (at least the new one)
    event.deltaX = e.wheelDeltaX || e.deltaX * -1;
    event.deltaY = e.wheelDeltaY || e.deltaY * -1;

    // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
    // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if(isFirefox && e.deltaMode == 1) {
      event.deltaX *= firefoxMult;
      event.deltaY *= firefoxMult;
    }

    if(isEdge && e.deltaMode == 1) {
      event.deltaX *= firefoxMult;
      event.deltaY *= firefoxMult;
    }

    if(isChrome) {
      event.deltaX *= chromeMult;
      event.deltaY *= chromeMult;
    }

    event.deltaX *= mouseMult;
    event.deltaY *= mouseMult;

    notify(e);
  }

  var onMouseWheel = function(e) {
    // In Safari, IE and in Chrome if 'wheel' isn't defined
    event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
    event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

    notify(e);
  }

  var onTouchStart = function(e) {
    var t = (e.targetTouches) ? e.targetTouches[0] : e;
    touchStartX = t.pageX;
    touchStartY = t.pageY;
  }

  var onTouchMove = function(e) {
    // e.preventDefault(); // < This needs to be managed externally
    var t = (e.targetTouches) ? e.targetTouches[0] : e;

    event.deltaX = (t.pageX - touchStartX) * touchMult;
    event.deltaY = (t.pageY - touchStartY) * touchMult;

    touchStartX = t.pageX;
    touchStartY = t.pageY;

    notify(e);
  }

  var onKeyDown = function(e) {
    // 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
    event.deltaX = event.deltaY = 0;

    switch(e.keyCode) {
      case 37:
        event.deltaX = -keyStep;
        event.isKey = true;
        break;
      case 39:
        event.deltaX = keyStep;
        event.isKey = true;
        break;
      case 38:
        event.deltaY = keyStep;
        event.isKey = true;
        break;
      case 40:
        event.deltaY = -keyStep;
        event.isKey = true;
        break;
    }

    notify(e);
  }

  var initListeners = function() {
    if(hasWheelEvent) document.addEventListener("wheel", onWheel, { capture: false, passive: true });
    if(hasMouseWheelEvent) document.addEventListener("mousewheel", onMouseWheel,{ capture: false, passive: true });

    if(hasTouch) {
      document.addEventListener("touchstart", onTouchStart, {passive: true});
      document.addEventListener("touchmove", onTouchMove, {passive: true});
    }

    if(hasPointer && hasTouchWin) {
      bodyTouchAction = document.body.style.msTouchAction;
      document.body.style.msTouchAction = "none";
      document.addEventListener("MSPointerDown", onTouchStart, {passive: true});
      document.addEventListener("MSPointerMove", onTouchMove, {passive: true});
    }

    if(hasKeyDown) document.addEventListener("keydown", onKeyDown, {passive: true});

    initialized = true;
  }

  var destroyListeners = function() {
    if(hasWheelEvent) document.removeEventListener("wheel", onWheel);
    if(hasMouseWheelEvent) document.removeEventListener("mousewheel", onMouseWheel);

    if(hasTouch) {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    }

    if(hasPointer && hasTouchWin) {
      document.body.style.msTouchAction = bodyTouchAction;
      document.removeEventListener("MSPointerDown", onTouchStart, true);
      document.removeEventListener("MSPointerMove", onTouchMove, true);
    }

    if(hasKeyDown) document.removeEventListener("keydown", onKeyDown);

    initialized = false;
  }

  return vs;
})(document);




*/
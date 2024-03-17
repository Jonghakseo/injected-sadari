console.log("on load custom ladder")

const VICTIM = "VICTIM" //TODO from global?
const TARGET = "KEYWORD"

document.getElementById('ladders_canvas').remove()
const newCanvas = document.createElement('canvas')
newCanvas.id = 'ladders_canvas'
newCanvas.width = 580;
newCanvas.height = 320;
document.getElementById('ladders').appendChild(newCanvas)

this.createjs = this.createjs || {},
  createjs.extend = function (t, e) {
    "use strict";

    function i() {
      this.constructor = t
    }

    return i.prototype = e.prototype,
      t.prototype = new i
  }
  ,
  this.createjs = this.createjs || {},
  createjs.promote = function (t, e) {
    "use strict";
    var i = t.prototype
      , s = Object.getPrototypeOf && Object.getPrototypeOf(i) || i.__proto__;
    if (s)
      for (var n in i[(e += "_") + "constructor"] = s.constructor,
        s)
        i.hasOwnProperty(n) && "function" == typeof s[n] && (i[e + n] = s[n]);
    return t
  }
  ,
  this.createjs = this.createjs || {},
  createjs.indexOf = function (t, e) {
    "use strict";
    for (var i = 0, s = t.length; i < s; i++)
      if (e === t[i])
        return i;
    return -1
  }
  ,
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i) {
      this.type = t,
        this.target = null,
        this.currentTarget = null,
        this.eventPhase = 0,
        this.bubbles = !!e,
        this.cancelable = !!i,
        this.timeStamp = (new Date).getTime(),
        this.defaultPrevented = !1,
        this.propagationStopped = !1,
        this.immediatePropagationStopped = !1,
        this.removed = !1
    }

    var e = t.prototype;
    e.preventDefault = function () {
      this.defaultPrevented = this.cancelable && !0
    }
      ,
      e.stopPropagation = function () {
        this.propagationStopped = !0
      }
      ,
      e.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0
      }
      ,
      e.remove = function () {
        this.removed = !0
      }
      ,
      e.clone = function () {
        return new t(this.type, this.bubbles, this.cancelable)
      }
      ,
      e.set = function (t) {
        for (var e in t)
          this[e] = t[e];
        return this
      }
      ,
      e.toString = function () {
        return "[Event (type=" + this.type + ")]"
      }
      ,
      createjs.Event = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t() {
      this._listeners = null,
        this._captureListeners = null
    }

    var e = t.prototype;
    t.initialize = function (t) {
      t.addEventListener = e.addEventListener,
        t.on = e.on,
        t.removeEventListener = t.off = e.removeEventListener,
        t.removeAllEventListeners = e.removeAllEventListeners,
        t.hasEventListener = e.hasEventListener,
        t.dispatchEvent = e.dispatchEvent,
        t._dispatchEvent = e._dispatchEvent,
        t.willTrigger = e.willTrigger
    }
      ,
      e.addEventListener = function (t, e, i) {
        var s = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {}
          , n = s[t];
        return n && this.removeEventListener(t, e, i),
          (n = s[t]) ? n.push(e) : s[t] = [e],
          e
      }
      ,
      e.on = function (t, e, i, s, n, r) {
        return e.handleEvent && (i = i || e,
          e = e.handleEvent),
          i = i || this,
          this.addEventListener(t, function (t) {
            e.call(i, t, n),
            s && t.remove()
          }, r)
      }
      ,
      e.removeEventListener = function (t, e, i) {
        var s = i ? this._captureListeners : this._listeners;
        if (s) {
          var n = s[t];
          if (n)
            for (var r = 0, a = n.length; r < a; r++)
              if (n[r] == e) {
                1 == a ? delete s[t] : n.splice(r, 1);
                break
              }
        }
      }
      ,
      e.off = e.removeEventListener,
      e.removeAllEventListeners = function (t) {
        t ? (this._listeners && delete this._listeners[t],
        this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
      }
      ,
      e.dispatchEvent = function (t, e, i) {
        if ("string" == typeof t) {
          var s = this._listeners;
          if (!(e || s && s[t]))
            return !0;
          t = new createjs.Event(t, e, i)
        } else
          t.target && t.clone && (t = t.clone());
        try {
          t.target = this
        } catch (t) {
        }
        if (t.bubbles && this.parent) {
          for (var n = this, r = [n]; n.parent;)
            r.push(n = n.parent);
          for (var a = r.length, h = a - 1; 0 <= h && !t.propagationStopped; h--)
            r[h]._dispatchEvent(t, 1 + (0 == h));
          for (h = 1; h < a && !t.propagationStopped; h++)
            r[h]._dispatchEvent(t, 3)
        } else
          this._dispatchEvent(t, 2);
        return !t.defaultPrevented
      }
      ,
      e.hasEventListener = function (t) {
        var e = this._listeners
          , i = this._captureListeners;
        return !!(e && e[t] || i && i[t])
      }
      ,
      e.willTrigger = function (t) {
        for (var e = this; e;) {
          if (e.hasEventListener(t))
            return !0;
          e = e.parent
        }
        return !1
      }
      ,
      e.toString = function () {
        return "[EventDispatcher]"
      }
      ,
      e._dispatchEvent = function (t, e) {
        var i, s = 1 == e ? this._captureListeners : this._listeners;
        if (t && s && ((n = s[t.type]) && (i = n.length))) {
          try {
            t.currentTarget = this
          } catch (t) {
          }
          try {
            t.eventPhase = e
          } catch (t) {
          }
          t.removed = !1;
          for (var n = n.slice(), r = 0; r < i && !t.immediatePropagationStopped; r++) {
            var a = n[r];
            a.handleEvent ? a.handleEvent(t) : a(t),
            t.removed && (this.off(t.type, a, 1 == e),
              t.removed = !1)
          }
        }
      }
      ,
      createjs.EventDispatcher = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function r() {
      throw "Ticker cannot be instantiated."
    }

    r.RAF_SYNCHED = "synched",
      r.RAF = "raf",
      r.TIMEOUT = "timeout",
      r.useRAF = !1,
      r.timingMode = null,
      r.maxDelta = 0,
      r.paused = !1,
      r.removeEventListener = null,
      r.removeAllEventListeners = null,
      r.dispatchEvent = null,
      r.hasEventListener = null,
      r._listeners = null,
      createjs.EventDispatcher.initialize(r),
      r._addEventListener = r.addEventListener,
      r.addEventListener = function () {
        return r._inited || r.init(),
          r._addEventListener.apply(r, arguments)
      }
      ,
      r._inited = !1,
      r._startTime = 0,
      r._pausedTime = 0,
      r._ticks = 0,
      r._pausedTicks = 0,
      r._interval = 50,
      r._lastTime = 0,
      r._times = null,
      r._tickTimes = null,
      r._timerId = null,
      r._raf = !0,
      r.setInterval = function (t) {
        r._interval = t,
        r._inited && r._setupTick()
      }
      ,
      r.getInterval = function () {
        return r._interval
      }
      ,
      r.setFPS = function (t) {
        r.setInterval(1e3 / t)
      }
      ,
      r.getFPS = function () {
        return 1e3 / r._interval
      }
    ;
    try {
      Object.defineProperties(r, {
        interval: {
          get: r.getInterval,
          set: r.setInterval
        },
        framerate: {
          get: r.getFPS,
          set: r.setFPS
        }
      })
    } catch (t) {
    }
    r.init = function () {
      r._inited || (r._inited = !0,
        r._times = [],
        r._tickTimes = [],
        r._startTime = r._getTime(),
        r._times.push(r._lastTime = 0),
        r.interval = r._interval)
    }
      ,
      r.reset = function () {
        var t;
        r._raf ? (t = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame) && t(r._timerId) : clearTimeout(r._timerId),
          r.removeAllEventListeners("tick"),
          r._timerId = r._times = r._tickTimes = null,
          r._startTime = r._lastTime = r._ticks = 0,
          r._inited = !1
      }
      ,
      r.getMeasuredTickTime = function (t) {
        var e = 0
          , i = r._tickTimes;
        if (!i || i.length < 1)
          return -1;
        t = Math.min(i.length, t || 0 | r.getFPS());
        for (var s = 0; s < t; s++)
          e += i[s];
        return e / t
      }
      ,
      r.getMeasuredFPS = function (t) {
        var e = r._times;
        return !e || e.length < 2 ? -1 : (t = Math.min(e.length - 1, t || 0 | r.getFPS()),
        1e3 / ((e[0] - e[t]) / t))
      }
      ,
      r.setPaused = function (t) {
        r.paused = t
      }
      ,
      r.getPaused = function () {
        return r.paused
      }
      ,
      r.getTime = function (t) {
        return r._startTime ? r._getTime() - (t ? r._pausedTime : 0) : -1
      }
      ,
      r.getEventTime = function (t) {
        return r._startTime ? (r._lastTime || r._startTime) - (t ? r._pausedTime : 0) : -1
      }
      ,
      r.getTicks = function (t) {
        return r._ticks - (t ? r._pausedTicks : 0)
      }
      ,
      r._handleSynch = function () {
        r._timerId = null,
          r._setupTick(),
        r._getTime() - r._lastTime >= .97 * (r._interval - 1) && r._tick()
      }
      ,
      r._handleRAF = function () {
        r._timerId = null,
          r._setupTick(),
          r._tick()
      }
      ,
      r._handleTimeout = function () {
        r._timerId = null,
          r._setupTick(),
          r._tick()
      }
      ,
      r._setupTick = function () {
        if (null == r._timerId) {
          var t = r.timingMode || r.useRAF && r.RAF_SYNCHED;
          if (t == r.RAF_SYNCHED || t == r.RAF) {
            var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            if (e)
              return r._timerId = e(t == r.RAF ? r._handleRAF : r._handleSynch),
                void (r._raf = !0)
          }
          r._raf = !1,
            r._timerId = setTimeout(r._handleTimeout, r._interval)
        }
      }
      ,
      r._tick = function () {
        var t, e, i = r.paused, s = r._getTime(), n = s - r._lastTime;
        for (r._lastTime = s,
               r._ticks++,
             i && (r._pausedTicks++,
               r._pausedTime += n),
             r.hasEventListener("tick") && ((t = new createjs.Event("tick")).delta = (e = r.maxDelta) && e < n ? e : n,
               t.paused = i,
               t.time = s,
               t.runTime = s - r._pausedTime,
               r.dispatchEvent(t)),
               r._tickTimes.unshift(r._getTime() - s); 100 < r._tickTimes.length;)
          r._tickTimes.pop();
        for (r._times.unshift(s); 100 < r._times.length;)
          r._times.pop()
      }
    ;
    var t = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
    r._getTime = function () {
      return (t && t.call(performance) || (new Date).getTime()) - r._startTime
    }
      ,
      createjs.Ticker = r
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t() {
      throw "UID cannot be instantiated"
    }

    t._nextID = 0,
      t.get = function () {
        return t._nextID++
      }
      ,
      createjs.UID = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i, s, n, r, a, h, o, c, l) {
      this.Event_constructor(t, e, i),
        this.stageX = s,
        this.stageY = n,
        this.rawX = null == o ? s : o,
        this.rawY = null == c ? n : c,
        this.nativeEvent = r,
        this.pointerID = a,
        this.primary = !!h,
        this.relatedTarget = l
    }

    var e = createjs.extend(t, createjs.Event);
    e._get_localX = function () {
      return this.currentTarget.globalToLocal(this.rawX, this.rawY).x
    }
      ,
      e._get_localY = function () {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).y
      }
      ,
      e._get_isTouch = function () {
        return -1 !== this.pointerID
      }
    ;
    try {
      Object.defineProperties(e, {
        localX: {
          get: e._get_localX
        },
        localY: {
          get: e._get_localY
        },
        isTouch: {
          get: e._get_isTouch
        }
      })
    } catch (t) {
    }
    e.clone = function () {
      return new t(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
    }
      ,
      e.toString = function () {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
      }
      ,
      createjs.MouseEvent = createjs.promote(t, "Event")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function l(t, e, i, s, n, r) {
      this.setValues(t, e, i, s, n, r)
    }

    var t = l.prototype;
    l.DEG_TO_RAD = Math.PI / 180,
      l.identity = null,
      t.setValues = function (t, e, i, s, n, r) {
        return this.a = null == t ? 1 : t,
          this.b = e || 0,
          this.c = i || 0,
          this.d = null == s ? 1 : s,
          this.tx = n || 0,
          this.ty = r || 0,
          this
      }
      ,
      t.append = function (t, e, i, s, n, r) {
        var a = this.a
          , h = this.b
          , o = this.c
          , c = this.d;
        return 1 == t && 0 == e && 0 == i && 1 == s || (this.a = a * t + o * e,
          this.b = h * t + c * e,
          this.c = a * i + o * s,
          this.d = h * i + c * s),
          this.tx = a * n + o * r + this.tx,
          this.ty = h * n + c * r + this.ty,
          this
      }
      ,
      t.prepend = function (t, e, i, s, n, r) {
        var a = this.a
          , h = this.c
          , o = this.tx;
        return this.a = t * a + i * this.b,
          this.b = e * a + s * this.b,
          this.c = t * h + i * this.d,
          this.d = e * h + s * this.d,
          this.tx = t * o + i * this.ty + n,
          this.ty = e * o + s * this.ty + r,
          this
      }
      ,
      t.appendMatrix = function (t) {
        return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty)
      }
      ,
      t.prependMatrix = function (t) {
        return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty)
      }
      ,
      t.appendTransform = function (t, e, i, s, n, r, a, h, o) {
        var c, n = n % 360 ? (n = n * l.DEG_TO_RAD,
          c = Math.cos(n),
          Math.sin(n)) : (c = 1,
          0);
        return r || a ? (r *= l.DEG_TO_RAD,
          a *= l.DEG_TO_RAD,
          this.append(Math.cos(a), Math.sin(a), -Math.sin(r), Math.cos(r), t, e),
          this.append(c * i, n * i, -n * s, c * s, 0, 0)) : this.append(c * i, n * i, -n * s, c * s, t, e),
        (h || o) && (this.tx -= h * this.a + o * this.c,
          this.ty -= h * this.b + o * this.d),
          this
      }
      ,
      t.prependTransform = function (t, e, i, s, n, r, a, h, o) {
        var c, n = n % 360 ? (n = n * l.DEG_TO_RAD,
          c = Math.cos(n),
          Math.sin(n)) : (c = 1,
          0);
        return (h || o) && (this.tx -= h,
          this.ty -= o),
          r || a ? (r *= l.DEG_TO_RAD,
            a *= l.DEG_TO_RAD,
            this.prepend(c * i, n * i, -n * s, c * s, 0, 0),
            this.prepend(Math.cos(a), Math.sin(a), -Math.sin(r), Math.cos(r), t, e)) : this.prepend(c * i, n * i, -n * s, c * s, t, e),
          this
      }
      ,
      t.rotate = function (t) {
        t *= l.DEG_TO_RAD;
        var e = Math.cos(t)
          , t = Math.sin(t)
          , i = this.a
          , s = this.b;
        return this.a = i * e + this.c * t,
          this.b = s * e + this.d * t,
          this.c = -i * t + this.c * e,
          this.d = -s * t + this.d * e,
          this
      }
      ,
      t.skew = function (t, e) {
        return t *= l.DEG_TO_RAD,
          e *= l.DEG_TO_RAD,
          this.append(Math.cos(e), Math.sin(e), -Math.sin(t), Math.cos(t), 0, 0),
          this
      }
      ,
      t.scale = function (t, e) {
        return this.a *= t,
          this.b *= t,
          this.c *= e,
          this.d *= e,
          this
      }
      ,
      t.translate = function (t, e) {
        return this.tx += this.a * t + this.c * e,
          this.ty += this.b * t + this.d * e,
          this
      }
      ,
      t.identity = function () {
        return this.a = this.d = 1,
          this.b = this.c = this.tx = this.ty = 0,
          this
      }
      ,
      t.invert = function () {
        var t = this.a
          , e = this.b
          , i = this.c
          , s = this.d
          , n = this.tx
          , r = t * s - e * i;
        return this.a = s / r,
          this.b = -e / r,
          this.c = -i / r,
          this.d = t / r,
          this.tx = (i * this.ty - s * n) / r,
          this.ty = -(t * this.ty - e * n) / r,
          this
      }
      ,
      t.isIdentity = function () {
        return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d
      }
      ,
      t.equals = function (t) {
        return this.tx === t.tx && this.ty === t.ty && this.a === t.a && this.b === t.b && this.c === t.c && this.d === t.d
      }
      ,
      t.transformPoint = function (t, e, i) {
        return (i = i || {}).x = t * this.a + e * this.c + this.tx,
          i.y = t * this.b + e * this.d + this.ty,
          i
      }
      ,
      t.decompose = function (t) {
        (t = null == t ? {} : t).x = this.tx,
          t.y = this.ty,
          t.scaleX = Math.sqrt(this.a * this.a + this.b * this.b),
          t.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var e = Math.atan2(-this.c, this.d)
          , i = Math.atan2(this.b, this.a);
        return Math.abs(1 - e / i) < 1e-5 ? (t.rotation = i / l.DEG_TO_RAD,
        this.a < 0 && 0 <= this.d && (t.rotation += t.rotation <= 0 ? 180 : -180),
          t.skewX = t.skewY = 0) : (t.skewX = e / l.DEG_TO_RAD,
          t.skewY = i / l.DEG_TO_RAD),
          t
      }
      ,
      t.copy = function (t) {
        return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty)
      }
      ,
      t.clone = function () {
        return new l(this.a, this.b, this.c, this.d, this.tx, this.ty)
      }
      ,
      t.toString = function () {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
      }
      ,
      l.identity = new l,
      createjs.Matrix2D = l
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i, s, n) {
      this.setValues(t, e, i, s, n)
    }

    var e = t.prototype;
    e.setValues = function (t, e, i, s, n) {
      return this.visible = null == t || !!t,
        this.alpha = null == e ? 1 : e,
        this.shadow = i,
        this.compositeOperation = s,
        this.matrix = n || this.matrix && this.matrix.identity() || new createjs.Matrix2D,
        this
    }
      ,
      e.append = function (t, e, i, s, n) {
        return this.alpha *= e,
          this.shadow = i || this.shadow,
          this.compositeOperation = s || this.compositeOperation,
          this.visible = this.visible && t,
        n && this.matrix.appendMatrix(n),
          this
      }
      ,
      e.prepend = function (t, e, i, s, n) {
        return this.alpha *= e,
          this.shadow = this.shadow || i,
          this.compositeOperation = this.compositeOperation || s,
          this.visible = this.visible && t,
        n && this.matrix.prependMatrix(n),
          this
      }
      ,
      e.identity = function () {
        return this.visible = !0,
          this.alpha = 1,
          this.shadow = this.compositeOperation = null,
          this.matrix.identity(),
          this
      }
      ,
      e.clone = function () {
        return new t(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone())
      }
      ,
      createjs.DisplayProps = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e) {
      this.setValues(t, e)
    }

    var e = t.prototype;
    e.setValues = function (t, e) {
      return this.x = t || 0,
        this.y = e || 0,
        this
    }
      ,
      e.copy = function (t) {
        return this.x = t.x,
          this.y = t.y,
          this
      }
      ,
      e.clone = function () {
        return new t(this.x, this.y)
      }
      ,
      e.toString = function () {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
      }
      ,
      createjs.Point = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function n(t, e, i, s) {
      this.setValues(t, e, i, s)
    }

    var t = n.prototype;
    t.setValues = function (t, e, i, s) {
      return this.x = t || 0,
        this.y = e || 0,
        this.width = i || 0,
        this.height = s || 0,
        this
    }
      ,
      t.extend = function (t, e, i, s) {
        return s = s || 0,
        t + (i = i || 0) > this.x + this.width && (this.width = t + i - this.x),
        e + s > this.y + this.height && (this.height = e + s - this.y),
        t < this.x && (this.width += this.x - t,
          this.x = t),
        e < this.y && (this.height += this.y - e,
          this.y = e),
          this
      }
      ,
      t.pad = function (t, e, i, s) {
        return this.x -= e,
          this.y -= t,
          this.width += e + s,
          this.height += t + i,
          this
      }
      ,
      t.copy = function (t) {
        return this.setValues(t.x, t.y, t.width, t.height)
      }
      ,
      t.contains = function (t, e, i, s) {
        return i = i || 0,
          s = s || 0,
        t >= this.x && t + i <= this.x + this.width && e >= this.y && e + s <= this.y + this.height
      }
      ,
      t.union = function (t) {
        return this.clone().extend(t.x, t.y, t.width, t.height)
      }
      ,
      t.intersection = function (t) {
        var e = t.x
          , i = t.y
          , s = e + t.width
          , t = i + t.height;
        return this.x > e && (e = this.x),
        this.y > i && (i = this.y),
        this.x + this.width < s && (s = this.x + this.width),
        this.y + this.height < t && (t = this.y + this.height),
          s <= e || t <= i ? null : new n(e, i, s - e, t - i)
      }
      ,
      t.intersects = function (t) {
        return t.x <= this.x + this.width && this.x <= t.x + t.width && t.y <= this.y + this.height && this.y <= t.y + t.height
      }
      ,
      t.isEmpty = function () {
        return this.width <= 0 || this.height <= 0
      }
      ,
      t.clone = function () {
        return new n(this.x, this.y, this.width, this.height)
      }
      ,
      t.toString = function () {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
      }
      ,
      createjs.Rectangle = n
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i, s, n, r, a) {
      t.addEventListener && (this.target = t,
        this.overLabel = null == i ? "over" : i,
        this.outLabel = null == e ? "out" : e,
        this.downLabel = null == s ? "down" : s,
        this.play = n,
        this._isPressed = !1,
        this._isOver = !1,
        this._enabled = !1,
        t.mouseChildren = !1,
        this.enabled = !0,
        this.handleEvent({}),
        r) && (a && (r.actionsEnabled = !1,
        r.gotoAndStop) && r.gotoAndStop(a),
        t.hitArea = r)
    }

    var e = t.prototype;
    e.setEnabled = function (t) {
      var e;
      t != this._enabled && (e = this.target,
        (this._enabled = t) ? (e.cursor = "pointer",
          e.addEventListener("rollover", this),
          e.addEventListener("rollout", this),
          e.addEventListener("mousedown", this),
          e.addEventListener("pressup", this),
        e._reset && (e.__reset = e._reset,
          e._reset = this._reset)) : (e.cursor = null,
          e.removeEventListener("rollover", this),
          e.removeEventListener("rollout", this),
          e.removeEventListener("mousedown", this),
          e.removeEventListener("pressup", this),
        e.__reset && (e._reset = e.__reset,
          delete e.__reset)))
    }
      ,
      e.getEnabled = function () {
        return this._enabled
      }
    ;
    try {
      Object.defineProperties(e, {
        enabled: {
          get: e.getEnabled,
          set: e.setEnabled
        }
      })
    } catch (t) {
    }
    e.toString = function () {
      return "[ButtonHelper]"
    }
      ,
      e.handleEvent = function (t) {
        var e = this.target
          , t = t.type
          , t = "mousedown" == t ? (this._isPressed = !0,
          this.downLabel) : "pressup" == t ? (this._isPressed = !1,
          this._isOver ? this.overLabel : this.outLabel) : "rollover" == t ? (this._isOver = !0,
          this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1,
          this._isPressed ? this.overLabel : this.outLabel);
        this.play ? e.gotoAndPlay && e.gotoAndPlay(t) : e.gotoAndStop && e.gotoAndStop(t)
      }
      ,
      e._reset = function () {
        var t = this.paused;
        this.__reset(),
          this.paused = t
      }
      ,
      createjs.ButtonHelper = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i, s) {
      this.color = t || "black",
        this.offsetX = e || 0,
        this.offsetY = i || 0,
        this.blur = s || 0
    }

    var e = t.prototype;
    t.identity = new t("transparent", 0, 0, 0),
      e.toString = function () {
        return "[Shadow]"
      }
      ,
      e.clone = function () {
        return new t(this.color, this.offsetX, this.offsetY, this.blur)
      }
      ,
      createjs.Shadow = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t) {
      this.EventDispatcher_constructor(),
        this.complete = !0,
        this.framerate = 0,
        this._animations = null,
        this._frames = null,
        this._images = null,
        this._data = null,
        this._loadCount = 0,
        this._frameHeight = 0,
        this._frameWidth = 0,
        this._numFrames = 0,
        this._regX = 0,
        this._regY = 0,
        this._spacing = 0,
        this._margin = 0,
        this._parseData(t)
    }

    var e = createjs.extend(t, createjs.EventDispatcher);
    e.getAnimations = function () {
      return this._animations.slice()
    }
    ;
    try {
      Object.defineProperties(e, {
        animations: {
          get: e.getAnimations
        }
      })
    } catch (t) {
    }
    e.getNumFrames = function (t) {
      return null == t ? this._frames ? this._frames.length : this._numFrames || 0 : null == (t = this._data[t]) ? 0 : t.frames.length
    }
      ,
      e.getAnimation = function (t) {
        return this._data[t]
      }
      ,
      e.getFrame = function (t) {
        return this._frames && (t = this._frames[t]) ? t : null
      }
      ,
      e.getFrameBounds = function (t, e) {
        t = this.getFrame(t);
        return t ? (e || new createjs.Rectangle).setValues(-t.regX, -t.regY, t.rect.width, t.rect.height) : null
      }
      ,
      e.toString = function () {
        return "[SpriteSheet]"
      }
      ,
      e.clone = function () {
        throw "SpriteSheet cannot be cloned."
      }
      ,
      e._parseData = function (t) {
        var e, i, s, n;
        if (null != t) {
          if (this.framerate = t.framerate || 0,
          t.images && 0 < (i = t.images.length))
            for (u = this._images = [],
                   e = 0; e < i; e++) {
              var r, a = t.images[e];
              "string" == typeof a && (r = a,
                (a = document.createElement("img")).src = r),
                u.push(a),
              a.getContext || a.naturalWidth || (this._loadCount++,
                this.complete = !1,
                function (t, e) {
                  a.onload = function () {
                    t._handleImageLoad(e)
                  }
                }(this, r),
                function (t, e) {
                  a.onerror = function () {
                    t._handleImageError(e)
                  }
                }(this, r))
            }
          if (null != t.frames)
            if (Array.isArray(t.frames))
              for (this._frames = [],
                     e = 0,
                     i = (u = t.frames).length; e < i; e++) {
                var h = u[e];
                this._frames.push({
                  image: this._images[h[4] || 0],
                  rect: new createjs.Rectangle(h[0], h[1], h[2], h[3]),
                  regX: h[5] || 0,
                  regY: h[6] || 0
                })
              }
            else
              s = t.frames,
                this._frameWidth = s.width,
                this._frameHeight = s.height,
                this._regX = s.regX || 0,
                this._regY = s.regY || 0,
                this._spacing = s.spacing || 0,
                this._margin = s.margin || 0,
                this._numFrames = s.count,
              0 == this._loadCount && this._calculateFrames();
          if (this._animations = [],
          null != (s = t.animations))
            for (n in this._data = {},
              s) {
              var o = {
                name: n
              }
                , c = s[n];
              if ("number" == typeof c)
                u = o.frames = [c];
              else if (Array.isArray(c))
                if (1 == c.length)
                  o.frames = [c[0]];
                else
                  for (o.speed = c[3],
                         o.next = c[2],
                         u = o.frames = [],
                         e = c[0]; e <= c[1]; e++)
                    u.push(e);
              else {
                o.speed = c.speed,
                  o.next = c.next;
                var l = c.frames
                  , u = o.frames = "number" == typeof l ? [l] : l.slice(0)
              }
              !0 !== o.next && void 0 !== o.next || (o.next = n),
              (!1 === o.next || u.length < 2 && o.next == n) && (o.next = null),
              o.speed || (o.speed = 1),
                this._animations.push(n),
                this._data[n] = o
            }
        }
      }
      ,
      e._handleImageLoad = function () {
        0 == --this._loadCount && (this._calculateFrames(),
          this.complete = !0,
          this.dispatchEvent("complete"))
      }
      ,
      e._handleImageError = function (t) {
        var e = new createjs.Event("error");
        e.src = t,
          this.dispatchEvent(e),
        0 == --this._loadCount && this.dispatchEvent("complete")
      }
      ,
      e._calculateFrames = function () {
        if (!this._frames && 0 != this._frameWidth) {
          this._frames = [];
          var t = this._numFrames || 1e5
            , e = 0
            , i = this._frameWidth
            , s = this._frameHeight
            , n = this._spacing
            , r = this._margin;
          t: for (var a = 0, h = this._images; a < h.length; a++)
            for (var o = h[a], c = o.width, l = o.height, u = r; u <= l - r - s;) {
              for (var d = r; d <= c - r - i;) {
                if (t <= e)
                  break t;
                e++,
                  this._frames.push({
                    image: o,
                    rect: new createjs.Rectangle(d, u, i, s),
                    regX: this._regX,
                    regY: this._regY
                  }),
                  d += i + n
              }
              u += s + n
            }
          this._numFrames = e
        }
      }
      ,
      createjs.SpriteSheet = createjs.promote(t, "EventDispatcher")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function v() {
      this.command = null,
        this._stroke = null,
        this._strokeStyle = null,
        this._oldStrokeStyle = null,
        this._strokeDash = null,
        this._oldStrokeDash = null,
        this._strokeIgnoreScale = !1,
        this._fill = null,
        this._instructions = [],
        this._commitIndex = 0,
        this._activeInstructions = [],
        this._dirty = !1,
        this._storeIndex = 0,
        this.clear()
    }

    var t = v.prototype
      , o = v
      , e = (v.getRGB = function (t, e, i, s) {
      return null != t && null == i && (s = e,
        i = 255 & t,
        e = t >> 8 & 255,
        t = t >> 16 & 255),
        null == s ? "rgb(" + t + "," + e + "," + i + ")" : "rgba(" + t + "," + e + "," + i + "," + s + ")"
    }
      ,
      v.getHSL = function (t, e, i, s) {
        return null == s ? "hsl(" + t % 360 + "," + e + "%," + i + "%)" : "hsla(" + t % 360 + "," + e + "%," + i + "%," + s + ")"
      }
      ,
      v.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63
      },
      v.STROKE_CAPS_MAP = ["butt", "round", "square"],
      v.STROKE_JOINTS_MAP = ["miter", "round", "bevel"],
      createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
    e.getContext && (v._ctx = e.getContext("2d"),
      e.width = e.height = 1),
      t.getInstructions = function () {
        return this._updateInstructions(),
          this._instructions
      }
    ;
    try {
      Object.defineProperties(t, {
        instructions: {
          get: t.getInstructions
        }
      })
    } catch (t) {
    }
    t.isEmpty = function () {
      return !(this._instructions.length || this._activeInstructions.length)
    }
      ,
      t.draw = function (t, e) {
        this._updateInstructions();
        for (var i = this._instructions, s = this._storeIndex, n = i.length; s < n; s++)
          i[s].exec(t, e)
      }
      ,
      t.drawAsPath = function (t) {
        this._updateInstructions();
        for (var e, i = this._instructions, s = this._storeIndex, n = i.length; s < n; s++)
          !1 !== (e = i[s]).path && e.exec(t)
      }
      ,
      t.moveTo = function (t, e) {
        return this.append(new o.MoveTo(t, e), !0)
      }
      ,
      t.lineTo = function (t, e) {
        return this.append(new o.LineTo(t, e))
      }
      ,
      t.arcTo = function (t, e, i, s, n) {
        return this.append(new o.ArcTo(t, e, i, s, n))
      }
      ,
      t.arc = function (t, e, i, s, n, r) {
        return this.append(new o.Arc(t, e, i, s, n, r))
      }
      ,
      t.quadraticCurveTo = function (t, e, i, s) {
        return this.append(new o.QuadraticCurveTo(t, e, i, s))
      }
      ,
      t.bezierCurveTo = function (t, e, i, s, n, r) {
        return this.append(new o.BezierCurveTo(t, e, i, s, n, r))
      }
      ,
      t.rect = function (t, e, i, s) {
        return this.append(new o.Rect(t, e, i, s))
      }
      ,
      t.closePath = function () {
        return this._activeInstructions.length ? this.append(new o.ClosePath) : this
      }
      ,
      t.clear = function () {
        return this._instructions.length = this._activeInstructions.length = this._commitIndex = 0,
          this._strokeStyle = this._oldStrokeStyle = this._stroke = this._fill = this._strokeDash = this._oldStrokeDash = null,
          this._dirty = this._strokeIgnoreScale = !1,
          this
      }
      ,
      t.beginFill = function (t) {
        return this._setFill(t ? new o.Fill(t) : null)
      }
      ,
      t.beginLinearGradientFill = function (t, e, i, s, n, r) {
        return this._setFill((new o.Fill).linearGradient(t, e, i, s, n, r))
      }
      ,
      t.beginRadialGradientFill = function (t, e, i, s, n, r, a, h) {
        return this._setFill((new o.Fill).radialGradient(t, e, i, s, n, r, a, h))
      }
      ,
      t.beginBitmapFill = function (t, e, i) {
        return this._setFill(new o.Fill(null, i).bitmap(t, e))
      }
      ,
      t.endFill = function () {
        return this.beginFill()
      }
      ,
      t.setStrokeStyle = function (t, e, i, s, n) {
        return this._updateInstructions(!0),
          this._strokeStyle = this.command = new o.StrokeStyle(t, e, i, s, n),
        this._stroke && (this._stroke.ignoreScale = n),
          this._strokeIgnoreScale = n,
          this
      }
      ,
      t.setStrokeDash = function (t, e) {
        return this._updateInstructions(!0),
          this._strokeDash = this.command = new o.StrokeDash(t, e),
          this
      }
      ,
      t.beginStroke = function (t) {
        return this._setStroke(t ? new o.Stroke(t) : null)
      }
      ,
      t.beginLinearGradientStroke = function (t, e, i, s, n, r) {
        return this._setStroke((new o.Stroke).linearGradient(t, e, i, s, n, r))
      }
      ,
      t.beginRadialGradientStroke = function (t, e, i, s, n, r, a, h) {
        return this._setStroke((new o.Stroke).radialGradient(t, e, i, s, n, r, a, h))
      }
      ,
      t.beginBitmapStroke = function (t, e) {
        return this._setStroke((new o.Stroke).bitmap(t, e))
      }
      ,
      t.endStroke = function () {
        return this.beginStroke()
      }
      ,
      t.curveTo = t.quadraticCurveTo,
      t.drawRect = t.rect,
      t.drawRoundRect = function (t, e, i, s, n) {
        return this.drawRoundRectComplex(t, e, i, s, n, n, n, n)
      }
      ,
      t.drawRoundRectComplex = function (t, e, i, s, n, r, a, h) {
        return this.append(new o.RoundRect(t, e, i, s, n, r, a, h))
      }
      ,
      t.drawCircle = function (t, e, i) {
        return this.append(new o.Circle(t, e, i))
      }
      ,
      t.drawEllipse = function (t, e, i, s) {
        return this.append(new o.Ellipse(t, e, i, s))
      }
      ,
      t.drawPolyStar = function (t, e, i, s, n, r) {
        return this.append(new o.PolyStar(t, e, i, s, n, r))
      }
      ,
      t.append = function (t, e) {
        return this._activeInstructions.push(t),
          this.command = t,
        e || (this._dirty = !0),
          this
      }
      ,
      t.decodePath = function (t) {
        for (var e = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], i = [2, 2, 4, 6, 0], s = 0, n = t.length, r = [], a = 0, h = 0, o = v.BASE_64; s < n;) {
          var c = t.charAt(s)
            , l = o[c]
            , u = l >> 3
            , d = e[u];
          if (!d || 3 & l)
            throw "bad path data (@" + s + "): " + c;
          var p = i[u];
          u || (a = h = 0),
            s++;
          for (var f = 2 + (l >> 2 & 1), _ = r.length = 0; _ < p; _++) {
            var m = (g = o[t.charAt(s)]) >> 5 ? -1 : 1
              , g = (31 & g) << 6 | o[t.charAt(s + 1)];
            g = m * (g = 3 == f ? g << 6 | o[t.charAt(s + 2)] : g) / 10,
              _ % 2 ? a = g += a : h = g += h,
              r[_] = g,
              s += f
          }
          d.apply(this, r)
        }
        return this
      }
      ,
      t.store = function () {
        return this._updateInstructions(!0),
          this._storeIndex = this._instructions.length,
          this
      }
      ,
      t.unstore = function () {
        return this._storeIndex = 0,
          this
      }
      ,
      t.clone = function () {
        var t = new v;
        return t.command = this.command,
          t._stroke = this._stroke,
          t._strokeStyle = this._strokeStyle,
          t._strokeDash = this._strokeDash,
          t._strokeIgnoreScale = this._strokeIgnoreScale,
          t._fill = this._fill,
          t._instructions = this._instructions.slice(),
          t._commitIndex = this._commitIndex,
          t._activeInstructions = this._activeInstructions.slice(),
          t._dirty = this._dirty,
          t._storeIndex = this._storeIndex,
          t
      }
      ,
      t.toString = function () {
        return "[Graphics]"
      }
      ,
      t.mt = t.moveTo,
      t.lt = t.lineTo,
      t.at = t.arcTo,
      t.bt = t.bezierCurveTo,
      t.qt = t.quadraticCurveTo,
      t.a = t.arc,
      t.r = t.rect,
      t.cp = t.closePath,
      t.c = t.clear,
      t.f = t.beginFill,
      t.lf = t.beginLinearGradientFill,
      t.rf = t.beginRadialGradientFill,
      t.bf = t.beginBitmapFill,
      t.ef = t.endFill,
      t.ss = t.setStrokeStyle,
      t.sd = t.setStrokeDash,
      t.s = t.beginStroke,
      t.ls = t.beginLinearGradientStroke,
      t.rs = t.beginRadialGradientStroke,
      t.bs = t.beginBitmapStroke,
      t.es = t.endStroke,
      t.dr = t.drawRect,
      t.rr = t.drawRoundRect,
      t.rc = t.drawRoundRectComplex,
      t.dc = t.drawCircle,
      t.de = t.drawEllipse,
      t.dp = t.drawPolyStar,
      t.p = t.decodePath,
      t._updateInstructions = function (t) {
        var e = this._instructions
          , i = this._activeInstructions
          , s = this._commitIndex;
        if (this._dirty && i.length) {
          e.length = s,
            e.push(v.beginCmd);
          var n = i.length
            , r = e.length;
          e.length = r + n;
          for (var a = 0; a < n; a++)
            e[a + r] = i[a];
          this._fill && e.push(this._fill),
          this._stroke && (this._strokeDash !== this._oldStrokeDash && (this._oldStrokeDash = this._strokeDash,
            e.push(this._strokeDash)),
          this._strokeStyle !== this._oldStrokeStyle && (this._oldStrokeStyle = this._strokeStyle,
            e.push(this._strokeStyle)),
            e.push(this._stroke)),
            this._dirty = !1
        }
        t && (i.length = 0,
          this._commitIndex = e.length)
      }
      ,
      t._setFill = function (t) {
        return this._updateInstructions(!0),
          this.command = this._fill = t,
          this
      }
      ,
      t._setStroke = function (t) {
        return this._updateInstructions(!0),
        (this.command = this._stroke = t) && (t.ignoreScale = this._strokeIgnoreScale),
          this
      }
      ,
      (o.LineTo = function (t, e) {
          this.x = t,
            this.y = e
        }
      ).prototype.exec = function (t) {
        t.lineTo(this.x, this.y)
      }
      ,
      (o.MoveTo = function (t, e) {
          this.x = t,
            this.y = e
        }
      ).prototype.exec = function (t) {
        t.moveTo(this.x, this.y)
      }
      ,
      (o.ArcTo = function (t, e, i, s, n) {
          this.x1 = t,
            this.y1 = e,
            this.x2 = i,
            this.y2 = s,
            this.radius = n
        }
      ).prototype.exec = function (t) {
        t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius)
      }
      ,
      (o.Arc = function (t, e, i, s, n, r) {
          this.x = t,
            this.y = e,
            this.radius = i,
            this.startAngle = s,
            this.endAngle = n,
            this.anticlockwise = !!r
        }
      ).prototype.exec = function (t) {
        t.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
      }
      ,
      (o.QuadraticCurveTo = function (t, e, i, s) {
          this.cpx = t,
            this.cpy = e,
            this.x = i,
            this.y = s
        }
      ).prototype.exec = function (t) {
        t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y)
      }
      ,
      (o.BezierCurveTo = function (t, e, i, s, n, r) {
          this.cp1x = t,
            this.cp1y = e,
            this.cp2x = i,
            this.cp2y = s,
            this.x = n,
            this.y = r
        }
      ).prototype.exec = function (t) {
        t.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y)
      }
      ,
      (o.Rect = function (t, e, i, s) {
          this.x = t,
            this.y = e,
            this.w = i,
            this.h = s
        }
      ).prototype.exec = function (t) {
        t.rect(this.x, this.y, this.w, this.h)
      }
      ,
      (o.ClosePath = function () {
        }
      ).prototype.exec = function (t) {
        t.closePath()
      }
      ,
      (o.BeginPath = function () {
        }
      ).prototype.exec = function (t) {
        t.beginPath()
      }
      ,
      (t = (o.Fill = function (t, e) {
          this.style = t,
            this.matrix = e
        }
      ).prototype).exec = function (t) {
        var e;
        this.style && (t.fillStyle = this.style,
        (e = this.matrix) && (t.save(),
          t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)),
          t.fill(),
          e) && t.restore()
      }
      ,
      t.linearGradient = function (t, e, i, s, n, r) {
        for (var a = this.style = v._ctx.createLinearGradient(i, s, n, r), h = 0, o = t.length; h < o; h++)
          a.addColorStop(e[h], t[h]);
        return a.props = {
          colors: t,
          ratios: e,
          x0: i,
          y0: s,
          x1: n,
          y1: r,
          type: "linear"
        },
          this
      }
      ,
      t.radialGradient = function (t, e, i, s, n, r, a, h) {
        for (var o = this.style = v._ctx.createRadialGradient(i, s, n, r, a, h), c = 0, l = t.length; c < l; c++)
          o.addColorStop(e[c], t[c]);
        return o.props = {
          colors: t,
          ratios: e,
          x0: i,
          y0: s,
          r0: n,
          x1: r,
          y1: a,
          r1: h,
          type: "radial"
        },
          this
      }
      ,
      t.bitmap = function (t, e) {
        return (t.naturalWidth || t.getContext || 2 <= t.readyState) && ((this.style = v._ctx.createPattern(t, e || "")).props = {
          image: t,
          repetition: e,
          type: "bitmap"
        }),
          this
      }
      ,
      t.path = !1,
      (t = (o.Stroke = function (t, e) {
          this.style = t,
            this.ignoreScale = e
        }
      ).prototype).exec = function (t) {
        this.style && (t.strokeStyle = this.style,
        this.ignoreScale && (t.save(),
          t.setTransform(1, 0, 0, 1, 0, 0)),
          t.stroke(),
          this.ignoreScale) && t.restore()
      }
      ,
      t.linearGradient = o.Fill.prototype.linearGradient,
      t.radialGradient = o.Fill.prototype.radialGradient,
      t.bitmap = o.Fill.prototype.bitmap,
      t.path = !1,
      (t = (o.StrokeStyle = function (t, e, i, s, n) {
          this.width = t,
            this.caps = e,
            this.joints = i,
            this.miterLimit = s,
            this.ignoreScale = n
        }
      ).prototype).exec = function (t) {
        t.lineWidth = null == this.width ? "1" : this.width,
          t.lineCap = null == this.caps ? "butt" : isNaN(this.caps) ? this.caps : v.STROKE_CAPS_MAP[this.caps],
          t.lineJoin = null == this.joints ? "miter" : isNaN(this.joints) ? this.joints : v.STROKE_JOINTS_MAP[this.joints],
          t.miterLimit = null == this.miterLimit ? "10" : this.miterLimit,
          t.ignoreScale = null != this.ignoreScale && this.ignoreScale
      }
      ,
      t.path = !1,
      (o.StrokeDash = function (t, e) {
          this.segments = t,
            this.offset = e || 0
        }
      ).prototype.exec = function (t) {
        t.setLineDash && (t.setLineDash(this.segments || o.StrokeDash.EMPTY_SEGMENTS),
          t.lineDashOffset = this.offset || 0)
      }
      ,
      o.StrokeDash.EMPTY_SEGMENTS = [],
      (o.RoundRect = function (t, e, i, s, n, r, a, h) {
          this.x = t,
            this.y = e,
            this.w = i,
            this.h = s,
            this.radiusTL = n,
            this.radiusTR = r,
            this.radiusBR = a,
            this.radiusBL = h
        }
      ).prototype.exec = function (t) {
        var e = NaN
          , i = 0
          , s = 0
          , n = 0
          , r = 0
          , a = this.x
          , h = this.y
          , o = this.w
          , c = this.h
          , l = this.radiusTL
          , u = this.radiusTR
          , d = this.radiusBR
          , p = this.radiusBL;
        l < 0 && (l *= i = -1),
        e < l && (l = e),
        u < 0 && (u *= s = -1),
        d < 0 && (d *= n = -1),
        e < d && (d = e),
        p < 0 && (p *= r = -1),
        e < p && (p = e),
          t.moveTo(a + o - (u = e < u ? e : u), h),
          t.arcTo(a + o + u * s, h - u * s, a + o, h + u, u),
          t.lineTo(a + o, h + c - d),
          t.arcTo(a + o + d * n, h + c + d * n, a + o - d, h + c, d),
          t.lineTo(a + p, h + c),
          t.arcTo(a - p * r, h + c + p * r, a, h + c - p, p),
          t.lineTo(a, h + l),
          t.arcTo(a - l * i, h - l * i, a + l, h, l),
          t.closePath()
      }
      ,
      (o.Circle = function (t, e, i) {
          this.x = t,
            this.y = e,
            this.radius = i
        }
      ).prototype.exec = function (t) {
        t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
      }
      ,
      (o.Ellipse = function (t, e, i, s) {
          this.x = t,
            this.y = e,
            this.w = i,
            this.h = s
        }
      ).prototype.exec = function (t) {
        var e = this.x
          , i = this.y
          , s = this.w
          , n = this.h
          , r = s / 2 * .5522848
          , a = n / 2 * .5522848
          , h = e + s
          , o = i + n
          , s = e + s / 2
          , n = i + n / 2;
        t.moveTo(e, n),
          t.bezierCurveTo(e, n - a, s - r, i, s, i),
          t.bezierCurveTo(s + r, i, h, n - a, h, n),
          t.bezierCurveTo(h, n + a, s + r, o, s, o),
          t.bezierCurveTo(s - r, o, e, n + a, e, n)
      }
      ,
      (o.PolyStar = function (t, e, i, s, n, r) {
          this.x = t,
            this.y = e,
            this.radius = i,
            this.sides = s,
            this.pointSize = n,
            this.angle = r
        }
      ).prototype.exec = function (t) {
        var e = this.x
          , i = this.y
          , s = this.radius
          , n = (this.angle || 0) / 180 * Math.PI
          , r = this.sides
          , a = 1 - (this.pointSize || 0)
          , h = Math.PI / r;
        t.moveTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        for (var o = 0; o < r; o++)
          n += h,
          1 != a && t.lineTo(e + Math.cos(n) * s * a, i + Math.sin(n) * s * a),
            n += h,
            t.lineTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        t.closePath()
      }
      ,
      v.beginCmd = new o.BeginPath,
      createjs.Graphics = v
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function c() {
      this.EventDispatcher_constructor(),
        this.alpha = 1,
        this.cacheCanvas = null,
        this.cacheID = 0,
        this.id = createjs.UID.get(),
        this.mouseEnabled = !0,
        this.tickEnabled = !0,
        this.name = null,
        this.parent = null,
        this.regX = 0,
        this.regY = 0,
        this.rotation = 0,
        this.scaleX = 1,
        this.scaleY = 1,
        this.skewX = 0,
        this.skewY = 0,
        this.shadow = null,
        this.visible = !0,
        this.x = 0,
        this.y = 0,
        this.transformMatrix = null,
        this.compositeOperation = null,
        this.snapToPixel = !0,
        this.filters = null,
        this.mask = null,
        this.hitArea = null,
        this.cursor = null,
        this._cacheOffsetX = 0,
        this._cacheOffsetY = 0,
        this._filterOffsetX = 0,
        this._filterOffsetY = 0,
        this._cacheScale = 1,
        this._cacheDataURLID = 0,
        this._cacheDataURL = null,
        this._props = new createjs.DisplayProps,
        this._rectangle = new createjs.Rectangle,
        this._bounds = null
    }

    var t = createjs.extend(c, createjs.EventDispatcher)
      ,
      e = (c._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"],
        c.suppressCrossDomainErrors = !1,
        c._snapToPixelEnabled = !1,
        createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
    e.getContext && (c._hitTestCanvas = e,
      c._hitTestContext = e.getContext("2d"),
      e.width = e.height = 1),
      c._nextCacheID = 1,
      t.getStage = function () {
        for (var t = this, e = createjs.Stage; t.parent;)
          t = t.parent;
        return t instanceof e ? t : null
      }
    ;
    try {
      Object.defineProperties(t, {
        stage: {
          get: t.getStage
        }
      })
    } catch (t) {
    }
    t.isVisible = function () {
      return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY)
    }
      ,
      t.draw = function (t, e) {
        var i = this.cacheCanvas;
        return !(e || !i || (e = this._cacheScale,
          t.drawImage(i, this._cacheOffsetX + this._filterOffsetX, this._cacheOffsetY + this._filterOffsetY, i.width / e, i.height / e),
          0))
      }
      ,
      t.updateContext = function (t) {
        var e = this
          , i = e.mask
          , s = e._props.matrix
          , i = (i && i.graphics && !i.graphics.isEmpty() && (i.getMatrix(s),
          t.transform(s.a, s.b, s.c, s.d, s.tx, s.ty),
          i.graphics.drawAsPath(t),
          t.clip(),
          s.invert(),
          t.transform(s.a, s.b, s.c, s.d, s.tx, s.ty)),
          this.getMatrix(s),
          s.tx)
          , n = s.ty;
        c._snapToPixelEnabled && e.snapToPixel && (i = i + (i < 0 ? -.5 : .5) | 0,
          n = n + (n < 0 ? -.5 : .5) | 0),
          t.transform(s.a, s.b, s.c, s.d, i, n),
          t.globalAlpha *= e.alpha,
        e.compositeOperation && (t.globalCompositeOperation = e.compositeOperation),
        e.shadow && this._applyShadow(t, e.shadow)
      }
      ,
      t.cache = function (t, e, i, s, n) {
        n = n || 1,
        this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")),
          this._cacheWidth = i,
          this._cacheHeight = s,
          this._cacheOffsetX = t,
          this._cacheOffsetY = e,
          this._cacheScale = n,
          this.updateCache()
      }
      ,
      t.updateCache = function (t) {
        var e = this.cacheCanvas;
        if (!e)
          throw "cache() must be called before updateCache()";
        var i = this._cacheScale
          , s = this._cacheOffsetX * i
          , n = this._cacheOffsetY * i
          , r = this._cacheWidth
          , a = this._cacheHeight
          , h = e.getContext("2d")
          , o = this._getFilterBounds();
        s += this._filterOffsetX = o.x,
          n += this._filterOffsetY = o.y,
          r = Math.ceil(r * i) + o.width,
          a = Math.ceil(a * i) + o.height,
          r != e.width || a != e.height ? (e.width = r,
            e.height = a) : t || h.clearRect(0, 0, r + 1, a + 1),
          h.save(),
          h.globalCompositeOperation = t,
          h.setTransform(i, 0, 0, i, -s, -n),
          this.draw(h, !0),
          this._applyFilters(),
          h.restore(),
          this.cacheID = c._nextCacheID++
      }
      ,
      t.uncache = function () {
        this._cacheDataURL = this.cacheCanvas = null,
          this.cacheID = this._cacheOffsetX = this._cacheOffsetY = this._filterOffsetX = this._filterOffsetY = 0,
          this._cacheScale = 1
      }
      ,
      t.getCacheDataURL = function () {
        return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()),
          this._cacheDataURL) : null
      }
      ,
      t.localToGlobal = function (t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix).transformPoint(t, e, i || new createjs.Point)
      }
      ,
      t.globalToLocal = function (t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(t, e, i || new createjs.Point)
      }
      ,
      t.localToLocal = function (t, e, i, s) {
        return s = this.localToGlobal(t, e, s),
          i.globalToLocal(s.x, s.y, s)
      }
      ,
      t.setTransform = function (t, e, i, s, n, r, a, h, o) {
        return this.x = t || 0,
          this.y = e || 0,
          this.scaleX = null == i ? 1 : i,
          this.scaleY = null == s ? 1 : s,
          this.rotation = n || 0,
          this.skewX = r || 0,
          this.skewY = a || 0,
          this.regX = h || 0,
          this.regY = o || 0,
          this
      }
      ,
      t.getMatrix = function (t) {
        var e = this
          , t = t && t.identity() || new createjs.Matrix2D;
        return e.transformMatrix ? t.copy(e.transformMatrix) : t.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY)
      }
      ,
      t.getConcatenatedMatrix = function (t) {
        for (var e = this, i = this.getMatrix(t); e = e.parent;)
          i.prependMatrix(e.getMatrix(e._props.matrix));
        return i
      }
      ,
      t.getConcatenatedDisplayProps = function (t) {
        t = t ? t.identity() : new createjs.DisplayProps;
        for (var e = this, i = e.getMatrix(t.matrix); t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
        e != this && i.prependMatrix(e.getMatrix(e._props.matrix)),
          e = e.parent;)
          ;
        return t
      }
      ,
      t.hitTest = function (t, e) {
        var i = c._hitTestContext
          , t = (i.setTransform(1, 0, 0, 1, -t, -e),
          this.draw(i),
          this._testHit(i));
        return i.setTransform(1, 0, 0, 1, 0, 0),
          i.clearRect(0, 0, 2, 2),
          t
      }
      ,
      t.set = function (t) {
        for (var e in t)
          this[e] = t[e];
        return this
      }
      ,
      t.getBounds = function () {
        var t, e;
        return this._bounds ? this._rectangle.copy(this._bounds) : (t = this.cacheCanvas) ? (e = this._cacheScale,
          this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, t.width / e, t.height / e)) : null
      }
      ,
      t.getTransformedBounds = function () {
        return this._getBounds()
      }
      ,
      t.setBounds = function (t, e, i, s) {
        null == t && (this._bounds = t),
          this._bounds = (this._bounds || new createjs.Rectangle).setValues(t, e, i, s)
      }
      ,
      t.clone = function () {
        return this._cloneProps(new c)
      }
      ,
      t.toString = function () {
        return "[DisplayObject (name=" + this.name + ")]"
      }
      ,
      t._cloneProps = function (t) {
        return t.alpha = this.alpha,
          t.mouseEnabled = this.mouseEnabled,
          t.tickEnabled = this.tickEnabled,
          t.name = this.name,
          t.regX = this.regX,
          t.regY = this.regY,
          t.rotation = this.rotation,
          t.scaleX = this.scaleX,
          t.scaleY = this.scaleY,
          t.shadow = this.shadow,
          t.skewX = this.skewX,
          t.skewY = this.skewY,
          t.visible = this.visible,
          t.x = this.x,
          t.y = this.y,
          t.compositeOperation = this.compositeOperation,
          t.snapToPixel = this.snapToPixel,
          t.filters = null == this.filters ? null : this.filters.slice(0),
          t.mask = this.mask,
          t.hitArea = this.hitArea,
          t.cursor = this.cursor,
          t._bounds = this._bounds,
          t
      }
      ,
      t._applyShadow = function (t, e) {
        e = e || Shadow.identity,
          t.shadowColor = e.color,
          t.shadowOffsetX = e.offsetX,
          t.shadowOffsetY = e.offsetY,
          t.shadowBlur = e.blur
      }
      ,
      t._tick = function (t) {
        var e = this._listeners;
        e && e.tick && (t.target = null,
          t.propagationStopped = t.immediatePropagationStopped = !1,
          this.dispatchEvent(t))
      }
      ,
      t._testHit = function (t) {
        try {
          var e = 1 < t.getImageData(0, 0, 1, 1).data[3]
        } catch (t) {
          if (!c.suppressCrossDomainErrors)
            throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
        }
        return e
      }
      ,
      t._applyFilters = function () {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
          for (var t = this.filters.length, e = this.cacheCanvas.getContext("2d"), i = this.cacheCanvas.width, s = this.cacheCanvas.height, n = 0; n < t; n++)
            this.filters[n].applyFilter(e, 0, 0, i, s)
      }
      ,
      t._getFilterBounds = function () {
        var t, e = this.filters, i = this._rectangle.setValues(0, 0, 0, 0);
        if (e && (t = e.length))
          for (var s = 0; s < t; s++) {
            var n = this.filters[s];
            n.getBounds && n.getBounds(i)
          }
        return i
      }
      ,
      t._getBounds = function (t, e) {
        return this._transformBounds(this.getBounds(), t, e)
      }
      ,
      t._transformBounds = function (t, e, i) {
        var s, n, r, a, h, o, c, l;
        return t && (s = t.x,
          n = t.y,
          c = t.width,
          a = t.height,
          r = this._props.matrix,
          r = i ? r.identity() : this.getMatrix(r),
        (s || n) && r.appendTransform(0, 0, 1, 1, 0, 0, 0, -s, -n),
        e && r.prependMatrix(e),
          i = c * r.a,
          e = c * r.b,
          c = a * r.c,
          a = a * r.d,
          (s = i + (o = h = l = r.tx)) < h ? h = s : o < s && (o = s),
          (s = i + c + l) < h ? h = s : o < s && (o = s),
          (s = c + l) < h ? h = s : o < s && (o = s),
          (n = e + (l = c = i = r.ty)) < c ? c = n : l < n && (l = n),
          (n = e + a + i) < c ? c = n : l < n && (l = n),
          (n = a + i) < c ? c = n : l < n && (l = n),
          t.setValues(h, c, o - h, l - c))
      }
      ,
      t._hasMouseEventListener = function () {
        for (var t = c._MOUSE_EVENTS, e = 0, i = t.length; e < i; e++)
          if (this.hasEventListener(t[e]))
            return !0;
        return !!this.cursor
      }
      ,
      createjs.DisplayObject = createjs.promote(c, "EventDispatcher")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function p() {
      this.DisplayObject_constructor(),
        this.children = [],
        this.mouseChildren = !0,
        this.tickChildren = !0
    }

    var t = createjs.extend(p, createjs.DisplayObject);
    t.getNumChildren = function () {
      return this.children.length
    }
    ;
    try {
      Object.defineProperties(t, {
        numChildren: {
          get: t.getNumChildren
        }
      })
    } catch (t) {
    }
    t.initialize = p,
      t.isVisible = function () {
        var t = this.cacheCanvas || this.children.length;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && t)
      }
      ,
      t.draw = function (t, e) {
        if (!this.DisplayObject_draw(t, e))
          for (var i = this.children.slice(), s = 0, n = i.length; s < n; s++) {
            var r = i[s];
            r.isVisible() && (t.save(),
              r.updateContext(t),
              r.draw(t),
              t.restore())
          }
        return !0
      }
      ,
      t.addChild = function (t) {
        if (null != t) {
          var e = arguments.length;
          if (1 < e) {
            for (var i = 0; i < e; i++)
              this.addChild(arguments[i]);
            return arguments[e - 1]
          }
          t.parent && t.parent.removeChild(t),
            (t.parent = this).children.push(t),
            t.dispatchEvent("added")
        }
        return t
      }
      ,
      t.addChildAt = function (t, e) {
        var i = arguments.length
          , s = arguments[i - 1];
        if (s < 0 || s > this.children.length)
          return arguments[i - 2];
        if (2 < i) {
          for (var n = 0; n < i - 1; n++)
            this.addChildAt(arguments[n], s + n);
          return arguments[i - 2]
        }
        return t.parent && t.parent.removeChild(t),
          (t.parent = this).children.splice(e, 0, t),
          t.dispatchEvent("added"),
          t
      }
      ,
      t.removeChild = function (t) {
        var e = arguments.length;
        if (1 < e) {
          for (var i = !0, s = 0; s < e; s++)
            i = i && this.removeChild(arguments[s]);
          return i
        }
        return this.removeChildAt(createjs.indexOf(this.children, t))
      }
      ,
      t.removeChildAt = function (t) {
        var e, i = arguments.length;
        if (1 < i) {
          for (var s = [], n = 0; n < i; n++)
            s[n] = arguments[n];
          s.sort(function (t, e) {
            return e - t
          });
          for (var r = !0, n = 0; n < i; n++)
            r = r && this.removeChildAt(s[n]);
          return r
        }
        return !(t < 0 || t > this.children.length - 1 || ((e = this.children[t]) && (e.parent = null),
          this.children.splice(t, 1),
          e.dispatchEvent("removed"),
          0))
      }
      ,
      t.removeAllChildren = function () {
        for (var t = this.children; t.length;)
          this.removeChildAt(0)
      }
      ,
      t.getChildAt = function (t) {
        return this.children[t]
      }
      ,
      t.getChildByName = function (t) {
        for (var e = this.children, i = 0, s = e.length; i < s; i++)
          if (e[i].name == t)
            return e[i];
        return null
      }
      ,
      t.sortChildren = function (t) {
        this.children.sort(t)
      }
      ,
      t.getChildIndex = function (t) {
        return createjs.indexOf(this.children, t)
      }
      ,
      t.swapChildrenAt = function (t, e) {
        var i = this.children
          , s = i[t]
          , n = i[e];
        s && n && (i[t] = n,
          i[e] = s)
      }
      ,
      t.swapChildren = function (t, e) {
        for (var i, s, n = this.children, r = 0, a = n.length; r < a && (n[r] == t && (i = r),
        n[r] == e && (s = r),
        null == i || null == s); r++)
          ;
        r != a && (n[i] = e,
          n[s] = t)
      }
      ,
      t.setChildIndex = function (t, e) {
        var i = this.children
          , s = i.length;
        if (!(t.parent != this || e < 0 || s <= e)) {
          for (var n = 0; n < s && i[n] != t; n++)
            ;
          n != s && n != e && (i.splice(n, 1),
            i.splice(e, 0, t))
        }
      }
      ,
      t.contains = function (t) {
        for (; t;) {
          if (t == this)
            return !0;
          t = t.parent
        }
        return !1
      }
      ,
      t.hitTest = function (t, e) {
        return null != this.getObjectUnderPoint(t, e)
      }
      ,
      t.getObjectsUnderPoint = function (t, e, i) {
        var s = []
          , t = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(t.x, t.y, s, 0 < i, 1 == i),
          s
      }
      ,
      t.getObjectUnderPoint = function (t, e, i) {
        t = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(t.x, t.y, null, 0 < i, 1 == i)
      }
      ,
      t.getBounds = function () {
        return this._getBounds(null, !0)
      }
      ,
      t.getTransformedBounds = function () {
        return this._getBounds()
      }
      ,
      t.clone = function (t) {
        var e = this._cloneProps(new p);
        return t && this._cloneChildren(e),
          e
      }
      ,
      t.toString = function () {
        return "[Container (name=" + this.name + ")]"
      }
      ,
      t._tick = function (t) {
        if (this.tickChildren)
          for (var e = this.children.length - 1; 0 <= e; e--) {
            var i = this.children[e];
            i.tickEnabled && i._tick && i._tick(t)
          }
        this.DisplayObject__tick(t)
      }
      ,
      t._cloneChildren = function (t) {
        t.children.length && t.removeAllChildren();
        for (var e = t.children, i = 0, s = this.children.length; i < s; i++) {
          var n = this.children[i].clone(!0);
          n.parent = t,
            e.push(n)
        }
      }
      ,
      t._getObjectsUnderPoint = function (t, e, i, s, n, r) {
        if ((r = r || 0) || this._testMask(this, t, e)) {
          var a = createjs.DisplayObject._hitTestContext;
          n = n || s && this._hasMouseEventListener();
          for (var h = this.children, o = h.length - 1; 0 <= o; o--) {
            var c = h[o]
              , l = c.hitArea;
            if (c.visible && (l || c.isVisible()) && (!s || c.mouseEnabled) && (l || this._testMask(c, t, e)))
              if (!l && c instanceof p) {
                var u = c._getObjectsUnderPoint(t, e, i, s, n, r + 1);
                if (!i && u)
                  return s && !this.mouseChildren ? this : u
              } else if (!s || n || c._hasMouseEventListener()) {
                var u = c.getConcatenatedDisplayProps(c._props)
                  , d = u.matrix;
                if (l && (d.appendMatrix(l.getMatrix(l._props.matrix)),
                  u.alpha = l.alpha),
                  a.globalAlpha = u.alpha,
                  a.setTransform(d.a, d.b, d.c, d.d, d.tx - t, d.ty - e),
                  (l || c).draw(a),
                  this._testHit(a)) {
                  if (a.setTransform(1, 0, 0, 1, 0, 0),
                    a.clearRect(0, 0, 2, 2),
                    !i)
                    return s && !this.mouseChildren ? this : c;
                  i.push(c)
                }
              }
          }
        }
        return null
      }
      ,
      t._testMask = function (t, e, i) {
        var s, n = t.mask;
        return !(n && n.graphics && !n.graphics.isEmpty() && (s = this._props.matrix,
          s = (t = t.parent) ? t.getConcatenatedMatrix(s) : s.identity(),
          s = n.getMatrix(n._props.matrix).prependMatrix(s),
          (t = createjs.DisplayObject._hitTestContext).setTransform(s.a, s.b, s.c, s.d, s.tx - e, s.ty - i),
          n.graphics.drawAsPath(t),
          t.fillStyle = "#000",
          t.fill(),
        !this._testHit(t) || (t.setTransform(1, 0, 0, 1, 0, 0),
          t.clearRect(0, 0, 2, 2),
          0)))
      }
      ,
      t._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        if (i)
          return this._transformBounds(i, t, e);
        var s = this._props.matrix
          , s = e ? s.identity() : this.getMatrix(s);
        t && s.prependMatrix(t);
        for (var n = this.children.length, r = null, a = 0; a < n; a++) {
          var h = this.children[a];
          h.visible && (i = h._getBounds(s)) && (r ? r.extend(i.x, i.y, i.width, i.height) : r = i.clone())
        }
        return r
      }
      ,
      createjs.Container = createjs.promote(p, "DisplayObject")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t) {
      this.Container_constructor(),
        this.autoClear = !0,
        this.canvas = "string" == typeof t ? document.getElementById(t) : t,
        this.mouseX = 0,
        this.mouseY = 0,
        this.drawRect = null,
        this.snapToPixelEnabled = !1,
        this.mouseInBounds = !1,
        this.tickOnUpdate = !0,
        this.mouseMoveOutside = !1,
        this.preventSelection = !0,
        this._pointerData = {},
        this._pointerCount = 0,
        this._primaryPointerID = null,
        this._mouseOverIntervalID = null,
        this._nextStage = null,
        this._prevStage = null,
        this.enableDOMEvents(!0)
    }

    var e = createjs.extend(t, createjs.Container);
    e._get_nextStage = function () {
      return this._nextStage
    }
      ,
      e._set_nextStage = function (t) {
        this._nextStage && (this._nextStage._prevStage = null),
        t && (t._prevStage = this),
          this._nextStage = t
      }
    ;
    try {
      Object.defineProperties(e, {
        nextStage: {
          get: e._get_nextStage,
          set: e._set_nextStage
        }
      })
    } catch (t) {
    }
    e.update = function (t) {
      var e;
      this.canvas && (this.tickOnUpdate && this.tick(t),
      !1 !== this.dispatchEvent("drawstart", !1, !0)) && (createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled,
        t = this.drawRect,
        (e = this.canvas.getContext("2d")).setTransform(1, 0, 0, 1, 0, 0),
      this.autoClear && (t ? e.clearRect(t.x, t.y, t.width, t.height) : e.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)),
        e.save(),
      this.drawRect && (e.beginPath(),
        e.rect(t.x, t.y, t.width, t.height),
        e.clip()),
        this.updateContext(e),
        this.draw(e, !1),
        e.restore(),
        this.dispatchEvent("drawend"))
    }
      ,
      e.tick = function (t) {
        if (this.tickEnabled && !1 !== this.dispatchEvent("tickstart", !1, !0)) {
          var e = new createjs.Event("tick");
          if (t)
            for (var i in t)
              t.hasOwnProperty(i) && (e[i] = t[i]);
          this._tick(e),
            this.dispatchEvent("tickend")
        }
      }
      ,
      e.handleEvent = function (t) {
        "tick" == t.type && this.update(t)
      }
      ,
      e.clear = function () {
        var t;
        this.canvas && ((t = this.canvas.getContext("2d")).setTransform(1, 0, 0, 1, 0, 0),
          t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1))
      }
      ,
      e.toDataURL = function (t, e) {
        var i, s, n = this.canvas.getContext("2d"), r = this.canvas.width, a = this.canvas.height,
          r = (t && (i = n.getImageData(0, 0, r, a),
            s = n.globalCompositeOperation,
            n.globalCompositeOperation = "destination-over",
            n.fillStyle = t,
            n.fillRect(0, 0, r, a)),
            this.canvas.toDataURL(e || "image/png"));
        return t && (n.putImageData(i, 0, 0),
          n.globalCompositeOperation = s),
          r
      }
      ,
      e.enableMouseOver = function (t) {
        if (this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID),
          this._mouseOverIntervalID = null,
        0 == t) && this._testMouseOver(!0),
        null == t)
          t = 20;
        else if (t <= 0)
          return;
        var e = this;
        this._mouseOverIntervalID = setInterval(function () {
          e._testMouseOver()
        }, 1e3 / Math.min(50, t))
      }
      ,
      e.enableDOMEvents = function (t) {
        var e, i, s = this._eventListeners;
        if (!(t = null == t ? !0 : t) && s) {
          for (e in s)
            i = s[e],
              i.t.removeEventListener(e, i.f, !1);
          this._eventListeners = null
        } else if (t && !s && this.canvas) {
          var t = window.addEventListener ? window : document
            , n = this;
          for (e in (s = this._eventListeners = {}).mouseup = {
            t: t,
            f: function (t) {
              n._handleMouseUp(t)
            }
          },
            s.mousemove = {
              t: t,
              f: function (t) {
                n._handleMouseMove(t)
              }
            },
            s.dblclick = {
              t: this.canvas,
              f: function (t) {
                n._handleDoubleClick(t)
              }
            },
            s.mousedown = {
              t: this.canvas,
              f: function (t) {
                n._handleMouseDown(t)
              }
            },
            s)
            i = s[e],
              i.t.addEventListener(e, i.f, !1)
        }
      }
      ,
      e.clone = function () {
        throw "Stage cannot be cloned."
      }
      ,
      e.toString = function () {
        return "[Stage (name=" + this.name + ")]"
      }
      ,
      e._getElementRect = function (e) {
        var i;
        try {
          i = e.getBoundingClientRect()
        } catch (t) {
          i = {
            top: e.offsetTop,
            left: e.offsetLeft,
            width: e.offsetWidth,
            height: e.offsetHeight
          }
        }
        var t = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0)
          , s = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0)
          , e = window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle
          , n = parseInt(e.paddingLeft) + parseInt(e.borderLeftWidth)
          , r = parseInt(e.paddingTop) + parseInt(e.borderTopWidth)
          , a = parseInt(e.paddingRight) + parseInt(e.borderRightWidth)
          , e = parseInt(e.paddingBottom) + parseInt(e.borderBottomWidth);
        return {
          left: i.left + t + n,
          right: i.right + t - a,
          top: i.top + s + r,
          bottom: i.bottom + s - e
        }
      }
      ,
      e._getPointerData = function (t) {
        return this._pointerData[t] || (this._pointerData[t] = {
          x: 0,
          y: 0
        })
      }
      ,
      e._handleMouseMove = function (t) {
        t = t || window.event,
          this._handlePointerMove(-1, t, t.pageX, t.pageY)
      }
      ,
      e._handlePointerMove = function (t, e, i, s, n) {
        var r, a;
        this._prevStage && void 0 === n || !this.canvas || (n = this._nextStage,
          a = (r = this._getPointerData(t)).inBounds,
          this._updatePointerPosition(t, e, i, s),
        (a || r.inBounds || this.mouseMoveOutside) && (-1 === t && r.inBounds == !a && this._dispatchMouseEvent(this, a ? "mouseleave" : "mouseenter", !1, t, r, e),
          this._dispatchMouseEvent(this, "stagemousemove", !1, t, r, e),
          this._dispatchMouseEvent(r.target, "pressmove", !0, t, r, e)),
        n && n._handlePointerMove(t, e, i, s, null))
      }
      ,
      e._updatePointerPosition = function (t, e, i, s) {
        var n = this._getElementRect(this.canvas)
          , r = (i -= n.left,
          s -= n.top,
          this.canvas.width)
          , a = this.canvas.height
          , n = (i /= (n.right - n.left) / r,
          s /= (n.bottom - n.top) / a,
          this._getPointerData(t));
        (n.inBounds = 0 <= i && 0 <= s && i <= r - 1 && s <= a - 1) ? (n.x = i,
          n.y = s) : this.mouseMoveOutside && (n.x = i < 0 ? 0 : r - 1 < i ? r - 1 : i,
          n.y = s < 0 ? 0 : a - 1 < s ? a - 1 : s),
          n.posEvtObj = e,
          n.rawX = i,
          n.rawY = s,
        t !== this._primaryPointerID && -1 !== t || (this.mouseX = n.x,
          this.mouseY = n.y,
          this.mouseInBounds = n.inBounds)
      }
      ,
      e._handleMouseUp = function (t) {
        this._handlePointerUp(-1, t, !1)
      }
      ,
      e._handlePointerUp = function (t, e, i, s) {
        var n, r, a = this._nextStage, h = this._getPointerData(t);
        this._prevStage && void 0 === s || (n = null,
          r = h.target,
        s || !r && !a || (n = this._getObjectsUnderPoint(h.x, h.y, null, !0)),
        h.down && (this._dispatchMouseEvent(this, "stagemouseup", !1, t, h, e, n),
          h.down = !1),
        n == r && this._dispatchMouseEvent(r, "click", !0, t, h, e),
          this._dispatchMouseEvent(r, "pressup", !0, t, h, e),
          i ? (t == this._primaryPointerID && (this._primaryPointerID = null),
            delete this._pointerData[t]) : h.target = null,
        a && a._handlePointerUp(t, e, i, s || n && this))
      }
      ,
      e._handleMouseDown = function (t) {
        this._handlePointerDown(-1, t, t.pageX, t.pageY)
      }
      ,
      e._handlePointerDown = function (t, e, i, s, n) {
        this.preventSelection && e.preventDefault(),
        null != this._primaryPointerID && -1 !== t || (this._primaryPointerID = t),
        null != s && this._updatePointerPosition(t, e, i, s);
        var r = null
          , a = this._nextStage
          , h = this._getPointerData(t);
        n || (r = h.target = this._getObjectsUnderPoint(h.x, h.y, null, !0)),
        h.inBounds && (this._dispatchMouseEvent(this, "stagemousedown", !1, t, h, e, r),
          h.down = !0),
          this._dispatchMouseEvent(r, "mousedown", !0, t, h, e),
        a && a._handlePointerDown(t, e, i, s, n || r && this)
      }
      ,
      e._testMouseOver = function (t, e, i) {
        if (!this._prevStage || void 0 !== e) {
          var s = this._nextStage;
          if (this._mouseOverIntervalID) {
            var n = this._getPointerData(-1);
            if (n && (t || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
              for (var r, a, h = n.posEvtObj, o = i || h && h.target == this.canvas, c = null, l = -1, u = "", d = (!e && (t || this.mouseInBounds && o) && (c = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0),
                this._mouseOverX = this.mouseX,
                this._mouseOverY = this.mouseY),
              this._mouseOverTarget || []), p = d[d.length - 1], f = this._mouseOverTarget = [], _ = c; _;)
                f.unshift(_),
                  u = u || _.cursor,
                  _ = _.parent;
              for (this.canvas.style.cursor = u,
                   !e && i && (i.canvas.style.cursor = u),
                     r = 0,
                     a = f.length; r < a && f[r] == d[r]; r++)
                l = r;
              for (p != c && this._dispatchMouseEvent(p, "mouseout", !0, -1, n, h, c),
                     r = d.length - 1; l < r; r--)
                this._dispatchMouseEvent(d[r], "rollout", !1, -1, n, h, c);
              for (r = f.length - 1; l < r; r--)
                this._dispatchMouseEvent(f[r], "rollover", !1, -1, n, h, p);
              p != c && this._dispatchMouseEvent(c, "mouseover", !0, -1, n, h, p),
              s && s._testMouseOver(t, e || c && this, i || o && this)
            }
          } else
            s && s._testMouseOver(t, e, i)
        }
      }
      ,
      e._handleDoubleClick = function (t, e) {
        var i = null
          , s = this._nextStage
          , n = this._getPointerData(-1);
        e || (i = this._getObjectsUnderPoint(n.x, n.y, null, !0),
          this._dispatchMouseEvent(i, "dblclick", !0, -1, n, t)),
        s && s._handleDoubleClick(t, e || i && this)
      }
      ,
      e._dispatchMouseEvent = function (t, e, i, s, n, r, a) {
        t && (i || t.hasEventListener(e)) && (e = new createjs.MouseEvent(e, i, !1, n.x, n.y, r, s, s === this._primaryPointerID || -1 === s, n.rawX, n.rawY, a),
          t.dispatchEvent(e))
      }
      ,
      createjs.Stage = createjs.promote(t, "Container")
  }(),
  this.createjs = this.createjs || {},
  function () {
    function e(t) {
      this.DisplayObject_constructor(),
        "string" == typeof t ? (this.image = document.createElement("img"),
          this.image.src = t) : this.image = t,
        this.sourceRect = null
    }

    var t = createjs.extend(e, createjs.DisplayObject);
    t.initialize = e,
      t.isVisible = function () {
        var t = this.image
          , t = this.cacheCanvas || t && (t.naturalWidth || t.getContext || 2 <= t.readyState);
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && t)
      }
      ,
      t.draw = function (t, e) {
        var i, s, n, r, a, h, o, c;
        return !this.DisplayObject_draw(t, e) && this.image && (e = this.image,
          (r = this.sourceRect) ? (i = r.x,
            s = r.y,
            n = i + r.width,
            r = s + r.height,
            o = e.width,
            c = e.height,
          i < (h = a = 0) && (a -= i,
            i = 0),
          s < 0 && (h -= s,
            s = 0),
            t.drawImage(e, i, s, (n = o < n ? o : n) - i, (r = c < r ? c : r) - s, a, h, n - i, r - s)) : t.drawImage(e, 0, 0)),
          !0
      }
      ,
      t.getBounds = function () {
        var t, e = this.DisplayObject_getBounds();
        return e || (e = this.image,
          t = this.sourceRect || e,
          e && (e.naturalWidth || e.getContext || 2 <= e.readyState) ? this._rectangle.setValues(0, 0, t.width, t.height) : null)
      }
      ,
      t.clone = function () {
        var t = new e(this.image);
        return this.sourceRect && (t.sourceRect = this.sourceRect.clone()),
          this._cloneProps(t),
          t
      }
      ,
      t.toString = function () {
        return "[Bitmap (name=" + this.name + ")]"
      }
      ,
      createjs.Bitmap = createjs.promote(e, "DisplayObject")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e) {
      this.DisplayObject_constructor(),
        this.currentFrame = 0,
        this.currentAnimation = null,
        this.paused = !0,
        this.spriteSheet = t,
        this.currentAnimationFrame = 0,
        this.framerate = 0,
        this._animation = null,
        this._currentFrame = null,
        this._skipAdvance = !1,
      null != e && this.gotoAndPlay(e)
    }

    var e = createjs.extend(t, createjs.DisplayObject);
    e.initialize = t,
      e.isVisible = function () {
        var t = this.cacheCanvas || this.spriteSheet.complete;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && t)
      }
      ,
      e.draw = function (t, e) {
        if (this.DisplayObject_draw(t, e))
          return !0;
        this._normalizeFrame();
        var i, e = this.spriteSheet.getFrame(0 | this._currentFrame);
        return !!e && ((i = e.rect).width && i.height && t.drawImage(e.image, i.x, i.y, i.width, i.height, -e.regX, -e.regY, i.width, i.height),
          !0)
      }
      ,
      e.play = function () {
        this.paused = !1
      }
      ,
      e.stop = function () {
        this.paused = !0
      }
      ,
      e.gotoAndPlay = function (t) {
        this.paused = !1,
          this._skipAdvance = !0,
          this._goto(t)
      }
      ,
      e.gotoAndStop = function (t) {
        this.paused = !0,
          this._goto(t)
      }
      ,
      e.advance = function (t) {
        var e = this.framerate || this.spriteSheet.framerate;
        this._normalizeFrame(e && null != t ? t / (1e3 / e) : 1)
      }
      ,
      e.getBounds = function () {
        return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
      }
      ,
      e.clone = function () {
        return this._cloneProps(new t(this.spriteSheet))
      }
      ,
      e.toString = function () {
        return "[Sprite (name=" + this.name + ")]"
      }
      ,
      e._cloneProps = function (t) {
        return this.DisplayObject__cloneProps(t),
          t.currentFrame = this.currentFrame,
          t.currentAnimation = this.currentAnimation,
          t.paused = this.paused,
          t.currentAnimationFrame = this.currentAnimationFrame,
          t.framerate = this.framerate,
          t._animation = this._animation,
          t._currentFrame = this._currentFrame,
          t._skipAdvance = this._skipAdvance,
          t
      }
      ,
      e._tick = function (t) {
        this.paused || (this._skipAdvance || this.advance(t && t.delta),
          this._skipAdvance = !1),
          this.DisplayObject__tick(t)
      }
      ,
      e._normalizeFrame = function (t) {
        t = t || 0;
        var e = this._animation
          , i = this.paused
          , s = this._currentFrame;
        if (e) {
          var n, r = e.speed || 1, a = this.currentAnimationFrame;
          if ((n = e.frames.length) <= a + t * r) {
            var h = e.next;
            if (this._dispatchAnimationEnd(e, s, i, h, n - 1))
              return;
            if (h)
              return this._goto(h, t - (n - a) / r);
            this.paused = !0,
              a = e.frames.length - 1
          } else
            a += t * r;
          this.currentAnimationFrame = a,
            this._currentFrame = e.frames[0 | a]
        } else if (s = this._currentFrame += t,
        (n = this.spriteSheet.getNumFrames()) <= s && 0 < n && !this._dispatchAnimationEnd(e, s, i, n - 1) && (this._currentFrame -= n) >= n)
          return this._normalizeFrame();
        s = 0 | this._currentFrame,
        this.currentFrame != s && (this.currentFrame = s,
          this.dispatchEvent("change"))
      }
      ,
      e._dispatchAnimationEnd = function (t, e, i, s, n) {
        var r, a = t ? t.name : null,
          a = (this.hasEventListener("animationend") && ((r = new createjs.Event("animationend")).name = a,
            r.next = s,
            this.dispatchEvent(r)),
          this._animation != t || this._currentFrame != e);
        return a || i || !this.paused || (this.currentAnimationFrame = n,
          a = !0),
          a
      }
      ,
      e._goto = function (t, e) {
        var i;
        this.currentAnimationFrame = 0,
          isNaN(t) ? (i = this.spriteSheet.getAnimation(t)) && (this._animation = i,
            this.currentAnimation = t,
            this._normalizeFrame(e)) : (this.currentAnimation = this._animation = null,
            this._currentFrame = t,
            this._normalizeFrame())
      }
      ,
      createjs.Sprite = createjs.promote(t, "DisplayObject")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function e(t) {
      this.DisplayObject_constructor(),
        this.graphics = t || new createjs.Graphics
    }

    var t = createjs.extend(e, createjs.DisplayObject);
    t.isVisible = function () {
      var t = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
      return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && t)
    }
      ,
      t.draw = function (t, e) {
        return this.DisplayObject_draw(t, e) || this.graphics.draw(t, this),
          !0
      }
      ,
      t.clone = function (t) {
        t = t && this.graphics ? this.graphics.clone() : this.graphics;
        return this._cloneProps(new e(t))
      }
      ,
      t.toString = function () {
        return "[Shape (name=" + this.name + ")]"
      }
      ,
      createjs.Shape = createjs.promote(e, "DisplayObject")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function m(t, e, i) {
      this.DisplayObject_constructor(),
        this.text = t,
        this.font = e,
        this.color = i,
        this.textAlign = "left",
        this.textBaseline = "top",
        this.maxWidth = null,
        this.outline = 0,
        this.lineHeight = 0,
        this.lineWidth = null
    }

    var t = createjs.extend(m, createjs.DisplayObject)
      , e = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    e.getContext && (m._workingContext = e.getContext("2d"),
      e.width = e.height = 1),
      m.H_OFFSETS = {
        start: 0,
        left: 0,
        center: -.5,
        end: -1,
        right: -1
      },
      m.V_OFFSETS = {
        top: 0,
        hanging: -.01,
        middle: -.4,
        alphabetic: -.8,
        ideographic: -.85,
        bottom: -1
      },
      t.isVisible = function () {
        var t = this.cacheCanvas || null != this.text && "" !== this.text;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && t)
      }
      ,
      t.draw = function (t, e) {
        return this.DisplayObject_draw(t, e) || (e = this.color || "#000",
          this.outline ? (t.strokeStyle = e,
            t.lineWidth = +this.outline) : t.fillStyle = e,
          this._drawText(this._prepContext(t))),
          !0
      }
      ,
      t.getMeasuredWidth = function () {
        return this._getMeasuredWidth(this.text)
      }
      ,
      t.getMeasuredLineHeight = function () {
        return 1.2 * this._getMeasuredWidth("M")
      }
      ,
      t.getMeasuredHeight = function () {
        return this._drawText(null, {}).height
      }
      ,
      t.getBounds = function () {
        var t, e, i, s = this.DisplayObject_getBounds();
        return s || (null == this.text || "" === this.text ? null : (s = this._drawText(null, {}),
          e = (t = this.maxWidth && this.maxWidth < s.width ? this.maxWidth : s.width) * m.H_OFFSETS[this.textAlign || "left"],
          i = (this.lineHeight || this.getMeasuredLineHeight()) * m.V_OFFSETS[this.textBaseline || "top"],
          this._rectangle.setValues(e, i, t, s.height)))
      }
      ,
      t.getMetrics = function () {
        var t = {
          lines: []
        };
        return t.lineHeight = this.lineHeight || this.getMeasuredLineHeight(),
          t.vOffset = t.lineHeight * m.V_OFFSETS[this.textBaseline || "top"],
          this._drawText(null, t, t.lines)
      }
      ,
      t.clone = function () {
        return this._cloneProps(new m(this.text, this.font, this.color))
      }
      ,
      t.toString = function () {
        return "[Text (text=" + (20 < this.text.length ? this.text.substr(0, 17) + "..." : this.text) + ")]"
      }
      ,
      t._cloneProps = function (t) {
        return this.DisplayObject__cloneProps(t),
          t.textAlign = this.textAlign,
          t.textBaseline = this.textBaseline,
          t.maxWidth = this.maxWidth,
          t.outline = this.outline,
          t.lineHeight = this.lineHeight,
          t.lineWidth = this.lineWidth,
          t
      }
      ,
      t._prepContext = function (t) {
        return t.font = this.font || "10px sans-serif",
          t.textAlign = this.textAlign || "left",
          t.textBaseline = this.textBaseline || "top",
          t
      }
      ,
      t._drawText = function (t, e, i) {
        var s = !!t;
        s || ((t = m._workingContext).save(),
          this._prepContext(t));
        for (var n = this.lineHeight || this.getMeasuredLineHeight(), r = 0, a = 0, h = String(this.text).split(/(?:\r\n|\r|\n)/), o = 0, c = h.length; o < c; o++) {
          var l = h[o]
            , u = null;
          if (null != this.lineWidth && (u = t.measureText(l).width) > this.lineWidth)
            for (var d = l.split(/(\s)/), l = d[0], u = t.measureText(l).width, p = 1, f = d.length; p < f; p += 2) {
              var _ = t.measureText(d[p] + d[p + 1]).width;
              u + _ > this.lineWidth ? (s && this._drawTextLine(t, l, a * n),
              i && i.push(l),
              r < u && (r = u),
                l = d[p + 1],
                u = t.measureText(l).width,
                a++) : (l += d[p] + d[p + 1],
                u += _)
            }
          s && this._drawTextLine(t, l, a * n),
          i && i.push(l),
          r < (u = e && null == u ? t.measureText(l).width : u) && (r = u),
            a++
        }
        return e && (e.width = r,
          e.height = a * n),
        s || t.restore(),
          e
      }
      ,
      t._drawTextLine = function (t, e, i) {
        this.outline ? t.strokeText(e, 0, i, this.maxWidth || 65535) : t.fillText(e, 0, i, this.maxWidth || 65535)
      }
      ,
      t._getMeasuredWidth = function (t) {
        var e = m._workingContext
          , t = (e.save(),
          this._prepContext(e).measureText(t).width);
        return e.restore(),
          t
      }
      ,
      createjs.Text = createjs.promote(m, "DisplayObject")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function v(t, e) {
      this.Container_constructor(),
        this.text = t || "",
        this.spriteSheet = e,
        this.lineHeight = 0,
        this.letterSpacing = 0,
        this.spaceWidth = 0,
        this._oldProps = {
          text: 0,
          spriteSheet: 0,
          lineHeight: 0,
          letterSpacing: 0,
          spaceWidth: 0
        }
    }

    var t = createjs.extend(v, createjs.Container);
    v.maxPoolSize = 100,
      v._spritePool = [],
      t.draw = function (t, e) {
        this.DisplayObject_draw(t, e) || (this._updateText(),
          this.Container_draw(t, e))
      }
      ,
      t.getBounds = function () {
        return this._updateText(),
          this.Container_getBounds()
      }
      ,
      t.isVisible = function () {
        var t = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text;
        return !!(this.visible && 0 < this.alpha && 0 !== this.scaleX && 0 !== this.scaleY && t)
      }
      ,
      t.clone = function () {
        return this._cloneProps(new v(this.text, this.spriteSheet))
      }
      ,
      t.addChild = t.addChildAt = t.removeChild = t.removeChildAt = t.removeAllChildren = function () {
      }
      ,
      t._cloneProps = function (t) {
        return this.Container__cloneProps(t),
          t.lineHeight = this.lineHeight,
          t.letterSpacing = this.letterSpacing,
          t.spaceWidth = this.spaceWidth,
          t
      }
      ,
      t._getFrameIndex = function (t, e) {
        var i, s = e.getAnimation(t);
        return s || (i = t == (i = t.toUpperCase()) && t == (i = t.toLowerCase()) ? null : i) && (s = e.getAnimation(i)),
        s && s.frames[0]
      }
      ,
      t._getFrame = function (t, e) {
        t = this._getFrameIndex(t, e);
        return null == t ? t : e.getFrame(t)
      }
      ,
      t._getLineHeight = function (t) {
        t = this._getFrame("1", t) || this._getFrame("T", t) || this._getFrame("L", t) || t.getFrame(0);
        return t ? t.rect.height : 1
      }
      ,
      t._getSpaceWidth = function (t) {
        t = this._getFrame("1", t) || this._getFrame("l", t) || this._getFrame("e", t) || this._getFrame("a", t) || t.getFrame(0);
        return t ? t.rect.width : 1
      }
      ,
      t._updateText = function () {
        var t, e, i = 0, s = 0, n = this._oldProps, r = !1, a = this.spaceWidth, h = this.lineHeight,
          o = this.spriteSheet, c = v._spritePool, l = this.children, u = 0, d = l.length;
        for (e in n)
          n[e] != this[e] && (n[e] = this[e],
            r = !0);
        if (r) {
          var p = !!this._getFrame(" ", o);
          p || (a = a || this._getSpaceWidth(o));
          for (var h = h || this._getLineHeight(o), f = 0, _ = this.text.length; f < _; f++) {
            var m, g = this.text.charAt(f);
            " " != g || p ? "\n" != g && "\r" != g ? null != (m = this._getFrameIndex(g, o)) && (u < d ? t = l[u] : (l.push(t = c.length ? c.pop() : new createjs.Sprite),
              t.parent = this,
              d++),
              t.spriteSheet = o,
              t.gotoAndStop(m),
              t.x = i,
              t.y = s,
              u++,
              i += t.getBounds().width + this.letterSpacing) : ("\r" == g && "\n" == this.text.charAt(f + 1) && f++,
              i = 0,
              s += h) : i += a
          }
          for (; u < d;)
            c.push(t = l.pop()),
              t.parent = null,
              d--;
          c.length > v.maxPoolSize && (c.length = v.maxPoolSize)
        }
      }
      ,
      createjs.BitmapText = createjs.promote(v, "Container")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function u(t, e, i, s) {
      this.Container_constructor(),
      u.inited || u.init(),
        this.mode = t || u.INDEPENDENT,
        this.startPosition = e || 0,
        this.loop = i,
        this.currentFrame = 0,
        this.timeline = new createjs.Timeline(null, s, {
          paused: !0,
          position: e,
          useTicks: !0
        }),
        this.paused = !1,
        this.actionsEnabled = !0,
        this.autoReset = !0,
        this.frameBounds = this.frameBounds || null,
        this.framerate = null,
        this._synchOffset = 0,
        this._prevPos = -1,
        this._prevPosition = 0,
        this._t = 0,
        this._managed = {}
    }

    function t() {
      throw "MovieClipPlugin cannot be instantiated."
    }

    var e = createjs.extend(u, createjs.Container);
    u.INDEPENDENT = "independent",
      u.SINGLE_FRAME = "single",
      u.SYNCHED = "synched",
      u.inited = !1,
      u.init = function () {
        u.inited || (t.install(),
          u.inited = !0)
      }
      ,
      e.getLabels = function () {
        return this.timeline.getLabels()
      }
      ,
      e.getCurrentLabel = function () {
        return this._updateTimeline(),
          this.timeline.getCurrentLabel()
      }
      ,
      e.getDuration = function () {
        return this.timeline.duration
      }
    ;
    try {
      Object.defineProperties(e, {
        labels: {
          get: e.getLabels
        },
        currentLabel: {
          get: e.getCurrentLabel
        },
        totalFrames: {
          get: e.getDuration
        },
        duration: {
          get: e.getDuration
        }
      })
    } catch (t) {
    }
    e.initialize = u,
      e.isVisible = function () {
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY)
      }
      ,
      e.draw = function (t, e) {
        return this.DisplayObject_draw(t, e) || (this._updateTimeline(),
          this.Container_draw(t, e)),
          !0
      }
      ,
      e.play = function () {
        this.paused = !1
      }
      ,
      e.stop = function () {
        this.paused = !0
      }
      ,
      e.gotoAndPlay = function (t) {
        this.paused = !1,
          this._goto(t)
      }
      ,
      e.gotoAndStop = function (t) {
        this.paused = !0,
          this._goto(t)
      }
      ,
      e.advance = function (t) {
        var e = u.INDEPENDENT;
        if (this.mode == e) {
          for (var i = this, s = i.framerate; (i = i.parent) && null == s;)
            i.mode == e && (s = i._framerate);
          var t = null != (this._framerate = s) && -1 != s && null != t ? t / (1e3 / s) + this._t : 1
            , n = 0 | t;
          for (this._t = t - n; !this.paused && n--;)
            this._prevPosition = this._prevPos < 0 ? 0 : this._prevPosition + 1,
              this._updateTimeline()
        }
      }
      ,
      e.clone = function () {
        throw "MovieClip cannot be cloned."
      }
      ,
      e.toString = function () {
        return "[MovieClip (name=" + this.name + ")]"
      }
      ,
      e._tick = function (t) {
        this.advance(t && t.delta),
          this.Container__tick(t)
      }
      ,
      e._goto = function (t) {
        t = this.timeline.resolve(t);
        null != t && (-1 == this._prevPos && (this._prevPos = NaN),
          this._prevPosition = t,
          this._t = 0,
          this._updateTimeline())
      }
      ,
      e._reset = function () {
        this._prevPos = -1,
          this._t = this.currentFrame = 0,
          this.paused = !1
      }
      ,
      e._updateTimeline = function () {
        var t = this.timeline
          , e = this.mode != u.INDEPENDENT
          , i = (t.loop = null == this.loop || this.loop,
          e ? this.startPosition + (this.mode == u.SINGLE_FRAME ? 0 : this._synchOffset) : this._prevPos < 0 ? 0 : this._prevPosition)
          , e = e || !this.actionsEnabled ? createjs.Tween.NONE : null;
        if (this.currentFrame = t._calcPosition(i),
          t.setPosition(i, e),
          this._prevPosition = t._prevPosition,
        this._prevPos != t._prevPos) {
          for (var s in this.currentFrame = this._prevPos = t._prevPos,
            this._managed)
            this._managed[s] = 1;
          for (var n = t._tweens, r = 0, a = n.length; r < a; r++) {
            var h = n[r]
              , o = h._target;
            o == this || h.passive || (h = h._stepPosition,
              o instanceof createjs.DisplayObject ? this._addManagedChild(o, h) : this._setState(o.state, h))
          }
          for (var c = this.children, r = c.length - 1; 0 <= r; r--) {
            var l = c[r].id;
            1 == this._managed[l] && (this.removeChildAt(r),
              delete this._managed[l])
          }
        }
      }
      ,
      e._setState = function (t, e) {
        if (t)
          for (var i = t.length - 1; 0 <= i; i--) {
            var s, n = t[i], r = n.t, a = n.p;
            for (s in a)
              r[s] = a[s];
            this._addManagedChild(r, e)
          }
      }
      ,
      e._addManagedChild = function (t, e) {
        t._off || (this.addChildAt(t, 0),
        t instanceof u && (t._synchOffset = e,
        t.mode == u.INDEPENDENT) && t.autoReset && !this._managed[t.id] && t._reset(),
          this._managed[t.id] = 2)
      }
      ,
      e._getBounds = function (t, e) {
        var i = this.DisplayObject_getBounds();
        return i || (this._updateTimeline(),
        this.frameBounds && (i = this._rectangle.copy(this.frameBounds[this.currentFrame]))),
          i ? this._transformBounds(i, t, e) : this.Container__getBounds(t, e)
      }
      ,
      createjs.MovieClip = createjs.promote(u, "Container"),
      t.priority = 100,
      t.install = function () {
        createjs.Tween.installPlugin(t, ["startPosition"])
      }
      ,
      t.init = function (t, e, i) {
        return i
      }
      ,
      t.step = function () {
      }
      ,
      t.tween = function (t, e, i, s, n, r) {
        return t.target instanceof u ? (1 == r ? n : s)[e] : i
      }
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function E() {
      throw "SpriteSheetUtils cannot be instantiated"
    }

    var t = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    t.getContext && (E._workingCanvas = t,
      E._workingContext = t.getContext("2d"),
      t.width = t.height = 1),
      E.addFlippedFrames = function (t, e, i, s) {
        var n;
        (e || i || s) && (n = 0,
        e && E._flip(t, ++n, !0, !1),
        i && E._flip(t, ++n, !1, !0),
          s) && E._flip(t, ++n, !0, !0)
      }
      ,
      E.extractFrame = function (t, e) {
        isNaN(e) && (e = t.getAnimation(e).frames[0]);
        var i, t = t.getFrame(e);
        return t ? (e = t.rect,
          (i = E._workingCanvas).width = e.width,
          i.height = e.height,
          E._workingContext.drawImage(t.image, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height),
          (t = document.createElement("img")).src = i.toDataURL("image/png"),
          t) : null
      }
      ,
      E.mergeAlpha = function (t, e, i) {
        (i = i || (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"))).width = Math.max(e.width, t.width),
          i.height = Math.max(e.height, t.height);
        var s = i.getContext("2d");
        return s.save(),
          s.drawImage(t, 0, 0),
          s.globalCompositeOperation = "destination-in",
          s.drawImage(e, 0, 0),
          s.restore(),
          i
      }
      ,
      E._flip = function (t, e, i, s) {
        for (var n = t._images, r = E._workingCanvas, a = E._workingContext, h = n.length / e, o = 0; o < h; o++) {
          var c = n[o]
            , l = (c.__tmp = o,
            a.setTransform(1, 0, 0, 1, 0, 0),
            a.clearRect(0, 0, r.width + 1, r.height + 1),
            r.width = c.width,
            r.height = c.height,
            a.setTransform(i ? -1 : 1, 0, 0, s ? -1 : 1, i ? c.width : 0, s ? c.height : 0),
            a.drawImage(c, 0, 0),
            document.createElement("img"));
          l.src = r.toDataURL("image/png"),
            l.width = c.width,
            l.height = c.height,
            n.push(l)
        }
        for (var u = (w = t._frames).length / e, o = 0; o < u; o++) {
          var d = (c = w[o]).rect.clone()
            , p = {
            image: l = n[c.image.__tmp + h * e],
            rect: d,
            regX: c.regX,
            regY: c.regY
          };
          i && (d.x = l.width - d.x - d.width,
            p.regX = d.width - c.regX),
          s && (d.y = l.height - d.y - d.height,
            p.regY = d.height - c.regY),
            w.push(p)
        }
        var f = "_" + (i ? "h" : "") + (s ? "v" : "")
          , _ = t._animations
          , m = t._data
          , g = _.length / e;
        for (o = 0; o < g; o++) {
          var v = _[o]
            , x = {
            name: v + f,
            speed: (c = m[v]).speed,
            next: c.next,
            frames: []
          };
          c.next && (x.next += f);
          for (var w, y = 0, b = (w = c.frames).length; y < b; y++)
            x.frames.push(w[y] + u * e);
          m[x.name] = x,
            _.push(x.name)
        }
      }
      ,
      createjs.SpriteSheetUtils = E
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function y(t) {
      this.EventDispatcher_constructor(),
        this.maxWidth = 2048,
        this.maxHeight = 2048,
        this.spriteSheet = null,
        this.scale = 1,
        this.padding = 1,
        this.timeSlice = .3,
        this.progress = -1,
        this.framerate = t || 0,
        this._frames = [],
        this._animations = {},
        this._data = null,
        this._nextFrameIndex = 0,
        this._index = 0,
        this._timerID = null,
        this._scale = 1
    }

    var t = createjs.extend(y, createjs.EventDispatcher);
    y.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions",
      y.ERR_RUNNING = "a build is already running",
      t.addFrame = function (t, e, i, s, n) {
        if (this._data)
          throw y.ERR_RUNNING;
        e = e || t.bounds || t.nominalBounds;
        return (e = !e && t.getBounds ? t.getBounds() : e) ? this._frames.push({
          source: t,
          sourceRect: e,
          scale: i = i || 1,
          funct: s,
          data: n,
          index: this._frames.length,
          height: e.height * i
        }) - 1 : null
      }
      ,
      t.addAnimation = function (t, e, i, s) {
        if (this._data)
          throw y.ERR_RUNNING;
        this._animations[t] = {
          frames: e,
          next: i,
          speed: s
        }
      }
      ,
      t.addMovieClip = function (t, e, i, s, n, r) {
        if (this._data)
          throw y.ERR_RUNNING;
        var a = t.frameBounds
          , h = e || t.bounds || t.nominalBounds;
        if ((h = !h && t.getBounds ? t.getBounds() : h) || a) {
          for (var o, c = this._frames.length, l = t.timeline.duration, u = 0; u < l; u++) {
            var d = a && a[u] ? a[u] : h;
            this.addFrame(t, d, i, this._setupMovieClipFrame, {
              i: u,
              f: s,
              d: n
            })
          }
          var p, f = t.timeline._labels, _ = [];
          for (p in f)
            _.push({
              index: f[p],
              label: p
            });
          if (_.length)
            for (_.sort(function (t, e) {
              return t.index - e.index
            }),
                   u = 0,
                   o = _.length; u < o; u++) {
              for (var m = _[u].label, g = c + _[u].index, v = c + (u == o - 1 ? l : _[u + 1].index), x = [], w = g; w < v; w++)
                x.push(w);
              r && !(m = r(m, t, g, v)) || this.addAnimation(m, x, !0)
            }
        }
      }
      ,
      t.build = function () {
        if (this._data)
          throw y.ERR_RUNNING;
        for (this._startBuild(); this._drawNext();)
          ;
        return this._endBuild(),
          this.spriteSheet
      }
      ,
      t.buildAsync = function (t) {
        if (this._data)
          throw y.ERR_RUNNING;
        this.timeSlice = t,
          this._startBuild();
        var e = this;
        this._timerID = setTimeout(function () {
          e._run()
        }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)))
      }
      ,
      t.stopAsync = function () {
        clearTimeout(this._timerID),
          this._data = null
      }
      ,
      t.clone = function () {
        throw "SpriteSheetBuilder cannot be cloned."
      }
      ,
      t.toString = function () {
        return "[SpriteSheetBuilder]"
      }
      ,
      t._startBuild = function () {
        var t = this.padding || 0
          , e = (this.progress = 0,
          this.spriteSheet = null,
          this._index = 0,
          this._scale = this.scale,
          [])
          , i = (this._data = {
          images: [],
          frames: e,
          framerate: this.framerate,
          animations: this._animations
        },
          this._frames.slice());
        if (i.sort(function (t, e) {
          return t.height <= e.height ? -1 : 1
        }),
        i[i.length - 1].height + 2 * t > this.maxHeight)
          throw y.ERR_DIMENSIONS;
        for (var s = 0, n = 0, r = 0; i.length;) {
          var a, h = this._fillRow(i, s, r, e, t);
          h.w > n && (n = h.w),
            s += h.h,
          h.h && i.length || ((a = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).width = this._getSize(n, this.maxWidth),
            a.height = this._getSize(s, this.maxHeight),
            this._data.images[r] = a,
            h.h) || (n = s = 0,
            r++)
        }
      }
      ,
      t._setupMovieClipFrame = function (t, e) {
        var i = t.actionsEnabled;
        t.actionsEnabled = !1,
          t.gotoAndStop(e.i),
          t.actionsEnabled = i,
        e.f && e.f(t, e.d, e.i)
      }
      ,
      t._getSize = function (t, e) {
        for (var i = 4; Math.pow(2, ++i) < t;)
          ;
        return Math.min(e, Math.pow(2, i))
      }
      ,
      t._fillRow = function (t, e, i, s, n) {
        for (var r = this.maxWidth, a = this.maxHeight - (e += n), h = n, o = 0, c = t.length - 1; 0 <= c; c--) {
          var l = t[c]
            , u = this._scale * l.scale
            , d = l.sourceRect
            , p = l.source
            , f = Math.floor(u * d.x - n)
            , _ = Math.floor(u * d.y - n)
            , m = Math.ceil(u * d.height + 2 * n)
            , d = Math.ceil(u * d.width + 2 * n);
          if (r < d)
            throw y.ERR_DIMENSIONS;
          a < m || r < h + d || (l.img = i,
            l.rect = new createjs.Rectangle(h, e, d, m),
            o = o || m,
            t.splice(c, 1),
            s[l.index] = [h, e, d, m, i, Math.round(-f + u * p.regX - n), Math.round(-_ + u * p.regY - n)],
            h += d)
        }
        return {
          w: h,
          h: o
        }
      }
      ,
      t._endBuild = function () {
        this.spriteSheet = new createjs.SpriteSheet(this._data),
          this._data = null,
          this.progress = 1,
          this.dispatchEvent("complete")
      }
      ,
      t._run = function () {
        for (var t, e = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), i = (new Date).getTime() + e, s = !1; i > (new Date).getTime();)
          if (!this._drawNext()) {
            s = !0;
            break
          }
        s ? this._endBuild() : (t = this)._timerID = setTimeout(function () {
          t._run()
        }, 50 - e);
        var n, e = this.progress = this._index / this._frames.length;
        this.hasEventListener("progress") && ((n = new createjs.Event("progress")).progress = e,
          this.dispatchEvent(n))
      }
      ,
      t._drawNext = function () {
        var t = this._frames[this._index]
          , e = t.scale * this._scale
          , i = t.rect
          , s = t.sourceRect
          , n = this._data.images[t.img].getContext("2d");
        return t.funct && t.funct(t.source, t.data),
          n.save(),
          n.beginPath(),
          n.rect(i.x, i.y, i.width, i.height),
          n.clip(),
          n.translate(Math.ceil(i.x - s.x * e), Math.ceil(i.y - s.y * e)),
          n.scale(e, e),
          t.source.draw(n),
          n.restore(),
        ++this._index < this._frames.length
      }
      ,
      createjs.SpriteSheetBuilder = createjs.promote(y, "EventDispatcher")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t) {
      this.DisplayObject_constructor(),
      "string" == typeof t && (t = document.getElementById(t)),
        this.mouseEnabled = !1;
      var e = t.style;
      e.position = "absolute",
        e.transformOrigin = e.WebkitTransformOrigin = e.msTransformOrigin = e.MozTransformOrigin = e.OTransformOrigin = "0% 0%",
        this.htmlElement = t,
        this._oldProps = null
    }

    var e = createjs.extend(t, createjs.DisplayObject);
    e.isVisible = function () {
      return null != this.htmlElement
    }
      ,
      e.draw = function () {
        return !0
      }
      ,
      e.cache = function () {
      }
      ,
      e.uncache = function () {
      }
      ,
      e.updateCache = function () {
      }
      ,
      e.hitTest = function () {
      }
      ,
      e.localToGlobal = function () {
      }
      ,
      e.globalToLocal = function () {
      }
      ,
      e.localToLocal = function () {
      }
      ,
      e.clone = function () {
        throw "DOMElement cannot be cloned."
      }
      ,
      e.toString = function () {
        return "[DOMElement (name=" + this.name + ")]"
      }
      ,
      e._tick = function (t) {
        var e = this.getStage();
        e && e.on("drawend", this._handleDrawEnd, this, !0),
          this.DisplayObject__tick(t)
      }
      ,
      e._handleDrawEnd = function () {
        var t, e, i, s, n, r = this.htmlElement;
        r && (r = r.style,
          e = (t = this.getConcatenatedDisplayProps(this._props)).matrix,
        (s = t.visible ? "visible" : "hidden") != r.visibility && (r.visibility = s),
          t.visible) && (s = 1e4,
        (n = (i = this._oldProps) && i.matrix) && n.equals(e) || (n = "matrix(" + (e.a * s | 0) / s + "," + (e.b * s | 0) / s + "," + (e.c * s | 0) / s + "," + (e.d * s | 0) / s + "," + (e.tx + .5 | 0),
          r.transform = r.WebkitTransform = r.OTransform = r.msTransform = n + "," + (e.ty + .5 | 0) + ")",
          r.MozTransform = n + "px," + (e.ty + .5 | 0) + "px)",
          (i = i || (this._oldProps = new createjs.DisplayProps(!0, NaN))).matrix.copy(e)),
        i.alpha != t.alpha) && (r.opacity = "" + (t.alpha * s | 0) / s,
          i.alpha = t.alpha)
      }
      ,
      createjs.DOMElement = createjs.promote(t, "DisplayObject")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t() {
    }

    var e = t.prototype;
    e.getBounds = function (t) {
      return t
    }
      ,
      e.applyFilter = function (t, e, i, s, n, r, a, h) {
        r = r || t,
        null == a && (a = e),
        null == h && (h = i);
        try {
          var o = t.getImageData(e, i, s, n)
        } catch (t) {
          return !1
        }
        return !!this._applyFilter(o) && (r.putImageData(o, a, h),
          !0)
      }
      ,
      e.toString = function () {
        return "[Filter]"
      }
      ,
      e.clone = function () {
        return new t
      }
      ,
      e._applyFilter = function () {
        return !0
      }
      ,
      createjs.Filter = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function B(t, e, i) {
      (isNaN(t) || t < 0) && (t = 0),
      (isNaN(e) || e < 0) && (e = 0),
      (isNaN(i) || i < 1) && (i = 1),
        this.blurX = 0 | t,
        this.blurY = 0 | e,
        this.quality = 0 | i
    }

    var t = createjs.extend(B, createjs.Filter);
    B.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1],
      B.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9],
      t.getBounds = function (t) {
        var e, i = 0 | this.blurX, s = 0 | this.blurY;
        return i <= 0 && s <= 0 ? t : (e = Math.pow(this.quality, .2),
          (t || new createjs.Rectangle).pad(i * e + 1, s * e + 1, i * e + 1, s * e + 1))
      }
      ,
      t.clone = function () {
        return new B(this.blurX, this.blurY, this.quality)
      }
      ,
      t.toString = function () {
        return "[BlurFilter]"
      }
      ,
      t._applyFilter = function (t) {
        var e = this.blurX >> 1;
        if (isNaN(e) || e < 0)
          return !1;
        var i = this.blurY >> 1;
        if (isNaN(i) || i < 0)
          return !1;
        if (0 == e && 0 == i)
          return !1;
        for (var s = this.quality, n = ((isNaN(s) || s < 1) && (s = 1),
        (s = 3 < (s |= 0) ? 3 : s) < 1 && (s = 1),
          t.data), r = 0, a = 0, h = 0, o = 0, c = 0, l = 0, u = 0, d = 0, p = 0, f = 0, _ = 0, m = 0, g = 0, v = 0, x = 0, w = e + e + 1 | 0, y = i + i + 1 | 0, b = 0 | t.width, E = 0 | t.height, S = b - 1 | 0, j = E - 1 | 0, T = 1 + e | 0, M = 1 + i | 0, D = {
          r: 0,
          b: 0,
          g: 0,
          a: 0
        }, C = D, h = 1; h < w; h++)
          C = C.n = {
            r: 0,
            b: 0,
            g: 0,
            a: 0
          };
        C.n = D;
        var P = {
          r: 0,
          b: 0,
          g: 0,
          a: 0
        }
          , O = P;
        for (h = 1; h < y; h++)
          O = O.n = {
            r: 0,
            b: 0,
            g: 0,
            a: 0
          };
        O.n = P;
        for (var k = null, I = 0 | B.MUL_TABLE[e], A = 0 | B.SHG_TABLE[e], R = 0 | B.MUL_TABLE[i], N = 0 | B.SHG_TABLE[i]; 0 < s--;) {
          for (var u = l = 0, L = I, F = A, a = E; -1 < --a;) {
            for (d = T * (m = n[0 | l]),
                   p = T * (g = n[l + 1 | 0]),
                   f = T * (v = n[l + 2 | 0]),
                   _ = T * (x = n[l + 3 | 0]),
                   C = D,
                   h = T; -1 < --h;)
              C.r = m,
                C.g = g,
                C.b = v,
                C.a = x,
                C = C.n;
            for (h = 1; h < T; h++)
              d += C.r = n[o = l + ((S < h ? S : h) << 2) | 0],
                p += C.g = n[o + 1],
                f += C.b = n[o + 2],
                _ += C.a = n[o + 3],
                C = C.n;
            for (k = D,
                   r = 0; r < b; r++)
              n[l++] = d * L >>> F,
                n[l++] = p * L >>> F,
                n[l++] = f * L >>> F,
                n[l++] = _ * L >>> F,
                o = u + ((o = r + e + 1) < S ? o : S) << 2,
                d -= k.r - (k.r = n[o]),
                p -= k.g - (k.g = n[o + 1]),
                f -= k.b - (k.b = n[o + 2]),
                _ -= k.a - (k.a = n[o + 3]),
                k = k.n;
            u += b
          }
          for (L = R,
                 F = N,
                 r = 0; r < b; r++) {
            for (d = M * (m = n[l = r << 2 | 0]) | 0,
                   p = M * (g = n[l + 1 | 0]) | 0,
                   f = M * (v = n[l + 2 | 0]) | 0,
                   _ = M * (x = n[l + 3 | 0]) | 0,
                   O = P,
                   h = 0; h < M; h++)
              O.r = m,
                O.g = g,
                O.b = v,
                O.a = x,
                O = O.n;
            for (c = b,
                   h = 1; h <= i; h++)
              d += O.r = n[l = c + r << 2],
                p += O.g = n[l + 1],
                f += O.b = n[l + 2],
                _ += O.a = n[l + 3],
                O = O.n,
              h < j && (c += b);
            if (l = r,
              k = P,
            0 < s)
              for (a = 0; a < E; a++)
                n[(o = l << 2) + 3] = x = _ * L >>> F,
                  0 < x ? (n[o] = d * L >>> F,
                    n[o + 1] = p * L >>> F,
                    n[o + 2] = f * L >>> F) : n[o] = n[o + 1] = n[o + 2] = 0,
                  o = r + ((o = a + M) < j ? o : j) * b << 2,
                  d -= k.r - (k.r = n[o]),
                  p -= k.g - (k.g = n[o + 1]),
                  f -= k.b - (k.b = n[o + 2]),
                  _ -= k.a - (k.a = n[o + 3]),
                  k = k.n,
                  l += b;
            else
              for (a = 0; a < E; a++)
                n[(o = l << 2) + 3] = x = _ * L >>> F,
                  0 < x ? (n[o] = (d * L >>> F) * (x = 255 / x),
                    n[o + 1] = (p * L >>> F) * x,
                    n[o + 2] = (f * L >>> F) * x) : n[o] = n[o + 1] = n[o + 2] = 0,
                  o = r + ((o = a + M) < j ? o : j) * b << 2,
                  d -= k.r - (k.r = n[o]),
                  p -= k.g - (k.g = n[o + 1]),
                  f -= k.b - (k.b = n[o + 2]),
                  _ -= k.a - (k.a = n[o + 3]),
                  k = k.n,
                  l += b
          }
        }
        return !0
      }
      ,
      createjs.BlurFilter = createjs.promote(B, "Filter")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function e(t) {
      this.alphaMap = t,
        this._alphaMap = null,
        this._mapData = null
    }

    var t = createjs.extend(e, createjs.Filter);
    t.clone = function () {
      var t = new e(this.alphaMap);
      return t._alphaMap = this._alphaMap,
        t._mapData = this._mapData,
        t
    }
      ,
      t.toString = function () {
        return "[AlphaMapFilter]"
      }
      ,
      t._applyFilter = function (t) {
        if (this.alphaMap) {
          if (!this._prepAlphaMap())
            return !1;
          for (var e = t.data, i = this._mapData, s = 0, n = e.length; s < n; s += 4)
            e[s + 3] = i[s] || 0
        }
        return !0
      }
      ,
      t._prepAlphaMap = function () {
        if (!this.alphaMap)
          return !1;
        if (this.alphaMap != this._alphaMap || !this._mapData) {
          this._mapData = null;
          var t, e = this._alphaMap = this.alphaMap, i = e;
          e instanceof HTMLCanvasElement ? t = i.getContext("2d") : ((i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).width = e.width,
            i.height = e.height,
            (t = i.getContext("2d")).drawImage(e, 0, 0));
          try {
            var s = t.getImageData(0, 0, e.width, e.height)
          } catch (t) {
            return !1
          }
          this._mapData = s.data
        }
        return !0
      }
      ,
      createjs.AlphaMapFilter = createjs.promote(e, "Filter")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t) {
      this.mask = t
    }

    var e = createjs.extend(t, createjs.Filter);
    e.applyFilter = function (t, e, i, s, n, r, a, h) {
      return !this.mask || (null == a && (a = e),
      null == h && (h = i),
        (r = r || t).save(),
      t == r && (r.globalCompositeOperation = "destination-in",
        r.drawImage(this.mask, a, h),
        r.restore(),
        !0))
    }
      ,
      e.clone = function () {
        return new t(this.mask)
      }
      ,
      e.toString = function () {
        return "[AlphaMaskFilter]"
      }
      ,
      createjs.AlphaMaskFilter = createjs.promote(t, "Filter")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i, s, n, r, a, h) {
      this.redMultiplier = null != t ? t : 1,
        this.greenMultiplier = null != e ? e : 1,
        this.blueMultiplier = null != i ? i : 1,
        this.alphaMultiplier = null != s ? s : 1,
        this.redOffset = n || 0,
        this.greenOffset = r || 0,
        this.blueOffset = a || 0,
        this.alphaOffset = h || 0
    }

    var e = createjs.extend(t, createjs.Filter);
    e.toString = function () {
      return "[ColorFilter]"
    }
      ,
      e.clone = function () {
        return new t(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
      }
      ,
      e._applyFilter = function (t) {
        for (var e = t.data, i = e.length, s = 0; s < i; s += 4)
          e[s] = e[s] * this.redMultiplier + this.redOffset,
            e[s + 1] = e[s + 1] * this.greenMultiplier + this.greenOffset,
            e[s + 2] = e[s + 2] * this.blueMultiplier + this.blueOffset,
            e[s + 3] = e[s + 3] * this.alphaMultiplier + this.alphaOffset;
        return !0
      }
      ,
      createjs.ColorFilter = createjs.promote(t, "Filter")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function s(t, e, i, s) {
      this.setColor(t, e, i, s)
    }

    var t = s.prototype;
    s.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10],
      s.LENGTH = (s.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]).length,
      t.setColor = function (t, e, i, s) {
        return this.reset().adjustColor(t, e, i, s)
      }
      ,
      t.reset = function () {
        return this.copy(s.IDENTITY_MATRIX)
      }
      ,
      t.adjustColor = function (t, e, i, s) {
        return this.adjustHue(s),
          this.adjustContrast(e),
          this.adjustBrightness(t),
          this.adjustSaturation(i)
      }
      ,
      t.adjustBrightness = function (t) {
        return 0 == t || isNaN(t) || (t = this._cleanValue(t, 255),
          this._multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])),
          this
      }
      ,
      t.adjustContrast = function (t) {
        var e;
        return 0 == t || isNaN(t) || (e = (t = this._cleanValue(t, 100)) < 0 ? 127 + t / 100 * 127 : 127 * (e = 0 == (e = t % 1) ? s.DELTA_INDEX[t] : s.DELTA_INDEX[t << 0] * (1 - e) + s.DELTA_INDEX[1 + (t << 0)] * e) + 127,
          this._multiplyMatrix([e / 127, 0, 0, 0, .5 * (127 - e), 0, e / 127, 0, 0, .5 * (127 - e), 0, 0, e / 127, 0, .5 * (127 - e), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])),
          this
      }
      ,
      t.adjustSaturation = function (t) {
        return 0 == t || isNaN(t) || (t = 1 + (0 < (t = this._cleanValue(t, 100)) ? 3 * t / 100 : t / 100),
          this._multiplyMatrix([.3086 * (1 - t) + t, .6094 * (1 - t), .082 * (1 - t), 0, 0, .3086 * (1 - t), .6094 * (1 - t) + t, .082 * (1 - t), 0, 0, .3086 * (1 - t), .6094 * (1 - t), .082 * (1 - t) + t, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])),
          this
      }
      ,
      t.adjustHue = function (t) {
        var e, i, s, n;
        return 0 == t || isNaN(t) || (t = this._cleanValue(t, 180) / 180 * Math.PI,
          e = Math.cos(t),
          t = Math.sin(t),
          this._multiplyMatrix([(i = .213) + .787 * e + t * -i, (s = .715) + e * -s + t * -s, (n = .072) + e * -n + .928 * t, 0, 0, i + e * -i + .143 * t, s + e * (1 - s) + .14 * t, n + e * -n + -.283 * t, 0, 0, i + e * -i + -.787 * t, s + e * -s + t * s, n + .928 * e + t * n, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])),
          this
      }
      ,
      t.concat = function (t) {
        return (t = this._fixMatrix(t)).length != s.LENGTH || this._multiplyMatrix(t),
          this
      }
      ,
      t.clone = function () {
        return (new s).copy(this)
      }
      ,
      t.toArray = function () {
        for (var t = [], e = 0, i = s.LENGTH; e < i; e++)
          t[e] = this[e];
        return t
      }
      ,
      t.copy = function (t) {
        for (var e = s.LENGTH, i = 0; i < e; i++)
          this[i] = t[i];
        return this
      }
      ,
      t.toString = function () {
        return "[ColorMatrix]"
      }
      ,
      t._multiplyMatrix = function (t) {
        for (var e, i = [], s = 0; s < 5; s++) {
          for (e = 0; e < 5; e++)
            i[e] = this[e + 5 * s];
          for (e = 0; e < 5; e++) {
            for (var n = 0, r = 0; r < 5; r++)
              n += t[e + 5 * r] * i[r];
            this[e + 5 * s] = n
          }
        }
      }
      ,
      t._cleanValue = function (t, e) {
        return Math.min(e, Math.max(-e, t))
      }
      ,
      t._fixMatrix = function (t) {
        return (t = t instanceof s ? t.toArray() : t).length < s.LENGTH ? t = t.slice(0, t.length).concat(s.IDENTITY_MATRIX.slice(t.length, s.LENGTH)) : t.length > s.LENGTH && (t = t.slice(0, s.LENGTH)),
          t
      }
      ,
      createjs.ColorMatrix = s
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t) {
      this.matrix = t
    }

    var e = createjs.extend(t, createjs.Filter);
    e.toString = function () {
      return "[ColorMatrixFilter]"
    }
      ,
      e.clone = function () {
        return new t(this.matrix)
      }
      ,
      e._applyFilter = function (t) {
        for (var e, i, s, n, r = t.data, a = r.length, t = this.matrix, h = t[0], o = t[1], c = t[2], l = t[3], u = t[4], d = t[5], p = t[6], f = t[7], _ = t[8], m = t[9], g = t[10], v = t[11], x = t[12], w = t[13], y = t[14], b = t[15], E = t[16], S = t[17], j = t[18], T = t[19], M = 0; M < a; M += 4)
          e = r[M],
            i = r[M + 1],
            s = r[M + 2],
            n = r[M + 3],
            r[M] = e * h + i * o + s * c + n * l + u,
            r[M + 1] = e * d + i * p + s * f + n * _ + m,
            r[M + 2] = e * g + i * v + s * x + n * w + y,
            r[M + 3] = e * b + i * E + s * S + n * j + T;
        return !0
      }
      ,
      createjs.ColorMatrixFilter = createjs.promote(t, "Filter")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function s() {
      throw "Touch cannot be instantiated"
    }

    s.isSupported = function () {
      return !!("ontouchstart" in window || window.navigator.msPointerEnabled && 0 < window.navigator.msMaxTouchPoints || window.navigator.pointerEnabled && 0 < window.navigator.maxTouchPoints)
    }
      ,
      s.enable = function (t, e, i) {
        return !!(t && t.canvas && s.isSupported()) && (t.__touch || (t.__touch = {
          pointers: {},
          multitouch: !e,
          preventDefault: !i,
          count: 0
        },
          "ontouchstart" in window ? s._IOS_enable(t) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && s._IE_enable(t)),
          !0)
      }
      ,
      s.disable = function (t) {
        t && ("ontouchstart" in window ? s._IOS_disable(t) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && s._IE_disable(t),
          delete t.__touch)
      }
      ,
      s._IOS_enable = function (e) {
        var t = e.canvas
          , i = e.__touch.f = function (t) {
            s._IOS_handleEvent(e, t)
          }
        ;
        t.addEventListener("touchstart", i, !1),
          t.addEventListener("touchmove", i, !1),
          t.addEventListener("touchend", i, !1),
          t.addEventListener("touchcancel", i, !1)
      }
      ,
      s._IOS_disable = function (t) {
        var e = t.canvas;
        e && (t = t.__touch.f,
          e.removeEventListener("touchstart", t, !1),
          e.removeEventListener("touchmove", t, !1),
          e.removeEventListener("touchend", t, !1),
          e.removeEventListener("touchcancel", t, !1))
      }
      ,
      s._IOS_handleEvent = function (t, e) {
        if (t) {
          t.__touch.preventDefault && e.preventDefault && e.preventDefault();
          for (var i = e.changedTouches, s = e.type, n = 0, r = i.length; n < r; n++) {
            var a = i[n]
              , h = a.identifier;
            a.target == t.canvas && ("touchstart" == s ? this._handleStart(t, h, e, a.pageX, a.pageY) : "touchmove" == s ? this._handleMove(t, h, e, a.pageX, a.pageY) : "touchend" != s && "touchcancel" != s || this._handleEnd(t, h, e))
          }
        }
      }
      ,
      s._IE_enable = function (e) {
        var t = e.canvas
          , i = e.__touch.f = function (t) {
            s._IE_handleEvent(e, t)
          }
        ;
        void 0 === window.navigator.pointerEnabled ? (t.addEventListener("MSPointerDown", i, !1),
          window.addEventListener("MSPointerMove", i, !1),
          window.addEventListener("MSPointerUp", i, !1),
          window.addEventListener("MSPointerCancel", i, !1),
        e.__touch.preventDefault && (t.style.msTouchAction = "none")) : (t.addEventListener("pointerdown", i, !1),
          window.addEventListener("pointermove", i, !1),
          window.addEventListener("pointerup", i, !1),
          window.addEventListener("pointercancel", i, !1),
        e.__touch.preventDefault && (t.style.touchAction = "none")),
          e.__touch.activeIDs = {}
      }
      ,
      s._IE_disable = function (t) {
        var e = t.__touch.f;
        void 0 === window.navigator.pointerEnabled ? (window.removeEventListener("MSPointerMove", e, !1),
          window.removeEventListener("MSPointerUp", e, !1),
          window.removeEventListener("MSPointerCancel", e, !1),
        t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1)) : (window.removeEventListener("pointermove", e, !1),
          window.removeEventListener("pointerup", e, !1),
          window.removeEventListener("pointercancel", e, !1),
        t.canvas && t.canvas.removeEventListener("pointerdown", e, !1))
      }
      ,
      s._IE_handleEvent = function (t, e) {
        var i, s, n;
        t && (t.__touch.preventDefault && e.preventDefault && e.preventDefault(),
          i = e.type,
          s = e.pointerId,
          n = t.__touch.activeIDs,
          "MSPointerDown" == i || "pointerdown" == i ? e.srcElement == t.canvas && (n[s] = !0,
            this._handleStart(t, s, e, e.pageX, e.pageY)) : n[s] && ("MSPointerMove" == i || "pointermove" == i ? this._handleMove(t, s, e, e.pageX, e.pageY) : "MSPointerUp" != i && "MSPointerCancel" != i && "pointerup" != i && "pointercancel" != i || (delete n[s],
            this._handleEnd(t, s, e))))
      }
      ,
      s._handleStart = function (t, e, i, s, n) {
        var r, a = t.__touch;
        !a.multitouch && a.count || (r = a.pointers)[e] || (r[e] = !0,
          a.count++,
          t._handlePointerDown(e, i, s, n))
      }
      ,
      s._handleMove = function (t, e, i, s, n) {
        t.__touch.pointers[e] && t._handlePointerMove(e, i, s, n)
      }
      ,
      s._handleEnd = function (t, e, i) {
        var s = t.__touch
          , n = s.pointers;
        n[e] && (s.count--,
          t._handlePointerUp(e, i, !0),
          delete n[e])
      }
      ,
      createjs.Touch = s
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";
    var t = createjs.EaselJS = createjs.EaselJS || {};
    t.version = "0.8.2",
      t.buildDate = "Thu, 26 Nov 2015 20:44:34 GMT"
  }();
this.createjs = this.createjs || {},
  createjs.extend = function (t, e) {
    "use strict";

    function i() {
      this.constructor = t
    }

    return i.prototype = e.prototype,
      t.prototype = new i
  }
  ,
  this.createjs = this.createjs || {},
  createjs.promote = function (t, e) {
    "use strict";
    var i = t.prototype
      , n = Object.getPrototypeOf && Object.getPrototypeOf(i) || i.__proto__;
    if (n)
      for (var s in i[(e += "_") + "constructor"] = n.constructor,
        n)
        i.hasOwnProperty(s) && "function" == typeof n[s] && (i[e + s] = n[s]);
    return t
  }
  ,
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i) {
      this.type = t,
        this.target = null,
        this.currentTarget = null,
        this.eventPhase = 0,
        this.bubbles = !!e,
        this.cancelable = !!i,
        this.timeStamp = (new Date).getTime(),
        this.defaultPrevented = !1,
        this.propagationStopped = !1,
        this.immediatePropagationStopped = !1,
        this.removed = !1
    }

    var e = t.prototype;
    e.preventDefault = function () {
      this.defaultPrevented = this.cancelable && !0
    }
      ,
      e.stopPropagation = function () {
        this.propagationStopped = !0
      }
      ,
      e.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0
      }
      ,
      e.remove = function () {
        this.removed = !0
      }
      ,
      e.clone = function () {
        return new t(this.type, this.bubbles, this.cancelable)
      }
      ,
      e.set = function (t) {
        for (var e in t)
          this[e] = t[e];
        return this
      }
      ,
      e.toString = function () {
        return "[Event (type=" + this.type + ")]"
      }
      ,
      createjs.Event = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t() {
      this._listeners = null,
        this._captureListeners = null
    }

    var e = t.prototype;
    t.initialize = function (t) {
      t.addEventListener = e.addEventListener,
        t.on = e.on,
        t.removeEventListener = t.off = e.removeEventListener,
        t.removeAllEventListeners = e.removeAllEventListeners,
        t.hasEventListener = e.hasEventListener,
        t.dispatchEvent = e.dispatchEvent,
        t._dispatchEvent = e._dispatchEvent,
        t.willTrigger = e.willTrigger
    }
      ,
      e.addEventListener = function (t, e, i) {
        var n = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {}
          , s = n[t];
        return s && this.removeEventListener(t, e, i),
          (s = n[t]) ? s.push(e) : n[t] = [e],
          e
      }
      ,
      e.on = function (t, e, i, n, s, r) {
        return e.handleEvent && (i = i || e,
          e = e.handleEvent),
          i = i || this,
          this.addEventListener(t, function (t) {
            e.call(i, t, s),
            n && t.remove()
          }, r)
      }
      ,
      e.removeEventListener = function (t, e, i) {
        var n = i ? this._captureListeners : this._listeners;
        if (n) {
          var s = n[t];
          if (s)
            for (var r = 0, o = s.length; r < o; r++)
              if (s[r] == e) {
                1 == o ? delete n[t] : s.splice(r, 1);
                break
              }
        }
      }
      ,
      e.off = e.removeEventListener,
      e.removeAllEventListeners = function (t) {
        t ? (this._listeners && delete this._listeners[t],
        this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
      }
      ,
      e.dispatchEvent = function (t, e, i) {
        if ("string" == typeof t) {
          var n = this._listeners;
          if (!(e || n && n[t]))
            return !0;
          t = new createjs.Event(t, e, i)
        } else
          t.target && t.clone && (t = t.clone());
        try {
          t.target = this
        } catch (t) {
        }
        if (t.bubbles && this.parent) {
          for (var s = this, r = [s]; s.parent;)
            r.push(s = s.parent);
          for (var o = r.length, a = o - 1; 0 <= a && !t.propagationStopped; a--)
            r[a]._dispatchEvent(t, 1 + (0 == a));
          for (a = 1; a < o && !t.propagationStopped; a++)
            r[a]._dispatchEvent(t, 3)
        } else
          this._dispatchEvent(t, 2);
        return !t.defaultPrevented
      }
      ,
      e.hasEventListener = function (t) {
        var e = this._listeners
          , i = this._captureListeners;
        return !!(e && e[t] || i && i[t])
      }
      ,
      e.willTrigger = function (t) {
        for (var e = this; e;) {
          if (e.hasEventListener(t))
            return !0;
          e = e.parent
        }
        return !1
      }
      ,
      e.toString = function () {
        return "[EventDispatcher]"
      }
      ,
      e._dispatchEvent = function (t, e) {
        var i, n = 1 == e ? this._captureListeners : this._listeners;
        if (t && n && ((s = n[t.type]) && (i = s.length))) {
          try {
            t.currentTarget = this
          } catch (t) {
          }
          try {
            t.eventPhase = e
          } catch (t) {
          }
          t.removed = !1;
          for (var s = s.slice(), r = 0; r < i && !t.immediatePropagationStopped; r++) {
            var o = s[r];
            o.handleEvent ? o.handleEvent(t) : o(t),
            t.removed && (this.off(t.type, o, 1 == e),
              t.removed = !1)
          }
        }
      }
      ,
      createjs.EventDispatcher = t
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function r() {
      throw "Ticker cannot be instantiated."
    }

    r.RAF_SYNCHED = "synched",
      r.RAF = "raf",
      r.TIMEOUT = "timeout",
      r.useRAF = !1,
      r.timingMode = null,
      r.maxDelta = 0,
      r.paused = !1,
      r.removeEventListener = null,
      r.removeAllEventListeners = null,
      r.dispatchEvent = null,
      r.hasEventListener = null,
      r._listeners = null,
      createjs.EventDispatcher.initialize(r),
      r._addEventListener = r.addEventListener,
      r.addEventListener = function () {
        return r._inited || r.init(),
          r._addEventListener.apply(r, arguments)
      }
      ,
      r._inited = !1,
      r._startTime = 0,
      r._pausedTime = 0,
      r._ticks = 0,
      r._pausedTicks = 0,
      r._interval = 50,
      r._lastTime = 0,
      r._times = null,
      r._tickTimes = null,
      r._timerId = null,
      r._raf = !0,
      r.setInterval = function (t) {
        r._interval = t,
        r._inited && r._setupTick()
      }
      ,
      r.getInterval = function () {
        return r._interval
      }
      ,
      r.setFPS = function (t) {
        r.setInterval(1e3 / t)
      }
      ,
      r.getFPS = function () {
        return 1e3 / r._interval
      }
    ;
    try {
      Object.defineProperties(r, {
        interval: {
          get: r.getInterval,
          set: r.setInterval
        },
        framerate: {
          get: r.getFPS,
          set: r.setFPS
        }
      })
    } catch (t) {
    }
    r.init = function () {
      r._inited || (r._inited = !0,
        r._times = [],
        r._tickTimes = [],
        r._startTime = r._getTime(),
        r._times.push(r._lastTime = 0),
        r.interval = r._interval)
    }
      ,
      r.reset = function () {
        var t;
        r._raf ? (t = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame) && t(r._timerId) : clearTimeout(r._timerId),
          r.removeAllEventListeners("tick"),
          r._timerId = r._times = r._tickTimes = null,
          r._startTime = r._lastTime = r._ticks = 0,
          r._inited = !1
      }
      ,
      r.getMeasuredTickTime = function (t) {
        var e = 0
          , i = r._tickTimes;
        if (!i || i.length < 1)
          return -1;
        t = Math.min(i.length, t || 0 | r.getFPS());
        for (var n = 0; n < t; n++)
          e += i[n];
        return e / t
      }
      ,
      r.getMeasuredFPS = function (t) {
        var e = r._times;
        return !e || e.length < 2 ? -1 : (t = Math.min(e.length - 1, t || 0 | r.getFPS()),
        1e3 / ((e[0] - e[t]) / t))
      }
      ,
      r.setPaused = function (t) {
        r.paused = t
      }
      ,
      r.getPaused = function () {
        return r.paused
      }
      ,
      r.getTime = function (t) {
        return r._startTime ? r._getTime() - (t ? r._pausedTime : 0) : -1
      }
      ,
      r.getEventTime = function (t) {
        return r._startTime ? (r._lastTime || r._startTime) - (t ? r._pausedTime : 0) : -1
      }
      ,
      r.getTicks = function (t) {
        return r._ticks - (t ? r._pausedTicks : 0)
      }
      ,
      r._handleSynch = function () {
        r._timerId = null,
          r._setupTick(),
        r._getTime() - r._lastTime >= .97 * (r._interval - 1) && r._tick()
      }
      ,
      r._handleRAF = function () {
        r._timerId = null,
          r._setupTick(),
          r._tick()
      }
      ,
      r._handleTimeout = function () {
        r._timerId = null,
          r._setupTick(),
          r._tick()
      }
      ,
      r._setupTick = function () {
        if (null == r._timerId) {
          var t = r.timingMode || r.useRAF && r.RAF_SYNCHED;
          if (t == r.RAF_SYNCHED || t == r.RAF) {
            var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            if (e)
              return r._timerId = e(t == r.RAF ? r._handleRAF : r._handleSynch),
                void (r._raf = !0)
          }
          r._raf = !1,
            r._timerId = setTimeout(r._handleTimeout, r._interval)
        }
      }
      ,
      r._tick = function () {
        var t, e, i = r.paused, n = r._getTime(), s = n - r._lastTime;
        for (r._lastTime = n,
               r._ticks++,
             i && (r._pausedTicks++,
               r._pausedTime += s),
             r.hasEventListener("tick") && ((t = new createjs.Event("tick")).delta = (e = r.maxDelta) && e < s ? e : s,
               t.paused = i,
               t.time = n,
               t.runTime = n - r._pausedTime,
               r.dispatchEvent(t)),
               r._tickTimes.unshift(r._getTime() - n); 100 < r._tickTimes.length;)
          r._tickTimes.pop();
        for (r._times.unshift(n); 100 < r._times.length;)
          r._times.pop()
      }
    ;
    var t = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
    r._getTime = function () {
      return (t && t.call(performance) || (new Date).getTime()) - r._startTime
    }
      ,
      createjs.Ticker = r
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function p(t, e, i) {
      this.ignoreGlobalPause = !1,
        this.loop = !1,
        this.duration = 0,
        this.pluginData = i || {},
        this.target = t,
        this.position = null,
        this.passive = !1,
        this._paused = !1,
        this._curQueueProps = {},
        this._initQueueProps = {},
        this._steps = [],
        this._actions = [],
        this._prevPosition = 0,
        this._stepPosition = 0,
        this._prevPos = -1,
        this._target = t,
        this._useTicks = !1,
        this._inited = !1,
        this._registered = !1,
      e && (this._useTicks = e.useTicks,
        this.ignoreGlobalPause = e.ignoreGlobalPause,
        this.loop = e.loop,
      e.onChange && this.addEventListener("change", e.onChange),
        e.override) && p.removeTweens(t),
        e && e.paused ? this._paused = !0 : createjs.Tween._register(this, !0),
      e && null != e.position && this.setPosition(e.position, p.NONE)
    }

    var t = createjs.extend(p, createjs.EventDispatcher);
    p.NONE = 0,
      p.LOOP = 1,
      p.REVERSE = 2,
      p.IGNORE = {},
      p._tweens = [],
      p._plugins = {},
      p.get = function (t, e, i, n) {
        return n && p.removeTweens(t),
          new p(t, e, i)
      }
      ,
      p.tick = function (t, e) {
        for (var i = p._tweens.slice(), n = i.length - 1; 0 <= n; n--) {
          var s = i[n];
          e && !s.ignoreGlobalPause || s._paused || s.tick(s._useTicks ? 1 : t)
        }
      }
      ,
      p.handleEvent = function (t) {
        "tick" == t.type && this.tick(t.delta, t.paused)
      }
      ,
      p.removeTweens = function (t) {
        if (t.tweenjs_count) {
          for (var e = p._tweens, i = e.length - 1; 0 <= i; i--) {
            var n = e[i];
            n._target == t && (n._paused = !0,
              e.splice(i, 1))
          }
          t.tweenjs_count = 0
        }
      }
      ,
      p.removeAllTweens = function () {
        for (var t = p._tweens, e = 0, i = t.length; e < i; e++) {
          var n = t[e];
          n._paused = !0,
          n.target && (n.target.tweenjs_count = 0)
        }
        t.length = 0
      }
      ,
      p.hasActiveTweens = function (t) {
        return t ? null != t.tweenjs_count && !!t.tweenjs_count : p._tweens && !!p._tweens.length
      }
      ,
      p.installPlugin = function (t, e) {
        var i = t.priority;
        null == i && (t.priority = i = 0);
        for (var n = 0, s = e.length, r = p._plugins; n < s; n++) {
          var o = e[n];
          if (r[o]) {
            for (var a = r[o], u = 0, c = a.length; u < c && !(i < a[u].priority); u++)
              ;
            r[o].splice(u, 0, t)
          } else
            r[o] = [t]
        }
      }
      ,
      p._register = function (t, e) {
        var i = t._target
          , n = p._tweens;
        if (e && !t._registered)
          i && (i.tweenjs_count = i.tweenjs_count ? i.tweenjs_count + 1 : 1),
            n.push(t),
          !p._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", p),
            p._inited = !0);
        else if (!e && t._registered) {
          i && i.tweenjs_count--;
          for (var s = n.length; s--;)
            if (n[s] == t) {
              n.splice(s, 1);
              break
            }
        }
        t._registered = e
      }
      ,
      t.wait = function (t, e) {
        var i;
        return null == t || t <= 0 ? this : (i = this._cloneProps(this._curQueueProps),
          this._addStep({
            d: t,
            p0: i,
            e: this._linearEase,
            p1: i,
            v: e
          }))
      }
      ,
      t.to = function (t, e, i) {
        return (isNaN(e) || e < 0) && (e = 0),
          this._addStep({
            d: e || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: i,
            p1: this._cloneProps(this._appendQueueProps(t))
          })
      }
      ,
      t.call = function (t, e, i) {
        return this._addAction({
          f: t,
          p: e || [this],
          o: i || this._target
        })
      }
      ,
      t.set = function (t, e) {
        return this._addAction({
          f: this._set,
          o: this,
          p: [t, e || this._target]
        })
      }
      ,
      t.play = function (t) {
        return this.call((t = t || this).setPaused, [!1], t)
      }
      ,
      t.pause = function (t) {
        return this.call((t = t || this).setPaused, [!0], t)
      }
      ,
      t.setPosition = function (t, e) {
        null == e && (e = 1);
        var i = t = t < 0 ? 0 : t
          , n = !1;
        if (i >= this.duration && (this.loop ? i %= this.duration : (i = this.duration,
          n = !0)),
        i != this._prevPos) {
          var s = this._prevPos;
          if (this.position = this._prevPos = i,
            this._prevPosition = t,
            this._target)
            if (n)
              this._updateTargetProps(null, 1);
            else if (0 < this._steps.length) {
              for (var r = 0, o = this._steps.length; r < o && !(this._steps[r].t > i); r++)
                ;
              t = this._steps[r - 1];
              this._updateTargetProps(t, (this._stepPosition = i - t.t) / t.d)
            }
          0 != e && 0 < this._actions.length && (this._useTicks ? this._runActions(i, i) : 1 == e && i < s ? (s != this.duration && this._runActions(s, this.duration),
            this._runActions(0, i, !0)) : this._runActions(s, i)),
          n && this.setPaused(!0),
            this.dispatchEvent("change")
        }
        return n
      }
      ,
      t.tick = function (t) {
        this._paused || this.setPosition(this._prevPosition + t)
      }
      ,
      t.setPaused = function (t) {
        return this._paused === !!t || (this._paused = !!t,
          p._register(this, !t)),
          this
      }
      ,
      t.w = t.wait,
      t.t = t.to,
      t.c = t.call,
      t.s = t.set,
      t.toString = function () {
        return "[Tween]"
      }
      ,
      t.clone = function () {
        throw "Tween can not be cloned."
      }
      ,
      t._updateTargetProps = function (t, e) {
        var i, n, s, r, o, a;
        if (t || 1 != e) {
          if (this.passive = !!t.v,
            this.passive)
            return;
          t.e && (e = t.e(e, 0, 1, 1)),
            i = t.p0,
            n = t.p1
        } else
          this.passive = !1,
            i = n = this._curQueueProps;
        for (a in this._initQueueProps) {
          null == (s = i[a]) && (i[a] = s = this._initQueueProps[a]),
          null == (r = n[a]) && (n[a] = r = s);
          var u = s == r || 0 == e || 1 == e || "number" != typeof s ? 1 == e ? r : s : s + (r - s) * e
            , c = !1;
          if (o = p._plugins[a])
            for (var h = 0, l = o.length; h < l; h++) {
              var _ = o[h].tween(this, a, u, i, n, e, !!t && i == n, !t);
              _ == p.IGNORE ? c = !0 : u = _
            }
          c || (this._target[a] = u)
        }
      }
      ,
      t._runActions = function (t, e, i) {
        var n = t
          , s = e
          , r = -1
          , o = this._actions.length
          , a = 1;
        for (e < t && (n = e,
          s = t,
          r = o,
          o = a = -1); (r += a) != o;) {
          var u = this._actions[r]
            , c = u.t;
          (c == s || n < c && c < s || i && c == t) && u.f.apply(u.o, u.p)
        }
      }
      ,
      t._appendQueueProps = function (t) {
        var e, i, n, s, r, o;
        for (o in t)
          if (void 0 === this._initQueueProps[o]) {
            if (i = this._target[o],
              e = p._plugins[o])
              for (n = 0,
                     s = e.length; n < s; n++)
                i = e[n].init(this, o, i);
            this._initQueueProps[o] = this._curQueueProps[o] = void 0 === i ? null : i
          } else
            i = this._curQueueProps[o];
        for (o in t) {
          if (i = this._curQueueProps[o],
            e = p._plugins[o])
            for (r = r || {},
                   n = 0,
                   s = e.length; n < s; n++)
              e[n].step && e[n].step(this, o, i, t[o], r);
          this._curQueueProps[o] = t[o]
        }
        return r && this._appendQueueProps(r),
          this._curQueueProps
      }
      ,
      t._cloneProps = function (t) {
        var e, i = {};
        for (e in t)
          i[e] = t[e];
        return i
      }
      ,
      t._addStep = function (t) {
        return 0 < t.d && (this._steps.push(t),
          t.t = this.duration,
          this.duration += t.d),
          this
      }
      ,
      t._addAction = function (t) {
        return t.t = this.duration,
          this._actions.push(t),
          this
      }
      ,
      t._set = function (t, e) {
        for (var i in t)
          e[i] = t[i]
      }
      ,
      createjs.Tween = createjs.promote(p, "EventDispatcher")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function t(t, e, i) {
      this.EventDispatcher_constructor(),
        this.ignoreGlobalPause = !1,
        this.duration = 0,
        this.loop = !1,
        this.position = null,
        this._paused = !1,
        this._tweens = [],
        this._labels = null,
        this._labelList = null,
        this._prevPosition = 0,
        this._prevPos = -1,
        this._useTicks = !1,
        this._registered = !1,
      i && (this._useTicks = i.useTicks,
        this.loop = i.loop,
        this.ignoreGlobalPause = i.ignoreGlobalPause,
        i.onChange) && this.addEventListener("change", i.onChange),
      t && this.addTween.apply(this, t),
        this.setLabels(e),
        i && i.paused ? this._paused = !0 : createjs.Tween._register(this, !0),
      i && null != i.position && this.setPosition(i.position, createjs.Tween.NONE)
    }

    var e = createjs.extend(t, createjs.EventDispatcher);
    e.addTween = function (t) {
      var e = arguments.length;
      if (1 < e) {
        for (var i = 0; i < e; i++)
          this.addTween(arguments[i]);
        return t
      }
      return 0 == e ? null : (this.removeTween(t),
        this._tweens.push(t),
        t.setPaused(!0),
        t._paused = !1,
        t._useTicks = this._useTicks,
      t.duration > this.duration && (this.duration = t.duration),
      0 <= this._prevPos && t.setPosition(this._prevPos, createjs.Tween.NONE),
        t)
    }
      ,
      e.removeTween = function (t) {
        var e = arguments.length;
        if (1 < e) {
          for (var i = !0, n = 0; n < e; n++)
            i = i && this.removeTween(arguments[n]);
          return i
        }
        if (0 != e)
          for (var s = this._tweens, n = s.length; n--;)
            if (s[n] == t)
              return s.splice(n, 1),
              t.duration >= this.duration && this.updateDuration(),
                !0;
        return !1
      }
      ,
      e.addLabel = function (t, e) {
        this._labels[t] = e;
        var i = this._labelList;
        if (i) {
          for (var n = 0, s = i.length; n < s && !(e < i[n].position); n++)
            ;
          i.splice(n, 0, {
            label: t,
            position: e
          })
        }
      }
      ,
      e.setLabels = function (t) {
        this._labels = t || {}
      }
      ,
      e.getLabels = function () {
        if (!(e = this._labelList)) {
          var t, e = this._labelList = [], i = this._labels;
          for (t in i)
            e.push({
              label: t,
              position: i[t]
            });
          e.sort(function (t, e) {
            return t.position - e.position
          })
        }
        return e
      }
      ,
      e.getCurrentLabel = function () {
        var t = this.getLabels()
          , e = this.position
          , i = t.length;
        if (i) {
          for (var n = 0; n < i && !(e < t[n].position); n++)
            ;
          return 0 == n ? null : t[n - 1].label
        }
        return null
      }
      ,
      e.gotoAndPlay = function (t) {
        this.setPaused(!1),
          this._goto(t)
      }
      ,
      e.gotoAndStop = function (t) {
        this.setPaused(!0),
          this._goto(t)
      }
      ,
      e.setPosition = function (t, e) {
        var i = this._calcPosition(t)
          , n = !this.loop && t >= this.duration;
        if (i != this._prevPos) {
          this._prevPosition = t,
            this.position = this._prevPos = i;
          for (var s = 0, r = this._tweens.length; s < r; s++)
            if (this._tweens[s].setPosition(i, e),
            i != this._prevPos)
              return !1;
          n && this.setPaused(!0),
            this.dispatchEvent("change")
        }
        return n
      }
      ,
      e.setPaused = function (t) {
        this._paused = !!t,
          createjs.Tween._register(this, !t)
      }
      ,
      e.updateDuration = function () {
        for (var t = this.duration = 0, e = this._tweens.length; t < e; t++) {
          var i = this._tweens[t];
          i.duration > this.duration && (this.duration = i.duration)
        }
      }
      ,
      e.tick = function (t) {
        this.setPosition(this._prevPosition + t)
      }
      ,
      e.resolve = function (t) {
        var e = Number(t);
        return e = isNaN(e) ? this._labels[t] : e
      }
      ,
      e.toString = function () {
        return "[Timeline]"
      }
      ,
      e.clone = function () {
        throw "Timeline can not be cloned."
      }
      ,
      e._goto = function (t) {
        t = this.resolve(t);
        null != t && this.setPosition(t)
      }
      ,
      e._calcPosition = function (t) {
        return t < 0 ? 0 : t < this.duration ? t : this.loop ? t % this.duration : this.duration
      }
      ,
      createjs.Timeline = createjs.promote(t, "EventDispatcher")
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function e() {
      throw "Ease cannot be instantiated."
    }

    e.none = e.linear = function (t) {
      return t
    }
      ,
      e.get = function (e) {
        return 1 < (e = e < -1 ? -1 : e) && (e = 1),
          function (t) {
            return 0 == e ? t : e < 0 ? t * (t * -e + 1 + e) : t * ((2 - t) * e + (1 - e))
          }
      }
      ,
      e.getPowIn = function (e) {
        return function (t) {
          return Math.pow(t, e)
        }
      }
      ,
      e.getPowOut = function (e) {
        return function (t) {
          return 1 - Math.pow(1 - t, e)
        }
      }
      ,
      e.getPowInOut = function (e) {
        return function (t) {
          return (t *= 2) < 1 ? .5 * Math.pow(t, e) : 1 - .5 * Math.abs(Math.pow(2 - t, e))
        }
      }
      ,
      e.quadIn = e.getPowIn(2),
      e.quadOut = e.getPowOut(2),
      e.quadInOut = e.getPowInOut(2),
      e.cubicIn = e.getPowIn(3),
      e.cubicOut = e.getPowOut(3),
      e.cubicInOut = e.getPowInOut(3),
      e.quartIn = e.getPowIn(4),
      e.quartOut = e.getPowOut(4),
      e.quartInOut = e.getPowInOut(4),
      e.quintIn = e.getPowIn(5),
      e.quintOut = e.getPowOut(5),
      e.quintInOut = e.getPowInOut(5),
      e.sineIn = function (t) {
        return 1 - Math.cos(t * Math.PI / 2)
      }
      ,
      e.sineOut = function (t) {
        return Math.sin(t * Math.PI / 2)
      }
      ,
      e.sineInOut = function (t) {
        return -.5 * (Math.cos(Math.PI * t) - 1)
      }
      ,
      e.backIn = (e.getBackIn = function (e) {
          return function (t) {
            return t * t * ((e + 1) * t - e)
          }
        }
      )(1.7),
      e.backOut = (e.getBackOut = function (e) {
          return function (t) {
            return --t * t * ((e + 1) * t + e) + 1
          }
        }
      )(1.7),
      e.backInOut = (e.getBackInOut = function (e) {
          return e *= 1.525,
            function (t) {
              return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            }
        }
      )(1.7),
      e.circIn = function (t) {
        return -(Math.sqrt(1 - t * t) - 1)
      }
      ,
      e.circOut = function (t) {
        return Math.sqrt(1 - --t * t)
      }
      ,
      e.circInOut = function (t) {
        return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
      }
      ,
      e.bounceIn = function (t) {
        return 1 - e.bounceOut(1 - t)
      }
      ,
      e.bounceOut = function (t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
      }
      ,
      e.bounceInOut = function (t) {
        return t < .5 ? .5 * e.bounceIn(2 * t) : .5 * e.bounceOut(2 * t - 1) + .5
      }
      ,
      e.elasticIn = (e.getElasticIn = function (i, n) {
          var s = 2 * Math.PI;
          return function (t) {
            var e;
            return 0 == t || 1 == t ? t : (e = n / s * Math.asin(1 / i),
              -(i * Math.pow(2, 10 * --t) * Math.sin((t - e) * s / n)))
          }
        }
      )(1, .3),
      e.elasticOut = (e.getElasticOut = function (i, n) {
          var s = 2 * Math.PI;
          return function (t) {
            var e;
            return 0 == t || 1 == t ? t : (e = n / s * Math.asin(1 / i),
            i * Math.pow(2, -10 * t) * Math.sin((t - e) * s / n) + 1)
          }
        }
      )(1, .3),
      e.elasticInOut = (e.getElasticInOut = function (i, n) {
          var s = 2 * Math.PI;
          return function (t) {
            var e = n / s * Math.asin(1 / i);
            return (t *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * --t) * Math.sin((t - e) * s / n) : i * Math.pow(2, -10 * --t) * Math.sin((t - e) * s / n) * .5 + 1
          }
        }
      )(1, .3 * 1.5),
      createjs.Ease = e
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";

    function j() {
      throw "MotionGuidePlugin cannot be instantiated."
    }

    j.priority = 0,
      j.install = function () {
        return createjs.Tween.installPlugin(j, ["guide", "x", "y", "rotation"]),
          createjs.Tween.IGNORE
      }
      ,
      j.init = function (t, e, i) {
        var n = t.target;
        return n.hasOwnProperty("x") || (n.x = 0),
        n.hasOwnProperty("y") || (n.y = 0),
        n.hasOwnProperty("rotation") || (n.rotation = 0),
        "rotation" == e && (t.__needsRot = !0),
          "guide" == e ? null : i
      }
      ,
      j.step = function (t, e, i, n, s) {
        if ("rotation" == e && (t.__rotGlobalS = i,
          t.__rotGlobalE = n,
          j.testRotData(t, s)),
        "guide" == e) {
          var r, o = n, a = (o.hasOwnProperty("path") || (o.path = []),
            o.path);
          if (o.hasOwnProperty("end") || (o.end = 1),
          o.hasOwnProperty("start") || (o.start = i && i.hasOwnProperty("end") && i.path === a ? i.end : 0),
          !o.hasOwnProperty("_segments") || !o._length) {
            var u = a.length;
            if (!(6 <= u && (u - 2) % 4 == 0))
              throw "invalid 'path' data, please see documentation for valid paths";
            o._segments = [],
              o._length = 0;
            for (var c = 2; c < u; c += 4) {
              for (var h = a[c - 2], l = a[c - 1], _ = a[c + 0], p = a[c + 1], f = a[c + 2], d = a[c + 3], v = h, g = l, m = 0, w = [], P = 1; P <= 10; P++) {
                var T = P / 10
                  , E = 1 - T
                  , b = E * E * h + 2 * E * T * _ + T * T * f
                  , E = E * E * l + 2 * E * T * p + T * T * d;
                m += w[w.push(Math.sqrt((r = b - v) * r + (r = E - g) * r)) - 1],
                  v = b,
                  g = E
              }
              o._segments.push(m),
                o._segments.push(w),
                o._length += m
            }
            r = o.orient,
              o.orient = !0;
            e = {};
            j.calc(o, o.start, e),
              t.__rotPathS = Number(e.rotation.toFixed(5)),
              j.calc(o, o.end, e),
              t.__rotPathE = Number(e.rotation.toFixed(5)),
              o.orient = !1,
              j.calc(o, o.end, s),
              o.orient = r,
            o.orient && (t.__guideData = o,
              j.testRotData(t, s))
          }
        }
        return n
      }
      ,
      j.testRotData = function (t, e) {
        if (void 0 === t.__rotGlobalS || void 0 === t.__rotGlobalE) {
          if (t.__needsRot)
            return;
          t.__rotGlobalS = t.__rotGlobalE = void 0 !== t._curQueueProps.rotation ? t._curQueueProps.rotation : e.rotation = t.target.rotation || 0
        }
        if (void 0 !== t.__guideData) {
          var e = t.__guideData
            , i = t.__rotGlobalE - t.__rotGlobalS
            , n = t.__rotPathE - t.__rotPathS
            , s = i - n;
          if ("auto" == e.orient)
            180 < s ? s -= 360 : s < -180 && (s += 360);
          else if ("cw" == e.orient) {
            for (; s < 0;)
              s += 360;
            0 == s && 0 < i && 180 != i && (s += 360)
          } else if ("ccw" == e.orient) {
            for (s = i - (180 < n ? 360 - n : n); 0 < s;)
              s -= 360;
            0 == s && i < 0 && -180 != i && (s -= 360)
          }
          e.rotDelta = s,
            e.rotOffS = t.__rotGlobalS - t.__rotPathS,
            t.__rotGlobalS = t.__rotGlobalE = t.__guideData = t.__needsRot = void 0
        }
      }
      ,
      j.tween = function (t, e, i, n, s, r, o) {
        var a = s.guide;
        if (null == a || a === n.guide)
          return i;
        if (a.lastRatio != r) {
          s = (a.end - a.start) * (o ? a.end : r) + a.start;
          switch (j.calc(a, s, t.target),
            a.orient) {
            case "cw":
            case "ccw":
            case "auto":
              t.target.rotation += a.rotOffS + a.rotDelta * r;
              break;
            default:
              t.target.rotation += a.rotOffS
          }
          a.lastRatio = r
        }
        return "rotation" != e || a.orient && "false" != a.orient ? t.target[e] : i
      }
      ,
      j.calc = function (t, e, i) {
        if (null == t._segments)
          throw "Missing critical pre-calculated information, please file a bug";
        null == i && (i = {
          x: 0,
          y: 0,
          rotation: 0
        });
        for (var n = t._segments, s = t.path, r = t._length * e, o = n.length - 2, a = 0; r > n[a] && a < o;)
          r -= n[a],
            a += 2;
        for (var u = n[a + 1], c = 0, o = u.length - 1; r > u[c] && c < o;)
          r -= u[c],
            c++;
        var e = c / ++o + r / (o * u[c])
          , a = 2 * a + 2
          , h = 1 - e;
        return i.x = h * h * s[a - 2] + 2 * h * e * s[a + 0] + e * e * s[a + 2],
          i.y = h * h * s[a - 1] + 2 * h * e * s[a + 1] + e * e * s[a + 3],
        t.orient && (i.rotation = 57.2957795 * Math.atan2((s[a + 1] - s[a - 1]) * h + (s[a + 3] - s[a + 1]) * e, (s[a + 0] - s[a - 2]) * h + (s[a + 2] - s[a + 0]) * e)),
          i
      }
      ,
      createjs.MotionGuidePlugin = j
  }(),
  this.createjs = this.createjs || {},
  function () {
    "use strict";
    var t = createjs.TweenJS = createjs.TweenJS || {};
    t.version = "0.6.2",
      t.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT"
  }();
var nhn = nhn || {};
nhn.search = nhn.search || {},
  nhn.search.ladders = nhn.search.ladders || {},
  nhn.search.ladders.ss = nhn.search.ladders.ss || {},
  nhn.search.ladders.lib = nhn.search.ladders.lib || {},
  nhn.search.ladders.images = nhn.search.ladders.images || {},
  function (t, e, A) {
    var g;
    t.webFontTxtFilters = {},
      t.properties = {
        width: 580,
        height: 320,
        fps: 30,
        color: "#FFFFFF",
        webfonts: {},
        manifest: []
      },
      t.webfontAvailable = function (A) {
        t.properties.webfonts[A] = !0;
        for (var g = t.webFontTxtFilters && t.webFontTxtFilters[A] || [], I = 0; I < g.length; ++I)
          g[I].updateCache()
      }
      ,
      (t.arrow = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(0)
        }
      ).prototype = g = new e.Sprite,
      (t.dot = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(1)
        }
      ).prototype = g = new e.Sprite,
      (t.logo_ = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(2)
        }
      ).prototype = g = new e.Sprite,
      (t.vline_01 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(3)
        }
      ).prototype = g = new e.Sprite,
      (t.vline_02 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(4)
        }
      ).prototype = g = new e.Sprite,
      (t.vline_03 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(5)
        }
      ).prototype = g = new e.Sprite,
      (t.vline_04 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(6)
        }
      ).prototype = g = new e.Sprite,
      (t.b0 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(7)
        }
      ).prototype = g = new e.Sprite,
      (t.text1 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(8)
        }
      ).prototype = g = new e.Sprite,
      (t.text2 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(9)
        }
      ).prototype = g = new e.Sprite,
      (t.text3 = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(10)
        }
      ).prototype = g = new e.Sprite,
      (t.leftImg = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(11)
        }
      ).prototype = g = new e.Sprite,
      (t.leftImgOver = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(12)
        }
      ).prototype = g = new e.Sprite,
      (t.righImg = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(13)
        }
      ).prototype = g = new e.Sprite,
      (t.righImgOver = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(14)
        }
      ).prototype = g = new e.Sprite,
      (t.resultBtn = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(15)
        }
      ).prototype = g = new e.Sprite,
      (t.resultBtnOver = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(16)
        }
      ).prototype = g = new e.Sprite,
      (t.replayTxt = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(17)
        }
      ).prototype = g = new e.Sprite,
      (t.cycleImb = function () {
          this.spriteSheet = A.ladders_atlas_,
            this.gotoAndStop(18)
        }
      ).prototype = g = new e.Sprite,
      (t.titleLineMotion = function (A, g, I) {
          this.initialize(A, g, I, {});
          var A = new e.Shape
            , g = (A._off = !0,
            (new e.Graphics).p("AgDBeIAAi8IAIAAIAAC8g"))
            , I = (new e.Graphics).p("AkfBeIAAi8IJAAAIAAC8g")
            , B = (new e.Graphics).p("AoPBeIAAi8IQfAAIAAC8g")
            , C = (new e.Graphics).p("ArUBeIAAi8IWpAAIAAC8g")
            , D = (new e.Graphics).p("AttBeIAAi8IbbAAIAAC8g")
            , E = (new e.Graphics).p("AvaBeIAAi8Ie1AAIAAC8g")
            , Q = (new e.Graphics).p("AwcBeIAAi8MAg5AAAIAAC8g")
            , F = (new e.Graphics).p("AwxBeIAAi8MAhjAAAIAAC8g");
          this.timeline.addTween(e.Tween.get(A).to({
            graphics: g,
            x: 185,
            y: 91
          }).wait(1).to({
            graphics: I,
            x: 214,
            y: 91
          }).wait(1).to({
            graphics: B,
            x: 238,
            y: 91
          }).wait(1).to({
            graphics: C,
            x: 258,
            y: 91
          }).wait(1).to({
            graphics: D,
            x: 273,
            y: 91
          }).wait(1).to({
            graphics: E,
            x: 284,
            y: 91
          }).wait(1).to({
            graphics: Q,
            x: 290,
            y: 91
          }).wait(1).to({
            graphics: F,
            x: 292,
            y: 91
          }).wait(1)),
            this.instance = new t.logo_,
            this.instance.setTransform(185, 82, .9, .9),
            this.instance.mask = A,
            this.timeline.addTween(e.Tween.get(this.instance).wait(8))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(185, 82, 1, 19),
      (t.resultMc = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.targetText = new e.Text("", "11px 'NanumGothic'", "#000000"),
            this.targetText.name = "targetText",
            this.targetText.lineHeight = 13,
            this.targetText.lineWidth = 49,
            this.targetText.setTransform(77, 0),
            this.nameText = new e.Text("", "11px 'NanumGothic'", "#000000"),
            this.nameText.name = "nameText",
            this.nameText.outline = 1,
            this.nameText.lineHeight = 15,
            this.nameText.lineWidth = 48,
            this.nameText.setTransform(9, 0),
            this.instance = new t.arrow,
            this.instance.setTransform(61, 3),
            this.instance_1 = new t.dot,
            this.instance_1.setTransform(0, 3),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.instance_1
              }, {
                t: this.instance
              }, {
                t: this.nameText
              }, {
                t: this.targetText
              }]
            }).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(0, 0, 129, 17),
      (t.mcHand3 = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.timeline.addTween(e.Tween.get(this.shape).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-1, -1, 40, 21),
      (t.mcHand2 = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.timeline.addTween(e.Tween.get(this.shape).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-1, -1, 35, 30),
      (t.mcHand = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.timeline.addTween(e.Tween.get(this.shape).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-1, -1, 44, 25),
      (t.mcwhiteboard = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f("#FFFFFF").s().p("Eg4oAaFMAAAg0KMBxRAAAMAAAA0Kg"),
            this.shape.setTransform(290, 160, 1, 1),
            this.timeline.addTween(e.Tween.get(this.shape).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(0, 0, 580, 320),
      (t.mctitle = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f("#000000").s().p("ANcCCIACgrIBWABIgBBUIhPADgAlrBJIgDh1IAGhYIA7AEIAEBnIAwgFIAyACIgCAzIhfAGIgCBmIg4AGgABrBFIAFgbIgFg+IgBhqIA5AEIAABTIAEAaIgFBOIAEBCIg1ABgAsRB2IAGi4IAIgwIAuAEIADBVIBlAEIgEAzIhhgCIgCBagAHdBtIgBhHIgZgFIgVADIg3gDIADguIAnAGIA+gDIgBhNIAFgVIA6AEIgHBTIABAkIgEAlIgBA/gAI1BtIgEghIAEg6IgEg4IADg/IAzAFIAGA+IgFA8IABBWgAh+gZIBMgBIAAgTIhNgFIAAgsIBLAAIA3AIIgDBmIhFAGIACAZIBQAAIADAvIiHABgAvvA6IBfijIAzAUIggBBIAbANIAtAfIgjAqIhAggIgXAjIgWASgAEHA8IASgmIAPgTIAUgkIgWACIgkgEIAEgvIA7ACIAMAFIA2AHIgYA7Ig0BcgAo4BJIgJgcIgCh1IAwAAIAQAEIAngGIAmAFIgCAvIguAHIgcgBIgHAFIABAfIAQABIAXgCIA4ACIgBA2gAOsgdIAIiSIA8AFIgEDFIg7ACgALSgoIgKgVIAFgVIAWgOIAXAAIAbAKIABAcIgLALIgIAPIgYADg"),
            this.shape.setTransform(101, 18),
            this.timeline.addTween(e.Tween.get(this.shape).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(0, 0, 202, 35),
      (t.mcstarttxt = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AB1hMQAAAWAEAWQAAADAAABQAKABAKABQAHABAIAAAAagzQAUgEAVAAQAAAAACAAQAAACgCACQgFALgFALQgCADgBADQANALAMAMQABACABABABHAnQAFAAAFAAQAPgBAPAAQAGAAAFgCQADAAACAAQACAAAAADQABAOABANQAAAGABAFAB5gcQABAOACAMQAAABAAABQABALABANAA2gXQgGAKgEALQgDAFgEAFAg9g3QAAATgCATQgBAQACAOQABAFABAEQABAIAAAJQAAALAAAKAiKgOQgHAOgHAPQgCAEgBACAh9gvQgGAQgHARAhkAPQgTgPgTgO"),
            this.shape.setTransform(16, 8),
            this.timeline.addTween(e.Tween.get(this.shape).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-1, -1, 33, 18),
      (t.mcNumberSet = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f("#CC0000").s().p("AhcCaIgEgCIACgHIACABIABgBIABAHIADgGQgCgEgBgGIAAgLIgBgBIgGACIADAIIgEgEIgBABIgKgHIABgGQAEgCAFgCQAFgCABgGIABACIAJgBIAAgEIACgCIACAGIgDABIACACIAGgHIgHgDIgBgDIALgJIAFAFIAFgBIABgBIgJgMIADgBIAHADIACgFIgFgJIAFgEIADACIAFgFIAEABIABgCIgCgHIACgDIAJAHIACgIIAGgDIgDgCIgEABIgGgEIAFgCIAEAAIALgEIAAgFIgGgHIACgHIAJAHIAEgEIACAAIACgCIgDgIIAEgIIAGABIAEgCIgDgLIADgDIAFAHIAEAAIgBgGIgDgCIAHgIIgEgFIABgCIgBgBIgEAEIAAgCIgCANIgHgKIABgDIgBgDIAAgEIACAEIADgBIABABIADgGIgCgFIACgFIAGAHIAFAJIAEABIgBgBIAIgKIgJgHIgEABIgCgCIAEgFIgCgJIAHAEIAHgEIgIgFQAAgEAAgEIgCgIIADACIAEgEIgEgCIgHADIAEgDIgEgEIACgEIgGgHQgDgCgCgFIgCAFIAFAMIgDAAIgIgEIAAgEIgBABIgFgCIgGADIgGgCIgDAFIADAEIgEACIgEgBIgEgJIABADIgIgCIgBgEIgCACIAJAJIgDgBIAAAFIgEADIgDgDIgFAGIgFAGIADAEIgCABIgFgEIgEABIgCgBIgBgIIgEgBIgBABIgFgIIABgFIgIgGQgDgDAAgFIAAgCIAIABIAGAGIgDAEIAHAJIAAgEIACgBIAAAEIADgDIgDgFIACgEIAGgBIAFAEIAEgFIAFAEIADgDIgHgFIgBAAQgGABgEgHIgHgKIACABIACgBIAFADIADAAIAKAMIAFgGIgCgDIABgMIgEAAIAAgDIAFgDIAJALIgDAAIgEAJIAEACIAFgKQACgFAEgFQAEABADAEIADAGIAEgDIgEgDIAGgEIABAAIADgHIAOALIAHgGIAKABIgCAEIAHADIADgKIAGADIADgDIgBADIABABIABgBIAFAAIAAAIIgDgEIgEgBIAAAEIARARIgJAHIAEANIgCAAIgBAAIADAIIAEAJIgCAJIgCgDIgIAEIADAJIgFAJIABgDIgCgDIgBADIACAKIAFgCIgBADIAHAGIgDADIgIgCQgDgCgCgDIgEAEIAGACIAEAJIgDAEIgEgCIgBACIgBgCIgEASIgEADIgFgEIgDABIgDgDIAAACIABAEIACgCIgBAEIAIAIIgCADIgHgCIgDgGIgCACIAFAHIAAAGIAHAGIgEAGIAFgCIACABIgHADIgDgCIgDAFIgBgEIADgDIgFgFIgLADQADACABAFIADAIQgNAAgBADQgBABAAALIAAADIAAACIgFgFIgDACIAEACIAAAFIgEAAIgEAHIgHgFIAAAAIgGgFIgCACIAIAJQACAEACAGIAEgIIACgBIAFADIAEgGIAEABIAAACIARAAIAGAKIAGgCIgDgIQgCgEgDgDIACABIAAgBIAHAHIgBAAIADADIABAAIALgGIACADIADAAIgBAHIgCgBIAAACIAHAFIABgBIAHAJIAHgFIgDgEIgBADIgCgCIADgFIAGABIgCADIABABIAEAAIABgEIgBgEIACAAIAEABIgBABIAIAMIADABIgEAEIgCgBIgBABIAHAJIAEgLIgCgHIABABIAFgCIAHAHIABgCIAEAHIgCAFIgJgIIAAABIAAACIgFgDIAAACIAIAFIAAADIgBAAIgCgBIgDABIAFADIAAACIgDADIgBAAIgEACIABADIgCACIgDgEIgGACIgBgDIgDACIACACIgBAGIACACIgBAEIgDgHIgCAAIgEgCIAAgEIgDgEIAAAGIgFAAIgHgHIgBABIgDgKIgEABIgDgKIgIAFIAAADIAJACIgBADIADAKIgGgFIgGACIgCADIgJgKIgCABIgDgDIgBACIgEgDIgBAEIgCABIgFgFIgDAAIgDAIIgFADIgCgBIAAADIgGAHIgFgFIgDAAIAAAEIgDAAIgBgEIACgKIgIgCIgBADIABAIIgFAAIgFgEIgEADIgHgCIAAALIACgBIABACIgGAAIgHABIACAJIgGAAIgFAFIgPgHIgEAIIgDAIgAg8CLIgBgDIgBACIABAAQAAABABAAIAAAAIAAAAgAhGCIIAEADIACgCIgDgCgAhHCBIgBABIACAEIACAAIACgGIgCgCgAhkB6IABACIAFgCIgCgCgAhSB7IgBgBIAAAAIABABIAAAAgAhTB6IgCgDIAAAAIABADIABAAgAgyB2IABABIAAgCIgBABgAgPBsIADADIgEAAIAIAHIABgCIgGgLgABIB1IgFgIIgDABIAAACIAIAFgAg6BvIAEABIAAAAIABgCIAAgCIgCAAgAgjBsIACADIAFgCIgGgEgAAfBsIACACIADgBIgEgCgABNBtIAAABIADgDIgCgBgAgCBkIACADIAAAAIAAAFIAAAAIAIgCIACgDIgBgDIgDABIAAADIAAABIgCAAIgFgHgAguBqIAAAAIAAgDIAAAAgAgkBoIACAAIAAgBIABAAIgBgDgABKBkIACADIABAAIAAgDIgDgCgABRBiIgBgHIgDACIABAFIADAAgAAiBhIABABIABAAIgBgCgAgMBiIAEgEIgEgCIgDABIgEgHIgCADIAAgBIgCABIABAJIADAAIACgEgAgDBTIADALIAEAAIABgJIgFgDIgCAAgAAqBWIADAHIADgBIAAgCIgFgEIAAgBIAEAAIADgCIAAgBIgBAAIAAAAIgEgCgAAUBbIADACIACgCIgCgEIgCAAgAAMBVIgDABIABADIAGgEIgDgCgAgoBYIACgCIgCgCgAgWBWIAAAAIAAgCIAAAAgAgUBSIAAABIABgDIgBACgAAvBQIABAAIAAgBIgBAAgAAoBQIgBgBIgBAAIABABIABAAgAg1BEIAEAEIADgCIgCgFgAgmA9IgCgDIgBAAIgBACIAEABgAAMANIAAAFIACAAIACgEIgBgCgAAmgSIgBgDIgBAAIABADIABAAgAAhg+IACADIAEgBIgGgFgAg6hmIACABIAAAGIgEACIADAEIADACIABAAIACgGIACgFIgDgCIACgBIgDgEIgDAAgAAyhcIADgCIgCgEIgCAAIAAADIgEgCgAgWhnIABACIABAAIAAgEgAAVhpIAEAAIAAgCIgCgCgAgIhxIAAAGIAFACIADgDIgHgFgAgVhqIADgFIgFAAgAAXhxIgCgBIAAAAIACABIAAAAgAABh0IABACIACgCIAAgDgAAXh0IABABIAHgCIgGgHgAAPh5IAEgCIgCgDIgCACIgDgBgAAEiBIAEAGIABAAIAAgDIgFgFgAAEiNIAAAAIABgBIgBAAIAAABgAhSCYIAAgCIABAAIABACgAhlCRQAAgBAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAIgCgFIAEABIABADIADgDIACAIIgCABQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAgBAAAAgAhwCRIgFgFIABgEIAFAAIAAAEIgBADIACACgAgiCFQgBgEgDAAIABgDIACADIAEAAIABAHQgBgBAAAAQgBAAAAAAQgBgBAAAAQgBgBAAAAgAhcCIIABgCIAAABIAAABgAA3CBIgEgFIAAgCIADAAIACACIABgCIgCgDIADgCIAEAGIgEAKIAAgDIgDADgABhCFIgCgGIgCgHIAAAAIADACIABAAIAFAEIABgBIgEAIgAAKCBIgCACIgCgCIAEgBIACACIAAADgAAjB8IAEgEIADACIABAEIgEACgAgWB8IgCgCIAAgCIAEACIgDAFgAAMB6IADgCIABADIgCAEgABtBzIADgEIABAFIAAABgAB0BpIABgBIAAABIgBABgAAwBlIABABIAAABgABfBgIABgCIAAAAIAAACgAA9BXIACgCIABACgABXBWIAAAAIACAAIAAAAgABBBSIgBAAIACgEIACAEgAA7BMIABgBIAAACIgBgBgAAUBGIAAgCIABAAIAAgBIACADIgBACgAAPA5IgCABIgFgGIAFgDIAEAJIgBACgAARA6IAAgDIADAAIgBADgAABAzIAAgBIADABIAAABgAAiAHQACgCABgDIACgDIACgBQgBACACABQABAEADAAIABACIgDABIgCAFIgDABgAgQAKIABgCIgDgDIAFgCIACAGIgBABgAA0ABIgBAAIgBgBIABAAIACABgAAAgCIAAAAIAAACQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAgAgMgHIADgBIgDgBIAAgBIACgDIAGAHIgEAEgAgFgsIACgCIgCgDIAFgDIAEADQgEAAAAAFQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAgABGg0IgBgCIgEABIABgDIgCgEIAAAAIAEAAIgBACIAEAEIAAABIgCADgAhHg6IABgBIAEADIgCAEgAhVg1IgBgDIABgDIADADIgBACIgBABgAAAhBIgBgHIAFADIAFAJIgDAGgAhhhEIABgDIADgBIAAABIAEAEIAHgEIgDgHIADgCIAFAEIAGAFIAEgCIABAEIgFABIgEgBIgDABIgDAAIgCABIgDAAIAAAEIgDgDIgBABIACAEIgEABgAg/hDIADgBIADACIgEABgAAFhIIABgFIAAAAIADgCIgGgJIACgCIADABIAAgDIAAAGIAFAIIADgBIAAABIAEgDIAAADIgEAKgAg8hFIAAgCIACACIAAABgAgwhHIAAAAIAAACIAAgCgAhnhMQgDgCAAgCIAGgEIgBABIABABIADgCIAAgCIAGgDIAEAKIgEgEIgDAEIACACIgIAGIgDgFgAhChJIADgDIAAADIgBgBIAAACgAgEhPIABgDIACACIABACgAhIhUIABAAIgBACgAA+hXIAAgGIACABIAJgGIACACIgBACIABACIgEACIgCgCIgCACIACADIAAADIgBAAIgDAAgAgHhXIAAAAIAFgHIACAAIAAABIgBACQAAgBAAACIAAADgAhUhdIgJgBIABgHIABgGIAKAMIgBACIACACIgDAEgAgeheIAAgBIACABgAhDhsIAAgBIABABIgBABgAhAhxIABgBIABABgAgPiLIAGgDIABABIAAAAIgDADgAAYiQIAAgBIABACIgBgBgAAOiZIAGADIAAABIgEABg"),
            this.shape.setTransform(290, 160),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f("#CC0000").s().p("AgKCdIACAAIgCgFIAAgHIgGAAIAAgDIgEgJIgCAJIgGACIAGANIgEABIgMgHIgEABIgCgBIACgHIgEgFIgCAEIADACIgCADQgFgDgGAAQgHAAgFgGIgEABIACgFIADACIAFgDIgEgDIgFACIgFgCIABgCIgDgFQgCgDgDgBIABgJIACgBIACACIAFgCIgEgDIgBgCIAFACIAEgKIABgBIADgDIABAAQAFAAADAFQACAEAFAAIAGgCIAHAAIAEAHIAFgHIAKAEIAEgEIAFABIAJgEIABABIAGgBQAEgCAEACQABgGAEgCQAEgDACgEIAFAAIADADIACgBIAAgHIAHgGIAEABIACgBIgFgFIAGgDIABAAIADgEIABAAIAHgEIgJgIIAFgDIAIABIAGgHIABAAIADgEQgGgDgFgFIgJgKIACgEIAEAEIADgEIAEAFQACACADABIAEgDIgEgFIgBgEIADgIIgDAAIgEABIADACIAAAEIgDgDIgFAEIgBgHIgFgBIgDAFIgEgEIgFgDIABgCIAFAEIAAgCIADgBIAJADIAAgFIgEgBIgCgDIgDAAIgDgCIADAAIgBgHIgCAAIgCAFQgCAEgFACIgEgFIABgBQgEgFgEgDIgLgEIgBABIgCgDIgDAEIABACIgBAAIgBgBIgEAFIABACIAAAAIgFgBIgFACIADAJIgCAAIgCgDIgBABIgGgHIgGgGIgEAFIAAABIAEABIACAAIACAFIgJAFIABAEIgEgBIgKABIgKgBIgCAAIABAAIADADIADgBIABABIgDAHIgGgCIgDADIgEAAIAAABIgDgEIgKAKIgCAAIAAgKIgDAAIgEALIACACIgDACIgGgHIgBABIgCgDIgCgCIACgIIABgBIACACIACgDIgFgEIgCABIgFgIIAGgFIAEgGIABACIAFgDIABABIABAEQADgBADgEQACgCgBgEIACACIABgGIAHAAIAHABIAMgFIADAAIAEgBIAAgFIAAABIgBgFIAFgCIAHAEIABgBIAGACIABgFIgEgDIgBABIgDgBIAEgCIAHADIAEAAIABgBIgGgJIAIgDIABABIgCAIIAAAAIAGgCIgEgOIAFgBIAFAFIgBADIAHAIIACAAIgCgGIADgEIACAAIAFAJIACgFIgEgFIgCABIgFgCIgEgIIAEgCIAAgCIAHACIABABQADABAEAFQAFAGACgCIAEADIABgCIAGACIAAACIgEgBIgDABIgDAKIAHABIAGACIAEgBIAAABIgGAFIADAGIAEgLIABAAIAHAIIACgBIASANIAFgEIADAAIgDAJIgEACIAEAAIACACIgDADIgFgCIgDADQAEACAEAEIAGAIIADgBIgCABIABADIgDAGIgBgBIgDAGIAFAOIABgBIAEAEIgFAFIgJgBIAAACIAHAMIACgEIgDgEIABgDIACAGIAEAFIgCAGIgBgDIgBAAIACAGIgDACIgEgEIACgCIgBgBIgFABIAIAJIgCAEIABADIgBAEIgEgDIgBACIgBgDIgBABIgEAMQgCgDgDgBIgGgCIgCgEIgFgBIgCADIAHAGIAAgDIACAEIACgBIAAAFIAFgBIAJAHIAAAEIgKgHIgFAJIgFgDIgDADIABADIAEAAIAAACIgBACIgGgDIgLACIAEAEIACAAQAFgBAAAFQABAEACADIAAgBIADABIAAAFIgFgFIgCABIgDgCIAAAAIgFgCIgCAFIADAFIAAADIgIAAIAAAAIADAEIgBAFIgDAAIgBgDIgCACIgDgEIgDAAIAAAFIgCAHIgDgCIgDABIgDgGIgBABIgEgIIgFAEIAEAGIgCADIgBAAIgJgIIgDADIAAABIAEAEIACAAIACADIAAgCIAAAEIAFADIAHABIgDACIgFgDIABADQAAAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAABQgBgBAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgEgDIgEAAIgGgHIACgBIgEgIIgBALIgCgBIgFAFIAFAGIgDADgAgqCLIALAGIABgDIgGgHgAAXCCIAIAGIACAAIACgGQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAgAgKCHIAAgFIgDgCIgCADIAFAEIAAAAgAAICAIACAGIACAAIAAgFIgCgDIgCAAgAg5CAIACAFIACgFIgCgBgAAqCDIAAAAIAAAAIAAAAIAAAAgAAoB6IAFAGIABgHIgFgDgAglB8IADAEIAGgDIgFgDgAADB6IAFAEIAAgFIAEABIACgDIgGgBIgHABIgBAAIADADgAgTB2IAHAGIACAAIABgDIgCgDIgFAAIgDgCgAgvB6IACACIABgDIgCgCgAgDB5IABABIABACIAAgDgAAVBuIAHAJIAEgFIgDgCIgCAAIgDgDgAg5B2IACABIABAAIACAAIAAgBIgBgDgAATByIAFACIgFgFIgBABIgCgBIADADgAgVByIABACIABgCIgCgBgAAqBsIAEADIABgBIgFgFgAhHBvIAAAAIAEgDIgBAAIgDADgAgcBsQAAgBgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIAAABIACAAIAAAAgAhGBrIgCgBIAAABIACAAgAhABnIADABIAAgDIgDAAgABVBGIACgEIgDgBIABgEIgEgIIgDACIACAHIgDAEIADACIACgBgABHBBIAAACIACAAIAAgBIgCgEgAA7BBIgBgBIgBAAIACABIAAAAgABOAxIABABIABAAIACgBIgCgBIgBgBgAhLATIAAAAIAAgBIAAAAgAguAJIAAgBIAAAAIAAgBIgCAAIgBAAIABACIACAAIAAAAgABXAAIAAAAIAAAAIAAAAgAA4AAIgBAAIgBAAIACAAgAgmgFIAAAAIADgBIgBAAgAgcgPIADAGIAGgEIgIgDgAg6gKIAAgCIAAACIAAAAgAhHgNIABgBIgDgBgAAugOIACAAIABgBIgCAAgAAngPIAAgBIgDgCgABTgRIgCgDIAAADIACAAgAA7gYIABAHIAIgBQgBgDgDgDQgBgCgDAAgABEgYQAAAAAAABQAAAAAAABQABAAAAABQABAAAAAAIAFADIAAgDIgEgFgAAngXIAAABIACgBIgCgBgAgEgWIABAAIABgBIAAAAgAAUgbIgBgCIgBAAIgBAAIABACIACAAIAAAAgAAzgcIABAAIABgBIgBAAIgBABgABJgfIACAAIAAgCIgCAAgAAzggIACgCIAAgCIgCAAgAA9gjIABACIACAAIAAgDgAAogjIAAACIADAAIADgCIgEgDgAAcgjIgBgDIgCgCIAAAFIADAAIAAAAgAgDgkIABAAIAAgCIgBACgAAfgrIACAFIACgJgAAYgqIgEgFIgCABIAGAEgAAfgtIAAgCIAAACIAAAAgAAcgxIAEACIABgDIgCgDgAAYg0IADgBIgCgCgAgWCVIAAgEIAFACIABABIgCADgAhQCWIgFABIgCgHIADgBIAEACIABAAIAFAEIgBACgAgCCUIABAAIAAACQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBgAhlCOIABgCIACACIgCACgAAVCKIAAAAIAAACIAAgCgAhhCIQABgIADABQABABADgDIACABIADgBIAAABIgGAKgAhUB6IABABIgBABgABJBrIAFgCIACADIgBACgABLBnIABgBIABADgAAgBRIABgCIAAACgAA9AkIADgDIAEADIgBAEgAA0AlIgFgCIAEgFIADAEIAFAEIgCAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBgBAAgAhaAWIABgBIABAAIADAEIAAAAgABiAPIAAgCIgCgDIAEAAIACAFIgBADIABACgAhSAUIAAgCIABABIgBABgAhaASIACgCIABADIgCABgAhYAGIABAAIAAACQAAAAAAAAQAAAAAAgBQAAAAAAAAQgBgBAAAAgAgRABIABgBIACABgAAWgGIADAEIgEABgAAKgMIAFgBIgBAEIADAEIgBACgAgIgEIAAgBIABACgABagNIAAAAIAAACQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBgAAOgRIAEgEIADABIAEgBIACADIAAADIgDABgAg1ghIAAAAIACAAIAAAAgAgtgkIABgDIABAEgAAPg8IABAAIgBACgAhAhCIADgGIAKAEIAAACIgHACgAAlhEIAAgEIACAAIABgHIADAFIgBAIIgCAAgAAwhFQAAgFgEgDIgFgGIgFAIIgBgLIgCAJIgGACIAAgNIgIgHIgEADIgFgCIgCABIgGgFIgDAEIADAEIABADIgBAAQgEAAgCgEQgCgFgEABIgFAAIACADIgCAFIgCACIgIgDIAAAEIACAHIgBAAIgFgFIACgEIgFgBIgDAAIABAIIgCABIgFAAIgEgCIgIAEIgHgEIgBACIgEgBIgEAGIgDgDIADgBIgHgIIABgFIgCgBIAFgBIgBADIAFAHIAEgBIgBgCIAEgFIACAAIAAACIgCADIgBABIACACIAGgDIABABIACgDIACgHIgJgCIgCABIgCgJIgHgDIAAgHIAFACIADgBIAFAFIADAEIADgCIABABIADgDIACAAIAGAEIADgCIAGAIIADgBIADABIgBABIABACIAHgHIgDgCIgFABIgCgDIACAAIgBgCIACgGIAEABIAGAAIABAFIAHADIAFgBIACAEIABAAIAFgFIAAAFIACAFIACAAIACgFIADABIACgEQAAgEgFgBQgFgBgBgDIgBAEIgFgDQgCgBgCABIgEgBIAEgKIABAAIAGABIACACIAAgCIgEgFQgBgBgBgBIACgCIAPADIAEgCIAEAEIgDAIIgCABIgKgEIgDAIQACgCAEAAIAEAAIAFADIAEAAIADgCIAFAHIAEgFIgFgBIgEgEIgEgCIAAgDIAEgIQAAgEgEgCQgFgBgCgCIACgGIgCgJIAEAFIAEAGIADgCQAAABABABQAAAAAAABQAAAAAAABQABAAAAABQAAAAAAAAQABABAAAAQABAAAAAAQABAAABAAIACACIADgCIAKAGIACgDIAAgDIAAgCIAEAGQABACAFAAQABAAABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAEAEABQAFAAgBgDIAAgGIADgCIgDAAIgGgDIgCADIgCgBIAAgCIAKgFIABABIADAEIgBAAIADADIACAAIAEAFIgCADIgFgCQgDADABADQgBADgCACIgDAAIgFgDIgCACIAFAEIAEADIgCACIAEgBIAFAHIAAAFIgFADIgCgHIgBAAIgHgBIgCAEQABADACACIAEAEIgGgCIgDAHIgCgBIgDAXgAAhheIABAEIAGgFIgGgCgAAphqIAEABIgCADIADAHIACAAIgCgGIADgGIAIACIACgBIgGgCIAAgCIAEgEQACgCABgDIgEgCIgDAHIgEAEIgHgEgAARhhIAEACIAKgDIgEAAIgBAAIACgDIgFgFIgEAAgAgwhnIAAACIAAADIAGADIAAgCIgCgBIACgBIAAgEIgDgCIgCAAIgBACgAAfh+IACAFIADgDIgCgFgAApiCIABAAIAAgBIgBAAgAgkhNIACgEIABACIABADIAAACgAhVhQIgBgDIADADIAAACIgCgCgAgQhUIABgBIADACgAhWhXIAEABIgDABgAhUhjIACAAIAEADIgCABgAgthzIABgIIAGACIACgKIADADIAAgBIAFAGIACgBIAAADIAAAFIgCgCIABgEIgDAAIgEAFIgEAFIgCABgAgTh5IABgBIgBgDIAAgDIADACIABgBIADAGIgBAEgABSh4IABgBIAAgBIACAAIgBACIgCABgAgQiMIAEgCIACAEIADgCIAGAHIgCABIABABIgCADgAA7iSIAAgBIACABIAAADgAABiUIAFgCIAGAFIgCABIgCgDIgCAEgAAriSIgBgCIABgDIgBgDIABgBIAHAEIADgCIAEACIAAADIgCAAIgBACIgDACgAAcibIAAgBIAEABgAA5ieIAAgBIABABIAAAAIgBABIAAgBg"),
            this.shape_1.setTransform(290, 160),
            this.shape_2 = new e.Shape,
            this.shape_2.graphics.f("#CC0000").s().p("AAECoIABgBIAAAAIAAABgAAPClIgIgFIgDACIgGgHIgBAGIgFgCIABgGIgGgCIgCACIADAJIgDABIgHgGIgGgGIAAgCIAGACIACgEIgGgHIAEAAIACgJIABgBIgEgDIgCgGIAEgDIgBgEIABAAIAGADIABgCIgCABIABgCIgEgGIADgKIgDgGIgCAAIgBADIACAGIgFAFIgFACIgDgCIgKgMIgEAEIACAAIAAAGIgIgFIgCACIAGAJIADgBIAAACIAAgCIAEgDIAFAFIACAAIABACIgFgBIgFACIgIgDIgEADIgEgDIgFAAIAAAIIgFgGIgDABIgDgCIAAgEIgEADIAAgCIAAABIgBgJIACABIABgCIgDgDIgHAGIgHAAIgCAAIgCgBIgBAAIgGgBIgCgEIgCAEIgEgDIADgEIABABIABgBIgCgIIACgDIgCgCIABgGIgEgFIADgEIgBgCIAGgIIAAgDIAAgKIAHgGIgCgHIAHgIIgFgIIgBACIgBgCIAKgLIgCgDIAEgCIACAAIgCgDIgCAAIgBgFIADgIIAGgIIADAAIgBgEIAFgNIgFgBIABgCIgBAAIgBAAIgCgGIAEgCIACAHIAGgEIgBgDIAGgHIAAgCIgKABIgBgCIAEgEIAAgDIAJgMIgCgGIACgBIgBgLIACgHIAFAAIABgBIgDgGIAFgEIACAAIAAgIIADgEIAAgBIAHgKIAAACIABABIADgHIgCgCIAFgIIAEABIAFgMIACAGIAIgGIAFAKIgDAJIACgBIACABIgBAEQAAAFAGACQAFABAAAHIgEADIADAJIgBAEIgGAEIgBgBIgIAGIAEAFIAFgJIABAAIADAPIgGADIAEgEIgFgDIgBAEIgEAEIAFAOIgIAAIgBABIADAOIgHgEIgBACIgHAAIgGgMIgCAEQgBADABACIAAAEIAEAEIAFgDIACAEIgHAHIAFABIADAHIADAHIgDABIAAAGIgHgCIACgEIgBgKIgFgEIgDAEIAFAKIgEgDIgCACIgKgFIgBAIIAEAFIAFgDIABACIgEAFIAKAHIgFAGIgFgCIADAEIgCAAIgCAAIABgHIgEgEQgDADgBAFQgCAEgBAFIAGAFIACAJIAEgCIACAGIgCAEIgHgCIgCgDIgGAHIgBgMIACACIAEgFIgGgFIgBABIgDAJIAFAMIACgBIACALIgBAAIgKgEIgEgHIgBAKIAHACIAAABIADAAIACACIgCAAIgDgCIAAAGIgCAAIACADIgEADIgDgDIABgBIgBAAIgCABIgEAIIACACIAGgCIALATIgJgCIgCAFIADAAIACACIgGAFIAGAHIAGgMIAFAEIABgCIAJALIACgJIgFgDIABgDIgFgIIAJAEIAHgCIACADIAHACIAAgCIgCgLIACgEIAFAHIADAAIAEAEIAHgEIgCgCIADgBIADgEIgEgFIACAAIAFgDIgDgEIAEAAIACgEIACgBIgBgCQAAgFAEgDIAFgHIgDgEIgCAEIABADIgFABIAAgFIACgFIgBgCIAEgDIABAEIALgDIAAgCIgLgIIAAgCIAAAAIAAgCIADgFIAEABIABAIQAAAFAEAEIAEgEIAAgBIgFgHIABgBIgEgDIACgCIgEgGIADgEIAHAGIADgDIgHgIIAEAAIADgBIgBgJQgBgFgCgDIADgEIADABIAEgDIACAEIADgCIAEAGIADAAIABACIACgDIgFgJIgFAAIAAgKIgDgDIACgDIAHAIIABgBIAIAEIAAgDIgFgDIAEgEIAFAJIADgBIgFgEIAGgDIAHAJIgBgFIAGAAIACgEIACADIgFAEIAIAGIAAAFIgCgDIgEAAIABACIgEACQABAEADADIAFAHIgBACIAEAJIgCABQgEAAgFgBQgFgCgDgEIgBAGIADAEIgCAEIADAIIABgDIgBAEIAFANIgJACIgGgFIAEgBIAFAEIABgEIgGgKIgBAAIABACIgCAHIgGADIAAgCIgFABIAEAFIADAAIAIALIgBAFIgDAAIgFgBIgBgEIgDgGIgEgBIgBABQABAIAEAFQAEAFADAHIAEABIADgGIAGAEIACgCIAEAGIABAFIADgJIgBAAIAAgGIACAAIACAGIAGgHIADABIABgBIAFAWIACAAIADAJIgDADIACAAIAAAHQgDgHgEgFIgJgLIAEABIADgHIgEgFIgJANIADAFIAAADIAHAHIgBACIAEAFIAAADIgJgGIgDAEIgBgBIAIgHIgCAAIgKgLIgBABIgJgMIgDADIgKAAIAGAHIAFgBIACAGIgEAAIgBAFIgHACIAFAGIgCADIACAEIAEgHIAHAHIAHAFIgCADIgKgEQgEgDgGgBIAAgCIgCgEIgEAGIgEgCIgCAKIgGgDIABAGIgEAAIgEADIAIAHIAAgCIAEAEIgDAEIgGgEIAAgBIgEAAIgBACIABALIAIAJQABAEgEAFIgFAHIgJADIAHAJIAAADIgDgBIgFAFgAAGCVIADAGIACAAIABgEIgDgDgAASCJIgDAFIABAAQABgDAEAAQACgCABgDIAAgCIABABIABgDIgEgDgAACCNIgBgFIgBACIACADgAgHCMIgBgBIAAAAIAAABIABAAgAAKCEIgCgBIAAABIACAAIAAAAgAAIB3IABABIAAACIACgBIAAgDIgDgBgAgKBxIAEAHIACgCIgEgFIgCAAgAAOBtIACAEIAFgCIgFgFgAhABnIAAACIgBAEIAFgEIgDgCIgCAAIABAAgAg7BmIADgBIgCAAgAAaBlIACgCIgEgHIgDAEIACADIABAAgAhKBfIACAGIADgCIgFgHgAgaBjIAAAAIAAgBIADgFIgGgDIgBAAIgBABIgBABIAAAGIADABIACgBgAhqBhIADAAIABgDIAAgCIgEAAIAAADIgCgBgAhVBfIgBgBIgBABIABAAIABAAgAAKBeIABAAIABgBgAgsBbIAAACIABAAIADgCIADACIAAgDIAAgGIgCAAgAg9BcIgBgBIAAABIABAAIAAAAgAAcBWIAEAEIABgEIgDgCgAhRBXIAFgEIgGAAgAhcBSIAAADIABACIADgDIgCgEIgBAAgAALBPIgCABIABAEIADAAIABgFIgDgDgAgNBUIABAAIAAgBIgBAAgAgeBPIADAEIABgDIAAgBIAAgDIgDAAgAAhBSIgBgGIgBAAIAAAGIACAAgAgTBPIABAAIABgCIgEgCgAhYBGIACAEIgDADIAFACIACgGIgCgBIACAAIACgEIAEAFIACgCIADgIIgBAAIgHgFIgCABIAAADIgBAGIgDgEIgCAAgAgvBKIAAAFIACgEIgBgCgAArBCIABADIACgDIgCgEIAAACIgBAAgAAmBFIACgDIgHgEgAAAA2IADAFIACgDIAAgDIgEAAIgBgEgABMA4IACgBIgCgBgAAqAxIgCACIAAADIACAAIAGgBIACAAIgGgIIAAgCIgCgCIAAgHIABgCIgDgIIgFAEIAEAHIgFAEIgBgBIABAJIAFAAIAAACIABgCgAAHAyIAGADIgBgCIgCAAIAAgCIgCAAgAA7AzIADgBIABgEIgCAAgAAOAlQgBACAAAEIABADIACgEQAAgBAAgBQAAAAABgBQAAAAAAgBQABAAAAAAIAJgDIgEgCIgFAAIgEAEgAAaAaIADAAIACgBIAAgBIgDAAgAAaAUIACAAIAAgBIgCAAgAAQASIAAAAIABgCIgBACgAhLAMIACAGIADgBIgCgEIAAABIgBgDIgBAAgAAkAGIAGAFIACgCQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgBAAAAIAAgFIgDAAgAAsAKIACAAIABAAIgDgBgAAaAAIAFACIABgBIgEgCgAhFgCIACADIACAAIABgBIAAgBIgDgCgAAcgCIACgCIgCgBgAAzgFIABgDIgBgDIgDABIAAADIABgBgAAngIIACADIACgBIgDgEgAAjgJIAAgDIgCABIAAABIAAABIACAAgAg/gJIABgCIgBgBIgBAAgAAhgNQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBAAAAAAIgDgEIgBADIABADIADgBgAAxgTIACADIAAgDIgBgBgAg+gUIACgDIAAgCIgCAAIgBAAIgBAAgAAqgVIgBgFIgCABIACAEIABAAIAAAAgAA7gjIACAGIAEACIADgHIgEgCIACgBIgCgCIgFAAgAAZgkIAFAGIAEgBIAAgCIABgBIACAEIACgDIgFgDIgBAAIgFgCgAA6gpIgFgIIgCABIgDgBIAAADIADADIABAAIADACIADAAgAg2g1IACAIIAGgFIgHgGgAgdhDIABABIAAgCgAhBhJIAEADIABgDIgEgBgAgphRIAGAGIACgFIgHgEgAgehTIAAACIAAAAIADADIAEgDIAAgCIgGAAIgBAAIAAAAgAg5hcIgEAEIADABIACgEIABgBIAAgBgAglhkIAHAHIgFADIACACIADAAIAAAAIgBgBIACABIADgGIAEAAIgEgFIgCACIgCAAIgHgHgAg+hdIABAAIABgBIABAAIgCgBgAgLhiIABACIAAgCIAAAAIgBgEgAg/hoIACACIABgBIgDgBgAgyhuIAAABIACgBIgBgBIgBABgAgbh3IAFAGIABgHIgBgCIgEAAgAg3h0IgBgCIgCACIADAAgAg1h4IACAAIAAgBIgCAAgAgziBIADAEIgBACIACADIAGgIIgFgGIAAAEIgBAAgAgUiFIAAgCIgCgEIgEADIAEgBgAAcCSIADAAIgBADgAgdCKIAAgCIAEgFIACAHIgDAAgAhXBqIADgBIABADgAhZBqIABAAIAAABIAAAAIgBgBgAAwBlIgEgGIAEgCIAAABIABAAIACAEIgBADgABXBcIADAEIAAACgABPBXIAAgBIACABIgBABgABQBUIABgCIgBACgABlBRIABgCIACABIABADIgCABgABvBPIACgBIgBACgABIBQIAAgBIABAAIAAABgABcBNIgBgBIAFgBIAAABIgBACgABCBHIACgCIgCgDIACACIADgDIACAGIACAFIgDABgABuBMIACgDIAAADIgBAAgAg5BLIACgDIABAEgAByBLIgBgBIAAgBIAAgBIABgBIABAAIAAAEgABtBHIAAgCIAEACQgBAAAAAAQAAAAgBAAQAAABAAAAQgBABAAAAgABnBCIAAgBIADADIAAAAIgDgCgAgsA9IAAgBIABAAIABABIAAABgABxA4IAAgDIACAAIAAAFgABqA2IgBAAIgCgBIgDABIAEgFQAAAAAAgBQAAgBAAAAQABgBAAAAQAAgBABAAIAFAJIgCAAgAhCAxIAAgCIADAAIAAgBIAAgDIAAAAIACAAIADADIgDABQAAABgBAAQAAAAAAABQAAAAAAAAQAAABAAAAgAg4AiIAAAAIAAABQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAABAAgAg6AAIABgCIAHgDIACAAIABAEIgFACgAhhAAIABAAIAAAAIADAAIgEABgAhegTIABgCIABACIAAACgABRgdIAAgCIABAAIADABIgBABgAgmghIABgBIAAABIgBABgABNgjIAAAAIAAABIAAgBgABOgoIABgBIABABIAAABIgCABgAgagsIgCgFIABgDIABACIADgBIgCgDIAAgDIADgCIACABIAAACIgCAOIgDgCIgBACgABVgwIgBgBIABgDIACADIgBABgAgShIIAAAAIABABg"),
            this.shape_2.setTransform(290, 160),
            this.shape_3 = new e.Shape,
            this.shape_3.graphics.f("#CC0000").s().p("AhPCtIAAgJIACAAIAJgGIAEAFIAEABIABgDIgDgEIgDABIgEgFIgCABIABgEIgDgFIAAABIgCgDIgBACIACALIgDgBIgCAGIgFgOIgFACIgBgDIADgBIgBgEIAAgIIAEgCIAKAHIAAAEIAFgEQABACADACIAGACIABgBIgDgIIgDgBIgFACIgHgGIABgCIAIAAQAEABADAEIAGgCIABAGIAAAHIAHgIIgBgCIAAgEIACAEIAFACQAEAAABgGQAAgEADgBIAHADIAFgEIgEgFIAHgJIADADIABgDIAHAIIADgFIgCgDIgCAAIgCgCIABgDIADADIAFgGIgBgEIABgDIACAFIAAgBIACADIADgBIADAAIACAFIAEgBIAAgBIgEgCIABgDIgCAAIgEgFIAEgFIAIAGQAAAEACAEQACAEAFABIACgBIgCgCIABgDIgHAAIAAgEIADgDIACACIACgFIgBgJQgCgDgGABIgBgBIADgIIAGADIAEgBIACAAIAAABIgBAAIgBgBIAAAFIABgDIADAEIAIgHIgEgJIgFgCIABgEIAJAEIADgDIgBABIgCgEIgIgCIgEgLIABgBIgIgEIADgGIAGADIACgDIAFAHQADAFAEgDIgBAEIABABIAEgCIAFgDIAFAFIAAACIgBAAIgBAAIgBACQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABIACADIAEgEQADAAACADIACABIAFAHIAEAAIADgBIgKgLIACgCIgLgKIgCAFIgIgJIAHgDQAEgCADACIADgDIgGgFIgFACIgDgCIgEAEIACADIgDAFIgDAAIgDgDIgCACIgDgDIACgEIACABIACgFIADgDIgBgHIgJgEIgFAFIgFgFIgGgFIgDAEIgGgIIgDAAIAAAJIgDABIAAgCIACgIIgIgBIABgGIgEgEIAAgCIgHgJIgCADIgCgDIAEgEIABACIACgDIAJAPIAAAAIADADIACgDIgCgEIABgHIAIAGIAFgDIACABIgCAEIACAEIAHgGIADACIAAAIIgDAHIABADIADADIAGgGIAGAEIABgEIgBAAIgEAAIgGgFIgCABIgBgDIACgGIACAAIADAGIABgEIgFgLIABgBQADACADAFQACADAEABIADAIIAEAGIACAAIABgEIAFgCIAJAEIAAACIgFAAIgCADIgBgBIgCAJIgDADIACAEIAEgGIAKAJIgFAGIADAHIABgJIACAAQgBACAAAFQgBADgDABIADAEIAFgFIgCgFIAFgMIAHADIgCAEIAEAJIgCACIgCgDIgFAAIgDAEIAGAIIADgBIAEAEQADAEADAAIAAADIgCgBIgDACQgFgBgCgDIgFgIIgEADIAFAKIAAABIAFABIADAHIgBAGIgCgDIgHAAIABgEIgDAAIgCgCIgBADIgCADIgCgCIAAgDIgDgBIgCAAIABAEIACAAIgBADIAIAJIADgDIACADIgBgBIgDACIABABIgCAJIgCgCIgIABIAAgHIABgBIgHAAIgFACIgDgBIgCACIAHAFIgCAEIACgBIADAEIAFgEIACAFIAAACIgCABIgDgDIgBAAIgDgBIgEADIgBgBIgGAGIABACIAGgCIAPAOIgCACIgBgEIgIgDIgDACIgIgHIgCACIgEAAIAAgCIgHAGIACAFIgDAJIgHgFIgDADIADACIgCAGIgEgGQgBgCgCgBIgEAHQgDACgEAAIAAADIgCAIIgCgBIAAAJIgDgGIAAgCIgDgBIgEAIQgBAEAAAFIgFgBIgCABIgFgJIgCAAIgDgBIgCABIgJgIIgJADIgDAAIgFAGIABAGQAAAEgFgBIgHgBIgEADIgBgCIgHAEQgDABgBAEgAgHCKIgFAEIAEAEIgEAFIAJAEIACgDIgEgEIACgCIgBgBIADgCIAAACIACgCIgCgCIgCABIgCgDIACgDIAAgDIgEAFgAgbCLIACAAIgBgCIgCAAgAgQCIIAAgBIgBgCIgBADIACAAIAAAAgAAKCCIgCgCIgDgCIgBACIABACIAFAAgAgSB4IACAFIAAgIIgBAAgAAXB4IgBAEIAEgCIAAgBIABgCIgBgBIgDACgAAcB5IABABIAAgCgAAPB5IAAAAIADABIACAAIABgDIgCgCgAABBuIACAFIABgCIAAgFIgBAAgAAkBuIAAAAIABgBIgBABgAAsBhIAFgDIAAgEIAAgDIgBgDIgBAHQgBACgDAAIgFgCIgDgBIgCABIADAEIAFgBgAAtBLIAAABIAAAEIADADIADgFIgEgDIgCAAgAA4BIIADAGIgBADIACAAIACgCIABAAIAAgDIgEgIIgCAAgAAzA9IgBgBIgBAAIACABIAAAAgAAwA3IAGAFIACgCIgDgEIABAAIgCgBIgEAAgAA8AJIADADIACgDIgCgDgABLABIAAAAIAAgBIAAAAgAARgIIAFAIIAFgFIgFgEIgBACIgEgCgAAdgIIABAAIAAAAIAAgCgAg6CsIAAgDIACAEgAgjCnQgEgCAAgDIgEgCIABgGIAGABIACgCIACACIgBABIACACIgBADIACACIACAAIADAFIgDAEQgDgDgEgCgAgVClIADgDIACACIgBACIgEABgAhjCdIgHgLIAAgCIADADIABgBIAIAHIgBACIAGADQADACAAAEIgEADQgFgDgEgHgAgZCjIAAAAIABAAIAAABgAAbCYIgBABIgEgBIgBgHIADgCIAEACIAAgFIABABIgBAEIACABIgBAEIACAFgAAOCSIAAAAIABABIAAAAIgBgBgAgGCRIABAAIAAABIgBgBgAArCRIgBAAIAAgDIACAAIADACIgCACgAhtCLIADAEIgCACgAhfCQIgEAAIAAgCIAAgEIADgBIAFAGIgBABIgDAAgAhmCIIAAAAIACACgAhuCJIgDgDIADACIACgCIABADgAA0CCIAAgBIgEgEIAGAAIAFAFIABgBIAAACIgFADgAg0CAIABgCIgDgCIAAgEIAGAFIACgBIAAAFIgBABgAgtB5IABABIgBACgAghB4IAAgBIABABIAAAAgABOB3IADAAIAAABgAAxB2IAAgCIAAgDIAFAFIAAABIgBABgAg2B4IABgCIACACgABNBnIAEABIgCAEgABUBpIACgDIAAADIgCABgABUBiIACgEIAEAHIgEAAgABhBiIABAAIAAACQAAAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAgBgABjBbIgBAAIgBAAIABgBIACAAIgBACgAAEBaIABAAIgBABgABeBVIgBABIgCgCIABAAIACgBIADABIACACIgCAAIgBADgAAhBCIABAAIAAACIgBgCgAAfBAIAAgCIACAAIABABIgBACgABLA2IAAAAgABMAyIACAAIgDAEgAg3ApIgCgJIAEACIACgCIgEgHIgDAGIgGgEIgBABQgEgBgCgEIgDgHIAEgEIAAgEIAAgEIgBgDIgEABIgCAHIgEAEIABAGIgDABIgCgDIAAgBIgDgGIACgEIADABIADgFIgEgEIAGgCIABAEIABAAIACgFIgCgIIgHgDIABgDIAFgGIABABIAEgDIABABIADgBIACgEIgEgEIgCAAIgCgEIADgJIAHgBIADAEIgEADIgBAGIAFAGIAEgDIgCgEIAFgFIAAgFIgDAAIgJgKIACgFIADAAIAGAFIAEAPIADgCIgDgFIAEgBIAAgJIADgEIgDgGIgIAGIgEgGIADgFIgBACIADgLIAAABIgFgNIACABIAGgFIAAACIADADIACABIgHAEIACAEIABgBIACADIADACIgBgGIAEgIIgEgGQgBgCgFgBIACgGIACAAIAEgFIAEAAIABAGIAEACIADgBIAFADIAGgEIgEgEIgCADIgDgDIgCABIgCgDIgEAAIAHgEIABgGIgGgFIgDAKIAAAAIgBACIABgCIgIAAIABgDIADABIABgJIAEgBIAAgGIADADIABgEIgBABIgFgEIACgEIADAGIAHgDIAEAFIACgBIABAGIACgHIgDgHQgCgCgFgBIgDgDIAOgMIgCgCIACgEIADgCQAGAGAIACQAGABAHADIACgDIAHADIAGAAIgEAGIACAHIgHgDIgDAFIgGgGIgEABIgBABIAGAEIABgCIAGAFIABACIgEADIAEAFIgCADIADAHIgCAEIgCAAIgDgHIAAgCIgBAAIAAABIgEgDIgEAAIAEAJQABAFAIgDIADAEIADgBIABACIgBADIgGgEIgHADIgDgDIgBABIACABIAAAAIgCAAIgBAEIAGAEIABgDIADAEIABgBIAEACIACgDIABABIAFgFIADAEIAFgJIAGACIAGgEQACgCAEAAIACAEIAFgIIAJAEIABgHIABgBIADAAIABALIACgBIABgJIADgBIADACIABADQAEABAAADIAAAHQADAEAEACQAFACAFgBIAAACQgBAEADADIAGAHIgBACIgFgBIgRAFIgDgCIgEABIgGgDIgJADIgDgBQgDAGgEgBQgEgBgEAFIgGgDQgCAEgEACIgIABIgHgEIgCADIgHAAIgFABIgCgBIgCAEIgDgBIAAAHIgDAFIgBgCIAAgEIgGgEIgDAFIgFgHIgFAEIgDgEIgCAEIAGADIABgBIAGADQADACABADIgCAAIgBAKIgCAAIgFgFIgCABIgFgBIAAgGIgEgBIAAAEIgEgDIAAABIAGAKIAGACIABALIgCACIACABIgCAEIACADIAHAAIACAHIgCAHIgEABIgCAAIgCABIABAGIgBAFIADgDIACACIAAgDIAGgCIAEgFIgEgEIAGgFIAEAHIAFAFIgFgBIAAAFIgBAAIAAABIAFAIIgBACIADACIABADIgDADIgGAAIgCAEIgJADIgDgDIAAABIgCACIABAHIgCgEIgGABIAAABIgCAFIgLgCIgCADIgGgEIgEAAIAGAMIgDAAgAgrAWIAAAEIABABIADgFQAAAAAAAAQgBAAAAgBQAAAAgBAAQgBgBAAAAgAgyAWIAAgGIACgGIgCABIgBgDIgCAAIgBAEIAAAFIAAACIADADIABAAIAAAAgAgjAMIADAGIAAABIAAABIABAAIADgHIAAgBIgFgDgAhUANIABABIAAgCgAgRANIgBgCIAAAAIAAACIABAAgAgUAHIABABIACABIAAgDIgDAAgAghAAIAAABIAEAFIABAAIADgFIgGgDgAhLgSQAAAEAGACQAFABgBAGIAEAJIAEgDIgBgBIgCAAIgBAAIAAgEIACgBIACABIACAAIAAgDIAAAAIADgBIAAgDIgBgBIgCAEIAAABIgDgCIgBABQgEAAgDgEIgEgFIAAgCIgDgEgAgqABIAFAAIACgBIgCAAIgDAAgAgEgBIAAABIACgBIgBAAIgBAAgAgqgFIABAAIAAgCIgBAAgAgjgJIAGgEIAFgDIgHgGIgEAGIAAACIgEgGIgDACIgBAAIgBgBIAAACIAEAIIABgCgAgzgUIAAACIAEAAIAAgHIgHAAIgCgBIgDgBIgFABIAAADIAAgBIADACIAFgEgAgagXIACgGIgEgGIgFACIACAEIgEAGIACgCIAFgBgAgqgiIABADIACgBIgDgDgAgqgyIAEADIADgCIgCgEIgCAAgAghg9IABABIABgCIgBgDgAgbhEIACAAIABgCIgFgGIgCABIgDgDIgBADIgDgDIgEADIAFAEIAGgEgAgphfIAKALIADgDQgBgEgDgDQgEgDgDAAgAAthdIACAGIADgDIgDgDgAAEhdIACAGIAEgDIgEgGIgCAAgAgGhkIgCAEIACADIAAAFIABAAIAAgCQAAgEAEgCIADgCIgCgFIgGAAgAA0hbIACACIAEgEIgEAAgAAOhZIADgEIgBgCIgFgDgAgchdIAEAEIACAAIABgDIgEgEIgDAAgAAkhdIACAAIADgDIgBgBIgDgBgABRhlIABAAIABAAIgBgBgAA3hpIAEACIABAAIAAgFIgBAAIgDgCgAAchoIAAABIABgCIgBABgAAzhqIABgDIgCgDIgDABIgCAAIACAEIABAAgAgShzIAFAHIAEAAIABgCIgIgHgAA3hvIAAAAIgCgBIgBABIACAAgABGh3IAAAFIADACIABgDIgBgEgAgGh4QACAAADAEIAAgCIgHgFQAAABAAAAQAAABAAAAQABABAAAAQABAAAAAAgAgZh9IACAAIAFgFIgDACIgFgDgAgBiLIgCABIgCAGIAEACIABgEIAAgEIAAgCIAAgCgAgMiYIACAEIACgFIgDgBgAgQidIAEgCIAEAAIgEgCIgEACIgBAAgAgrAtIADgDIgCADgAAjAYIADABIABACIgCAEgAhJAcIABAAIACADIgBAAgAAUAYIgBgDIgHgEIAAgDIABAAIAEgCIAEAHIADgBIAEAEIgCAFgABRAOIgEACIgCgDIAAgCIAHgHIAIAEIgBAKgAAKAOIAAgCIABAAIgBACgAg2AMIABgBIABAAIgBADgAAcAJIAAABIAAABgAAEACIgBgBIADgBIABABIgBABgAA7gNIAEgDIACADIgDACgAAmgWIABgDIABABIAAACIgBACgAgNgaIAAAAIAAACIAAgCgAgSgdIACgBIgCADgAhMgfIADgEIgCAIgAgNggIAAACIgDgDIAEgGIgBgCIABgCIAIAJIgEAEIgCgCIgBADgAgOgeIABAAIAAABIgBgBgAg/gnIACAAIgBABgAg8gqIABAAIABAAIgCAAgAg6gqIAAgBIABAAIgBABgAAAgyIAAAAIAAADQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAgBgAgagxIABgBIAAABIgBABgAgHgyIABgBIABAAIAAABgAAAg5IAAAAIAAABIAAAAgABdhsIABAAIABABIAAAAgABehwIgBAAIgBAAIgBgCIAEgBIABADgABnhwIgDgDIgCACIgBgDIACAAIAGADIgBABgAAHh+IAAAAIAAADIAAgDgAAWiGIABABIAAgCIACABIgBACgAgciqIAAAAIAFAFIgCACgAgWilIAAgBIABAAIAAABg"),
            this.shape_3.setTransform(290, 160),
            this.shape_4 = new e.Shape,
            this.shape_4.graphics.f("#CC0000").s().p("AgoCdIAEgDIAFAAIgKgKIgCAEIgGgEIgDACIgHgKIgLAEIgGgFIgDgGIgDABIgHgCIgCgKIADACIABgFIgIgCIgEgEIAAgEIACAAIAEgCIAHAJIADgFIgFgHIgGAAIAAgEIADgEIgCAAIACgLIADgCIgCgCIgGAEIgDgFIABgEIgCgEIAHAAIAFgDIAEACIgCACIADAEIAHgLIgCgBIgGAEIgEgEIgGgBIgEgDIAGgDIACAAIgBgHIgEgBIAAgBIAIgKIAJgEIgKgCIgCgGIAGgFIAEgGIgDgEIAEgEIAHAJIABABIACgCQgDgCgBgEIgCgGIAGgCIgJgCIAEgDIgCgCIAHgGIACAAIAHAEIAEgCIgJgHIgDgFIAIgBIgEgGIALgPIAHAGIADgDIgDgEIgBAAIgGgCIAHgJIACAAIADgDIABgIIACAAIAFAEIABgEIAFgEIAGADIADgCQgEgBgEgCQgEgCgCgDIAHgDIABAAIAJgEIAAgBIgDAAIgBgEQAAgKAJgCQAJgCACgHIADADIAFgDIgFgHIAIgIQAEgDAGgBIABABIACgFIAIABIAEgCIgEgGIAFgCIADACIAHgEIACABIAAgBIAFgDIgCgCIADgDIAFABIACgCQAFgBACAGQAAAGAGAAIAHgHIAEAFIABgDIAFAJIACgBIAGAHIgBADQgFgDgEgEQgFgEgGgBIgBgBIgBAEQAAAFAEADIAHAGIgIgBIgFAFIgJgDIgCACIAEAHIgGAJIgDgGIAEgBIgLgDIgGACIgBgBIgKAEIACADIAGgBIAHAAIACAAIAAAEIgEAEIgBgBIgBAFIACADIgJgGIABADIgDAEIAGAIIgGgBIgFAEIAEABIgBAFIgCgCIgCACIAHAFIAAADIgCAAIgHgFIgDACIgEAAIgBgKIAEAAIADAAIADgDIAAgGIgCgEIgHAFIgIgBIgGAGIAEAIIgEAGQAAAEAFACQAFACAAAFIAAACIgDgCIgIACIAAACIgJAIIgDgEIgLADIAFANIACAAIAFAHIgHgCIgDABIgGAIIAHAHIgCABIgGgDIACgBIgMgHIgCADIgKgCIAIAKIADgDIAIADIAAAHIgDAAIgCABIgCAFIgGgGIgCADIACACIgBACIAGAIIgBAEIgFgDIgIAEIAJAHIAEgBIACgIIACADIAEABIADgBIgCgEIADgEIACALQACAHAFAAIACAAIABgBIgCgFIAGgGIAAgEIAIACIgBACIAKALIADgDIgCgFIACAAIAHAFIAAgCIACgCQAFABADAEQACAEAFAAIAJAHIADgBIACADIABgBIAFAGIABgEIAGAIIgDAFIgNABIgEgDIgCACIADABIADAFIgCAEIgMgEIgDgDIADgCIgDAAIADgEIABABIAAgDIAGADIACgCIAAgEIgCgCIgEAAQgEgBgEACIgHAEIgCgBIADgHIgDgDQgEAAgEAKQgEAIgEgEIgHAIIgIgBIgCAFIACADIgBAEIgMAAIgGgEIgFAPIgDgEIgBAIIgKgFIgLgDIAEgBIgFgGIgBAEIgBAAIAAAHIgBACIAJAGIAAAEIgKACIgGgDIgDACIAEgHIgFgDIgDAJIgBABIgEgFIAAACIADAEIACAAIAKAAIAEACIgEADIAAABQAEAAAEADIAHAGIgHACIgFgFIgFACIgBAAIAIAGIABgBQAFAAABAHQABAGADADIAIgDIADAAIAIgCIgBgCIABgBIAGALIAHgLIAEAAIABgFIAGAEIAGgKIAAgCIADACIABAEIADABIAHgEIAEACIACgCIAIAFIgHgGIgCgIQgBgDgEgCIAJgFIgBABIAFAGIADgBIADAHIAEgDIALAAIAEAHIAIAAIgIAJIgGgEIgCACIAAgBIABgCIgFgGIgGADIAEAHIADgBIAFADIAAAGIgDACIgGgCIgCACIgCgBIgEABIgEgCIAAgBIgCgFIgCAJIgCAAIAAAAIABgCIgMgIIgBABIABAFIAHADIACgBIABAFIAFABIACADIAGgEIgBACIAOAHIACgBIAGAHIgEABIgNgHIgCAAIAAACIgMAAIAAACIgDAAIgKgIIgFAGIAEAFIAJgBIAGAEIggAAIAEACIACAAIgGADIAEAGIgCAAIgEgCIgBACQgFgDgBgEIgDgJIgEABIgEgDIAAABIAJAKIAAAFIgPADgAgNCOIAAgBIgBAAIABABIAAAAgAgKCMIAAgCIgEAAIABACIABgBgAgnCGIAAABIADABIAFgEIgDgBgAgCCFIAAAAIAAACIACABIACgIIgGADIgCgCIAAADIACgBgAgNCDIAHgCIgGgEIgDABIABABIAAABIgBAAIgBAAIgEABIAAACIAFgBgAhRB6IADAHIAJgDIAAgCIgBgEIgBAAIgCABIgGgBgAAFCAIgCgMIgCgBIgGADIAFAGIAFAEgAgEB/QAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAAAIAAABIABAAIAAAAgAhBB+IAFAAIAAgEIgCAAgAhMBtIAHADIACgDIgEgEgAhXBiIABACIADgBIgBgEIgDAAgAhABLIgBgCIgCgCIAAACIAAACIADAAIAAAAgAgqBAIAAgDIgDAAIAAAAIADADIAAAAgAg8A+IABgBIAHgBIgCgCIACgEIAAgBIgCgCIgHAHIgDAAIAAgBIgCgCIgFABIAAACIAAAAIADgBgAgPAtIACACIgEAAIgFAIIACADIALgDIgGgFIAAAAIADAAIADgHIgBgCIgCAAgAgwAuIAGAFIAFgBIgHgHgAhMAyIAAABIAFgCIgEAAIgBABgAhPAyIgBgEIgCADIABABIACAAgAhFAoIABAGIgBABIAAABIACAAIAAgBIAFgDIgEgGgAgjAuIACAAIAAgCgAg9AmIADAFIAEAAIACgBIAAgBIABgDIgHgEIgBAAgAgEAoIADAAIAAgCIgDAAgAgyAnIAAAAIAAgCIAAAAgAhRAkIAAABIAEACIAEgCIgDgFgAggAlIABAAIAAgCIgBAAgAgeAZIAAABIADAJIAGgGQgDgDgEgBIgHgFIgDAEIgDgBIgCACIgCgBIABAFIADAAIADAEIAGgJgAg6AeIAJAEIAFgDIgHgIgAhNAbQAAABABAAIAAABIABAAIABgCIgDAAgAhAAXIADABIACgBIgBgCIgFAAgAg+AOIADgCIgIgCgAg1gEIgEAHIAEADIAEAAIgCgCIAEgEIABgDIgGgCgAhBACIAEAEIADgDIgBgBIAAABIgEgDIgCAAgAgsgDIgFgMIgDABIAAADIAIAIgAgqgFIABABIACgBIgBAAIgCAAgAgVgWIAAAAIABgBIgBAAIAAABgAgugYIAAABIABgCIgBABgAg0ggIAFADIACgDIgEgEIgDAAgAgbgkIAAAEIAGAAIABgDIAEgDIgGgDIgCACIgDgCIgFABIgHAAIABADIABAAIABADIADgBIADgBgAgqgmIABAAIABgCIgCAAgAgkgtIACgCIACABIABAAIgEgCgAgXg7IgBADIAAADIADAAIADgCIgGgHgAglg3IADACIAGgDIgCgCIgEACIgCgBgAgLg4IADAAIAHgCIABAAIAJgDIAAgCIgCgBIACgFIgBgCIgDAEIAAABIgFgCIgEAFIgEgDIgCAAgAgOg/QAAAAAAgBQAAAAAAAAQgBAAAAAAQAAAAAAAAIAAABIABAAIAAAAgAAAhLIAEAEIADAAIAAgCIABgEIgGgCgAgMhZIADAAIAGgGIgBgBIgGgDgAAjhjIgBgBIADgCQgDgGgDAAIgIADIgHgEIgBACQABAEADACQACABAEgBIAEACIAEAAIACAAgAAEhlIAAAAIABABIAAgDgAAGhlIACAAIABgBIgCgBgAAUhyIgBgDIgBAAIABADIABAAgAAxh4IAAAAIABgBIgBABgAAqiAIAFAEIAEgCIgEgFIgCAAgAAeiAIABADIACAAIAAgCIgDgCgAA9iAIAAgCIgBgBIgDACIADABIABAAgAA3iBIACgBIgGgBgAA9iGQAAgBgBABIAAAAIABAAIAAAAgAA3iTIgBgCIgBAAIABACIABAAgAAECbIABgCIABADgAABCWIAAgBIAEADgAA4B9IAAgEIAAgDIAFAGIACgBIABADIgGADIgCgEgAA0CAIAAgBIACAAIACABIgBABgAAtB/IABAAIAAABIgBgBgAhbB1IAAgBIABACIgBgBgAg0BuIACgDIADACIgBABgAAEBpIABgCIABACgABLBnIgGgFIgIgCIgBAFIgDAAIABgFIgFgBIgHAAIgGgFIgHACIgGgDIgBgEIADgGIAAACIADgBIABACIACgCIgFgIIAMgJIAFACIACgBIAHAGIAFgCIgEgFQgDgCgBgDIAGgBIABgHIALAEIAEgEIgDgCIABAAIAFgGIABAEIgCAEIAEAEIACgBIADABIgBAEIAAgDIgEACIgDgDIgCAEIAGAFIADACIgCABIACAAIgHAFIgGgCIAAgCIADgEIgEgBIgKAEIAAACIADgBIADAFIgBACIAHABQAEABgBAFIABgBIAFAEIgEACIgIgGIgBAAIgDgCIgDABIgGgCIgCABIADAGIgDAAIgDAAIgCgFIgDADIAAACIAFAGIAEAFIABAAIACgDIABgGIAEAGIACgEIAEABQABADADADQACACADgBIAEACIgFAAIgBAFgAAtBOIAAgCIgBgGIgDgBIgDADIACADIABgCgAA/A/IgEgFIgCABIAGAEgAgnBWIABAAIACABIgBAAIgCgBgABVBQIAAgDIAIACIgFAHgAgqBSIABgCIAFADIgDABgAg+A7IAAAAIABABIgBgBgABXAsIAEgBIABAFIgCACgABTArIAAgBIADAAIAAABgAAjAqIABgBIABAAIgBABgAAWAqIAAgCIABAAIAAACgABNAnIABgBIABAAIgBACgABIAjIAAgBIACAAIAAABgABFAfIABgBIACABIgBACgABBAdIABgBIAAAAIAAABgAA1AYIACACIgGADgABGAbIAAgBIABAAIgBACgAAzAUIAAgCIACAAIgBACgAAIAKIAFgFIABAFgAgcAAIAEAAIgCACgAgSgDIgDgEIAHADIAAADIgEgCgAgIgWIADgEIAEAEIgDACgAgcglIABgBIAAAAIAAABgAgFgpIgEgDIAFgEIABAFIgCACgAAyhWIABgCIABAAIgBACgAA1hZIAAABIgBAAgAgVhaIAAgCIABABIgBABgABQhyIAAgCIABAAIAAACg"),
            this.shape_4.setTransform(290, 160),
            this.shape_5 = new e.Shape,
            this.shape_5.graphics.f("#CC0000").s().p("AglCgIAIAHIgIACgAgICjIACgLIgGgGIgIAFIgHgFQgHAAABgFQABgFgLADIgDgCIAAgGIAFADIAEgGIgHgIIAAgFQADgBAEABIAHABIAJgDIgMgLIADgEQAEgBADgEIAEgHIAAgIIABgIIAHgGIAFADIAGgDIACgEIgGgEIgCgEQABgDADgDIACgCIABgJIACgBQAEAAABADQACADAEAAQAFAAACgDIAEgHIgCABIgDAAQgFAAgFgDIgHgIIAAgHIAEgJIADAAIADABQAGAAAFgDQAEgCAAgFQAAgDgEAAIgGAAIAAgHIAFACIADABQADAAAFgFQAEgFgEAAIAEgFIgJgIIAGgEIAFgJIADgIIAOgIIgHgDIAAgIIAHAEIAPgHIgKgEIACgEIAAgBIgJgLIgKgJIgDADIgBAAQgDABgDgCIgGgEIgFAJQgFAGgDgEIgLABIABAKIgIAAQgEgDgEgBQgDgCgEAAIgDgGQgFACgCAIQgCAJgHgDIgDABQgBADABAEIACAHIgDADIgJgHIgGAAIAAAEIAIAHIAJAFIgCAGIgIAAQgBgEgDgCQgDgDgDgBIgGAEIAEALIANAGIgIALIAMAJIgMAGIgEgHIgFgGIgBAKIAFAIIgEACIgFgDQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABAAIgEgHIgFgHQAAgEgEgCQgDgBAAgEIALgCIgFgIIgLgDQgIgDAAgEIAIgBIAIgGIAAgDIAEgHIAEADIAHgBIAFgEIgJgBIgBgEIgJgFQgHgDAAgEIAGgGIAIACIABAGIABAGQAFgBAEgCIAIgDIALAHIACgEIgLgJQgFgEgBgHIAEgEIgJgEIgHABIAFgIIACgBIgDgDIACgFIAJAGQAEAEAGAAIACgCIgCgEIgJgHIAEgEIAEAEIADgDIgDgFIgHgEIACgFIgDgCIAAgEIAEgBIAGAFIADgDIgBgGIAGgFIAIAEQABADADADQADADAEACIAIgFIAKAEIAAAIIgNgCIgCAIIAEAIIgKABIgEAKIAHABIAIgEQADAAADAGIADAJIACABIAFgFIAIAAIgHgEIADgDIgIgGIAAgDIAHgBIAMACIADAFIAIgBIAEACIADgCIgFgCIgGgBIAbgEIAEAIQABADAEABIAGgEQACACAEABIAIABIABAAIAGgEIAMAAIgGAIIAJAGIgCAKIgEAFIAAAGIgIACIgBAIIgEAGIAEAWIgDABIgGgEIgEAIIgBAIIABACQAFAFABAEIACALIgBACIgGgHQgFgGAEAAQgEgDgEgJIgIgNIgEAKIAIAJQAEAEACAGIgDADIgCgFIgGgCIgEAIIAFADIAHAEIgBAHIgHgCIgKAGIAHAAIACANIgKADIABAEIAHACIABAJIgFACIgIgCIAAABIgGANIAGAEIgCAJQgBAEgEAFIgBALIgGgEIgDALIgFACQgEAAgEgCQgDgCgDAAIgBABIAGAJIADALIgDAIIgJAFIAEAGIACAKIACAIIgBAEQAAABgBAAQAAAAAAgBQgBAAAAAAQAAgBgBgBIgCAAQgDAAgCACQgCACAAADIADAGIgEAIgAABCJIgBgFIgGgCIgBAEIABADIAHAAgAgKCDIgGgGIADgJIgMAHIAHAFIAIADgAAAB7IADgBIAAgEIgDAAgAgTBlIAGACIAGAAIABgDIgJgFgAAMBhIgIgIIAAAGIAEACIAEAAgAgCBTIgFgJIgGAFIALAEgAAHBJIAHADIAGAAIACgCIgMgHgAAcBBIAFACIAAgDIgDgDgAAHA1IAGAHIAGABIAGgBIgJgJgAAYAwIAJAEIACgCIAAgFIgIgDgAAkAYIgEgIIgBAHIAFABgAAPAYIgHgKIgBAFIAIAFgAASASIAFACIAEAAIgGgIgAAiAFIAEAGIALgEIgKgHgAAzgFIgFgMIgCAAIgCABIgDABIAGAJIAGABgAAsglIgBAJIADABIAFgCIgCgQgAhMg7IADAGIAHgEIgEgGgABUg9IgFgHIgKACIAKAFIAFAAgABLhhIAJAEIAEgCIgJgHgAgCheIgEgKIgFAGIAJAEgAA0hyIAOAKIAGgCIgPgNgAgohuQAAACAEACIAIABIAGgCIABgBIgOgHgAgliRIAIAEIACgEIgIgCgAgiiYIAFAAIABgGIgIgBgAgbChIABgFIAHABIgCAEgAgvCfIACgFIgEgCIABgHIAHAGIAAAIgAASBwIAGgHIADAGIgCADgAAeBeIADgDIAAgGIAGAEIgFAHgAArBOIABgGIAHAAIgBAHgAAyAsIgBgHIAIAJgABAAGIAGgEIgEgBIAAgBIAHAAIADAGIgJAGgAANAAIAAgFIAFAFgABNgKIAGAEIgGABgAhcgTIACgJIAIAOgAhpgmIAFgKIAIAJIgGAHgABchEIADgGIAHACIAAAIgAghhHIADgFIACAJgAhdhMIALAEIgOABgABghPIAGgFIADAFgAArhQIgCgGIADACIAFAFgAAbhTIgJgEIAKgEIAJAKIgKgCgAgWhTIABgEIAHACIgCADgAAohfIAIgCIAKAIIgGAEgAAfhfIgCgHIAHADIgBAEIgCAEgAhFhkIgBgHIAHAKIgCADgAhVhpIAEADIgJACgAgHiCIABgGIAAgGIALAEIgMAIgAAOiRIAIAJIgIABg"),
            this.shape_5.setTransform(290, 160),
            this.shape_6 = new e.Shape,
            this.shape_6.graphics.f("#CC0000").s().p("AgsCbIAAgCIAEgDIAAgCIgDgCIgGAKIABAEIgLgDIgEgDIgBABIgDAAQgDgDgDgFIgCgIIgDADIgEgDIACAFIgBAGIgBABIgCgIIgEACIgEgJIAGgFIgEgDIgKADQgCgDABgEQAAgEgCgDIgDABIABgEIgCABIgDgFQAFABAEADIAIAEIADAAIgCgFIAFgNIgJgDIAAAGIgFAEIgEgFIAGgDIgBgEIAFgFIgJgFIgDABIAAgEIgCgCIAEgEIAGADIAFgCIAOAWIADgCIgBgGIgDAAIgDgGIgDAAIAAgEIgDgEIAHgEIACABIAKAAIAFAJIADgCIgDgFIACgDIAKAHIAFgCIAEAJIgCAEIgFgHIgIADIgGAFIAFAAIAGAGIADgBIACAEIgEACIAAADQAAAEAEAFIAHAHIgBACIADADIgBACIAFAFIADgEIADABIAEAFIgBABIgEgBIgCADIADAHIABAAIADgHIAHAEIADgGIgBgBIAMgJIACAAIAEgCIACAEIAEAFIADgNIABAAIACgHIAIADIgGACIADAIIAGABIABgBIgFgGQADgCACgDIABgHIgBgDIABgEIAHgCIAHAAIACAAIAGAEIAHgEIAAAAIABgBIgBgDIgCACIgJgBIgHgMIADgDIACABIAFgDIgEgHIABgCIAHACIADgCIgEgIIACgIQACgDADAAIAIAEIACAAIAEAFQAEAEACgCIAJAHIACgFIgEgFIgCAAIgLgIIABgBIAGAAIABgBIgIgJIABADIgGAIIgLgGIAAgFIAAgCIAHgDIABAAIABADIAFABIACgCIgIgJIgDAGIgJgDQAAgFgDgCIgEgHIAAgCIADgDIABABIACgBIgHgEQgEgCgFAAIAAgFIgMgDIgHAFIgIgFIgBABIACADIgDAFIgEgEQgEgCgCgCIgFAHIgFgEIgBABIgDgEIgEgCIgCACIAJAKIgDAGIABAEIgDAGIgEgFIgBAAIAAgCIgEAEIgDgBIgBADQADgCAFABQADABACACIAAADIgBACIgEgDIgDAAIgDAHIAFAEIAAADIgDgCIgBACIAEADIgGAAIgBACIgGgDIABgCIgDgDIgBAAIgFgIIgGgBIgBAKIAEAGIAHgDIAFAMIgDACIAGAFIAAABIgEAAIgDgCIgEADIgEgHIADgDIgIAAIgFAHIAEAFIAGACIAEgDIAEAGIgHACIAAgEIgCABIgFgBIgNADIgIgCQgGgCAAgDIgDAAIgEgDIgEABIAAgBIADgEIgEgFIALgCIACADIADgDIgEgDIACgGIACAAIAEgEIACABIAFgCIgDgBIAGgFIgIgGIAAgBIAJgEIAGAJIAEgDIgEgCIABgCIgDgEIAGgDIgCgFIACgDIAHAEIAFAAIgCgFIgBACIgJgDIgCAEIgEgFIgEAAIAHgEIAJACIAHgDIAIAEIACgCQgEgEgGgFQgGgGgIgCIAHgFIgOgFIACgGIgFgKIAEgCIAFABIgGgDIgIgDIABgFIgBgCIABgFIAEABIgIgHIACgDIAJAIIADgEIAAgBIgFgDIAAgCIAAAAIAGgJIgEAAIgDgEQABgDACgBQACgDAEAAIACgCIgEgDIgBgFIALgIIgBgBIAEAAIAEgDIgEgFQgCgDAAgEIALgFIALgFIgDgIIACgBIAFAEIABgBIAMACIAAgBIgEgCIgCABIgDgDIABgFIgBAAIAFgCIACABIAFgDIAEAFIACgKIADAAIAAACIgDAHIABACIAAAFIACAAIAAgFIABgCIALAFIACgLIAJAHIADgCIgCgDIADgFIAJAJIAAAAIAIAFIAFgCQADAAADACIABgBIAFADIAAABIAFAGIABgCIADAEIgIAEIgDgEIABgFIgBgBIgLAGIgFgGIgDAFIADADIAEAAIACAGIACgBIAFADIABgBIALADIgIACIgBADIADADIAAAHIAEABIACAJQgEgBgEgCIgHgGIgJAJIAIADQAEABAEAAIACADIgGADIgFgFIgGAEIAHAIIABgBIAGADIgDACIAGAEIgBABIgGADIgHgEIgGABIAAABIAHAJIACgBIAAACIgCAAIgPAFIgIAHQgDACgJAAIgHADIAJABIADAFIgBACIgEACIANAKIACgBIACACIgBAEIAEABIACgEIACgBIAKAFIADAAIAGAHIACgCIAEAIIAFAFIAAADIAGgDIgIgEIAAgEIAHAEIAGADIADgBIAEAFIgBAFIgEgCIgGACIADACIgDAEIAAACIADACIABAAIAEgJQAHADADADQADAEACAGIADgBIAAABIgIAJIAFAIIAEgBIAAgEIACAAIAFAFIgFACIgBgBIgFAAIgCADIgEgBIgEAFIANAEIAAAHIgCACIgGgCIgDADIAPAGIAFgBIgBAEIADAGIgCAAIgFgFIgNgEIgEADIACAFIgDAFIADADIAJgFIADAGIgCAAIgEAEIADAEIgBABIgHgDIgFACIAEAFIgGACIABADIgDADIgFgGIgEAAIgDACIgDABIgBADIAAAAIAAgDIgCgBIgEACIAEACIgBADIAEAFIACgKIADAAIAJAIIgHADIgEgBIgGAAIgFABIAAACIACAGQACADADAAIAAADIgFADIgJgHIgDAFIADACIgBABIABADIgDgBIgEgFIgGgBIgBAJIgOgCIgBAAIAHAGIgDADIgGgDIgCABIgIgFIgBADIgFAEIgGgBIgBAEIgBAAIgIgHIgBACIAIAIIAAACIgFABIgKgDIgBABIgIgBQgFgCgDgCIgBACIACAHIgBACgAg4CQIACAGIACAAIAEgCIABAAIAAgCIACgHIAAgCIgEAAgAhVCMIABAAIAAgBIgBAAgAhFCHIACACIABABIABgBIgCgDgAgHCIIAAABIADgBIABgBIgBgCIgCAAgAg1CDIACADIAEAAIABgDIgBgEIgCgBIgDAAgAhCCDIACAAIAEgBIACgGIgDgBIgBAEIgBgBIgDABIABgCIAAgBIgFAAgAAYCAIADAAIAAgBIgDAAgAAZB9IAEADIAEAAIACgCIAAgCIgEgCgAAxB+IACABIAEgFgAhhB9IACgDIgDAAgAhNB3IAAACIABABIADACIADgGIgCAAIgEAAgAA2B2IADAEIACgCIgEgEgAhYBzIABADIgDAAIACACIAIgFIgCgBIgDAAIgBAAIgCABgAAnBwIAIAFIACgBIgEgHgAhLBnIABADIgDABIAHAIIABgBIADgFIgBgGIgEABIgCgBIAAgBgAAbBrQAAAAAAAAQAAABAAAAQABABAAAAQABABAAAAIAEADIACgDIgGgEgAg5BsIABgCIgCgEIgEgBIACgEIgCgBIgDABIACAEIgBADIABAAgAAeBqIABgCIgCgBIAAAAgABUBmIAAABIABAAIAAgDgABLBeIABAGIAFACIAEgDIgFgJIgBABIgEgCIAAAFgAhOBjIACADIABAAIgCgDgAA6BkIABAAIgCgFIgDAAgAA/BbIAGAFIADgBIAAgDIgCgCIgFgCgAhIBVIAFAGIABgCIgFgEgAA3BUIAEADIADgEIgDgBgAArBVIADABIABABIADgDIAAgCgABABWIAAAAIAAgBIAAAAgABBBQIAAABIAGAEIACAAIgCgFIgCAAIgDgCgAhSBSIACACIAEgDIgCgBIgCAAIgCAAgAA2BLIgCAGIACABIADgFQABgDADgBgABMBJIAFAHIAEgBIAAgDIgFgGgABBBJIABgDIgIgIIgBACIABADIABAAIACACIgEACIABAAIAEABIgBgDgAhTA3IAAACIAGAMIACAAIgBgEIACgCIgEgFIgBABIgDgDIACgBgAA2A8IABgCIgBgBgAhHA3IADAFIAFAAIACgFIACgHIgDgFIADgFIgFAAIgDAAIgDABIABAGIgBAHIADgBIAEADIAAAAIgDABIgCgCgAhOA2IADABIAAgEIgCAAgABTArIAAADIAGgCIAAgDIgEAAgAgiAtIAAAAIgBgCgABTAiIAHAFIABgEIgFgHgAgqAgIAHAGIABgCIgHgFgABLAeIACAEIABgBIgBgBIADgBIgCgFIgCAAgABbAeIABAAIABgEIgBAAIgCgBIgCABIADADIABgCgAgtAcIADgCIgGgFIgBAAIgEgBIgDABIAAAFIAEgBgABEAXIABgDIgHgCIgIgEIgBAAIAAAEIgDAAIADADIAFgBIAGACIABgBgAgpAPIAGAEIABAAIAAgBIAEgCIgEgBIgGgGgAA3ALIABAAIgBgCIgBAAgAgjAIIADADIADgDIgFgBgAAsACIADgEIAEACIACgDIgDgCIgEACIgEgCIgBACIgEgBIADAEIAAABQAAAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAIAAAAgAgEgFIACAFIAFAAIgDgIgAAdgHIADADIABgCIgBgDgAgRgHIAJACIgGgGgAAUgIIAEACIAAgDIgDgBgAgbgLIAEAEIADAAIAAgFIgEgCgAAjgLIACAAIgDgBgAgngOIAFADIAFgBIAAgDIgFgCIgDAAgAALgNIABgDIgDAAgAgMgOIABgBIACAAIgDgCgAAEgRIAAABIABgBIAAgBIgBABgAgxgRIABAAIAAgDIgBAAgAAMgUIAEAAIABgCIgDgHQgEgFgBABQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAIAAACIgBAAIgFgEIgFAEIABACIgBAFIAGAEIgDgFIABAAIACABIADgDgAgzgbIAFAHIAAgJIgEAAgAgbgfIABAGQABACAEAAIACAAIABgCIgIgIgAglgbIACADIACgBIgDgEgAg0gjIADADIALgCIgCgGIgBgBgAgOgiIAEABIAAgBIgCgHIAGAAIAAgIIADABIADAAQADAAAAgDQAAgGADACIADgEIAIAFIADgFIgEgEIACgEIAAAAIADAFIADgCQAAgDADgDIADgGIAEADIAGgDIgFgIIACAAIADgDIgDgEIABgFIAFAAIAAgDIAEgDIgEgEIABgEIgCgBIACAAIACgDIgCgBQgFgCAAgFIgDgJIgGgEIgEADIgBgBIgEABIAAACIgDgCIABgCIgCABIgEgGIgEAGIALAQIgDADIgFgCIAAgDIgGgFIgDABIAAACIgCAAIgBgCIgHABIAAAFIADAEIgDgBIgDADIgGgDIgBABIgBgFIgEgEQgCACABAEQAAAEgDABIACACIAHgDIAAAGIACAAIAGAFIgCADIgGgEIADgBIgDgCIgCABIAAAJIACAFIADABIgBADIgDAAIgCgDIgHACIgEgDIgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAABABIgCACIAEAFIADAGIgCACIgDgCIgEACIABgCIgGgGQgCACgDABIgGADIABAFIAGAAIAFgFIAEAIIgEAIIACgBIABABIgEAAIgDAGIAEAEIAFgBIAEABIgBAHIAGgDIAFgEIAAAEIADgDgAg8g1IAHAFIADgDIgDAAIgFgDgAgzg5IACAFIAAAAIAFACIADAAIgFgGIgCACIgBgEIAAAAgAAYg8IgCACIADAAIAAAAIAAgDIgBABgAAog6IABAAIABgBIgCABgAgvhIIACAAIABgCIgDAAgAglhNIAAABIABgCIgBABgAg1hTIgDACIADABIACAEIACgEIgEgEIAEgDIgBgBIgEACIgCgBIgCACIACAAIgCACIACACIAAgDgAgchfIAFAEIAAgDIAAgCIgEgCgAgohoIgDACIAAADIAGABIAFADIACgBIgEgGQgCgCgDAAIgBAAgAgvhnIAAABIABgBIgBAAgAAzh0IACADIACAAIAEgDIgFgCgAgoh6IACACIAFgCIgEgGgAgMh9IAEACIgCgEgAgaiBIABAAIACgCIgBAAgAAAiFIAAAAIABABIADgBIgEgEgAAWiLIACAEIACgFIgBgBgAADiMIABAAIgBgBIAAAAgAgfCMIgBAAIACgDIAAADgABeBqIAAgEIADACIADgBIABAAIABAEIgDADgAgyBnIABAAIAAABIgBgBgAhbBoIABgBIAAABIgBAAgAhyBkIgBAAIAAgBIACAAIACABIgBAAgAhuBkIAAgBIgCgCIABgDIACAAIABAGgAh2BhIADgBIABADgABxBgIgCgDIADADgAhnBFIgBABIgDgDIgCACIgCgDIADgCIAHAGIAEgEIADgBIACACIgGAGgAB0A/IADADIgCAEgAhTAdIADgEIADACIgDAFgAgKATIgBgDIADgGIAHAHIgCABIgDgBIgCACgAgSAOIAFAAIAAADIgCACgAhJALIAAgCIADgBIAGADIgBAHgABYAFIAEgEIACABIgCABIAEACIgCADgABBgPIABgFIAGAAIAFACIgBADIgDgBIgFABgAA+gPIAAgBIAAAAIAAABgAA+gUIAAAAIAAAAIAAAAgAA0gVIACgEIACABIgBADgAAmgZIAAAAIAAABQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAgAABgaIABgCIAAAAIgBACgAAcgcIACgFIACACIAAACIgCABgAhJghIgBgBIgBAAIACgCIACADIgCAAgAAagpIAAAAIACAAIAAAAgAAkgwIACABIgCABgAACg2IAAgBIABAAIgBABgAA2g9IAAAAIACADIAAAAQAAAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAgBgAA3g+IAAgCIADgCIABAAIgCAEgAhGhHIAEAAIgCABgAgKhpIAAgBIABgBIABACIAAABgAg5hzIABgCIADAAIABABIgBACgAAAh3IACACIgBAAgAgoiGIABgBIACAAIAAABIgBABgAgliOIABgBIABABIABgBIACAAIgDADgAAMiWIAAAAIABABIgBgBgAAnieIACgCIACABIgCADg"),
            this.shape_6.setTransform(290, 160),
            this.shape_7 = new e.Shape,
            this.shape_7.graphics.f("#CC0000").s().p("AguCjIAHAIIgHACgAgSCmIADgKIgGgGIgJAFIgHgGQgGABABgFQABgFgLADIgEgDIABgFIAEACIAFgFIgHgIIgBgFQAEgCAEABIAGABIAKgCIgMgLIADgFQADAAADgEIAFgHIAAgEIAAgGIABgGIAGgGIAFADIAJgEIABgDIgIgEIgCgFQABgCADgDIAEgDIABgJIACAAQAEAAABADQABACAEABQAEAAADgEIADgGIgBABIgEAAQgFAAgFgEIgFgHIAAgHIgFgOIAOAJQAHAAAEgEQADgGAAgEQAAAAAAgBQAAAAgBgBQAAAAgBAAQgBgBAAAAIgHABIABgHIAIADIAHgFQAEgFgDAAIADgGIgJgIIAHgDIAEgJIADgIIAPgIIgHgDIgBgIIAIAEIAPgHIgKgEIACgEIAAgCIgKgKIgJgKIgDAEIgBAAQgEAAgDgCIgGgDIADgFIgEgDIACgHIgBgDIgLgFIAAAIIgFAEIgHgFIAAgGQgBgEgDAAIgGACIgGAEIAEAJIAAAGIgFACIgHACIgFAQIADAMIgQgHIABAJIgBAFIAAAFIgFgDIgDAJIgGAAIgIAHIAAAIIAOAEIACAHIgMAFIALADIgCACIAJADIAKAKIADgDIAMAHIADgDQABgBABAAQAAAAABAAQAAgBABABQAAAAABAAIANACIAAgDIAFgGIACAGIgBAMIgUgCIAFAVIAAABIgDgCIgFgCIABANIgFABIgDgEIgDAAIgDgGIgCgHQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAIABAIIgBAAIgJgCIgKgDIgBgJIgDgDQgDgBgDABQgEAAgCABIgDgDIAGgIQACgGABgGIgIgDQgBAAgBAAQgBAAAAABQgBAAAAABQAAAAAAABIAAAHIgDAGQgKABgBgGIgBgOIANABIACgHIAEgFIgBgEIgNgDIgFgFIADgJIAIAEIABgDIgEgJIAEAAIADgEIAEACIgBgFIAHACQAAgEADgBIAFgBIgFgEIACgFQgDgFAGAAQAIABgCgFIgDABIgFgEQABAAAAAAQABgBAAAAQABgBAAAAQAAgBAAAAQADgEgBgCIAAABIgDgDIARgIIgBgEIgFgHIADgFIAJgBIAHAKIAEgBIACgEIgFgCIgBgGIgCgGQAAAAABgBQAAgBAAAAQABAAABAAQABAAABAAIAHACIAGgBIACgHIAKAAIACgDIgGgIIACgBQAEAAABgDQAAgEADAAIAOAHIAGgDIABgFIAHgFIAFAMIAEABIACADIAJgBIAIAFQAGAEgFADIAAADIABACIAKgCIAFADIABAGIgHACIADAHIAFgFIAGADIgDAFIAMABIgFAHIAHAHIAAAKIgFAFIAAAGIgIABIgBAIIgEAGIAFAXIgEABIgFgEIgEAHQgCAEAAAFIABACQAFAFACADIACALIgBADIgGgHQgGgGAEgBQgEgCgEgJIgHgNIgFAKIAJAJQAEAEACAGIgDADIgDgFIgFgCIgFAHIAGADIAGAFIgBAHIgGgDIgKAGIAHABIACANIgLADIACAEIAHACIABAJIgGACIgIgCIAAADIgFALIAGAEIgDAJQgBAEgEAFIgBALIgFgEIgEALIgFACQgDAAgEgCQgDgCgEgBIAAACIAFAJIAEAJIgEAKIgGAFIABAGIADAJIACAJIgBADQgBABAAAAQgBAAAAAAQAAAAAAgBQgBAAAAgBIgBAAQgCAAgCACQgDACAAADIADAGIgFAHgAgGCMIgBgEIgJgCIgBAEIACACIAJAAgAgTCHIgGgGIADgKIgNAIIAIAFIAIADgAgJB/IAEgBIAAgEIgEAAgAgcBoIAFADIAHAAIAAgDIgIgFgAADBlIgHgJIAAAHIAEACIADAAgAgLBXIgGgKIgFAGIALAEgAgBBMIAGAEIAFAAIACgCIgMgHgAATBFIAEACIABgEIgEgCgAgBA4IAFAIIAGABIAGgBIgJgJgAAPA0IAJAEIACgCIAAgFIgIgDgAAbAcIgEgIIgCAHIAGABgAAFAcIgFgKIgBAFIAGAFgAAIAVIAGADIADgBIgGgHgAAZAJIADAFIAMgDIgLgHgAg1ALIAGAAIgCgDIgIgDgAgZAEIgBAEIAJACIABgJgAgrADIAFAFIADgDIgBgFgAg+gJIABAFIALADIAEgHIgFgHgAAqgCIgGgLIgCAAIgCAAIgDABIAHAJIAGABgAAighIgBAJIAEABIAEgCIgBgQgAhPg1IABAEIAGAAIAAgFIgBgCgABKg5IgEgIIgLADIALAFIAEAAgABDhHIAGgEIgEgDIgKgCgAg8hQIAEAGIAFgBIAAgBIgHgFgAg1hhIAJAKIAGgCIgFgLgABChdIAIAEIAFgDIgJgGgAAkhxIAEAEIADAAIAGgBIAEgCIgQgHgABFh5IgDgDIgGgCIAAAFIAJAAgAAYh5IAIgDIgJgGgAAKiMIgDgJIgCAHIAFACgAApiSIgOgLIgIAKIAWABgAgkCkIAAgEIAIABIgDADgAg5CjIADgFIgEgCIAAgIIAHAHIAAAIgAAIB0IAGgHIAEAGIgDADgAAUBiIADgEIAAgFIAHADIgFAIgAAiBSIABgGIAHgBIgCAIgAAoAvIAAgHIAIAJgAA2AKIAHgFIgEAAIgBgEIAHADIAEAGIgKAGgAgCAFIABgEIAEAGgAAGAEIADgEIADABIgCADgABDgGIAGADIgGABgAgmgUIAAgEIAEAGgAgxgeIADgCIAEAAIgBAHgAgzgtQgEgCgFAAIgBgDIAIgDIAHAEIAGAAIAEAEIgIAEQgDgDgEgBgAAcg8IAAgIIAIAIgAgsg8IAHgJIAGADIgGAGgABShBIAEgFIAGABIAAAJgABXhLIAFgFIAEAFgAAhhMIgCgHIAEADIAFAEgAAShPIgJgEIAJgEIAJAJIgJgBgAAehbIAJgDIAJAJIgFAEgAAVhbIgCgHIAHADIAAADIgCAFgAgbhlIAIADIABAHIgGACgAgQhmIADgGIAFAAIAGAAIgEAHIgEABgAAEhqIAGgHIACADIgDAHg"),
            this.shape_7.setTransform(290, 160),
            this.shape_8 = new e.Shape,
            this.shape_8.graphics.f("#CC0000").s().p("AhFCzIgDACIgIgGIgFABIgBgCIAFAAIAKgIIAGABIAAgLIgJgDIAAAHIgEAEIgDABIgKgEIgBACIgIgIQgFgEgGABIACgGIgEgDIAJgGIABgBIgLgIQgDADgDABIgIACIgCgKIACgEIAFABIAHgDIAIAJQAEgCgBgFIgBgIIAEgIIgGgBIgCADQgFgFgCgEIgHgLIAEgBIAEAIIAHgDIAMAHIAIgCIAAgEIgOgBIgDAAIgFgGIALgKIAJAFIAEgLIgCABIgKgBIgDgHIgJAAQgFgBgDgDIACgDIgEgJIgCgKIgHAAIgFgHIADgBQAKAAACAMQACAOAKgHIAOAEIAFgMIgIgCIgIAAIgEgJIADgEIAHAIIACAAIAJgGIgLgGIgDABQgDgEgEgEIgHgHQAFgCAFABQAFAAAEABIAPgHIgDgFIgCAFIgIgKIAGgKIADACIAGgFIgBgEIgJgCIgEgIIgGABIAFgJIABAAQAEAAADAEQADADAEAAIACgEIgGgNIABgDIgGgCIAAACIgFgGIAQgCIADgBQABADADADQAEABAEAAIAAADIAHgIQAEgCgCgFIALgJIgIgGIADgGIgGgCIgCAAIAAAAIABgDIgFgHIACAAIAXAEIAEgEIAHADIAFgEIgDgEIgFAEIgFgCIAFgPIAJACIADgCIAIAIQAEgDADgBIAHgBIAGAAIAMAJIAGAAIACgEIACgBIAJAGQAEAEgCAFIALABIAAgCIAHAGIAFgHIAAAKIAFADIAGgDIACAAIAAgEIgLgGIABgGIADACIADgDIgIgEIgBgJIAGgDIAIADIADgBIAIAKIAKgDIACAOIgJgBIgFAJIACAFIACACIgDgCQgEACgBAEQgBAEABADIgJgEIgJgFIgDADIADAEIACgCIAIAEIAJADIABAEIANABIAAAFIACgIIAGAEIgDARQAFABAGAFQAFAFAAAGIgKAHIABAEIAIAFIABgDIABAEIAFAEIgEAAIgOgGIgFADIAIAEIgIAMIgFgDIgHABIgBACIACADIgBADIgMgMIAFgEIABADIAFgKIAKACIACgBIgCgEIABgBIgBgGIgCgBIgFADIgFgEIAQgHIAAgBIgCgJIgNgJIgDABIgJgKIgJABIgIAAIgCgDIAGABIACgDIgLgSIgDAHIABADIgJAIIgIABQgEgEgBgFIAAgJIgEAAIAAgHIgMgEIgBADIgFgDIgBgDIgEAFIgHgEQgBAAgBAKIgCAMIgGgDIACgCIgFgHIgBACIgFgEIgFgBIgBAFIADAHQAFABADAFQABADABAFIgCABIgOgDIgDABIgHgHIgBAFIAIACIACAGIgDAIIgEAAIAAACIAFgBIAGAJIgCAGIgHgDIgEACIAAgFIgFADQABAEAEADIAGADIABAEIgGABIAAAGIgBAIIgBAIIADAEIgCABIgFgBIAAgEIAAgBIgDACIgBgBIAAACIgGACIACAIIgFABIgIgEIgBAEIADAAIAGAHIAIgIIAFAGIgEACIgHAFIgCgBIAAAIIgIAAIgGACIAGAMIgBAEIgEAAIgCACIgEgCIgGACIgCABIAKAHIADgGIAEAAIAJAVIgBACIgGgDIgEADIAGAIIgEAHIAIAKIACAAIgEAEIgEgCIgCABIgGgIIgEgCIgEADQABAEADADIAFAHIAJgDIAIADIABADIgDAGIACADIgHAIIAJADIAZgHIAEABIAMgEQAFgBAHABIACgDIAFAEIAFgDIAFABIACgEIgDgDIgOADIgDgHIAGgFIAFADIACgGIADAEIACgBIAGAAIAEgNIgGAAIgFgJIgCACIgCgFIACgEIAGAEIAFgIQAEAGAEAFIALAIIAAAFIAJAEIACgFIgGgDIAAgCQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBAAgBIACgCIAEABIgDgMIgCABIgJgHIgCAFIgGABIgMgHIAAgEIADgBIAMAFIAGgGIgIgFQgEgEgEgBIgGgMIACgCIAHAEIAJgEIAAADIABgCIAEgFIAIAHIAFgBIgGgEIABgBIABgCQgBgJgJAAQgKgBgBgJIAIACIACgCIAFgBIAJAEIABgDIAKAKQAFAAAFgBIAKgGIADgFIAIABIgFAOIABAFIACAAIAEgEIAFADIgCgDIACgBIACAEIgDAHIgCgCIgJAHQgDgDgFgBQgDgCgFgBIAAgDIgHgDIgDACIgFgBIgBAEIgDAGIABABIAOAFIACgCIAEABIAAABIAGAHIACgEQAEAAADACIAGAFIgIAEIgNgHIgDAGIAAADIAMAGIADAAIAGAGIgDACIAGACIgNABIgIAGQgEACgCAFIADACIgBAKIgHAEQgFACgDgDIgCAFIAEAGIgEADIgBAAQgGAAgHABIgMADIAKAIIgCAIQgDgBgFAAQgFAAgBgEIgBAAIgHAGIgMgDIgFAEIAKAJIAAAGIgOgBIgJgJIgCAKIALAJIgDAFIgHgEIgBAHIgFgBIAEgKIgJgFIgEANIAEgBIADAFIgMgDIAAADIgGAAIAAAEIADADIgDACIgEAAQgDAAgCgDIgCgHIgJgDIgIAFIAFAGIgCACIAFACIgDABgAgpClIgDABIAAABIAFAFIgDABIACAAIAFgBIAAgDIgGgFgAg7CQIAAADIABAAIAIACIABgDIgHgDgAgqCPIAEAFIAEgCIABgBIgFgGgAgKCQIgCgGIAAABIABAFIABAAgAhhCPIgBgIIgDACIAEAGgAgZCIIABAAIACAAIAAgBIgBgBgAgKCIIABAAIABgFIgCAFgAhdB3IgEAIIAFAHIAHgEIAAgMgAgXCDIgBgCIAAABIAAABIABAAgAhPBwIAHAHIADgDIgFgGIAAgEIgCADIgCAAgAAhBmIAAACIAGADIADgBIgBgEIgFgCgAA3BqIAEAAIgCgFgABFBTIACACIABgBIgBgCgAhGBIIABgEIAAgDIgCACIgHgDIgCAAIABAGIABgBgABGBEIAFAAIAAgDIgFAAgABAA/IAGgBQgGgJgGgEQgGgEgKgCIAAADIAIAKIACgBIAGABIACgBgAhZAuIAAAAIAGAAIAAgBgAAcAnIACACIABgCIgDgBgAhPAUIAAACIABABIAGAAIABgDIgHgCgAhSABIADADIADgCIgFgCgAhIgRIACAEIACAGQAEAAACACIAGACIABgDIgGgHIAEgBIgHgIIgCACIgFAAgAg2gSIAJAHIAGgEIgBgHIgCABIgEgEIgEAAgAgtgaIADgDIgCgBIgBAAgABrggIAAABIAEAAIABgCIgBgBgAhOg4IACAIIAEAAIAAAGIAFAFIAGgHIgJgFIgCAAIgCgHgAgtgqIADgBIgBgCIgDAAgAg0hBIAFgBIAAgCgAgbhRIAAgCIgCAAIACACIAAAAgAAihbIACAEIAEgGgAhVC1IABgBIABAAIAAABgAhkCtIgIgEIADgEIAGADQAEgBACABIADAFIgDAEQgEgBgDgDgAg5CvIAAgCIACACIgBAAgAAyB/IABAAIAAABIgBgBgAAuB+IAAgBIACAAIAAABgABRBuIAAgBIABAAIgBABgAiFBjIABAAIAAADQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBgAANBeIADAFIgDAAgAiFBNIgBgGIACABIAIgBIAGAEIgGAJgAhoBJIACgEIABABIgBAEgAh/A7IABgBIABABIgCABgAiHA6IABgCIAAABIAAABgABmA1IAAAAIAEADgABmA1IAAAAgAhvAkIACgCIAAADgABKAfIACgCIABAAIgBAFgABxARIAEACIgBAEIgFABgAAfAPIAAgBIABABIgBAAIAAAAgAh7AOIABgBIABAAIgBACgABMAIIgEAAIgBACIgHgFIgDADQAAgGgEgCIgIgEIgBAAIgDAEIAAgFIgEAAIgDABIgCgBIAAgIIgBgGIAKAFIAKAGIAEgEQABAEAEADIAGAFIAAgFIAIADIABADIgDAEIAEAGIgBACgAAqgGIACgBIgCAAgABzAGQgDgCgBgEIADABIAHgDIAAACIADACIgBAEIABADIgFACIgEgFgAAfAHIABgGIACAEIAAADIgDgBgAh8ACIAJgCIAFAAIgBACIgGAAIgCADIgEABgAAnAAIAAgCIABAAIgBACgAAggBIACgDIAAABIAAABIAAACgAhtgMIgCABIgEgFIAJgFIAJAEIABAEQgEAAgCACIgGAEgACAgNIACgBIAAABIgCABgABEgPIADgDIAFADIACgDIgIgQIACAAIAQAJIACgBIAEAEIgEAAIgEAGQgDABgEAAIgDADgAA2gUIgJgCIADgFIgHgHIAOAEIAFAGIgEAEgAA5ggIAEgBIgCAGgAhtggIAAgDIgFgDIAHABIAGAAIAAAEIADADIgCABgAA8goIgJAGIgCAAIABgDIgBgHQgCgEgFgBIABgCIAJABIADgCIAGABIAAgCIAEABIADgBIAEAEQADADADAAIAGgDIACAAIADgCIADACIAAAHIgJACIgFgCIgEgDIgCABQgBACgDADIgHAFgAAmgoIAAgDIAFACIgBADIgCAAgAAhgwIABgBIABAAIgBABgAAhg5IABgEIADgBIAEAFIgEAGgAB9gzIACgGIgEgDIAAAAIgDgFIALADIAAABIAEAFIgIAFgAhXg2IAAgBIACgBIAAACgAAthBIAEgDIAFAGIABACgAhEhGIgHgCIgEgEQABgEAHgCIAKgEIAGABIgDAKQgDAEgBAGQgCgEgEgBgABshTQABgEADgCIAGgFIAGAGIgGAJgABphWIADAAIgEAEgABshYIABgCIAAAAIAAACgABChpIABgBIAAACIgBgBgAB5hsIgDgHIAFADQAEABAAAEgABDhvIACgBIAAABIgCABgAA1h1IgEABIgEgEIgFADIgKgDIABgCIgFgDIgEgDIgJAGQgCgFgEgBIgHgEIgEAEIgGAAIgDACIgCgGIgCgFQAEgDAEAAQAFgBADgDIABABIABACIADACIAFgCIAAADIABADIAIgGQAGAAgCAEQgCAHAMgBIAFgEQALABADADQACACAEALIgDADgAA/h1IABgDIAEADIgFABgAgth9IAAAAIABADIgBABgAgfh/IADAAIgCACgAgoiHIADgFIAKAAIgEADIgBAGgAA+iMIAHABIgFACIgHACgAAyiJIgBgCIABgCIAEACIgDACgAgciPIACgBIgBADgAAXiUIgDAEIgJgHQgFgEgGAAIAAACIgBgLIAFgEIAGADIACAAQACAFAHABIALAAQADAEAFACIAJAEIAAADIgDACIgEAAIgJgHIgDAIgAAUidIABAAIABgBIgBAAIgBABgAA0iYIAFAAIgEACIgBADgAgTiWIACAAIABABIgBABgAAqimIABgCIgHAEIgBgBIgBAEIAAAAIAAgEIAAAAIgBgBIACgHIgEgEIAKgIIgCAEIAEAEIADgDIAEAAIACAFQgCAFABAGIgBALgAAkieIABAAIAAABIgBABg"),
            this.shape_8.setTransform(304, 160),
            this.shape_9 = new e.Shape,
            this.shape_9.graphics.f("#CC0000").s().p("AgbCkIACgFIAFAGIgBAAIgGgBgAgzCYIgBAAIAGgKIAFAGIgEAEgAgQCRIABgFQgCAEgFADQgEACgFAAIgGgDIACgGIgGgKIABgCIAHgCIAEAFIAFgBIABgLIgDABIgFgFIABgGIgBgGIgLgFIAAgBQgBgHgDgFQgDgGAAgGIAGgBIACAGIACAGIABgFIAIACIABADIgCAIIAIACIgEgFIADgEIgCgNIgLgHIAAgLIAIgBIAHAEIAHgLIgJgBQgEgBgEgCIAGgFIgCgHQgBgEABgDIgHgGIACgFIAHABIAEACIAEAAIACAFIAFAEIAIgEIgIgFIgDAAQgDgGgFgBQgFgCgDgFIAEgBIALADQgCgGgDgGQgFgGgFgFIABgHIAGACIAGACIABALIAFAHIAEACIgBgMIAEgFIgIgHIABgHIgBgEIgBgEIgFACIgEgCIADgHQACgDgBgDQAEgFAGAAQAFgBAAgIIAAgDIgIADIgDgDIADgJIgGgHIgCgKQgFgEgCgGQgCgHgHgEIgBgJIAAAAIAGgEIAGAKIAAAGIAGAJIAJgCIgCgGIgJgFIAAgKIAGgBIAAgHIgCgIIAEgBIAFADIAEgCIAAADQAHAAADACQADACAEAIIAIAEIAAgBIgEgLQAFgJgBgEQgBgFANAAIAFAAIAEABIAEAHIgBAGIADAAIADALIgFAEIgFgNIgKgGIAJAMIAAAGIgDACIgDADIAHAEIAFAMIgGACIACAHQABAFADABIgDAFIgFgCQAAADACADIACAGQABAFgJACQgHADgEADIADABIABADIAIAFIgCAKIgHgDIgEAaIADAKIgBAIIgKABIAGAEIgHANQABAEACADIAGAHIgIACIgDgGIgGAIIAHAFIgCAFIgGgDIgDAGIAHAJIABAKIgDAHIgEgDIAAAEQAAADgBAEIgCAGIgDgDIgCAKIABAFIADgGIAHAEIgDAKIAEAFIgEAPIgFgEIgCAKIgFAKIACAIIgEACgAgLB6IgBgLIgCAAIgFABIAGAIIACACgAgTBoIgBgEIgDACIADACIABAAgAgRBKIgDgHIgCAEIAFADgAACA5IgCgFIgDADIAFACgAgJAqIgEgKIgGgBIgDACQACAEADABIAIAEgAACAHIACACIACgBQADgEAAgEIAAgHgAgEgpIAEAKIgCAIIAHgCIgDgKIgDgJgAAJgzIADAFIAAAFIACACIAHgLIgEgHgAAahRIgGgOIgHAHIANAHgAgLhgIAJAJIABgHIgCgIgAAhhlIgFgMIgCAGIAHAGgAAPhoIgBgHIgEAGIAFABgAgIh/IAIAHIAFgFIgFgFgAgsB3IgFgHIAHgBIAEAHIgCACgAgzBdIAFAFIgDADgAAFBVIADgEIACAEIgCAAgAgoAiIACgEIAEAIgAAXAHIAEgEIAEAEIgFACgAgpACIABgDIAHADIgBADgAAdggIAEgFIgCALgAgag+IADgEIAEADIgEACgAgXhMIADgDIABAEgAgdhSIgNgHIAJgEIAKADIgFAIgAgzhpIAJgIIAIAIIgHAFgAAAiaIAEgEIADAKgAAOigIgBAAIADgEIABAEg"),
            this.shape_9.setTransform(278, 161),
            this.shape_10 = new e.Shape,
            this.shape_10.graphics.f("#CC0000").s().p("AgbCkIACgFIAFAGIgBAAIgGgBgAgzCYIgBAAIAGgKIAEAGIgDAEgAgQCRIABgFQgDAEgEADQgEACgFAAIgGgDIACgGIgHgKIACgCIAHgCIAEAFIAFgBIABgLIgDABIgFgFIABgGIgBgGIgLgFIAAgBQgBgHgDgFQgCgGgBgGIAGgBIABAGIADAGIABgFIAIACIABADIgCAIIAHACIgDgFIADgEIgCgNIgLgHIAAgLIAIgBIAHAEIAHgLIgJgBQgEgBgFgCIAHgFIgBgHQgCgEACgDIgIgGIACgFIAHABIAEACIAEAAIACAFIAFAEIAIgEIgHgFIgEAAQgDgGgFgBQgFgCgDgFIAEgBIALADQgBgGgEgGQgFgGgFgFIABgHIAGACIAGACIABALIAFAHIAEACIgBgMIAEgFIgIgHIABgHIgBgEIgBgEIgFACIgEgCIADgHQACgDgBgDQAEgFAGAAQAFgBAAgIIAAgDIgIADIgDgDIADgJIgGgHIgCgKQgFgEgCgGQgDgHgGgEIgBgJIAAAAIAGgEIAGAKIAAAGIAGAJIAJgCIgCgGIgIgFIgBgKIAGgBIgBgHIgBgIIAEgBIAFADIAEgCIAAADQAHAAADACQADACAEAIIAIAEIAAgBIgEgLQAFgJgBgEQgBgFANAAIAFAAIAEABIADAHIAAAGIADAAIADALIgFAEIgFgNIgKgGIAJAMIABAGIgEACIgDADIAHAEIAEAMIgFACIACAHQABAFADABIgDAFIgFgCQAAADACADIACAGQABAFgJACQgHADgEADIADABIABADIAIAFIgCAKIgHgDIgEAaIADAKIgBAIIgKABIAGAEIgHANQABAEACADIAHAHIgIACIgEgGIgGAIIAHAFIgCAFIgGgDIgDAGIAHAJIABAKIgDAHIgEgDIAAAEIgBAHIgCAGIgDgDIgDAKIACAFIADgGIAHAEIgDAKIAEAFIgEAPIgEgEIgDAKIgFAKIACAIIgEACgAgKB6IgCgLIgDAAIgEABIAGAIIADACgAgTBoIAAgEIgFACIAEACIABAAgAgRBKIgDgHIgCAEIAFADgAABA5IgBgFIgDADIAEACgAgJAqIgEgKIgGgBIgDACQACAEADABIAIAEgAABAHIADACIACgBQADgEAAgEIAAgHgAgEgpIAEAKIgCAIIAHgCIgEgKIgCgJgAAJgzIADAFIAAAFIACACIAHgLIgEgHgAAahRIgGgOIgHAHIANAHgAgLhgIAJAJIABgHIgCgIgAAhhlIgFgMIgCAGIAHAGgAAPhoIgBgHIgEAGIAFABgAgIh/IAIAHIAFgFIgFgFgAgsB3IgFgHIAHgBIAEAHIgCACgAgzBdIAFAFIgDADgAAFBVIADgEIACAEIgCAAgAgoAiIACgEIAEAIgAAYAHIADgEIAEAEIgFACgAgqACIACgDIAHADIgBADgAAcggIAFgFIgCALgAgag+IADgEIAEADIgFACgAgXhMIAEgDIAAAEgAgdhSIgNgHIAJgEIAKADIgEAIgAgzhpIAJgIIAIAIIgIAFgAAAiaIAEgEIADAKgAAOigIgBAAIADgEIABAEg"),
            this.shape_10.setTransform(304, 160),
            this.shape_11 = new e.Shape,
            this.shape_11.graphics.f("#CC0000").s().p("AhcCaIgEgCIACgHIACABIABgBIABAHIAEgGQgEgEAAgGIAAgLIgBgBIgGACIADAIIgEgEIgBABIgKgHIABgGQAFgDAEgBQAFgDABgFIABACIAJgBIAAgEIACgCIACAGIgDABIACABIAGgGIgHgDIgBgDIALgJIAFAFIAFgBIACgBIgJgMIACgBIAHADIACgFIgFgJIAFgEIADACIAFgFIAEABIABgBIgCgIIACgDIAJAHIACgIIAGgDIgDgCIgEABIgGgEIAFgDIAEABIALgEIAAgFIgGgHIACgHIAKAHIADgEIACAAIACgCIgDgIIAFgIIAFABIAEgCIgDgLIADgDIAFAHIAEAAIgBgGIgDgCIAGgIIgDgEIABgDIgBgBIgEAEIAAgCIgCANIgHgKIABgDIgBgDIAAgEIADADIACAAIABAAIADgFIgCgFIACgFIAGAHIAGAJIADABIgBgCIAIgJIgJgIIgEACIgCgCIAEgFIgCgIIAHADIAHgEIgIgFQAAgEAAgEIgCgIIADACIAEgEIgFgCIgGADIAEgDIgEgEIACgEIgGgHQgDgCgCgFIgCAFIAFALIgDABIgIgEIAAgEIgBABIgEgCIgHAEIgGgDIgDAFIADAEIgEADIgEgCIgEgJIABADIgIgCIgBgEIgCACIAJAJIgDgBIAAAFIgEADIgDgDIgFAGIgFAGIADAEIgCABIgFgEIgEABIgCgBIgBgIIgEgBIgBABIgFgIIABgFIgIgGQgDgDAAgFIAAgCIAIABIAGAGIgDAEIAHAJIAAgEIACgBIAAAEIADgDIgDgFIACgEIAGgBIAFAEIAEgFIAFAEIADgDIgHgFIgBAAQgGAAgEgFIgHgLIADABIABgBIAFADIADAAIAKAMIAFgGIgCgEIABgLIgEAAIAAgDIAFgDIAJALIgDAAIgDAJIADADIAFgLQACgFAEgFQAEABADAEIADAHIAEgEIgEgDIAGgEIABAAIADgHIAOALIAHgGIAKABIgCAEIAHADIADgKIAGADIADgDIgBADIABABIABgBIAFAAIAAAIIgDgEIgEgBIAAADIARASIgJAHIADANIgBAAIgBAAIADAIIAEAIIgCAJIgCgCIgIAEIADAJIgFAIIABgCIgCgDIgBADIACAKIAFgCIAAACIAGAHIgDADIgIgCQgDgBgCgEIgFAEIAHACIAEAJIgDAEIgEgCIgBACIgBgCIgEASIgEADIgFgEIgDAAIgDgCIgBABIACAFIACgCIgBAEIAIAIIgCADIgIgCIgCgGIgCACIAFAHIAAAGIAHAGIgDAGIAEgCIACABIgGAEIgEgDIgDAFIgBgEIACgDIgDgEIgMACQACADACAEIADAIQgNAAgBADQgBABAAALIAAADIAAACIgFgFIgDACIAEACIAAAEIgEAAIgEAIIgHgFIAAAAIgGgFIgCACIAHAJQADAEADAGIADgIIACgBIAFADIAEgGIAEABIAAACIARAAIAGAKIAGgCIgDgIQgCgEgEgDIADACIAAgCIAHAHIgBAAIADAEIACAAIAKgHIACADIADAAIgBAHIgCgBIAAABIAHAGIABgBIAHAKIAHgGIgEgEIAAADIgCgCIADgGIAGACIgCADIABABIAEAAIABgFIgBgDIACAAIAEABIgBABIAIAMIADABIgEAEIgCgBIgBABIAHAJIAEgLIgCgHIABABIAFgCIAIAIIAAgDIAEAHIgCAFIgJgIIAAABIAAACIgFgDIAAACIAIAGIAAACIgBAAIgCgBIgDABIAFADIAAACIgDADIgBAAIgEACIABADIgCACIgDgEIgGACIgBgDIgDACIACACIgBAFIACADIgBAEIgDgHIgCAAIgEgCIAAgEIgDgEIAAAHIgFgBIgIgHIAAABIgDgKIgEABIgDgKIgJAFIAAADIAKACIgBACIADALIgGgFIgGACIgCADIgJgKIgCABIgEgDIgBABIgDgCIgBAEIgCABIgFgFIgDAAIgDAIIgFADIgDgBIABADIgGAHIgFgFIgCAAIAAAEIgEAAIgBgDIACgLIgIgCIgBADIABAIIgFAAIgFgEIgEADIgIgCIABALIACgCIABADIgGAAIgHACIACAJIgFgBIgGAFIgPgHIgEAIIgDAIgAg7CLIgCgDIgBACIABAAQAAABABAAIABAAIAAAAgAhGCIIAEADIABgCIgCgCgAhHCBIgBABIACAEIACAAIACgHIgCgBgAhkB7IABABIAFgCIgBgCgAhSB7IgBgBIAAABIABAAIAAAAgAhTB6IgCgDIAAAAIABADIABAAgAgyB2IABABIAAgCIgBABgAgOBsIACADIgEAAIAIAHIABgCIgGgLgABIB1IgFgIIgDAAIAAADIAIAFgAg6BvIAEABIAAAAIABgCIAAgCIgDAAgAgjBsIACADIAFgDIgGgDgAAfBsIACACIADgBIgEgCgABNBtIAAAAIADgCIgCgBgAgCBkIACADIAAAAIAAAFIAAAAIAIgCIACgDIgBgDIgDABIAAADIAAABIgCAAIgFgHgAguBqIAAAAIAAgDIAAAAgAgkBoIACABIAAgCIABAAIgBgDgABKBkIACADIABAAIAAgDIgDgCgABRBiIgBgIIgDADIABAFIADAAgAAiBhIABABIABAAIgBgCgAgMBiIAEgEIgEgCIgCABIgFgGIgCACIAAgBIgCABIABAJIACAAIADgEgAgDBTIADALIAEAAIABgJIgFgEIgCAAgAApBWIAEAHIADgBIAAgCIgFgEIAAgBIAEAAIADgCIAAgCIgBAAIAAABIgEgCgAAUBaIADADIACgCIgCgEIgCAAgAAMBVIgDACIABACIAGgEIgDgCgAgoBYIACgCIgCgCgAgWBXIAAAAIAAgDIAAAAgAgUBSIAAAAIAAgCIAAACgAAvBQIABAAIAAgBIgBAAgAAoBQIgBgBIgBAAIABABIABAAgAg1BEIAEAEIADgCIgCgFgAgmA9IgCgDIgBAAIgBACIAEABgAAMANIAAAFIACAAIABgDIAAgDgAAmgSIgBgDIgBAAIACADIAAAAgAAhg+IACADIAEgBIgGgFgAg6hmIACABIAAAFIgEADIADAEIADACIABAAIACgGIACgFIgDgCIACgBIgDgEIgDAAgAAyhbIADgDIgCgEIgCAAIAAACIgEgBgAgWhnIABADIABgBIAAgEgAAVhpIADAAIABgCIgCgCgAgIhxIAAAGIAFACIADgDIgHgFgAgVhqIADgFIgFAAgAAXhxIgCgBIAAAAIACABIAAAAgAABh0IABACIACgCIAAgCgAAXh0IAAABIAIgCIgHgHgAAPh5IAEgCIgCgDIgCACIgDgBgAAEiBIAEAGIABAAIAAgDIgFgFgAAEiOIAAABIABgBIgBAAIAAAAgAhSCYIAAgCIABAAIABACgAhlCRQAAgBAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAIgCgFIAEABIABADIADgDIACAIIgCABQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAgBAAAAgAhwCRIgFgFIABgEIAFAAIAAAEIgBADIACACgAgiCFQgBgEgDAAIABgDIACADIAEAAIABAGQgBAAAAAAQgBAAgBAAQAAgBAAAAQgBgBAAAAgAhcCHIABgBIAAABIAAAAgAA4CBIgFgFIAAgBIADAAIACABIABgBIgBgEIACgCIAEAGIgEAKIAAgDIgCADgABhCFIgCgHIgCgGIAAAAIADADIABAAIAFADIABgBIgEAIgAAKCBIgCACIgCgCIAEgCIACADIAAADgAAjB8IAEgEIADACIABAEIgEABgAgWB8IgCgCIABgCIADADIgDAEgAAMB7IADgDIABADIgCADgABuBzIACgEIABAFIAAABgAB0BpIABgBIAAABIgBABgAAwBlIABABIAAABgABfBgIABgCIAAAAIAAACgAA9BXIACgCIACACgABXBXIAAgBIACAAIAAABgABBBSIgBgBIACgDIACAEgAA7BMIABgBIAAADIgBgCgAAUBGIAAgBIABgBIAAgBIACADIgBACgAAPA5IgCABIgFgGIAFgDIAEAJIgBACgAARA6IAAgDIADAAIAAADgAACAzIAAgBIACABIAAABgAAiAHQACgCACgDIABgDIACgBQgBACABABQACAEAEAAIAAACIgDABIgDAFIgCACgAgQAKIABgCIgDgDIAFgCIACAGIgBABgAA0ABIgBAAIgBgBIABAAIACABgAAAgCIAAAAIAAACQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAgAgMgHIADgBIgDgBIAAgBIACgDIAGAHIgEAEgAgFgsIACgCIgCgDIAFgDIAEADQgEAAAAAFQAAABAAAAQAAABAAAAQAAABAAAAQgBAAgBAAgABFg0IgBgCIgDABIABgDIgCgEIAAAAIAEAAIgBACIAEAEIAAABIgCACgAhHg6IABgBIAEAEIgCADgAhVg1IgBgCIABgEIADADIgBACIgBABgAAAhBIgBgHIAFADIAFAJIgDAGgAhhhEIACgDIACgBIAAABIAEAEIAHgEIgDgHIADgCIAFAEIAGAFIAEgCIABADIgFACIgEgBIgCABIgEAAIgCABIgDAAIAAAEIgDgDIgBACIACADIgEABgAg/hDIAEgBIACACIgEABgAAFhIIABgFIAAAAIADgCIgGgJIACgCIADABIAAgCIAAAFIAFAIIADgBIAAABIAEgDIAAADIgEAKgAg8hFIAAgCIACACIAAABgAgwhHIAAAAIAAACIAAgCgAhnhMQgDgCAAgCIAFgEIAAABIABABIADgCIAAgCIAGgDIAFAKIgFgEIgDAEIACACIgIAGIgDgFgAhChJIADgDIAAADIgBgBIAAACgAgEhPIABgDIABACIACACgAhJhUIACAAIgBACgAA+hXIAAgGIACACIAJgHIACABIgBADIABADIgEABIgCgBIgCABIABADIAAADIAAAAIgDAAgAgHhXIAAAAIAFgHIACAAIAAABIgBACQAAAAAAABIAAADgAhUhdIgJgBIABgHIABgGIAKALIgBADIACACIgDAEgAgeheIAAgBIACABgAhDhsIAAgBIABABIgBABgAhAhxIABgBIABABgAgOiLIAFgDIABAAIAAABIgDADgAAXiQIABgBIAAACIgBgBgAAOiZIAGADIAAABIgEABg"),
            this.shape_11.setTransform(278, 161),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape,
                p: {
                  x: 290
                }
              }]
            }).to({
              state: [{
                t: this.shape,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_1,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_2,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_3,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_4,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_5,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_6,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_7,
                p: {
                  x: 290
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_8
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_10
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_1,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_2,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_3,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_4,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_5,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_6,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_9
              }, {
                t: this.shape_7,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_11
              }, {
                t: this.shape_8
              }]
            }, 1).to({
              state: [{
                t: this.shape_11
              }, {
                t: this.shape_10
              }]
            }, 1).to({
              state: [{
                t: this.shape_11
              }, {
                t: this.shape,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_11
              }, {
                t: this.shape_1,
                p: {
                  x: 303
                }
              }]
            }, 1).to({
              state: [{
                t: this.shape_11
              }, {
                t: this.shape_2,
                p: {
                  x: 303
                }
              }]
            }, 1).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(278, 145, 24, 31),
      (t.mcnotice_bg = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AMIklQADABADACQADADACACQAJAGAGAJQADAFABAFQADANAFANQACAFAAAEQABALABALQAAAIABAGQAAAMAAAMQAAALAAAKQAAAQAAAQQAAAQAAARQAAAJgBAIQgDAOgBAPQgDAXgFAWQgBAIgBAHQgEAUgGAUQgIAdgMAZQgCABgBACQgDADgDADQgOAPgSABQgGAAgGABQgKACgKABQgJABgJABQgNAEgOgBQgqgBgoAFQgKABgLgCQgIgBgIAAQgDABgDABQgGABgGAAQgOgBgIALQgBACAAADQgBAJgEAIQgCAFgDAEQgHAKgFAMQgDAHgEAGIgBAAQgHANgGAOQgBADgBADQgDAKgCAJQgIAdgSAXQACgRgBgSQAAgRABgTQAAgEAAgFQABgIABgIQAAgEABgEQABgGABgHQAFgggCghQgBgDAAgBQgTgDgTAAQguAAgtABQgWAAgWAAQgxACgxAAQgeAAgeAAQgwACgwgBQgTAAgUgBQgJgBgIgBQgwgFguAHQgSADgSACQgYACgYAAQgcABgcAAQgnABgoAAQgwAAgxABQgyABgygFQgMgBgMgCQgQgBgQAAQgvgBgugHQgLgCgLABQgbAAgVgPQgSgNgEgVQAAgDgBgEQgBgIgCgGQgBgHgBgIQgFgjgBglQgCgyABgyQAAgKAAgLQAAgxAIgvQABgFAAgFQADgCAAgCQADgHABgHQABgFABgFQACgIACgJQABgCABgBQAFgFAGgGQAIgIANgDQAHgCAIgDQAHgCAIgBQAEAAAFAAAL8ksQAGACAGAFArOk5QALgDANgCQArgJAuABQAxABAxgCQAaAAAZgBQAYgBAYAAQAtAAAsgCQAUgBAVAAQAsAAAtAAQAvAAAvAAQASgBASgBQAsgEArABQAxABAyAAQArAAArgBQAYgCAYAAQAvAAAvABQAPABAOAAQAwAAAwADQAzAEAzgBQAbgBAbADQAwAHAvAIQAHABAFAEQACABACABQALABAFAFQAAAAABABQABABACABQAEACAFAD"),
            this.shape.setTransform(492, 39),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f("#FFFFFF").s().p("AGmErIACgRIABgIIACgNQAFgggCghIgBgEQgTgDgTAAIhbABIgsABIhiABIg8AAQgwACgwgBIgngBIgRgCQgwgEguAGQgSADgSACQgYACgYAAIg4ACIhPAAIhhABQgyABgygFIgYgDIgggBQgvgBgugHQgLgCgLABQgbAAgVgPQgSgNgEgVIgBgHIgDgOIgCgOQgFgkgBgmQgCgwABgyIAAgWQAAgwAIgvIABgKIADgEQADgHABgIIACgJIAEgRIACgEIALgKQAIgJANgDIAPgEQAHgDAIAAIAJAAIAFACIAYgGQArgIAuAAQAxACAxgCQAaAAAZgCIAwgBQAtAAAsgBIApgBIBZAAIBegBIAkgCQAsgDArAAIBjACIBWgCQAYgBAYAAIBeABIAdAAQAwAAAwAEQAzADAzgBQAbAAAbADQAwAGAvAIQAHACAFADIAEACQALABAFAFIABABIADACIAJAFIAGAEIAFAEQAJAHAGAJQADAEABAFQADANAFANIACAKIACAWIABAOIAAAYIAAAVIAAAfIAAAiQAAAIgBAIIgEAbIgIAwIgCAOQgEAVgGATQgIAdgMAZIgDADIgGAGQgOAPgSABIgMABIgUADIgSADQgNADgOgBQgqgBgoAFQgKABgLgCQgIgBgIABIgGABIgMABQgOgBgIALIgBAFQgBAJgEAIIgFAJQgHAKgFAMIgHANIgBAAQgHANgGAOg"),
            this.shape_1.setTransform(492, 35),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape_1
              }, {
                t: this.shape
              }]
            }).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(409, 4, 166, 70),
      (t.mclineV = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.instance = new t.vline_01,
            this.instance.setTransform(-2, -72, 1, .8),
            this.instance_1 = new t.vline_02,
            this.instance_1.setTransform(-3, -73, 1, .8),
            this.instance_2 = new t.vline_03,
            this.instance_2.setTransform(-3, -72, 1, .8),
            this.instance_3 = new t.vline_04,
            this.instance_3.setTransform(-3, -72, 1, .8),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.instance
              }]
            }).to({
              state: [{
                t: this.instance_1
              }]
            }, 1).to({
              state: [{
                t: this.instance_2
              }]
            }, 1).to({
              state: [{
                t: this.instance_3
              }]
            }, 1).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-2, -72, 5, 137),
      (t.mcarrow01 = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AE8AEQgMAFgLAHQgFADgHACQgCABgCABAE8AEQACgBACgBQgHgDgHgFQgGgFgHgEQgGgEgHgFAk/AZQAigDAjgIQAUgFAUABQAaAAAZgDQAKgCAJACQAKABAIAEQAUAKAWgDQAIAAAIAAQARAAAQAAQARgBAPgBQAPAAAOgCQAkgDAlACQAJABAKAAQAVABAUgDQABAAAAAAQAIgBAIgBQAYgEAZABQANAAANgBQABAAABAAQAdgDAeAA"),
            this.shape.setTransform(32, 2),
            this.timeline.addTween(e.Tween.get(this.shape).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-1, -1, 66, 7),
      (t.introCircleMotion = function (A, g, I) {
          this.initialize(A, g, I, {});
          var A = new e.Shape
            , g = (A._off = !0,
              (new e.Graphics).p("ARnMUIANgyICjAsIgNAyg"))
            , I = (new e.Graphics).p("ARuMUIBRkKIBCAtIAQEJg")
            , B = (new e.Graphics).p("AQ4MUIBKk2QFijCkZEbIAQEJg")
            , C = (new e.Graphics).p("ANvMUIBKk2QFvjtBBBaICdArIAKBkIi+hGIgogFIi9A7QgnAshEBBIAQEJg")
            ,
            D = (new e.Graphics).p("AVXNaIhumkIAeg4IhagiIgogFIi9A7QgnAshEBBIAQEJIijgsIBKk2QFvjtBBBaIBsAdIAdg4IFoFUIgeEsg")
            ,
            E = (new e.Graphics).p("AIjJ0ICfhKIhSgWIBKk2QFvjrBBBYIBsAdIAdg4IFoFUIgUDPIDIA1IgyDSItIDmgANuDKQgnAshEBBIAMDPIBAgeIDwgeICUAnIhEkDIAeg4IhagiIgogFg")
            , Q = (new e.Graphics).p("AIjJ0IBGggIAApVIMeAAIAAC9IDUDIIgUDPIDIA1IgyDSItIDmg");
          this.timeline.addTween(e.Tween.get(A).to({
            graphics: g,
            x: 130,
            y: 83
          }).wait(1).to({
            graphics: I,
            x: 130,
            y: 83
          }).wait(2).to({
            graphics: B,
            x: 135,
            y: 83
          }).wait(2).to({
            graphics: C,
            x: 155,
            y: 83
          }).wait(2).to({
            graphics: D,
            x: 172,
            y: 89
          }).wait(2).to({
            graphics: E,
            x: 181,
            y: 109
          }).wait(2).to({
            graphics: Q,
            x: 181,
            y: 109
          }).wait(1)),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AlwhlQgLAjgIAkQgFAVABAUQABAQABARQABAvAKAuQAHAdAMAcQAKAVAQAUQAdAkAlAeQAPANARAKQAYAOAYANQAqAUAtAMQABAAABABQAFAAAEABQAUADAVACQAFAAAGABQAlgBAmgFQAEAAAEABQAPgCAPgBQALgBALgDQAngIAmgOQAmgOAigVQAWgOASgRQAcgaAUggQAGgJAGgJQAVgiALglQAEgOAEgOQAGgkgBgkQAAgwgGgxQgGgwgQgtQgDgLgEgKQgRgvghglQgWgZgdgSQgpgcgtgWQgrgVgugPQgIgCgIgBQgGgBgHgBQgTgBgSgCQgIgBgHgBQgNgBgOACQgMgBgNAAQgGABgEABQgJABgJACQgFABgFACQgMADgMADQgRAEgPAIQgDABgCABQgDABgDABQgDABgDABQgFACgEACQgCABgCABQgEADgEACQgEADgDACQgCACgCABQgEAEgFADQgDACgDACQgJAFgHAFQgDACgCACQgHAIgIAEQgBABgCAAQgDACgDACQgXAOgSAWQgQATgMAVQgCACgBADQgEAJgEAKQgGAMgGANQgCADAAAEQgBACgBADQgDAFgDAHQgIARgEASQAAACgCAEQgBACAEAEgAACliQgCgBgCAAQgXgBgWACQgEAAgEABQgaAGgaAFQgFABgEABQgZAIgYAIQgOAEgMAIQgKAGgNAGQgLAFgLAHQgMAGgJAJQgCACgCACQgNALgJALQgPAQgPAQQgEAFgDAFQgEAGgDAHQgMAXgNAWQgFAMgEAMQgEAKgDAM"),
            this.shape.setTransform(290, 161),
            this.shape.mask = A,
            this.timeline.addTween(e.Tween.get(this.shape).wait(12))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(250, 157, 10, 9),
      (t.mcTooltip = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("ARHgGQAFgIAEgJQADgIACgJQACgFAAgHQAAgPgBgQQgBgRgJgNQgLgRgNgNQgEgEgEgEQgFgGgGgGQgNgNgSgFQgogKgogGQgNgCgNgBQgqgCgrgGQgRgCgTgBQg0gDg1gCQgbAAgbgBQgpgCgqgBQgfgCgegDQgUgCgTAAQgigBghgDQgMgCgNgBQgjAEgjgBQgzgBgxgDQgLgBgKAAQgeABgdgFQgIgBgIAAQgPgCgPAAQgYAAgXgBQgwgCgyAEQgXACgXAAQgxAAgvAAQgmAAgmAAQgHAAgHAAQgIAAgIAAQgoAAgnAAQgxAAgwAAQghAAggABQgvABguABQgwAAgvAAQgugBgvACQgMAAgOAAQgzgCgxAIQgGABgGABQgHACgJgBQgEgBgEABQgDAAgCADQghANgeATQgHAFgGAFQgFAFgDAHQgPAgADAlQACAYAKAWQAWAuAxAMQAxAOAxALQAyALAyADQAsACAsAFQAtAEAtAAQASAAASAAQAwABAvAAQAugBAvgBQAugCAuADQAbABAZAAQAvAAAwAAQAvAAAxABQAvABAugFQANgCAMAAQAzABAygFQAMgBALgBQAoAAAoACQAbACAbAAQAvAAAwAAQAxAAAxgBQAVAAAUgBQAsgBArgBQAVAAAVAAQAuABAugBQAOAAAOgBQAOgBAPABQgCAfgIAeQgJAdgHAeQgHAZgHAZQgEAJgDAKQgCAIgFAHQAbgZAXgfQAEgEADgEQAHgHAHgGQAGgHAFgHQATgfATgdQAKgPAKgPQABgEADgEQAFgHADgCQACgBADAAQAZAAAagDQAKAAALgBQAJgCAJABQAaABAZgJQAOgFANgHQAFgCAEgFQAJgLAJgKg"),
            this.shape.setTransform(111, 25),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f("#FFFFFF").s().p("ALuDnIAHgTIAOgyQAHgeAJgdQAIgeACgfQgPgBgOABIgcABIhcAAIgqAAIhXACIgpABIhiABIhfAAQgbAAgbgCQgogCgoAAIgXACQgyAFgzgBIgZACQguAFgvgBIhggBIhfAAIg0gBQgugDguACIhdACQgvAAgwgBIgkAAQgtAAgtgEQgsgFgsgCQgygDgygLQgxgLgxgOQgxgMgWguQgKgWgCgYQgDglAPggQADgHAFgFIANgKQAegTAhgNQACgDADAAQAEgBAEABQAJABAHgCIAMgCQAxgIAzACIAaAAQAvgCAuABIBfAAIBdgCIBBgBIBhAAIBPAAIAQAAIAOAAIBMAAIBgAAQAXAAAXgCQAygEAwACIAvABIAeACIAQABQAdAFAegBIAVABQAxADAzABQAjABAjgEIAZADQAhADAiABQATAAAUACIA9AFIBTADIA2ABIBpAFIAkADQArAGAqACIAaADQAoAGAoAKQASAFANANIALAMIAIAIQANANALARQAJANABARIABAfQAAAHgCAFIgFARQgEAJgFAIIgSAVQgEAFgFACIgbAMQgZAJgagBQgJgBgJACIgVABQgaADgZAAIgFABIgIAJIgEAIIgUAeIgmA8IgLAOIgOANIgHAIQgXAfgbAZQAFgHACgIg"),
            this.shape_1.setTransform(111, 25),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape_1
              }, {
                t: this.shape
              }]
            }).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-1, -1, 224, 51),
      (t.inputBox = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.frame_0 = function () {
              this.stop()
            }
            ,
            this.frame_1 = function () {
              this.stop()
            }
            ,
            this.timeline.addTween(e.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1)),
            this.nameText = new e.Text("", "11px 'Arial'"),
            this.nameText.name = "nameText",
            this.nameText.textAlign = "center",
            this.nameText.lineHeight = 14,
            this.nameText.lineWidth = 63,
            this.nameText.setTransform(32, 6, 1, 1),
            this.timeline.addTween(e.Tween.get(this.nameText).wait(2)),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AFJhbQABATAAAVQgBAeACAbQAAADAAAEQABAlADAlQAAAGgCACQAAAAgBABQAAABAAAAQAAAGAAAFQAAACgBACQAAAAgBABIgBAAQgHAAgIgBQgSADgTgBQgKgBgKgBQgMgBgMAAQgPACgRgBQgLgBgJgBQgCAAgBAAIgBAAQgjgDgjABQgjAAgiABQgDAAgDAAQgBAAAAAAQgnABgpABQgnAAgogBQgUAAgUgBQgIAAgIAAQgkgBgkAAQgeAAgeAAQgGAAgKAAQAAgHAAgHQAAgHAAgJQAAgBAAgBQgBgaAAgaQgBgKABgKQAAgiAAglQAAgKAAgKQgBgDABgCQgBgMABgHQAPADAQgDQAEgBAGAAQBDAABCgBQAQAAAPAAQAEgBAFAAQAoABAeABQA8ACAPAAQAEAAABAAQAJAAAJABQA6ABABABQADAAAEAAQAlAAAkAAQAZAAAYgBQAHgBAHAAQAfgBAfgCQAEAAAFAAAFJhbIgBAAQgfABgeABQgIAAgGABQgZABgYAAQglAAglAAQgDAAgEAAQgBgBg6gBAFHhwQABAKABALADpBvQgYgCgZABQgDAAgDAAAAuhaQAKAAAIABQgFAAgGAAQgDAAgEgBQAAAAgFAAQgPAAg7gCQgfgBgoAAQgEAAgFAAQgPAAgQAAQhDAChBAAQgGAAgFAAQgPADgQgDQgBAJABAPQAAAvAAAsQgBAkACAkQAAABAAACQAAAFABAEAAfhuQADABAEAAQAFAAAGAA"),
            this.shape.setTransform(33, 11),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f("#FFFFFF").s().p("AEVByIgUgCIgYgBQgYgCgZABIgGAAIgBAAQgjgDgjABIhFABIgGAAIgBAAIhQACIhPgBIgogBIgQAAIhIgBIg8AAIgBgJIAAgDQgCgkABgkIAAhbIAAgYQAIACAIAAIABAAIAAAAIANgCIABAAIALAAICEgCIAfAAIAJAAIBHABIBKACIAFAAIAHABIALAAIgSgBIgFAAIhKgCIhHgBIgJAAIgfAAIiEACIgLAAIgBAAIgNACIAAAAIgBAAQgIAAgIgCIgPgBIAAgTQAPADAQgDIAKgBICFgBIAfAAIAJgBIBGACIBLACIAFAAIAHABIALAAIA7ACIAHAAIBJAAQAZAAAYgBIAOgBIA+gDIAJAAIAFAAIACAVIgBAAIg9ACIgOABIgxABIhKAAIgHAAIg7gCIA7ACIAHAAIBKAAIAxgBIAOgBIA9gCIABAAIABAoQgBAeACAbIAAAHQABAlADAlQAAAGgCACIgBABIAAABIAAALQAAAAAAABQAAAAAAABQgBAAAAABQAAAAAAABIgBABIgBAAIgPgBQgOADgOAAIgJgBgAFJhbg"),
            this.shape_1.setTransform(33, 11),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape_1
              }, {
                t: this.shape
              }]
            }).to({
              state: []
            }, 1).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-1, -1, 69, 26),
      (t.btnright = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new t.righImg,
            this.shape.setTransform(-13, -15),
            this.shape_1 = new t.righImgOver,
            this.shape_1.setTransform(-13, -15),
            this.shape_3 = new e.Shape,
            this.shape_3.graphics.f("#2E2E2E").s().p("Ah0CtIAAlZIDpAAIAAFZg"),
            this.shape_3.setTransform(0, 0),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.shape_1
              }]
            }, 1).to({
              state: [{
                t: this.shape_3
              }]
            }, 2).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-11, -17, 22, 33),
      (t.btnresult = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new t.resultBtn,
            this.shape_3 = new t.resultBtnOver,
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.shape_3
              }]
            }, 5).wait(5))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-58, -14, 115, 28),
      (t.btnplus = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#FFFFFF").ss(2, 1, 1).p("AABAAQACAAACgBQASgCARgBQAUgDATgEAgJhMQADAUAEAWQACARABARQAAAIAAALQgBAIABAHQADAWAEAVAhOAJQAVgBAUgEQAUgDASgB"),
            this.shape.setTransform(0, 0),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f().s("#FFFFFF").ss(2, 1, 1).p("AAAAAQACAAACAAQAMgBAMgBQAOgCANgDAgGg1QADAOACAQQABALAAAMAg2AGQAOAAAPgDQANgDAMAAQABAGgBAHQAAAGABAFQACAPADAP"),
            this.shape_1.setTransform(0, 0),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.shape_1
              }]
            }, 2).wait(2)),
            this.shape_2 = new e.Shape,
            this.shape_2.graphics.f("#000000").s().p("AgBB5QgegCgcgKIgBAAQgEgCgFgDQgYgTgOgaQgHgOgEgOIAAAAQgGgVAEgUIAAAAIACgPIAAAAQABgPAIgNIAAgBQAOgaAagQIAAAAIAKgGIAAAAQAagTAfABQAQABARAGIAAAAQAIADAHACIAJADIAAAAIAOAHIAAAAQAPAHALANIAAAAIAHAIQARAXADAfIAAABIABAQQACAfgRAZIAAAAIgHAKQgKAPgPAJIgBAAIgcAOQgOAIgQABIgEAAIgCABQgFAGgGAAg"),
            this.shape_3 = new e.Shape,
            this.shape_3.graphics.f("#FF3300").s().p("AgBB5QgegCgcgKIgBAAQgEgCgFgDQgYgTgOgaQgHgOgEgOIAAAAQgGgVAEgUIAAAAIACgPIAAAAQABgPAIgNIAAgBQAOgaAagQIAAAAIAKgGIAAAAQAagTAfABQAQABARAGIAAAAQAIADAHACIAJADIAAAAIAOAHIAAAAQAPAHALANIAAAAIAHAIQARAXADAfIAAABIABAQQACAfgRAZIAAAAIgHAKQgKAPgPAJIgBAAIgcAOQgOAIgQABIgEAAIgCABQgFAGgGAAg"),
            this.shape_4 = new e.Shape,
            this.shape_4.graphics.f("#FF3300").s().p("AgpBMIgHgEQgRgNgJgSQgFgKgDgJQgEgPACgNIAAgBIACgKIAAAAQABgKAFgKIAAAAQAKgSASgMIAHgEIAAAAQASgNAXABQAKAAAMAEIAKAEIAGACIAAAAIAKAFIAAAAQAKAFAJAJIgBAAIAFAFQAMARACAVIAAABIABALQABAVgLARIgBAAIgEAIQgHAKgLAGIgUAKQgKAGgLAAIgDABIgCAAQgDAEgEAAQgVgBgUgHg"),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape_2
              }]
            }).to({
              state: [{
                t: this.shape_3
              }]
            }, 1).to({
              state: [{
                t: this.shape_4
              }]
            }, 1).to({
              state: [{
                t: this.shape_2
              }]
            }, 1).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-12, -12, 25, 24),
      (t.btnminus = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#FFFFFF").ss(2, 1, 1).p("AhHAAQAAADAEgBQARgCAQAAQATAAAPgBQASgBARAAQASAAATAA"),
            this.shape.setTransform(0, 0),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f().s("#FFFFFF").ss(2, 1, 1).p("AgxAAQAAACADgBQAMgBALAAQANAAAKgBQAMAAAMAAQANAAANAA"),
            this.shape_1.setTransform(0, 0),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.shape_1
              }]
            }, 2).wait(2)),
            this.shape_2 = new e.Shape,
            this.shape_2.graphics.f("#000000").s().p("AgVBzIgNgCIgBAAQgRgEgRgGIgBgBQgTgJgLgSIABAAIgGgJIAAAAQgOgYgCgbIAAgPQABgRAEgTIAFgNIAHgNIAAgBIAHgLIAAgBQAHgKALgIQAFgFAHgCIABAAIAggKQAEgDAGgBIABgBIAHAAQAWgDAYAHIAAAAQAcAIAVASIAAAAQAOAMAKARQAHALAFANQALAZgGAaIAAAAIgDARQgEASgMANIAAAAIgUATIAAAAQgWATgbAIQgRAEgPAAQgLAAgKgCg"),
            this.shape_3 = new e.Shape,
            this.shape_3.graphics.f("#FF3300").s().p("AgVBzIgNgCIgBAAQgRgEgRgGIgBgBQgTgJgLgSIABAAIgGgJIAAAAQgOgYgCgbIAAgPQABgRAEgTIAFgNIAHgNIAAgBIAHgLIAAgBQAHgKALgIQAFgFAHgCIABAAIAggKQAEgDAGgBIABgBIAHAAQAWgDAYAHIAAAAQAcAIAVASIAAAAQAOAMAKARQAHALAFANQALAZgGAaIAAAAIgDARQgEASgMANIAAAAIgUATIAAAAQgWATgbAIQgRAEgPAAQgLAAgKgCg"),
            this.shape_4 = new e.Shape,
            this.shape_4.graphics.f("#FF3300").s().p("AgOBQIgKgBQgMgDgMgEIAAgBQgOgGgHgNIAAAAIgEgGQgKgRgBgTIAAgKQAAgMAEgNIADgJIAEgJIABgBIAFgIIAAAAQAFgHAIgGQADgDAFgBIAAAAQALgFAMgDIAGgDIABAAIAFAAQAPgCARAFQAUAFAOANQAKAIAHAMIAJARQAHASgEARIgCAMQgDANgIAJIgOANQgQANgTAGQgLADgLAAIgOgCg"),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape_2
              }]
            }).to({
              state: [{
                t: this.shape_3
              }]
            }, 1).to({
              state: [{
                t: this.shape_4
              }]
            }, 1).to({
              state: [{
                t: this.shape_2
              }]
            }, 1).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-12, -12, 25, 23),
      (t.btnleft = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new t.leftImg,
            this.shape.setTransform(-12, -15),
            this.shape_1 = new t.leftImgOver,
            this.shape_1.setTransform(-12, -15),
            this.shape_3 = new e.Shape,
            this.shape_3.graphics.f("#010101").s().p("AiDCvIAAlcIEHAAIAAFcg"),
            this.shape_3.setTransform(0, 0),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.shape_1
              }]
            }, 1).to({
              state: [{
                t: this.shape_3
              }]
            }, 2).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-12, -16, 24, 33),
      (t.viewResultButton = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new t.resultBtn,
            this.result_btn = new t.btnresult,
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f("#070707").s().p("ApkCiIAAlDITJAAIAAFDg"),
            this.shape_1.setTransform(61, 16),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.result_btn
              }]
            }, 1).to({
              state: [{
                t: this.shape_1
              }]
            }, 2).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(2, 2, 115, 28),
      (t.titleMotion = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.instance = new t.mctitle,
            this.instance.setTransform(292, 23, .9, .9, 0, 0, 0, 101, 18),
            this.instance.alpha = 0,
            this.instance.filters = [new e.ColorFilter(0, 0, 0, 1, 0, 0, 0, 0)],
            this.instance.cache(-2, -2, 206, 39),
            this.timeline.addTween(e.Tween.get(this.instance).to({
              y: 63,
              alpha: 1
            }, 5, e.Ease.get(1)).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(191, 5, 202, 35),
      (t.mcstart = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.instance = new t.mcHand,
            this.instance.setTransform(6, 13, 1, 1, 0, 0, 0, 21, 11),
            this.timeline.addTween(e.Tween.get(this.instance).to({
              x: 8
            }, 4, e.Ease.get(1)).to({
              x: 6
            }, 2, e.Ease.get(1)).to({
              x: 8
            }, 4, e.Ease.get(1)).to({
              x: 6
            }, 2, e.Ease.get(1)).wait(42));
          A = new e.Shape;
          A._off = !0,
            A.graphics.p("AlJBAIAAh/IKTAAIAAB/g"),
            A.setTransform(0, -8),
            this.instance_1 = new t.mcarrow01,
            this.instance_1.setTransform(-66, -7, 1, 1, 0, 0, 0, 32, 2),
            this.instance_1.mask = A,
            this.timeline.addTween(e.Tween.get(this.instance_1).to({
              x: 66
            }, 53).wait(1)),
            this._btn_txt = new t.mcstarttxt,
            this._btn_txt.setTransform(3, -17, 1, 1, 0, 0, 0, 16, 8),
            this.timeline.addTween(e.Tween.get(this._btn_txt).wait(54))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-15, -25, 42, 50),
      (t.pop = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AEcAfQgLgEgGAGQgCABgBACQgFAJABALQAAAGAEADQAHAFAIABQARAEAFgQQAEgOgKgHQgFgEgGgDgAEdBZQgDACABAFQABAIAAAHQAAAMABAMADrCIQAKAEAMgBQALgBAMAAQAdgBAdgCQAEAAADAAAFzCKQAAAAgBABQgBABgBAAQABABABAAQAFAAAFgCQABAAABgBQgFgDgDABQgCAAgBACgAF2CGQAAABAAABQgBACAAACIgCgCAhXiqQgHAHADAJQACAGAFADQAGACAGgBQAGAAAEgFQADgCACgDQAEgIgEgEQgCgCgDgBQgKgGgMABQAAAAgDAEgAhzhvQAYAAAXgBQAQAAAQgBABPisQAOgDANADQABABAAABQADAKgBALQAAAKgDAIQgBACgDAAQgMAAgLAAABMivQgCAVACAWACvidQACAPAAAPQAAACAAAAQACABACAAQAQAAAQgCACoihQAUABAUAAAlViwQAAAdAAAeQAAAHAGABQAMABAMgCQADAAABgEQABgDAAgDQAAgNAAgMQgFAAgEABQgLABgLgCAkDiuQACAGgBAIQgBALAAAMQAAAPAAAPAkyiRQABgPAEgQAifiwQABACAAAAQABAPAAAPQAEAAACAAQALAAAKAAAjdikQAIgBAIAAQAIAAAHABQAAAAAAABQAAASgBASQAAAFgBAFAjoiGQAOAAANgCQADgBADAAAidhvQAAgEAAgFQAAgMAAgMAishgQAAAQACAQQAAABAAABQAKgCAKgCQAEgBAFABAkhhaQABABAAABQAAALABALQAAAEACADQABACACgBQAGAAAGgBQAJAAAJgCQACAAACgBAjwAtQgDAAAFAAQAHABAHAAQALABAKACQACAAAAAEQABAGAAAFQAAAGgEADQgEACgFAAQgOgBgLAFQgBABgBABQAAAJAAAIQAAADABADQAAABABAAQAOABAOgCQAGgBAGgBAkdAbQADAOgCAPQgBAJgBAJQAAAIAAAIQgBAHAAAHAlFCWQAAAFABAEQABAGgBAFQAAAEADAAQAFAAAEgBQAKAAAKACQAAgUAAgUQAAgFAAgEAiyBMQABACABAAQAGABAGAAQAHAAAIgBAi0AyQABACABAAQAIABAHAAQAEAAADAAAi/CCQABgCAHAAQAIABAIAAQAKAAAJABQABAAAAACQADASAAASQAAAEAAAFAiSATQgBAaADAbQACAOgBAOQAAADgBACAlsAmQgDABgCACQgDACgCADQgKAOAGAPQAEAMAOABQAOAAAGgMQAIgOgHgOQgCgEgEgEQgCgBgDgCQgHgDgHAEgAktCWQgLgCgNACAlGB8QgBANACANADMhgQAIgBAJABQAJAAAJgBQACAAACgBADMhgQABAaACAZAA9hPQAEABAHAAQAOgBANABQAUAAATgBACBBEQAOAAAPAAQAAgMABgLABiAzQgEANgEAMQgDAIgDAHQgCAHgCAHQAAABAAACABaBMQAIAHAIAHQADADAEACACeB7QAAgKAAgJQgBgTABgRADFAbQAAAcACAcQABAKAAAJQABALAAALQABAOAAAPAEEBXQgBAVACAUACiheQAVgDAVABAhQhcQADADAHAAQAMgBAMADQABAAAAACQABALAAAKQgNgBgMAAQgCAAgBACQgBADgBACQAAAJADAGQABADACAAQAXADAWgFAhKApQATABATAAAg+BpQgCAFACAEQADAHAHAEQAGADAGgCQAGgBAEgFQAHgGgEgJQgIgRgQAFQgDABgCABQgDAFgDAFgAAUAjQgDAOACAPQACALAAAKQAAAeACAdAAcBXQAJACAJABQABAAACAAAhbBEQAdAAAeAAABch2QACASAAAR"),
            this.shape.setTransform(297, 158),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f().s("#000000").ss(1, 1, 1).p("AAcqGQA3AMA1AOQAtAMArAPQAxASAvAWQAuAXApAcQALAHAKAHQACABACACQAeAVAdAXQAWASAUATQAUAUARAWQAiArAfArQAcAoAYAsQAZAsASAuQAPAnAIAoQAHAiACAlQADAmgCAnQgBAxgOAvQgJAcgNAbQgOAdgQAcQgZAvgqAhQgdAYgeAYQgeAYghAVQglAWgnARQgmARgkARQgXAMgYAFQgwALgzAIQg0AJg0AJQg0AJg1AFQgrAEgtADQgjACgkgCQgdgBgcgCQgVgDgVgBQgTgBgTgDQgzgIgzgOQgXgHgXgHQgKgDgKgEQgGgCgFgCQgMgEgNgEQgcgHgbgJQgagIgbgBQgIgBgJgBQgwgEgygBQACgCACgBIAAgBQACAAABgBQACgDADgCQACgBAAgBQABgCACgBQABgBAAgBQAEgCACgCQACgBABgBQAEgDAFgEQAcgYAigRQAQgJAPgJQALgIAFgTQABgFABgFQABgWgLgTQgHgNgFgOQgGgMgHgMQgHgMgGgNQgMgVgTgOQgMgKgKgNQgMgQgKgSQgJgRgIgTQgSgqgJgrQgHgigFgiQgFglgDgnQgDgwACgwQABgpAGgqQAHglAMgkQAPgqAVgoQATghAagbQAjglApggQAmgeArgaQAngYAsgQQAxgSAygLQAtgJArgFQA3gGA1gBQAvgDAuAEQAbABAcAFg"),
            this.shape_1.setTransform(297, 156),
            this.shape_2 = new e.Shape,
            this.shape_2.graphics.f("#FFFFFF").s().p("AidKOIg5gDQgVgDgVgBQgTgBgTgDQgzgIgzgOIgugOIgUgHIgLgEIgZgIQgcgHgbgJQgagIgbgBIgRgCQgwgEgygBIAEgDIAAgBIADgBQACgDADgCQAAAAABAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABgBAAAAIABgCIAGgEQAAAAABAAQABgBAAAAQAAAAABAAQAAgBAAAAIAJgHQAcgYAigRQAQgJAPgJQALgIAFgTIACgKQABgWgLgTQgHgNgFgOIgNgYIgNgZQgMgVgTgOQgMgKgKgNQgMgQgKgSQgJgRgIgTQgSgqgJgrQgHgigFgiQgFglgDgnQgDgwACgwQABgpAGgqQAHglAMgkQAPgqAVgoQATghAagbQAjglApggQAmgeArgaQAngYAsgQQAxgSAygLQAtgJArgFQA3gGA1gBQAvgDAuAEQAbABAcAFQA3AMA1AOQAtAMArAPQAxASAvAWQAuAXApAcIAVAOIAEADQAeAVAdAXQAWASAUATQAUAUARAWQAiArAfArQAcAoAYAsQAZAsASAuQAPAnAIAoQAHAiACAlQADAmgCAnQgBAxgOAvQgJAcgNAbQgOAdgQAcQgZAvgqAhIg7AwQgeAYghAVQglAWgnARIhKAiQgXAMgYAFQgwALgzAIIhoASQg0AJg1AFQgrAEgtADIgoABIgfgBg"),
            this.shape_2.setTransform(297, 156),
            this.shape_3 = new e.Shape,
            this.shape_3.graphics.f("rgba(218,218,218,0.7)").s().p("AidKOIg5gDIgqgEIgmgEQgzgHgzgPIgugOIgUgHIgLgEQgMgEgNgDQgcgHgbgJQgagJgbgBIgRgBQgwgFgygBIADgDIABgBIADgBQABgDAEgCQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQAAgBABAAIABgBIAGgFIADgCIAJgHQAcgYAigRQAQgIAPgKQALgHAFgUIACgKQAAgWgKgTQgHgNgFgOIgNgXIgOgaQgLgUgTgPQgMgKgKgNQgMgPgKgSQgJgSgIgTQgSgpgJgsQgHgigFgiQgFglgDgnQgDgwABgwQACgpAGgpQAGgmANgjQAPgrAVgoQATggAagbQAjglApghQAmgeArgaQAngXAsgRQAxgSAygLQAsgJAsgEQA3gGA1gCQAugCAvADQAbABAcAGQA3ALA1AOQAtAMArAQQAxARAvAWQAtAXAqAcIAVAOIAEADQAeAVAdAXQAWASAUATQAUAVARAWQAhAqAgArQAcApAYArQAZAsARAvQAQAmAHAoQAIAiACAlQADAngCAmQgCAxgNAwQgJAbgNAbQgOAdgQAcQgZAvgqAhIg7AwQgeAZghAUQglAWgnARIhLAjQgWALgYAFQgxAMgyAIIhoARQg0AJg1AFQgrAFgtACIgjABIgkgBg"),
            this.shape_3.setTransform(299, 160),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape_3
              }, {
                t: this.shape_2
              }, {
                t: this.shape_1
              }, {
                t: this.shape
              }]
            }).wait(1)),
            this._btn = new t.mcwhiteboard,
            this._btn.alpha = .5,
            this.timeline.addTween(e.Tween.get(this._btn).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(0, 0, 580, 320),
      (t.nameBar = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.nameBack = new t.inputBox,
            this.nameBack.setTransform(41, 14, 1, 1, 0, 0, 0, 41, 14),
            this.targetBack = new t.inputBox,
            this.targetBack.setTransform(41, 177, 1, 1, 0, 0, 0, 41, 14),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.targetBack
              }, {
                t: this.nameBack
              }]
            }).wait(4)),
            this.instance = new t.mclineV("synched", 0, !1),
            this.instance.setTransform(35, 98),
            this.timeline.addTween(e.Tween.get(this.instance).wait(4))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(0, 0, 68, 189),
      (t.mcMsg = function (A, g, I) {
          this.initialize(A, g, I, {
            inputScene: 1,
            ladderScene: 15
          }),
            this.frame_0 = function () {
              this.stop()
            }
            ,
            this.frame_14 = function () {
              this.stop()
            }
            ,
            this.frame_29 = function () {
              this.stop()
            }
            ,
            this.timeline.addTween(e.Tween.get(this).call(this.frame_0).wait(14).call(this.frame_14).wait(15).call(this.frame_29).wait(1)),
            this.instance = new t.text3,
            this.instance.setTransform(18, 8, 1, 1),
            this.instance.alpha = 0,
            this.instance._off = !0,
            this.timeline.addTween(e.Tween.get(this.instance).wait(15).to({
              _off: !1
            }, 0).to({
              alpha: 1
            }, 14, e.Ease.get(1)).wait(1)),
            this.instance_1 = new t.text2,
            this.instance_1.setTransform(18, 8, 1, 1),
            this.instance_1.alpha = 0,
            this.instance_1._off = !0,
            this.timeline.addTween(e.Tween.get(this.instance_1).wait(1).to({
              _off: !1
            }, 0).to({
              alpha: 1
            }, 13, e.Ease.get(1)).to({
              _off: !0
            }, 1).wait(15)),
            this.instance_2 = new t.mcTooltip,
            this.instance_2.setTransform(123, 27, 1, 1, 0, 0, 0, 123, 27),
            this.timeline.addTween(e.Tween.get(this.instance_2).wait(30))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(0, 0, 223, 50),
      (t.introButtonMotion = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.plus_btn = new t.btnplus,
            this.plus_btn.setTransform(366, 160, 0, 0),
            this.plus_btn._off = !0,
            new e.ButtonHelper(this.plus_btn, 0, 1, 2),
            this.timeline.addTween(e.Tween.get(this.plus_btn).wait(4).to({
              _off: !1
            }, 0).to({
              scaleX: 1,
              scaleY: 1
            }, 6, e.Ease.get(1)).to({
              scaleX: 1,
              scaleY: 1
            }, 3).wait(3)),
            this.minus_btn = new t.btnminus,
            this.minus_btn.setTransform(219, 159, 0, 0),
            new e.ButtonHelper(this.minus_btn, 0, 1, 2),
            this.timeline.addTween(e.Tween.get(this.minus_btn).to({
              scaleX: 1,
              scaleY: 1
            }, 6, e.Ease.get(1)).to({
              scaleX: 1,
              scaleY: 1
            }, 3).wait(7))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(216, 157, 5, 5),
      (t.btnprev = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.instance = new t.mcHand2,
            this.instance.setTransform(-25, 0, 1, 1, 0, 0, 0, 16, 14),
            this.timeline.addTween(e.Tween.get(this.instance).to({
              regX: 16,
              scaleX: 1,
              scaleY: 1,
              rotation: -10,
              x: -28
            }, 6, e.Ease.get(1)).to({
              regX: 16,
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
              x: -25
            }, 4, e.Ease.get(1)).to({
              regX: 16,
              scaleX: 1,
              scaleY: 1,
              rotation: -10,
              x: -28
            }, 7, e.Ease.get(1)).to({
              regX: 16,
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
              x: -25
            }, 4, e.Ease.get(1)).wait(23)),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AhbgZQgJgBgGAFQgBAAgBABQgDADgBADQAAAAAAABQgDAGACAGQACAEAFACQAGADAHgBQAUgEgDgSQAAgEgEgCQgFgDgGgBgAiwglQgBABAAABQAAAQADAQAjJAGQAdgGAdgDQADgBADAAAjPhEQgCANAFAMQACAEABAEQAAABAAABQAUgIAVgBQAEAAADgBAgrgqQAAASACARQAMgBAJgBQADAAADgBABIgKQABgBABAAQAFgCAGAAQAJAAAIgBAgBgYQANAAAQAAQADAAACAAQgEAUgIARQgBACgBACAB/gfQAYAAAYABQABAAAAABQgHAKgHAMQgEAHgCAFQgBABAAABAjUhGQADgCAHgBQAQgCAQgCADVgrQABAegDAbQgBAFAAAFABFgnQgBAdAEAaQABAHAAAGAgpgHQABAIACAJQACALAAALAi3AcQASgCARABQABAAABACQAEAOgHALQgBABgDAAQgMgBgKAGQgBABAAABQABAGABAFQAAACADABQAJADAMgCQAHAAAIgBQABAAACAA"),
            this.shape.setTransform(20, 0),
            this.timeline.addTween(e.Tween.get(this.shape).wait(44))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-42, -15, 84, 29),
      (t.btnladder = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.instance = new t.mcHand3,
            this.instance.setTransform(-33, 0, 1, 1, 0, 0, 0, 19, 9),
            this.timeline.addTween(e.Tween.get(this.instance).to({
              x: -29
            }, 5, e.Ease.get(1)).to({
              x: -33
            }, 2).to({
              x: -29
            }, 6, e.Ease.get(1)).to({
              x: -33
            }, 2).wait(29)),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AiugSQABACAAABQACAQADAQQAQgDARgBQADAAACAAAizgWIAFABQATAAARgEAhdgEQAMABAMAAAgxgeQAOgBANABQAEAAAEABQAHADgCAIQgBAHADAGQgPAAgQABQAAAAAAABQAAAIAEAKQABADABAAQADACAEAAQAOgCANgBAB6gTQACAAABAAQAEAEAFAEQALAKAMAFACEgpQgBAFgCADQgEAHgDAHQgHANgEAOAEdghQAMAAALABQABAAACAAADZgtQAQAAAQAAQABABAAAAQgCAKgIAGQgIAIgFAJQgFAHgEAGAEcg3QABALAAALQABASAAAQQABABAAACAD+AVQAKgEAMABQAGAAAFgBQAFAAAAAEQABAGAAAFQAAAMAAAMAC7gzQgCAaAAAZQAAAJABALQABAIAAAHAAjgpQgBAaACAXQAAAKABAKQABAKACAKAhjguQACAaACAYQACAMAAALQAAAJAAAIADrgSQAMAFAFANAjpglQgCAbADAZQACAQAAAPAkbgjQgIAVgHATQgFAOgHAMAjlAAQAIAAAIAAQACAAACAAAkhgHQAMAPANAQ"),
            this.shape.setTransform(20, 0),
            this.timeline.addTween(e.Tween.get(this.shape).wait(44))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-52, -10, 104, 20),
      (t.btnintro = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.recycle = new t.cycleImb,
            this.recycle.setTransform(-31, 0, 1, 1, 0, 0, 0, 13, 12),
            this.timeline.addTween(e.Tween.get(this.recycle).to({
              regY: 12,
              rotation: -45,
              x: -31,
              y: 0
            }, 6).to({
              rotation: -150,
              y: 0
            }, 6).to({
              regY: 12,
              rotation: -255,
              x: -31
            }, 6).to({
              rotation: -360
            }, 7, e.Ease.get(1)).wait(1)),
            this.shape = new t.replayTxt,
            this.shape.setTransform(-10, -8),
            this.timeline.addTween(e.Tween.get(this.shape).wait(26))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-44, -13, 88, 25),
      (t.btnintro2 = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.recycle = new t.cycleImb,
            this.recycle.setTransform(-31, 0, 1, 1, 0, 0, 0, 13, 12),
            this.shape = new t.replayTxt,
            this.shape.setTransform(-10, -8),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.recycle
              }, {
                t: this.shape
              }]
            }).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(-44, -13, 88, 25),
      (t.startButton = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.instance = new t.mcHand,
            this.instance.setTransform(297, 260, 1, 1, 0, 0, 0, 21, 11),
            this.instance_1 = new t.mcarrow01,
            this.instance_1.setTransform(291, 240, 1, 1, 0, 0, 0, 32, 2),
            this._btn_txt = new t.mcstarttxt,
            this._btn_txt.setTransform(293, 230, 1, 1, 0, 0, 0, 16, 8),
            this._btn = new t.mcstart,
            this._btn.setTransform(291, 247, 1, 1),
            this.shape = new e.Shape,
            this.shape.graphics.f("#17406F").s().p("AlYD+IAAn7IKxAAIAAH7g"),
            this.shape.setTransform(289, 247),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this._btn_txt
              }, {
                t: this.instance_1
              }, {
                t: this.instance
              }]
            }).to({
              state: [{
                t: this._btn
              }]
            }, 1).to({
              state: [{
                t: this.shape
              }]
            }, 2).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(258, 222, 65, 50),
      (t.returnButton = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AB/gfQAYAAAYABQABAAAAABQgHAKgHAMQgEAHgCAFQgBABAAABADVgrQABAegDAbQgBAFAAAFAgBgYQANAAAQAAQADAAACAAQgEAUgIARQgBACgBACAgpgHQAMgBAJgBQADAAADgBAgrgqQAAASACARQABAIACAJQACALAAALABFgnQgBAdAEAaQABAHAAAGABIgKQABgBABAAQAFgCAGAAQAJAAAIgBAjUhGQADgCAHgBQAQgCAQgCAiwglQgBABAAABQAAAQADAQAjPhEQgCANAFAMQACAEABAEQAAABAAABQAUgIAVgBQAEAAADgBAi3AcQASgCARABQABAAABACQAEAOgHALQgBABgDAAQgMgBgKAGQgBABAAABQABAGABAFQAAACADABQAJADAMgCQAHAAAIgBQABAAACAAAhbgZQgJgBgGAFQgBAAgBABQgDADgBADQAAAAAAABQgDAGACAGQACAEAFACQAGADAHgBQAUgEgDgSQAAgEgEgCQgFgDgGgBgAjJAGQAdgGAdgDQADgBADAA"),
            this.shape.setTransform(66, 18),
            this.shape_1 = new e.Shape,
            this.prev_btn = new t.btnprev,
            this.prev_btn.setTransform(46, 18),
            this.shape_2 = new e.Shape,
            this.shape_2.graphics.f("#D4D6D9").s().p("AnFCqIAAlTIOLAAIAAFTg"),
            this.shape_2.setTransform(45, 17),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape_1
              }, {
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.prev_btn
              }]
            }, 1).to({
              state: [{
                t: this.shape_2
              }]
            }, 2).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(4, 3, 85, 30),
      (t.replayButton = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.shape = new t.btnintro2,
            this.shape.setTransform(46, 15),
            this.close_btn = new t.btnintro,
            this.close_btn.setTransform(46, 15),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f("#010101").s().p("AnVCPIAAkdIOqAAIAAEdg"),
            this.shape_1.setTransform(47, 14),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }]
            }).to({
              state: [{
                t: this.close_btn
              }]
            }, 1).to({
              state: [{
                t: this.shape_1
              }]
            }, 2).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(2, 1, 89, 26),
      (t.drawLadder = function (A, g, I) {
          this.initialize(A, g, I, {}),
            this.instance = new t.mcHand3,
            this.instance.setTransform(23, 15, 1, 1, 0, 0, 0, 19, 9),
            this.shape = new e.Shape,
            this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AEcg3QABALAAALQAMAAALABQABAAACAAAEdghQABASAAAQQABABAAACAD+AVQAKgEAMABQAGAAAFgBQAFAAAAAEQABAGAAAFQAAAMAAAMADZgtQAQAAAQAAQABABAAAAQgCAKgIAGQgIAIgFAJQgFAHgEAGACEgpQgBAFgCADQgEAHgDAHQACAAABAAQAEAEAFAEQALAKAMAFAB6gTQgHANgEAOAC7gzQgCAaAAAZQAAAJABALQABAIAAAHADrgSQAMAFAFANAgxgeQAOgBANABQAEAAAEABQAHADgCAIQgBAHADAGQgPAAgQABQAAAAAAABQAAAIAEAKQABADABAAQADACAEAAQAOgCANgBAiugSQABACAAABQACAQADAQQAQgDARgBQADAAACAAAhjguQACAaACAYQACAMAAALQAAAJAAAIAhdgEQAMABAMAAAAjgpQgBAaACAXQAAAKABAKQABAKACAKAkbgjQgIAVgHATQgFAOgHAMAkhgHQAMAPANAQAjlAAQAIAAAIAAQACAAACAAAjpglQgCAbADAZQACAQAAAPAizgWIAFABQATAAARgE"),
            this.shape.setTransform(76, 15),
            this.ladder_btn = new t.btnladder,
            this.ladder_btn.setTransform(56, 15),
            this.shape_1 = new e.Shape,
            this.shape_1.graphics.f("#3C5B7E").s().p("AoqCQIAAkgIRUAAIAAEgg"),
            this.shape_1.setTransform(55, 14),
            this.timeline.addTween(e.Tween.get({}).to({
              state: [{
                t: this.shape
              }, {
                t: this.instance
              }]
            }).to({
              state: [{
                t: this.ladder_btn
              }]
            }, 1).to({
              state: [{
                t: this.shape_1
              }]
            }, 2).wait(1))
        }
      ).prototype = g = new e.MovieClip,
      g.nominalBounds = new e.Rectangle(4, 5, 104, 20)
  }(nhn.search.ladders.lib = nhn.search.ladders.lib || {}, (nhn.search.ladders.images = nhn.search.ladders.images || {},
    createjs = createjs || {}), nhn.search.ladders.ss = nhn.search.ladders.ss || {});
var nhn = nhn || {};
nhn.search = nhn.search || {},
  nhn.search.ladders = nhn.search.ladders || {},
  nhn.search.ladders.Main = function () {
    var i = "nco_xmg*8.add"
      , n = "nco_xmg*8.subtr"
      , e = "nco_xmg*8.start"
      , s = "nco_xmg*8.return"
      , h = "nco_xmg*8.ladstart"
      , a = "nco_xmg*8.result"
      , r = "nco_xmg*8.reset";

    function d(t, e) {
      window.tCR && window.tCR("a=" + e + "&r=&i=&u=javascript")
    }

    var o, l, u, c, m, p, v, t = navigator.userAgent.toLowerCase(),
      x = -1 != t.indexOf("chrome") ? "c" : -1 != t.indexOf("firefox") ? "f" : -1 != t.indexOf("safari") ? "s" : "i",
      t = navigator.appVersion.toLowerCase(), f = !1, g = (-1 != t.indexOf("edge") && (f = !0,
        x = "i"),
        document.getElementById("ladders")), names = [], targetNames = [], I = null, b = !0, y = [], P = null, results = [];

    function L() {
      names = [],
        targetNames = [],
        results = [],
      c && (c.remove(),
        c.destroy(),
        c = null),
      u && (u.remove(),
        u.destroy(),
        u = null),
        l = new M(!0)
    }

    var t = window.LadderGame = function () {
      o = document.getElementById("ladders_canvas"),
        nhn.search.ladders.images = nhn.search.ladders.images || {},
        nhn.search.ladders.ss = nhn.search.ladders.ss || {},
        this.handleComplete()
    }
      , M = (t.prototype = {
        handleComplete: function () {
          nhn.search.ladders.ss.ladders_atlas_ = new createjs.SpriteSheet({
            images: ["https://ssl.pstatic.net/sstatic/search/acao/img/ladders_atlas_v1.png"],
            frames: [[2, 188, 11, 8], [25, 21, 6, 6], [2, 0, 215, 19], [18, 21, 5, 175], [10, 21, 6, 163], [219, 0, 6, 165], [2, 21, 6, 165], [36, 19, 7, 7], [38, 37, 154, 32], [38, 168, 185, 16], [38, 188, 185, 17], [38, 80, 24, 33], [61, 80, 24, 33], [86, 80, 24, 34], [110, 80, 25, 35], [38, 208, 118, 29], [38, 236, 118, 29], [38, 116, 55, 13], [38, 136, 26, 24]]
          }),
            (v = new createjs.Stage(o)).enableMouseOver(),
            createjs.Ticker.setFPS(nhn.search.ladders.lib.properties.fps),
            createjs.Ticker.addEventListener("tick", this.stageUpdata),
            this.start()
        },
        start: function () {
          l = new M
        },
        stageUpdata: function () {
          b ? v.update() : (v.update(),
            I.draw())
        }
      },
        function (t) {
          this.mc = new createjs.MovieClip(null, 0, !1, {
            intro: 1,
            retry: 28
          }),
            this.titleMotion = t ? new nhn.search.ladders.lib.titleMotion(1, 6, !1) : new nhn.search.ladders.lib.titleMotion(null, 0, !1),
            this.mc.timeline.addTween(createjs.Tween.get(this.titleMotion)),
            this.mcnotice_txt = new nhn.search.ladders.lib.text1,
            this.mcnotice_txt.setTransform(414, 15),
            this.mcnotice_txt._off = !0,
            this.mcnotice_txt.alpha = 0,
            this.mc.timeline.addTween(createjs.Tween.get(this.mcnotice_txt).wait(40).to({
              _off: !1
            }, 0).to({
              alpha: 1
            }, 10).wait(7)),
            this.mcnotice_bg = new nhn.search.ladders.lib.mcnotice_bg(2),
            this.mcnotice_bg._off = !0,
            this.mc.timeline.addTween(createjs.Tween.get(this.mcnotice_bg).wait(40).to({
              _off: !1
            }, 0).wait(15)),
            this.count_mc = new nhn.search.ladders.lib.mcNumberSet(null, 5, !1),
            this.count_mc._off = !0,
            this.mc.timeline.addTween(createjs.Tween.get(this.count_mc).wait(28).to({
              _off: !1
            }, 0).wait(1)).call(function () {
              this.gotoAndStop(5)
            }),
            this.introButtonMotion = new nhn.search.ladders.lib.introButtonMotion(null, 0, !1),
            this.introButtonMotion._off = !0,
            this.mc.timeline.addTween(createjs.Tween.get(this.introButtonMotion).wait(28).to({
              _off: !1
            }, 0)),
            this.introCircleMotion = new nhn.search.ladders.lib.introCircleMotion(null, 0, !1),
            this.introCircleMotion._off = !0,
            this.mc.timeline.addTween(createjs.Tween.get(this.introCircleMotion).wait(20).to({
              _off: !1
            }, 0)),
            this.titleLineMotion = t ? new nhn.search.ladders.lib.titleLineMotion(1, 8, !1) : new nhn.search.ladders.lib.titleLineMotion(null, 0, !1),
            this.titleLineMotion._off = !0,
            this.mc.timeline.addTween(createjs.Tween.get(this.titleLineMotion).wait(13).to({
              _off: !1
            }, 0)),
            this.startButton = new nhn.search.ladders.lib.startButton,
            this.startButton._off = !0,
            this.startButton.alpha = 0,
            new createjs.ButtonHelper(this.startButton, 0, 1, 2, !1, new nhn.search.ladders.lib.startButton, 3),
            this.mc.timeline.addTween(createjs.Tween.get(this.startButton).wait(50).to({
              _off: !1
            }, 0).to({
              alpha: 1
            }, 6)).call(function () {
              new createjs.ButtonHelper(this.introButtonMotion.plus_btn, 0, 1, 2, !1, new nhn.search.ladders.lib.btnplus, 3),
                new createjs.ButtonHelper(this.introButtonMotion.minus_btn, 0, 1, 2, !1, new nhn.search.ladders.lib.btnminus, 3),
                this.introButtonMotion.plus_btn.addEventListener("click", this.handlePlusClick.bind(this)),
                this.introButtonMotion.minus_btn.addEventListener("click", this.handleMinusClick.bind(this))
            }
              .bind(this)),
            this.startButton.addEventListener("click", this.handleStartClick.bind(this)),
            this.ladderNum = 6,
            v.addChild(this.mc),
          t && this.mc.gotoAndPlay("retry")
        }
    )
      , LadderGame = (M.prototype = {
        destroy: function () {
        },
        view: function () {
          v.addChild(this.mc)
        },
        remove: function () {
          v.removeChild(this.mc)
        },
        handleStartClick: function (t) {
          d(0, e),
          l && (m = l.ladderNum,
            l.remove(),
            l.destroy(),
            l = null),
            u = new LadderGame(m)
        },
        handlePlusClick: function (t) {
          d(0, i),
            this.count_mc.gotoAndStop(this.count_mc.currentFrame + 1);
          var e = this.count_mc.currentFrame + 1;
          24 == (this.ladderNum = e) ? (this.introButtonMotion.plus_btn.visible = !1,
            o.style.cursor = "default") : this.introButtonMotion.minus_btn.visible = !0
        },
        handleMinusClick: function (t) {
          d(0, n),
            this.count_mc.gotoAndStop(this.count_mc.currentFrame - 1);
          var e = this.count_mc.currentFrame + 1;
          2 == (this.ladderNum = e) ? (this.introButtonMotion.minus_btn.visible = !1,
            o.style.cursor = "default") : this.introButtonMotion.plus_btn.visible = !0
        }
      },
        function (t) {
          this.totalLadder = t,
            this.mc = new createjs.MovieClip(null, 0, !1),
            v.addChild(this.mc),
            this.startButton = new nhn.search.ladders.lib.drawLadder,
            this.startButton.setTransform(298, 242, .95, .92),
            this.returnButton = new nhn.search.ladders.lib.returnButton,
            this.returnButton.setTransform(200, 238, .95, .92),
            new createjs.ButtonHelper(this.startButton, 0, 1, 2, !1, new nhn.search.ladders.lib.drawLadder, 3),
            new createjs.ButtonHelper(this.returnButton, 0, 1, 2, !1, new nhn.search.ladders.lib.returnButton, 3),
            this.mc.addChild(this.startButton),
            this.mc.addChild(this.returnButton),
            this.startButton.addEventListener("click", this.handleLadderStartClick.bind(this)),
            this.returnButton.addEventListener("click", this.handleReturnClick.bind(this)),
            this.gapX = 65,
            this.gapY = 40,
            this.ladderWidth = 74,
            this.maxLadderNum = 6,
            this.ladderMc = new createjs.MovieClip(null, 0, !1),
            this.ladderMc._off = !0,
            this.ladderMc.tickEnabled = !1,
            this.ladderMask = new createjs.Shape,
            this.ladderMask.graphics.beginFill("#F00").drawRect(this.gapX, this.gapY, this.ladderWidth * this.maxLadderNum, 195),
            this.ladderMask.alpha = .1,
            this.ladderMask._off = !0,
            this.ladderMask.tickEnabled = !1,
            this.ladderLines = [];
          for (var e = this.gapX, i = (this.totalLadder >= this.maxLadderNum ? this.ladderMc.setTransform(this.gapX, this.gapY) : (e = this.gapX - (this.totalLadder - 6) * this.ladderWidth / 2,
            this.ladderMc.setTransform(e, this.gapY)),
            e += 5,
            0), n = 0; n < this.totalLadder; n++) {
            var s = parseInt(4 * Math.random())
              , s = new nhn.search.ladders.lib.nameBar("single", s, !1)
              , h = new R(n, s.nameBack, i + e, this.gapY + 7);
            n || (P = new A(h.x, h.y)),
              s.x = i + 3,
              s.y = 3,
              this.ladderLines.push(s),
              this.ladderMc.addChild(s),
              s.nameBack.mouseChildren = !1,
              s.targetBack.mouseChildren = !1,
              i += this.ladderWidth
          }
          for (i = 0,
                 n = 0; n < this.totalLadder; n++) {
            h = new R(n + this.totalLadder, this.ladderLines[n].targetBack, i + e, 210);
            i += this.ladderWidth
          }
          if (this.ladderMc.mask = this.ladderMask,
            this.mc.addChild(this.ladderMc),
            this.msg_mc = new nhn.search.ladders.lib.mcMsg,
            this.msg_mc.setTransform(357, 2),
            this.msg_mc.loop = !1,
            this.mc.addChild(this.msg_mc),
            this.msg_mc.gotoAndPlay("inputScene"),
            this.moveIndex = 0,
          this.totalLadder > this.maxLadderNum) {
            this.right_btn = new nhn.search.ladders.lib.btnright,
              this.right_btn.setTransform(532, 145),
              new createjs.ButtonHelper(this.right_btn, 0, 1, 2, !1, new nhn.search.ladders.lib.btnright, 3),
              this.left_btn = new nhn.search.ladders.lib.btnleft,
              this.left_btn.setTransform(45, 145),
              new createjs.ButtonHelper(this.left_btn, 0, 1, 2, !1, new nhn.search.ladders.lib.btnleft, 3),
              this.mc.addChild(this.right_btn),
              this.mc.addChild(this.left_btn),
              this.right_btn.addEventListener("click", this.handleRightClick.bind(this)),
              this.left_btn.addEventListener("click", this.handleLeftClick.bind(this)),
              this.left_btn.visible = !1,
              this.movePoints = [];
            for (var a = this.totalLadder - this.maxLadderNum, n = 0; n <= a; ++n)
              this.movePoints.push(this.gapX - this.ladderWidth * n)
          } else
            this.right_btn = null,
              this.left_btn = null;
          this.ladderItems = [],
            o.addEventListener("click", function (t) {
              "text" != o.style.cursor && "pointer" != o.style.cursor && P && P.blur()
            }),
            this.nowMovingLevel = -1,
            this.isMoving = !1,
            this.moveTween = null
        }
    )
      , k = (LadderGame.prototype = {
        destroy: function () {
        },
        onMessagePopup: function () {
          this.pop = new createjs.MovieClip(null, 0, !1),
            v.addChild(this.pop),
            this.messagePopup = new nhn.search.ladders.lib.pop(null, 0, !1),
            this.pop.timeline.addTween(createjs.Tween.get(this.messagePopup).wait(10).to({
              _off: !0
            }, 30)).call(function () {
              this.messagePopup.removeEventListener("click", this.popuClick.bind(this)),
                this.messagePopup = null,
                v.removeChild(this.pop),
                this.pop = null
            }
              .bind(this)),
            this.messagePopup.cursor = "default",
            this.messagePopup.addEventListener("click", this.popuClick.bind(this))
        },
        popuClick: function (t) {
        },
        remove: function () {
          for (var t = 0; t < this.ladderItems.length; t++)
            this.ladderItems[t].remove(),
              this.ladderItems[t] = null;
          this.ladderItems = [],
            v.removeChild(this.mc),
          P && P.blur(),
          P._hiddenInput && g.removeChild(P._hiddenInput),
            P._hiddenInput = null,
            P = null,
            y = []
        },
        handleLadderStartClick: function (t) {
          d(0, h),
            this.checkEmptyTxt() ? this.drawladder() : this.onMessagePopup()
        },
        checkEmptyTxt: function () {
          P.onBlur(null),
            P.blur();
          for (var t = y.length, e = 0; e < t; ++e)
            if ("" == y[e].getText().split(" ").join(""))
              return !1;
          return !0
        },
        drawladder: function () {
          (p = new B(this.totalLadder, this.ladderMc, this.ladderWidth, 8)).makeLoadder(),
            //! p.drawLadder 사다리 그리기를 유예
            this.mc.removeChild(this.startButton),
            this.mc.removeChild(this.returnButton);

          for (let t = 0; t < this.totalLadder; t++) {
            var e = this.ladderLines[t];
            names[t] = y[t].getText(),
              targetNames[t] = y[t + this.totalLadder].getText(),
              e.nameBack.gotoAndStop(1),
              e.targetBack.gotoAndStop(1)
          }

          this.viewResultButton = new nhn.search.ladders.lib.viewResultButton,
            this.viewResultButton.setTransform(228, 246, .94, .93),
            new createjs.ButtonHelper(this.viewResultButton, 0, 1, 2, !1, new nhn.search.ladders.lib.viewResultButton, 3),
            this.viewResultButton.addEventListener("click", this.handlerViewResultClick),
            this.mc.addChild(this.viewResultButton),
            this.msg_mc.gotoAndPlay("ladderScene"),
            this.ladderItems = [];

          //! 이름에 VICTIM이 포함되어있고 당첨 키워드가 있는 경우에만 동작
          const isCheat = !!names.find((name) => name === VICTIM) && !!targetNames.find((name) => name === TARGET);

          for (t = 0; t < this.totalLadder; t++) {
            var i = names[parseInt(6 * Math.random())] + " " + (t + 1)
              , n = new createjs.Text(i, "12px Palatino", "#000000")
              , n = (n.x = 100,
              n.textBaseline = "alphabetic",
              n.textAlign = "center",
              n.x = t * this.ladderWidth + 40,
              n.y = 19,
              new createjs.Text(targetNames[parseInt(6 * Math.random())] + " " + (t + 1), "12px Palatino", "#000000"))
              , n = (n.x = 100,
              n.textBaseline = "alphabetic",
              n.textAlign = "center",
              n.x = t * this.ladderWidth + 40,
              n.y = 221,
              new S(t, i, this.ladderWidth, p.onePointPixelSize, 40, 20));

            this.ladderItems.push(n),
              this.ladderMc.addChild(n.mc),
              n.setResult(p.getResult(t)),
              n.nameTargetText = this.ladderLines[t].nameBack.nameText,
              n.itemTargetText = this.ladderLines[n.itemLineNum].targetBack.nameText
          }

          if (isCheat){
            const success = this.ladderItems.some((item) => {
              const name = item.nameTargetText.text;
              const target = item.itemTargetText.text;
              return name === VICTIM && target === TARGET;
            })
            //! 목표에 해당하는 사다리 조합이 나올때까지 실행
            if (!success){
              this.drawladder();
              return;
            }
          }
          //! 사다리 그리는 시점 유예
          p.drawLadder();
          P.blur(),
            g.removeChild(P._hiddenInput),
            P._hiddenInput = null,
            y = []
        },
        handlerViewResultClick: function (t) {
          d(0, a),
            b = !0,
          I && I.remove(),
            I = null;
          var e = u.ladderItems.length;
          results = [];
          for (var i = 0; i < e; i++)
            results.push(u.ladderItems[i].itemLineNum);
          u && (u.remove(),
            u.destroy(),
            u = null),
            c = new k
        },
        handleReturnClick: function (t) {
          d(0, s),
            L()
        },
        handleRightClick: function (t) {
          I && I.forceDraw(),
          P && P.blur();
          var e = Math.min(this.moveIndex + 6, this.movePoints.length - 1)
            , e = (this.moveIndex = e,
            this.movePoints[e]);
          this.moveLadder(e, 1)
        },
        moveLadder: function (t, e) {
          !this.movePoints || this.isMoving || (this.moveIndex == this.movePoints.length - 1 ? (this.right_btn.visible = !1,
            o.style.cursor = "default") : 0 == this.moveIndex && (this.left_btn.visible = !1,
            o.style.cursor = "default"),
            this.isMoving = !0,
            this.nowMovingLevel = e,
            this.moveTween = createjs.Tween.get(this.ladderMc).to({
              x: t
            }, 300).call(function () {
              0 < u.moveIndex && (u.left_btn.visible = !0),
              u.moveIndex < u.movePoints.length - 1 && (u.right_btn.visible = !0),
                this.isMoving = !1,
                this.removeTween()
            }
              .bind(this)))
        },
        removeTween: function () {
          createjs.Tween.removeTweens(this.ladderMc),
            this.moveTween = null
        },
        handleLeftClick: function (t) {
          I && I.forceDraw(),
          P && P.blur();
          var e = Math.max(this.moveIndex - 6, 0)
            , e = (this.moveIndex = e,
            this.movePoints[e]);
          this.moveLadder(e, 1)
        },
        getMovePoint: function (t) {
          return this.moveIndex += t,
            this.moveIndex > this.movePoints.length - 1 ? this.moveIndex = this.movePoints.length - 1 : this.moveIndex < 0 && (this.moveIndex = 0),
            this.movePoints[this.moveIndex]
        },
        getMovePointAt: function (t) {
          return this.moveIndex == t ? 0 : (this.moveIndex = t,
            this.movePoints ? (this.moveIndex > this.movePoints.length - 1 ? this.moveIndex = this.movePoints.length - 1 : this.moveIndex < 0 && (this.moveIndex = 0),
              this.movePoints[this.moveIndex]) : void 0)
        },
        getFirstMovePoint: function () {
          return this.moveIndex = 0,
            this.movePoints[0]
        },
        getLastMovePoint: function () {
          return this.moveIndex = this.movePoints.length - 1,
            this.movePoints[this.movePoints.length - 1]
        }
      },
        function () {
          this.mc = new createjs.MovieClip(null, 0, !1),
            v.addChild(this.mc),
            this.resultScreenW = 580,
            this.oneResultW = 136,
            this.oneH = 28;
          for (var t = 54, e = parseInt((this.resultScreenW - Math.ceil(m / 6) * this.oneResultW) / 2), i = 0; i < m; i++) {
            var n = new nhn.search.ladders.lib.resultMc;
            n.nameText.text = names[i];
            n.targetText.text = targetNames[results[i]]
              n.x = e,
              n.y = t,
              this.mc.addChild(n),
              t += this.oneH,
            (i + 1) % 6 == 0 && (e += this.oneResultW,
              t = 54)
          }
          this.replayButton = new nhn.search.ladders.lib.replayButton,
            this.replayButton.setTransform(251, 245),
            new createjs.ButtonHelper(this.replayButton, 0, 1, 2, !1, new nhn.search.ladders.lib.replayButton, 3),
            this.mc.addChild(this.replayButton),
            this.replayButton.addEventListener("click", this.handlerReplayClick.bind(this))
        }
    )
      , S = (k.prototype = {
        destroy: function () {
        },
        handlerReplayClick: function (t) {
          d(0, r),
            L()
        },
        remove: function () {
          v.removeChild(this.mc)
        }
      },
        function (t, e, i, n, s, h) {
          this.mc = new createjs.MovieClip(null, 0, !1),
            this.nameTargetText,
            this.itemTargetText,
            this.userLineNum = t,
            this.userName = e,
            this.itemW = i,
            this.itemTextArea,
            this.resultPois = [],
            this.ladderX = 38,
            this.ladderY = 27,
            this.ladderWidth = i,
            this.onePointPixelSize = n,
            this.itemLineNum,
            this.gap = 4,
            this.rectH = 18,
            this.rectW = this.itemW - 2 * this.gap,
            this.rectY1 = this.ladderY - this.rectH - this.gap,
            this.rectY2 = 170,
            this.rectX = this.ladderX - this.ladderWidth / 2 + this.gap - 1,
            this.userTextArea = {
              x: this.userLineNum * this.itemW + this.rectX,
              y: this.rectY1,
              width: this.rectW,
              height: this.rectH
            },
            this.userTextArea.right = this.userTextArea.x + this.userTextArea.width,
            this.userTextArea.bottom = this.userTextArea.y + this.userTextArea.height,
            this.nameRectShape = new createjs.Shape,
            //! 결과가 반복되면서 생기는 흰색 배경 문제 제거
            this.nameRectShape.graphics.beginFill("#FFF"),
            this.nameRectShape.alpha = 0.01,
            this.nameRectShape.graphics.drawRect(this.userTextArea.x, this.userTextArea.y, this.userTextArea.width, this.userTextArea.height),
            this.mc.addChild(this.nameRectShape),
            this.nameRectShape.cursor = "pointer",
            this.nameRectShape.mouseChildren = !1,
            this.nameRectShape.addEventListener("click", this.nameTextClick.bind(this))
        }
    )
      , B = (S.prototype = {
        remove: function () {
          this.mc = null,
          this.animation && this.animation.remove(),
            this.animation = null
        },
        nameTextClick: function (t) {
          for (var e = u.ladderItems.length, i = 0; i < e; i++)
            u.ladderItems[i] != this && u.ladderItems[i].removeResult();
          this.nameTargetText.color = "#F00",
            this.animation.resultText = this.itemTargetText,
            this.playAnimation(1)
        },
        itemTextClick: function (t) {
          for (var e = u.ladderItems.length, i = 0; i < e; i++)
            u.ladderItems[i] != this && u.ladderItems[i].removeResult();
          this.itemTargetText.color = "#F00",
            this.animation.resultText = this.nameTargetText,
            this.playAnimation(-1)
        },
        setResult: function (t) {
          this.resultPois = t,
            this.itemLineNum = this.resultPois[this.resultPois.length - 1].x,
            this.itemTextArea = {
              x: this.itemLineNum * this.itemW + this.rectX,
              y: this.rectY2,
              width: this.rectW,
              height: this.rectH
            },
            this.itemTextArea.right = this.itemTextArea.x + this.itemTextArea.width,
            this.itemTextArea.bottom = this.itemTextArea.y + this.itemTextArea.height,
            this.itemRectShape = new createjs.Shape,
            //! 결과가 반복되면서 생기는 흰색 배경 문제 제거
            this.itemRectShape.graphics.beginFill("#FFF"),
            this.itemRectShape.alpha = 0.01,
            this.itemRectShape.graphics.drawRect(this.itemTextArea.x, this.itemTextArea.y, this.itemTextArea.width, this.itemTextArea.height),
            this.mc.addChild(this.itemRectShape),
            this.itemRectShape.cursor = "pointer",
            this.itemRectShape.mouseChildren = !1,
            this.itemRectShape.addEventListener("click", this.itemTextClick.bind(this)),
            this.animation = new j(this.resultPois, this.ladderX, this.ladderY)
        },
        removeResult: function () {
          this.animation && this.animation.resultShape && this.animation.resultShape.parent && this.mc.removeChild(this.animation.resultShape)
        },
        isMouseOver: function (t, e) {
          return !1
        },
        playAnimation: function (t) {
          this.animation.play(t),
            this.mc.addChild(this.animation.resultShape)
        }
      },
        function (t, e, i, n) {
          this.totalLadder = t,
            this.mc = e,
            this.oneLinePoint = 7,
            this.normalpointNum = 4;
          t = parseInt(2 * Math.random());
          2 == this.totalLadder ? this.totalPointNum = parseInt(6 * Math.random()) + 1 : (t = parseInt(2 * Math.random()),
            this.totalPointNum = this.normalpointNum * (this.totalLadder - 1) + t),
            this.limiteValue = (this.totalLadder - 1) * this.oneLinePoint,
            this.points = [],
            this.ladderStartPoint = new Array(this.totalLadder - 1),
            this.ladderEndPoint = new Array(this.totalLadder - 1),
            this.x = 38,
            this.y = 27,
            this.oneLadderWidth = i,
            this.onePointPixelSize = n,
            this.yLastVal = 16
        }
    )
      , R = (B.prototype = {
        getResult: function (t) {
          for (var e = [], i = t, n = [], s = [], h = 0, a = -1, r = (e.push({
            x: i,
            y: h
          }),
            1); r;) {
            for (var n = this.ladderStartPoint.length > i ? this.ladderStartPoint[i] : [], s = i ? this.ladderEndPoint[i - 1] : [], d = {
              x: i
            }, o = 0, a = -1, l = n.length, u = 0; u < l; u++)
              if (h < n[u]) {
                d.y = n[u],
                  a = u;
                break
              }
            for (l = s.length,
                   u = 0; u < l; u++)
              if (h < s[u]) {
                (-1 == a || n[a] > s[u]) && (d.y = s[u],
                  a = u,
                  o = 1);
                break
              }
            if (-1 == a) {
              r = 0,
                d.y = this.yLastVal,
                e.push(d);
              break
            }
            e.push(d),
              o ? (i -= 1,
                h = this.ladderStartPoint[i][a]) : (h = this.ladderEndPoint[i][a],
                i += 1),
              e.push({
                x: i,
                y: h
              })
          }
          return e
        },
        drawLadder: function () {
          var t, e, i, n, s = this.ladderStartPoint.length, h = new createjs.Graphics;
          h.setStrokeStyle(1),
            h.beginStroke("#000000");
          for (var a = 0; a < s; a++)
            for (var r = this.ladderStartPoint[a].length, d = 0; d < r; d++)
              i = this.ladderStartPoint[a][d],
                n = this.ladderEndPoint[a][d],
                e = (t = a * this.oneLadderWidth) + this.oneLadderWidth,
                i = i * this.onePointPixelSize,
                n = n * this.onePointPixelSize,
                h.moveTo(t, i),
                h.lineTo(e, n);
          var o = new createjs.Shape(h);
          o.x = this.x,
            o.y = this.y,
            this.mc.addChild(o)
        },
        makeLoadder: function () {
          for (var t = 0; t < this.ladderStartPoint.length; t++)
            this.ladderStartPoint[t] = [],
              this.ladderEndPoint[t] = [];
          //! 사다리 만드는 부분
          this.makeRandomLadderPoint();
          this.disposePoint();
          this.makeRandomConnectPoint();
          this.refinePoint();
        },
        makeRandomLadderPoint: function () {
          for (var t = [], e = (this.points = [],
            this.limiteValue), i = 0; i < e; i++)
            t.push(i);
          for (i = 0; i < this.totalPointNum; i++) {
            var n = parseInt(Math.random() * e)
              , n = parseInt(t.splice(n, 1));
            this.points.push(n),
              e--
          }
          this.points.sort(function (t, e) {
            return t - e
          })
        },
        disposePoint: function () {
          for (var t, e, i = this.points.length, n = 0; n < i; n++)
            e = this.points[n],
              t = parseInt(e / this.oneLinePoint),
              e = e % this.oneLinePoint,
              this.ladderStartPoint[t].push(e)
        },
        makeRandomConnectPoint: function () {
          for (var t = this.oneLinePoint, e = [], i = 0; i < t; i++)
            e.push(i);
          for (i = 0; i < this.ladderStartPoint.length; i++) {
            for (var n, s = this.ladderStartPoint[i].length, h = e.slice(0), a = [], t = this.oneLinePoint, r = 0; r < s; r++)
              n = parseInt(Math.random() * t),
                n = parseInt(h.splice(n, 1)),
                a.push(n),
                t--;
            a.sort(function (t, e) {
              return t - e
            }),
              this.ladderEndPoint[i] = a.slice(0)
          }
        },
        refinePoint: function () {
          for (var t, e, i = this.ladderStartPoint.length, n = 0; n < i; n++)
            for (var s = this.ladderStartPoint[n].length, h = 0; h < s; h++)
              t = this.ladderStartPoint[n][h],
                e = this.ladderEndPoint[n][h],
                t++,
                e++,
                t *= 2,
                e *= 2,
              n % 2 == 1 && (t++,
                e++),
                this.ladderStartPoint[n][h] = t,
                this.ladderEndPoint[n][h] = e
        }
      },
        function (t, e, i, n) {
          this.index = t,
            this.target = e,
            this.target.nameText.text = "",
            this.target.cursor = "text",
            this.x = i,
            this.y = "i" == x ? n + 1 : n,
            y.push(this),
            this.target.addEventListener("click", this.onClick.bind(this))
        }
    )
      , A = (R.prototype = {
        onClick: function (t) {
          P.changeIndex(this.index),
            t.preventDefault(),
            t.stopPropagation()
        },
        setText: function (t) {
          this.target.nameText.text = t
        },
        getText: function (t) {
          return this.target.nameText.text
        }
      },
        function (t, e) {
          this._hiddenInput = null,
            this._inputsIndex = 0,
            this.makeInput(t, e)
        }
    )
      , j = (A.prototype = {
        makeInput: function (t, e) {
          this._hiddenInput = document.createElement("input"),
            this._hiddenInput.type = "text",
            this._hiddenInput.style.position = "absolute",
            this._hiddenInput.style.opacity = 1,
            this._hiddenInput.style.pointerEvents = "none",
            this._hiddenInput.style.left = t + "px",
            this._hiddenInput.style.top = e + "px",
            this._hiddenInput.style.width = "60px",
            this._hiddenInput.style.height = "15px",
            this._hiddenInput.style.zIndex = 0,
            this._hiddenInput.style.textAlign = "center",
            this._hiddenInput.style.fontSize = "11px",
          f || (this._hiddenInput.maxLength = 5),
            this._hiddenInput.style.fontFamily = "Arial",
            this._hiddenInput.style.padding = "0",
            this._hiddenInput.style.margin = "0",
            this._hiddenInput.style.border = "none",
            this._hiddenInput.style.outline = "none",
            g.appendChild(this._hiddenInput),
            this._hiddenInput.addEventListener("keydown", this.onKeydown.bind(this)),
          "c" != x && !f || this._hiddenInput.addEventListener("keyup", this.onKeyup.bind(this)),
            this._hiddenInput.addEventListener("focus", this.onFocus.bind(this)),
            this._hiddenInput.addEventListener("blur", this.onBlur.bind(this)),
            this._hiddenInput.focus()
        },
        changeIndex: function (t) {
          this._inputsIndex != t && (this.blur(),
            setTimeout(function () {
              this._inputsIndex = t,
                this.move(y[t].x, y[t].y),
                this.focus()
            }
              .bind(this), 10))
        },
        move: function (t, e) {
          var i = 74 * u.moveIndex;
          this._hiddenInput.style.left = t - i + "px",
            this._hiddenInput.style.top = e + "px"
        },
        setText: function (t) {
          this._hiddenInput.value = t
        },
        blur: function () {
          this._hiddenInput && this._hiddenInput.blur()
        },
        hidden: function () {
          var t;
          this._hiddenInput && (this._hasFocus = !1,
            this._hiddenInput.style.pointerEvents = "none",
            this._hiddenInput.style.opacity = 0,
            t = this._hiddenInput.value,
          -1 != this._inputsIndex && y[this._inputsIndex].setText(t),
            this._inputsIndex > m ? targetNames[this._inputsIndex - m] = t : names[this._inputsIndex] = t,
            this._hiddenInput.value = " ",
            this._inputsIndex = -1,
          "i" == x) && (this._hiddenInput.style.textIndent = "-9999em")
        },
        focus: function () {
          this._hiddenInput && this._hiddenInput.focus()
        },
        onBlur: function (t) {
          this._hasFocus = !1,
            this._hiddenInput.style.pointerEvents = "none",
            this._hiddenInput.style.opacity = 0;
          var e = this._hiddenInput.value;
          -1 != this._inputsIndex && y[this._inputsIndex].setText(e),
            this._inputsIndex > m ? targetNames[this._inputsIndex - m] = e : names[this._inputsIndex] = e,
            this._hiddenInput.value = "",
            this._inputsIndex = -1
        },
        onFocus: function (t) {
          var e;
          -1 != this._inputsIndex && ((e = y[this._inputsIndex].getText()) ? (this._hiddenInput.value = e,
            this.onVisible()) : "i" == x ? (this._hiddenInput.style.textIndent = "-9999em",
            this._hiddenInput.value = " ",
            setTimeout(function () {
              this._hiddenInput.value = "",
                this.onVisible()
            }
              .bind(this), 100)) : (this._hiddenInput.value = "",
            this.onVisible()))
        },
        onVisible: function () {
          this._hasFocus = !0,
            this._hiddenInput.style.pointerEvents = "visible",
            this._hiddenInput.style.opacity = 1,
          "i" == x && (this._hiddenInput.style.textIndent = "0em")
        },
        onKeyup: function (t) {
          var e = this._hiddenInput.value;
          5 <= e.length && (this._hiddenInput.value = e.substring(0, 5))
        },
        onKeydown: function (t) {
          var e, i, n = t.which, s = t.shiftKey, h = t.ctrlKey, a = t.metaKey;
          !this._hasFocus || 65 === n && (h || a) ? t.preventDefault() : 17 === n || a || h || 9 === n && (t.preventDefault(),
          1 < y.length) && (e = s ? y[this._inputsIndex - 1] ? this._inputsIndex - 1 : y.length - 1 : y[this._inputsIndex + 1] ? this._inputsIndex + 1 : 0,
            482 < (a = y[e].x - 74 * u.moveIndex) ? (P.hidden(),
              i = e == m - 1 || e == 2 * m - 1 ? u.getLastMovePoint() : u.getMovePoint(1),
              u.moveLadder(i, 0),
              setTimeout(function () {
                this.changeIndex(e)
              }
                .bind(this), 400)) : a < 0 ? (P.hidden(),
              i = e == m || 0 == e ? u.getFirstMovePoint() : u.getMovePoint(-1),
              u.moveLadder(i),
              setTimeout(function () {
                this.changeIndex(e)
              }
                .bind(this), 400)) : this.changeIndex(e))
        }
      },
        function (t, e, i) {
          this.orginPosi = t,
            this.aniPois = [],
            this.x = e,
            this.y = i;
          for (var n = t.length, s = 0; s < n; s++) {
            var h = t[s].x
              , a = t[s].y
              , r = t[s + 1].y;
            if (0 < r - a) {
              for (var d = a; d < r; d++)
                this.aniPois.push({
                  x: h,
                  y: d
                }),
                  this.aniPois.push({
                    x: h,
                    y: d + .3
                  }),
                  this.aniPois.push({
                    x: h,
                    y: d + .7
                  });
              this.aniPois.push({
                x: h,
                y: d
              })
            }
            if (!(++s + 1 < n))
              break;
            for (var a = t[s + 1].x, o = (t[s + 1].y - r) / 25, l = 0 < a - h ? .04 : -.04, d = 0; d < 25; d++)
              h += l,
                r += o,
                this.aniPois.push({
                  x: h,
                  y: r
                })
          }
          this.aniPois.push({
            x: h,
            y: r + .3
          }),
            this.aniPois.push({
              x: h,
              y: r + .7
            }),
            this.aniPois.push({
              x: h,
              y: r + 1.1
            }),
            this.ladderWidth = 74,
            this.onePointPixelSize = 8,
            this.point = 0,
            this.resultShape = new createjs.MovieClip(null, 0, !1),
            this.resultShape.setTransform(this.x - 3, this.y - 3),
            this.resultShape_ = new createjs.Shape,
            this.resultShape.addChild(this.resultShape_),
            this.beenPlaying = !1,
            this.resultText,
            this.position = 1,
            this.isAnimationEnd = !1,
            this.isForce = !1
        }
    );
    j.prototype = {
      remove: function () {
        this.isForce = !0,
          this.resultShape = null
      },
      draw: function () {
        var t, e, i;
        u && (this.point == this.aniPois.length ? (this.resultText.color = "#ff0000",
          this.isAnimationEnd = !0,
          b = !(I = null)) : (t = this.point,
          this.xx = this.aniPois[t].x * this.ladderWidth,
          this.yy = this.aniPois[t].y * this.onePointPixelSize,
          (e = new nhn.search.ladders.lib.b0).x = this.xx,
          e.y = this.yy,
          this.resultShape.addChild(e),
        this.isForce || (this.aniPois[t].x > u.moveIndex + 5 ? (i = u.getMovePointAt(u.moveIndex + 1),
          u.moveLadder(i, 2)) : this.aniPois[t].x < u.moveIndex && (i = u.getMovePointAt(u.moveIndex - 1),
          u.moveLadder(i, 2))),
          this.point++,
        this.point % 2 && this.draw()))
      },
      forceDraw: function () {
        for (this.isForce = !0; ;)
          if (this.draw(),
          this.point == this.aniPois.length) {
            this.draw();
            break
          }
      },
      play: function (t) {
        if (u)
          if (null != I && I.forceDraw(),
            this.beenPlaying) {
            if (6 < m) {
              this.position != t && (this.position = t,
                this.orginPosi.reverse());
              for (var e = this.orginPosi.length, i = null, n = 0; n < e; n++)
                this.orginPosi[n].x > u.moveIndex + 5 ? i = u.getMovePointAt(u.moveIndex + 1) : this.orginPosi[n].x < u.moveIndex && (i = u.getMovePointAt(u.moveIndex - 1));
              null != i && u.moveLadder(i, 2)
            }
          } else
            -1 == t && (this.aniPois.reverse(),
              this.orginPosi.reverse(),
              this.position = t),
              (I = this).beenPlaying = !0,
              b = !1
      }
    },
      new t
  }();

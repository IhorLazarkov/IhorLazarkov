var Ei = { exports: {} }, yr = {}, Ci = { exports: {} }, D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _a;
function Df() {
  if (_a) return D;
  _a = 1;
  var k = Symbol.for("react.element"), R = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), Z = Symbol.for("react.profiler"), ue = Symbol.for("react.provider"), J = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), pe = Symbol.for("react.memo"), ve = Symbol.for("react.lazy"), K = Symbol.iterator;
  function Q(c) {
    return c === null || typeof c != "object" ? null : (c = K && c[K] || c["@@iterator"], typeof c == "function" ? c : null);
  }
  var Me = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, je = Object.assign, q = {};
  function $(c, v, j) {
    this.props = c, this.context = v, this.refs = q, this.updater = j || Me;
  }
  $.prototype.isReactComponent = {}, $.prototype.setState = function(c, v) {
    if (typeof c != "object" && typeof c != "function" && c != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, c, v, "setState");
  }, $.prototype.forceUpdate = function(c) {
    this.updater.enqueueForceUpdate(this, c, "forceUpdate");
  };
  function Fe() {
  }
  Fe.prototype = $.prototype;
  function Ie(c, v, j) {
    this.props = c, this.context = v, this.refs = q, this.updater = j || Me;
  }
  var $e = Ie.prototype = new Fe();
  $e.constructor = Ie, je($e, $.prototype), $e.isPureReactComponent = !0;
  var ge = Array.isArray, F = Object.prototype.hasOwnProperty, Y = { current: null }, ne = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(c, v, j) {
    var O, V = {}, H = null, ee = null;
    if (v != null) for (O in v.ref !== void 0 && (ee = v.ref), v.key !== void 0 && (H = "" + v.key), v) F.call(v, O) && !ne.hasOwnProperty(O) && (V[O] = v[O]);
    var X = arguments.length - 2;
    if (X === 1) V.children = j;
    else if (1 < X) {
      for (var ie = Array(X), Ye = 0; Ye < X; Ye++) ie[Ye] = arguments[Ye + 2];
      V.children = ie;
    }
    if (c && c.defaultProps) for (O in X = c.defaultProps, X) V[O] === void 0 && (V[O] = X[O]);
    return { $$typeof: k, type: c, key: H, ref: ee, props: V, _owner: Y.current };
  }
  function _e(c, v) {
    return { $$typeof: k, type: c.type, key: v, ref: c.ref, props: c.props, _owner: c._owner };
  }
  function lt(c) {
    return typeof c == "object" && c !== null && c.$$typeof === k;
  }
  function Yt(c) {
    var v = { "=": "=0", ":": "=2" };
    return "$" + c.replace(/[=:]/g, function(j) {
      return v[j];
    });
  }
  var pt = /\/+/g;
  function Ke(c, v) {
    return typeof c == "object" && c !== null && c.key != null ? Yt("" + c.key) : v.toString(36);
  }
  function ut(c, v, j, O, V) {
    var H = typeof c;
    (H === "undefined" || H === "boolean") && (c = null);
    var ee = !1;
    if (c === null) ee = !0;
    else switch (H) {
      case "string":
      case "number":
        ee = !0;
        break;
      case "object":
        switch (c.$$typeof) {
          case k:
          case R:
            ee = !0;
        }
    }
    if (ee) return ee = c, V = V(ee), c = O === "" ? "." + Ke(ee, 0) : O, ge(V) ? (j = "", c != null && (j = c.replace(pt, "$&/") + "/"), ut(V, v, j, "", function(Ye) {
      return Ye;
    })) : V != null && (lt(V) && (V = _e(V, j + (!V.key || ee && ee.key === V.key ? "" : ("" + V.key).replace(pt, "$&/") + "/") + c)), v.push(V)), 1;
    if (ee = 0, O = O === "" ? "." : O + ":", ge(c)) for (var X = 0; X < c.length; X++) {
      H = c[X];
      var ie = O + Ke(H, X);
      ee += ut(H, v, j, ie, V);
    }
    else if (ie = Q(c), typeof ie == "function") for (c = ie.call(c), X = 0; !(H = c.next()).done; ) H = H.value, ie = O + Ke(H, X++), ee += ut(H, v, j, ie, V);
    else if (H === "object") throw v = String(c), Error("Objects are not valid as a React child (found: " + (v === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : v) + "). If you meant to render a collection of children, use an array instead.");
    return ee;
  }
  function mt(c, v, j) {
    if (c == null) return c;
    var O = [], V = 0;
    return ut(c, O, "", "", function(H) {
      return v.call(j, H, V++);
    }), O;
  }
  function Ue(c) {
    if (c._status === -1) {
      var v = c._result;
      v = v(), v.then(function(j) {
        (c._status === 0 || c._status === -1) && (c._status = 1, c._result = j);
      }, function(j) {
        (c._status === 0 || c._status === -1) && (c._status = 2, c._result = j);
      }), c._status === -1 && (c._status = 0, c._result = v);
    }
    if (c._status === 1) return c._result.default;
    throw c._result;
  }
  var fe = { current: null }, S = { transition: null }, L = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: S, ReactCurrentOwner: Y };
  function C() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return D.Children = { map: mt, forEach: function(c, v, j) {
    mt(c, function() {
      v.apply(this, arguments);
    }, j);
  }, count: function(c) {
    var v = 0;
    return mt(c, function() {
      v++;
    }), v;
  }, toArray: function(c) {
    return mt(c, function(v) {
      return v;
    }) || [];
  }, only: function(c) {
    if (!lt(c)) throw Error("React.Children.only expected to receive a single React element child.");
    return c;
  } }, D.Component = $, D.Fragment = m, D.Profiler = Z, D.PureComponent = Ie, D.StrictMode = A, D.Suspense = U, D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L, D.act = C, D.cloneElement = function(c, v, j) {
    if (c == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + c + ".");
    var O = je({}, c.props), V = c.key, H = c.ref, ee = c._owner;
    if (v != null) {
      if (v.ref !== void 0 && (H = v.ref, ee = Y.current), v.key !== void 0 && (V = "" + v.key), c.type && c.type.defaultProps) var X = c.type.defaultProps;
      for (ie in v) F.call(v, ie) && !ne.hasOwnProperty(ie) && (O[ie] = v[ie] === void 0 && X !== void 0 ? X[ie] : v[ie]);
    }
    var ie = arguments.length - 2;
    if (ie === 1) O.children = j;
    else if (1 < ie) {
      X = Array(ie);
      for (var Ye = 0; Ye < ie; Ye++) X[Ye] = arguments[Ye + 2];
      O.children = X;
    }
    return { $$typeof: k, type: c.type, key: V, ref: H, props: O, _owner: ee };
  }, D.createContext = function(c) {
    return c = { $$typeof: J, _currentValue: c, _currentValue2: c, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, c.Provider = { $$typeof: ue, _context: c }, c.Consumer = c;
  }, D.createElement = b, D.createFactory = function(c) {
    var v = b.bind(null, c);
    return v.type = c, v;
  }, D.createRef = function() {
    return { current: null };
  }, D.forwardRef = function(c) {
    return { $$typeof: se, render: c };
  }, D.isValidElement = lt, D.lazy = function(c) {
    return { $$typeof: ve, _payload: { _status: -1, _result: c }, _init: Ue };
  }, D.memo = function(c, v) {
    return { $$typeof: pe, type: c, compare: v === void 0 ? null : v };
  }, D.startTransition = function(c) {
    var v = S.transition;
    S.transition = {};
    try {
      c();
    } finally {
      S.transition = v;
    }
  }, D.unstable_act = C, D.useCallback = function(c, v) {
    return fe.current.useCallback(c, v);
  }, D.useContext = function(c) {
    return fe.current.useContext(c);
  }, D.useDebugValue = function() {
  }, D.useDeferredValue = function(c) {
    return fe.current.useDeferredValue(c);
  }, D.useEffect = function(c, v) {
    return fe.current.useEffect(c, v);
  }, D.useId = function() {
    return fe.current.useId();
  }, D.useImperativeHandle = function(c, v, j) {
    return fe.current.useImperativeHandle(c, v, j);
  }, D.useInsertionEffect = function(c, v) {
    return fe.current.useInsertionEffect(c, v);
  }, D.useLayoutEffect = function(c, v) {
    return fe.current.useLayoutEffect(c, v);
  }, D.useMemo = function(c, v) {
    return fe.current.useMemo(c, v);
  }, D.useReducer = function(c, v, j) {
    return fe.current.useReducer(c, v, j);
  }, D.useRef = function(c) {
    return fe.current.useRef(c);
  }, D.useState = function(c) {
    return fe.current.useState(c);
  }, D.useSyncExternalStore = function(c, v, j) {
    return fe.current.useSyncExternalStore(c, v, j);
  }, D.useTransition = function() {
    return fe.current.useTransition();
  }, D.version = "18.3.1", D;
}
var Na;
function Ti() {
  return Na || (Na = 1, Ci.exports = Df()), Ci.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var za;
function Of() {
  if (za) return yr;
  za = 1;
  var k = Ti(), R = Symbol.for("react.element"), m = Symbol.for("react.fragment"), A = Object.prototype.hasOwnProperty, Z = k.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ue = { key: !0, ref: !0, __self: !0, __source: !0 };
  function J(se, U, pe) {
    var ve, K = {}, Q = null, Me = null;
    pe !== void 0 && (Q = "" + pe), U.key !== void 0 && (Q = "" + U.key), U.ref !== void 0 && (Me = U.ref);
    for (ve in U) A.call(U, ve) && !ue.hasOwnProperty(ve) && (K[ve] = U[ve]);
    if (se && se.defaultProps) for (ve in U = se.defaultProps, U) K[ve] === void 0 && (K[ve] = U[ve]);
    return { $$typeof: R, type: se, key: Q, ref: Me, props: K, _owner: Z.current };
  }
  return yr.Fragment = m, yr.jsx = J, yr.jsxs = J, yr;
}
var Pa;
function Ff() {
  return Pa || (Pa = 1, Ei.exports = Of()), Ei.exports;
}
var I = Ff(), Tl = {}, _i = { exports: {} }, Qe = {}, Ni = { exports: {} }, zi = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ta;
function Uf() {
  return Ta || (Ta = 1, (function(k) {
    function R(S, L) {
      var C = S.length;
      S.push(L);
      e: for (; 0 < C; ) {
        var c = C - 1 >>> 1, v = S[c];
        if (0 < Z(v, L)) S[c] = L, S[C] = v, C = c;
        else break e;
      }
    }
    function m(S) {
      return S.length === 0 ? null : S[0];
    }
    function A(S) {
      if (S.length === 0) return null;
      var L = S[0], C = S.pop();
      if (C !== L) {
        S[0] = C;
        e: for (var c = 0, v = S.length, j = v >>> 1; c < j; ) {
          var O = 2 * (c + 1) - 1, V = S[O], H = O + 1, ee = S[H];
          if (0 > Z(V, C)) H < v && 0 > Z(ee, V) ? (S[c] = ee, S[H] = C, c = H) : (S[c] = V, S[O] = C, c = O);
          else if (H < v && 0 > Z(ee, C)) S[c] = ee, S[H] = C, c = H;
          else break e;
        }
      }
      return L;
    }
    function Z(S, L) {
      var C = S.sortIndex - L.sortIndex;
      return C !== 0 ? C : S.id - L.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var ue = performance;
      k.unstable_now = function() {
        return ue.now();
      };
    } else {
      var J = Date, se = J.now();
      k.unstable_now = function() {
        return J.now() - se;
      };
    }
    var U = [], pe = [], ve = 1, K = null, Q = 3, Me = !1, je = !1, q = !1, $ = typeof setTimeout == "function" ? setTimeout : null, Fe = typeof clearTimeout == "function" ? clearTimeout : null, Ie = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function $e(S) {
      for (var L = m(pe); L !== null; ) {
        if (L.callback === null) A(pe);
        else if (L.startTime <= S) A(pe), L.sortIndex = L.expirationTime, R(U, L);
        else break;
        L = m(pe);
      }
    }
    function ge(S) {
      if (q = !1, $e(S), !je) if (m(U) !== null) je = !0, Ue(F);
      else {
        var L = m(pe);
        L !== null && fe(ge, L.startTime - S);
      }
    }
    function F(S, L) {
      je = !1, q && (q = !1, Fe(b), b = -1), Me = !0;
      var C = Q;
      try {
        for ($e(L), K = m(U); K !== null && (!(K.expirationTime > L) || S && !Yt()); ) {
          var c = K.callback;
          if (typeof c == "function") {
            K.callback = null, Q = K.priorityLevel;
            var v = c(K.expirationTime <= L);
            L = k.unstable_now(), typeof v == "function" ? K.callback = v : K === m(U) && A(U), $e(L);
          } else A(U);
          K = m(U);
        }
        if (K !== null) var j = !0;
        else {
          var O = m(pe);
          O !== null && fe(ge, O.startTime - L), j = !1;
        }
        return j;
      } finally {
        K = null, Q = C, Me = !1;
      }
    }
    var Y = !1, ne = null, b = -1, _e = 5, lt = -1;
    function Yt() {
      return !(k.unstable_now() - lt < _e);
    }
    function pt() {
      if (ne !== null) {
        var S = k.unstable_now();
        lt = S;
        var L = !0;
        try {
          L = ne(!0, S);
        } finally {
          L ? Ke() : (Y = !1, ne = null);
        }
      } else Y = !1;
    }
    var Ke;
    if (typeof Ie == "function") Ke = function() {
      Ie(pt);
    };
    else if (typeof MessageChannel < "u") {
      var ut = new MessageChannel(), mt = ut.port2;
      ut.port1.onmessage = pt, Ke = function() {
        mt.postMessage(null);
      };
    } else Ke = function() {
      $(pt, 0);
    };
    function Ue(S) {
      ne = S, Y || (Y = !0, Ke());
    }
    function fe(S, L) {
      b = $(function() {
        S(k.unstable_now());
      }, L);
    }
    k.unstable_IdlePriority = 5, k.unstable_ImmediatePriority = 1, k.unstable_LowPriority = 4, k.unstable_NormalPriority = 3, k.unstable_Profiling = null, k.unstable_UserBlockingPriority = 2, k.unstable_cancelCallback = function(S) {
      S.callback = null;
    }, k.unstable_continueExecution = function() {
      je || Me || (je = !0, Ue(F));
    }, k.unstable_forceFrameRate = function(S) {
      0 > S || 125 < S ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : _e = 0 < S ? Math.floor(1e3 / S) : 5;
    }, k.unstable_getCurrentPriorityLevel = function() {
      return Q;
    }, k.unstable_getFirstCallbackNode = function() {
      return m(U);
    }, k.unstable_next = function(S) {
      switch (Q) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = Q;
      }
      var C = Q;
      Q = L;
      try {
        return S();
      } finally {
        Q = C;
      }
    }, k.unstable_pauseExecution = function() {
    }, k.unstable_requestPaint = function() {
    }, k.unstable_runWithPriority = function(S, L) {
      switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          S = 3;
      }
      var C = Q;
      Q = S;
      try {
        return L();
      } finally {
        Q = C;
      }
    }, k.unstable_scheduleCallback = function(S, L, C) {
      var c = k.unstable_now();
      switch (typeof C == "object" && C !== null ? (C = C.delay, C = typeof C == "number" && 0 < C ? c + C : c) : C = c, S) {
        case 1:
          var v = -1;
          break;
        case 2:
          v = 250;
          break;
        case 5:
          v = 1073741823;
          break;
        case 4:
          v = 1e4;
          break;
        default:
          v = 5e3;
      }
      return v = C + v, S = { id: ve++, callback: L, priorityLevel: S, startTime: C, expirationTime: v, sortIndex: -1 }, C > c ? (S.sortIndex = C, R(pe, S), m(U) === null && S === m(pe) && (q ? (Fe(b), b = -1) : q = !0, fe(ge, C - c))) : (S.sortIndex = v, R(U, S), je || Me || (je = !0, Ue(F))), S;
    }, k.unstable_shouldYield = Yt, k.unstable_wrapCallback = function(S) {
      var L = Q;
      return function() {
        var C = Q;
        Q = L;
        try {
          return S.apply(this, arguments);
        } finally {
          Q = C;
        }
      };
    };
  })(zi)), zi;
}
var Ra;
function Bf() {
  return Ra || (Ra = 1, Ni.exports = Uf()), Ni.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var La;
function Af() {
  if (La) return Qe;
  La = 1;
  var k = Ti(), R = Bf();
  function m(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var A = /* @__PURE__ */ new Set(), Z = {};
  function ue(e, t) {
    J(e, t), J(e + "Capture", t);
  }
  function J(e, t) {
    for (Z[e] = t, e = 0; e < t.length; e++) A.add(t[e]);
  }
  var se = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), U = Object.prototype.hasOwnProperty, pe = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ve = {}, K = {};
  function Q(e) {
    return U.call(K, e) ? !0 : U.call(ve, e) ? !1 : pe.test(e) ? K[e] = !0 : (ve[e] = !0, !1);
  }
  function Me(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function je(e, t, n, r) {
    if (t === null || typeof t > "u" || Me(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function q(e, t, n, r, l, u, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = i;
  }
  var $ = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    $[e] = new q(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    $[t] = new q(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    $[e] = new q(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    $[e] = new q(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    $[e] = new q(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    $[e] = new q(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    $[e] = new q(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    $[e] = new q(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    $[e] = new q(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Fe = /[\-:]([a-z])/g;
  function Ie(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      Fe,
      Ie
    );
    $[t] = new q(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Fe, Ie);
    $[t] = new q(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Fe, Ie);
    $[t] = new q(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    $[e] = new q(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), $.xlinkHref = new q("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    $[e] = new q(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function $e(e, t, n, r) {
    var l = $.hasOwnProperty(t) ? $[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (je(t, n, l, r) && (n = null), r || l === null ? Q(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var ge = k.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, F = Symbol.for("react.element"), Y = Symbol.for("react.portal"), ne = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), _e = Symbol.for("react.profiler"), lt = Symbol.for("react.provider"), Yt = Symbol.for("react.context"), pt = Symbol.for("react.forward_ref"), Ke = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), mt = Symbol.for("react.memo"), Ue = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), S = Symbol.iterator;
  function L(e) {
    return e === null || typeof e != "object" ? null : (e = S && e[S] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var C = Object.assign, c;
  function v(e) {
    if (c === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      c = t && t[1] || "";
    }
    return `
` + c + e;
  }
  var j = !1;
  function O(e, t) {
    if (!e || j) return "";
    j = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (p) {
          var r = p;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (p) {
          r = p;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (p) {
          r = p;
        }
        e();
      }
    } catch (p) {
      if (p && r && typeof p.stack == "string") {
        for (var l = p.stack.split(`
`), u = r.stack.split(`
`), i = l.length - 1, o = u.length - 1; 1 <= i && 0 <= o && l[i] !== u[o]; ) o--;
        for (; 1 <= i && 0 <= o; i--, o--) if (l[i] !== u[o]) {
          if (i !== 1 || o !== 1)
            do
              if (i--, o--, 0 > o || l[i] !== u[o]) {
                var s = `
` + l[i].replace(" at new ", " at ");
                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
              }
            while (1 <= i && 0 <= o);
          break;
        }
      }
    } finally {
      j = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? v(e) : "";
  }
  function V(e) {
    switch (e.tag) {
      case 5:
        return v(e.type);
      case 16:
        return v("Lazy");
      case 13:
        return v("Suspense");
      case 19:
        return v("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = O(e.type, !1), e;
      case 11:
        return e = O(e.type.render, !1), e;
      case 1:
        return e = O(e.type, !0), e;
      default:
        return "";
    }
  }
  function H(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ne:
        return "Fragment";
      case Y:
        return "Portal";
      case _e:
        return "Profiler";
      case b:
        return "StrictMode";
      case Ke:
        return "Suspense";
      case ut:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Yt:
        return (e.displayName || "Context") + ".Consumer";
      case lt:
        return (e._context.displayName || "Context") + ".Provider";
      case pt:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case mt:
        return t = e.displayName || null, t !== null ? t : H(e.type) || "Memo";
      case Ue:
        t = e._payload, e = e._init;
        try {
          return H(e(t));
        } catch {
        }
    }
    return null;
  }
  function ee(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return H(t);
      case 8:
        return t === b ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function X(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ie(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ye(e) {
    var t = ie(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var l = n.get, u = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(i) {
        r = "" + i, u.call(this, i);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(i) {
        r = "" + i;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function wr(e) {
    e._valueTracker || (e._valueTracker = Ye(e));
  }
  function Ri(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = ie(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function kr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Rl(e, t) {
    var n = t.checked;
    return C({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function Li(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = X(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function Mi(e, t) {
    t = t.checked, t != null && $e(e, "checked", t, !1);
  }
  function Ll(e, t) {
    Mi(e, t);
    var n = X(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Ml(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ml(e, t.type, X(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function ji(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function Ml(e, t, n) {
    (t !== "number" || kr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var jn = Array.isArray;
  function sn(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + X(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          e[l].selected = !0, r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function jl(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(m(91));
    return C({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Ii(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(m(92));
        if (jn(n)) {
          if (1 < n.length) throw Error(m(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: X(n) };
  }
  function Di(e, t) {
    var n = X(t.value), r = X(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function Oi(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Fi(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Il(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Fi(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Sr, Ui = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Sr = Sr || document.createElement("div"), Sr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Sr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function In(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Dn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Ua = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Dn).forEach(function(e) {
    Ua.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Dn[t] = Dn[e];
    });
  });
  function Bi(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Dn.hasOwnProperty(e) && Dn[e] ? ("" + t).trim() : t + "px";
  }
  function Ai(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = Bi(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
  }
  var Ba = C({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Dl(e, t) {
    if (t) {
      if (Ba[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(m(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(m(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(m(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(m(62));
    }
  }
  function Ol(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Fl = null;
  function Ul(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Bl = null, an = null, cn = null;
  function Vi(e) {
    if (e = rr(e)) {
      if (typeof Bl != "function") throw Error(m(280));
      var t = e.stateNode;
      t && (t = Qr(t), Bl(e.stateNode, e.type, t));
    }
  }
  function Hi(e) {
    an ? cn ? cn.push(e) : cn = [e] : an = e;
  }
  function Wi() {
    if (an) {
      var e = an, t = cn;
      if (cn = an = null, Vi(e), t) for (e = 0; e < t.length; e++) Vi(t[e]);
    }
  }
  function Qi(e, t) {
    return e(t);
  }
  function $i() {
  }
  var Al = !1;
  function Ki(e, t, n) {
    if (Al) return e(t, n);
    Al = !0;
    try {
      return Qi(e, t, n);
    } finally {
      Al = !1, (an !== null || cn !== null) && ($i(), Wi());
    }
  }
  function On(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Qr(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(m(231, t, typeof n));
    return n;
  }
  var Vl = !1;
  if (se) try {
    var Fn = {};
    Object.defineProperty(Fn, "passive", { get: function() {
      Vl = !0;
    } }), window.addEventListener("test", Fn, Fn), window.removeEventListener("test", Fn, Fn);
  } catch {
    Vl = !1;
  }
  function Aa(e, t, n, r, l, u, i, o, s) {
    var p = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, p);
    } catch (g) {
      this.onError(g);
    }
  }
  var Un = !1, xr = null, Er = !1, Hl = null, Va = { onError: function(e) {
    Un = !0, xr = e;
  } };
  function Ha(e, t, n, r, l, u, i, o, s) {
    Un = !1, xr = null, Aa.apply(Va, arguments);
  }
  function Wa(e, t, n, r, l, u, i, o, s) {
    if (Ha.apply(this, arguments), Un) {
      if (Un) {
        var p = xr;
        Un = !1, xr = null;
      } else throw Error(m(198));
      Er || (Er = !0, Hl = p);
    }
  }
  function Xt(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Yi(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Xi(e) {
    if (Xt(e) !== e) throw Error(m(188));
  }
  function Qa(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Xt(e), t === null) throw Error(m(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var u = l.alternate;
      if (u === null) {
        if (r = l.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === u.child) {
        for (u = l.child; u; ) {
          if (u === n) return Xi(l), e;
          if (u === r) return Xi(l), t;
          u = u.sibling;
        }
        throw Error(m(188));
      }
      if (n.return !== r.return) n = l, r = u;
      else {
        for (var i = !1, o = l.child; o; ) {
          if (o === n) {
            i = !0, n = l, r = u;
            break;
          }
          if (o === r) {
            i = !0, r = l, n = u;
            break;
          }
          o = o.sibling;
        }
        if (!i) {
          for (o = u.child; o; ) {
            if (o === n) {
              i = !0, n = u, r = l;
              break;
            }
            if (o === r) {
              i = !0, r = u, n = l;
              break;
            }
            o = o.sibling;
          }
          if (!i) throw Error(m(189));
        }
      }
      if (n.alternate !== r) throw Error(m(190));
    }
    if (n.tag !== 3) throw Error(m(188));
    return n.stateNode.current === n ? e : t;
  }
  function Gi(e) {
    return e = Qa(e), e !== null ? Zi(e) : null;
  }
  function Zi(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Zi(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var qi = R.unstable_scheduleCallback, Ji = R.unstable_cancelCallback, $a = R.unstable_shouldYield, Ka = R.unstable_requestPaint, me = R.unstable_now, Ya = R.unstable_getCurrentPriorityLevel, Wl = R.unstable_ImmediatePriority, bi = R.unstable_UserBlockingPriority, Cr = R.unstable_NormalPriority, Xa = R.unstable_LowPriority, eo = R.unstable_IdlePriority, _r = null, ht = null;
  function Ga(e) {
    if (ht && typeof ht.onCommitFiberRoot == "function") try {
      ht.onCommitFiberRoot(_r, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var it = Math.clz32 ? Math.clz32 : Ja, Za = Math.log, qa = Math.LN2;
  function Ja(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Za(e) / qa | 0) | 0;
  }
  var Nr = 64, zr = 4194304;
  function Bn(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Pr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, l = e.suspendedLanes, u = e.pingedLanes, i = n & 268435455;
    if (i !== 0) {
      var o = i & ~l;
      o !== 0 ? r = Bn(o) : (u &= i, u !== 0 && (r = Bn(u)));
    } else i = n & ~l, i !== 0 ? r = Bn(i) : u !== 0 && (r = Bn(u));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & l) === 0 && (l = r & -r, u = t & -t, l >= u || l === 16 && (u & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - it(t), l = 1 << n, r |= e[n], t &= ~l;
    return r;
  }
  function ba(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ec(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var i = 31 - it(u), o = 1 << i, s = l[i];
      s === -1 ? ((o & n) === 0 || (o & r) !== 0) && (l[i] = ba(o, t)) : s <= t && (e.expiredLanes |= o), u &= ~o;
    }
  }
  function Ql(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function to() {
    var e = Nr;
    return Nr <<= 1, (Nr & 4194240) === 0 && (Nr = 64), e;
  }
  function $l(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function An(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - it(t), e[t] = n;
  }
  function tc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - it(n), u = 1 << l;
      t[l] = 0, r[l] = -1, e[l] = -1, n &= ~u;
    }
  }
  function Kl(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - it(n), l = 1 << r;
      l & t | e[r] & t && (e[r] |= t), n &= ~l;
    }
  }
  var G = 0;
  function no(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var ro, Yl, lo, uo, io, Xl = !1, Tr = [], Pt = null, Tt = null, Rt = null, Vn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), Lt = [], nc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function oo(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pt = null;
        break;
      case "dragenter":
      case "dragleave":
        Tt = null;
        break;
      case "mouseover":
      case "mouseout":
        Rt = null;
        break;
      case "pointerover":
      case "pointerout":
        Vn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hn.delete(t.pointerId);
    }
  }
  function Wn(e, t, n, r, l, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: u, targetContainers: [l] }, t !== null && (t = rr(t), t !== null && Yl(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function rc(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return Pt = Wn(Pt, e, t, n, r, l), !0;
      case "dragenter":
        return Tt = Wn(Tt, e, t, n, r, l), !0;
      case "mouseover":
        return Rt = Wn(Rt, e, t, n, r, l), !0;
      case "pointerover":
        var u = l.pointerId;
        return Vn.set(u, Wn(Vn.get(u) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return u = l.pointerId, Hn.set(u, Wn(Hn.get(u) || null, e, t, n, r, l)), !0;
    }
    return !1;
  }
  function so(e) {
    var t = Gt(e.target);
    if (t !== null) {
      var n = Xt(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = Yi(n), t !== null) {
            e.blockedOn = t, io(e.priority, function() {
              lo(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Rr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Zl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        Fl = r, n.target.dispatchEvent(r), Fl = null;
      } else return t = rr(n), t !== null && Yl(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function ao(e, t, n) {
    Rr(e) && n.delete(t);
  }
  function lc() {
    Xl = !1, Pt !== null && Rr(Pt) && (Pt = null), Tt !== null && Rr(Tt) && (Tt = null), Rt !== null && Rr(Rt) && (Rt = null), Vn.forEach(ao), Hn.forEach(ao);
  }
  function Qn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Xl || (Xl = !0, R.unstable_scheduleCallback(R.unstable_NormalPriority, lc)));
  }
  function $n(e) {
    function t(l) {
      return Qn(l, e);
    }
    if (0 < Tr.length) {
      Qn(Tr[0], e);
      for (var n = 1; n < Tr.length; n++) {
        var r = Tr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Pt !== null && Qn(Pt, e), Tt !== null && Qn(Tt, e), Rt !== null && Qn(Rt, e), Vn.forEach(t), Hn.forEach(t), n = 0; n < Lt.length; n++) r = Lt[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Lt.length && (n = Lt[0], n.blockedOn === null); ) so(n), n.blockedOn === null && Lt.shift();
  }
  var fn = ge.ReactCurrentBatchConfig, Lr = !0;
  function uc(e, t, n, r) {
    var l = G, u = fn.transition;
    fn.transition = null;
    try {
      G = 1, Gl(e, t, n, r);
    } finally {
      G = l, fn.transition = u;
    }
  }
  function ic(e, t, n, r) {
    var l = G, u = fn.transition;
    fn.transition = null;
    try {
      G = 4, Gl(e, t, n, r);
    } finally {
      G = l, fn.transition = u;
    }
  }
  function Gl(e, t, n, r) {
    if (Lr) {
      var l = Zl(e, t, n, r);
      if (l === null) pu(e, t, r, Mr, n), oo(e, r);
      else if (rc(l, e, t, n, r)) r.stopPropagation();
      else if (oo(e, r), t & 4 && -1 < nc.indexOf(e)) {
        for (; l !== null; ) {
          var u = rr(l);
          if (u !== null && ro(u), u = Zl(e, t, n, r), u === null && pu(e, t, r, Mr, n), u === l) break;
          l = u;
        }
        l !== null && r.stopPropagation();
      } else pu(e, t, r, null, n);
    }
  }
  var Mr = null;
  function Zl(e, t, n, r) {
    if (Mr = null, e = Ul(r), e = Gt(e), e !== null) if (t = Xt(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = Yi(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Mr = e, null;
  }
  function co(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Ya()) {
          case Wl:
            return 1;
          case bi:
            return 4;
          case Cr:
          case Xa:
            return 16;
          case eo:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Mt = null, ql = null, jr = null;
  function fo() {
    if (jr) return jr;
    var e, t = ql, n = t.length, r, l = "value" in Mt ? Mt.value : Mt.textContent, u = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[u - r]; r++) ;
    return jr = l.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Ir(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Dr() {
    return !0;
  }
  function po() {
    return !1;
  }
  function Xe(e) {
    function t(n, r, l, u, i) {
      this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var o in e) e.hasOwnProperty(o) && (n = e[o], this[o] = n ? n(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Dr : po, this.isPropagationStopped = po, this;
    }
    return C(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Dr);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Dr);
    }, persist: function() {
    }, isPersistent: Dr }), t;
  }
  var dn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Jl = Xe(dn), Kn = C({}, dn, { view: 0, detail: 0 }), oc = Xe(Kn), bl, eu, Yn, Or = C({}, Kn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: nu, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Yn && (Yn && e.type === "mousemove" ? (bl = e.screenX - Yn.screenX, eu = e.screenY - Yn.screenY) : eu = bl = 0, Yn = e), bl);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : eu;
  } }), mo = Xe(Or), sc = C({}, Or, { dataTransfer: 0 }), ac = Xe(sc), cc = C({}, Kn, { relatedTarget: 0 }), tu = Xe(cc), fc = C({}, dn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), dc = Xe(fc), pc = C({}, dn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), mc = Xe(pc), hc = C({}, dn, { data: 0 }), ho = Xe(hc), vc = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, gc = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, yc = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function wc(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = yc[e]) ? !!t[e] : !1;
  }
  function nu() {
    return wc;
  }
  var kc = C({}, Kn, { key: function(e) {
    if (e.key) {
      var t = vc[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Ir(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? gc[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: nu, charCode: function(e) {
    return e.type === "keypress" ? Ir(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Ir(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Sc = Xe(kc), xc = C({}, Or, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), vo = Xe(xc), Ec = C({}, Kn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: nu }), Cc = Xe(Ec), _c = C({}, dn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Nc = Xe(_c), zc = C({}, Or, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Pc = Xe(zc), Tc = [9, 13, 27, 32], ru = se && "CompositionEvent" in window, Xn = null;
  se && "documentMode" in document && (Xn = document.documentMode);
  var Rc = se && "TextEvent" in window && !Xn, go = se && (!ru || Xn && 8 < Xn && 11 >= Xn), yo = " ", wo = !1;
  function ko(e, t) {
    switch (e) {
      case "keyup":
        return Tc.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function So(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var pn = !1;
  function Lc(e, t) {
    switch (e) {
      case "compositionend":
        return So(t);
      case "keypress":
        return t.which !== 32 ? null : (wo = !0, yo);
      case "textInput":
        return e = t.data, e === yo && wo ? null : e;
      default:
        return null;
    }
  }
  function Mc(e, t) {
    if (pn) return e === "compositionend" || !ru && ko(e, t) ? (e = fo(), jr = ql = Mt = null, pn = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return go && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var jc = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function xo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!jc[e.type] : t === "textarea";
  }
  function Eo(e, t, n, r) {
    Hi(r), t = Vr(t, "onChange"), 0 < t.length && (n = new Jl("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var Gn = null, Zn = null;
  function Ic(e) {
    Vo(e, 0);
  }
  function Fr(e) {
    var t = yn(e);
    if (Ri(t)) return e;
  }
  function Dc(e, t) {
    if (e === "change") return t;
  }
  var Co = !1;
  if (se) {
    var lu;
    if (se) {
      var uu = "oninput" in document;
      if (!uu) {
        var _o = document.createElement("div");
        _o.setAttribute("oninput", "return;"), uu = typeof _o.oninput == "function";
      }
      lu = uu;
    } else lu = !1;
    Co = lu && (!document.documentMode || 9 < document.documentMode);
  }
  function No() {
    Gn && (Gn.detachEvent("onpropertychange", zo), Zn = Gn = null);
  }
  function zo(e) {
    if (e.propertyName === "value" && Fr(Zn)) {
      var t = [];
      Eo(t, Zn, e, Ul(e)), Ki(Ic, t);
    }
  }
  function Oc(e, t, n) {
    e === "focusin" ? (No(), Gn = t, Zn = n, Gn.attachEvent("onpropertychange", zo)) : e === "focusout" && No();
  }
  function Fc(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Fr(Zn);
  }
  function Uc(e, t) {
    if (e === "click") return Fr(t);
  }
  function Bc(e, t) {
    if (e === "input" || e === "change") return Fr(t);
  }
  function Ac(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ot = typeof Object.is == "function" ? Object.is : Ac;
  function qn(e, t) {
    if (ot(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!U.call(t, l) || !ot(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Po(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function To(e, t) {
    var n = Po(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Po(n);
    }
  }
  function Ro(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ro(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Lo() {
    for (var e = window, t = kr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = kr(e.document);
    }
    return t;
  }
  function iu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Vc(e) {
    var t = Lo(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Ro(n.ownerDocument.documentElement, n)) {
      if (r !== null && iu(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = n.textContent.length, u = Math.min(r.start, l);
          r = r.end === void 0 ? u : Math.min(r.end, l), !e.extend && u > r && (l = r, r = u, u = l), l = To(n, u);
          var i = To(
            n,
            r
          );
          l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), u > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Hc = se && "documentMode" in document && 11 >= document.documentMode, mn = null, ou = null, Jn = null, su = !1;
  function Mo(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    su || mn == null || mn !== kr(r) || (r = mn, "selectionStart" in r && iu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Jn && qn(Jn, r) || (Jn = r, r = Vr(ou, "onSelect"), 0 < r.length && (t = new Jl("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = mn)));
  }
  function Ur(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var hn = { animationend: Ur("Animation", "AnimationEnd"), animationiteration: Ur("Animation", "AnimationIteration"), animationstart: Ur("Animation", "AnimationStart"), transitionend: Ur("Transition", "TransitionEnd") }, au = {}, jo = {};
  se && (jo = document.createElement("div").style, "AnimationEvent" in window || (delete hn.animationend.animation, delete hn.animationiteration.animation, delete hn.animationstart.animation), "TransitionEvent" in window || delete hn.transitionend.transition);
  function Br(e) {
    if (au[e]) return au[e];
    if (!hn[e]) return e;
    var t = hn[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in jo) return au[e] = t[n];
    return e;
  }
  var Io = Br("animationend"), Do = Br("animationiteration"), Oo = Br("animationstart"), Fo = Br("transitionend"), Uo = /* @__PURE__ */ new Map(), Bo = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function jt(e, t) {
    Uo.set(e, t), ue(t, [e]);
  }
  for (var cu = 0; cu < Bo.length; cu++) {
    var fu = Bo[cu], Wc = fu.toLowerCase(), Qc = fu[0].toUpperCase() + fu.slice(1);
    jt(Wc, "on" + Qc);
  }
  jt(Io, "onAnimationEnd"), jt(Do, "onAnimationIteration"), jt(Oo, "onAnimationStart"), jt("dblclick", "onDoubleClick"), jt("focusin", "onFocus"), jt("focusout", "onBlur"), jt(Fo, "onTransitionEnd"), J("onMouseEnter", ["mouseout", "mouseover"]), J("onMouseLeave", ["mouseout", "mouseover"]), J("onPointerEnter", ["pointerout", "pointerover"]), J("onPointerLeave", ["pointerout", "pointerover"]), ue("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ue("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ue("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), ue("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ue("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ue("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var bn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), $c = new Set("cancel close invalid load scroll toggle".split(" ").concat(bn));
  function Ao(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Wa(r, t, void 0, e), e.currentTarget = null;
  }
  function Vo(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], l = r.event;
      r = r.listeners;
      e: {
        var u = void 0;
        if (t) for (var i = r.length - 1; 0 <= i; i--) {
          var o = r[i], s = o.instance, p = o.currentTarget;
          if (o = o.listener, s !== u && l.isPropagationStopped()) break e;
          Ao(l, o, p), u = s;
        }
        else for (i = 0; i < r.length; i++) {
          if (o = r[i], s = o.instance, p = o.currentTarget, o = o.listener, s !== u && l.isPropagationStopped()) break e;
          Ao(l, o, p), u = s;
        }
      }
    }
    if (Er) throw e = Hl, Er = !1, Hl = null, e;
  }
  function re(e, t) {
    var n = t[wu];
    n === void 0 && (n = t[wu] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (Ho(t, e, 2, !1), n.add(r));
  }
  function du(e, t, n) {
    var r = 0;
    t && (r |= 4), Ho(n, e, r, t);
  }
  var Ar = "_reactListening" + Math.random().toString(36).slice(2);
  function er(e) {
    if (!e[Ar]) {
      e[Ar] = !0, A.forEach(function(n) {
        n !== "selectionchange" && ($c.has(n) || du(n, !1, e), du(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ar] || (t[Ar] = !0, du("selectionchange", !1, t));
    }
  }
  function Ho(e, t, n, r) {
    switch (co(t)) {
      case 1:
        var l = uc;
        break;
      case 4:
        l = ic;
        break;
      default:
        l = Gl;
    }
    n = l.bind(null, t, n, e), l = void 0, !Vl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
  }
  function pu(e, t, n, r, l) {
    var u = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var o = r.stateNode.containerInfo;
        if (o === l || o.nodeType === 8 && o.parentNode === l) break;
        if (i === 4) for (i = r.return; i !== null; ) {
          var s = i.tag;
          if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
          i = i.return;
        }
        for (; o !== null; ) {
          if (i = Gt(o), i === null) return;
          if (s = i.tag, s === 5 || s === 6) {
            r = u = i;
            continue e;
          }
          o = o.parentNode;
        }
      }
      r = r.return;
    }
    Ki(function() {
      var p = u, g = Ul(n), y = [];
      e: {
        var h = Uo.get(e);
        if (h !== void 0) {
          var x = Jl, _ = e;
          switch (e) {
            case "keypress":
              if (Ir(n) === 0) break e;
            case "keydown":
            case "keyup":
              x = Sc;
              break;
            case "focusin":
              _ = "focus", x = tu;
              break;
            case "focusout":
              _ = "blur", x = tu;
              break;
            case "beforeblur":
            case "afterblur":
              x = tu;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              x = mo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = ac;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = Cc;
              break;
            case Io:
            case Do:
            case Oo:
              x = dc;
              break;
            case Fo:
              x = Nc;
              break;
            case "scroll":
              x = oc;
              break;
            case "wheel":
              x = Pc;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = mc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = vo;
          }
          var N = (t & 4) !== 0, he = !N && e === "scroll", f = N ? h !== null ? h + "Capture" : null : h;
          N = [];
          for (var a = p, d; a !== null; ) {
            d = a;
            var w = d.stateNode;
            if (d.tag === 5 && w !== null && (d = w, f !== null && (w = On(a, f), w != null && N.push(tr(a, w, d)))), he) break;
            a = a.return;
          }
          0 < N.length && (h = new x(h, _, null, n, g), y.push({ event: h, listeners: N }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (h = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", h && n !== Fl && (_ = n.relatedTarget || n.fromElement) && (Gt(_) || _[kt])) break e;
          if ((x || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, x ? (_ = n.relatedTarget || n.toElement, x = p, _ = _ ? Gt(_) : null, _ !== null && (he = Xt(_), _ !== he || _.tag !== 5 && _.tag !== 6) && (_ = null)) : (x = null, _ = p), x !== _)) {
            if (N = mo, w = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (N = vo, w = "onPointerLeave", f = "onPointerEnter", a = "pointer"), he = x == null ? h : yn(x), d = _ == null ? h : yn(_), h = new N(w, a + "leave", x, n, g), h.target = he, h.relatedTarget = d, w = null, Gt(g) === p && (N = new N(f, a + "enter", _, n, g), N.target = d, N.relatedTarget = he, w = N), he = w, x && _) t: {
              for (N = x, f = _, a = 0, d = N; d; d = vn(d)) a++;
              for (d = 0, w = f; w; w = vn(w)) d++;
              for (; 0 < a - d; ) N = vn(N), a--;
              for (; 0 < d - a; ) f = vn(f), d--;
              for (; a--; ) {
                if (N === f || f !== null && N === f.alternate) break t;
                N = vn(N), f = vn(f);
              }
              N = null;
            }
            else N = null;
            x !== null && Wo(y, h, x, N, !1), _ !== null && he !== null && Wo(y, he, _, N, !0);
          }
        }
        e: {
          if (h = p ? yn(p) : window, x = h.nodeName && h.nodeName.toLowerCase(), x === "select" || x === "input" && h.type === "file") var z = Dc;
          else if (xo(h)) if (Co) z = Bc;
          else {
            z = Fc;
            var P = Oc;
          }
          else (x = h.nodeName) && x.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (z = Uc);
          if (z && (z = z(e, p))) {
            Eo(y, z, n, g);
            break e;
          }
          P && P(e, h, p), e === "focusout" && (P = h._wrapperState) && P.controlled && h.type === "number" && Ml(h, "number", h.value);
        }
        switch (P = p ? yn(p) : window, e) {
          case "focusin":
            (xo(P) || P.contentEditable === "true") && (mn = P, ou = p, Jn = null);
            break;
          case "focusout":
            Jn = ou = mn = null;
            break;
          case "mousedown":
            su = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            su = !1, Mo(y, n, g);
            break;
          case "selectionchange":
            if (Hc) break;
          case "keydown":
          case "keyup":
            Mo(y, n, g);
        }
        var T;
        if (ru) e: {
          switch (e) {
            case "compositionstart":
              var M = "onCompositionStart";
              break e;
            case "compositionend":
              M = "onCompositionEnd";
              break e;
            case "compositionupdate":
              M = "onCompositionUpdate";
              break e;
          }
          M = void 0;
        }
        else pn ? ko(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
        M && (go && n.locale !== "ko" && (pn || M !== "onCompositionStart" ? M === "onCompositionEnd" && pn && (T = fo()) : (Mt = g, ql = "value" in Mt ? Mt.value : Mt.textContent, pn = !0)), P = Vr(p, M), 0 < P.length && (M = new ho(M, e, null, n, g), y.push({ event: M, listeners: P }), T ? M.data = T : (T = So(n), T !== null && (M.data = T)))), (T = Rc ? Lc(e, n) : Mc(e, n)) && (p = Vr(p, "onBeforeInput"), 0 < p.length && (g = new ho("onBeforeInput", "beforeinput", null, n, g), y.push({ event: g, listeners: p }), g.data = T));
      }
      Vo(y, t);
    });
  }
  function tr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Vr(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e, u = l.stateNode;
      l.tag === 5 && u !== null && (l = u, u = On(e, n), u != null && r.unshift(tr(e, u, l)), u = On(e, t), u != null && r.push(tr(e, u, l))), e = e.return;
    }
    return r;
  }
  function vn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Wo(e, t, n, r, l) {
    for (var u = t._reactName, i = []; n !== null && n !== r; ) {
      var o = n, s = o.alternate, p = o.stateNode;
      if (s !== null && s === r) break;
      o.tag === 5 && p !== null && (o = p, l ? (s = On(n, u), s != null && i.unshift(tr(n, s, o))) : l || (s = On(n, u), s != null && i.push(tr(n, s, o)))), n = n.return;
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var Kc = /\r\n?/g, Yc = /\u0000|\uFFFD/g;
  function Qo(e) {
    return (typeof e == "string" ? e : "" + e).replace(Kc, `
`).replace(Yc, "");
  }
  function Hr(e, t, n) {
    if (t = Qo(t), Qo(e) !== t && n) throw Error(m(425));
  }
  function Wr() {
  }
  var mu = null, hu = null;
  function vu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var gu = typeof setTimeout == "function" ? setTimeout : void 0, Xc = typeof clearTimeout == "function" ? clearTimeout : void 0, $o = typeof Promise == "function" ? Promise : void 0, Gc = typeof queueMicrotask == "function" ? queueMicrotask : typeof $o < "u" ? function(e) {
    return $o.resolve(null).then(e).catch(Zc);
  } : gu;
  function Zc(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function yu(e, t) {
    var n = t, r = 0;
    do {
      var l = n.nextSibling;
      if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), $n(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = l;
    } while (n);
    $n(t);
  }
  function It(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Ko(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var gn = Math.random().toString(36).slice(2), vt = "__reactFiber$" + gn, nr = "__reactProps$" + gn, kt = "__reactContainer$" + gn, wu = "__reactEvents$" + gn, qc = "__reactListeners$" + gn, Jc = "__reactHandles$" + gn;
  function Gt(e) {
    var t = e[vt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[kt] || n[vt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ko(e); e !== null; ) {
          if (n = e[vt]) return n;
          e = Ko(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function rr(e) {
    return e = e[vt] || e[kt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function yn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(m(33));
  }
  function Qr(e) {
    return e[nr] || null;
  }
  var ku = [], wn = -1;
  function Dt(e) {
    return { current: e };
  }
  function le(e) {
    0 > wn || (e.current = ku[wn], ku[wn] = null, wn--);
  }
  function te(e, t) {
    wn++, ku[wn] = e.current, e.current = t;
  }
  var Ot = {}, Pe = Dt(Ot), Be = Dt(!1), Zt = Ot;
  function kn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Ot;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, u;
    for (u in n) l[u] = t[u];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function Ae(e) {
    return e = e.childContextTypes, e != null;
  }
  function $r() {
    le(Be), le(Pe);
  }
  function Yo(e, t, n) {
    if (Pe.current !== Ot) throw Error(m(168));
    te(Pe, t), te(Be, n);
  }
  function Xo(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(m(108, ee(e) || "Unknown", l));
    return C({}, n, r);
  }
  function Kr(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ot, Zt = Pe.current, te(Pe, e), te(Be, Be.current), !0;
  }
  function Go(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(m(169));
    n ? (e = Xo(e, t, Zt), r.__reactInternalMemoizedMergedChildContext = e, le(Be), le(Pe), te(Pe, e)) : le(Be), te(Be, n);
  }
  var St = null, Yr = !1, Su = !1;
  function Zo(e) {
    St === null ? St = [e] : St.push(e);
  }
  function bc(e) {
    Yr = !0, Zo(e);
  }
  function Ft() {
    if (!Su && St !== null) {
      Su = !0;
      var e = 0, t = G;
      try {
        var n = St;
        for (G = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        St = null, Yr = !1;
      } catch (l) {
        throw St !== null && (St = St.slice(e + 1)), qi(Wl, Ft), l;
      } finally {
        G = t, Su = !1;
      }
    }
    return null;
  }
  var Sn = [], xn = 0, Xr = null, Gr = 0, Je = [], be = 0, qt = null, xt = 1, Et = "";
  function Jt(e, t) {
    Sn[xn++] = Gr, Sn[xn++] = Xr, Xr = e, Gr = t;
  }
  function qo(e, t, n) {
    Je[be++] = xt, Je[be++] = Et, Je[be++] = qt, qt = e;
    var r = xt;
    e = Et;
    var l = 32 - it(r) - 1;
    r &= ~(1 << l), n += 1;
    var u = 32 - it(t) + l;
    if (30 < u) {
      var i = l - l % 5;
      u = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, xt = 1 << 32 - it(t) + l | n << l | r, Et = u + e;
    } else xt = 1 << u | n << l | r, Et = e;
  }
  function xu(e) {
    e.return !== null && (Jt(e, 1), qo(e, 1, 0));
  }
  function Eu(e) {
    for (; e === Xr; ) Xr = Sn[--xn], Sn[xn] = null, Gr = Sn[--xn], Sn[xn] = null;
    for (; e === qt; ) qt = Je[--be], Je[be] = null, Et = Je[--be], Je[be] = null, xt = Je[--be], Je[be] = null;
  }
  var Ge = null, Ze = null, oe = !1, st = null;
  function Jo(e, t) {
    var n = rt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function bo(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ge = e, Ze = It(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ge = e, Ze = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = qt !== null ? { id: xt, overflow: Et } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = rt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ge = e, Ze = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Cu(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function _u(e) {
    if (oe) {
      var t = Ze;
      if (t) {
        var n = t;
        if (!bo(e, t)) {
          if (Cu(e)) throw Error(m(418));
          t = It(n.nextSibling);
          var r = Ge;
          t && bo(e, t) ? Jo(r, n) : (e.flags = e.flags & -4097 | 2, oe = !1, Ge = e);
        }
      } else {
        if (Cu(e)) throw Error(m(418));
        e.flags = e.flags & -4097 | 2, oe = !1, Ge = e;
      }
    }
  }
  function es(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Ge = e;
  }
  function Zr(e) {
    if (e !== Ge) return !1;
    if (!oe) return es(e), oe = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !vu(e.type, e.memoizedProps)), t && (t = Ze)) {
      if (Cu(e)) throw ts(), Error(m(418));
      for (; t; ) Jo(e, t), t = It(t.nextSibling);
    }
    if (es(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(m(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Ze = It(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        Ze = null;
      }
    } else Ze = Ge ? It(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ts() {
    for (var e = Ze; e; ) e = It(e.nextSibling);
  }
  function En() {
    Ze = Ge = null, oe = !1;
  }
  function Nu(e) {
    st === null ? st = [e] : st.push(e);
  }
  var ef = ge.ReactCurrentBatchConfig;
  function lr(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(m(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(m(147, e));
        var l = r, u = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(i) {
          var o = l.refs;
          i === null ? delete o[u] : o[u] = i;
        }, t._stringRef = u, t);
      }
      if (typeof e != "string") throw Error(m(284));
      if (!n._owner) throw Error(m(290, e));
    }
    return e;
  }
  function qr(e, t) {
    throw e = Object.prototype.toString.call(t), Error(m(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function ns(e) {
    var t = e._init;
    return t(e._payload);
  }
  function rs(e) {
    function t(f, a) {
      if (e) {
        var d = f.deletions;
        d === null ? (f.deletions = [a], f.flags |= 16) : d.push(a);
      }
    }
    function n(f, a) {
      if (!e) return null;
      for (; a !== null; ) t(f, a), a = a.sibling;
      return null;
    }
    function r(f, a) {
      for (f = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? f.set(a.key, a) : f.set(a.index, a), a = a.sibling;
      return f;
    }
    function l(f, a) {
      return f = $t(f, a), f.index = 0, f.sibling = null, f;
    }
    function u(f, a, d) {
      return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
    }
    function i(f) {
      return e && f.alternate === null && (f.flags |= 2), f;
    }
    function o(f, a, d, w) {
      return a === null || a.tag !== 6 ? (a = gi(d, f.mode, w), a.return = f, a) : (a = l(a, d), a.return = f, a);
    }
    function s(f, a, d, w) {
      var z = d.type;
      return z === ne ? g(f, a, d.props.children, w, d.key) : a !== null && (a.elementType === z || typeof z == "object" && z !== null && z.$$typeof === Ue && ns(z) === a.type) ? (w = l(a, d.props), w.ref = lr(f, a, d), w.return = f, w) : (w = Sl(d.type, d.key, d.props, null, f.mode, w), w.ref = lr(f, a, d), w.return = f, w);
    }
    function p(f, a, d, w) {
      return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = yi(d, f.mode, w), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
    }
    function g(f, a, d, w, z) {
      return a === null || a.tag !== 7 ? (a = on(d, f.mode, w, z), a.return = f, a) : (a = l(a, d), a.return = f, a);
    }
    function y(f, a, d) {
      if (typeof a == "string" && a !== "" || typeof a == "number") return a = gi("" + a, f.mode, d), a.return = f, a;
      if (typeof a == "object" && a !== null) {
        switch (a.$$typeof) {
          case F:
            return d = Sl(a.type, a.key, a.props, null, f.mode, d), d.ref = lr(f, null, a), d.return = f, d;
          case Y:
            return a = yi(a, f.mode, d), a.return = f, a;
          case Ue:
            var w = a._init;
            return y(f, w(a._payload), d);
        }
        if (jn(a) || L(a)) return a = on(a, f.mode, d, null), a.return = f, a;
        qr(f, a);
      }
      return null;
    }
    function h(f, a, d, w) {
      var z = a !== null ? a.key : null;
      if (typeof d == "string" && d !== "" || typeof d == "number") return z !== null ? null : o(f, a, "" + d, w);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case F:
            return d.key === z ? s(f, a, d, w) : null;
          case Y:
            return d.key === z ? p(f, a, d, w) : null;
          case Ue:
            return z = d._init, h(
              f,
              a,
              z(d._payload),
              w
            );
        }
        if (jn(d) || L(d)) return z !== null ? null : g(f, a, d, w, null);
        qr(f, d);
      }
      return null;
    }
    function x(f, a, d, w, z) {
      if (typeof w == "string" && w !== "" || typeof w == "number") return f = f.get(d) || null, o(a, f, "" + w, z);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case F:
            return f = f.get(w.key === null ? d : w.key) || null, s(a, f, w, z);
          case Y:
            return f = f.get(w.key === null ? d : w.key) || null, p(a, f, w, z);
          case Ue:
            var P = w._init;
            return x(f, a, d, P(w._payload), z);
        }
        if (jn(w) || L(w)) return f = f.get(d) || null, g(a, f, w, z, null);
        qr(a, w);
      }
      return null;
    }
    function _(f, a, d, w) {
      for (var z = null, P = null, T = a, M = a = 0, Ee = null; T !== null && M < d.length; M++) {
        T.index > M ? (Ee = T, T = null) : Ee = T.sibling;
        var W = h(f, T, d[M], w);
        if (W === null) {
          T === null && (T = Ee);
          break;
        }
        e && T && W.alternate === null && t(f, T), a = u(W, a, M), P === null ? z = W : P.sibling = W, P = W, T = Ee;
      }
      if (M === d.length) return n(f, T), oe && Jt(f, M), z;
      if (T === null) {
        for (; M < d.length; M++) T = y(f, d[M], w), T !== null && (a = u(T, a, M), P === null ? z = T : P.sibling = T, P = T);
        return oe && Jt(f, M), z;
      }
      for (T = r(f, T); M < d.length; M++) Ee = x(T, f, M, d[M], w), Ee !== null && (e && Ee.alternate !== null && T.delete(Ee.key === null ? M : Ee.key), a = u(Ee, a, M), P === null ? z = Ee : P.sibling = Ee, P = Ee);
      return e && T.forEach(function(Kt) {
        return t(f, Kt);
      }), oe && Jt(f, M), z;
    }
    function N(f, a, d, w) {
      var z = L(d);
      if (typeof z != "function") throw Error(m(150));
      if (d = z.call(d), d == null) throw Error(m(151));
      for (var P = z = null, T = a, M = a = 0, Ee = null, W = d.next(); T !== null && !W.done; M++, W = d.next()) {
        T.index > M ? (Ee = T, T = null) : Ee = T.sibling;
        var Kt = h(f, T, W.value, w);
        if (Kt === null) {
          T === null && (T = Ee);
          break;
        }
        e && T && Kt.alternate === null && t(f, T), a = u(Kt, a, M), P === null ? z = Kt : P.sibling = Kt, P = Kt, T = Ee;
      }
      if (W.done) return n(
        f,
        T
      ), oe && Jt(f, M), z;
      if (T === null) {
        for (; !W.done; M++, W = d.next()) W = y(f, W.value, w), W !== null && (a = u(W, a, M), P === null ? z = W : P.sibling = W, P = W);
        return oe && Jt(f, M), z;
      }
      for (T = r(f, T); !W.done; M++, W = d.next()) W = x(T, f, M, W.value, w), W !== null && (e && W.alternate !== null && T.delete(W.key === null ? M : W.key), a = u(W, a, M), P === null ? z = W : P.sibling = W, P = W);
      return e && T.forEach(function(If) {
        return t(f, If);
      }), oe && Jt(f, M), z;
    }
    function he(f, a, d, w) {
      if (typeof d == "object" && d !== null && d.type === ne && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case F:
            e: {
              for (var z = d.key, P = a; P !== null; ) {
                if (P.key === z) {
                  if (z = d.type, z === ne) {
                    if (P.tag === 7) {
                      n(f, P.sibling), a = l(P, d.props.children), a.return = f, f = a;
                      break e;
                    }
                  } else if (P.elementType === z || typeof z == "object" && z !== null && z.$$typeof === Ue && ns(z) === P.type) {
                    n(f, P.sibling), a = l(P, d.props), a.ref = lr(f, P, d), a.return = f, f = a;
                    break e;
                  }
                  n(f, P);
                  break;
                } else t(f, P);
                P = P.sibling;
              }
              d.type === ne ? (a = on(d.props.children, f.mode, w, d.key), a.return = f, f = a) : (w = Sl(d.type, d.key, d.props, null, f.mode, w), w.ref = lr(f, a, d), w.return = f, f = w);
            }
            return i(f);
          case Y:
            e: {
              for (P = d.key; a !== null; ) {
                if (a.key === P) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                  n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                  break e;
                } else {
                  n(f, a);
                  break;
                }
                else t(f, a);
                a = a.sibling;
              }
              a = yi(d, f.mode, w), a.return = f, f = a;
            }
            return i(f);
          case Ue:
            return P = d._init, he(f, a, P(d._payload), w);
        }
        if (jn(d)) return _(f, a, d, w);
        if (L(d)) return N(f, a, d, w);
        qr(f, d);
      }
      return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = gi(d, f.mode, w), a.return = f, f = a), i(f)) : n(f, a);
    }
    return he;
  }
  var Cn = rs(!0), ls = rs(!1), Jr = Dt(null), br = null, _n = null, zu = null;
  function Pu() {
    zu = _n = br = null;
  }
  function Tu(e) {
    var t = Jr.current;
    le(Jr), e._currentValue = t;
  }
  function Ru(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Nn(e, t) {
    br = e, zu = _n = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ve = !0), e.firstContext = null);
  }
  function et(e) {
    var t = e._currentValue;
    if (zu !== e) if (e = { context: e, memoizedValue: t, next: null }, _n === null) {
      if (br === null) throw Error(m(308));
      _n = e, br.dependencies = { lanes: 0, firstContext: e };
    } else _n = _n.next = e;
    return t;
  }
  var bt = null;
  function Lu(e) {
    bt === null ? bt = [e] : bt.push(e);
  }
  function us(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n, Lu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ct(e, r);
  }
  function Ct(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Ut = !1;
  function Mu(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function is(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function _t(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Bt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (B & 2) !== 0) {
      var l = r.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ct(e, n);
    }
    return l = r.interleaved, l === null ? (t.next = t, Lu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ct(e, n);
  }
  function el(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Kl(e, n);
    }
  }
  function os(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var l = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          u === null ? l = u = i : u = u.next = i, n = n.next;
        } while (n !== null);
        u === null ? l = u = t : u = u.next = t;
      } else l = u = t;
      n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: u, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function tl(e, t, n, r) {
    var l = e.updateQueue;
    Ut = !1;
    var u = l.firstBaseUpdate, i = l.lastBaseUpdate, o = l.shared.pending;
    if (o !== null) {
      l.shared.pending = null;
      var s = o, p = s.next;
      s.next = null, i === null ? u = p : i.next = p, i = s;
      var g = e.alternate;
      g !== null && (g = g.updateQueue, o = g.lastBaseUpdate, o !== i && (o === null ? g.firstBaseUpdate = p : o.next = p, g.lastBaseUpdate = s));
    }
    if (u !== null) {
      var y = l.baseState;
      i = 0, g = p = s = null, o = u;
      do {
        var h = o.lane, x = o.eventTime;
        if ((r & h) === h) {
          g !== null && (g = g.next = {
            eventTime: x,
            lane: 0,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null
          });
          e: {
            var _ = e, N = o;
            switch (h = t, x = n, N.tag) {
              case 1:
                if (_ = N.payload, typeof _ == "function") {
                  y = _.call(x, y, h);
                  break e;
                }
                y = _;
                break e;
              case 3:
                _.flags = _.flags & -65537 | 128;
              case 0:
                if (_ = N.payload, h = typeof _ == "function" ? _.call(x, y, h) : _, h == null) break e;
                y = C({}, y, h);
                break e;
              case 2:
                Ut = !0;
            }
          }
          o.callback !== null && o.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [o] : h.push(o));
        } else x = { eventTime: x, lane: h, tag: o.tag, payload: o.payload, callback: o.callback, next: null }, g === null ? (p = g = x, s = y) : g = g.next = x, i |= h;
        if (o = o.next, o === null) {
          if (o = l.shared.pending, o === null) break;
          h = o, o = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
        }
      } while (!0);
      if (g === null && (s = y), l.baseState = s, l.firstBaseUpdate = p, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          i |= l.lane, l = l.next;
        while (l !== t);
      } else u === null && (l.shared.lanes = 0);
      nn |= i, e.lanes = i, e.memoizedState = y;
    }
  }
  function ss(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function") throw Error(m(191, l));
        l.call(r);
      }
    }
  }
  var ur = {}, gt = Dt(ur), ir = Dt(ur), or = Dt(ur);
  function en(e) {
    if (e === ur) throw Error(m(174));
    return e;
  }
  function ju(e, t) {
    switch (te(or, t), te(ir, e), te(gt, ur), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Il(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Il(t, e);
    }
    le(gt), te(gt, t);
  }
  function zn() {
    le(gt), le(ir), le(or);
  }
  function as(e) {
    en(or.current);
    var t = en(gt.current), n = Il(t, e.type);
    t !== n && (te(ir, e), te(gt, n));
  }
  function Iu(e) {
    ir.current === e && (le(gt), le(ir));
  }
  var ae = Dt(0);
  function nl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Du = [];
  function Ou() {
    for (var e = 0; e < Du.length; e++) Du[e]._workInProgressVersionPrimary = null;
    Du.length = 0;
  }
  var rl = ge.ReactCurrentDispatcher, Fu = ge.ReactCurrentBatchConfig, tn = 0, ce = null, we = null, Se = null, ll = !1, sr = !1, ar = 0, tf = 0;
  function Te() {
    throw Error(m(321));
  }
  function Uu(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!ot(e[n], t[n])) return !1;
    return !0;
  }
  function Bu(e, t, n, r, l, u) {
    if (tn = u, ce = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, rl.current = e === null || e.memoizedState === null ? uf : of, e = n(r, l), sr) {
      u = 0;
      do {
        if (sr = !1, ar = 0, 25 <= u) throw Error(m(301));
        u += 1, Se = we = null, t.updateQueue = null, rl.current = sf, e = n(r, l);
      } while (sr);
    }
    if (rl.current = ol, t = we !== null && we.next !== null, tn = 0, Se = we = ce = null, ll = !1, t) throw Error(m(300));
    return e;
  }
  function Au() {
    var e = ar !== 0;
    return ar = 0, e;
  }
  function yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Se === null ? ce.memoizedState = Se = e : Se = Se.next = e, Se;
  }
  function tt() {
    if (we === null) {
      var e = ce.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = we.next;
    var t = Se === null ? ce.memoizedState : Se.next;
    if (t !== null) Se = t, we = e;
    else {
      if (e === null) throw Error(m(310));
      we = e, e = { memoizedState: we.memoizedState, baseState: we.baseState, baseQueue: we.baseQueue, queue: we.queue, next: null }, Se === null ? ce.memoizedState = Se = e : Se = Se.next = e;
    }
    return Se;
  }
  function cr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Vu(e) {
    var t = tt(), n = t.queue;
    if (n === null) throw Error(m(311));
    n.lastRenderedReducer = e;
    var r = we, l = r.baseQueue, u = n.pending;
    if (u !== null) {
      if (l !== null) {
        var i = l.next;
        l.next = u.next, u.next = i;
      }
      r.baseQueue = l = u, n.pending = null;
    }
    if (l !== null) {
      u = l.next, r = r.baseState;
      var o = i = null, s = null, p = u;
      do {
        var g = p.lane;
        if ((tn & g) === g) s !== null && (s = s.next = { lane: 0, action: p.action, hasEagerState: p.hasEagerState, eagerState: p.eagerState, next: null }), r = p.hasEagerState ? p.eagerState : e(r, p.action);
        else {
          var y = {
            lane: g,
            action: p.action,
            hasEagerState: p.hasEagerState,
            eagerState: p.eagerState,
            next: null
          };
          s === null ? (o = s = y, i = r) : s = s.next = y, ce.lanes |= g, nn |= g;
        }
        p = p.next;
      } while (p !== null && p !== u);
      s === null ? i = r : s.next = o, ot(r, t.memoizedState) || (Ve = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      l = e;
      do
        u = l.lane, ce.lanes |= u, nn |= u, l = l.next;
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Hu(e) {
    var t = tt(), n = t.queue;
    if (n === null) throw Error(m(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, l = n.pending, u = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var i = l = l.next;
      do
        u = e(u, i.action), i = i.next;
      while (i !== l);
      ot(u, t.memoizedState) || (Ve = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
    }
    return [u, r];
  }
  function cs() {
  }
  function fs(e, t) {
    var n = ce, r = tt(), l = t(), u = !ot(r.memoizedState, l);
    if (u && (r.memoizedState = l, Ve = !0), r = r.queue, Wu(ms.bind(null, n, r, e), [e]), r.getSnapshot !== t || u || Se !== null && Se.memoizedState.tag & 1) {
      if (n.flags |= 2048, fr(9, ps.bind(null, n, r, l, t), void 0, null), xe === null) throw Error(m(349));
      (tn & 30) !== 0 || ds(n, t, l);
    }
    return l;
  }
  function ds(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ce.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ce.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function ps(e, t, n, r) {
    t.value = n, t.getSnapshot = r, hs(t) && vs(e);
  }
  function ms(e, t, n) {
    return n(function() {
      hs(t) && vs(e);
    });
  }
  function hs(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ot(e, n);
    } catch {
      return !0;
    }
  }
  function vs(e) {
    var t = Ct(e, 1);
    t !== null && dt(t, e, 1, -1);
  }
  function gs(e) {
    var t = yt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: cr, lastRenderedState: e }, t.queue = e, e = e.dispatch = lf.bind(null, ce, e), [t.memoizedState, e];
  }
  function fr(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ce.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ce.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function ys() {
    return tt().memoizedState;
  }
  function ul(e, t, n, r) {
    var l = yt();
    ce.flags |= e, l.memoizedState = fr(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function il(e, t, n, r) {
    var l = tt();
    r = r === void 0 ? null : r;
    var u = void 0;
    if (we !== null) {
      var i = we.memoizedState;
      if (u = i.destroy, r !== null && Uu(r, i.deps)) {
        l.memoizedState = fr(t, n, u, r);
        return;
      }
    }
    ce.flags |= e, l.memoizedState = fr(1 | t, n, u, r);
  }
  function ws(e, t) {
    return ul(8390656, 8, e, t);
  }
  function Wu(e, t) {
    return il(2048, 8, e, t);
  }
  function ks(e, t) {
    return il(4, 2, e, t);
  }
  function Ss(e, t) {
    return il(4, 4, e, t);
  }
  function xs(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Es(e, t, n) {
    return n = n != null ? n.concat([e]) : null, il(4, 4, xs.bind(null, t, e), n);
  }
  function Qu() {
  }
  function Cs(e, t) {
    var n = tt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Uu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function _s(e, t) {
    var n = tt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Uu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Ns(e, t, n) {
    return (tn & 21) === 0 ? (e.baseState && (e.baseState = !1, Ve = !0), e.memoizedState = n) : (ot(n, t) || (n = to(), ce.lanes |= n, nn |= n, e.baseState = !0), t);
  }
  function nf(e, t) {
    var n = G;
    G = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Fu.transition;
    Fu.transition = {};
    try {
      e(!1), t();
    } finally {
      G = n, Fu.transition = r;
    }
  }
  function zs() {
    return tt().memoizedState;
  }
  function rf(e, t, n) {
    var r = Wt(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Ps(e)) Ts(t, n);
    else if (n = us(e, t, n, r), n !== null) {
      var l = Oe();
      dt(n, e, r, l), Rs(n, t, r);
    }
  }
  function lf(e, t, n) {
    var r = Wt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Ps(e)) Ts(t, l);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var i = t.lastRenderedState, o = u(i, n);
        if (l.hasEagerState = !0, l.eagerState = o, ot(o, i)) {
          var s = t.interleaved;
          s === null ? (l.next = l, Lu(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
      n = us(e, t, l, r), n !== null && (l = Oe(), dt(n, e, r, l), Rs(n, t, r));
    }
  }
  function Ps(e) {
    var t = e.alternate;
    return e === ce || t !== null && t === ce;
  }
  function Ts(e, t) {
    sr = ll = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Rs(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Kl(e, n);
    }
  }
  var ol = { readContext: et, useCallback: Te, useContext: Te, useEffect: Te, useImperativeHandle: Te, useInsertionEffect: Te, useLayoutEffect: Te, useMemo: Te, useReducer: Te, useRef: Te, useState: Te, useDebugValue: Te, useDeferredValue: Te, useTransition: Te, useMutableSource: Te, useSyncExternalStore: Te, useId: Te, unstable_isNewReconciler: !1 }, uf = { readContext: et, useCallback: function(e, t) {
    return yt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: et, useEffect: ws, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, ul(
      4194308,
      4,
      xs.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return ul(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return ul(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = yt();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = yt();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = rf.bind(null, ce, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = yt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: gs, useDebugValue: Qu, useDeferredValue: function(e) {
    return yt().memoizedState = e;
  }, useTransition: function() {
    var e = gs(!1), t = e[0];
    return e = nf.bind(null, e[1]), yt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = ce, l = yt();
    if (oe) {
      if (n === void 0) throw Error(m(407));
      n = n();
    } else {
      if (n = t(), xe === null) throw Error(m(349));
      (tn & 30) !== 0 || ds(r, t, n);
    }
    l.memoizedState = n;
    var u = { value: n, getSnapshot: t };
    return l.queue = u, ws(ms.bind(
      null,
      r,
      u,
      e
    ), [e]), r.flags |= 2048, fr(9, ps.bind(null, r, u, n, t), void 0, null), n;
  }, useId: function() {
    var e = yt(), t = xe.identifierPrefix;
    if (oe) {
      var n = Et, r = xt;
      n = (r & ~(1 << 32 - it(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ar++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = tf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, of = {
    readContext: et,
    useCallback: Cs,
    useContext: et,
    useEffect: Wu,
    useImperativeHandle: Es,
    useInsertionEffect: ks,
    useLayoutEffect: Ss,
    useMemo: _s,
    useReducer: Vu,
    useRef: ys,
    useState: function() {
      return Vu(cr);
    },
    useDebugValue: Qu,
    useDeferredValue: function(e) {
      var t = tt();
      return Ns(t, we.memoizedState, e);
    },
    useTransition: function() {
      var e = Vu(cr)[0], t = tt().memoizedState;
      return [e, t];
    },
    useMutableSource: cs,
    useSyncExternalStore: fs,
    useId: zs,
    unstable_isNewReconciler: !1
  }, sf = { readContext: et, useCallback: Cs, useContext: et, useEffect: Wu, useImperativeHandle: Es, useInsertionEffect: ks, useLayoutEffect: Ss, useMemo: _s, useReducer: Hu, useRef: ys, useState: function() {
    return Hu(cr);
  }, useDebugValue: Qu, useDeferredValue: function(e) {
    var t = tt();
    return we === null ? t.memoizedState = e : Ns(t, we.memoizedState, e);
  }, useTransition: function() {
    var e = Hu(cr)[0], t = tt().memoizedState;
    return [e, t];
  }, useMutableSource: cs, useSyncExternalStore: fs, useId: zs, unstable_isNewReconciler: !1 };
  function at(e, t) {
    if (e && e.defaultProps) {
      t = C({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function $u(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : C({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var sl = { isMounted: function(e) {
    return (e = e._reactInternals) ? Xt(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Oe(), l = Wt(e), u = _t(r, l);
    u.payload = t, n != null && (u.callback = n), t = Bt(e, u, l), t !== null && (dt(t, e, l, r), el(t, e, l));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Oe(), l = Wt(e), u = _t(r, l);
    u.tag = 1, u.payload = t, n != null && (u.callback = n), t = Bt(e, u, l), t !== null && (dt(t, e, l, r), el(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Oe(), r = Wt(e), l = _t(n, r);
    l.tag = 2, t != null && (l.callback = t), t = Bt(e, l, r), t !== null && (dt(t, e, r, n), el(t, e, r));
  } };
  function Ls(e, t, n, r, l, u, i) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, u, i) : t.prototype && t.prototype.isPureReactComponent ? !qn(n, r) || !qn(l, u) : !0;
  }
  function Ms(e, t, n) {
    var r = !1, l = Ot, u = t.contextType;
    return typeof u == "object" && u !== null ? u = et(u) : (l = Ae(t) ? Zt : Pe.current, r = t.contextTypes, u = (r = r != null) ? kn(e, l) : Ot), t = new t(n, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = sl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = u), t;
  }
  function js(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && sl.enqueueReplaceState(t, t.state, null);
  }
  function Ku(e, t, n, r) {
    var l = e.stateNode;
    l.props = n, l.state = e.memoizedState, l.refs = {}, Mu(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? l.context = et(u) : (u = Ae(t) ? Zt : Pe.current, l.context = kn(e, u)), l.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && ($u(e, t, u, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && sl.enqueueReplaceState(l, l.state, null), tl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Pn(e, t) {
    try {
      var n = "", r = t;
      do
        n += V(r), r = r.return;
      while (r);
      var l = n;
    } catch (u) {
      l = `
Error generating stack: ` + u.message + `
` + u.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function Yu(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Xu(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var af = typeof WeakMap == "function" ? WeakMap : Map;
  function Is(e, t, n) {
    n = _t(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      hl || (hl = !0, ai = r), Xu(e, t);
    }, n;
  }
  function Ds(e, t, n) {
    n = _t(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      n.payload = function() {
        return r(l);
      }, n.callback = function() {
        Xu(e, t);
      };
    }
    var u = e.stateNode;
    return u !== null && typeof u.componentDidCatch == "function" && (n.callback = function() {
      Xu(e, t), typeof r != "function" && (Vt === null ? Vt = /* @__PURE__ */ new Set([this]) : Vt.add(this));
      var i = t.stack;
      this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
    }), n;
  }
  function Os(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new af();
      var l = /* @__PURE__ */ new Set();
      r.set(t, l);
    } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
    l.has(n) || (l.add(n), e = Ef.bind(null, e, t, n), t.then(e, e));
  }
  function Fs(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Us(e, t, n, r, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = _t(-1, 1), t.tag = 2, Bt(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var cf = ge.ReactCurrentOwner, Ve = !1;
  function De(e, t, n, r) {
    t.child = e === null ? ls(t, null, n, r) : Cn(t, e.child, n, r);
  }
  function Bs(e, t, n, r, l) {
    n = n.render;
    var u = t.ref;
    return Nn(t, l), r = Bu(e, t, n, r, u, l), n = Au(), e !== null && !Ve ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (oe && n && xu(t), t.flags |= 1, De(e, t, r, l), t.child);
  }
  function As(e, t, n, r, l) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" && !vi(u) && u.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = u, Vs(e, t, u, r, l)) : (e = Sl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, (e.lanes & l) === 0) {
      var i = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : qn, n(i, r) && e.ref === t.ref) return Nt(e, t, l);
    }
    return t.flags |= 1, e = $t(u, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Vs(e, t, n, r, l) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (qn(u, r) && e.ref === t.ref) if (Ve = !1, t.pendingProps = r = u, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (Ve = !0);
      else return t.lanes = e.lanes, Nt(e, t, l);
    }
    return Gu(e, t, n, r, l);
  }
  function Hs(e, t, n) {
    var r = t.pendingProps, l = r.children, u = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, te(Rn, qe), qe |= n;
    else {
      if ((n & 1073741824) === 0) return e = u !== null ? u.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, te(Rn, qe), qe |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = u !== null ? u.baseLanes : n, te(Rn, qe), qe |= r;
    }
    else u !== null ? (r = u.baseLanes | n, t.memoizedState = null) : r = n, te(Rn, qe), qe |= r;
    return De(e, t, l, n), t.child;
  }
  function Ws(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Gu(e, t, n, r, l) {
    var u = Ae(n) ? Zt : Pe.current;
    return u = kn(t, u), Nn(t, l), n = Bu(e, t, n, r, u, l), r = Au(), e !== null && !Ve ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (oe && r && xu(t), t.flags |= 1, De(e, t, n, l), t.child);
  }
  function Qs(e, t, n, r, l) {
    if (Ae(n)) {
      var u = !0;
      Kr(t);
    } else u = !1;
    if (Nn(t, l), t.stateNode === null) cl(e, t), Ms(t, n, r), Ku(t, n, r, l), r = !0;
    else if (e === null) {
      var i = t.stateNode, o = t.memoizedProps;
      i.props = o;
      var s = i.context, p = n.contextType;
      typeof p == "object" && p !== null ? p = et(p) : (p = Ae(n) ? Zt : Pe.current, p = kn(t, p));
      var g = n.getDerivedStateFromProps, y = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      y || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (o !== r || s !== p) && js(t, i, r, p), Ut = !1;
      var h = t.memoizedState;
      i.state = h, tl(t, r, i, l), s = t.memoizedState, o !== r || h !== s || Be.current || Ut ? (typeof g == "function" && ($u(t, n, g, r), s = t.memoizedState), (o = Ut || Ls(t, n, o, r, h, s, p)) ? (y || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = p, r = o) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      i = t.stateNode, is(e, t), o = t.memoizedProps, p = t.type === t.elementType ? o : at(t.type, o), i.props = p, y = t.pendingProps, h = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = et(s) : (s = Ae(n) ? Zt : Pe.current, s = kn(t, s));
      var x = n.getDerivedStateFromProps;
      (g = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (o !== y || h !== s) && js(t, i, r, s), Ut = !1, h = t.memoizedState, i.state = h, tl(t, r, i, l);
      var _ = t.memoizedState;
      o !== y || h !== _ || Be.current || Ut ? (typeof x == "function" && ($u(t, n, x, r), _ = t.memoizedState), (p = Ut || Ls(t, n, p, r, h, _, s) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, _, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, _, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = _), i.props = r, i.state = _, i.context = s, r = p) : (typeof i.componentDidUpdate != "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return Zu(e, t, n, r, u, l);
  }
  function Zu(e, t, n, r, l, u) {
    Ws(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && Go(t, n, !1), Nt(e, t, u);
    r = t.stateNode, cf.current = t;
    var o = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && i ? (t.child = Cn(t, e.child, null, u), t.child = Cn(t, null, o, u)) : De(e, t, o, u), t.memoizedState = r.state, l && Go(t, n, !0), t.child;
  }
  function $s(e) {
    var t = e.stateNode;
    t.pendingContext ? Yo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Yo(e, t.context, !1), ju(e, t.containerInfo);
  }
  function Ks(e, t, n, r, l) {
    return En(), Nu(l), t.flags |= 256, De(e, t, n, r), t.child;
  }
  var qu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ju(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Ys(e, t, n) {
    var r = t.pendingProps, l = ae.current, u = !1, i = (t.flags & 128) !== 0, o;
    if ((o = i) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), o ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), te(ae, l & 1), e === null)
      return _u(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (i = r.children, e = r.fallback, u ? (r = t.mode, u = t.child, i = { mode: "hidden", children: i }, (r & 1) === 0 && u !== null ? (u.childLanes = 0, u.pendingProps = i) : u = xl(i, r, 0, null), e = on(e, r, n, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = Ju(n), t.memoizedState = qu, e) : bu(t, i));
    if (l = e.memoizedState, l !== null && (o = l.dehydrated, o !== null)) return ff(e, t, i, r, o, l, n);
    if (u) {
      u = r.fallback, i = t.mode, l = e.child, o = l.sibling;
      var s = { mode: "hidden", children: r.children };
      return (i & 1) === 0 && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = $t(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), o !== null ? u = $t(o, u) : (u = on(u, i, n, null), u.flags |= 2), u.return = t, r.return = t, r.sibling = u, t.child = r, r = u, u = t.child, i = e.child.memoizedState, i = i === null ? Ju(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, u.memoizedState = i, u.childLanes = e.childLanes & ~n, t.memoizedState = qu, r;
    }
    return u = e.child, e = u.sibling, r = $t(u, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function bu(e, t) {
    return t = xl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function al(e, t, n, r) {
    return r !== null && Nu(r), Cn(t, e.child, null, n), e = bu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function ff(e, t, n, r, l, u, i) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = Yu(Error(m(422))), al(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = r.fallback, l = t.mode, r = xl({ mode: "visible", children: r.children }, l, 0, null), u = on(u, l, i, null), u.flags |= 2, r.return = t, u.return = t, r.sibling = u, t.child = r, (t.mode & 1) !== 0 && Cn(t, e.child, null, i), t.child.memoizedState = Ju(i), t.memoizedState = qu, u);
    if ((t.mode & 1) === 0) return al(e, t, i, null);
    if (l.data === "$!") {
      if (r = l.nextSibling && l.nextSibling.dataset, r) var o = r.dgst;
      return r = o, u = Error(m(419)), r = Yu(u, r, void 0), al(e, t, i, r);
    }
    if (o = (i & e.childLanes) !== 0, Ve || o) {
      if (r = xe, r !== null) {
        switch (i & -i) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l, l !== 0 && l !== u.retryLane && (u.retryLane = l, Ct(e, l), dt(r, e, l, -1));
      }
      return hi(), r = Yu(Error(m(421))), al(e, t, i, r);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Cf.bind(null, e), l._reactRetry = t, null) : (e = u.treeContext, Ze = It(l.nextSibling), Ge = t, oe = !0, st = null, e !== null && (Je[be++] = xt, Je[be++] = Et, Je[be++] = qt, xt = e.id, Et = e.overflow, qt = t), t = bu(t, r.children), t.flags |= 4096, t);
  }
  function Xs(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Ru(e.return, t, n);
  }
  function ei(e, t, n, r, l) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = r, u.tail = n, u.tailMode = l);
  }
  function Gs(e, t, n) {
    var r = t.pendingProps, l = r.revealOrder, u = r.tail;
    if (De(e, t, r.children, n), r = ae.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Xs(e, n, t);
        else if (e.tag === 19) Xs(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (te(ae, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && nl(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ei(t, !1, l, n, u);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && nl(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        ei(t, !0, n, null, u);
        break;
      case "together":
        ei(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function cl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Nt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), nn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(m(153));
    if (t.child !== null) {
      for (e = t.child, n = $t(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = $t(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function df(e, t, n) {
    switch (t.tag) {
      case 3:
        $s(t), En();
        break;
      case 5:
        as(t);
        break;
      case 1:
        Ae(t.type) && Kr(t);
        break;
      case 4:
        ju(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, l = t.memoizedProps.value;
        te(Jr, r._currentValue), r._currentValue = l;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (te(ae, ae.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Ys(e, t, n) : (te(ae, ae.current & 1), e = Nt(e, t, n), e !== null ? e.sibling : null);
        te(ae, ae.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return Gs(e, t, n);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), te(ae, ae.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Hs(e, t, n);
    }
    return Nt(e, t, n);
  }
  var Zs, ti, qs, Js;
  Zs = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, ti = function() {
  }, qs = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
      e = t.stateNode, en(gt.current);
      var u = null;
      switch (n) {
        case "input":
          l = Rl(e, l), r = Rl(e, r), u = [];
          break;
        case "select":
          l = C({}, l, { value: void 0 }), r = C({}, r, { value: void 0 }), u = [];
          break;
        case "textarea":
          l = jl(e, l), r = jl(e, r), u = [];
          break;
        default:
          typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Wr);
      }
      Dl(n, r);
      var i;
      n = null;
      for (p in l) if (!r.hasOwnProperty(p) && l.hasOwnProperty(p) && l[p] != null) if (p === "style") {
        var o = l[p];
        for (i in o) o.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
      } else p !== "dangerouslySetInnerHTML" && p !== "children" && p !== "suppressContentEditableWarning" && p !== "suppressHydrationWarning" && p !== "autoFocus" && (Z.hasOwnProperty(p) ? u || (u = []) : (u = u || []).push(p, null));
      for (p in r) {
        var s = r[p];
        if (o = l != null ? l[p] : void 0, r.hasOwnProperty(p) && s !== o && (s != null || o != null)) if (p === "style") if (o) {
          for (i in o) !o.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
          for (i in s) s.hasOwnProperty(i) && o[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
        } else n || (u || (u = []), u.push(
          p,
          n
        )), n = s;
        else p === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, o = o ? o.__html : void 0, s != null && o !== s && (u = u || []).push(p, s)) : p === "children" ? typeof s != "string" && typeof s != "number" || (u = u || []).push(p, "" + s) : p !== "suppressContentEditableWarning" && p !== "suppressHydrationWarning" && (Z.hasOwnProperty(p) ? (s != null && p === "onScroll" && re("scroll", e), u || o === s || (u = [])) : (u = u || []).push(p, s));
      }
      n && (u = u || []).push("style", n);
      var p = u;
      (t.updateQueue = p) && (t.flags |= 4);
    }
  }, Js = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function dr(e, t) {
    if (!oe) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function Re(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function pf(e, t, n) {
    var r = t.pendingProps;
    switch (Eu(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Re(t), null;
      case 1:
        return Ae(t.type) && $r(), Re(t), null;
      case 3:
        return r = t.stateNode, zn(), le(Be), le(Pe), Ou(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Zr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, st !== null && (di(st), st = null))), ti(e, t), Re(t), null;
      case 5:
        Iu(t);
        var l = en(or.current);
        if (n = t.type, e !== null && t.stateNode != null) qs(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(m(166));
            return Re(t), null;
          }
          if (e = en(gt.current), Zr(t)) {
            r = t.stateNode, n = t.type;
            var u = t.memoizedProps;
            switch (r[vt] = t, r[nr] = u, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                re("cancel", r), re("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                re("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < bn.length; l++) re(bn[l], r);
                break;
              case "source":
                re("error", r);
                break;
              case "img":
              case "image":
              case "link":
                re(
                  "error",
                  r
                ), re("load", r);
                break;
              case "details":
                re("toggle", r);
                break;
              case "input":
                Li(r, u), re("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!u.multiple }, re("invalid", r);
                break;
              case "textarea":
                Ii(r, u), re("invalid", r);
            }
            Dl(n, u), l = null;
            for (var i in u) if (u.hasOwnProperty(i)) {
              var o = u[i];
              i === "children" ? typeof o == "string" ? r.textContent !== o && (u.suppressHydrationWarning !== !0 && Hr(r.textContent, o, e), l = ["children", o]) : typeof o == "number" && r.textContent !== "" + o && (u.suppressHydrationWarning !== !0 && Hr(
                r.textContent,
                o,
                e
              ), l = ["children", "" + o]) : Z.hasOwnProperty(i) && o != null && i === "onScroll" && re("scroll", r);
            }
            switch (n) {
              case "input":
                wr(r), ji(r, u, !0);
                break;
              case "textarea":
                wr(r), Oi(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (r.onclick = Wr);
            }
            r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Fi(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[vt] = t, e[nr] = r, Zs(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (i = Ol(n, r), n) {
                case "dialog":
                  re("cancel", e), re("close", e), l = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  re("load", e), l = r;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < bn.length; l++) re(bn[l], e);
                  l = r;
                  break;
                case "source":
                  re("error", e), l = r;
                  break;
                case "img":
                case "image":
                case "link":
                  re(
                    "error",
                    e
                  ), re("load", e), l = r;
                  break;
                case "details":
                  re("toggle", e), l = r;
                  break;
                case "input":
                  Li(e, r), l = Rl(e, r), re("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, l = C({}, r, { value: void 0 }), re("invalid", e);
                  break;
                case "textarea":
                  Ii(e, r), l = jl(e, r), re("invalid", e);
                  break;
                default:
                  l = r;
              }
              Dl(n, l), o = l;
              for (u in o) if (o.hasOwnProperty(u)) {
                var s = o[u];
                u === "style" ? Ai(e, s) : u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Ui(e, s)) : u === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && In(e, s) : typeof s == "number" && In(e, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Z.hasOwnProperty(u) ? s != null && u === "onScroll" && re("scroll", e) : s != null && $e(e, u, s, i));
              }
              switch (n) {
                case "input":
                  wr(e), ji(e, r, !1);
                  break;
                case "textarea":
                  wr(e), Oi(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + X(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, u = r.value, u != null ? sn(e, !!r.multiple, u, !1) : r.defaultValue != null && sn(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Wr);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Re(t), null;
      case 6:
        if (e && t.stateNode != null) Js(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(m(166));
          if (n = en(or.current), en(gt.current), Zr(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[vt] = t, (u = r.nodeValue !== n) && (e = Ge, e !== null)) switch (e.tag) {
              case 3:
                Hr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && Hr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            u && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[vt] = t, t.stateNode = r;
        }
        return Re(t), null;
      case 13:
        if (le(ae), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (oe && Ze !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) ts(), En(), t.flags |= 98560, u = !1;
          else if (u = Zr(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(m(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(m(317));
              u[vt] = t;
            } else En(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), u = !1;
          } else st !== null && (di(st), st = null), u = !0;
          if (!u) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (ae.current & 1) !== 0 ? ke === 0 && (ke = 3) : hi())), t.updateQueue !== null && (t.flags |= 4), Re(t), null);
      case 4:
        return zn(), ti(e, t), e === null && er(t.stateNode.containerInfo), Re(t), null;
      case 10:
        return Tu(t.type._context), Re(t), null;
      case 17:
        return Ae(t.type) && $r(), Re(t), null;
      case 19:
        if (le(ae), u = t.memoizedState, u === null) return Re(t), null;
        if (r = (t.flags & 128) !== 0, i = u.rendering, i === null) if (r) dr(u, !1);
        else {
          if (ke !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (i = nl(e), i !== null) {
              for (t.flags |= 128, dr(u, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) u = n, e = r, u.flags &= 14680066, i = u.alternate, i === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = i.childLanes, u.lanes = i.lanes, u.child = i.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = i.memoizedProps, u.memoizedState = i.memoizedState, u.updateQueue = i.updateQueue, u.type = i.type, e = i.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return te(ae, ae.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          u.tail !== null && me() > Ln && (t.flags |= 128, r = !0, dr(u, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = nl(i), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), dr(u, !0), u.tail === null && u.tailMode === "hidden" && !i.alternate && !oe) return Re(t), null;
          } else 2 * me() - u.renderingStartTime > Ln && n !== 1073741824 && (t.flags |= 128, r = !0, dr(u, !1), t.lanes = 4194304);
          u.isBackwards ? (i.sibling = t.child, t.child = i) : (n = u.last, n !== null ? n.sibling = i : t.child = i, u.last = i);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = me(), t.sibling = null, n = ae.current, te(ae, r ? n & 1 | 2 : n & 1), t) : (Re(t), null);
      case 22:
      case 23:
        return mi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (qe & 1073741824) !== 0 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Re(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(m(156, t.tag));
  }
  function mf(e, t) {
    switch (Eu(t), t.tag) {
      case 1:
        return Ae(t.type) && $r(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return zn(), le(Be), le(Pe), Ou(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Iu(t), null;
      case 13:
        if (le(ae), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(m(340));
          En();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return le(ae), null;
      case 4:
        return zn(), null;
      case 10:
        return Tu(t.type._context), null;
      case 22:
      case 23:
        return mi(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var fl = !1, Le = !1, hf = typeof WeakSet == "function" ? WeakSet : Set, E = null;
  function Tn(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      de(e, t, r);
    }
    else n.current = null;
  }
  function ni(e, t, n) {
    try {
      n();
    } catch (r) {
      de(e, t, r);
    }
  }
  var bs = !1;
  function vf(e, t) {
    if (mu = Lr, e = Lo(), iu(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset, u = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, u.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0, o = -1, s = -1, p = 0, g = 0, y = e, h = null;
          t: for (; ; ) {
            for (var x; y !== n || l !== 0 && y.nodeType !== 3 || (o = i + l), y !== u || r !== 0 && y.nodeType !== 3 || (s = i + r), y.nodeType === 3 && (i += y.nodeValue.length), (x = y.firstChild) !== null; )
              h = y, y = x;
            for (; ; ) {
              if (y === e) break t;
              if (h === n && ++p === l && (o = i), h === u && ++g === r && (s = i), (x = y.nextSibling) !== null) break;
              y = h, h = y.parentNode;
            }
            y = x;
          }
          n = o === -1 || s === -1 ? null : { start: o, end: s };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (hu = { focusedElem: e, selectionRange: n }, Lr = !1, E = t; E !== null; ) if (t = E, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, E = e;
    else for (; E !== null; ) {
      t = E;
      try {
        var _ = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (_ !== null) {
              var N = _.memoizedProps, he = _.memoizedState, f = t.stateNode, a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? N : at(t.type, N), he);
              f.__reactInternalSnapshotBeforeUpdate = a;
            }
            break;
          case 3:
            var d = t.stateNode.containerInfo;
            d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(m(163));
        }
      } catch (w) {
        de(t, t.return, w);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, E = e;
        break;
      }
      E = t.return;
    }
    return _ = bs, bs = !1, _;
  }
  function pr(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ni(t, n, u);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function dl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function ri(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function ea(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ea(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[vt], delete t[nr], delete t[wu], delete t[qc], delete t[Jc])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function ta(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function na(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ta(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function li(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wr));
    else if (r !== 4 && (e = e.child, e !== null)) for (li(e, t, n), e = e.sibling; e !== null; ) li(e, t, n), e = e.sibling;
  }
  function ui(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (ui(e, t, n), e = e.sibling; e !== null; ) ui(e, t, n), e = e.sibling;
  }
  var Ne = null, ct = !1;
  function At(e, t, n) {
    for (n = n.child; n !== null; ) ra(e, t, n), n = n.sibling;
  }
  function ra(e, t, n) {
    if (ht && typeof ht.onCommitFiberUnmount == "function") try {
      ht.onCommitFiberUnmount(_r, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        Le || Tn(n, t);
      case 6:
        var r = Ne, l = ct;
        Ne = null, At(e, t, n), Ne = r, ct = l, Ne !== null && (ct ? (e = Ne, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Ne.removeChild(n.stateNode));
        break;
      case 18:
        Ne !== null && (ct ? (e = Ne, n = n.stateNode, e.nodeType === 8 ? yu(e.parentNode, n) : e.nodeType === 1 && yu(e, n), $n(e)) : yu(Ne, n.stateNode));
        break;
      case 4:
        r = Ne, l = ct, Ne = n.stateNode.containerInfo, ct = !0, At(e, t, n), Ne = r, ct = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Le && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          l = r = r.next;
          do {
            var u = l, i = u.destroy;
            u = u.tag, i !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && ni(n, t, i), l = l.next;
          } while (l !== r);
        }
        At(e, t, n);
        break;
      case 1:
        if (!Le && (Tn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (o) {
          de(n, t, o);
        }
        At(e, t, n);
        break;
      case 21:
        At(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (Le = (r = Le) || n.memoizedState !== null, At(e, t, n), Le = r) : At(e, t, n);
        break;
      default:
        At(e, t, n);
    }
  }
  function la(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new hf()), t.forEach(function(r) {
        var l = _f.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
    }
  }
  function ft(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var u = e, i = t, o = i;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case 5:
              Ne = o.stateNode, ct = !1;
              break e;
            case 3:
              Ne = o.stateNode.containerInfo, ct = !0;
              break e;
            case 4:
              Ne = o.stateNode.containerInfo, ct = !0;
              break e;
          }
          o = o.return;
        }
        if (Ne === null) throw Error(m(160));
        ra(u, i, l), Ne = null, ct = !1;
        var s = l.alternate;
        s !== null && (s.return = null), l.return = null;
      } catch (p) {
        de(l, t, p);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ua(t, e), t = t.sibling;
  }
  function ua(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ft(t, e), wt(e), r & 4) {
          try {
            pr(3, e, e.return), dl(3, e);
          } catch (N) {
            de(e, e.return, N);
          }
          try {
            pr(5, e, e.return);
          } catch (N) {
            de(e, e.return, N);
          }
        }
        break;
      case 1:
        ft(t, e), wt(e), r & 512 && n !== null && Tn(n, n.return);
        break;
      case 5:
        if (ft(t, e), wt(e), r & 512 && n !== null && Tn(n, n.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            In(l, "");
          } catch (N) {
            de(e, e.return, N);
          }
        }
        if (r & 4 && (l = e.stateNode, l != null)) {
          var u = e.memoizedProps, i = n !== null ? n.memoizedProps : u, o = e.type, s = e.updateQueue;
          if (e.updateQueue = null, s !== null) try {
            o === "input" && u.type === "radio" && u.name != null && Mi(l, u), Ol(o, i);
            var p = Ol(o, u);
            for (i = 0; i < s.length; i += 2) {
              var g = s[i], y = s[i + 1];
              g === "style" ? Ai(l, y) : g === "dangerouslySetInnerHTML" ? Ui(l, y) : g === "children" ? In(l, y) : $e(l, g, y, p);
            }
            switch (o) {
              case "input":
                Ll(l, u);
                break;
              case "textarea":
                Di(l, u);
                break;
              case "select":
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!u.multiple;
                var x = u.value;
                x != null ? sn(l, !!u.multiple, x, !1) : h !== !!u.multiple && (u.defaultValue != null ? sn(
                  l,
                  !!u.multiple,
                  u.defaultValue,
                  !0
                ) : sn(l, !!u.multiple, u.multiple ? [] : "", !1));
            }
            l[nr] = u;
          } catch (N) {
            de(e, e.return, N);
          }
        }
        break;
      case 6:
        if (ft(t, e), wt(e), r & 4) {
          if (e.stateNode === null) throw Error(m(162));
          l = e.stateNode, u = e.memoizedProps;
          try {
            l.nodeValue = u;
          } catch (N) {
            de(e, e.return, N);
          }
        }
        break;
      case 3:
        if (ft(t, e), wt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          $n(t.containerInfo);
        } catch (N) {
          de(e, e.return, N);
        }
        break;
      case 4:
        ft(t, e), wt(e);
        break;
      case 13:
        ft(t, e), wt(e), l = e.child, l.flags & 8192 && (u = l.memoizedState !== null, l.stateNode.isHidden = u, !u || l.alternate !== null && l.alternate.memoizedState !== null || (si = me())), r & 4 && la(e);
        break;
      case 22:
        if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (Le = (p = Le) || g, ft(t, e), Le = p) : ft(t, e), wt(e), r & 8192) {
          if (p = e.memoizedState !== null, (e.stateNode.isHidden = p) && !g && (e.mode & 1) !== 0) for (E = e, g = e.child; g !== null; ) {
            for (y = E = g; E !== null; ) {
              switch (h = E, x = h.child, h.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  pr(4, h, h.return);
                  break;
                case 1:
                  Tn(h, h.return);
                  var _ = h.stateNode;
                  if (typeof _.componentWillUnmount == "function") {
                    r = h, n = h.return;
                    try {
                      t = r, _.props = t.memoizedProps, _.state = t.memoizedState, _.componentWillUnmount();
                    } catch (N) {
                      de(r, n, N);
                    }
                  }
                  break;
                case 5:
                  Tn(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    sa(y);
                    continue;
                  }
              }
              x !== null ? (x.return = h, E = x) : sa(y);
            }
            g = g.sibling;
          }
          e: for (g = null, y = e; ; ) {
            if (y.tag === 5) {
              if (g === null) {
                g = y;
                try {
                  l = y.stateNode, p ? (u = l.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (o = y.stateNode, s = y.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, o.style.display = Bi("display", i));
                } catch (N) {
                  de(e, e.return, N);
                }
              }
            } else if (y.tag === 6) {
              if (g === null) try {
                y.stateNode.nodeValue = p ? "" : y.memoizedProps;
              } catch (N) {
                de(e, e.return, N);
              }
            } else if ((y.tag !== 22 && y.tag !== 23 || y.memoizedState === null || y === e) && y.child !== null) {
              y.child.return = y, y = y.child;
              continue;
            }
            if (y === e) break e;
            for (; y.sibling === null; ) {
              if (y.return === null || y.return === e) break e;
              g === y && (g = null), y = y.return;
            }
            g === y && (g = null), y.sibling.return = y.return, y = y.sibling;
          }
        }
        break;
      case 19:
        ft(t, e), wt(e), r & 4 && la(e);
        break;
      case 21:
        break;
      default:
        ft(
          t,
          e
        ), wt(e);
    }
  }
  function wt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (ta(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(m(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (In(l, ""), r.flags &= -33);
            var u = na(e);
            ui(e, u, l);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo, o = na(e);
            li(e, o, i);
            break;
          default:
            throw Error(m(161));
        }
      } catch (s) {
        de(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function gf(e, t, n) {
    E = e, ia(e);
  }
  function ia(e, t, n) {
    for (var r = (e.mode & 1) !== 0; E !== null; ) {
      var l = E, u = l.child;
      if (l.tag === 22 && r) {
        var i = l.memoizedState !== null || fl;
        if (!i) {
          var o = l.alternate, s = o !== null && o.memoizedState !== null || Le;
          o = fl;
          var p = Le;
          if (fl = i, (Le = s) && !p) for (E = l; E !== null; ) i = E, s = i.child, i.tag === 22 && i.memoizedState !== null ? aa(l) : s !== null ? (s.return = i, E = s) : aa(l);
          for (; u !== null; ) E = u, ia(u), u = u.sibling;
          E = l, fl = o, Le = p;
        }
        oa(e);
      } else (l.subtreeFlags & 8772) !== 0 && u !== null ? (u.return = l, E = u) : oa(e);
    }
  }
  function oa(e) {
    for (; E !== null; ) {
      var t = E;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Le || dl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Le) if (n === null) r.componentDidMount();
              else {
                var l = t.elementType === t.type ? n.memoizedProps : at(t.type, n.memoizedProps);
                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var u = t.updateQueue;
              u !== null && ss(t, u, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                ss(t, i, n);
              }
              break;
            case 5:
              var o = t.stateNode;
              if (n === null && t.flags & 4) {
                n = o;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var p = t.alternate;
                if (p !== null) {
                  var g = p.memoizedState;
                  if (g !== null) {
                    var y = g.dehydrated;
                    y !== null && $n(y);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(m(163));
          }
          Le || t.flags & 512 && ri(t);
        } catch (h) {
          de(t, t.return, h);
        }
      }
      if (t === e) {
        E = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, E = n;
        break;
      }
      E = t.return;
    }
  }
  function sa(e) {
    for (; E !== null; ) {
      var t = E;
      if (t === e) {
        E = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, E = n;
        break;
      }
      E = t.return;
    }
  }
  function aa(e) {
    for (; E !== null; ) {
      var t = E;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              dl(4, t);
            } catch (s) {
              de(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                de(t, l, s);
              }
            }
            var u = t.return;
            try {
              ri(t);
            } catch (s) {
              de(t, u, s);
            }
            break;
          case 5:
            var i = t.return;
            try {
              ri(t);
            } catch (s) {
              de(t, i, s);
            }
        }
      } catch (s) {
        de(t, t.return, s);
      }
      if (t === e) {
        E = null;
        break;
      }
      var o = t.sibling;
      if (o !== null) {
        o.return = t.return, E = o;
        break;
      }
      E = t.return;
    }
  }
  var yf = Math.ceil, pl = ge.ReactCurrentDispatcher, ii = ge.ReactCurrentOwner, nt = ge.ReactCurrentBatchConfig, B = 0, xe = null, ye = null, ze = 0, qe = 0, Rn = Dt(0), ke = 0, mr = null, nn = 0, ml = 0, oi = 0, hr = null, He = null, si = 0, Ln = 1 / 0, zt = null, hl = !1, ai = null, Vt = null, vl = !1, Ht = null, gl = 0, vr = 0, ci = null, yl = -1, wl = 0;
  function Oe() {
    return (B & 6) !== 0 ? me() : yl !== -1 ? yl : yl = me();
  }
  function Wt(e) {
    return (e.mode & 1) === 0 ? 1 : (B & 2) !== 0 && ze !== 0 ? ze & -ze : ef.transition !== null ? (wl === 0 && (wl = to()), wl) : (e = G, e !== 0 || (e = window.event, e = e === void 0 ? 16 : co(e.type)), e);
  }
  function dt(e, t, n, r) {
    if (50 < vr) throw vr = 0, ci = null, Error(m(185));
    An(e, n, r), ((B & 2) === 0 || e !== xe) && (e === xe && ((B & 2) === 0 && (ml |= n), ke === 4 && Qt(e, ze)), We(e, r), n === 1 && B === 0 && (t.mode & 1) === 0 && (Ln = me() + 500, Yr && Ft()));
  }
  function We(e, t) {
    var n = e.callbackNode;
    ec(e, t);
    var r = Pr(e, e === xe ? ze : 0);
    if (r === 0) n !== null && Ji(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Ji(n), t === 1) e.tag === 0 ? bc(fa.bind(null, e)) : Zo(fa.bind(null, e)), Gc(function() {
        (B & 6) === 0 && Ft();
      }), n = null;
      else {
        switch (no(r)) {
          case 1:
            n = Wl;
            break;
          case 4:
            n = bi;
            break;
          case 16:
            n = Cr;
            break;
          case 536870912:
            n = eo;
            break;
          default:
            n = Cr;
        }
        n = wa(n, ca.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function ca(e, t) {
    if (yl = -1, wl = 0, (B & 6) !== 0) throw Error(m(327));
    var n = e.callbackNode;
    if (Mn() && e.callbackNode !== n) return null;
    var r = Pr(e, e === xe ? ze : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = kl(e, r);
    else {
      t = r;
      var l = B;
      B |= 2;
      var u = pa();
      (xe !== e || ze !== t) && (zt = null, Ln = me() + 500, ln(e, t));
      do
        try {
          Sf();
          break;
        } catch (o) {
          da(e, o);
        }
      while (!0);
      Pu(), pl.current = u, B = l, ye !== null ? t = 0 : (xe = null, ze = 0, t = ke);
    }
    if (t !== 0) {
      if (t === 2 && (l = Ql(e), l !== 0 && (r = l, t = fi(e, l))), t === 1) throw n = mr, ln(e, 0), Qt(e, r), We(e, me()), n;
      if (t === 6) Qt(e, r);
      else {
        if (l = e.current.alternate, (r & 30) === 0 && !wf(l) && (t = kl(e, r), t === 2 && (u = Ql(e), u !== 0 && (r = u, t = fi(e, u))), t === 1)) throw n = mr, ln(e, 0), Qt(e, r), We(e, me()), n;
        switch (e.finishedWork = l, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(m(345));
          case 2:
            un(e, He, zt);
            break;
          case 3:
            if (Qt(e, r), (r & 130023424) === r && (t = si + 500 - me(), 10 < t)) {
              if (Pr(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & r) !== r) {
                Oe(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = gu(un.bind(null, e, He, zt), t);
              break;
            }
            un(e, He, zt);
            break;
          case 4:
            if (Qt(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var i = 31 - it(r);
              u = 1 << i, i = t[i], i > l && (l = i), r &= ~u;
            }
            if (r = l, r = me() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * yf(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = gu(un.bind(null, e, He, zt), r);
              break;
            }
            un(e, He, zt);
            break;
          case 5:
            un(e, He, zt);
            break;
          default:
            throw Error(m(329));
        }
      }
    }
    return We(e, me()), e.callbackNode === n ? ca.bind(null, e) : null;
  }
  function fi(e, t) {
    var n = hr;
    return e.current.memoizedState.isDehydrated && (ln(e, t).flags |= 256), e = kl(e, t), e !== 2 && (t = He, He = n, t !== null && di(t)), e;
  }
  function di(e) {
    He === null ? He = e : He.push.apply(He, e);
  }
  function wf(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var l = n[r], u = l.getSnapshot;
          l = l.value;
          try {
            if (!ot(u(), l)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Qt(e, t) {
    for (t &= ~oi, t &= ~ml, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - it(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function fa(e) {
    if ((B & 6) !== 0) throw Error(m(327));
    Mn();
    var t = Pr(e, 0);
    if ((t & 1) === 0) return We(e, me()), null;
    var n = kl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Ql(e);
      r !== 0 && (t = r, n = fi(e, r));
    }
    if (n === 1) throw n = mr, ln(e, 0), Qt(e, t), We(e, me()), n;
    if (n === 6) throw Error(m(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, un(e, He, zt), We(e, me()), null;
  }
  function pi(e, t) {
    var n = B;
    B |= 1;
    try {
      return e(t);
    } finally {
      B = n, B === 0 && (Ln = me() + 500, Yr && Ft());
    }
  }
  function rn(e) {
    Ht !== null && Ht.tag === 0 && (B & 6) === 0 && Mn();
    var t = B;
    B |= 1;
    var n = nt.transition, r = G;
    try {
      if (nt.transition = null, G = 1, e) return e();
    } finally {
      G = r, nt.transition = n, B = t, (B & 6) === 0 && Ft();
    }
  }
  function mi() {
    qe = Rn.current, le(Rn);
  }
  function ln(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Xc(n)), ye !== null) for (n = ye.return; n !== null; ) {
      var r = n;
      switch (Eu(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && $r();
          break;
        case 3:
          zn(), le(Be), le(Pe), Ou();
          break;
        case 5:
          Iu(r);
          break;
        case 4:
          zn();
          break;
        case 13:
          le(ae);
          break;
        case 19:
          le(ae);
          break;
        case 10:
          Tu(r.type._context);
          break;
        case 22:
        case 23:
          mi();
      }
      n = n.return;
    }
    if (xe = e, ye = e = $t(e.current, null), ze = qe = t, ke = 0, mr = null, oi = ml = nn = 0, He = hr = null, bt !== null) {
      for (t = 0; t < bt.length; t++) if (n = bt[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, u = n.pending;
        if (u !== null) {
          var i = u.next;
          u.next = l, r.next = i;
        }
        n.pending = r;
      }
      bt = null;
    }
    return e;
  }
  function da(e, t) {
    do {
      var n = ye;
      try {
        if (Pu(), rl.current = ol, ll) {
          for (var r = ce.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), r = r.next;
          }
          ll = !1;
        }
        if (tn = 0, Se = we = ce = null, sr = !1, ar = 0, ii.current = null, n === null || n.return === null) {
          ke = 1, mr = t, ye = null;
          break;
        }
        e: {
          var u = e, i = n.return, o = n, s = t;
          if (t = ze, o.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
            var p = s, g = o, y = g.tag;
            if ((g.mode & 1) === 0 && (y === 0 || y === 11 || y === 15)) {
              var h = g.alternate;
              h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
            }
            var x = Fs(i);
            if (x !== null) {
              x.flags &= -257, Us(x, i, o, u, t), x.mode & 1 && Os(u, p, t), t = x, s = p;
              var _ = t.updateQueue;
              if (_ === null) {
                var N = /* @__PURE__ */ new Set();
                N.add(s), t.updateQueue = N;
              } else _.add(s);
              break e;
            } else {
              if ((t & 1) === 0) {
                Os(u, p, t), hi();
                break e;
              }
              s = Error(m(426));
            }
          } else if (oe && o.mode & 1) {
            var he = Fs(i);
            if (he !== null) {
              (he.flags & 65536) === 0 && (he.flags |= 256), Us(he, i, o, u, t), Nu(Pn(s, o));
              break e;
            }
          }
          u = s = Pn(s, o), ke !== 4 && (ke = 2), hr === null ? hr = [u] : hr.push(u), u = i;
          do {
            switch (u.tag) {
              case 3:
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var f = Is(u, s, t);
                os(u, f);
                break e;
              case 1:
                o = s;
                var a = u.type, d = u.stateNode;
                if ((u.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Vt === null || !Vt.has(d)))) {
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var w = Ds(u, o, t);
                  os(u, w);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        ha(n);
      } catch (z) {
        t = z, ye === n && n !== null && (ye = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function pa() {
    var e = pl.current;
    return pl.current = ol, e === null ? ol : e;
  }
  function hi() {
    (ke === 0 || ke === 3 || ke === 2) && (ke = 4), xe === null || (nn & 268435455) === 0 && (ml & 268435455) === 0 || Qt(xe, ze);
  }
  function kl(e, t) {
    var n = B;
    B |= 2;
    var r = pa();
    (xe !== e || ze !== t) && (zt = null, ln(e, t));
    do
      try {
        kf();
        break;
      } catch (l) {
        da(e, l);
      }
    while (!0);
    if (Pu(), B = n, pl.current = r, ye !== null) throw Error(m(261));
    return xe = null, ze = 0, ke;
  }
  function kf() {
    for (; ye !== null; ) ma(ye);
  }
  function Sf() {
    for (; ye !== null && !$a(); ) ma(ye);
  }
  function ma(e) {
    var t = ya(e.alternate, e, qe);
    e.memoizedProps = e.pendingProps, t === null ? ha(e) : ye = t, ii.current = null;
  }
  function ha(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = pf(n, t, qe), n !== null) {
          ye = n;
          return;
        }
      } else {
        if (n = mf(n, t), n !== null) {
          n.flags &= 32767, ye = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          ke = 6, ye = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        ye = t;
        return;
      }
      ye = t = e;
    } while (t !== null);
    ke === 0 && (ke = 5);
  }
  function un(e, t, n) {
    var r = G, l = nt.transition;
    try {
      nt.transition = null, G = 1, xf(e, t, n, r);
    } finally {
      nt.transition = l, G = r;
    }
    return null;
  }
  function xf(e, t, n, r) {
    do
      Mn();
    while (Ht !== null);
    if ((B & 6) !== 0) throw Error(m(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(m(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var u = n.lanes | n.childLanes;
    if (tc(e, u), e === xe && (ye = xe = null, ze = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || vl || (vl = !0, wa(Cr, function() {
      return Mn(), null;
    })), u = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || u) {
      u = nt.transition, nt.transition = null;
      var i = G;
      G = 1;
      var o = B;
      B |= 4, ii.current = null, vf(e, n), ua(n, e), Vc(hu), Lr = !!mu, hu = mu = null, e.current = n, gf(n), Ka(), B = o, G = i, nt.transition = u;
    } else e.current = n;
    if (vl && (vl = !1, Ht = e, gl = l), u = e.pendingLanes, u === 0 && (Vt = null), Ga(n.stateNode), We(e, me()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
    if (hl) throw hl = !1, e = ai, ai = null, e;
    return (gl & 1) !== 0 && e.tag !== 0 && Mn(), u = e.pendingLanes, (u & 1) !== 0 ? e === ci ? vr++ : (vr = 0, ci = e) : vr = 0, Ft(), null;
  }
  function Mn() {
    if (Ht !== null) {
      var e = no(gl), t = nt.transition, n = G;
      try {
        if (nt.transition = null, G = 16 > e ? 16 : e, Ht === null) var r = !1;
        else {
          if (e = Ht, Ht = null, gl = 0, (B & 6) !== 0) throw Error(m(331));
          var l = B;
          for (B |= 4, E = e.current; E !== null; ) {
            var u = E, i = u.child;
            if ((E.flags & 16) !== 0) {
              var o = u.deletions;
              if (o !== null) {
                for (var s = 0; s < o.length; s++) {
                  var p = o[s];
                  for (E = p; E !== null; ) {
                    var g = E;
                    switch (g.tag) {
                      case 0:
                      case 11:
                      case 15:
                        pr(8, g, u);
                    }
                    var y = g.child;
                    if (y !== null) y.return = g, E = y;
                    else for (; E !== null; ) {
                      g = E;
                      var h = g.sibling, x = g.return;
                      if (ea(g), g === p) {
                        E = null;
                        break;
                      }
                      if (h !== null) {
                        h.return = x, E = h;
                        break;
                      }
                      E = x;
                    }
                  }
                }
                var _ = u.alternate;
                if (_ !== null) {
                  var N = _.child;
                  if (N !== null) {
                    _.child = null;
                    do {
                      var he = N.sibling;
                      N.sibling = null, N = he;
                    } while (N !== null);
                  }
                }
                E = u;
              }
            }
            if ((u.subtreeFlags & 2064) !== 0 && i !== null) i.return = u, E = i;
            else e: for (; E !== null; ) {
              if (u = E, (u.flags & 2048) !== 0) switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  pr(9, u, u.return);
              }
              var f = u.sibling;
              if (f !== null) {
                f.return = u.return, E = f;
                break e;
              }
              E = u.return;
            }
          }
          var a = e.current;
          for (E = a; E !== null; ) {
            i = E;
            var d = i.child;
            if ((i.subtreeFlags & 2064) !== 0 && d !== null) d.return = i, E = d;
            else e: for (i = a; E !== null; ) {
              if (o = E, (o.flags & 2048) !== 0) try {
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    dl(9, o);
                }
              } catch (z) {
                de(o, o.return, z);
              }
              if (o === i) {
                E = null;
                break e;
              }
              var w = o.sibling;
              if (w !== null) {
                w.return = o.return, E = w;
                break e;
              }
              E = o.return;
            }
          }
          if (B = l, Ft(), ht && typeof ht.onPostCommitFiberRoot == "function") try {
            ht.onPostCommitFiberRoot(_r, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        G = n, nt.transition = t;
      }
    }
    return !1;
  }
  function va(e, t, n) {
    t = Pn(n, t), t = Is(e, t, 1), e = Bt(e, t, 1), t = Oe(), e !== null && (An(e, 1, t), We(e, t));
  }
  function de(e, t, n) {
    if (e.tag === 3) va(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        va(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Vt === null || !Vt.has(r))) {
          e = Pn(n, e), e = Ds(t, e, 1), t = Bt(t, e, 1), e = Oe(), t !== null && (An(t, 1, e), We(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Ef(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Oe(), e.pingedLanes |= e.suspendedLanes & n, xe === e && (ze & n) === n && (ke === 4 || ke === 3 && (ze & 130023424) === ze && 500 > me() - si ? ln(e, 0) : oi |= n), We(e, t);
  }
  function ga(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = zr, zr <<= 1, (zr & 130023424) === 0 && (zr = 4194304)));
    var n = Oe();
    e = Ct(e, t), e !== null && (An(e, t, n), We(e, n));
  }
  function Cf(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), ga(e, n);
  }
  function _f(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(m(314));
    }
    r !== null && r.delete(t), ga(e, n);
  }
  var ya;
  ya = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Be.current) Ve = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Ve = !1, df(e, t, n);
      Ve = (e.flags & 131072) !== 0;
    }
    else Ve = !1, oe && (t.flags & 1048576) !== 0 && qo(t, Gr, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        cl(e, t), e = t.pendingProps;
        var l = kn(t, Pe.current);
        Nn(t, n), l = Bu(null, t, r, e, l, n);
        var u = Au();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ae(r) ? (u = !0, Kr(t)) : u = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Mu(t), l.updater = sl, t.stateNode = l, l._reactInternals = t, Ku(t, r, e, n), t = Zu(null, t, r, !0, u, n)) : (t.tag = 0, oe && u && xu(t), De(null, t, l, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (cl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = zf(r), e = at(r, e), l) {
            case 0:
              t = Gu(null, t, r, e, n);
              break e;
            case 1:
              t = Qs(null, t, r, e, n);
              break e;
            case 11:
              t = Bs(null, t, r, e, n);
              break e;
            case 14:
              t = As(null, t, r, at(r.type, e), n);
              break e;
          }
          throw Error(m(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), Gu(e, t, r, l, n);
      case 1:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), Qs(e, t, r, l, n);
      case 3:
        e: {
          if ($s(t), e === null) throw Error(m(387));
          r = t.pendingProps, u = t.memoizedState, l = u.element, is(e, t), tl(t, r, null, n);
          var i = t.memoizedState;
          if (r = i.element, u.isDehydrated) if (u = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            l = Pn(Error(m(423)), t), t = Ks(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = Pn(Error(m(424)), t), t = Ks(e, t, r, n, l);
            break e;
          } else for (Ze = It(t.stateNode.containerInfo.firstChild), Ge = t, oe = !0, st = null, n = ls(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (En(), r === l) {
              t = Nt(e, t, n);
              break e;
            }
            De(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return as(t), e === null && _u(t), r = t.type, l = t.pendingProps, u = e !== null ? e.memoizedProps : null, i = l.children, vu(r, l) ? i = null : u !== null && vu(r, u) && (t.flags |= 32), Ws(e, t), De(e, t, i, n), t.child;
      case 6:
        return e === null && _u(t), null;
      case 13:
        return Ys(e, t, n);
      case 4:
        return ju(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Cn(t, null, r, n) : De(e, t, r, n), t.child;
      case 11:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), Bs(e, t, r, l, n);
      case 7:
        return De(e, t, t.pendingProps, n), t.child;
      case 8:
        return De(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return De(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, l = t.pendingProps, u = t.memoizedProps, i = l.value, te(Jr, r._currentValue), r._currentValue = i, u !== null) if (ot(u.value, i)) {
            if (u.children === l.children && !Be.current) {
              t = Nt(e, t, n);
              break e;
            }
          } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
            var o = u.dependencies;
            if (o !== null) {
              i = u.child;
              for (var s = o.firstContext; s !== null; ) {
                if (s.context === r) {
                  if (u.tag === 1) {
                    s = _t(-1, n & -n), s.tag = 2;
                    var p = u.updateQueue;
                    if (p !== null) {
                      p = p.shared;
                      var g = p.pending;
                      g === null ? s.next = s : (s.next = g.next, g.next = s), p.pending = s;
                    }
                  }
                  u.lanes |= n, s = u.alternate, s !== null && (s.lanes |= n), Ru(
                    u.return,
                    n,
                    t
                  ), o.lanes |= n;
                  break;
                }
                s = s.next;
              }
            } else if (u.tag === 10) i = u.type === t.type ? null : u.child;
            else if (u.tag === 18) {
              if (i = u.return, i === null) throw Error(m(341));
              i.lanes |= n, o = i.alternate, o !== null && (o.lanes |= n), Ru(i, n, t), i = u.sibling;
            } else i = u.child;
            if (i !== null) i.return = u;
            else for (i = u; i !== null; ) {
              if (i === t) {
                i = null;
                break;
              }
              if (u = i.sibling, u !== null) {
                u.return = i.return, i = u;
                break;
              }
              i = i.return;
            }
            u = i;
          }
          De(e, t, l.children, n), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, r = t.pendingProps.children, Nn(t, n), l = et(l), r = r(l), t.flags |= 1, De(e, t, r, n), t.child;
      case 14:
        return r = t.type, l = at(r, t.pendingProps), l = at(r.type, l), As(e, t, r, l, n);
      case 15:
        return Vs(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : at(r, l), cl(e, t), t.tag = 1, Ae(r) ? (e = !0, Kr(t)) : e = !1, Nn(t, n), Ms(t, r, l), Ku(t, r, l, n), Zu(null, t, r, !0, e, n);
      case 19:
        return Gs(e, t, n);
      case 22:
        return Hs(e, t, n);
    }
    throw Error(m(156, t.tag));
  };
  function wa(e, t) {
    return qi(e, t);
  }
  function Nf(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rt(e, t, n, r) {
    return new Nf(e, t, n, r);
  }
  function vi(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function zf(e) {
    if (typeof e == "function") return vi(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === pt) return 11;
      if (e === mt) return 14;
    }
    return 2;
  }
  function $t(e, t) {
    var n = e.alternate;
    return n === null ? (n = rt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function Sl(e, t, n, r, l, u) {
    var i = 2;
    if (r = e, typeof e == "function") vi(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else e: switch (e) {
      case ne:
        return on(n.children, l, u, t);
      case b:
        i = 8, l |= 8;
        break;
      case _e:
        return e = rt(12, n, t, l | 2), e.elementType = _e, e.lanes = u, e;
      case Ke:
        return e = rt(13, n, t, l), e.elementType = Ke, e.lanes = u, e;
      case ut:
        return e = rt(19, n, t, l), e.elementType = ut, e.lanes = u, e;
      case fe:
        return xl(n, l, u, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case lt:
            i = 10;
            break e;
          case Yt:
            i = 9;
            break e;
          case pt:
            i = 11;
            break e;
          case mt:
            i = 14;
            break e;
          case Ue:
            i = 16, r = null;
            break e;
        }
        throw Error(m(130, e == null ? e : typeof e, ""));
    }
    return t = rt(i, n, t, l), t.elementType = e, t.type = r, t.lanes = u, t;
  }
  function on(e, t, n, r) {
    return e = rt(7, e, r, t), e.lanes = n, e;
  }
  function xl(e, t, n, r) {
    return e = rt(22, e, r, t), e.elementType = fe, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function gi(e, t, n) {
    return e = rt(6, e, null, t), e.lanes = n, e;
  }
  function yi(e, t, n) {
    return t = rt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Pf(e, t, n, r, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $l(0), this.expirationTimes = $l(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $l(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function wi(e, t, n, r, l, u, i, o, s) {
    return e = new Pf(e, t, n, o, s), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = rt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Mu(u), e;
  }
  function Tf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Y, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function ka(e) {
    if (!e) return Ot;
    e = e._reactInternals;
    e: {
      if (Xt(e) !== e || e.tag !== 1) throw Error(m(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ae(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(m(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Ae(n)) return Xo(e, n, t);
    }
    return t;
  }
  function Sa(e, t, n, r, l, u, i, o, s) {
    return e = wi(n, r, !0, e, l, u, i, o, s), e.context = ka(null), n = e.current, r = Oe(), l = Wt(n), u = _t(r, l), u.callback = t ?? null, Bt(n, u, l), e.current.lanes = l, An(e, l, r), We(e, r), e;
  }
  function El(e, t, n, r) {
    var l = t.current, u = Oe(), i = Wt(l);
    return n = ka(n), t.context === null ? t.context = n : t.pendingContext = n, t = _t(u, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Bt(l, t, i), e !== null && (dt(e, l, i, u), el(e, l, i)), i;
  }
  function Cl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function xa(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ki(e, t) {
    xa(e, t), (e = e.alternate) && xa(e, t);
  }
  function Rf() {
    return null;
  }
  var Ea = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Si(e) {
    this._internalRoot = e;
  }
  _l.prototype.render = Si.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(m(409));
    El(e, t, null, null);
  }, _l.prototype.unmount = Si.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      rn(function() {
        El(null, e, null, null);
      }), t[kt] = null;
    }
  };
  function _l(e) {
    this._internalRoot = e;
  }
  _l.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = uo();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Lt.length && t !== 0 && t < Lt[n].priority; n++) ;
      Lt.splice(n, 0, e), n === 0 && so(e);
    }
  };
  function xi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Nl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ca() {
  }
  function Lf(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var u = r;
        r = function() {
          var p = Cl(i);
          u.call(p);
        };
      }
      var i = Sa(t, r, e, 0, null, !1, !1, "", Ca);
      return e._reactRootContainer = i, e[kt] = i.current, er(e.nodeType === 8 ? e.parentNode : e), rn(), i;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var p = Cl(s);
        o.call(p);
      };
    }
    var s = wi(e, 0, !1, null, null, !1, !1, "", Ca);
    return e._reactRootContainer = s, e[kt] = s.current, er(e.nodeType === 8 ? e.parentNode : e), rn(function() {
      El(t, s, n, r);
    }), s;
  }
  function zl(e, t, n, r, l) {
    var u = n._reactRootContainer;
    if (u) {
      var i = u;
      if (typeof l == "function") {
        var o = l;
        l = function() {
          var s = Cl(i);
          o.call(s);
        };
      }
      El(t, i, e, l);
    } else i = Lf(n, t, e, l, r);
    return Cl(i);
  }
  ro = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Bn(t.pendingLanes);
          n !== 0 && (Kl(t, n | 1), We(t, me()), (B & 6) === 0 && (Ln = me() + 500, Ft()));
        }
        break;
      case 13:
        rn(function() {
          var r = Ct(e, 1);
          if (r !== null) {
            var l = Oe();
            dt(r, e, 1, l);
          }
        }), ki(e, 1);
    }
  }, Yl = function(e) {
    if (e.tag === 13) {
      var t = Ct(e, 134217728);
      if (t !== null) {
        var n = Oe();
        dt(t, e, 134217728, n);
      }
      ki(e, 134217728);
    }
  }, lo = function(e) {
    if (e.tag === 13) {
      var t = Wt(e), n = Ct(e, t);
      if (n !== null) {
        var r = Oe();
        dt(n, e, t, r);
      }
      ki(e, t);
    }
  }, uo = function() {
    return G;
  }, io = function(e, t) {
    var n = G;
    try {
      return G = e, t();
    } finally {
      G = n;
    }
  }, Bl = function(e, t, n) {
    switch (t) {
      case "input":
        if (Ll(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var l = Qr(r);
              if (!l) throw Error(m(90));
              Ri(r), Ll(r, l);
            }
          }
        }
        break;
      case "textarea":
        Di(e, n);
        break;
      case "select":
        t = n.value, t != null && sn(e, !!n.multiple, t, !1);
    }
  }, Qi = pi, $i = rn;
  var Mf = { usingClientEntryPoint: !1, Events: [rr, yn, Qr, Hi, Wi, pi] }, gr = { findFiberByHostInstance: Gt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, jf = { bundleType: gr.bundleType, version: gr.version, rendererPackageName: gr.rendererPackageName, rendererConfig: gr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ge.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Gi(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: gr.findFiberByHostInstance || Rf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pl.isDisabled && Pl.supportsFiber) try {
      _r = Pl.inject(jf), ht = Pl;
    } catch {
    }
  }
  return Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Mf, Qe.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!xi(t)) throw Error(m(200));
    return Tf(e, t, null, n);
  }, Qe.createRoot = function(e, t) {
    if (!xi(e)) throw Error(m(299));
    var n = !1, r = "", l = Ea;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = wi(e, 1, !1, null, null, n, !1, r, l), e[kt] = t.current, er(e.nodeType === 8 ? e.parentNode : e), new Si(t);
  }, Qe.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(m(188)) : (e = Object.keys(e).join(","), Error(m(268, e)));
    return e = Gi(t), e = e === null ? null : e.stateNode, e;
  }, Qe.flushSync = function(e) {
    return rn(e);
  }, Qe.hydrate = function(e, t, n) {
    if (!Nl(t)) throw Error(m(200));
    return zl(null, e, t, !0, n);
  }, Qe.hydrateRoot = function(e, t, n) {
    if (!xi(e)) throw Error(m(405));
    var r = n != null && n.hydratedSources || null, l = !1, u = "", i = Ea;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = Sa(t, null, e, 1, n ?? null, l, !1, u, i), e[kt] = t.current, er(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
      n,
      l
    );
    return new _l(t);
  }, Qe.render = function(e, t, n) {
    if (!Nl(t)) throw Error(m(200));
    return zl(null, e, t, !1, n);
  }, Qe.unmountComponentAtNode = function(e) {
    if (!Nl(e)) throw Error(m(40));
    return e._reactRootContainer ? (rn(function() {
      zl(null, null, e, !1, function() {
        e._reactRootContainer = null, e[kt] = null;
      });
    }), !0) : !1;
  }, Qe.unstable_batchedUpdates = pi, Qe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Nl(n)) throw Error(m(200));
    if (e == null || e._reactInternals === void 0) throw Error(m(38));
    return zl(e, t, n, !1, r);
  }, Qe.version = "18.3.1-next-f1338f8080-20240426", Qe;
}
var Ma;
function Vf() {
  if (Ma) return _i.exports;
  Ma = 1;
  function k() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(k);
      } catch (R) {
        console.error(R);
      }
  }
  return k(), _i.exports = Af(), _i.exports;
}
var ja;
function Hf() {
  if (ja) return Tl;
  ja = 1;
  var k = Vf();
  return Tl.createRoot = k.createRoot, Tl.hydrateRoot = k.hydrateRoot, Tl;
}
var Wf = Hf(), Ce = Ti();
const Fa = "https://localhost:3008", Qf = "qwen/qwen3-vl-4b";
function $f(k) {
  const R = Array.isArray(k) ? k[k.length - 1] : k;
  if (!R) return null;
  const { time_to_first_token_seconds: m, total_output_tokens: A, tokens_per_second: Z } = R;
  return typeof m != "number" || typeof A != "number" || !Z ? null : m + A / Z;
}
async function Kf() {
  const k = await fetch(`${Fa}/api/version`);
  if (!k.ok) throw new Error(`/api/version failed: ${k.status}`);
  const R = await k.json(), m = [...new Set((R.queries ?? []).map((A) => A.body).filter(Boolean))];
  return {
    sessionId: R.sessionId,
    greeting: R.message,
    suggestions: m,
    avgWaitSeconds: $f(R.stats)
  };
}
async function Yf(k, R) {
  const m = await fetch(`${Fa}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Id": k
    },
    body: JSON.stringify({ body: { model: Qf, input: R } })
  });
  if (!m.ok) throw new Error(`/api/generate failed: ${m.status}`);
  return (await m.json()).message;
}
function Xf({ etaSeconds: k }) {
  return /* @__PURE__ */ I.jsxs("span", { className: "ilw-typing", children: [
    /* @__PURE__ */ I.jsx("span", { className: "ilw-dot" }),
    /* @__PURE__ */ I.jsx("span", { className: "ilw-dot" }),
    /* @__PURE__ */ I.jsx("span", { className: "ilw-dot" }),
    k != null && /* @__PURE__ */ I.jsxs("span", { className: "ilw-typing-eta", children: [
      "~",
      k,
      "s"
    ] })
  ] });
}
const Ia = /^#{2,4}\s*(.+?)\s*$/;
function Gf(k) {
  if (!k) return null;
  const R = k.split(`
`), m = [];
  if (R.forEach((ue, J) => {
    Ia.test(ue.trim()) && m.push(J);
  }), m.length < 2) return null;
  const A = R.slice(0, m[0]).join(`
`).trim(), Z = m.map((ue, J) => {
    const se = J + 1 < m.length ? m[J + 1] : R.length, U = R[ue].trim().match(Ia)[1], pe = U.replace(/^[^\p{L}\p{N}]+/u, "").trim() || U, ve = pe.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || `section_${J}`, K = R.slice(ue + 1, se).filter((Q) => Q.trim() !== "---");
    return { heading: pe, slug: ve, lines: K };
  });
  return { intro: A, sections: Z };
}
const Da = "profile-cards-style", Zf = `
.pc-root {
  background: #0b0f10;
  padding: 20px;
  border-radius: 6px;
  font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
}
.pc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  align-items: start;
}
.pc-card {
  background: #101617;
  border: 1px solid #232b2c;
  border-radius: 6px;
  overflow: hidden;
}
.pc-winbar {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; background: #161d1e; border-bottom: 1px solid #232b2c;
}
.pc-dot { width: 9px; height: 9px; border-radius: 50%; background: #3a4344; }
.pc-winbar .pc-path { font-size: 11px; color: #6b7a78; margin-left: 4px; }
.pc-body { padding: 16px 18px; color: #cbd8d2; }
.pc-comment { color: #5f7a6c; font-size: 12.5px; margin: 0 0 10px; }
.pc-row { padding: 6px 0; font-size: 13px; line-height: 1.5; }
.pc-row .pc-what { color: #e7efeb; }
.pc-row .pc-sub { color: #6b7a78; font-size: 11.5px; }
.pc-row .pc-when { color: #ffb454; font-size: 11.5px; }
.pc-list { list-style: none; margin: 0; padding: 0; }
.pc-list li { padding: 6px 0; font-size: 12.8px; line-height: 1.55; color: #cbd8d2; }
.pc-list li::before { content: "> "; color: #ffb454; }
.pc-tag-group { margin-bottom: 10px; }
.pc-tag-group:last-child { margin-bottom: 0; }
.pc-tag-group .pc-label { color: #5f7a6c; font-size: 11px; display: block; margin-bottom: 6px; }
.pc-tag-group .pc-label::before { content: "# "; }
.pc-tags { display: flex; flex-wrap: wrap; gap: 5px 10px; }
.pc-tag { color: #9fe6c3; font-size: 12px; }
.pc-tag::before { content: "\\2022 "; color: #3a4344; }
.pc-stat-num { color: #ffb454; font-weight: 700; }
.pc-md-line { padding: 3px 0; font-size: 12.8px; line-height: 1.55; }
.pc-md-bullet { padding-left: calc(var(--depth, 0) * 14px); }
.pc-md-bullet::before { content: "> "; color: #ffb454; }
.pc-md-quote { color: #6b7a78; font-style: italic; border-left: 2px solid #232b2c; padding-left: 10px; }
.pc-md-line strong { color: #e7efeb; }
`;
function qf() {
  Ce.useEffect(() => {
    if (document.getElementById(Da)) return;
    const k = document.createElement("style");
    k.id = Da, k.textContent = Zf, document.head.appendChild(k);
  }, []);
}
function Pi(k) {
  return k.split(/\*\*(.+?)\*\*/g).map((m, A) => A % 2 === 1 ? /* @__PURE__ */ I.jsx("strong", { children: m }, A) : m);
}
function Jf({ line: k }) {
  const R = k.trim();
  if (!R) return null;
  const m = k.match(/^(\s*)/), A = Math.floor(((m == null ? void 0 : m[1].length) ?? 0) / 2), Z = R.match(/^[-*]\s+(.*)$/);
  if (Z)
    return /* @__PURE__ */ I.jsx("div", { className: "pc-md-line pc-md-bullet", style: { "--depth": A }, children: Pi(Z[1]) });
  const ue = R.match(/^>\s*(.*)$/);
  return ue ? /* @__PURE__ */ I.jsx("div", { className: "pc-md-line pc-md-quote", children: Pi(ue[1]) }) : /* @__PURE__ */ I.jsx("div", { className: "pc-md-line", children: Pi(R) });
}
function bf({ intro: k, sections: R }) {
  return qf(), /* @__PURE__ */ I.jsxs("div", { children: [
    k ? /* @__PURE__ */ I.jsx("p", { style: { margin: "0 0 10px" }, children: k }) : null,
    /* @__PURE__ */ I.jsx("div", { className: "pc-root", children: /* @__PURE__ */ I.jsx("div", { className: "pc-grid", children: R.map((m) => /* @__PURE__ */ I.jsxs("article", { className: "pc-card", children: [
      /* @__PURE__ */ I.jsxs("div", { className: "pc-winbar", children: [
        /* @__PURE__ */ I.jsx("span", { className: "pc-dot" }),
        /* @__PURE__ */ I.jsx("span", { className: "pc-dot" }),
        /* @__PURE__ */ I.jsx("span", { className: "pc-dot" }),
        /* @__PURE__ */ I.jsxs("span", { className: "pc-path", children: [
          "~/profile/",
          m.slug
        ] })
      ] }),
      /* @__PURE__ */ I.jsxs("div", { className: "pc-body", children: [
        /* @__PURE__ */ I.jsxs("p", { className: "pc-comment", children: [
          "// ",
          m.heading.toLowerCase()
        ] }),
        m.lines.map((A, Z) => /* @__PURE__ */ I.jsx(Jf, { line: A }, Z))
      ] })
    ] }, m.slug)) }) })
  ] });
}
const ed = "data:image/webp;base64,UklGRn4HAABXRUJQVlA4IHIHAADwJQCdASpwAHAAPm0ylUgkIqIpp9VZgTANiUAwgECO3Q+WjFrkKqgvwPNu5zunpi3lr0Oemcn33Nr7cQK4wyCG5N7964gZO0K/WnATT7vYUOk5b5EB/MinwyCIq7/ADWr6nq1D4yZ0E/YzU/y9hLJP4mv7D1mcJdm1+oRFEFV3TJKBZXAcLzUgVMTM6WQTsZzzugBnZKYYRXx1VFKtjloW8cBgkcwDGk+F9sg/kttFKNSpjKE34Up7oX8l2bZFIhgyFbTRtZzlWtVXr0dzbbJTGUfxyKKEAoLRGq0UW+ag6G5Lk2qDj5n1sRIEIAk8DbT1MmH9zna+uhacN143oOgEJSwr0RBpbjBPEZ6JHTZSoePhkKVhd62TvvZ5sWobKfr2cUEwMeR85cVL3FoXrNyq3paXJKhVKwAA/vxIlDEYz7A8/B7Slhr7H3uhvI0v+Ufortg18FdlbID64N6rc9YGzX9pQbpUFr0SssN0io1pEsIeK7N7LrvefxUT/K1ZyPajuInIotBsuc8qTp8yKFxRc+QP2GKvBvJkaUhVbNL6uxveKI+2d0s+xnkV8daAcYv6SX/yKk2HbeyUucCr1ViwAFshu5+//CM1Syxc6vxyA9GIgMNai++6s1E/NoWMtB83rgOwx6E2AG609YeRksexOmPWFCtWZYKW8MrHoGgHZyOxUHVQZDWFkh/8pDPjU04KHxSDO3DT/0Emss7qmlnyPdsgGI7qiYr5xc3el/9MVXbWXrDlZyaGgx5l0q1V+VHUmFZUasQAYdY9H37CC2975PnseXBH2f+iGnYKveQcUqYH/TttcUDJDuXF09nBoBH4vKRpwgXJKi4my3gBrCGV+1HV+Drd4w1ykTYStSterYc/e/ULBCWJbHU3fWfMQ3vtHzO+HskvDohvdJAPoHOHXR3SNLKt0eE6Uh/BiuPphz7BtEiLIEDyz7jA9Xj9Z8M/W3wM/5nX9XyJqwiD8s7j6NikwEGj/1c98UO1+BqvKotO32z8MfZQj2IqMMM85OCMWnWpqjzhprf35FZRniu3B1NLR+dur/3D5k5QmSL0rcSuA1L8pn5uL8kKb1S3EWOgwpIqkTiYD8U8OppIQjgr/wW+srDO/vyoUprWEWxIHztpyvq71OR/LqS19+ab4T3AZLBn9zVszXcuY7JFuk8+QDZT83iJYPVVQ1IPH+0sKZIOPG2ZpeKLpEGJGnEgVVs5xi8f0/PjY1sCGtsoAgipl7EHxDB9n+b+ds35e8iJNaB19G/uGSSMC1nF6f0sDgK+eTC885GBiMPdHFBtuezWLTopqH2+9Yngf3B1dbPmiFzucLvQzmPr95ihm3jibdeW/Z7vnX05ITtJmBg3vplWrHvMTm7X+omBBr8gkz8hMknFz0fInnLzLPCPMkLXzUSMp4dh1q/gaiiBAOrNrEh0yVkx95tEBkzDQXCZXAuKYH9mqExdh1daD/AKn8NHfeqnD9mpJo0SFo2pCwj49cQs0dn2IGMRuG8dr9p+IXcz4o6BPrk4+lXH8creWaOMQBKzSxR+3+Ej32EDnKigt5ez3YMcmQ9kKYts/oI3Jbw3duwH/C+Ei53pxDAzJW8MKuMOrVBXBozFX8e/9k7yaekugUbkUzmSfSQS1fGxzOtc6nKxPWBdDGd28Mto7T3hPNxe4y089urFP4vz/UYmp/Gi8WYdhAQzqn2xTqyx+FbTw+41p/oiXQNdN4UE0vkmi2pCMpPXYKgi+Y+jjDTm0JV0pW+9ofdQnzwTnG/9yVbeYnH6zB9hg1g9Xm+hLorR1BW3kfjGGv0OylG5BwaQ/e3qQCfs0sGu/M7j+5fBfTABePxXwyRcYY9jP9yc0kYcZl8OFxacMp3djpyTUtfDeVCV7sGBE6i1V6ZfxIWUIo8aq1KdwtvaDuhgIhOUafJMbfwo7O34f32PKPnTfxtpO/OpAc4yjOqMUUpD2OF5FRNJ4BO4BGhA8gGmf+8hYc1Hn+OoOAr0jrOcvcy0DMi5d0DG+3mIy4tMxZ/pxw7F+nj6eG9u5jecrYZ5y1snKu5L/7t1gLRRN074aTaOlAjTsE6wmiSnLDzq3AdRihqcuZRjWpQOJTi2IRL6Q5un0kD2Q0vnSsPNrqQvGNrc31CjqEHhxnxuqs3XjGtY0MbNxBw9hOb0D+3DH0C0S/C8Hza0PZRr801Brk9ISx7WxfiTXJMfcgfrTlRlKtc1ifRsjA6+yevfKEt5hTl4KhTCccQRx8/Y7v6kyQrxZ6Vy6PTh+7Nr1Gdn2UgXXWFfAf/1Y/Lr6kHqiOJhKWV59C5tiAGKfMi5j203hd+Fh/+43QWdH2FKdg/fk/19d8FlCJlDxKkbBbvM/Oi/EIehg/WzEdaiX7XQG30V27Qr/q2PY8IY1LRYIwThdhgM9PIbblX9tYzDIPphqpstBMB5yixRZRV8Tb8ccjdcupw+0Quw/iJ7wqVp01bfUOpVq9fSav5rHuN8BCDaHvql0uILyXxk8t2dPwC7B4i8DwhRt7l2aZMG40V4de1d0a7OEcv2+kcJk3YSAAAA";
function td() {
  const [k, R] = Ce.useState(!1), [m, A] = Ce.useState([]), [Z, ue] = Ce.useState(""), [J, se] = Ce.useState(!1), [U, pe] = Ce.useState([]), [ve, K] = Ce.useState(null), Q = Ce.useRef(null), Me = Ce.useRef(!1), je = Ce.useRef({}), q = Ce.useRef(null), $ = Ce.useRef(null), Fe = Ce.useRef(null);
  Ce.useEffect(() => () => clearInterval(Fe.current), []), Ce.useEffect(() => {
    var Y;
    const F = q.current;
    F != null && (q.current = null, (Y = je.current[F]) == null || Y.scrollIntoView({ block: "start", behavior: "smooth" }));
  }, [m]);
  const Ie = Ce.useCallback(async () => {
    if (Q.current) return Q.current;
    const { sessionId: F, greeting: Y, suggestions: ne, avgWaitSeconds: b } = await Kf();
    return Q.current = F, $.current = b, pe(ne), A((_e) => [..._e, { role: "agent", text: Y }]), F;
  }, []), $e = Ce.useCallback(async () => {
    if (R((F) => !F), !Me.current) {
      Me.current = !0;
      try {
        await Ie();
      } catch (F) {
        A((Y) => [...Y, { role: "system", text: `Error: ${F.message}` }]);
      }
    }
  }, [Ie]), ge = Ce.useCallback(
    async (F) => {
      const Y = (F ?? Z).trim();
      if (!Y || J) return;
      ue(""), pe([]), se(!0);
      const ne = $.current;
      K(ne != null ? Math.round(ne) : null), ne != null && (clearInterval(Fe.current), Fe.current = setInterval(() => {
        K((b) => b != null ? Math.max(0, b - 1) : b);
      }, 1e3)), A((b) => {
        const _e = [...b, { role: "user", text: Y }];
        return q.current = _e.length - 1, _e;
      });
      try {
        const b = await Ie(), _e = await Yf(b, Y);
        A((lt) => [...lt, { role: "agent", text: _e }]);
      } catch (b) {
        A((_e) => [..._e, { role: "system", text: `Error: ${b.message}` }]);
      } finally {
        clearInterval(Fe.current), K(null), se(!1);
      }
    },
    [Z, J, Ie]
  );
  return /* @__PURE__ */ I.jsxs(I.Fragment, { children: [
    /* @__PURE__ */ I.jsx("button", { className: "ilw-launcher", "aria-label": "Open chat", onClick: $e, children: /* @__PURE__ */ I.jsx("img", { className: "ilw-launcher-avatar", src: ed, alt: "" }) }),
    /* @__PURE__ */ I.jsxs("div", { className: `ilw-panel${k ? " ilw-open" : ""}`, children: [
      /* @__PURE__ */ I.jsx("div", { className: "ilw-header", children: "Ask me anything" }),
      /* @__PURE__ */ I.jsxs("div", { className: "ilw-messages", children: [
        m.map((F, Y) => {
          const ne = F.role === "agent" ? Gf(F.text) : null;
          return /* @__PURE__ */ I.jsx(
            "div",
            {
              ref: (b) => {
                je.current[Y] = b;
              },
              className: ne ? "ilw-msg-cards" : `ilw-msg ilw-msg-${F.role}`,
              children: ne ? /* @__PURE__ */ I.jsx(bf, { intro: ne.intro, sections: ne.sections }) : F.text
            },
            Y
          );
        }),
        J && /* @__PURE__ */ I.jsx("div", { className: "ilw-msg ilw-msg-agent", children: /* @__PURE__ */ I.jsx(Xf, { etaSeconds: ve }) })
      ] }),
      U.length > 0 && !J && /* @__PURE__ */ I.jsx("div", { className: "ilw-suggestions", children: U.map((F) => /* @__PURE__ */ I.jsx("button", { className: "ilw-suggestion", onClick: () => ge(F), children: F }, F)) }),
      /* @__PURE__ */ I.jsxs("div", { className: "ilw-inputrow", children: [
        /* @__PURE__ */ I.jsx(
          "input",
          {
            className: "ilw-input",
            type: "text",
            placeholder: "Type a message…",
            value: Z,
            disabled: J,
            onChange: (F) => ue(F.target.value),
            onKeyDown: (F) => {
              F.key === "Enter" && ge();
            }
          }
        ),
        /* @__PURE__ */ I.jsx("button", { className: "ilw-send", disabled: J, onClick: () => ge(), children: "Send" })
      ] })
    ] })
  ] });
}
const nd = `
.ilw-launcher {
  anchor-name: --ilw;
  position: fixed; z-index: 999999;
  width: 100px; height: 100px; border-radius: 50%; border: none;
  background: #e74c3c; color: #fff; font-size: 24px; cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  padding: 0; overflow: hidden;
}
.ilw-launcher-avatar { width: 100%; height: 100%; object-fit: cover; display: block; }
.ilw-panel {
  position: fixed;
  width: 340px; height: 460px; background: #141414; color: #f0f0f0;
  border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  display: none; flex-direction: column; overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 14px;
}

/* 📱 Media query targeting desktop layout */
@media screen and (min-width: 768px) {
  .ilw-panel {
    position-anchor: --ilw;
    left: anchor(right);
    bottom: anchor(bottom);
    z-index: 999999;
  }
  .ilw-launcher {
    bottom: 40px; left: 160px; 
  }
}
/* 📱 Media query targeting mobile devices */
@media screen and (max-width: 768px) {
  .ilw-panel {
    position-anchor: --ilw;
    left: anchor(left);
    bottom: anchor(top);
  }
  .ilw-launcher {
    bottom: 40px; left: 40px; 
  }
}

.ilw-panel.ilw-open { display: flex; }
.ilw-header {
  padding: 12px 16px; background: #1e1e1e; border-bottom: 1px solid #333;
  font-weight: 600;
}
.ilw-messages {
  flex: 1; overflow-y: auto; padding: 12px; display: flex;
  flex-direction: column; gap: 8px;
}
.ilw-msg { max-width: 85%; padding: 8px 12px; border-radius: 10px; line-height: 1.4; white-space: pre-wrap; }
.ilw-msg-user { align-self: flex-end; background: #2a3f5f; }
.ilw-msg-agent { align-self: flex-start; background: #2a2a2a; }
.ilw-msg-system { align-self: center; color: #e74c3c; font-size: 12px; }
.ilw-inputrow { display: flex; border-top: 1px solid #333; padding: 8px; gap: 8px; }
.ilw-input {
  flex: 1; background: #1e1e1e; border: 1px solid #444; border-radius: 8px;
  color: #f0f0f0; padding: 8px 10px; font-size: 14px; outline: none;
}
.ilw-send {
  background: #e74c3c; color: #fff; border: none; border-radius: 8px;
  padding: 8px 14px; cursor: pointer;
}
.ilw-send:disabled { opacity: 0.5; cursor: default; }
.ilw-typing { display: inline-flex; gap: 3px; align-items: center; height: 14px; }
.ilw-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #f0f0f0;
  animation: ilwTypingBounce 1.2s ease-in-out infinite; opacity: 0.4;
}
.ilw-dot:nth-child(2) { animation-delay: 0.15s; }
.ilw-dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes ilwTypingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-3px); opacity: 1; }
}
.ilw-typing-eta { margin-left: 6px; font-size: 11px; color: #999; }
.ilw-suggestions {
  display: flex; flex-wrap: wrap; gap: 6px; padding: 0 12px 8px;
}
.ilw-suggestion {
  background: #1e1e1e; border: 1px solid #444; border-radius: 14px;
  color: #ccc; font-size: 12px; padding: 5px 10px; cursor: pointer;
}
.ilw-suggestion:hover { background: #2a2a2a; border-color: #666; }
.ilw-msg-cards .pc-root { padding: 12px; }
.ilw-msg-cards .pc-grid { grid-template-columns: 1fr; gap: 10px; }
`;
function rd() {
  if (document.getElementById("ilw-style")) return;
  const k = document.createElement("style");
  k.id = "ilw-style", k.textContent = nd, document.head.appendChild(k);
}
function Oa() {
  rd();
  const k = document.querySelector("#ilw-root");
  Wf.createRoot(k).render(/* @__PURE__ */ I.jsx(td, {}));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Oa) : Oa();

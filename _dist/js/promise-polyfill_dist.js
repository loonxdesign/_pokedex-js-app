!(function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? e()
        : 'function' == typeof define && define.amd
        ? define(e)
        : e()
})(0, function () {
    'use strict'
    function t(t) {
        var e = this.constructor
        return this.then(
            function (n) {
                return e.resolve(t()).then(function () {
                    return n
                })
            },
            function (n) {
                return e.resolve(t()).then(function () {
                    return e.reject(n)
                })
            }
        )
    }
    function e(t) {
        return new this(function (e, n) {
            function o(t, n) {
                if (n && ('object' == typeof n || 'function' == typeof n)) {
                    var f = n.then
                    if ('function' == typeof f)
                        return void f.call(
                            n,
                            function (e) {
                                o(t, e)
                            },
                            function (n) {
                                ;(r[t] = { status: 'rejected', reason: n }),
                                    0 == --i && e(r)
                            }
                        )
                }
                ;(r[t] = { status: 'fulfilled', value: n }), 0 == --i && e(r)
            }
            if (!t || void 0 === t.length)
                return n(
                    TypeError(
                        typeof t +
                            ' ' +
                            t +
                            ' is not iterable(cannot read property Symbol(Symbol.iterator))'
                    )
                )
            var r = Array.prototype.slice.call(t)
            if (0 === r.length) return e([])
            for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f])
        })
    }
    function n(t, e) {
        ;(this.name = 'AggregateError'),
            (this.errors = t),
            (this.message = e || '')
    }
    function o(t) {
        var e = this
        return new e(function (o, r) {
            if (!t || void 0 === t.length)
                return r(TypeError('Promise.any accepts an array'))
            var i = Array.prototype.slice.call(t)
            if (0 === i.length) return r()
            for (var f = [], u = 0; i.length > u; u++)
                try {
                    e.resolve(i[u])
                        .then(o)
                        .catch(function (t) {
                            f.push(t),
                                f.length === i.length &&
                                    r(new n(f, 'All promises were rejected'))
                        })
                } catch (c) {
                    r(c)
                }
        })
    }
    function r(t) {
        return !(!t || void 0 === t.length)
    }
    function i() {}
    function f(t) {
        if (!(this instanceof f))
            throw TypeError('Promises must be constructed via new')
        if ('function' != typeof t) throw TypeError('not a function')
        ;(this._state = 0),
            (this._handled = !1),
            (this._value = void 0),
            (this._deferreds = []),
            s(t, this)
    }
    function u(t, e) {
        for (; 3 === t._state; ) t = t._value
        0 !== t._state
            ? ((t._handled = !0),
              f._immediateFn(function () {
                  var n,
                      o = 1 === t._state ? e.onFulfilled : e.onRejected
                  if (null !== o) {
                      try {
                          n = o(t._value)
                      } catch (r) {
                          return void a(e.promise, r)
                      }
                      c(e.promise, n)
                  } else (1 === t._state ? c : a)(e.promise, t._value)
              }))
            : t._deferreds.push(e)
    }
    function c(t, e) {
        try {
            if (e === t)
                throw TypeError('A promise cannot be resolved with itself.')
            if (e && ('object' == typeof e || 'function' == typeof e)) {
                var n,
                    o,
                    r = e.then
                if (e instanceof f)
                    return (t._state = 3), (t._value = e), void l(t)
                if ('function' == typeof r)
                    return void s(
                        ((n = r),
                        (o = e),
                        function () {
                            n.apply(o, arguments)
                        }),
                        t
                    )
            }
            ;(t._state = 1), (t._value = e), l(t)
        } catch (i) {
            a(t, i)
        }
    }
    function a(t, e) {
        ;(t._state = 2), (t._value = e), l(t)
    }
    function l(t) {
        2 === t._state &&
            0 === t._deferreds.length &&
            f._immediateFn(function () {
                t._handled || f._unhandledRejectionFn(t._value)
            })
        for (var e = 0, n = t._deferreds.length; n > e; e++)
            u(t, t._deferreds[e])
        t._deferreds = null
    }
    function s(t, e) {
        var n = !1
        try {
            t(
                function (t) {
                    n || ((n = !0), c(e, t))
                },
                function (t) {
                    n || ((n = !0), a(e, t))
                }
            )
        } catch (o) {
            if (n) return
            ;(n = !0), a(e, o)
        }
    }
    n.prototype = Error.prototype
    var h = setTimeout
    ;(f.prototype.catch = function (t) {
        return this.then(null, t)
    }),
        (f.prototype.then = function (t, e) {
            var n = new this.constructor(i)
            return (
                u(
                    this,
                    new (function (t, e, n) {
                        ;(this.onFulfilled = 'function' == typeof t ? t : null),
                            (this.onRejected =
                                'function' == typeof e ? e : null),
                            (this.promise = n)
                    })(t, e, n)
                ),
                n
            )
        }),
        (f.prototype.finally = t),
        (f.all = function (t) {
            return new f(function (e, n) {
                function o(t, r) {
                    try {
                        if (
                            r &&
                            ('object' == typeof r || 'function' == typeof r)
                        ) {
                            var u = r.then
                            if ('function' == typeof u)
                                return void u.call(
                                    r,
                                    function (e) {
                                        o(t, e)
                                    },
                                    n
                                )
                        }
                        ;(i[t] = r), 0 == --f && e(i)
                    } catch (c) {
                        n(c)
                    }
                }
                if (!r(t)) return n(TypeError('Promise.all accepts an array'))
                var i = Array.prototype.slice.call(t)
                if (0 === i.length) return e([])
                for (var f = i.length, u = 0; i.length > u; u++) o(u, i[u])
            })
        }),
        (f.any = o),
        (f.allSettled = e),
        (f.resolve = function (t) {
            return t && 'object' == typeof t && t.constructor === f
                ? t
                : new f(function (e) {
                      e(t)
                  })
        }),
        (f.reject = function (t) {
            return new f(function (e, n) {
                n(t)
            })
        }),
        (f.race = function (t) {
            return new f(function (e, n) {
                if (!r(t)) return n(TypeError('Promise.race accepts an array'))
                for (var o = 0, i = t.length; i > o; o++)
                    f.resolve(t[o]).then(e, n)
            })
        }),
        (f._immediateFn =
            ('function' == typeof setImmediate &&
                function (t) {
                    setImmediate(t)
                }) ||
            function (t) {
                h(t, 0)
            }),
        (f._unhandledRejectionFn = function (t) {
            void 0 !== console &&
                console &&
                console.warn('Possible Unhandled Promise Rejection:', t)
        })
    var d = (function () {
        if ('undefined' != typeof self) return self
        if ('undefined' != typeof window) return window
        if ('undefined' != typeof global) return global
        throw Error('unable to locate global object')
    })()
    'function' != typeof d.Promise
        ? (d.Promise = f)
        : (d.Promise.prototype.finally || (d.Promise.prototype.finally = t),
          d.Promise.allSettled || (d.Promise.allSettled = e),
          d.Promise.any || (d.Promise.any = o))
})

this.workbox = this.workbox || {}, this.workbox.strategies = function (e, t, r) {
    "use strict";
    try {
        self.workbox.v["workbox:strategies:3.3.0"] = 1
    } catch (e) {
    }

    class n {
        constructor(t = {}) {
            this.e = e.cacheNames.getRuntimeName(t.cacheName), this.t = t.plugins || [], this.r = t.fetchOptions || null
        }

        handle({event: e}) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return t.makeRequest({event: e, request: e.request})
            })()
        }

        makeRequest({event: e, request: r}) {
            var n = this;
            return babelHelpers.asyncToGenerator(function* () {
                "string" == typeof r && (r = new Request(r));
                let s, a = yield t.cacheWrapper.match(n.e, r, null, n.t);
                if (!a) try {
                    a = yield n.n(r, e)
                } catch (e) {
                    s = e
                }
                if (s) throw s;
                return a
            })()
        }

        n(e, n) {
            var s = this;
            return babelHelpers.asyncToGenerator(function* () {
                const a = yield r.fetchWrapper.fetch(e, s.r, s.t), c = a.clone(),
                    i = t.cacheWrapper.put(s.e, e, c, s.t);
                if (n) try {
                    n.waitUntil(i)
                } catch (e) {
                }
                return a
            })()
        }
    }

    class s {
        constructor(t = {}) {
            this.e = e.cacheNames.getRuntimeName(t.cacheName), this.t = t.plugins || []
        }

        handle({event: e}) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return t.makeRequest({event: e, request: e.request})
            })()
        }

        makeRequest({event: e, request: r}) {
            var n = this;
            return babelHelpers.asyncToGenerator(function* () {
                return "string" == typeof r && (r = new Request(r)), yield t.cacheWrapper.match(n.e, r, null, n.t)
            })()
        }
    }

    var a = {cacheWillUpdate: ({response: e}) => e.ok || 0 === e.status ? e : null};

    class c {
        constructor(t = {}) {
            if (this.e = e.cacheNames.getRuntimeName(t.cacheName), t.plugins) {
                let e = t.plugins.some(e => !!e.cacheWillUpdate);
                this.t = e ? t.plugins : [a, ...t.plugins]
            } else this.t = [a];
            this.s = t.networkTimeoutSeconds, this.r = t.fetchOptions || null
        }

        handle({event: e}) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return t.makeRequest({event: e, request: e.request})
            })()
        }

        makeRequest({event: e, request: t}) {
            var r = this;
            return babelHelpers.asyncToGenerator(function* () {
                const n = [];
                "string" == typeof t && (t = new Request(t));
                const s = [];
                let a;
                if (r.s) {
                    const {id: e, promise: c} = r.i(t, n);
                    a = e, s.push(c)
                }
                const c = r.l(a, e, t, n);
                s.push(c);
                let i = yield Promise.race(s);
                return i || (i = yield c), i
            })()
        }

        i(e, t) {
            var r = this;
            let n;
            var s;
            return {
                promise: new Promise(t => {
                    const a = (s = babelHelpers.asyncToGenerator(function* () {
                        t(yield r.u(e))
                    }), function () {
                        return s.apply(this, arguments)
                    });
                    n = setTimeout(a, 1e3 * this.s)
                }), id: n
            }
        }

        l(e, n, s, a) {
            var c = this;
            return babelHelpers.asyncToGenerator(function* () {
                let a, i;
                try {
                    i = yield r.fetchWrapper.fetch(s, c.r, c.t)
                } catch (e) {
                    a = e
                }
                if (e && clearTimeout(e), a || !i) i = yield c.u(s); else {
                    const e = i.clone(), r = t.cacheWrapper.put(c.e, s, e, c.t);
                    if (n) try {
                        n.waitUntil(r)
                    } catch (e) {
                    }
                }
                return i
            })()
        }

        u(e) {
            return t.cacheWrapper.match(this.e, e, null, this.t)
        }
    }

    class i {
        constructor(t = {}) {
            this.e = e.cacheNames.getRuntimeName(t.cacheName), this.t = t.plugins || [], this.r = t.fetchOptions || null
        }

        handle({event: e}) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return t.makeRequest({event: e, request: e.request})
            })()
        }

        makeRequest({event: e, request: t}) {
            var n = this;
            return babelHelpers.asyncToGenerator(function* () {
                let e, s;
                "string" == typeof t && (t = new Request(t));
                try {
                    s = yield r.fetchWrapper.fetch(t, n.r, n.t)
                } catch (t) {
                    e = t
                }
                if (e) throw e;
                return s
            })()
        }
    }

    class l {
        constructor(t = {}) {
            if (this.e = e.cacheNames.getRuntimeName(t.cacheName), this.t = t.plugins || [], t.plugins) {
                let e = t.plugins.some(e => !!e.cacheWillUpdate);
                this.t = e ? t.plugins : [a, ...t.plugins]
            } else this.t = [a];
            this.r = t.fetchOptions || null
        }

        handle({event: e}) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return t.makeRequest({event: e, request: e.request})
            })()
        }

        makeRequest({event: e, request: r}) {
            var n = this;
            return babelHelpers.asyncToGenerator(function* () {
                "string" == typeof r && (r = new Request(r));
                const s = n.n(r, e);
                let a = yield t.cacheWrapper.match(n.e, r, null, n.t);
                if (a) {
                    if (e) try {
                        e.waitUntil(s)
                    } catch (e) {
                    }
                } else a = yield s;
                return a
            })()
        }

        n(e, n) {
            var s = this;
            return babelHelpers.asyncToGenerator(function* () {
                const a = yield r.fetchWrapper.fetch(e, s.r, s.t), c = t.cacheWrapper.put(s.e, e, a.clone(), s.t);
                if (n) try {
                    n.waitUntil(c)
                } catch (e) {
                }
                return a
            })()
        }
    }

    var u = Object.freeze({CacheFirst: n, CacheOnly: s, NetworkFirst: c, NetworkOnly: i, StaleWhileRevalidate: l});
    const o = {cacheFirst: n, cacheOnly: s, networkFirst: c, networkOnly: i, staleWhileRevalidate: l}, h = {};
    return Object.keys(o).forEach(e => {
        h[e] = ((t = {}) => new (0, o[e])(Object.assign(t)))
    }), Object.assign(h, u)
}(workbox.core._private, workbox.core._private, workbox.core._private);
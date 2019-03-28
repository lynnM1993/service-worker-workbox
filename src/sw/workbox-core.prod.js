self.babelHelpers = {
    asyncToGenerator: function (e) {
        return function () {
            var r = e.apply(this, arguments);
            return new Promise(function (e, t) {
                return function n(o, a) {
                    try {
                        var c = r[o](a), i = c.value
                    } catch (e) {
                        return void t(e)
                    }
                    if (!c.done) return Promise.resolve(i).then(function (e) {
                        n("next", e)
                    }, function (e) {
                        n("throw", e)
                    });
                    e(i)
                }("next")
            })
        }
    }
}, this.workbox = this.workbox || {}, this.workbox.core = function () {
    "use strict";
    try {
        self.workbox.v["workbox:core:3.3.0"] = 1
    } catch (e) {
    }
    var e = {debug: 0, log: 1, warn: 2, error: 3, silent: 4};
    const r = (e, ...r) => {
        let t = e;
        return r.length > 0 && (t += ` :: ${JSON.stringify(r)}`), t
    };

    class t extends Error {
        constructor(e, t) {
            super(r(e, t)), this.name = e, this.details = t
        }
    }

    const n = {
        prefix: "workbox",
        suffix: self.registration.scope,
        googleAnalytics: "googleAnalytics",
        precache: "precache",
        runtime: "runtime"
    }, o = e => [n.prefix, e, n.suffix].filter(e => e.length > 0).join("-"), a = {
        updateDetails: e => {
            Object.keys(n).forEach(r => {
                void 0 !== e[r] && (n[r] = e[r])
            })
        },
        getGoogleAnalyticsName: e => e || o(n.googleAnalytics),
        getPrecacheName: e => e || o(n.precache),
        getRuntimeName: e => e || o(n.runtime)
    }, c = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    let i = (() => e.warn)();
    const l = e => i <= e, s = e.error, u = function (r, t, n) {
            const o = 0 === r.indexOf("group") ? s : e[r];
            if (!l(o)) return;
            if (!n || "groupCollapsed" === r && c) return void console[r](...t);
            const a = ["%cworkbox", `background: ${n}; color: white; padding: 2px 0.5em; ` + "border-radius: 0.5em;"];
            console[r](...a, ...t)
        }, d = () => {
            l(s) && console.groupEnd()
        }, f = {groupEnd: d, unprefixed: {groupEnd: d}},
        p = {debug: "#7f8c8d", log: "#2ecc71", warn: "#f39c12", error: "#c0392b", groupCollapsed: "#3498db"};
    var h;
    Object.keys(p).forEach(e => (e = e, h = p[e], f[e] = ((...r) => u(e, r, h)), void (f.unprefixed[e] = ((...r) => u(e, r)))));
    var y = new class {
        constructor() {
            try {
                self.workbox.v = self.workbox.v || {}
            } catch (e) {
            }
        }

        get cacheNames() {
            return {
                googleAnalytics: a.getGoogleAnalyticsName(),
                precache: a.getPrecacheName(),
                runtime: a.getRuntimeName()
            }
        }

        setCacheNameDetails(e) {
            a.updateDetails(e)
        }

        get logLevel() {
            return (() => i)()
        }

        setLogLevel(r) {
            if (r > e.silent || r < e.debug) throw new t("invalid-value", {
                paramName: "logLevel",
                validValueDescription: "Please use a value from LOG_LEVELS, i.e 'logLevel = workbox.core.LOG_LEVELS.debug'.",
                value: r
            });
            (e => i = e)(r)
        }
    };

    class g {
        constructor(e, r, {onupgradeneeded: t, onversionchange: n = this.e} = {}) {
            this.r = e, this.t = r, this.n = t, this.e = n, this.o = null
        }

        open() {
            var e = this;
            return babelHelpers.asyncToGenerator(function* () {
                if (!e.o) return e.o = yield new Promise(function (r, t) {
                    let n = !1;
                    setTimeout(function () {
                        n = !0, t(new Error("The open request was blocked and timed out"))
                    }, e.OPEN_TIMEOUT);
                    const o = indexedDB.open(e.r, e.t);
                    o.onerror = function (e) {
                        return t(o.error)
                    }, o.onupgradeneeded = function (r) {
                        n ? (o.transaction.abort(), r.target.result.close()) : e.n && e.n(r)
                    }, o.onsuccess = function (t) {
                        const o = t.target.result;
                        n ? o.close() : (o.onversionchange = e.e, r(o))
                    }
                }), e
            })()
        }

        get(e, ...r) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return yield t.i("get", e, "readonly", ...r)
            })()
        }

        add(e, ...r) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return yield t.i("add", e, "readwrite", ...r)
            })()
        }

        put(e, ...r) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return yield t.i("put", e, "readwrite", ...r)
            })()
        }

        delete(e, ...r) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                yield t.i("delete", e, "readwrite", ...r)
            })()
        }

        deleteDatabase() {
            var e = this;
            return babelHelpers.asyncToGenerator(function* () {
                e.close(), e.o = null, yield new Promise(function (r, t) {
                    const n = indexedDB.deleteDatabase(e.r);
                    n.onerror = function (e) {
                        return t(e.target.error)
                    }, n.onblocked = function () {
                        return t(new Error("Deletion was blocked."))
                    }, n.onsuccess = function () {
                        return r()
                    }
                })
            })()
        }

        getAll(e, r, t) {
            var n = this;
            return babelHelpers.asyncToGenerator(function* () {
                return "getAll" in IDBObjectStore.prototype ? yield n.i("getAll", e, "readonly", r, t) : yield n.getAllMatching(e, {
                    query: r,
                    count: t
                })
            })()
        }

        getAllMatching(e, r = {}) {
            var t = this;
            return babelHelpers.asyncToGenerator(function* () {
                return yield t.transaction([e], "readonly", function (t, n) {
                    const o = t[e], a = [];
                    (r.index ? o.index(r.index) : o).openCursor(r.query, r.direction).onsuccess = function (e) {
                        const t = e.target.result;
                        if (t) {
                            const {primaryKey: e, key: o, value: c} = t;
                            a.push(r.includeKeys ? {
                                primaryKey: e,
                                key: o,
                                value: c
                            } : c), r.count && a.length >= r.count ? n(a) : t.continue()
                        } else n(a)
                    }
                })
            })()
        }

        transaction(e, r, t) {
            var n = this;
            return babelHelpers.asyncToGenerator(function* () {
                return yield n.open(), yield new Promise(function (o, a) {
                    const c = n.o.transaction(e, r);
                    c.onerror = function (e) {
                        return a(e.target.error)
                    }, c.onabort = function (e) {
                        return a(e.target.error)
                    }, c.oncomplete = function () {
                        return o()
                    };
                    const i = {};
                    for (const r of e) i[r] = c.objectStore(r);
                    t(i, function (e) {
                        return o(e)
                    }, function () {
                        a(new Error("The transaction was manually aborted")), c.abort()
                    })
                })
            })()
        }

        i(e, r, t, ...n) {
            var o = this;
            return babelHelpers.asyncToGenerator(function* () {
                return yield o.open(), yield o.transaction([r], t, function (t, o) {
                    t[r][e](...n).onsuccess = function (e) {
                        o(e.target.result)
                    }
                })
            })()
        }

        e(e) {
            this.close()
        }

        close() {
            this.o && this.o.close()
        }
    }

    g.prototype.OPEN_TIMEOUT = 2e3;
    var b = "cacheDidUpdate", v = "cacheWillUpdate", w = "cachedResponseWillBeUsed", m = "fetchDidFail",
        x = "requestWillFetch", E = (e, r) => e.filter(e => r in e);
    let T = (k = babelHelpers.asyncToGenerator(function* () {
        for (const e of G) yield e()
    }), function () {
        return k.apply(this, arguments)
    });
    var k;
    const G = new Set, H = e => {
        const r = new URL(e, location);
        return r.origin === location.origin ? r.pathname : r.href
    }, L = (() => {
        var e = babelHelpers.asyncToGenerator(function* (e, r, n, o = []) {
            if (!n) throw new t("cache-put-with-no-response", {url: H(r.url)});
            let a = yield D(r, n, o);
            if (!a) return;
            const c = yield caches.open(e), i = E(o, b);
            let l = i.length > 0 ? yield N(e, r) : null;
            try {
                yield c.put(r, a)
            } catch (e) {
                throw"QuotaExceededError" === e.name && (yield T()), e
            }
            for (let t of i) yield t[b].call(t, {cacheName: e, request: r, oldResponse: l, newResponse: a})
        });
        return function (r, t, n) {
            return e.apply(this, arguments)
        }
    })(), N = (O = babelHelpers.asyncToGenerator(function* (e, r, t, n = []) {
        let o = yield(yield caches.open(e)).match(r, t);
        for (let a of n) w in a && (o = yield a[w].call(a, {
            cacheName: e,
            request: r,
            matchOptions: t,
            cachedResponse: o
        }));
        return o
    }), function (e, r, t) {
        return O.apply(this, arguments)
    });
    var O;
    const D = (q = babelHelpers.asyncToGenerator(function* (e, r, t) {
        let n = r, o = !1;
        for (let r of t) if (v in r && (o = !0, !(n = yield r[v].call(r, {request: e, response: n})))) break;
        return o || (n = n.ok ? n : null), n || null
    }), function (e, r, t) {
        return q.apply(this, arguments)
    });
    var q;
    const A = {put: L, match: N}, P = {
        fetch: (() => {
            var e = babelHelpers.asyncToGenerator(function* (e, r, n = []) {
                "string" == typeof e && (e = new Request(e));
                const o = E(n, m), a = o.length > 0 ? e.clone() : null;
                try {
                    for (let r of n) x in r && (e = yield r[x].call(r, {request: e.clone()}))
                } catch (e) {
                    throw new t("plugin-error-request-will-fetch", {thrownError: e})
                }
                const c = e.clone();
                try {
                    return yield fetch(e, r)
                } catch (e) {
                    for (let r of o) yield r[m].call(r, {error: e, originalRequest: a.clone(), request: c.clone()});
                    throw e
                }
            });
            return function (r, t) {
                return e.apply(this, arguments)
            }
        })()
    };
    var R = Object.freeze({
        DBWrapper: g,
        WorkboxError: t,
        assert: null,
        cacheNames: a,
        cacheWrapper: A,
        fetchWrapper: P,
        getFriendlyURL: H,
        logger: f,
        registerQuotaErrorCallback: function (e) {
            G.add(e)
        }
    });
    return Object.assign(y, {LOG_LEVELS: e, _private: R})
}();
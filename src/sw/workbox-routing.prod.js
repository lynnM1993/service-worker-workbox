this.workbox = this.workbox || {}, this.workbox.routing = function (e, t) {
    "use strict";
    try {
        self.workbox.v["workbox:routing:3.3.0"] = 1
    } catch (e) {
    }
    const r = "GET";
    var o = e => e && "object" == typeof e ? e : {handle: e};

    class s {
        constructor(e, t, s) {
            this.handler = o(t), this.match = e, this.method = s || r
        }
    }

    class n extends s {
        constructor(e, t, r) {
            super(({url: t}) => {
                const r = e.exec(t.href);
                return r ? t.origin !== location.origin && 0 !== r.index ? null : r.slice(1) : null
            }, t, r)
        }
    }

    class i {
        constructor() {
            this.t = new Map
        }

        handleRequest(e) {
            const t = new URL(e.request.url);
            if (!t.protocol.startsWith("http")) return;
            let r = null, o = null, s = null;
            const n = this.e(e, t);
            if (o = n.handler, s = n.params, r = n.route, !o && this.r && (o = this.r), !o) return;
            let i;
            try {
                i = o.handle({url: t, event: e, params: s})
            } catch (e) {
                i = Promise.reject(e)
            }
            return i && this.s && (i = i.catch(r => this.s.handle({url: t, event: e, err: r}))), i
        }

        e(e, t) {
            const r = this.t.get(e.request.method) || [];
            for (const o of r) {
                let r = o.match({url: t, event: e});
                if (r) return Array.isArray(r) && 0 === r.length ? r = void 0 : (r.constructor === Object && 0 === Object.keys(r).length || !0 === r) && (r = void 0), {
                    route: o,
                    params: r,
                    handler: o.handler
                }
            }
            return {handler: void 0, params: void 0}
        }

        setDefaultHandler(e) {
            this.r = o(e)
        }

        setCatchHandler(e) {
            this.s = o(e)
        }

        registerRoute(e) {
            this.t.has(e.method) || this.t.set(e.method, []), this.t.get(e.method).push(e)
        }

        unregisterRoute(t) {
            if (!this.t.has(t.method)) throw new e.WorkboxError("unregister-route-but-not-found-with-method", {method: t.method});
            const r = this.t.get(t.method).indexOf(t);
            if (!(r > -1)) throw new e.WorkboxError("unregister-route-route-not-registered");
            this.t.get(t.method).splice(r, 1)
        }
    }

    class h extends s {
        constructor(e, {whitelist: t = [/./], blacklist: r = []} = {}) {
            super((...e) => this.n(...e), e), this.o = t, this.i = r
        }

        n({event: e, url: t}) {
            if ("navigate" !== e.request.mode) return !1;
            const r = t.pathname + t.search;
            return !this.i.some(e => e.test(r)) && !!this.o.some(e => e.test(r))
        }
    }

    var a = Object.freeze({RegExpRoute: n, Route: s, Router: i, NavigationRoute: h});
    const c = new class extends i {
        registerRoute(t, r, o = "GET") {
            let i;
            if ("string" == typeof t) {
                const e = new URL(t, location);
                i = new s(({url: t}) => t.href === e.href, r, o)
            } else if (t instanceof RegExp) i = new n(t, r, o); else if ("function" == typeof t) i = new s(t, r, o); else {
                if (!(t instanceof s)) throw new e.WorkboxError("unsupported-route-type", {
                    moduleName: "workbox-routing",
                    className: "DefaultRouter",
                    funcName: "registerRoute",
                    paramName: "capture"
                });
                i = t
            }
            return super.registerRoute(i), i
        }

        registerNavigationRoute(e, r = {}) {
            const o = t.cacheNames.getPrecacheName(r.cacheName),
                s = new h(() => caches.match(e, {cacheName: o}).then(t => {
                    if (t) return t;
                    throw new Error(`The cache ${o} did not have an entry for ` + `${e}.`)
                }).catch(t => fetch(e)), {whitelist: r.whitelist, blacklist: r.blacklist});
            return super.registerRoute(s), s
        }
    };
    return self.addEventListener("fetch", e => {
        const t = c.handleRequest(e);
        t && e.respondWith(t)
    }), Object.assign(c, a)
}(workbox.core._private, workbox.core._private);
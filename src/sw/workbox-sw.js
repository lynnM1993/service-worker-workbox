var workbox = function () {
    "use strict";
    try {
        self.workbox.version["workbox:sw:3.3.0"] = 1
    } catch (t) {
    }
    const t = {
        backgroundSync: "background-sync",
        broadcastUpdate: "broadcast-cache-update",
        cacheableResponse: "cacheable-response",
        core: "core",
        expiration: "cache-expiration",
        googleAnalytics: "google-analytics",
        precaching: "precaching",
        rangeRequests: "range-requests",
        routing: "routing",
        strategies: "strategies",
        streams: "streams"
    };
    return new class {
        constructor() {
            return this.version = {},
                this.t = {
                    debug: "localhost" === self.location.hostname,
                    modulePathPrefix: null,
                    modulePathCb: null
                },
                this.e = this.t.debug ? "dev" : "prod",
                this.s = !1,
                new Proxy(this, {
                    get(e, s) {
                        if (e[s]) return e[s];
                        const o = t[s];
                        return o && e.loadModule(`sw/workbox-${o}`), e[s]
                    }
                })
        }

        setConfig(t = {}) {
            if (this.s) throw new Error("Config must be set before accessing workbox.* modules");
            Object.assign(this.t, t), this.e = this.t.debug ? "dev" : "prod"
        }

        skipWaiting() {
            self.addEventListener("install", () => {
                self.skipWaiting()
            })
        }

        clientsClaim() {
            self.addEventListener("activate", () => self.clients.claim())
        }

        loadModule(t) {
            const e = this.o(t);
            console.log(e)
            try {
                importScripts(e), this.s = !0
            } catch (s) {

                throw console.error(`Unable to import module '${t}' from '${e}'.`), s
            }
        }

        o(t) {
            if (this.t.modulePathCb) return this.t.modulePathCb(t, this.t.debug);
            let e = ["https://storage.googleapis.com/workbox-cdn/releases/3.3.0"];
            const s = `${t}.${this.e}.js`, o = this.t.modulePathPrefix;
            return o && "" === (e = o.split("/"))[e.length - 1] && e.splice(e.length - 1, 1), e.push(s), e.join("/")
        }
    }
}();
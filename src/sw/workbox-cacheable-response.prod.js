this.workbox = this.workbox || {}, this.workbox.cacheableResponse = function (s) {
    "use strict";
    try {
        self.workbox.v["workbox:cacheable-response:3.3.0"] = 1
    } catch (s) {
    }

    class e {
        constructor(s = {}) {
            this.t = s.statuses, this.s = s.headers
        }

        isResponseCacheable(s) {
            let e = !0;
            return this.t && (e = this.t.includes(s.status)), this.s && e && (e = Object.keys(this.s).some(e => s.headers.get(e) === this.s[e])), e
        }
    }

    return s.CacheableResponse = e, s.Plugin = class {
        constructor(s) {
            this.e = new e(s)
        }

        cacheWillUpdate({response: s}) {
            return this.e.isResponseCacheable(s) ? s : null
        }
    }, s
}({});
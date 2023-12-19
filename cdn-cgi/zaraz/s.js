(function(w, d) {
    zaraz.debug = (df = "") => {
        document.cookie = `zarazDebug=${df}; path=/`;
        location.reload()
    };
    window.zaraz._al = function(bh, bi, bj) {
        w.zaraz.listeners.push({
            item: bh,
            type: bi,
            callback: bj
        });
        bh.addEventListener(bi, bj)
    };
    zaraz.preview = (l = "") => {
        document.cookie = `zarazPreview=${l}; path=/`;
        location.reload()
    };
    zaraz.i = function(cc) {
        const cd = d.createElement("div");
        cd.innerHTML = unescape(cc);
        const ce = cd.querySelectorAll("script");
        for (let cf = 0; cf < ce.length; cf++) {
            const cg = d.createElement("script");
            ce[cf].innerHTML && (cg.innerHTML = ce[cf].innerHTML);
            for (const ch of ce[cf].attributes) cg.setAttribute(ch.name, ch.value);
            d.head.appendChild(cg);
            ce[cf].remove()
        }
        d.body.appendChild(cd)
    };
    zaraz.f = async function(dg, dh) {
        const di = {
            credentials: "include",
            keepalive: !0,
            mode: "no-cors"
        };
        if (dh) {
            di.method = "POST";
            di.body = new URLSearchParams(dh);
            di.headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return await fetch(dg, di)
    };
    window.zaraz._p = async ci => new Promise((cj => {
        if (ci) {
            ci.e && ci.e.forEach((ck => {
                try {
                    new Function(ck)()
                } catch (cl) {
                    console.error(`Error executing script: ${ck}\n`, cl)
                }
            }));
            Promise.allSettled((ci.f || []).map((cm => fetch(cm[0], cm[1]))))
        }
        cj()
    }));
    zaraz.pageVariables = {};
    zaraz.__zcl = zaraz.__zcl || {};
    zaraz.track = async function(cK, cL, cM) {
        return new Promise(((cN, cO) => {
            const cP = {
                name: cK,
                data: {}
            };
            for (const cQ of [localStorage, sessionStorage]) Object.keys(cQ || {}).filter((cS => cS.startsWith("_zaraz_"))).forEach((cR => {
                try {
                    cP.data[cR.slice(7)] = JSON.parse(cQ.getItem(cR))
                } catch {
                    cP.data[cR.slice(7)] = cQ.getItem(cR)
                }
            }));
            Object.keys(zaraz.pageVariables).forEach((cT => cP.data[cT] = JSON.parse(zaraz.pageVariables[cT])));
            Object.keys(zaraz.__zcl).forEach((cU => cP.data[`__zcl_${cU}`] = zaraz.__zcl[cU]));
            cP.data.__zarazMCListeners = zaraz.__zarazMCListeners;
            //
            cP.data = { ...cP.data,
                ...cL
            };
            cP.zarazData = zarazData;
            fetch("/cdn-cgi/zaraz/t", {
                credentials: "include",
                keepalive: !0,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cP)
            }).catch((() => {
                //
                return fetch("/cdn-cgi/zaraz/t", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(cP)
                })
            })).then((function(cW) {
                zarazData._let = (new Date).getTime();
                cW.ok || cO();
                return 204 !== cW.status && cW.json()
            })).then((async cV => {
                await zaraz._p(cV);
                "function" == typeof cM && cM()
            })).finally((() => cN()))
        }))
    };
    zaraz.set = function(cX, cY, cZ) {
        try {
            cY = JSON.stringify(cY)
        } catch (c$) {
            return
        }
        prefixedKey = "_zaraz_" + cX;
        sessionStorage && sessionStorage.removeItem(prefixedKey);
        localStorage && localStorage.removeItem(prefixedKey);
        delete zaraz.pageVariables[cX];
        if (void 0 !== cY) {
            cZ && "session" == cZ.scope ? sessionStorage && sessionStorage.setItem(prefixedKey, cY) : cZ && "page" == cZ.scope ? zaraz.pageVariables[cX] = cY : localStorage && localStorage.setItem(prefixedKey, cY);
            zaraz.__watchVar = {
                key: cX,
                value: cY
            }
        }
    };
    for (const {
            m: da,
            a: db
        } of zarazData.q.filter((({
            m: dc
        }) => ["debug", "set"].includes(dc)))) zaraz[da](...db);
    for (const {
            m: dd,
            a: de
        } of zaraz.q) zaraz[dd](...de);
    delete zaraz.q;
    delete zarazData.q;
    zaraz.fulfilTrigger = function(H, I, J, K) {
        zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
        zaraz.__zarazTriggerMap[H] || (zaraz.__zarazTriggerMap[H] = "");
        zaraz.__zarazTriggerMap[H] += "*" + I + "*";
        zaraz.track("__zarazEmpty", { ...J,
            __zarazClientTriggers: zaraz.__zarazTriggerMap[H]
        }, K)
    };
    window.dataLayer = w.dataLayer || [];
    zaraz._processDataLayer = dm => {
        for (const dn of Object.entries(dm)) zaraz.set(dn[0], dn[1], {
            scope: "page"
        });
        if (dm.event) {
            if (zarazData.dataLayerIgnore && zarazData.dataLayerIgnore.includes(dm.event)) return;
            let dp = {};
            for (let dq of dataLayer.slice(0, dataLayer.indexOf(dm) + 1)) dp = { ...dp,
                ...dq
            };
            delete dp.event;
            dm.event.startsWith("gtm.") || zaraz.track(dm.event, dp)
        }
    };
    const dl = w.dataLayer.push;
    Object.defineProperty(w.dataLayer, "push", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: function(...dr) {
            let ds = dl.apply(this, dr);
            zaraz._processDataLayer(dr[0]);
            return ds
        }
    });
    dataLayer.forEach((dt => zaraz._processDataLayer(dt)));
    zaraz._cts = () => {
        zaraz._timeouts && zaraz._timeouts.forEach((j => clearTimeout(j)));
        zaraz._timeouts = []
    };
    zaraz._rl = function() {
        w.zaraz.listeners && w.zaraz.listeners.forEach((k => k.item.removeEventListener(k.type, k.callback)));
        window.zaraz.listeners = []
    };
    history.pushState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.pushState.apply(history, arguments);
            setTimeout((() => {
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.__zarazMCListeners = {};
                zaraz.track("__zarazSPA")
            }), 100)
        }
    };
    history.replaceState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.replaceState.apply(history, arguments);
            setTimeout((() => {
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.track("__zarazSPA")
            }), 100)
        }
    };
    zaraz._c = ex => {
        const {
            event: ey,
            ...ez
        } = ex;
        zaraz.track(ey, { ...ez,
            __zarazClientEvent: !0
        })
    };
    zaraz._syncedAttributes = ["altKey", "clientX", "clientY", "pageX", "pageY", "button"];
    zaraz.__zcl.track = !0;
    d.addEventListener("visibilitychange", (ew => {
        zaraz._c({
            event: "visibilityChange",
            visibilityChange: [{
                state: d.visibilityState,
                timestamp: (new Date).getTime()
            }]
        }, 1)
    }));
    zaraz.__zcl.visibilityChange = !0;
    zaraz.__zarazMCListeners = {
        "google-analytics_v4_20ac": ["visibilityChange"]
    };
    zaraz._p({
        "e": ["(function(w,d){w.zarazData.executed.push(\"Pageview\");})(window,document)"],
        "f": [
            ["https://stats.g.doubleclick.net/g/collect?t=dc&aip=1&_r=3&v=1&_v=j86&tid=G-SEKJ4E9T4H&cid=cd5fb07e-6055-4ccf-98bc-202442c4e8fa&_u=KGDAAEADQAAAAC%7E&z=79878712", {}]
        ]
    })
})(window, document);
System.register([], function (_export) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            (function ($, window, undefined) {
                "use strict";

                if (typeof $.signalR !== "function") {
                    throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
                }

                var signalR = $.signalR;

                function makeProxyCallback(hub, callback) {
                    return function () {
                        callback.apply(hub, $.makeArray(arguments));
                    };
                }

                function registerHubProxies(instance, shouldSubscribe) {
                    var key, hub, memberKey, memberValue, subscriptionMethod;

                    for (key in instance) {
                        if (instance.hasOwnProperty(key)) {
                            hub = instance[key];

                            if (!hub.hubName) {
                                continue;
                            }

                            if (shouldSubscribe) {
                                subscriptionMethod = hub.on;
                            } else {
                                subscriptionMethod = hub.off;
                            }

                            for (memberKey in hub.client) {
                                if (hub.client.hasOwnProperty(memberKey)) {
                                    memberValue = hub.client[memberKey];

                                    if (!$.isFunction(memberValue)) {
                                        continue;
                                    }

                                    subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                                }
                            }
                        }
                    }
                }

                $.hubConnection.prototype.createHubProxies = function () {
                    var proxies = {};
                    this.starting(function () {
                        registerHubProxies(proxies, true);

                        this._registerSubscribedHubs();
                    }).disconnected(function () {
                        registerHubProxies(proxies, false);
                    });

                    proxies['echoHub'] = this.createHubProxy('echoHub');
                    proxies['echoHub'].client = {};
                    proxies['echoHub'].server = {
                        changeNickname: function changeNickname(newNickname) {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["ChangeNickname"], $.makeArray(arguments)));
                        },

                        hello: function hello() {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["Hello"], $.makeArray(arguments)));
                        },

                        obiWanMessage: function obiWanMessage() {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["ObiWanMessage"], $.makeArray(arguments)));
                        },

                        sum: function sum(a, b) {
                            return proxies['echoHub'].invoke.apply(proxies['echoHub'], $.merge(["Sum"], $.makeArray(arguments)));
                        }
                    };

                    return proxies;
                };

                signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
                $.extend(signalR, signalR.hub.createHubProxies());
            })(window.jQuery, window);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,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LEVBQUUsTUFBTSxDQUFDLENBQUUiLCJmaWxlIjoibGlicy9odWJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIEFTUC5ORVQgU2lnbmFsUiBKYXZhU2NyaXB0IExpYnJhcnkgdjIuMi4wXHJcbiAqIGh0dHA6Ly9zaWduYWxyLm5ldC9cclxuICpcclxuICogQ29weXJpZ2h0IE1pY3Jvc29mdCBPcGVuIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIDIuMFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU2lnbmFsUi9TaWduYWxSL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcclxuICpcclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi5cXC4uXFxTaWduYWxSLkNsaWVudC5KU1xcU2NyaXB0c1xcanF1ZXJ5LTEuNi40LmpzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLmpzXCIgLz5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG4gICAgLy8vIDxwYXJhbSBuYW1lPVwiJFwiIHR5cGU9XCJqUXVlcnlcIiAvPlxyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgaWYgKHR5cGVvZiAoJC5zaWduYWxSKSAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2lnbmFsUjogU2lnbmFsUiBpcyBub3QgbG9hZGVkLiBQbGVhc2UgZW5zdXJlIGpxdWVyeS5zaWduYWxSLXguanMgaXMgcmVmZXJlbmNlZCBiZWZvcmUgfi9zaWduYWxyL2pzLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2lnbmFsUiA9ICQuc2lnbmFsUjtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlUHJveHlDYWxsYmFjayhodWIsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgY2xpZW50IGh1YiBtZXRob2RcclxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoaHViLCAkLm1ha2VBcnJheShhcmd1bWVudHMpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVySHViUHJveGllcyhpbnN0YW5jZSwgc2hvdWxkU3Vic2NyaWJlKSB7XHJcbiAgICAgICAgdmFyIGtleSwgaHViLCBtZW1iZXJLZXksIG1lbWJlclZhbHVlLCBzdWJzY3JpcHRpb25NZXRob2Q7XHJcblxyXG4gICAgICAgIGZvciAoa2V5IGluIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBodWIgPSBpbnN0YW5jZVtrZXldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghKGh1Yi5odWJOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdCBhIGNsaWVudCBodWJcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkU3Vic2NyaWJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd2FudCB0byBzdWJzY3JpYmUgdG8gdGhlIGh1YiBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25NZXRob2QgPSBodWIub247XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gdW5zdWJzY3JpYmUgZnJvbSB0aGUgaHViIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbk1ldGhvZCA9IGh1Yi5vZmY7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBtZW1iZXJzIG9uIHRoZSBodWIgYW5kIGZpbmQgY2xpZW50IGh1YiBmdW5jdGlvbnMgdG8gc3Vic2NyaWJlL3Vuc3Vic2NyaWJlXHJcbiAgICAgICAgICAgICAgICBmb3IgKG1lbWJlcktleSBpbiBodWIuY2xpZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGh1Yi5jbGllbnQuaGFzT3duUHJvcGVydHkobWVtYmVyS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXJWYWx1ZSA9IGh1Yi5jbGllbnRbbWVtYmVyS2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJC5pc0Z1bmN0aW9uKG1lbWJlclZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90IGEgY2xpZW50IGh1YiBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbk1ldGhvZC5jYWxsKGh1YiwgbWVtYmVyS2V5LCBtYWtlUHJveHlDYWxsYmFjayhodWIsIG1lbWJlclZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICQuaHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlSHViUHJveGllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJveGllcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RhcnRpbmcoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgaHViIHByb3hpZXMgYXMgc3Vic2NyaWJlZFxyXG4gICAgICAgICAgICAvLyAoaW5zdGFuY2UsIHNob3VsZFN1YnNjcmliZSlcclxuICAgICAgICAgICAgcmVnaXN0ZXJIdWJQcm94aWVzKHByb3hpZXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJTdWJzY3JpYmVkSHVicygpO1xyXG4gICAgICAgIH0pLmRpc2Nvbm5lY3RlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFVuc3Vic2NyaWJlIGFsbCBodWIgcHJveGllcyB3aGVuIHdlIFwiZGlzY29ubmVjdFwiLiAgVGhpcyBpcyB0byBlbnN1cmUgdGhhdCB3ZSBkbyBub3QgcmUtYWRkIGZ1bmN0aW9uYWwgY2FsbCBiYWNrcy5cclxuICAgICAgICAgICAgLy8gKGluc3RhbmNlLCBzaG91bGRTdWJzY3JpYmUpXHJcbiAgICAgICAgICAgIHJlZ2lzdGVySHViUHJveGllcyhwcm94aWVzLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb3hpZXNbJ2VjaG9IdWInXSA9IHRoaXMuY3JlYXRlSHViUHJveHkoJ2VjaG9IdWInKTsgXHJcbiAgICAgICAgcHJveGllc1snZWNob0h1YiddLmNsaWVudCA9IHsgfTtcclxuICAgICAgICBwcm94aWVzWydlY2hvSHViJ10uc2VydmVyID0ge1xyXG4gICAgICAgICAgICBjaGFuZ2VOaWNrbmFtZTogZnVuY3Rpb24gKG5ld05pY2tuYW1lKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5DYWxscyB0aGUgQ2hhbmdlTmlja25hbWUgbWV0aG9kIG9uIHRoZSBzZXJ2ZXItc2lkZSBFY2hvSHViIGh1Yi4mIzEwO1JldHVybnMgYSBqUXVlcnkuRGVmZXJyZWQoKSBwcm9taXNlLjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVxcXCJuZXdOaWNrbmFtZVxcXCIgdHlwZT1cXFwiU3RyaW5nXFxcIj5TZXJ2ZXIgc2lkZSB0eXBlIGlzIFN5c3RlbS5TdHJpbmc8L3BhcmFtPlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3hpZXNbJ2VjaG9IdWInXS5pbnZva2UuYXBwbHkocHJveGllc1snZWNob0h1YiddLCAkLm1lcmdlKFtcIkNoYW5nZU5pY2tuYW1lXCJdLCAkLm1ha2VBcnJheShhcmd1bWVudHMpKSk7XHJcbiAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaGVsbG86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkNhbGxzIHRoZSBIZWxsbyBtZXRob2Qgb24gdGhlIHNlcnZlci1zaWRlIEVjaG9IdWIgaHViLiYjMTA7UmV0dXJucyBhIGpRdWVyeS5EZWZlcnJlZCgpIHByb21pc2UuPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3hpZXNbJ2VjaG9IdWInXS5pbnZva2UuYXBwbHkocHJveGllc1snZWNob0h1YiddLCAkLm1lcmdlKFtcIkhlbGxvXCJdLCAkLm1ha2VBcnJheShhcmd1bWVudHMpKSk7XHJcbiAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgb2JpV2FuTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+Q2FsbHMgdGhlIE9iaVdhbk1lc3NhZ2UgbWV0aG9kIG9uIHRoZSBzZXJ2ZXItc2lkZSBFY2hvSHViIGh1Yi4mIzEwO1JldHVybnMgYSBqUXVlcnkuRGVmZXJyZWQoKSBwcm9taXNlLjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm94aWVzWydlY2hvSHViJ10uaW52b2tlLmFwcGx5KHByb3hpZXNbJ2VjaG9IdWInXSwgJC5tZXJnZShbXCJPYmlXYW5NZXNzYWdlXCJdLCAkLm1ha2VBcnJheShhcmd1bWVudHMpKSk7XHJcbiAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc3VtOiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+Q2FsbHMgdGhlIFN1bSBtZXRob2Qgb24gdGhlIHNlcnZlci1zaWRlIEVjaG9IdWIgaHViLiYjMTA7UmV0dXJucyBhIGpRdWVyeS5EZWZlcnJlZCgpIHByb21pc2UuPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XFxcImFcXFwiIHR5cGU9XFxcIk51bWJlclxcXCI+U2VydmVyIHNpZGUgdHlwZSBpcyBTeXN0ZW0uSW50MzI8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XFxcImJcXFwiIHR5cGU9XFxcIk51bWJlclxcXCI+U2VydmVyIHNpZGUgdHlwZSBpcyBTeXN0ZW0uSW50MzI8L3BhcmFtPlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3hpZXNbJ2VjaG9IdWInXS5pbnZva2UuYXBwbHkocHJveGllc1snZWNob0h1YiddLCAkLm1lcmdlKFtcIlN1bVwiXSwgJC5tYWtlQXJyYXkoYXJndW1lbnRzKSkpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm94aWVzO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWxSLmh1YiA9ICQuaHViQ29ubmVjdGlvbihcIi9zaWduYWxyXCIsIHsgdXNlRGVmYXVsdFBhdGg6IGZhbHNlIH0pO1xyXG4gICAgJC5leHRlbmQoc2lnbmFsUiwgc2lnbmFsUi5odWIuY3JlYXRlSHViUHJveGllcygpKTtcclxuXHJcbn0od2luZG93LmpRdWVyeSwgd2luZG93KSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

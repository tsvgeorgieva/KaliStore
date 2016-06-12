System.register([], function (_export) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            (function ($, window, undefined) {

                var resources = {
                    nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",
                    noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",
                    errorOnNegotiate: "Error during negotiation request.",
                    stoppedWhileLoading: "The connection was stopped during page load.",
                    stoppedWhileNegotiating: "The connection was stopped during the negotiate request.",
                    errorParsingNegotiateResponse: "Error parsing negotiate response.",
                    errorDuringStartRequest: "Error during start request. Stopping the connection.",
                    stoppedDuringStartRequest: "The connection was stopped during the start request.",
                    errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.",
                    invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.",
                    protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",
                    sendFailed: "Send failed.",
                    parseFailed: "Failed at parsing response: {0}",
                    longPollFailed: "Long polling request failed.",
                    eventSourceFailedToConnect: "EventSource failed to connect.",
                    eventSourceError: "Error raised by EventSource",
                    webSocketClosed: "WebSocket closed.",
                    pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.",
                    pingServerFailed: "Failed to ping server.",
                    pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.",
                    pingServerFailedParse: "Failed to parse ping server response, stopping the connection.",
                    noConnectionTransport: "Connection is in an invalid state, there is no transport active.",
                    webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.",
                    reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",
                    reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."
                };

                if (typeof $ !== "function") {
                    throw new Error(resources.nojQuery);
                }

                var signalR,
                    _connection,
                    _pageLoaded = window.document.readyState === "complete",
                    _pageWindow = $(window),
                    _negotiateAbortText = "__Negotiate Aborted__",
                    events = {
                    onStart: "onStart",
                    onStarting: "onStarting",
                    onReceived: "onReceived",
                    onError: "onError",
                    onConnectionSlow: "onConnectionSlow",
                    onReconnecting: "onReconnecting",
                    onReconnect: "onReconnect",
                    onStateChanged: "onStateChanged",
                    onDisconnect: "onDisconnect"
                },
                    ajaxDefaults = {
                    processData: true,
                    timeout: null,
                    async: true,
                    global: false,
                    cache: false
                },
                    _log = function _log(msg, logging) {
                    if (logging === false) {
                        return;
                    }
                    var m;
                    if (typeof window.console === "undefined") {
                        return;
                    }
                    m = "[" + new Date().toTimeString() + "] SignalR: " + msg;
                    if (window.console.debug) {
                        window.console.debug(m);
                    } else if (window.console.log) {
                        window.console.log(m);
                    }
                },
                    changeState = function changeState(connection, expectedState, newState) {
                    if (expectedState === connection.state) {
                        connection.state = newState;

                        $(connection).triggerHandler(events.onStateChanged, [{ oldState: expectedState, newState: newState }]);
                        return true;
                    }

                    return false;
                },
                    isDisconnecting = function isDisconnecting(connection) {
                    return connection.state === signalR.connectionState.disconnected;
                },
                    supportsKeepAlive = function supportsKeepAlive(connection) {
                    return connection._.keepAliveData.activated && connection.transport.supportsKeepAlive(connection);
                },
                    configureStopReconnectingTimeout = function configureStopReconnectingTimeout(connection) {
                    var stopReconnectingTimeout, onReconnectTimeout;

                    if (!connection._.configuredStopReconnectingTimeout) {
                        onReconnectTimeout = function (connection) {
                            var message = signalR._.format(signalR.resources.reconnectTimeout, connection.disconnectTimeout);
                            connection.log(message);
                            $(connection).triggerHandler(events.onError, [signalR._.error(message, "TimeoutException")]);
                            connection.stop(false, false);
                        };

                        connection.reconnecting(function () {
                            var connection = this;

                            if (connection.state === signalR.connectionState.reconnecting) {
                                stopReconnectingTimeout = window.setTimeout(function () {
                                    onReconnectTimeout(connection);
                                }, connection.disconnectTimeout);
                            }
                        });

                        connection.stateChanged(function (data) {
                            if (data.oldState === signalR.connectionState.reconnecting) {
                                window.clearTimeout(stopReconnectingTimeout);
                            }
                        });

                        connection._.configuredStopReconnectingTimeout = true;
                    }
                };

                signalR = function (url, qs, logging) {

                    return new signalR.fn.init(url, qs, logging);
                };

                signalR._ = {
                    defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8",

                    ieVersion: (function () {
                        var version, matches;

                        if (window.navigator.appName === 'Microsoft Internet Explorer') {
                            matches = /MSIE ([0-9]+\.[0-9]+)/.exec(window.navigator.userAgent);

                            if (matches) {
                                version = window.parseFloat(matches[1]);
                            }
                        }

                        return version;
                    })(),

                    error: function error(message, source, context) {
                        var e = new Error(message);
                        e.source = source;

                        if (typeof context !== "undefined") {
                            e.context = context;
                        }

                        return e;
                    },

                    transportError: function transportError(message, transport, source, context) {
                        var e = this.error(message, source, context);
                        e.transport = transport ? transport.name : undefined;
                        return e;
                    },

                    format: function format() {
                        var s = arguments[0];
                        for (var i = 0; i < arguments.length - 1; i++) {
                            s = s.replace("{" + i + "}", arguments[i + 1]);
                        }
                        return s;
                    },

                    firefoxMajorVersion: function firefoxMajorVersion(userAgent) {
                        var matches = userAgent.match(/Firefox\/(\d+)/);
                        if (!matches || !matches.length || matches.length < 2) {
                            return 0;
                        }
                        return parseInt(matches[1], 10);
                    },

                    configurePingInterval: function configurePingInterval(connection) {
                        var config = connection._.config,
                            onFail = function onFail(error) {
                            $(connection).triggerHandler(events.onError, [error]);
                        };

                        if (config && !connection._.pingIntervalId && config.pingInterval) {
                            connection._.pingIntervalId = window.setInterval(function () {
                                signalR.transports._logic.pingServer(connection).fail(onFail);
                            }, config.pingInterval);
                        }
                    }
                };

                signalR.events = events;

                signalR.resources = resources;

                signalR.ajaxDefaults = ajaxDefaults;

                signalR.changeState = changeState;

                signalR.isDisconnecting = isDisconnecting;

                signalR.connectionState = {
                    connecting: 0,
                    connected: 1,
                    reconnecting: 2,
                    disconnected: 4
                };

                signalR.hub = {
                    start: function start() {
                        throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'></script>.");
                    }
                };

                _pageWindow.load(function () {
                    _pageLoaded = true;
                });

                function validateTransport(requestedTransport, connection) {

                    if ($.isArray(requestedTransport)) {
                        for (var i = requestedTransport.length - 1; i >= 0; i--) {
                            var transport = requestedTransport[i];
                            if ($.type(transport) !== "string" || !signalR.transports[transport]) {
                                connection.log("Invalid transport: " + transport + ", removing it from the transports list.");
                                requestedTransport.splice(i, 1);
                            }
                        }

                        if (requestedTransport.length === 0) {
                            connection.log("No transports remain within the specified transport array.");
                            requestedTransport = null;
                        }
                    } else if (!signalR.transports[requestedTransport] && requestedTransport !== "auto") {
                        connection.log("Invalid transport: " + requestedTransport.toString() + ".");
                        requestedTransport = null;
                    } else if (requestedTransport === "auto" && signalR._.ieVersion <= 8) {
                        return ["longPolling"];
                    }

                    return requestedTransport;
                }

                function getDefaultPort(protocol) {
                    if (protocol === "http:") {
                        return 80;
                    } else if (protocol === "https:") {
                        return 443;
                    }
                }

                function addDefaultPort(protocol, url) {
                    if (url.match(/:\d+$/)) {
                        return url;
                    } else {
                        return url + ":" + getDefaultPort(protocol);
                    }
                }

                function ConnectingMessageBuffer(connection, drainCallback) {
                    var that = this,
                        buffer = [];

                    that.tryBuffer = function (message) {
                        if (connection.state === $.signalR.connectionState.connecting) {
                            buffer.push(message);

                            return true;
                        }

                        return false;
                    };

                    that.drain = function () {
                        if (connection.state === $.signalR.connectionState.connected) {
                            while (buffer.length > 0) {
                                drainCallback(buffer.shift());
                            }
                        }
                    };

                    that.clear = function () {
                        buffer = [];
                    };
                }

                signalR.fn = signalR.prototype = {
                    init: function init(url, qs, logging) {
                        var $connection = $(this);

                        this.url = url;
                        this.qs = qs;
                        this.lastError = null;
                        this._ = {
                            keepAliveData: {},
                            connectingMessageBuffer: new ConnectingMessageBuffer(this, function (message) {
                                $connection.triggerHandler(events.onReceived, [message]);
                            }),
                            lastMessageAt: new Date().getTime(),
                            lastActiveAt: new Date().getTime(),
                            beatInterval: 5000,
                            beatHandle: null,
                            totalTransportConnectTimeout: 0 };
                        if (typeof logging === "boolean") {
                            this.logging = logging;
                        }
                    },

                    _parseResponse: function _parseResponse(response) {
                        var that = this;

                        if (!response) {
                            return response;
                        } else if (typeof response === "string") {
                            return that.json.parse(response);
                        } else {
                            return response;
                        }
                    },

                    _originalJson: window.JSON,

                    json: window.JSON,

                    isCrossDomain: function isCrossDomain(url, against) {
                        var link;

                        url = $.trim(url);

                        against = against || window.location;

                        if (url.indexOf("http") !== 0) {
                            return false;
                        }

                        link = window.document.createElement("a");
                        link.href = url;

                        return link.protocol + addDefaultPort(link.protocol, link.host) !== against.protocol + addDefaultPort(against.protocol, against.host);
                    },

                    ajaxDataType: "text",

                    contentType: "application/json; charset=UTF-8",

                    logging: false,

                    state: signalR.connectionState.disconnected,

                    clientProtocol: "1.5",

                    reconnectDelay: 2000,

                    transportConnectTimeout: 0,

                    disconnectTimeout: 30000,

                    reconnectWindow: 30000,

                    keepAliveWarnAt: 2 / 3,

                    start: function start(options, callback) {
                        var connection = this,
                            config = {
                            pingInterval: 300000,
                            waitForPageLoad: true,
                            transport: "auto",
                            jsonp: false
                        },
                            initialize,
                            deferred = connection._deferral || $.Deferred(),
                            parser = window.document.createElement("a");

                        connection.lastError = null;

                        connection._deferral = deferred;

                        if (!connection.json) {
                            throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");
                        }

                        if ($.type(options) === "function") {
                            callback = options;
                        } else if ($.type(options) === "object") {
                            $.extend(config, options);
                            if ($.type(config.callback) === "function") {
                                callback = config.callback;
                            }
                        }

                        config.transport = validateTransport(config.transport, connection);

                        if (!config.transport) {
                            throw new Error("SignalR: Invalid transport(s) specified, aborting start.");
                        }

                        connection._.config = config;

                        if (!_pageLoaded && config.waitForPageLoad === true) {
                            connection._.deferredStartHandler = function () {
                                connection.start(options, callback);
                            };
                            _pageWindow.bind("load", connection._.deferredStartHandler);

                            return deferred.promise();
                        }

                        if (connection.state === signalR.connectionState.connecting) {
                            return deferred.promise();
                        } else if (changeState(connection, signalR.connectionState.disconnected, signalR.connectionState.connecting) === false) {

                            deferred.resolve(connection);
                            return deferred.promise();
                        }

                        configureStopReconnectingTimeout(connection);

                        parser.href = connection.url;
                        if (!parser.protocol || parser.protocol === ":") {
                            connection.protocol = window.document.location.protocol;
                            connection.host = parser.host || window.document.location.host;
                        } else {
                            connection.protocol = parser.protocol;
                            connection.host = parser.host;
                        }

                        connection.baseUrl = connection.protocol + "//" + connection.host;

                        connection.wsProtocol = connection.protocol === "https:" ? "wss://" : "ws://";

                        if (config.transport === "auto" && config.jsonp === true) {
                            config.transport = "longPolling";
                        }

                        if (connection.url.indexOf("//") === 0) {
                            connection.url = window.location.protocol + connection.url;
                            connection.log("Protocol relative URL detected, normalizing it to '" + connection.url + "'.");
                        }

                        if (this.isCrossDomain(connection.url)) {
                            connection.log("Auto detected cross domain url.");

                            if (config.transport === "auto") {
                                config.transport = ["webSockets", "serverSentEvents", "longPolling"];
                            }

                            if (typeof config.withCredentials === "undefined") {
                                config.withCredentials = true;
                            }

                            if (!config.jsonp) {
                                config.jsonp = !$.support.cors;

                                if (config.jsonp) {
                                    connection.log("Using jsonp because this browser doesn't support CORS.");
                                }
                            }

                            connection.contentType = signalR._.defaultContentType;
                        }

                        connection.withCredentials = config.withCredentials;

                        connection.ajaxDataType = config.jsonp ? "jsonp" : "text";

                        $(connection).bind(events.onStart, function (e, data) {
                            if ($.type(callback) === "function") {
                                callback.call(connection);
                            }
                            deferred.resolve(connection);
                        });

                        connection._.initHandler = signalR.transports._logic.initHandler(connection);

                        initialize = function (transports, index) {
                            var noTransportError = signalR._.error(resources.noTransportOnInit);

                            index = index || 0;
                            if (index >= transports.length) {
                                if (index === 0) {
                                    connection.log("No transports supported by the server were selected.");
                                } else if (index === 1) {
                                    connection.log("No fallback transports were selected.");
                                } else {
                                    connection.log("Fallback transports exhausted.");
                                }

                                $(connection).triggerHandler(events.onError, [noTransportError]);
                                deferred.reject(noTransportError);

                                connection.stop();
                                return;
                            }

                            if (connection.state === signalR.connectionState.disconnected) {
                                return;
                            }

                            var transportName = transports[index],
                                transport = signalR.transports[transportName],
                                onFallback = function onFallback() {
                                initialize(transports, index + 1);
                            };

                            connection.transport = transport;

                            try {
                                connection._.initHandler.start(transport, function () {
                                    var isFirefox11OrGreater = signalR._.firefoxMajorVersion(window.navigator.userAgent) >= 11,
                                        asyncAbort = !!connection.withCredentials && isFirefox11OrGreater;

                                    connection.log("The start request succeeded. Transitioning to the connected state.");

                                    if (supportsKeepAlive(connection)) {
                                        signalR.transports._logic.monitorKeepAlive(connection);
                                    }

                                    signalR.transports._logic.startHeartbeat(connection);

                                    signalR._.configurePingInterval(connection);

                                    if (!changeState(connection, signalR.connectionState.connecting, signalR.connectionState.connected)) {
                                        connection.log("WARNING! The connection was not in the connecting state.");
                                    }

                                    connection._.connectingMessageBuffer.drain();

                                    $(connection).triggerHandler(events.onStart);

                                    _pageWindow.bind("unload", function () {
                                        connection.log("Window unloading, stopping the connection.");

                                        connection.stop(asyncAbort);
                                    });

                                    if (isFirefox11OrGreater) {
                                        _pageWindow.bind("beforeunload", function () {
                                            window.setTimeout(function () {
                                                connection.stop(asyncAbort);
                                            }, 0);
                                        });
                                    }
                                }, onFallback);
                            } catch (error) {
                                connection.log(transport.name + " transport threw '" + error.message + "' when attempting to start.");
                                onFallback();
                            }
                        };

                        var url = connection.url + "/negotiate",
                            onFailed = function onFailed(error, connection) {
                            var err = signalR._.error(resources.errorOnNegotiate, error, connection._.negotiateRequest);

                            $(connection).triggerHandler(events.onError, err);
                            deferred.reject(err);

                            connection.stop();
                        };

                        $(connection).triggerHandler(events.onStarting);

                        url = signalR.transports._logic.prepareQueryString(connection, url);

                        connection.log("Negotiating with '" + url + "'.");

                        connection._.negotiateRequest = signalR.transports._logic.ajax(connection, {
                            url: url,
                            error: function error(_error, statusText) {
                                if (statusText !== _negotiateAbortText) {
                                    onFailed(_error, connection);
                                } else {
                                    deferred.reject(signalR._.error(resources.stoppedWhileNegotiating, null, connection._.negotiateRequest));
                                }
                            },
                            success: function success(result) {
                                var res,
                                    keepAliveData,
                                    protocolError,
                                    transports = [],
                                    supportedTransports = [];

                                try {
                                    res = connection._parseResponse(result);
                                } catch (error) {
                                    onFailed(signalR._.error(resources.errorParsingNegotiateResponse, error), connection);
                                    return;
                                }

                                keepAliveData = connection._.keepAliveData;
                                connection.appRelativeUrl = res.Url;
                                connection.id = res.ConnectionId;
                                connection.token = res.ConnectionToken;
                                connection.webSocketServerUrl = res.WebSocketServerUrl;

                                connection._.pollTimeout = res.ConnectionTimeout * 1000 + 10000;
                                connection.disconnectTimeout = res.DisconnectTimeout * 1000;
                                connection._.totalTransportConnectTimeout = connection.transportConnectTimeout + res.TransportConnectTimeout * 1000;

                                if (res.KeepAliveTimeout) {
                                    keepAliveData.activated = true;

                                    keepAliveData.timeout = res.KeepAliveTimeout * 1000;

                                    keepAliveData.timeoutWarning = keepAliveData.timeout * connection.keepAliveWarnAt;

                                    connection._.beatInterval = (keepAliveData.timeout - keepAliveData.timeoutWarning) / 3;
                                } else {
                                    keepAliveData.activated = false;
                                }

                                connection.reconnectWindow = connection.disconnectTimeout + (keepAliveData.timeout || 0);

                                if (!res.ProtocolVersion || res.ProtocolVersion !== connection.clientProtocol) {
                                    protocolError = signalR._.error(signalR._.format(resources.protocolIncompatible, connection.clientProtocol, res.ProtocolVersion));
                                    $(connection).triggerHandler(events.onError, [protocolError]);
                                    deferred.reject(protocolError);

                                    return;
                                }

                                $.each(signalR.transports, function (key) {
                                    if (key.indexOf("_") === 0 || key === "webSockets" && !res.TryWebSockets) {
                                        return true;
                                    }
                                    supportedTransports.push(key);
                                });

                                if ($.isArray(config.transport)) {
                                    $.each(config.transport, function (_, transport) {
                                        if ($.inArray(transport, supportedTransports) >= 0) {
                                            transports.push(transport);
                                        }
                                    });
                                } else if (config.transport === "auto") {
                                    transports = supportedTransports;
                                } else if ($.inArray(config.transport, supportedTransports) >= 0) {
                                    transports.push(config.transport);
                                }

                                initialize(transports);
                            }
                        });

                        return deferred.promise();
                    },

                    starting: function starting(callback) {
                        var connection = this;
                        $(connection).bind(events.onStarting, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    send: function send(data) {
                        var connection = this;

                        if (connection.state === signalR.connectionState.disconnected) {
                            throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");
                        }

                        if (connection.state === signalR.connectionState.connecting) {
                            throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");
                        }

                        connection.transport.send(connection, data);

                        return connection;
                    },

                    received: function received(callback) {
                        var connection = this;
                        $(connection).bind(events.onReceived, function (e, data) {
                            callback.call(connection, data);
                        });
                        return connection;
                    },

                    stateChanged: function stateChanged(callback) {
                        var connection = this;
                        $(connection).bind(events.onStateChanged, function (e, data) {
                            callback.call(connection, data);
                        });
                        return connection;
                    },

                    error: function error(callback) {
                        var connection = this;
                        $(connection).bind(events.onError, function (e, errorData, sendData) {
                            connection.lastError = errorData;

                            callback.call(connection, errorData, sendData);
                        });
                        return connection;
                    },

                    disconnected: function disconnected(callback) {
                        var connection = this;
                        $(connection).bind(events.onDisconnect, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    connectionSlow: function connectionSlow(callback) {
                        var connection = this;
                        $(connection).bind(events.onConnectionSlow, function (e, data) {
                            callback.call(connection);
                        });

                        return connection;
                    },

                    reconnecting: function reconnecting(callback) {
                        var connection = this;
                        $(connection).bind(events.onReconnecting, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    reconnected: function reconnected(callback) {
                        var connection = this;
                        $(connection).bind(events.onReconnect, function (e, data) {
                            callback.call(connection);
                        });
                        return connection;
                    },

                    stop: function stop(async, notifyServer) {
                        var connection = this,
                            deferral = connection._deferral;

                        if (connection._.deferredStartHandler) {
                            _pageWindow.unbind("load", connection._.deferredStartHandler);
                        }

                        delete connection._.config;
                        delete connection._.deferredStartHandler;

                        if (!_pageLoaded && (!connection._.config || connection._.config.waitForPageLoad === true)) {
                            connection.log("Stopping connection prior to negotiate.");

                            if (deferral) {
                                deferral.reject(signalR._.error(resources.stoppedWhileLoading));
                            }

                            return;
                        }

                        if (connection.state === signalR.connectionState.disconnected) {
                            return;
                        }

                        connection.log("Stopping connection.");

                        changeState(connection, connection.state, signalR.connectionState.disconnected);

                        window.clearTimeout(connection._.beatHandle);
                        window.clearInterval(connection._.pingIntervalId);

                        if (connection.transport) {
                            connection.transport.stop(connection);

                            if (notifyServer !== false) {
                                connection.transport.abort(connection, async);
                            }

                            if (supportsKeepAlive(connection)) {
                                signalR.transports._logic.stopMonitoringKeepAlive(connection);
                            }

                            connection.transport = null;
                        }

                        if (connection._.negotiateRequest) {
                            connection._.negotiateRequest.abort(_negotiateAbortText);
                            delete connection._.negotiateRequest;
                        }

                        if (connection._.initHandler) {
                            connection._.initHandler.stop();
                        }

                        $(connection).triggerHandler(events.onDisconnect);

                        delete connection._deferral;
                        delete connection.messageId;
                        delete connection.groupsToken;
                        delete connection.id;
                        delete connection._.pingIntervalId;
                        delete connection._.lastMessageAt;
                        delete connection._.lastActiveAt;

                        connection._.connectingMessageBuffer.clear();

                        return connection;
                    },

                    log: function log(msg) {
                        _log(msg, this.logging);
                    }
                };

                signalR.fn.init.prototype = signalR.fn;

                signalR.noConflict = function () {
                    if ($.connection === signalR) {
                        $.connection = _connection;
                    }
                    return signalR;
                };

                if ($.connection) {
                    _connection = $.connection;
                }

                $.connection = $.signalR = signalR;
            })(window.jQuery, window);

            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    startAbortText = "__Start Aborted__",
                    transportLogic;

                signalR.transports = {};

                function beat(connection) {
                    if (connection._.keepAliveData.monitoring) {
                        checkIfAlive(connection);
                    }

                    if (transportLogic.markActive(connection)) {
                        connection._.beatHandle = window.setTimeout(function () {
                            beat(connection);
                        }, connection._.beatInterval);
                    }
                }

                function checkIfAlive(connection) {
                    var keepAliveData = connection._.keepAliveData,
                        timeElapsed;

                    if (connection.state === signalR.connectionState.connected) {
                        timeElapsed = new Date().getTime() - connection._.lastMessageAt;

                        if (timeElapsed >= keepAliveData.timeout) {
                            connection.log("Keep alive timed out.  Notifying transport that connection has been lost.");

                            connection.transport.lostConnection(connection);
                        } else if (timeElapsed >= keepAliveData.timeoutWarning) {
                            if (!keepAliveData.userNotified) {
                                connection.log("Keep alive has been missed, connection may be dead/slow.");
                                $(connection).triggerHandler(events.onConnectionSlow);
                                keepAliveData.userNotified = true;
                            }
                        } else {
                            keepAliveData.userNotified = false;
                        }
                    }
                }

                function getAjaxUrl(connection, path) {
                    var url = connection.url + path;

                    if (connection.transport) {
                        url += "?transport=" + connection.transport.name;
                    }

                    return transportLogic.prepareQueryString(connection, url);
                }

                function InitHandler(connection) {
                    this.connection = connection;

                    this.startRequested = false;
                    this.startCompleted = false;
                    this.connectionStopped = false;
                }

                InitHandler.prototype = {
                    start: function start(transport, onSuccess, onFallback) {
                        var that = this,
                            connection = that.connection,
                            failCalled = false;

                        if (that.startRequested || that.connectionStopped) {
                            connection.log("WARNING! " + transport.name + " transport cannot be started. Initialization ongoing or completed.");
                            return;
                        }

                        connection.log(transport.name + " transport starting.");

                        that.transportTimeoutHandle = window.setTimeout(function () {
                            if (!failCalled) {
                                failCalled = true;
                                connection.log(transport.name + " transport timed out when trying to connect.");
                                that.transportFailed(transport, undefined, onFallback);
                            }
                        }, connection._.totalTransportConnectTimeout);

                        transport.start(connection, function () {
                            if (!failCalled) {
                                that.initReceived(transport, onSuccess);
                            }
                        }, function (error) {
                            if (!failCalled) {
                                failCalled = true;
                                that.transportFailed(transport, error, onFallback);
                            }

                            return !that.startCompleted || that.connectionStopped;
                        });
                    },

                    stop: function stop() {
                        this.connectionStopped = true;
                        window.clearTimeout(this.transportTimeoutHandle);
                        signalR.transports._logic.tryAbortStartRequest(this.connection);
                    },

                    initReceived: function initReceived(transport, onSuccess) {
                        var that = this,
                            connection = that.connection;

                        if (that.startRequested) {
                            connection.log("WARNING! The client received multiple init messages.");
                            return;
                        }

                        if (that.connectionStopped) {
                            return;
                        }

                        that.startRequested = true;
                        window.clearTimeout(that.transportTimeoutHandle);

                        connection.log(transport.name + " transport connected. Initiating start request.");
                        signalR.transports._logic.ajaxStart(connection, function () {
                            that.startCompleted = true;
                            onSuccess();
                        });
                    },

                    transportFailed: function transportFailed(transport, error, onFallback) {
                        var connection = this.connection,
                            deferred = connection._deferral,
                            wrappedError;

                        if (this.connectionStopped) {
                            return;
                        }

                        window.clearTimeout(this.transportTimeoutHandle);

                        if (!this.startRequested) {
                            transport.stop(connection);

                            connection.log(transport.name + " transport failed to connect. Attempting to fall back.");
                            onFallback();
                        } else if (!this.startCompleted) {
                            wrappedError = signalR._.error(signalR.resources.errorDuringStartRequest, error);

                            connection.log(transport.name + " transport failed during the start request. Stopping the connection.");
                            $(connection).triggerHandler(events.onError, [wrappedError]);
                            if (deferred) {
                                deferred.reject(wrappedError);
                            }

                            connection.stop();
                        } else {}
                    }
                };

                transportLogic = signalR.transports._logic = {
                    ajax: function ajax(connection, options) {
                        return $.ajax($.extend(true, {}, $.signalR.ajaxDefaults, {
                            type: "GET",
                            data: {},
                            xhrFields: { withCredentials: connection.withCredentials },
                            contentType: connection.contentType,
                            dataType: connection.ajaxDataType
                        }, options));
                    },

                    pingServer: function pingServer(connection) {
                        var url,
                            xhr,
                            deferral = $.Deferred();

                        if (connection.transport) {
                            url = connection.url + "/ping";

                            url = transportLogic.addQs(url, connection.qs);

                            xhr = transportLogic.ajax(connection, {
                                url: url,
                                success: function success(result) {
                                    var data;

                                    try {
                                        data = connection._parseResponse(result);
                                    } catch (error) {
                                        deferral.reject(signalR._.transportError(signalR.resources.pingServerFailedParse, connection.transport, error, xhr));
                                        connection.stop();
                                        return;
                                    }

                                    if (data.Response === "pong") {
                                        deferral.resolve();
                                    } else {
                                        deferral.reject(signalR._.transportError(signalR._.format(signalR.resources.pingServerFailedInvalidResponse, result), connection.transport, null, xhr));
                                    }
                                },
                                error: function error(_error2) {
                                    if (_error2.status === 401 || _error2.status === 403) {
                                        deferral.reject(signalR._.transportError(signalR._.format(signalR.resources.pingServerFailedStatusCode, _error2.status), connection.transport, _error2, xhr));
                                        connection.stop();
                                    } else {
                                        deferral.reject(signalR._.transportError(signalR.resources.pingServerFailed, connection.transport, _error2, xhr));
                                    }
                                }
                            });
                        } else {
                            deferral.reject(signalR._.transportError(signalR.resources.noConnectionTransport, connection.transport));
                        }

                        return deferral.promise();
                    },

                    prepareQueryString: function prepareQueryString(connection, url) {
                        var preparedUrl;

                        preparedUrl = transportLogic.addQs(url, "clientProtocol=" + connection.clientProtocol);

                        preparedUrl = transportLogic.addQs(preparedUrl, connection.qs);

                        if (connection.token) {
                            preparedUrl += "&connectionToken=" + window.encodeURIComponent(connection.token);
                        }

                        if (connection.data) {
                            preparedUrl += "&connectionData=" + window.encodeURIComponent(connection.data);
                        }

                        return preparedUrl;
                    },

                    addQs: function addQs(url, qs) {
                        var appender = url.indexOf("?") !== -1 ? "&" : "?",
                            firstChar;

                        if (!qs) {
                            return url;
                        }

                        if (typeof qs === "object") {
                            return url + appender + $.param(qs);
                        }

                        if (typeof qs === "string") {
                            firstChar = qs.charAt(0);

                            if (firstChar === "?" || firstChar === "&") {
                                appender = "";
                            }

                            return url + appender + qs;
                        }

                        throw new Error("Query string property must be either a string or object.");
                    },

                    getUrl: function getUrl(connection, transport, reconnecting, poll, ajaxPost) {
                        var baseUrl = transport === "webSockets" ? "" : connection.baseUrl,
                            url = baseUrl + connection.appRelativeUrl,
                            qs = "transport=" + transport;

                        if (!ajaxPost && connection.groupsToken) {
                            qs += "&groupsToken=" + window.encodeURIComponent(connection.groupsToken);
                        }

                        if (!reconnecting) {
                            url += "/connect";
                        } else {
                            if (poll) {
                                url += "/poll";
                            } else {
                                url += "/reconnect";
                            }

                            if (!ajaxPost && connection.messageId) {
                                qs += "&messageId=" + window.encodeURIComponent(connection.messageId);
                            }
                        }
                        url += "?" + qs;
                        url = transportLogic.prepareQueryString(connection, url);

                        if (!ajaxPost) {
                            url += "&tid=" + Math.floor(Math.random() * 11);
                        }

                        return url;
                    },

                    maximizePersistentResponse: function maximizePersistentResponse(minPersistentResponse) {
                        return {
                            MessageId: minPersistentResponse.C,
                            Messages: minPersistentResponse.M,
                            Initialized: typeof minPersistentResponse.S !== "undefined" ? true : false,
                            ShouldReconnect: typeof minPersistentResponse.T !== "undefined" ? true : false,
                            LongPollDelay: minPersistentResponse.L,
                            GroupsToken: minPersistentResponse.G
                        };
                    },

                    updateGroups: function updateGroups(connection, groupsToken) {
                        if (groupsToken) {
                            connection.groupsToken = groupsToken;
                        }
                    },

                    stringifySend: function stringifySend(connection, message) {
                        if (typeof message === "string" || typeof message === "undefined" || message === null) {
                            return message;
                        }
                        return connection.json.stringify(message);
                    },

                    ajaxSend: function ajaxSend(connection, data) {
                        var payload = transportLogic.stringifySend(connection, data),
                            url = getAjaxUrl(connection, "/send"),
                            xhr,
                            onFail = function onFail(error, connection) {
                            $(connection).triggerHandler(events.onError, [signalR._.transportError(signalR.resources.sendFailed, connection.transport, error, xhr), data]);
                        };

                        xhr = transportLogic.ajax(connection, {
                            url: url,
                            type: connection.ajaxDataType === "jsonp" ? "GET" : "POST",
                            contentType: signalR._.defaultContentType,
                            data: {
                                data: payload
                            },
                            success: function success(result) {
                                var res;

                                if (result) {
                                    try {
                                        res = connection._parseResponse(result);
                                    } catch (error) {
                                        onFail(error, connection);
                                        connection.stop();
                                        return;
                                    }

                                    transportLogic.triggerReceived(connection, res);
                                }
                            },
                            error: function error(_error3, textStatus) {
                                if (textStatus === "abort" || textStatus === "parsererror") {
                                    return;
                                }

                                onFail(_error3, connection);
                            }
                        });

                        return xhr;
                    },

                    ajaxAbort: function ajaxAbort(connection, async) {
                        if (typeof connection.transport === "undefined") {
                            return;
                        }

                        async = typeof async === "undefined" ? true : async;

                        var url = getAjaxUrl(connection, "/abort");

                        transportLogic.ajax(connection, {
                            url: url,
                            async: async,
                            timeout: 1000,
                            type: "POST"
                        });

                        connection.log("Fired ajax abort async = " + async + ".");
                    },

                    ajaxStart: function ajaxStart(connection, onSuccess) {
                        var rejectDeferred = function rejectDeferred(error) {
                            var deferred = connection._deferral;
                            if (deferred) {
                                deferred.reject(error);
                            }
                        },
                            triggerStartError = function triggerStartError(error) {
                            connection.log("The start request failed. Stopping the connection.");
                            $(connection).triggerHandler(events.onError, [error]);
                            rejectDeferred(error);
                            connection.stop();
                        };

                        connection._.startRequest = transportLogic.ajax(connection, {
                            url: getAjaxUrl(connection, "/start"),
                            success: function success(result, statusText, xhr) {
                                var data;

                                try {
                                    data = connection._parseResponse(result);
                                } catch (error) {
                                    triggerStartError(signalR._.error(signalR._.format(signalR.resources.errorParsingStartResponse, result), error, xhr));
                                    return;
                                }

                                if (data.Response === "started") {
                                    onSuccess();
                                } else {
                                    triggerStartError(signalR._.error(signalR._.format(signalR.resources.invalidStartResponse, result), null, xhr));
                                }
                            },
                            error: function error(xhr, statusText, _error4) {
                                if (statusText !== startAbortText) {
                                    triggerStartError(signalR._.error(signalR.resources.errorDuringStartRequest, _error4, xhr));
                                } else {
                                    connection.log("The start request aborted because connection.stop() was called.");
                                    rejectDeferred(signalR._.error(signalR.resources.stoppedDuringStartRequest, null, xhr));
                                }
                            }
                        });
                    },

                    tryAbortStartRequest: function tryAbortStartRequest(connection) {
                        if (connection._.startRequest) {
                            connection._.startRequest.abort(startAbortText);
                            delete connection._.startRequest;
                        }
                    },

                    tryInitialize: function tryInitialize(persistentResponse, onInitialized) {
                        if (persistentResponse.Initialized) {
                            onInitialized();
                        }
                    },

                    triggerReceived: function triggerReceived(connection, data) {
                        if (!connection._.connectingMessageBuffer.tryBuffer(data)) {
                            $(connection).triggerHandler(events.onReceived, [data]);
                        }
                    },

                    processMessages: function processMessages(connection, minData, onInitialized) {
                        var data;

                        transportLogic.markLastMessage(connection);

                        if (minData) {
                            data = transportLogic.maximizePersistentResponse(minData);

                            transportLogic.updateGroups(connection, data.GroupsToken);

                            if (data.MessageId) {
                                connection.messageId = data.MessageId;
                            }

                            if (data.Messages) {
                                $.each(data.Messages, function (index, message) {
                                    transportLogic.triggerReceived(connection, message);
                                });

                                transportLogic.tryInitialize(data, onInitialized);
                            }
                        }
                    },

                    monitorKeepAlive: function monitorKeepAlive(connection) {
                        var keepAliveData = connection._.keepAliveData;

                        if (!keepAliveData.monitoring) {
                            keepAliveData.monitoring = true;

                            transportLogic.markLastMessage(connection);

                            connection._.keepAliveData.reconnectKeepAliveUpdate = function () {
                                transportLogic.markLastMessage(connection);
                            };

                            $(connection).bind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);

                            connection.log("Now monitoring keep alive with a warning timeout of " + keepAliveData.timeoutWarning + ", keep alive timeout of " + keepAliveData.timeout + " and disconnecting timeout of " + connection.disconnectTimeout);
                        } else {
                            connection.log("Tried to monitor keep alive but it's already being monitored.");
                        }
                    },

                    stopMonitoringKeepAlive: function stopMonitoringKeepAlive(connection) {
                        var keepAliveData = connection._.keepAliveData;

                        if (keepAliveData.monitoring) {
                            keepAliveData.monitoring = false;

                            $(connection).unbind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);

                            connection._.keepAliveData = {};
                            connection.log("Stopping the monitoring of the keep alive.");
                        }
                    },

                    startHeartbeat: function startHeartbeat(connection) {
                        connection._.lastActiveAt = new Date().getTime();
                        beat(connection);
                    },

                    markLastMessage: function markLastMessage(connection) {
                        connection._.lastMessageAt = new Date().getTime();
                    },

                    markActive: function markActive(connection) {
                        if (transportLogic.verifyLastActive(connection)) {
                            connection._.lastActiveAt = new Date().getTime();
                            return true;
                        }

                        return false;
                    },

                    isConnectedOrReconnecting: function isConnectedOrReconnecting(connection) {
                        return connection.state === signalR.connectionState.connected || connection.state === signalR.connectionState.reconnecting;
                    },

                    ensureReconnectingState: function ensureReconnectingState(connection) {
                        if (changeState(connection, signalR.connectionState.connected, signalR.connectionState.reconnecting) === true) {
                            $(connection).triggerHandler(events.onReconnecting);
                        }
                        return connection.state === signalR.connectionState.reconnecting;
                    },

                    clearReconnectTimeout: function clearReconnectTimeout(connection) {
                        if (connection && connection._.reconnectTimeout) {
                            window.clearTimeout(connection._.reconnectTimeout);
                            delete connection._.reconnectTimeout;
                        }
                    },

                    verifyLastActive: function verifyLastActive(connection) {
                        if (new Date().getTime() - connection._.lastActiveAt >= connection.reconnectWindow) {
                            var message = signalR._.format(signalR.resources.reconnectWindowTimeout, new Date(connection._.lastActiveAt), connection.reconnectWindow);
                            connection.log(message);
                            $(connection).triggerHandler(events.onError, [signalR._.error(message, "TimeoutException")]);
                            connection.stop(false, false);
                            return false;
                        }

                        return true;
                    },

                    reconnect: function reconnect(connection, transportName) {
                        var transport = signalR.transports[transportName];

                        if (transportLogic.isConnectedOrReconnecting(connection) && !connection._.reconnectTimeout) {
                            if (!transportLogic.verifyLastActive(connection)) {
                                return;
                            }

                            connection._.reconnectTimeout = window.setTimeout(function () {
                                if (!transportLogic.verifyLastActive(connection)) {
                                    return;
                                }

                                transport.stop(connection);

                                if (transportLogic.ensureReconnectingState(connection)) {
                                    connection.log(transportName + " reconnecting.");
                                    transport.start(connection);
                                }
                            }, connection.reconnectDelay);
                        }
                    },

                    handleParseFailure: function handleParseFailure(connection, result, error, onFailed, context) {
                        var wrappedError = signalR._.transportError(signalR._.format(signalR.resources.parseFailed, result), connection.transport, error, context);

                        if (onFailed && onFailed(wrappedError)) {
                            connection.log("Failed to parse server response while attempting to connect.");
                        } else {
                            $(connection).triggerHandler(events.onError, [wrappedError]);
                            connection.stop();
                        }
                    },

                    initHandler: function initHandler(connection) {
                        return new InitHandler(connection);
                    },

                    foreverFrame: {
                        count: 0,
                        connections: {}
                    }
                };
            })(window.jQuery, window);

            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    transportLogic = signalR.transports._logic;

                signalR.transports.webSockets = {
                    name: "webSockets",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return true;
                    },

                    send: function send(connection, data) {
                        var payload = transportLogic.stringifySend(connection, data);

                        try {
                            connection.socket.send(payload);
                        } catch (ex) {
                            $(connection).triggerHandler(events.onError, [signalR._.transportError(signalR.resources.webSocketsInvalidState, connection.transport, ex, connection.socket), data]);
                        }
                    },

                    start: function start(connection, onSuccess, onFailed) {
                        var url,
                            opened = false,
                            that = this,
                            reconnecting = !onSuccess,
                            $connection = $(connection);

                        if (!window.WebSocket) {
                            onFailed();
                            return;
                        }

                        if (!connection.socket) {
                            if (connection.webSocketServerUrl) {
                                url = connection.webSocketServerUrl;
                            } else {
                                url = connection.wsProtocol + connection.host;
                            }

                            url += transportLogic.getUrl(connection, this.name, reconnecting);

                            connection.log("Connecting to websocket endpoint '" + url + "'.");
                            connection.socket = new window.WebSocket(url);

                            connection.socket.onopen = function () {
                                opened = true;
                                connection.log("Websocket opened.");

                                transportLogic.clearReconnectTimeout(connection);

                                if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                                    $connection.triggerHandler(events.onReconnect);
                                }
                            };

                            connection.socket.onclose = function (event) {
                                var error;

                                if (this === connection.socket) {
                                    if (opened && typeof event.wasClean !== "undefined" && event.wasClean === false) {
                                        error = signalR._.transportError(signalR.resources.webSocketClosed, connection.transport, event);

                                        connection.log("Unclean disconnect from websocket: " + (event.reason || "[no reason given]."));
                                    } else {
                                        connection.log("Websocket closed.");
                                    }

                                    if (!onFailed || !onFailed(error)) {
                                        if (error) {
                                            $(connection).triggerHandler(events.onError, [error]);
                                        }

                                        that.reconnect(connection);
                                    }
                                }
                            };

                            connection.socket.onmessage = function (event) {
                                var data;

                                try {
                                    data = connection._parseResponse(event.data);
                                } catch (error) {
                                    transportLogic.handleParseFailure(connection, event.data, error, onFailed, event);
                                    return;
                                }

                                if (data) {
                                    if ($.isEmptyObject(data) || data.M) {
                                        transportLogic.processMessages(connection, data, onSuccess);
                                    } else {
                                        transportLogic.triggerReceived(connection, data);
                                    }
                                }
                            };
                        }
                    },

                    reconnect: function reconnect(connection) {
                        transportLogic.reconnect(connection, this.name);
                    },

                    lostConnection: function lostConnection(connection) {
                        this.reconnect(connection);
                    },

                    stop: function stop(connection) {
                        transportLogic.clearReconnectTimeout(connection);

                        if (connection.socket) {
                            connection.log("Closing the Websocket.");
                            connection.socket.close();
                            connection.socket = null;
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    }
                };
            })(window.jQuery, window);

            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    transportLogic = signalR.transports._logic,
                    clearReconnectAttemptTimeout = function clearReconnectAttemptTimeout(connection) {
                    window.clearTimeout(connection._.reconnectAttemptTimeoutHandle);
                    delete connection._.reconnectAttemptTimeoutHandle;
                };

                signalR.transports.serverSentEvents = {
                    name: "serverSentEvents",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return true;
                    },

                    timeOut: 3000,

                    start: function start(connection, onSuccess, onFailed) {
                        var that = this,
                            opened = false,
                            $connection = $(connection),
                            reconnecting = !onSuccess,
                            url;

                        if (connection.eventSource) {
                            connection.log("The connection already has an event source. Stopping it.");
                            connection.stop();
                        }

                        if (!window.EventSource) {
                            if (onFailed) {
                                connection.log("This browser doesn't support SSE.");
                                onFailed();
                            }
                            return;
                        }

                        url = transportLogic.getUrl(connection, this.name, reconnecting);

                        try {
                            connection.log("Attempting to connect to SSE endpoint '" + url + "'.");
                            connection.eventSource = new window.EventSource(url, { withCredentials: connection.withCredentials });
                        } catch (e) {
                            connection.log("EventSource failed trying to connect with error " + e.Message + ".");
                            if (onFailed) {
                                onFailed();
                            } else {
                                $connection.triggerHandler(events.onError, [signalR._.transportError(signalR.resources.eventSourceFailedToConnect, connection.transport, e)]);
                                if (reconnecting) {
                                    that.reconnect(connection);
                                }
                            }
                            return;
                        }

                        if (reconnecting) {
                            connection._.reconnectAttemptTimeoutHandle = window.setTimeout(function () {
                                if (opened === false) {
                                    if (connection.eventSource.readyState !== window.EventSource.OPEN) {
                                        that.reconnect(connection);
                                    }
                                }
                            }, that.timeOut);
                        }

                        connection.eventSource.addEventListener("open", function (e) {
                            connection.log("EventSource connected.");

                            clearReconnectAttemptTimeout(connection);
                            transportLogic.clearReconnectTimeout(connection);

                            if (opened === false) {
                                opened = true;

                                if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                                    $connection.triggerHandler(events.onReconnect);
                                }
                            }
                        }, false);

                        connection.eventSource.addEventListener("message", function (e) {
                            var res;

                            if (e.data === "initialized") {
                                return;
                            }

                            try {
                                res = connection._parseResponse(e.data);
                            } catch (error) {
                                transportLogic.handleParseFailure(connection, e.data, error, onFailed, e);
                                return;
                            }

                            transportLogic.processMessages(connection, res, onSuccess);
                        }, false);

                        connection.eventSource.addEventListener("error", function (e) {
                            var error = signalR._.transportError(signalR.resources.eventSourceError, connection.transport, e);

                            if (this !== connection.eventSource) {
                                return;
                            }

                            if (onFailed && onFailed(error)) {
                                return;
                            }

                            connection.log("EventSource readyState: " + connection.eventSource.readyState + ".");

                            if (e.eventPhase === window.EventSource.CLOSED) {
                                connection.log("EventSource reconnecting due to the server connection ending.");
                                that.reconnect(connection);
                            } else {
                                connection.log("EventSource error.");
                                $connection.triggerHandler(events.onError, [error]);
                            }
                        }, false);
                    },

                    reconnect: function reconnect(connection) {
                        transportLogic.reconnect(connection, this.name);
                    },

                    lostConnection: function lostConnection(connection) {
                        this.reconnect(connection);
                    },

                    send: function send(connection, data) {
                        transportLogic.ajaxSend(connection, data);
                    },

                    stop: function stop(connection) {
                        clearReconnectAttemptTimeout(connection);
                        transportLogic.clearReconnectTimeout(connection);

                        if (connection && connection.eventSource) {
                            connection.log("EventSource calling close().");
                            connection.eventSource.close();
                            connection.eventSource = null;
                            delete connection.eventSource;
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    }
                };
            })(window.jQuery, window);

            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    transportLogic = signalR.transports._logic,
                    createFrame = function createFrame() {
                    var frame = window.document.createElement("iframe");
                    frame.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;");
                    return frame;
                },
                    loadPreventer = (function () {
                    var loadingFixIntervalId = null,
                        loadingFixInterval = 1000,
                        attachedTo = 0;

                    return {
                        prevent: function prevent() {
                            if (signalR._.ieVersion <= 8) {
                                if (attachedTo === 0) {
                                    loadingFixIntervalId = window.setInterval(function () {
                                        var tempFrame = createFrame();

                                        window.document.body.appendChild(tempFrame);
                                        window.document.body.removeChild(tempFrame);

                                        tempFrame = null;
                                    }, loadingFixInterval);
                                }

                                attachedTo++;
                            }
                        },
                        cancel: function cancel() {
                            if (attachedTo === 1) {
                                window.clearInterval(loadingFixIntervalId);
                            }

                            if (attachedTo > 0) {
                                attachedTo--;
                            }
                        }
                    };
                })();

                signalR.transports.foreverFrame = {
                    name: "foreverFrame",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return true;
                    },

                    iframeClearThreshold: 50,

                    start: function start(connection, onSuccess, onFailed) {
                        var that = this,
                            frameId = transportLogic.foreverFrame.count += 1,
                            url,
                            frame = createFrame(),
                            frameLoadHandler = function frameLoadHandler() {
                            connection.log("Forever frame iframe finished loading and is no longer receiving messages.");
                            if (!onFailed || !onFailed()) {
                                that.reconnect(connection);
                            }
                        };

                        if (window.EventSource) {
                            if (onFailed) {
                                connection.log("Forever Frame is not supported by SignalR on browsers with SSE support.");
                                onFailed();
                            }
                            return;
                        }

                        frame.setAttribute("data-signalr-connection-id", connection.id);

                        loadPreventer.prevent();

                        url = transportLogic.getUrl(connection, this.name);
                        url += "&frameId=" + frameId;

                        window.document.documentElement.appendChild(frame);

                        connection.log("Binding to iframe's load event.");

                        if (frame.addEventListener) {
                            frame.addEventListener("load", frameLoadHandler, false);
                        } else if (frame.attachEvent) {
                            frame.attachEvent("onload", frameLoadHandler);
                        }

                        frame.src = url;
                        transportLogic.foreverFrame.connections[frameId] = connection;

                        connection.frame = frame;
                        connection.frameId = frameId;

                        if (onSuccess) {
                            connection.onSuccess = function () {
                                connection.log("Iframe transport started.");
                                onSuccess();
                            };
                        }
                    },

                    reconnect: function reconnect(connection) {
                        var that = this;

                        if (transportLogic.isConnectedOrReconnecting(connection) && transportLogic.verifyLastActive(connection)) {
                            window.setTimeout(function () {
                                if (!transportLogic.verifyLastActive(connection)) {
                                    return;
                                }

                                if (connection.frame && transportLogic.ensureReconnectingState(connection)) {
                                    var frame = connection.frame,
                                        src = transportLogic.getUrl(connection, that.name, true) + "&frameId=" + connection.frameId;
                                    connection.log("Updating iframe src to '" + src + "'.");
                                    frame.src = src;
                                }
                            }, connection.reconnectDelay);
                        }
                    },

                    lostConnection: function lostConnection(connection) {
                        this.reconnect(connection);
                    },

                    send: function send(connection, data) {
                        transportLogic.ajaxSend(connection, data);
                    },

                    receive: function receive(connection, data) {
                        var cw, body, response;

                        if (connection.json !== connection._originalJson) {
                            data = connection._originalJson.stringify(data);
                        }

                        response = connection._parseResponse(data);

                        transportLogic.processMessages(connection, response, connection.onSuccess);

                        if (connection.state === $.signalR.connectionState.connected) {
                            connection.frameMessageCount = (connection.frameMessageCount || 0) + 1;
                            if (connection.frameMessageCount > signalR.transports.foreverFrame.iframeClearThreshold) {
                                connection.frameMessageCount = 0;
                                cw = connection.frame.contentWindow || connection.frame.contentDocument;
                                if (cw && cw.document && cw.document.body) {
                                    body = cw.document.body;

                                    while (body.firstChild) {
                                        body.removeChild(body.firstChild);
                                    }
                                }
                            }
                        }
                    },

                    stop: function stop(connection) {
                        var cw = null;

                        loadPreventer.cancel();

                        if (connection.frame) {
                            if (connection.frame.stop) {
                                connection.frame.stop();
                            } else {
                                try {
                                    cw = connection.frame.contentWindow || connection.frame.contentDocument;
                                    if (cw.document && cw.document.execCommand) {
                                        cw.document.execCommand("Stop");
                                    }
                                } catch (e) {
                                    connection.log("Error occured when stopping foreverFrame transport. Message = " + e.message + ".");
                                }
                            }

                            if (connection.frame.parentNode === window.document.body) {
                                window.document.body.removeChild(connection.frame);
                            }

                            delete transportLogic.foreverFrame.connections[connection.frameId];
                            connection.frame = null;
                            connection.frameId = null;
                            delete connection.frame;
                            delete connection.frameId;
                            delete connection.onSuccess;
                            delete connection.frameMessageCount;
                            connection.log("Stopping forever frame.");
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    },

                    getConnection: function getConnection(id) {
                        return transportLogic.foreverFrame.connections[id];
                    },

                    started: function started(connection) {
                        if (changeState(connection, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {

                            $(connection).triggerHandler(events.onReconnect);
                        }
                    }
                };
            })(window.jQuery, window);

            (function ($, window, undefined) {

                var signalR = $.signalR,
                    events = $.signalR.events,
                    changeState = $.signalR.changeState,
                    isDisconnecting = $.signalR.isDisconnecting,
                    transportLogic = signalR.transports._logic;

                signalR.transports.longPolling = {
                    name: "longPolling",

                    supportsKeepAlive: function supportsKeepAlive() {
                        return false;
                    },

                    reconnectDelay: 3000,

                    start: function start(connection, onSuccess, onFailed) {
                        var that = this,
                            _fireConnect = function fireConnect() {
                            _fireConnect = $.noop;

                            connection.log("LongPolling connected.");
                            onSuccess();
                        },
                            tryFailConnect = function tryFailConnect(error) {
                            if (onFailed(error)) {
                                connection.log("LongPolling failed to connect.");
                                return true;
                            }

                            return false;
                        },
                            privateData = connection._,
                            reconnectErrors = 0,
                            fireReconnected = function fireReconnected(instance) {
                            window.clearTimeout(privateData.reconnectTimeoutId);
                            privateData.reconnectTimeoutId = null;

                            if (changeState(instance, signalR.connectionState.reconnecting, signalR.connectionState.connected) === true) {
                                instance.log("Raising the reconnect event");
                                $(instance).triggerHandler(events.onReconnect);
                            }
                        },
                            maxFireReconnectedTimeout = 3600000;

                        if (connection.pollXhr) {
                            connection.log("Polling xhr requests already exists, aborting.");
                            connection.stop();
                        }

                        connection.messageId = null;

                        privateData.reconnectTimeoutId = null;

                        privateData.pollTimeoutId = window.setTimeout(function () {
                            (function poll(instance, raiseReconnect) {
                                var messageId = instance.messageId,
                                    connect = messageId === null,
                                    reconnecting = !connect,
                                    polling = !raiseReconnect,
                                    url = transportLogic.getUrl(instance, that.name, reconnecting, polling, true),
                                    postData = {};

                                if (instance.messageId) {
                                    postData.messageId = instance.messageId;
                                }

                                if (instance.groupsToken) {
                                    postData.groupsToken = instance.groupsToken;
                                }

                                if (isDisconnecting(instance) === true) {
                                    return;
                                }

                                connection.log("Opening long polling request to '" + url + "'.");
                                instance.pollXhr = transportLogic.ajax(connection, {
                                    xhrFields: {
                                        onprogress: function onprogress() {
                                            transportLogic.markLastMessage(connection);
                                        }
                                    },
                                    url: url,
                                    type: "POST",
                                    contentType: signalR._.defaultContentType,
                                    data: postData,
                                    timeout: connection._.pollTimeout,
                                    success: function success(result) {
                                        var minData,
                                            delay = 0,
                                            data,
                                            shouldReconnect;

                                        connection.log("Long poll complete.");

                                        reconnectErrors = 0;

                                        try {
                                            minData = connection._parseResponse(result);
                                        } catch (error) {
                                            transportLogic.handleParseFailure(instance, result, error, tryFailConnect, instance.pollXhr);
                                            return;
                                        }

                                        if (privateData.reconnectTimeoutId !== null) {
                                            fireReconnected(instance);
                                        }

                                        if (minData) {
                                            data = transportLogic.maximizePersistentResponse(minData);
                                        }

                                        transportLogic.processMessages(instance, minData, _fireConnect);

                                        if (data && $.type(data.LongPollDelay) === "number") {
                                            delay = data.LongPollDelay;
                                        }

                                        if (isDisconnecting(instance) === true) {
                                            return;
                                        }

                                        shouldReconnect = data && data.ShouldReconnect;
                                        if (shouldReconnect) {
                                            if (!transportLogic.ensureReconnectingState(instance)) {
                                                return;
                                            }
                                        }

                                        if (delay > 0) {
                                            privateData.pollTimeoutId = window.setTimeout(function () {
                                                poll(instance, shouldReconnect);
                                            }, delay);
                                        } else {
                                            poll(instance, shouldReconnect);
                                        }
                                    },

                                    error: function error(data, textStatus) {
                                        var error = signalR._.transportError(signalR.resources.longPollFailed, connection.transport, data, instance.pollXhr);

                                        window.clearTimeout(privateData.reconnectTimeoutId);
                                        privateData.reconnectTimeoutId = null;

                                        if (textStatus === "abort") {
                                            connection.log("Aborted xhr request.");
                                            return;
                                        }

                                        if (!tryFailConnect(error)) {
                                            reconnectErrors++;

                                            if (connection.state !== signalR.connectionState.reconnecting) {
                                                connection.log("An error occurred using longPolling. Status = " + textStatus + ".  Response = " + data.responseText + ".");
                                                $(instance).triggerHandler(events.onError, [error]);
                                            }

                                            if ((connection.state === signalR.connectionState.connected || connection.state === signalR.connectionState.reconnecting) && !transportLogic.verifyLastActive(connection)) {
                                                return;
                                            }

                                            if (!transportLogic.ensureReconnectingState(instance)) {
                                                return;
                                            }

                                            privateData.pollTimeoutId = window.setTimeout(function () {
                                                poll(instance, true);
                                            }, that.reconnectDelay);
                                        }
                                    }
                                });

                                if (reconnecting && raiseReconnect === true) {
                                    privateData.reconnectTimeoutId = window.setTimeout(function () {
                                        fireReconnected(instance);
                                    }, Math.min(1000 * (Math.pow(2, reconnectErrors) - 1), maxFireReconnectedTimeout));
                                }
                            })(connection);
                        }, 250);
                    },

                    lostConnection: function lostConnection(connection) {
                        if (connection.pollXhr) {
                            connection.pollXhr.abort("lostConnection");
                        }
                    },

                    send: function send(connection, data) {
                        transportLogic.ajaxSend(connection, data);
                    },

                    stop: function stop(connection) {

                        window.clearTimeout(connection._.pollTimeoutId);
                        window.clearTimeout(connection._.reconnectTimeoutId);

                        delete connection._.pollTimeoutId;
                        delete connection._.reconnectTimeoutId;

                        if (connection.pollXhr) {
                            connection.pollXhr.abort();
                            connection.pollXhr = null;
                            delete connection.pollXhr;
                        }
                    },

                    abort: function abort(connection, async) {
                        transportLogic.ajaxAbort(connection, async);
                    }
                };
            })(window.jQuery, window);

            (function ($, window, undefined) {

                var eventNamespace = ".hubProxy",
                    signalR = $.signalR;

                function makeEventName(event) {
                    return event + eventNamespace;
                }

                function map(arr, fun, thisp) {
                    var i,
                        length = arr.length,
                        result = [];
                    for (i = 0; i < length; i += 1) {
                        if (arr.hasOwnProperty(i)) {
                            result[i] = fun.call(thisp, arr[i], i, arr);
                        }
                    }
                    return result;
                }

                function getArgValue(a) {
                    return $.isFunction(a) ? null : $.type(a) === "undefined" ? null : a;
                }

                function hasMembers(obj) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            return true;
                        }
                    }

                    return false;
                }

                function clearInvocationCallbacks(connection, error) {
                    var callbacks = connection._.invocationCallbacks,
                        callback;

                    if (hasMembers(callbacks)) {
                        connection.log("Clearing hub invocation callbacks with error: " + error + ".");
                    }

                    connection._.invocationCallbackId = 0;
                    delete connection._.invocationCallbacks;
                    connection._.invocationCallbacks = {};

                    for (var callbackId in callbacks) {
                        callback = callbacks[callbackId];
                        callback.method.call(callback.scope, { E: error });
                    }
                }

                function hubProxy(hubConnection, hubName) {
                    return new hubProxy.fn.init(hubConnection, hubName);
                }

                hubProxy.fn = hubProxy.prototype = {
                    init: function init(connection, hubName) {
                        this.state = {};
                        this.connection = connection;
                        this.hubName = hubName;
                        this._ = {
                            callbackMap: {}
                        };
                    },

                    constructor: hubProxy,

                    hasSubscriptions: function hasSubscriptions() {
                        return hasMembers(this._.callbackMap);
                    },

                    on: function on(eventName, callback) {
                        var that = this,
                            callbackMap = that._.callbackMap;

                        eventName = eventName.toLowerCase();

                        if (!callbackMap[eventName]) {
                            callbackMap[eventName] = {};
                        }

                        callbackMap[eventName][callback] = function (e, data) {
                            callback.apply(that, data);
                        };

                        $(that).bind(makeEventName(eventName), callbackMap[eventName][callback]);

                        return that;
                    },

                    off: function off(eventName, callback) {
                        var that = this,
                            callbackMap = that._.callbackMap,
                            callbackSpace;

                        eventName = eventName.toLowerCase();

                        callbackSpace = callbackMap[eventName];

                        if (callbackSpace) {
                            if (callbackSpace[callback]) {
                                $(that).unbind(makeEventName(eventName), callbackSpace[callback]);

                                delete callbackSpace[callback];

                                if (!hasMembers(callbackSpace)) {
                                    delete callbackMap[eventName];
                                }
                            } else if (!callback) {
                                $(that).unbind(makeEventName(eventName));

                                delete callbackMap[eventName];
                            }
                        }

                        return that;
                    },

                    invoke: function invoke(methodName) {

                        var that = this,
                            connection = that.connection,
                            args = $.makeArray(arguments).slice(1),
                            argValues = map(args, getArgValue),
                            data = { H: that.hubName, M: methodName, A: argValues, I: connection._.invocationCallbackId },
                            d = $.Deferred(),
                            callback = function callback(minResult) {
                            var result = that._maximizeHubResponse(minResult),
                                source,
                                error;

                            $.extend(that.state, result.State);

                            if (result.Progress) {
                                if (d.notifyWith) {
                                    d.notifyWith(that, [result.Progress.Data]);
                                } else if (!connection._.progressjQueryVersionLogged) {
                                    connection.log("A hub method invocation progress update was received but the version of jQuery in use (" + $.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications.");
                                    connection._.progressjQueryVersionLogged = true;
                                }
                            } else if (result.Error) {
                                if (result.StackTrace) {
                                    connection.log(result.Error + "\n" + result.StackTrace + ".");
                                }

                                source = result.IsHubException ? "HubException" : "Exception";
                                error = signalR._.error(result.Error, source);
                                error.data = result.ErrorData;

                                connection.log(that.hubName + "." + methodName + " failed to execute. Error: " + error.message);
                                d.rejectWith(that, [error]);
                            } else {
                                connection.log("Invoked " + that.hubName + "." + methodName);
                                d.resolveWith(that, [result.Result]);
                            }
                        };

                        connection._.invocationCallbacks[connection._.invocationCallbackId.toString()] = { scope: that, method: callback };
                        connection._.invocationCallbackId += 1;

                        if (!$.isEmptyObject(that.state)) {
                            data.S = that.state;
                        }

                        connection.log("Invoking " + that.hubName + "." + methodName);
                        connection.send(data);

                        return d.promise();
                    },

                    _maximizeHubResponse: function _maximizeHubResponse(minHubResponse) {
                        return {
                            State: minHubResponse.S,
                            Result: minHubResponse.R,
                            Progress: minHubResponse.P ? {
                                Id: minHubResponse.P.I,
                                Data: minHubResponse.P.D
                            } : null,
                            Id: minHubResponse.I,
                            IsHubException: minHubResponse.H,
                            Error: minHubResponse.E,
                            StackTrace: minHubResponse.T,
                            ErrorData: minHubResponse.D
                        };
                    }
                };

                hubProxy.fn.init.prototype = hubProxy.fn;

                function hubConnection(url, options) {
                    var settings = {
                        qs: null,
                        logging: false,
                        useDefaultPath: true
                    };

                    $.extend(settings, options);

                    if (!url || settings.useDefaultPath) {
                        url = (url || "") + "/signalr";
                    }
                    return new hubConnection.fn.init(url, settings);
                }

                hubConnection.fn = hubConnection.prototype = $.connection();

                hubConnection.fn.init = function (url, options) {
                    var settings = {
                        qs: null,
                        logging: false,
                        useDefaultPath: true
                    },
                        connection = this;

                    $.extend(settings, options);

                    $.signalR.fn.init.call(connection, url, settings.qs, settings.logging);

                    connection.proxies = {};

                    connection._.invocationCallbackId = 0;
                    connection._.invocationCallbacks = {};

                    connection.received(function (minData) {
                        var data, proxy, dataCallbackId, callback, hubName, eventName;
                        if (!minData) {
                            return;
                        }

                        if (typeof minData.P !== "undefined") {
                            dataCallbackId = minData.P.I.toString();
                            callback = connection._.invocationCallbacks[dataCallbackId];
                            if (callback) {
                                callback.method.call(callback.scope, minData);
                            }
                        } else if (typeof minData.I !== "undefined") {
                            dataCallbackId = minData.I.toString();
                            callback = connection._.invocationCallbacks[dataCallbackId];
                            if (callback) {
                                connection._.invocationCallbacks[dataCallbackId] = null;
                                delete connection._.invocationCallbacks[dataCallbackId];

                                callback.method.call(callback.scope, minData);
                            }
                        } else {
                            data = this._maximizeClientHubInvocation(minData);

                            connection.log("Triggering client hub event '" + data.Method + "' on hub '" + data.Hub + "'.");

                            hubName = data.Hub.toLowerCase();
                            eventName = data.Method.toLowerCase();

                            proxy = this.proxies[hubName];

                            $.extend(proxy.state, data.State);
                            $(proxy).triggerHandler(makeEventName(eventName), [data.Args]);
                        }
                    });

                    connection.error(function (errData, origData) {
                        var callbackId, callback;

                        if (!origData) {
                            return;
                        }

                        callbackId = origData.I;
                        callback = connection._.invocationCallbacks[callbackId];

                        if (callback) {
                            connection._.invocationCallbacks[callbackId] = null;
                            delete connection._.invocationCallbacks[callbackId];

                            callback.method.call(callback.scope, { E: errData });
                        }
                    });

                    connection.reconnecting(function () {
                        if (connection.transport && connection.transport.name === "webSockets") {
                            clearInvocationCallbacks(connection, "Connection started reconnecting before invocation result was received.");
                        }
                    });

                    connection.disconnected(function () {
                        clearInvocationCallbacks(connection, "Connection was disconnected before invocation result was received.");
                    });
                };

                hubConnection.fn._maximizeClientHubInvocation = function (minClientHubInvocation) {
                    return {
                        Hub: minClientHubInvocation.H,
                        Method: minClientHubInvocation.M,
                        Args: minClientHubInvocation.A,
                        State: minClientHubInvocation.S
                    };
                };

                hubConnection.fn._registerSubscribedHubs = function () {
                    var connection = this;

                    if (!connection._subscribedToHubs) {
                        connection._subscribedToHubs = true;
                        connection.starting(function () {
                            var subscribedHubs = [];

                            $.each(connection.proxies, function (key) {
                                if (this.hasSubscriptions()) {
                                    subscribedHubs.push({ name: key });
                                    connection.log("Client subscribed to hub '" + key + "'.");
                                }
                            });

                            if (subscribedHubs.length === 0) {
                                connection.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");
                            }

                            connection.data = connection.json.stringify(subscribedHubs);
                        });
                    }
                };

                hubConnection.fn.createHubProxy = function (hubName) {
                    hubName = hubName.toLowerCase();

                    var proxy = this.proxies[hubName];
                    if (!proxy) {
                        proxy = hubProxy(this, hubName);
                        this.proxies[hubName] = proxy;
                    }

                    this._registerSubscribedHubs();

                    return proxy;
                };

                hubConnection.fn.init.prototype = hubConnection.fn;

                $.hubConnection = hubConnection;
            })(window.jQuery, window);

            (function ($, undefined) {
                $.signalR.version = "2.2.0";
            })(window.jQuery);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,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LHNDQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3lCQUMvRCxDQUFDLENBQUM7cUJBQ047aUJBQ0osQ0FBQzs7QUFFRiw2QkFBYSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsVUFBVSxPQUFPLEVBQUU7QUFVakQsMkJBQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7O0FBRWhDLHdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLHdCQUFJLENBQUMsS0FBSyxFQUFFO0FBQ1IsNkJBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLDRCQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDakM7O0FBRUQsd0JBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDOztBQUUvQiwyQkFBTyxLQUFLLENBQUM7aUJBQ2hCLENBQUM7O0FBRUYsNkJBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDOztBQUVuRCxpQkFBQyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7YUFFbkMsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUU7O0FBTTFCLEFBQUMsYUFBQSxVQUFVLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDckIsaUJBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUMvQixDQUFBLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFFIiwiZmlsZSI6ImxpYnMvanF1ZXJ5LnNpZ25hbFIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqcXVlcnkuc2lnbmFsUi5jb3JlLmpzICovXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vKiFcclxuICogQVNQLk5FVCBTaWduYWxSIEphdmFTY3JpcHQgTGlicmFyeSB2Mi4yLjBcclxuICogaHR0cDovL3NpZ25hbHIubmV0L1xyXG4gKlxyXG4gKiBDb3B5cmlnaHQgKEMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiU2NyaXB0cy9qcXVlcnktMS42LjQuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIudmVyc2lvbi5qc1wiIC8+XHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgcmVzb3VyY2VzID0ge1xyXG4gICAgICAgIG5valF1ZXJ5OiBcImpRdWVyeSB3YXMgbm90IGZvdW5kLiBQbGVhc2UgZW5zdXJlIGpRdWVyeSBpcyByZWZlcmVuY2VkIGJlZm9yZSB0aGUgU2lnbmFsUiBjbGllbnQgSmF2YVNjcmlwdCBmaWxlLlwiLFxyXG4gICAgICAgIG5vVHJhbnNwb3J0T25Jbml0OiBcIk5vIHRyYW5zcG9ydCBjb3VsZCBiZSBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHkuIFRyeSBzcGVjaWZ5aW5nIGEgZGlmZmVyZW50IHRyYW5zcG9ydCBvciBub25lIGF0IGFsbCBmb3IgYXV0byBpbml0aWFsaXphdGlvbi5cIixcclxuICAgICAgICBlcnJvck9uTmVnb3RpYXRlOiBcIkVycm9yIGR1cmluZyBuZWdvdGlhdGlvbiByZXF1ZXN0LlwiLFxyXG4gICAgICAgIHN0b3BwZWRXaGlsZUxvYWRpbmc6IFwiVGhlIGNvbm5lY3Rpb24gd2FzIHN0b3BwZWQgZHVyaW5nIHBhZ2UgbG9hZC5cIixcclxuICAgICAgICBzdG9wcGVkV2hpbGVOZWdvdGlhdGluZzogXCJUaGUgY29ubmVjdGlvbiB3YXMgc3RvcHBlZCBkdXJpbmcgdGhlIG5lZ290aWF0ZSByZXF1ZXN0LlwiLFxyXG4gICAgICAgIGVycm9yUGFyc2luZ05lZ290aWF0ZVJlc3BvbnNlOiBcIkVycm9yIHBhcnNpbmcgbmVnb3RpYXRlIHJlc3BvbnNlLlwiLFxyXG4gICAgICAgIGVycm9yRHVyaW5nU3RhcnRSZXF1ZXN0OiBcIkVycm9yIGR1cmluZyBzdGFydCByZXF1ZXN0LiBTdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIixcclxuICAgICAgICBzdG9wcGVkRHVyaW5nU3RhcnRSZXF1ZXN0OiBcIlRoZSBjb25uZWN0aW9uIHdhcyBzdG9wcGVkIGR1cmluZyB0aGUgc3RhcnQgcmVxdWVzdC5cIixcclxuICAgICAgICBlcnJvclBhcnNpbmdTdGFydFJlc3BvbnNlOiBcIkVycm9yIHBhcnNpbmcgc3RhcnQgcmVzcG9uc2U6ICd7MH0nLiBTdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIixcclxuICAgICAgICBpbnZhbGlkU3RhcnRSZXNwb25zZTogXCJJbnZhbGlkIHN0YXJ0IHJlc3BvbnNlOiAnezB9Jy4gU3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgcHJvdG9jb2xJbmNvbXBhdGlibGU6IFwiWW91IGFyZSB1c2luZyBhIHZlcnNpb24gb2YgdGhlIGNsaWVudCB0aGF0IGlzbid0IGNvbXBhdGlibGUgd2l0aCB0aGUgc2VydmVyLiBDbGllbnQgdmVyc2lvbiB7MH0sIHNlcnZlciB2ZXJzaW9uIHsxfS5cIixcclxuICAgICAgICBzZW5kRmFpbGVkOiBcIlNlbmQgZmFpbGVkLlwiLFxyXG4gICAgICAgIHBhcnNlRmFpbGVkOiBcIkZhaWxlZCBhdCBwYXJzaW5nIHJlc3BvbnNlOiB7MH1cIixcclxuICAgICAgICBsb25nUG9sbEZhaWxlZDogXCJMb25nIHBvbGxpbmcgcmVxdWVzdCBmYWlsZWQuXCIsXHJcbiAgICAgICAgZXZlbnRTb3VyY2VGYWlsZWRUb0Nvbm5lY3Q6IFwiRXZlbnRTb3VyY2UgZmFpbGVkIHRvIGNvbm5lY3QuXCIsXHJcbiAgICAgICAgZXZlbnRTb3VyY2VFcnJvcjogXCJFcnJvciByYWlzZWQgYnkgRXZlbnRTb3VyY2VcIixcclxuICAgICAgICB3ZWJTb2NrZXRDbG9zZWQ6IFwiV2ViU29ja2V0IGNsb3NlZC5cIixcclxuICAgICAgICBwaW5nU2VydmVyRmFpbGVkSW52YWxpZFJlc3BvbnNlOiBcIkludmFsaWQgcGluZyByZXNwb25zZSB3aGVuIHBpbmdpbmcgc2VydmVyOiAnezB9Jy5cIixcclxuICAgICAgICBwaW5nU2VydmVyRmFpbGVkOiBcIkZhaWxlZCB0byBwaW5nIHNlcnZlci5cIixcclxuICAgICAgICBwaW5nU2VydmVyRmFpbGVkU3RhdHVzQ29kZTogXCJGYWlsZWQgdG8gcGluZyBzZXJ2ZXIuICBTZXJ2ZXIgcmVzcG9uZGVkIHdpdGggc3RhdHVzIGNvZGUgezB9LCBzdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIixcclxuICAgICAgICBwaW5nU2VydmVyRmFpbGVkUGFyc2U6IFwiRmFpbGVkIHRvIHBhcnNlIHBpbmcgc2VydmVyIHJlc3BvbnNlLCBzdG9wcGluZyB0aGUgY29ubmVjdGlvbi5cIixcclxuICAgICAgICBub0Nvbm5lY3Rpb25UcmFuc3BvcnQ6IFwiQ29ubmVjdGlvbiBpcyBpbiBhbiBpbnZhbGlkIHN0YXRlLCB0aGVyZSBpcyBubyB0cmFuc3BvcnQgYWN0aXZlLlwiLFxyXG4gICAgICAgIHdlYlNvY2tldHNJbnZhbGlkU3RhdGU6IFwiVGhlIFdlYiBTb2NrZXQgdHJhbnNwb3J0IGlzIGluIGFuIGludmFsaWQgc3RhdGUsIHRyYW5zaXRpb25pbmcgaW50byByZWNvbm5lY3RpbmcuXCIsXHJcbiAgICAgICAgcmVjb25uZWN0VGltZW91dDogXCJDb3VsZG4ndCByZWNvbm5lY3Qgd2l0aGluIHRoZSBjb25maWd1cmVkIHRpbWVvdXQgb2YgezB9IG1zLCBkaXNjb25uZWN0aW5nLlwiLFxyXG4gICAgICAgIHJlY29ubmVjdFdpbmRvd1RpbWVvdXQ6IFwiVGhlIGNsaWVudCBoYXMgYmVlbiBpbmFjdGl2ZSBzaW5jZSB7MH0gYW5kIGl0IGhhcyBleGNlZWRlZCB0aGUgaW5hY3Rpdml0eSB0aW1lb3V0IG9mIHsxfSBtcy4gU3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCJcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHR5cGVvZiAoJCkgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIC8vIG5vIGpRdWVyeSFcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzb3VyY2VzLm5valF1ZXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2lnbmFsUixcclxuICAgICAgICBfY29ubmVjdGlvbixcclxuICAgICAgICBfcGFnZUxvYWRlZCA9ICh3aW5kb3cuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSxcclxuICAgICAgICBfcGFnZVdpbmRvdyA9ICQod2luZG93KSxcclxuICAgICAgICBfbmVnb3RpYXRlQWJvcnRUZXh0ID0gXCJfX05lZ290aWF0ZSBBYm9ydGVkX19cIixcclxuICAgICAgICBldmVudHMgPSB7XHJcbiAgICAgICAgICAgIG9uU3RhcnQ6IFwib25TdGFydFwiLFxyXG4gICAgICAgICAgICBvblN0YXJ0aW5nOiBcIm9uU3RhcnRpbmdcIixcclxuICAgICAgICAgICAgb25SZWNlaXZlZDogXCJvblJlY2VpdmVkXCIsXHJcbiAgICAgICAgICAgIG9uRXJyb3I6IFwib25FcnJvclwiLFxyXG4gICAgICAgICAgICBvbkNvbm5lY3Rpb25TbG93OiBcIm9uQ29ubmVjdGlvblNsb3dcIixcclxuICAgICAgICAgICAgb25SZWNvbm5lY3Rpbmc6IFwib25SZWNvbm5lY3RpbmdcIixcclxuICAgICAgICAgICAgb25SZWNvbm5lY3Q6IFwib25SZWNvbm5lY3RcIixcclxuICAgICAgICAgICAgb25TdGF0ZUNoYW5nZWQ6IFwib25TdGF0ZUNoYW5nZWRcIixcclxuICAgICAgICAgICAgb25EaXNjb25uZWN0OiBcIm9uRGlzY29ubmVjdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhamF4RGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiBudWxsLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2cgPSBmdW5jdGlvbiAobXNnLCBsb2dnaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2dnaW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBtO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mICh3aW5kb3cuY29uc29sZSkgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtID0gXCJbXCIgKyBuZXcgRGF0ZSgpLnRvVGltZVN0cmluZygpICsgXCJdIFNpZ25hbFI6IFwiICsgbXNnO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmNvbnNvbGUuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmRlYnVnKG0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5jb25zb2xlLmxvZykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKG0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZXhwZWN0ZWRTdGF0ZSwgbmV3U3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGV4cGVjdGVkU3RhdGUgPT09IGNvbm5lY3Rpb24uc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RhdGUgPSBuZXdTdGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblN0YXRlQ2hhbmdlZCwgW3sgb2xkU3RhdGU6IGV4cGVjdGVkU3RhdGUsIG5ld1N0YXRlOiBuZXdTdGF0ZSB9XSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzRGlzY29ubmVjdGluZyA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3VwcG9ydHNLZWVwQWxpdmUgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbi5fLmtlZXBBbGl2ZURhdGEuYWN0aXZhdGVkICYmXHJcbiAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydC5zdXBwb3J0c0tlZXBBbGl2ZShjb25uZWN0aW9uKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25maWd1cmVTdG9wUmVjb25uZWN0aW5nVGltZW91dCA9IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBzdG9wUmVjb25uZWN0aW5nVGltZW91dCxcclxuICAgICAgICAgICAgICAgIG9uUmVjb25uZWN0VGltZW91dDtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoaXMgY29ubmVjdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGNvbmZpZ3VyZWQgdG8gc3RvcCByZWNvbm5lY3RpbmcgYWZ0ZXIgYSBzcGVjaWZpZWQgdGltZW91dC5cclxuICAgICAgICAgICAgLy8gV2l0aG91dCB0aGlzIGNoZWNrIGlmIGEgY29ubmVjdGlvbiBpcyBzdG9wcGVkIHRoZW4gc3RhcnRlZCBldmVudHMgd2lsbCBiZSBib3VuZCBtdWx0aXBsZSB0aW1lcy5cclxuICAgICAgICAgICAgaWYgKCFjb25uZWN0aW9uLl8uY29uZmlndXJlZFN0b3BSZWNvbm5lY3RpbmdUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBvblJlY29ubmVjdFRpbWVvdXQgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5yZWNvbm5lY3RUaW1lb3V0LCBjb25uZWN0aW9uLmRpc2Nvbm5lY3RUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbc2lnbmFsUi5fLmVycm9yKG1lc3NhZ2UsIC8qIHNvdXJjZSAqLyBcIlRpbWVvdXRFeGNlcHRpb25cIildKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoLyogYXN5bmMgKi8gZmFsc2UsIC8qIG5vdGlmeVNlcnZlciAqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVjb25uZWN0aW5nKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEd1YXJkIGFnYWluc3Qgc3RhdGUgY2hhbmdpbmcgaW4gYSBwcmV2aW91cyB1c2VyIGRlZmluZWQgZXZlbiBoYW5kbGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wUmVjb25uZWN0aW5nVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgb25SZWNvbm5lY3RUaW1lb3V0KGNvbm5lY3Rpb24pOyB9LCBjb25uZWN0aW9uLmRpc2Nvbm5lY3RUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0YXRlQ2hhbmdlZChmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9sZFN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIHBlbmRpbmcgcmVjb25uZWN0IHRpbWVvdXQgY2hlY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzdG9wUmVjb25uZWN0aW5nVGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLmNvbmZpZ3VyZWRTdG9wUmVjb25uZWN0aW5nVGltZW91dCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIHNpZ25hbFIgPSBmdW5jdGlvbiAodXJsLCBxcywgbG9nZ2luZykge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DcmVhdGVzIGEgbmV3IFNpZ25hbFIgY29ubmVjdGlvbiBmb3IgdGhlIGdpdmVuIHVybDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ1cmxcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIFVSTCBvZiB0aGUgbG9uZyBwb2xsaW5nIGVuZHBvaW50PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJxc1wiIHR5cGU9XCJPYmplY3RcIj5cclxuICAgICAgICAvLy8gICAgIFtPcHRpb25hbF0gQ3VzdG9tIHF1ZXJ5c3RyaW5nIHBhcmFtZXRlcnMgdG8gYWRkIHRvIHRoZSBjb25uZWN0aW9uIFVSTC5cclxuICAgICAgICAvLy8gICAgIElmIGFuIG9iamVjdCwgZXZlcnkgbm9uLWZ1bmN0aW9uIG1lbWJlciB3aWxsIGJlIGFkZGVkIHRvIHRoZSBxdWVyeXN0cmluZy5cclxuICAgICAgICAvLy8gICAgIElmIGEgc3RyaW5nLCBpdCdzIGFkZGVkIHRvIHRoZSBRUyBhcyBzcGVjaWZpZWQuXHJcbiAgICAgICAgLy8vIDwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibG9nZ2luZ1wiIHR5cGU9XCJCb29sZWFuXCI+XHJcbiAgICAgICAgLy8vICAgICBbT3B0aW9uYWxdIEEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgY29ubmVjdGlvbiBsb2dnaW5nIGlzIGVuYWJsZWQgdG8gdGhlIGJyb3dzZXJcclxuICAgICAgICAvLy8gICAgIGNvbnNvbGUvbG9nLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAgICAvLy8gPC9wYXJhbT5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBzaWduYWxSLmZuLmluaXQodXJsLCBxcywgbG9nZ2luZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNpZ25hbFIuXyA9IHtcclxuICAgICAgICBkZWZhdWx0Q29udGVudFR5cGU6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXHJcblxyXG4gICAgICAgIGllVmVyc2lvbjogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICBtYXRjaGVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicpIHtcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB1c2VyIGFnZW50IGhhcyB0aGUgcGF0dGVybiBcIk1TSUUgKG9uZSBvciBtb3JlIG51bWJlcnMpLihvbmUgb3IgbW9yZSBudW1iZXJzKVwiO1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IC9NU0lFIChbMC05XStcXC5bMC05XSspLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSB3aW5kb3cucGFyc2VGbG9hdChtYXRjaGVzWzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdW5kZWZpbmVkIHZhbHVlIG1lYW5zIG5vdCBJRVxyXG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcclxuICAgICAgICB9KSgpLFxyXG5cclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKG1lc3NhZ2UsIHNvdXJjZSwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGUuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyYW5zcG9ydEVycm9yOiBmdW5jdGlvbiAobWVzc2FnZSwgdHJhbnNwb3J0LCBzb3VyY2UsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLmVycm9yKG1lc3NhZ2UsIHNvdXJjZSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIGUudHJhbnNwb3J0ID0gdHJhbnNwb3J0ID8gdHJhbnNwb3J0Lm5hbWUgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+VXNhZ2U6IGZvcm1hdChcIkhpIHswfSwgeW91IGFyZSB7MX0hXCIsIFwiRm9vXCIsIDEwMCkgPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICB2YXIgcyA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gcy5yZXBsYWNlKFwie1wiICsgaSArIFwifVwiLCBhcmd1bWVudHNbaSArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaXJlZm94TWFqb3JWZXJzaW9uOiBmdW5jdGlvbiAodXNlckFnZW50KSB7XHJcbiAgICAgICAgICAgIC8vIEZpcmVmb3ggdXNlciBhZ2VudHM6IGh0dHA6Ly91c2VyYWdlbnRzdHJpbmcuY29tL3BhZ2VzL0ZpcmVmb3gvXHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gdXNlckFnZW50Lm1hdGNoKC9GaXJlZm94XFwvKFxcZCspLyk7XHJcbiAgICAgICAgICAgIGlmICghbWF0Y2hlcyB8fCAhbWF0Y2hlcy5sZW5ndGggfHwgbWF0Y2hlcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTAgLyogcmFkaXggKi8pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbmZpZ3VyZVBpbmdJbnRlcnZhbDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGNvbm5lY3Rpb24uXy5jb25maWcsXHJcbiAgICAgICAgICAgICAgICBvbkZhaWwgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnICYmICFjb25uZWN0aW9uLl8ucGluZ0ludGVydmFsSWQgJiYgY29uZmlnLnBpbmdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLnBpbmdJbnRlcnZhbElkID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLnBpbmdTZXJ2ZXIoY29ubmVjdGlvbikuZmFpbChvbkZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSwgY29uZmlnLnBpbmdJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNpZ25hbFIuZXZlbnRzID0gZXZlbnRzO1xyXG5cclxuICAgIHNpZ25hbFIucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xyXG5cclxuICAgIHNpZ25hbFIuYWpheERlZmF1bHRzID0gYWpheERlZmF1bHRzO1xyXG5cclxuICAgIHNpZ25hbFIuY2hhbmdlU3RhdGUgPSBjaGFuZ2VTdGF0ZTtcclxuXHJcbiAgICBzaWduYWxSLmlzRGlzY29ubmVjdGluZyA9IGlzRGlzY29ubmVjdGluZztcclxuXHJcbiAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZSA9IHtcclxuICAgICAgICBjb25uZWN0aW5nOiAwLFxyXG4gICAgICAgIGNvbm5lY3RlZDogMSxcclxuICAgICAgICByZWNvbm5lY3Rpbmc6IDIsXHJcbiAgICAgICAgZGlzY29ubmVjdGVkOiA0XHJcbiAgICB9O1xyXG5cclxuICAgIHNpZ25hbFIuaHViID0ge1xyXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBnZXQgcmVwbGFjZWQgd2l0aCB0aGUgcmVhbCBodWIgY29ubmVjdGlvbiBzdGFydCBtZXRob2Qgd2hlbiBodWJzIGlzIHJlZmVyZW5jZWQgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpZ25hbFI6IEVycm9yIGxvYWRpbmcgaHVicy4gRW5zdXJlIHlvdXIgaHVicyByZWZlcmVuY2UgaXMgY29ycmVjdCwgZS5nLiA8c2NyaXB0IHNyYz0nL3NpZ25hbHIvanMnPjwvc2NyaXB0Pi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfcGFnZVdpbmRvdy5sb2FkKGZ1bmN0aW9uICgpIHsgX3BhZ2VMb2FkZWQgPSB0cnVlOyB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVRyYW5zcG9ydChyZXF1ZXN0ZWRUcmFuc3BvcnQsIGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+VmFsaWRhdGVzIHRoZSByZXF1ZXN0ZWQgdHJhbnNwb3J0IGJ5IGNyb3NzIGNoZWNraW5nIGl0IHdpdGggdGhlIHByZS1kZWZpbmVkIHNpZ25hbFIudHJhbnNwb3J0czwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXF1ZXN0ZWRUcmFuc3BvcnRcIiB0eXBlPVwiT2JqZWN0XCI+VGhlIGRlc2lnbmF0ZWQgdHJhbnNwb3J0cyB0aGF0IHRoZSB1c2VyIGhhcyBzcGVjaWZpZWQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb25uZWN0aW9uXCIgdHlwZT1cInNpZ25hbFJcIj5UaGUgY29ubmVjdGlvbiB0aGF0IHdpbGwgYmUgdXNpbmcgdGhlIHJlcXVlc3RlZCB0cmFuc3BvcnRzLiAgVXNlZCBmb3IgbG9nZ2luZyBwdXJwb3Nlcy48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwiT2JqZWN0XCIgLz5cclxuXHJcbiAgICAgICAgaWYgKCQuaXNBcnJheShyZXF1ZXN0ZWRUcmFuc3BvcnQpKSB7XHJcbiAgICAgICAgICAgIC8vIEdvIHRocm91Z2ggdHJhbnNwb3J0IGFycmF5IGFuZCByZW1vdmUgYW4gXCJpbnZhbGlkXCIgdHJhbnBvcnRzXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSByZXF1ZXN0ZWRUcmFuc3BvcnQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc3BvcnQgPSByZXF1ZXN0ZWRUcmFuc3BvcnRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoJC50eXBlKHRyYW5zcG9ydCkgIT09IFwic3RyaW5nXCIgfHwgIXNpZ25hbFIudHJhbnNwb3J0c1t0cmFuc3BvcnRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJJbnZhbGlkIHRyYW5zcG9ydDogXCIgKyB0cmFuc3BvcnQgKyBcIiwgcmVtb3ZpbmcgaXQgZnJvbSB0aGUgdHJhbnNwb3J0cyBsaXN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ZWRUcmFuc3BvcnQuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBWZXJpZnkgd2Ugc3RpbGwgaGF2ZSB0cmFuc3BvcnRzIGxlZnQsIGlmIHdlIGRvbnQgdGhlbiB3ZSBoYXZlIGludmFsaWQgdHJhbnNwb3J0c1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdGVkVHJhbnNwb3J0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJObyB0cmFuc3BvcnRzIHJlbWFpbiB3aXRoaW4gdGhlIHNwZWNpZmllZCB0cmFuc3BvcnQgYXJyYXkuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkVHJhbnNwb3J0ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIXNpZ25hbFIudHJhbnNwb3J0c1tyZXF1ZXN0ZWRUcmFuc3BvcnRdICYmIHJlcXVlc3RlZFRyYW5zcG9ydCAhPT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJJbnZhbGlkIHRyYW5zcG9ydDogXCIgKyByZXF1ZXN0ZWRUcmFuc3BvcnQudG9TdHJpbmcoKSArIFwiLlwiKTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkVHJhbnNwb3J0ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3RlZFRyYW5zcG9ydCA9PT0gXCJhdXRvXCIgJiYgc2lnbmFsUi5fLmllVmVyc2lvbiA8PSA4KSB7XHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIGRvaW5nIGFuIGF1dG8gdHJhbnNwb3J0IGFuZCB3ZSdyZSBJRTggdGhlbiBmb3JjZSBsb25nUG9sbGluZywgIzE3NjRcclxuICAgICAgICAgICAgcmV0dXJuIFtcImxvbmdQb2xsaW5nXCJdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0ZWRUcmFuc3BvcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdFBvcnQocHJvdG9jb2wpIHtcclxuICAgICAgICBpZiAocHJvdG9jb2wgPT09IFwiaHR0cDpcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gODA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcm90b2NvbCA9PT0gXCJodHRwczpcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gNDQzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGREZWZhdWx0UG9ydChwcm90b2NvbCwgdXJsKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHBvcnRzICBmcm9tIHVybC4gIFdlIGhhdmUgdG8gY2hlY2sgaWYgdGhlcmUncyBhIC8gb3IgZW5kIG9mIGxpbmVcclxuICAgICAgICAvLyBmb2xsb3dpbmcgdGhlIHBvcnQgaW4gb3JkZXIgdG8gYXZvaWQgcmVtb3ZpbmcgcG9ydHMgc3VjaCBhcyA4MDgwLlxyXG4gICAgICAgIGlmICh1cmwubWF0Y2goLzpcXGQrJC8pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVybCArIFwiOlwiICsgZ2V0RGVmYXVsdFBvcnQocHJvdG9jb2wpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBDb25uZWN0aW5nTWVzc2FnZUJ1ZmZlcihjb25uZWN0aW9uLCBkcmFpbkNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICBidWZmZXIgPSBbXTtcclxuXHJcbiAgICAgICAgdGhhdC50cnlCdWZmZXIgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gJC5zaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQuZHJhaW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIGNvbm5lY3RlZCB3aGVuIHdlIGRyYWluIChkbyBub3Qgd2FudCB0byBkcmFpbiB3aGlsZSBhIGNvbm5lY3Rpb24gaXMgbm90IGFjdGl2ZSlcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09ICQuc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmFpbkNhbGxiYWNrKGJ1ZmZlci5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbmFsUi5mbiA9IHNpZ25hbFIucHJvdG90eXBlID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh1cmwsIHFzLCBsb2dnaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciAkY29ubmVjdGlvbiA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICAgICAgdGhpcy5xcyA9IHFzO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RFcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuXyA9IHtcclxuICAgICAgICAgICAgICAgIGtlZXBBbGl2ZURhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGluZ01lc3NhZ2VCdWZmZXI6IG5ldyBDb25uZWN0aW5nTWVzc2FnZUJ1ZmZlcih0aGlzLCBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjb25uZWN0aW9uLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY2VpdmVkLCBbbWVzc2FnZV0pO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBsYXN0TWVzc2FnZUF0OiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgICAgIGxhc3RBY3RpdmVBdDogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICBiZWF0SW50ZXJ2YWw6IDUwMDAsIC8vIERlZmF1bHQgdmFsdWUsIHdpbGwgb25seSBiZSBvdmVycmlkZGVuIGlmIGtlZXAgYWxpdmUgaXMgZW5hYmxlZCxcclxuICAgICAgICAgICAgICAgIGJlYXRIYW5kbGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFRyYW5zcG9ydENvbm5lY3RUaW1lb3V0OiAwIC8vIFRoaXMgd2lsbCBiZSB0aGUgc3VtIG9mIHRoZSBUcmFuc3BvcnRDb25uZWN0VGltZW91dCBzZW50IGluIHJlc3BvbnNlIHRvIG5lZ290aWF0ZSBhbmQgY29ubmVjdGlvbi50cmFuc3BvcnRDb25uZWN0VGltZW91dFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChsb2dnaW5nKSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2luZyA9IGxvZ2dpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcGFyc2VSZXNwb25zZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lmpzb24ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX29yaWdpbmFsSnNvbjogd2luZG93LkpTT04sXHJcblxyXG4gICAgICAgIGpzb246IHdpbmRvdy5KU09OLFxyXG5cclxuICAgICAgICBpc0Nyb3NzRG9tYWluOiBmdW5jdGlvbiAodXJsLCBhZ2FpbnN0KSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5DaGVja3MgaWYgdXJsIGlzIGNyb3NzIGRvbWFpbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidXJsXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBiYXNlIFVSTDwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFnYWluc3RcIiB0eXBlPVwiT2JqZWN0XCI+XHJcbiAgICAgICAgICAgIC8vLyAgICAgQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gY29tcGFyZSB0aGUgVVJMIGFnYWluc3QsIGlmIG5vdCBzcGVjaWZpZWQgaXQgd2lsbCBiZSBzZXQgdG8gd2luZG93LmxvY2F0aW9uLlxyXG4gICAgICAgICAgICAvLy8gICAgIElmIHNwZWNpZmllZCBpdCBtdXN0IGNvbnRhaW4gYSBwcm90b2NvbCBhbmQgYSBob3N0IHByb3BlcnR5LlxyXG4gICAgICAgICAgICAvLy8gPC9wYXJhbT5cclxuICAgICAgICAgICAgdmFyIGxpbms7XHJcblxyXG4gICAgICAgICAgICB1cmwgPSAkLnRyaW0odXJsKTtcclxuXHJcbiAgICAgICAgICAgIGFnYWluc3QgPSBhZ2FpbnN0IHx8IHdpbmRvdy5sb2NhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihcImh0dHBcIikgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIGFuY2hvciB0YWcuXHJcbiAgICAgICAgICAgIGxpbmsgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9IHVybDtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoZW4gY2hlY2tpbmcgZm9yIGNyb3NzIGRvbWFpbiB3ZSBoYXZlIHRvIHNwZWNpYWwgY2FzZSBwb3J0IDgwIGJlY2F1c2UgdGhlIHdpbmRvdy5sb2NhdGlvbiB3aWxsIHJlbW92ZSB0aGUgXHJcbiAgICAgICAgICAgIHJldHVybiBsaW5rLnByb3RvY29sICsgYWRkRGVmYXVsdFBvcnQobGluay5wcm90b2NvbCwgbGluay5ob3N0KSAhPT0gYWdhaW5zdC5wcm90b2NvbCArIGFkZERlZmF1bHRQb3J0KGFnYWluc3QucHJvdG9jb2wsIGFnYWluc3QuaG9zdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWpheERhdGFUeXBlOiBcInRleHRcIixcclxuXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiLFxyXG5cclxuICAgICAgICBsb2dnaW5nOiBmYWxzZSxcclxuXHJcbiAgICAgICAgc3RhdGU6IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZCxcclxuXHJcbiAgICAgICAgY2xpZW50UHJvdG9jb2w6IFwiMS41XCIsXHJcblxyXG4gICAgICAgIHJlY29ubmVjdERlbGF5OiAyMDAwLFxyXG5cclxuICAgICAgICB0cmFuc3BvcnRDb25uZWN0VGltZW91dDogMCxcclxuXHJcbiAgICAgICAgZGlzY29ubmVjdFRpbWVvdXQ6IDMwMDAwLCAvLyBUaGlzIHNob3VsZCBiZSBzZXQgYnkgdGhlIHNlcnZlciBpbiByZXNwb25zZSB0byB0aGUgbmVnb3RpYXRlIHJlcXVlc3QgKDMwcyBkZWZhdWx0KVxyXG5cclxuICAgICAgICByZWNvbm5lY3RXaW5kb3c6IDMwMDAwLCAvLyBUaGlzIHNob3VsZCBiZSBzZXQgYnkgdGhlIHNlcnZlciBpbiByZXNwb25zZSB0byB0aGUgbmVnb3RpYXRlIHJlcXVlc3QgXHJcblxyXG4gICAgICAgIGtlZXBBbGl2ZVdhcm5BdDogMiAvIDMsIC8vIFdhcm4gdXNlciBvZiBzbG93IGNvbm5lY3Rpb24gaWYgd2UgYnJlYWNoIHRoZSBYJSBtYXJrIG9mIHRoZSBrZWVwIGFsaXZlIHRpbWVvdXRcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+U3RhcnRzIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCIgdHlwZT1cIk9iamVjdFwiPk9wdGlvbnMgbWFwPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29ubmVjdGlvbiBoYXMgc3RhcnRlZDwvcGFyYW0+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwaW5nSW50ZXJ2YWw6IDMwMDAwMCxcclxuICAgICAgICAgICAgICAgICAgICB3YWl0Rm9yUGFnZUxvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgICAgICBqc29ucDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplLFxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSBjb25uZWN0aW9uLl9kZWZlcnJhbCB8fCAkLkRlZmVycmVkKCksIC8vIENoZWNrIHRvIHNlZSBpZiB0aGVyZSBpcyBhIHByZS1leGlzdGluZyBkZWZlcnJhbCB0aGF0J3MgYmVpbmcgYnVpbHQgb24sIGlmIHNvIHdlIHdhbnQgdG8ga2VlcCB1c2luZyBpdFxyXG4gICAgICAgICAgICAgICAgcGFyc2VyID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sYXN0RXJyb3IgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gUGVyc2lzdCB0aGUgZGVmZXJyYWwgc28gdGhhdCBpZiBzdGFydCBpcyBjYWxsZWQgbXVsdGlwbGUgdGltZXMgdGhlIHNhbWUgZGVmZXJyYWwgaXMgdXNlZC5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fZGVmZXJyYWwgPSBkZWZlcnJlZDtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29ubmVjdGlvbi5qc29uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBubyBKU09OIVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2lnbmFsUjogTm8gSlNPTiBwYXJzZXIgZm91bmQuIFBsZWFzZSBlbnN1cmUganNvbjIuanMgaXMgcmVmZXJlbmNlZCBiZWZvcmUgdGhlIFNpZ25hbFIuanMgZmlsZSBpZiB5b3UgbmVlZCB0byBzdXBwb3J0IGNsaWVudHMgd2l0aG91dCBuYXRpdmUgSlNPTiBwYXJzaW5nIHN1cHBvcnQsIGUuZy4gSUU8OC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkLnR5cGUob3B0aW9ucykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBjYWxsaW5nIHdpdGggc2luZ2xlIGNhbGxiYWNrIHBhcmFtZXRlclxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQudHlwZShvcHRpb25zKSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoY29uZmlnLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmICgkLnR5cGUoY29uZmlnLmNhbGxiYWNrKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBjb25maWcuY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy50cmFuc3BvcnQgPSB2YWxpZGF0ZVRyYW5zcG9ydChjb25maWcudHJhbnNwb3J0LCBjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0cmFuc3BvcnQgaXMgaW52YWxpZCB0aHJvdyBhbiBlcnJvciBhbmQgYWJvcnQgc3RhcnRcclxuICAgICAgICAgICAgaWYgKCFjb25maWcudHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaWduYWxSOiBJbnZhbGlkIHRyYW5zcG9ydChzKSBzcGVjaWZpZWQsIGFib3J0aW5nIHN0YXJ0LlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmNvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiBzdGFydCBpcyBiZWluZyBjYWxsZWQgcHJpb3IgdG8gcGFnZSBsb2FkXHJcbiAgICAgICAgICAgIC8vIElmIHdhaXRGb3JQYWdlTG9hZCBpcyB0cnVlIHdlIHRoZW4gd2FudCB0byByZS1kaXJlY3QgZnVuY3Rpb24gY2FsbCB0byB0aGUgd2luZG93IGxvYWQgZXZlbnRcclxuICAgICAgICAgICAgaWYgKCFfcGFnZUxvYWRlZCAmJiBjb25maWcud2FpdEZvclBhZ2VMb2FkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uZGVmZXJyZWRTdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdGFydChvcHRpb25zLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3BhZ2VXaW5kb3cuYmluZChcImxvYWRcIiwgY29ubmVjdGlvbi5fLmRlZmVycmVkU3RhcnRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBhbHJlYWR5IGNvbm5lY3RpbmcganVzdCByZXR1cm4gdGhlIHNhbWUgZGVmZXJyYWwgYXMgdGhlIG9yaWdpbmFsIGNvbm5lY3Rpb24gc3RhcnRcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlU3RhdGUoY29ubmVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RpbmcpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UncmUgbm90IGNvbm5lY3Rpbmcgc28gdHJ5IGFuZCB0cmFuc2l0aW9uIGludG8gY29ubmVjdGluZy5cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGZhaWwgdG8gdHJhbnNpdGlvbiB0aGVuIHdlJ3JlIGVpdGhlciBpbiBjb25uZWN0ZWQgb3IgcmVjb25uZWN0aW5nLlxyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25maWd1cmVTdG9wUmVjb25uZWN0aW5nVGltZW91dChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIGZ1bGwgdXJsXHJcbiAgICAgICAgICAgIHBhcnNlci5ocmVmID0gY29ubmVjdGlvbi51cmw7XHJcbiAgICAgICAgICAgIGlmICghcGFyc2VyLnByb3RvY29sIHx8IHBhcnNlci5wcm90b2NvbCA9PT0gXCI6XCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucHJvdG9jb2wgPSB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2w7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmhvc3QgPSBwYXJzZXIuaG9zdCB8fCB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24uaG9zdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmhvc3QgPSBwYXJzZXIuaG9zdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5iYXNlVXJsID0gY29ubmVjdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGNvbm5lY3Rpb24uaG9zdDtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgd2Vic29ja2V0IHByb3RvY29sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ud3NQcm90b2NvbCA9IGNvbm5lY3Rpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIgPyBcIndzczovL1wiIDogXCJ3czovL1wiO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYganNvbnAgd2l0aCBuby9hdXRvIHRyYW5zcG9ydCBpcyBzcGVjaWZpZWQsIHRoZW4gc2V0IHRoZSB0cmFuc3BvcnQgdG8gbG9uZyBwb2xsaW5nXHJcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoYXQgaXMgdGhlIG9ubHkgdHJhbnNwb3J0IGZvciB3aGljaCBqc29ucCByZWFsbHkgbWFrZXMgc2Vuc2UuXHJcbiAgICAgICAgICAgIC8vIFNvbWUgZGV2ZWxvcGVycyBtaWdodCBhY3R1YWxseSBjaG9vc2UgdG8gc3BlY2lmeSBqc29ucCBmb3Igc2FtZSBvcmlnaW4gcmVxdWVzdHNcclxuICAgICAgICAgICAgLy8gYXMgZGVtb25zdHJhdGVkIGJ5IElzc3VlICM2MjMuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcudHJhbnNwb3J0ID09PSBcImF1dG9cIiAmJiBjb25maWcuanNvbnAgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy50cmFuc3BvcnQgPSBcImxvbmdQb2xsaW5nXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB1cmwgaXMgcHJvdG9jb2wgcmVsYXRpdmUsIHByZXBlbmQgdGhlIGN1cnJlbnQgd2luZG93cyBwcm90b2NvbCB0byB0aGUgdXJsLiBcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24udXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi51cmwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBjb25uZWN0aW9uLnVybDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiUHJvdG9jb2wgcmVsYXRpdmUgVVJMIGRldGVjdGVkLCBub3JtYWxpemluZyBpdCB0byAnXCIgKyBjb25uZWN0aW9uLnVybCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ3Jvc3NEb21haW4oY29ubmVjdGlvbi51cmwpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkF1dG8gZGV0ZWN0ZWQgY3Jvc3MgZG9tYWluIHVybC5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy50cmFuc3BvcnQgPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogU3VwcG9ydCBYRE0gd2l0aCBmb3JldmVyRnJhbWVcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcudHJhbnNwb3J0ID0gW1wid2ViU29ja2V0c1wiLCBcInNlcnZlclNlbnRFdmVudHNcIiwgXCJsb25nUG9sbGluZ1wiXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChjb25maWcud2l0aENyZWRlbnRpYWxzKSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERldGVybWluZSBpZiBqc29ucCBpcyB0aGUgb25seSBjaG9pY2UgZm9yIG5lZ290aWF0aW9uLCBhamF4U2VuZCBhbmQgYWpheEFib3J0LlxyXG4gICAgICAgICAgICAgICAgLy8gaS5lLiBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnRzIENPUlNcclxuICAgICAgICAgICAgICAgIC8vIElmIGl0IGlzLCBpZ25vcmUgYW55IHByZWZlcmVuY2UgdG8gdGhlIGNvbnRyYXJ5LCBhbmQgc3dpdGNoIHRvIGpzb25wLlxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcuanNvbnApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcuanNvbnAgPSAhJC5zdXBwb3J0LmNvcnM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuanNvbnApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJVc2luZyBqc29ucCBiZWNhdXNlIHRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgQ09SUy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uY29udGVudFR5cGUgPSBzaWduYWxSLl8uZGVmYXVsdENvbnRlbnRUeXBlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLndpdGhDcmVkZW50aWFscyA9IGNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmFqYXhEYXRhVHlwZSA9IGNvbmZpZy5qc29ucCA/IFwianNvbnBcIiA6IFwidGV4dFwiO1xyXG5cclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vblN0YXJ0LCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQudHlwZShjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbml0SGFuZGxlciA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMuaW5pdEhhbmRsZXIoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpbml0aWFsaXplID0gZnVuY3Rpb24gKHRyYW5zcG9ydHMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9UcmFuc3BvcnRFcnJvciA9IHNpZ25hbFIuXy5lcnJvcihyZXNvdXJjZXMubm9UcmFuc3BvcnRPbkluaXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSB0cmFuc3BvcnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIk5vIHRyYW5zcG9ydHMgc3VwcG9ydGVkIGJ5IHRoZSBzZXJ2ZXIgd2VyZSBzZWxlY3RlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIk5vIGZhbGxiYWNrIHRyYW5zcG9ydHMgd2VyZSBzZWxlY3RlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJGYWxsYmFjayB0cmFuc3BvcnRzIGV4aGF1c3RlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBObyB0cmFuc3BvcnQgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW25vVHJhbnNwb3J0RXJyb3JdKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qobm9UcmFuc3BvcnRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0aGUgY29ubmVjdGlvbiBpZiBpdCBoYXMgY29ubmVjdGVkIGFuZCBtb3ZlIGl0IGludG8gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgY29ubmVjdGlvbiB3YXMgYWJvcnRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmRpc2Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0TmFtZSA9IHRyYW5zcG9ydHNbaW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IHNpZ25hbFIudHJhbnNwb3J0c1t0cmFuc3BvcnROYW1lXSxcclxuICAgICAgICAgICAgICAgICAgICBvbkZhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplKHRyYW5zcG9ydHMsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbml0SGFuZGxlci5zdGFydCh0cmFuc3BvcnQsIGZ1bmN0aW9uICgpIHsgLy8gc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJlZm94IDExKyBkb2Vzbid0IGFsbG93IHN5bmMgWEhSIHdpdGhDcmVkZW50aWFsczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0I3dpdGhDcmVkZW50aWFsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNGaXJlZm94MTFPckdyZWF0ZXIgPSBzaWduYWxSLl8uZmlyZWZveE1ham9yVmVyc2lvbih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgPj0gMTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luY0Fib3J0ID0gISFjb25uZWN0aW9uLndpdGhDcmVkZW50aWFscyAmJiBpc0ZpcmVmb3gxMU9yR3JlYXRlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVGhlIHN0YXJ0IHJlcXVlc3Qgc3VjY2VlZGVkLiBUcmFuc2l0aW9uaW5nIHRvIHRoZSBjb25uZWN0ZWQgc3RhdGUuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRzS2VlcEFsaXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLm1vbml0b3JLZWVwQWxpdmUoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMuc3RhcnRIZWFydGJlYXQoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2VkIHRvIGVuc3VyZSBsb3cgYWN0aXZpdHkgY2xpZW50cyBtYWludGFpbiB0aGVpciBhdXRoZW50aWNhdGlvbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTXVzdCBiZSBjb25maWd1cmVkIG9uY2UgYSB0cmFuc3BvcnQgaGFzIGJlZW4gZGVjaWRlZCB0byBwZXJmb3JtIHZhbGlkIHBpbmcgcmVxdWVzdHMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy5jb25maWd1cmVQaW5nSW50ZXJ2YWwoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoYW5nZVN0YXRlKGNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldBUk5JTkchIFRoZSBjb25uZWN0aW9uIHdhcyBub3QgaW4gdGhlIGNvbm5lY3Rpbmcgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEcmFpbiBhbnkgaW5jb21pbmcgYnVmZmVyZWQgbWVzc2FnZXMgKG1lc3NhZ2VzIHRoYXQgY2FtZSBpbiBwcmlvciB0byBjb25uZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uY29ubmVjdGluZ01lc3NhZ2VCdWZmZXIuZHJhaW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uU3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lyZSB0aGUgc3RvcCBoYW5kbGVyIGZvciB3aGVuIHRoZSB1c2VyIGxlYXZlcyB0aGUgcGFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcGFnZVdpbmRvdy5iaW5kKFwidW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiV2luZG93IHVubG9hZGluZywgc3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcChhc3luY0Fib3J0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaXJlZm94MTFPckdyZWF0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggZG9lcyBub3QgZmlyZSBjcm9zcy1kb21haW4gWEhScyBpbiB0aGUgbm9ybWFsIHVubG9hZCBoYW5kbGVyIG9uIHRhYiBjbG9zZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICMyNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGFnZVdpbmRvdy5iaW5kKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBjb25uZWN0aW9uLnN0b3AoKSBydW5zIHJ1bnMgaW4gYmVmb3JldW5sb2FkIGFuZCBmYWlscywgaXQgd2lsbCBhbHNvIGZhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiB1bmxvYWQgdW5sZXNzIGNvbm5lY3Rpb24uc3RvcCgpIHJ1bnMgYWZ0ZXIgYSB0aW1lb3V0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKGFzeW5jQWJvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBvbkZhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHRyYW5zcG9ydC5uYW1lICsgXCIgdHJhbnNwb3J0IHRocmV3ICdcIiArIGVycm9yLm1lc3NhZ2UgKyBcIicgd2hlbiBhdHRlbXB0aW5nIHRvIHN0YXJ0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsID0gY29ubmVjdGlvbi51cmwgKyBcIi9uZWdvdGlhdGVcIixcclxuICAgICAgICAgICAgICAgIG9uRmFpbGVkID0gZnVuY3Rpb24gKGVycm9yLCBjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IHNpZ25hbFIuXy5lcnJvcihyZXNvdXJjZXMuZXJyb3JPbk5lZ290aWF0ZSwgZXJyb3IsIGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIHRoZSBjb25uZWN0aW9uIGlmIG5lZ290aWF0ZSBmYWlsZWRcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblN0YXJ0aW5nKTtcclxuXHJcbiAgICAgICAgICAgIHVybCA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMucHJlcGFyZVF1ZXJ5U3RyaW5nKGNvbm5lY3Rpb24sIHVybCk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIk5lZ290aWF0aW5nIHdpdGggJ1wiICsgdXJsICsgXCInLlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIGFqYXggbmVnb3RpYXRlIHJlcXVlc3Qgb2JqZWN0IHNvIHdlIGNhbiBhYm9ydCBpdCBpZiBzdG9wIGlzIGNhbGxlZCB3aGlsZSB0aGUgcmVxdWVzdCBpcyBpbiBmbGlnaHQuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0ID0gc2lnbmFsUi50cmFuc3BvcnRzLl9sb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgc3RhdHVzVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gY2F1c2UgYW55IGVycm9ycyBpZiB3ZSdyZSBhYm9ydGluZyBvdXIgb3duIG5lZ290aWF0ZSByZXF1ZXN0LlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXNUZXh0ICE9PSBfbmVnb3RpYXRlQWJvcnRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKGVycm9yLCBjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHJlamVjdGlvbiB3aWxsIG5vb3AgaWYgdGhlIGRlZmVycmVkIGhhcyBhbHJlYWR5IGJlZW4gcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChzaWduYWxSLl8uZXJyb3IocmVzb3VyY2VzLnN0b3BwZWRXaGlsZU5lZ290aWF0aW5nLCBudWxsIC8qIGVycm9yICovLCBjb25uZWN0aW9uLl8ubmVnb3RpYXRlUmVxdWVzdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2xFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWRUcmFuc3BvcnRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZChzaWduYWxSLl8uZXJyb3IocmVzb3VyY2VzLmVycm9yUGFyc2luZ05lZ290aWF0ZVJlc3BvbnNlLCBlcnJvciksIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhID0gY29ubmVjdGlvbi5fLmtlZXBBbGl2ZURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5hcHBSZWxhdGl2ZVVybCA9IHJlcy5Vcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5pZCA9IHJlcy5Db25uZWN0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50b2tlbiA9IHJlcy5Db25uZWN0aW9uVG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi53ZWJTb2NrZXRTZXJ2ZXJVcmwgPSByZXMuV2ViU29ja2V0U2VydmVyVXJsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbG9uZyBwb2xsIHRpbWVvdXQgaXMgdGhlIENvbm5lY3Rpb25UaW1lb3V0IHBsdXMgMTAgc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5wb2xsVGltZW91dCA9IHJlcy5Db25uZWN0aW9uVGltZW91dCAqIDEwMDAgKyAxMDAwMDsgLy8gaW4gbXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25jZSB0aGUgc2VydmVyIGhhcyBsYWJlbGVkIHRoZSBQZXJzaXN0ZW50Q29ubmVjdGlvbiBhcyBEaXNjb25uZWN0ZWQsIHdlIHNob3VsZCBzdG9wIGF0dGVtcHRpbmcgdG8gcmVjb25uZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWZ0ZXIgcmVzLkRpc2Nvbm5lY3RUaW1lb3V0IHNlY29uZHMuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5kaXNjb25uZWN0VGltZW91dCA9IHJlcy5EaXNjb25uZWN0VGltZW91dCAqIDEwMDA7IC8vIGluIG1zXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgVHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgZnJvbSB0aGUgcmVzcG9uc2UgdG8gdGhlIHRyYW5zcG9ydENvbm5lY3RUaW1lb3V0IGZyb20gdGhlIGNsaWVudCB0byBjYWxjdWxhdGUgdGhlIHRvdGFsIHRpbWVvdXRcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8udG90YWxUcmFuc3BvcnRDb25uZWN0VGltZW91dCA9IGNvbm5lY3Rpb24udHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgKyByZXMuVHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQgKiAxMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEga2VlcCBhbGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuS2VlcEFsaXZlVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUga2VlcCBhbGl2ZSBkYXRhIGFzIGFjdGl2YXRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhLmFjdGl2YXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IHRvIGRlc2lnbmF0ZSB3aGVuIHRvIGZvcmNlIHRoZSBjb25uZWN0aW9uIGludG8gcmVjb25uZWN0aW5nIGNvbnZlcnRlZCB0byBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS50aW1lb3V0ID0gcmVzLktlZXBBbGl2ZVRpbWVvdXQgKiAxMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGltZW91dCB0byBkZXNpZ25hdGUgd2hlbiB0byB3YXJuIHRoZSBkZXZlbG9wZXIgdGhhdCB0aGUgY29ubmVjdGlvbiBtYXkgYmUgZGVhZCBvciBpcyBub3QgcmVzcG9uZGluZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS50aW1lb3V0V2FybmluZyA9IGtlZXBBbGl2ZURhdGEudGltZW91dCAqIGNvbm5lY3Rpb24ua2VlcEFsaXZlV2FybkF0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgdGhlIGZyZXF1ZW5jeSBpbiB3aGljaCB3ZSBjaGVjayB0aGUga2VlcCBhbGl2ZS4gIEl0IG11c3QgYmUgc2hvcnQgaW4gb3JkZXIgdG8gbm90IG1pc3MvcGljayB1cCBhbnkgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uYmVhdEludGVydmFsID0gKGtlZXBBbGl2ZURhdGEudGltZW91dCAtIGtlZXBBbGl2ZURhdGEudGltZW91dFdhcm5pbmcpIC8gMztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwQWxpdmVEYXRhLmFjdGl2YXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5yZWNvbm5lY3RXaW5kb3cgPSBjb25uZWN0aW9uLmRpc2Nvbm5lY3RUaW1lb3V0ICsgKGtlZXBBbGl2ZURhdGEudGltZW91dCB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMuUHJvdG9jb2xWZXJzaW9uIHx8IHJlcy5Qcm90b2NvbFZlcnNpb24gIT09IGNvbm5lY3Rpb24uY2xpZW50UHJvdG9jb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2xFcnJvciA9IHNpZ25hbFIuXy5lcnJvcihzaWduYWxSLl8uZm9ybWF0KHJlc291cmNlcy5wcm90b2NvbEluY29tcGF0aWJsZSwgY29ubmVjdGlvbi5jbGllbnRQcm90b2NvbCwgcmVzLlByb3RvY29sVmVyc2lvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbcHJvdG9jb2xFcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocHJvdG9jb2xFcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goc2lnbmFsUi50cmFuc3BvcnRzLCBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoa2V5LmluZGV4T2YoXCJfXCIpID09PSAwKSB8fCAoa2V5ID09PSBcIndlYlNvY2tldHNcIiAmJiAhcmVzLlRyeVdlYlNvY2tldHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWRUcmFuc3BvcnRzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNBcnJheShjb25maWcudHJhbnNwb3J0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY29uZmlnLnRyYW5zcG9ydCwgZnVuY3Rpb24gKF8sIHRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheSh0cmFuc3BvcnQsIHN1cHBvcnRlZFRyYW5zcG9ydHMpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzLnB1c2godHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWcudHJhbnNwb3J0ID09PSBcImF1dG9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzID0gc3VwcG9ydGVkVHJhbnNwb3J0cztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQuaW5BcnJheShjb25maWcudHJhbnNwb3J0LCBzdXBwb3J0ZWRUcmFuc3BvcnRzKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHMucHVzaChjb25maWcudHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemUodHJhbnNwb3J0cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydGluZzogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgYmVmb3JlIGFueXRoaW5nIGlzIHNlbnQgb3ZlciB0aGUgY29ubmVjdGlvbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgYmVmb3JlIHRoZSBjb25uZWN0aW9uIGlzIGZ1bGx5IGluc3RhbnRpYXRlZC48L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25TdGFydGluZywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+U2VuZHMgZGF0YSBvdmVyIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBkYXRhIHRvIHNlbmQgb3ZlciB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbm5lY3Rpb24gaGFzbid0IGJlZW4gc3RhcnRlZCB5ZXRcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpZ25hbFI6IENvbm5lY3Rpb24gbXVzdCBiZSBzdGFydGVkIGJlZm9yZSBkYXRhIGNhbiBiZSBzZW50LiBDYWxsIC5zdGFydCgpIGJlZm9yZSAuc2VuZCgpXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29ubmVjdGlvbiBoYXNuJ3QgYmVlbiBzdGFydGVkIHlldFxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2lnbmFsUjogQ29ubmVjdGlvbiBoYXMgbm90IGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuIFVzZSAuc3RhcnQoKS5kb25lKCkgb3IgLnN0YXJ0KCkuZmFpbCgpIHRvIHJ1biBsb2dpYyBhZnRlciB0aGUgY29ubmVjdGlvbiBoYXMgc3RhcnRlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LnNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIFJFVklFVzogU2hvdWxkIHdlIHJldHVybiBkZWZlcnJlZCBoZXJlP1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNlaXZlZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgYWZ0ZXIgYW55dGhpbmcgaXMgcmVjZWl2ZWQgb3ZlciB0aGUgY29ubmVjdGlvbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FsbGJhY2tcIiB0eXBlPVwiRnVuY3Rpb25cIj5BIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBhbnkgZGF0YSBpcyByZWNlaXZlZCBvbiB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vblJlY2VpdmVkLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VzPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZXM8L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25TdGF0ZUNoYW5nZWQsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24sIGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIGFmdGVyIGFuIGVycm9yIG9jY3VycyB3aXRoIHRoZSBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGFuIGVycm9yIG9jY3VycyBvbiB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vbkVycm9yLCBmdW5jdGlvbiAoZSwgZXJyb3JEYXRhLCBzZW5kRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sYXN0RXJyb3IgPSBlcnJvckRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyBJbiBwcmFjdGljZSAnZXJyb3JEYXRhJyBpcyB0aGUgU2lnbmFsUiBidWlsdCBlcnJvciBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAvLyBJbiBwcmFjdGljZSAnc2VuZERhdGEnIGlzIHVuZGVmaW5lZCBmb3IgYWxsIGVycm9yIGV2ZW50cyBleGNlcHQgdGhvc2UgdHJpZ2dlcmVkIGJ5XHJcbiAgICAgICAgICAgICAgICAvLyAnYWpheFNlbmQnIGFuZCAnd2ViU29ja2V0cy5zZW5kJy4nc2VuZERhdGEnIGlzIHRoZSBvcmlnaW5hbCBzZW5kIHBheWxvYWQuXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbm5lY3Rpb24sIGVycm9yRGF0YSwgc2VuZERhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjbGllbnQgZGlzY29ubmVjdHM8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgYnJva2VuPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uRGlzY29ubmVjdCwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0aW9uU2xvdzogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY2xpZW50IGRldGVjdHMgYSBzbG93IGNvbm5lY3Rpb248L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgc2xvdzwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcztcclxuICAgICAgICAgICAgJChjb25uZWN0aW9uKS5iaW5kKGV2ZW50cy5vbkNvbm5lY3Rpb25TbG93LCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNvbm5lY3Rpbmc6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIHVuZGVybHlpbmcgdHJhbnNwb3J0IGJlZ2lucyByZWNvbm5lY3Rpbmc8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+QSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGNvbm5lY3Rpb24gZW50ZXJzIGEgcmVjb25uZWN0aW5nIHN0YXRlPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uUmVjb25uZWN0aW5nLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdGVkOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSB1bmRlcmx5aW5nIHRyYW5zcG9ydCByZWNvbm5lY3RzPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPkEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIHJlc3RvcmVkPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG4gICAgICAgICAgICAkKGNvbm5lY3Rpb24pLmJpbmQoZXZlbnRzLm9uUmVjb25uZWN0LCBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uIChhc3luYywgbm90aWZ5U2VydmVyKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5TdG9wcyBsaXN0ZW5pbmc8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFzeW5jXCIgdHlwZT1cIkJvb2xlYW5cIj5XaGV0aGVyIG9yIG5vdCB0byBhc3luY2hyb25vdXNseSBhYm9ydCB0aGUgY29ubmVjdGlvbjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm5vdGlmeVNlcnZlclwiIHR5cGU9XCJCb29sZWFuXCI+V2hldGhlciB3ZSB3YW50IHRvIG5vdGlmeSB0aGUgc2VydmVyIHRoYXQgd2UgYXJlIGFib3J0aW5nIHRoZSBjb25uZWN0aW9uPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJzaWduYWxSXCIgLz5cclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSBkZWZlcnJhbCBiZWNhdXNlIHRoaXMgaXMgYWx3YXlzIGNsZWFuZWQgdXBcclxuICAgICAgICAgICAgICAgIGRlZmVycmFsID0gY29ubmVjdGlvbi5fZGVmZXJyYWw7XHJcblxyXG4gICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB3ZSd2ZSBib3VuZCBhIGxvYWQgZXZlbnQuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLl8uZGVmZXJyZWRTdGFydEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVuYmluZCB0aGUgZXZlbnQuXHJcbiAgICAgICAgICAgICAgICBfcGFnZVdpbmRvdy51bmJpbmQoXCJsb2FkXCIsIGNvbm5lY3Rpb24uXy5kZWZlcnJlZFN0YXJ0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFsd2F5cyBjbGVhbiB1cCBwcml2YXRlIG5vbi10aW1lb3V0IGJhc2VkIHN0YXRlLlxyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLmNvbmZpZztcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5kZWZlcnJlZFN0YXJ0SGFuZGxlcjtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgY2hlY2tlZCBkZXNwaXRlIHRoZSBjb25uZWN0aW9uIHN0YXRlIGJlY2F1c2UgYSBjb25uZWN0aW9uIHN0YXJ0IGNhbiBiZSBkZWZlcnJlZCB1bnRpbCBwYWdlIGxvYWQuXHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGRlZmVycmVkIHRoZSBzdGFydCBkdWUgdG8gYSBwYWdlIGxvYWQgd2UgbmVlZCB0byB1bmJpbmQgdGhlIFwib25Mb2FkXCIgLT4gc3RhcnQgZXZlbnQuXHJcbiAgICAgICAgICAgIGlmICghX3BhZ2VMb2FkZWQgJiYgKCFjb25uZWN0aW9uLl8uY29uZmlnIHx8IGNvbm5lY3Rpb24uXy5jb25maWcud2FpdEZvclBhZ2VMb2FkID09PSB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJTdG9wcGluZyBjb25uZWN0aW9uIHByaW9yIHRvIG5lZ290aWF0ZS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGRlZmVycmFsIHdlIHNob3VsZCByZWplY3QgaXRcclxuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlamVjdChzaWduYWxSLl8uZXJyb3IocmVzb3VyY2VzLnN0b3BwZWRXaGlsZUxvYWRpbmcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTaG9ydC1jaXJjdWl0IGJlY2F1c2UgdGhlIHN0YXJ0IGhhcyBub3QgYmVlbiBmdWxseSBzdGFydGVkLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuZGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiU3RvcHBpbmcgY29ubmVjdGlvbi5cIik7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLCBjb25uZWN0aW9uLnN0YXRlLCBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5kaXNjb25uZWN0ZWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYXIgdGhpcyBubyBtYXR0ZXIgd2hhdFxyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb24uXy5iZWF0SGFuZGxlKTtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoY29ubmVjdGlvbi5fLnBpbmdJbnRlcnZhbElkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQuc3RvcChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm90aWZ5U2VydmVyICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LmFib3J0KGNvbm5lY3Rpb24sIGFzeW5jKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydHNLZWVwQWxpdmUoY29ubmVjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLnN0b3BNb25pdG9yaW5nS2VlcEFsaXZlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uXy5uZWdvdGlhdGVSZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbmVnb3RpYXRpb24gcmVxdWVzdCBoYXMgYWxyZWFkeSBjb21wbGV0ZWQgdGhpcyB3aWxsIG5vb3AuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ubmVnb3RpYXRlUmVxdWVzdC5hYm9ydChfbmVnb3RpYXRlQWJvcnRUZXh0KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ubmVnb3RpYXRlUmVxdWVzdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRW5zdXJlIHRoYXQgaW5pdEhhbmRsZXIuc3RvcCgpIGlzIGNhbGxlZCBiZWZvcmUgY29ubmVjdGlvbi5fZGVmZXJyYWwgaXMgZGVsZXRlZFxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5fLmluaXRIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8uaW5pdEhhbmRsZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBkaXNjb25uZWN0IGV2ZW50XHJcbiAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRGlzY29ubmVjdCk7XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fZGVmZXJyYWw7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLm1lc3NhZ2VJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uZ3JvdXBzVG9rZW47XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmlkO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLnBpbmdJbnRlcnZhbElkO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLmxhc3RNZXNzYWdlQXQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0O1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYXIgb3V0IG91ciBtZXNzYWdlIGJ1ZmZlclxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8uY29ubmVjdGluZ01lc3NhZ2VCdWZmZXIuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvZzogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBsb2cobXNnLCB0aGlzLmxvZ2dpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2lnbmFsUi5mbi5pbml0LnByb3RvdHlwZSA9IHNpZ25hbFIuZm47XHJcblxyXG4gICAgc2lnbmFsUi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5SZWluc3RhdGVzIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiAkLmNvbm5lY3Rpb24gYW5kIHJldHVybnMgdGhlIHNpZ25hbFIgb2JqZWN0IGZvciBtYW51YWwgYXNzaWdubWVudDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInNpZ25hbFJcIiAvPlxyXG4gICAgICAgIGlmICgkLmNvbm5lY3Rpb24gPT09IHNpZ25hbFIpIHtcclxuICAgICAgICAgICAgJC5jb25uZWN0aW9uID0gX2Nvbm5lY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaWduYWxSO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoJC5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgX2Nvbm5lY3Rpb24gPSAkLmNvbm5lY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgJC5jb25uZWN0aW9uID0gJC5zaWduYWxSID0gc2lnbmFsUjtcclxuXHJcbn0od2luZG93LmpRdWVyeSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMuY29tbW9uLmpzICovXHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IE9wZW4gVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFNlZSBMaWNlbnNlLm1kIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLmNvcmUuanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBzaWduYWxSID0gJC5zaWduYWxSLFxyXG4gICAgICAgIGV2ZW50cyA9ICQuc2lnbmFsUi5ldmVudHMsXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSAkLnNpZ25hbFIuY2hhbmdlU3RhdGUsXHJcbiAgICAgICAgc3RhcnRBYm9ydFRleHQgPSBcIl9fU3RhcnQgQWJvcnRlZF9fXCIsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWM7XHJcblxyXG4gICAgc2lnbmFsUi50cmFuc3BvcnRzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gYmVhdChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLm1vbml0b3JpbmcpIHtcclxuICAgICAgICAgICAgY2hlY2tJZkFsaXZlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgd2Ugc3VjY2Vzc2Z1bGx5IG1hcmtlZCBhY3RpdmUgYmVmb3JlIGNvbnRpbnVpbmcgdGhlIGhlYXJ0YmVhdC5cclxuICAgICAgICBpZiAodHJhbnNwb3J0TG9naWMubWFya0FjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8uYmVhdEhhbmRsZSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGJlYXQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0sIGNvbm5lY3Rpb24uXy5iZWF0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lmQWxpdmUoY29ubmVjdGlvbikge1xyXG4gICAgICAgIHZhciBrZWVwQWxpdmVEYXRhID0gY29ubmVjdGlvbi5fLmtlZXBBbGl2ZURhdGEsXHJcbiAgICAgICAgICAgIHRpbWVFbGFwc2VkO1xyXG5cclxuICAgICAgICAvLyBPbmx5IGNoZWNrIGlmIHdlJ3JlIGNvbm5lY3RlZFxyXG4gICAgICAgIGlmIChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGltZUVsYXBzZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGNvbm5lY3Rpb24uXy5sYXN0TWVzc2FnZUF0O1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGtlZXAgYWxpdmUgaGFzIGNvbXBsZXRlbHkgdGltZWQgb3V0XHJcbiAgICAgICAgICAgIGlmICh0aW1lRWxhcHNlZCA+PSBrZWVwQWxpdmVEYXRhLnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiS2VlcCBhbGl2ZSB0aW1lZCBvdXQuICBOb3RpZnlpbmcgdHJhbnNwb3J0IHRoYXQgY29ubmVjdGlvbiBoYXMgYmVlbiBsb3N0LlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3RpZnkgdHJhbnNwb3J0IHRoYXQgdGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gbG9zdFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQubG9zdENvbm5lY3Rpb24oY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZUVsYXBzZWQgPj0ga2VlcEFsaXZlRGF0YS50aW1lb3V0V2FybmluZykge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyB0byBhc3N1cmUgdGhhdCB0aGUgdXNlciBvbmx5IGdldHMgYSBzaW5nbGUgd2FybmluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwQWxpdmVEYXRhLnVzZXJOb3RpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiS2VlcCBhbGl2ZSBoYXMgYmVlbiBtaXNzZWQsIGNvbm5lY3Rpb24gbWF5IGJlIGRlYWQvc2xvdy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25Db25uZWN0aW9uU2xvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS51c2VyTm90aWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS51c2VyTm90aWZpZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBamF4VXJsKGNvbm5lY3Rpb24sIHBhdGgpIHtcclxuICAgICAgICB2YXIgdXJsID0gY29ubmVjdGlvbi51cmwgKyBwYXRoO1xyXG5cclxuICAgICAgICBpZiAoY29ubmVjdGlvbi50cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgdXJsICs9IFwiP3RyYW5zcG9ydD1cIiArIGNvbm5lY3Rpb24udHJhbnNwb3J0Lm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhbnNwb3J0TG9naWMucHJlcGFyZVF1ZXJ5U3RyaW5nKGNvbm5lY3Rpb24sIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gSW5pdEhhbmRsZXIoY29ubmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRSZXF1ZXN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXRIYW5kbGVyLnByb3RvdHlwZSA9IHtcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKHRyYW5zcG9ydCwgb25TdWNjZXNzLCBvbkZhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGF0LmNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBmYWlsQ2FsbGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5zdGFydFJlcXVlc3RlZCB8fCB0aGF0LmNvbm5lY3Rpb25TdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldBUk5JTkchIFwiICsgdHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgY2Fubm90IGJlIHN0YXJ0ZWQuIEluaXRpYWxpemF0aW9uIG9uZ29pbmcgb3IgY29tcGxldGVkLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgc3RhcnRpbmcuXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmFuc3BvcnRUaW1lb3V0SGFuZGxlID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmYWlsQ2FsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbENhbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgdGltZWQgb3V0IHdoZW4gdHJ5aW5nIHRvIGNvbm5lY3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJhbnNwb3J0RmFpbGVkKHRyYW5zcG9ydCwgdW5kZWZpbmVkLCBvbkZhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgY29ubmVjdGlvbi5fLnRvdGFsVHJhbnNwb3J0Q29ubmVjdFRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgdHJhbnNwb3J0LnN0YXJ0KGNvbm5lY3Rpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZmFpbENhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdFJlY2VpdmVkKHRyYW5zcG9ydCwgb25TdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBhbGxvdyB0aGUgc2FtZSB0cmFuc3BvcnQgdG8gY2F1c2Ugb25GYWxsYmFjayB0byBiZSBjYWxsZWQgdHdpY2VcclxuICAgICAgICAgICAgICAgIGlmICghZmFpbENhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWxDYWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJhbnNwb3J0RmFpbGVkKHRyYW5zcG9ydCwgZXJyb3IsIG9uRmFsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHJhbnNwb3J0IHNob3VsZCBzdG9wO1xyXG4gICAgICAgICAgICAgICAgLy8gZmFsc2UgaWYgaXQgc2hvdWxkIGF0dGVtcHQgdG8gcmVjb25uZWN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoYXQuc3RhcnRDb21wbGV0ZWQgfHwgdGhhdC5jb25uZWN0aW9uU3RvcHBlZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRyYW5zcG9ydFRpbWVvdXRIYW5kbGUpO1xyXG4gICAgICAgICAgICBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLnRyeUFib3J0U3RhcnRSZXF1ZXN0KHRoaXMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdFJlY2VpdmVkOiBmdW5jdGlvbiAodHJhbnNwb3J0LCBvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbiA9IHRoYXQuY29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnN0YXJ0UmVxdWVzdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldBUk5JTkchIFRoZSBjbGllbnQgcmVjZWl2ZWQgbXVsdGlwbGUgaW5pdCBtZXNzYWdlcy5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNvbm5lY3Rpb25TdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuc3RhcnRSZXF1ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoYXQudHJhbnNwb3J0VGltZW91dEhhbmRsZSk7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxvZyh0cmFuc3BvcnQubmFtZSArIFwiIHRyYW5zcG9ydCBjb25uZWN0ZWQuIEluaXRpYXRpbmcgc3RhcnQgcmVxdWVzdC5cIik7XHJcbiAgICAgICAgICAgIHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMuYWpheFN0YXJ0KGNvbm5lY3Rpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc3RhcnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyYW5zcG9ydEZhaWxlZDogZnVuY3Rpb24gKHRyYW5zcG9ydCwgZXJyb3IsIG9uRmFsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLmNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IGNvbm5lY3Rpb24uX2RlZmVycmFsLFxyXG4gICAgICAgICAgICAgICAgd3JhcHBlZEVycm9yO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0b3BwZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRyYW5zcG9ydFRpbWVvdXRIYW5kbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVxdWVzdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc3RvcChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyh0cmFuc3BvcnQubmFtZSArIFwiIHRyYW5zcG9ydCBmYWlsZWQgdG8gY29ubmVjdC4gQXR0ZW1wdGluZyB0byBmYWxsIGJhY2suXCIpO1xyXG4gICAgICAgICAgICAgICAgb25GYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXJ0Q29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgYXR0ZW1wdCB0byBmYWxsIGJhY2sgaWYgYSBzdGFydCByZXF1ZXN0IGlzIG9uZ29pbmcgZHVyaW5nIGEgdHJhbnNwb3J0IGZhaWx1cmUuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnN0ZWFkLCB0cmlnZ2VyIGFuIGVycm9yIGFuZCBzdG9wIHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICAgICAgICAgICAgd3JhcHBlZEVycm9yID0gc2lnbmFsUi5fLmVycm9yKHNpZ25hbFIucmVzb3VyY2VzLmVycm9yRHVyaW5nU3RhcnRSZXF1ZXN0LCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2codHJhbnNwb3J0Lm5hbWUgKyBcIiB0cmFuc3BvcnQgZmFpbGVkIGR1cmluZyB0aGUgc3RhcnQgcmVxdWVzdC4gU3RvcHBpbmcgdGhlIGNvbm5lY3Rpb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3dyYXBwZWRFcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmVycmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHdyYXBwZWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgc3RhcnQgcmVxdWVzdCBoYXMgY29tcGxldGVkLCBidXQgdGhlIGNvbm5lY3Rpb24gaGFzIG5vdCBzdG9wcGVkLlxyXG4gICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBkbyBhbnl0aGluZyBoZXJlLiBUaGUgdHJhbnNwb3J0IHNob3VsZCBhdHRlbXB0IGl0cyBub3JtYWwgcmVjb25uZWN0IGxvZ2ljLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0cmFuc3BvcnRMb2dpYyA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMgPSB7XHJcbiAgICAgICAgYWpheDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICQuYWpheChcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKC8qZGVlcCBjb3B5Ki8gdHJ1ZSwge30sICQuc2lnbmFsUi5hamF4RGVmYXVsdHMsIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIHhockZpZWxkczogeyB3aXRoQ3JlZGVudGlhbHM6IGNvbm5lY3Rpb24ud2l0aENyZWRlbnRpYWxzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGNvbm5lY3Rpb24uY29udGVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IGNvbm5lY3Rpb24uYWpheERhdGFUeXBlXHJcbiAgICAgICAgICAgICAgICB9LCBvcHRpb25zKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGluZ1NlcnZlcjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlBpbmdzIHRoZSBzZXJ2ZXI8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNvbm5lY3Rpb25cIiB0eXBlPVwic2lnbmFsclwiPkNvbm5lY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBzZXJ2ZXIgcGluZzwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwic2lnbmFsUlwiIC8+XHJcbiAgICAgICAgICAgIHZhciB1cmwsXHJcbiAgICAgICAgICAgICAgICB4aHIsXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJhbCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnRyYW5zcG9ydCkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gY29ubmVjdGlvbi51cmwgKyBcIi9waW5nXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsID0gdHJhbnNwb3J0TG9naWMuYWRkUXModXJsLCBjb25uZWN0aW9uLnFzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB4aHIgPSB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJhbC5yZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy5waW5nU2VydmVyRmFpbGVkUGFyc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5SZXNwb25zZSA9PT0gXCJwb25nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlamVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy5mb3JtYXQoc2lnbmFsUi5yZXNvdXJjZXMucGluZ1NlcnZlckZhaWxlZEludmFsaWRSZXNwb25zZSwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgLyogZXJyb3IgKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxIHx8IGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJhbC5yZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8uZm9ybWF0KHNpZ25hbFIucmVzb3VyY2VzLnBpbmdTZXJ2ZXJGYWlsZWRTdGF0dXNDb2RlLCBlcnJvci5zdGF0dXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmFsLnJlamVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLl8udHJhbnNwb3J0RXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIucmVzb3VyY2VzLnBpbmdTZXJ2ZXJGYWlsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyYWwucmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMubm9Db25uZWN0aW9uVHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJhbC5wcm9taXNlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJlcGFyZVF1ZXJ5U3RyaW5nOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgdXJsKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVwYXJlZFVybDtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSBhZGRRcyB0byBzdGFydCBzaW5jZSBpdCBoYW5kbGVzIHRoZSA/LyYgcHJlZml4IGZvciB1c1xyXG4gICAgICAgICAgICBwcmVwYXJlZFVybCA9IHRyYW5zcG9ydExvZ2ljLmFkZFFzKHVybCwgXCJjbGllbnRQcm90b2NvbD1cIiArIGNvbm5lY3Rpb24uY2xpZW50UHJvdG9jb2wpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSB1c2VyLXNwZWNpZmllZCBxdWVyeSBzdHJpbmcgcGFyYW1zIGlmIGFueVxyXG4gICAgICAgICAgICBwcmVwYXJlZFVybCA9IHRyYW5zcG9ydExvZ2ljLmFkZFFzKHByZXBhcmVkVXJsLCBjb25uZWN0aW9uLnFzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFVybCArPSBcIiZjb25uZWN0aW9uVG9rZW49XCIgKyB3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50KGNvbm5lY3Rpb24udG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFVybCArPSBcIiZjb25uZWN0aW9uRGF0YT1cIiArIHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQoY29ubmVjdGlvbi5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByZXBhcmVkVXJsO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZFFzOiBmdW5jdGlvbiAodXJsLCBxcykge1xyXG4gICAgICAgICAgICB2YXIgYXBwZW5kZXIgPSB1cmwuaW5kZXhPZihcIj9cIikgIT09IC0xID8gXCImXCIgOiBcIj9cIixcclxuICAgICAgICAgICAgICAgIGZpcnN0Q2hhcjtcclxuXHJcbiAgICAgICAgICAgIGlmICghcXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHFzKSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybCArIGFwcGVuZGVyICsgJC5wYXJhbShxcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHFzKSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgZmlyc3RDaGFyID0gcXMuY2hhckF0KDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09IFwiP1wiIHx8IGZpcnN0Q2hhciA9PT0gXCImXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBlbmRlciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybCArIGFwcGVuZGVyICsgcXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlF1ZXJ5IHN0cmluZyBwcm9wZXJ0eSBtdXN0IGJlIGVpdGhlciBhIHN0cmluZyBvciBvYmplY3QuXCIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEJVRyAjMjk1MzogVGhlIHVybCBuZWVkcyB0byBiZSBzYW1lIG90aGVyd2lzZSBpdCB3aWxsIGNhdXNlIGEgbWVtb3J5IGxlYWtcclxuICAgICAgICBnZXRVcmw6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCB0cmFuc3BvcnQsIHJlY29ubmVjdGluZywgcG9sbCwgYWpheFBvc3QpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PkdldHMgdGhlIHVybCBmb3IgbWFraW5nIGEgR0VUIGJhc2VkIGNvbm5lY3QgcmVxdWVzdDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSB0cmFuc3BvcnQgPT09IFwid2ViU29ja2V0c1wiID8gXCJcIiA6IGNvbm5lY3Rpb24uYmFzZVVybCxcclxuICAgICAgICAgICAgICAgIHVybCA9IGJhc2VVcmwgKyBjb25uZWN0aW9uLmFwcFJlbGF0aXZlVXJsLFxyXG4gICAgICAgICAgICAgICAgcXMgPSBcInRyYW5zcG9ydD1cIiArIHRyYW5zcG9ydDtcclxuXHJcbiAgICAgICAgICAgIGlmICghYWpheFBvc3QgJiYgY29ubmVjdGlvbi5ncm91cHNUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgcXMgKz0gXCImZ3JvdXBzVG9rZW49XCIgKyB3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50KGNvbm5lY3Rpb24uZ3JvdXBzVG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiL2Nvbm5lY3RcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbG9uZ1BvbGxpbmcgdHJhbnNwb3J0IHNwZWNpZmljXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9IFwiL3BvbGxcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9IFwiL3JlY29ubmVjdFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYWpheFBvc3QgJiYgY29ubmVjdGlvbi5tZXNzYWdlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBxcyArPSBcIiZtZXNzYWdlSWQ9XCIgKyB3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50KGNvbm5lY3Rpb24ubWVzc2FnZUlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cmwgKz0gXCI/XCIgKyBxcztcclxuICAgICAgICAgICAgdXJsID0gdHJhbnNwb3J0TG9naWMucHJlcGFyZVF1ZXJ5U3RyaW5nKGNvbm5lY3Rpb24sIHVybCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFqYXhQb3N0KSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImdGlkPVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1heGltaXplUGVyc2lzdGVudFJlc3BvbnNlOiBmdW5jdGlvbiAobWluUGVyc2lzdGVudFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBNZXNzYWdlSWQ6IG1pblBlcnNpc3RlbnRSZXNwb25zZS5DLFxyXG4gICAgICAgICAgICAgICAgTWVzc2FnZXM6IG1pblBlcnNpc3RlbnRSZXNwb25zZS5NLFxyXG4gICAgICAgICAgICAgICAgSW5pdGlhbGl6ZWQ6IHR5cGVvZiAobWluUGVyc2lzdGVudFJlc3BvbnNlLlMpICE9PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgU2hvdWxkUmVjb25uZWN0OiB0eXBlb2YgKG1pblBlcnNpc3RlbnRSZXNwb25zZS5UKSAhPT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIExvbmdQb2xsRGVsYXk6IG1pblBlcnNpc3RlbnRSZXNwb25zZS5MLFxyXG4gICAgICAgICAgICAgICAgR3JvdXBzVG9rZW46IG1pblBlcnNpc3RlbnRSZXNwb25zZS5HXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlR3JvdXBzOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZ3JvdXBzVG9rZW4pIHtcclxuICAgICAgICAgICAgaWYgKGdyb3Vwc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmdyb3Vwc1Rva2VuID0gZ3JvdXBzVG9rZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdHJpbmdpZnlTZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChtZXNzYWdlKSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgKG1lc3NhZ2UpID09PSBcInVuZGVmaW5lZFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmpzb24uc3RyaW5naWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFqYXhTZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgcGF5bG9hZCA9IHRyYW5zcG9ydExvZ2ljLnN0cmluZ2lmeVNlbmQoY29ubmVjdGlvbiwgZGF0YSksXHJcbiAgICAgICAgICAgICAgICB1cmwgPSBnZXRBamF4VXJsKGNvbm5lY3Rpb24sIFwiL3NlbmRcIiksXHJcbiAgICAgICAgICAgICAgICB4aHIsXHJcbiAgICAgICAgICAgICAgICBvbkZhaWwgPSBmdW5jdGlvbiAoZXJyb3IsIGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKHNpZ25hbFIucmVzb3VyY2VzLnNlbmRGYWlsZWQsIGNvbm5lY3Rpb24udHJhbnNwb3J0LCBlcnJvciwgeGhyKSwgZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICAgICB4aHIgPSB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogY29ubmVjdGlvbi5hamF4RGF0YVR5cGUgPT09IFwianNvbnBcIiA/IFwiR0VUXCIgOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBzaWduYWxSLl8uZGVmYXVsdENvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHBheWxvYWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsKGVycm9yLCBjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy50cmlnZ2VyUmVjZWl2ZWQoY29ubmVjdGlvbiwgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvciwgdGV4dFN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSBcImFib3J0XCIgfHwgdGV4dFN0YXR1cyA9PT0gXCJwYXJzZXJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBwYXJzZXJlcnJvciBoYXBwZW5zIGZvciBzZW5kcyB0aGF0IGRvbid0IHJldHVybiBhbnkgZGF0YSwgYW5kIGhlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IHdyaXRlIHRoZSBqc29ucCBjYWxsYmFjayB0byB0aGUgcmVzcG9uc2UuIFRoaXMgaXMgaGFyZGVyIHRvIGZpeCBvbiB0aGUgc2VydmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIGp1c3QgaGFjayBhcm91bmQgaXQgb24gdGhlIGNsaWVudCBmb3Igbm93LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWwoZXJyb3IsIGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWpheEFib3J0OiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29ubmVjdGlvbi50cmFuc3BvcnQpID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFzeW5jIGJ5IGRlZmF1bHQgdW5sZXNzIGV4cGxpY2l0bHkgb3ZlcmlkZGVuXHJcbiAgICAgICAgICAgIGFzeW5jID0gdHlwZW9mIGFzeW5jID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IGFzeW5jO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVybCA9IGdldEFqYXhVcmwoY29ubmVjdGlvbiwgXCIvYWJvcnRcIik7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IGFzeW5jLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dDogMTAwMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJGaXJlZCBhamF4IGFib3J0IGFzeW5jID0gXCIgKyBhc3luYyArIFwiLlwiKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhamF4U3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdmFyIHJlamVjdERlZmVycmVkID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gY29ubmVjdGlvbi5fZGVmZXJyYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmVycmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJTdGFydEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJUaGUgc3RhcnQgcmVxdWVzdCBmYWlsZWQuIFN0b3BwaW5nIHRoZSBjb25uZWN0aW9uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3REZWZlcnJlZChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLnN0YXJ0UmVxdWVzdCA9IHRyYW5zcG9ydExvZ2ljLmFqYXgoY29ubmVjdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBnZXRBamF4VXJsKGNvbm5lY3Rpb24sIFwiL3N0YXJ0XCIpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCwgc3RhdHVzVGV4dCwgeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclN0YXJ0RXJyb3Ioc2lnbmFsUi5fLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5lcnJvclBhcnNpbmdTdGFydFJlc3BvbnNlLCByZXN1bHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsIHhocikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5SZXNwb25zZSA9PT0gXCJzdGFydGVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclN0YXJ0RXJyb3Ioc2lnbmFsUi5fLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5pbnZhbGlkU3RhcnRSZXNwb25zZSwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgLyogZXJyb3IgKi8sIHhocikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzVGV4dCwgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzVGV4dCAhPT0gc3RhcnRBYm9ydFRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclN0YXJ0RXJyb3Ioc2lnbmFsUi5fLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMuZXJyb3JEdXJpbmdTdGFydFJlcXVlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciwgeGhyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCBoYXMgYmVlbiBjYWxsZWQsIG5vIG5lZWQgdG8gdHJpZ2dlciB0aGUgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBzdG9wIHRoZSBjb25uZWN0aW9uIGFnYWluIHdpdGggb25TdGFydEVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVGhlIHN0YXJ0IHJlcXVlc3QgYWJvcnRlZCBiZWNhdXNlIGNvbm5lY3Rpb24uc3RvcCgpIHdhcyBjYWxsZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3REZWZlcnJlZChzaWduYWxSLl8uZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy5zdG9wcGVkRHVyaW5nU3RhcnRSZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAvKiBlcnJvciAqLywgeGhyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cnlBYm9ydFN0YXJ0UmVxdWVzdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uXy5zdGFydFJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCByZXF1ZXN0IGhhcyBhbHJlYWR5IGNvbXBsZXRlZCB0aGlzIHdpbGwgbm9vcC5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5zdGFydFJlcXVlc3QuYWJvcnQoc3RhcnRBYm9ydFRleHQpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5zdGFydFJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0cnlJbml0aWFsaXplOiBmdW5jdGlvbiAocGVyc2lzdGVudFJlc3BvbnNlLCBvbkluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJzaXN0ZW50UmVzcG9uc2UuSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgIG9uSW5pdGlhbGl6ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyaWdnZXJSZWNlaXZlZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25uZWN0aW9uLl8uY29ubmVjdGluZ01lc3NhZ2VCdWZmZXIudHJ5QnVmZmVyKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY2VpdmVkLCBbZGF0YV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJvY2Vzc01lc3NhZ2VzOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgbWluRGF0YSwgb25Jbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgbGFzdCBtZXNzYWdlIHRpbWUgc3RhbXBcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMubWFya0xhc3RNZXNzYWdlKGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1pbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0cmFuc3BvcnRMb2dpYy5tYXhpbWl6ZVBlcnNpc3RlbnRSZXNwb25zZShtaW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy51cGRhdGVHcm91cHMoY29ubmVjdGlvbiwgZGF0YS5Hcm91cHNUb2tlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuTWVzc2FnZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5tZXNzYWdlSWQgPSBkYXRhLk1lc3NhZ2VJZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5NZXNzYWdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLk1lc3NhZ2VzLCBmdW5jdGlvbiAoaW5kZXgsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMudHJpZ2dlclJlY2VpdmVkKGNvbm5lY3Rpb24sIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy50cnlJbml0aWFsaXplKGRhdGEsIG9uSW5pdGlhbGl6ZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9uaXRvcktlZXBBbGl2ZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGtlZXBBbGl2ZURhdGEgPSBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgaW5pdGlhdGVkIHRoZSBrZWVwIGFsaXZlIHRpbWVvdXRzIHRoZW4gd2UgbmVlZCB0b1xyXG4gICAgICAgICAgICBpZiAoIWtlZXBBbGl2ZURhdGEubW9uaXRvcmluZykge1xyXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS5tb25pdG9yaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5tYXJrTGFzdE1lc3NhZ2UoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSB0aGUgZnVuY3Rpb24gc28gd2UgY2FuIHVuYmluZCBpdCBvbiBzdG9wXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ua2VlcEFsaXZlRGF0YS5yZWNvbm5lY3RLZWVwQWxpdmVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFyayBhIG5ldyBtZXNzYWdlIHNvIHRoYXQga2VlcCBhbGl2ZSBkb2Vzbid0IHRpbWUgb3V0IGNvbm5lY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMubWFya0xhc3RNZXNzYWdlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgS2VlcCBhbGl2ZSBvbiByZWNvbm5lY3RcclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikuYmluZChldmVudHMub25SZWNvbm5lY3QsIGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLnJlY29ubmVjdEtlZXBBbGl2ZVVwZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJOb3cgbW9uaXRvcmluZyBrZWVwIGFsaXZlIHdpdGggYSB3YXJuaW5nIHRpbWVvdXQgb2YgXCIgKyBrZWVwQWxpdmVEYXRhLnRpbWVvdXRXYXJuaW5nICsgXCIsIGtlZXAgYWxpdmUgdGltZW91dCBvZiBcIiArIGtlZXBBbGl2ZURhdGEudGltZW91dCArIFwiIGFuZCBkaXNjb25uZWN0aW5nIHRpbWVvdXQgb2YgXCIgKyBjb25uZWN0aW9uLmRpc2Nvbm5lY3RUaW1lb3V0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVHJpZWQgdG8gbW9uaXRvciBrZWVwIGFsaXZlIGJ1dCBpdCdzIGFscmVhZHkgYmVpbmcgbW9uaXRvcmVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3BNb25pdG9yaW5nS2VlcEFsaXZlOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIga2VlcEFsaXZlRGF0YSA9IGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhO1xyXG5cclxuICAgICAgICAgICAgLy8gT25seSBhdHRlbXB0IHRvIHN0b3AgdGhlIGtlZXAgYWxpdmUgbW9uaXRvcmluZyBpZiBpdHMgYmVpbmcgbW9uaXRvcmVkXHJcbiAgICAgICAgICAgIGlmIChrZWVwQWxpdmVEYXRhLm1vbml0b3JpbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0b3AgbW9uaXRvcmluZ1xyXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlRGF0YS5tb25pdG9yaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB1cGRhdGVLZWVwQWxpdmUgZnVuY3Rpb24gZnJvbSB0aGUgcmVjb25uZWN0IGV2ZW50XHJcbiAgICAgICAgICAgICAgICAkKGNvbm5lY3Rpb24pLnVuYmluZChldmVudHMub25SZWNvbm5lY3QsIGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhLnJlY29ubmVjdEtlZXBBbGl2ZVVwZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgYWxsIHRoZSBrZWVwIGFsaXZlIGRhdGFcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5rZWVwQWxpdmVEYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlN0b3BwaW5nIHRoZSBtb25pdG9yaW5nIG9mIHRoZSBrZWVwIGFsaXZlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0SGVhcnRiZWF0OiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGJlYXQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWFya0xhc3RNZXNzYWdlOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8ubGFzdE1lc3NhZ2VBdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1hcmtBY3RpdmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzQ29ubmVjdGVkT3JSZWNvbm5lY3Rpbmc6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQgfHxcclxuICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RhdGUgPT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbnN1cmVSZWNvbm5lY3RpbmdTdGF0ZTogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZVN0YXRlKGNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25SZWNvbm5lY3RpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5yZWNvbm5lY3Rpbmc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xlYXJSZWNvbm5lY3RUaW1lb3V0OiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLl8ucmVjb25uZWN0VGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChjb25uZWN0aW9uLl8ucmVjb25uZWN0VGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLnJlY29ubmVjdFRpbWVvdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB2ZXJpZnlMYXN0QWN0aXZlOiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBjb25uZWN0aW9uLl8ubGFzdEFjdGl2ZUF0ID49IGNvbm5lY3Rpb24ucmVjb25uZWN0V2luZG93KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNpZ25hbFIuXy5mb3JtYXQoc2lnbmFsUi5yZXNvdXJjZXMucmVjb25uZWN0V2luZG93VGltZW91dCwgbmV3IERhdGUoY29ubmVjdGlvbi5fLmxhc3RBY3RpdmVBdCksIGNvbm5lY3Rpb24ucmVjb25uZWN0V2luZG93KTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3NpZ25hbFIuXy5lcnJvcihtZXNzYWdlLCAvKiBzb3VyY2UgKi8gXCJUaW1lb3V0RXhjZXB0aW9uXCIpXSk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnN0b3AoLyogYXN5bmMgKi8gZmFsc2UsIC8qIG5vdGlmeVNlcnZlciAqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIHRyYW5zcG9ydE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHNpZ25hbFIudHJhbnNwb3J0c1t0cmFuc3BvcnROYW1lXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdlIHNob3VsZCBvbmx5IHNldCBhIHJlY29ubmVjdFRpbWVvdXQgaWYgd2UgYXJlIGN1cnJlbnRseSBjb25uZWN0ZWRcclxuICAgICAgICAgICAgLy8gYW5kIGEgcmVjb25uZWN0VGltZW91dCBpc24ndCBhbHJlYWR5IHNldC5cclxuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydExvZ2ljLmlzQ29ubmVjdGVkT3JSZWNvbm5lY3RpbmcoY29ubmVjdGlvbikgJiYgIWNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBOZWVkIHRvIHZlcmlmeSBiZWZvcmUgdGhlIHNldFRpbWVvdXQgb2NjdXJzIGJlY2F1c2UgYW4gYXBwbGljYXRpb24gc2xlZXAgY291bGQgb2NjdXIgZHVyaW5nIHRoZSBzZXRUaW1lb3V0IGR1cmF0aW9uLlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0TG9naWMudmVyaWZ5TGFzdEFjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc3RvcChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydExvZ2ljLmVuc3VyZVJlY29ubmVjdGluZ1N0YXRlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKHRyYW5zcG9ydE5hbWUgKyBcIiByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc3RhcnQoY29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgY29ubmVjdGlvbi5yZWNvbm5lY3REZWxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVQYXJzZUZhaWx1cmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCByZXN1bHQsIGVycm9yLCBvbkZhaWxlZCwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgd3JhcHBlZEVycm9yID0gc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5fLmZvcm1hdChzaWduYWxSLnJlc291cmNlcy5wYXJzZUZhaWxlZCwgcmVzdWx0KSxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIGluIHRoZSBpbml0aWFsaXphdGlvbiBwaGFzZSB0cmlnZ2VyIG9uRmFpbGVkLCBvdGhlcndpc2Ugc3RvcCB0aGUgY29ubmVjdGlvbi5cclxuICAgICAgICAgICAgaWYgKG9uRmFpbGVkICYmIG9uRmFpbGVkKHdyYXBwZWRFcnJvcikpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRmFpbGVkIHRvIHBhcnNlIHNlcnZlciByZXNwb25zZSB3aGlsZSBhdHRlbXB0aW5nIHRvIGNvbm5lY3QuXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChjb25uZWN0aW9uKS50cmlnZ2VySGFuZGxlcihldmVudHMub25FcnJvciwgW3dyYXBwZWRFcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0SGFuZGxlcjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbml0SGFuZGxlcihjb25uZWN0aW9uKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmb3JldmVyRnJhbWU6IHtcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25zOiB7fVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KHdpbmRvdy5qUXVlcnksIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLndlYlNvY2tldHMuanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgT3BlbiBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gU2VlIExpY2Vuc2UubWQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIudHJhbnNwb3J0cy5jb21tb24uanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBzaWduYWxSID0gJC5zaWduYWxSLFxyXG4gICAgICAgIGV2ZW50cyA9ICQuc2lnbmFsUi5ldmVudHMsXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSAkLnNpZ25hbFIuY2hhbmdlU3RhdGUsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWMgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljO1xyXG5cclxuICAgIHNpZ25hbFIudHJhbnNwb3J0cy53ZWJTb2NrZXRzID0ge1xyXG4gICAgICAgIG5hbWU6IFwid2ViU29ja2V0c1wiLFxyXG5cclxuICAgICAgICBzdXBwb3J0c0tlZXBBbGl2ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kOiBmdW5jdGlvbiAoY29ubmVjdGlvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgcGF5bG9hZCA9IHRyYW5zcG9ydExvZ2ljLnN0cmluZ2lmeVNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zb2NrZXQuc2VuZChwYXlsb2FkKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgW3NpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5yZXNvdXJjZXMud2ViU29ja2V0c0ludmFsaWRTdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi50cmFuc3BvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldFxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MsIG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwsXHJcbiAgICAgICAgICAgICAgICBvcGVuZWQgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgcmVjb25uZWN0aW5nID0gIW9uU3VjY2VzcyxcclxuICAgICAgICAgICAgICAgICRjb25uZWN0aW9uID0gJChjb25uZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghd2luZG93LldlYlNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25uZWN0aW9uLnNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24ud2ViU29ja2V0U2VydmVyVXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gY29ubmVjdGlvbi53ZWJTb2NrZXRTZXJ2ZXJVcmw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IGNvbm5lY3Rpb24ud3NQcm90b2NvbCArIGNvbm5lY3Rpb24uaG9zdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gdHJhbnNwb3J0TG9naWMuZ2V0VXJsKGNvbm5lY3Rpb24sIHRoaXMubmFtZSwgcmVjb25uZWN0aW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkNvbm5lY3RpbmcgdG8gd2Vic29ja2V0IGVuZHBvaW50ICdcIiArIHVybCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldCA9IG5ldyB3aW5kb3cuV2ViU29ja2V0KHVybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJXZWJzb2NrZXQgb3BlbmVkLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuY2xlYXJSZWNvbm5lY3RUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlU3RhdGUoY29ubmVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb25uZWN0aW9uLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vblJlY29ubmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGhhbmRsZSBhIHNvY2tldCBjbG9zZSBpZiB0aGUgY2xvc2UgaXMgZnJvbSB0aGUgY3VycmVudCBzb2NrZXQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU29tZXRpbWVzIG9uIGRpc2Nvbm5lY3QgdGhlIHNlcnZlciB3aWxsIHB1c2ggZG93biBhbiBvbmNsb3NlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gYW4gZXhwaXJlZCBzb2NrZXQuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSBjb25uZWN0aW9uLnNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVkICYmIHR5cGVvZiBldmVudC53YXNDbGVhbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBldmVudC53YXNDbGVhbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElkZWFsbHkgdGhpcyB3b3VsZCB1c2UgdGhlIHdlYnNvY2tldC5vbmVycm9yIGhhbmRsZXIgKHJhdGhlciB0aGFuIGNoZWNraW5nIHdhc0NsZWFuIGluIG9uY2xvc2UpIGJ1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSSBmb3VuZCBpbiBzb21lIGNpcmN1bXN0YW5jZXMgQ2hyb21lIHdvbid0IGNhbGwgb25lcnJvci4gVGhpcyBpbXBsZW1lbnRhdGlvbiBzZWVtcyB0byB3b3JrIG9uIGFsbCBicm93c2Vycy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIucmVzb3VyY2VzLndlYlNvY2tldENsb3NlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJVbmNsZWFuIGRpc2Nvbm5lY3QgZnJvbSB3ZWJzb2NrZXQ6IFwiICsgKGV2ZW50LnJlYXNvbiB8fCBcIltubyByZWFzb24gZ2l2ZW5dLlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIldlYnNvY2tldCBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9uRmFpbGVkIHx8ICFvbkZhaWxlZChlcnJvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5oYW5kbGVQYXJzZUZhaWx1cmUoY29ubmVjdGlvbiwgZXZlbnQuZGF0YSwgZXJyb3IsIG9uRmFpbGVkLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhdGEuTSBpcyBQZXJzaXN0ZW50UmVzcG9uc2UuTWVzc2FnZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNFbXB0eU9iamVjdChkYXRhKSB8fCBkYXRhLk0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLnByb2Nlc3NNZXNzYWdlcyhjb25uZWN0aW9uLCBkYXRhLCBvblN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHdlYnNvY2tldHMgd2UgbmVlZCB0byB0cmlnZ2VyIG9uUmVjZWl2ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciBjYWxsYmFja3MgdG8gb3V0Z29pbmcgaHViIGNhbGxzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMudHJpZ2dlclJlY2VpdmVkKGNvbm5lY3Rpb24sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY29ubmVjdDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucmVjb25uZWN0KGNvbm5lY3Rpb24sIHRoaXMubmFtZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9zdENvbm5lY3Rpb246IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIERvbid0IHRyaWdnZXIgYSByZWNvbm5lY3QgYWZ0ZXIgc3RvcHBpbmdcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuY2xlYXJSZWNvbm5lY3RUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc29ja2V0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkNsb3NpbmcgdGhlIFdlYnNvY2tldC5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zb2NrZXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBhc3luYykge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4QWJvcnQoY29ubmVjdGlvbiwgYXN5bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KHdpbmRvdy5qUXVlcnksIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLnNlcnZlclNlbnRFdmVudHMuanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgT3BlbiBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gU2VlIExpY2Vuc2UubWQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIudHJhbnNwb3J0cy5jb21tb24uanNcIiAvPlxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIHZhciBzaWduYWxSID0gJC5zaWduYWxSLFxyXG4gICAgICAgIGV2ZW50cyA9ICQuc2lnbmFsUi5ldmVudHMsXHJcbiAgICAgICAgY2hhbmdlU3RhdGUgPSAkLnNpZ25hbFIuY2hhbmdlU3RhdGUsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWMgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljLFxyXG4gICAgICAgIGNsZWFyUmVjb25uZWN0QXR0ZW1wdFRpbWVvdXQgPSBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RBdHRlbXB0VGltZW91dEhhbmRsZSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8ucmVjb25uZWN0QXR0ZW1wdFRpbWVvdXRIYW5kbGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBzaWduYWxSLnRyYW5zcG9ydHMuc2VydmVyU2VudEV2ZW50cyA9IHtcclxuICAgICAgICBuYW1lOiBcInNlcnZlclNlbnRFdmVudHNcIixcclxuXHJcbiAgICAgICAgc3VwcG9ydHNLZWVwQWxpdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdGltZU91dDogMzAwMCxcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MsIG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIG9wZW5lZCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24gPSAkKGNvbm5lY3Rpb24pLFxyXG4gICAgICAgICAgICAgICAgcmVjb25uZWN0aW5nID0gIW9uU3VjY2VzcyxcclxuICAgICAgICAgICAgICAgIHVybDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRoZSBjb25uZWN0aW9uIGFscmVhZHkgaGFzIGFuIGV2ZW50IHNvdXJjZS4gU3RvcHBpbmcgaXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghd2luZG93LkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgU1NFLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1cmwgPSB0cmFuc3BvcnRMb2dpYy5nZXRVcmwoY29ubmVjdGlvbiwgdGhpcy5uYW1lLCByZWNvbm5lY3RpbmcpO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQXR0ZW1wdGluZyB0byBjb25uZWN0IHRvIFNTRSBlbmRwb2ludCAnXCIgKyB1cmwgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5ldmVudFNvdXJjZSA9IG5ldyB3aW5kb3cuRXZlbnRTb3VyY2UodXJsLCB7IHdpdGhDcmVkZW50aWFsczogY29ubmVjdGlvbi53aXRoQ3JlZGVudGlhbHMgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRXZlbnRTb3VyY2UgZmFpbGVkIHRyeWluZyB0byBjb25uZWN0IHdpdGggZXJyb3IgXCIgKyBlLk1lc3NhZ2UgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY29ubmVjdGlvbiBmYWlsZWQsIGNhbGwgdGhlIGZhaWxlZCBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRjb25uZWN0aW9uLnRyaWdnZXJIYW5kbGVyKGV2ZW50cy5vbkVycm9yLCBbc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKHNpZ25hbFIucmVzb3VyY2VzLmV2ZW50U291cmNlRmFpbGVkVG9Db25uZWN0LCBjb25uZWN0aW9uLnRyYW5zcG9ydCwgZSldKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIHdlcmUgcmVjb25uZWN0aW5nLCByYXRoZXIgdGhhbiBkb2luZyBpbml0aWFsIGNvbm5lY3QsIHRoZW4gdHJ5IHJlY29ubmVjdCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlY29ubmVjdChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RBdHRlbXB0VGltZW91dEhhbmRsZSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSByZWNvbm5lY3RpbmcgYW5kIHRoZSBldmVudCBzb3VyY2UgaXMgYXR0ZW1wdGluZyB0byBjb25uZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBrZWVwIHJldHJ5aW5nLiBUaGlzIGNhdXNlcyBkdXBsaWNhdGUgY29ubmVjdGlvbnMgdG8gc3Bhd24uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmV2ZW50U291cmNlLnJlYWR5U3RhdGUgIT09IHdpbmRvdy5FdmVudFNvdXJjZS5PUEVOKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSB3ZXJlIHJlY29ubmVjdGluZywgcmF0aGVyIHRoYW4gZG9pbmcgaW5pdGlhbCBjb25uZWN0LCB0aGVuIHRyeSByZWNvbm5lY3QgYWdhaW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRoYXQudGltZU91dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRXZlbnRTb3VyY2UgY29ubmVjdGVkLlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclJlY29ubmVjdEF0dGVtcHRUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuY2xlYXJSZWNvbm5lY3RUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcGVuZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVN0YXRlKGNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLmNvbm5lY3RlZCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24udHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyBtZXNzYWdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YSA9PT0gXCJpbml0aWFsaXplZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gY29ubmVjdGlvbi5fcGFyc2VSZXNwb25zZShlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuaGFuZGxlUGFyc2VGYWlsdXJlKGNvbm5lY3Rpb24sIGUuZGF0YSwgZXJyb3IsIG9uRmFpbGVkLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucHJvY2Vzc01lc3NhZ2VzKGNvbm5lY3Rpb24sIHJlcywgb25TdWNjZXNzKTtcclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5ldmVudFNvdXJjZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHNpZ25hbFIuXy50cmFuc3BvcnRFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBzaWduYWxSLnJlc291cmNlcy5ldmVudFNvdXJjZUVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24udHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgIGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgaGFuZGxlIGFuIGVycm9yIGlmIHRoZSBlcnJvciBpcyBmcm9tIHRoZSBjdXJyZW50IEV2ZW50IFNvdXJjZS5cclxuICAgICAgICAgICAgICAgIC8vIFNvbWV0aW1lcyBvbiBkaXNjb25uZWN0IHRoZSBzZXJ2ZXIgd2lsbCBwdXNoIGRvd24gYW4gZXJyb3IgZXZlbnRcclxuICAgICAgICAgICAgICAgIC8vIHRvIGFuIGV4cGlyZWQgRXZlbnQgU291cmNlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgIT09IGNvbm5lY3Rpb24uZXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkICYmIG9uRmFpbGVkKGVycm9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIHJlYWR5U3RhdGU6IFwiICsgY29ubmVjdGlvbi5ldmVudFNvdXJjZS5yZWFkeVN0YXRlICsgXCIuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlLmV2ZW50UGhhc2UgPT09IHdpbmRvdy5FdmVudFNvdXJjZS5DTE9TRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCB1c2UgdGhlIEV2ZW50U291cmNlJ3MgbmF0aXZlIHJlY29ubmVjdCBmdW5jdGlvbiBhcyBpdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXNuJ3QgYWxsb3cgdXMgdG8gY2hhbmdlIHRoZSBVUkwgd2hlbiByZWNvbm5lY3RpbmcuIFdlIG5lZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyB0byBjaGFuZ2UgdGhlIFVSTCB0byBub3QgaW5jbHVkZSB0aGUgL2Nvbm5lY3Qgc3VmZml4LCBhbmQgcGFzc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsYXN0IG1lc3NhZ2UgaWQgd2UgcmVjZWl2ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFdmVudFNvdXJjZSByZWNvbm5lY3RpbmcgZHVlIHRvIHRoZSBzZXJ2ZXIgY29ubmVjdGlvbiBlbmRpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25uZWN0aW9uIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJFdmVudFNvdXJjZSBlcnJvci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbm5lY3Rpb24udHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVjb25uZWN0OiBmdW5jdGlvbiAoY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5yZWNvbm5lY3QoY29ubmVjdGlvbiwgdGhpcy5uYW1lKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb3N0Q29ubmVjdGlvbjogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoY29ubmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuYWpheFNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBhIHJlY29ubmVjdCBhZnRlciBzdG9wcGluZ1xyXG4gICAgICAgICAgICBjbGVhclJlY29ubmVjdEF0dGVtcHRUaW1lb3V0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5jbGVhclJlY29ubmVjdFRpbWVvdXQoY29ubmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLmV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkV2ZW50U291cmNlIGNhbGxpbmcgY2xvc2UoKS5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmV2ZW50U291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmV2ZW50U291cmNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmV2ZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBhc3luYykge1xyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5hamF4QWJvcnQoY29ubmVjdGlvbiwgYXN5bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KHdpbmRvdy5qUXVlcnksIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmZvcmV2ZXJGcmFtZS5qcyAqL1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBPcGVuIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBTZWUgTGljZW5zZS5tZCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5cclxuLypnbG9iYWwgd2luZG93OmZhbHNlICovXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmNvbW1vbi5qc1wiIC8+XHJcblxyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgdmFyIHNpZ25hbFIgPSAkLnNpZ25hbFIsXHJcbiAgICAgICAgZXZlbnRzID0gJC5zaWduYWxSLmV2ZW50cyxcclxuICAgICAgICBjaGFuZ2VTdGF0ZSA9ICQuc2lnbmFsUi5jaGFuZ2VTdGF0ZSxcclxuICAgICAgICB0cmFuc3BvcnRMb2dpYyA9IHNpZ25hbFIudHJhbnNwb3J0cy5fbG9naWMsXHJcbiAgICAgICAgY3JlYXRlRnJhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBmcmFtZSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xyXG4gICAgICAgICAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInBvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDowO3Zpc2liaWxpdHk6aGlkZGVuO1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZyYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gVXNlZCB0byBwcmV2ZW50IGluZmluaXRlIGxvYWRpbmcgaWNvbiBzcGlucyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBpZVxyXG4gICAgICAgIC8vIFdlIGJ1aWxkIHRoaXMgb2JqZWN0IGluc2lkZSBhIGNsb3N1cmUgc28gd2UgZG9uJ3QgcG9sbHV0ZSB0aGUgcmVzdCBvZiAgIFxyXG4gICAgICAgIC8vIHRoZSBmb3JldmVyRnJhbWUgdHJhbnNwb3J0IHdpdGggdW5uZWNlc3NhcnkgZnVuY3Rpb25zL3V0aWxpdGllcy5cclxuICAgICAgICBsb2FkUHJldmVudGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxvYWRpbmdGaXhJbnRlcnZhbElkID0gbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdGaXhJbnRlcnZhbCA9IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBhdHRhY2hlZFRvID0gMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBhZGRpdGlvbmFsIGlmcmFtZSByZW1vdmFsIHByb2NlZHVyZXMgZnJvbSBuZXdlciBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWduYWxSLl8uaWVWZXJzaW9uIDw9IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugb25seSBldmVyIHdhbnQgdG8gc2V0IHRoZSBpbnRlcnZhbCBvbmUgdGltZSwgc28gb24gdGhlIGZpcnN0IGF0dGFjaGVkVG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaGVkVG8gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgZGVzdHJveSBpZnJhbWUgZXZlcnkgMyBzZWNvbmRzIHRvIHByZXZlbnQgbG9hZGluZyBpY29uLCBzdXBlciBoYWNreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0ZpeEludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wRnJhbWUgPSBjcmVhdGVGcmFtZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZW1wRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRlbXBGcmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBsb2FkaW5nRml4SW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hlZFRvKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgY2xlYXIgdGhlIGludGVydmFsIGlmIHRoZXJlJ3Mgb25seSBvbmUgbW9yZSBvYmplY3QgdGhhdCB0aGUgbG9hZFByZXZlbnRlciBpcyBhdHRhY2hlZFRvXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaGVkVG8gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwobG9hZGluZ0ZpeEludGVydmFsSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFjaGVkVG8gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkVG8tLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICBzaWduYWxSLnRyYW5zcG9ydHMuZm9yZXZlckZyYW1lID0ge1xyXG4gICAgICAgIG5hbWU6IFwiZm9yZXZlckZyYW1lXCIsXHJcblxyXG4gICAgICAgIHN1cHBvcnRzS2VlcEFsaXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEFkZGVkIGFzIGEgdmFsdWUgaGVyZSBzbyB3ZSBjYW4gY3JlYXRlIHRlc3RzIHRvIHZlcmlmeSBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgaWZyYW1lQ2xlYXJUaHJlc2hvbGQ6IDUwLFxyXG5cclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIG9uU3VjY2Vzcywgb25GYWlsZWQpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVJZCA9ICh0cmFuc3BvcnRMb2dpYy5mb3JldmVyRnJhbWUuY291bnQgKz0gMSksXHJcbiAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICBmcmFtZSA9IGNyZWF0ZUZyYW1lKCksXHJcbiAgICAgICAgICAgICAgICBmcmFtZUxvYWRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRm9yZXZlciBmcmFtZSBpZnJhbWUgZmluaXNoZWQgbG9hZGluZyBhbmQgaXMgbm8gbG9uZ2VyIHJlY2VpdmluZyBtZXNzYWdlcy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvbkZhaWxlZCB8fCAhb25GYWlsZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlY29ubmVjdChjb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgU1NFLCBkb24ndCB1c2UgRm9yZXZlciBGcmFtZVxyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJGb3JldmVyIEZyYW1lIGlzIG5vdCBzdXBwb3J0ZWQgYnkgU2lnbmFsUiBvbiBicm93c2VycyB3aXRoIFNTRSBzdXBwb3J0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkZhaWxlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNpZ25hbHItY29ubmVjdGlvbi1pZFwiLCBjb25uZWN0aW9uLmlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IHByZXZlbnRpbmcgbG9hZGluZyBpY29uXHJcbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IHBlcmZvcm0gd29yayBpZiB0aGUgbG9hZFByZXZlbnRlciBpcyBub3QgYXR0YWNoZWQgdG8gYW5vdGhlciBjb25uZWN0aW9uLlxyXG4gICAgICAgICAgICBsb2FkUHJldmVudGVyLnByZXZlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSB1cmxcclxuICAgICAgICAgICAgdXJsID0gdHJhbnNwb3J0TG9naWMuZ2V0VXJsKGNvbm5lY3Rpb24sIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIHVybCArPSBcIiZmcmFtZUlkPVwiICsgZnJhbWVJZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBmcmFtZSB0byB0aGUgZG9jdW1lbnQgcHJpb3IgdG8gc2V0dGluZyBVUkwgdG8gYXZvaWQgY2FjaGluZyBpc3N1ZXMuXHJcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZnJhbWUpO1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJCaW5kaW5nIHRvIGlmcmFtZSdzIGxvYWQgZXZlbnQuXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZyYW1lTG9hZEhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmcmFtZS5hdHRhY2hFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgZnJhbWUuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgZnJhbWVMb2FkSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZyYW1lLnNyYyA9IHVybDtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuZm9yZXZlckZyYW1lLmNvbm5lY3Rpb25zW2ZyYW1lSWRdID0gY29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWUgPSBmcmFtZTtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5mcmFtZUlkID0gZnJhbWVJZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub25TdWNjZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiSWZyYW1lIHRyYW5zcG9ydCBzdGFydGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNvbm5lY3Q6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gdmVyaWZ5IGNvbm5lY3Rpb24gc3RhdGUgYW5kIHZlcmlmeSBiZWZvcmUgdGhlIHNldFRpbWVvdXQgb2NjdXJzIGJlY2F1c2UgYW4gYXBwbGljYXRpb24gc2xlZXAgY291bGQgb2NjdXIgZHVyaW5nIHRoZSBzZXRUaW1lb3V0IGR1cmF0aW9uLlxyXG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0TG9naWMuaXNDb25uZWN0ZWRPclJlY29ubmVjdGluZyhjb25uZWN0aW9uKSAmJiB0cmFuc3BvcnRMb2dpYy52ZXJpZnlMYXN0QWN0aXZlKGNvbm5lY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgd2UncmUgb2sgdG8gcmVjb25uZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0TG9naWMudmVyaWZ5TGFzdEFjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5mcmFtZSAmJiB0cmFuc3BvcnRMb2dpYy5lbnN1cmVSZWNvbm5lY3RpbmdTdGF0ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSBjb25uZWN0aW9uLmZyYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjID0gdHJhbnNwb3J0TG9naWMuZ2V0VXJsKGNvbm5lY3Rpb24sIHRoYXQubmFtZSwgdHJ1ZSkgKyBcIiZmcmFtZUlkPVwiICsgY29ubmVjdGlvbi5mcmFtZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIlVwZGF0aW5nIGlmcmFtZSBzcmMgdG8gJ1wiICsgc3JjICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUuc3JjID0gc3JjO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGNvbm5lY3Rpb24ucmVjb25uZWN0RGVsYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9zdENvbm5lY3Rpb246IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KGNvbm5lY3Rpb24pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhTZW5kKGNvbm5lY3Rpb24sIGRhdGEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlY2VpdmU6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjdyxcclxuICAgICAgICAgICAgICAgIGJvZHksXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmpzb24gIT09IGNvbm5lY3Rpb24uX29yaWdpbmFsSnNvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIGN1c3RvbSBKU09OIHBhcnNlciBjb25maWd1cmVkIHRoZW4gc2VyaWFsaXplIHRoZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZSBvcmlnaW5hbCAoYnJvd3NlcikgSlNPTiBwYXJzZXIgYW5kIHRoZW4gZGVzZXJpYWxpemUgaXQgdXNpbmdcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXN0b20gcGFyc2VyIChjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlIGRvZXMgdGhhdCkuIFRoaXMgaXMgc28gd2VcclxuICAgICAgICAgICAgICAgIC8vIGNhbiBlYXNpbHkgc2VuZCB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIGFzIFwicmF3XCIgSlNPTiBidXQgc3RpbGwgXHJcbiAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IGN1c3RvbSBKU09OIGRlc2VyaWFsaXphdGlvbiBpbiB0aGUgYnJvd3Nlci5cclxuICAgICAgICAgICAgICAgIGRhdGEgPSBjb25uZWN0aW9uLl9vcmlnaW5hbEpzb24uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZSA9IGNvbm5lY3Rpb24uX3BhcnNlUmVzcG9uc2UoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5wcm9jZXNzTWVzc2FnZXMoY29ubmVjdGlvbiwgcmVzcG9uc2UsIGNvbm5lY3Rpb24ub25TdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByb3RlY3QgYWdhaW5zdCBjb25uZWN0aW9uIHN0b3BwaW5nIGZyb20gYSBjYWxsYmFjayB0cmlnZ2VyIHdpdGhpbiB0aGUgcHJvY2Vzc01lc3NhZ2VzIGFib3ZlLlxyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi5zdGF0ZSA9PT0gJC5zaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgc2NyaXB0ICYgZGl2IGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmZyYW1lTWVzc2FnZUNvdW50ID0gKGNvbm5lY3Rpb24uZnJhbWVNZXNzYWdlQ291bnQgfHwgMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZnJhbWVNZXNzYWdlQ291bnQgPiBzaWduYWxSLnRyYW5zcG9ydHMuZm9yZXZlckZyYW1lLmlmcmFtZUNsZWFyVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5mcmFtZU1lc3NhZ2VDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY3cgPSBjb25uZWN0aW9uLmZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgY29ubmVjdGlvbi5mcmFtZS5jb250ZW50RG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN3ICYmIGN3LmRvY3VtZW50ICYmIGN3LmRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IGN3LmRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYWxsIHRoZSBjaGlsZCBlbGVtZW50cyBmcm9tIHRoZSBpZnJhbWUncyBib2R5IHRvIGNvbnNlcnZlciBtZW1vcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGJvZHkuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChib2R5LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGN3ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0b3AgYXR0ZW1wdGluZyB0byBwcmV2ZW50IGxvYWRpbmcgaWNvblxyXG4gICAgICAgICAgICBsb2FkUHJldmVudGVyLmNhbmNlbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmZyYW1lLnN0b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmZyYW1lLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3cgPSBjb25uZWN0aW9uLmZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgY29ubmVjdGlvbi5mcmFtZS5jb250ZW50RG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdy5kb2N1bWVudCAmJiBjdy5kb2N1bWVudC5leGVjQ29tbWFuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3cuZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJTdG9wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiRXJyb3Igb2NjdXJlZCB3aGVuIHN0b3BwaW5nIGZvcmV2ZXJGcmFtZSB0cmFuc3BvcnQuIE1lc3NhZ2UgPSBcIiArIGUubWVzc2FnZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSBpZnJhbWUgaXMgd2hlcmUgd2UgbGVmdCBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZnJhbWUucGFyZW50Tm9kZSA9PT0gd2luZG93LmRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb25uZWN0aW9uLmZyYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdHJhbnNwb3J0TG9naWMuZm9yZXZlckZyYW1lLmNvbm5lY3Rpb25zW2Nvbm5lY3Rpb24uZnJhbWVJZF07XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZnJhbWVJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5mcmFtZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLmZyYW1lSWQ7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5vblN1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5mcmFtZU1lc3NhZ2VDb3VudDtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiU3RvcHBpbmcgZm9yZXZlciBmcmFtZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhYm9ydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhBYm9ydChjb25uZWN0aW9uLCBhc3luYyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0Q29ubmVjdGlvbjogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc3BvcnRMb2dpYy5mb3JldmVyRnJhbWUuY29ubmVjdGlvbnNbaWRdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0ZWQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VTdGF0ZShjb25uZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkKSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoY29ubmVjdGlvbikudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KHdpbmRvdy5qUXVlcnksIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi50cmFuc3BvcnRzLmxvbmdQb2xsaW5nLmpzICovXHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IE9wZW4gVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFNlZSBMaWNlbnNlLm1kIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLnRyYW5zcG9ydHMuY29tbW9uLmpzXCIgLz5cclxuXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgc2lnbmFsUiA9ICQuc2lnbmFsUixcclxuICAgICAgICBldmVudHMgPSAkLnNpZ25hbFIuZXZlbnRzLFxyXG4gICAgICAgIGNoYW5nZVN0YXRlID0gJC5zaWduYWxSLmNoYW5nZVN0YXRlLFxyXG4gICAgICAgIGlzRGlzY29ubmVjdGluZyA9ICQuc2lnbmFsUi5pc0Rpc2Nvbm5lY3RpbmcsXHJcbiAgICAgICAgdHJhbnNwb3J0TG9naWMgPSBzaWduYWxSLnRyYW5zcG9ydHMuX2xvZ2ljO1xyXG5cclxuICAgIHNpZ25hbFIudHJhbnNwb3J0cy5sb25nUG9sbGluZyA9IHtcclxuICAgICAgICBuYW1lOiBcImxvbmdQb2xsaW5nXCIsXHJcblxyXG4gICAgICAgIHN1cHBvcnRzS2VlcEFsaXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWNvbm5lY3REZWxheTogMzAwMCxcclxuXHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBvblN1Y2Nlc3MsIG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5TdGFydHMgdGhlIGxvbmcgcG9sbGluZyBjb25uZWN0aW9uPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb25uZWN0aW9uXCIgdHlwZT1cInNpZ25hbFJcIj5UaGUgU2lnbmFsUiBjb25uZWN0aW9uIHRvIHN0YXJ0PC9wYXJhbT5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgZmlyZUNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyZUNvbm5lY3QgPSAkLm5vb3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiTG9uZ1BvbGxpbmcgY29ubmVjdGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0cnlGYWlsQ29ubmVjdCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZChlcnJvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJMb25nUG9sbGluZyBmYWlsZWQgdG8gY29ubmVjdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGVEYXRhID0gY29ubmVjdGlvbi5fLFxyXG4gICAgICAgICAgICAgICAgcmVjb25uZWN0RXJyb3JzID0gMCxcclxuICAgICAgICAgICAgICAgIGZpcmVSZWNvbm5lY3RlZCA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQocHJpdmF0ZURhdGEucmVjb25uZWN0VGltZW91dElkKTtcclxuICAgICAgICAgICAgICAgICAgICBwcml2YXRlRGF0YS5yZWNvbm5lY3RUaW1lb3V0SWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlU3RhdGUoaW5zdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUuY29ubmVjdGVkKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdWNjZXNzZnVsbHkgcmVjb25uZWN0ZWQhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmxvZyhcIlJhaXNpbmcgdGhlIHJlY29ubmVjdCBldmVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChpbnN0YW5jZSkudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gMSBob3VyXHJcbiAgICAgICAgICAgICAgICBtYXhGaXJlUmVjb25uZWN0ZWRUaW1lb3V0ID0gMzYwMDAwMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnBvbGxYaHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiUG9sbGluZyB4aHIgcmVxdWVzdHMgYWxyZWFkeSBleGlzdHMsIGFib3J0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLm1lc3NhZ2VJZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlRGF0YS5yZWNvbm5lY3RUaW1lb3V0SWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZURhdGEucG9sbFRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbiBwb2xsKGluc3RhbmNlLCByYWlzZVJlY29ubmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlSWQgPSBpbnN0YW5jZS5tZXNzYWdlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3QgPSAobWVzc2FnZUlkID09PSBudWxsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb25uZWN0aW5nID0gIWNvbm5lY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxpbmcgPSAhcmFpc2VSZWNvbm5lY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHRyYW5zcG9ydExvZ2ljLmdldFVybChpbnN0YW5jZSwgdGhhdC5uYW1lLCByZWNvbm5lY3RpbmcsIHBvbGxpbmcsIHRydWUgLyogdXNlIFBvc3QgZm9yIGxvbmdQb2xsaW5nICovKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLm1lc3NhZ2VJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0RGF0YS5tZXNzYWdlSWQgPSBpbnN0YW5jZS5tZXNzYWdlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuZ3JvdXBzVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdERhdGEuZ3JvdXBzVG9rZW4gPSBpbnN0YW5jZS5ncm91cHNUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGRpc2Nvbm5lY3RlZCBkdXJpbmcgdGhlIHRpbWUgd2UndmUgdHJpZWQgdG8gcmUtaW5zdGFudGlhdGUgdGhlIHBvbGwgdGhlbiBzdG9wLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rpc2Nvbm5lY3RpbmcoaW5zdGFuY2UpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiT3BlbmluZyBsb25nIHBvbGxpbmcgcmVxdWVzdCB0byAnXCIgKyB1cmwgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnBvbGxYaHIgPSB0cmFuc3BvcnRMb2dpYy5hamF4KGNvbm5lY3Rpb24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyRmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbnByb2dyZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMubWFya0xhc3RNZXNzYWdlKGNvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBzaWduYWxSLl8uZGVmYXVsdENvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBwb3N0RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogY29ubmVjdGlvbi5fLnBvbGxUaW1lb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWNvbm5lY3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJMb25nIHBvbGwgY29tcGxldGUuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IG91ciByZWNvbm5lY3QgZXJyb3JzIHNvIGlmIHdlIHRyYW5zaXRpb24gaW50byBhIHJlY29ubmVjdGluZyBzdGF0ZSBhZ2FpbiB3ZSB0cmlnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWNvbm5lY3RlZCBxdWlja2x5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RFcnJvcnMgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFueSBrZWVwLWFsaXZlcyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGEgPSBjb25uZWN0aW9uLl9wYXJzZVJlc3BvbnNlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRMb2dpYy5oYW5kbGVQYXJzZUZhaWx1cmUoaW5zdGFuY2UsIHJlc3VsdCwgZXJyb3IsIHRyeUZhaWxDb25uZWN0LCBpbnN0YW5jZS5wb2xsWGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBjdXJyZW50bHkgYSB0aW1lb3V0IHRvIHRyaWdnZXIgcmVjb25uZWN0LCBmaXJlIGl0IG5vdyBiZWZvcmUgcHJvY2Vzc2luZyBtZXNzYWdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVSZWNvbm5lY3RlZChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdHJhbnNwb3J0TG9naWMubWF4aW1pemVQZXJzaXN0ZW50UmVzcG9uc2UobWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMucHJvY2Vzc01lc3NhZ2VzKGluc3RhbmNlLCBtaW5EYXRhLCBmaXJlQ29ubmVjdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLnR5cGUoZGF0YS5Mb25nUG9sbERlbGF5KSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gZGF0YS5Mb25nUG9sbERlbGF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Rpc2Nvbm5lY3RpbmcoaW5zdGFuY2UpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZFJlY29ubmVjdCA9IGRhdGEgJiYgZGF0YS5TaG91bGRSZWNvbm5lY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkUmVjb25uZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJhbnNpdGlvbiBpbnRvIHRoZSByZWNvbm5lY3Rpbmcgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGZhaWxzIHRoZW4gdGhhdCBtZWFucyB0aGF0IHRoZSB1c2VyIHRyYW5zaXRpb25lZCB0aGUgY29ubmVjdGlvbiBpbnRvIGEgaW52YWxpZCBzdGF0ZSBpbiBwcm9jZXNzTWVzc2FnZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnRMb2dpYy5lbnN1cmVSZWNvbm5lY3RpbmdTdGF0ZShpbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBuZXZlciB3YW50IHRvIHBhc3MgYSByYWlzZVJlY29ubmVjdCBmbGFnIGFmdGVyIGEgc3VjY2Vzc2Z1bCBwb2xsLiAgVGhpcyBpcyBoYW5kbGVkIHZpYSB0aGUgZXJyb3IgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlRGF0YS5wb2xsVGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsKGluc3RhbmNlLCBzaG91bGRSZWNvbm5lY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sbChpbnN0YW5jZSwgc2hvdWxkUmVjb25uZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gc2lnbmFsUi5fLnRyYW5zcG9ydEVycm9yKHNpZ25hbFIucmVzb3VyY2VzLmxvbmdQb2xsRmFpbGVkLCBjb25uZWN0aW9uLnRyYW5zcG9ydCwgZGF0YSwgaW5zdGFuY2UucG9sbFhocik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0cnlpbmcgdG8gdHJpZ2dlciByZWNvbm5lY3QsIGNvbm5lY3Rpb24gaXMgaW4gYW4gZXJyb3Igc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCBpbiB0aGUgcmVjb25uZWN0IHN0YXRlIHRoaXMgd2lsbCBub29wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHByaXZhdGVEYXRhLnJlY29ubmVjdFRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlRGF0YS5yZWNvbm5lY3RUaW1lb3V0SWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSBcImFib3J0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkFib3J0ZWQgeGhyIHJlcXVlc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRyeUZhaWxDb25uZWN0KGVycm9yKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmNyZW1lbnQgb3VyIHJlY29ubmVjdCBlcnJvcnMsIHdlIGFzc3VtZSBhbGwgZXJyb3JzIHRvIGJlIHJlY29ubmVjdCBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbiB0aGUgY2FzZSB0aGF0IGl0J3Mgb3VyIGZpcnN0IGVycm9yIHRoaXMgd2lsbCBjYXVzZSBSZWNvbm5lY3QgdG8gYmUgZmlyZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciAxIHNlY29uZCBkdWUgdG8gcmVjb25uZWN0RXJyb3JzIGJlaW5nID0gMS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RFcnJvcnMrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uc3RhdGUgIT09IHNpZ25hbFIuY29ubmVjdGlvblN0YXRlLnJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkFuIGVycm9yIG9jY3VycmVkIHVzaW5nIGxvbmdQb2xsaW5nLiBTdGF0dXMgPSBcIiArIHRleHRTdGF0dXMgKyBcIi4gIFJlc3BvbnNlID0gXCIgKyBkYXRhLnJlc3BvbnNlVGV4dCArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChpbnN0YW5jZSkudHJpZ2dlckhhbmRsZXIoZXZlbnRzLm9uRXJyb3IsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2hlY2sgdGhlIHN0YXRlIGhlcmUgdG8gdmVyaWZ5IHRoYXQgd2UncmUgbm90IGluIGFuIGludmFsaWQgc3RhdGUgcHJpb3IgdG8gdmVyaWZ5aW5nIFJlY29ubmVjdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgaW4gY29ubmVjdGVkIG9yIHJlY29ubmVjdGluZyB0aGVuIHRoZSBuZXh0IGVuc3VyZVJlY29ubmVjdGluZ1N0YXRlIGNoZWNrIHdpbGwgZmFpbCBhbmQgd2lsbCByZXR1cm4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmVmb3JlIHdlIGRvbid0IHdhbnQgdG8gY2hhbmdlIHRoYXQgZmFpbHVyZSBjb2RlIHBhdGguXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb25uZWN0aW9uLnN0YXRlID09PSBzaWduYWxSLmNvbm5lY3Rpb25TdGF0ZS5jb25uZWN0ZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zdGF0ZSA9PT0gc2lnbmFsUi5jb25uZWN0aW9uU3RhdGUucmVjb25uZWN0aW5nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdHJhbnNwb3J0TG9naWMudmVyaWZ5TGFzdEFjdGl2ZShjb25uZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2l0aW9uIGludG8gdGhlIHJlY29ubmVjdGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgZmFpbHMgdGhlbiB0aGF0IG1lYW5zIHRoYXQgdGhlIHVzZXIgdHJhbnNpdGlvbmVkIHRoZSBjb25uZWN0aW9uIGludG8gdGhlIGRpc2Nvbm5lY3RlZCBvciBjb25uZWN0aW5nIHN0YXRlIHdpdGhpbiB0aGUgYWJvdmUgZXJyb3IgaGFuZGxlciB0cmlnZ2VyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0TG9naWMuZW5zdXJlUmVjb25uZWN0aW5nU3RhdGUoaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGwgcG9sbCB3aXRoIHRoZSByYWlzZVJlY29ubmVjdCBmbGFnIGFzIHRydWUgYWZ0ZXIgdGhlIHJlY29ubmVjdCBkZWxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGVEYXRhLnBvbGxUaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGwoaW5zdGFuY2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoYXQucmVjb25uZWN0RGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IGV2ZXIgcGFzcyBhZnRlciBhbiBlcnJvciBoYXMgb2NjdXJlZCB2aWEgdGhlIHBvbGwgYWpheCBwcm9jZWR1cmUuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29ubmVjdGluZyAmJiByYWlzZVJlY29ubmVjdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSB3YWl0IHRvIHJlY29ubmVjdCBkZXBlbmRpbmcgb24gaG93IG1hbnkgdGltZXMgd2UndmUgZmFpbGVkIHRvIHJlY29ubmVjdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBlc3NlbnRpYWxseSBhIGhldXJpc3RpYyB0aGF0IHdpbGwgZXhwb25lbnRpYWxseSBpbmNyZWFzZSBpbiB3YWl0IHRpbWUgYmVmb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyaWdnZXJpbmcgcmVjb25uZWN0ZWQuICBUaGlzIGRlcGVuZHMgb24gdGhlIFwiZXJyb3JcIiBoYW5kbGVyIG9mIFBvbGwgdG8gY2FuY2VsIHRoaXMgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRpbWVvdXQgaWYgaXQgdHJpZ2dlcnMgYmVmb3JlIHRoZSBSZWNvbm5lY3RlZCBldmVudCBmaXJlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIE1hdGgubWluIGF0IHRoZSBlbmQgaXMgdG8gZW5zdXJlIHRoYXQgdGhlIHJlY29ubmVjdCB0aW1lb3V0IGRvZXMgbm90IG92ZXJmbG93LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlRGF0YS5yZWNvbm5lY3RUaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGZpcmVSZWNvbm5lY3RlZChpbnN0YW5jZSk7IH0sIE1hdGgubWluKDEwMDAgKiAoTWF0aC5wb3coMiwgcmVjb25uZWN0RXJyb3JzKSAtIDEpLCBtYXhGaXJlUmVjb25uZWN0ZWRUaW1lb3V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfShjb25uZWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH0sIDI1MCk7IC8vIEhhdmUgdG8gZGVsYXkgaW5pdGlhbCBwb2xsIHNvIENocm9tZSBkb2Vzbid0IHNob3cgbG9hZGVyIHNwaW5uZXIgaW4gdGFiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9zdENvbm5lY3Rpb246IGZ1bmN0aW9uIChjb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnBvbGxYaHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucG9sbFhoci5hYm9ydChcImxvc3RDb25uZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgdHJhbnNwb3J0TG9naWMuYWpheFNlbmQoY29ubmVjdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlN0b3BzIHRoZSBsb25nIHBvbGxpbmcgY29ubmVjdGlvbjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY29ubmVjdGlvblwiIHR5cGU9XCJzaWduYWxSXCI+VGhlIFNpZ25hbFIgY29ubmVjdGlvbiB0byBzdG9wPC9wYXJhbT5cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY29ubmVjdGlvbi5fLnBvbGxUaW1lb3V0SWQpO1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb24uXy5yZWNvbm5lY3RUaW1lb3V0SWQpO1xyXG5cclxuICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5wb2xsVGltZW91dElkO1xyXG4gICAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbi5fLnJlY29ubmVjdFRpbWVvdXRJZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLnBvbGxYaHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ucG9sbFhoci5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5wb2xsWGhyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLnBvbGxYaHI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhYm9ydDogZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydExvZ2ljLmFqYXhBYm9ydChjb25uZWN0aW9uLCBhc3luYyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0od2luZG93LmpRdWVyeSwgd2luZG93KSk7XHJcbi8qIGpxdWVyeS5zaWduYWxSLmh1YnMuanMgKi9cclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgT3BlbiBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gU2VlIExpY2Vuc2UubWQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuXHJcbi8qZ2xvYmFsIHdpbmRvdzpmYWxzZSAqL1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianF1ZXJ5LnNpZ25hbFIuY29yZS5qc1wiIC8+XHJcblxyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgdmFyIGV2ZW50TmFtZXNwYWNlID0gXCIuaHViUHJveHlcIixcclxuICAgICAgICBzaWduYWxSID0gJC5zaWduYWxSO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VFdmVudE5hbWUoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQgKyBldmVudE5hbWVzcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFcXVpdmFsZW50IHRvIEFycmF5LnByb3RvdHlwZS5tYXBcclxuICAgIGZ1bmN0aW9uIG1hcChhcnIsIGZ1biwgdGhpc3ApIHtcclxuICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gYXJyLmxlbmd0aCxcclxuICAgICAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnIuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGZ1bi5jYWxsKHRoaXNwLCBhcnJbaV0sIGksIGFycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBcmdWYWx1ZShhKSB7XHJcbiAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihhKSA/IG51bGwgOiAoJC50eXBlKGEpID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc01lbWJlcnMob2JqKSB7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGFueSBwcm9wZXJ0aWVzIGluIG91ciBjYWxsYmFjayBtYXAgdGhlbiB3ZSBoYXZlIGNhbGxiYWNrcyBhbmQgY2FuIGV4aXQgdGhlIGxvb3AgdmlhIHJldHVyblxyXG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJJbnZvY2F0aW9uQ2FsbGJhY2tzKGNvbm5lY3Rpb24sIGVycm9yKSB7XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY29ubmVjdGlvblwiIHR5cGU9XCJodWJDb25uZWN0aW9uXCIgLz5cclxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja3MsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrO1xyXG5cclxuICAgICAgICBpZiAoaGFzTWVtYmVycyhjYWxsYmFja3MpKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiQ2xlYXJpbmcgaHViIGludm9jYXRpb24gY2FsbGJhY2tzIHdpdGggZXJyb3I6IFwiICsgZXJyb3IgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCB0aGUgY2FsbGJhY2sgY2FjaGUgbm93IGFzIHdlIGhhdmUgYSBsb2NhbCB2YXIgcmVmZXJlbmNpbmcgaXRcclxuICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrSWQgPSAwO1xyXG4gICAgICAgIGRlbGV0ZSBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrcztcclxuICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrcyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBMb29wIG92ZXIgdGhlIGNhbGxiYWNrcyBhbmQgaW52b2tlIHRoZW0uXHJcbiAgICAgICAgLy8gV2UgZG8gdGhpcyB1c2luZyBhIGxvY2FsIHZhciByZWZlcmVuY2UgYW5kICphZnRlciogd2UndmUgY2xlYXJlZCB0aGUgY2FjaGVcclxuICAgICAgICAvLyBzbyB0aGF0IGlmIGEgZmFpbCBjYWxsYmFjayBpdHNlbGYgdHJpZXMgdG8gaW52b2tlIGFub3RoZXIgbWV0aG9kIHdlIGRvbid0IFxyXG4gICAgICAgIC8vIGVuZCB1cCB3aXRoIGl0cyBjYWxsYmFjayBpbiB0aGUgbGlzdCB3ZSdyZSBsb29waW5nIG92ZXIuXHJcbiAgICAgICAgZm9yICh2YXIgY2FsbGJhY2tJZCBpbiBjYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFja3NbY2FsbGJhY2tJZF07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLm1ldGhvZC5jYWxsKGNhbGxiYWNrLnNjb3BlLCB7IEU6IGVycm9yIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBodWJQcm94eVxyXG4gICAgZnVuY3Rpb24gaHViUHJveHkoaHViQ29ubmVjdGlvbiwgaHViTmFtZSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIENyZWF0ZXMgYSBuZXcgcHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gaHViIGNvbm5lY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbnZva2VcclxuICAgICAgICAvLy8gICAgIG1ldGhvZHMgb24gc2VydmVyIGh1YnMgYW5kIGhhbmRsZSBjbGllbnQgbWV0aG9kIGludm9jYXRpb24gcmVxdWVzdHMgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcmV0dXJuIG5ldyBodWJQcm94eS5mbi5pbml0KGh1YkNvbm5lY3Rpb24sIGh1Yk5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGh1YlByb3h5LmZuID0gaHViUHJveHkucHJvdG90eXBlID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjb25uZWN0aW9uLCBodWJOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5odWJOYW1lID0gaHViTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5fID0ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYXA6IHt9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGh1YlByb3h5LFxyXG5cclxuICAgICAgICBoYXNTdWJzY3JpcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoYXNNZW1iZXJzKHRoaXMuXy5jYWxsYmFja01hcCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb246IGZ1bmN0aW9uIChldmVudE5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5XaXJlcyB1cCBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBhIGludm9jYXRpb24gcmVxdWVzdCBpcyByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIgaHViLjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXZlbnROYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBodWIgZXZlbnQgdG8gcmVnaXN0ZXIgdGhlIGNhbGxiYWNrIGZvci48L3BhcmFtPlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYWxsYmFja1wiIHR5cGU9XCJGdW5jdGlvblwiPlRoZSBjYWxsYmFjayB0byBiZSBpbnZva2VkLjwvcGFyYW0+XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrTWFwID0gdGhhdC5fLmNhbGxiYWNrTWFwO1xyXG5cclxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBldmVudCBuYW1lIHRvIGxvd2VyY2FzZVxyXG4gICAgICAgICAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vdCBhbiBldmVudCByZWdpc3RlcmVkIGZvciB0aGlzIGNhbGxiYWNrIHlldCB3ZSB3YW50IHRvIGNyZWF0ZSBpdHMgZXZlbnQgc3BhY2UgaW4gdGhlIGNhbGxiYWNrIG1hcC5cclxuICAgICAgICAgICAgaWYgKCFjYWxsYmFja01hcFtldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja01hcFtldmVudE5hbWVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE1hcCB0aGUgY2FsbGJhY2sgdG8gb3VyIGVuY29tcGFzc2VkIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGNhbGxiYWNrTWFwW2V2ZW50TmFtZV1bY2FsbGJhY2tdID0gZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoYXQsIGRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJCh0aGF0KS5iaW5kKG1ha2VFdmVudE5hbWUoZXZlbnROYW1lKSwgY2FsbGJhY2tNYXBbZXZlbnROYW1lXVtjYWxsYmFja10pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb2ZmOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+UmVtb3ZlcyB0aGUgY2FsbGJhY2sgaW52b2NhdGlvbiByZXF1ZXN0IGZyb20gdGhlIHNlcnZlciBodWIgZm9yIHRoZSBnaXZlbiBldmVudCBuYW1lLjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXZlbnROYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBodWIgZXZlbnQgdG8gdW5yZWdpc3RlciB0aGUgY2FsbGJhY2sgZm9yLjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCIgdHlwZT1cIkZ1bmN0aW9uXCI+VGhlIGNhbGxiYWNrIHRvIGJlIGludm9rZWQuPC9wYXJhbT5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tNYXAgPSB0aGF0Ll8uY2FsbGJhY2tNYXAsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja1NwYWNlO1xyXG5cclxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBldmVudCBuYW1lIHRvIGxvd2VyY2FzZVxyXG4gICAgICAgICAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGNhbGxiYWNrU3BhY2UgPSBjYWxsYmFja01hcFtldmVudE5hbWVdO1xyXG5cclxuICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlcmUgaXMgYW4gZXZlbnQgc3BhY2UgdG8gdW5iaW5kXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFja1NwYWNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IHVuYmluZCBpZiB0aGVyZSdzIGFuIGV2ZW50IGJvdW5kIHdpdGggZXZlbnROYW1lIGFuZCBhIGNhbGxiYWNrIHdpdGggdGhlIHNwZWNpZmllZCBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrU3BhY2VbY2FsbGJhY2tdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGF0KS51bmJpbmQobWFrZUV2ZW50TmFtZShldmVudE5hbWUpLCBjYWxsYmFja1NwYWNlW2NhbGxiYWNrXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY2FsbGJhY2sgZnJvbSB0aGUgY2FsbGJhY2sgbWFwXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhbGxiYWNrU3BhY2VbY2FsbGJhY2tdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBhcmUgYW55IG1lbWJlcnMgbGVmdCBvbiB0aGUgZXZlbnQsIGlmIG5vdCB3ZSBuZWVkIHRvIGRlc3Ryb3kgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNNZW1iZXJzKGNhbGxiYWNrU3BhY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNhbGxiYWNrKSB7IC8vIENoZWNrIGlmIHdlJ3JlIHJlbW92aW5nIHRoZSB3aG9sZSBldmVudCBhbmQgd2UgZGlkbid0IGVycm9yIGJlY2F1c2Ugb2YgYW4gaW52YWxpZCBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhhdCkudW5iaW5kKG1ha2VFdmVudE5hbWUoZXZlbnROYW1lKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnZva2U6IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5JbnZva2VzIGEgc2VydmVyIGh1YiBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzLjwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWV0aG9kTmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgbmFtZSBvZiB0aGUgc2VydmVyIGh1YiBtZXRob2QuPC9wYXJhbT5cclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGF0LmNvbm5lY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBhcmdzID0gJC5tYWtlQXJyYXkoYXJndW1lbnRzKS5zbGljZSgxKSxcclxuICAgICAgICAgICAgICAgIGFyZ1ZhbHVlcyA9IG1hcChhcmdzLCBnZXRBcmdWYWx1ZSksXHJcbiAgICAgICAgICAgICAgICBkYXRhID0geyBIOiB0aGF0Lmh1Yk5hbWUsIE06IG1ldGhvZE5hbWUsIEE6IGFyZ1ZhbHVlcywgSTogY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja0lkIH0sXHJcbiAgICAgICAgICAgICAgICBkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAobWluUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoYXQuX21heGltaXplSHViUmVzcG9uc2UobWluUmVzdWx0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBodWIgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0aGF0LnN0YXRlLCByZXN1bHQuU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LlByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLm5vdGlmeVdpdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByb2dyZXNzIGlzIG9ubHkgc3VwcG9ydGVkIGluIGpRdWVyeSAxLjcrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLm5vdGlmeVdpdGgodGhhdCwgW3Jlc3VsdC5Qcm9ncmVzcy5EYXRhXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZighY29ubmVjdGlvbi5fLnByb2dyZXNzalF1ZXJ5VmVyc2lvbkxvZ2dlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJBIGh1YiBtZXRob2QgaW52b2NhdGlvbiBwcm9ncmVzcyB1cGRhdGUgd2FzIHJlY2VpdmVkIGJ1dCB0aGUgdmVyc2lvbiBvZiBqUXVlcnkgaW4gdXNlIChcIiArICQucHJvdG90eXBlLmpxdWVyeSArIFwiKSBkb2VzIG5vdCBzdXBwb3J0IHByb2dyZXNzIHVwZGF0ZXMuIFVwZ3JhZGUgdG8galF1ZXJ5IDEuNysgdG8gcmVjZWl2ZSBwcm9ncmVzcyBub3RpZmljYXRpb25zLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5wcm9ncmVzc2pRdWVyeVZlcnNpb25Mb2dnZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VydmVyIGh1YiBtZXRob2QgdGhyZXcgYW4gZXhjZXB0aW9uLCBsb2cgaXQgJiByZWplY3QgdGhlIGRlZmVycmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuU3RhY2tUcmFjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2cocmVzdWx0LkVycm9yICsgXCJcXG5cIiArIHJlc3VsdC5TdGFja1RyYWNlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXN1bHQuRXJyb3JEYXRhIGlzIG9ubHkgc2V0IGlmIGEgSHViRXhjZXB0aW9uIHdhcyB0aHJvd25cclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlID0gcmVzdWx0LklzSHViRXhjZXB0aW9uID8gXCJIdWJFeGNlcHRpb25cIiA6IFwiRXhjZXB0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gc2lnbmFsUi5fLmVycm9yKHJlc3VsdC5FcnJvciwgc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IuZGF0YSA9IHJlc3VsdC5FcnJvckRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmxvZyh0aGF0Lmh1Yk5hbWUgKyBcIi5cIiArIG1ldGhvZE5hbWUgKyBcIiBmYWlsZWQgdG8gZXhlY3V0ZS4gRXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQucmVqZWN0V2l0aCh0aGF0LCBbZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXJ2ZXIgaW52b2NhdGlvbiBzdWNjZWVkZWQsIHJlc29sdmUgdGhlIGRlZmVycmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiSW52b2tlZCBcIiArIHRoYXQuaHViTmFtZSArIFwiLlwiICsgbWV0aG9kTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQucmVzb2x2ZVdpdGgodGhhdCwgW3Jlc3VsdC5SZXN1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja3NbY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja0lkLnRvU3RyaW5nKCldID0geyBzY29wZTogdGhhdCwgbWV0aG9kOiBjYWxsYmFjayB9O1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrSWQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KHRoYXQuc3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLlMgPSB0aGF0LnN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0aW9uLmxvZyhcIkludm9raW5nIFwiICsgdGhhdC5odWJOYW1lICsgXCIuXCIgKyBtZXRob2ROYW1lKTtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5zZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGQucHJvbWlzZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9tYXhpbWl6ZUh1YlJlc3BvbnNlOiBmdW5jdGlvbiAobWluSHViUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIFN0YXRlOiBtaW5IdWJSZXNwb25zZS5TLFxyXG4gICAgICAgICAgICAgICAgUmVzdWx0OiBtaW5IdWJSZXNwb25zZS5SLFxyXG4gICAgICAgICAgICAgICAgUHJvZ3Jlc3M6IG1pbkh1YlJlc3BvbnNlLlAgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgSWQ6IG1pbkh1YlJlc3BvbnNlLlAuSSxcclxuICAgICAgICAgICAgICAgICAgICBEYXRhOiBtaW5IdWJSZXNwb25zZS5QLkRcclxuICAgICAgICAgICAgICAgIH0gOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgSWQ6IG1pbkh1YlJlc3BvbnNlLkksXHJcbiAgICAgICAgICAgICAgICBJc0h1YkV4Y2VwdGlvbjogbWluSHViUmVzcG9uc2UuSCxcclxuICAgICAgICAgICAgICAgIEVycm9yOiBtaW5IdWJSZXNwb25zZS5FLFxyXG4gICAgICAgICAgICAgICAgU3RhY2tUcmFjZTogbWluSHViUmVzcG9uc2UuVCxcclxuICAgICAgICAgICAgICAgIEVycm9yRGF0YTogbWluSHViUmVzcG9uc2UuRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaHViUHJveHkuZm4uaW5pdC5wcm90b3R5cGUgPSBodWJQcm94eS5mbjtcclxuXHJcbiAgICAvLyBodWJDb25uZWN0aW9uXHJcbiAgICBmdW5jdGlvbiBodWJDb25uZWN0aW9uKHVybCwgb3B0aW9ucykge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DcmVhdGVzIGEgbmV3IGh1YiBjb25uZWN0aW9uLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ1cmxcIiB0eXBlPVwiU3RyaW5nXCI+W09wdGlvbmFsXSBUaGUgaHViIHJvdXRlIHVybCwgZGVmYXVsdHMgdG8gXCIvc2lnbmFsclwiLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiIHR5cGU9XCJPYmplY3RcIj5bT3B0aW9uYWxdIFNldHRpbmdzIHRvIHVzZSB3aGVuIGNyZWF0aW5nIHRoZSBodWJDb25uZWN0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgdmFyIHNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBxczogbnVsbCxcclxuICAgICAgICAgICAgbG9nZ2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgIHVzZURlZmF1bHRQYXRoOiB0cnVlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIXVybCB8fCBzZXR0aW5ncy51c2VEZWZhdWx0UGF0aCkge1xyXG4gICAgICAgICAgICB1cmwgPSAodXJsIHx8IFwiXCIpICsgXCIvc2lnbmFsclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IGh1YkNvbm5lY3Rpb24uZm4uaW5pdCh1cmwsIHNldHRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBodWJDb25uZWN0aW9uLmZuID0gaHViQ29ubmVjdGlvbi5wcm90b3R5cGUgPSAkLmNvbm5lY3Rpb24oKTtcclxuXHJcbiAgICBodWJDb25uZWN0aW9uLmZuLmluaXQgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgcXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2dnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHVzZURlZmF1bHRQYXRoOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIENhbGwgdGhlIGJhc2UgY29uc3RydWN0b3JcclxuICAgICAgICAkLnNpZ25hbFIuZm4uaW5pdC5jYWxsKGNvbm5lY3Rpb24sIHVybCwgc2V0dGluZ3MucXMsIHNldHRpbmdzLmxvZ2dpbmcpO1xyXG5cclxuICAgICAgICAvLyBPYmplY3QgdG8gc3RvcmUgaHViIHByb3hpZXMgZm9yIHRoaXMgY29ubmVjdGlvblxyXG4gICAgICAgIGNvbm5lY3Rpb24ucHJveGllcyA9IHt9O1xyXG5cclxuICAgICAgICBjb25uZWN0aW9uLl8uaW52b2NhdGlvbkNhbGxiYWNrSWQgPSAwO1xyXG4gICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzID0ge307XHJcblxyXG4gICAgICAgIC8vIFdpcmUgdXAgdGhlIHJlY2VpdmVkIGhhbmRsZXJcclxuICAgICAgICBjb25uZWN0aW9uLnJlY2VpdmVkKGZ1bmN0aW9uIChtaW5EYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhLCBwcm94eSwgZGF0YUNhbGxiYWNrSWQsIGNhbGxiYWNrLCBodWJOYW1lLCBldmVudE5hbWU7XHJcbiAgICAgICAgICAgIGlmICghbWluRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGhhbmRsZSBwcm9ncmVzcyB1cGRhdGVzIGZpcnN0IGluIG9yZGVyIHRvIGVuc3VyZSBvbGQgY2xpZW50cyB0aGF0IHJlY2VpdmVcclxuICAgICAgICAgICAgLy8gcHJvZ3Jlc3MgdXBkYXRlcyBlbnRlciB0aGUgcmV0dXJuIHZhbHVlIGJyYW5jaCBhbmQgdGhlbiBuby1vcCB3aGVuIHRoZXkgY2FuJ3QgZmluZFxyXG4gICAgICAgICAgICAvLyB0aGUgY2FsbGJhY2sgaW4gdGhlIG1hcCAoYmVjYXVzZSB0aGUgbWluRGF0YS5JIHZhbHVlIHdpbGwgbm90IGJlIGEgdmFsaWQgY2FsbGJhY2sgSUQpXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG1pbkRhdGEuUCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICBkYXRhQ2FsbGJhY2tJZCA9IG1pbkRhdGEuUC5JLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2RhdGFDYWxsYmFja0lkXTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLm1ldGhvZC5jYWxsKGNhbGxiYWNrLnNjb3BlLCBtaW5EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKG1pbkRhdGEuSSkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIHJlY2VpdmVkIHRoZSByZXR1cm4gdmFsdWUgZnJvbSBhIHNlcnZlciBtZXRob2QgaW52b2NhdGlvbiwgbG9vayB1cCBjYWxsYmFjayBieSBpZCBhbmQgY2FsbCBpdFxyXG4gICAgICAgICAgICAgICAgZGF0YUNhbGxiYWNrSWQgPSBtaW5EYXRhLkkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja3NbZGF0YUNhbGxiYWNrSWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBjYWxsYmFjayBmcm9tIHRoZSBwcm94eVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2RhdGFDYWxsYmFja0lkXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2RhdGFDYWxsYmFja0lkXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW52b2tlIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLm1ldGhvZC5jYWxsKGNhbGxiYWNrLnNjb3BlLCBtaW5EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLl9tYXhpbWl6ZUNsaWVudEh1Ykludm9jYXRpb24obWluRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2UgcmVjZWl2ZWQgYSBjbGllbnQgaW52b2NhdGlvbiByZXF1ZXN0LCBpLmUuIGJyb2FkY2FzdCBmcm9tIHNlcnZlciBodWJcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ubG9nKFwiVHJpZ2dlcmluZyBjbGllbnQgaHViIGV2ZW50ICdcIiArIGRhdGEuTWV0aG9kICsgXCInIG9uIGh1YiAnXCIgKyBkYXRhLkh1YiArIFwiJy5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBuYW1lcyB0byBsb3dlcmNhc2VcclxuICAgICAgICAgICAgICAgIGh1Yk5hbWUgPSBkYXRhLkh1Yi50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lID0gZGF0YS5NZXRob2QudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBsb2NhbCBpbnZvY2F0aW9uIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBwcm94eSA9IHRoaXMucHJveGllc1todWJOYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGh1YiBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQocHJveHkuc3RhdGUsIGRhdGEuU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgJChwcm94eSkudHJpZ2dlckhhbmRsZXIobWFrZUV2ZW50TmFtZShldmVudE5hbWUpLCBbZGF0YS5BcmdzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29ubmVjdGlvbi5lcnJvcihmdW5jdGlvbiAoZXJyRGF0YSwgb3JpZ0RhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrSWQsIGNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvcmlnRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTm8gb3JpZ2luYWwgZGF0YSBwYXNzZWQgc28gdGhpcyBpcyBub3QgYSBzZW5kIGVycm9yXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGxiYWNrSWQgPSBvcmlnRGF0YS5JO1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2NhbGxiYWNrSWRdO1xyXG5cclxuICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlcmUgaXMgYSBjYWxsYmFjayBib3VuZCAoY291bGQgaGF2ZSBiZWVuIGNsZWFyZWQpXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5fLmludm9jYXRpb25DYWxsYmFja3NbY2FsbGJhY2tJZF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbm5lY3Rpb24uXy5pbnZvY2F0aW9uQ2FsbGJhY2tzW2NhbGxiYWNrSWRdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBhbiBlcnJvciB0byByZWplY3QgdGhlIHByb21pc2VcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLm1ldGhvZC5jYWxsKGNhbGxiYWNrLnNjb3BlLCB7IEU6IGVyckRhdGEgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29ubmVjdGlvbi5yZWNvbm5lY3RpbmcoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY29ubmVjdGlvbi50cmFuc3BvcnQgJiYgY29ubmVjdGlvbi50cmFuc3BvcnQubmFtZSA9PT0gXCJ3ZWJTb2NrZXRzXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW52b2NhdGlvbkNhbGxiYWNrcyhjb25uZWN0aW9uLCBcIkNvbm5lY3Rpb24gc3RhcnRlZCByZWNvbm5lY3RpbmcgYmVmb3JlIGludm9jYXRpb24gcmVzdWx0IHdhcyByZWNlaXZlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29ubmVjdGlvbi5kaXNjb25uZWN0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhckludm9jYXRpb25DYWxsYmFja3MoY29ubmVjdGlvbiwgXCJDb25uZWN0aW9uIHdhcyBkaXNjb25uZWN0ZWQgYmVmb3JlIGludm9jYXRpb24gcmVzdWx0IHdhcyByZWNlaXZlZC5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4uX21heGltaXplQ2xpZW50SHViSW52b2NhdGlvbiA9IGZ1bmN0aW9uIChtaW5DbGllbnRIdWJJbnZvY2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgSHViOiBtaW5DbGllbnRIdWJJbnZvY2F0aW9uLkgsXHJcbiAgICAgICAgICAgIE1ldGhvZDogbWluQ2xpZW50SHViSW52b2NhdGlvbi5NLFxyXG4gICAgICAgICAgICBBcmdzOiBtaW5DbGllbnRIdWJJbnZvY2F0aW9uLkEsXHJcbiAgICAgICAgICAgIFN0YXRlOiBtaW5DbGllbnRIdWJJbnZvY2F0aW9uLlNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBodWJDb25uZWN0aW9uLmZuLl9yZWdpc3RlclN1YnNjcmliZWRIdWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIFNldHMgdGhlIHN0YXJ0aW5nIGV2ZW50IHRvIGxvb3AgdGhyb3VnaCB0aGUga25vd24gaHVicyBhbmQgcmVnaXN0ZXIgYW55IG5ldyBodWJzIFxyXG4gICAgICAgIC8vLyAgICAgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIHByb3h5LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIWNvbm5lY3Rpb24uX3N1YnNjcmliZWRUb0h1YnMpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5fc3Vic2NyaWJlZFRvSHVicyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uc3RhcnRpbmcoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBjb25uZWN0aW9uJ3MgZGF0YSBvYmplY3Qgd2l0aCBhbGwgdGhlIGh1YiBwcm94aWVzIHdpdGggYWN0aXZlIHN1YnNjcmlwdGlvbnMuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVzZSBwcm94aWVzIHdpbGwgcmVjZWl2ZSBub3RpZmljYXRpb25zIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICAgICAgICAgIHZhciBzdWJzY3JpYmVkSHVicyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaChjb25uZWN0aW9uLnByb3hpZXMsIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNTdWJzY3JpcHRpb25zKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlZEh1YnMucHVzaCh7IG5hbWU6IGtleSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJDbGllbnQgc3Vic2NyaWJlZCB0byBodWIgJ1wiICsga2V5ICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlZEh1YnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5sb2coXCJObyBodWJzIGhhdmUgYmVlbiBzdWJzY3JpYmVkIHRvLiAgVGhlIGNsaWVudCB3aWxsIG5vdCByZWNlaXZlIGRhdGEgZnJvbSBodWJzLiAgVG8gZml4LCBkZWNsYXJlIGF0IGxlYXN0IG9uZSBjbGllbnQgc2lkZSBmdW5jdGlvbiBwcmlvciB0byBjb25uZWN0aW9uIHN0YXJ0IGZvciBlYWNoIGh1YiB5b3Ugd2lzaCB0byBzdWJzY3JpYmUgdG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uZGF0YSA9IGNvbm5lY3Rpb24uanNvbi5zdHJpbmdpZnkoc3Vic2NyaWJlZEh1YnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4uY3JlYXRlSHViUHJveHkgPSBmdW5jdGlvbiAoaHViTmFtZSkge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gICAgIENyZWF0ZXMgYSBuZXcgcHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gaHViIGNvbm5lY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbnZva2VcclxuICAgICAgICAvLy8gICAgIG1ldGhvZHMgb24gc2VydmVyIGh1YnMgYW5kIGhhbmRsZSBjbGllbnQgbWV0aG9kIGludm9jYXRpb24gcmVxdWVzdHMgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiaHViTmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5cclxuICAgICAgICAvLy8gICAgIFRoZSBuYW1lIG9mIHRoZSBodWIgb24gdGhlIHNlcnZlciB0byBjcmVhdGUgdGhlIHByb3h5IGZvci5cclxuICAgICAgICAvLy8gPC9wYXJhbT5cclxuXHJcbiAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBuYW1lIHRvIGxvd2VyY2FzZVxyXG4gICAgICAgIGh1Yk5hbWUgPSBodWJOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIHZhciBwcm94eSA9IHRoaXMucHJveGllc1todWJOYW1lXTtcclxuICAgICAgICBpZiAoIXByb3h5KSB7XHJcbiAgICAgICAgICAgIHByb3h5ID0gaHViUHJveHkodGhpcywgaHViTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJveGllc1todWJOYW1lXSA9IHByb3h5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJTdWJzY3JpYmVkSHVicygpO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJveHk7XHJcbiAgICB9O1xyXG5cclxuICAgIGh1YkNvbm5lY3Rpb24uZm4uaW5pdC5wcm90b3R5cGUgPSBodWJDb25uZWN0aW9uLmZuO1xyXG5cclxuICAgICQuaHViQ29ubmVjdGlvbiA9IGh1YkNvbm5lY3Rpb247XHJcblxyXG59KHdpbmRvdy5qUXVlcnksIHdpbmRvdykpO1xyXG4vKiBqcXVlcnkuc2lnbmFsUi52ZXJzaW9uLmpzICovXHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IE9wZW4gVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFNlZSBMaWNlbnNlLm1kIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcblxyXG4vKmdsb2JhbCB3aW5kb3c6ZmFsc2UgKi9cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpxdWVyeS5zaWduYWxSLmNvcmUuanNcIiAvPlxyXG4oZnVuY3Rpb24gKCQsIHVuZGVmaW5lZCkge1xyXG4gICAgJC5zaWduYWxSLnZlcnNpb24gPSBcIjIuMi4wXCI7XHJcbn0od2luZG93LmpRdWVyeSkpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

// todo: migrate to aurelia-fetch-client
import {HttpClient} from 'aurelia-http-client';
//import $ from 'jquery';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpRequestStartedMessage, HttpRequestFinishedMessage,
  HttpBadRequestMessage, HttpServerErrorRequestMessage,
  HttpSessionTimedOutMessage} from './http-client-messages';

import {Logger} from '../logger';
import {Locale} from '../locale';
import {Config} from '../config';

@inject(Logger, EventAggregator)
export class HaikuHttp {
  constructor(logger, eventAggregator) {
    this.logger = logger;
    this.locale = Locale.Repository.default;
    this.eventAggregator = eventAggregator;

    this.requestsCount = 0;
    this.host = Config.httpOpts.serviceHost;
    this.origin = this.host + Config.httpOpts.serviceApiPrefix;
    //this.authOrigin = Config.httpOpts.authHost;
    this.hosts = Config.httpOpts.hosts || {};
    this.loadingMaskDelay = Config.httpOpts.loadingMaskDelay || 1000;
    this.requestTimeout = Config.httpOpts.requestTimeout;

    this.http = new HttpClient().configure(x => {
      x.withBaseUrl(this.origin);
      x.withHeader('Content-Type', 'application/json');
      x.withHeader('Accept', '*/*');
    });
    this.headers = [];

    this.methods = {
      post: 'post',
      put: 'put',
      get: 'get',
      delete: 'delete'
    }
  }

  withHeaders(headers) {
    this.headers = headers;
    return this;
  }

  _createRequest(method, url, content) {
    this._showLoadingMask();

    let request = this.http.createRequest(url);
    this.headers.forEach(header => {
      request = request.withHeader(header.key, header.value);
    });
    this.headers = [];

    switch (method) {
      case this.methods.get:
        request = request.asGet();
        break;
      case this.methods.post:
        request = request.asPost().withContent(content);
        break;
      case this.methods.put:
        request = request.asPut().withContent(content);
        break;
      case this.methods.delete:
        request = request.asDelete();
        break;
      default:
        throw new Error(`Invalid http method: ${method}`);
    }

    let promise = request.send().then(response => {
      this._hideLoadingMask();
      if (response.response !== '') {
        return JSON.parse(response.response);
      }
    });
    promise.catch(this.errorHandler.bind(this));

    return promise;
  }

  getWithHeaders(url, headers, data) {
    this._showLoadingMask();
    let urlWithProps = data !== undefined ? this._getUrlWithProps(url, data) : url;
    let promise = this.http.createRequest(urlWithProps);
    headers.forEach(header => {
      promise = promise.withHeader(header.key, header.value);
    });
    promise = promise.asGet()
      .send()
      .then(response => {
        this._hideLoadingMask();
        return JSON.parse(response.response);
      });
    promise.catch(this.errorHandler.bind(this));
    return promise;
  }

  postWithHeaders(url, headers, data = {}) {
    this._showLoadingMask();
    let promise = this.http.createRequest(url);
    headers.forEach(header => {
      promise = promise.withHeader(header.key, header.value);
    });
    promise = promise
      .asPost()
      .withContent(data)
      .send()
      .then(response => {
        this._hideLoadingMask();
        if (response.response !== '') {
          return JSON.parse(response.response);
        }
      });
    promise.catch(this.errorHandler.bind(this));

    return promise;
  }

  get(url, data) {
    const urlWithProps = data !== undefined ? this._getUrlWithProps(url, data) : url;
    const promise = this._createRequest(this.methods.get, urlWithProps);
    return promise;
  }

  post(url, content = {}) {
    const promise = this._createRequest(this.methods.post, url, content);
    return promise;
  }

  put(url, content = {}) {
    const promise = this._createRequest(this.methods.put, url, content);
    return promise;
  }

  delete(url) {
    const promise = this._createRequest(this.methods.delete, url);
    return promise;
  }

  errorHandler(response) {
    this._hideLoadingMask();

    if (response.statusCode === 400) {
      const error = JSON.parse(response.response);
      this.eventAggregator.publish(new HttpBadRequestMessage(error.message, error.modelState));
    } else if (response.statusCode === 418) {
      const errors = JSON.parse(response.response);
      this.eventAggregator.publish(new HttpServerErrorRequestMessage(errors));
    } else if (response.statusCode === 401) {
      this.eventAggregator.publish(new HttpSessionTimedOutMessage());
      //this.logger.warn(this.locale.translate('notAuthorized'));
    } else if (response.statusCode === 403) {
      this.logger.warn(this.locale.translate('accessDenied'));
    } else if (response.statusCode === 500) {
      this.logger.error(this.locale.translate('internalServerError'));
    } else if (response.timeout === true) {
      this.logger.error(this.locale.translate('requestTimeout'));
    } else {
      this.logger.error(this.locale.translate('errorHappend'));
    }
  }

  _showLoadingMask() {
    this.requestsCount += 1;
    if (this.requestsCount === 1) {
      if (this.loadingMaskDelay > 0) {
        this._queryTimeout = window.setTimeout(() => {
          this.eventAggregator.publish(new HttpRequestStartedMessage());
        }, this.loadingMaskDelay);
      } else {
        this.loadingMask.show();
      }
    }
  }

  _hideLoadingMask() {
    this.requestsCount -= 1;
    if (this.requestsCount <= 0) {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this.eventAggregator.publish(new HttpRequestFinishedMessage());
      this.requestsCount = 0;
    }
  }

  _getUrlWithProps(url, data) {
    let props = Object.keys(data).map(function (key) {
      let d = data[key];
      if (Array.isArray(d)) {
        return d.map(value => {
          return '' + key + '=' + value;
        }).join('&');
      } else {
        return '' + key + '=' + data[key];
      }
    }).join('&');

    return url + '?' + props;
  }
}

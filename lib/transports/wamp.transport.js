/**
 * Created by vedi on 10/09/16.
 */

'use strict';

class WampTransport {

  constructor(options) {
    this.session = options.session;
    this.prefix = options.prefix || 'restifizer';
  }

  addRoute(controller, method, paths, action, handlerFn) {
    this.session.register(`${this.prefix}.${method}.${paths[0]}`, (payload) => {
      const scope = action.createScope(controller, action.transport);

      scope.transportData.payload = payload;
      scope.transportData.result = {};

      handlerFn(scope)
        .then(() => {
          return scope.transportData.result;
        });
    });
  }

  pre(scope) {
  }

  post(scope) {
  }

  getQ(scope) {
    return scope.transportData.payload.q;
  }

  getBody(scope) {
    return scope.transportData.payload.body;
  }

  getParams(scope) {
    return scope.transportData.payload.params;
  }

  getFields(scope) {
    return scope.transportData.payload.fields;
  }

  getFilter(scope) {
    return scope.transportData.payload.filter;
  }

  getOrderBy(scope) {
    return scope.transportData.payload.orderBy;
  }

  getPagination(scope) {
    return scope.transportData.payload.pagination;
  }

  setResData(data, scope, statusCode) {
    if (typeof data != 'undefined') {
      scope.restfulResult = data;
    }
    scope.statusCode = statusCode;
  }

  sendResult(result, scope) {
    result = result || scope.restfulResult;
    scope.transportData.result.data = result;
    scope.transportData.result.statusCode = scope.statusCode;
  }

}

WampTransport.name = 'wamp';

module.exports = WampTransport;
"use strict";

var request = require("request-promise");
var Promise = require("bluebird");

function Client(options) {
    if (!(this instanceof Client)) {
        return new Client(options);
    }
    this.options = options;
}
/**
 * Get non authenticated request http client
 * @returns {Promise}
 */
Client.prototype.getRequest = function() {
    var self = this;
    return new Promise(function(resolve) {
        if (!self.request) {
            self.request = request.defaults({
                "baseUrl": "http://www.sports-tracker.com/apiserver/v1/"
            });
            //require("request-debug")(self.request);
        }
        resolve(self.request);
    });
};

/**
 * Get authenticated http client
 * @returns {Promise}
 */
Client.prototype.getAuthenticatedRequest = function() {
    var self = this;
    if (self.authenticatedRequest) {
        return new Promise(function(resolve) {
            resolve(self.authenticatedRequest);
        });
    }
    return self.getRequest()
        .then(function(request) {
            return request.post("login?source=javascript")
                .form({
                    "l": self.options.user,
                    "p": self.options.password
                })
                .then(function(data) {
                    return {
                        "request": request,
                        "data": data
                    };
                });
        })
        .then(function(response) {
            var data = JSON.parse(response.data);
            self.authenticatedRequest = response.request
                .defaults({
                    "headers": {
                        "STTAuthorization": data.userKey
                    }
                });
            return self.authenticatedRequest;
        });
};

/**
 * Get api result
 * @param {string} path
 * @returns {Promise}
 */
Client.prototype.get = function(path) {
    var self = this;
    return self.getAuthenticatedRequest()
        .then(function(request) {
            return request.get(path);
        })
        .then(JSON.parse)
        .then(function(answer) {
            return new Promise(function(resolve, reject) {
                if (!answer.payload) {
                    reject(new Error("No payload (answer:" +
                        JSON.stringify(answer) + ")"));
                } else if (answer.error) {
                    reject(new Error(answer.error));
                } else {
                    resolve(answer);
                }
            });
        });
};

Client.prototype.getWorkouts = function(offset, limit) {
    return this.get("workouts?limited=true&offset=" + offset + "&limit=" +
            limit)
        .then(function(answer) {
            return answer.payload;
        });
};

module.exports = Client;

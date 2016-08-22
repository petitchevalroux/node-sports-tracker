"use strict";

var Readable = require("stream")
    .Readable;
var util = require("util");
var Promise = require("bluebird");
var path = require("path");
var Client = require(path.join(__dirname, "client"));

function Stream(options) {
    if (!(this instanceof Stream)) {
        return new Stream(options);
    }
    options.objectMode = true;
    this.options = options;
    Readable.call(this, options);
}

Stream.prototype.workouts = [];

Stream.prototype._read = function() {
    // Empty workouts buffers
    if (this.workouts.length === 0) {
        var self = this;
        // Fetch workouts
        this._getWorkouts()
            .done(function(workouts) {
                // No more workouts, this is the end
                if (workouts.length === 0) {
                    self.push(null);
                } else {
                    workouts.forEach(function(workout) {
                        self.workouts.push(workout);
                    });
                    self._read();
                }
            });
    } else {
        // Read workouts from buffer
        var workout = this.workouts.shift();
        // Handle empty workouts buffer
        if (typeof workout === "undefined") {
            this._read();
        } else {
            this.push(workout);
        }
    }
};

Stream.prototype._getWorkouts = function() {
    var self = this;
    return self._getOffset()
        .then(function(offset) {
            return self._getLimit()
                .then(function(limit) {
                    return {
                        "offset": offset,
                        "limit": limit
                    };
                });
        })
        .then(function(params) {
            return self._getClient()
                .then(function(client) {
                    return {
                        "client": client,
                        "params": params
                    };
                });
        })
        .then(function(result) {
            return result.client.getWorkouts(
                    result.params.offset,
                    result.params.limit
                )
                .then(function(workouts) {
                    self.offset += self.limit;
                    return workouts;
                });
        });
};

Stream.prototype._getOffset = function() {
    var self = this;
    return new Promise(function(resolve) {
        self.offset = self.offset || 0;
        resolve(self.offset);
    });
};

Stream.prototype._getLimit = function() {
    var self = this;
    return new Promise(function(resolve) {
        self.limit = self.limit || 100;
        resolve(self.limit);
    });
};

Stream.prototype._getClient = function() {
    var self = this;
    return new Promise(function(resolve) {
        self.client = self.client || new Client(self.options);
        resolve(self.client);
    });
};

util.inherits(Stream, Readable);

module.exports = Stream;

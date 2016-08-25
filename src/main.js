"use strict";

var path = require("path");

function Module() {}

Module.prototype.Client = require(path.join(__dirname, "client"));
Module.prototype.WorkoutsStream = require(path.join(__dirname,
    "workouts-stream"));

module.exports = new Module();

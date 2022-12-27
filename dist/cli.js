#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
require("./utils/help");
const app_1 = __importDefault(require("./app"));
const index_1 = require("./utils/index");
if (!(0, index_1.isHasParams)())
    (0, ink_1.render)(react_1.default.createElement(app_1.default, null));

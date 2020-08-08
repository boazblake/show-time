"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(require("mithril"));
var ContainerSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "container-solid"), mithril_1.default("path", { "d": "M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM9.63,24.23a.79.79,0,0,1-.81.77A.79.79,0,0,1,8,24.23V11.77A.79.79,0,0,1,8.82,11a.79.79,0,0,1,.81.77Zm6,0a.79.79,0,0,1-.82.77.79.79,0,0,1-.81-.77V11.77a.79.79,0,0,1,.81-.77.79.79,0,0,1,.82.77Zm6.21,0a.79.79,0,0,1-.82.77.79.79,0,0,1-.81-.77V11.77a.79.79,0,0,1,.81-.77.79.79,0,0,1,.82.77Zm6.12,0a.79.79,0,0,1-.82.77.79.79,0,0,1-.81-.77V11.77a.79.79,0,0,1,.81-.77.79.79,0,0,1,.82.77Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ContainerSolid;

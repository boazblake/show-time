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
var RewindSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "rewind-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M16.92,31.58,1.6,19.57a2,2,0,0,1,0-3.15l15.32-12A1.93,1.93,0,0,1,19,4.2,1.89,1.89,0,0,1,20,6v6.7L30.66,4.42a1.93,1.93,0,0,1,2.06-.22A2,2,0,0,1,33.83,6V30a2,2,0,0,1-1.11,1.79,1.94,1.94,0,0,1-2.06-.22L20,23.31V30a1.89,1.89,0,0,1-1,1.79,1.94,1.94,0,0,1-2.06-.22Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RewindSolid;

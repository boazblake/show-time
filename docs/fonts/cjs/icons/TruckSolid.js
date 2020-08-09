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
var TruckSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "truck-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M30,12H26V7a1,1,0,0,0-1-1H3A1,1,0,0,0,2,7V25a1,1,0,0,0,1,1H4V8H24V21.49A4.45,4.45,0,0,0,21.25,24H14.43a4.5,4.5,0,0,0-4.17-2.76A4.38,4.38,0,1,0,14.72,26H21a4.48,4.48,0,0,0,8.91,0H34V16A4,4,0,0,0,30,12ZM10.26,28a2.38,2.38,0,1,1,0-4.75,2.38,2.38,0,1,1,0,4.75Zm15.17,0a2.38,2.38,0,1,1,2.5-2.37A2.44,2.44,0,0,1,25.42,28ZM32,17H26V14h4a2,2,0,0,1,2,2Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TruckSolid;

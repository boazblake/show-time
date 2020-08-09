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
var CalendarSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "calendar-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M32.25,6h-4V9a2.2,2.2,0,1,1-4.4,0V6H12.2V9A2.2,2.2,0,0,1,7.8,9V6h-4A1.78,1.78,0,0,0,2,7.81V30.19A1.78,1.78,0,0,0,3.75,32h28.5A1.78,1.78,0,0,0,34,30.19V7.81A1.78,1.78,0,0,0,32.25,6ZM10,26H8V24h2Zm0-5H8V19h2Zm0-5H8V14h2Zm6,10H14V24h2Zm0-5H14V19h2Zm0-5H14V14h2Zm6,10H20V24h2Zm0-5H20V19h2Zm0-5H20V14h2Zm6,10H26V24h2Zm0-5H26V19h2Zm0-5H26V14h2Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M10,10a1,1,0,0,0,1-1V3A1,1,0,0,0,9,3V9A1,1,0,0,0,10,10Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-3", "d": "M26,10a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V9A1,1,0,0,0,26,10Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CalendarSolid;

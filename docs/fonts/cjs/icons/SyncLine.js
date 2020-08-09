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
var SyncLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "sync-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M32.84,15.72a1,1,0,1,0-2,.29A13.15,13.15,0,0,1,31,17.94,13,13,0,0,1,8.7,27h5.36a1,1,0,0,0,0-2h-9v9a1,1,0,1,0,2,0V28.2A15,15,0,0,0,32.84,15.72Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M30.06,1A1.05,1.05,0,0,0,29,2V7.83A14.94,14.94,0,0,0,3,17.94a15.16,15.16,0,0,0,.2,2.48,1,1,0,0,0,1,.84h.16a1,1,0,0,0,.82-1.15A13.23,13.23,0,0,1,5,17.94a13,13,0,0,1,13-13A12.87,12.87,0,0,1,27.44,9H22.06a1,1,0,0,0,0,2H31V2A1,1,0,0,0,30.06,1Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = SyncLine;

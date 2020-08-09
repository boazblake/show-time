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
var UnlockLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "unlock-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M12,25.14V28h2V25.23a2.42,2.42,0,1,0-2-.09Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M26,2a8.2,8.2,0,0,0-8,8.36V15H2V32a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V15H20V10.36A6.2,6.2,0,0,1,26,4a6.2,6.2,0,0,1,6,6.36v6.83a1,1,0,0,0,2,0V10.36A8.2,8.2,0,0,0,26,2ZM22,17V32H4V17Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = UnlockLine;

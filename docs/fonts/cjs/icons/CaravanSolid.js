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
var CaravanSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "caravan-solid"), mithril_1.default("path", { "d": "M13.5,30C11,30,9,28,9,25.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5C18,28,16,30,13.5,30z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M33,24h-2v-7.5c0-0.5-0.1-1-0.4-1.5l-4.2-7.5c-0.5-1-1.5-1.5-2.6-1.5H5C3.3,6,2,7.3,2,9v14c0,1.7,1.3,3,3,3h2v-2H5\n\tc-0.6,0-1-0.4-1-1V9c0-0.6,0.4-1,1-1h18.8c0.4,0,0.7,0.2,0.9,0.5l4.2,7.5c0.1,0.1,0.1,0.3,0.1,0.5V24h-4V12h-7v8h2v-6h3v10h-3v2h13\n\tc0.6,0,1-0.4,1-1S33.6,24,33,24z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M16,18H7v-6h9V18z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CaravanSolid;

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
var TapeDriveOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "tape-drive-outline-badged"), mithril_1.default("g", { "id": "e54b2db9-51fc-4951-94f7-6cdbb786a675", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M8.81,17.87a4.53,4.53,0,1,0,4.52-4.52A4.53,4.53,0,0,0,8.81,17.87Zm7.45,0A2.93,2.93,0,1,1,13.33,15,2.93,2.93,0,0,1,16.26,17.87Z" }), mithril_1.default("path", { "d": "M19.1,17.87a4.52,4.52,0,1,0,4.52-4.52A4.53,4.53,0,0,0,19.1,17.87Zm7.44,0A2.92,2.92,0,1,1,23.62,15,2.92,2.92,0,0,1,26.54,17.87Z" }), mithril_1.default("path", { "d": "M32,13.22V28H4V8H22.78a7.37,7.37,0,0,1-.28-2H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V12.34A7.65,7.65,0,0,1,32,13.22Z" }), mithril_1.default("path", { "d": "M6,11V23.55H8V12H25.51a7.66,7.66,0,0,1-1.85-2H7A1,1,0,0,0,6,11Z" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "fill": "#e62700" })));
    } };
exports.default = TapeDriveOutlineBadged;

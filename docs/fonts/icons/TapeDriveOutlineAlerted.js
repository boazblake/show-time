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
var TapeDriveOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "tape-drive-outline-alerted"), mithril_1.default("g", { "id": "aef6d30c-ae2a-4a11-934d-fbc06f2bc8c1", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M8.81,17.87a4.53,4.53,0,1,0,4.52-4.52A4.53,4.53,0,0,0,8.81,17.87Zm7.45,0A2.93,2.93,0,1,1,13.33,15,2.93,2.93,0,0,1,16.26,17.87Z" }), mithril_1.default("path", { "d": "M7,10a1,1,0,0,0-1,1V23.55H8V12H18.57A3.7,3.7,0,0,1,19,10Z" }), mithril_1.default("path", { "d": "M33.68,15.4H32V28H4V8H20.14l1.15-2H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V15.38Z" }), mithril_1.default("path", { "d": "M22.09,15.39a3.65,3.65,0,0,1-1.8-.55,4.51,4.51,0,1,0,7.11.56H25.17a2.92,2.92,0,1,1-3.08,0Z" }), mithril_1.default("path", { "d": "M26.85,1.14l-5.72,9.91A1.27,1.27,0,0,0,22.23,13H33.68a1.27,1.27,0,0,0,1.1-1.91L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "fill": "#fac400" })));
    } };
exports.default = TapeDriveOutlineAlerted;

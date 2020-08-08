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
var MediaChangerSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "media-changer-solid-alerted"), mithril_1.default("g", { "id": "a346acbf-451a-4867-8831-50aae1027b24", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M22.23,15.4a3.68,3.68,0,0,1-3.18-5.51L22.45,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H7.88v1.57a1,1,0,0,0,2,0V32h16v1.57a1,1,0,0,0,2,0V32H30a2,2,0,0,0,2-2V15.4ZM17,28H8.81V26H17Zm0-4H8.81V22H17Zm0-4H8.81V18H17Zm0-4H8.81V14H17Zm0-4H8.81V10H17ZM22,24H20V22h2Zm0-4H20V18h2Zm4,4H24V22h2Zm0-4H24V18h2Z" }), mithril_1.default("path", { "d": "M26.85,1.14l-5.72,9.91A1.27,1.27,0,0,0,22.23,13H33.68a1.27,1.27,0,0,0,1.1-1.91L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "fill": "#fac400" })));
    } };
exports.default = MediaChangerSolidAlerted;

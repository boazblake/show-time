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
var HashtagSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "hashtag-solid"), mithril_1.default("g", { "id": "eaeb89e3-9282-4299-8c2b-2441a32c1a79", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M31.87,10H26.32l1-4.83A1,1,0,0,0,26.35,4h-2a1,1,0,0,0-1,.78L22.33,10h-5.4l1-4.83A1,1,0,0,0,17,4H15a1,1,0,0,0-1,.78L13,10H7a1,1,0,0,0-1,.8l-.41,2a1,1,0,0,0,1,1.2h5.55L10.5,22h-6a1,1,0,0,0-1,.8l-.41,2a1,1,0,0,0,1,1.2H9.68l-1,4.83a1,1,0,0,0,1,1.17h2a1,1,0,0,0,.95-.78L13.67,26h5.4l-1,4.83A1,1,0,0,0,19,32h2a1,1,0,0,0,1-.78L23.05,26h6a1,1,0,0,0,1-.8l.4-2a1,1,0,0,0-1-1.2H23.87l1.63-8h6a1,1,0,0,0,1-.8l.41-2A1,1,0,0,0,31.87,10Zm-12,12h-5.4l1.64-8h5.4Z" })));
    } };
exports.default = HashtagSolid;

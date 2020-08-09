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
var AnimationSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "animation_solid"), mithril_1.default("g", { "id": "bb9f4e02-7318-4dbb-9960-e0435cf0cad7", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M3.5,23.77a6.41,6.41,0,0,0,9.33,8.67A11.65,11.65,0,0,1,3.5,23.77Z" }), mithril_1.default("path", { "d": "M7.68,14.53a9.6,9.6,0,0,0,13.4,13.7A14.11,14.11,0,0,1,7.68,14.53Z" }), mithril_1.default("path", { "d": "M21.78,2A12.12,12.12,0,1,1,9.66,14.15,12.12,12.12,0,0,1,21.78,2" })));
    } };
exports.default = AnimationSolid;

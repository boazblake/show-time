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
var HashtagLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "hashtag-outline"), mithril_1.default("g", { "id": "bb4ed7a9-727c-433e-a92a-fb7b8fd366b0", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M32,12H25.34l1.55-7.74a1,1,0,0,0-2-.39L23.3,12H15.11l1.55-7.74a1,1,0,0,0-2-.39L13.07,12H6a1,1,0,0,0,0,2h6.67l-1.6,8H4a1,1,0,0,0,0,2h6.66L9.11,31.74a1,1,0,0,0,.79,1.17.68.68,0,0,0,.2,0,1,1,0,0,0,1-.8L12.7,24h8.19l-1.55,7.74a1,1,0,0,0,.79,1.17.62.62,0,0,0,.19,0,1,1,0,0,0,1-.8L22.93,24H30a1,1,0,0,0,0-2H23.33l1.61-8H32a1,1,0,0,0,0-2ZM21.29,22H13.1l1.61-8H22.9Z" })));
    } };
exports.default = HashtagLine;

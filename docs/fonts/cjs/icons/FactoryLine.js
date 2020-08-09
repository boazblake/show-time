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
var FactoryLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "factory_line"), mithril_1.default("g", { "id": "a669c3f4-6dbf-4e74-bc75-7e15445e52bf", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M33.47,7.37a1,1,0,0,0-1,.06L23,13.77V8.26a1,1,0,0,0-1.64-.77L13.48,14H10V4.62a1,1,0,0,0-.78-1l-4-.9a1,1,0,0,0-.85.2A1,1,0,0,0,4,3.73V14H3a1,1,0,0,0-1,1V31a1,1,0,0,0,1,1H33a1,1,0,0,0,1-1V8.26A1,1,0,0,0,33.47,7.37ZM6,5l2,.44V14H6ZM32,30H4V16h9.83a1,1,0,0,0,.64-.23L21,10.37v5.28a1,1,0,0,0,1.56.83L32,10.14Z" }), mithril_1.default("rect", { "x": 6, "y": 17.99, "width": 8, "height": 2 }), mithril_1.default("rect", { "x": 6, "y": 21.99, "width": 8, "height": 2 }), mithril_1.default("rect", { "x": 6, "y": 25.99, "width": 8, "height": 2 }), mithril_1.default("rect", { "x": 19, "y": 18.99, "width": 2, "height": 3 }), mithril_1.default("rect", { "x": 19, "y": 24.99, "width": 2, "height": 3 }), mithril_1.default("rect", { "x": 23, "y": 18.99, "width": 2, "height": 3 }), mithril_1.default("rect", { "x": 23, "y": 24.99, "width": 2, "height": 3 }), mithril_1.default("rect", { "x": 27, "y": 18.99, "width": 2, "height": 3 }), mithril_1.default("rect", { "x": 27, "y": 24.99, "width": 2, "height": 3 })));
    } };
exports.default = FactoryLine;

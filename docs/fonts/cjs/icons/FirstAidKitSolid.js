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
var FirstAidKitSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "first-aid-kit-solid"), mithril_1.default("g", { "id": "bcb20d87-9a45-4e25-814f-6152e53bb23a", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M32,6H23.91V4.5A2.5,2.5,0,0,0,21.41,2h-7a2.5,2.5,0,0,0-2.5,2.5V6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM13.91,4.5a.5.5,0,0,1,.5-.5h7a.5.5,0,0,1,.5.5V6h-8ZM24.64,19.9a.5.5,0,0,1-.5.5h-3.5v3.5a.5.5,0,0,1-.5.5h-3.4a.5.5,0,0,1-.5-.5V20.4h-3.5a.5.5,0,0,1-.5-.5V16.5a.5.5,0,0,1,.5-.5h3.5V12.5a.5.5,0,0,1,.5-.5h3.4a.5.5,0,0,1,.5.5V16h3.5a.5.5,0,0,1,.5.5Z" })));
    } };
exports.default = FirstAidKitSolid;

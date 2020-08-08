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
var TapeDriveSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "tape-drive-solid"), mithril_1.default("g", { "id": "bcbf2fa8-b09f-4ed5-b00a-17e9ea4403e4", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM30,24H6V12H30Z" }), mithril_1.default("path", { "d": "M12.21,23a5,5,0,1,0-5-5A5,5,0,0,0,12.21,23Zm0-7a2,2,0,1,1-2,2A2,2,0,0,1,12.21,16Z" }), mithril_1.default("path", { "d": "M23.79,23a5,5,0,1,0-5-5A5,5,0,0,0,23.79,23Zm0-7a2,2,0,1,1-2,2A2,2,0,0,1,23.79,16Z" })));
    } };
exports.default = TapeDriveSolid;

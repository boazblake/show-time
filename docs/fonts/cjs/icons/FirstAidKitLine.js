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
var FirstAidKitLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "first-aid-kit-outline"), mithril_1.default("g", { "id": "bb788ce6-af78-4ab1-a83b-836355372233", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M32,6H23.91V4.5A2.5,2.5,0,0,0,21.41,2h-7a2.5,2.5,0,0,0-2.5,2.5V6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM13.91,4.5a.5.5,0,0,1,.5-.5h7a.5.5,0,0,1,.5.5V6h-8ZM4,28V8H32V28Z" }), mithril_1.default("path", { "d": "M20.15,25.2H16.74a1.3,1.3,0,0,1-1.3-1.3V21.2h-2.7a1.3,1.3,0,0,1-1.3-1.3V16.5a1.3,1.3,0,0,1,1.3-1.3h2.7V12.5a1.3,1.3,0,0,1,1.3-1.3h3.41a1.3,1.3,0,0,1,1.29,1.3v2.7h2.71a1.3,1.3,0,0,1,1.29,1.3v3.4a1.3,1.3,0,0,1-1.29,1.3H21.44v2.7A1.3,1.3,0,0,1,20.15,25.2ZM17,23.6h2.81v-4h4V16.8h-4v-4H17v4H13v2.8h4Zm7.11-6.8Z" })));
    } };
exports.default = FirstAidKitLine;

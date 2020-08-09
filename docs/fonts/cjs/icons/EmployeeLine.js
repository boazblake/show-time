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
var EmployeeLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "employee_line"), mithril_1.default("g", { "id": "b1a346b4-a871-40fe-88af-10f4227eef9a", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M16.43,16.69a7,7,0,1,1,7-7A7,7,0,0,1,16.43,16.69Zm0-11.92a5,5,0,1,0,5,5A5,5,0,0,0,16.43,4.77Z" }), mithril_1.default("path", { "d": "M22,17.9A25.41,25.41,0,0,0,5.88,19.57a4.06,4.06,0,0,0-2.31,3.68V29.2a1,1,0,1,0,2,0V23.25a2,2,0,0,1,1.16-1.86,22.91,22.91,0,0,1,9.7-2.11,23.58,23.58,0,0,1,5.57.66Z" }), mithril_1.default("rect", { "x": 22.14, "y": 27.41, "width": 6.14, "height": 1.4 }), mithril_1.default("path", { "d": "M33.17,21.47H28v2h4.17v8.37H18V23.47h6.3v.42a1,1,0,0,0,2,0V20a1,1,0,0,0-2,0v1.47H17a1,1,0,0,0-1,1V32.84a1,1,0,0,0,1,1H33.17a1,1,0,0,0,1-1V22.47A1,1,0,0,0,33.17,21.47Z" })));
    } };
exports.default = EmployeeLine;

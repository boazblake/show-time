import m from 'mithril';
const CircleLine = { view: ({ attrs }) => m("svg", Object.assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), m("title", {}, "circle-line"), m("path", { "d": "M18,34A16,16,0,1,1,34,18,16,16,0,0,1,18,34ZM18,4A14,14,0,1,0,32,18,14,14,0,0,0,18,4Z", "class": "clr-i-outline clr-i-outline-path-1" }), m("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 })) };
export default CircleLine;

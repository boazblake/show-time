export const SHAPE =
  "const valueToPoint = (value, index, total) => {\n  var x = 0;\n  var y = -value * 0.8;\n  var angle = ((Math.PI * 2) / total) * index;\n  var cos = Math.cos(angle);\n  var sin = Math.sin(angle);\n  var tx = x * cos - y * sin + 100;\n  var ty = x * sin + y * cos + 100;\n  return {\n    x: tx,\n    y: ty\n  };\n}\n    \nconst statsToPoints = (stats) => {\n  var total = stats.length;\n  return stats.map((stat, i) => {\n      var point = valueToPoint(stat.value, i, total);\n      return point.x + \",\" + point.y;\n    })\n    .join(\" \");\n}\nconst update = stat => e => stat.value  = e.target.value\nconst remove = stat => stats => stats = stats.length > 3\n      ? stats.splice(stats.indexOf(stat), 1)\n      : 'Cant Delete Anymore'\nconst add = stat => e => {\n    e.preventDefault()\n    if(stat == '') return\n   stats.push({label:stat.toUpperCase(), value:100})\n   newlabel = ''\n } \n \nconst stats = [\n    { label: \"A\", value: 100 },\n    { label: \"B\", value: 100 },\n    { label: \"C\", value: 100 },\n    { label: \"D\", value: 100 },\n    { label: \"E\", value: 100 },\n    { label: \"F\", value: 100 }\n  ]\n  \nlet newlabel = ''\n\nconst AxisLabel = { view: ({attrs:{point, stat}}) =>\n  m('text', {x:point.x, y:point.y}, stat.label)}\n\nconst Polygraph = {\n  view: ({attrs:{stats, points}}) => m('g',[\n    m('polygon', {points}),\n    m('circle',{cx:100, cy:100, r:80}),\n    stats.map((stat, idx) => \n      m(AxisLabel, {\n        point:valueToPoint(+stat.value+10, idx, stats.length),\n        stat\n        })\n    )\n  ])\n}\n\nconst Controls = {\n  view:({attrs:{stats}}) => m('', [\n    stats.map(stat => m('.',[\n      m('label', stat.label),\n      m('input',{type:'range', oninput:update(stat), value:stat.value, min:0, max:100}),\n      m('span', stat.value),\n      m('button.remove',{onclick:e=>remove(stat)(stats)}, 'X')\n      ])),\n      m('form#add',[\n        m('input', {\n          oninput:e => newlabel = e.target.value,\n          name:'newlabel',\n          value:newlabel}),\n        m('button',{onclick: add(newlabel)},'Add')])\n      ]        \n  )\n}\n\nm.mount(document.getElementById('ShapeShifter'), {\n  view:() =>\n    m('.#demo', [\n      m('svg',{width:200, height:200}, m(Polygraph,{stats, points:statsToPoints(stats)})),\n      m(Controls, {stats}),\n      m('pre.#raw', JSON.stringify(stats, null, 4))\n    ])})"
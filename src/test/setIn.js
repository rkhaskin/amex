const immutable = require('immutable');

const original = {x: { y: { z: 123 }}}

const orig = immutable.fromJS(original);

const orig2 = orig.setIn(['x', 'y', 'p'], 456) // { x: { y: { z: 456 }}}
console.log(orig2.toJS());
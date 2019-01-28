const merge = require('deepmerge');

var x = {
    foo: { bar: 3 },
    array: [{
        does: 'work',
        too: [ 1, 2, 3 ]
    }]
}
 
var y = {
    foo: { baz: 4 },
    quux: 5,
    array: [{
        does: 'work',
        too: [ 4, 5, 6 ]
    }, {
        really: 'yes'
    }]
}
 
var expected = {
    foo: {
        bar: 3,
        baz: 4
    },
    array: [{
        does: 'work',
        too: [ 1, 2, 3 ]
    }, {
        does: 'work',
        too: [ 4, 5, 6 ]
    }, {
        really: 'yes'
    }],
    quux: 5
}

const a = {

    aa: {
        aaa: "hello"
    }
}

const b = {
    b: {
        bbb: "bye"
    }
}



const res= merge(a, b) // => expected
//console.log(JSON.stringify(res));

const defaultOpts = resourceOpts = opts = undefined;

const fetchOpts = merge.all([
    // httpMethod based on actionType passed
    { method: "GET" },
    defaultOpts || {},
    resourceOpts || {},
    opts || {},
  ]);
  console.log(JSON.stringify(fetchOpts));

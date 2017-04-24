const isExpression = require('./lab1.js').isExpression;

const test = (val, res)=> {
  return isExpression(val) === res ?
    true :
    setImmediate(()=>{
    throw Error(`Not the same ${val}, ${isExpression(val)}`)
  });
};

test('a', false);
test('A', true);
test('+AB', true);
test('%A', true);
test('aa', false);
test('A', true);
test('%%%%%%A', true);
test('++ABC', true);
test('+A+BC', true);
test('+A+%%%%%%%%BC', true);
test('+-/ABCA', true);
test('A', true);
test('A', true);
test('A', true);

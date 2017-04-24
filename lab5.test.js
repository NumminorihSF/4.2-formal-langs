const main = require('./lab5.js');

const test = (val, res)=> {
  return !!main(val) === res ?
    true :
    setImmediate(()=>{
      throw Error(`Not the same ${val}, ${!!main(val)}`)
    });
};

test('a', true);
test('b', true);
test('c', true);
test('z', true);
test('a*b', true);
test('a*a+b', true);
test('a*a/a', true);
test('(a+b*c)', true);
test('((b))', true);

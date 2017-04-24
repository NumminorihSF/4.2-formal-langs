const main = require('./lab3.js');

const test = (val, res)=> {
  return !!main(val) === res ?
    true :
    setImmediate(()=>{
      throw Error(`Not the same ${val}, ${!!main(val)}`)
    });
};

test('a', false);
test('ad', true);
test('ab', false);
test('aaaaaaaaaaaadc', false);
test('aaaaaaaaaabcd', true);
test('aaaaaaaaaabcbbbcbbd', true);
test('aaaaaaaaaabbd', true);
test('aaaaaaaaaabbbbbbd', true);
test('aaaaaaaaaabbbbbd', false);
test('aaaaaaaaaabb', true);
test('aaaaaaaaaabc', true);
test('aaaaaaaaaad', true);
test('bc', true);
test('bb', true);
test('d', true);

const RULES = Object.create(null);

function Pattern(exec) {
  this.exec = exec;
}

const any = (...patterns) => new Pattern(function (str, pos = 0) {
  for (let i = 0; i < patterns.length; i++) {
    const r = patterns[i].exec(str, pos);
    if (r) return r;
  }
  return null;
});

const seq = (...patterns) => new Pattern(function (str, pos = 0) {
  let i, r, end = pos, res = [];

  for (i = 0; i < patterns.length; i++) {
    r = patterns[i].exec(str, end);
    if (!r) return null;
    res.push(r.res);
    end = r.end;
  }

  return { res: res, end: end };
});

const char = (char) => char === '' ? endOfString : new Pattern(function(str, pos = 0) {
  if (str[pos] === char) {
    return { res: char, end: pos + 1 };
  }
  return null;
});

const endOfString = new Pattern(function(str, pos = 0) {
  if (str.length === pos + 1) {
    return { res: 'END', end: pos + 1 };
  }
  return null;
});

const rule = (ruleName) => new Pattern(function(str, pos = 0){
  if (ruleName in RULES) {
    return RULES[ruleName].exec(str, pos);
  }
  return null;
});

require('./lab5.json')
  .forEach((line) => {
    const [ruleName, body] = line.split('->');
    RULES[ruleName] = any(...body.split('|').map(part => {
      return seq(...part.split('').map(symbol => {
        if (isRuleName(symbol)) {
          return rule(symbol);
        }
        return char(symbol);
      }));
    }))
  });



function isRuleName(symbol) {
  return symbol.toLowerCase() !== symbol && symbol.toUpperCase() === symbol;
}

const mainRule = new Pattern(function(str, pos = 0){
  const res = any(...Object.keys(RULES).map(key => RULES[key])).exec(str, pos);
  if (!res) return null;
  if (res.end !== str.length) return null;
  return res;
});

module.exports = (str) => {
  const result = mainRule.exec(str);
  console.log(JSON.stringify(result, null, 2));
  return result;
};
const SEPARATOR = '\;';
const VARIABLES = 'QWERTYUIOPLKJHGFDSAZXCVBNM'.split('').concat(SEPARATOR);
const UNARY_OPERATOR = '!@%$'.split('');
const BINARY_OPERATOR = '+-/*'.split('');

function Pattern(exec) {
  this.exec = exec;
}

const any = (...patterns) => new Pattern(function (str, pos = 0) {
  for (let i = 0; i < patterns.length; i++) {
    const r = patterns[i].exec(str, pos);
    if (r) return r;
  }
});

const seq = (...patterns) => new Pattern(function (str, pos = 0) {
  let i, r, end = pos, res = [];

  for (i = 0; i < patterns.length; i++) {
    r = patterns[i].exec(str, end);
    if (!r) return;
    res.push(r.res);
    end = r.end;
  }

  return { res: res, end: end };
});


const variable = new Pattern((str, pos = 0) => {
  const char = str.charAt(pos);
  if (VARIABLES.includes(char)) {
    return {res: char, end: pos + 1};
  }
});

const unaryOperator = new Pattern((str, pos = 0) => {
  const char = str.charAt(pos);
  if (UNARY_OPERATOR.includes(char)) {
    return {res: char, end: pos + 1};
  }
});

const binaryOperator = new Pattern((str, pos = 0) => {
  const char = str.charAt(pos);
  if (BINARY_OPERATOR.includes(char)) {
    return {res: char, end: pos + 1};
  }
});

const expression = new Pattern((str, pos = 0)=> any(
  variable,
  seq(unaryOperator, expression),
  seq(binaryOperator, expression, expression)
).exec(str, pos));

function isExpression(str){
  const result = expression.exec(str);
  if (!result) return false;
  return result.end === str.length;
}

module.exports.isExpression = isExpression;

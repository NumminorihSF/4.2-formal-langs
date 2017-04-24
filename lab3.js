const START = 'a';
const END = 'c';
const SEQUENCE = '11211';
const RULES = transformTableToTree(require('./lab3.json'));

function transformTableToTree(table) {
  const res = {};
  table[0].forEach((currentState, i) => {
    res[currentState] = res[currentState] || {};
    res[currentState][table[1][i]] = res[currentState][table[1][i]] || [];
    res[currentState][table[1][i]].push(table[2][i]);
  });
  return res;
}

function getPrettyString(line, sequence){
  let res = `${line[0]}`;
  for(let i = 1; i < line.length; i++){
    res += ` -(${sequence[i-1]})-> ${line[i]}`;
  }
  return res;
}

module.exports = function(sequence){
  return sequence.split('').reduce(function(results, char, index){
    const nextVariants = [];
    results.forEach(function(line){
      const state = line.split('').pop();
      if (!(state in RULES)) return console.log(`There are not any start state == "${state}" in rules.`);
      if (!(char in RULES[state])) return console.log(`There are not any rule with state == "${state}" and signal == "${char}" in rules.`);
      RULES[state][char].forEach(state => nextVariants.push(`${line}${state}`));
    });
    return nextVariants;
  }, [START]).some(line => {
    const lastChar = line.split('').pop();
    if (lastChar !== END) {
      console.log(`${getPrettyString(line, sequence)} does not succeeds end on "${END}"`);
      return false;
    }
    return true;
  });
};

console.log(module.exports(SEQUENCE));
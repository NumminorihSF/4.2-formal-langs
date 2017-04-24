const STOP_SYMBOL = ';';
const SEQUENCE = '1.1235555345';
const FINAL_STATES = 'db';
const INIT_STATE = 'a';
const RULES = transformTableToTree(require('./lab2.json'));

function transformTableToTree(table) {
  const res = {};
  table[0].forEach((currentState, i) => {
    res[currentState] = res[currentState] || {};
    res[currentState][table[1][i]] = table[2][i];
  });
  return res;
}

function* stateMachine(rules, initState) {
  let state = initState;

  while(state !== STOP_SYMBOL) {
    const oldState = state;
    const action = yield state;
    console.log(state, action);
    state = rules[state][action];
    if (FINAL_STATES.includes(state)) {
      return state;
    }
    if (typeof state !== 'string') {
      throw new Error(`ABORT (${oldState} by ${action})`);
    }
  }
}

const dsm = stateMachine(RULES, INIT_STATE);
let res;
for(let i = 0; i < SEQUENCE.length; i++){
  res = dsm.next(SEQUENCE[i]);
  if (res.done) break;
}

console.log(res);

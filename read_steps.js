const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\blen2\\.gemini\\antigravity\\brain\\a426c99b-2c10-4177-9527-cc8ea530133a\\.system_generated\\logs\\transcript.jsonl', 'utf8').split('\n');
lines.forEach(l => {
  if (!l.trim()) return;
  const data = JSON.parse(l);
  if (data.step_index >= 135 && data.step_index <= 147) {
    console.log('=== STEP', data.step_index, data.type, '===');
    console.log(data.content || (data.tool_calls ? JSON.stringify(data.tool_calls) : ''));
  }
});

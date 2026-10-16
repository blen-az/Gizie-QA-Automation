const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
  const fileStream = fs.createReadStream('C:\\Users\\blen2\\.gemini\\antigravity\\brain\\a426c99b-2c10-4177-9527-cc8ea530133a\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('admin.json') || line.includes('storageState')) {
      const data = JSON.parse(line);
      console.log('Step:', data.step_index, data.type);
      if (data.tool_calls) {
        data.tool_calls.forEach(tc => {
          if (tc.name === 'run_command') console.log('COMMAND:', tc.args.CommandLine);
          if (tc.name === 'write_to_file') console.log('FILE:', tc.args.TargetFile);
        });
      }
    }
  }
}
searchTranscript();

const fs = require("fs");

const scenarios = {
  "with keepalive and cached agent": "api/keepalive/global",
  "with keepalive and recreated agent": "api/keepalive/scoped",
  "without keepalive and cached agent": "api/global",
  "without keepalive and recreated agent": "api/scoped",
};

const n = 1000;

async function test() {
  const url = process.argv[2];
  const results = {};

  for (const [scenario, path] of Object.entries(scenarios)) {
    for (let i = 0;i < n;i++) {
      console.log(scenario, i);

      const res = await fetch(`${url}/${path}`);
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const { duration } = await res.json();
      if (!results[scenario]) {
        results[scenario] = [];
      }

      results[scenario].push(duration);
    }
  }



  fs.writeFileSync("out.json", JSON.stringify(results))

}

test();

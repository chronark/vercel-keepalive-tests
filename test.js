const scenarios = {
  "with keepalive and cached agent": "api/keepalive/global",
  "with keepalive and recreated agent": "api/keepalive/scoped",
  "without keepalive and cached agent": "api/global",
  "without keepalive and recreated agent": "api/scoped",
};

const n = 10;

async function test() {
  const url = process.argv[2];
  const results = {};

  for (const [scenario, path] of Object.entries(scenarios)) {
    console.log(scenario);
    for (let i = 0; i < n; i++) {
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

  console.log(JSON.stringify(results, null, 2));
  console.log(
    JSON.stringify(
      Object.entries(results).map(([scenario, metrics]) => {
        const total = metrics.reduce((acc, m) => acc + m, 0);

        return {
          [scenario]: {
            total,
            avg: total / metrics.length,
          },
        };
      }),
      null,
      2,
    ),
  );
}

test();

import { randomUUID } from "crypto";

/**
 * Simple request to Upstash to measure latency
 *
 * The `agent` can be set from outside for easier testing
 */
export async function request(agent) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(["set", randomUUID(), randomUUID(), "ex", 60]),
  };
  if (typeof agent !== "undefined") {
    options.agent = agent;
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

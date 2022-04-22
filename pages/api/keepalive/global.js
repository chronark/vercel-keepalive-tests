import https from "https";
import { request } from "../../../lib/request";

/**
 * In this test the agent is recreated once and persisted in memory between function invocations
 */
const agent = new https.Agent({ keepAlive: true });

export default async function handler(req, res) {
  const start = Date.now();

  await request(agent);
  const duration = Date.now() - start;

  res.json({ duration });
  return res.end();
}

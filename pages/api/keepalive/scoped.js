import https from "https";
import { request } from "../../../lib/request";

export default async function handler(req, res) {
  /**
   * In this test the agent is recreated with ever yrequest and not persisted in memory between function invocations
   */
  const agent = new https.Agent({ keepAlive: true });
  const start = Date.now();

  await request(agent);
  const duration = Date.now() - start;

  res.json({ duration });
  return res.end();
}

import config from "../config"
import current from "../current"
import type { CurrentCode } from "../types"
import cachedFetch from "../utils/cachedFetch";

// TODO: add proper typing to currency code;
export default async function fetchRate(curCode: CurrentCode) {
  let res = await cachedFetch(config.baseUrl + curCode);
  if (res && res["conversion_rates"]) {
    return res["conversion_rates"] as Record<CurrentCode, number>[];
  }
  return null;
}
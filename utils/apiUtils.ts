import { Page, Locator } from '@playwright/test';
import { getURL } from './urlBuilder';
 
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchDataOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  expectedStatuses?: number[]; // e.g., [200], [201, 204], [400]
  log?: boolean;
  retries?: number;
  timeout?: number;
}

/**
 * Generic API utility for GET, POST, PUT, DELETE with expected status check and optional body/headers.
 */
export async function fetchData<T = any>(
  url: string,
  {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
    body,
    expectedStatuses = [200], //default to 200 check, can be changed to [404, 500] etc. for negative scenarios
    log = true,
    retries = 0,
    timeout = 10000,
  }: FetchDataOptions = {}
): Promise<{ data: T; status: number; raw: Response }> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // debug check (coment out)
      if (!expectedStatuses.includes(response.status)) {
        const errMsg = `Unexpected status: ${response.status}. Expected: ${expectedStatuses.join(', ')}`;
        if (log) console.error(`[API] ❌ ${method} ${url} - ${errMsg}`);
        throw new Error(errMsg);
      }

      let data: T;
      try {
        data = await response.json();
      } catch {
        // If no body (e.g. 204 No Content), return empty object
        data = {} as T;
      }

      // debug check (coment out)
      if (log) {
        console.log(`[API] ✅ ${method} ${url} [${response.status}]`, data);
      }

      return { data, status: response.status, raw: response };

    } catch (err: any) {
      if (attempt === retries) {
        if (log) console.error(`[API] ❌ ${method} ${url} failed after ${retries + 1} attempts`);
        throw err;
      }
      if (log) console.warn(`[API] Retry ${attempt + 1} for ${url} due to: ${err.message}`);
      attempt++;
    }
  }

  throw new Error('Unexpected API failure');
}

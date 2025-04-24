import { baseURLs, paths } from "../routeConfig";

/**
 * Constructs the full URL for a given base and path.
 * @param site - The base URL key.
 * @param path - The path key.
 * @returns The complete URL.
 */

export function getURL(site: keyof typeof baseURLs, path: keyof typeof paths): string {
  if (!baseURLs[site]) {
    throw new Error(`Invalid site key: ${site}`);
  }
  if (!paths[path]) {
    throw new Error(`Invalid path key: ${path}`);
  }
  return `${baseURLs[site]}${paths[path]}`;
}

import { baseURLs, paths } from "../config";

/**
 * Constructs the full URL for a given base and path.
 * @param site - The base URL key.
 * @param path - The path key.
 * @returns The complete URL.
 */

export function getURL(site: keyof typeof baseURLs, path: keyof typeof paths): string {
  return `${baseURLs[site]}${paths[path]}`;
}

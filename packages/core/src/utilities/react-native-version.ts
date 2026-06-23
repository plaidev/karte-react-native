/**
 * React Native version utility for KARTE SDK
 */

import { Platform } from 'react-native';

// Cache the version string to avoid repeated calculations
let cachedVersion: string | null = null;

/**
 * Gets the React Native version string in the format "major.minor.patch"
 * @returns React Native version string or 'unknown' if unable to determine
 */
export function getReactNativeVersion(): string {
  if (cachedVersion !== null) {
    return cachedVersion;
  }

  const version = Platform.constants?.reactNativeVersion;
  if (version && typeof version === 'object') {
    const { major, minor, patch } = version as {
      major?: number;
      minor?: number;
      patch?: number;
    };

    if (
      typeof major === 'number' &&
      typeof minor === 'number' &&
      typeof patch === 'number'
    ) {
      cachedVersion = `${major}.${minor}.${patch}`;
      return cachedVersion;
    }
  }

  cachedVersion = 'unknown';
  return cachedVersion;
}

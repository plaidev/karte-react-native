/**
 * Bridge info utility for adding React Native version to KARTE events
 */
import { getReactNativeVersion } from './react-native-version';

/**
 * Returns a new object with bridge_info added, handling null/undefined cases
 * @param values - The values object (can be undefined)
 * @returns A new object with bridge_info added (or a shallow copy if bridge_info already exists)
 */
export function withBridgeInfo(
  values?: Record<string, any>
): Record<string, any> {
  const baseValues = values ?? {};

  if ('bridge_info' in baseValues) {
    return { ...baseValues };
  }

  return {
    ...baseValues,
    bridge_info: {
      react_native_version: getReactNativeVersion(),
    },
  };
}

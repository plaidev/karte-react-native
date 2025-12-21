/**
 * React Native New Architecture detection utility for KARTE SDK
 */

// Cache the detection result to avoid repeated global object checks
let cachedIsNewArch: boolean | null = null;

/**
 * Detects if React Native New Architecture is enabled
 * @returns true if Fabric (new renderer) is enabled
 */
export function isNewArchitectureEnabled(): boolean {
  if (cachedIsNewArch !== null) {
    return cachedIsNewArch;
  }

  try {
    // Check for global nativeFabricUIManager (Fabric renderer)
    // @ts-ignore - global may not have this property
    cachedIsNewArch = global?.nativeFabricUIManager != null;
  } catch (error) {
    cachedIsNewArch = false;
  }

  return cachedIsNewArch;
}

/**
 * Resets the cached detection result (mainly for testing)
 * @internal
 */
export function resetCache(): void {
  cachedIsNewArch = null;
}

describe('New Architecture Detection', () => {
  beforeEach(() => {
    jest.resetModules();
    // Clear the global object to ensure clean state
    // @ts-ignore
    delete global.nativeFabricUIManager;
  });

  describe('isNewArchitectureEnabled', () => {
    it('should return true when nativeFabricUIManager is present', () => {
      // @ts-ignore
      global.nativeFabricUIManager = {};

      const {
        isNewArchitectureEnabled,
      } = require('../new-architecture-detection');
      expect(isNewArchitectureEnabled()).toBe(true);
    });

    it('should return false when nativeFabricUIManager is not present', () => {
      const {
        isNewArchitectureEnabled,
      } = require('../new-architecture-detection');
      expect(isNewArchitectureEnabled()).toBe(false);
    });

    it('should return false when nativeFabricUIManager is null', () => {
      // @ts-ignore
      global.nativeFabricUIManager = null;

      const {
        isNewArchitectureEnabled,
      } = require('../new-architecture-detection');
      expect(isNewArchitectureEnabled()).toBe(false);
    });

    it('should return false when nativeFabricUIManager is undefined', () => {
      // @ts-ignore
      global.nativeFabricUIManager = undefined;

      const {
        isNewArchitectureEnabled,
      } = require('../new-architecture-detection');
      expect(isNewArchitectureEnabled()).toBe(false);
    });

    it('should cache the result after first call', () => {
      // @ts-ignore
      global.nativeFabricUIManager = {};

      const {
        isNewArchitectureEnabled,
      } = require('../new-architecture-detection');
      const result1 = isNewArchitectureEnabled();

      // Change the global state after first call
      // @ts-ignore
      delete global.nativeFabricUIManager;

      const result2 = isNewArchitectureEnabled();

      // Should return cached value
      expect(result1).toBe(true);
      expect(result2).toBe(true);
    });
  });

  describe('resetCache', () => {
    it('should clear cached value and re-detect', () => {
      // @ts-ignore
      global.nativeFabricUIManager = {};

      const {
        isNewArchitectureEnabled,
        resetCache,
      } = require('../new-architecture-detection');

      // First call caches the value
      expect(isNewArchitectureEnabled()).toBe(true);

      // Clear global state
      // @ts-ignore
      delete global.nativeFabricUIManager;

      // Without reset, should still return cached value
      expect(isNewArchitectureEnabled()).toBe(true);

      // Reset cache
      resetCache();

      // Now should detect the new state
      expect(isNewArchitectureEnabled()).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle errors gracefully', () => {
      // Mock global to throw an error
      Object.defineProperty(global, 'nativeFabricUIManager', {
        get: () => {
          throw new Error('Access denied');
        },
        configurable: true,
      });

      const {
        isNewArchitectureEnabled,
      } = require('../new-architecture-detection');
      expect(isNewArchitectureEnabled()).toBe(false);

      // Clean up
      // @ts-ignore
      delete global.nativeFabricUIManager;
    });
  });
});

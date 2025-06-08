import { TurboModuleRegistry, NativeModules } from 'react-native';

describe('InAppMessaging TurboModule support tests', () => {
  let mockTurboModule: any;
  let mockNativeModule: any;
  let originalTurboModuleRegistryGet: typeof TurboModuleRegistry.get;

  beforeEach(() => {
    // Clear module cache
    jest.resetModules();

    // Setup mocks
    mockTurboModule = {
      isPresenting: jest.fn(() => true),
      dismiss: jest.fn(),
      suppress: jest.fn(),
      unsuppress: jest.fn(),
    };

    mockNativeModule = {
      isPresenting: jest.fn(() => false),
      dismiss: jest.fn(),
      suppress: jest.fn(),
      unsuppress: jest.fn(),
    };

    // Mock NativeModules
    NativeModules.RNKRTInAppMessagingModule = mockNativeModule;

    // Store original TurboModuleRegistry.get
    originalTurboModuleRegistryGet = TurboModuleRegistry.get;
  });

  afterEach(() => {
    // Restore original TurboModuleRegistry.get
    TurboModuleRegistry.get = originalTurboModuleRegistryGet;
  });

  describe('when TurboModule is available', () => {
    beforeEach(() => {
      // Mock TurboModuleRegistry.get to return the mock TurboModule
      TurboModuleRegistry.get = jest.fn((name: string) => {
        if (name === 'RNKRTInAppMessagingModule') {
          return mockTurboModule;
        }
        return null;
      });
    });

    it('should use TurboModule for isPresenting', () => {
      const { InAppMessaging } = require('../index');

      expect(InAppMessaging.isPresenting).toBe(true);
      expect(mockTurboModule.isPresenting).toHaveBeenCalled();
      expect(mockNativeModule.isPresenting).not.toHaveBeenCalled();
    });

    it('should use TurboModule for dismiss', () => {
      const { InAppMessaging } = require('../index');

      InAppMessaging.dismiss();

      expect(mockTurboModule.dismiss).toHaveBeenCalled();
      expect(mockNativeModule.dismiss).not.toHaveBeenCalled();
    });

    it('should use TurboModule for suppress', () => {
      const { InAppMessaging } = require('../index');

      InAppMessaging.suppress();

      expect(mockTurboModule.suppress).toHaveBeenCalled();
      expect(mockNativeModule.suppress).not.toHaveBeenCalled();
    });

    it('should use TurboModule for unsuppress', () => {
      const { InAppMessaging } = require('../index');

      InAppMessaging.unsuppress();

      expect(mockTurboModule.unsuppress).toHaveBeenCalled();
      expect(mockNativeModule.unsuppress).not.toHaveBeenCalled();
    });

    it('should handle all methods in sequence', () => {
      const { InAppMessaging } = require('../index');

      // Test a typical usage flow
      expect(InAppMessaging.isPresenting).toBe(true);
      InAppMessaging.dismiss();
      InAppMessaging.suppress();
      InAppMessaging.unsuppress();

      // Verify all TurboModule methods were called
      expect(mockTurboModule.isPresenting).toHaveBeenCalledTimes(1);
      expect(mockTurboModule.dismiss).toHaveBeenCalledTimes(1);
      expect(mockTurboModule.suppress).toHaveBeenCalledTimes(1);
      expect(mockTurboModule.unsuppress).toHaveBeenCalledTimes(1);

      // Verify no native module methods were called
      expect(mockNativeModule.isPresenting).not.toHaveBeenCalled();
      expect(mockNativeModule.dismiss).not.toHaveBeenCalled();
      expect(mockNativeModule.suppress).not.toHaveBeenCalled();
      expect(mockNativeModule.unsuppress).not.toHaveBeenCalled();
    });
  });

  describe('when TurboModule is not available', () => {
    beforeEach(() => {
      // Mock TurboModuleRegistry.get to return null (no TurboModule)
      TurboModuleRegistry.get = jest.fn(() => null);
    });

    it('should fall back to NativeModules for isPresenting', () => {
      const { InAppMessaging } = require('../index');

      expect(InAppMessaging.isPresenting).toBe(false);
      expect(mockNativeModule.isPresenting).toHaveBeenCalled();
      expect(mockTurboModule.isPresenting).not.toHaveBeenCalled();
    });

    it('should fall back to NativeModules for dismiss', () => {
      const { InAppMessaging } = require('../index');

      InAppMessaging.dismiss();

      expect(mockNativeModule.dismiss).toHaveBeenCalled();
    });

    it('should fall back to NativeModules for suppress', () => {
      const { InAppMessaging } = require('../index');

      InAppMessaging.suppress();

      expect(mockNativeModule.suppress).toHaveBeenCalled();
    });

    it('should fall back to NativeModules for unsuppress', () => {
      const { InAppMessaging } = require('../index');

      InAppMessaging.unsuppress();

      expect(mockNativeModule.unsuppress).toHaveBeenCalled();
    });

    it('should handle all methods in sequence with native module', () => {
      const { InAppMessaging } = require('../index');

      // Test a typical usage flow
      expect(InAppMessaging.isPresenting).toBe(false);
      InAppMessaging.dismiss();
      InAppMessaging.suppress();
      InAppMessaging.unsuppress();

      // Verify all native module methods were called
      expect(mockNativeModule.isPresenting).toHaveBeenCalledTimes(1);
      expect(mockNativeModule.dismiss).toHaveBeenCalledTimes(1);
      expect(mockNativeModule.suppress).toHaveBeenCalledTimes(1);
      expect(mockNativeModule.unsuppress).toHaveBeenCalledTimes(1);
    });
  });

  describe('module switching behavior', () => {
    it('should consistently use the same module after initialization', () => {
      // First load with TurboModule available
      TurboModuleRegistry.get = jest.fn((name: string) => {
        if (name === 'RNKRTInAppMessagingModule') {
          return mockTurboModule;
        }
        return null;
      });

      const { InAppMessaging: InAppMessaging1 } = require('../index');
      InAppMessaging1.dismiss();
      expect(mockTurboModule.dismiss).toHaveBeenCalledTimes(1);

      // Change TurboModuleRegistry.get after module is loaded
      TurboModuleRegistry.get = jest.fn(() => null);

      // Module should still use TurboModule since it was already initialized
      InAppMessaging1.dismiss();
      expect(mockTurboModule.dismiss).toHaveBeenCalledTimes(2);
      expect(mockNativeModule.dismiss).not.toHaveBeenCalled();
    });
  });
});

import { TurboModuleRegistry, NativeModules } from 'react-native';

describe('Variables TurboModule support tests', () => {
  let mockTurboModule: any;
  let mockNativeModule: any;
  let originalTurboModuleRegistryGet: typeof TurboModuleRegistry.get;

  beforeEach(() => {
    // Clear module cache
    jest.resetModules();

    // Setup mocks
    mockTurboModule = {
      fetch: jest.fn(() => Promise.resolve()),
      getVariable: jest.fn((key: string) => `turbo-${key}`),
      getString: jest.fn(
        (key: string, _defaultValue: string) => `turbo-string-${key}`
      ),
      getInteger: jest.fn((_key: string, _defaultValue: number) => 42),
      getDouble: jest.fn((_key: string, _defaultValue: number) => 3.14),
      getBoolean: jest.fn((_key: string, _defaultValue: boolean) => true),
      getArray: jest.fn((_key: string, _defaultValue: Array<any>) => [
        'turbo',
        'array',
      ]),
      getObject: jest.fn((_key: string, _defaultValue: object) => ({
        turbo: 'object',
      })),
      trackOpen: jest.fn(),
      trackClick: jest.fn(),
    };

    mockNativeModule = {
      fetch: jest.fn(() => Promise.resolve()),
      getVariable: jest.fn((key: string) => `native-${key}`),
      getString: jest.fn(
        (key: string, _defaultValue: string) => `native-string-${key}`
      ),
      getInteger: jest.fn((_key: string, _defaultValue: number) => 24),
      getDouble: jest.fn((_key: string, _defaultValue: number) => 2.71),
      getBoolean: jest.fn((_key: string, _defaultValue: boolean) => false),
      getArray: jest.fn((_key: string, _defaultValue: Array<any>) => [
        'native',
        'array',
      ]),
      getObject: jest.fn((_key: string, _defaultValue: object) => ({
        native: 'object',
      })),
      trackOpen: jest.fn(),
      trackClick: jest.fn(),
    };

    // Mock NativeModules
    NativeModules.RNKRTVariablesModule = mockNativeModule;

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
        if (name === 'RNKRTVariablesModule') {
          return mockTurboModule;
        }
        return null;
      });
    });

    it('should use TurboModule for fetch', async () => {
      const { Variables } = require('../index');

      await Variables.fetch();

      expect(mockTurboModule.fetch).toHaveBeenCalled();
      expect(mockNativeModule.fetch).not.toHaveBeenCalled();
    });

    it('should use TurboModule for getVariable', () => {
      const { Variables } = require('../index');

      const variable = Variables.getVariable('test_key');

      expect(variable.name).toBe('turbo-test_key');
      expect(mockTurboModule.getVariable).toHaveBeenCalledWith('test_key');
      expect(mockNativeModule.getVariable).not.toHaveBeenCalled();
    });

    it('should use TurboModule for Variable methods', () => {
      const { Variables } = require('../index');

      const variable = Variables.getVariable('test_key');

      expect(variable.getString('default')).toBe('turbo-string-turbo-test_key');
      expect(variable.getInteger(0)).toBe(42);
      expect(variable.getDouble(0.0)).toBe(3.14);
      expect(variable.getBoolean(false)).toBe(true);
      expect(variable.getArray([])).toEqual(['turbo', 'array']);
      expect(variable.getObject({})).toEqual({ turbo: 'object' });

      expect(mockTurboModule.getString).toHaveBeenCalledWith(
        'turbo-test_key',
        'default'
      );
      expect(mockTurboModule.getInteger).toHaveBeenCalledWith(
        'turbo-test_key',
        0
      );
      expect(mockTurboModule.getDouble).toHaveBeenCalledWith(
        'turbo-test_key',
        0.0
      );
      expect(mockTurboModule.getBoolean).toHaveBeenCalledWith(
        'turbo-test_key',
        false
      );
      expect(mockTurboModule.getArray).toHaveBeenCalledWith(
        'turbo-test_key',
        []
      );
      expect(mockTurboModule.getObject).toHaveBeenCalledWith(
        'turbo-test_key',
        {}
      );

      // Ensure native module was not called
      expect(mockNativeModule.getString).not.toHaveBeenCalled();
      expect(mockNativeModule.getInteger).not.toHaveBeenCalled();
      expect(mockNativeModule.getDouble).not.toHaveBeenCalled();
      expect(mockNativeModule.getBoolean).not.toHaveBeenCalled();
      expect(mockNativeModule.getArray).not.toHaveBeenCalled();
      expect(mockNativeModule.getObject).not.toHaveBeenCalled();
    });

    it('should use TurboModule for tracking methods', () => {
      const { Variables } = require('../index');

      const variable1 = Variables.getVariable('key1');
      const variable2 = Variables.getVariable('key2');
      const variables = [variable1, variable2];
      const values = { custom: 'data' };

      Variables.trackOpen(variables, values);
      Variables.trackClick(variables, values);

      expect(mockTurboModule.trackOpen).toHaveBeenCalledWith(
        ['turbo-key1', 'turbo-key2'],
        values
      );
      expect(mockTurboModule.trackClick).toHaveBeenCalledWith(
        ['turbo-key1', 'turbo-key2'],
        values
      );

      // Ensure native module was not called
      expect(mockNativeModule.trackOpen).not.toHaveBeenCalled();
      expect(mockNativeModule.trackClick).not.toHaveBeenCalled();
    });

    it('should normalize Date objects in tracking values', () => {
      const { Variables } = require('../index');

      const variable = Variables.getVariable('key');
      const testDate = new Date(1000);

      Variables.trackOpen([variable], { date: testDate });
      Variables.trackClick([variable], { date: testDate });

      expect(mockTurboModule.trackOpen).toHaveBeenCalledWith(['turbo-key'], {
        date: 1,
      });
      expect(mockTurboModule.trackClick).toHaveBeenCalledWith(['turbo-key'], {
        date: 1,
      });
    });
  });

  describe('when TurboModule is not available', () => {
    beforeEach(() => {
      // Mock TurboModuleRegistry.get to return null (no TurboModule)
      TurboModuleRegistry.get = jest.fn(() => null);
    });

    it('should fall back to NativeModules for fetch', async () => {
      const { Variables } = require('../index');

      await Variables.fetch();

      expect(mockNativeModule.fetch).toHaveBeenCalled();
      expect(mockTurboModule.fetch).not.toHaveBeenCalled();
    });

    it('should fall back to NativeModules for getVariable', () => {
      const { Variables } = require('../index');

      const variable = Variables.getVariable('test_key');

      expect(variable.name).toBe('native-test_key');
      expect(mockNativeModule.getVariable).toHaveBeenCalledWith('test_key');
    });

    it('should fall back to NativeModules for Variable methods', () => {
      const { Variables } = require('../index');

      const variable = Variables.getVariable('test_key');

      expect(variable.getString('default')).toBe(
        'native-string-native-test_key'
      );
      expect(variable.getInteger(0)).toBe(24);
      expect(variable.getDouble(0.0)).toBe(2.71);
      expect(variable.getBoolean(true)).toBe(false);
      expect(variable.getArray([])).toEqual(['native', 'array']);
      expect(variable.getObject({})).toEqual({ native: 'object' });

      expect(mockNativeModule.getString).toHaveBeenCalledWith(
        'native-test_key',
        'default'
      );
      expect(mockNativeModule.getInteger).toHaveBeenCalledWith(
        'native-test_key',
        0
      );
      expect(mockNativeModule.getDouble).toHaveBeenCalledWith(
        'native-test_key',
        0.0
      );
      expect(mockNativeModule.getBoolean).toHaveBeenCalledWith(
        'native-test_key',
        true
      );
      expect(mockNativeModule.getArray).toHaveBeenCalledWith(
        'native-test_key',
        []
      );
      expect(mockNativeModule.getObject).toHaveBeenCalledWith(
        'native-test_key',
        {}
      );
    });

    it('should fall back to NativeModules for tracking methods', () => {
      const { Variables } = require('../index');

      const variable1 = Variables.getVariable('key1');
      const variable2 = Variables.getVariable('key2');
      const variables = [variable1, variable2];
      const values = { custom: 'data' };

      Variables.trackOpen(variables, values);
      Variables.trackClick(variables, values);

      expect(mockNativeModule.trackOpen).toHaveBeenCalledWith(
        ['native-key1', 'native-key2'],
        values
      );
      expect(mockNativeModule.trackClick).toHaveBeenCalledWith(
        ['native-key1', 'native-key2'],
        values
      );
    });
  });
});

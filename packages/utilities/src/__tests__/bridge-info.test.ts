import { withBridgeInfo } from '../bridge-info';
import * as rnVersion from '../react-native-version';
import * as newArchDetection from '../new-architecture-detection';

// Mock the getReactNativeVersion function
jest.mock('../react-native-version', () => ({
  getReactNativeVersion: jest.fn(() => '0.72.4'),
}));

// Mock the isNewArchitectureEnabled function
jest.mock('../new-architecture-detection', () => ({
  isNewArchitectureEnabled: jest.fn(() => false),
}));

describe('Bridge Info Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('withBridgeInfo', () => {
    it('should handle undefined, null, empty, and optional values', () => {
      expect(withBridgeInfo(undefined)).toEqual({
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      });

      expect(withBridgeInfo(null as any)).toEqual({
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      });

      expect(withBridgeInfo({})).toEqual({
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      });

      expect(withBridgeInfo()).toEqual({
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      });
    });

    it('should add bridge_info to object with existing properties', () => {
      const values = {
        eventName: 'test_event',
        userId: '123',
        customData: { foo: 'bar' },
      };

      const result = withBridgeInfo(values);
      expect(result).toEqual({
        eventName: 'test_event',
        userId: '123',
        customData: { foo: 'bar' },
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      });
    });

    it('should handle nested objects and arrays', () => {
      const values = {
        user: {
          id: '123',
          profile: { name: 'Test User' },
        },
        items: ['item1', 'item2'],
        tags: [{ name: 'tag1' }, { name: 'tag2' }],
      };

      const result = withBridgeInfo(values);
      expect(result).toEqual({
        user: {
          id: '123',
          profile: { name: 'Test User' },
        },
        items: ['item1', 'item2'],
        tags: [{ name: 'tag1' }, { name: 'tag2' }],
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      });
    });

    it('should not override existing bridge_info', () => {
      const values = {
        eventName: 'test_event',
        bridge_info: {
          existing_field: 'existing_value',
          react_native_version: '0.70.0',
        },
      };

      const result = withBridgeInfo(values);
      expect(result).not.toBe(values); // Should return a new object, not the same reference
      expect(result).toEqual({
        eventName: 'test_event',
        bridge_info: {
          existing_field: 'existing_value',
          react_native_version: '0.70.0',
        },
      });
    });

    it('should handle "unknown" version correctly', () => {
      // Mock getReactNativeVersion to return 'unknown'
      (rnVersion.getReactNativeVersion as jest.Mock).mockReturnValueOnce(
        'unknown'
      );

      const result = withBridgeInfo({ test: 'value' });
      expect(result).toEqual({
        test: 'value',
        bridge_info: {
          react_native_version: 'unknown',
          new_arch: false,
        },
      });
    });
  });

  describe('Integration with getReactNativeVersion', () => {
    it('should call getReactNativeVersion exactly once per call', () => {
      const mockGetVersion = rnVersion.getReactNativeVersion as jest.Mock;
      mockGetVersion.mockClear();

      withBridgeInfo({ test: 'value' });
      expect(mockGetVersion).toHaveBeenCalledTimes(1);
    });

    it('should not call getReactNativeVersion when bridge_info exists', () => {
      const mockGetVersion = rnVersion.getReactNativeVersion as jest.Mock;
      mockGetVersion.mockClear();

      const values = {
        bridge_info: { existing: 'data' },
      };

      withBridgeInfo(values);
      expect(mockGetVersion).not.toHaveBeenCalled();
    });
  });

  describe('Integration with New Architecture detection', () => {
    it('should include New Architecture flag when enabled', () => {
      const mockIsNewArch =
        newArchDetection.isNewArchitectureEnabled as jest.Mock;
      mockIsNewArch.mockReturnValueOnce(true);

      const result = withBridgeInfo({ test: 'value' });
      expect(result).toEqual({
        test: 'value',
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: true,
        },
      });
    });

    it('should include New Architecture flag when disabled', () => {
      const mockIsNewArch =
        newArchDetection.isNewArchitectureEnabled as jest.Mock;
      mockIsNewArch.mockReturnValueOnce(false);

      const result = withBridgeInfo({ test: 'value' });
      expect(result).toEqual({
        test: 'value',
        bridge_info: {
          react_native_version: '0.72.4',
          new_arch: false,
        },
      });
    });

    it('should call isNewArchitectureEnabled exactly once per call', () => {
      const mockIsNewArch =
        newArchDetection.isNewArchitectureEnabled as jest.Mock;
      mockIsNewArch.mockClear();

      withBridgeInfo({ test: 'value' });
      expect(mockIsNewArch).toHaveBeenCalledTimes(1);
    });

    it('should not call isNewArchitectureEnabled when bridge_info exists', () => {
      const mockIsNewArch =
        newArchDetection.isNewArchitectureEnabled as jest.Mock;
      mockIsNewArch.mockClear();

      const values = {
        bridge_info: { existing: 'data' },
      };

      withBridgeInfo(values);
      expect(mockIsNewArch).not.toHaveBeenCalled();
    });
  });
});

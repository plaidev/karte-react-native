describe('React Native Version Utility', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return correct version string when Platform.constants is available', () => {
    jest.mock('react-native', () => ({
      Platform: {
        constants: {
          reactNativeVersion: {
            major: 0,
            minor: 72,
            patch: 4,
          },
        },
      },
    }));

    const { getReactNativeVersion } = require('../react-native-version');
    const version = getReactNativeVersion();
    expect(version).toBe('0.72.4');
  });

  it('should cache the version after first call', () => {
    jest.mock('react-native', () => ({
      Platform: {
        constants: {
          reactNativeVersion: {
            major: 0,
            minor: 72,
            patch: 4,
          },
        },
      },
    }));

    const { getReactNativeVersion } = require('../react-native-version');
    const version1 = getReactNativeVersion();
    const version2 = getReactNativeVersion();

    expect(version1).toBe('0.72.4');
    expect(version2).toBe('0.72.4');
    expect(version1).toBe(version2);
  });

  it('should return "unknown" when Platform.constants is undefined', () => {
    jest.mock('react-native', () => ({
      Platform: {},
    }));

    const { getReactNativeVersion } = require('../react-native-version');
    const version = getReactNativeVersion();
    expect(version).toBe('unknown');
  });

  it('should return "unknown" when reactNativeVersion is undefined', () => {
    jest.mock('react-native', () => ({
      Platform: {
        constants: {},
      },
    }));

    const { getReactNativeVersion } = require('../react-native-version');
    const version = getReactNativeVersion();
    expect(version).toBe('unknown');
  });

  it('should return "unknown" when version fields are not numbers', () => {
    jest.mock('react-native', () => ({
      Platform: {
        constants: {
          reactNativeVersion: {
            major: '0',
            minor: '72',
            patch: '4',
          },
        },
      },
    }));

    const { getReactNativeVersion } = require('../react-native-version');
    const version = getReactNativeVersion();
    expect(version).toBe('unknown');
  });

  it('should return "unknown" when version object is missing fields', () => {
    jest.mock('react-native', () => ({
      Platform: {
        constants: {
          reactNativeVersion: {
            major: 0,
            minor: 72,
            // patch is missing
          },
        },
      },
    }));

    const { getReactNativeVersion } = require('../react-native-version');
    const version = getReactNativeVersion();
    expect(version).toBe('unknown');
  });
});

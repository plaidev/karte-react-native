/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// https://mmazzarolo.com/blog/2021-09-18-running-react-native-everywhere-mobile/
const exclusionList = require('metro-config/src/defaults/exclusionList');
const { getMetroTools } = require('react-native-monorepo-tools');

const metroTools = getMetroTools();

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // Add additional Yarn workspace package roots to the module map.
  // This allows importing importing from all the project's packages.
  watchFolders: metroTools.watchFolders,
  resolver: {
    // Ensure we resolve nohoist libraries from this directory.
    blockList: exclusionList(metroTools.blockList),
    extraNodeModules: metroTools.extraNodeModules,
  },
};

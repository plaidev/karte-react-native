const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const packages = path.resolve(root, 'packages');
const workspaces = fs
  .readdirSync(packages)
  .filter((p) => !p.startsWith('.'))
  .map((p) => path.join(packages, p));

const modules = workspaces
  .map((it) => {
    const pak = JSON.parse(
      fs.readFileSync(path.join(it, 'package.json'), 'utf8')
    );
    return { it, pak };
  })
  .reduce(
    (acc, cur) => (acc[cur.pak.name] = path.join(cur.it, cur.pak.source)),
    {}
  );

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: modules,
      },
    ],
  ],
};

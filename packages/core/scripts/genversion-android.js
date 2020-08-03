const fs = require('fs');
const path = require('path');

const version = require('../lib/version');
const outputPath = path.resolve(
  __dirname,
  '..',
  'android',
  'src/main/java/io/karte/react',
  'ReactNativeKarteVersion.kt'
);
const template = `
package io.karte.react

// generated file - do not modify or commit
object ReactNativeKarteVersion {
  const val VERSION = "version_number"
}
`;

fs.writeFileSync(
  outputPath,
  template.replace('version_number', `${version}`),
  'utf8'
);

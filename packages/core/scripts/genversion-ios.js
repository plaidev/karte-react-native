const fs = require('fs');
const path = require('path');

const version = require('../lib/version');
const outputPath = path.resolve(
  __dirname,
  '..',
  'ios',
  'RNKRTCore',
  'RNKRTVersion.m'
);
const template = `// generated file - do not modify or commit
NSString* const RNKRTVersionString = @"VERSION";
`;

fs.writeFileSync(
  outputPath,
  template.replace('@"VERSION"', `@"${version}"`),
  'utf8'
);

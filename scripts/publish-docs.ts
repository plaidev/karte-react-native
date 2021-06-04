const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const compareVersions = require('compare-versions');
const exitHook = require('exit-hook');

class Git {
  private branch: string;
  workspace: string;
  constructor(private repository: string, workspace: string) {
    this.workspace = path.join(workspace, 'repository');
    this.branch = 'master';
  }

  clone() {
    return execSync(`git clone ${this.repository} ${this.workspace}`);
  }

  checkout(branch_name: string) {
    process.chdir(this.workspace);
    execSync(`git checkout -b ${branch_name}`);
    this.branch = branch_name;
  }

  add() {
    process.chdir(this.workspace);
    execSync('git add .');
  }

  commit(message: string) {
    process.chdir(this.workspace);
    execSync(`git commit -m '${message}'`);
  }

  push() {
    process.chdir(this.workspace);
    execSync(`git push origin ${this.branch}`);
  }
}

class Documents {
  version: string;

  constructor(
    private module_name: string,
    private platform: string,
    private workspace: string
  ) {
    this.version = this.readVersion();
    console.log(`Documents: ${module_name}, ${this.version}`);
  }

  publish(force: boolean = false) {
    const ver_docs_dir = this.getVersionDir();
    if (fs.existsSync(ver_docs_dir) && !force) {
      console.log(
        `${this.module_name} ${this.version} documents already exist.`
      );
      return false;
    }

    this.copyVersionDocs();
    this.copyLatestDocs();
    return true;
  }

  private readVersion() {
    process.chdir(this.workspace);
    const pkg = require(`../packages/${this.module_name}/package.json`);
    return pkg.version;
  }

  private copyVersionDocs() {
    const module_docs_dir = this.getModuleDir();
    const ver_docs_dir = this.getVersionDir();
    if (fs.existsSync(ver_docs_dir)) {
      fs.removeSync(ver_docs_dir);
    }
    fs.mkdirsSync(module_docs_dir);
    fs.copySync(this.getGeneratedDocsDir(), ver_docs_dir);
    const version_file = path.join(ver_docs_dir, 'version');
    execSync(`echo ${this.version} > ${version_file}`);
  }

  private copyLatestDocs() {
    const module_docs_dir = this.getModuleDir();
    const latest_docs_dir = this.getLatestDir();
    if (fs.existsSync(latest_docs_dir)) {
      const version = this.getLatestDocsVersion();
      if (compareVersions.compare(this.version, version, '>=')) {
        fs.removeSync(latest_docs_dir);
      } else {
        return;
      }
    }
    fs.mkdirsSync(module_docs_dir);
    fs.copySync(this.getGeneratedDocsDir(), latest_docs_dir);
    const version_file = path.join(latest_docs_dir, 'version');
    execSync(`echo ${this.version} > ${version_file}`);
  }

  private getLatestDocsVersion(): string | undefined {
    const vpath = path.join(this.getLatestDir(), 'version');
    if (fs.existsSync(vpath)) {
      return fs.readFileSync(vpath).toString().trim();
    }
    return undefined;
  }

  private getGeneratedDocsDir(): string {
    return path.join(
      this.workspace,
      '..',
      'packages',
      this.module_name,
      'docs'
    );
  }

  private getLatestDir(): string {
    return path.join(this.getModuleDir(), 'latest');
  }

  private getVersionDir(): string {
    return path.join(this.getModuleDir(), this.version);
  }

  private getModuleDir(): string {
    return path.join(this.getPlatformDir(), this.module_name);
  }

  private getPlatformDir(): string {
    return path.join(this.workspace, 'repository', 'docs', this.platform);
  }
}

class Command {
  private force: boolean = false;
  workspace: string = '';

  constructor() {
    this.workspace = path.resolve(fs.mkdtempSync('.pub_doc_tmp'));
    exitHook(() => {
      this.clean();
    });
  }

  clean() {
    console.log(`Remove workspace => ${this.workspace}`);
    fs.removeSync(this.workspace);
  }

  run() {
    const git = new Git(
      'https://github.com/plaidev/karte-sdk-docs.git',
      this.workspace
    );
    if (!git.clone()) {
      console.log('Failed to clone git repository.');
      process.exit(1);
    }

    const platform = 'react-native';
    const docs_dir = path.join(git.workspace, 'docs', platform);
    fs.mkdirsSync(docs_dir);
    const modules = [
      'core',
      'in-app-messaging',
      'notification',
      'variables',
      // 'visualtracking',
    ];
    modules.forEach((mod) => {
      const docs = new Documents(mod, platform, this.workspace);
      if (docs.publish(this.force)) {
        git.add();
        git.commit(`[${platform}] Add ${mod} ${docs.version} documents`);
        git.push();
      }
    });
  }
}

const command = new Command();
command.run();

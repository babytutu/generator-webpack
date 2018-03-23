const Generator = require('yeoman-generator');
let config = {}

module.exports = class extends Generator {
  prompting() {
    return this.prompt(
      [
        {
          type    : 'input',
          name    : 'name',
          message : 'Your project name',
          default : this.appname // Default to current folder name
        },
      ]).then((answers) => {
        config = answers
      }
    );
  }

  writing() {
    this.fs.copy(
      this.templatePath('webpack-demo'),
      this.destinationRoot(),
      {
        globOptions: {
          ignore: [
            this.templatePath('webpack-demo/.git'),
            this.templatePath('webpack-demo/demo/**'),
            this.templatePath('webpack-demo/package.json'),
            this.templatePath('webpack-demo/package-lock.json'),
            this.templatePath('webpack-demo/README.md'),
          ],
          dot: true
        }
      }
    );
    this.fs.copyTpl(
      this.templatePath('init/package.json'),
      this.destinationPath('package.json'),
      config
    )
    this.fs.copyTpl(
      this.templatePath('init/README.md'),
      this.destinationPath('README.md'),
    )
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }

  end() {
    this.log('Yeoman Initialization has been done. Have fun!')
  }
}
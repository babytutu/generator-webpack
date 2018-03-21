const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('webpack-demo'),
      this.destinationRoot(),
      {
        globOptions: {
          ignore: [
            this.templatePath('webpack-demo/.git'),
            this.templatePath('webpack-demo/demo/**'),
          ],
          dot: true
        }
      }
    );
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
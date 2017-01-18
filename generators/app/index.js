'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var fse = require("fs-extra");
const path = require("path");
var mkdirp = require("mkdirp");
var _ = require("lodash");

module.exports = Generator.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stunning ' + chalk.red('generator-muiapp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Please input project name (mui-app):',
      default: 'mui-app'
    }, {
      type: 'input',
      name: 'applicationId',
      message: 'Please input project applicationId (com.hz.muiapp.Hello):',
      default: 'com.hz.muiapp.Hello'
    }, {
      type: 'input',
      name: 'projectDesc',
      message: 'Please input project description:',
    }, {
      type: 'input',
      name: 'projectAuthor',
      message: 'Author (huangke)',
      default: 'huangke'
    }, {
      type: 'list',
      name: 'projectLicense',
      message: 'Please choose license:',
      choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
    }];


    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  defaults: function() {
    if (path.basename(this.destinationPath()) != this.props.projectName) {
      this.log('your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I \'ll automatically create this folder.'
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  },

  writing: function() {
    // 需要替换项目名称内容的文件：HBuilder-Hello.iml、.idea\modules.xml、.idea\workspace.xml、app\src\main\res\values\strings.xml

    var readmeTmpl = _.template(this.fs.read(this.templatePath('./base/README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTmpl({
      project_name: this.props.projectName,
      project_license: this.props.projectLicense,
      project_author: this.props.projectAuthor
    }));

    fse.copy(this.templatePath('gradle'), this.destinationPath('gradle'));

    var strings_tpl = _.template(this.fs.read(this.templatePath('./base/strings.xml')));
    this.fs.write(this.destinationPath('app\\src\\main\\res\\values\\strings.xml'), strings_tpl({ project_name: this.props.projectName }));

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('build.gradle'),
      this.destinationPath('build.gradle')
    );
    this.fs.copy(
      this.templatePath('gradlew'),
      this.destinationPath('gradlew')
    );
    this.fs.copy(
      this.templatePath('gradlew.bat'),
      this.destinationPath('gradlew.bat')
    );
    this.fs.copy(
      this.templatePath('settings.gradle'),
      this.destinationPath('settings.gradle')
    );
    // app名称需要替换的文件：app\src\main\assets\apps\MuiApp\www\manifest.json、app\src\main\assets\data\control.xml
    //另外app\src\main\assets\apps\MuiApp，MuiApp这个目录名要变

    var tpl_www_path = this.templatePath('www');
    var dest_www_path = this.destinationPath('app\\src\\main\\assets\\apps\\' + this.props.projectName + "\\www");

    fse.copy(this.templatePath('app'), this.destinationPath('app'), function(eror) {
      if (eror) return this.log("copy app dir error.");
      fse.copy(tpl_www_path, dest_www_path);

    });

    var manifest_tpl = _.template(this.fs.read(this.templatePath('./base/manifest.json')));
    this.fs.write(this.destinationPath('app\\src\\main\\assets\\apps\\' + this.props.projectName + '\\www\\manifest.json'), manifest_tpl({ project_name: this.props.projectName }));

    var control_tpl = _.template(this.fs.read(this.templatePath('./base/control.xml')));
    this.fs.write(this.destinationPath('app\\src\\main\\assets\\data\\control.xml'), control_tpl({ project_name: this.props.projectName }));

    //app\build.gradle中的applicationId需要修改，否则新生成的app均是一样的，安装时会将原来的覆盖掉，同样修改AndroidManifest.xml中的package
    var build_gradle_tpl = _.template(this.fs.read(this.templatePath('./base/build.gradle')));
    this.fs.write(this.destinationPath('app\\build.gradle'), build_gradle_tpl({ applicationId: this.props.applicationId }));

    var androidmanifest_tpl = _.template(this.fs.read(this.templatePath('./base/AndroidManifest.xml')));
    this.fs.write(this.destinationPath('app\\src\\main\\AndroidManifest.xml'), androidmanifest_tpl({ applicationId: this.props.applicationId }));

  },

  install: function() {
    //不是前端node项目，没依赖可以安装
    //this.installDependencies();
  }
});

/*
 * grunt-compwnent
 * https://github.com/merrick.christensen/grunt-compwnent
 *
 * Copyright (c) 2012 Merrick Christensen
 * Licensed under the MIT license.
 */

var handlebars = require('handlebars');
var path = require('path');
var _ = require('underscore');
var fs = require('fs');

var compile = function(src) {
  return handlebars.precompile(src);
};

var getPartials = function(src) {
  var nodes = handlebars.parse(src);
  
  function recursiveNodeSearch( statements, res ) {
    statements.forEach(function ( statement ) {
      if ( statement && statement.type === 'partial' ) {
        res.push(statement.id.string);
      }
      if ( statement && statement.program && statement.program.statements ) {
        recursiveNodeSearch( statement.program.statements, res );
      }
      if ( statement && statement.program && statement.program.inverse && statement.program.inverse.statements ) {
        recursiveNodeSearch( statement.program.inverse.statements, res );
      }
    });
    return res;
  }
  
  var res = [];
  
  if ( nodes && nodes.statements ) {
    res = recursiveNodeSearch( nodes.statements, [] );
  }
  
  return _.unique(res);
};

var getDependencies = function(src) {
  var partials = _.map(getPartials(src), function(partial) {
    return partial.replace(/\./g, path.sep);
  });

  return partials;
};

var getStyles = function(src, stylesheet) {
  src = '/* File: ' + stylesheet + ' */\n' + src;
  return src.replace(/\n/g, ' ');
};


module.exports = function(grunt) {
  
  var template = grunt.file.read(__dirname+'/templates/template.txt');
  var partialTemplate = grunt.file.read(__dirname+'/templates/partial.txt');
  var stylesheetTemplate = grunt.file.read(__dirname+'/templates/stylesheets.txt');

  grunt.registerTask('compwnent', 'Compile your assets to AMD modules.', function() {
    var config = grunt.config(this.name);
    var files = grunt.file.expandFiles(config.templates + '/**/*.handlebars');

    files.forEach(function(file){
      
      var src = grunt.file.read(file);
      
      // The file name without the extension.
      var fileName = path.basename(file, path.extname(file));
      
      var name = path.dirname(file) + path.sep + fileName;
      
      var styles = '';
      var stylesheet = name.replace(config.templates, config.stylesheets) + '.css';
      if (fs.existsSync(stylesheet)) {
        styles = grunt.template.process(stylesheetTemplate, {
          styles: getStyles(grunt.file.read(stylesheet), stylesheet),
          name: name
        });
      }
      
      var partials = '';
      
      if (fileName.match(/^_/)) {
        name = path.dirname(file) + path.sep + fileName.replace(/^_/, '');

        partials = grunt.template.process(partialTemplate, {
          name: name.replace(new RegExp(path.sep, 'g'), '.')
        });
      }
      
      // Compiled source
      var compiled = compile(src);
      var dependencies = _.union(['handlebars', 'styla'], getDependencies(src));
      src = grunt.template.process(template, {
        name: name.replace(new RegExp(path.sep, 'g'), '.'),
        compiled: compiled,
        dependencies: JSON.stringify(dependencies),
        partials: partials,
        styles: styles
      });
      grunt.file.write(name + '.js', src);
      
      grunt.log.writeln('File "' + name+'.js' + '" created.');
    });
  });

};

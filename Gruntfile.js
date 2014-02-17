module.exports = function(grunt) {
 
  // configure the tasks
  grunt.initConfig({
    copy: {
      build: {
        cwd: 'source',
        src: [ '**', '!**/*.jade'  ],
        dest: 'build',
        expand: true
      },
    },
    clean: {
      build: {
        src: [ 'build' ]
      },
    },
    jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: [ '**/*.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      }
    },
    watch: {
      // stylesheets: {
      //   files: 'source/**/*.styl',
      //   tasks: [ 'stylesheets' ]
      // },
      // scripts: {
      //   files: 'source/**/*.coffee',
      //   tasks: [ 'scripts' ]
      // },
      jade: {
        files: 'source/**/*.jade',
        tasks: [ 'jade' ]
      },
      copy: {
        files: [ 'source/**', '!source/**/*.styl', '!source/**/*.coffee', '!source/**/*.jade' ],
        tasks: [ 'copy' ]
      },      
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: 'build',
          hostname: '*'
        }
      }
    },
    
    // // None of these names matter!
    // // Everything important is defined in frontmatter.
    // new_blog_entry: {
    //   dest: "source/_blog/_:subject/",
    //   filename: "_:subject" //relative to the dest
    // },

    build_blog: {
      src: "source/_blog/*/",
      dest: "build/blog/:year/:month/:day/:title"
    },

    prompt: {
      new_blog_entry: {
        options: {
          questions: [
            {
              config: 'new_blog_entry.subject',
              type: 'input',
              message: 'What is the subject of this blog?',
              // default: 'value',
              // choices: 'Array|function(answers)',
              // validate: function(value){},
              // filter:  function(value){},
              // when: function(answers){}
            }
          ]
        }
      },
    },

  });
 
  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-prompt');

 
  // define the tasks
  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean:build', 'copy', 'jade']
  );

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    [ 'build', 'connect', 'watch' ]
  );

  grunt.registerTask('makeafile', 'A sample task that logs stuff.', function(name, contents){
    var fs = require('fs');
    fs.writeFile('name', 'contents', function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
  });
  
  

  // grunt.registerTask(
  //   'make_a_file',
    
  //   function(name, contents){
    //   var fs = require('fs');
    //   fs.writeFile(name, contents, function(err) {
    //       if(err) {
    //           console.log(err);
    //       } else {
    //           console.log("The file was saved!");
    //       }
    //   });
    // }
  // );

  grunt.registerTask(
    'new_blog_entry',
    'Create a new blog entry.',
    [
      'prompt:new_blog_entry',
      'make_a_file'

    ]
  );

};
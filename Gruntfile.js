module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: ['dist/']
		},

		concat: {
			dist: {
				src: ['src/**/*.js', '!src/public/**/*', '!src/templates/**/*'],
				dest: 'dist/js/<%= pkg.name %>.js'.toLowerCase()
			},
			vendor: {
				src: ['vendor/jquery-1.10.2.js',
					'vendor/handlebars-1.1.2.js',
					'vendor/ember-1.5.1.js',
					'vendor/**/*.js'
				],
				dest: 'dist/js/<%= pkg.name %>.vendor.js'.toLowerCase()
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					hostname: '*',
					base: 'dist/'
				}
			}
		},

		copy: {
			dist: {
				cwd: 'src/public/',
				src: ['**/*'],
				dest: 'dist/',
				expand: true
			}
		},

		emberTemplates: {
			compile: {
				options: {
					amd: false,
					templateBasePath: "src/templates"
				},
				files: {
					'dist/js/tmp.js': 'src/templates/**/*'
				}
			}
		},

		uglify: {
			dist: {
				options: {
					banner: '/*! <%= pkg.name %> v<%= pkg.version %> built <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			},
			vendor: {
				options: {
					banner: '/*! <%= pkg.name %> v<%= pkg.version %> vendor files built <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'dist/js/<%= pkg.name %>.vendor.min.js': ['<%= concat.vendor.dest %>']
				}
			}
		},

		watch: {
			js: {
				files: ['src/**/*', '!src/templates/**/*'],
				tasks: ['concat:dist', 'copy'],
				options: {
					livereload: true,
				}
			},
			hbs: {
				files: ['src/templates/**/*'],
				tasks: ['clean', 'concat:dist', 'copy', 'emberTemplates'],
				options: {
					livereload: true,
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ember-templates');

	grunt.registerTask('build', ['min', 'emberTemplates']);
	grunt.registerTask('min', ['clean', 'concat', 'uglify', 'copy']);
	grunt.registerTask('serve', ['connect', 'watch']);

	grunt.registerTask('default', ['build', 'serve']);
};
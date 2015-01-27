module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: {
            dev: {
                files: {
                    "example/style.css": "example/style.less"
                }
            }
        },
        watch: {
            all: {
                files: ["example/style.less", "tasks/*.ts"],
                tasks: ["less:dev", "typescript:tasks"]
            }
        },
        open: {
            dev: {
                path: "output.html"
            }
        },
        typescript: {
            tasks: {
                src: ['tasks/*.ts'],
                dest: '.',
                options: {
                    module: 'commonjs', //or commonjs
                    target: 'es5', //or es3
                    basePath: '.',
                    sourceMap: false,
                    declaration: false
                }
            }
        },
        thunderstone: {
            html: ["example/*.html"],
            css: ["example/*.css"],
            output:"thunderstone.html"
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks('grunt-typescript');
    grunt.registerTask("develop", ["watch:all"]);
    grunt.registerTask("default", []);

    var doesThunderStoneExists = grunt.file.exists("tasks/thunderstone.js");
    if (doesThunderStoneExists) {
        require("./tasks/thunderstone.js")();
        grunt.registerTask("thunder", ["thunderstone"]);
    } else {
        console.log("Couldn't load thunderstone, please compile first");
    }
};
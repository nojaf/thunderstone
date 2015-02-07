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
                files: ["example/style.less", "tasks/*.ts", "tests/specs/*.ts"],
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
                src: ["tasks/*.ts", "tests/specs/*.ts"],
                dest: ".",
                options: {
                    module: "commonjs", //or commonjs
                    target: "es5", //or es3
                    basePath: ".",
                    sourceMap: false,
                    declaration: false
                }
            }
        },
        thunderstone: {
            html: ["example/*.html"],
            css: ["example/*.css"],
            output:"thunderstone.html"
        },
        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: "js",
                specNameMatcher: "spec",
                jUnit: {
                    report: true,
                    savePath: "./reports/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ["tests/specs/"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-jasmine-node");


    grunt.registerTask("develop", ["watch:all"]);
    grunt.registerTask("build", ["less:dev", "typescript:tasks"]);
    grunt.registerTask("tests", ["jasmine_node"]);

    var doesThunderStoneExists = grunt.file.exists("tasks/thunderstone.js");
    if (doesThunderStoneExists) {
        require("./tasks/thunderstone.js")();
        grunt.registerTask("thunder", ["thunderstone"]);
    } else {
        console.log("Couldn't load thunderstone, please build first");
    }
};
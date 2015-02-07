# Thunderstone

The idea of this tool is to generate a report of the used css selectors within html pages.

In your gruntfile:

```javascript
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        thunderstone: {
            html: ["example/*.html"],
            css: ["example/*.css"],
            outputDir: "results/"
        }
    });

    grunt.loadNpmTasks("thunderstone");
};
```

## config

### config.html

Array of html paths to process

### config.css

Array of css paths to process

### config.outputDir

Output directory path

## Build

Run ```grunt build``` to compile the source

## Tests

After compiling the source
Run ```grunt tests``` to execute the tests
